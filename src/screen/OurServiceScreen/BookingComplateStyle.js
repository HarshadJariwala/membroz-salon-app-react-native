import { Dimensions, StyleSheet } from "react-native";
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
    cardview: {
        backgroundColor: COLOR.WHITE,
        borderRadius: 10,
        width: WIDTH - 30,
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
        width: 50,
        height: 50,
        borderColor: COLOR.DEFALUTCOLOR,
        borderWidth: 2,
        margin: 10
    },
    text: {
        fontSize: FONT.FONT_SIZE_18,
        color: COLOR.BLACK,
        fontWeight: FONT.FONT_BOLD,
        marginTop: 10,
        marginLeft: 5,
        marginBottom: 10
    },
    rounfIconStyle1: {
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER,
        borderRadius: 100,
        width: 30,
        height: 30,
        borderColor: COLOR.DEFALUTCOLOR,
        borderWidth: 2,
        marginTop: 10,
        marginLeft: 10
    },
    line: {
        borderBottomWidth: 1,
        borderBottomColor: COLOR.BRIGHT_GRAY,
        marginRight: 15,
        marginLeft: 15,
        width: WIDTH - 60,
        marginTop: 10
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