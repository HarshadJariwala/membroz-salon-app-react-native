import React, { useEffect, useState } from 'react';
import {
    View, Text, Dimensions, SafeAreaView, ImageBackground,
    Image, TextInput, ScrollView, TouchableOpacity, StatusBar, Keyboard, Platform
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { RemoteServerController } from '../../services/LocalService/LocalService';
import { MemberLanguage } from '../../services/LocalService/LanguageService';
import crashlytics, { firebase } from "@react-native-firebase/crashlytics";
import languageConfig from '../../languages/languageConfig';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Loader from '../../components/loader/index';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import Toast from 'react-native-simple-toast';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import styles from './ContactUsStyle';
import moment from 'moment';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const ContactUsScreen = () => {
    const [logo, setLogo] = useState(null);

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
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.DEFALUTCOLOR} barStyle={KEY.DARK_CONTENT} />
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
                <View style={styles.viewMain}>
                    <View style={styles.viewRectangle}>
                        <Image source={logo ? { uri: logo } : IMAGE.MEMBROZ_LOGO} resizeMode={KEY.COVER}
                            style={styles.imageLogo} />
                        <View style={{
                            flexDirection: KEY.ROW, alignItems: KEY.FLEX_START, alignSelf: KEY.FLEX_START,
                            justifyContent: KEY.FLEX_START, marginTop: 5, marginLeft: 10
                        }}>
                            <Ionicons name='location-outline' size={22} color={COLOR.DEFALUTCOLOR} />
                            <Text style={{ alignItems: KEY.FLEX_START, fontSize: FONT.FONT_SIZE_16, color: COLOR.BLACK, marginLeft: 5, width: WIDTH * 0.8 }}>{"01/02, Milestone Habitat,, A1, Kailash Nagar Rd, near Jalaram Khaman, Kailash Nagar, Sagrampura, Surat, Gujarat 395002"}</Text>
                        </View>

                        <View style={{
                            flexDirection: KEY.ROW, alignItems: KEY.FLEX_START, alignSelf: KEY.FLEX_START,
                            justifyContent: KEY.FLEX_START, marginTop: 15, marginLeft: 10
                        }}>
                            <AntDesign name='mobile1' size={22} color={COLOR.DEFALUTCOLOR} />
                            <Text style={{ alignItems: KEY.FLEX_START, fontSize: FONT.FONT_SIZE_16, color: COLOR.BLACK, marginLeft: 5, width: WIDTH / 2 }}>{"+91 3950024561"}</Text>
                        </View>

                        <View style={{
                            flexDirection: KEY.ROW, alignItems: KEY.FLEX_START, alignSelf: KEY.FLEX_START,
                            justifyContent: KEY.FLEX_START, marginTop: 15, marginLeft: 12, marginBottom: 15
                        }}>
                            <Fontisto name='email' size={20} color={COLOR.DEFALUTCOLOR} />
                            <Text style={{
                                alignItems: KEY.FLEX_START, fontSize: FONT.FONT_SIZE_16,
                                color: COLOR.BLACK, marginLeft: 8, width: WIDTH * 0.8
                            }}>{"membersupport@example.com"}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.viewMain}>
                    <View style={styles.viewRectangle}>
                        <View style={{
                            flexDirection: KEY.ROW, marginTop: 10,
                            alignSelf: KEY.FLEX_START, marginLeft: 20
                        }}>
                            <Text style={{
                                fontSize: FONT.FONT_SIZE_18, textTransform: KEY.CAPITALIZE, color: COLOR.BLACK,
                                fontWeight: FONT.FONT_WEIGHT_BOLD
                            }}>{languageConfig.hourstext}</Text>
                            <Text style={{
                                fontSize: FONT.FONT_SIZE_18, textTransform: KEY.CAPITALIZE, color: COLOR.DEFALUTCOLOR,
                                fontWeight: FONT.FONT_WEIGHT_BOLD, marginLeft: 5
                            }}>{languageConfig.opentext}</Text>
                        </View>

                        <View style={{
                            alignItems: KEY.FLEX_START, alignSelf: KEY.FLEX_START,
                            justifyContent: KEY.FLEX_START, marginLeft: 10, marginTop: 10
                        }}>
                            <Text style={{
                                fontSize: FONT.FONT_SIZE_18, textTransform: KEY.CAPITALIZE, color: COLOR.BLACK,
                                fontWeight: FONT.FONT_WEIGHT_BOLD, marginLeft: 10
                            }}>{"Monday - Saturday"}</Text>
                            <View style={{
                                flexDirection: KEY.ROW, alignItems: KEY.FLEX_START, alignSelf: KEY.FLEX_START,
                                justifyContent: KEY.FLEX_START, marginTop: 5, marginLeft: 5
                            }}>
                                <MaterialCommunityIcons name='timer' size={22} color={COLOR.DEFALUTCOLOR} />
                                <Text style={{
                                    alignItems: KEY.FLEX_START, fontSize: FONT.FONT_SIZE_16,
                                    color: COLOR.BLACK, marginLeft: 5, width: WIDTH / 2
                                }}>{"9:00 AM - 6:00 PM"}</Text>
                            </View>
                        </View>

                        <View style={{
                            alignItems: KEY.FLEX_START, alignSelf: KEY.FLEX_START,
                            justifyContent: KEY.FLEX_START, marginLeft: 10, marginTop: 10, marginBottom: 10
                        }}>
                            <Text style={{
                                fontSize: FONT.FONT_SIZE_18, textTransform: KEY.CAPITALIZE, color: COLOR.BLACK,
                                fontWeight: FONT.FONT_WEIGHT_BOLD, marginLeft: 10
                            }}>{"Sunday"}</Text>
                            <View style={{
                                flexDirection: KEY.ROW, alignItems: KEY.FLEX_START, alignSelf: KEY.FLEX_START,
                                justifyContent: KEY.FLEX_START, marginTop: 5, marginLeft: 5
                            }}>
                                <MaterialCommunityIcons name='timer' size={22} color={COLOR.DEFALUTCOLOR} />
                                <Text style={{
                                    alignItems: KEY.FLEX_START, fontSize: FONT.FONT_SIZE_16,
                                    color: COLOR.BLACK, marginLeft: 5, width: WIDTH / 2
                                }}>{"9:00 AM - 6:00 PM"}</Text>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.btnStyle} onPress={() => onPressToLogin()}>
                        <Text style={{ fontWeight: FONT.FONT_WEIGHT_BOLD, color: COLOR.WHITE, fontSize: FONT.FONT_SIZE_18 }}>{languageConfig.submitquery}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ContactUsScreen;
