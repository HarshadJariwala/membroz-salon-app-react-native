import React, { useEffect, useState } from 'react';
import {
    View, Text, Dimensions, SafeAreaView, FlatList, RefreshControl, ActivityIndicator,
    Image, ScrollView, TouchableOpacity, StatusBar, Platform, StyleSheet
} from 'react-native';
import { ExpoloreFilterService } from '../../services/ExploreService/ExploreService';
import { RemoteServerController } from '../../services/LocalService/LocalService';
import { MemberLanguage } from '../../services/LocalService/LanguageService';
import crashlytics, { firebase } from "@react-native-firebase/crashlytics";
import * as LocalService from '../../services/LocalService/LocalService';
import languageConfig from '../../languages/languageConfig';
import * as SCREEN from '../../context/screen/screenName';
import axiosConfig from '../../helpers/axiosConfig';
import Loader from '../../components/loader/index';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import styles from './ExploreStyle';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const ExploreScreen = (props) => {
    const [loading, setLoading] = useState(false);
    const [exploreList, setExploreList] = useState([]);
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

    //GET MEMBER DATA IN MOBILE LOCAL STORAGE
    const getMemberDeatilsLocalStorage = async () => {
        var memberInfo = await LocalService.LocalStorageService();
        if (memberInfo) {
            setMemberInfo(memberInfo);
        }
    }

    //REMOTE DATA FATCH IN LOCAL STORAGE
    async function RemoteController() {
        var userData = await RemoteServerController();
        if (userData) {
            // setAuthKey(userData.authkey);
            axiosConfig(userData.authkey);
            setAuthKey(userData.authkey);
            setAppLogo(userData.applogo);
            //GET OFFER LIST
            await getExploreList();
        }
    };

    useEffect(() => {
    }, [loading, exploreList, authKey, appLogo, memberInfo]);

    //GETEXPLORELIST TO CALL FUNCTION
    const getExploreList = async () => {
        setLoading(true);
        try {
            const response = await ExpoloreFilterService();
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                setExploreList(response.data);
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            firebase.crashlytics().recordError(error);
        }
    }

    //CLICK TO NAVIGRATE EXPLORE STATUS SCREEN
    const onPressHandler = (item) => {
        if (item)
            return props.navigation.navigate(SCREEN.EXPLORESTATUS, { item });
    }

    //RENDER EXPLORELIST FUNCTION
    const renderExploreList = ({ item }) => (
        <TouchableOpacity style={styles.cardView} onPress={() => onPressHandler(item)}>
            <View style={{ alignItems: KEY.CENTER }} >
                <Image source={{
                    uri: (item.property && item.property.image && item.property.image[0] && item.property.image[0].attachment ?
                        item.property.image[0].attachment : appLogo)
                }}
                    style={styles.cardImage}
                />
            </View>
            <View style={{
                flexDirection: KEY.ROW, justifyContent: KEY.FLEX_START,
                marginLeft: 10, marginRight: 10, marginBottom: 10, marginTop: 10
            }}>
                <Text style={{ fontSize: 16, color: COLOR.LIGHT_BLACK, width: WIDTH - 40 }}>{item.property.title}</Text>
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
        getExploreList();
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
                exploreList && exploreList.length > 0 ?
                    <FlatList
                        style={{ marginTop: 0 }}
                        data={exploreList}
                        keyExtractor={(item, index) => index.toString()}
                        keyboardShouldPersistTaps={KEY.ALWAYS}
                        renderItem={renderExploreList}
                        contentContainerStyle={{ paddingBottom: 20, alignSelf: KEY.CENTER }}
                        showsVerticalScrollIndicator={false}
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

export default ExploreScreen
