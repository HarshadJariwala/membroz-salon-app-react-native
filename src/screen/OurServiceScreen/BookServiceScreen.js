import React, { useEffect, useState } from 'react';
import {
    View, Text, Dimensions, SafeAreaView, FlatList, RefreshControl,
    Image, TextInput, ScrollView, TouchableOpacity, StatusBar, Keyboard, Platform, Share
} from 'react-native';
import { MemberLanguage } from '../../services/LocalService/LanguageService';
import crashlytics, { firebase } from "@react-native-firebase/crashlytics";
import * as LocalService from '../../services/LocalService/LocalService';
import getCurrency from '../../services/getCurrencyService/getCurrency';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import languageConfig from '../../languages/languageConfig';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as SCREEN from '../../context/screen/screenName';
import Feather from 'react-native-vector-icons/Feather';
import CalendarStrip from 'react-native-calendar-strip';
import Loader from '../../components/loader/index';
import RenderHTML from 'react-native-render-html';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import Toast from 'react-native-simple-toast';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import styles from './BookServiceStyle';
import moment from 'moment';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const BookServiceScreen = (props) => {
    const ServiceDetails = props.route.params.item;
    const today = moment().format('YYYY-MM-DD');
    const [logo, setLogo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [memberInfo, setMemberInfo] = useState(null);
    const [memberID, setMemberID] = useState(null);
    const [selectionDate, setSelectionDate] = useState(null);
    const [currencySymbol, setCurrencySymbol] = useState(null);

    //BOOK NOW BUTTON CLICK TO CALL FUNCTION
    const onPressBooking = () => {
        props.navigation.navigate(SCREEN.BOOKINGPAYMENTSCREEN);
    }

    useEffect(() => {
        setLoading(true);
        setSelectionDate(today);
        RemoteController();
        //LANGUAGE MANAGEMENT FUNCTION
        MemberLanguage();
        getMemberDeatilsLocalStorage();
    }, [])

    useEffect(() => {
    }, [memberInfo, memberID, selectionDate])

    //REMOTE DATA FATCH IN LOCAL STORAGE
    const RemoteController = async () => {
        var userData = await LocalService.RemoteServerController();
        if (userData) {
            setLogo(userData.applogo);
        }
    };

    //GET MEMBER DATA IN MOBILE LOCAL STORAGE
    const getMemberDeatilsLocalStorage = async () => {
        try {
            var memberInfo = await LocalService.LocalStorageService();
            const response = getCurrency(memberInfo.branchid.currency);
            if (memberInfo) {
                setCurrencySymbol(response);
                setMemberID(memberInfo._id);
                setMemberInfo(memberInfo);
                setLoading(false);
            } else {
                setLoading(false);
            }
        } catch (error) {
            console.log(`error`, error);
        }

    }

    //SELECTDATETOGETCLASSLIST USING API
    const selectDateToGetClassList = (selectDate) => {
        selectDate = moment(selectDate).format();
        setSelectionDate(selectDate);
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.STATUSBARCOLOR} barStyle={KEY.DARK_CONTENT} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={{
                    fontSize: FONT.FONT_SIZE_18, color: COLOR.BLACK,
                    fontWeight: FONT.FONT_BOLD, marginLeft: 15, marginTop: 10
                }}>{languageConfig.ordersummarytext}</Text>
                <View style={styles.img_card}>
                    <Image style={styles.img}
                        source={{ uri: ServiceDetails && ServiceDetails.gallery && ServiceDetails.gallery[0] && ServiceDetails.gallery[0].attachment ? ServiceDetails.gallery[0].attachment : logo }} />
                    <View style={{ flexDirection: KEY.COLUMN, marginLeft: 10, width: WIDTH - 140 }}>
                        <View style={{ flexDirection: KEY.ROW, marginTop: 10, justifyContent: KEY.SPACEBETWEEN }}>
                            <Text numberOfLines={1} style={[styles.text, { width: WIDTH / 2 }]}>{ServiceDetails && ServiceDetails.title}</Text>
                            <Text style={{
                                fontSize: FONT.FONT_SIZE_16,
                                color: COLOR.BLACK,
                                fontWeight: FONT.FONT_BOLD,
                                marginRight: 10
                            }}>{currencySymbol + (ServiceDetails && ServiceDetails.charges)}</Text>
                        </View>
                        <View style={{ flexDirection: KEY.ROW, marginTop: 5 }}>
                            <Ionicons name='location-outline' size={20} color={COLOR.DEFALUTCOLOR} />
                            <Text numberOfLines={1}
                                style={{ marginLeft: 5, fontSize: FONT.FONT_SIZE_14, color: COLOR.BLACK, width: WIDTH / 3 }}>
                                {ServiceDetails && ServiceDetails.title}
                            </Text>
                        </View>
                        <View style={{ flexDirection: KEY.ROW }}>
                            <View style={{ flexDirection: KEY.ROW, marginTop: 5, marginLeft: 2 }}>
                                <Image source={IMAGE.TIMEICON} style={{ tintColor: COLOR.DEFALUTCOLOR, height: 20, width: 16 }} />
                                <Text style={{ marginLeft: 7, fontSize: FONT.FONT_SIZE_14, color: COLOR.BLACK }}>
                                    {ServiceDetails && ServiceDetails.duration ? ServiceDetails.duration + ' ' + languageConfig.mintext : '--'}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.cardView}>
                    <CalendarStrip
                        scrollable
                        style={{
                            height: 90,
                            paddingTop: 20,
                            paddingBottom: 10,
                            marginTop: 5,
                            marginBottom: 5,
                            width: WIDTH - 30
                        }}
                        daySelectionAnimation={{
                            type: 'background', duration: 200,
                            borderWidth: 1,
                            highlightColor: COLOR.DEFALUTCOLOR,
                            textTransform: KEY.LOWERCASE
                        }}
                        calendarColor={COLOR.WHITE}
                        calendarHeaderStyle={{ color: COLOR.BLACK, fontSize: FONT.FONT_SIZE_16, textTransform: KEY.LOWERCASE, marginTop: -15, marginBottom: 15 }} //Header Text
                        dateNumberStyle={styles.dateNumberStyle} //date Number
                        dateNameStyle={styles.dateNameStyle} // date Name                                        
                        highlightDateNumberStyle={{ color: COLOR.WHITE, fontSize: FONT.FONT_SIZE_16, textTransform: KEY.LOWERCASE }} //hightlight date Number
                        highlightDateNameStyle={{ color: COLOR.WHITE, fontSize: FONT.FONT_SIZE_14, textTransform: KEY.LOWERCASE, fontWeight: FONT.BOLD }} // hightlight  date Name
                        selectedDate={Date(selectionDate ? selectionDate : today)}
                        iconLeft={IMAGE.LEFTSIDE}
                        iconRight={IMAGE.RIGHTSIDE}
                        iconLeftStyle={styles.iconleftStyle}
                        iconRightStyle={styles.iconrightStyle}
                        onDateSelected={(date) => selectDateToGetClassList(date)}
                        iconStyle={styles.iconStyle}
                    />
                </View>

                <TouchableOpacity style={styles.bookButton} onPress={() => onPressBooking()}>
                    <Text style={{
                        fontWeight: FONT.FONT_BOLD, color: COLOR.WHITE,
                        fontSize: FONT.FONT_SIZE_18, textTransform: KEY.CAPITALIZE
                    }}>{languageConfig.continuetext}</Text>
                </TouchableOpacity>
            </ScrollView>
            {loading ? <Loader /> : null}
        </SafeAreaView>
    )
}

export default BookServiceScreen;
