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
    titleText: {
        flex: 1,
        textAlign: KEY.CENTER,
        alignItems: KEY.CENTER,
        justifyContent: KEY.CENTER,
        alignSelf: KEY.CENTER,
        fontSize: FONT.FONT_SIZE_16,
        fontWeight: FONT.FONT_WEIGHT_BOLD,
        color: COLOR.BLACK,
        textTransform: KEY.CAPITALIZE
    },
    cardView: {
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 5,
        flexDirection: KEY.COLUMN,
        backgroundColor: COLOR.WHITE,
        shadowColor: COLOR.BLACK,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 3,
        width: WIDTH - 20,
    },
    cardImage: {
        alignItems: KEY.CENTER,
        height: 160,
        width: WIDTH,
        borderRadius: 10,
        resizeMode: KEY.COVER,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    }
});

export default styles;