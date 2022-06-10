import { StyleSheet, Dimensions } from 'react-native';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
    viweRound: {
        height: 100,
        width: 100,
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
        fontWeight: FONT.FONT_WEIGHT_BOLD,
        color: COLOR.BLACK,
        textTransform: KEY.CAPITALIZE,
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER
    },
    viewMain: {
        backgroundColor: COLOR.BACKGROUNDCOLOR,
        alignItems: KEY.CENTER,
        justifyContent: KEY.CENTER,
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
        marginBottom: 5
    },
    rectangleText: {
        fontSize: FONT.FONT_SIZE_14,
        color: COLOR.GRANITE_GRAY,
        marginTop: 5,
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
    btnStyle: {
        borderRadius: 5,
        backgroundColor: COLOR.DEFALUTCOLOR,
        width: WIDTH / 5,
        height: 30,
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER,
        marginRight: 10,
        borderBottomRightRadius: 10,
        borderTopLeftRadius: 10,
    },
    scanBtnStyle: {
        flexDirection: KEY.ROW,
        height: 40,
        width: 200,
        backgroundColor: COLOR.DEFALUTCOLOR,
        borderRadius: 100,
        alignItems: KEY.CENTER,
        justifyContent: KEY.CENTER,
        position: KEY.ABSOLUTE, bottom: 20,
        elevation: 2,
        alignSelf: KEY.CENTER
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
        fontSize: FONT.FONT_SIZE_14
    },
    text: {
        fontSize: FONT.FONT_SIZE_16,
        color: COLOR.BLACK,
        fontWeight: FONT.FONT_BOLD,
    },
    transactionView: {
        borderRadius: 10,
        backgroundColor: COLOR.WHITE,
        height: 70,
        width: WIDTH - 30,
        marginLeft: 15,
        marginRight: 15,
        flexDirection: KEY.ROW,
        marginBottom: 10,
        shadowColor: COLOR.BLACK,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        marginTop: 5,
        elevation: 3
    },
    modal: {
        width: WIDTH - 30,
        borderRadius: 20,
        alignSelf: KEY.CENTER,
        alignItems: KEY.CENTER,
        justifyContent: KEY.CENTER,
        backgroundColor: COLOR.WHITE,
        marginTop: "50%",
    },
    modelcircle: {
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER,
        width: 50,
        height: 50,
        borderRadius: 100,
        borderColor: COLOR.RED,
        borderWidth: 2,
        marginTop: 20
    },
    modeltext: {
        fontWeight: FONT.FONT_BOLD,
        alignSelf: KEY.CENTER
    },
    modelbutton: {
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER,
        height: 45,
        width: 150,
        marginRight: 10,
        marginLeft: 10,
        borderBottomRightRadius: 20,
        borderTopLeftRadius: 20
    },
    model_button: {
        fontSize: FONT.FONT_SIZE_18,
        fontWeight: FONT.FONT_BOLD,
        color: COLOR.WHITE
    }
});

export default styles;