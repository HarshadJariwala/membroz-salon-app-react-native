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
    headertext: {
        marginTop: 10,
        alignSelf: KEY.FLEX_START,
        marginLeft: 15,
        fontSize: FONT.FONT_SIZE_18,
        fontWeight: FONT.FONT_BOLD,
        color: COLOR.BLACK,
        textTransform: KEY.CAPITALIZE,
        justifyContent: KEY.FLEX_START,
        alignItems: KEY.FLEX_START
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
        borderBottomRightRadius: 10,
        borderTopLeftRadius: 10,
        backgroundColor: COLOR.DEFALUTCOLOR,
        width: WIDTH / 5,
        height: 30,
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER,
        marginRight: 15
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
    }
});

export default styles;