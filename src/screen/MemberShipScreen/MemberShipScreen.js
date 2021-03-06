import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Dimensions,
    SafeAreaView,
    ImageBackground,
    FlatList,
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
import Toast from 'react-native-simple-toast';
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
        branchname, membershipend, memberName, membershipList, loading])

    const getCallBackScreen = () => {
        //LANGUAGE MANAGEMENT FUNCTION
        MemberLanguage();
        if (memberInfo) {
            setLoading(true);
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
            const response = getCurrency(memberInfo.branchid.currency);
            setMemberInfo(memberInfo);
            setCurrencySymbol(response);
            setMemberProfilePic(memberInfo?.profilepic);
            setMemberName(memberInfo.fullname);
            setBranchname(memberInfo.branchid?.branchname);
            getMembershipList(memberInfo.branchid?._id)
            if (memberInfo && memberInfo.membershipid && memberInfo.membershipid != undefined) {
                setMembershipPlan(memberInfo.membershipid.membershipname);
                setMembershipcost(memberInfo.membershipid.property.cost);
                setMembershipstart(memberInfo.membershipstart);
                setMembershipend(memberInfo.membershipend);
            }
        }
    }

    //GET MEMBERSHIP DATA FETCH TI API CALL
    const getMembershipList = async (id) => {
        try {
            const response = await getByMembershipService(id);
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                setMembershipList(response.data);
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            firebase.crashlytics().recordError(error);
        }
    }

    //RENDER MEMBERSHIP LIST USING FLATLIST
    const renderMembership = ({ item }) => (
        <>
            <View style={{ flexDirection: KEY.ROW, marginTop: 10 }}>
                <View style={styles.rounfIconStyle}>
                    <MaterialCommunityIcons name='wallet-membership' size={20} color={COLOR.DEFALUTCOLOR} />
                </View>
                <View style={{ flexDirection: KEY.COLUMN, marginLeft: -2 }}>
                    <View style={{ marginLeft: 15 }}>
                        <Text numberOfLines={1} style={[styles.rectangleText, { fontSize: FONT.FONT_SIZE_16, width: WIDTH / 2, fontWeight: FONT.FONT_BOLD, color: COLOR.BLACK }]}>{item.property.membershipname}</Text>
                        <Text style={{
                            fontSize: FONT.FONT_SIZE_16, textTransform: KEY.CAPITALIZE, color: COLOR.BLACK,
                            fontWeight: FONT.FONT_BOLD, width: WIDTH / 2
                        }} numberOfLines={1}>{item.property.cost}</Text>
                    </View>
                </View>
                <View style={{ flex: 1, alignItems: KEY.FLEX_END, marginTop: 10 }}>
                    <TouchableOpacity style={styles.btnStyle} onPress={() => bookingMembershipRequest(item)}>
                        <Text style={{
                            fontWeight: FONT.FONT_BOLD, textTransform: KEY.CAPITALIZE,
                            color: COLOR.WHITE, fontSize: FONT.FONT_SIZE_12
                        }}>{languageConfig.booknowbtn}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.line} />
        </>
    )

    //ONPRESS TO MEMBERSHIP REQUEST
    const bookingMembershipRequest = () => {
        Toast.show(languageConfig.bookingMembershipRequest, Toast.SHORT);
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.STATUSBARCOLOR} barStyle={KEY.DARK_CONTENT} />
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                    <TouchableOpacity style={styles.viweRound}>
                        <Image source={!memberProfilePic ? IMAGE.USERPROFILE : { uri: memberProfilePic }}
                            style={{ height: 95, width: 95, borderRadius: 100 }} />
                    </TouchableOpacity>
                    <Text numberOfLines={1} style={styles.text}>{memberName}</Text>
                    <View style={{ flexDirection: KEY.ROW, alignItems: KEY.CENTER, marginTop: 5 }}>
                        <Ionicons name='location-outline' size={22} color={COLOR.DEFALUTCOLOR} />
                        <Text style={{ fontSize: FONT.FONT_SIZE_14, color: COLOR.GRANITE_GRAY, marginLeft: 5 }}>{branchname}</Text>
                    </View>
                </View>
                {memberInfo && memberInfo.membershipid &&
                    <View style={styles.viewMain}>
                        <View style={styles.viewRectangle}>
                            <Text style={styles.headertext}>{languageConfig.membership}</Text>
                            <View style={{ flexDirection: KEY.ROW, marginTop: 10, marginBottom: 5 }}>
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
                                    <TouchableOpacity style={styles.btnStyle} onPress={() => props.navigation.navigate(SCREEN.WALLETSCREEN)}>
                                        <Text style={{
                                            fontWeight: FONT.FONT_BOLD, textTransform: KEY.CAPITALIZE,
                                            color: COLOR.WHITE, fontSize: FONT.FONT_SIZE_14
                                        }}>{languageConfig.renew}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.lineView} />
                            <View style={{ flexDirection: KEY.ROW, marginTop: 5, alignSelf: KEY.FLEX_START }}>
                                <View style={styles.rounfIconStyle}>
                                    <Image style={{ width: 20, height: 15, tintColor: COLOR.DEFALUTCOLOR, }} source={IMAGE.MONEYICON} />
                                </View>
                                <View style={{ flexDirection: KEY.COLUMN, marginLeft: -2 }}>
                                    <View style={{ marginLeft: 15, marginBottom: 5 }}>
                                        <Text style={styles.rectangleText}>{languageConfig.amounttext}</Text>
                                        <Text style={{
                                            fontSize: FONT.FONT_SIZE_16, textTransform: KEY.UPPERCASE, color: COLOR.BLACK,
                                            fontWeight: FONT.FONT_BOLD
                                        }}>{currencySymbol + membershipcost}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.lineView} />
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
                            <View style={styles.lineView} />
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
                }
                {
                    membershipList && membershipList.length > 0 &&
                    <View style={styles.viewMain}>
                        <View style={styles.viewRectangle}>
                            <Text style={[styles.headertext, {}]}>{languageConfig.membershipplan}</Text>
                            <FlatList
                                style={{ marginTop: 5 }}
                                data={membershipList}
                                showsVerticalScrollIndicator={false}
                                renderItem={renderMembership}
                                contentContainerStyle={{ paddingBottom: 20 }}
                                keyExtractor={item => item._id}
                            />
                        </View>
                    </View>
                }
            </ScrollView>
            {loading ? <Loader /> : null}
        </SafeAreaView>
    )
}

export default MemberShipScreen;
