import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Dimensions,
    SafeAreaView,
    ImageBackground,
    TextInput, Modal,
    ScrollView, FlatList,
    TouchableOpacity,
    StatusBar, Image, Linking, Platform, Alert, ImageBackgroundBase
} from 'react-native';
import {
    getLastBookingRequestListService,
    patchAppointmentService
} from '../../services/AppointmentService/AppiontmentService';
import Swiper from 'react-native-swiper'
import { MESSAGINGSENDERID } from '../../context/actions/type';
import { getByIdMemberService, getByIdUserService, patchMemberService } from '../../services/MemberService/MemberService';
import { NotificationService } from '../../services/NotificationService/NotificationService';
import { getLastWallettxnsListService } from '../../services/BillService/BillService';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { RemoteServerController } from '../../services/LocalService/LocalService';
import { MemberLanguage } from '../../services/LocalService/LanguageService';
import crashlytics, { firebase } from "@react-native-firebase/crashlytics";
import * as LocalService from '../../services/LocalService/LocalService';
import getCurrency from '../../services/getCurrencyService/getCurrency';
import PushNotification from "react-native-push-notification";
import languageConfig from '../../languages/languageConfig';
import * as SCREEN from '../../context/screen/screenName';
import { useFocusEffect } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import messaging from '@react-native-firebase/messaging';
import Feather from 'react-native-vector-icons/Feather';
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
import axiosConfig from '../../helpers/axiosConfig';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const HomeScreen = (props) => {
    const [loading, setloading] = useState(true);
    const [logo, setLogo] = useState(null);
    const [scanIconVisible, setScanIconVisible] = useState(false);
    const [notificationIconVisible, setNotificationIconVisible] = useState(false);
    const [notification, setNotification] = useState(0);
    const [membershipPlan, setMembershipPlan] = useState(null);
    const [memberName, setMemberName] = useState(null);
    const [memberID, setMemberID] = useState(null);
    const [memberProfilePic, setMemberProfilePic] = useState(null);
    const [memberInfo, setMemberInfo] = useState(null);
    const [currencySymbol, setCurrencySymbol] = useState(null);
    let getmemberid, appVersionCode, androidUrl, iosUrl, publicAuthkey;

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
                    getBookingList(memberInfo?._id);
                    wallateBillList(memberInfo?._id);
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
        notification, membershipPlan, logo,
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
            axiosConfig(userData.authkey);
            setLogo(userData.applogo);
            publicAuthkey = userData.authkey;
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
            const response = getCurrency(memberInfo.branchid.currency);
            getmemberid = memberInfo?._id;
            setCurrencySymbol(response);
            setMemberInfo(memberInfo);
            setMembershipPlan(memberInfo?.membershipid?.property?.membershipname);
            setMemberName(memberInfo?.fullname);
            setMemberID(memberInfo._id);
            getMemberDeatils(memberInfo?._id);
            getBookingList(memberInfo._id);
            wallateBillList(memberInfo?._id);
            getNotification(memberInfo?._id);
            setMemberProfilePic(memberInfo?.profilepic);
            PushNotifications();
            await getAppVersion(appVersionCode);
            wait(1000).then(() => {
                setloading(false);
            });
        } else {
            console.log(`publicAuthkey`, publicAuthkey);
            getPublicUserDeatils(publicAuthkey);
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

    //GET PUBLIC USER DATA USEING API CALL
    const getPublicUserDeatils = async (id) => {
        try {
            const response = await getByIdUserService(id);
            console.log(`response.data`, response.data);
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                Toast.show(languageConfig.welcometext, Toast.SHORT);
                LocalService.AuthenticatePublicUser(response.data);
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

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.STATUSBARCOLOR} barStyle={Platform.OS === 'ios' ? KEY.DARK_CONTENT : KEY.DARK_CONTENT} />
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                    <Swiper height={200} showsPagination={false}>
                        <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                            <Image
                                resizeMode='stretch'
                                style={styles.image}
                                source={{ uri: "https://img.freepik.com/free-photo/beautician-with-brush-applies-white-moisturizing-mask-face-young-girl-client-spa-beauty-salon_343596-4247.jpg?t=st=1655360090~exp=1655360690~hmac=a9fd85bbd2ce91cc81aa5c47e5168d2d42edef3db47f2d5abd3f3c60e565875a&w=826" }} />
                        </View>
                        <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                            <Image
                                resizeMode='stretch'
                                style={styles.image}
                                source={{ uri: "https://www.globalcosmeticsnews.com/wp-content/uploads/2020/04/Elliot-Steel-hair-salon-design-comfortel-2.jpg" }} />
                        </View>
                        <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                            <Image
                                resizeMode='stretch'
                                style={styles.image}
                                source={{ uri: "https://st.depositphotos.com/1021014/2737/i/950/depositphotos_27377291-stock-photo-modern-hair-salon.jpg" }} />
                        </View>
                    </Swiper>
                    <View style={{ width: WIDTH, flexDirection: KEY.ROW, justifyContent: KEY.SPACEBETWEEN, alignItems: KEY.CENTER, marginTop: 0, marginBottom: 5 }}>
                        <Text style={{ marginRight: 15, marginLeft: 15, fontSize: FONT.FONT_SIZE_20, color: COLOR.BLACK, fontWeight: FONT.FONT_BOLD }}>{"Our Services"}</Text>
                        <TouchableOpacity>
                            <Text style={{ marginRight: 15, marginLeft: 15, fontSize: FONT.FONT_SIZE_16, color: COLOR.DEFALUTCOLOR }}>{"View All"}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: KEY.ROW, }}>
                        <View style={{ flexDirection: KEY.COLUMN, }}>
                            <View style={{ margin: 10, justifyContent: KEY.CENTER, alignItems: KEY.CENTER, width: 80, height: 80, borderRadius: 100, borderWidth: 1, borderColor: COLOR.BLACK }}>
                                <Image style={styles.dotImage}
                                    source={{ uri: "https://media.istockphoto.com/photos/beauty-treatment-items-for-spa-procedures-on-white-wooden-table-picture-id1286682876?s=612x612" }} />

                            </View>
                            <Text style={{ textAlign: KEY.CENTER, color: COLOR.BLACK }}>{"Hair Cut"}</Text>
                        </View>
                        <View style={{ flexDirection: KEY.COLUMN, }}>
                            <View style={{ margin: 10, justifyContent: KEY.CENTER, alignItems: KEY.CENTER, width: 80, height: 80, borderRadius: 100, borderWidth: 1, borderColor: COLOR.BLACK }}>
                                <Image style={styles.dotImage}
                                    source={{ uri: "https://thumbs.dreamstime.com/b/hairdresser-protective-mask-cutting-hair-curly-african-american-client-beauty-salon-free-space-195792989.jpg" }} />

                            </View>
                            <Text style={{ textAlign: KEY.CENTER, color: COLOR.BLACK }}>{"Hair Color"}</Text>
                        </View>
                        <View style={{ flexDirection: KEY.COLUMN, }}>
                            <View style={{ margin: 10, justifyContent: KEY.CENTER, alignItems: KEY.CENTER, width: 80, height: 80, borderRadius: 100, borderWidth: 1, borderColor: COLOR.BLACK }}>
                                <Image style={styles.dotImage}
                                    source={{ uri: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" }} />

                            </View>
                            <Text style={{ textAlign: KEY.CENTER, color: COLOR.BLACK }}>{"Facial"}</Text>
                        </View>
                        <View style={{ flexDirection: KEY.COLUMN, }}>
                            <View style={{ margin: 10, justifyContent: KEY.CENTER, alignItems: KEY.CENTER, width: 80, height: 80, borderRadius: 100, borderWidth: 1, borderColor: COLOR.BLACK }}>
                                <Image style={styles.dotImage}
                                    source={{ uri: "https://www.nerdwallet.com/assets/blog/wp-content/uploads/2017/10/GettyImages-947995974-1440x864.jpg" }} />

                            </View>
                            <Text style={{ textAlign: KEY.CENTER, color: COLOR.BLACK }}>{"Smoothing"}</Text>
                        </View>

                    </View>
                    <View style={{ flexDirection: KEY.ROW, }}>
                        <View style={{ flexDirection: KEY.COLUMN, }}>
                            <View style={{ margin: 10, justifyContent: KEY.CENTER, alignItems: KEY.CENTER, width: 80, height: 80, borderRadius: 100, borderWidth: 1, borderColor: COLOR.BLACK }}>
                                <Image style={styles.dotImage}
                                    source={{ uri: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1011&q=80" }} />

                            </View>
                            <Text style={{ textAlign: KEY.CENTER, color: COLOR.BLACK }}>{"Hair Spa"}</Text>
                        </View>
                        <View style={{ flexDirection: KEY.COLUMN, }}>
                            <View style={{ margin: 10, justifyContent: KEY.CENTER, alignItems: KEY.CENTER, width: 80, height: 80, borderRadius: 100, borderWidth: 1, borderColor: COLOR.BLACK }}>
                                <Image style={styles.dotImage}
                                    source={{ uri: "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=836&q=80" }} />

                            </View>
                            <Text style={{ textAlign: KEY.CENTER, color: COLOR.BLACK }}>{"Shaving"}</Text>
                        </View>
                        <View style={{ flexDirection: KEY.COLUMN, }}>
                            <View style={{ margin: 10, justifyContent: KEY.CENTER, alignItems: KEY.CENTER, width: 80, height: 80, borderRadius: 100, borderWidth: 1, borderColor: COLOR.BLACK }}>
                                <Image style={styles.dotImage}
                                    source={{ uri: "https://images.unsplash.com/photo-1556233464-7bf5fce10c7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" }} />

                            </View>
                            <Text style={{ textAlign: KEY.CENTER, color: COLOR.BLACK }}>{"strenghing"}</Text>
                        </View>
                        <View style={{ flexDirection: KEY.COLUMN, }}>
                            <View style={{ margin: 10, justifyContent: KEY.CENTER, alignItems: KEY.CENTER, width: 80, height: 80, borderRadius: 100, borderWidth: 1, borderColor: COLOR.BLACK }}>
                                <Image style={styles.dotImage}
                                    source={{ uri: "https://thumbs.dreamstime.com/b/hairdresser-protective-mask-cutting-hair-curly-african-american-client-beauty-salon-free-space-195792989.jpg" }} />

                            </View>
                            <Text style={{ textAlign: KEY.CENTER, color: COLOR.BLACK }}>{"Hair setting"}</Text>
                        </View>

                    </View>

                    <View style={{ width: WIDTH, flexDirection: KEY.ROW, justifyContent: KEY.SPACEBETWEEN, alignItems: KEY.CENTER, marginTop: 10, marginBottom: 0 }}>
                        <Text style={{ marginRight: 15, marginLeft: 15, fontSize: FONT.FONT_SIZE_20, color: COLOR.BLACK, fontWeight: FONT.FONT_BOLD }}>{"Our Specialist"}</Text>
                        <TouchableOpacity>
                            <Text style={{ marginRight: 15, marginLeft: 15, fontSize: FONT.FONT_SIZE_16, color: COLOR.DEFALUTCOLOR }}>{"View All"}</Text>
                        </TouchableOpacity>
                    </View>


                    <View style={{ flexDirection: KEY.ROW, marginTop: 10, marginBottom: 10 }}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <View style={{ flexDirection: KEY.COLUMN, }}>
                                <View style={{ margin: 10, justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                                    <Image style={styles.dotImage1}
                                        source={{ uri: "https://media.istockphoto.com/photos/beauty-treatment-items-for-spa-procedures-on-white-wooden-table-picture-id1286682876?s=612x612" }} />

                                </View>
                                <Text style={{ textAlign: KEY.CENTER, color: COLOR.BLACK }}>{"Hair spa"}</Text>
                            </View>
                            <View style={{ flexDirection: KEY.COLUMN, }}>
                                <View style={{ margin: 10, justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                                    <Image style={styles.dotImage1}
                                        source={{ uri: "https://thumbs.dreamstime.com/b/hairdresser-protective-mask-cutting-hair-curly-african-american-client-beauty-salon-free-space-195792989.jpg" }} />

                                </View>
                                <Text style={{ textAlign: KEY.CENTER, color: COLOR.BLACK }}>{"Coloring"}</Text>
                            </View>
                            <View style={{ flexDirection: KEY.COLUMN, }}>
                                <View style={{ margin: 10, justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                                    <Image style={styles.dotImage1}
                                        source={{ uri: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" }} />

                                </View>
                                <Text style={{ textAlign: KEY.CENTER, color: COLOR.BLACK }}>{"shaving"}</Text>
                            </View>
                            <View style={{ flexDirection: KEY.COLUMN, }}>
                                <View style={{ margin: 10, justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                                    <Image style={styles.dotImage1}
                                        source={{ uri: "https://www.nerdwallet.com/assets/blog/wp-content/uploads/2017/10/GettyImages-947995974-1440x864.jpg" }} />

                                </View>
                                <Text style={{ textAlign: KEY.CENTER, color: COLOR.BLACK }}>{"Strenghning"}</Text>
                            </View>
                            <View style={{ flexDirection: KEY.COLUMN, }}>
                                <View style={{ margin: 10, justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                                    <Image style={styles.dotImage1}
                                        source={{ uri: "https://www.nerdwallet.com/assets/blog/wp-content/uploads/2017/10/GettyImages-947995974-1440x864.jpg" }} />

                                </View>
                                <Text style={{ textAlign: KEY.CENTER, color: COLOR.BLACK }}>{"Hair Cut"}</Text>
                            </View>
                        </ScrollView>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen;
