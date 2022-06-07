import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import FORGETPASSWORDSCREEN from '../screen/ForgetPasswordScreen/ForgetPasswordScreen';
import PAYMENTDETAILSSCREEN from '../screen/PaymentDetailsScreen/PaymentDetailsScreen';
import EXPOLORELOGINSCREEN from '../screen/ExploreLoginScreen/ExpoloreLoginScreen';
import PASSWORDCHANGESCREEN from '../screen/MyProfileScreen/PasswordChangeScreen';
import NEWPASSWORDSCREEN from '../screen/ForgetPasswordScreen/NewPasswordScreen';
import NOTIFICATIONSCREEN from '../screen/NotificationScreen/NotificationScreen';
import DOWNPAYMENTSCREEN from '../screen/PaymentDetailsScreen/DownPaymentScreen';
import UPDATEPROFILESCREEN from '../screen/MyProfileScreen/UpdateProfileScreen';
import TRAINERDETAILSCREEN from '../screen/TrainerScreen/TrainerDetailScreen';
import MYPROFILESCREEN from '../screen/MyProfileScreen/MyProfileScreen';
import EXPLORESCREEN from '../screen/ExploreLoginScreen/ExploreScreen';
import REGISTERSCREEN from '../screen/RegisterScreen/RegisterScreen';
import OFFERSCREEN from '../screen/ExploreLoginScreen/OfferScreen';
import TRAINERSCREEN from '../screen/TrainerScreen/TrainerScreen';
import SPLASHSCREEN from '../screen/SplashScreen/SplashScreen';
import LOGINSCREEN from '../screen/LoginScreen/LoginScreen';
import HOMESCREEN from '../screen/HomeScreen/HomeScreen';
import MEMBERSHIPSCREEN from '../screen/MemberShipScreen/MemberShipScreen';
import CONTACTUSSCREEN from '../screen/ContactUsScreen/ContactUsScreen';
import WALLETSCREEN from '../screen/WalletScreen/WalletScreen';
import WALLETTRANSACTION from '../screen/WalletScreen/WalletTransaction';
import REWARDPOINTTRANSACTION from '../screen/RewardpointScreen/RewardPointTransaction';
import REWARDPOINTSCREEN from '../screen/RewardpointScreen/RewardPointScreen';
import INVITEFRIENDSCREEN from '../screen/InviteFriendScreen/InviteFriendScreen';
import SUBMITQUERY from '../screen/ContactUsScreen/SubmitQuery';
import ACTIVITYCALENDERSCREEN from '../screen/ActivityCalenderScreen/ActivityCalenderScreen';

import { NotificationService } from '../services/NotificationService/NotificationService';
import { MemberLanguage } from '../services/LocalService/LanguageService';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import * as LocalService from '../services/LocalService/LocalService';
import CustomDrawer from '../components/CustomDrawer/CustomDrawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import languageConfig from '../languages/languageConfig';
import {
    Image, Button, Platform,
    TouchableOpacity, View, Text
} from 'react-native';
import * as KEY from '../context/actions/key';
import * as FONT from '../styles/typography';
import * as COLOR from '../styles/colors';
import * as IMAGE from '../styles/image';
import * as SCREEN from '../context/screen/screenName';
import { firebase } from '@react-native-firebase/crashlytics';
import AsyncStorage from '@react-native-community/async-storage';
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

//Structure for the navigatin Drawer
const NavigationDrawerStructureLeft = (props) => {
    const toggleDrawer = () => {
        //Props to open/close the drawer
        props.navigationProps.toggleDrawer();
    };
    return (
        <View style={{ flexDirection: KEY.ROW }}>
            <TouchableOpacity onPress={() => toggleDrawer()}>
                {/*Donute Button Image */}
                <Image
                    source={IMAGE.MENUICON}
                    style={{
                        width: 27,
                        height: 18,
                        marginLeft: 10,
                        tintColor: COLOR.BLACK
                    }}
                />
            </TouchableOpacity>
        </View>
    );
}

