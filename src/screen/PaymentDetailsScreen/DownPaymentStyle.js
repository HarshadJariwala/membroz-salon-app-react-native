import { Dimensions, StyleSheet } from "react-native";
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
    containerView: {
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER,
        //    marginTop: 15
    },
    headerText: {
        color: COLOR.BLACK,
        fontSize: FONT.FONT_SIZE_20,
        fontWeight: FONT.FONT_BOLD,
        marginTop: 10,
        flex: 1
    },
    radioButton: {
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER,
        width: 80
    },
    viewSquarebig: {
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 10,
        width: WIDTH - 30,
        borderRadius: 10,
        backgroundColor: COLOR.WHITE,
        shadowColor: COLOR.BLACK,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 4,
        flexDirection: KEY.ROW,
        marginTop: 80
    },
    updateBtn: {
        borderRadius: 5,
        backgroundColor: COLOR.DEFALUTCOLOR,
        width: WIDTH - 30,
        height: 45,
        alignItems: KEY.CENTER,
        justifyContent: KEY.CENTER,
        borderBottomRightRadius: 20,
        borderTopLeftRadius: 20,
        bottom: 20,

    },
    rounfIconStyle: {
        marginTop: 20,
        height: 50,
        width: 50,
        borderRadius: 100,
        borderColor: COLOR.DEFALUTCOLOR,
        borderWidth: 2,
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER
    },

});

export default styles;
