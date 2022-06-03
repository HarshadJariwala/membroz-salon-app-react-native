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

    useEffect(() => {
        // CHECK AUTHCONTROLLER USE TO LOGIN OR NOT LOGIN        
        RemoteController();
        //LANGUAGE MANAGEMENT FUNCTION
        MemberLanguage();

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
    }, [loading, offerList, authKey, appLogo]);

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
                    height: 60, width: 60, marginBottom: 10, borderRadius: 100,
                    justifyContent: KEY.CENTER, alignItems: KEY.CENTER, marginTop: 5,
                    alignSelf: KEY.CENTER, marginLeft: -5, borderColor: COLOR.DEFALUTCOLOR,
                }}>
                    <Image
                        source={item?.property && item?.property?.image &&
                            item?.property?.image[0] && item?.property?.image[0]?.attachment
                            ? { uri: item.property.image[0].attachment } : { uri: appLogo }
                        }
                        style={{
                            height: 50, width: 50,
                            tintColor: COLOR.DEFALUTCOLOR, borderColor: COLOR.DEFALUTCOLOR, borderRadius: 100
                        }} />
                </View>
                <Text numberOfLines={1} style={styles.titleText}>
                    {item.couponcode}
                </Text>
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
            <View style={{ marginTop: 60 }} />
            <FlatList
                style={{ marginTop: 15 }}
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

            {loading ? <Loader /> : null}
        </SafeAreaView>
    )
}

export default OfferScreen;
