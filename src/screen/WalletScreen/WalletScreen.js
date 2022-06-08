import React, { useEffect, useState } from 'react';
import {
    View, Text, Dimensions, SafeAreaView, ImageBackground,
    Image, TextInput, ScrollView, TouchableOpacity, StatusBar,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { MemberLanguage } from '../../services/LocalService/LanguageService';
import { WalletDetailService } from '../../services/BillService/BillService';
import crashlytics, { firebase } from "@react-native-firebase/crashlytics";
import * as LocalService from '../../services/LocalService/LocalService';
import languageConfig from '../../languages/languageConfig';
import * as SCREEN from '../../context/screen/screenName';
import Loader from '../../components/loader/index';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import Toast from 'react-native-simple-toast';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import styles from './WalletStyle';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const WalletScreen = (props) => {
    const [loading, setLoading] = useState(false);
    const [memberID, setMemberID] = useState(null);
    const [walletBalance, setwalletBalance] = useState(0);

    useEffect(() => {
        //LANGUAGE MANAGEMENT FUNCTION
        MemberLanguage();
        getMemberDeatilsLocalStorage();
    }, []);

    useEffect(() => {
    }, [loading, memberID, walletBalance]);

    //GET MEMBER DATA IN MOBILE LOCAL STORAGE
    const getMemberDeatilsLocalStorage = async () => {
        var memberInfo = await LocalService.LocalStorageService();
        if (memberInfo) {
            setMemberID(memberInfo?._id);
            getWallatBalance(memberInfo?._id);
        }
    }

    //GET WALLATE BALANCE API CALL
    const getWallatBalance = async (memberID) => {
        try {
            const response = await WalletDetailService(memberID);
            if (response.data != null && response.data != undefined && response.status === 200) {
                setwalletBalance(response.data[0] && response.data[0].walletbalance ? response.data[0].walletbalance.toFixed(2) : 0);
            }
        } catch (error) {
            setLoading(false);
            firebase.crashlytics().recordError(error);
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.STATUSBARCOLOR} barStyle={KEY.DARK_CONTENT} />
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
                <View style={styles.viewMain}>
                    <View style={styles.viewRectangle}>
                        <View style={styles.rounfIconStyle}>
                            <Image source={IMAGE.WALLET} style={{ width: 30, height: 30, tintColor: COLOR.DEFALUTCOLOR }} />
                        </View>
                        <Text style={{
                            fontSize: FONT.FONT_SIZE_16, textTransform: KEY.CAPITALIZE, color: COLOR.BLACK,
                            fontWeight: FONT.FONT_BOLD, marginTop: 5
                        }}>{languageConfig.yourwalletbalance}</Text>
                        <Text style={{
                            fontSize: FONT.FONT_SIZE_22, textTransform: KEY.CAPITALIZE, color: COLOR.BLACK,
                            fontWeight: FONT.FONT_BOLD, marginTop: 5, marginBottom: 10
                        }}>{walletBalance}</Text>
                    </View>
                </View>

                <View style={styles.viewMain}>
                    <View style={styles.viewRectangle}>
                        <View style={{
                            flexDirection: KEY.ROW, marginTop: 10,
                            alignSelf: KEY.FLEX_START, marginLeft: 20
                        }}>
                            <Text style={{
                                fontSize: FONT.FONT_SIZE_18, color: COLOR.BLACK,
                                fontWeight: FONT.FONT_BOLD
                            }}>{languageConfig.addmomenywallet}</Text>
                            <Text style={{
                                fontSize: FONT.FONT_SIZE_18, textTransform: KEY.CAPITALIZE, color: COLOR.DEFALUTCOLOR,
                                fontWeight: FONT.FONT_BOLD, marginLeft: 5
                            }}>{languageConfig.wallet}</Text>
                        </View>

                        <View style={{ marginTop: 20 }}>
                            <TextInput
                                placeholder={languageConfig.amounttext}
                                style={styles.inputTextView}
                                type={KEY.CLEAR}
                                returnKeyType={KEY.NEXT}
                                placeholderTextColor={COLOR.PLACEHOLDER_COLOR}
                            />
                        </View>

                        <TouchableOpacity style={styles.btnStyle} onPress={() => { }}>
                            <Text style={{ fontWeight: FONT.FONT_BOLD, color: COLOR.WHITE, fontSize: FONT.FONT_SIZE_18 }}>
                                {languageConfig.addmomenytext}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity style={styles.transactionView} onPress={() => props.navigation.navigate(SCREEN.WALLETTRANSACTION)}>
                    <View style={{ flexDirection: KEY.ROW, justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                        <Image source={IMAGE.WALLET} style={{
                            width: 40, height: 40, tintColor: COLOR.WHITE, marginRight: 20, marginLeft: -60
                        }} />
                        <View style={{ flexDirection: KEY.COLUMN, width: WIDTH / 1.8, }}>
                            <Text style={{ fontWeight: FONT.FONT_BOLD, color: COLOR.BLACK, fontSize: FONT.FONT_SIZE_18, marginLeft: 10, marginTop: 0 }}>
                                {"Transaction history"}
                            </Text>
                            <Text style={{ color: COLOR.BLACK, fontSize: FONT.FONT_SIZE_14, marginLeft: 10 }}>
                                {"View your wallet transaction history"}
                            </Text>
                        </View>
                        <View style={{ alignItems: KEY.FLEX_END, flex: 1, marginRight: 10, }}>
                            <MaterialCommunityIcons name='chevron-right' size={30} color={COLOR.BLACK} />
                        </View>
                    </View>
                </TouchableOpacity>
            </ScrollView>
            {loading ? <Loader /> : null}
        </SafeAreaView>
    )
}

export default WalletScreen;
