import { StyleSheet, Dimensions } from "react-native";
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER,
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
    listTab: {
        marginTop: 0,
        borderRadius: 100,
        flexDirection: KEY.ROW
    },
    btnTab: {
        flexDirection: KEY.ROW,
        width: "50%",
        padding: 10,
        justifyContent: KEY.CENTER,
        borderBottomColor: COLOR.BLACK,
        borderBottomWidth: 2
    },
    tabText: {
        fontSize: FONT.FONT_SIZE_18,
        fontWeight: FONT.FONT_BOLD,
        textTransform: KEY.CAPITALIZE,
        color: COLOR.LIGHT_BLACK
    },
    tabTextActive: {
        fontSize: FONT.FONT_SIZE_18,
        fontWeight: FONT.FONT_BOLD,
        textTransform: KEY.CAPITALIZE,
        color: COLOR.DEFALUTCOLOR
    },
    tabActive: {
        width: "50%",
        borderBottomColor: COLOR.DEFALUTCOLOR,
        borderBottomWidth: 2
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
})

export default styles;