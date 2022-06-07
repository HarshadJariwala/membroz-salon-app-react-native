import React, { useEffect, useState } from 'react';
import {
    View, Text, Dimensions, SafeAreaView, FlatList, RefreshControl, ActivityIndicator,
    Image, ScrollView, TouchableOpacity, StatusBar, Platform, StyleSheet
} from 'react-native';
import { MemberLanguage } from '../../services/LocalService/LanguageService';
import crashlytics, { firebase } from "@react-native-firebase/crashlytics";
import * as LocalService from '../../services/LocalService/LocalService';
import languageConfig from '../../languages/languageConfig';
import * as SCREEN from '../../context/screen/screenName';
import Loader from '../../components/loader/index';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import styles from './ExploreStatusStyle';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
import { StoryContainer, ProgressBar } from 'react-native-stories-view';

const ExploreStatus = () => {
    const [loading, setLoading] = useState(false);
    const [memberInfo, setMemberInfo] = useState(null);

    useEffect(() => {
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

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#DDDDDD" }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={"#DDDDDD"} barStyle={KEY.DARK_CONTENT} />
            {
                memberInfo ?
                    <View style={{ marginTop: 0 }} />
                    :
                    <View style={{ marginTop: 30 }} />
            }
            <View style={{ backgroundColor: "#DDDDDD" }}>
                <StoryContainer
                    images={[
                        'https://picsum.photos/200/300',
                        'https://picsum.photos/id/237/200/300',
                        "https://picsum.photos/seed/picsum/200/300",
                        'https://picsum.photos/200/300',
                        'https://picsum.photos/id/237/200/300',
                        "https://picsum.photos/seed/picsum/200/300"
                    ]}
                    visible={true}
                    enableProgress={true}
                    onComplete={() => alert("onComplete")}
                    duration={10}
                    headerComponent={<View />}
                    containerStyle={{
                        width: '100%',
                        height: '100%',
                        marginTop: 10,//27,
                        backgroundColor: COLOR.BACKGROUNDCOLOR,
                    }}
                    barStyle={{
                        barActiveColor: COLOR.DEFALUTCOLOR,
                        barInActiveColor: COLOR.GRANITE_GRAY,
                        barWidth: 100,
                        barHeight: 4,
                    }}
                />
            </View>
        </SafeAreaView>
    )
}

export default ExploreStatus;
