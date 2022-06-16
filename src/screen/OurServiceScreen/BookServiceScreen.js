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
    const [timeSlots, setTimeSlots] = useState([]);
    const [time, setTime] = useState(null);

    useEffect(() => {
        setLoading(true);
        setSelectionDate(today);
        generatingTS(ServiceDetails);
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

    const generatingTS = (service) => {
        if (service) {
            var timeslotList = [];
            var starttime = service['availability'].starttime; // 06:00
            var endtime = service['availability'].endtime;     // 14:00
            var duration = service['duration'];

            var startmin = starttime.split(":");      // 06:00
            var timehr = parseInt(startmin[0]);       // 06
            var timemin = parseInt(startmin[1]);      // 00
            var totalstartmin = timehr * 60 + timemin;// 360 + 00

            var endmin = endtime.split(":");            // 14:00
            var endtimehr = parseInt(endmin[0]);        // 14
            var endtimemin = parseInt(endmin[1]);       // 00
            var totalendmin = endtimehr * 60 + endtimemin;// 840 + 00

            for (var time = totalstartmin; time < totalendmin;) { //360
                timemin = Number(timemin);            //00
                var start;
                start = setdigit(timehr) + ":" + setdigit(timemin)
                var end;
                if (duration <= 60) {
                    timemin += parseInt(duration);        //60
                    if (timemin >= 60) {
                        timehr += 1;                        //07
                        timemin -= 60;                      //00
                    }
                    end = setdigit(timehr) + ":" + setdigit(timemin)
                } else {
                    end = moment(timehr + ':' + timemin, 'HH:mm');
                    end.add(duration, 'm');
                    end = end.format("HH:mm");
                    var tempstartmin = end.split(":");
                    timehr = parseInt(tempstartmin[0]);
                    timemin = parseInt(tempstartmin[1]);
                }
                var obj;
                obj = {
                    "day": moment().format('dddd'),
                    "starttime": start,
                    "endtime": end,
                    "displaytext": start + " - " + end,
                    "disable": false,
                }
                timeslotList.push(obj);
                time += parseInt(duration);
            }
            setTimeSlots(timeslotList);
            console.log(`timeslotList`, timeslotList);
            return timeslotList;
        }
    }

    const setdigit = (val) => {
        var ret;
        if (val <= 9) {
            ret = `0${val}`;
        } else {
            ret = `${val}`;
        }
        return ret;
    }

    //GET MEMBER DATA IN MOBILE LOCAL STORAGE
    const getMemberDeatilsLocalStorage = async () => {
        try {
            var memberInfo = await LocalService.LocalStorageService();
            if (memberInfo) {
                const response = getCurrency(memberInfo.branchid.currency);
                setCurrencySymbol(response);
                setMemberID(memberInfo._id);
                setMemberInfo(memberInfo);
                setLoading(false);
            } else {
                var publicUserInfo = await LocalService.LocalBranchDetails();
                const response = getCurrency(publicUserInfo.branchid.currency);
                setCurrencySymbol(response);
                setLoading(false);
            }
        } catch (error) {
            console.log(`error`, error);
        }

    }

    //THIS FUNCTION ONPRESS SELECT TIME
    const onPressTimeSlotListItem = (item, index) => {
        const newTimeSlot = timeSlots.map((item, index) => {
            item.selected = false;
            return item;
        });
        timeSlots[index].selected = true;
        setTimeSlots(newTimeSlot);
        setTime(item);
    }

    //BOOK NOW BUTTON CLICK TO CALL FUNCTION
    const onPressBooking = () => {
        if (!selectionDate) {
            return Toast.show('Please select booking date', Toast.SHORT);
        }
        if (!time) {
            return Toast.show('Please select booking time', Toast.SHORT);
        }
        let item = ServiceDetails;
        item.currentbookingdate = selectionDate;
        item.currentbookingtime = time;
        props.navigation.navigate(SCREEN.BOOKINGPAYMENTSCREEN, { item });
    }

    //render time slot 
    const renderTimeSlot = ({ item, index }) => (
        item.selected ?
            <TouchableOpacity style={styles.slotSelectStyle} onPress={() => onPressTimeSlotListItem(item, index)}>
                <Text style={{ color: COLOR.DEFALUTCOLOR, fontWeight: FONT.FONT_BOLD }}>{item.displaytext}</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity style={styles.slotstyle} onPress={() => onPressTimeSlotListItem(item, index)}>
                <Text style={{ color: COLOR.LIGHT_BLACK }}>{item.displaytext}</Text>
            </TouchableOpacity>
    )

    //SELECTDATETOGETCLASSLIST USING API
    const selectDateToGetClassList = (selectDate) => {
        selectDate = moment(selectDate).format();
        setSelectionDate(selectDate);
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.DEFALUTCOLOR} barStyle={KEY.DARK_CONTENT} />
            <CalendarStrip
                scrollable
                style={{
                    height: 120,
                    paddingTop: 20,
                    paddingBottom: 10,
                    marginTop: 0,
                    marginBottom: 0,
                }}
                daySelectionAnimation={{
                    type: 'background',
                    duration: 200,
                    borderWidth: 1,
                    highlightColor: COLOR.WHITE,
                    textTransform: KEY.CAPITALIZE
                }}
                calendarColor={COLOR.DEFALUTCOLOR}
                calendarHeaderStyle={{
                    color: COLOR.WHITE, fontSize: FONT.FONT_SIZE_16,
                    textTransform: KEY.CAPITALIZE, marginTop: -15, marginBottom: 10
                }} //Header Text
                dateNumberStyle={styles.dateNumberStyle} //date Number
                dateNameStyle={styles.dateNameStyle} // date Name                                        
                highlightDateNumberStyle={{ color: COLOR.DEFALUTCOLOR, fontSize: FONT.FONT_SIZE_14, textTransform: KEY.CAPITALIZE }} //hightlight date Number
                highlightDateNameStyle={{ color: COLOR.DEFALUTCOLOR, fontSize: FONT.FONT_SIZE_12, textTransform: KEY.CAPITALIZE, fontWeight: FONT.BOLD }} // hightlight  date Name
                selectedDate={Date(selectionDate ? selectionDate : today)}
                iconLeftStyle={styles.iconleftStyle}
                iconRightStyle={styles.iconrightStyle}
                onDateSelected={(date) => selectDateToGetClassList(date)}
                iconStyle={styles.iconStyle}
            />
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

                <Text style={{
                    fontSize: FONT.FONT_SIZE_18, color: COLOR.BLACK,
                    fontWeight: FONT.FONT_BOLD, marginLeft: 15, marginTop: 15
                }}>{languageConfig.availableslottext}</Text>
                {
                    timeSlots &&
                    <View style={styles.cardView}>
                        <FlatList
                            style={{ paddingBottom: 10, marginTop: 10 }}
                            numColumns={2}
                            key={timeSlots && timeSlots.length}
                            data={timeSlots}
                            contentContainerStyle={{
                                alignSelf: KEY.CENTER
                            }}
                            renderItem={renderTimeSlot}
                            keyExtractor={item => item._id}
                            keyboardShouldPersistTaps={KEY.ALWAYS}
                        />
                    </View>
                }
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
