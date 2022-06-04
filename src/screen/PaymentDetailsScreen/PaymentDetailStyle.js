import { Dimensions, StyleSheet } from "react-native";
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
    viewMain: {
        height: HEIGHT - 220,
        backgroundColor: COLOR.WHITE,
        borderRadius: 20,
        marginTop: 10,
        marginRight: 15,
        marginLeft: 15,
        marginBottom: 10,
        shadowColor: COLOR.BLACK,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    listTab: {
        marginTop: 0,
        borderRadius: 100,
        flexDirection: KEY.ROW
    },
    btnTab: {
        flexDirection: KEY.ROW,
        width: "50%",
        padding: 10,
        justifyContent: KEY.CENTER,
        borderBottomColor: COLOR.BLACK,
        borderBottomWidth: 2
    },
    tabText: {
        fontSize: FONT.FONT_SIZE_18,
        fontWeight: FONT.FONT_WEIGHT_BOLD,
        textTransform: KEY.CAPITALIZE,
        color: COLOR.LIGHT_BLACK
    },
    tabTextActive: {
        fontSize: FONT.FONT_SIZE_18,
        fontWeight: FONT.FONT_WEIGHT_BOLD,
        textTransform: KEY.CAPITALIZE,
        color: COLOR.DEFALUTCOLOR

    },
    tabActive: {
        width: "50%",
        borderBottomColor: COLOR.DEFALUTCOLOR,
        borderBottomWidth: 2
    },
    textTouchable: {
        marginTop: 10,
        marginRight: 10,
        marginLeft: 15,
        flexDirection: KEY.ROW
    },
    text: {
        fontSize: FONT.FONT_SIZE_14,
        color: COLOR.TAUPE_GRAY
    },
});

export default styles;