import { Dimensions, StyleSheet } from "react-native";
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
    bookButton: {
        borderBottomRightRadius: 20,
        borderTopLeftRadius: 20,
        borderRadius: 5,
        backgroundColor: COLOR.DEFALUTCOLOR,
        width: WIDTH - 30,
        height: 45,
        marginLeft: 15,
        marginRight: 15,
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER,
        marginBottom: 20,
    },
});

export default styles;