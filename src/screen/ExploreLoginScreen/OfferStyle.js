import { StyleSheet, Dimensions, Platform } from 'react-native';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
    containerView: {
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER
    },
    viewSquareTwoColumn: {
        flex: 1,
        width: WIDTH / 2.22,
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
        alignSelf: KEY.CENTER,
        fontSize: FONT.FONT_SIZE_16,
        fontWeight: FONT.FONT_BOLD,
        color: COLOR.BLACK,
        textTransform: KEY.LOWERCASE,
        marginTop: 8
    },
    subtitleText: {
        textAlign: KEY.CENTER,
        fontSize: FONT.FONT_SIZE_14,
        fontWeight: FONT.FONT_NORMAL,
        color: COLOR.BLACK,
        textTransform: KEY.LOWERCASE,
        marginTop: 10
    },
    descripationText: {
        textAlign: KEY.CENTER,
        alignSelf: KEY.CENTER,
        fontSize: FONT.FONT_SIZE_14,
        marginBottom: 10,
        color: COLOR.BLACK,
        width: WIDTH / 3,
        marginTop: -5

    },
    tagsStyles: {
        textAlign: KEY.CENTER,
        fontSize: 14,
        color: COLOR.BLACK,
        marginBottom: 20,
        width: WIDTH / 3
    }

});

export default styles;