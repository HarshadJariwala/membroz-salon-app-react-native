import React, { useEffect, useState } from "react";
import { View, Text, Image, Dimensions, StatusBar } from "react-native";
import * as COLOR from '../../styles/colors';

import styles from './Packagestyle';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import Loader from '../../components/loader/index';
import languageConfig from '../../languages/languageConfig';
import * as IMAGE from '../../styles/image';
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
const Package = (props) => {
    const [loading, setLoading] = useState(null);

    useEffect(() => { }, loading)
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.STATUSBARCOLOR} barStyle={KEY.DARK_CONTENT} />
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>

            </ScrollView>
            {
                !loading &&
                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, }}>
                    <Image source={IMAGE.NODATA} style={{ height: 150, width: 200, }} resizeMode={KEY.CONTAIN} />
                    <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.TAUPE_GRAY, }}>{languageConfig.norecordtext}</Text>
                </View>
            }
            {loading ? <Loader /> : null}

        </SafeAreaView>
    )
}


export default Package;
