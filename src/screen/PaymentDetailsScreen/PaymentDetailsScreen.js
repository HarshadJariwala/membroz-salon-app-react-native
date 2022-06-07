import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    Text,
    Dimensions,
    View,
    TouchableOpacity,
    Image,
    StatusBar, FlatList, RefreshControl
} from 'react-native';
import { PaymentHistoryService, PaymentScheduleService } from '../../services/PaymentService/PaymentService';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { MemberLanguage } from '../../services/LocalService/LanguageService';
import crashlytics, { firebase } from "@react-native-firebase/crashlytics";
import * as LocalService from '../../services/LocalService/LocalService';
import getCurrency from '../../services/getCurrencyService/getCurrency';
import languageConfig from '../../languages/languageConfig';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import * as SCREEN from '../../context/screen/screenName';
import Loader from '../../components/loader/index';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import styles from './PaymentDetailStyle';
import moment from 'moment';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const ListTab = [
    {
        'status': languageConfig.paymentdue
    },
    {
        'status': languageConfig.historytext
    }

]

const PaymentDetailsScreen = (props) => {
    const [status, setStatus] = useState(languageConfig.historytext);
    const [loading, setLoading] = useState(false);
    const [historyList, setHistoryList] = useState([]);
    const [paymentScheduleList, setpaymentScheduleList] = useState([]);
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

    useEffect(() => {
    }, [loading, memberID, status, historyList, paymentScheduleList, currencySymbol, refreshing, memderInfo]);

    //OPEN PAYMENT SCREEN
    const openPaymentScreen = async (item) => {
        props.navigation.navigate(SCREEN.DOWNPAYMENTSCREEN, { item });
    }

    const onRefresh = () => {
        setrefreshing(true);
        getPaymentScheduleList(memberID);
        getHistoryList(memberID);
        wait(3000).then(() => setrefreshing(false));
    }

    //TIME OUT FUNCTION
    const wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    //GET MEMBER DATA IN MOBILE LOCAL STORAGE
    const getMemberDeatilsLocalStorage = async () => {
        var memderInfo = await LocalService.LocalStorageService();
        const response = getCurrency(memderInfo.branchid.currency);
        setCurrencySymbol(response);
        setMemberID(memderInfo._id);
        setMemderInfo(memderInfo);
        await getHistoryList(memderInfo._id);
        await getPaymentScheduleList(memderInfo._id);
    }

    //GET HISTORY LIST USING API 
    const getHistoryList = async (id) => {
        try {
            const response = await PaymentHistoryService(id);
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                wait(1000).then(() => {
                    setLoading(false);
                    setHistoryList(response.data);
                });
            }
        } catch (error) {
            firebase.crashlytics().recordError(error);
            setLoading(false);
        }
    }

    //GET PAYMENT SCHEDULE LIST USING API 
    const getPaymentScheduleList = async (id) => {
        try {
            const response = await PaymentScheduleService(id);
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                wait(1000).then(() => {
                    setLoading(false);
                    setpaymentScheduleList(response.data);
                });
            }
        } catch (error) {
            firebase.crashlytics().recordError(error);
            setLoading(false);
        }
    }

    //RENDER HISTORY LIST USING FLATLIST
    const renderHistory = ({ item }) => (
        <View>
            <TouchableOpacity style={{ justifyContent: KEY.SPACEBETWEEN, alignItems: KEY.CENTER, flexDirection: KEY.ROW, marginTop: 5 }}>
                <View style={{ justifyContent: KEY.FLEX_START, flexDirection: KEY.ROW, alignItems: KEY.CENTER, marginLeft: 20 }}>
                    <View style={styles.rounfIconStyle}>
                        {/* <FONTAWESOME5 NAME='MONEY-BILL-WAVE-ALT' SIZE={20} COLOR={COLOR.DEFALUTCOLOR} /> */}
                        <Image style={{ width: 20, height: 15, tintColor: COLOR.DEFALUTCOLOR, }} source={IMAGE.MONEYICON} />
                    </View>
                    <View style={{ flexDirection: KEY.COLUMN, alignItems: KEY.FLEX_START, marginLeft: 20, width: 150 }}>
                        <Text style={{ fontSize: FONT.FONT_SIZE_16, textTransform: KEY.CAPITALIZE, color: COLOR.BLACK, fontWeight: FONT.FONT_BOLD }}>
                            {item && item.item && item.item.paymentterms && item.item.paymentterms.paymentitem && item.item.paymentterms.paymentitem.paymentitemname ? item.item.paymentterms.paymentitem.paymentitemname : languageConfig.noterms}</Text>
                        <Text style={styles.text}>{moment(item && item.paymentdate).format('lll')}</Text>
                    </View>
                </View>
                <View style={{ justifyContent: KEY.FLEX_END, marginRight: 20 }}>
                    <Text style={{ color: COLOR.BLACK, fontWeight: FONT.FONT_BOLD, fontSize: FONT.FONT_SIZE_14 }}>{currencySymbol + Number(item && item.paidamount).toFixed(2)}</Text>

                </View>
            </TouchableOpacity>
            <View style={{ borderBottomColor: COLOR.BRIGHT_GRAY, borderBottomWidth: 1, marginTop: 10, marginRight: 15, marginLeft: 15 }} />
        </View>
    )

    //RENDER PAYMENT LIST USING FLATLIST
    const renderPaymentSchedule = ({ item }) => (
        <View>
            <TouchableOpacity onPress={() => openPaymentScreen(item)}
                style={{ justifyContent: KEY.SPACEBETWEEN, alignItems: KEY.CENTER, flexDirection: KEY.ROW, marginTop: 5 }}>
                <View style={{ justifyContent: KEY.FLEX_START, flexDirection: KEY.ROW, alignItems: KEY.CENTER, marginLeft: 20 }}>
                    <View style={styles.rounfIconStyle}>
                        <Image style={{ width: 20, height: 15, tintColor: COLOR.DEFALUTCOLOR, }} source={IMAGE.MONEYICON} />
                    </View>
                    <View style={{ flexDirection: KEY.COLUMN, alignItems: KEY.FLEX_START, marginLeft: 20, width: 150 }}>
                        <Text style={{ fontSize: FONT.FONT_SIZE_16, textTransform: KEY.CAPITALIZE, color: COLOR.BLACK, fontWeight: FONT.FONT_BOLD }}>
                            {item && item.paymentterms && item.paymentterms.paymentitem && item.paymentterms.paymentitem.paymentitemname ? item.paymentterms.paymentitem.paymentitemname : languageConfig.noterms}</Text>
                        <Text style={styles.text}>{moment(item && item.paymentdate).format('ll')}</Text>
                    </View>
                </View>
                <View style={{ justifyContent: KEY.FLEX_END, marginRight: 20, flexDirection: KEY.ROW, alignItems: KEY.CENTER }}>
                    <Text style={{ color: COLOR.BLACK, fontWeight: FONT.FONT_BOLD, fontSize: FONT.FONT_SIZE_14 }}>{currencySymbol + Number(item && item.balance).toFixed(2)}</Text>
                    <EvilIcons name='chevron-right' size={30} color={COLOR.BLACK} style={{ marginLeft: 10 }} />
                </View>
            </TouchableOpacity>
            <View style={{ borderBottomColor: COLOR.BRIGHT_GRAY, borderBottomWidth: 1, marginTop: 10, marginRight: 15, marginLeft: 15 }} />
        </View>
    )

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.STATUSBARCOLOR} barStyle={KEY.DARK_CONTENT} />
            {(historyList && historyList.length > 0) || (paymentScheduleList && paymentScheduleList.length > 0)
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
                        status == languageConfig.historytext &&
                        <>
                            <Text style={{
                                fontSize: FONT.FONT_SIZE_18, color: COLOR.BLACK,
                                marginTop: 10, marginLeft: 20, fontWeight: FONT.FONT_BOLD
                            }}>{languageConfig.recenettransactions}</Text>
                            <View style={styles.viewMain}>
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
                            </View>
                        </>
                    }

                    {status == languageConfig.paymentdue &&
                        <>
                            <Text style={{
                                fontSize: FONT.FONT_SIZE_18, color: COLOR.BLACK,
                                marginTop: 10, marginLeft: 20, fontWeight: FONT.FONT_BOLD
                            }}>{languageConfig.paymentdue}</Text>
                            <View style={styles.viewMain}>
                                <FlatList
                                    style={{ marginTop: 5 }}
                                    data={paymentScheduleList}
                                    showsVerticalScrollIndicator={false}
                                    renderItem={renderPaymentSchedule}
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
                                        paymentScheduleList && paymentScheduleList.length > 0 ?
                                            <></>
                                            :
                                            <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                                                <Image source={IMAGE.NODATA} style={{ height: 150, width: 200, marginTop: HEIGHT * 0.2 }} resizeMode={KEY.CONTAIN} />
                                                <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.TAUPE_GRAY, marginTop: 10 }}>{languageConfig.norecordtext}</Text>
                                            </View>
                                    )}
                                />
                            </View>
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
        </SafeAreaView>
    )
}

export default PaymentDetailsScreen;