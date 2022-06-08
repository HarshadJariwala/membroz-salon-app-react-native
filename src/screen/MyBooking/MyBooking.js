import React, { useState, useEffect } from 'react';
import {
    View, Text, SafeAreaView,
    ScrollView, StatusBar, FlatList,
    RefreshControl, Dimensions,
    Image, TouchableOpacity,
} from 'react-native';
import {
    getBookingHistoryListService,
    getBookingRequestListService,
    patchAppointmentService
} from '../../services/AppointmentService/AppiontmentService';
import { MemberLanguage } from '../../services/LocalService/LanguageService';
import crashlytics, { firebase } from "@react-native-firebase/crashlytics";
import * as LocalService from '../../services/LocalService/LocalService';
import getCurrency from '../../services/getCurrencyService/getCurrency';
import languageConfig from '../../languages/languageConfig';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import * as SCREEN from '../../context/screen/screenName';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Loader from '../../components/loader/index';
import * as KEY from '../../context/actions/key';
import * as FONT from "../../styles/typography";
import Toast from 'react-native-simple-toast';
import * as COLOR from "../../styles/colors";
import * as IMAGE from "../../styles/image";
import styles from './MyBookingstyle';
import moment from 'moment';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const ListTab = [
    {
        'status': languageConfig.currentbookingtext
    },
    {
        'status': languageConfig.historytext
    }
]

