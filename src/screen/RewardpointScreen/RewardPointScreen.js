import React, { useEffect, useState } from 'react';
import {
    View, Text, Dimensions, SafeAreaView, FlatList, RefreshControl,
    Image, TextInput, ScrollView, TouchableOpacity, StatusBar, Keyboard, Platform
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { RemoteServerController } from '../../services/LocalService/LocalService';
import { MemberLanguage } from '../../services/LocalService/LanguageService';
import crashlytics, { firebase } from "@react-native-firebase/crashlytics";
import languageConfig from '../../languages/languageConfig';
import { WalletDetailService } from '../../services/BillService/BillService';
import * as LocalService from '../../services/LocalService/LocalService';
import * as SCREEN from '../../context/screen/screenName';
import { OfferService } from '../../services/OfferService/OfferService';
import Loader from '../../components/loader/index';
import RenderHTML from 'react-native-render-html';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import Toast from 'react-native-simple-toast';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import styles from './RewardPointStyle';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const RewardPointScreen = (props) => {
    const [loading, setLoading] = useState(false);
    const [memberID, setMemberID] = useState(null);
    const [rewaredpointlist, setrewardPointlist] = useState([]);
    const [walletBalance, setwalletBalance] = useState(null);
    const [refreshing, setrefreshing] = useState(false);

    useEffect(() => {
        //LANGUAGE MANAGEMENT FUNCTION
        MemberLanguage();
        getrewardList();
        getMemberDeatilsLocalStorage();
    }, []);

    useEffect(() => {
    }, [loading, rewaredpointlist, memberID, walletBalance]);

    //GET MEMBER DATA IN MOBILE LOCAL STORAGE
    const getMemberDeatilsLocalStorage = async () => {
        var memberInfo = await LocalService.LocalStorageService();
        if (memberInfo) {
            setMemberID(memberInfo?._id);
            getWallatBalance(memberInfo?._id);
        }
    }

    //GET FETCH REWARD POINT DATA FROM API
    const getrewardList = async () => {
        setLoading(true);
        try {
            const response = await OfferService();
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                setrewardPointlist(response.data);
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            firebase.crashlytics().recordError(error);
        }
    }

    //OFFERS RENDER FUNCTION
    const renderRewardPoint = ({ item }) => (
        <TouchableOpacity style={{ marginBottom: 0 }}>
            <TouchableOpacity style={styles.viewSquareTwoColumn}>
                <Text numberOfLines={1} style={styles.titleText}>
                    {item.couponcode}
                </Text>
                {
                    item.appliedcouponper &&
                    <Text numberOfLines={4} style={styles.descripationText}>
                        <RenderHTML
                            contentWidth={WIDTH / 3} source={{ html: item.appliedcouponper }}
                            baseStyle={styles.tagsStyles}
                        />
                    </Text>
                }
                <View style={styles.rewardpointStyle}>
                    <Text style={styles.rewardpointtext}>{item.value + ' ' + "points"}</Text>
                </View>
            </TouchableOpacity>
        </TouchableOpacity>
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
        getrewardList();
        wait(3000).then(() => setrefreshing(false));
    }

    //GET WALLATE BALANCE API CALL
    const getWallatBalance = async (memberID) => {
        try {
            const response = await WalletDetailService(memberID);
            if (response.data != null && response.data != undefined && response.status === 200) {
                setwalletBalance(
                    response.data && response.data[0] && response.data[0].walletbalance
                        ? response.data[0].walletbalance.toFixed(2) :
                        '0'
                );
            }
        } catch (error) {
            setLoading(false);
            firebase.crashlytics().recordError(error);
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.STATUSBARCOLOR} barStyle={KEY.DARK_CONTENT} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.viewMain}>
                    <View style={styles.viewRectangle}>
                        <View style={styles.rounfIconStyle}>
                            <Image source={IMAGE.REWARDPOINT} style={{ height: 25, width: 20, tintColor: COLOR.DEFALUTCOLOR }} />
                        </View>
                        <Text style={{
                            fontSize: FONT.FONT_SIZE_16, textTransform: KEY.CAPITALIZE, color: COLOR.BLACK,
                            fontWeight: FONT.FONT_BOLD, marginTop: 5
                        }}>{languageConfig.yourrewardpoint}</Text>
                        <Text style={{
                            fontSize: FONT.FONT_SIZE_22, textTransform: KEY.CAPITALIZE, color: COLOR.BLACK,
                            fontWeight: FONT.FONT_BOLD, marginTop: 5, marginBottom: 10
                        }}>{walletBalance}</Text>
                        <TouchableOpacity onPress={() => props.navigation.navigate(SCREEN.REWARDPOINTTRANSACTION)}>
                            <Text style={{
                                fontSize: FONT.FONT_SIZE_16, textTransform: KEY.CAPITALIZE,
                                color: COLOR.DEFALUTCOLOR, marginBottom: 15, fontWeight: FONT.FONT_BOLD
                            }}>{languageConfig.pointhistory}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{
                    flexDirection: KEY.ROW, marginTop: 10,
                    alignSelf: KEY.FLEX_START, marginLeft: 20
                }}>
                    <Text style={{
                        fontSize: FONT.FONT_SIZE_18, color: COLOR.BLACK,
                        fontWeight: FONT.FONT_BOLD
                    }}>{languageConfig.redeemtext}</Text>
                    <Text style={{
                        fontSize: FONT.FONT_SIZE_18, textTransform: KEY.CAPITALIZE, color: COLOR.BLACK,
                        fontWeight: FONT.FONT_BOLD, marginLeft: 5
                    }}>{languageConfig.pointtext}</Text>
                </View>
                <FlatList
                    style={{ marginTop: 0 }}
                    data={rewaredpointlist}
                    numColumns={2}
                    keyExtractor={(item, index) => index.toString()}
                    keyboardShouldPersistTaps={KEY.ALWAYS}
                    renderItem={renderRewardPoint}
                    contentContainerStyle={{ paddingBottom: 20, alignSelf: KEY.CENTER }}
                    refreshControl={
                        < RefreshControl
                            refreshing={refreshing}
                            title={languageConfig.pullrefreshtext}
                            tintColor={COLOR.DEFALUTCOLOR}
                            titleColor={COLOR.DEFALUTCOLOR}
                            colors={[COLOR.DEFALUTCOLOR]}
                            onRefresh={onRefresh} />
                    }
                    ListEmptyComponent={() => (
                        rewaredpointlist && rewaredpointlist.length == 0 &&
                        <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                            <Image source={IMAGE.NODATA} style={{ height: 150, width: 200, marginTop: HEIGHT * 0.2 }} resizeMode={KEY.CONTAIN} />
                            <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.TAUPE_GRAY, marginTop: 10 }}>{languageConfig.norecordtext}</Text>
                        </View>
                    )}
                />
            </ScrollView>
            {loading ? <Loader /> : null}
        </SafeAreaView>
    )
}

export default RewardPointScreen;
