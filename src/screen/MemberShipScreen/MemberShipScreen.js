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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { getByMembershipService } from '../../services/MemberService/MemberService';
import { MemberLanguage } from '../../services/LocalService/LanguageService';
import crashlytics, { firebase } from "@react-native-firebase/crashlytics";
import * as LocalService from '../../services/LocalService/LocalService';
import getCurrency from '../../services/getCurrencyService/getCurrency';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import languageConfig from '../../languages/languageConfig';
import * as SCREEN from '../../context/screen/screenName';
import { useFocusEffect } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Loader from '../../components/loader/index';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import styles from './MemberShipStyle';
import moment from 'moment';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const MemberShipScreen = (props) => {
    const [loading, setLoading] = useState(false);
    const [currencySymbol, setCurrencySymbol] = useState(null);
    const [memberProfilePic, setMemberProfilePic] = useState(null);
    const [memberNumber, setMemberNumber] = useState(null);
    const [memberName, setMemberName] = useState(null);
    const [membershipPlan, setMembershipPlan] = useState(null);
    const [memberInfo, setMemberInfo] = useState(null);
    const [membershipcost, setMembershipcost] = useState(null);
    const [membershipstart, setMembershipstart] = useState(null);
    const [membershipend, setMembershipend] = useState(null);
    const [branchname, setBranchname] = useState(null);
    const [membershipList, setMembershipList] = useState(null);

    useFocusEffect(
        React.useCallback(() => {
            getCallBackScreen();
        }, [])
    );

    useEffect(() => {
        //LANGUAGE MANAGEMENT FUNCTION
        MemberLanguage();
        // CHECK REMOTECONTROLLER USE TO AUTOCONFIG APP
        getMemberDeatilsLocalStorage();
    }, []);

    useEffect(() => {
    }, [membershipPlan, membershipcost, memberProfilePic, membershipstart,
        branchname, membershipend, memberName])

    const getCallBackScreen = () => {
        //LANGUAGE MANAGEMENT FUNCTION
        MemberLanguage();
        if (memberInfo) {
            setLoading(false);
            setMembershipPlan(memberInfo?.membershipid?.property?.membershipname);
            setMembershipcost(memberInfo?.membershipid?.property?.cost);
            setMembershipstart(memberInfo.membershipstart);
            setMembershipend(memberInfo.membershipend);
            setBranchname(memberInfo.branchid.branchname);
            setMemberName(memberInfo?.fullname);
        }
    }

    //GET MEMBER DATA IN MOBILE LOCAL STORAGE
    const getMemberDeatilsLocalStorage = async () => {
        var memberInfo = await LocalService.LocalStorageService();
        if (memberInfo) {
            console.log("memberInfo", memberInfo);
            const response = getCurrency(memberInfo.branchid.currency);
            setMemberInfo(memberInfo);
            setCurrencySymbol(response);
            setMemberProfilePic(memberInfo?.profilepic);
            setMemberNumber(memberInfo.membernumber);
            setMemberName(memberInfo.fullname);
            setMembershipPlan("abc");
            setMembershipcost(200);
            setMembershipstart(new Date());
            setMembershipend(new Date());
            setBranchname(memberInfo.branchid?.branchname);
            getMembershipList(memberInfo.branchid?._id)
        }
    }

    const getMembershipList = (id) => {
        try {
            const response = await getByMembershipService(id);
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                setMembershipList(response.data);
                setLoading(false);
            }
        } catch (error) {
            console.log(`error`, error);
            setLoading(false);
            firebase.crashlytics().recordError(error);
        }
    }

    // //RENDER MEMBERSHIP LIST USING FLATLIST
    // const renderMembership = ({ item }) => (
    //     <View>
    //         <TouchableOpacity style={{ justifyContent: KEY.SPACEBETWEEN, alignItems: KEY.CENTER, flexDirection: KEY.ROW, marginTop: 5 }}>
    //             <View style={{ justifyContent: KEY.FLEX_START, flexDirection: KEY.ROW, alignItems: KEY.CENTER, marginLeft: 20 }}>
    //                 <View style={styles.rounfIconStyle}>
    //                     {/* <FONTAWESOME5 NAME='MONEY-BILL-WAVE-ALT' SIZE={20} COLOR={COLOR.DEFALUTCOLOR} /> */}
    //                     <Image style={{ width: 20, height: 15, tintColor: COLOR.DEFALUTCOLOR, }} source={IMAGE.MONEYICON} />
    //                 </View>
    //                 <View style={{ flexDirection: KEY.COLUMN, alignItems: KEY.FLEX_START, marginLeft: 20, width: 150 }}>
    //                     <Text style={{ fontSize: FONT.FONT_SIZE_16, textTransform: KEY.CAPITALIZE, color: COLOR.BLACK, fontWeight: FONT.FONT_BOLD }}>
    //                         {item && item.item && item.item.paymentterms && item.item.paymentterms.paymentitem && item.item.paymentterms.paymentitem.paymentitemname ? item.item.paymentterms.paymentitem.paymentitemname : languageConfig.noterms}</Text>
    //                     <Text style={styles.text}>{moment(item && item.paymentdate).format('lll')}</Text>
    //                 </View>
    //             </View>
    //             <View style={{ justifyContent: KEY.FLEX_END, marginRight: 20 }}>
    //                 <Text style={{ color: COLOR.BLACK, fontWeight: FONT.FONT_BOLD, fontSize: FONT.FONT_SIZE_14 }}>{currencySymbol + Number(item && item.paidamount).toFixed(2)}</Text>

    //             </View>
    //         </TouchableOpacity>
    //         <View style={{ borderBottomColor: COLOR.BRIGHT_GRAY, borderBottomWidth: 1, marginTop: 10, marginRight: 15, marginLeft: 15 }} />
    //     </View>
    // )

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.STATUSBARCOLOR} barStyle={KEY.DARK_CONTENT} />
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                    <TouchableOpacity style={styles.viweRound}>
                        <Image source={!memberProfilePic ? IMAGE.USERPROFILE : { uri: memberProfilePic }}
                            style={{ height: 95, width: 95, borderRadius: 100 }} />
                    </TouchableOpacity>
                    <Text style={styles.text}>{memberName}</Text>
                    <View style={{ flexDirection: KEY.ROW, alignItems: KEY.CENTER, marginTop: 5 }}>
                        <Ionicons name='location-outline' size={22} color={COLOR.DEFALUTCOLOR} />
                        <Text style={{ fontSize: FONT.FONT_SIZE_14, color: COLOR.GRANITE_GRAY, marginLeft: 5 }}>{branchname}</Text>
                    </View>
                </View>

                <View style={styles.viewMain}>
                    <View style={styles.viewRectangle}>
                        <Text style={styles.headertext}>{languageConfig.membership}</Text>
                        <View style={{ flexDirection: KEY.ROW, marginTop: 10 }}>
                            <View style={styles.rounfIconStyle}>
                                <MaterialCommunityIcons name='wallet-membership' size={20} color={COLOR.DEFALUTCOLOR} />
                            </View>
                            <View style={{ flexDirection: KEY.COLUMN, marginLeft: -2 }}>
                                <View style={{ marginLeft: 15 }}>
                                    <Text style={styles.rectangleText}>{languageConfig.membershipplan}</Text>
                                    <Text style={{
                                        fontSize: FONT.FONT_SIZE_16, textTransform: KEY.CAPITALIZE, color: COLOR.BLACK,
                                        fontWeight: FONT.FONT_BOLD, width: WIDTH / 2
                                    }} numberOfLines={1}>{membershipPlan}</Text>
                                </View>
                            </View>
                            <View style={{ flex: 1, alignItems: KEY.FLEX_END, marginTop: 10 }}>
                                <TouchableOpacity style={styles.btnStyle} >
                                    <Text style={{
                                        fontWeight: FONT.FONT_BOLD, textTransform: KEY.CAPITALIZE,
                                        color: COLOR.WHITE, fontSize: FONT.FONT_SIZE_14
                                    }}>{languageConfig.renew}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{
                            borderWidth: 0.2, marginTop: 15, borderColor: COLOR.LINE_COLOR,
                            marginRight: 15, marginLeft: 15, width: WIDTH - 60
                        }} />
                        <View style={{ flexDirection: KEY.ROW, marginTop: 5, alignSelf: KEY.FLEX_START }}>
                            <View style={styles.rounfIconStyle}>
                                <Image style={{ width: 20, height: 15, tintColor: COLOR.DEFALUTCOLOR, }} source={IMAGE.MONEYICON} />
                            </View>
                            <View style={{ flexDirection: KEY.COLUMN, marginLeft: -2 }}>
                                <View style={{ marginLeft: 15, marginBottom: 10 }}>
                                    <Text style={styles.rectangleText}>{languageConfig.amounttext}</Text>
                                    <Text style={{
                                        fontSize: FONT.FONT_SIZE_16, textTransform: KEY.UPPERCASE, color: COLOR.BLACK,
                                        fontWeight: FONT.FONT_BOLD
                                    }}>{currencySymbol + membershipcost}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{
                            borderWidth: 0.2, marginTop: 5, borderColor: COLOR.LINE_COLOR,
                            marginRight: 15, marginLeft: 15, width: WIDTH - 60
                        }} />
                        <View style={{ flexDirection: KEY.ROW, marginTop: 5, alignSelf: KEY.FLEX_START }}>
                            <View style={styles.rounfIconStyle}>
                                <MaterialCommunityIcons name='calendar-outline' size={24} color={COLOR.DEFALUTCOLOR} />
                            </View>
                            <View style={{ flexDirection: KEY.COLUMN, marginLeft: -2 }}>
                                <View style={{ marginLeft: 15, marginBottom: 10 }}>
                                    <Text style={styles.rectangleText}>{languageConfig.membershipstartdate}</Text>
                                    <Text style={{
                                        fontSize: FONT.FONT_SIZE_16, textTransform: KEY.UPPERCASE, color: COLOR.BLACK,
                                        fontWeight: FONT.FONT_BOLD
                                    }}>{moment(membershipstart).format('MMMM DD,YYYY')}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{
                            borderWidth: 0.2, marginTop: 5, borderColor: COLOR.LINE_COLOR,
                            marginRight: 15, marginLeft: 15, width: WIDTH - 60
                        }} />
                        <View style={{ flexDirection: KEY.ROW, marginTop: 5, alignSelf: KEY.FLEX_START }}>
                            <View style={styles.rounfIconStyle}>
                                <MaterialCommunityIcons name='calendar-outline' size={24} color={COLOR.DEFALUTCOLOR} />
                            </View>
                            <View style={{ flexDirection: KEY.COLUMN, marginLeft: -2 }}>
                                <View style={{ marginLeft: 15, marginBottom: 10 }}>
                                    <Text style={styles.rectangleText}>{languageConfig.membershipenddate}</Text>
                                    <Text style={{
                                        fontSize: FONT.FONT_SIZE_16, textTransform: KEY.UPPERCASE, color: COLOR.BLACK,
                                        fontWeight: FONT.FONT_BOLD
                                    }}>{moment(membershipend).format('MMMM DD,YYYY')}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default MemberShipScreen;
