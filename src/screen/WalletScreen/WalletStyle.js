import { StyleSheet, Dimensions } from 'react-native';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
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
        marginBottom: 5,

    },
    rectangleText: {
        fontSize: FONT.FONT_SIZE_14,
        color: COLOR.GRANITE_GRAY,
        marginTop: 5,
    },
    btnStyle: {
        borderRadius: 5,
        alignItems: KEY.CENTER,
        justifyContent: KEY.CENTER,
        backgroundColor: COLOR.DEFALUTCOLOR,
        width: WIDTH - 60,
        height: 45,
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER,
        marginBottom: 20,
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    imageLogo: {
        height: 150,
        width: 150
    },
    rounfIconStyle: {
        marginTop: 20,
        marginBottom: 10,
        marginLeft: 15,
        height: 50,
        width: 50,
        borderRadius: 100,
        borderColor: COLOR.DEFALUTCOLOR,
        borderWidth: 2,
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER
    },
    inputTextView: {
        borderRadius: 5,
        borderWidth: 1,
        alignItems: KEY.FLEX_START,
        marginBottom: 15,
        width: WIDTH - 60,
        height: 45,
        fontSize: FONT.FONT_SIZE_16,
        paddingLeft: 15,
        color: COLOR.BLACK,
        borderColor: COLOR.PLACEHOLDER_COLOR,
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    transactionView: {
        borderLeftWidth: 80,
        borderLeftColor: COLOR.DEFALUTCOLOR,
        borderRadius: 10,
        backgroundColor: COLOR.WHITE,
        width: WIDTH - 30,
        height: 85,
        alignItems: KEY.CENTER,
        alignSelf: KEY.CENTER,
        flexDirection: KEY.ROW,
        marginTop: HEIGHT * 0.3,
        marginBottom: 15,
        shadowColor: COLOR.BLACK,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 3
    },
});

export default styles;