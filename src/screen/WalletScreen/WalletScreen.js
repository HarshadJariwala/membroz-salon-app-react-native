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
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import * as SCREEN from '../../context/screen/screenName';
import Loader from '../../components/loader/index';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import Toast from 'react-native-simple-toast';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import styles from './WalletStyle';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const WalletScreen = (props) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.DEFALUTCOLOR} barStyle={KEY.DARK_CONTENT} />
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
                <View style={styles.viewMain}>
                    <View style={styles.viewRectangle}>
                        <View style={styles.rounfIconStyle}>
                            <Ionicons name='wallet-outline' size={30} color={COLOR.DEFALUTCOLOR} />
                        </View>
                        <Text style={{
                            fontSize: FONT.FONT_SIZE_16, textTransform: KEY.CAPITALIZE, color: COLOR.BLACK,
                            fontWeight: FONT.FONT_WEIGHT_BOLD, marginTop: 5
                        }}>{languageConfig.yourwalletbalance}</Text>
                        <Text style={{
                            fontSize: FONT.FONT_SIZE_22, textTransform: KEY.CAPITALIZE, color: COLOR.BLACK,
                            fontWeight: FONT.FONT_WEIGHT_BOLD, marginTop: 5, marginBottom: 10
                        }}>{"$500"}</Text>
                    </View>
                </View>

                <View style={styles.viewMain}>
                    <View style={styles.viewRectangle}>
                        <View style={{
                            flexDirection: KEY.ROW, marginTop: 10,
                            alignSelf: KEY.FLEX_START, marginLeft: 20
                        }}>
                            <Text style={{
                                fontSize: FONT.FONT_SIZE_18, color: COLOR.BLACK,
                                fontWeight: FONT.FONT_WEIGHT_BOLD
                            }}>{languageConfig.addmomenywallet}</Text>
                            <Text style={{
                                fontSize: FONT.FONT_SIZE_18, textTransform: KEY.CAPITALIZE, color: COLOR.DEFALUTCOLOR,
                                fontWeight: FONT.FONT_WEIGHT_BOLD, marginLeft: 5
                            }}>{languageConfig.wallet}</Text>
                        </View>

                        <View style={{ marginTop: 20 }}>
                            <TextInput
                                placeholder={languageConfig.amounttext}
                                style={styles.inputTextView}
                                type={KEY.CLEAR}
                                returnKeyType={KEY.NEXT}
                                placeholderTextColor={COLOR.PLACEHOLDER_COLOR}
                            />
                        </View>

                        <TouchableOpacity style={styles.btnStyle} onPress={() => { }}>
                            <Text style={{ fontWeight: FONT.FONT_WEIGHT_BOLD, color: COLOR.WHITE, fontSize: FONT.FONT_SIZE_18 }}>
                                {languageConfig.addmomenytext}</Text>
                        </TouchableOpacity>
                    </View>

                </View>

                <TouchableOpacity style={styles.transactionView} onPress={() => props.navigation.navigate(SCREEN.WALLETTRANSACTION)}>
                    <View style={{ flexDirection: KEY.ROW }}>
                        <MaterialCommunityIcons name='wallet' size={45}
                            style={{
                                color: COLOR.WHITE,
                                marginRight: 20,
                                marginTop: 15,
                                marginLeft: -65
                            }} />
                        <View style={{ flexDirection: KEY.COLUMN, width: WIDTH / 1.8 }}>
                            <Text style={{ fontWeight: FONT.FONT_WEIGHT_BOLD, color: COLOR.BLACK, fontSize: FONT.FONT_SIZE_18, marginLeft: 10, marginTop: 10 }}>
                                Transaction history
                            </Text>
                            <Text style={{ color: COLOR.BLACK, fontSize: FONT.FONT_SIZE_14, marginLeft: 10 }}>
                                View your wallet transaction history
                            </Text>
                        </View>
                        <View style={{ alignItems: KEY.FLEX_END, flex: 1, marginRight: 10, marginTop: 20 }}>
                            <MaterialCommunityIcons name='chevron-right' size={30} color={COLOR.BLACK} />
                        </View>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

export default WalletScreen;
