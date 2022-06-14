import { Dimensions, StyleSheet } from "react-native";
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
    card1: {
        width: WIDTH,
        height: WIDTH / 7,
        //borderWidth: 1,
        flexDirection: KEY.ROW,
        backgroundColor: "#FFFCF7"
    },
    header_text: {
        margin: 15,
        color: COLOR.BLACK,
        fontWeight: FONT.FONT_BOLD,
        fontSize: FONT.FONT_SIZE_20
    },
    arrow_left: {
        color: COLOR.BLACK,
        margin: 10,
    },
    text: {
        fontSize: FONT.FONT_SIZE_20,
        color: COLOR.BLACK,
        fontWeight: FONT.FONT_BOLD,
    },
    cardview: {
        backgroundColor: COLOR.WHITE,
        borderRadius: 10,
        width: WIDTH - 25,
        shadowColor: COLOR.BLACK,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    rounfIconStyle: {
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER,
        borderRadius: 100,
        width: 30,
        height: 30,
        borderColor: COLOR.DEFALUTCOLOR,
        borderWidth: 1,
        marginTop: 5,
        marginLeft: 15
    },
    line: {
        borderBottomColor: COLOR.BRIGHT_GRAY,
        borderBottomWidth: 1,
        marginRight: 15,
        marginLeft: 15,
        width: WIDTH - 60,
    },
    text1: {
        fontSize: FONT.FONT_SIZE_16,
        color: COLOR.BLACK,
        fontWeight: FONT.FONT_BOLD,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10
    },
    checkbox: {
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER,
        borderRadius: 6,
        width: 24,
        height: 24,
        borderColor: COLOR.DEFALUTCOLOR,
        borderWidth: 1,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10
    },
    round: {
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER,
        borderWidth: 1,
        borderRadius: 100,
        width: 25,
        height: 25,
        borderColor: COLOR.DEFALUTCOLOR,
    },
    round1: {
        //borderWidth: 1,
        borderRadius: 100,
        width: 16,
        height: 16,

        backgroundColor: COLOR.DEFALUTCOLOR
    },
    rectangleText: {
        fontSize: FONT.FONT_SIZE_14,
        color: COLOR.BLACK,
        fontWeight: FONT.FONT_BOLD,
        marginLeft: 20

    },
    loginbutton: {
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER,
        backgroundColor: COLOR.DEFALUTCOLOR,
        height: 45,
        width: WIDTH - 25,
        borderBottomRightRadius: 20,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    login_button: {
        fontSize: FONT.FONT_SIZE_18,
        borderRadius: 30,
        fontWeight: FONT.FONT_BOLD,
        color: COLOR.WHITE
    },
    bookButton: {
        borderBottomRightRadius: 20,
        borderTopLeftRadius: 20,
        borderRadius: 5,
        backgroundColor: COLOR.DEFALUTCOLOR,
        width: WIDTH - 30,
        height: 45,
        marginLeft: 15,
        marginRight: 15,
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER,
        marginBottom: 20,
    },
})

export default styles;