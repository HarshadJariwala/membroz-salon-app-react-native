import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Dimensions,
    SafeAreaView,
    Image,
    TextInput,
    ScrollView,
    TouchableOpacity,
    StatusBar, Modal, Keyboard, Platform
} from 'react-native';
import { patchMemberService } from '../../services/MemberService/MemberService';
import { MemberLanguage } from '../../services/LocalService/LanguageService';
import crashlytics, { firebase } from "@react-native-firebase/crashlytics";
import * as LocalService from '../../services/LocalService/LocalService';
import { CLOUD_URL, UPLOAD_PRESET } from '../../context/actions/type';
import MyPermissionController from '../../helpers/appPermission';
import languageConfig from '../../languages/languageConfig';
import * as SCREEN from '../../context/screen/screenName';
import Loader from '../../components/loader/index';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';
import Toast from 'react-native-simple-toast';
import * as IMAGE from '../../styles/image';
import styles from './UpdateProfileStyle';
import RNFetchBlob from 'rn-fetch-blob';
import moment from 'moment';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const UpdateProfileScreen = (props) => {
    const [memberInfo, setMemberInfo] = useState(null);
    const [memberName, setMemberName] = useState(null);
    const [memberID, setMemberID] = useState(null);
    const [loading, setLoading] = useState(false);
    const [fullname, setFullname] = useState(null);
    const [fullnameerror, setFullNameError] = useState(null);
    const [email, setEmail] = useState(null);
    const [emailerror, setEmailError] = useState(null);
    const [mobileno, setMobileno] = useState(null);
    const [mobilenoError, setMobilenoError] = useState(null);
    const [address, setAddress] = useState(null);
    const [city, setCity] = useState(null);
    const [state, setState] = useState(null);
    const [pincode, setPincode] = useState(null);
    const [memberprofilePic, setMemberprofilePic] = useState(null);
    const firstTextInputRef = React.createRef();
    const secondTextInputRef = React.createRef();
    const thirdTextInputRef = React.createRef();
    const fourTextInputRef = React.createRef();
    const fiveTextInputRef = React.createRef();
    const sixTextInputRef = React.createRef();

    useEffect(() => {
        setLoading(true);
        //LANGUAGE MANAGEMENT FUNCTION        
        MemberLanguage();
        getMemberDeatilsLocalStorage();
        //console.log("dnjsdkj");
    }, []);

    useEffect(() => { }, [
        memberID, loading, fullname, fullnameerror, email,
        emailerror, mobileno, mobilenoError, memberName,
        memberInfo, address, city, state, pincode, memberprofilePic
    ]);

    //GET MEMBER DATA IN MOBILE LOCAL STORAGE
    const getMemberDeatilsLocalStorage = async () => {
        var memberInfo = await LocalService.LocalStorageService();
        if (memberInfo) {
            setMemberID(memberInfo?._id);
            setFullname(memberInfo?.fullname);
            setEmail(memberInfo?.property?.primaryemail);
            setMobileno(memberInfo?.property?.mobile);
            setAddress(memberInfo?.property?.address);
            setCity(memberInfo?.property?.city);
            setState(memberInfo?.property?.country);
            setPincode(memberInfo?.property?.pincode);
            setMemberInfo(memberInfo);
            setMemberName(memberInfo?.fullname);
            setMemberprofilePic(memberInfo?.profilepic);
            setLoading(false);
        } else {
            setLoading(false);
        }
    }

    //CHECK FULL NAME VALIDATION
    const CheckFullName = (fullname) => {
        if (!fullname || fullname.length <= 0) {
            console.log(`fullname`)
            setFullNameError(languageConfig.mobileerror);
            return;
        }
        setFullname(fullname);
        setFullNameError(null);
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

    //CHECK MOBILENO VALIDATION
    const CheckMobileno = (mobile) => {
        if (!mobile || mobile.length <= 0) {
            setMobilenoError(languageConfig.mobileerror);
            return;
        }
        setMobileno(mobile);
        setMobilenoError(null);
        return;
    }

    //UPDATE PROFILE PICTURE API CALL
    const UpdateProfileService = async () => {
        if (!fullname || !mobileno || !email) {
            CheckFullName(fullname);
            CheckEmail(email);
            CheckMobileno(mobileno);
            return;
        }
        Keyboard.dismiss();
        setLoading(true);
        let member = memberInfo;
        member.fullname = fullname;
        member.property.email = email;
        member.property.mobile = mobileno;
        member.property.city = city;
        member.property.address = address;
        member.property.country = state;
        member.property.pincode = pincode;
        try {
            const response = await patchMemberService(memberID, member);
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                console.log(`response`, response);
                props.navigation.replace(SCREEN.MYPROFILESCREEN);
                LocalService.AuthenticateMember(response.data);
                setLoading(false);
                Toast.show(languageConfig.profilesucessmessage, Toast.LONG);
            }
        }
        catch (error) {
            console.log(`error`, error);
            firebase.crashlytics().recordError(error);
            setLoading(false);
            Toast.show(languageConfig.profileerrormessage, Toast.LONG);
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.STATUSBARCOLOR} barStyle={Platform.OS === 'ios' ? KEY.DARK_CONTENT : KEY.DARK_CONTENT} />
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
                <View style={styles.containerView}>
                    <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, marginTop: 20 }}>
                        <TouchableOpacity style={styles.viewRound}>
                            <Image source={!memberprofilePic ? IMAGE.USERPROFILE : { uri: memberprofilePic }}
                                style={{ height: 95, width: 95, borderRadius: 100 }} />
                        </TouchableOpacity>
                        <Text style={styles.text}>{memberName && memberName}</Text>
                    </View>
                    <View style={styles.cardView}>
                        <View style={{ marginTop: 20 }}>
                            <TextInput
                                placeholder={languageConfig.usernameplaceholder}
                                placeholderTextColor={COLOR.PLACEHOLDER_COLOR}
                                selectionColor={COLOR.GRANITE_GRAY}
                                returnKeyType={KEY.NEXT}
                                style={!fullnameerror ? styles.inputTextView : styles.inputTextViewError}
                                defaultValue={fullname}
                                blurOnSubmit={false}
                                onSubmitEditing={() => firstTextInputRef.current.focus()}
                                onChangeText={(fullname) => CheckFullName(fullname)}
                            />
                        </View>
                        <View>
                            <TextInput
                                placeholder={languageConfig.emailplaceholder}
                                placeholderTextColor={COLOR.PLACEHOLDER_COLOR}
                                selectionColor={COLOR.GRANITE_GRAY}
                                returnKeyType={KEY.NEXT}
                                keyboardType='email-address'
                                style={!emailerror ? styles.inputTextView : styles.inputTextViewError}
                                defaultValue={email}
                                blurOnSubmit={false}
                                ref={firstTextInputRef}
                                onSubmitEditing={() => secondTextInputRef.current.focus()}
                                onChangeText={(email) => CheckEmail(email)}
                            />
                        </View>
                        <View>
                            <TextInput
                                placeholder={languageConfig.mobileplaceholder}
                                placeholderTextColor={COLOR.PLACEHOLDER_COLOR}
                                selectionColor={COLOR.GRANITE_GRAY}
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

                        <View>
                            <TextInput
                                placeholder={languageConfig.addresstext}
                                placeholderTextColor={COLOR.PLACEHOLDER_COLOR}
                                returnKeyType={KEY.NEXT}
                                selectionColor={COLOR.GRANITE_GRAY}
                                style={styles.inputTextView}
                                defaultValue={address}
                                blurOnSubmit={false}
                                ref={thirdTextInputRef}
                                onSubmitEditing={() => fourTextInputRef.current.focus()}
                                onChangeText={(address) => setAddress(address)}

                            />
                        </View>

                        <View>
                            <TextInput
                                placeholder={languageConfig.city}
                                placeholderTextColor={COLOR.PLACEHOLDER_COLOR}
                                selectionColor={COLOR.GRANITE_GRAY}
                                returnKeyType={KEY.NEXT}
                                style={styles.inputTextView}
                                defaultValue={city}
                                blurOnSubmit={false}
                                ref={fourTextInputRef}
                                onSubmitEditing={() => fiveTextInputRef.current.focus()}
                                onChangeText={(city) => setCity(city)}
                            />
                        </View>

                        <View>
                            <TextInput
                                placeholder={languageConfig.state}
                                placeholderTextColor={COLOR.PLACEHOLDER_COLOR}
                                selectionColor={COLOR.GRANITE_GRAY}
                                returnKeyType={KEY.NEXT}
                                style={styles.inputTextView}
                                defaultValue={state}
                                blurOnSubmit={false}
                                ref={fiveTextInputRef}
                                onSubmitEditing={() => sixTextInputRef.current.focus()}
                                onChangeText={(state) => setState(state)}
                            />
                        </View>

                        <View>
                            <TextInput
                                placeholder={languageConfig.pincode}
                                placeholderTextColor={COLOR.PLACEHOLDER_COLOR}
                                selectionColor={COLOR.GRANITE_GRAY}
                                returnKeyType={KEY.NEXT}
                                style={styles.inputTextView}
                                defaultValue={pincode}
                                blurOnSubmit={false}
                                ref={sixTextInputRef}
                                onSubmitEditing={() => UpdateProfileService()}
                                onChangeText={(pincode) => setPincode(pincode)}
                            />
                        </View>
                        <TouchableOpacity style={styles.forgotButton} onPress={() => UpdateProfileService()}>
                            <Text style={{ fontWeight: FONT.FONT_BOLD, color: COLOR.WHITE, fontSize: FONT.FONT_SIZE_16 }}>{languageConfig.updatetext}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            {loading ? <Loader /> : null}
        </SafeAreaView>
    )
}

export default UpdateProfileScreen;
