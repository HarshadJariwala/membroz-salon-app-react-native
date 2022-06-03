import React, { useState, useEffect } from 'react';
import {
    Dimensions,
    SafeAreaView,
    ScrollView,
    Image,
    View,
    Text,
    TouchableOpacity,
    StatusBar
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { BillPaymentService } from '../../services/PaymentService/PaymentService';
import { MemberLanguage } from '../../services/LocalService/LanguageService';
import crashlytics, { firebase } from "@react-native-firebase/crashlytics";
import { RemoteService } from '../../services/RemortService/RemortService';
import * as LocalService from '../../services/LocalService/LocalService';
import getCurrency from '../../services/getCurrencyService/getCurrency';
import languageConfig from '../../languages/languageConfig';
import { DEFAULTPROFILE } from '../../context/actions/type';
import * as SCREEN from '../../context/screen/screenName';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RazorpayCheckout from 'react-native-razorpay';
import Loader from '../../components/loader/index';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import toast from 'react-native-simple-toast';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import styles from './DownPaymentStyle';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default DownPaymentScreen = (props) => {
    const PaymentItem = props.route.params.item;
    const [loading, setLoading] = useState(false);
    const [memberID, setMemberID] = useState(null);
    const [currencySymbol, setCurrencySymbol] = useState(null);
    const [memderInfo, setMemderInfo] = useState(null);
    const [checked, setChecked] = useState(false);
    const [razorpayID, setRazorpayID] = useState(false);

    useEffect(() => {
        //LANGUAGE MANAGEMENT FUNCTION
        MemberLanguage();
        getMemberDeatilsLocalStorage();
        RemoteController();
    }, [])

    useEffect(() => {
    }, [loading, memberID, currencySymbol, memderInfo, checked]);

    // REMOTECONTROLLER USE TO AUTOCONFIG APP
    const RemoteController = async () => {
        var getUser = await RemoteService();
        if (getUser) {
            setRazorpayID(getUser.razorpaykey);
        };
    };

    //GET MEMBER DATA IN MOBILE LOCAL STORAGE
    const getMemberDeatilsLocalStorage = async () => {
        var memderInfo = await LocalService.LocalStorageService();
        const response = getCurrency(memderInfo.branchid.currency);
        setCurrencySymbol(response);
        setMemberID(memderInfo._id);
        setMemderInfo(memderInfo);
        setLoading(false);
    }

    //RAZORPAY FUNCTION
    const razorPay = (options, res) => {
        setLoading(true);
        RazorpayCheckout.open(options).then((data) => {
            // handle success
            genratebill(data, res);
        }).catch((error) => {
            //firebase.crashlytics().recordError(error);
            // handle failure
            setLoading(false);
            props.navigation.replace(SCREEN.PAYMENTDETAILSSCREEN);
        });
    }

    //GENERATE BILL FUNCTION
    const genratebill = async (data, res) => {
        setLoading(true);
        try {
            let billpayment = {
                memberid: memberID,
                item: res._id,
                paidamount: res.balance,
                mode: "Online",
                paymentdate: moment().format(),
                property: data
            }
            const billPaymentResponse = await BillPaymentService(billpayment);
            if (billPaymentResponse.data != null && billPaymentResponse.data != 'undefind' && billPaymentResponse.status == 200) {
                // onRefresh();
                setLoading(false);
                props.navigation.replace(SCREEN.PAYMENTDETAILSSCREEN);
            }
        } catch (error) {
            firebase.crashlytics().recordError(error);
            setLoading(false);
        }
    }

    //OPEN PAYMENT SCREEN
    const openPaymentScreen = async (item) => {
        if (!checked) {
            toast.show(languageConfig.paymenttype);
            return;
        }
        setLoading(true);
        try {
            var options = {
                description: item && item.paymentterms && item.paymentterms.paymentitem && item.paymentterms.paymentitem.paymentitemname,
                image: memderInfo && memderInfo.profilepic ? memderInfo.profilepic : DEFAULTPROFILE,
                currency: memderInfo && memderInfo.branchid && memderInfo.branchid.currency ? memderInfo.branchid.currency : 'INR',
                key: razorpayID, // Your api key
                amount: Number(item.balance).toFixed(),
                name: memderInfo.fullname,
                prefill: {
                    email: memderInfo.property.primaryemail,
                    contact: memderInfo.property.mobile,
                    name: memderInfo.fullname
                },
                theme: { color: COLOR.DEFALUTCOLOR }
            }
            razorPay(options, item)
        } catch (error) {
            firebase.crashlytics().recordError(error);
            setLoading(false);
        }
    }

    //CHECK PAYMENT TYPE FUNCTION
    const checkPaymentType = () => {
        if (!checked) {
            setChecked(true);
        } else {
            setChecked(false);
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.STATUSBARCOLOR} barStyle={KEY.DARK_CONTENT} />
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
                <View style={{ alignItems: KEY.CENTER, justifyContent: KEY.CENTER }}>
                    <View style={styles.rounfIconStyle}>
                        <MaterialCommunityIcons size={30} name={"wallet-membership"} color={COLOR.DEFALUTCOLOR} style={{ marginRight: 0 }} />
                    </View>
                    <Text style={styles.headerText}>{PaymentItem && PaymentItem.paymentterms && PaymentItem.paymentterms.paymentitem && PaymentItem.paymentterms.paymentitem.paymentitemname}</Text>
                    <View style={{ flexDirection: KEY.ROW, marginTop: 5 }}>
                        <Text style={{ color: COLOR.DEFALUTCOLOR, fontWeight: FONT.FONT_WEIGHT_BOLD, fontSize: FONT.FONT_SIZE_18 }}>{currencySymbol + Number(PaymentItem.balance).toFixed(0)}</Text>
                    </View>
                </View>

                <View style={styles.viewSquarebig}>
                    <TouchableOpacity onPress={() => checkPaymentType()} style={styles.radioButton}>
                        <Ionicons size={30} name={checked == true ? "radio-button-on" : "radio-button-off"} color={COLOR.DEFALUTCOLOR} style={{ marginRight: 10 }} />
                    </TouchableOpacity>
                    <View style={{ justifyContent: KEY.CENTER, flex: 1, marginBottom: 15 }}>
                        <Text style={{ fontSize: FONT.FONT_SIZE_16, fontWeight: FONT.FONT_WEIGHT_BOLD, marginTop: 10, color: COLOR.BLACK }}>{languageConfig.razorpayonlinepayment}</Text>
                        <Text style={{ color: COLOR.TAUPE_GRAY, fontSize: FONT.FONT_SIZE_16, alignItems: KEY.CENTER, marginRight: 10 }}>{languageConfig.razorpayonlinepayment1}</Text>
                    </View>
                </View>
            </ScrollView>
            <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                <TouchableOpacity style={styles.updateBtn} onPress={() => openPaymentScreen(PaymentItem)}>
                    <View style={{ flexDirection: KEY.ROW }}>
                        <Text style={{ fontWeight: FONT.FONT_WEIGHT_BOLD, color: COLOR.WHITE, fontSize: FONT.FONT_SIZE_20, }}>{languageConfig.proceedtopay}</Text>
                        <Text style={{ fontWeight: FONT.FONT_WEIGHT_BOLD, color: COLOR.WHITE, fontSize: FONT.FONT_SIZE_20, marginLeft: 5 }} >{currencySymbol + Number(PaymentItem.balance).toFixed(0)}</Text>
                    </View>
                </TouchableOpacity>
            </View>
            {loading ? <Loader /> : null}
        </SafeAreaView>
    );
}
