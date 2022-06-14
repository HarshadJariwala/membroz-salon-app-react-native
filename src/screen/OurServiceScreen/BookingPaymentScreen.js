import React from 'react';
import {
    View, Text, SafeAreaView, ScrollView,
    StatusBar, ImageBackground, Dimensions,
    Image, TextInput, TouchableOpacity,
} from 'react-native';
import * as COLOR from "../../styles/colors";
import styles from './BookingPaymentStyle';
import * as FONT from "../../styles/typography";
import * as KEY from '../../context/actions/key';
import Feather from 'react-native-vector-icons/Feather';
import * as SCREEN from '../../context/screen/screenName';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import * as IMAGE from '../../styles/image';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import languageConfig from '../../languages/languageConfig';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const BookingPaymentScreen = (props) => {

    //BOOK NOW BUTTON CLICK TO CALL FUNCTION
    const onPressBooking = () => {
        props.navigation.navigate(SCREEN.BOOKINGCOMPLATESCREEN);
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <ScrollView>
                <View style={{ marginTop: 0, marginLeft: 15, marginBottom: 10 }}>
                    <Text style={styles.text}>{"Booking Details"}</Text>
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
                                }}>{"January 08,2023"}</Text>
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
                                        }}>{"10 am"}</Text>
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
                                    }}>{"1:30 hours"}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: 10, marginLeft: 10 }}>
                    <Text style={styles.text}> {"Service"}</Text>
                </View>
                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, marginTop: 10 }}>
                    <View style={styles.cardview}>
                        <View>
                            <View style={{ flex: 1, flexDirection: KEY.ROW, justifyContent: KEY.SPACEBETWEEN, marginTop: 5 }}>
                                <Text style={styles.text1}> {"Hair Cut"} </Text>
                                <Text style={styles.text1}> {"$25"} </Text>
                            </View>
                            <View style={{ flexDirection: KEY.ROW, justifyContent: KEY.SPACEBETWEEN, }}>
                                <Text style={styles.text1}> {"Hair Colour"} </Text>
                                <Text style={styles.text1}> {"$25"} </Text>
                            </View>
                        </View>
                        <View style={styles.line} />
                        <View style={{}}>
                            <View style={{ flex: 1, flexDirection: KEY.ROW, justifyContent: KEY.SPACEBETWEEN, }}>
                                <Text style={styles.text1}> {"Sub Total"} </Text>
                                <Text style={styles.text1}> {"$50"} </Text>
                            </View>
                            <View style={{ flexDirection: KEY.ROW, justifyContent: KEY.SPACEBETWEEN, }}>
                                <Text style={styles.text1}> {"Discount"} </Text>
                                <Text style={styles.text1}> {"-$10"} </Text>
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
                            }}> {"Total"} </Text>
                            <Text style={{
                                fontSize: FONT.FONT_SIZE_20,
                                color: COLOR.DEFALUTCOLOR,
                                fontWeight: FONT.FONT_BOLD,
                                marginTop: 10,
                                marginBottom: 10,
                                marginRight: 10
                            }}> {"$40"} </Text>
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
                                <Text style={{ fontSize: FONT.FONT_SIZE_18, color: COLOR.BLACK, fontWeight: FONT.FONT_BOLD, }}>{"Wallet"}</Text>
                                <Text style={{ color: COLOR.LIGHT_BLACK, fontSize: FONT.FONT_SIZE_16 }}>{"Your current balance $20"}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ alignItems: KEY.CENTER, justifyContent: KEY.CENTER, flexDirection: KEY.ROW, marginTop: 15 }}>
                    <View style={styles.cardview}>
                        <View style={{ flexDirection: KEY.ROW, marginBottom: 5 }}>
                            <TouchableOpacity style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                                <View style={styles.round}>
                                    <FontAwesome name="circle" size={16} color={COLOR.DEFALUTCOLOR} />
                                </View>
                            </TouchableOpacity>
                            <View style={{ flexDirection: KEY.COLUMN, marginBottom: 10, marginTop: 10, marginLeft: 15 }}>
                                <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.BLACK, fontWeight: FONT.FONT_BOLD }}>{"Magpie"}</Text>
                                <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.LIGHT_BLACK }}>{'Instant payment via UPI/Debit/Credit Card '}</Text>
                                <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.LIGHT_BLACK }}>{'using any bank account'}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ alignItems: KEY.CENTER, justifyContent: KEY.CENTER, flexDirection: KEY.ROW, marginTop: 15, }}>
                    <View style={styles.cardview}>
                        <View style={{ flexDirection: KEY.ROW, }}>
                            <TouchableOpacity style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, }}>
                                <View style={styles.round}>
                                </View>
                            </TouchableOpacity>
                            <View style={{ flexDirection: KEY.COLUMN, marginBottom: 10, marginTop: 10, marginLeft: 15 }}>
                                <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.BLACK, fontWeight: FONT.FONT_BOLD }}>{"Pay at Salon"}</Text>
                                <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.LIGHT_BLACK }}>{'You can pay your service bill at salon on'}</Text>
                                <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.LIGHT_BLACK }}>{'Arrival'}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, marginTop: 20, marginBottom: 10 }}>
                    <TouchableOpacity style={styles.loginbutton} onPress={() => onPressBooking()} >
                        <Text style={styles.login_button}>
                            {"You Pay $20"}
                        </Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

export default BookingPaymentScreen;