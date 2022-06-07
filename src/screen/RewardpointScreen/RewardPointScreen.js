import React, { useEffect, useState } from 'react';
import {
    View, Text, Dimensions, SafeAreaView, FlatList,
    Image, TextInput, ScrollView, TouchableOpacity, StatusBar, Keyboard, Platform
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { RemoteServerController } from '../../services/LocalService/LocalService';
import { MemberLanguage } from '../../services/LocalService/LanguageService';
import crashlytics, { firebase } from "@react-native-firebase/crashlytics";
import languageConfig from '../../languages/languageConfig';
import * as SCREEN from '../../context/screen/screenName';
import Loader from '../../components/loader/index';
import RenderHTML from 'react-native-render-html';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import Toast from 'react-native-simple-toast';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import styles from './RewardPointStyle';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const rewardpontlist = [
    {
        "id": "1",
        "title": "Gym Package",
        "pointcode": "100 points",
        "description": "Flat 15% off an gym gold membership package"
    },
    {
        "id": "2",
        "title": "Gym Package",
        "pointcode": "100 points",
        "description": "Flat 15% off an gym gold membership package"
    },
    {
        "id": "3",
        "title": "Gym Package",
        "pointcode": "100 points",
        "description": "Flat 15% off an gym gold membership package"
    },
    {
        "id": "4",
        "title": "Gym Package",
        "pointcode": "100 points",
        "description": "Flat 15% off an gym gold membership package"
    },
    {
        "id": "5",
        "title": "Gym Package",
        "pointcode": "100 points",
        "description": "Flat 15% off an gym gold membership package"
    },
    {
        "id": "6",
        "title": "Gym Package",
        "pointcode": "100 points",
        "description": "Flat 15% off an gym gold membership package"
    }
];

const RewardPointScreen = (props) => {

    //OFFERS RENDER FUNCTION
    const renderRewardPoint = ({ item }) => (
        <TouchableOpacity style={{ marginBottom: 0 }}>
            <TouchableOpacity style={styles.viewSquareTwoColumn}>
                <Text numberOfLines={1} style={styles.titleText}>
                    {item.title}
                </Text>
                <Text style={styles.descripationText}>
                    <RenderHTML contentWidth={WIDTH / 3} source={{ html: item.description }} baseStyle={styles.tagsStyles} />
                </Text>
                <View style={styles.rewardpointStyle}>
                    <Text style={styles.rewardpointtext}>{item.pointcode}</Text>
                </View>
            </TouchableOpacity>
        </TouchableOpacity>
    )

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.STATUSBARCOLOR} barStyle={KEY.DARK_CONTENT} />
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
                <View style={styles.viewMain}>
                    <View style={styles.viewRectangle}>
                        <View style={styles.rounfIconStyle}>
                            <MaterialCommunityIcons name='medal-outline' size={30} color={COLOR.DEFALUTCOLOR} />
                        </View>
                        <Text style={{
                            fontSize: FONT.FONT_SIZE_16, textTransform: KEY.CAPITALIZE, color: COLOR.BLACK,
                            fontWeight: FONT.FONT_WEIGHT_BOLD, marginTop: 5
                        }}>{languageConfig.yourrewardpoint}</Text>
                        <Text style={{
                            fontSize: FONT.FONT_SIZE_22, textTransform: KEY.CAPITALIZE, color: COLOR.BLACK,
                            fontWeight: FONT.FONT_WEIGHT_BOLD, marginTop: 5, marginBottom: 10
                        }}>{"400"}</Text>

                        <TouchableOpacity onPress={() => props.navigation.navigate(SCREEN.REWARDPOINTTRANSACTION)}>
                            <Text style={{
                                fontSize: FONT.FONT_SIZE_16, textTransform: KEY.CAPITALIZE,
                                color: COLOR.DEFALUTCOLOR, marginBottom: 15
                            }}>{languageConfig.pointhistory}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{
                    flexDirection: KEY.ROW, marginTop: 10,
                    alignSelf: KEY.FLEX_START, marginLeft: 20
                }}>
                    <Text style={{
                        fontSize: FONT.FONT_SIZE_18, color: COLOR.BLACK,
                        fontWeight: FONT.FONT_WEIGHT_BOLD
                    }}>{languageConfig.redeemtext}</Text>
                    <Text style={{
                        fontSize: FONT.FONT_SIZE_18, textTransform: KEY.CAPITALIZE, color: COLOR.DEFALUTCOLOR,
                        fontWeight: FONT.FONT_WEIGHT_BOLD, marginLeft: 5
                    }}>{languageConfig.pointtext}</Text>
                </View>

                <FlatList
                    style={{ marginTop: 0 }}
                    data={rewardpontlist}
                    numColumns={2}
                    keyExtractor={(item, index) => index.toString()}
                    keyboardShouldPersistTaps={KEY.ALWAYS}
                    renderItem={renderRewardPoint}
                    contentContainerStyle={{ paddingBottom: 20, alignSelf: KEY.CENTER }}
                />
            </ScrollView>
        </SafeAreaView>
    )
}

export default RewardPointScreen;
