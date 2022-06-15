import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Dimensions,
    SafeAreaView,
    ImageBackground,
    TextInput,
    ScrollView,
    TouchableOpacity,
    StatusBar, Image, Keyboard, Platform
} from 'react-native';
import { SendEmailService, SendSmsService } from '../../services/SendEmailandSmsService/SendEmailandSmsService';
import { RemoteServerController } from '../../services/LocalService/LocalService';
import { CheckMemberService } from '../../services/MemberService/MemberService';
import { MemberLanguage } from '../../services/LocalService/LanguageService';
import crashlytics, { firebase } from "@react-native-firebase/crashlytics";
import AsyncStorage from '@react-native-community/async-storage';
import languageConfig from '../../languages/languageConfig';
import * as SCREEN from '../../context/screen/screenName';
import axiosConfig from '../../helpers/axiosConfig';
import Loader from '../../components/loader/index';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import Toast from 'react-native-simple-toast';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import styles from './Style';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const ForgotPasswordScreen = (props) => {
    const [backgroungImage, setBackgroungImage] = useState(null);
    const [memberName, setMemberName] = useState(null);
    const [loading, setloading] = useState(false);
    const [memberNameError, setMemberNameError] = useState(null);
    const [verifyOtpNumber, setVerifyOtpNumber] = useState(null);
    const [inputOtpNumber, setInputOtpNumber] = useState(null);
    const [inputOtpNumberError, setInputOtpNumberError] = useState(null);
    const [memberInfo, setMemberInfo] = useState(null);
    const [authKey, setAuthKey] = useState(null);
    const [appName, setAppName] = useState(null);
    const [logo, setLogo] = useState(null);

    useEffect(() => {
        //LANGUAGE MANAGEMENT FUNCTION
        MemberLanguage();
        // check AuthController use to Login Or Not Login
        AuthController();
    }, []);

    useEffect(() => {
    }, [backgroungImage, memberName, loading, memberNameError, verifyOtpNumber,
        inputOtpNumber, memberInfo, inputOtpNumberError, authKey, appName])

    // CHECK AUTHCONTROLLER USE TO LOGIN OR NOT LOGIN
    async function AuthController() {
        var userData = await RemoteServerController();
        if (userData) {
            setLogo(userData.applogo);
            setAuthKey(userData.authkey);
            setAppName(userData.appname);
            setBackgroungImage(userData.loginimage);
        }
    };

    //CHECK EMAIL VALIDATION
    const checkEmail = (email) => {
        if (!email || email.length <= 0) {
            setMemberNameError(languageConfig.usernameerror);
            return;
        }
        setMemberName(email);
        setMemberNameError(null);
        return;
    }

    //CLEAR FIELD UP DATA
    const resetScreen = () => {
        setloading(false);
        setMemberName(null);
        setMemberNameError(null);
        setInputOtpNumber(null);
        setInputOtpNumberError(null);
        setVerifyOtpNumber(null);
        setMemberInfo(null);
    }

    // GENERATE OTP FUNCTION 
    const createOtp = async () => {
        let body;
        if (!memberName) {
            checkEmail(memberName);
            return;
        }
        try {
            setloading(true);
            if (memberName) {
                body = {
                    "username": memberName.toUpperCase()
                }
            }

            const CheckUserResponse = await CheckMemberService(body);
            if (Object.keys(CheckUserResponse.data).length !== 0 && CheckUserResponse.data != null && CheckUserResponse.data != 'undefind' && CheckUserResponse.status == 200) {
                const verifyOtpNumber = Math.floor(1000 + Math.random() * 9000);
                console.log(`verifyOtpNumber`, verifyOtpNumber);
                setVerifyOtpNumber(verifyOtpNumber);
                setMemberInfo(CheckUserResponse.data);
                onPressSubmit(CheckUserResponse.data.property, verifyOtpNumber);
                Toast.show(languageConfig.optsending, Toast.SHORT);
                setloading(false);
            }
            else {
                Toast.show(languageConfig.usernotexits, Toast.SHORT);
                resetScreen();
            }
        }
        catch (error) {
            firebase.crashlytics().recordError(error);
            resetScreen();
            Toast.show(languageConfig.usernotexits, Toast.SHORT);
        };
    }

    //OTP VERIFY FUNCTION
    const otpVerify = async () => {
        if (!inputOtpNumber) {
            setInputOtpNumberError(languageConfig.otprequired);
            return;
        }
        setloading(true);

        try {
            if (Number(inputOtpNumber) === Number(verifyOtpNumber)) {
                setloading(false);
                let userValue;
                if (memberName) {
                    userValue = { id: memberInfo._id, username: memberName.toUpperCase() }
                }
                resetScreen();
                props.navigation.navigate(SCREEN.NEWPASSWORDSCREEN, { userValue });
            } else {
                setloading(false);
                setInputOtpNumber(null);
                setInputOtpNumberError(languageConfig.otpnotmatch);
            }
        }
        catch (error) {
            firebase.crashlytics().recordError(error);
            resetScreen();
            Toast.show(languageConfig.usernotexits, Toast.SHORT);
        };
    }

    //SIGN IN BUTTON ONPRESS TO PROCESS
    const onPressSubmit = async (member, verifyOtpNumber) => {
        console.log(`verifyOtpNumber`, verifyOtpNumber);
        axiosConfig(authKey);
        let mobilebody;
        let emailbody;

        if (member && member.mobile) {
            mobilebody = {
                "messagetype": "SMS",
                "message": {
                    "content": `${verifyOtpNumber} is the OTP for accessing on ${appName}. Valid till 5 Minutes.Do not share this with anyone.`,
                    "to": member.mobile,
                    "subject": "Reset Password OTP"
                }
            }
        }

        if (member && member.primaryemail) {
            emailbody = {
                "messagetype": "EMAIL",
                "message": {
                    "content": `${verifyOtpNumber} is the OTP for accessing on ${appName}. Valid till 5 Minutes.Do not share this with anyone.`,
                    "to": member.primaryemail,
                    "subject": "Reset Password OTP"
                }
            }
        }

        setloading(true);
        try {
            if (member && member.primaryemail) {
                const responseEmail = await SendEmailService(emailbody);
                if (responseEmail.data != 'undefind' && responseEmail.status == 200) {
                    setloading(false);
                }
            }

            if (member && member.mobile) {
                const responseSMS = await SendSmsService(mobilebody);
                if (responseSMS.data != 'undefind' && responseSMS.status == 200) {
                    setloading(false);
                }
            }
        }
        catch (error) {
            firebase.crashlytics().recordError(error);
            resetScreen();
            Toast.show(languageConfig.usernotexits, Toast.SHORT);
        };
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={KEY.TRANSPARENT} barStyle={Platform.OS === 'ios' ? KEY.DARK_CONTENT : KEY.LIGHT_CONTENT} />
            <ImageBackground source={backgroungImage ? { uri: backgroungImage } : IMAGE.BACKGROUND_IMAGE} style={styles.backgroundImage} >
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
                    <View style={styles.containerView}>
                        <Image source={logo ? { uri: logo } : IMAGE.MEMBROZ_LOGO} resizeMode={KEY.COVER}
                            style={styles.imageLogo} />
                        <Text style={styles.welcomeText}>{languageConfig.forgetpasstext}</Text>
                        {
                            memberInfo ?
                                <View>
                                    <TextInput
                                        placeholder={languageConfig.otpplaceholder}
                                        keyboardType={KEY.NUMBER_PAD}
                                        placeholderTextColor={COLOR.GRANITE_GRAY}
                                        selectionColor={COLOR.BLACK}
                                        style={!inputOtpNumberError ? styles.inputTextView : styles.inputTextViewError}
                                        defaultValue={inputOtpNumber}
                                        returnKeyType="done"
                                        onSubmitEditing={() => Keyboard.dismiss()}
                                        onChangeText={(number) => setInputOtpNumber(number)}
                                    />
                                    <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                                        <TouchableOpacity style={styles.forgotButton}
                                            onPress={() => otpVerify()}>
                                            <Text style={{ fontWeight: FONT.FONT_BOLD, color: COLOR.WHITE, fontSize: FONT.FONT_SIZE_18 }}>{languageConfig.verifyotp}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                :
                                <View>
                                    <View>
                                        <TextInput
                                            placeholder={languageConfig.usernametext}
                                            placeholderTextColor={COLOR.GRANITE_GRAY}
                                            selectionColor={COLOR.BLACK}
                                            style={!memberNameError ? styles.inputTextView : styles.inputTextViewError}
                                            defaultValue={memberName}
                                            returnKeyType="done"
                                            onSubmitEditing={() => Keyboard.dismiss()}
                                            onChangeText={(email) => checkEmail(email)}
                                        />
                                    </View>
                                    <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                                        <TouchableOpacity style={styles.forgotButton} onPress={() => createOtp()}>
                                            <Text style={{
                                                fontWeight: FONT.FONT_BOLD, color: COLOR.WHITE, fontSize: FONT.FONT_SIZE_18,
                                                textTransform: KEY.CAPITALIZE
                                            }}>{languageConfig.resetpasswordbtn}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                        }
                    </View>
                </ScrollView>
            </ImageBackground>
            {loading == true ? <Loader /> : null}
        </SafeAreaView>
    );
}

export default ForgotPasswordScreen;