//Structure for the navigatin Drawer
const NavigationDrawerStructureRight = (props) => {
    const [userID, setUserID] = useState(null);
    const [notification, setNotification] = useState(0);

    useEffect(() => {
        AsyncStorage.getItem(KEY.AUTHUSER).then((res) => {
            let userid = JSON.parse(res)._id;
            setUserID(userid);
            getNotification(userid);
        });
    }, [])

    useEffect(() => {
    }, [userID, notification])

    //get notification function
    const getNotification = async (id) => {
        try {
            const response = await NotificationService(id);
            console.log(`response getNotification`, response.data);
            setNotification(response.data.length)
        } catch (error) {
            firebase.crashlytics().recordError(error);
        }
    }

    return (
        <TouchableOpacity
            onPress={() => props.navigationProps.navigate(SCREEN.NOTIFICATIONSCREEN)}
            style={{ justifyContent: KEY.FLEX_END, alignItems: KEY.FLEX_END, marginRight: 25, marginTop: 10 }}>
            <Ionicons name="notifications-outline" size={25} color={COLOR.BLACK} style={{ marginTop: -30 }} />
            <View style={{
                marginRight: -10, marginTop: -35, height: 22, width: 22,
                borderRadius: 100, justifyContent: KEY.CENTER, alignItems: KEY.CENTER, backgroundColor: COLOR.DEFALUTCOLOR
            }}>
                <Text style={{ fontWeight: FONT.FONT_BOLD, fontSize: 12, color: COLOR.WHITE }}>{notification}</Text>
            </View>
        </TouchableOpacity>
    );
}

const AuthStackScreen = () => {
    return (
        <Stack.Navigator initialRouteName="LoginScreen" screenOptions={{ headerShadowVisible: false }}>
            <Stack.Screen
                name="LoginScreen"
                component={LOGINSCREEN}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ExploreScreen"
                component={EXPLORESCREEN}
                options={{
                    headerTitleAlign: KEY.CENTER,
                    title: languageConfig.exploresurge,
                    headerTintColor: Platform.OS == 'android' ? COLOR.BLACK : COLOR.DEFALUTCOLOR,
                    headerTransparent: true
                }}
            />
            <Stack.Screen
                name="ExpoloreLoginScreen"
                component={EXPOLORELOGINSCREEN}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="OfferScreen"
                component={OFFERSCREEN}
                options={{
                    headerTitleAlign: KEY.CENTER,
                    title: languageConfig.offer,
                    headerTintColor: Platform.OS == 'android' ? COLOR.BLACK : COLOR.DEFALUTCOLOR,
                    headerTransparent: true
                }}
            />
            <Stack.Screen
                name="RegisterScreen"
                component={REGISTERSCREEN}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="ForgetPasswordScreen" component={FORGETPASSWORDSCREEN} options={{
                headerTitleAlign: KEY.CENTER,
                title: languageConfig.forgotpassword,
                headerTintColor: Platform.OS == 'android' ? COLOR.WHITE : COLOR.DEFALUTCOLOR,
                headerTransparent: true
            }} />
            <Stack.Screen name="NewPasswordScreen" component={NEWPASSWORDSCREEN} options={{
                headerTitleAlign: KEY.CENTER,
                title: languageConfig.forgotpassword,
                headerTintColor: Platform.OS == 'android' ? COLOR.WHITE : COLOR.DEFALUTCOLOR,
                headerTransparent: true
            }} />
        </Stack.Navigator>
    );
}

const HomeStackScreen = ({ navigation }) => {
    return (
        <Stack.Navigator initialRouteName='HomeScreen'
            screenOptions={{ headerShadowVisible: false }}>
            <Stack.Screen
                name="HomeScreen"
                component={HOMESCREEN}
                options={{
                    title: 'Home', //Set Header Title
                    headerLeft: () =>
                        <NavigationDrawerStructureLeft
                            navigationProps={navigation}
                        />,
                    headerRight: () => <NavigationDrawerStructureRight navigationProps={navigation} />,
                    headerStyle: {
                        backgroundColor: COLOR.BACKGROUNDCOLOR, //Set Header color
                    },
                    headerTintColor: COLOR.BLACK, //Set Header text color
                    headerTitleAlign: KEY.CENTER,
                    headerTitleStyle: {
                        fontWeight: FONT.FONT_WEIGHT_MEDIAM, //Set Header text style
                    }
                }}
            />
        </Stack.Navigator>
    )
}

