import React, { useEffect, useState } from 'react';
import {
    View, Text, Dimensions, SafeAreaView, ImageBackground,
    Image, TextInput, ScrollView, TouchableOpacity, StatusBar, Keyboard, Platform
} from 'react-native';
import { RemoteServerController } from '../../services/LocalService/LocalService';
import { RegisterService } from '../../services/RegisterService/RegisterService';
import { MemberLanguage } from '../../services/LocalService/LanguageService';
import crashlytics, { firebase } from "@react-native-firebase/crashlytics";
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
import styles from './RegisterStyle';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const RegisterScreen = (props) => {
    const [logo, setLogo] = useState(null);
    const [email, setEmail] = useState(null);
    const [authKey, setAuthKey] = useState(null);
    const [loading, setLoading] = useState(false);
    const [fullname, setFullname] = useState(null);
    const [mobileno, setMobileno] = useState(null);
    const [emailError, setEmailError] = useState(null);
    const [fullnameError, setFullnameError] = useState(null);
    const [mobilenoError, setMobilenoError] = useState(null);
    const [backgroungImage, setBackgroungImage] = useState(null);
    const secondTextInputRef = React.createRef();
    const thirdTextInputRef = React.createRef();

    useEffect(() => {
        //LANGUAGE MANAGEMENT FUNCTION
        MemberLanguage();
        // CHECK AUTHCONTROLLER USE TO LOGIN OR NOT LOGIN
        RemoteController();
    }, []);

    useEffect(() => {
    }, [logo, backgroungImage, fullname, mobileno, authKey,
        email, fullnameError, mobilenoError, emailError, loading])

    // CHECK AUTHCONTROLLER USE TO LOGIN OR NOT LOGIN
    async function RemoteController() {
        var userData = await RemoteServerController();
        if (userData) {
            setLogo(userData.applogo);
            setAuthKey(userData.authkey);
            setBackgroungImage(userData.loginimage);
        }
    };

    //CHECK FULL NAME VALIDATION
    const CheckFullname = (fullname) => {
        if (!fullname || fullname.length <= 0) {
            setFullname(null);
            setFullnameError(languageConfig.fullnameerror);
            return;
        }
        setFullname(fullname);
        setFullnameError(null);
        return;
    }

    //CHECK MOBILENO VALIDATION
    const CheckMobileno = (mobile) => {
        // const reg = /^\d{10}$/;
        if (!mobile || mobile.length <= 0) {
            setMobilenoError(languageConfig.mobileerror);
            return;
        }
        // if (!reg.test(mobile)) {
        //     setMobilenoError(languageConfig.mobileinvalid);
        //     return;
        // }
        setMobileno(mobile);
        setMobilenoError(null);
        return;
    }

    //CHECK EMAIL VALIDATION
    const CheckEmail = (email) => {
        const reg = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
        if (!email || email.length <= 0) {
            setEmailError(languageConfig.emailerror);
            return;
        }
        if (!reg.test(email)) {
            setEmailError(languageConfig.emailinvalid);
            return;
        }
        setEmail(email);
        setEmailError(null);
        return;
    }

    //ONPRESS TO REGISTER NOW
    const onPressToRegister = async () => {
        axiosConfig(authKey);
        if (!fullname || !email || !mobileno) {
            CheckFullname(fullname);
            CheckMobileno(mobileno);
            CheckEmail(email);
            return;
        }
        Keyboard.dismiss();
        setLoading(true);
        try {
            let body = {
                property: {
                    fullname: fullname,
                    mobile: mobileno,
                    primaryemail: email
                }
            }
            const response = await RegisterService(body);
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                setLoading(false);
                Toast.show(languageConfig.registernow, Toast.SHORT);
                props.navigation.replace(SCREEN.LOGINSCREEN);
            }
        }
        catch (error) {
            Toast.show(languageConfig.registerinvaiderror, Toast.SHORT);
            firebase.crashlytics().recordError(error);
            resetScreen();
        }
    }

    //CLEAR FIELD UP DATA
    const resetScreen = () => {
        setFullname(null);
        setFullnameError(null);
        setMobileno(null);
        setMobilenoError(null);
        setEmail(null);
        setEmailError(null);
        setLoading(false);
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={KEY.TRANSPARENT} barStyle={Platform.OS === 'ios' ? KEY.DARK_CONTENT : KEY.LIGHT_CONTENT} />
            <ImageBackground source={backgroungImage ? { uri: backgroungImage } : IMAGE.BACKGROUND_IMAGE} style={styles.backgroundImage} >
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
                    <View style={{ position: KEY.ABSOLUTE, marginTop: 50, marginLeft: 15 }} >
                        <TouchableOpacity onPress={() => props.navigation.goBack(null)}>
                            <Feather name='arrow-left' size={25} color={COLOR.WHITE} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.containerView}>
                        <Image source={logo ? { uri: logo } : IMAGE.MEMBROZ_LOGO} resizeMode={KEY.COVER}
                            style={styles.imageLogo} />
                        <Text style={styles.welcomeText}>{languageConfig.register}</Text>
                        <View>
                            <TextInput placeholder={languageConfig.fullnameplaceholder}
                                placeholderTextColor={COLOR.GRANITE_GRAY}
                                selectionColor={COLOR.BLACK}
                                returnKeyType={KEY.NEXT}
                                style={!fullnameError ? styles.inputTextView : styles.inputTextViewError}
                                defaultValue={fullname}
                                blurOnSubmit={false}
                                onSubmitEditing={() => secondTextInputRef.current.focus()}
                                onChangeText={(fullname) => CheckFullname(fullname)}
                            />
                        </View>
                        <View>
                            <TextInput placeholder={languageConfig.emailplaceholder}
                                placeholderTextColor={COLOR.GRANITE_GRAY}
                                selectionColor={COLOR.BLACK}
                                returnKeyType={KEY.DONE}
                                style={!emailError ? styles.inputTextView : styles.inputTextViewError}
                                defaultValue={email}
                                blurOnSubmit={false}
                                ref={thirdTextInputRef}
                                onSubmitEditing={() => { Keyboard.dismiss(), onPressToRegister() }}
                                onChangeText={(email) => CheckEmail(email)}
                            />
                        </View>
                        <View>
                            <TextInput placeholder={languageConfig.mobileplaceholder}
                                placeholderTextColor={COLOR.GRANITE_GRAY}
                                selectionColor={COLOR.BLACK}
                                keyboardType='number-pad'
                                returnKeyType={KEY.NEXT}
                                style={!mobilenoError ? styles.inputTextView : styles.inputTextViewError}
                                defaultValue={mobileno}
                                blurOnSubmit={false}
                                ref={secondTextInputRef}
                                onSubmitEditing={() => thirdTextInputRef.current.focus()}
                                onChangeText={(mobile) => CheckMobileno(mobile)}
                            />
                        </View>
                        <TouchableOpacity style={styles.loginBtn} onPress={() => onPressToRegister()}>
                            <Text style={{
                                fontWeight: FONT.FONT_BOLD, color: COLOR.WHITE,
                                fontSize: FONT.FONT_SIZE_18, textTransform: KEY.CAPITALIZE
                            }}>{languageConfig.register}</Text>
                        </TouchableOpacity>
                        <View style={styles.joinBtn}>
                            <Text style={{ fontWeight: FONT.FONT_NORMAL, color: COLOR.WHITE, fontSize: FONT.FONT_SIZE_16 }}>{languageConfig.createaccount}</Text>
                            <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => { resetScreen(), props.navigation.navigate(SCREEN.LOGINSCREEN) }} >
                                <Text style={{ fontWeight: FONT.FONT_NORMAL, color: COLOR.DEFALUTCOLOR, fontSize: FONT.FONT_SIZE_16 }}>{languageConfig.loginbtn}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </ImageBackground>
            {loading ? <Loader /> : null}
        </SafeAreaView>
    );
}

export default RegisterScreen;

