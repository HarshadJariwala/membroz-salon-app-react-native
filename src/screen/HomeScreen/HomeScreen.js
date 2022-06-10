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
    StatusBar, Image, Linking, Platform, Alert
} from 'react-native';
import {
    getLastBookingRequestListService,
    patchAppointmentService
} from '../../services/AppointmentService/AppiontmentService';
import { MESSAGINGSENDERID } from '../../context/actions/type';
import { getByIdMemberService, patchMemberService } from '../../services/MemberService/MemberService';
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
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const HomeScreen = (props) => {
    const [loading, setloading] = useState(true);
    const [scanIconVisible, setScanIconVisible] = useState(false);
    const [notificationIconVisible, setNotificationIconVisible] = useState(false);
    const [notification, setNotification] = useState(0);
    const [membershipPlan, setMembershipPlan] = useState(null);
    const [memberName, setMemberName] = useState(null);
    const [memberID, setMemberID] = useState(null);
    const [memberProfilePic, setMemberProfilePic] = useState(null);
    const [memberInfo, setMemberInfo] = useState(null);
    const [bookingList, setBookingList] = useState([]);
    const [currencySymbol, setCurrencySymbol] = useState(null);
    const [wallateHistory, setwallateHistory] = useState([]);
    const [selectedItem, setSelectItem] = useState(null);
    const [showprofileModalVisible, setshowProfileModalVisible] = useState(false);
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
        notification, membershipPlan,
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
        const response = getCurrency(memberInfo.branchid.currency);
        if (memberInfo) {
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
        }
    }

    //get wallate history list
    const wallateBillList = async (id) => {
        try {
            const response = await getLastWallettxnsListService(id);
            if (response.data != null && response.data != 'undefind' && response.status === 200) {
                setwallateHistory(response.data);
            }
        } catch (error) {
            setloading(false);
            firebase.crashlytics().recordError(error);
        }
    }

    //GET PAYMENT SCHEDULE LIST USING API 
    const getBookingList = async (id) => {
        try {
            const response = await getLastBookingRequestListService(id);
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                setBookingList(response.data);
            }
        } catch (error) {
            firebase.crashlytics().recordError(error);
            setloading(false);
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

    //RENDER BOOKING LIST USING FLATLIST
    const renderBooking = ({ item }) => (
        <View style={styles.img_card}>
            <Image style={styles.img}
                source={{ uri: item.refid && item.refid.gallery && item.refid.gallery[0] && item.refid.gallery[0].attachment ? item.refid.gallery[0].attachment : logo }} />
            <View style={{ flexDirection: KEY.COLUMN, marginLeft: 10, width: WIDTH - 140 }}>
                <View style={{ flexDirection: KEY.ROW, marginTop: 10, justifyContent: KEY.SPACEBETWEEN }}>
                    <Text numberOfLines={1} style={styles.text}>{item.refid.title}</Text>
                    <Text style={{
                        fontSize: FONT.FONT_SIZE_16,
                        color: COLOR.BLACK,
                        fontWeight: FONT.FONT_BOLD,
                        marginRight: 10
                    }}>{currencySymbol + item.charges}</Text>
                </View>
                <View style={{ flexDirection: KEY.ROW, marginTop: 5 }}>
                    <Ionicons name='location-outline' size={20} color={COLOR.DEFALUTCOLOR} />
                    <Text numberOfLines={1}
                        style={{ marginLeft: 5, fontSize: FONT.FONT_SIZE_14, color: COLOR.LIGHT_BLACK, width: WIDTH / 3 }}>
                        {item.attendee.branchid.branchname}
                    </Text>
                </View>
                <View style={{ flexDirection: KEY.ROW }}>
                    <View style={{ flexDirection: KEY.ROW, marginTop: 5 }}>
                        <Feather name='calendar' size={20} color={COLOR.DEFALUTCOLOR} />
                        <Text numberOfLines={1}
                            style={{ marginLeft: 5, fontSize: FONT.FONT_SIZE_14, color: COLOR.LIGHT_BLACK, width: WIDTH / 3 }}>
                            {moment(item.appointmentdate).format('MMM DD, yyyy')}
                        </Text>
                    </View>
                </View>
                <View style={{ alignSelf: KEY.FLEX_END, marginTop: -14 }}>
                    <TouchableOpacity style={styles.upgrade} onPress={() => onPressCancelBooking(item)} >
                        <Text style={styles.textbutton}>
                            {languageConfig.cancel}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )

    //CANCEL BUTTON CLICK TO CALL THIS FUNCTION 
    const onPressCancelBooking = async (item) => {
        setshowProfileModalVisible(true);
        setSelectItem(item);
    }

    //CANCEL BUTTON CLICK TO CALL THIS FUNCTION 
    const onPressConfirmBooking = async () => {
        setshowProfileModalVisible(false);
        if (selectedItem) {
            setloading(true);
            let body = { status: "deleted" };
            try {
                const response = await patchAppointmentService(item._id, body);
                if (response.data != null && response.data != 'undefind' && response.status == 200) {
                    Toast.show(languageConfig.bookingcancelsuccessmessage, Toast.SHORT);
                    await getBookingList(memberInfo._id);
                }
            } catch (error) {
                Toast.show(languageConfig.bookingproblemmessage, Toast.SHORT);
                firebase.crashlytics().recordError(error);
                setloading(false);
            }
        }
    }

    //render recharge history in flatlist
    const renderRechargeHistory = ({ item }) => (
        item.txntype == 'Dr' ?
            <View style={styles.transactionView}>
                <View style={{
                    flexDirection: KEY.COLUMN, justifyContent: KEY.CENTER, alignItems: KEY.CENTER,
                    borderTopLeftRadius: 10, borderBottomLeftRadius: 10,
                    backgroundColor: COLOR.DEFALUTCOLOR, height: 70, width: WIDTH * 0.2
                }}>
                    <View style={{ marginTop: 20, marginBottom: 5 }}>
                        <Image source={IMAGE.WALLET} style={{ height: 35, width: 35, tintColor: COLOR.WHITE, }} />
                    </View>
                    <View style={{ height: 20, width: 20, borderRadius: 100, left: -15, top: -20, backgroundColor: COLOR.WHITE }} >
                        <MaterialCommunityIcons name='minus' size={15} style={{ color: COLOR.RED, alignSelf: KEY.CENTER, margin: 2 }} />
                    </View>
                </View>
                <View style={{ flexDirection: KEY.COLUMN, justifyContent: KEY.SPACEBETWEEN, marginTop: 10, marginBottom: 10 }}>
                    <Text numberOfLines={1}
                        style={{
                            fontSize: FONT.FONT_SIZE_16, marginLeft: 10, width: WIDTH / 2,
                            color: COLOR.BLACK, fontWeight: FONT.FONT_BOLD, color: COLOR.RED
                        }}>{item.txnref}</Text>
                    <Text style={{ fontSize: FONT.FONT_SIZE_14, marginLeft: 10, color: COLOR.GRANITE_GRAY }}>{moment().format('DD MMM YYYY hh:mm a')}</Text>
                </View>
                <View style={{ flexDirection: KEY.COLUMN, justifyContent: KEY.SPACEBETWEEN, marginTop: 10, marginBottom: 10 }}>
                    <Text style={{
                        fontSize: FONT.FONT_SIZE_16, marginLeft: 10,
                        color: COLOR.BLACK, fontWeight: FONT.FONT_BOLD, color: COLOR.RED
                    }}>{'- ' + currencySymbol + item.value}</Text>
                </View>
            </View>
            :
            <View style={styles.transactionView}>
                <View style={{
                    flexDirection: KEY.COLUMN, justifyContent: KEY.CENTER, alignItems: KEY.CENTER,
                    borderTopLeftRadius: 10, borderBottomLeftRadius: 10,
                    backgroundColor: COLOR.DEFALUTCOLOR, height: 70, width: WIDTH * 0.2
                }}>
                    <View style={{ marginTop: 20, marginBottom: 5 }}>
                        <Image source={IMAGE.WALLET} style={{ height: 35, width: 35, tintColor: COLOR.WHITE, }} />
                    </View>
                    <View style={{ height: 20, width: 20, borderRadius: 100, left: -15, top: -20, backgroundColor: COLOR.WHITE }} >
                        <MaterialCommunityIcons name='plus' size={15} style={{ color: COLOR.GREEN, alignSelf: KEY.CENTER, margin: 2 }} />
                    </View>
                </View>
                <View style={{ flexDirection: KEY.COLUMN, justifyContent: KEY.SPACEBETWEEN, marginTop: 10, marginBottom: 10 }}>
                    <Text numberOfLines={1}
                        style={{
                            fontSize: FONT.FONT_SIZE_16, marginLeft: 10, width: WIDTH / 2,
                            color: COLOR.BLACK, fontWeight: FONT.FONT_BOLD, color: COLOR.GREEN
                        }}>{item.txnref}</Text>
                    <Text style={{ fontSize: FONT.FONT_SIZE_14, marginLeft: 10, color: COLOR.GRANITE_GRAY }}>{moment().format('DD MMM YYYY hh:mm a')}</Text>
                </View>
                <View style={{ flexDirection: KEY.COLUMN, justifyContent: KEY.SPACEBETWEEN, marginTop: 10, marginBottom: 10 }}>
                    <Text style={{
                        fontSize: FONT.FONT_SIZE_16, marginLeft: 10,
                        color: COLOR.BLACK, fontWeight: FONT.FONT_BOLD, color: COLOR.GREEN
                    }}>{'+ ' + currencySymbol + item.value}</Text>
                </View>
            </View>
    )

    //THIS FUNCTION USE TO RENEW MEMBERSHIP
    const onPressRenewMemberShip = () => {
        props.navigation.navigate(SCREEN.MEMBERSHIPSCREEN);
    }

    //THIS FUNCTION USE TO DUE PAYMENT
    const onPressDuePayment = () => {
        props.navigation.navigate(SCREEN.WALLETSCREEN);
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            {
                showprofileModalVisible
                    ?
                    <StatusBar hidden={false} translucent={true} backgroundColor="rgba(0,0,0,0.5)" barStyle={Platform.OS === 'ios' ? KEY.DARK_CONTENT : KEY.DARK_CONTENT} />
                    :
                    <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.STATUSBARCOLOR} barStyle={Platform.OS === 'ios' ? KEY.DARK_CONTENT : KEY.DARK_CONTENT} />
            }
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
                <Text style={{
                    fontSize: FONT.FONT_SIZE_18, color: COLOR.BLACK,
                    fontWeight: FONT.FONT_BOLD, marginLeft: 15, marginTop: 10
                }}>{languageConfig.membershipdetailstext}</Text>
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
                                        fontWeight: FONT.FONT_BOLD, width: WIDTH / 2
                                    }} numberOfLines={1}>{'Gold Member Ship new plan'}</Text>
                                </View>
                            </View>
                            <View style={{ flex: 1, alignItems: KEY.FLEX_END, marginTop: 10 }}>
                                <TouchableOpacity style={styles.btnStyle} onPress={() => onPressRenewMemberShip()}>
                                    <Text style={{
                                        fontWeight: FONT.FONT_BOLD, textTransform: KEY.CAPITALIZE,
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
                                <Image source={IMAGE.MONEYICON} style={{ height: 16, width: 20, tintColor: COLOR.DEFALUTCOLOR }} />
                            </View>
                            <View style={{ flexDirection: KEY.COLUMN, marginLeft: -2 }}>
                                <View style={{ marginLeft: 15 }}>
                                    <Text style={styles.rectangleText}>{languageConfig.paymentduetext + moment().format('DD.MM.YYYY')}</Text>
                                    <Text style={{
                                        fontSize: FONT.FONT_SIZE_16, textTransform: KEY.CAPITALIZE, color: COLOR.BLACK,
                                        fontWeight: FONT.FONT_BOLD, width: WIDTH / 2
                                    }} numberOfLines={1}>{currencySymbol + '520'}</Text>
                                </View>
                            </View>
                            <View style={{ flex: 1, alignItems: KEY.FLEX_END, marginTop: 10 }}>
                                <TouchableOpacity style={styles.btnStyle} onPress={() => onPressDuePayment()}>
                                    <Text style={{
                                        fontWeight: FONT.FONT_BOLD, textTransform: KEY.CAPITALIZE,
                                        color: COLOR.WHITE, fontSize: FONT.FONT_SIZE_14
                                    }}>{languageConfig.paytext}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
                {bookingList && bookingList.length > 0 &&
                    <SafeAreaView>
                        <Text style={{
                            fontSize: FONT.FONT_SIZE_18, color: COLOR.BLACK,
                            fontWeight: FONT.FONT_BOLD, marginLeft: 15, marginTop: 10
                        }}>{languageConfig.recentbookingtext}</Text>
                        <FlatList
                            style={{ marginTop: 5 }}
                            data={bookingList}
                            showsVerticalScrollIndicator={false}
                            renderItem={renderBooking}
                            contentContainerStyle={{ paddingBottom: 20, justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}
                            keyExtractor={item => item._id}
                        />
                    </SafeAreaView>
                }
                {wallateHistory && wallateHistory.length > 0 &&
                    <SafeAreaView>
                        <Text style={{
                            fontSize: FONT.FONT_SIZE_18, color: COLOR.BLACK,
                            fontWeight: FONT.FONT_BOLD, marginLeft: 15, marginTop: 10
                        }}>{languageConfig.recenettransactions}</Text>
                        <FlatList
                            style={{ marginTop: 10 }}
                            data={wallateHistory}
                            keyExtractor={(item, index) => index.toString()}
                            keyboardShouldPersistTaps={KEY.ALWAYS}
                            renderItem={renderRechargeHistory}
                            contentContainerStyle={{ paddingBottom: 20, alignSelf: KEY.CENTER }}
                            showsVerticalScrollIndicator={false}
                        />
                    </SafeAreaView>
                }
            </ScrollView>
            {selectedItem &&
                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={showprofileModalVisible}
                    onRequestClose={() => setshowProfileModalVisible(!showprofileModalVisible)}>
                    <View style={{ backgroundColor: "rgba(0,0,0,0.5)", flex: 1 }}>
                        <View style={styles.modal}>
                            <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, }}>
                                <View style={styles.modelcircle}>
                                    <MaterialCommunityIcons name='close' size={30} color={COLOR.RED} />
                                </View>
                                <View style={{ marginTop: 10, marginBottom: 10 }}>
                                    <Text style={[styles.modeltext, { fontSize: FONT.FONT_SIZE_16, color: COLOR.RED }]}>{languageConfig.areyousureyouwanttotext}</Text>
                                    <Text style={[styles.modeltext, { fontSize: FONT.FONT_SIZE_16, color: COLOR.RED }]}>{languageConfig.cancelthisbookingtext}</Text>
                                </View>
                                <View style={{}}>
                                    <Text style={[styles.modeltext, { fontSize: FONT.FONT_SIZE_14, color: COLOR.BLACK }]}>{selectedItem.refid.title}</Text>
                                </View>
                                <View style={{ flexDirection: KEY.ROW, marginTop: 5, }}>
                                    <Ionicons name='location-outline' size={20} color={COLOR.DEFALUTCOLOR} />
                                    <Text numberOfLines={1}
                                        style={{ marginLeft: 5, fontSize: FONT.FONT_SIZE_14, color: COLOR.LIGHT_BLACK }}>
                                        {selectedItem.attendee.branchid.branchname}
                                    </Text>
                                </View>
                                <View style={{ flexDirection: KEY.ROW }}>
                                    <View style={{ flexDirection: KEY.ROW, marginTop: 5 }}>
                                        <Feather name='calendar' size={20} color={COLOR.DEFALUTCOLOR} />
                                        <Text numberOfLines={1}
                                            style={{ marginLeft: 5, fontSize: FONT.FONT_SIZE_14, color: COLOR.LIGHT_BLACK }}>
                                            {moment(selectedItem.appointmentdate).format('MMM DD, yyyy')}
                                        </Text>
                                    </View>
                                </View>

                                <View style={{ flexDirection: KEY.ROW, marginTop: 30, marginBottom: 20 }}>
                                    <TouchableOpacity style={[styles.modelbutton, { backgroundColor: COLOR.LIGHT_RED }]} onPress={() => onPressConfirmBooking()}  >
                                        <Text style={styles.model_button}>
                                            {languageConfig.yes}
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.modelbutton, { backgroundColor: COLOR.LIGHT_GREEN }]} onPress={() => setshowProfileModalVisible(false)}>
                                        <Text style={styles.model_button}>
                                            {languageConfig.no}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
            }
            {loading ? <Loader /> : null}
        </SafeAreaView>
    )
}

export default HomeScreen;
