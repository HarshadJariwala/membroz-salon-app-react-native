import { StyleSheet, Dimensions } from 'react-native';
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
        fontWeight: FONT.FONT_WEIGHT_BOLD,
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
    }
});

export default styles;