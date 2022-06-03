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
        borderLeftWidth: 80,
        borderLeftColor: COLOR.DEFALUTCOLOR,
        borderRadius: 10,
        backgroundColor: COLOR.WHITE,
        width: WIDTH - 30,
        height: 85,
        alignItems: KEY.CENTER,
        alignSelf: KEY.CENTER,
        flexDirection: KEY.ROW,
        marginTop: HEIGHT / 3,
        marginBottom: 5,
        shadowColor: COLOR.BLACK,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 3
    },
    viewSquareTwoColumn: {
        //flex: 1,
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
    titleText: {
        textAlign: KEY.CENTER,
        alignItems: KEY.CENTER,
        justifyContent: KEY.CENTER,
        alignSelf: KEY.CENTER,
        fontSize: FONT.FONT_SIZE_16,
        fontWeight: FONT.FONT_WEIGHT_BOLD,
        color: COLOR.BLACK,
        textTransform: KEY.CAPITALIZE,
        marginTop: 10
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
    rewardpointtext: {
        alignSelf: KEY.CENTER,
        fontSize: FONT.FONT_SIZE_16,
        fontWeight: FONT.FONT_WEIGHT_BOLD,
        color: COLOR.BLACK,
        textTransform: KEY.CAPITALIZE
    },
    rewardpointStyle: {
        borderStyle: KEY.DASHED,
        borderColor: COLOR.SKY_COLOR,
        borderWidth: 1,
        borderRadius: 100,
        height: 40,
        width: WIDTH * 0.3,
        justifyContent: KEY.CENTER,
        alignSelf: KEY.CENTER,
        marginBottom: 10,
        backgroundColor: COLOR.SKY_LIGHT_COLOR
    }
});

export default styles;