import React, { useEffect, useState } from 'react';
import {
    View, Text, Dimensions, SafeAreaView, FlatList, RefreshControl,
    Image, TextInput, ScrollView, TouchableOpacity, StatusBar, Keyboard, Platform
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { RemoteServerController } from '../../services/LocalService/LocalService';
import { MemberLanguage } from '../../services/LocalService/LanguageService';
import crashlytics, { firebase } from "@react-native-firebase/crashlytics";
import languageConfig from '../../languages/languageConfig';
import * as LocalService from '../../services/LocalService/LocalService';
import * as SCREEN from '../../context/screen/screenName';
import Loader from '../../components/loader/index';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import Toast from 'react-native-simple-toast';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import styles from './OurServiceStyle';
import { ServiceList, ServiceTypeList } from '../../services/AppointmentService/ServiceList';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const OurServiceScreen = () => {
    const [logo, setLogo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [memberID, setMemberID] = useState(null);
    const [memberInfo, setMemberInfo] = useState(null);
    const [serviceList, setServiceList] = useState([]);
    const [refreshing, setrefreshing] = useState(false);
    const [selectCategory, setSelectCategory] = useState(null);
    const [serviceCategoryList, setServiceCategoryList] = useState([]);

    useEffect(() => {
        //LANGUAGE MANAGEMENT FUNCTION
        MemberLanguage();
        RemoteController();
        getMemberDeatilsLocalStorage();
    }, []);

    useEffect(() => {
    }, [loading, memberID]);

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
        if (memberInfo) {
            setMemberID(memberInfo?._id);
            setMemberInfo(memberInfo?._id);
            getServiceCategoryList();
        }
    }

    //GET FETCH REWARD POINT DATA FROM API
    const getServiceCategoryList = async () => {
        try {
            const response = await ServiceList();
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                let allOption = { _id: "12345678963", selected: true, property: { name: "all" } }
                let temArry = [allOption, ...response.data];
                setServiceCategoryList(temArry);
                getServiceList();
            }
        } catch (error) {
            setLoading(false);
            firebase, crashlytics().recordError(error);
        }
    }

    //GET FETCH REWARD POINT DATA FROM API
    const getServiceList = async (id) => {
        try {
            const response = await ServiceTypeList(id);
            console.log(`response.data getServiceList`, response.data);
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                setServiceList(response.data);
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            firebase, crashlytics().recordError(error);
        }
    }

    //GET PULL TO REFRESH FUNCTION
    const onRefresh = () => {
        setrefreshing(true);
        getServiceCategoryList();
        getServiceList();
        wait(3000).then(() => setrefreshing(false));
    }

    //THIS FUNCTION ONPRESS CATEGORY LIST ITEM
    const onPressCategoryListItem = (item, index) => {
        const categoryItem = serviceCategoryList.map((item, index) => {
            item.selected = false;
            return item;
        });
        categoryItem[index].selected = true;
        setServiceCategoryList(categoryItem);
        setSelectCategory(item._id);
        getServiceList(item._id);
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

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.STATUSBARCOLOR} barStyle={KEY.DARK_CONTENT} />
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
            {loading ? <Loader /> : null}
        </SafeAreaView>
    )
}

export default OurServiceScreen;
