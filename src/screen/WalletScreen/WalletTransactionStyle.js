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
        marginTop: 0,
        alignItems: KEY.CENTER,
        justifyContent: KEY.CENTER,
        borderRadius: 100,
        backgroundColor: COLOR.DEFALUTCOLOR,
        width: WIDTH - 60,
        height: 45,
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER,
        marginBottom: 20
    },
    imageLogo: {
        height: 150,
        width: 150
    },
    rounfIconStyle: {
        marginTop: 30,
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
        borderRadius: 30,
        borderWidth: 1,
        alignItems: KEY.FLEX_START,
        marginBottom: 15,
        width: WIDTH - 60,
        height: 45,
        fontSize: FONT.FONT_SIZE_16,
        paddingLeft: 15,
        color: COLOR.BLACK,
        borderColor: COLOR.PLACEHOLDER_COLOR
    },
    transactionView: {
        //borderLeftWidth: 80,
        //borderLeftColor: COLOR.DEFALUTCOLOR,
        borderRadius: 10,
        backgroundColor: COLOR.WHITE,
        height: 70,
        width: WIDTH - 30,
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
    activeTabStyle: {
        width: 80,
        height: 25,
        marginTop: 10,
        borderRadius: 100,
        marginBottom: 5,
        backgroundColor: COLOR.DEFALUTCOLOR,
        shadowColor: COLOR.BLACK,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        alignItems: KEY.CENTER,
        justifyContent: KEY.CENTER,
        margin: 10
    },
    deactiveTabStyle: {
        width: 80,
        height: 25,
        marginTop: 10,
        borderRadius: 100,
        marginBottom: 5,
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
        justifyContent: KEY.CENTER,
        margin: 10
    },
    listTab: {
        marginTop: 0,
        borderRadius: 100,
        flexDirection: KEY.ROW
    },
    activeTextStyle: {
        fontSize: FONT.FONT_SIZE_14,
        color: COLOR.BLACK,
        fontWeight: FONT.FONT_BOLD,
        color: COLOR.WHITE,
        // marginLeft: 10,
        // marginRight: 10
    },
    deactiveTextStyle: {
        fontSize: FONT.FONT_SIZE_14,
        color: COLOR.BLACK,
        fontWeight: FONT.FONT_BOLD,
        color: COLOR.BLACK,
        // marginLeft: 10,
        // marginRight: 10
    }
});

export default styles;