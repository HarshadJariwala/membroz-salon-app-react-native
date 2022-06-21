import React, { useEffect, useState } from 'react';
import {
    View, Text, Dimensions, SafeAreaView, FlatList, Share,
    Image, TextInput, ScrollView, TouchableOpacity, StatusBar, Keyboard, Platform
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { RemoteServerController } from '../../services/LocalService/LocalService';
import { MemberLanguage } from '../../services/LocalService/LanguageService';
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
import styles from './InviteFriendStyle';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const InviteFriendScreen = (props) => {
    const [loading, setLoading] = useState(false);
    const [memberInfo, setMemberInfo] = useState(null);
    const [memberNumber, setMemberNumber] = useState(null);

    useEffect(() => {
        getMemberDeatilsLocalStorage();
    }, [])

    //GET MEMBER DATA IN MOBILE LOCAL STORAGE
    const getMemberDeatilsLocalStorage = async () => {
        var memberInfo = await LocalService.LocalStorageService();
        if (memberInfo) {
            setMemberInfo(memberInfo);
            setMemberNumber(memberInfo?.membernumber);
        }
    }

    //SHARE BUTTON CLICK
    const onPressShare = async () => {
        try {
            const result = await Share.share({
                title: 'Salon App',
                message: `Please install this app and stay safe , AppLink :https://play.google.com/store/apps/developer?id=KRTYA+TECHNOLOGIES&hl=en_US&gl=US`,
                url: `https://play.google.com/store/apps/developer?id=KRTYA+TECHNOLOGIES&hl=en_US&gl=US`
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            //alert(error.message);
        }
    }
    const onPressToShareNow = () => {
        props.navigation.navigate(SCREEN.WALLETSCREEN);
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.STATUSBARCOLOR} barStyle={KEY.DARK_CONTENT} />
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                    <Text style={{
                        fontSize: FONT.FONT_SIZE_22, color: COLOR.DEFALUTCOLOR,
                        fontWeight: FONT.FONT_BOLD
                    }}>{languageConfig.mainTitel}</Text>
                    <Text style={{
                        fontSize: FONT.FONT_SIZE_22, color: COLOR.DEFALUTCOLOR,
                        fontWeight: FONT.FONT_BOLD
                    }}>{languageConfig.maintitletext2}</Text>
                    <Image style={{ height: 160, width: 300, resizeMode: KEY.COVER, marginTop: 20, marginBottom: 20 }}
                        source={IMAGE.INVITEEARN} />
                    <Text style={{
                        fontSize: FONT.FONT_SIZE_14, color: COLOR.BLACK,
                        fontWeight: FONT.FONT_BOLD
                    }}>{languageConfig.refercode}</Text>
                    <View style={styles.referCodeStyle}>
                        <Text style={styles.referCodetext}>{memberNumber}</Text>
                    </View>
                    <View style={{ flexDirection: KEY.ROW, }}>
                        <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }} >
                            <View style={styles.mainbox}>
                                <View style={styles.box1}>
                                    <Text style={{
                                        flexDirection: KEY.ROW, color: COLOR.WHITE,
                                        fontWeight: FONT.FONT_BOLD, alignSelf: KEY.CENTER, fontSize: FONT.FONT_SIZE_16
                                    }}>{languageConfig.totalreawardstext}</Text>
                                </View>
                                <View style={{ flexDirection: KEY.COLUMN, justifyContent: KEY.CENTER, alignItems: KEY.CENTER, marginTop: 5 }}>
                                    <Text style={{ fontSize: FONT.FONT_SIZE_20, color: COLOR.BLACK, fontWeight: FONT.FONT_BOLD }}>{"0"}</Text>
                                    <TouchableOpacity onPress={() => onPressToShareNow()}>
                                        <Text style={{
                                            fontSize: FONT.FONT_SIZE_16,
                                            color: COLOR.DEFALUTCOLOR,
                                            marginTop: 10
                                        }}>{languageConfig.totalinvitedtext1}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={{ marginLeft: 20 }}>
                            <View style={styles.mainbox}>
                                <View style={styles.box1}>
                                    <Text style={{
                                        flexDirection: KEY.ROW, color: COLOR.WHITE,
                                        fontWeight: FONT.FONT_BOLD, alignSelf: KEY.CENTER, fontSize: FONT.FONT_SIZE_16
                                    }}>{languageConfig.totalinvitedtext}</Text>
                                </View>
                                <View style={{ flexDirection: KEY.COLOR, justifyContent: KEY.CENTER, alignItems: KEY.CENTER, marginTop: 5 }}>
                                    <Text style={{ fontSize: FONT.FONT_SIZE_20, color: COLOR.BLACK, fontWeight: FONT.FONT_BOLD }}>{"0"}</Text>
                                    <Text style={{
                                        fontSize: FONT.FONT_SIZE_16,
                                        color: COLOR.BLACK,
                                        top: 10
                                    }}>{languageConfig.friends}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: KEY.COLUMN, marginTop: 10 }}>
                        <Text style={{ color: COLOR.BLACK, fontWeight: FONT.FONT_BOLD, fontSize: FONT.FONT_SIZE_16, marginLeft: 2 }}>{languageConfig.Titletext}</Text>
                        <Text style={{ fontSize: FONT.FONT_SIZE_14, color: COLOR.BLACK }}>{languageConfig.onetext}</Text>
                        <Text style={{ fontSize: FONT.FONT_SIZE_14, color: COLOR.BLACK }}>{languageConfig.secondtext}</Text>
                        <Text style={{ fontSize: FONT.FONT_SIZE_14, color: COLOR.BLACK }}>{languageConfig.threetext}</Text>
                    </View>
                    <TouchableOpacity onPress={() => onPressShare()}>
                        <View style={styles.inputView2}  >
                            <Text style={styles.Share_button}>
                                {"Share Now"}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default InviteFriendScreen;
