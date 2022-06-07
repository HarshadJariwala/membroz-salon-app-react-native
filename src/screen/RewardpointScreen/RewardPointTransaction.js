import React, { useEffect, useState } from 'react';
import {
    View, Text, Dimensions, SafeAreaView, ImageBackground,
    Image, TextInput, ScrollView, TouchableOpacity, StatusBar, Keyboard, Platform
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { RemoteServerController } from '../../services/LocalService/LocalService';
import { MemberLanguage } from '../../services/LocalService/LanguageService';
import crashlytics, { firebase } from "@react-native-firebase/crashlytics";
import languageConfig from '../../languages/languageConfig';
import * as SCREEN from '../../context/screen/screenName';
import styles from './RewardPointTransactionStyle';
import Loader from '../../components/loader/index';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import Toast from 'react-native-simple-toast';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import moment from 'moment';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const RewardPointTransaction = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.STATUSBARCOLOR} barStyle={KEY.DARK_CONTENT} />
            <View style={{ flexDirection: KEY.ROW, marginBottom: 10 }}>
                <TouchableOpacity style={styles.activeTabStyle}>
                    <Text style={styles.activeTextStyle}>{"All"}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.deactiveTabStyle}>
                    <Text style={styles.deactiveTextStyle}>{"Earn"}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.deactiveTabStyle}>
                    <Text style={styles.deactiveTextStyle}>{"Redeem"}</Text>
                </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>

                    <View style={styles.transactionView}>
                        <View style={{
                            flexDirection: KEY.COLUMN, justifyContent: KEY.CENTER, alignItems: KEY.CENTER,
                            borderTopLeftRadius: 10, borderBottomLeftRadius: 10,
                            backgroundColor: COLOR.DEFALUTCOLOR, height: 70, width: WIDTH * 0.2
                        }}>
                            <MaterialCommunityIcons name='medal-outline' size={35}
                                style={{
                                    color: COLOR.WHITE,
                                    // marginRight: 20,
                                    marginTop: 15,
                                    //marginLeft: -65
                                }} />
                            <View style={{ height: 20, width: 20, borderRadius: 100, left: -15, top: -15, backgroundColor: COLOR.WHITE }} >
                                <MaterialCommunityIcons name='minus' size={15} style={{ color: COLOR.RED, alignSelf: KEY.CENTER, margin: 2 }} />
                            </View>
                        </View>
                        <View style={{ flexDirection: KEY.COLUMN, justifyContent: KEY.SPACEBETWEEN, marginTop: 10, marginBottom: 10 }}>
                            <Text numberOfLines={1}
                                style={{
                                    fontSize: FONT.FONT_SIZE_16, marginLeft: 10, width: WIDTH / 2,
                                    color: COLOR.BLACK, fontWeight: FONT.FONT_WEIGHT_BOLD, color: COLOR.RED
                                }}>{"Paid to JioMart"}</Text>
                            <Text style={{ fontSize: FONT.FONT_SIZE_14, marginLeft: 10, color: COLOR.GRANITE_GRAY }}>{moment().format('DD MMM YYYY hh:mm a')}</Text>
                        </View>
                        <View style={{ flexDirection: KEY.COLUMN, justifyContent: KEY.SPACEBETWEEN, marginTop: 10, marginBottom: 10 }}>
                            <Text style={{
                                fontSize: FONT.FONT_SIZE_16, marginLeft: 10,
                                color: COLOR.BLACK, fontWeight: FONT.FONT_WEIGHT_BOLD, color: COLOR.RED
                            }}>{"-500 pts"}</Text>
                            <Text style={{ fontSize: FONT.FONT_SIZE_14, marginLeft: -20, color: COLOR.GRANITE_GRAY }}>{"Balance 50 pts"}</Text>
                        </View>
                    </View>

                    <View style={styles.transactionView}>
                        <View style={{
                            flexDirection: KEY.COLUMN, justifyContent: KEY.CENTER, alignItems: KEY.CENTER,
                            borderTopLeftRadius: 10, borderBottomLeftRadius: 10,
                            backgroundColor: COLOR.DEFALUTCOLOR, height: 70, width: WIDTH * 0.2
                        }}>
                            <MaterialCommunityIcons name='medal-outline' size={35}
                                style={{
                                    color: COLOR.WHITE,
                                    // marginRight: 20,
                                    marginTop: 15,
                                    //marginLeft: -65
                                }} />
                            <View style={{ height: 20, width: 20, borderRadius: 100, left: -15, top: -15, backgroundColor: COLOR.WHITE }} >
                                <MaterialCommunityIcons name='plus' size={15} style={{ color: COLOR.GREEN, alignSelf: KEY.CENTER, margin: 2 }} />
                            </View>
                        </View>
                        <View style={{ flexDirection: KEY.COLUMN, justifyContent: KEY.SPACEBETWEEN, marginTop: 10, marginBottom: 10 }}>
                            <Text numberOfLines={1}
                                style={{
                                    fontSize: FONT.FONT_SIZE_16, marginLeft: 10, width: WIDTH / 2,
                                    color: COLOR.BLACK, fontWeight: FONT.FONT_WEIGHT_BOLD, color: COLOR.GREEN
                                }}>{"Add Money to JioMart"}</Text>
                            <Text style={{ fontSize: FONT.FONT_SIZE_14, marginLeft: 10, color: COLOR.GRANITE_GRAY }}>{moment().format('DD MMM YYYY hh:mm a')}</Text>
                        </View>
                        <View style={{ flexDirection: KEY.COLUMN, justifyContent: KEY.SPACEBETWEEN, marginTop: 10, marginBottom: 10 }}>
                            <Text style={{
                                fontSize: FONT.FONT_SIZE_16, marginLeft: 10,
                                color: COLOR.BLACK, fontWeight: FONT.FONT_WEIGHT_BOLD, color: COLOR.GREEN
                            }}>{"+500 pts"}</Text>
                            <Text style={{ fontSize: FONT.FONT_SIZE_14, marginLeft: -20, color: COLOR.GRANITE_GRAY }}>{"Balance 50 pts"}</Text>
                        </View>
                    </View>

                    <View style={styles.transactionView}>
                        <View style={{
                            flexDirection: KEY.COLUMN, justifyContent: KEY.CENTER, alignItems: KEY.CENTER,
                            borderTopLeftRadius: 10, borderBottomLeftRadius: 10,
                            backgroundColor: COLOR.DEFALUTCOLOR, height: 70, width: WIDTH * 0.2
                        }}>
                            <MaterialCommunityIcons name='medal-outline' size={35}
                                style={{
                                    color: COLOR.WHITE,
                                    // marginRight: 20,
                                    marginTop: 15,
                                    //marginLeft: -65
                                }} />
                            <View style={{ height: 20, width: 20, borderRadius: 100, left: -15, top: -15, backgroundColor: COLOR.WHITE }} >
                                <MaterialCommunityIcons name='plus' size={15} style={{ color: COLOR.GREEN, alignSelf: KEY.CENTER, margin: 2 }} />
                            </View>
                        </View>
                        <View style={{ flexDirection: KEY.COLUMN, justifyContent: KEY.SPACEBETWEEN, marginTop: 10, marginBottom: 10 }}>
                            <Text numberOfLines={1}
                                style={{
                                    fontSize: FONT.FONT_SIZE_16, marginLeft: 10, width: WIDTH / 2,
                                    color: COLOR.BLACK, fontWeight: FONT.FONT_WEIGHT_BOLD, color: COLOR.GREEN
                                }}>{"Add Money to JioMart"}</Text>
                            <Text style={{ fontSize: FONT.FONT_SIZE_14, marginLeft: 10, color: COLOR.GRANITE_GRAY }}>{moment().format('DD MMM YYYY hh:mm a')}</Text>
                        </View>
                        <View style={{ flexDirection: KEY.COLUMN, justifyContent: KEY.SPACEBETWEEN, marginTop: 10, marginBottom: 10 }}>
                            <Text style={{
                                fontSize: FONT.FONT_SIZE_16, marginLeft: 10,
                                color: COLOR.BLACK, fontWeight: FONT.FONT_WEIGHT_BOLD, color: COLOR.GREEN
                            }}>{"+500 pts"}</Text>
                            <Text style={{ fontSize: FONT.FONT_SIZE_14, marginLeft: -20, color: COLOR.GRANITE_GRAY }}>{"Balance 50 pts"}</Text>
                        </View>
                    </View>

                    <View style={styles.transactionView}>
                        <View style={{
                            flexDirection: KEY.COLUMN, justifyContent: KEY.CENTER, alignItems: KEY.CENTER,
                            borderTopLeftRadius: 10, borderBottomLeftRadius: 10,
                            backgroundColor: COLOR.DEFALUTCOLOR, height: 70, width: WIDTH * 0.2
                        }}>
                            <MaterialCommunityIcons name='medal-outline' size={35}
                                style={{
                                    color: COLOR.WHITE,
                                    // marginRight: 20,
                                    marginTop: 15,
                                    //marginLeft: -65
                                }} />
                            <View style={{ height: 20, width: 20, borderRadius: 100, left: -15, top: -15, backgroundColor: COLOR.WHITE }} >
                                <MaterialCommunityIcons name='minus' size={15} style={{ color: COLOR.RED, alignSelf: KEY.CENTER, margin: 2 }} />
                            </View>
                        </View>
                        <View style={{ flexDirection: KEY.COLUMN, justifyContent: KEY.SPACEBETWEEN, marginTop: 10, marginBottom: 10 }}>
                            <Text numberOfLines={1}
                                style={{
                                    fontSize: FONT.FONT_SIZE_16, marginLeft: 10, width: WIDTH / 2,
                                    color: COLOR.BLACK, fontWeight: FONT.FONT_WEIGHT_BOLD, color: COLOR.RED
                                }}>{"Paid to JioMart"}</Text>
                            <Text style={{ fontSize: FONT.FONT_SIZE_14, marginLeft: 10, color: COLOR.GRANITE_GRAY }}>{moment().format('DD MMM YYYY hh:mm a')}</Text>
                        </View>
                        <View style={{ flexDirection: KEY.COLUMN, justifyContent: KEY.SPACEBETWEEN, marginTop: 10, marginBottom: 10 }}>
                            <Text style={{
                                fontSize: FONT.FONT_SIZE_16, marginLeft: 10,
                                color: COLOR.BLACK, fontWeight: FONT.FONT_WEIGHT_BOLD, color: COLOR.RED
                            }}>{"-500 pts"}</Text>
                            <Text style={{ fontSize: FONT.FONT_SIZE_14, marginLeft: -20, color: COLOR.GRANITE_GRAY }}>{"Balance 50 pts"}</Text>
                        </View>
                    </View>

                    <View style={styles.transactionView}>
                        <View style={{
                            flexDirection: KEY.COLUMN, justifyContent: KEY.CENTER, alignItems: KEY.CENTER,
                            borderTopLeftRadius: 10, borderBottomLeftRadius: 10,
                            backgroundColor: COLOR.DEFALUTCOLOR, height: 70, width: WIDTH * 0.2
                        }}>
                            <MaterialCommunityIcons name='medal-outline' size={35}
                                style={{
                                    color: COLOR.WHITE,
                                    // marginRight: 20,
                                    marginTop: 15,
                                    //marginLeft: -65
                                }} />
                            <View style={{ height: 20, width: 20, borderRadius: 100, left: -15, top: -15, backgroundColor: COLOR.WHITE }} >
                                <MaterialCommunityIcons name='minus' size={15} style={{ color: COLOR.RED, alignSelf: KEY.CENTER, margin: 2 }} />
                            </View>
                        </View>
                        <View style={{ flexDirection: KEY.COLUMN, justifyContent: KEY.SPACEBETWEEN, marginTop: 10, marginBottom: 10 }}>
                            <Text numberOfLines={1}
                                style={{
                                    fontSize: FONT.FONT_SIZE_16, marginLeft: 10, width: WIDTH / 2,
                                    color: COLOR.BLACK, fontWeight: FONT.FONT_WEIGHT_BOLD, color: COLOR.RED
                                }}>{"Paid to JioMart"}</Text>
                            <Text style={{ fontSize: FONT.FONT_SIZE_14, marginLeft: 10, color: COLOR.GRANITE_GRAY }}>{moment().format('DD MMM YYYY hh:mm a')}</Text>
                        </View>
                        <View style={{ flexDirection: KEY.COLUMN, justifyContent: KEY.SPACEBETWEEN, marginTop: 10, marginBottom: 10 }}>
                            <Text style={{
                                fontSize: FONT.FONT_SIZE_16, marginLeft: 10,
                                color: COLOR.BLACK, fontWeight: FONT.FONT_WEIGHT_BOLD, color: COLOR.RED
                            }}>{"-500 pts"}</Text>
                            <Text style={{ fontSize: FONT.FONT_SIZE_14, marginLeft: -20, color: COLOR.GRANITE_GRAY }}>{"Balance 50 pts"}</Text>
                        </View>
                    </View>

                    <View style={styles.transactionView}>
                        <View style={{
                            flexDirection: KEY.COLUMN, justifyContent: KEY.CENTER, alignItems: KEY.CENTER,
                            borderTopLeftRadius: 10, borderBottomLeftRadius: 10,
                            backgroundColor: COLOR.DEFALUTCOLOR, height: 70, width: WIDTH * 0.2
                        }}>
                            <MaterialCommunityIcons name='medal-outline' size={35}
                                style={{
                                    color: COLOR.WHITE,
                                    // marginRight: 20,
                                    marginTop: 15,
                                    //marginLeft: -65
                                }} />
                            <View style={{ height: 20, width: 20, borderRadius: 100, left: -15, top: -15, backgroundColor: COLOR.WHITE }} >
                                <MaterialCommunityIcons name='minus' size={15} style={{ color: COLOR.RED, alignSelf: KEY.CENTER, margin: 2 }} />
                            </View>
                        </View>
                        <View style={{ flexDirection: KEY.COLUMN, justifyContent: KEY.SPACEBETWEEN, marginTop: 10, marginBottom: 10 }}>
                            <Text numberOfLines={1}
                                style={{
                                    fontSize: FONT.FONT_SIZE_16, marginLeft: 10, width: WIDTH / 2,
                                    color: COLOR.BLACK, fontWeight: FONT.FONT_WEIGHT_BOLD, color: COLOR.RED
                                }}>{"Paid to JioMart"}</Text>
                            <Text style={{ fontSize: FONT.FONT_SIZE_14, marginLeft: 10, color: COLOR.GRANITE_GRAY }}>{moment().format('DD MMM YYYY hh:mm a')}</Text>
                        </View>
                        <View style={{ flexDirection: KEY.COLUMN, justifyContent: KEY.SPACEBETWEEN, marginTop: 10, marginBottom: 10 }}>
                            <Text style={{
                                fontSize: FONT.FONT_SIZE_16, marginLeft: 10,
                                color: COLOR.BLACK, fontWeight: FONT.FONT_WEIGHT_BOLD, color: COLOR.RED
                            }}>{"-500 pts"}</Text>
                            <Text style={{ fontSize: FONT.FONT_SIZE_14, marginLeft: -20, color: COLOR.GRANITE_GRAY }}>{"Balance 50 pts"}</Text>
                        </View>
                    </View>

                    <View style={styles.transactionView}>
                        <View style={{
                            flexDirection: KEY.COLUMN, justifyContent: KEY.CENTER, alignItems: KEY.CENTER,
                            borderTopLeftRadius: 10, borderBottomLeftRadius: 10,
                            backgroundColor: COLOR.DEFALUTCOLOR, height: 70, width: WIDTH * 0.2
                        }}>
                            <MaterialCommunityIcons name='medal-outline' size={35}
                                style={{
                                    color: COLOR.WHITE,
                                    // marginRight: 20,
                                    marginTop: 15,
                                    //marginLeft: -65
                                }} />
                            <View style={{ height: 20, width: 20, borderRadius: 100, left: -15, top: -15, backgroundColor: COLOR.WHITE }} >
                                <MaterialCommunityIcons name='minus' size={15} style={{ color: COLOR.RED, alignSelf: KEY.CENTER, margin: 2 }} />
                            </View>
                        </View>
                        <View style={{ flexDirection: KEY.COLUMN, justifyContent: KEY.SPACEBETWEEN, marginTop: 10, marginBottom: 10 }}>
                            <Text numberOfLines={1}
                                style={{
                                    fontSize: FONT.FONT_SIZE_16, marginLeft: 10, width: WIDTH / 2,
                                    color: COLOR.BLACK, fontWeight: FONT.FONT_WEIGHT_BOLD, color: COLOR.RED
                                }}>{"Paid to JioMart"}</Text>
                            <Text style={{ fontSize: FONT.FONT_SIZE_14, marginLeft: 10, color: COLOR.GRANITE_GRAY }}>{moment().format('DD MMM YYYY hh:mm a')}</Text>
                        </View>
                        <View style={{ flexDirection: KEY.COLUMN, justifyContent: KEY.SPACEBETWEEN, marginTop: 10, marginBottom: 10 }}>
                            <Text style={{
                                fontSize: FONT.FONT_SIZE_16, marginLeft: 10,
                                color: COLOR.BLACK, fontWeight: FONT.FONT_WEIGHT_BOLD, color: COLOR.RED
                            }}>{"-500 pts"}</Text>
                            <Text style={{ fontSize: FONT.FONT_SIZE_14, marginLeft: -20, color: COLOR.GRANITE_GRAY }}>{"Balance 50 pts"}</Text>
                        </View>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default RewardPointTransaction;
