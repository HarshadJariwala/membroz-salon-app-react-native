import React, { useEffect, useState } from 'react';
import {
    View, Text, Dimensions, SafeAreaView, FlatList, RefreshControl,
    Image, TextInput, ScrollView, TouchableOpacity, StatusBar, Keyboard, Platform, Share
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ServiceList, ServiceTypeList } from '../../services/AppointmentService/ServiceList';
import { MemberLanguage } from '../../services/LocalService/LanguageService';
import crashlytics, { firebase } from "@react-native-firebase/crashlytics";
import * as LocalService from '../../services/LocalService/LocalService';
import getCurrency from '../../services/getCurrencyService/getCurrency';
import languageConfig from '../../languages/languageConfig';
import * as SCREEN from '../../context/screen/screenName';
import Loader from '../../components/loader/index';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import Toast from 'react-native-simple-toast';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import styles from './OurServiceStyle';
import {
    removeLocalWishList, getLocalWishList
    , saveLocalWishList
} from '../../services/LocalService/LocalWishList';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const OurServiceScreen = (props) => {
    const [logo, setLogo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [memberID, setMemberID] = useState(null);
    const [memberInfo, setMemberInfo] = useState(null);
    const [serviceList, setServiceList] = useState([]);
    const [refreshing, setrefreshing] = useState(false);
    const [selectCategory, setSelectCategory] = useState(null);
    const [currencySymbol, setCurrencySymbol] = useState(null);
    const [serviceCategoryList, setServiceCategoryList] = useState([]);

    useEffect(() => {
        //LANGUAGE MANAGEMENT FUNCTION
        MemberLanguage();
        RemoteController();
        getMemberDeatilsLocalStorage();
    }, []);

    useEffect(() => {
    }, [logo, loading, memberID, memberInfo, refreshing, selectCategory, currencySymbol, serviceCategoryList]);

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
            setCurrencySymbol(response);
            setMemberID(memberInfo?._id);
            setMemberInfo(memberInfo?._id);
            getServiceCategoryList();
        } else {
            var publicUserInfo = await LocalService.LocalBranchDetails();
            const response = getCurrency(publicUserInfo.branchid.currency);
            setCurrencySymbol(response);
            setMemberID(publicUserInfo?._id);
            getServiceCategoryList();
        }
    }

    //GET FETCH REWARD POINT DATA FROM API
    const getServiceCategoryList = async () => {
        try {
            const response = await ServiceList();
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                let allOption = { _id: "12345678963", selected: true, property: { name: languageConfig.alltext } }
                let temArry = [allOption, ...response.data];
                setServiceCategoryList(temArry);
                getServiceList();
            }
        } catch (error) {
            setLoading(false);
            firebase.crashlytics().recordError(error);
        }
    }

    //GET FETCH REWARD POINT DATA FROM API
    const getServiceList = async (id) => {
        try {
            const response = await ServiceTypeList(id);
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

    //THIS FUNCTION ONPRESS CATEGORY LIST ITEM
    const onPressCategoryListItem = (item, index) => {
        try {
            setLoading(true);
            const categoryItem = serviceCategoryList.map((item, index) => {
                item.selected = false;
                return item;
            });
            categoryItem[index].selected = true;
            setServiceCategoryList(categoryItem);
            setSelectCategory(item._id);
            if (languageConfig.alltext === item.property.name) {
                getServiceList();
            } else {
                getServiceList(item._id);
            }
        } catch (error) {
            setLoading(false);
        }
    }

    //RENDER CATAGORY LIST
    const renderCategoryItem = ({ item, index }) => (
        item.selected == true ?
            <TouchableOpacity style={styles.activeTabStyle}
                onPress={() => onPressCategoryListItem(item, index)}>
                <Text style={styles.activeTextStyle}>
                    {item.property.name}</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity style={styles.deactiveTabStyle}
                onPress={() => onPressCategoryListItem(item, index)}>
                <Text style={styles.deactiveTextStyle}>
                    {item.property.name}</Text>
            </TouchableOpacity>
    )

    //WISH LIST REMOVE LOCAL STORATE
    const removeLocalWishListService = async (item) => {
        let tempArry = [...serviceList];
        tempArry.forEach(element => {
            if (element._id === item._id) { element.selected = false }
        });
        setServiceList(tempArry);
        Toast.show("Remove Successfully", Toast.SHORT);
        await removeLocalWishList(item);
    }

    //RENDER SERVICE LIST USING FLATLIST
    const renderService = ({ item }) => (
        <View style={styles.img_card}>
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
                        {item.title}
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
                    <TouchableOpacity style={styles.upgrade} onPress={() => onPressBooking(item)} >
                        <Text style={styles.textbutton}>
                            {languageConfig.booknowbtn}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
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
        props.navigation.navigate(SCREEN.OURSERVICEDETAILSCREEN, { item });
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.STATUSBARCOLOR} barStyle={KEY.DARK_CONTENT} />
            {((serviceCategoryList && serviceCategoryList.length > 0)) ?
                <SafeAreaView>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <FlatList
                            style={{ paddingBottom: 10 }}
                            showsHorizontalScrollIndicator={false}
                            numColumns={serviceCategoryList && serviceCategoryList.length}
                            key={serviceCategoryList && serviceCategoryList.length}
                            data={serviceCategoryList}
                            renderItem={renderCategoryItem}
                            keyExtractor={item => item._id}
                            keyboardShouldPersistTaps={KEY.ALWAYS}
                        />
                    </ScrollView>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <FlatList
                            style={{ marginBottom: HEIGHT * 0.3 }}
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
                    </ScrollView>
                </SafeAreaView>
                :
                !loading &&
                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                    <Image source={IMAGE.NODATA} style={{ height: 150, width: 200, marginTop: HEIGHT * 0.2 }} resizeMode={KEY.CONTAIN} />
                    <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.TAUPE_GRAY, marginTop: 10 }}>{languageConfig.norecordtext}</Text>
                </View>
            }
            {loading ? <Loader /> : null}
        </SafeAreaView>
    )
}

export default OurServiceScreen;
