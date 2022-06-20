import React, { useEffect, useState } from 'react';
import {
    View, SafeAreaView,
    Text, TextInput,
    ScrollView,
    StatusBar,
    Dimensions, Image,
    TouchableOpacity,
    Keyboard,
    FlatList,
    RefreshControl
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { MemberLanguage } from '../../services/LocalService/LanguageService';
import { UserListService } from '../../services/UserService/UserService';
import * as LocalService from '../../services/LocalService/LocalService';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import languageConfig from '../../languages/languageConfig';
import * as SCREEN from '../../context/screen/screenName';
import RenderHTML from 'react-native-render-html';
import Fontisto from 'react-native-vector-icons/Fontisto';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';
import Loader from '../../components/loader';
import * as IMAGE from '../../styles/image';
import styles from './OurSpecialistDetailsstyle';
import moment from 'moment';

import { firebase } from '@react-native-firebase/crashlytics';
const WIDTH = Dimensions.get('window').width;

const OurSpecialistDtails = (props) => {
    const oursSpeacilistDetails = props.route.params.item;
    const [profilepic, setProfilepic] = useState(null);
    let starttime = oursSpeacilistDetails && oursSpeacilistDetails.branchid && oursSpeacilistDetails.branchid.workinghours && moment(oursSpeacilistDetails.branchid.workinghours.starttime, ["HH.mm"]).format("hh:mm ");
    let endtime = oursSpeacilistDetails && oursSpeacilistDetails.branchid && oursSpeacilistDetails.branchid.workinghours && moment(oursSpeacilistDetails.branchid.workinghours.endtime, ["HH.mm"]).format("hh:mm ");
    let days = oursSpeacilistDetails && oursSpeacilistDetails.branchid && oursSpeacilistDetails.branchid.workinghours && oursSpeacilistDetails.branchid.workinghours.days;
    let firstdays = days[0];
    let lastdays = days[days.length - 1];

    useEffect(() => {
        //LANGUAGE MANAGEMENT FUNCTION
        MemberLanguage();
    }, [])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.STATUSBARCOLOR} barStyle={KEY.DARK_CONTENT} />
            <ScrollView>
                <View style={styles.containerView}>
                    <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, marginTop: 20 }}>
                        <TouchableOpacity style={styles.viewRound}>
                            <Image source={!oursSpeacilistDetails && oursSpeacilistDetails.profilepic ? IMAGE.USERPROFILE : { uri: oursSpeacilistDetails.profilepic }}
                                style={!profilepic ? { height: 70, width: 70, borderRadius: 100 } : { height: 75, width: 75, borderRadius: 100 }} />
                        </TouchableOpacity>
                        <Text style={styles.text}> {oursSpeacilistDetails && oursSpeacilistDetails.property && oursSpeacilistDetails.property.fullname}</Text>
                        <Text style={styles.text1}> {oursSpeacilistDetails && oursSpeacilistDetails.designationid && oursSpeacilistDetails.designationid.title}</Text>
                    </View>
                    <View style={styles.cardView}>
                        <View style={{ flexDirection: KEY.ROW }}>
                            <Text style={{
                                fontSize: FONT.FONT_SIZE_16,
                                fontWeight: FONT.FONT_BOLD,
                                color: COLOR.BLACK,
                                marginLeft: 20,
                                marginTop: 10
                            }}>{languageConfig.abouttext}</Text>
                            <Text style={{
                                fontSize: FONT.FONT_SIZE_16,
                                fontWeight: FONT.FONT_BOLD,
                                color: COLOR.DEFALUTCOLOR,
                                marginTop: 10,
                                marginLeft: 5
                            }}>{languageConfig.metext}</Text>
                        </View>
                        {oursSpeacilistDetails && oursSpeacilistDetails.property && oursSpeacilistDetails.property.discriptio_ge8h &&
                            <Text style={styles.cardtext}>
                                <RenderHTML contentWidth={WIDTH - 60}
                                    source={{ html: oursSpeacilistDetails.property.discriptio_ge8h }}
                                    baseStyle={styles.tagsStyles}
                                />
                            </Text>
                        }
                        <View style={{ flexDirection: KEY.ROW, alignItems: KEY.SPACEBETWEEN, marginLeft: 20, }}>
                            <TouchableOpacity onPress={() => onPressCall(oursSpeacilistDetails)}
                                style={{ alignItems: KEY.CENTER }}>
                                <Feather size={18} name="phone-call" color={COLOR.DEFALUTCOLOR} style={{ marginRight: 5 }} />
                            </TouchableOpacity>
                            <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.BLACK }}>
                                {oursSpeacilistDetails && oursSpeacilistDetails.property && oursSpeacilistDetails.property.mobile}</Text>
                        </View>
                        <View style={{ flexDirection: KEY.ROW, alignItems: KEY.SPACEBETWEEN, marginLeft: 20, marginBottom: 10 }}>
                            <TouchableOpacity onPress={() => onPressEmail(oursSpeacilistDetails)}
                                style={{ alignItems: KEY.CENTER }}>
                                <Fontisto size={18} name="email" color={COLOR.DEFALUTCOLOR} style={{ marginRight: 5, }} />
                            </TouchableOpacity>
                            <Text numberOfLines={1}
                                style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.BLACK }} >
                                {oursSpeacilistDetails && oursSpeacilistDetails.property && oursSpeacilistDetails.property.primaryemail}</Text>
                        </View>
                    </View>
                    <View style={styles.viewRectangle}>
                        <View style={{ flexDirection: KEY.ROW, marginTop: 10, alignSelf: KEY.FLEX_START }}>
                            <View style={styles.rounfIconStyle}>
                                <MaterialIcons name='work-outline' size={20} color={COLOR.DEFALUTCOLOR} />
                            </View>
                            <View style={{ flexDirection: KEY.COLUMN, marginLeft: -2 }}>
                                <View style={{ marginLeft: 15, marginBottom: 10 }}>
                                    <Text style={styles.rectangleText}>{languageConfig.workexperience}</Text>
                                    <Text style={{
                                        fontSize: FONT.FONT_SIZE_16, color: COLOR.BLACK,
                                        fontWeight: FONT.FONT_BOLD
                                    }}>{oursSpeacilistDetails && oursSpeacilistDetails.property && oursSpeacilistDetails.property.workexperience + ' ' + languageConfig.yearstext}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{
                            borderWidth: 0.2, marginTop: 0, borderColor: COLOR.LINE_COLOR,
                            marginRight: 15, marginLeft: 15, width: WIDTH - 60
                        }} />

                        <View style={{ flexDirection: KEY.ROW, marginTop: 5, alignSelf: KEY.FLEX_START }}>
                            <View style={styles.rounfIconStyle}>
                                <MaterialCommunityIcons name='calendar-outline' size={20} color={COLOR.DEFALUTCOLOR} />
                            </View>
                            <View style={{ flexDirection: KEY.COLUMN, marginLeft: -2 }}>
                                <View style={{ marginLeft: 15, marginBottom: 10 }}>
                                    <Text style={styles.rectangleText}>{languageConfig.ourgymjoinedsince}</Text>
                                    <Text style={{
                                        fontSize: FONT.FONT_SIZE_16, color: COLOR.BLACK,
                                        fontWeight: FONT.FONT_BOLD
                                    }}>{oursSpeacilistDetails && oursSpeacilistDetails.property.joiningdate ? moment(oursSpeacilistDetails.property.joiningdate).format('MMMM DD,YYYY') : " --- "}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={{
                            borderWidth: 0.2, marginTop: 0, borderColor: COLOR.LINE_COLOR,
                            marginRight: 15, marginLeft: 15, width: WIDTH - 60
                        }} />
                        <View style={{ flexDirection: KEY.ROW, marginTop: 5, alignSelf: KEY.FLEX_START }}>
                            <View style={styles.rounfIconStyle}>
                                <MaterialCommunityIcons name='calendar-month-outline' size={20} color={COLOR.DEFALUTCOLOR} />
                            </View>
                            <View style={{ flexDirection: KEY.COLUMN, marginLeft: -2 }}>
                                <View style={{ marginLeft: 15, marginBottom: 10 }}>
                                    <Text style={styles.rectangleText}>{languageConfig.availabledays}</Text>
                                    <Text style={{
                                        fontSize: FONT.FONT_SIZE_16, color: COLOR.BLACK,
                                        fontWeight: FONT.FONT_BOLD
                                    }}>{(firstdays && firstdays) + ' - ' + (lastdays && lastdays)}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{
                            borderWidth: 0.2, marginTop: 0, borderColor: COLOR.LINE_COLOR,
                            marginRight: 15, marginLeft: 15, width: WIDTH - 60
                        }} />
                        <View style={{ flexDirection: KEY.ROW, marginTop: 5, alignSelf: KEY.FLEX_START, flex: 1 }}>
                            <View style={styles.rounfIconStyle}>
                                <MaterialCommunityIcons name='timer' size={20} color={COLOR.DEFALUTCOLOR} />
                            </View>
                            <View style={{ flexDirection: KEY.COLUMN, marginLeft: -2 }}>
                                <View style={{ marginLeft: 15, marginBottom: 10 }}>
                                    <Text style={styles.rectangleText}>{languageConfig.availabletime}</Text>
                                    <Text style={{
                                        fontSize: FONT.FONT_SIZE_16, textTransform: KEY.UPPERCASE, color: COLOR.BLACK,
                                        fontWeight: FONT.FONT_BOLD, flex: 1
                                    }}>{starttime + ' - ' + endtime}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default OurSpecialistDtails;
