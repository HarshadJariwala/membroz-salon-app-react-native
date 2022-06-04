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
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import Toast from 'react-native-simple-toast';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import styles from './InviteFriendStyle';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const InviteFriendScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.DEFALUTCOLOR} barStyle={KEY.DARK_CONTENT} />
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                    <Text style={{
                        fontSize: FONT.FONT_SIZE_22, color: COLOR.DEFALUTCOLOR,
                        fontWeight: FONT.FONT_WEIGHT_BOLD
                    }}>{"Invite your friends &"}</Text>
                    <Text style={{
                        fontSize: FONT.FONT_SIZE_22, color: COLOR.DEFALUTCOLOR,
                        fontWeight: FONT.FONT_WEIGHT_BOLD
                    }}>{"earn credits/rewards"}</Text>
                    <Image style={{ height: 200, width: 400, resizeMode: KEY.COVER, marginTop: 20 }}
                        source={require("../../assets/images/images/img1.png")} />

                    <Text style={{
                        fontSize: FONT.FONT_SIZE_18, color: COLOR.BLACK,
                        fontWeight: FONT.FONT_WEIGHT_BOLD
                    }}>{"Your Referral Code"}</Text>
                    <View style={styles.referCodeStyle}>
                        <Text style={styles.referCodetext}>{"CLUBS1022"}</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default InviteFriendScreen;
