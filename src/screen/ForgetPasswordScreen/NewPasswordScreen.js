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
    StyleSheet,
    StatusBar, Image, Keyboard, Platform
} from 'react-native';
import { ForgetPasswordService } from '../../services/PasswordService/PasswordService';
import { RemoteServerController } from '../../services/LocalService/LocalService';
import { MemberLanguage } from '../../services/LocalService/LanguageService';
import crashlytics, { firebase } from "@react-native-firebase/crashlytics";
import AsyncStorage from '@react-native-community/async-storage';
import languageConfig from '../../languages/languageConfig';
import * as SCREEN from '../../context/screen/screenName';
import { REMOTEDATA } from '../../context/actions/type';
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

const NewPasswordScreen = (props) => {
    const [backgroungImage, setBackgroungImage] = useState(null);
    const memberName = props.route.userValue;
    const [newPassword, setNewPassword] = useState(null);
    const [newPassworderror, setNewPassworderror] = useState(null);
    const [rePassword, setRePassword] = useState(null);
    const [rePassworderror, setRePassworderror] = useState(null);
    const [loading, setloading] = useState(false);
    const [logo, setLogo] = useState(null);
    const secondTextInputRef = React.createRef();

    useEffect(() => {
    }, [newPassword, newPassworderror, rePassword, rePassworderror, loading])

    useEffect(() => {
        //LANGUAGE MANAGEMENT FUNCTION
        MemberLanguage();
        // CHECK AUTHCONTROLLER USE TO LOGIN OR NOT LOGIN
        AuthController();
    }, []);

    // CHECK AUTHCONTROLLER USE TO LOGIN OR NOT LOGIN
    async function AuthController() {
        var userData = await RemoteServerController();
        if (userData) {
            setLogo(userData.applogo);
            setBackgroungImage(userData.loginimage);
        }
    };

    //CHECK PASSWORD VALIDATION
    const setNewPasswordCheck = (password) => {
        if (!password || password.length <= 0) {
            setNewPassworderror(languageConfig.newpassworderror);
            return;
        }
        setNewPassword(password);
        setNewPassworderror(null);
        return;
    }

    //CHECK PASSWORD VALIDATION
    const setRePasswordCheck = (repassword) => {
        if (!repassword || repassword.length <= 0) {
            setRePassworderror(languageConfig.confirmpassworderror);
            return;
        }
        setRePassword(repassword);
        setRePassworderror(null);
        return;
    }

    //CLEAR FIELD UP DATA
    const resetScreen = () => {
        setloading(false);
        setNewPassword(null);
        setNewPassworderror(null);
        setRePassword(null);
        setRePassworderror(null);
    }

    //SIGN IN BUTTON ONPRESS TO PROCESS
    const onPressSubmit = async () => {
        axiosConfig(memberName.id);
        if (!newPassword || !rePassword) {
            setNewPasswordCheck(newPassword);
            setRePasswordCheck(rePassword);
            return;
        }

        if (newPassword != rePassword) {
            setRePassworderror(languageConfig.repassworderror);
            setNewPassworderror(languageConfig.renewpassworderror);
            return;
        }

        const body = {
            "newpassword": newPassword,
            "username": memberName.username
        }
        setloading(true);
        try {
            const response = await ForgetPasswordService(body);
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                setloading(false);
                Toast.show(languageConfig.resetsuccesmessage, Toast.SHORT);
                props.navigation.replace(SCREEN.LOGINSCREEN);
            }
        } catch (error) {
            firebase.crashlytics().recordError(error);
            resetScreen();
            Toast.show(languageConfig.reseterrormessage, Toast.SHORT);
        };
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={KEY.TRANSPARENT} barStyle={Platform.OS === 'ios' ? KEY.DARK_CONTENT : KEY.LIGHT_CONTENT} />
            <ImageBackground source={backgroungImage ? { uri: backgroungImage } : IMAGE.BACKGROUND_IMAGE} style={styles.backgroundImage} >
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
                    <View style={styles.containerView}>
                        <Image source={logo ? { uri: logo } : IMAGE.MEMBROZ_LOGO} resizeMode={KEY.COVER}
                            style={styles.imageLogo} />
                        <Text style={styles.welcomeText}>{languageConfig.forgetpasstext}</Text>
                        <View>
                            <TextInput
                                placeholder={languageConfig.newpasswordplaceholder}
                                placeholderTextColor={COLOR.GRANITE_GRAY}
                                selectionColor={COLOR.BLACK}
                                style={!newPassworderror ? styles.inputTextView : styles.inputTextViewError}
                                returnKeyType="next"
                                defaultValue={newPassword}
                                blurOnSubmit={false}
                                secureTextEntry={true}
                                onSubmitEditing={() => secondTextInputRef.current.focus()}
                                onChangeText={(password) => setNewPasswordCheck(password)}
                            />
                        </View>
                        <View>
                            <TextInput
                                placeholder={languageConfig.confirmpasswordplaceholder}
                                placeholderTextColor={COLOR.GRANITE_GRAY}
                                selectionColor={COLOR.BLACK}
                                style={!rePassworderror ? styles.inputTextView : styles.inputTextViewError}
                                defaultValue={rePassword}
                                returnKeyType="done"
                                blurOnSubmit={false}
                                ref={secondTextInputRef}
                                secureTextEntry={true}
                                onSubmitEditing={() => Keyboard.dismiss()}
                                onChangeText={(repassword) => setRePasswordCheck(repassword)}
                            />
                        </View>
                        <TouchableOpacity style={styles.forgotButton} onPress={() => onPressSubmit()}>
                            <Text style={{
                                fontWeight: FONT.FONT_WEIGHT_BOLD, color: COLOR.WHITE,
                                fontSize: FONT.FONT_SIZE_18, textTransform: KEY.CAPITALIZE
                            }}>{languageConfig.updatetext}</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </ImageBackground>
            {loading == true ? <Loader /> : null}
        </SafeAreaView>
    );
}

export default NewPasswordScreen;

