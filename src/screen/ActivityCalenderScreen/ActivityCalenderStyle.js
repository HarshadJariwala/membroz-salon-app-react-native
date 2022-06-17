import { Dimensions, StyleSheet } from "react-native";
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
    innercardview: {
        width: WIDTH - 30,
        borderRadius: 15,
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 5,
        flexDirection: KEY.ROW,
        backgroundColor: COLOR.WHITE,
        shadowColor: COLOR.BLACK,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 3,
    },
    MainView: {
        backgroundColor: COLOR.WHITE,
        borderRadius: 15,
        marginRight: 15,
        marginLeft: 15,
        shadowColor: COLOR.BLACK,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2.62,
        elevation: 3
    },
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
        fontSize: FONT.FONT_SIZE_16,
        fontWeight: FONT.FONT_BOLD,
        textTransform: KEY.CAPITALIZE,
        color: COLOR.BLACK,
        marginLeft: 20,
        marginRight: 20
    },
    activeTextStyle: {
        fontSize: FONT.FONT_SIZE_16,
        fontWeight: FONT.FONT_BOLD,
        textTransform: KEY.CAPITALIZE,
        color: COLOR.WHITE,
        marginLeft: 20,
        marginRight: 20
    },
    cardView: {
        width: WIDTH - 30,
        borderRadius: 15,
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 5,
        flexDirection: KEY.ROW,
        backgroundColor: COLOR.WHITE,
        shadowColor: COLOR.BLACK,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 3,
    },
    filledBox: {
        width: 70,
        borderRadius: 10,
        backgroundColor: COLOR.DEFALUTCOLOR,
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER,
        flexDirection: KEY.COLUMN,
        padding: 5
    },
});

export default styles;