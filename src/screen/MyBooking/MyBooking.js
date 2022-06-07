import React, { useState, useEffect } from 'react';
import {
    View, Text, SafeAreaView,
    ScrollView, StatusBar, FlatList,
    RefreshControl, Dimensions,
    Image, TouchableOpacity,
} from 'react-native';
import {
    getBookingHistoryListService,
    getBookingRequestListService
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
import * as COLOR from "../../styles/colors";
import * as IMAGE from "../../styles/image";
import styles from './MyBookingstyle';
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
    const [status, setStatus] = useState(languageConfig.currentbookingtext);
    const [loading, setLoading] = useState(false);
    const [historyList, setHistoryList] = useState([]);
    const [bookingList, setBookingList] = useState([]);
    const [memberID, setMemberID] = useState(null);
    const [currencySymbol, setCurrencySymbol] = useState(null);
    const [refreshing, setrefreshing] = useState(false);
    const [memderInfo, setMemderInfo] = useState(null);

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
        setLoading(true);
        getMemberDeatilsLocalStorage();
    }, [])

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
            console.log(`response.data`, response.data);
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
        setMemderInfo(memberInfo);
        await getHistoryList(memberInfo._id);
        await getBookingList(memberInfo._id);
    }

    //RENDER HISTORY LIST USING FLATLIST
    const renderHistory = ({ item }) => (
        <View style={styles.img_card}>
            <Image style={styles.img} source={IMAGE.NO_PHOTO} />
            <View style={{ flexDirection: KEY.COLUMN }}>
                <View style={{ marginTop: 10, marginLeft: 10 }}>
                    <Text style={styles.text}>{"Hair Cut"}</Text>
                </View>
                <View style={{ flexDirection: KEY.ROW, marginTop: 10 }}>
                    <Ionicons name='location-outline' size={20} color={COLOR.DEFAULTLIGHT} style={{ marginLeft: 5 }} />
                    <Text style={{ marginLeft: 8 }}>{"MPlace Mall"}</Text>
                </View>
                <View style={{ flexDirection: KEY.ROW, marginTop: 10 }}>
                    <Feather name='calendar' size={20} color={COLOR.DEFAULTLIGHT} style={{ marginLeft: 6 }} />
                    <Text style={{ marginLeft: 8 }}>{"Jan 08,2023 10 am"}</Text>
                </View>
            </View>
            <View style={{ flexDirection: KEY.COLUMN, flex: 1, justifyContent: KEY.SPACEBETWEEN, marginLeft: 35 }}>
                <View style={{ marginTop: 10, justifyContent: KEY.FLEX_END, alignItems: KEY.CENTER }}>
                    <Text style={styles.text}>{"$25"}</Text>
                </View>
                <View style={{ justifyContent: KEY.FLEX_END, alignItems: KEY.CENTER }}>
                    <TouchableOpacity style={styles.upgrade} >
                        <Text style={styles.textbutton}>
                            {'Cancle'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )

    //RENDER BOOKING LIST USING FLATLIST
    const renderBooking = ({ item }) => (
        <View style={styles.img_card}>
            <Image style={styles.img} source={IMAGE.NO_PHOTO} />
            <View style={{ flexDirection: KEY.COLUMN }}>
                <View style={{ marginTop: 10, marginLeft: 10 }}>
                    <Text style={styles.text}>{"Hair Cut"}</Text>
                </View>
                <View style={{ flexDirection: KEY.ROW, marginTop: 10 }}>
                    <Ionicons name='location-outline' size={20} color={COLOR.DEFAULTLIGHT} style={{ marginLeft: 5 }} />
                    <Text style={{ marginLeft: 8 }}>{"MPlace Mall"}</Text>
                </View>
                <View style={{ flexDirection: KEY.ROW, marginTop: 10 }}>
                    <Feather name='calendar' size={20} color={COLOR.DEFAULTLIGHT} style={{ marginLeft: 6 }} />
                    <Text style={{ marginLeft: 8 }}>{"Jan 08,2023 10 am"}</Text>
                </View>
            </View>
            <View style={{ flexDirection: KEY.COLUMN, flex: 1, justifyContent: KEY.SPACEBETWEEN, marginLeft: 35 }}>
                <View style={{ marginTop: 10, justifyContent: KEY.FLEX_END, alignItems: KEY.CENTER }}>
                    <Text style={styles.text}>{"$25"}</Text>
                </View>
                <View style={{ justifyContent: KEY.FLEX_END, alignItems: KEY.CENTER }}>
                    <TouchableOpacity style={styles.upgrade} >
                        <Text style={styles.textbutton}>
                            {'Cancle'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )

    return (
        <SafeAreaView style={{ flex: 1, alignItems: KEY.CENTER, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={false} barStyle={KEY.DARK_CONTENT} backgroundColor={COLOR.STATUSBARCOLOR} />
            <ScrollView showsVerticalScrollIndicator={false}>
                {(historyList && historyList.length > 0) || (historyList && historyList.length > 0)
                    ?
                    <>
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
                            status == languageConfig.currentbookingtext &&
                            <>
                                <FlatList
                                    style={{ marginTop: 5 }}
                                    data={historyList}
                                    showsVerticalScrollIndicator={false}
                                    renderItem={renderHistory}
                                    contentContainerStyle={{ paddingBottom: 20 }}
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
                                        historyList && historyList.length > 0 ?
                                            <></>
                                            :
                                            <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                                                <Image source={IMAGE.NODATA} style={{ height: 150, width: 200, marginTop: HEIGHT * 0.2 }} resizeMode={KEY.CONTAIN} />
                                                <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.TAUPE_GRAY, marginTop: 10 }}>{languageConfig.norecordtext}</Text>
                                            </View>
                                    )}
                                />
                            </>
                        }

                        {status == languageConfig.historytext &&
                            <>
                                <FlatList
                                    style={{ marginTop: 5 }}
                                    data={bookingList}
                                    showsVerticalScrollIndicator={false}
                                    renderItem={renderBooking}
                                    contentContainerStyle={{ paddingBottom: 20 }}
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
                                        bookingList && bookingList.length > 0 ?
                                            <></>
                                            :
                                            <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                                                <Image source={IMAGE.NODATA} style={{ height: 150, width: 200, marginTop: HEIGHT * 0.2 }} resizeMode={KEY.CONTAIN} />
                                                <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.TAUPE_GRAY, marginTop: 10 }}>{languageConfig.norecordtext}</Text>
                                            </View>
                                    )}
                                />
                            </>
                        }
                    </>
                    :
                    loading == false ?
                        <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                            <Image source={IMAGE.NODATA} style={{ height: 150, width: 200, marginTop: HEIGHT * 0.2 }} resizeMode={KEY.CONTAIN} />
                            <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.TAUPE_GRAY, marginTop: 10 }}>{languageConfig.norecordtext}</Text>
                        </View>
                        : <Loader />
                }

                {/* <View style={STYLE.styles.container}>
                    <View style={STYLE.styles.img_card}>
                        <Image style={STYLE.styles.img} source={IMAGE.NO_PHOTO} />

                        <View style={{ flexDirection: KEY.COLUMN }}>
                            <View style={{ marginTop: 10, marginLeft: 10 }}>
                                <Text style={STYLE.styles.text}>{"Hair Cut"}</Text>
                            </View>
                            <View style={{ flexDirection: KEY.ROW, marginTop: 10 }}>
                                <Ionicons name='location-outline' size={20} color={COLOR.DEFAULTLIGHT} style={{ marginLeft: 5 }} />
                                <Text style={{ marginLeft: 8 }}>{"MPlace Mall"}</Text>
                            </View>
                            <View style={{ flexDirection: KEY.ROW, marginTop: 10 }}>
                                <Feather name='calendar' size={20} color={COLOR.DEFAULTLIGHT} style={{ marginLeft: 6 }} />
                                <Text style={{ marginLeft: 8 }}>{"Jan 08,2023 10 am"}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: KEY.COLUMN, flex: 1, justifyContent: KEY.SPACEBETWEEN, marginLeft: 35 }}>
                            <View style={{ marginTop: 10, justifyContent: KEY.FLEX_END, alignItems: KEY.CENTER }}>
                                <Text style={STYLE.styles.text}>{"$25"}</Text>
                            </View>
                            <View style={{ justifyContent: KEY.FLEX_END, alignItems: KEY.CENTER }}>
                                <TouchableOpacity style={STYLE.styles.upgrade} >
                                    <Text style={STYLE.styles.textbutton}>
                                        {'Cancle'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={STYLE.styles.container}>
                    <View style={STYLE.styles.img_card}>
                        <Image style={STYLE.styles.img} source={IMAGE.NO_PHOTO} />

                        <View style={{ flexDirection: KEY.COLUMN }}>
                            <View style={{ marginTop: 10, marginLeft: 10 }}>
                                <Text style={STYLE.styles.text}>{"Hair Colour"}</Text>
                            </View>
                            <View style={{ flexDirection: KEY.ROW, marginTop: 10 }}>
                                <Ionicons name='location-outline' size={20} color={COLOR.DEFAULTLIGHT} style={{ marginLeft: 5 }} />
                                <Text style={{ marginLeft: 8 }}>{"MPlace Mall"}</Text>
                            </View>
                            <View style={{ flexDirection: KEY.ROW, marginTop: 10 }}>
                                <Feather name='calendar' size={20} color={COLOR.DEFAULTLIGHT} style={{ marginLeft: 6 }} />
                                <Text style={{ marginLeft: 8 }}>{"Jan 08,2023 11 am"}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: KEY.COLUMN, flex: 1, justifyContent: KEY.SPACEBETWEEN, marginLeft: 35 }}>
                            <View style={{ marginTop: 10, justifyContent: KEY.FLEX_END, alignItems: KEY.CENTER, }}>
                                <Text style={STYLE.styles.text}>{"$25"}</Text>
                            </View>
                            <View style={{ justifyContent: KEY.FLEX_END, alignItems: KEY.CENTER, }}>
                                <TouchableOpacity style={STYLE.styles.upgrade} >
                                    <Text style={STYLE.styles.textbutton}>
                                        {'Cancle'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View> */}
            </ScrollView>
        </SafeAreaView>
    )
}

export default MyBooking;