import React, { useEffect, useState } from 'react';
import {
    View, SafeAreaView,
    Text, TextInput,
    ScrollView,
    StatusBar,
    Dimensions, Image,
    TouchableOpacity,
    Keyboard
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { MemberLanguage } from '../../services/LocalService/LanguageService';
import { UserListService } from '../../services/UserService/UserService';
import * as LocalService from '../../services/LocalService/LocalService';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import languageConfig from '../../languages/languageConfig';
import * as SCREEN from '../../context/screen/screenName';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';
import Loader from '../../components/loader';
import * as IMAGE from '../../styles/image';
import styles from './OurSpecialistDetailsstyle';
import moment from 'moment';
const WIDTH = Dimensions.get('window').width;

const OurSpecialistDtails = () => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        //LANGUAGE MANAGEMENT FUNCTION
        MemberLanguage();
    }, [])

    useEffect(() => {
    }, [loading])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.STATUSBARCOLOR} barStyle={KEY.DARK_CONTENT} />
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
                <View style={styles.containerView}>
                    <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, marginTop: 20 }}>
                        <TouchableOpacity style={styles.viewRound}>
                            <Image source={IMAGE.USERPROFILE}
                                style={{ height: 95, width: 95, borderRadius: 100 }} />
                        </TouchableOpacity>
                        <Text style={styles.text}>{'Krtya Member'}</Text>
                        <Text style={styles.text1}>{'Mobile Developer Developer'}</Text>
                    </View>

                    <View style={styles.cardView}>
                        <View style={{ marginTop: 10, flexDirection: KEY.ROW }}>
                            <Text style={{
                                fontSize: FONT.FONT_SIZE_16,
                                fontWeight: FONT.FONT_WEIGHT_BOLD,
                                color: COLOR.BLACK,
                                marginLeft: 20
                            }}>{'About '}</Text>
                            <Text style={{
                                fontSize: FONT.FONT_SIZE_16,
                                fontWeight: FONT.FONT_WEIGHT_BOLD,
                                color: COLOR.DEFALUTCOLOR,
                                marginLeft: 0
                            }}>{'Me'}</Text>
                        </View>

                        <Text style={styles.cardtext}>
                            {`React Native Firebase provides native integration of Firebase Cloud Messaging (FCM) for both Android & iOS. FCM is a cost free service, allowing for server-device and device-device communication. The React Native Firebase Messaging module provides a simple JavaScript API to interact with FCM.`}
                        </Text>
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
                                        fontWeight: FONT.FONT_WEIGHT_BOLD
                                    }}>{'10 Years'}</Text>
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
                                        fontWeight: FONT.FONT_WEIGHT_BOLD
                                    }}>{moment().format('MMMM DD,YYYY')}</Text>
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
                                        fontSize: FONT.FONT_SIZE_16, textTransform: KEY.UPPERCASE, color: COLOR.BLACK,
                                        fontWeight: FONT.FONT_WEIGHT_BOLD
                                    }}>{'Monday - Friday'}</Text>
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
                                        fontWeight: FONT.FONT_WEIGHT_BOLD, flex: 1
                                    }}>{'8.00 AM - 10.00 AM, 4.00 PM - 8.00 PM'}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
            {loading ? <Loader /> : null}
        </SafeAreaView>
    )
}

export default OurSpecialistDtails;
