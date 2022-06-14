import React from 'react';
import {
    View, Text, SafeAreaView, ScrollView,
    StatusBar, ImageBackground, Dimensions,
    Image, TextInput, TouchableOpacity
} from 'react-native';
import * as COLOR from "../../styles/colors";
import styles from './BookingComplateStyle';
import * as FONT from "../../styles/typography";
import * as KEY from '../../context/actions/key';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import * as IMAGE from '../../styles/image';
import languageConfig from '../../languages/languageConfig';
import * as SCREEN from '../../context/screen/screenName';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const BookingComplateScreen = props => {

    //Ok BUTTON CLICK TO CALL FUNCTION
    const onPressBookNow = () => {
        props.navigation.navigate(SCREEN.HOMESCREEN);
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
                                <Text style={{ marginTop: 10, color: COLOR.LIGHT_GREEN, fontSize: FONT.FONT_SIZE_20, fontWeight: FONT.FONT_BOLD }}>{"Booking Completed!"}</Text>
                                <Text style={{ marginTop: 10, marginBottom: 20, fontSize: FONT.FONT_SIZE_16, color: COLOR.BLACK }}>{"Order Number #125420"}</Text>
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
                                }}>{"January 08,2023"}</Text>
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
                                        }}>{"10 am"}</Text>
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
                                    }}>{"1:30 hours"}</Text>
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
                                <Text style={styles.text1}> {"Hair Cut"} </Text>
                                <Text style={styles.text1}> {"$25"} </Text>
                            </View>
                            <View style={{ flexDirection: KEY.ROW, justifyContent: KEY.SPACEBETWEEN }}>
                                <Text style={styles.text1}> {"Hair Colour"} </Text>
                                <Text style={styles.text1}> {"$25"} </Text>
                            </View>
                        </View>
                        <View style={styles.line} />
                        <View>
                            <View style={{ flexDirection: KEY.ROW, justifyContent: KEY.SPACEBETWEEN, }}>
                                <Text style={styles.text1}> {"Sub Total"} </Text>
                                <Text style={styles.text1}> {"$50"} </Text>
                            </View>
                            <View style={{ flexDirection: KEY.ROW, justifyContent: KEY.SPACEBETWEEN, }}>
                                <Text style={styles.text1}> {"Discount"} </Text>
                                <Text style={styles.text1}> {"-$10"} </Text>
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
                            }}> {"Total"} </Text>
                            <Text style={{
                                fontSize: FONT.FONT_SIZE_18,
                                color: COLOR.DEFALUTCOLOR,
                                fontWeight: FONT.FONT_BOLD,
                                marginTop: 10,
                                marginRight: 10,
                                marginBottom: 10
                            }}> {"$40"} </Text>
                        </View>
                    </View>
                </View>
                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, marginTop: 60, marginBottom: 20 }}>
                    <TouchableOpacity style={styles.loginbutton} onPress={() => onPressBookNow()}>
                        <Text style={styles.login_button} >
                            {"Ok"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default BookingComplateScreen;