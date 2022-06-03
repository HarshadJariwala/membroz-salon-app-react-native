import React, { useState } from 'react';
import {
    View,
    Text,
    ImageBackground,
    Image,
    TouchableOpacity,
} from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';
import * as COLOR from '../../styles/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const CustomDrawer = (props) => {
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView
                {...props}
                contentContainerStyle={{ backgroundColor: '#8200d6' }}>
                <ImageBackground
                    source={{ uri: "https://res.cloudinary.com/membroz/image/upload/v1632728295/Membroz%20Mobile%20app%20/background_l4v1dc.jpg" }}
                    style={{ padding: 20 }}>
                    <Image
                        source={{ uri: "https://res.cloudinary.com/membroz/image/upload/v1637309115/Mobile%20Public%20Image/ic_account_mgu7ie.png" }}
                        style={{ height: 80, width: 80, borderRadius: 40, marginBottom: 10 }}
                    />
                    <Text
                        style={{
                            color: COLOR.WHITE,
                            fontSize: 18,
                            marginBottom: 5,
                        }}>
                        John Doe
                    </Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text
                            style={{
                                color: COLOR.WHITE,
                                marginRight: 5,
                            }}>
                            280 Coins
                        </Text>
                        <FontAwesome5 name="coins" size={14} color={COLOR.WHITE} />
                    </View>
                </ImageBackground>
                <View style={{ flex: 1, backgroundColor: COLOR.WHITE, paddingTop: 10 }}>
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>
            <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: '#ccc' }}>
                <TouchableOpacity onPress={() => { }} style={{ paddingVertical: 15 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="share-social-outline" size={22} />
                        <Text
                            style={{
                                fontSize: 15,
                                marginLeft: 5,
                            }}>
                            Tell a Friend
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { }} style={{ paddingVertical: 15 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="exit-outline" size={22} />
                        <Text
                            style={{
                                fontSize: 15,
                                marginLeft: 5,
                            }}>
                            Sign Out
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CustomDrawer;