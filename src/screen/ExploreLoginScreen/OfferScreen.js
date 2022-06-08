import React, { useEffect, useState } from 'react';
import {
    View, Text, Dimensions, SafeAreaView, FlatList, RefreshControl,
    Image, ScrollView, TouchableOpacity, StatusBar, Platform
} from 'react-native';
import { RemoteServerController } from '../../services/LocalService/LocalService';
import { MemberLanguage } from '../../services/LocalService/LanguageService';
import crashlytics, { firebase } from "@react-native-firebase/crashlytics";
import { OfferService } from '../../services/OfferService/OfferService';
import languageConfig from '../../languages/languageConfig';
import * as LocalService from '../../services/LocalService/LocalService';
import * as SCREEN from '../../context/screen/screenName';
import axiosConfig from '../../helpers/axiosConfig';
import Loader from '../../components/loader/index';
import RenderHTML from 'react-native-render-html';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import styles from './OfferStyle';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const OfferScreen = (props) => {
    const [loading, setLoading] = useState(false);
    const [offerList, setOfferList] = useState([]);
    const [authKey, setAuthKey] = useState(null);
    const [refreshing, setrefreshing] = useState(false);
    const [appLogo, setAppLogo] = useState(null);
    const [memberInfo, setMemberInfo] = useState(null);
    useEffect(() => {
        // CHECK AUTHCONTROLLER USE TO LOGIN OR NOT LOGIN        
        RemoteController();
        //LANGUAGE MANAGEMENT FUNCTION
        MemberLanguage();
        getMemberDeatilsLocalStorage();
    }, []);

    //REMOTE DATA FATCH IN LOCAL STORAGE
    async function RemoteController() {
        var userData = await RemoteServerController();
        if (userData) {
            // setAuthKey(userData.authkey);
            axiosConfig(userData.authkey);
            setAuthKey(userData.authkey);
            setAppLogo(userData.applogo);
            //GET OFFER LIST
            await getOfferList();
        }
    };

    useEffect(() => {
    }, [loading, offerList, authKey, appLogo, memberInfo]);

    //GET MEMBER DATA IN MOBILE LOCAL STORAGE
    const getMemberDeatilsLocalStorage = async () => {
        var memberInfo = await LocalService.LocalStorageService();
        if (memberInfo) {
            setMemberInfo(memberInfo);
        }
    }

    //LOGIN BTN CLICK TO CALL FUNCTION
    const getOfferList = async () => {
        setLoading(true);
        try {
            const response = await OfferService();
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                setOfferList(response.data);
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            firebase.crashlytics().recordError(error);
        }
    }

    //OFFERS RENDER FUNCTION
    const renderOffers = ({ item }) => (
        <TouchableOpacity style={{ marginBottom: 0 }}>
            <View style={styles.viewSquareTwoColumn}>
                <View style={{
                    marginBottom: 5, borderRadius: 100,
                    justifyContent: KEY.CENTER, alignItems: KEY.CENTER, marginTop: 0,
                    alignSelf: KEY.CENTER, marginLeft: -5, borderColor: COLOR.DEFALUTCOLOR,
                }}>
                    <Text style={styles.titleText}>
                        {item.couponcode}
                    </Text>
                    <Text style={styles.subtitleText}>
                        {item.appliedcouponper}
                    </Text>
                </View>
                {item?.property?.description &&
                    <Text style={styles.descripationText}>
                        <RenderHTML contentWidth={WIDTH / 3}
                            source={{ html: item.property.description }}
                            baseStyle={styles.tagsStyles} />
                    </Text>
                }
            </View>
        </TouchableOpacity>
    )

    //TIME OUT FUNCTION
    const wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    //GET PULL TO REFRESH FUNCTION
    const onRefresh = () => {
        setrefreshing(true);
        getOfferList();
        wait(3000).then(() => setrefreshing(false));
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={KEY.TRANSPARENT} barStyle={KEY.DARK_CONTENT} />
            {
                memberInfo ?
                    <View style={{ marginTop: 0 }} />
                    :
                    <View style={{ marginTop: 80 }} />
            }
            {
                offerList && offerList.length > 0 ?
                    <FlatList
                        style={{ marginTop: 0 }}
                        data={offerList}
                        numColumns={2}
                        keyExtractor={(item, index) => index.toString()}
                        keyboardShouldPersistTaps={KEY.ALWAYS}
                        renderItem={renderOffers}
                        contentContainerStyle={{ paddingBottom: 20, alignSelf: KEY.CENTER }}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                title={languageConfig.pullrefreshtext}
                                tintColor={COLOR.DEFALUTCOLOR}
                                titleColor={COLOR.DEFALUTCOLOR}
                                colors={[COLOR.DEFALUTCOLOR]}
                                onRefresh={onRefresh} />
                        }
                    />
                    :
                    loading == false ?
                        <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                            <Image source={IMAGE.NODATA} style={{ height: 150, width: 200, marginTop: HEIGHT * 0.2 }} resizeMode={KEY.CONTAIN} />
                            <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.TAUPE_GRAY, marginTop: 10 }}>{languageConfig.norecordtext}</Text>
                        </View>
                        : <Loader />
            }
        </SafeAreaView>
    )
}

export default OfferScreen;
