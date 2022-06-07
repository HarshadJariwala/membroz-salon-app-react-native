import { StyleSheet, Dimensions } from 'react-native';
import * as KEY from '../../context/actions/key';
import * as COLOR from '../../styles/colors';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
    notificationview: {
        flex: 1,
        width: WIDTH - 30,
        height: 90,
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
        flexDirection: KEY.COLUMN,

    },
    rounfIconStyle: {
        //marginTop: 10,
        height: 35,
        width: 35,
        borderRadius: 100,
        borderColor: COLOR.DEFALUTCOLOR,
        borderWidth: 1,
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER
    },
})

export default styles;