const MyBooking = (props) => {
    const [logo, setLogo] = useState(null);
    const [status, setStatus] = useState(languageConfig.currentbookingtext);
    const [loading, setLoading] = useState(false);
    const [historyList, setHistoryList] = useState([]);
    const [bookingList, setBookingList] = useState([]);
    const [memberID, setMemberID] = useState(null);
    const [currencySymbol, setCurrencySymbol] = useState(null);
    const [refreshing, setrefreshing] = useState(false);
    const [memberInfo, setMemberInfo] = useState(null);

    const setStatusFilter = (status, index) => {
        const tab = ListTab.map((item) => {
            item.selected = false;
            return item;
        });
        tab[index].selected = true;
        setStatus(status)
    }

    useEffect(() => {
        //LANGUAGE MANAGEMENT FUNCTION
        MemberLanguage();
        RemoteController();
        setLoading(true);
        getMemberDeatilsLocalStorage();
    }, [])


    //REMOTE DATA FATCH IN LOCAL STORAGE
    async function RemoteController() {
        var userData = await LocalService.RemoteServerController();
        if (userData) {
            setLogo(userData.applogo);
        }
    };

    //TIME OUT FUNCTION
    const wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    const onRefresh = () => {
        setrefreshing(true);
        getBookingList(memberID);
        getHistoryList(memberID);
        wait(3000).then(() => setrefreshing(false));
    }

    //GET HISTORY LIST USING API 
    const getHistoryList = async (id) => {
        try {
            const response = await getBookingHistoryListService(id);
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                setLoading(false);
                setHistoryList(response.data);
            }
        } catch (error) {
            firebase.crashlytics().recordError(error);
            setLoading(false);
        }
    }

    //GET PAYMENT SCHEDULE LIST USING API 
    const getBookingList = async (id) => {
        try {
            const response = await getBookingRequestListService(id);
            console.log(`response.data`, response.data);
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                setLoading(false);
                setBookingList(response.data);
            }
        } catch (error) {
            firebase.crashlytics().recordError(error);
            setLoading(false);
        }
    }

    //GET MEMBER DATA IN MOBILE LOCAL STORAGE
    const getMemberDeatilsLocalStorage = async () => {
        var memberInfo = await LocalService.LocalStorageService();
        const response = getCurrency(memberInfo.branchid.currency);
        setCurrencySymbol(response);
        setMemberID(memberInfo._id);
        setMemberInfo(memberInfo);
        await getHistoryList(memberInfo._id);
        await getBookingList(memberInfo._id);
    }

    //RENDER HISTORY LIST USING FLATLIST
    const renderHistory = ({ item }) => (
        <View style={styles.img_card}>
            <Image style={styles.img}
                source={{ uri: item.refid && item.refid.gallery && item.refid.gallery[0] && item.refid.gallery[0].attachment ? item.refid.gallery[0].attachment : logo }} />
            <View style={{ flexDirection: KEY.COLUMN, marginLeft: 10 }}>
                <View style={{ width: WIDTH * 0.6, flexDirection: KEY.ROW, marginTop: 10, justifyContent: KEY.SPACEBETWEEN }}>
                    <Text numberOfLines={1} style={styles.text}>{item.refid.title}</Text>
                    <Text style={styles.text}>{currencySymbol + item.charges}</Text>
                </View>
                <View style={{ flexDirection: KEY.ROW, marginTop: 5 }}>
                    <Ionicons name='location-outline' size={20} color={COLOR.DEFALUTCOLOR} />
                    <Text numberOfLines={1}
                        style={{ marginLeft: 5, fontSize: FONT.FONT_SIZE_14, color: COLOR.LIGHT_BLACK, width: WIDTH / 2 }}>
                        {item.refid.title}
                    </Text>
                </View>
                <View style={{ flexDirection: KEY.ROW, marginTop: 5 }}>
                    <Feather name='calendar' size={20} color={COLOR.DEFALUTCOLOR} />
                    <Text numberOfLines={1}
                        style={{ marginLeft: 5, fontSize: FONT.FONT_SIZE_14, color: COLOR.LIGHT_BLACK, width: WIDTH / 3 }}>
                        {moment(item.appointmentdate).format('MMM DD, yyyy')}
                    </Text>
                </View>
            </View>
        </View>
    )

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
                        {item.refid.title}
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
        setLoading(true);
        let body = { status: "deleted" };
        try {
            const response = await patchAppointmentService(item._id, body);
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                Toast.show(languageConfig.bookingcancelsuccessmessage, Toast.SHORT);
                await getHistoryList(memberInfo._id);
                await getBookingList(memberInfo._id);
            }
        } catch (error) {
            Toast.show(languageConfig.bookingproblemmessage, Toast.SHORT);
            firebase.crashlytics().recordError(error);
            setLoading(false);
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, alignItems: KEY.CENTER, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={false} barStyle={KEY.DARK_CONTENT} backgroundColor={COLOR.STATUSBARCOLOR} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.listTab}>
                    {
                        ListTab.map((e, index) => (
                            <TouchableOpacity style={[styles.btnTab, status === e.status && styles.tabActive]} onPress={() => setStatusFilter(e.status, index)}>
                                <Text style={[styles.tabText, status === e.status && styles.tabTextActive]}>
                                    {e.status}
                                </Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>
                {
                    status == languageConfig.historytext &&
                    <SafeAreaView>
                        <FlatList
                            style={{ marginTop: 5 }}
                            data={historyList}
                            showsVerticalScrollIndicator={false}
                            renderItem={renderHistory}
                            contentContainerStyle={{ paddingBottom: 20, justifyContent: "center", alignItems: "center" }}
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
                            ListFooterComponent={() => (
                                historyList && historyList.length == 0 &&
                                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                                    <Image source={IMAGE.NODATA} style={{ height: 150, width: 200, marginTop: HEIGHT * 0.2 }} resizeMode={KEY.CONTAIN} />
                                    <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.TAUPE_GRAY, marginTop: 10 }}>{languageConfig.norecordtext}</Text>
                                </View>
                            )}
                        />
                    </SafeAreaView>
                }

                {status == languageConfig.currentbookingtext &&
                    <SafeAreaView>
                        <FlatList
                            style={{ marginTop: 5 }}
                            data={bookingList}
                            showsVerticalScrollIndicator={false}
                            renderItem={renderBooking}
                            contentContainerStyle={{ paddingBottom: 20, justifyContent: "center", alignItems: "center" }}
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
                            ListFooterComponent={() => (
                                bookingList && bookingList.length == 0 &&
                                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                                    <Image source={IMAGE.NODATA} style={{ height: 150, width: 200, marginTop: HEIGHT * 0.2 }} resizeMode={KEY.CONTAIN} />
                                    <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.TAUPE_GRAY, marginTop: 10 }}>{languageConfig.norecordtext}</Text>
                                </View>
                            )}
                        />
                    </SafeAreaView>
                }
            </ScrollView>
            {loading ? <Loader /> : null}
        </SafeAreaView>
    )
}

export default MyBooking;