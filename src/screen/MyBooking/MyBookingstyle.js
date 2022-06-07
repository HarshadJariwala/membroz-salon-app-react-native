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
        height: WIDTH / 4,
        borderRadius: 10,
        shadowColor: COLOR.BLACK,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
        marginTop: 10,
        flexDirection: KEY.ROW
    },
    img: {
        width: WIDTH / 4,
        height: WIDTH / 4,
        borderRadius: 10
    },
    upgrade: {
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER,
        width: 90,
        height: WIDTH / 14,
        backgroundColor: COLOR.DEFAULTLIGHT,
        borderBottomRightRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 1,
        borderTopRightRadius: 1,
    },
    textbutton: {
        fontWeight: FONT.FONT_WEIGHT_BOLD,
        color: COLOR.WHITE,
    },
    text: {
        fontSize: FONT.FONT_SIZE_16,
        color: COLOR.BLACK,
        fontWeight: FONT.FONT_WEIGHT_BOLD
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
})

export default styles;