const MyProfileStackScreen = ({ navigation }) => {
    return (
        <Stack.Navigator initialRouteName='MyProfileScreen'
            screenOptions={{ headerShadowVisible: false }} >
            <Stack.Screen
                name="MyProfileScreen"
                component={MYPROFILESCREEN}
                options={{
                    title: 'Profile', //Set Header Title
                    headerLeft: () =>
                        <NavigationDrawerStructureLeft
                            navigationProps={navigation}
                        />,
                    headerRight: () => <NavigationDrawerStructureRight navigationProps={navigation} />,
                    headerStyle: {
                        backgroundColor: COLOR.BACKGROUNDCOLOR, //Set Header color
                    },
                    headerTintColor: COLOR.BLACK, //Set Header text color
                    headerTitleAlign: KEY.CENTER,
                    headerTitleStyle: {
                        fontWeight: FONT.FONT_WEIGHT_MEDIAM, //Set Header text style
                    }
                }}
            />

            <Stack.Screen
                name="UpdateProfileScreen"
                component={UPDATEPROFILESCREEN}
                options={{
                    title: 'Edit Profile', //Set Header Title
                    headerStyle: {
                        backgroundColor: COLOR.BACKGROUNDCOLOR, //Set Header color
                    },
                    headerTintColor: COLOR.BLACK, //Set Header text color
                    headerTitleAlign: KEY.CENTER,
                    headerTitleStyle: {
                        fontWeight: FONT.FONT_WEIGHT_MEDIAM, //Set Header text style
                    }
                }}
            />

            <Stack.Screen
                name="PasswordChangeScreen"
                component={PASSWORDCHANGESCREEN}
                options={{
                    title: 'Change Password', //Set Header Title
                    headerStyle: {
                        backgroundColor: COLOR.BACKGROUNDCOLOR, //Set Header color
                    },
                    headerTintColor: COLOR.BLACK, //Set Header text color
                    headerTitleAlign: KEY.CENTER,
                    headerTitleStyle: {
                        fontWeight: FONT.FONT_WEIGHT_MEDIAM, //Set Header text style
                    }
                }}
            />
        </Stack.Navigator>
    )
}

const PaymentStackScreen = ({ navigation }) => {
    return (
        <Stack.Navigator initialRouteName='PaymentDetailsScreen'
            screenOptions={{ headerShadowVisible: false }}>
            <Stack.Screen
                name="Payment"
                component={PAYMENTDETAILSSCREEN}
                options={{
                    title: 'Payment', //Set Header Title
                    headerLeft: () =>
                        <NavigationDrawerStructureLeft
                            navigationProps={navigation}
                        />,
                    headerRight: () => <NavigationDrawerStructureRight navigationProps={navigation} />,
                    headerStyle: {
                        backgroundColor: COLOR.BACKGROUNDCOLOR, //Set Header color
                    },
                    headerTintColor: COLOR.BLACK, //Set Header text color
                    headerTitleAlign: KEY.CENTER,
                    headerTitleStyle: {
                        fontWeight: FONT.FONT_WEIGHT_MEDIAM, //Set Header text style
                    }
                }}
            />

            <Stack.Screen
                name="DownPaymentScreen"
                component={DOWNPAYMENTSCREEN}
                options={{
                    title: 'Payment', //Set Header Title
                    headerStyle: {
                        backgroundColor: COLOR.BACKGROUNDCOLOR, //Set Header color
                    },
                    headerTintColor: COLOR.BLACK, //Set Header text color
                    headerTitleAlign: KEY.CENTER,
                    headerTitleStyle: {
                        fontWeight: FONT.FONT_WEIGHT_MEDIAM, //Set Header text style
                    }
                }}
            />
        </Stack.Navigator>
    )
}

