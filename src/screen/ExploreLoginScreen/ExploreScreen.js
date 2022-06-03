import React, { useEffect, useState } from 'react';
import {
    View, Text, Dimensions, SafeAreaView, FlatList, RefreshControl,
    Image, ScrollView, TouchableOpacity, StatusBar, Platform
} from 'react-native';
import { ExpoloreFilterService } from '../../services/ExploreService/ExploreService';
import { RemoteServerController } from '../../services/LocalService/LocalService';
import { MemberLanguage } from '../../services/LocalService/LanguageService';
import crashlytics, { firebase } from "@react-native-firebase/crashlytics";
import languageConfig from '../../languages/languageConfig';
import * as SCREEN from '../../context/screen/screenName';
import axiosConfig from '../../helpers/axiosConfig';
import Loader from '../../components/loader/index';
import RenderHTML from 'react-native-render-html';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import styles from './ExploreStyle';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const ExploreScreen = () => {
    const [loading, setLoading] = useState(false);
    const [exploreList, setExploreList] = useState([]);
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
            await getExploreList();
        }
    };

    useEffect(() => {
    }, [loading, exploreList, authKey, appLogo]);

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

    //RENDER EXPLORELIST FUNCTION
    const renderExploreList = ({ item }) => (
        <TouchableOpacity style={styles.cardView}>
            <View style={{ alignItems: KEY.CENTER }} onPress={() => { }}>
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
            <View style={{ marginTop: 60 }} />
            <FlatList
                style={{ marginTop: 15 }}
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
            {loading ? <Loader /> : null}
        </SafeAreaView>
    )
}

export default ExploreScreen
