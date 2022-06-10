import React, { useEffect, useState } from 'react';
import {
    View, Text, Dimensions,
    SafeAreaView, ImageBackground, TextInput, ScrollView,
    TouchableOpacity, StatusBar, Image, Keyboard, Platform, Alert
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { MemberLanguage } from '../../services/LocalService/LanguageService';
import crashlytics, { firebase } from "@react-native-firebase/crashlytics";
import * as LocalService from '../../services/LocalService/LocalService';
import AsyncStorage from '@react-native-community/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import languageConfig from '../../languages/languageConfig';
import * as SCREEN from '../../context/screen/screenName';
import { useFocusEffect } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import Toast from 'react-native-simple-toast';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import styles from './MenuStyle';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const MenuScreen = (props) => {
    const [memberInfo, setMemberInfo] = useState(null);
    const [memberProfilePic, setMemberProfilePic] = useState(null);
    const [memberNumber, setMemberNumber] = useState(null);
    const [memberName, setMemberName] = useState(null);

    useFocusEffect(
        React.useCallback(() => {
            const getCallBackScreen = () => {
                //LANGUAGE MANAGEMENT FUNCTION
                MemberLanguage();
                if (memberInfo) {
                    setMemberProfilePic(memberInfo?.profilepic);
                    setMemberNumber(memberInfo?.membernumber);
                    setMemberName(memberInfo?.fullname);
                }
            }
            getCallBackScreen();
        }, [])
    );

    useEffect(() => {
        getMemberDeatilsLocalStorage();
    }, [])

    //GET MEMBER DATA IN MOBILE LOCAL STORAGE
    const getMemberDeatilsLocalStorage = async () => {
        var memberInfo = await LocalService.LocalStorageService();
        if (memberInfo) {
            setMemberInfo(memberInfo);
            setMemberProfilePic(memberInfo?.profilepic);
            setMemberNumber(memberInfo?.membernumber);
            setMemberName(memberInfo?.fullname);
        }
    }

    useEffect(() => {
    }, [memberProfilePic])

    //LOGOUT BUTTON CLICK TO CALL 
    const onPressLogout = () => {
        Alert.alert(
            languageConfig.Logouttext,
            languageConfig.profilelogout,
            [
                {
                    text: languageConfig.cancel,
                    style: "cancel"
                },
                {
                    text: languageConfig.Logouttext2, onPress: () => {
                        AsyncStorage.removeItem(KEY.AUTHUSERINFO);
                        // AsyncStorage.removeItem(REMOVEDATA);
                        AsyncStorage.removeItem(KEY.AUTHUSER);
                        Toast.show(languageConfig.logoutsuccessmessage, Toast.SHORT);
                        props.navigation.replace(SCREEN.AUTH);
                    }
                }
            ]
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.STATUSBARCOLOR} barStyle={KEY.DARK_CONTENT} />
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                    <TouchableOpacity style={styles.card} onPress={() => props.navigation.navigate(SCREEN.MYPROFILESCREEN)}>
                        <View style={{ flexDirection: KEY.ROW, marginTop: 10, marginBottom: 10 }}>
                            <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                                <View style={styles.rounfIconStyle}>
                                    <Image style={{
                                        borderRadius: 100,
                                        width: 45, height: 45
                                    }} source={!memberProfilePic ? IMAGE.USERPROFILE : { uri: memberProfilePic }} />
                                </View>
                            </View>
                            <View style={{ justifyContent: KEY.CENTER, flexDirection: KEY.COLUMN, marginLeft: 10 }}>
                                <Text style={{ fontSize: FONT.FONT_SIZE_14, color: COLOR.BLACK, fontWeight: FONT.FONT_BOLD }}>{memberName}</Text>
                                <Text style={{ fontSize: FONT.FONT_SIZE_14, color: COLOR.BLACK }}>{"member id #" + memberNumber}</Text>
                            </View>
                            <View style={{ alignItems: KEY.FLEX_END, flex: 1, marginRight: 10, justifyContent: KEY.CENTER }}>
                                <TouchableOpacity onPress={() => props.navigation.navigate(SCREEN.MYPROFILESCREEN)}>
                                    <Feather name='chevron-right' size={20} style={{ color: COLOR.BLACK }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, marginTop: 10 }}>
                    <View style={styles.card1}>
                        <View style={{ marginTop: 10, marginLeft: 15, flexDirection: KEY.COLUMN, marginBottom: 5 }}>
                            <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.BLACK, fontWeight: FONT.FONT_BOLD, marginBottom: 10 }}>{languageConfig.servicetext}</Text>
                            <TouchableOpacity style={{ flexDirection: KEY.ROW }} onPress={() => props.navigation.navigate(SCREEN.HOMESCREEN)}>
                                <Image source={IMAGE.HOMEICON} style={{ width: 20, height: 25, tintColor: COLOR.BLACK, marginBottom: -5 }} />
                                <Text style={{ marginLeft: 9, fontSize: FONT.FONT_SIZE_14, color: COLOR.BLACK, marginBottom: 15 }}>{languageConfig.home}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ flexDirection: KEY.ROW }} onPress={() => props.navigation.navigate(SCREEN.OURSERVICESCREEN)}>
                                <Image source={IMAGE.TRAININGICON} style={{ width: 21, height: 21, tintColor: COLOR.BLACK }} />
                                <Text style={{ marginLeft: 10, fontSize: FONT.FONT_SIZE_14, color: COLOR.BLACK, marginBottom: 15 }}>{languageConfig.ourservicestext}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ flexDirection: KEY.ROW }} onPress={() => props.navigation.navigate(SCREEN.MYBOOKING)}>
                                <Image source={IMAGE.MYBOOKINGICON} style={{ width: 21, height: 21, tintColor: COLOR.BLACK }} />
                                <Text style={{ marginLeft: 10, fontSize: FONT.FONT_SIZE_14, color: COLOR.BLACK, marginBottom: 15 }}>{languageConfig.mybooking}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ flexDirection: KEY.ROW }} onPress={() => props.navigation.navigate(SCREEN.OURSPECIALIST)}>
                                <Image source={IMAGE.USERGROUPICON} style={{ width: 20, height: 20, tintColor: COLOR.BLACK }} />
                                <Text style={{ marginLeft: 10, fontSize: FONT.FONT_SIZE_14, color: COLOR.BLACK, marginBottom: 15 }}>{languageConfig.ourspecialisttext}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                    <View style={styles.card1}>
                        <View style={{ marginTop: 10, marginLeft: 15, flexDirection: KEY.COLUMN }}>
                            <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.BLACK, fontWeight: FONT.FONT_BOLD, marginBottom: 10 }}>{languageConfig.subscriptionpaymentstext}</Text>

                            <TouchableOpacity style={{ flexDirection: KEY.ROW }} onPress={() => props.navigation.navigate(SCREEN.MEMBERSHIPSCREEN)}>
                                <Image source={IMAGE.MEMBERSHIPICON} style={{ width: 20, height: 20, tintColor: COLOR.BLACK }} />
                                <Text style={{ marginLeft: 9, fontSize: FONT.FONT_SIZE_14, color: COLOR.BLACK, marginBottom: 15 }}>{languageConfig.membership}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ flexDirection: KEY.ROW }} onPress={() => props.navigation.navigate(SCREEN.PAYMENTDETAILSSCREEN)}>
                                <Image style={{ width: 20, height: 15, tintColor: COLOR.BLACK }} source={IMAGE.MONEYICON} />
                                <Text style={{ marginLeft: 10, fontSize: FONT.FONT_SIZE_14, color: COLOR.BLACK, marginBottom: 15 }}>{languageConfig.payment}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ flexDirection: KEY.ROW }} onPress={() => props.navigation.navigate(SCREEN.WALLETSCREEN)}>
                                <Image source={IMAGE.WALLET} style={{ width: 20, height: 20, tintColor: COLOR.BLACK }} />
                                <Text style={{ marginLeft: 10, fontSize: FONT.FONT_SIZE_14, color: COLOR.BLACK, marginBottom: 15 }}>{languageConfig.wallet}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ flexDirection: KEY.ROW }} onPress={() => props.navigation.navigate(SCREEN.REWARDPOINTSCREEN)}>
                                <Image source={IMAGE.REWARDPOINT} style={{ width: 20, height: 20, tintColor: COLOR.BLACK }} />
                                <Text style={{ marginLeft: 10, fontSize: FONT.FONT_SIZE_14, color: COLOR.BLACK, marginBottom: 15 }}>{languageConfig.rewardpointstext}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, }}>
                    <View style={styles.card1}>
                        <View style={{ marginTop: 10, marginLeft: 15, flexDirection: KEY.COLUMN, marginBottom: 5 }}>
                            <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.BLACK, fontWeight: FONT.FONT_BOLD, marginBottom: 10 }}>{languageConfig.aboutustext}</Text>
                            <TouchableOpacity style={{ flexDirection: KEY.ROW }} onPress={() => props.navigation.navigate(SCREEN.ACTIVITYCALENDERSCREEN)}>
                                <Image source={IMAGE.ACTIVITYCALENDERICON} style={{ width: 21, height: 21, tintColor: COLOR.BLACK }} />
                                <Text style={{ marginLeft: 10, fontSize: FONT.FONT_SIZE_14, color: COLOR.BLACK, marginBottom: 15 }}>{languageConfig.activitycalendertext}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ flexDirection: KEY.ROW }} onPress={() => props.navigation.navigate(SCREEN.EXPLORESCREEN)}>
                                <Image source={IMAGE.EXPLOREICON} style={{ width: 22, height: 22, tintColor: COLOR.BLACK }} />
                                <Text style={{ marginLeft: 10, fontSize: FONT.FONT_SIZE_14, color: COLOR.BLACK, marginBottom: 15 }}>{languageConfig.exploresalontext}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ flexDirection: KEY.ROW }} onPress={() => props.navigation.navigate(SCREEN.OFFERSCREEN)}>
                                <Image source={IMAGE.OFFERS} style={{ width: 21, height: 21, tintColor: COLOR.BLACK }} />
                                <Text style={{ marginLeft: 10, fontSize: FONT.FONT_SIZE_14, color: COLOR.BLACK, marginBottom: 15 }}>{languageConfig.offer}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ flexDirection: KEY.ROW }} onPress={() => props.navigation.navigate(SCREEN.INVITEFRIENDSCREEN)}>
                                <Image source={IMAGE.INVITEICON} style={{ width: 22, height: 18, tintColor: COLOR.BLACK }} />
                                <Text style={{ marginLeft: 10, fontSize: FONT.FONT_SIZE_14, color: COLOR.BLACK, marginBottom: 15 }}>{languageConfig.invitationfriend}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ flexDirection: KEY.ROW }} onPress={() => props.navigation.navigate(SCREEN.CONTACTUSSCREEN)}>
                                <Image style={{ width: 18, height: 18, tintColor: COLOR.BLACK }} source={IMAGE.CONTACT} />
                                <Text style={{ marginLeft: 10, fontSize: FONT.FONT_SIZE_14, color: COLOR.BLACK, marginBottom: 15 }}>{languageConfig.contactustext}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ flexDirection: KEY.ROW }} onPress={() => onPressLogout()}>
                                <Image source={IMAGE.LOGOUTICON} style={{ width: 22, height: 22, tintColor: COLOR.BLACK }} />
                                <Text style={{ marginLeft: 10, fontSize: FONT.FONT_SIZE_14, color: COLOR.BLACK, marginBottom: 15 }}>{languageConfig.Logouttext}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default MenuScreen;
