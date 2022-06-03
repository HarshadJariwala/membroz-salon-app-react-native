import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Dimensions,
    SafeAreaView,
    ImageBackground,
    TextInput,
    ScrollView,
    TouchableOpacity,
    StatusBar, Image, Linking, Platform, Alert
} from 'react-native';
import { REMOTEDATA, MESSAGINGSENDERID, CLOUD_URL, DEFAULTPROFILE } from '../../context/actions/type';
import { getByIdMemberService, patchMemberService } from '../../services/MemberService/MemberService';
import { NotificationService } from '../../services/NotificationService/NotificationService';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { RemoteServerController } from '../../services/LocalService/LocalService';
import { MemberLanguage } from '../../services/LocalService/LanguageService';
import crashlytics, { firebase } from "@react-native-firebase/crashlytics";
import * as LocalService from '../../services/LocalService/LocalService';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-community/async-storage';
import PushNotification from "react-native-push-notification";
import languageConfig from '../../languages/languageConfig';
import * as SCREEN from '../../context/screen/screenName';
import { useFocusEffect } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import messaging from '@react-native-firebase/messaging';
import axiosConfig from '../../helpers/axiosConfig';
import Loader from '../../components/loader/index';
import DeviceInfo from 'react-native-device-info';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import Toast from 'react-native-simple-toast';
import RNExitApp from 'react-native-exit-app';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import styles from './HomeStyle';
import moment from 'moment';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const HomeScreen = (props) => {
    const [loading, setloading] = useState(true);
    const [mobileapppermissions, setMobileAppperMissions] = useState(null);
    const [scanIconVisible, setScanIconVisible] = useState(false);
    const [notificationIconVisible, setNotificationIconVisible] = useState(false);
    const [notification, setNotification] = useState(0);
    const [membershipPlan, setMembershipPlan] = useState(null);
    const [memberName, setMemberName] = useState(null);
    const [memberID, setMemberID] = useState(null);
    const [memberProfilePic, setMemberProfilePic] = useState(null);
    const [memberInfo, setMemberInfo] = useState(null);
    let getmemberid, appVersionCode, androidUrl, iosUrl;

    useFocusEffect(
        React.useCallback(() => {
            const getCallBackScreen = () => {
                //LANGUAGE MANAGEMENT FUNCTION
                MemberLanguage();
                if (memberInfo) {
                    getmemberid = memberInfo?._id;
                    setMembershipPlan(memberInfo?.membershipid?.property?.membershipname);
                    setMemberName(memberInfo?.fullname);
                    setMemberID(memberInfo._id);
                    getNotification(memberInfo?._id);
                    setMemberProfilePic(memberInfo?.profilepic);
                    PushNotifications();
                }
            }
            getCallBackScreen();
        }, [])
    );

    useEffect(() => {
        //LANGUAGE MANAGEMENT FUNCTION
        MemberLanguage();
        // CHECK REMOTECONTROLLER USE TO AUTOCONFIG APP
        RemoteController();
        getMemberDeatilsLocalStorage();
    }, []);


    useEffect(() => {
    }, [loading, scanIconVisible, notificationIconVisible,
        mobileapppermissions, notification, membershipPlan,
        memberName, memberID, memberProfilePic,
    ])

    //TIME OUT FUNCTION
    const wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    // REMOTECONTROLLER USE TO AUTOCONFIG APP
    const RemoteController = async () => {
        var userData = await RemoteServerController();
        if (userData) {
            setScanIconVisible(userData.scanicon);
            setNotificationIconVisible(userData.notificationicon);
            if (Platform.OS === KEY.IOS) {
                appVersionCode = userData.appstoreversioncode;
            } else {
                appVersionCode = userData.appversioncode;
            }
            androidUrl = userData.playstoreid;
            iosUrl = userData.appstoreid;
        };
    };

    //GET MEMBER DATA IN MOBILE LOCAL STORAGE
    const getMemberDeatilsLocalStorage = async () => {
        var memberInfo = await LocalService.LocalStorageService();
        if (memberInfo) {
            getmemberid = memberInfo?._id;
            setMemberInfo(memberInfo);
            setMembershipPlan(memberInfo?.membershipid?.property?.membershipname);
            setMemberName(memberInfo?.fullname);
            setMemberID(memberInfo._id);
            getMemberDeatils(memberInfo?._id);
            getNotification(memberInfo?._id);
            setMemberProfilePic(memberInfo?.profilepic);
            PushNotifications();
            await getAppVersion(appVersionCode);
            wait(1000).then(() => {
                setloading(false);
            });
        }
    }

    //GET MEMBER DATA USEING API CALL
    const getMemberDeatils = async (id) => {
        try {
            const response = await getByIdMemberService(id);
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                if (response.data.message === 'You do not have permission') {
                    setloading(false);
                    LocalService.RemoveAuthenticateMember();
                    props.navigation.replace(SCREEN.AUTH);
                } else {
                    Toast.show(languageConfig.welcometext, Toast.SHORT);
                    LocalService.AuthenticateMember(response.data);
                }
            }
        } catch (error) {
            console.log(`error`, error);
            firebase.crashlytics().recordError(error);
            setloading(false);
        }
    }

    //GET IMAGE GALLERY COUNT API DATA GET
    const getNotification = async (id) => {
        try {
            const response = await NotificationService(id);
            setNotification(response.data.length);
        } catch (error) {
            firebase.crashlytics().recordError(error);
            setloading(false);
        }
    }

    //PUSHNOTIFICATION BACKGROUND FUNCTION
    const PushNotifications = async () => {
        let fcmToken = await firebase.messaging().getToken();
        if (fcmToken != undefined) {
            getFcmToken(fcmToken);
        }
        //PUSH NOTIFICATION FUNCTION
        PushNotification.configure({
            // (optional) Called when Token is generated (iOS and Android)
            onRegister: function (token) {
                //console.log(`token.token`, token.token)
                //getFcmToken(token.token)
            },

            // (required) Called when a remote is received or opened, or local notification is opened
            onNotification: function (notification) {
                // process the notification
                // (required) Called when a remote is received or opened, or local notification is opened
                if (notification.foreground) {
                    notification.data = {
                        message: notification.message,
                        title: notification.title
                    }
                    //   console.log("NOTIFICATION:", notification);
                    notification.finish(PushNotificationIOS.FetchResult.NoData);
                }
            },

            // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
            onAction: function (notification) {
                //console.log("ACTION:", notification.action);
                //  console.log("NOTIFICATION:", notification);

                // process the action
            },

            // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
            onRegistrationError: function (err) {
                //console.error(err.message, err);                
            },

            // IOS ONLY (optional): default: all - Permissions to register.
            permissions: {
                alert: true,
                badge: true,
                sound: true,
            },

            // Should the initial notification be popped automatically
            // default: true
            senderID: MESSAGINGSENDERID,
            popInitialNotification: true,

            /**
             * (optional) default: true
             * - Specified if permissions (ios) and token (android and ios) will requested or not,
             * - if not, you must call PushNotificationsHandler.requestPermissions() later
             * - if you are not using remote notification or do not have Firebase installed, use this:
             *     requestPermissions: Platform.OS === 'ios'
             */
            requestPermissions: true,
        });
    }

    //GET MESSAGE TOKEN
    const getFcmToken = async (fcmToken) => {
        // console.log(`fcmToken`, fcmToken);
        let uniqueId;
        let deviceInfo;
        if (Platform.OS === 'android') {
            uniqueId = await DeviceInfo.getAndroidId()
            if (fcmToken) {
                deviceInfo = {
                    anroiddevice: {
                        "deviceid": uniqueId,
                        "registrationid": fcmToken
                    }
                }
                await UserPatch(deviceInfo);
            }
        } else {
            uniqueId = await DeviceInfo.getUniqueId();
            if (fcmToken) {
                deviceInfo = {
                    iosdevice: {
                        "deviceid": uniqueId,
                        "registrationid": fcmToken
                    }
                }
                await UserPatch(deviceInfo);
            }
        }
    }

    //UPDATE MEMBER INFORMATION API CALL
    const UserPatch = async (deviceInfo) => {
        try {
            const response = await patchMemberService(getmemberid, deviceInfo);
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
            }
        }
        catch (error) {
            firebase.crashlytics().recordError(error);
            setloading(false);
        }
    }

    //ALERT BUTTON APP VERSIONCODE
    const checkAlertResponse = () =>
        Alert.alert(
            languageConfig.warning,
            Platform.OS === KEY.IOS ?
                languageConfig.homeupdatemessage
                : languageConfig.homeupdatemessage2,
            [
                {
                    text: languageConfig.closetext,
                    onPress: () => {
                        if (Platform.OS === KEY.IOS) {
                            RNExitApp.exitApp();
                        } else {
                            RNExitApp.exitApp();
                        }
                    }
                },
                {
                    text: languageConfig.updatenow, onPress: () => {
                        if (Platform.OS === KEY.IOS) {
                            Linking.openURL(`itms-apps://apps.apple.com/id/app/${iosUrl}`);
                        } else {
                            Linking.openURL(`market://details?id=${androidUrl}`);
                        }
                    }
                }
            ]
        );

    //CHECK APP VERSIONCODE
    const getAppVersion = (value) => {
        const appVersionCode = DeviceInfo.getVersion();
        if (appVersionCode != value) {
            return checkAlertResponse();
        }
    }

    //IMAGE CLICK TO VIEW IMAGE FUNCTION
    const viewImage = () => {
        let viewimage;
        if (memberProfilePic != null) {
            viewimage = memberProfilePic;
        } else {
            viewimage = DEFAULTPROFILE;
        }
        //props.navigation.navigate(SCREEN.VIEWIMAGE, { viewimage });
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.DEFALUTCOLOR} barStyle={KEY.DARK_CONTENT} />
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                    <TouchableOpacity style={styles.viweRound} onPress={() => viewImage()}>
                        <Image source={!memberProfilePic ? IMAGE.USERPROFILE : { uri: memberProfilePic }}
                            style={{ height: 95, width: 95, borderRadius: 100 }} />
                    </TouchableOpacity>
                    <Text style={styles.text}>{memberName}</Text>
                </View>

                <View style={styles.viewMain}>
                    <View style={styles.viewRectangle}>
                        <View style={{ flexDirection: KEY.ROW, marginTop: 10 }}>
                            <View style={styles.rounfIconStyle}>
                                <MaterialCommunityIcons name='clock' size={24} color={COLOR.DEFALUTCOLOR} />
                            </View>
                            <View style={{ flexDirection: KEY.COLUMN, marginLeft: -2 }}>
                                <View style={{ marginLeft: 15 }}>
                                    <Text style={styles.rectangleText}>{languageConfig.checkintime}</Text>
                                    <Text style={{
                                        fontSize: FONT.FONT_SIZE_16, color: COLOR.BLACK, fontWeight: FONT.FONT_WEIGHT_BOLD
                                    }}>{moment().format('DD MMMM YYYY,hh:mm:ss A')}</Text>
                                </View>
                            </View>
                            <View style={{ flex: 1, alignItems: KEY.FLEX_END, marginTop: 5 }}>
                                <TouchableOpacity style={styles.rectangleRound} >
                                    <Ionicons name='ios-log-out-outline' size={40} color={COLOR.DEFALUTCOLOR} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{
                            borderWidth: 0.2, marginTop: 10, borderColor: COLOR.LINE_COLOR,
                            marginRight: 15, marginLeft: 15, width: WIDTH - 60
                        }} />
                        <View style={{ flexDirection: KEY.ROW, marginTop: 5, alignSelf: KEY.FLEX_START }}>
                            <View style={styles.rounfIconStyle}>
                                <MaterialCommunityIcons name='clock' size={24} color={COLOR.DEFALUTCOLOR} />
                            </View>
                            <View style={{ flexDirection: KEY.COLUMN, marginLeft: -2 }}>
                                <View style={{ marginLeft: 15, marginBottom: 10 }}>
                                    <Text style={styles.rectangleText}>{languageConfig.totaltimetext}</Text>
                                    <Text style={{
                                        fontSize: FONT.FONT_SIZE_16, textTransform: KEY.UPPERCASE, color: COLOR.BLACK,
                                        fontWeight: FONT.FONT_WEIGHT_BOLD
                                    }}>{'04:10:52'}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.viewMain}>
                    <View style={styles.viewRectangle}>
                        <View style={{ flexDirection: KEY.ROW, marginTop: 10 }}>
                            <View style={styles.rounfIconStyle}>
                                <MaterialCommunityIcons name='wallet-membership' size={20} color={COLOR.DEFALUTCOLOR} />
                            </View>
                            <View style={{ flexDirection: KEY.COLUMN, marginLeft: -2 }}>
                                <View style={{ marginLeft: 15 }}>
                                    <Text style={styles.rectangleText}>{languageConfig.membershiptext}</Text>
                                    <Text style={{
                                        fontSize: FONT.FONT_SIZE_16, textTransform: KEY.CAPITALIZE, color: COLOR.BLACK,
                                        fontWeight: FONT.FONT_WEIGHT_BOLD, width: WIDTH / 2
                                    }} numberOfLines={1}>{'Gold Member Ship new plan'}</Text>
                                </View>
                            </View>
                            <View style={{ flex: 1, alignItems: KEY.FLEX_END, marginTop: 10 }}>
                                <TouchableOpacity style={styles.btnStyle} >
                                    <Text style={{
                                        fontWeight: FONT.FONT_WEIGHT_BOLD, textTransform: KEY.CAPITALIZE,
                                        color: COLOR.WHITE, fontSize: FONT.FONT_SIZE_14
                                    }}>{languageConfig.renew}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{
                            borderWidth: 0.2, marginTop: 10, borderColor: COLOR.LINE_COLOR,
                            marginRight: 15, marginLeft: 15, width: WIDTH - 60
                        }} />
                        <View style={{ flexDirection: KEY.ROW, marginTop: 10, marginBottom: 10 }}>
                            <View style={styles.rounfIconStyle}>
                                <FontAwesome5 name='money-bill-wave-alt' size={20} color={COLOR.DEFALUTCOLOR} />
                            </View>
                            <View style={{ flexDirection: KEY.COLUMN, marginLeft: -2 }}>
                                <View style={{ marginLeft: 15 }}>
                                    <Text style={styles.rectangleText}>{languageConfig.paymentduetext + moment().format('DD.MM.YYYY')}</Text>
                                    <Text style={{
                                        fontSize: FONT.FONT_SIZE_16, textTransform: KEY.CAPITALIZE, color: COLOR.BLACK,
                                        fontWeight: FONT.FONT_WEIGHT_BOLD, width: WIDTH / 2
                                    }} numberOfLines={1}>{'$520'}</Text>
                                </View>
                            </View>
                            <View style={{ flex: 1, alignItems: KEY.FLEX_END, marginTop: 10 }}>
                                <TouchableOpacity style={styles.btnStyle} >
                                    <Text style={{
                                        fontWeight: FONT.FONT_WEIGHT_BOLD, textTransform: KEY.CAPITALIZE,
                                        color: COLOR.WHITE, fontSize: FONT.FONT_SIZE_14
                                    }}>{languageConfig.paytext}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.viewMain}>
                    <View style={styles.viewRectangle}>
                        <View style={{
                            flexDirection: KEY.ROW, marginTop: 10,
                            alignSelf: KEY.FLEX_START, marginLeft: 20
                        }}>
                            <Text style={{
                                fontSize: FONT.FONT_SIZE_18, textTransform: KEY.CAPITALIZE, color: COLOR.BLACK,
                                fontWeight: FONT.FONT_WEIGHT_BOLD
                            }}>{languageConfig.upcoming}</Text>
                            <Text style={{
                                fontSize: FONT.FONT_SIZE_18, textTransform: KEY.CAPITALIZE, color: COLOR.DEFALUTCOLOR,
                                fontWeight: FONT.FONT_WEIGHT_BOLD, marginLeft: 5
                            }}>{languageConfig.class}</Text>
                        </View>

                        <View style={{ marginTop: 10 }}>
                            <View style={{ flexDirection: KEY.ROW, marginBottom: 10 }}>
                                <TouchableOpacity
                                    style={{ flexDirection: KEY.ROW, alignItems: KEY.CENTER, justifyContent: KEY.SPACEBETWEEN }}>
                                    <Image source={IMAGE.NO_PHOTO} resizeMode={KEY.COVER} style={{ height: 70, width: 70, borderRadius: 20 }} />
                                    <View style={{ marginLeft: 20 }}>
                                        <Text style={{
                                            fontSize: FONT.FONT_SIZE_16, textTransform: KEY.CAPITALIZE, color: COLOR.BLACK,
                                            fontWeight: FONT.FONT_WEIGHT_BOLD, width: WIDTH / 2
                                        }} >{'Fixed Wight'}</Text>
                                        <Text style={{
                                            fontSize: FONT.FONT_SIZE_14, textTransform: KEY.CAPITALIZE, color: COLOR.GRANITE_GRAY,
                                            width: WIDTH / 2, marginTop: 5
                                        }} >{'By simir patel'} </Text>
                                        <Text style={{
                                            fontSize: FONT.FONT_SIZE_14, color: COLOR.GRANITE_GRAY,
                                            width: WIDTH / 2, marginTop: 5
                                        }}> {moment().format('MMMM DD,YYYY hh:mm A')}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={{ borderBottomColor: COLOR.LINE_COLOR, borderBottomWidth: 1, width: WIDTH - 60 }} />
                        </View>

                        <View style={{ marginTop: 10 }}>
                            <View style={{ flexDirection: KEY.ROW, marginBottom: 10 }}>
                                <TouchableOpacity
                                    style={{ flexDirection: KEY.ROW, alignItems: KEY.CENTER, justifyContent: KEY.SPACEBETWEEN }}>
                                    <Image source={IMAGE.NO_PHOTO} resizeMode={KEY.COVER} style={{ height: 70, width: 70, borderRadius: 20 }} />
                                    <View style={{ marginLeft: 20 }}>
                                        <Text style={{
                                            fontSize: FONT.FONT_SIZE_16, textTransform: KEY.CAPITALIZE, color: COLOR.BLACK,
                                            fontWeight: FONT.FONT_WEIGHT_BOLD, width: WIDTH / 2
                                        }} >{'Fixed Wight'}</Text>
                                        <Text style={{
                                            fontSize: FONT.FONT_SIZE_14, textTransform: KEY.CAPITALIZE, color: COLOR.GRANITE_GRAY,
                                            width: WIDTH / 2, marginTop: 5
                                        }} >{'By simir patel'} </Text>
                                        <Text style={{
                                            fontSize: FONT.FONT_SIZE_14, color: COLOR.GRANITE_GRAY,
                                            width: WIDTH / 2, marginTop: 5
                                        }}> {moment().format('MMMM DD,YYYY hh:mm A')}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={{ borderBottomColor: COLOR.LINE_COLOR, borderBottomWidth: 1, width: WIDTH - 60 }} />
                        </View>

                        <View style={{ marginTop: 10 }}>
                            <View style={{ flexDirection: KEY.ROW, marginBottom: 10 }}>
                                <TouchableOpacity
                                    style={{ flexDirection: KEY.ROW, alignItems: KEY.CENTER, justifyContent: KEY.SPACEBETWEEN }}>
                                    <Image source={IMAGE.NO_PHOTO} resizeMode={KEY.COVER} style={{ height: 70, width: 70, borderRadius: 20 }} />
                                    <View style={{ marginLeft: 20 }}>
                                        <Text style={{
                                            fontSize: FONT.FONT_SIZE_16, textTransform: KEY.CAPITALIZE, color: COLOR.BLACK,
                                            fontWeight: FONT.FONT_WEIGHT_BOLD, width: WIDTH / 2
                                        }} >{'Fixed Wight'}</Text>
                                        <Text style={{
                                            fontSize: FONT.FONT_SIZE_14, textTransform: KEY.CAPITALIZE, color: COLOR.GRANITE_GRAY,
                                            width: WIDTH / 2, marginTop: 5
                                        }} >{'By simir patel'} </Text>
                                        <Text style={{
                                            fontSize: FONT.FONT_SIZE_14, color: COLOR.GRANITE_GRAY,
                                            width: WIDTH / 2, marginTop: 5
                                        }}> {moment().format('MMMM DD,YYYY hh:mm A')}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={{ borderBottomColor: COLOR.LINE_COLOR, borderBottomWidth: 1, width: WIDTH - 60 }} />
                        </View>

                        <View style={{ marginTop: 10 }}>
                            <View style={{ flexDirection: KEY.ROW, marginBottom: 10 }}>
                                <TouchableOpacity
                                    style={{ flexDirection: KEY.ROW, alignItems: KEY.CENTER, justifyContent: KEY.SPACEBETWEEN }}>
                                    <Image source={IMAGE.NO_PHOTO} resizeMode={KEY.COVER} style={{ height: 70, width: 70, borderRadius: 20 }} />
                                    <View style={{ marginLeft: 20 }}>
                                        <Text style={{
                                            fontSize: FONT.FONT_SIZE_16, textTransform: KEY.CAPITALIZE, color: COLOR.BLACK,
                                            fontWeight: FONT.FONT_WEIGHT_BOLD, width: WIDTH / 2
                                        }} >{'Fixed Wight'}</Text>
                                        <Text style={{
                                            fontSize: FONT.FONT_SIZE_14, textTransform: KEY.CAPITALIZE, color: COLOR.GRANITE_GRAY,
                                            width: WIDTH / 2, marginTop: 5
                                        }} >{'By simir patel'} </Text>
                                        <Text style={{
                                            fontSize: FONT.FONT_SIZE_14, color: COLOR.GRANITE_GRAY,
                                            width: WIDTH / 2, marginTop: 5, marginLeft: -3
                                        }}> {moment().format('MMMM DD,YYYY hh:mm A')}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: WIDTH - 60 }} />
                        </View>
                    </View>
                    <View style={{ marginBottom: 80 }} />
                </View>
            </ScrollView>
            <TouchableOpacity
                activeOpacity={0.7}
                style={styles.scanBtnStyle}>
                <MaterialCommunityIcons name='qrcode-scan' size={25} color={COLOR.WHITE} />
                <Text style={{ fontSize: FONT.FONT_SIZE_14, fontWeight: FONT.FONT_WEIGHT_BOLD, color: COLOR.WHITE, marginLeft: 10 }}>Scan for Check-in</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default HomeScreen;