const TrainerStackScreen = ({ navigation }) => {
    return (
        <Stack.Navigator initialRouteName='TrainerScreen'
            screenOptions={{ headerShadowVisible: false }}>
            <Stack.Screen
                name="TrainerScreen"
                component={TRAINERSCREEN}
                options={{
                    title: 'Trainers', //Set Header Title
                    headerLeft: () =>
                        <NavigationDrawerStructureLeft
                            navigationProps={navigation}
                        />,
                    headerStyle: {
                        backgroundColor: COLOR.BACKGROUNDCOLOR, //Set Header color
                    },
                    headerTintColor: COLOR.BLACK, //Set Header text color
                    headerTitleAlign: KEY.CENTER,
                    headerTitleStyle: {
                        fontWeight: FONT.FONT_WEIGHT_MEDIAM, //Set Header text style
                    }
                }}
            />

            <Stack.Screen
                name="TrainerDetailScreen"
                component={TRAINERDETAILSCREEN}
                options={{
                    title: 'Trainers', //Set Header Title
                    headerStyle: {
                        backgroundColor: COLOR.BACKGROUNDCOLOR, //Set Header color
                    },
                    headerTintColor: COLOR.BLACK, //Set Header text color
                    headerTitleAlign: KEY.CENTER,
                    headerTitleStyle: {
                        fontWeight: FONT.FONT_WEIGHT_MEDIAM, //Set Header text style
                    }
                }}
            />
        </Stack.Navigator>
    )
}

const MemberShipStackScreen = ({ navigation }) => {
    return (
        <Stack.Navigator initialRouteName='MemberShipScreen'
            screenOptions={{ headerShadowVisible: false }}>
            <Stack.Screen
                name="MemberShipScreen"
                component={MEMBERSHIPSCREEN}
                options={{
                    title: 'Membership', //Set Header Title
                    headerLeft: () =>
                        <NavigationDrawerStructureLeft
                            navigationProps={navigation}
                        />,
                    headerRight: () => <NavigationDrawerStructureRight navigationProps={navigation} />,
                    headerStyle: {
                        backgroundColor: COLOR.BACKGROUNDCOLOR, //Set Header color
                    },
                    headerTintColor: COLOR.BLACK, //Set Header text color
                    headerTitleAlign: KEY.CENTER,
                    headerTitleStyle: {
                        fontWeight: FONT.FONT_WEIGHT_MEDIAM, //Set Header text style
                    }
                }}
            />
        </Stack.Navigator>
    )
}

const ContactUsStackScreen = ({ navigation }) => {
    return (
        <Stack.Navigator initialRouteName='ContactUsScreen'
            screenOptions={{ headerShadowVisible: false }}>
            <Stack.Screen
                name="ContactUsScreen"
                component={CONTACTUSSCREEN}
                options={{
                    title: 'Contact Us', //Set Header Title
                    headerLeft: () =>
                        <NavigationDrawerStructureLeft
                            navigationProps={navigation}
                        />,
                    headerRight: () => <NavigationDrawerStructureRight navigationProps={navigation} />,
                    headerStyle: {
                        backgroundColor: COLOR.BACKGROUNDCOLOR, //Set Header color
                    },
                    headerTintColor: COLOR.BLACK, //Set Header text color
                    headerTitleAlign: KEY.CENTER,
                    headerTitleStyle: {
                        fontWeight: FONT.FONT_WEIGHT_MEDIAM, //Set Header text style
                    }
                }}
            />
            <Stack.Screen
                name="SubmitQuery"
                component={SUBMITQUERY}
                options={{
                    title: 'Submit Query', //Set Header Title
                    headerRight: () => <NavigationDrawerStructureRight navigationProps={navigation} />,
                    headerStyle: {
                        backgroundColor: COLOR.BACKGROUNDCOLOR, //Set Header color
                    },
                    headerTintColor: COLOR.BLACK, //Set Header text color
                    headerTitleAlign: KEY.CENTER,
                    headerTitleStyle: {
                        fontWeight: FONT.FONT_WEIGHT_MEDIAM, //Set Header text style
                    }
                }}
            />

        </Stack.Navigator>
    )
}

