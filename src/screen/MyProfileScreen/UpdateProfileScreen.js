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
    StatusBar, Modal, Keyboard
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

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
                <View style={styles.containerView}>
                    <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, marginTop: 20 }}>
                        <TouchableOpacity style={styles.viewRound}>
                            <Image source={IMAGE.USERPROFILE}
                                style={{ height: 95, width: 95, borderRadius: 100 }} />
                        </TouchableOpacity>
                        <Text style={styles.text}>{'Krtya Test'}</Text>
                    </View>

                    <View style={styles.cardView}>
                        <View style={{ marginTop: 20 }}>
                            <TextInput
                                placeholder={languageConfig.usernameplaceholder}
                                style={styles.inputTextView}
                                type={KEY.CLEAR}
                                returnKeyType={KEY.NEXT}
                                placeholderTextColor={COLOR.PLACEHOLDER_COLOR}
                            />
                        </View>

                        <View>
                            <TextInput
                                placeholder={languageConfig.emailplaceholder}
                                style={styles.inputTextView}
                                type={KEY.CLEAR}
                                returnKeyType={KEY.NEXT}
                                placeholderTextColor={COLOR.PLACEHOLDER_COLOR}
                            />
                        </View>

                        <View>
                            <TextInput
                                placeholder={languageConfig.mobileplaceholder}
                                style={styles.inputTextView}
                                type={KEY.CLEAR}
                                returnKeyType={KEY.NEXT}
                                placeholderTextColor={COLOR.PLACEHOLDER_COLOR}
                            />
                        </View>

                        <View>
                            <TextInput
                                placeholder={languageConfig.addressline1}
                                style={styles.inputTextView}
                                type={KEY.CLEAR}
                                returnKeyType={KEY.NEXT}
                                placeholderTextColor={COLOR.PLACEHOLDER_COLOR}
                            />
                        </View>

                        <View>
                            <TextInput
                                placeholder={languageConfig.addressline2}
                                style={styles.inputTextView}
                                type={KEY.CLEAR}
                                returnKeyType={KEY.NEXT}
                                placeholderTextColor={COLOR.PLACEHOLDER_COLOR}
                            />
                        </View>

                        <View>
                            <TextInput
                                placeholder={languageConfig.city}
                                style={styles.inputTextView}
                                type={KEY.CLEAR}
                                returnKeyType={KEY.NEXT}
                                placeholderTextColor={COLOR.PLACEHOLDER_COLOR}
                            />
                        </View>

                        <View>
                            <TextInput
                                placeholder={languageConfig.state}
                                style={styles.inputTextView}
                                type={KEY.CLEAR}
                                returnKeyType={KEY.NEXT}
                                placeholderTextColor={COLOR.PLACEHOLDER_COLOR}
                            />
                        </View>

                        <View>
                            <TextInput
                                placeholder={languageConfig.pincode}
                                style={styles.inputTextView}
                                type={KEY.CLEAR}
                                returnKeyType={KEY.NEXT}
                                placeholderTextColor={COLOR.PLACEHOLDER_COLOR}
                            />
                        </View>

                        <TouchableOpacity style={styles.forgotButton} onPress={() => { }}>
                            <Text style={{ fontWeight: FONT.FONT_WEIGHT_BOLD, color: COLOR.WHITE, fontSize: FONT.FONT_SIZE_16 }}>{languageConfig.updatetext}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ marginBottom: 20 }} />
            </ScrollView>
        </SafeAreaView>
    )
}

export default UpdateProfileScreen;
