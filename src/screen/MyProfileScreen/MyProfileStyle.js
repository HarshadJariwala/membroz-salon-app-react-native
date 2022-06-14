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
        fontWeight: FONT.FONT_BOLD,
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
        marginTop: 20,
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
    btnStyle: {
        borderRadius: 30,
        backgroundColor: COLOR.DEFALUTCOLOR,
        width: WIDTH / 5,
        height: 35,
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER,
        marginRight: 10
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
    viewCard: {
        marginLeft: 15,
        marginRight: 15,
        flexDirection: KEY.ROW,
        height: 50,
        width: WIDTH - 30,
        shadowColor: COLOR.BLACK,
        alignItems: KEY.CENTER,
        justifyContent: KEY.CENTER,
    },
    roundProfileStyle: {
        marginTop: -30,
        marginLeft: 55,
        height: 35,
        width: 35,
        borderRadius: 100,
        borderColor: COLOR.DEFALUTCOLOR,
        backgroundColor: COLOR.DEFALUTCOLOR,
        borderWidth: 2,
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER
    },
    msgModalView: {
        marginTop: HEIGHT / 2.5,
        height: 200,
        width: WIDTH,
        borderRadius: 0,
        backgroundColor: COLOR.SPLASHMODELCOLOR,
        alignItems: KEY.FLEX_START,
        shadowColor: COLOR.BLACK,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    }
});

export default styles;