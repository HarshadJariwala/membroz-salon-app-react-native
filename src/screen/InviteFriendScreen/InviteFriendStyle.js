import { StyleSheet, Dimensions, Platform } from 'react-native';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
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
    viewSquareTwoColumn: {

        height: 180,
        width: WIDTH / 2.2,
        margin: 7,
        borderRadius: 10,
        shadowColor: COLOR.BLACK,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: Platform.OS === KEY.IOS ? 2 : 5,
        alignItems: KEY.FLEX_START,
        backgroundColor: COLOR.WHITE
    },
    descripationText: {
        flex: 1,
        textAlign: KEY.CENTER,
        alignItems: KEY.CENTER,
        justifyContent: KEY.CENTER,
        alignSelf: KEY.CENTER,
        fontSize: FONT.FONT_SIZE_14,
        marginBottom: 10,
        marginTop: 0,
        color: COLOR.LIGHT_BLACK,
        margin: 10,
        paddingVertical: 10
    },
    tagsStyles: {
        textAlign: KEY.CENTER,
        fontSize: 14,
        color: COLOR.LIGHT_BLACK,
        marginBottom: 20,
        marginTop: 10,
        width: WIDTH / 3
    },
    referCodetext: {
        alignSelf: KEY.CENTER,
        fontSize: FONT.FONT_SIZE_18,
        fontWeight: FONT.FONT_BOLD,
        color: COLOR.BLACK,
        textTransform: KEY.UPPERCASE
    },
    referCodeStyle: {
        borderStyle: KEY.DASHED,
        borderColor: COLOR.SKY_COLOR,
        borderWidth: 1,
        borderRadius: 15,
        height: 45,
        width: WIDTH / 2,
        justifyContent: KEY.CENTER,
        alignSelf: KEY.CENTER,
        marginTop: 10,
        backgroundColor: COLOR.SKY_LIGHT_COLOR
    },
    mainbox: {
        marginBottom: 10,
        marginTop: 20,
        width: 150,
        height: 120,
        shadowColor: COLOR.BLACK,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 1.84,
        elevation: Platform.OS === 'ios' ? 2 : 3,
        borderRadius: 10,
        backgroundColor: COLOR.WHITE,

    },
    box1: {
        width: 150,
        height: 35,
        borderRadius: 10,
        backgroundColor: COLOR.DEFALUTCOLOR,
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER

    },
    inputView2: {
        backgroundColor: COLOR.DEFALUTCOLOR,
        borderRadius: 5,
        height: 45,
        width: WIDTH - 30,
        margin: 20,
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER,
        borderBottomRightRadius: 20,
        borderTopLeftRadius: 20,

    },
    Share_button: {
        margin: 10,
        fontSize: FONT.FONT_SIZE_16,
        fontWeight: FONT.FONT_BOLD,
        color: COLOR.WHITE,
    },

});

export default styles;