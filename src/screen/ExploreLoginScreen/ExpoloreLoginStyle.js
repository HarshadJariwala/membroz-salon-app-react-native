import { StyleSheet, Dimensions } from 'react-native';
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
    ButtonView: {
        borderRadius: 30,
        borderColor: COLOR.DEFALUTCOLOR,
        borderWidth: 2,
        marginBottom: 15,
        backgroundColor: 'rgba(52, 52, 52, 0)',
        width: WIDTH - 30,
        height: 45,
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER
    },
    imageLogo: {
        marginLeft: 100,
        marginRight: 100,
        marginTop: 50,
        marginBottom: -20, //55
        height: 200, //100
        width: 200 //200
    },
    welcomeText: {
        fontSize: 30,
        color: COLOR.WHITE,
        fontWeight: FONT.FONT_BOLD,
        alignSelf: KEY.CENTER,
        marginBottom: 60,
        fontSize: FONT.FONT_SIZE_28
    },
    loginBtn: {
        borderRadius: 30,
        backgroundColor: COLOR.DEFALUTCOLOR,
        width: WIDTH - 30,
        height: 45,
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER,
        marginBottom: 15,
    },
    textExploreStyle: {
        fontWeight: FONT.FONT_BOLD,
        color: COLOR.DEFALUTCOLOR,
        fontSize: FONT.FONT_SIZE_18
    },
});

export default styles;