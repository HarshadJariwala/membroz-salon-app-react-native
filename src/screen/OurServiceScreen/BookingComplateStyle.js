import { Dimensions, StyleSheet } from "react-native";
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
    cardview: {
        width: WIDTH - 30,
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
        marginLeft: 10,
        marginRight: 10

    },
    rounfIconStyle: {
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER,
        borderRadius: 100,
        width: 50,
        height: 50,
        borderColor: COLOR.LIGHT_GREEN,
        borderWidth: 2,
        marginTop: 15,
    },
    text: {
        fontSize: FONT.FONT_SIZE_18,
        color: COLOR.BLACK,
        fontWeight: FONT.FONT_BOLD,
        marginTop: 15,
        marginLeft: 15,
        marginBottom: 10
    },
    rounfIconStyle1: {
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER,
        borderRadius: 100,
        width: 30,
        height: 30,
        borderColor: COLOR.DEFALUTCOLOR,
        borderWidth: 1,
        marginTop: 10,
        marginLeft: 15
    },
    line: {
        borderBottomWidth: 1,
        borderBottomColor: COLOR.BRIGHT_GRAY,
        marginRight: 15,
        marginLeft: 15,
        width: WIDTH - 60,
        marginTop: 8,
    },
    text1: {
        fontSize: FONT.FONT_SIZE_16,
        color: COLOR.BLACK,
        fontWeight: FONT.FONT_BOLD,
        marginTop: 10,
        marginLeft: 10,
        marginBottom: 5,
        marginRight: 10
    },
    text2: {
        fontSize: FONT.FONT_SIZE_16,
        color: COLOR.BLACK,
        fontWeight: FONT.FONT_BOLD,
        marginTop: 10,
        marginLeft: 10,
        marginBottom: 5,
        marginRight: 10
    },
    loginbutton: {
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER,
        backgroundColor: COLOR.DEFALUTCOLOR,
        height: 45,
        width: WIDTH - 30,
        marginTop: 10,
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