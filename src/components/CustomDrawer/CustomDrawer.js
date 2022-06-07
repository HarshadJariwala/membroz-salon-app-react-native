import React, { useEffect, useState } from 'react';
import {
    View, Text,
    ImageBackground, Image,
    TouchableOpacity, Alert,
    StyleSheet, Dimensions
} from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { MemberLanguage } from '../../services/LocalService/LanguageService';
import * as LocalService from '../../services/LocalService/LocalService';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-community/async-storage';
import languageConfig from '../../languages/languageConfig';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { useFocusEffect } from '@react-navigation/native';
import * as SCREEN from '../../context/screen/screenName';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';

const CustomDrawer = (props) => {
    const [memberInfo, setMemberInfo] = useState(null);
    const [memberProfilePic, setMemberProfilePic] = useState(null);
    const [memberNumber, setMemberNumber] = useState(null);
    const [memberName, setMemberName] = useState(null);

    useFocusEffect(
        React.useCallback(() => {
            const getCallBackScreen = () => {
                //LANGUAGE MANAGEMENT FUNCTION
                MemberLanguage();
                if (memberInfo) {
                    setMemberProfilePic(memberInfo?.profilepic);
                    setMemberNumber(memberInfo?.membernumber);
                    setMemberName(memberInfo?.fullname);
                }
            }
            getCallBackScreen();
        }, [])
    );

    useEffect(() => {
        getMemberDeatilsLocalStorage();
    }, [])

    //GET MEMBER DATA IN MOBILE LOCAL STORAGE
    const getMemberDeatilsLocalStorage = async () => {
        var memberInfo = await LocalService.LocalStorageService();
        if (memberInfo) {
            setMemberInfo(memberInfo);
            setMemberProfilePic(memberInfo?.profilepic);
            setMemberNumber(memberInfo?.membernumber);
            setMemberName(memberInfo?.fullname);
        }
    }

    //LOGOUT BUTTON CLICK TO CALL 
    const onPressLogout = () => {
        Alert.alert(
            languageConfig.Logouttext,
            languageConfig.profilelogout,
            [
                {
                    text: languageConfig.cancel,
                    style: "cancel"
                },
                {
                    text: languageConfig.Logouttext2, onPress: () => {
                        AsyncStorage.removeItem(KEY.AUTHUSERINFO);
                        // AsyncStorage.removeItem(REMOVEDATA);
                        AsyncStorage.removeItem(KEY.AUTHUSER);
                        Toast.show(languageConfig.logoutsuccessmessage, Toast.SHORT);
                        props.navigation.replace(SCREEN.AUTH);
                    }
                }
            ]
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView
                {...props}
                contentContainerStyle={{ backgroundColor: COLOR.WHI }}>
                <View style={{ justifyContent: KEY.FLEX_START, alignItems: KEY.FLEX_START }}>
                    <TouchableOpacity onPress={() => props.navigation.navigate(SCREEN.UPDATEPROFILESCREEN)}>
                        <View style={{ flexDirection: KEY.ROW, marginTop: 10, marginBottom: 10 }}>
                            <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                                <View style={styles.rounfIconStyle}>
                                    <Image style={{
                                        borderRadius: 100,
                                        width: 45, height: 45
                                    }} source={!memberProfilePic ? IMAGE.USERPROFILE : { uri: memberProfilePic }} />
                                </View>
                            </View>
                            <View style={{ justifyContent: KEY.CENTER, flexDirection: KEY.COLUMN, marginLeft: 10, width: "65%" }}>
                                <Text numberOfLines={1} style={{ fontSize: FONT.FONT_SIZE_14, color: COLOR.BLACK, fontWeight: FONT.FONT_BOLD }}>{memberName}</Text>
                                <Text numberOfLines={1} style={{ fontSize: FONT.FONT_SIZE_14, color: COLOR.BLACK }}>{"Member Id #" + memberNumber}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, backgroundColor: COLOR.WHITE, marginTop: 5 }}>
                    <DrawerItemList {...props} />
                    <TouchableOpacity onPress={() => onPressLogout()} style={{ paddingVertical: 0, marginLeft: 20 }}>
                        <View style={{ flexDirection: KEY.ROW, alignItems: KEY.CENTER }}>
                            <Image source={IMAGE.LOGOUTICON}
                                style={{ width: 20, height: 20, tintColor: COLOR.BLACK }} />
                            <Text style={{ fontSize: FONT.FONT_SIZE_16, fontWeight: FONT.FONT_NORMAL, marginLeft: 16, color: COLOR.BLACK }}>
                                {languageConfig.Logouttext}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </DrawerContentScrollView>
        </View>
    );
};

export default CustomDrawer;

const styles = StyleSheet.create({
    rounfIconStyle: {
        marginLeft: 15,
        height: 50,
        width: 50,
        borderRadius: 100,
        borderColor: COLOR.DEFALUTCOLOR,
        borderWidth: 2,
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER
    },
    rectangleText: {
        fontSize: FONT.FONT_SIZE_14,
        color: COLOR.GRANITE_GRAY,
        marginTop: 5,
    }
});