const WalletStackScreen = ({ navigation }) => {
    return (
        <Stack.Navigator initialRouteName='WalletScreen'
            screenOptions={{ headerShadowVisible: false }}>
            <Stack.Screen
                name="WalletScreen"
                component={WALLETSCREEN}
                options={{
                    title: 'Wallet', //Set Header Title
                    headerLeft: () =>
                        <NavigationDrawerStructureLeft
                            navigationProps={navigation}
                        />,
                    headerRight: () => <NavigationDrawerStructureRight navigationProps={navigation} />,
                    headerStyle: {
                        backgroundColor: COLOR.BACKGROUNDCOLOR, //Set Header color
                    },
                    headerTintColor: COLOR.BLACK, //Set Header text color
                    headerTitleAlign: KEY.CENTER,
                    headerTitleStyle: {
                        fontWeight: FONT.FONT_WEIGHT_MEDIAM, //Set Header text style
                    }
                }}
            />

            <Stack.Screen
                name="WalletTransaction"
                component={WALLETTRANSACTION}
                options={{
                    title: 'Recent Transactions', //Set Header Title
                    headerLeft: () =>
                        <NavigationDrawerStructureLeft
                            navigationProps={navigation}
                        />,
                    headerRight: () => <NavigationDrawerStructureRight navigationProps={navigation} />,
                    headerStyle: {
                        backgroundColor: COLOR.BACKGROUNDCOLOR, //Set Header color
                    },
                    headerTintColor: COLOR.BLACK, //Set Header text color
                    headerTitleAlign: KEY.CENTER,
                    headerTitleStyle: {
                        fontWeight: FONT.FONT_WEIGHT_MEDIAM, //Set Header text style
                    }
                }}
            />
        </Stack.Navigator>
    )
}

const RewardPointStackScreen = ({ navigation }) => {
    return (
        <Stack.Navigator initialRouteName='RewardPointScreen'
            screenOptions={{ headerShadowVisible: false }}>
            <Stack.Screen
                name="RewardPointScreen"
                component={REWARDPOINTSCREEN}
                options={{
                    title: 'Reward Points', //Set Header Title
                    headerLeft: () =>
                        <NavigationDrawerStructureLeft
                            navigationProps={navigation}
                        />,
                    headerRight: () => <NavigationDrawerStructureRight navigationProps={navigation} />,
                    headerStyle: {
                        backgroundColor: COLOR.BACKGROUNDCOLOR, //Set Header color
                    },
                    headerTintColor: COLOR.BLACK, //Set Header text color
                    headerTitleAlign: KEY.CENTER,
                    headerTitleStyle: {
                        fontWeight: FONT.FONT_WEIGHT_MEDIAM, //Set Header text style
                    }
                }}
            />

            <Stack.Screen
                name="RewardPointTransaction"
                component={REWARDPOINTTRANSACTION}
                options={{
                    title: 'Recent Transactions', //Set Header Title
                    headerRight: () => <NavigationDrawerStructureRight navigationProps={navigation} />,
                    headerStyle: {
                        backgroundColor: COLOR.BACKGROUNDCOLOR, //Set Header color
                    },
                    headerTintColor: COLOR.BLACK, //Set Header text color
                    headerTitleAlign: KEY.CENTER,
                    headerTitleStyle: {
                        fontWeight: FONT.FONT_WEIGHT_MEDIAM, //Set Header text style
                    }
                }}
            />
        </Stack.Navigator>
    )
}

