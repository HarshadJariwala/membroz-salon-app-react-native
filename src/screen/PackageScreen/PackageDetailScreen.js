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
import axiosConfig from '../../helpers/axiosConfig';
import Loader from '../../components/loader/index';
import RenderHTML from 'react-native-render-html';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import styles from './PackageDetailStyle';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const PackageDetailScreen = (props) => {
    const selectedPackageDetails = props.route.params.item;
    const [packageDetails, setPackageDetails] = useState(selectedPackageDetails);
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
        setPackageDetails(selectedPackageDetails);
        setServiceList(selectedPackageDetails.services.length > 0 ? selectedPackageDetails.services : [])
    }, []);

    useEffect(() => {
    }, [logo, loading, packageDetails, memberID, memberInfo, serviceList, currencySymbol]);

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
            wait(1000).then(() => setLoading(false));

        } else {
            var publicUserInfo = await LocalService.LocalBranchDetails();
            const response = getCurrency(publicUserInfo.branchid.currency);
            axiosConfig(publicUserInfo._id);
            setCurrencySymbol(response);
            wait(1000).then(() => setLoading(false));
        }
    }

    //TIME OUT FUNCTION
    const wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    //RENDER SERVICE LIST USING FLATLIST
    const renderService = ({ item }) => (
        <View style={styles.img_card}>
            <Image style={styles.img}
                source={{ uri: item.serviceid && item.serviceid.gallery && item.serviceid.gallery[0] && item.serviceid.gallery[0].attachment ? item.serviceid.gallery[0].attachment : logo }} />
            <View style={{ flexDirection: KEY.COLUMN, marginLeft: 10, width: WIDTH - 140 }}>
                <View style={{ flexDirection: KEY.ROW, marginTop: 10, justifyContent: KEY.SPACEBETWEEN }}>
                    <Text numberOfLines={1} style={[styles.text, { width: WIDTH / 2 }]}>{item.serviceid && item.serviceid.title}</Text>
                    <Text style={{
                        fontSize: FONT.FONT_SIZE_16,
                        color: COLOR.BLACK,
                        fontWeight: FONT.FONT_BOLD,
                        marginRight: 10
                    }}>{currencySymbol + (item.serviceid && item.serviceid.charges ? item.serviceid.charges : '---')}</Text>
                </View>
                <View style={{ flexDirection: KEY.ROW, marginTop: 5 }}>
                    <Ionicons name='location-outline' size={20} color={COLOR.DEFALUTCOLOR} />
                    <Text numberOfLines={1}
                        style={{ marginLeft: 5, fontSize: FONT.FONT_SIZE_14, color: COLOR.BLACK, width: WIDTH / 3 }}>
                        {item.serviceid && item.serviceid.title}
                    </Text>
                </View>
                <View style={{ flexDirection: KEY.ROW }}>
                    <View style={{ flexDirection: KEY.ROW, marginTop: 5, marginLeft: 2 }}>
                        <Image source={IMAGE.TIMEICON} style={{ tintColor: COLOR.DEFALUTCOLOR, height: 20, width: 16 }} />
                        <Text style={{ marginLeft: 7, fontSize: FONT.FONT_SIZE_14, color: COLOR.BLACK }}>
                            {item.serviceid && item.serviceid.duration ? item.serviceid.duration + ' ' + languageConfig.mintext : '--'}
                        </Text>
                        <TouchableOpacity onPress={() => onPressShare(item)}>
                            <Ionicons name='share-social-outline' size={20} style={{ marginLeft: 10, marginRight: 10 }} color={COLOR.DEFALUTCOLOR} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ alignSelf: KEY.FLEX_END, marginTop: -14 }}>
                    <TouchableOpacity style={styles.upgrade} onPress={() => onPressBooking(item.serviceid)} >
                        <Text style={styles.textbutton}>
                            {languageConfig.booknowbtn}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )

    //BOOK NOW BUTTON CLICK TO CALL FUNCTION
    const onPressBooking = (item) => {
        if (item) {
            // props.navigation.navigate(SCREEN.BOOKSERVICESCREEN, { item });
        }
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
                    }} source={{ uri: packageDetails && packageDetails.profilepic ? packageDetails.profilepic : logo }} />
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
                            <Text style={{ marginTop: 10, marginLeft: 15, fontSize: FONT.FONT_SIZE_22, fontWeight: FONT.FONT_BOLD, color: COLOR.BLACK, width: WIDTH / 2 }}>
                                {packageDetails && packageDetails.membershipname}</Text>
                            <Text style={{ marginTop: 10, marginRight: 15, fontSize: FONT.FONT_SIZE_22, fontWeight: FONT.FONT_BOLD, color: COLOR.BLACK }}>
                                {currencySymbol + (packageDetails.property && packageDetails.property.cost ? packageDetails.property.cost : '---')}</Text>
                        </View>
                        <View style={{ marginTop: 10, marginLeft: 10, flexDirection: KEY.ROW, alignItems: KEY.CENTER }}>
                            <Ionicons name='location-outline' size={20} color={COLOR.DEFALUTCOLOR} />
                            <Text numberOfLines={1}
                                style={{ color: COLOR.BLACK, fontSize: FONT.FONT_SIZE_14, width: "25%" }}>
                                {packageDetails && packageDetails.membershipname} </Text>
                            <View style={{ flexDirection: KEY.ROW, marginLeft: 10, alignItems: KEY.CENTER }}>
                                <Image source={IMAGE.TIMEICON} style={{ tintColor: COLOR.DEFALUTCOLOR, height: 20, width: 16 }} />
                                <Text style={{ marginLeft: 5, color: COLOR.BLACK, fontSize: FONT.FONT_SIZE_14 }}> {packageDetails.property ? packageDetails.property.tenure + languageConfig.months : '--'} </Text>
                            </View>
                        </View>
                        {packageDetails && packageDetails?.property && packageDetails?.property?.description ?
                            <Text style={styles.descripationText}>
                                <RenderHTML contentWidth={WIDTH - 60}
                                    source={{ html: packageDetails.property.description }}
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

            </ScrollView>
            {loading ? <Loader /> : null}
        </SafeAreaView>
    )
}

export default PackageDetailScreen;
