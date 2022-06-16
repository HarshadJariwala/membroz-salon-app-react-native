import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Dimensions,
    SafeAreaView,
    ImageBackground,
    TextInput, Modal, RefreshControl,
    ScrollView, FlatList,
    TouchableOpacity,
    StatusBar, Image, Linking, Platform, Alert
} from 'react-native';
import Swiper from 'react-native-swiper'
import { MESSAGINGSENDERID } from '../../context/actions/type';
import { getByIdMemberService, getByIdUserService, patchMemberService } from '../../services/MemberService/MemberService';
import { NotificationService } from '../../services/NotificationService/NotificationService';
import { getLastWallettxnsListService } from '../../services/BillService/BillService';
import { RemoteServerController } from '../../services/LocalService/LocalService';
import { MemberLanguage } from '../../services/LocalService/LanguageService';
import crashlytics, { firebase } from "@react-native-firebase/crashlytics";
import * as LocalService from '../../services/LocalService/LocalService';
import getCurrency from '../../services/getCurrencyService/getCurrency';
import PushNotification from "react-native-push-notification";
import languageConfig from '../../languages/languageConfig';
import * as SCREEN from '../../context/screen/screenName';
import { useFocusEffect } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
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
import { UserListService } from '../../services/UserService/UserService';
import { ServiceList } from '../../services/AppointmentService/ServiceList';
import SliderService from '../../services/SliderService/SliderService';
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
    const [teamList, setTeamList] = useState([]);
    const [serviceCategoryList, setServiceCategoryList] = useState([]);
    const [sliderData, setsliderData] = useState([]);
    const [refreshing, setrefreshing] = useState(false);
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
                    sliderService();
                    getServiceCategoryList();
                    getMyTeamList();
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
        notification, membershipPlan, logo, teamList, serviceCategoryList,
        memberName, memberID, memberProfilePic, sliderData
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
            getmemberid = memberInfo?._id;
            setMemberInfo(memberInfo);
            setMembershipPlan(memberInfo?.membershipid?.property?.membershipname);
            setMemberName(memberInfo?.fullname);
            setMemberID(memberInfo._id);
            getMemberDeatils(memberInfo?._id);
            getNotification(memberInfo?._id);
            setMemberProfilePic(memberInfo?.profilepic);
            PushNotifications();
            sliderService();
            getServiceCategoryList();
            getMyTeamList();
            await getAppVersion(appVersionCode);
            wait(1000).then(() => {
                setloading(false);
            });
        } else {
            getPublicUserDeatils(publicAuthkey);
            sliderService();
            getServiceCategoryList();
            getMyTeamList();
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

    //GET MYTEAM API THROUGH FETCH DATA
    const getMyTeamList = async () => {
        try {
            const response = await UserListService();
            if (response.data != null && response.data != 'undefind' && response.status === 200) {
                const slice = response.data.slice(0, 5)
                setTeamList(slice);
            }
        } catch (error) {
            console.log(`error`, error)
            firebase.crashlytics().recordError(error);
            setloading(false);
        }
    }

    //RENDER SPECIALIST INTO FLATLIST
    const renderMyTeamList = ({ item }) => (
        <View style={{ flexDirection: KEY.COLUMN, paddingHorizontal: 5 }}>
            <View style={{ margin: 5, justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                <Image style={!item.profilepic ? styles.noimagestyle : styles.dotImage1}
                    source={!item.profilepic ? IMAGE.USERPROFILE : { uri: item.profilepic }} />
            </View>
            <Text style={{ textAlign: KEY.CENTER, color: COLOR.BLACK, width: 100 }}>{item.property && item.property.fullname}</Text>
        </View>
    )

    //GET FETCH REWARD POINT DATA FROM API
    const getServiceCategoryList = async () => {
        try {
            const response = await ServiceList();
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                const slice = response.data.slice(0, 8);
                setServiceCategoryList(slice);
            }
        } catch (error) {
            setloading(false);
            firebase.crashlytics().recordError(error);
        }
    }

    //RENDER CATEGORY SERVICE FLATLIST
    const renderCategory = ({ item }) => (
        <TouchableOpacity style={{ flexDirection: KEY.COLUMN, paddingHorizontal: 10 }}
            onPress={() => viewCategoryScreen(item)}>
            <View style={{ margin: 10, justifyContent: KEY.CENTER, alignItems: KEY.CENTER, width: 80, height: 80, borderRadius: 100, borderWidth: 1, borderColor: COLOR.BLACK }}>
                <Image style={styles.dotImage}
                    source={{ uri: item.property && item.property.img && item.property.img[0] && item.property.img[0].attachment ? item.property.img[0].attachment : logo }} />
            </View>
            <Text style={{ textAlign: KEY.CENTER, alignSelf: KEY.CENTER, color: COLOR.BLACK, width: 80, marginTop: -7, marginBottom: 5 }}>{item.property && item.property.name}</Text>
        </TouchableOpacity>
    )

    //SILDER IMAGE MANAGE FUNCTION
    const sliderService = async () => {
        try {
            const response = await SliderService();
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                setsliderData(response.data);
            }
        } catch (error) {
            setloading(false);
            firebase.crashlytics().recordError(error);
        }
    }

    //ONCLICK TO VIEW CATEGORY SCREEN 
    const viewCategoryScreen = (item) => {
        if (item) {
            props.navigation.navigate(SCREEN.OURSERVICESCREEN, { item: item._id });
        } else {
            props.navigation.navigate(SCREEN.OURSERVICESCREEN);
        }
    }

    //GET PULL TO REFRESH FUNCTION
    const onRefresh = () => {
        setrefreshing(true);
        sliderService();
        getServiceCategoryList();
        getMyTeamList();
        wait(3000).then(() => setrefreshing(false));
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.STATUSBARCOLOR} barStyle={Platform.OS === 'ios' ? KEY.DARK_CONTENT : KEY.DARK_CONTENT} />
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, marginTop: 10 }}>
                    {(sliderData != null) || (sliderData && sliderData.length < 0) ?
                        <Swiper height={200} showsPagination={false}>
                            {sliderData.map((item, index) => (
                                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                                    <Image
                                        resizeMode={KEY.COVER}
                                        style={styles.image}
                                        source={{ uri: item.property && item.property.image && item.property.image[0] && item.property.image[0].attachment ? item.property.image[0].attachment : logo }} />
                                </View>
                            ))}
                        </Swiper>
                        : null
                    }
                    {
                        serviceCategoryList &&
                        <SafeAreaView>
                            <View style={{ width: WIDTH, flexDirection: KEY.ROW, justifyContent: KEY.SPACEBETWEEN, alignItems: KEY.CENTER, marginTop: 0, marginBottom: 5 }}>
                                <Text style={{ marginRight: 15, marginLeft: 15, fontSize: FONT.FONT_SIZE_20, color: COLOR.BLACK, fontWeight: FONT.FONT_BOLD }}>{"Our Services"}</Text>
                                <TouchableOpacity onPress={() => viewCategoryScreen()}>
                                    <Text style={{ marginRight: 15, marginLeft: 15, fontSize: FONT.FONT_SIZE_16, color: COLOR.DEFALUTCOLOR }}>{"View All"}</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ flexDirection: KEY.ROW }}>
                                <FlatList
                                    showsVerticalScrollIndicator={false}
                                    numColumns={3}
                                    contentContainerStyle={{ alignSelf: KEY.CENTER }}
                                    style={{ flexDirection: KEY.ROW }}
                                    keyboardShouldPersistTaps={KEY.ALWAYS}
                                    data={serviceCategoryList}
                                    renderItem={renderCategory}
                                    keyExtractor={item => item._id}
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={refreshing}
                                            title={languageConfig.pullrefreshtext}
                                            tintColor={COLOR.DEFALUTCOLOR}
                                            titleColor={COLOR.DEFALUTCOLOR}
                                            colors={[COLOR.DEFALUTCOLOR]}
                                            onRefresh={onRefresh} />
                                    }
                                />
                            </View>
                        </SafeAreaView>
                    }
                    {
                        teamList &&
                        <>
                            <View style={{ width: WIDTH, flexDirection: KEY.ROW, justifyContent: KEY.SPACEBETWEEN, alignItems: KEY.CENTER, marginTop: 10, marginBottom: 0 }}>
                                <Text style={{ marginRight: 15, marginLeft: 15, fontSize: FONT.FONT_SIZE_20, color: COLOR.BLACK, fontWeight: FONT.FONT_BOLD }}>{"Our Specialist"}</Text>
                            </View>
                            <View style={{ flexDirection: KEY.ROW, marginTop: 10, marginBottom: 10 }}>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                    <FlatList
                                        showsHorizontalScrollIndicator={false}
                                        numColumns={5}
                                        style={{ flexDirection: KEY.ROW }}
                                        keyboardShouldPersistTaps={KEY.ALWAYS}
                                        data={teamList}
                                        renderItem={renderMyTeamList}
                                        keyExtractor={item => item._id}
                                    />
                                </ScrollView>
                            </View>
                        </>
                    }
                </View>
            </ScrollView>
            {loading ? <Loader /> : null}
        </SafeAreaView>
    )
}

export default HomeScreen;
