import { StyleSheet, Dimensions } from 'react-native';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
    MainView: {
        backgroundColor: COLOR.WHITE,
        width: WIDTH - 30,
        borderWidth: 1,
        borderColor: COLOR.BLACK,
        borderRadius: 20
    },
    wapper: {},
    image: {
        borderRadius: 20,
        width: WIDTH - 30,
        height: 180
    },
    dotImage: {
        width: 70,
        height: 70,
        borderRadius: 100,
    },
    dotImage1: {
        width: 100,
        height: 100,
        borderRadius: 15,
    },
    noimagestyle: {
        width: 100,
        height: 100,
        borderRadius: 15,
        borderColor: COLOR.BLACK,
        borderWidth: 1,
        tintColor: COLOR.TAUPE_GRAY
    }
});

export default styles;