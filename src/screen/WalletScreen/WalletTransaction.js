import React, { useEffect, useState } from 'react';
import {
    View, Text, Dimensions, SafeAreaView, ImageBackground, FlatList, RefreshControl,
    Image, TextInput, ScrollView, TouchableOpacity, StatusBar, Keyboard, Platform
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { RemoteServerController } from '../../services/LocalService/LocalService';
import { MemberLanguage } from '../../services/LocalService/LanguageService';
import crashlytics, { firebase } from "@react-native-firebase/crashlytics";
import languageConfig from '../../languages/languageConfig';
import { WallettxnsListService } from '../../services/BillService/BillService';
import * as LocalService from '../../services/LocalService/LocalService';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import * as SCREEN from '../../context/screen/screenName';
import Loader from '../../components/loader/index';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import Toast from 'react-native-simple-toast';
import styles from './WalletTransactionStyle';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import moment from 'moment';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
const ListTab = [
    {
        'status': languageConfig.alltext
    },
    {
        'status': languageConfig.PaidMoneyText
    },
    {
        'status': languageConfig.ReceivedMoneyText
    },
    {
        'status': languageConfig.AddedMoneyText
    }
]

const WalletTransaction = () => {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(languageConfig.alltext);
    const [memberID, setMemberID] = useState(null);
    const [refreshing, setrefreshing] = useState(false);
    const [wallateHistory, setwallateHistory] = useState([]);
    const [walletReceived, setwalletReceived] = useState([]);

    useEffect(() => {
        setLoading(true);
        //LANGUAGE MANAGEMENT FUNCTION
        MemberLanguage();
        getMemberDeatilsLocalStorage();
    }, []);

    useEffect(() => {
    }, [loading, memberID, status, refreshing, wallateHistory, walletReceived]);

    //Add Measurement Screen
    const setStatusFilter = (status, index) => {
        const tab = ListTab.map((item) => {
            item.selected = false;
            return item;
        });
        tab[index].selected = true;
        setStatus(status);
        if (status === languageConfig.PaidMoneyText) {
            let arry = [];
            wallateHistory.forEach(element => {
                if (element && element?.txntype == "Dr") {
                    arry.push(element);
                }
            });
            setwalletReceived(arry);
        }
        if (status === languageConfig.ReceivedMoneyText) {
            let arry = [];
            wallateHistory.forEach(element => {
                if (element && element?.txntype == "Cr") {
                    arry.push(element);
                }
            });
            setwalletReceived(arry);
        }
        if (status === languageConfig.AddedMoneyText) {
            let arry = [];
            wallateHistory.forEach(element => {
                if (element && element?.txntype == "Cr") {
                    arry.push(element);
                }
            });
            setwalletReceived(arry);
        }
        if (status === languageConfig.alltext) {
            setwalletReceived(wallateHistory)
        }
    }

    //GET MEMBER DATA IN MOBILE LOCAL STORAGE
    const getMemberDeatilsLocalStorage = async () => {
        var memberInfo = await LocalService.LocalStorageService();
        if (memberInfo) {
            setMemberID(memberInfo?._id);
            wallateBillList(memberInfo?._id);
        } else {
            setLoading(false);
        }
    }

    const wallateBillList = async (memberID) => {
        try {
            const response = await WallettxnsListService(memberID);
            if (response.data != null && response.data != 'undefind' && response.status === 200) {
                setLoading(false);
                setwallateHistory(response.data);
                setwalletReceived(response.data);
            }
        } catch (error) {
            setLoading(false);
            firebase.crashlytics().recordError(error);
            console.log(`error`, error);
        }
    }
    //RENDER RECHARGE HISTORY IN FLATLIST
    const renderRechargeHistory = ({ item, index }) => (
        item.txntype == 'Dr' ?
            <View style={styles.transactionView}>
                <View style={{
                    flexDirection: KEY.COLUMN, justifyContent: KEY.CENTER, alignItems: KEY.CENTER,
                    borderTopLeftRadius: 10, borderBottomLeftRadius: 10,
                    backgroundColor: COLOR.DEFALUTCOLOR, height: 70, width: WIDTH * 0.2
                }}>
                    <View style={{ marginTop: 0, marginBottom: 0 }}>
                        <Image source={IMAGE.WALLET} style={{ width: 40, height: 40, tintColor: COLOR.WHITE, marginTop: 20 }} />
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
                    }}>{'-' + item.value.toFixed(0) + ' ' + 'pts'}</Text>
                </View>
            </View>
            :
            <View style={styles.transactionView}>
                <View style={{
                    flexDirection: KEY.COLUMN, justifyContent: KEY.CENTER, alignItems: KEY.CENTER,
                    borderTopLeftRadius: 10, borderBottomLeftRadius: 10,
                    backgroundColor: COLOR.DEFALUTCOLOR, height: 70, width: WIDTH * 0.2
                }}>
                    <View style={{ marginTop: 0, marginBottom: 0 }}>
                        <Image source={IMAGE.WALLET} style={{ width: 40, height: 40, tintColor: COLOR.WHITE, marginTop: 20 }} />
                    </View>
                    <View style={{ height: 20, width: 20, borderRadius: 100, left: -15, top: -20, backgroundColor: COLOR.WHITE }} >
                        <MaterialCommunityIcons name='plus' size={15} style={{ color: COLOR.GREEN, alignSelf: KEY.CENTER, margin: 2 }} />
                    </View>
                </View>
                <View style={{ flexDirection: KEY.COLUMN, justifyContent: KEY.SPACEBETWEEN, marginTop: 12, marginBottom: 12 }}>
                    <Text numberOfLines={1}
                        style={{
                            fontSize: FONT.FONT_SIZE_14, marginLeft: 10, width: WIDTH / 2,
                            color: COLOR.BLACK, fontWeight: FONT.FONT_BOLD, color: COLOR.GREEN,
                        }}>{item.txnref}</Text>
                    <Text style={{ fontSize: FONT.FONT_SIZE_14, marginLeft: 10, color: COLOR.GRANITE_GRAY }}>{moment().format('DD MMM YYYY hh:mm a')}</Text>
                </View>
                <View style={{ flexDirection: KEY.COLUMN, justifyContent: KEY.SPACEBETWEEN, marginTop: 12, marginBottom: 12 }}>
                    <Text style={{
                        fontSize: FONT.FONT_SIZE_14, marginLeft: 10,
                        color: COLOR.BLACK, fontWeight: FONT.FONT_BOLD, color: COLOR.GREEN
                    }}>{'+' + item.value.toFixed(0) + ' ' + 'pts'}</Text>
                </View>
            </View>
    )
    //TIME OUT FUNCTION
    const wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    //GET PULL TO REFRESH FUNCTION
    const onRefresh = () => {
        setrefreshing(true);
        wallateBillList(memberID);
        wait(3000).then(() => setrefreshing(false));
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.STATUSBARCOLOR} barStyle={KEY.DARK_CONTENT} />
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.listTab}>
                    {
                        ListTab.map((g, item) => (
                            <TouchableOpacity style={[styles.deactiveTabStyle, status === g.status && styles.activeTabStyle]} onPress={() => setStatusFilter(g.status, item)}>
                                <Text style={[styles.deactiveTextStyle, status === g.status && styles.activeTextStyle]}>
                                    {g.status}
                                </Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>
            </ScrollView>
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                    <FlatList
                        style={{ marginTop: 10 }}
                        data={walletReceived}
                        keyExtractor={(item, index) => index.toString()}
                        keyboardShouldPersistTaps={KEY.ALWAYS}
                        renderItem={renderRechargeHistory}
                        contentContainerStyle={{ paddingBottom: 20, alignSelf: KEY.CENTER }}
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                title={languageConfig.pullrefreshtext}
                                tintColor={COLOR.DEFALUTCOLOR}
                                titleColor={COLOR.DEFALUTCOLOR}
                                colors={[COLOR.DEFALUTCOLOR]}
                                onRefresh={onRefresh} />
                        }
                        ListEmptyComponent={() => (
                            walletReceived && walletReceived.length == 0 &&
                            <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                                <Image source={IMAGE.NODATA} style={{ height: 150, width: 200, marginTop: HEIGHT * 0.2 }} resizeMode={KEY.CONTAIN} />
                                <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.TAUPE_GRAY, marginTop: 10 }}>{languageConfig.norecordtext}</Text>
                            </View>
                        )}
                    />
                </View>
            </ScrollView>
            {loading ? <Loader /> : null}
        </SafeAreaView>
    )
}

export default WalletTransaction;
