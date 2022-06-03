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
        //height: 150,
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
        flex: 1,
        textAlign: KEY.CENTER,
        alignItems: KEY.CENTER,
        justifyContent: KEY.CENTER,
        alignSelf: KEY.CENTER,
        fontSize: FONT.FONT_SIZE_16,
        fontWeight: FONT.FONT_WEIGHT_BOLD,
        color: COLOR.BLACK,
        textTransform: KEY.CAPITALIZE,
        marginTop: -10
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
        //flex: 1,
        textAlign: KEY.CENTER,
        fontSize: 14,
        color: COLOR.LIGHT_BLACK,
        marginBottom: 20,
        marginTop: 10,
        width: WIDTH / 3
    }

});

export default styles;