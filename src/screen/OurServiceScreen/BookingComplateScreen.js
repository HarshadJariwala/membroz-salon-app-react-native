import React, { useEffect, useState } from 'react';
import {
    View, Text, SafeAreaView, ScrollView,
    StatusBar, ImageBackground, Dimensions,
    Image, TextInput, TouchableOpacity
} from 'react-native';
import { MemberLanguage } from '../../services/LocalService/LanguageService';
import crashlytics, { firebase } from "@react-native-firebase/crashlytics";
import * as LocalService from '../../services/LocalService/LocalService';
import getCurrency from '../../services/getCurrencyService/getCurrency';
import languageConfig from '../../languages/languageConfig';
import * as SCREEN from '../../context/screen/screenName';
import Feather from 'react-native-vector-icons/Feather';
import * as KEY from '../../context/actions/key';
import * as FONT from "../../styles/typography";
import * as COLOR from "../../styles/colors";
import * as IMAGE from '../../styles/image';
import styles from './BookingComplateStyle';
import moment from 'moment';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const BookingComplateScreen = (props) => {
    const BookingServiceDetails = props.route.params.item;
    const [loading, setLoading] = useState(false);
    const [memberInfo, setMemberInfo] = useState(null);
    const [memberID, setMemberID] = useState(null);
    const [currencySymbol, setCurrencySymbol] = useState(null);

    useEffect(() => {
    }, [loading, memberInfo, memberID, memberID])

    useEffect(() => {
        //LANGUAGE MANAGEMENT FUNCTION
        MemberLanguage();
        getMemberDeatilsLocalStorage();
    }, [])

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

    //Ok BUTTON CLICK TO CALL FUNCTION
    const onPressBookNow = () => {
        props.navigation.replace(SCREEN.HOMESCREEN);
    }

    return (
        <SafeAreaView style={{ flex: 1, alignItems: KEY.CENTER, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <StatusBar hidden={false} translucent={false} barStyle={KEY.DARK_CONTENT} backgroundColor={COLOR.STATUSBARCOLOR} />
                <View style={{ marginTop: 30, justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                    <View style={styles.cardview}>
                        <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, flexDirection: KEY.COLUMN, }}>
                            <View style={styles.rounfIconStyle}>
                                <Feather name='check' size={40} color={COLOR.LIGHT_GREEN} />
                            </View>
                            <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, }}>
                                <Text style={{ marginTop: 10, color: COLOR.LIGHT_GREEN, fontSize: FONT.FONT_SIZE_20, fontWeight: FONT.FONT_BOLD }}>{languageConfig.bookingcompletedtext}</Text>
                                <Text style={{ marginTop: 10, marginBottom: 20, fontSize: FONT.FONT_SIZE_16, color: COLOR.BLACK }}>{languageConfig.ordernumbertext + " #" + BookingServiceDetails.prefix + BookingServiceDetails.number}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View>
                    <Text style={styles.text}>{languageConfig.bookingdetails}</Text>
                </View>
                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, }}>
                    <View style={styles.cardview}>
                        <View style={{ flexDirection: KEY.ROW, marginTop: 10 }}>
                            <View style={styles.rounfIconStyle1}>
                                <Image source={IMAGE.ACTIVITYCALENDERICON} style={{ tintColor: COLOR.DEFALUTCOLOR, height: 16, width: 16 }} />
                            </View>
                            <View style={{ marginLeft: 15, flexDirection: KEY.COLUMN }}>
                                <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.BLACK, fontWeight: FONT.FONT_NORMAL }}>{languageConfig.date}</Text>
                                <Text style={{
                                    fontSize: FONT.FONT_SIZE_16, color: COLOR.BLACK, fontWeight: FONT.FONT_BOLD
                                }}>{BookingServiceDetails && moment(BookingServiceDetails.appointmentdate).format("MMMM DD,YYYY")}</Text>
                            </View>
                            <View style={{ marginLeft: 15, flexDirection: KEY.ROW }}>
                                <View style={styles.rounfIconStyle1}>
                                    <Image source={IMAGE.TIME2ICON} style={{ tintColor: COLOR.DEFALUTCOLOR, height: 18, width: 16 }} />
                                </View>
                                <View style={{ flexDirection: KEY.COLUMN }}>
                                    <View style={{ marginLeft: 15 }}>
                                        <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.BLACK, fontWeight: FONT.FONT_NORMAL }}>{languageConfig.starttimetext}</Text>
                                        <Text style={{
                                            fontSize: FONT.FONT_SIZE_16, color: COLOR.BLACK, fontWeight: FONT.FONT_BOLD
                                        }}>{BookingServiceDetails && BookingServiceDetails.timeslot && BookingServiceDetails.timeslot.starttime}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={styles.line} />
                        <View style={{ flexDirection: KEY.ROW, marginTop: 8, marginBottom: 10 }}>
                            <View style={styles.rounfIconStyle1}>
                                <Image source={IMAGE.STOPWATCHICON} style={{ tintColor: COLOR.DEFALUTCOLOR, height: 18, width: 16 }} />
                            </View>
                            <View style={{ flexDirection: KEY.COLUMN }}>
                                <View style={{ marginLeft: 15 }}>
                                    <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.BLACK, fontWeight: FONT.FONT_NORMAL }}>{languageConfig.duration}</Text>
                                    <Text style={{
                                        fontSize: FONT.FONT_SIZE_16, color: COLOR.BLACK, fontWeight: FONT.FONT_BOLD
                                    }}>{BookingServiceDetails && BookingServiceDetails.refid && BookingServiceDetails.refid.duration && BookingServiceDetails.refid.duration + ' min'}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View>
                    <Text style={styles.text}>{languageConfig.servicetext}</Text>
                </View>
                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, }}>
                    <View style={styles.cardview}>
                        <View>
                            <View style={{ flexDirection: KEY.ROW, justifyContent: KEY.SPACEBETWEEN }}>
                                <Text style={styles.text1}> {BookingServiceDetails && BookingServiceDetails.refid && BookingServiceDetails.refid.title} </Text>
                                <Text style={styles.text2}> {BookingServiceDetails && (currencySymbol + BookingServiceDetails.charges)} </Text>
                            </View>
                        </View>
                        <View style={styles.line} />
                        <View>
                            <View style={{ flexDirection: KEY.ROW, justifyContent: KEY.SPACEBETWEEN, }}>
                                <Text style={styles.text1}> {languageConfig.subtotaltext} </Text>
                                <Text style={styles.text2}> {currencySymbol + "0"} </Text>
                            </View>
                            <View style={{ flexDirection: KEY.ROW, justifyContent: KEY.SPACEBETWEEN, }}>
                                <Text style={styles.text1}> {languageConfig.discounttext} </Text>
                                <Text style={styles.text2}> {currencySymbol + "0"} </Text>
                            </View>
                        </View>
                        <View style={styles.line} />
                        <View style={{ flexDirection: KEY.ROW, justifyContent: KEY.SPACEBETWEEN, }}>
                            <Text style={{
                                fontSize: FONT.FONT_SIZE_18,
                                color: COLOR.DEFALUTCOLOR,
                                fontWeight: FONT.FONT_BOLD,
                                marginTop: 10,
                                marginLeft: 10
                            }}> {languageConfig.totaltext} </Text>
                            <Text style={{
                                fontSize: FONT.FONT_SIZE_18,
                                color: COLOR.DEFALUTCOLOR,
                                fontWeight: FONT.FONT_BOLD,
                                marginTop: 10,
                                marginRight: 10,
                                marginBottom: 10
                            }}> {BookingServiceDetails && (currencySymbol + BookingServiceDetails.charges)} </Text>
                        </View>
                    </View>
                </View>
                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, marginTop: 60, marginBottom: 20 }}>
                    <TouchableOpacity style={styles.loginbutton} onPress={() => onPressBookNow()}>
                        <Text style={styles.login_button} >
                            {languageConfig.oktext}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default BookingComplateScreen;