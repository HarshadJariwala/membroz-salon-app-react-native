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
    StatusBar, Image, Keyboard, Platform
} from 'react-native';
import { NotificationService } from '../../services/NotificationService/NotificationService';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { RemoteServerController } from '../../services/LocalService/LocalService';
import { MemberLanguage } from '../../services/LocalService/LanguageService';
import crashlytics, { firebase } from "@react-native-firebase/crashlytics";
import * as LocalService from '../../services/LocalService/LocalService';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import languageConfig from '../../languages/languageConfig';
import * as SCREEN from '../../context/screen/screenName';
import { useFocusEffect } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Loader from '../../components/loader/index';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import Toast from 'react-native-simple-toast';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import styles from './MyProfileStyle';
import moment from 'moment';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const MyProfileScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.DEFALUTCOLOR} barStyle={KEY.DARK_CONTENT} />
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                    <TouchableOpacity style={styles.viweRound}>
                        <Image source={IMAGE.USERPROFILE}
                            style={{ height: 95, width: 95, borderRadius: 100 }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.roundProfileStyle}>
                        <Ionicons name='camera-outline' size={20} color={COLOR.WHITE} />
                    </TouchableOpacity>
                    <Text style={styles.text}>{"Harshad Jariwala"}</Text>
                </View>

                <View style={styles.viewMain}>
                    <View style={styles.viewRectangle}>
                        <View style={{ flexDirection: KEY.ROW, marginTop: 10, alignSelf: KEY.FLEX_START }}>
                            <View style={styles.rounfIconStyle}>
                                <MaterialCommunityIcons name='wallet-membership' size={20} color={COLOR.DEFALUTCOLOR} />
                            </View>
                            <View style={{ flexDirection: KEY.COLUMN, marginLeft: -2 }}>
                                <View style={{ marginLeft: 15, marginBottom: 10 }}>
                                    <Text style={styles.rectangleText}>{languageConfig.membersince}</Text>
                                    <Text style={{
                                        fontSize: FONT.FONT_SIZE_16, color: COLOR.BLACK,
                                        fontWeight: FONT.FONT_WEIGHT_BOLD
                                    }}>{moment().format('DD MMMM YYYY')}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{
                            borderWidth: 0.2, marginTop: 0, borderColor: COLOR.LINE_COLOR,
                            marginRight: 15, marginLeft: 15, width: WIDTH - 60
                        }} />
                        <View style={{ flexDirection: KEY.ROW, marginTop: 5, alignSelf: KEY.FLEX_START }}>
                            <View style={styles.rounfIconStyle}>
                                <Text style={{ color: COLOR.DEFALUTCOLOR, fontWeight: FONT.FONT_WEIGHT_BOLD, fontSize: FONT.FONT_SIZE_12 }}>{'123'}</Text>
                            </View>
                            <View style={{ flexDirection: KEY.COLUMN, marginLeft: -2 }}>
                                <View style={{ marginLeft: 15, marginBottom: 10 }}>
                                    <Text style={styles.rectangleText}>{languageConfig.memberid}</Text>
                                    <Text style={{
                                        fontSize: FONT.FONT_SIZE_16, textTransform: KEY.UPPERCASE, color: COLOR.BLACK,
                                        fontWeight: FONT.FONT_WEIGHT_BOLD
                                    }}>{'041052456'}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.viewMain}>
                    <View style={styles.viewRectangle}>
                        <TouchableOpacity onPress={() => { navigation.navigate(SCREEN.UPDATEPROFILESCREEN) }}>
                            <View style={styles.viewCard}>
                                <View style={styles.rounfIconStyle}>
                                    <FontAwesome name='user' size={24} color={COLOR.DEFALUTCOLOR} />
                                </View>
                                <Text style={{ marginTop: 10, fontSize: FONT.FONT_SIZE_16, color: COLOR.BLACK_OLIVE, marginLeft: 10 }}>{languageConfig.myprofile}</Text>
                                <View style={{ alignItems: KEY.FLEX_END, flex: 1, marginRight: 12 }}>
                                    <MaterialCommunityIcons name='chevron-right' size={30} style={{ color: COLOR.BLACK_OLIVE, marginTop: 5 }} />
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View style={{
                            borderWidth: 0.2, marginTop: 5, borderColor: COLOR.LINE_COLOR,
                            marginRight: 15, marginLeft: 15, width: WIDTH - 60
                        }} />
                        <TouchableOpacity onPress={() => { navigation.navigate(SCREEN.PASSWORDCHANGESCREEN) }}>
                            <View style={styles.viewCard}>
                                <View style={styles.rounfIconStyle}>
                                    <AntDesign name='lock' size={20} color={COLOR.DEFALUTCOLOR} />
                                </View>
                                <Text style={{ marginTop: 10, fontSize: FONT.FONT_SIZE_16, color: COLOR.BLACK_OLIVE, marginLeft: 10 }}>{languageConfig.changepasswordbtn}</Text>
                                <View style={{ alignItems: KEY.FLEX_END, flex: 1, marginRight: 12 }}>
                                    <MaterialCommunityIcons name='chevron-right' size={30} style={{ color: COLOR.BLACK_OLIVE, marginTop: 5 }} />
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View style={{
                            borderWidth: 0.2, marginTop: 5, borderColor: COLOR.LINE_COLOR,
                            marginRight: 15, marginLeft: 15, width: WIDTH - 60
                        }} />
                        <TouchableOpacity onPress={() => { }}>
                            <View style={styles.viewCard}>
                                <View style={styles.rounfIconStyle}>
                                    <AntDesign name='hearto' size={20} color={COLOR.DEFALUTCOLOR} />
                                </View>
                                <Text style={{ marginTop: 10, fontSize: FONT.FONT_SIZE_16, color: COLOR.BLACK_OLIVE, marginLeft: 10 }}>{languageConfig.mywishlist}</Text>
                                <View style={{ alignItems: KEY.FLEX_END, flex: 1, marginRight: 12 }}>
                                    <MaterialCommunityIcons name='chevron-right' size={30} style={{ color: COLOR.BLACK_OLIVE, marginTop: 5 }} />
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View style={{
                            borderWidth: 0.2, marginTop: 5, borderColor: COLOR.LINE_COLOR,
                            marginRight: 15, marginLeft: 15, width: WIDTH - 60
                        }} />
                        <TouchableOpacity onPress={() => { }}>
                            <View style={styles.viewCard}>
                                <View style={styles.rounfIconStyle}>
                                    <FontAwesome name='star' size={20} color={COLOR.DEFALUTCOLOR} />
                                </View>
                                <Text style={{ marginTop: 10, fontSize: FONT.FONT_SIZE_16, color: COLOR.BLACK_OLIVE, marginLeft: 10 }}>{languageConfig.rateus}</Text>
                                <View style={{ alignItems: KEY.FLEX_END, flex: 1, marginRight: 12 }}>
                                    <MaterialCommunityIcons name='chevron-right' size={30} style={{ color: COLOR.BLACK_OLIVE, marginTop: 5 }} />
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View style={{ marginBottom: 10 }} />
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

export default MyProfileScreen;
