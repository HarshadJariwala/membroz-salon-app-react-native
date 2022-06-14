import { StyleSheet, Dimensions } from 'react-native';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
    containerView: {
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER,
    },
    forgotButton: {
        borderRadius: 5,
        //borderWidth: 1,
        backgroundColor: COLOR.DEFALUTCOLOR,
        width: WIDTH - 50,
        height: 45,
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER,
        marginBottom: 20,
        borderBottomRightRadius: 20,
        borderTopLeftRadius: 20
    },
    inputTextView: {
        borderRadius: 5,
        borderWidth: 1,
        alignItems: KEY.FLEX_START,
        marginBottom: 20,
        width: WIDTH - 50,
        height: 45,
        fontSize: FONT.FONT_SIZE_16,
        paddingLeft: 15,
        color: COLOR.BLACK,
        borderColor: COLOR.PLACEHOLDER_COLOR,
        borderBottomRightRadius: 20,
        borderTopLeftRadius: 20
    },
    inputTextViewError: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: COLOR.ERRORCOLOR,
        alignItems: KEY.FLEX_START,
        marginBottom: 20,
        width: WIDTH - 50,
        height: 45,
        fontSize: FONT.FONT_SIZE_16,
        paddingLeft: 15,
        color: COLOR.BLACK,
        borderColor: COLOR.PLACEHOLDER_COLOR,
        borderBottomRightRadius: 20,
        borderTopLeftRadius: 20
    },
    viewRound: {
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
    cardView: {
        width: WIDTH - 20,
        marginTop: 30,
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
    }
});

export default styles;