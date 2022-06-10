import React, { useEffect, useState } from 'react';
import {
    Dimensions,
    SafeAreaView,
    ScrollView,
    Image,
    Text,
    View, TouchableOpacity, TextInput,
    StatusBar, RefreshControl, FlatList, Linking
} from 'react-native';
import { MemberLanguage } from '../../services/LocalService/LanguageService';
import { UserListService } from '../../services/UserService/UserService';
import * as LocalService from '../../services/LocalService/LocalService';
import languageConfig from '../../languages/languageConfig';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import * as SCREEN from '../../context/screen/screenName';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import Toast from 'react-native-simple-toast';
import * as COLOR from '../../styles/colors';
import Loader from '../../components/loader';
import * as IMAGE from '../../styles/image';
import styles from './OurSpecialistStyle';
import moment from 'moment';

const WIDTH = Dimensions.get('window').width;

const OurSpecialist = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [teamList, setTeamList] = useState([]);
    const [refreshing, setrefreshing] = useState(false);

    useEffect(() => {
        //LANGUAGE MANAGEMENT FUNCTION
        MemberLanguage();
        setLoading(true);
        getMyTeamList();
    }, [])

    useEffect(() => {
    }, [loading, refreshing, teamList])

    const onRefresh = () => {
        setrefreshing(true);
        getMyTeamList();
        wait(3000).then(() => setrefreshing(false));
    }

    //TIME OUT FUNCTION
    const wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    //GET MYTEAM API THROUGH FETCH DATA
    const getMyTeamList = async () => {
        //console.log("getMyTeamList")
        try {
            const response = await UserListService();
            //console.log("response", response)
            if (response.data != null && response.data != 'undefind' && response.status === 200) {
                wait(1000).then(() => {
                    setLoading(false);
                    setTeamList(response.data);
                });
            }
        } catch (error) {
            console.log(`error`, error)
            firebase.crashlytics().recordError(error);
            setLoading(false);
        }
    }

    //ON PRESS TO EMAIL TO USE FUNCTION
    const onPressEmail = (item) => {
        if (item && item.property && item.property.primaryemail) {
            let EmailAddress = item?.property?.primaryemail;
            const url = `mailto:${EmailAddress}`
            Linking.openURL(url);
        } else {
            Toast.show(languageConfig.emailwrong, Toast.SHORT);
        }
    }

    //ON PRESS TO CALL DIALER TO USE FUNCTION
    const onPressCall = (item) => {
        if (item && item.property && item.property.mobile) {
            let mobile = item?.property?.mobile;
            let phoneNumber = mobile;
            if (Platform.OS !== 'android') {
                phoneNumber = `telprompt:${mobile}`;
            }
            else {
                phoneNumber = `tel:${mobile}`;
            }
            Linking.openURL(phoneNumber);
        } else {
            Toast.show(languageConfig.contactnowrong, Toast.SHORT);
        }
    }

    //RENDER REFER FRIEND LIST USING FLATLIST
    const renderMyTeamList = ({ item }) => (
        <TouchableOpacity style={styles.cardView} onPress={() => navigation.navigate(SCREEN.OURSPECIALISTDTAILS, { item })}>
            <View style={{ flexDirection: KEY.ROW, width: WIDTH - 40, padding: 5, flex: 1, alignItems: KEY.CENTER }}>
                <View style={{ flexDirection: KEY.COLUMN, alignItems: KEY.CENTER, margin: 10 }}>
                    <View style={styles.viewRound}>
                        <Image source={!item.profilepic ? IMAGE.USERPROFILE : { uri: item.profilepic }}
                            style={!item.profilepic ? { height: 70, width: 70, borderRadius: 100 } : { height: 75, width: 75, borderRadius: 100 }} />
                    </View>
                </View>
                <View style={{ marginLeft: 10, flexDirection: KEY.COLUMN, alignItems: KEY.FLEX_START, width: WIDTH / 2 }}>
                    {item.property && item.property.fullname &&
                        <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.BLACK, fontWeight: FONT.FONT_WEIGHT_BOLD, textTransform: KEY.CAPITALIZE }}>
                            {item.property.fullname}</Text>}
                    {item.designationid && item.designationid.title &&
                        <Text style={{ marginTop: 2, fontSize: FONT.FONT_SIZE_14, color: COLOR.GRANITE_GRAY, textTransform: KEY.CAPITALIZE }}>
                            {item.designationid.title}</Text>}
                    {
                        item.property && item.property.mobile &&
                        <View style={{ marginTop: 2, flexDirection: KEY.ROW, alignItems: KEY.SPACEBETWEEN }}>
                            <TouchableOpacity onPress={() => onPressCall(item)}
                                style={{ alignItems: KEY.CENTER }}>
                                <Feather size={18} name="phone-call" color={COLOR.DEFALUTCOLOR} style={{ marginRight: 5 }} />
                            </TouchableOpacity>
                            <Text style={{ marginTop: 2, fontSize: FONT.FONT_SIZE_14, color: COLOR.GRANITE_GRAY }}>
                                {item.property.mobile}</Text>
                        </View>
                    }
                    {item.property && item.property.primaryemail &&
                        <View style={{ marginTop: 2, flexDirection: KEY.ROW, alignItems: KEY.SPACEBETWEEN }}>
                            <TouchableOpacity onPress={() => onPressEmail(item)}
                                style={{ alignItems: KEY.CENTER }}>
                                <Fontisto size={18} name="email" color={COLOR.DEFALUTCOLOR} style={{ marginRight: 5 }} />
                            </TouchableOpacity>
                            <Text style={{ marginTop: 2, fontSize: FONT.FONT_SIZE_14, color: COLOR.GRANITE_GRAY }}>
                                {item.property.primaryemail}</Text>
                        </View>
                    }
                </View>
            </View>
        </TouchableOpacity>
    )

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.STATUSBARCOLOR} barStyle={KEY.DARK_CONTENT} />
            {
                <FlatList
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 50, marginTop: 0 }}
                    data={teamList}
                    renderItem={renderMyTeamList}
                    keyboardShouldPersistTaps={KEY.ALWAYS}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            title={languageConfig.pullrefreshtext}
                            tintColor={COLOR.DEFALUTCOLOR}
                            titleColor={COLOR.DEFALUTCOLOR}
                            colors={[COLOR.DEFALUTCOLOR]}
                            onRefresh={onRefresh} />
                    }
                    keyExtractor={item => item._id}
                    ListFooterComponent={() => (
                        teamList && teamList.length > 0 ?
                            <></>
                            :
                            <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                                <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.TAUPE_GRAY, marginTop: 10 }}>{languageConfig.norecordtext}</Text>
                            </View>
                    )}
                />
            }
            {loading ? <Loader /> : null}
        </SafeAreaView>
    );
}

export default OurSpecialist;