const ActivityCalenderStackScreen = ({ navigation }) => {
    return (
        <Stack.Navigator initialRouteName='ActivityCalenderScreen'
            screenOptions={{ headerShadowVisible: false }}>
            <Stack.Screen
                name="ActivityCalenderScreen"
                component={ACTIVITYCALENDERSCREEN}
                options={{
                    title: 'Activity Calender', //Set Header Title
                    headerLeft: () =>
                        <NavigationDrawerStructureLeft
                            navigationProps={navigation}
                        />,
                    headerRight: () => <NavigationDrawerStructureRight navigationProps={navigation} />,
                    headerStyle: {
                        backgroundColor: COLOR.BACKGROUNDCOLOR, //Set Header color
                    },
                    headerTintColor: COLOR.BLACK, //Set Header text color
                    headerTitleAlign: KEY.CENTER,
                    headerTitleStyle: {
                        fontWeight: FONT.FONT_WEIGHT_MEDIAM, //Set Header text style
                    }
                }}
            />
        </Stack.Navigator>
    )
}

const InviteFriendStackScreen = ({ navigation }) => {
    return (
        <Stack.Navigator initialRouteName='InviteFriendScreen'
            screenOptions={{ headerShadowVisible: false }}>
            <Stack.Screen
                name="InviteFriendScreen"
                component={INVITEFRIENDSCREEN}
                options={{
                    title: 'Invite a friend', //Set Header Title
                    headerLeft: () =>
                        <NavigationDrawerStructureLeft
                            navigationProps={navigation}
                        />,
                    headerRight: () => <NavigationDrawerStructureRight navigationProps={navigation} />,
                    headerStyle: {
                        backgroundColor: COLOR.BACKGROUNDCOLOR, //Set Header color
                    },
                    headerTintColor: COLOR.BLACK, //Set Header text color
                    headerTitleAlign: KEY.CENTER,
                    headerTitleStyle: {
                        fontWeight: FONT.FONT_WEIGHT_MEDIAM, //Set Header text style
                    }
                }}
            />
        </Stack.Navigator>
    )
}

