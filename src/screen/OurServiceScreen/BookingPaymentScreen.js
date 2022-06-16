import React, { useEffect, useState } from 'react';
import {
    View, Text, SafeAreaView, ScrollView,
    StatusBar, ImageBackground, Dimensions,
    Image, TextInput, TouchableOpacity,
} from 'react-native';
import { addAppointmentService } from '../../services/AppointmentService/AppiontmentService';
import { MemberLanguage } from '../../services/LocalService/LanguageService';
import crashlytics, { firebase } from "@react-native-firebase/crashlytics";
import * as LocalService from '../../services/LocalService/LocalService';
import getCurrency from '../../services/getCurrencyService/getCurrency';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import languageConfig from '../../languages/languageConfig';
import * as SCREEN from '../../context/screen/screenName';
import Feather from 'react-native-vector-icons/Feather';
import Loader from '../../components/loader/index';
import * as KEY from '../../context/actions/key';
import * as FONT from "../../styles/typography";
import Toast from 'react-native-simple-toast';
import * as COLOR from "../../styles/colors";
import * as IMAGE from '../../styles/image';
import styles from './BookingPaymentStyle';
import moment from 'moment';
import axiosConfig from '../../helpers/axiosConfig';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const BookingPaymentScreen = (props) => {
    const ServiceDetails = props.route.params.item;
    const [loading, setLoading] = useState(false);
    const [memberInfo, setMemberInfo] = useState(null);
    const [memberID, setMemberID] = useState(null);
    const [currencySymbol, setCurrencySymbol] = useState(null);
    const [razorPayKey, setRazorPayKey] = useState(null);

    useEffect(() => {
        setLoading(true);
        RemoteController();
        //LANGUAGE MANAGEMENT FUNCTION
        MemberLanguage();
        getMemberDeatilsLocalStorage();
    }, [])

    useEffect(() => {
    }, [loading, memberInfo, memberID, memberID])

    //REMOTE DATA FATCH IN LOCAL STORAGE
    const RemoteController = async () => {
        var userData = await LocalService.RemoteServerController();
        if (userData) {
            setRazorPayKey(userData.razorpaykey);
        }
    };

    //GET MEMBER DATA IN MOBILE LOCAL STORAGE
    const getMemberDeatilsLocalStorage = async () => {
        try {
            var memberInfo = await LocalService.LocalStorageService();
            if (memberInfo) {
                const response = getCurrency(memberInfo.branchid.currency);
                axiosConfig(memberInfo._id);
                setCurrencySymbol(response);
                setMemberID(memberInfo._id);
                setMemberInfo(memberInfo);
                setLoading(false);
            } else {
                var publicUserInfo = await LocalService.LocalBranchDetails();
                axiosConfig(publicUserInfo._id);
                const response = getCurrency(publicUserInfo.branchid.currency);
                setCurrencySymbol(response);
                setLoading(false);
            }
        } catch (error) {
            console.log(`error`, error);
        }
    }

    //BOOK NOW BUTTON CLICK TO CALL FUNCTION
    const onPressBooking = async () => {
        if (memberInfo) {
            let appointmentDetail = {
                'appointmentdate': moment(ServiceDetails.currentbookingdate).format(),
                'attendee': memberID,
                'onModel': 'Member',
                //"host" : serviceDetails.addedby, 
                'duration': ServiceDetails.duration,
                'refid': ServiceDetails._id,
                'timeslot': {
                    'day': moment(ServiceDetails.currentbookingdate).format('dddd'),
                    'starttime': ServiceDetails.currentbookingtime.starttime,
                    'endtime': ServiceDetails.currentbookingtime.endtime
                },
                'charges': ServiceDetails.charges,
            }
            setLoading(true);
            try {
                const response = await addAppointmentService(appointmentDetail);
                if (response.data != null && response.data != 'undefind' && response.status == 200) {
                    setLoading(false);
                    Toast.show(languageConfig.appoimentsuccessmessage, Toast.LONG);
                    props.navigation.navigate(SCREEN.BOOKINGCOMPLATESCREEN, { item: response.data });
                }
            }
            catch (error) {
                console.log(`error`, error);
                firebase.crashlytics().recordError(error);
                setLoading(false);
                Toast.show(languageConfig.appoimenterror, Toast.LONG);
            }
        } else {
            props.navigation.replace(SCREEN.AUTH);
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ marginTop: 0, marginLeft: 15, marginBottom: 10 }}>
                    <Text style={styles.text}>{languageConfig.bookingdetails}</Text>
                </View>
                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, }}>
                    <View style={styles.cardview}>
                        <View style={{ flexDirection: KEY.ROW, marginTop: 15 }}>
                            <View style={styles.rounfIconStyle1}>
                                <Image source={IMAGE.ACTIVITYCALENDERICON} style={{ tintColor: COLOR.DEFALUTCOLOR, height: 16, width: 16 }} />
                            </View>
                            <View style={{ marginLeft: 15, flexDirection: KEY.COLUMN }}>
                                <Text style={styles.text_line}>{languageConfig.date}</Text>
                                <Text style={{
                                    fontSize: 16, color: COLOR.BLACK, fontWeight: FONT.FONT_BOLD
                                }}>{ServiceDetails && moment(ServiceDetails.currentbookingdate).format("MMMM DD,YYYY")}</Text>
                            </View>

                            <View style={{ marginLeft: 15, flexDirection: KEY.ROW }}>
                                <View style={styles.rounfIconStyle1}>
                                    <Image source={IMAGE.TIME2ICON} style={{ tintColor: COLOR.DEFALUTCOLOR, height: 18, width: 16 }} />
                                </View>
                                <View style={{ flexDirection: KEY.COLUMN }}>
                                    <View style={{ marginLeft: 15 }}>
                                        <Text style={styles.text_line}>{languageConfig.starttimetext}</Text>
                                        <Text style={{
                                            fontSize: 16, color: COLOR.BLACK, fontWeight: FONT.FONT_BOLD
                                        }}>{ServiceDetails && ServiceDetails.currentbookingtime.starttime}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={styles.line} />
                        <View style={{ flexDirection: KEY.ROW, marginTop: 8, marginBottom: 15 }}>
                            <View style={styles.rounfIconStyle1}>
                                <Image source={IMAGE.STOPWATCHICON} style={{ tintColor: COLOR.DEFALUTCOLOR, height: 20, width: 16 }} />
                            </View>
                            <View style={{ flexDirection: KEY.COLUMN }}>
                                <View style={{ marginLeft: 15 }}>
                                    <Text style={styles.text_line}>{languageConfig.duration}</Text>
                                    <Text style={{
                                        fontSize: 16, color: COLOR.BLACK, fontWeight: FONT.FONT_BOLD
                                    }}>{ServiceDetails && ServiceDetails.duration + ' min'}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: 10, marginLeft: 10 }}>
                    <Text style={styles.text}> {languageConfig.servicetext}</Text>
                </View>
                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, marginTop: 10 }}>
                    <View style={styles.cardview}>
                        <View>
                            <View style={{ flex: 1, flexDirection: KEY.ROW, justifyContent: KEY.SPACEBETWEEN, marginTop: 5 }}>
                                <Text style={styles.text1}> {ServiceDetails && ServiceDetails.title} </Text>
                                <Text style={styles.text2}> {ServiceDetails && (currencySymbol + ServiceDetails.charges)} </Text>
                            </View>
                        </View>
                        <View style={styles.line} />
                        <View style={{}}>
                            <View style={{ flex: 1, flexDirection: KEY.ROW, justifyContent: KEY.SPACEBETWEEN, }}>
                                <Text style={styles.text1}> {languageConfig.subtotaltext} </Text>
                                <Text style={styles.text2}> {currencySymbol + "0"} </Text>
                            </View>
                            <View style={{ flexDirection: KEY.ROW, justifyContent: KEY.SPACEBETWEEN, }}>
                                <Text style={styles.text1}> {languageConfig.discounttext} </Text>
                                <Text style={styles.text2}> {currencySymbol + "0"} </Text>
                            </View>
                        </View>
                        <View style={styles.line} />
                        <View style={{ flexDirection: KEY.ROW, justifyContent: KEY.SPACEBETWEEN, marginBottom: 5 }}>
                            <Text style={{
                                fontSize: FONT.FONT_SIZE_20,
                                color: COLOR.DEFALUTCOLOR,
                                fontWeight: FONT.FONT_BOLD,
                                marginTop: 10,
                                marginBottom: 10,
                                marginLeft: 10
                            }}> {languageConfig.totaltext} </Text>
                            <Text style={{
                                fontSize: FONT.FONT_SIZE_20,
                                color: COLOR.DEFALUTCOLOR,
                                fontWeight: FONT.FONT_BOLD,
                                marginTop: 10,
                                marginBottom: 10,
                                marginRight: 10
                            }}> {ServiceDetails && (currencySymbol + ServiceDetails.charges)} </Text>
                        </View>
                    </View>
                </View>
                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, marginTop: 15, }}>
                    <View style={styles.cardview}>
                        <View style={{ flexDirection: KEY.ROW, marginTop: 15, marginBottom: 10 }}>
                            <TouchableOpacity style={styles.checkbox}>
                                <Feather name='check' size={18} color={COLOR.DEFALUTCOLOR} />
                            </TouchableOpacity>
                            <View style={{ flexDirection: KEY.COLUMN, marginLeft: 15, marginBottom: 10 }}>
                                <Text style={{ fontSize: FONT.FONT_SIZE_18, color: COLOR.BLACK, fontWeight: FONT.FONT_BOLD }}>{languageConfig.wallet}</Text>
                                <Text style={{ color: COLOR.LIGHT_BLACK, fontSize: FONT.FONT_SIZE_14 }}>{languageConfig.walletcurrentblancetext + ' ' + currencySymbol + "0"}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ alignItems: KEY.CENTER, justifyContent: KEY.CENTER, flexDirection: KEY.ROW, marginTop: 15 }}>
                    <View style={styles.cardview}>
                        <View style={{ flexDirection: KEY.ROW, marginBottom: 5 }}>
                            <TouchableOpacity style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                                <View style={styles.round}>

                                </View>
                            </TouchableOpacity>
                            <View style={{ flexDirection: KEY.COLUMN, marginBottom: 10, marginTop: 10, marginLeft: 15 }}>
                                <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.BLACK, fontWeight: FONT.FONT_BOLD }}>{languageConfig.magpietext}</Text>
                                <Text style={{ fontSize: FONT.FONT_SIZE_14, color: COLOR.LIGHT_BLACK }}>{languageConfig.paymentmethodtext}</Text>
                                <Text style={{ fontSize: FONT.FONT_SIZE_14, color: COLOR.LIGHT_BLACK }}>{languageConfig.paymentmethod2text}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ alignItems: KEY.CENTER, justifyContent: KEY.CENTER, flexDirection: KEY.ROW, marginTop: 15, }}>
                    <View style={styles.cardview}>
                        <View style={{ flexDirection: KEY.ROW, }}>
                            <TouchableOpacity style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, }}>
                                <View style={styles.round}>
                                    <FontAwesome name="circle" size={16} color={COLOR.DEFALUTCOLOR} />
                                </View>
                            </TouchableOpacity>
                            <View style={{ flexDirection: KEY.COLUMN, marginBottom: 10, marginTop: 10, marginLeft: 15 }}>
                                <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.BLACK, fontWeight: FONT.FONT_BOLD }}>{languageConfig.paymentmethod3text}</Text>
                                <Text style={{ fontSize: FONT.FONT_SIZE_14, color: COLOR.LIGHT_BLACK }}>{languageConfig.paymentmethod4text}</Text>
                                <Text style={{ fontSize: FONT.FONT_SIZE_14, color: COLOR.LIGHT_BLACK }}>{languageConfig.paymentmethod5text}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, marginTop: 20, marginBottom: 10 }}>
                    <TouchableOpacity style={styles.loginbutton} onPress={() => onPressBooking()} >
                        <Text style={styles.login_button}>
                            {languageConfig.youpaytext + ' ' + (ServiceDetails && (currencySymbol + ServiceDetails.charges))}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            {loading ? <Loader /> : null}
        </SafeAreaView>
    )
}

export default BookingPaymentScreen;