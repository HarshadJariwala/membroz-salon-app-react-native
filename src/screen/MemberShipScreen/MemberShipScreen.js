import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Dimensions,
    SafeAreaView,
    ImageBackground,
    TextInput,
    ScrollView,
    TouchableOpacity,
    StatusBar, Image, Linking, Platform, Alert
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { MemberLanguage } from '../../services/LocalService/LanguageService';
import crashlytics, { firebase } from "@react-native-firebase/crashlytics";
import * as LocalService from '../../services/LocalService/LocalService';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import languageConfig from '../../languages/languageConfig';
import * as SCREEN from '../../context/screen/screenName';
import { useFocusEffect } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Loader from '../../components/loader/index';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import styles from './MemberShipStyle';
import moment from 'moment';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const MemberShipScreen = () => {

    const [currencySymbol, setCurrencySymbol] = useState(null);
    const [memberProfilePic, setMemberProfilePic] = useState(null);
    const [memberNumber, setMemberNumber] = useState(null);
    const [memberName, setMemberName] = useState(null);
    const [membershipPlan, setMembershipPlan] = useState(null);
    const [memberInfo, setMemberInfo] = useState(null);
    const [membershipcost, setMembershipcost] = useState(null);
    const [membershipstart, setMembershipstart] = useState(null);
    const [membershipend, setMembershipend] = useState(null);
    const [branchname, setBranchname] = useState(null);

    useFocusEffect(
        React.useCallback(() => {
            const getCallBackScreen = () => {
                console.log("memberInfo", memberInfo);
                //LANGUAGE MANAGEMENT FUNCTION
                MemberLanguage();
                if (memberInfo) {
                    getmemberid = memberInfo?._id;
                    setMembershipPlan(memberInfo?.membershipid?.property?.membershipname);
                    setMembershipcost
                }
            }
        })
    )
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.STATUSBARCOLOR} barStyle={KEY.DARK_CONTENT} />
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                    <TouchableOpacity style={styles.viweRound}>
                        <Image source={IMAGE.USERPROFILE}
                            style={{ height: 95, width: 95, borderRadius: 100 }} />
                    </TouchableOpacity>
                    <Text style={styles.text}>{"Membroz Member"}</Text>
                    <View style={{ flexDirection: KEY.ROW, alignItems: KEY.CENTER, marginTop: 5 }}>
                        <Ionicons name='location-outline' size={22} color={COLOR.DEFALUTCOLOR} />
                        <Text style={{ fontSize: FONT.FONT_SIZE_14, color: COLOR.GRANITE_GRAY, marginLeft: 5 }}>{"Place Mall"}</Text>
                    </View>
                </View>

                <View style={styles.viewMain}>
                    <View style={styles.viewRectangle}>
                        <Text style={styles.headertext}>{languageConfig.membership}</Text>
                        <View style={{ flexDirection: KEY.ROW, marginTop: 10 }}>
                            <View style={styles.rounfIconStyle}>
                                <MaterialCommunityIcons name='wallet-membership' size={20} color={COLOR.DEFALUTCOLOR} />
                            </View>
                            <View style={{ flexDirection: KEY.COLUMN, marginLeft: -2 }}>
                                <View style={{ marginLeft: 15 }}>
                                    <Text style={styles.rectangleText}>{languageConfig.membershipplan}</Text>
                                    <Text style={{
                                        fontSize: FONT.FONT_SIZE_16, textTransform: KEY.CAPITALIZE, color: COLOR.BLACK,
                                        fontWeight: FONT.FONT_WEIGHT_BOLD, width: WIDTH / 2
                                    }} numberOfLines={1}>{'Gold Member Ship new plan'}</Text>
                                </View>
                            </View>
                            <View style={{ flex: 1, alignItems: KEY.FLEX_END, marginTop: 10 }}>
                                <TouchableOpacity style={styles.btnStyle} >
                                    <Text style={{
                                        fontWeight: FONT.FONT_WEIGHT_BOLD, textTransform: KEY.CAPITALIZE,
                                        color: COLOR.WHITE, fontSize: FONT.FONT_SIZE_14
                                    }}>{languageConfig.renew}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{
                            borderWidth: 0.2, marginTop: 15, borderColor: COLOR.LINE_COLOR,
                            marginRight: 15, marginLeft: 15, width: WIDTH - 60
                        }} />
                        <View style={{ flexDirection: KEY.ROW, marginTop: 5, alignSelf: KEY.FLEX_START }}>
                            <View style={styles.rounfIconStyle}>
                                <FontAwesome5 name='money-bill-wave-alt' size={15} color={COLOR.DEFALUTCOLOR} />
                            </View>
                            <View style={{ flexDirection: KEY.COLUMN, marginLeft: -2 }}>
                                <View style={{ marginLeft: 15, marginBottom: 10 }}>
                                    <Text style={styles.rectangleText}>{languageConfig.amounttext}</Text>
                                    <Text style={{
                                        fontSize: FONT.FONT_SIZE_16, textTransform: KEY.UPPERCASE, color: COLOR.BLACK,
                                        fontWeight: FONT.FONT_WEIGHT_BOLD
                                    }}>{'$4500'}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{
                            borderWidth: 0.2, marginTop: 5, borderColor: COLOR.LINE_COLOR,
                            marginRight: 15, marginLeft: 15, width: WIDTH - 60
                        }} />
                        <View style={{ flexDirection: KEY.ROW, marginTop: 5, alignSelf: KEY.FLEX_START }}>
                            <View style={styles.rounfIconStyle}>
                                <MaterialCommunityIcons name='calendar-outline' size={24} color={COLOR.DEFALUTCOLOR} />
                            </View>
                            <View style={{ flexDirection: KEY.COLUMN, marginLeft: -2 }}>
                                <View style={{ marginLeft: 15, marginBottom: 10 }}>
                                    <Text style={styles.rectangleText}>{languageConfig.membershipstartdate}</Text>
                                    <Text style={{
                                        fontSize: FONT.FONT_SIZE_16, textTransform: KEY.UPPERCASE, color: COLOR.BLACK,
                                        fontWeight: FONT.FONT_WEIGHT_BOLD
                                    }}>{moment().format('MMMM DD,YYYY')}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{
                            borderWidth: 0.2, marginTop: 5, borderColor: COLOR.LINE_COLOR,
                            marginRight: 15, marginLeft: 15, width: WIDTH - 60
                        }} />
                        <View style={{ flexDirection: KEY.ROW, marginTop: 5, alignSelf: KEY.FLEX_START }}>
                            <View style={styles.rounfIconStyle}>
                                <MaterialCommunityIcons name='calendar-outline' size={24} color={COLOR.DEFALUTCOLOR} />
                            </View>
                            <View style={{ flexDirection: KEY.COLUMN, marginLeft: -2 }}>
                                <View style={{ marginLeft: 15, marginBottom: 10 }}>
                                    <Text style={styles.rectangleText}>{languageConfig.membershipenddate}</Text>
                                    <Text style={{
                                        fontSize: FONT.FONT_SIZE_16, textTransform: KEY.UPPERCASE, color: COLOR.BLACK,
                                        fontWeight: FONT.FONT_WEIGHT_BOLD
                                    }}>{moment().format('MMMM DD,YYYY')}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.viewMain}>
                    <View style={styles.viewRectangle}>
                        <View style={{
                            flexDirection: KEY.ROW, marginTop: 10,
                            alignSelf: KEY.FLEX_START, marginLeft: 15
                        }}>
                            <Text style={{
                                fontSize: FONT.FONT_SIZE_18, textTransform: KEY.CAPITALIZE, color: COLOR.BLACK,
                                fontWeight: FONT.FONT_WEIGHT_BOLD
                            }}>{languageConfig.packagetext}</Text>
                        </View>

                        <View style={{ marginTop: 15 }}>
                            <View style={{ flexDirection: KEY.COLUMN, marginBottom: 10 }}>
                                <TouchableOpacity
                                    style={{ flexDirection: KEY.ROW, alignItems: KEY.CENTER, justifyContent: KEY.SPACEBETWEEN }}>
                                    <Text style={{
                                        fontSize: FONT.FONT_SIZE_16, textTransform: KEY.CAPITALIZE, color: COLOR.BLACK,
                                        fontWeight: FONT.FONT_WEIGHT_BOLD, width: WIDTH / 2
                                    }} >{'Yoga Class'}</Text>
                                    <Text style={{
                                        fontSize: FONT.FONT_SIZE_16, textTransform: KEY.CAPITALIZE, color: COLOR.BLACK,
                                        fontWeight: FONT.FONT_WEIGHT_BOLD
                                    }} >{'$500'}</Text>
                                </TouchableOpacity>
                                <Text style={{
                                    fontSize: FONT.FONT_SIZE_14, textTransform: KEY.CAPITALIZE, color: COLOR.GRANITE_GRAY,
                                    width: WIDTH / 2, marginTop: 5
                                }} >{languageConfig.validtill + moment().format("MMMM DD,YYYY")} </Text>
                            </View>
                            <View style={{ borderBottomColor: COLOR.LINE_COLOR, borderBottomWidth: 1, width: WIDTH - 60 }} />
                        </View>

                        <View style={{ marginTop: 10 }}>
                            <View style={{ flexDirection: KEY.COLUMN, marginBottom: 10 }}>
                                <TouchableOpacity
                                    style={{ flexDirection: KEY.ROW, alignItems: KEY.CENTER, justifyContent: KEY.SPACEBETWEEN }}>
                                    <Text style={{
                                        fontSize: FONT.FONT_SIZE_16, textTransform: KEY.CAPITALIZE, color: COLOR.BLACK,
                                        fontWeight: FONT.FONT_WEIGHT_BOLD, width: WIDTH / 2
                                    }} >{'Yoga Class'}</Text>
                                    <Text style={{
                                        fontSize: FONT.FONT_SIZE_16, textTransform: KEY.CAPITALIZE, color: COLOR.BLACK,
                                        fontWeight: FONT.FONT_WEIGHT_BOLD
                                    }} >{'$500'}</Text>
                                </TouchableOpacity>
                                <Text style={{
                                    fontSize: FONT.FONT_SIZE_14, textTransform: KEY.CAPITALIZE, color: COLOR.GRANITE_GRAY,
                                    width: WIDTH / 2, marginTop: 5
                                }} >{languageConfig.validtill + moment().format("MMMM DD,YYYY")} </Text>
                            </View>
                            <View style={{ borderBottomColor: COLOR.LINE_COLOR, borderBottomWidth: 1, width: WIDTH - 60 }} />
                        </View>

                        <View style={{ marginTop: 10 }}>
                            <View style={{ flexDirection: KEY.COLUMN, marginBottom: 10 }}>
                                <TouchableOpacity
                                    style={{ flexDirection: KEY.ROW, alignItems: KEY.CENTER, justifyContent: KEY.SPACEBETWEEN }}>
                                    <Text style={{
                                        fontSize: FONT.FONT_SIZE_16, textTransform: KEY.CAPITALIZE, color: COLOR.BLACK,
                                        fontWeight: FONT.FONT_WEIGHT_BOLD, width: WIDTH / 2
                                    }} >{'Yoga Class'}</Text>
                                    <Text style={{
                                        fontSize: FONT.FONT_SIZE_16, textTransform: KEY.CAPITALIZE, color: COLOR.BLACK,
                                        fontWeight: FONT.FONT_WEIGHT_BOLD
                                    }} >{'$500'}</Text>
                                </TouchableOpacity>
                                <Text style={{
                                    fontSize: FONT.FONT_SIZE_14, textTransform: KEY.CAPITALIZE, color: COLOR.GRANITE_GRAY,
                                    width: WIDTH / 2, marginTop: 5
                                }} >{languageConfig.validtill + moment().format("MMMM DD,YYYY")} </Text>
                            </View>
                            <View style={{ borderBottomColor: COLOR.LINE_COLOR, borderBottomWidth: 1, width: WIDTH - 60 }} />
                        </View>

                        <View style={{ marginTop: 10 }}>
                            <View style={{ flexDirection: KEY.COLUMN, marginBottom: 10 }}>
                                <TouchableOpacity
                                    style={{ flexDirection: KEY.ROW, alignItems: KEY.CENTER, justifyContent: KEY.SPACEBETWEEN }}>
                                    <Text style={{
                                        fontSize: FONT.FONT_SIZE_16, textTransform: KEY.CAPITALIZE, color: COLOR.BLACK,
                                        fontWeight: FONT.FONT_WEIGHT_BOLD, width: WIDTH / 2
                                    }} >{'Yoga Class'}</Text>
                                    <Text style={{
                                        fontSize: FONT.FONT_SIZE_16, textTransform: KEY.CAPITALIZE, color: COLOR.BLACK,
                                        fontWeight: FONT.FONT_WEIGHT_BOLD
                                    }} >{'$500'}</Text>
                                </TouchableOpacity>
                                <Text style={{
                                    fontSize: FONT.FONT_SIZE_14, textTransform: KEY.CAPITALIZE, color: COLOR.GRANITE_GRAY,
                                    width: WIDTH / 2, marginTop: 5
                                }} >{languageConfig.validtill + moment().format("MMMM DD,YYYY")} </Text>
                            </View>
                            <View style={{ borderBottomColor: COLOR.LINE_COLOR, borderBottomWidth: 1, width: WIDTH - 60 }} />
                        </View>
                    </View>
                    <View style={{ marginBottom: 80 }} />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default MemberShipScreen;
