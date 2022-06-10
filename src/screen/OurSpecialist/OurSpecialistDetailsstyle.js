import { Dimensions, StyleSheet } from "react-native";
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
    containerView: {
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER,
    },
    centerView: {
        alignItems: KEY.CENTER,
        justifyContent: KEY.CENTER
    },
    viewRound: {
        height: 80,
        width: 80,
        borderRadius: 100,
        borderColor: COLOR.DEFALUTCOLOR,
        borderWidth: 3,
        backgroundColor: COLOR.WELDON_BLUE,
        marginLeft: 10,
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER
    },
    text: {
        marginTop: 10,
        fontSize: FONT.FONT_SIZE_18,
        fontWeight: FONT.FONT_BOLD,
        color: COLOR.BLACK,
        textTransform: KEY.CAPITALIZE,
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER
    },
    text1: {
        marginTop: 3,
        fontSize: FONT.FONT_SIZE_16,
        color: COLOR.BLACK,
        textTransform: KEY.CAPITALIZE,
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER
    },
    cardtext: {
        fontSize: FONT.FONT_SIZE_16,
        color: COLOR.GRANITE_GRAY,
        marginLeft: 20,
        width: WIDTH - 60,
        marginTop: -10
    },
    tagsStyles: {
        textAlign: KEY.LEFT,
        fontSize: FONT.FONT_SIZE_16,
        color: COLOR.BLACK,
        width: WIDTH - 60,
    },
    cardView: {
        width: WIDTH - 30,
        marginTop: 30,
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
        marginBottom: 5
    },
    viewRectangle: {
        width: WIDTH - 30,
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
        alignItems: KEY.CENTER,
        marginBottom: 10
    },
    rectangleText: {
        fontSize: FONT.FONT_SIZE_14,
        color: COLOR.GRANITE_GRAY,
        marginTop: 5,
        textTransform: KEY.CAPITALIZE
    },
    rectangleRound: {
        marginRight: 20,
        marginTop: 0,
        alignItems: KEY.CENTER,
        justifyContent: KEY.CENTER
    },
    rounfIconStyle: {
        marginTop: 10,
        marginLeft: 15,
        height: 35,
        width: 35,
        borderRadius: 100,
        borderColor: COLOR.DEFALUTCOLOR,
        borderWidth: 2,
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER
    },
});

export default styles;