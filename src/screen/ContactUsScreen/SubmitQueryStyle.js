import { StyleSheet, Dimensions } from 'react-native';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
    mainContainer: {
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER
    },
    mainCard: {
        flex: 1,
        width: WIDTH - 20,
        shadowColor: COLOR.BLACK,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 1.84,
        elevation: Platform.OS === 'ios' ? 2 : 3,
        borderRadius: 10,
        flexDirection: KEY.COLUMN,
        backgroundColor: COLOR.WHITE,
        marginTop: 10,
        marginBottom: 10
    },
    inputTextView1: {
        borderRadius: 5,
        borderWidth: 2,
        borderColor: COLOR.BRIGHT_GRAY,
        //alignItems: KEY.FLEX_START,
        marginBottom: 5,
        width: WIDTH - 60,
        height: 45,
        color: COLOR.GRANITE_GRAY,
        fontSize: FONT.FONT_SIZE_16,
        paddingLeft: 15,
        backgroundColor: COLOR.WHITE,
        borderBottomRightRadius: 20,
        borderTopLeftRadius: 20

    },
    inputTextViewError1: {
        borderRadius: 5,
        borderWidth: 2,
        borderColor: COLOR.ERRORCOLOR,
        //alignItems: KEY.FLEX_START,
        marginBottom: 5,
        width: WIDTH - 60,
        height: 45,
        color: COLOR.GRANITE_GRAY,
        fontSize: FONT.FONT_SIZE_16,
        paddingLeft: 15,
        backgroundColor: COLOR.WHITE,
        borderBottomRightRadius: 20,
        borderTopLeftRadius: 20
    },
    line: {
        borderBottomColor: COLOR.GRAY,
        borderBottomWidth: 1,
        backgroundColor: COLOR.GRAY,
        marginBottom: 10,
        width: WIDTH - 60,
    },
    headertext: {
        color: COLOR.BLACK,
        fontWeight: FONT.FONT_BOLD,
        fontSize: FONT.FONT_SIZE_18
    },
    submitquery: {
        marginTop: 10,
        borderRadius: 5,
        borderBottomRightRadius: 20,
        borderTopLeftRadius: 20,
        backgroundColor: COLOR.DEFALUTCOLOR,
        width: WIDTH - 60,
        height: 45,
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER
    },
    msgModalView: {
        marginTop: HEIGHT,
        height: 200,
        width: WIDTH,
        borderRadius: 0,
        backgroundColor: COLOR.SPLASHMODELCOLOR,
        alignItems: KEY.FLEX_START,
        shadowColor: COLOR.BLACK,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    }
});

export default styles;