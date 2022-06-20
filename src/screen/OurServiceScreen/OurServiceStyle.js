import { Dimensions, StyleSheet } from "react-native";
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
    deactiveTabStyle: {
        height: 25,
        marginTop: 10,
        borderRadius: 100,
        backgroundColor: COLOR.WHITE,
        shadowColor: COLOR.BLACK,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 3,
        alignItems: KEY.CENTER,
        justifyContent: KEY.CENTER,
        margin: 10
    },
    activeTabStyle: {
        height: 25,
        marginTop: 10,
        borderRadius: 100,
        backgroundColor: COLOR.DEFALUTCOLOR,
        shadowColor: COLOR.BLACK,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 3,
        alignItems: KEY.CENTER,
        justifyContent: KEY.CENTER,
        margin: 10
    },
    deactiveTextStyle: {
        fontSize: FONT.FONT_SIZE_14,
        fontWeight: FONT.FONT_BOLD,
        textTransform: KEY.CAPITALIZE,
        color: COLOR.BLACK,
        marginLeft: 15,
        marginRight: 15
    },
    activeTextStyle: {
        fontSize: FONT.FONT_SIZE_14,
        fontWeight: FONT.FONT_BOLD,
        textTransform: KEY.CAPITALIZE,
        color: COLOR.WHITE,
        marginLeft: 15,
        marginRight: 15
    },
    img_card: {
        width: WIDTH - 30,
        height: 100,
        marginTop: 10,
        borderRadius: 10,
        backgroundColor: COLOR.WHITE,
        shadowColor: COLOR.BLACK,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        marginBottom: 5,
        flexDirection: KEY.ROW
    },
    img: {
        width: 100,
        height: 100,
        borderRadius: 10
    },
    upgrade: {
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER,
        width: 80,
        height: 30,
        backgroundColor: COLOR.DEFALUTCOLOR,
        borderBottomRightRadius: 10,
        borderTopLeftRadius: 10,
        borderRadius: 2
    },
    textbutton: {
        fontWeight: FONT.FONT_BOLD,
        color: COLOR.WHITE,
        fontSize: FONT.FONT_SIZE_14,
        textTransform: KEY.CAPITALIZE
    },
    text: {
        fontSize: FONT.FONT_SIZE_16,
        color: COLOR.BLACK,
        fontWeight: FONT.FONT_BOLD,
    },
});

export default styles;