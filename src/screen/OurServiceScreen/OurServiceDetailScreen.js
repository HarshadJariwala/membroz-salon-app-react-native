import React, { useEffect, useState } from 'react';
import {
    View, Text, Dimensions, SafeAreaView, FlatList, RefreshControl,
    Image, TextInput, ScrollView, TouchableOpacity, StatusBar, Keyboard, Platform, Share
} from 'react-native';
import { SuggestedServiceList } from '../../services/AppointmentService/ServiceList';
import { MemberLanguage } from '../../services/LocalService/LanguageService';
import crashlytics, { firebase } from "@react-native-firebase/crashlytics";
import * as LocalService from '../../services/LocalService/LocalService';
import getCurrency from '../../services/getCurrencyService/getCurrency';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import languageConfig from '../../languages/languageConfig';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as SCREEN from '../../context/screen/screenName';
import Feather from 'react-native-vector-icons/Feather';
import Loader from '../../components/loader/index';
import RenderHTML from 'react-native-render-html';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import Toast from 'react-native-simple-toast';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import styles from './OurServiceDetailStyle';
import {
    removeLocalWishList, getLocalWishList
    , saveLocalWishList
} from '../../services/LocalService/LocalWishList';
import axiosConfig from '../../helpers/axiosConfig';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const OurServiceDetailScreen = (props) => {
    const selectedServiceDetails = props.route.params.item;
    const [serviceDetails, setServiceDetails] = useState(selectedServiceDetails);
    const [logo, setLogo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [memberID, setMemberID] = useState(null);
    const [memberInfo, setMemberInfo] = useState(null);
    const [serviceList, setServiceList] = useState([]);
    const [currencySymbol, setCurrencySymbol] = useState(null);

    useEffect(() => {
        //LANGUAGE MANAGEMENT FUNCTION
        MemberLanguage();
        RemoteController();
        getMemberDeatilsLocalStorage();
    }, []);

    useEffect(() => {
    }, [logo, loading, serviceDetails, memberID, memberInfo, serviceList, currencySymbol]);

    //REMOTE DATA FATCH IN LOCAL STORAGE
    const RemoteController = async () => {
        var userData = await LocalService.RemoteServerController();
        if (userData) {
            setLogo(userData.applogo);
        }
    };

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
            getServiceList();
        } else {
            var publicUserInfo = await LocalService.LocalBranchDetails();
            const response = getCurrency(publicUserInfo.branchid.currency);
            axiosConfig(publicUserInfo._id);
            setCurrencySymbol(response);
            getServiceList();
            //setLoading(false);
        }
    }

    //GET FETCH REWARD POINT DATA FROM API
    const getServiceList = async (id) => {
        try {
            const response = await SuggestedServiceList(id);
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                setServiceList(response.data);
                let localWishLists = await getLocalWishList();
                let renderData = [...response.data];
                for (let data of renderData) {
                    for (let localdata of localWishLists) {
                        if (data._id == localdata._id && localdata.selected == true) {
                            data.selected = true;
                            break;
                        } else {
                            data.selected = false;
                        }
                    }
                }
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            firebase.crashlytics().recordError(error);
        }
    }

    //WISH LIST REMOVE LOCAL STORATE
    const removeLocalWishListService = async (item) => {
        let tempArry = [...serviceList];
        tempArry.forEach(element => {
            if (element._id === item._id) { element.selected = false }
        });
        setServiceList(tempArry);
        Toast.show(languageConfig.removesuccessfully, Toast.SHORT);
        await removeLocalWishList(item);
    }

    // //CLICK TO WISH LIST SERVICE (single item)
    // const onPressAddWishSingle = () => {
    //     if (serviceDetails.selected) {
    //         removeLocalWishListSingle(serviceDetails);
    //     } else {
    //         let tempData = serviceDetails;
    //         tempData.selected = true;
    //         console.log(`tempData add`, tempData);
    //         setServiceDetails(tempData);
    //         saveLocalWishList(serviceDetails);
    //         Toast.show("Wish list Add Successfully", Toast.SHORT);
    //     }
    // }

    // //WISH LIST REMOVE LOCAL STORATE (single item)
    // const removeLocalWishListSingle = async () => {
    //     let tempData = serviceDetails;
    //     tempData.selected = false;
    //     setServiceDetails(tempData);
    //     console.log(`tempData remove`, tempData);
    //     Toast.show("Remove Successfully", Toast.SHORT);
    //     await removeLocalWishList(serviceDetails);
    // }

    //RENDER SERVICE LIST USING FLATLIST
    const renderService = ({ item }) => (
        <TouchableOpacity style={styles.img_card} onPress={() => setServiceDetails(item)}>
            <Image style={styles.img}
                source={{ uri: item.gallery && item.gallery[0] && item.gallery[0].attachment ? item.gallery[0].attachment : logo }} />
            <View style={{ flexDirection: KEY.COLUMN, marginLeft: 10, width: WIDTH - 140 }}>
                <View style={{ flexDirection: KEY.ROW, marginTop: 10, justifyContent: KEY.SPACEBETWEEN }}>
                    <Text numberOfLines={1} style={[styles.text, { width: WIDTH / 2 }]}>{item.title}</Text>
                    <Text style={{
                        fontSize: FONT.FONT_SIZE_16,
                        color: COLOR.BLACK,
                        fontWeight: FONT.FONT_BOLD,
                        marginRight: 10
                    }}>{currencySymbol + item.charges}</Text>
                </View>
                <View style={{ flexDirection: KEY.ROW, marginTop: 5 }}>
                    <Ionicons name='location-outline' size={20} color={COLOR.DEFALUTCOLOR} />
                    <Text numberOfLines={1}
                        style={{ marginLeft: 5, fontSize: FONT.FONT_SIZE_14, color: COLOR.BLACK, width: WIDTH / 3 }}>
                        {item.branchid.branchname}
                    </Text>
                </View>
                <View style={{ flexDirection: KEY.ROW }}>
                    <View style={{ flexDirection: KEY.ROW, marginTop: 5, marginLeft: 2 }}>
                        <Image source={IMAGE.TIMEICON} style={{ tintColor: COLOR.DEFALUTCOLOR, height: 20, width: 16 }} />
                        <Text style={{ marginLeft: 7, fontSize: FONT.FONT_SIZE_14, color: COLOR.BLACK }}>
                            {item.duration ? item.duration + ' ' + languageConfig.mintext : '--'}
                        </Text>
                        <TouchableOpacity onPress={() => onPressShare(item)}>
                            <Ionicons name='share-social-outline' size={20} style={{ marginLeft: 10, marginRight: 10 }} color={COLOR.DEFALUTCOLOR} />
                        </TouchableOpacity>
                        {
                            item.selected == true ?
                                <TouchableOpacity onPress={() => removeLocalWishListService(item)}>
                                    <Ionicons name='heart' size={20} color={COLOR.DEFALUTCOLOR} />
                                </TouchableOpacity>
                                :
                                <TouchableOpacity onPress={() => onPressAddWishService(item)}>
                                    <Ionicons name='ios-heart-outline' size={20} color={COLOR.DEFALUTCOLOR} />
                                </TouchableOpacity>
                        }
                    </View>
                </View>
                <View style={{ alignSelf: KEY.FLEX_END, marginTop: -14 }}>
                    <TouchableOpacity style={styles.upgrade} onPress={() => setServiceDetails(item)}>
                        <FontAwesome5 name='plus' size={15} color={COLOR.WHITE} />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    )

    //SHARE BUTTON CLICK
    const onPressShare = async () => {
        try {
            const result = await Share.share({
                title: 'Salon App',
                message: `Please install this app and stay safe , AppLink :https://play.google.com/store/apps/developer?id=KRTYA+TECHNOLOGIES&hl=en_US&gl=US`,
                url: `https://play.google.com/store/apps/developer?id=KRTYA+TECHNOLOGIES&hl=en_US&gl=US`
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            //alert(error.message);
        }
    }

    //CLICK TO WISH LIST SERVICE
    const onPressAddWishService = (item) => {
        if (item.selected) {
            removeLocalWishList(item);
        } else {
            let tempArry = [...serviceList];
            tempArry.forEach(element => {
                if (element._id === item._id) { element.selected = true }
            });
            item.selected = true
            setServiceList(tempArry);
            saveLocalWishList(item);
            Toast.show("Wish list Add Successfully", Toast.SHORT);
        }
    }

    //BOOK NOW BUTTON CLICK TO CALL FUNCTION
    const onPressBooking = (item) => {
        item = serviceDetails;
        props.navigation.navigate(SCREEN.BOOKSERVICESCREEN, { item });
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={KEY.TRANSPARENT} barStyle={KEY.DARK_CONTENT} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flex: 1 }}>
                    <Image style={{
                        width: WIDTH,
                        height: HEIGHT / 3,
                        borderBottomRightRadius: 20,
                        borderBottomLeftRadius: 20,
                        resizeMode: KEY.STRETCH,
                    }} source={{ uri: serviceDetails && serviceDetails.gallery && serviceDetails.gallery[0] && serviceDetails.gallery[0].attachment ? serviceDetails.gallery[0].attachment : logo }} />
                    <View style={{ position: KEY.ABSOLUTE, marginTop: 30, marginLeft: 15 }} >
                        <TouchableOpacity onPress={() => props.navigation.goBack(null)}
                            style={{
                                backgroundColor: COLOR.WHITE, borderRadius: 100, height: 30, width: 30,
                                alignItems: KEY.CENTER, justifyContent: KEY.CENTER
                            }}>
                            <Feather name='arrow-left' size={25} color={COLOR.BLACK} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                    <View style={styles.cardview}>
                        <View style={{ flexDirection: KEY.ROW, justifyContent: KEY.SPACEBETWEEN }}>
                            <Text style={{ marginTop: 10, marginLeft: 15, fontSize: FONT.FONT_SIZE_22, fontWeight: FONT.FONT_BOLD, color: COLOR.BLACK, width: WIDTH / 2 }}>{serviceDetails && serviceDetails.title}</Text>
                            <Text style={{ marginTop: 10, marginRight: 15, fontSize: FONT.FONT_SIZE_22, fontWeight: FONT.FONT_BOLD, color: COLOR.BLACK }}>{currencySymbol + (serviceDetails && serviceDetails.charges)}</Text>
                        </View>
                        <View style={{ marginTop: 10, marginLeft: 10, flexDirection: KEY.ROW, alignItems: KEY.CENTER }}>
                            <Ionicons name='location-outline' size={20} color={COLOR.DEFALUTCOLOR} />
                            <Text numberOfLines={1}
                                style={{ color: COLOR.BLACK, fontSize: FONT.FONT_SIZE_14, width: "25%" }}>
                                {serviceDetails && serviceDetails.branchid.branchname} </Text>
                            <View style={{ flexDirection: KEY.ROW, marginLeft: 10, alignItems: KEY.CENTER }}>
                                <Image source={IMAGE.TIMEICON} style={{ tintColor: COLOR.DEFALUTCOLOR, height: 20, width: 16 }} />
                                <Text style={{ marginLeft: 5, color: COLOR.BLACK, fontSize: FONT.FONT_SIZE_14 }}> {serviceDetails && serviceDetails.duration ? serviceDetails.duration + ' ' + languageConfig.mintext : '--'} </Text>
                            </View>
                            <View style={{ flexDirection: KEY.ROW, flex: 1, justifyContent: KEY.FLEX_END, marginRight: 15 }}>
                                <TouchableOpacity onPress={() => onPressShare()} style={{ marginRight: 10 }}>
                                    <Ionicons name='share-social-outline' size={25} color={COLOR.DEFALUTCOLOR} />
                                </TouchableOpacity>
                                {
                                    serviceDetails && serviceDetails.selected == true ?
                                        <TouchableOpacity onPress={() => removeLocalWishListService(serviceDetails)}>
                                            <Ionicons name='heart' size={25} color={COLOR.DEFALUTCOLOR} />
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity onPress={() => onPressAddWishService(serviceDetails)}>
                                            <Ionicons name='ios-heart-outline' size={25} color={COLOR.DEFALUTCOLOR} />
                                        </TouchableOpacity>
                                }
                            </View>
                        </View>
                        {serviceDetails && serviceDetails?.description ?
                            <Text style={styles.descripationText}>
                                <RenderHTML contentWidth={WIDTH - 60}
                                    source={{ html: serviceDetails.description }}
                                    baseStyle={styles.tagsStyles} />
                            </Text>
                            :
                            <View style={{ margin: 5 }} />
                        }
                    </View>
                </View>
                {((serviceList && serviceList.length > 0)) &&
                    <>
                        <Text style={{
                            fontSize: FONT.FONT_SIZE_18, color: COLOR.BLACK,
                            fontWeight: FONT.FONT_BOLD, marginLeft: 15, marginTop: 10
                        }}>{languageConfig.suggestedservicestext}</Text>
                        <FlatList
                            style={{ marginBottom: 20 }}
                            showsVerticalScrollIndicator={false}
                            key={serviceList && serviceList.length}
                            data={serviceList}
                            contentContainerStyle={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}
                            renderItem={renderService}
                            keyExtractor={item => item._id}
                            keyboardShouldPersistTaps={KEY.ALWAYS}
                            ListFooterComponent={() => (
                                serviceList && serviceList.length == 0 &&
                                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                                    <Image source={IMAGE.NODATA} style={{ height: 150, width: 200, marginTop: HEIGHT * 0.2 }} resizeMode={KEY.CONTAIN} />
                                    <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.TAUPE_GRAY, marginTop: 10 }}>{languageConfig.norecordtext}</Text>
                                </View>
                            )}
                        />
                    </>
                }
                <TouchableOpacity style={styles.bookButton} onPress={() => onPressBooking()}>
                    <Text style={{
                        fontWeight: FONT.FONT_BOLD, color: COLOR.WHITE,
                        fontSize: FONT.FONT_SIZE_18, textTransform: KEY.CAPITALIZE
                    }}>{languageConfig.booknowbtn}</Text>
                </TouchableOpacity>
            </ScrollView>
            {loading ? <Loader /> : null}
        </SafeAreaView>
    )
}

export default OurServiceDetailScreen;
