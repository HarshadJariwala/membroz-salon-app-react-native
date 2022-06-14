import React, { useEffect, useState } from 'react';
import {
    View, Text, Dimensions, SafeAreaView, FlatList, RefreshControl,
    Image, TextInput, ScrollView, TouchableOpacity, StatusBar, Keyboard, Platform, Share
} from 'react-native';
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

const BookServiceScreen = (props) => {

    //BOOK NOW BUTTON CLICK TO CALL FUNCTION
    const onPressBooking = () => {
        props.navigation.navigate(SCREEN.BOOKINGPAYMENTSCREEN);
    }

    return (
        <View>
            <TouchableOpacity style={styles.bookButton} onPress={() => onPressBooking()}>
                <Text style={{
                    fontWeight: FONT.FONT_BOLD, color: COLOR.WHITE,
                    fontSize: FONT.FONT_SIZE_18, textTransform: KEY.CAPITALIZE
                }}>{languageConfig.continuetext}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default BookServiceScreen;
