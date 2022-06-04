import React, { useState, useEffect } from 'react';
import {
    View, Text, SafeAreaView, TouchableOpacity, ScrollView,
    Image, StatusBar, FlatList, RefreshControl, Animated
} from 'react-native';
import { getByIdNotificationDeleteService, NotificationService, deleteAllNotificationService }
    from '../../services/NotificationService/NotificationService';
import { MemberLanguage } from '../../services/LocalService/LanguageService';
import crashlytics, { firebase } from "@react-native-firebase/crashlytics";
import * as LocalService from '../../services/LocalService/LocalService';
import AsyncStorage from '@react-native-community/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import AntDesign from 'react-native-vector-icons/AntDesign';
import languageConfig from '../../languages/languageConfig';
import * as SCREEN from '../../context/screen/screenName';
import { AUTHUSER } from '../../context/actions/type';
import Loader from '../../components/loader/index';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import Toast from 'react-native-simple-toast';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import * as STYLE from './styles';
import moment from 'moment';

const NotificationScreen = (props) => {
    const [loading, setloading] = useState(false);
    const [notification, setNotification] = useState(0);
    const [notificationList, setNotificationList] = useState([]);
    const [MemberId, setMemberID] = useState(null);
    const [refreshing, setrefreshing] = useState(false);

    useEffect(() => {
    }, [loading, notification, notificationList, MemberId, refreshing]);

    useEffect(() => {
        setloading(true);
        AsyncStorage.getItem(AUTHUSER).then(async (res) => {
            let id = JSON.parse(res)._id;
            getNotification(id);
            setMemberID(id);
        });
    }, []);

    const wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    //refresh function
    const onRefresh = () => {
        setrefreshing(true);
        getNotification(MemberId);
        wait(3000).then(() => setrefreshing(false));
    }

    //get Notification Api 
    const getNotification = async (id) => {
        try {
            const response = await NotificationService(id);
            setNotification(response.data.length);
            setNotificationList(response.data);
        } catch (error) {
            firebase.crashlytics().recordError(error);
            //console.log(`error`, error);
        }
    }

    //render Notification on flatlist function
    const renderNotification = ({ item }) => (
        <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }} >
            <Swipeable renderRightActions={() => RightActions(item)} onSwipeableRightOpen={() => swipeToDeleteNotification(item)}>
                <View style={STYLE.styles.notificationview}>
                    <View style={{ alignItems: KEY.FLEX_END, justifyContent: KEY.FLEX_END, marginTop: 5 }}>
                        <Text style={{ fontSize: 12, marginRight: 20, color: '#999999' }}>
                            {moment(item.createdAt).format('LL') == moment(item.createdAt).format('LL') ? moment(item.createdAt).format('LT') : moment(item.createdAt).format('LLL')}
                        </Text>
                    </View>
                    <View style={{ flexDirection: KEY.ROW, flex: 1, marginTop: -30, marginLeft: 15, alignItems: KEY.CENTER }}>
                        <View style={{ width: 40, height: 40, backgroundColor: '#04DE71', borderRadius: 20, justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                            <FontAwesome name='rupee' size={25} color={COLOR.WHITE} />
                        </View>
                        <View style={{ flex: 1, marginLeft: 15 }}>
                            <Text style={{ fontSize: 12, color: '#F67742' }} >#{item.property.subject}</Text>
                            <Text style={{ fontSize: 14, color: COLOR.BLACK }}>{item.property.message}</Text>
                        </View>
                    </View>
                </View>
            </Swipeable>
        </View>
    )

    //swipe To Delete Notification function
    const swipeToDeleteNotification = async (item) => {
        try {
            const response = await getByIdNotificationDeleteService(item._id);
            if (response.data != null && response.data != undefined && response.status == 200)
                getNotification(MemberId);
        } catch (error) {
            firebase.crashlytics().recordError(error);
            console.log(`error`, error);
        }
    }

    //clear btn to all notification clear 
    const clearAllNotification = async () => {
        let clear = [];
        notificationList.forEach(ele => {
            clear.push(ele._id);
        });
        try {
            const response = await deleteAllNotificationService(clear);
            if (response.status === 200) {
                getNotification(MemberId);
            }
        } catch (error) {
            firebase.crashlytics().recordError(error);
            console.log(`error`, error);
        }
    }

    //swipe To Delete Left Actions
    const RightActions = () => {
        return (
            <View
                style={{ flex: 1, backgroundColor: COLOR.DEFALUTCOLOR, justifyContent: KEY.CENTER }}>
                <Text
                    style={{
                        color: COLOR.WHITE,
                        paddingHorizontal: 10,
                        fontWeight: FONT.FONT_WEIGHT_MEDIAM
                    }}>
                </Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.DEFALUTCOLOR} barStyle={KEY.DARK_CONTENT} />
            <ScrollView showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
                refreshControl={<RefreshControl refreshing={refreshing} title={languageConfig.pullrefreshtext} tintColor={COLOR.DEFALUTCOLOR} titleColor={COLOR.DEFALUTCOLOR} colors={[COLOR.DEFALUTCOLOR]} onRefresh={() => onRefresh()} />}>
                {(notificationList == null) || (notificationList && notificationList.length <= 0) ?
                    (loading ? null :
                        <Text style={{ textAlign: KEY.CENTER, fontSize: 16, color: '#747474', marginTop: 50 }}>No Notification available</Text>
                    )
                    :
                    <FlatList
                        data={notificationList}
                        renderItem={renderNotification}
                        keyExtractor={item => item._id}
                    />
                }

                <View style={{ paddingBottom: 50 }} />
            </ScrollView>
        </SafeAreaView>
    )
}

export default NotificationScreen;
