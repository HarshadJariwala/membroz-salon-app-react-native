import React, { useEffect, useState } from 'react';
import {
    View, Text, Dimensions, SafeAreaView, FlatList, RefreshControl, ActivityIndicator,
    Image, ScrollView, TouchableOpacity, StatusBar, Platform, StyleSheet
} from 'react-native';
import { getPackageService } from '../../services/PackageService/PackageService';
import { MemberLanguage } from '../../services/LocalService/LanguageService';
import crashlytics, { firebase } from "@react-native-firebase/crashlytics";
import * as LocalService from '../../services/LocalService/LocalService';
import getCurrency from "../../services/getCurrencyService/getCurrency";
import languageConfig from '../../languages/languageConfig';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as SCREEN from '../../context/screen/screenName';
import axiosConfig from '../../helpers/axiosConfig';
import Loader from '../../components/loader/index';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import styles from './Packagestyle';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const Package = (props) => {
    const [loading, setLoading] = useState(false);
    const [packageList, setPackageList] = useState([]);
    const [refreshing, setrefreshing] = useState(false);
    const [appLogo, setAppLogo] = useState(null);
    const [memberInfo, setMemberInfo] = useState(null);
    const [memberID, setMemberID] = useState(null);
    const [currencySymbol, setCurrencySymbol] = useState(null);

    useEffect(() => {
        MemberLanguage();
        RemoteController();
        getMemberDeatilsLocalStorage();
    }, []);

    //REMOTE DATA FATCH IN LOCAL STORAGE
    const RemoteController = async () => {
        var userData = await LocalService.RemoteServerController();
        if (userData) {
            setAppLogo(userData.applogo);
        }
    };

    //TIME OUT FUNCTION
    const wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    //GET PULL TO REFRESH FUNCTION
    const onRefresh = () => {
        setrefreshing(true);
        getPackageList();
        wait(3000).then(() => setrefreshing(false));
    }

    //GET MEMBER DATA IN MOBILE LOCAL STORAGE
    const getMemberDeatilsLocalStorage = async () => {
        var memberInfo = await LocalService.LocalStorageService();
        setLoading(true);
        if (memberInfo) {
            const response = getCurrency(memberInfo.branchid.currency);
            axiosConfig(memberInfo._id);
            setCurrencySymbol(response);
            setMemberID(memberInfo?._id);
            setMemberInfo(memberInfo?._id);
            getPackageList();
        } else {
            var publicUserInfo = await LocalService.LocalBranchDetails();
            axiosConfig(publicUserInfo._id);
            const response = getCurrency(publicUserInfo.branchid.currency);
            setCurrencySymbol(response);
            getPackageList();
        }
    }

    //GET PACKAGE LIST TO CALL FUNCTION
    const getPackageList = async () => {
        setLoading(true);
        try {
            const response = await getPackageService();
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                setPackageList(response.data);
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            firebase.crashlytics().recordError(error);
        }
    }

    //FLATLIST USEING RENDER PACKAGE LIST
    const renderPackage = ({ item }) => (
        <View style={styles.img_card}>
            <Image style={styles.img}
                source={{ uri: item.profilepic && item.profilepic ? item.profilepic : appLogo }} />
            <View style={{ flexDirection: KEY.COLUMN, marginLeft: 10, width: WIDTH - 140 }}>
                <View style={{ flexDirection: KEY.ROW, marginTop: 10, justifyContent: KEY.SPACEBETWEEN }}>
                    <Text numberOfLines={1} style={[styles.text, { width: WIDTH / 2 }]}>{item.membershipname}</Text>
                    <Text style={{
                        fontSize: FONT.FONT_SIZE_16,
                        color: COLOR.BLACK,
                        fontWeight: FONT.FONT_BOLD,
                        marginRight: 10
                    }}>{currencySymbol + (item.property && item.property.cost ? item.property.cost : '---')}</Text>
                </View>
                <View style={{ flexDirection: KEY.ROW, marginTop: 5 }}>
                    <Ionicons name='location-outline' size={20} color={COLOR.DEFALUTCOLOR} />
                    <Text numberOfLines={1}
                        style={{ marginLeft: 5, fontSize: FONT.FONT_SIZE_14, color: COLOR.BLACK, width: WIDTH / 3 }}>
                        {item.membershipname}
                    </Text>
                </View>
                <View style={{ flexDirection: KEY.ROW }}>
                    <View style={{ flexDirection: KEY.ROW, marginTop: 5, marginLeft: 2 }}>
                        <Image source={IMAGE.TIMEICON} style={{ tintColor: COLOR.DEFALUTCOLOR, height: 20, width: 16 }} />
                        <Text style={{ marginLeft: 7, fontSize: FONT.FONT_SIZE_14, color: COLOR.BLACK }}>
                            {item.property ? item.property.tenure + languageConfig.months : '--'}
                        </Text>
                    </View>
                </View>
                <View style={{ alignSelf: KEY.FLEX_END, marginTop: -14 }}>
                    <TouchableOpacity style={styles.upgrade} onPress={() => onPressViewPackage(item)} >
                        <Text style={styles.textbutton}>
                            {languageConfig.viewmoretext}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )

    //VIEW MORE BTN CLICK TO VIEW PACKAGE DETAILS
    const onPressViewPackage = (item) => {
        if (item) {
            props.navigation.navigate(SCREEN.PACKAGEDETAILSCREEN, { item });
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.STATUSBARCOLOR} barStyle={KEY.DARK_CONTENT} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <FlatList
                    style={{ marginBottom: HEIGHT * 0.2 }}
                    showsVerticalScrollIndicator={false}
                    key={packageList && packageList.length}
                    data={packageList}
                    contentContainerStyle={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}
                    renderItem={renderPackage}
                    keyExtractor={item => item._id}
                    keyboardShouldPersistTaps={KEY.ALWAYS}
                    ListFooterComponent={() => (
                        packageList && packageList.length == 0 &&
                        <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                            <Image source={IMAGE.NODATA} style={{ height: 150, width: 200, marginTop: HEIGHT * 0.2 }} resizeMode={KEY.CONTAIN} />
                            <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.TAUPE_GRAY, marginTop: 10 }}>{languageConfig.norecordtext}</Text>
                        </View>
                    )}
                />
            </ScrollView>
            {loading ? <Loader /> : null}
        </SafeAreaView>
    )
}

export default Package;
