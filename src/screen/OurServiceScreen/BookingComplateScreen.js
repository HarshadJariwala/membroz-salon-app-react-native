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
import EvilIcons from 'react-native-vector-icons/EvilIcons';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const BookingComplateScreen = props => {
    return (
        <SafeAreaView style={{ flex: 1, alignItems: KEY.CENTER, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <StatusBar hidden={false} translucent={false} barStyle={KEY.DARK_CONTENT} backgroundColor={COLOR.STATUSBARCOLOR} />
                <View style={{ marginTop: 20, justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                    <View style={styles.cardview}>
                        <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, flexDirection: KEY.COLUMN, }}>
                            <View style={styles.rounfIconStyle}>
                                <Feather name='check' size={40} color={COLOR.GREEN_COLOR} />
                            </View>
                            <View>
                                <Text style={{ color: COLOR.GREEN_COLOR, fontSize: FONT.FONT_SIZE_20, fontWeight: FONT.FONT_BOLD }}>{"Booking Completed!"}</Text>
                            </View>
                            <View style={{ marginTop: 10, marginBottom: 15 }}>
                                <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.LIGHT_BLACK }}>{"Order Number #125420"}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View>
                    <Text style={styles.text}>{"Booking Details"}</Text>
                </View>
                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, }}>
                    <View style={styles.cardview}>
                        <View style={{ flexDirection: KEY.ROW, marginTop: 10 }}>
                            <View style={styles.rounfIconStyle1}>
                                <EvilIcons name='calendar' size={24} color={COLOR.DEFALUTCOLOR} />
                            </View>
                            <View style={{ flexDirection: KEY.COLUMN }}>
                                <View style={{ marginLeft: 15 }}>
                                    <Text >{"Date"}</Text>
                                    <Text style={{
                                        fontSize: 16, color: COLOR.BLACK, fontWeight: FONT.FONT_WEIGHT_BOLD
                                    }}>{"January 08,2023"}</Text>
                                </View>
                            </View>
                            <View style={{ marginLeft: 15, flexDirection: KEY.ROW }}>
                                <View style={styles.rounfIconStyle1}>
                                    <Entypo name='stopwatch' size={22} color={COLOR.DEFALUTCOLOR} style={{ margin: 2 }} />
                                </View>
                                <View style={{ flexDirection: KEY.COLUMN }}>
                                    <View style={{ marginLeft: 15 }}>
                                        <Text >{"Start Time"}</Text>
                                        <Text style={{
                                            fontSize: 16, color: COLOR.BLACK, fontWeight: FONT.FONT_WEIGHT_BOLD
                                        }}>{"10 am"}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={styles.line} />
                        <View style={{ flexDirection: KEY.ROW, marginTop: 10, marginBottom: 10 }}>
                            <View style={styles.rounfIconStyle1}>
                                <Feather name='clock' size={22} color={COLOR.DEFALUTCOLOR} style={{ margin: 2 }} />
                            </View>
                            <View style={{ flexDirection: KEY.COLUMN }}>
                                <View style={{ marginLeft: 15 }}>
                                    <Text >{"Duration"}</Text>
                                    <Text style={{
                                        fontSize: 16, color: COLOR.BLACK, fontWeight: FONT.FONT_WEIGHT_BOLD
                                    }}>{"1:30 hours"}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View>
                    <Text style={styles.text}>{"Service"}</Text>
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
                                fontWeight: FONT.FONT_WEIGHT_BOLD,
                                marginTop: 10,
                                marginLeft: 10
                            }}> {"Total"} </Text>
                            <Text style={{
                                fontSize: FONT.FONT_SIZE_18,
                                color: COLOR.DEFALUTCOLOR,
                                fontWeight: FONT.FONT_WEIGHT_BOLD,
                                marginTop: 10,
                                marginRight: 10,
                                marginBottom: 10
                            }}> {"$40"} </Text>
                        </View>
                    </View>
                </View>
                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, marginTop: 60 }}>
                    <TouchableOpacity style={styles.loginbutton} >
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