import React, { useEffect, useState } from 'react';
import {
    View, Text, Dimensions, SafeAreaView, ImageBackground,
    Image, TextInput, ScrollView, TouchableOpacity, StatusBar, Keyboard, Platform
} from 'react-native';
import { RemoteServerController } from '../../services/LocalService/LocalService';
import { MemberLanguage } from '../../services/LocalService/LanguageService';
import crashlytics, { firebase } from "@react-native-firebase/crashlytics";
import { LoginService } from '../../services/LoginService/LoginService';
import AsyncStorage from '@react-native-community/async-storage';
import languageConfig from '../../languages/languageConfig';
import * as SCREEN from '../../context/screen/screenName';
import Feather from 'react-native-vector-icons/Feather';
import axiosConfig from '../../helpers/axiosConfig';
import Loader from '../../components/loader/index';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import Toast from 'react-native-simple-toast';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import STYLES from './LoginStyle';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

export default LoginScreen = (props) => {
    const [logo, setLogo] = useState(null);
    const [backgroungImage, setBackgroungImage] = useState(null);
    const [appLogoVisible, setAppLogoVisible] = useState(false);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [usernameError, setUsernameError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [loading, setLoading] = useState(false);
    const secondTextInputRef = React.createRef();
    const [loginOTP, setLoginOTP] = useState(false);

    useEffect(() => {
        //LANGUAGE MANAGEMENT FUNCTION
        MemberLanguage();
        // CHECK AUTHCONTROLLER USE TO LOGIN OR NOT LOGIN        
        RemoteController();
    }, []);

    //REMOTE DATA FATCH IN LOCAL STORAGE
    async function RemoteController() {
        var userData = await RemoteServerController();
        if (userData) {
            setLogo(userData.applogo);
            setBackgroungImage(userData.loginimage);
            setAppLogoVisible(userData.applogovisibleloginscreen);
            setLoginOTP(userData.loginotp ? true : false);
        }
    };

    //CHECK EMAIL VALIDATION
    const CheckUsername = (username) => {
        if (!username || username.length <= 0) {
            setUsername(null);
            setUsernameError(languageConfig.usernameerror);
            return;
        }
        setUsername(username);
        setUsernameError(null);
        return;
    }

    //CHECK PASSWORD VALIDATION
    const CheckPassword = (password) => {
        if (!password || password.length <= 0) {
            setPassword(null);
            setPasswordError(languageConfig.passworderror);
            return;
        }
        setPassword(password);
        setPasswordError(null);
        return;
    }

    //ADD LOCAL STORAGE RECORDS
    const authenticateUser = (member) => (
        AsyncStorage.setItem(KEY.AUTHUSER, JSON.stringify(member))
    )

    //ADD LOCAL STORAGE RECORDS
    const setAuthUserInfo = (credentials) => (
        AsyncStorage.setItem(KEY.AUTHUSERINFO, JSON.stringify(credentials))
    )

    //LOGIN BTN CLICK TO CALL FUNCTION
    const onPressToLogin = async () => {
        if (!username || !password) {
            CheckUsername(username);
            CheckPassword(password);
            return;
        }
        const body = {
            username: username.trim(),
            password: password
        }
        setLoading(true);
        Keyboard.dismiss();
        try {
            const response = await LoginService(body);
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                authenticateUser(response.data.user);
                setAuthUserInfo(body);
                let token = response.data.user._id;
                //set header auth user key
                axiosConfig(token);
                resetScreen();
                props.navigation.replace(SCREEN.MAINSCREEN);
                Toast.show(languageConfig.loginsuccess, Toast.SHORT);
            }
        } catch (error) {
            firebase.crashlytics().recordError(error);
            setPassword(null);
            setPasswordError(null);
            setLoading(false);
            Toast.show(languageConfig.wrongusererror, Toast.SHORT);
        }
    }

    //CLEAR FIELD UP DATA
    const resetScreen = () => {
        setUsername(null);
        setUsernameError(null);
        setPassword(null);
        setPasswordError(null);
        setLoading(false);
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={KEY.TRANSPARENT} barStyle={Platform.OS === KEY.IOS ? KEY.DARK_CONTENT : KEY.LIGHT_CONTENT} />
            <ImageBackground source={backgroungImage ? { uri: backgroungImage } : IMAGE.BACKGROUND_IMAGE} style={STYLES.backgroundImage} >
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
                    <View style={{ position: KEY.ABSOLUTE, marginTop: 50, marginLeft: 15 }} >
                        <TouchableOpacity onPress={() => props.navigation.replace(SCREEN.MAINSCREEN)}>
                            <Feather name='arrow-left' size={25} color={COLOR.WHITE} />
                        </TouchableOpacity>
                    </View>
                    <View style={STYLES.containerView}>
                        {appLogoVisible ?
                            <Image source={logo ? { uri: logo } : IMAGE.MEMBROZ_LOGO} resizeMode={KEY.COVER}
                                style={STYLES.imageLogo} /> :
                            <View style={{ marginTop: HEIGHT / 3 }} />
                        }
                        <Text style={STYLES.welcomeText}>{languageConfig.loginbtn}</Text>
                        <View style={{ marginBottom: 10 }}>
                            <TextInput placeholder={languageConfig.usernameplaceholder}
                                placeholderTextColor={COLOR.GRANITE_GRAY}
                                selectionColor={COLOR.BLACK}
                                returnKeyType={KEY.NEXT}
                                style={!usernameError ? STYLES.inputTextView : STYLES.inputTextViewError}
                                defaultValue={username}
                                autoCapitalize={KEY.NONE}
                                onSubmitEditing={() => secondTextInputRef.current.focus()}
                                onChangeText={(username) => CheckUsername(username)}
                            />
                        </View>
                        <View style={{ marginBottom: 10 }}>
                            <TextInput placeholder={languageConfig.passwordplaceholder}
                                placeholderTextColor={COLOR.GRANITE_GRAY}
                                selectionColor={COLOR.BLACK}
                                returnKeyType={KEY.DONE}
                                style={!passwordError ? STYLES.inputTextView : STYLES.inputTextViewError}
                                secureTextEntry={true}
                                defaultValue={password}
                                autoCapitalize={KEY.NONE}
                                blurOnSubmit={false}
                                ref={secondTextInputRef}
                                onSubmitEditing={() => { Keyboard.dismiss(), onPressToLogin() }}
                                onChangeText={(password) => CheckPassword(password)}
                            />
                        </View>
                        <TouchableOpacity style={{ marginTop: -5, marginBottom: 10, alignSelf: KEY.FLEX_END, marginRight: 20 }}
                            onPress={() => { resetScreen(), props.navigation.navigate(SCREEN.FORGETPASSWORDSCREEN) }}>
                            <Text style={{ color: COLOR.WHITE, fontSize: FONT.FONT_SIZE_16 }}>{languageConfig.forgetpasswordtext}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={STYLES.loginBtn} onPress={() => onPressToLogin()}>
                            <Text style={{ fontWeight: FONT.FONT_BOLD, color: COLOR.WHITE, fontSize: FONT.FONT_SIZE_18 }}>{languageConfig.loginbtn}</Text>
                        </TouchableOpacity>
                        <View style={STYLES.joinBtn}>
                            <Text style={{ fontWeight: FONT.FONT_NORMAL, color: COLOR.WHITE, fontSize: FONT.FONT_SIZE_16 }}>{languageConfig.dontaccount}</Text>
                            <TouchableOpacity style={{ marginLeft: 5 }} onPress={() => { resetScreen(), props.navigation.navigate(SCREEN.REGISTERSCREEN) }} >
                                <Text style={{ fontWeight: FONT.FONT_NORMAL, color: COLOR.DEFALUTCOLOR, fontSize: FONT.FONT_SIZE_16 }}>{languageConfig.register}</Text>
                            </TouchableOpacity>
                        </View>
                        {/* <View style={STYLES.backBtn}>
                            <Text style={{ fontWeight: FONT.FONT_NORMAL, color: COLOR.WHITE, fontSize: FONT.FONT_SIZE_16 }}>{languageConfig.backtotext}</Text>
                            <TouchableOpacity style={{ marginLeft: 5 }} onPress={() => { resetScreen(), props.navigation.navigate(SCREEN.MAINSCREEN) }} >
                                <Text style={{ fontWeight: FONT.FONT_NORMAL, color: COLOR.DEFALUTCOLOR, fontSize: FONT.FONT_SIZE_16 }}>{languageConfig.home}</Text>
                            </TouchableOpacity>
                        </View> */}
                    </View>
                </ScrollView>
            </ImageBackground>
            {loading ? <Loader /> : null}
        </SafeAreaView>
    );
}