const NavigationsDrawer = (props) => {
    return (
        <Drawer.Navigator initialRouteName="HomeScreen"
            screenOptions={{
                activeTintColor: COLOR.DEFALUTCOLOR,
                drawerActiveTintColor: COLOR.DEFALUTCOLOR,
                drawerActiveBackgroundColor: COLOR.WHITE,
                drawerInactiveBackgroundColor: COLOR.WHITE,
                drawerInactiveTintColor: COLOR.LIGHT_BLACK,
                drawerLabelStyle: {
                    fontWeight: FONT.FONT_NORMAL,
                    fontSize: FONT.FONT_SIZE_16,
                    margin: -5,
                    marginLeft: -15
                },
                drawerItemStyle: { marginTop: -8 },
                headerShown: false
            }}
            drawerContent={(props) => <CustomDrawer {...props} />}>
            <Drawer.Screen
                name="HomeScreen"
                component={HomeStackScreen}
                options={{
                    drawerLabel: 'Home', drawerIcon: ({ color }) => (
                        <Image source={IMAGE.HOMEICON}
                            style={{ width: 20, height: 25, tintColor: color, marginBottom: -5 }} />
                    )
                }}
            />
            <Drawer.Screen
                name="MyProfileScreen"
                component={MyProfileStackScreen}
                options={{
                    drawerLabel: 'My Profile', drawerIcon: ({ color }) => (
                        <Image source={IMAGE.USERICON}
                            style={{ width: 20, height: 20, tintColor: color }} />
                    )
                }}
            />
            <Drawer.Screen
                name="MemberShipStackScreen"
                component={MemberShipStackScreen}
                options={{
                    drawerLabel: 'Membership', drawerIcon: ({ color }) => (
                        <Image source={IMAGE.MEMBERSHIPICON}
                            style={{ width: 20, height: 20, tintColor: color }} />
                    )
                }}
            />
            <Drawer.Screen
                name="ourservices"
                component={MemberShipStackScreen}
                options={{
                    drawerLabel: 'Our Services', drawerIcon: ({ color }) => (
                        <Image source={IMAGE.TRAININGICON}
                            style={{ width: 21, height: 21, tintColor: color }} />
                    )
                }}
            />
            <Drawer.Screen
                name="mybooking"
                component={MemberShipStackScreen}
                options={{
                    drawerLabel: 'My Booking', drawerIcon: ({ color }) => (
                        <Image source={IMAGE.MYBOOKINGICON}
                            style={{ width: 21, height: 21, tintColor: color }} />
                    )
                }}
            />
            <Drawer.Screen
                name="DownPaymentScreen"
                component={PaymentStackScreen}
                options={{
                    drawerLabel: 'Payment', drawerIcon: ({ color }) => (
                        <Image source={IMAGE.MONEYICON}
                            style={{ width: 24, height: 18, tintColor: color }} />
                    )
                }}
            />
            <Drawer.Screen
                name="TrainerScreen"
                component={TrainerStackScreen}
                options={{
                    drawerLabel: 'Our Specialist', drawerIcon: ({ color }) => (
                        <Image source={IMAGE.USERGROUPICON}
                            style={{ width: 20, height: 20, tintColor: color }} />
                    )
                }}
            />
            <Drawer.Screen
                name="exploresalon"
                component={PaymentStackScreen}
                options={{
                    drawerLabel: 'explore Salon', drawerIcon: ({ color }) => (
                        <Image source={IMAGE.EXPLOREICON}
                            style={{ width: 20, height: 20, tintColor: color }} />
                    )
                }}
            />
            <Drawer.Screen
                name="WalletScreen"
                component={WalletStackScreen}
                options={{
                    drawerLabel: 'Wallet', drawerIcon: ({ color }) => (
                        <Image source={IMAGE.WALLET}
                            style={{ width: 20, height: 20, tintColor: color }} />
                    )
                }}
            />
            <Drawer.Screen
                name="RewardPointScreen"
                component={RewardPointStackScreen}
                options={{
                    drawerLabel: 'Reward Points', drawerIcon: ({ color }) => (
                        <Image source={IMAGE.REWARDPOINT}
                            style={{ width: 20, height: 20, tintColor: color }} />
                    )
                }}
            />
            <Drawer.Screen
                name="activitycalender"
                component={ActivityCalenderStackScreen}
                options={{
                    drawerLabel: 'Activity Calender', drawerIcon: ({ color }) => (
                        <Image source={IMAGE.ACTIVITYCALENDERICON}
                            style={{ width: 21, height: 21, tintColor: color }} />
                    )
                }}
            />
            <Drawer.Screen
                name="InviteFriendScreen"
                component={InviteFriendStackScreen}
                options={{
                    drawerLabel: 'Invite a friend', drawerIcon: ({ color }) => (
                        <Image source={IMAGE.INVITEICON}
                            style={{ width: 22, height: 18, tintColor: color }} />
                    )
                }}
            />
            <Drawer.Screen
                name="ContactUsScreen"
                component={ContactUsStackScreen}
                options={{
                    drawerLabel: 'Contact Us', drawerIcon: ({ color }) => (
                        <Image source={IMAGE.CONTACT}
                            style={{ width: 20, height: 20, tintColor: color }} />
                    )
                }}
            />
        </Drawer.Navigator>
    )
}

export default NavigationsApp = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShadowVisible: false }}>
                <Stack.Screen name="SplashScreen" component={SPLASHSCREEN} options={{ headerShown: false }} />
                <Stack.Screen name="NotificationScreen"
                    component={NOTIFICATIONSCREEN}
                    options={{
                        title: 'Notifications',
                        headerStyle: {
                            backgroundColor: COLOR.BACKGROUNDCOLOR, //Set Header color
                        },
                        headerTintColor: COLOR.BLACK, //Set Header text color
                        headerTitleAlign: KEY.CENTER,
                        headerTitleStyle: {
                            fontWeight: FONT.FONT_WEIGHT_MEDIAM, //Set Header text style
                        }
                    }} />
                <Stack.Screen name="Auth" component={AuthStackScreen} options={{ headerShown: false }} />
                <Stack.Screen name="NavigationsDrawer" component={NavigationsDrawer} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
