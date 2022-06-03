import React, { useEffect, useState } from 'react';
import {
    View,
    Image, TouchableOpacity,
    Dimensions, Text,
    SafeAreaView,
    ImageBackground,
    StatusBar, Platform
} from 'react-native';
import { RemoteServerController } from '../../services/LocalService/LocalService';
import { MemberLanguage } from '../../services/LocalService/LanguageService';
import languageConfig from '../../languages/languageConfig';
import * as SCREEN from '../../context/screen/screenName';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import styles from './ExpoloreLoginStyle';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const ExpoloreLoginScreen = (props) => {
    const [applogo, setAppLogo] = useState(null);
    const [backgroungImage, setBackgroungImage] = useState(null);

    useEffect(() => {
        //LANGUAGE MANAGEMENT FUNCTION
        MemberLanguage();
        // CHECK AUTHCONTROLLER USE TO LOGIN OR NOT LOGIN
        RemoteController();
    }, []);

    // CHECK AUTHCONTROLLER USE TO LOGIN OR NOT LOGIN
    async function RemoteController() {
        var userData = await RemoteServerController();
        if (userData) {
            setAppLogo(userData.applogo)
            setBackgroungImage(userData.exploreimage);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={KEY.TRANSPARENT} barStyle={Platform.OS === 'ios' ? KEY.DARK_CONTENT : KEY.LIGHT_CONTENT} />
            <ImageBackground source={backgroungImage ? { uri: backgroungImage } : IMAGE.BACKGROUND_IMAGE} style={{ height: "100%", width: "100%" }} >
                <View style={styles.containerView}>
                    <Image source={applogo ? { uri: applogo } : IMAGE.MEMBROZ_LOGO} resizeMode={KEY.COVER} style={styles.imageLogo} />
                    <Text style={styles.welcomeText}>{languageConfig.welcometext}</Text>
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate(SCREEN.LOGINSCREEN)}
                        style={styles.loginBtn}>
                        <Text style={{ fontWeight: FONT.FONT_WEIGHT_BOLD, color: COLOR.WHITE, fontSize: FONT.FONT_SIZE_18 }}>{languageConfig.memberlogin}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate(SCREEN.EXPLORESCREEN)}
                        style={styles.ButtonView} >
                        <Text style={styles.textExploreStyle}>{languageConfig.explorenow}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate(SCREEN.OFFERSCREEN)}
                        style={styles.ButtonView} >
                        <Text style={styles.textExploreStyle}>{languageConfig.offer}</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default ExpoloreLoginScreen
