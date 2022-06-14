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

const BookServiceScreen = (props) => {
    const today = moment().format('YYYY-MM-DD');
    const [loading, setLoading] = useState(false);
    const [memberInfo, setMemberInfo] = useState(null);
    const [memberID, setMemberID] = useState(null);
    const [selectionDate, setSelectionDate] = useState(null);

    //BOOK NOW BUTTON CLICK TO CALL FUNCTION
    const onPressBooking = () => {
        props.navigation.navigate(SCREEN.BOOKINGPAYMENTSCREEN);
    }

    useEffect(() => {
        setLoading(false);
        setSelectionDate(today);
        //LANGUAGE MANAGEMENT FUNCTION
        MemberLanguage();
        getMemberDeatilsLocalStorage();
    }, [])

    useEffect(() => {
    }, [memberInfo, memberID, selectionDate])

    //GET MEMBER DATA IN MOBILE LOCAL STORAGE
    const getMemberDeatilsLocalStorage = async () => {
        var memberInfo = await LocalService.LocalStorageService();
        if (memberInfo) {
            setMemberID(memberInfo._id);
            setMemberInfo(memberInfo);
            moment.tz.setDefault(memberInfo?.branchid?.timezone);
            let data = {
                id: memberInfo._id,
                datRange: { gte: moment(selectionDate ? selectionDate : today).format(), lte: selectionDate ? selectionDate : today }
            }
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
                <CalendarStrip
                    scrollable
                    style={{
                        height: 90,
                        paddingTop: 20,
                        paddingBottom: 10,
                        marginTop: 5,
                        marginBottom: 5,
                    }}
                    daySelectionAnimation={{
                        type: 'background', duration: 200,
                        borderWidth: 1, highlightColor: COLOR.DEFALUTCOLOR,
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
