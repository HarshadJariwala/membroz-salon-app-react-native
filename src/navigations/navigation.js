import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import FORGETPASSWORDSCREEN from '../screen/ForgetPasswordScreen/ForgetPasswordScreen';
import PAYMENTDETAILSSCREEN from '../screen/PaymentDetailsScreen/PaymentDetailsScreen';
import EXPOLORELOGINSCREEN from '../screen/ExploreLoginScreen/ExpoloreLoginScreen';
import PASSWORDCHANGESCREEN from '../screen/MyProfileScreen/PasswordChangeScreen';
import NEWPASSWORDSCREEN from '../screen/ForgetPasswordScreen/NewPasswordScreen';
import NOTIFICATIONSCREEN from '../screen/NotificationScreen/NotificationScreen';
import DOWNPAYMENTSCREEN from '../screen/PaymentDetailsScreen/DownPaymentScreen';
import UPDATEPROFILESCREEN from '../screen/MyProfileScreen/UpdateProfileScreen';
import MYPROFILESCREEN from '../screen/MyProfileScreen/MyProfileScreen';
import EXPLORESCREEN from '../screen/ExploreLoginScreen/ExploreScreen';
import EXPLORESTATUS from '../screen/ExploreLoginScreen/ExploreStatus';
import REGISTERSCREEN from '../screen/RegisterScreen/RegisterScreen';
import OFFERSCREEN from '../screen/ExploreLoginScreen/OfferScreen';
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
import MYBOOKING from '../screen/MyBooking/MyBooking';
import OURSPECIALIST from '../screen/OurSpecialist/OurSpecialist';
import OURSPECIALISTDTAILS from '../screen/OurSpecialist/OurSpecialistDtails';
import MENUSCREEN from '../screen/MenuScreen/MenuScreen';
import OURSERVICESCREEN from '../screen/OurServiceScreen/OurServiceScreen';
import WISHLISTSCREEN from '../screen/WishlistScreen/WishlistScreen';
import OURSERVICEDETAILSCREEN from '../screen/OurServiceScreen/OurServiceDetailScreen';
import BOOKINGCOMPLATESCREEN from '../screen/OurServiceScreen/BookingComplateScreen';
import BOOKSERVICESCREEN from '../screen/OurServiceScreen/BookServiceScreen';
import BOOKINGPAYMENTSCREEN from '../screen/OurServiceScreen/BookingPaymentScreen';
import PACKAGE from '../screen/PackageScreen/Package';
import PACKAGEDETAILSCREEN from '../screen/PackageScreen/PackageDetailScreen';

import { NotificationService } from '../services/NotificationService/NotificationService';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { MemberLanguage } from '../services/LocalService/LanguageService';
import * as LocalService from '../services/LocalService/LocalService';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
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
const Tab = createBottomTabNavigator();

//Structure for the navigatin Drawer
const NavigationDrawerStructureLeft = (props) => {
    const [memberInfo, setMemberInfo] = useState(false);

    useEffect(() => {
        getMemberDeatilsLocalStorage();
    }, [])

    //GET MEMBER DATA IN MOBILE LOCAL STORAGE
    const getMemberDeatilsLocalStorage = async () => {
        var memberInfo = await LocalService.LocalStorageService();
        if (memberInfo) {
            setMemberInfo(true);
        }
    }

    useEffect(() => {
    }, [memberInfo])

    return (
        <TouchableOpacity onPress={() => memberInfo ?
            props.navigationProps.navigate(SCREEN.MENUSCREEN)
            : props.navigationProps.navigate(SCREEN.AUTH)} >
            <Image
                source={IMAGE.MENUICON}
                style={{
                    width: 27,
                    height: 18,
                    marginLeft: 12,
                    tintColor: COLOR.BLACK
                }}
            />
        </TouchableOpacity>
    )
}

//Structure for the navigatin Drawer
const NavigationDrawerStructureRight = (props) => {
    const [userID, setUserID] = useState(null);
    const [notification, setNotification] = useState(0);

    useEffect(() => {
        AsyncStorage.getItem(KEY.AUTHUSER).then((res) => {
            if (res) {
                let userid = JSON.parse(res)._id;
                setUserID(userid);
                getNotification(userid);
            }
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
            <Stack.Screen
                name="MenuScreen"
                component={MENUSCREEN}
                options={{
                    title: '', //Set Header Title
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
                name="OurServiceDetailScreen"
                component={OURSERVICEDETAILSCREEN}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="BookingComplateScreen"
                component={BOOKINGCOMPLATESCREEN}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="BookServiceScreen"
                component={BOOKSERVICESCREEN}
                options={{
                    title: 'Book Service',
                    headerStyle: {
                        backgroundColor: COLOR.DEFALUTCOLOR, //Set Header color
                    },
                    headerTintColor: COLOR.WHITE, //Set Header text color
                    headerTitleAlign: KEY.CENTER,
                    headerTitleStyle: {
                        fontWeight: FONT.FONT_WEIGHT_MEDIAM, //Set Header text style
                    }
                }} />
            <Stack.Screen name="BookingPaymentScreen"
                component={BOOKINGPAYMENTSCREEN}
                options={{
                    title: 'Payment',
                    headerStyle: {
                        backgroundColor: COLOR.BACKGROUNDCOLOR, //Set Header color
                    },
                    headerTintColor: COLOR.BLACK, //Set Header text color
                    headerTitleAlign: KEY.CENTER,
                    headerTitleStyle: {
                        fontWeight: FONT.FONT_WEIGHT_MEDIAM, //Set Header text style
                    }
                }} />

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
            <Stack.Screen
                name="OurServiceScreen"
                component={OURSERVICESCREEN}
                options={{
                    title: 'Our Services', //Set Header Title
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
            <Stack.Screen
                name="PaymentDetailsScreen"
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
            <Stack.Screen
                name="OurSpecialist"
                component={OURSPECIALIST}
                options={{
                    title: 'Our Specialist', //Set Header Title
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
                name="OurSpecialistDtails"
                component={OURSPECIALISTDTAILS}
                options={{
                    title: 'Our Specialist', //Set Header Title
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
            <Stack.Screen
                name="ActivityCalenderScreen"
                component={ACTIVITYCALENDERSCREEN}
                options={{
                    title: 'Activity Calendar', //Set Header Title
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
            <Stack.Screen
                name="WishlistScreen"
                component={WISHLISTSCREEN}
                options={{
                    title: 'Wishlist', //Set Header Title
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
                name="MyBooking"
                component={MYBOOKING}
                options={{
                    title: 'My Booking', //Set Header Title
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
                name="ExploreScreen"
                component={EXPLORESCREEN}
                options={{
                    title: 'Explore Salon', //Set Header Title
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
                name="ExploreStatus"
                component={EXPLORESTATUS}
                options={{
                    title: 'Explore Salon', //Set Header Title                    
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
                name="OfferScreen"
                component={OFFERSCREEN}
                options={{
                    title: 'Offers', //Set Header Title
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

const OurServiceStackScreen = ({ navigation }) => {
    return (
        <Stack.Navigator initialRouteName='OurServiceScreen'
            screenOptions={{ headerShadowVisible: false }}>
            <Stack.Screen
                name="OurServiceScreen"
                component={OURSERVICESCREEN}
                options={{
                    title: "ourservice",
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
                name="OurServiceDetailScreen"
                component={OURSERVICEDETAILSCREEN}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}

const MyBookingStackScreen = ({ navigation }) => {
    return (
        <Stack.Navigator initialRouteName='MyBooking'
            screenOptions={{ headerShadowVisible: false }}>
            <Stack.Screen
                name="MyBooking"
                component={MYBOOKING}
                options={{
                    title: "MyBooking",
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

const packagesStackScreen = ({ navigation }) => {
    return (
        <Stack.Navigator initialRouteName='Package'
            screenOptions={{ headerShadowVisible: false }}>
            <Stack.Screen
                name="Package"
                component={PACKAGE}
                options={{
                    title: "Package",
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
                name="PackageDetailScreen"
                component={PACKAGEDETAILSCREEN}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}

const MyProfileStackScreen = ({ navigation }) => {
    return (
        <Stack.Navigator initialRouteName='MyProfile'
            screenOptions={{ headerShadowVisible: false }}>
            <Stack.Screen
                name="MyProfile"
                component={MYPROFILESCREEN}
                options={{
                    title: "Profile",
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

const SupportStackScreen = ({ navigation }) => {
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

const TabNavigation = () => {
    const [memberInfo, setMemberInfo] = useState(false);

    useEffect(() => {
        getMemberDeatilsLocalStorage();
    }, [])

    //GET MEMBER DATA IN MOBILE LOCAL STORAGE
    const getMemberDeatilsLocalStorage = async () => {
        var memberInfo = await LocalService.LocalStorageService();
        if (memberInfo && memberInfo != undefined) {
            setMemberInfo(true);
        }
    }

    useEffect(() => {
    }, [memberInfo])

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    if (route.name === 'Home') {
                        return (
                            <Image
                                source={IMAGE.HOMEICON}
                                style={{ width: 25, height: 32, marginTop: 5, tintColor: color }}
                            />
                        )
                    } else if (route.name === 'ourservice') {
                        return (
                            <Image
                                source={IMAGE.TRAININGICON}
                                style={{ width: 25, height: 25, tintColor: color }}
                            />
                        );
                    } else if (route.name === 'MyBooking') {
                        return (
                            <Image
                                source={IMAGE.MYBOOKINGICON}
                                style={{ width: 25, height: 25, tintColor: color }}
                            />
                        );
                    } else if (route.name === 'Package') {
                        return (
                            <Image
                                source={IMAGE.MEMBERSHIPICON}
                                style={{ width: 25, height: 25, tintColor: color }}
                            />
                        );
                    } else if (route.name === 'Profile') {
                        return (
                            <Image
                                source={IMAGE.USERICON}
                                style={{ width: 25, height: 25, tintColor: color }}
                            />
                        );
                    } else if (route.name === 'Support') {
                        return (
                            <MaterialCommunityIcons
                                name={focused ? 'face-agent' : 'face-agent'}
                                size={30}
                                color={color}
                            />
                        );
                    } else if (route.name === 'Login') {
                        return (
                            <Image
                                source={IMAGE.USERICON}
                                style={{ width: 25, height: 25, tintColor: color }}
                            />
                        );
                    }
                },
                tabBarActiveTintColor: COLOR.DEFALUTCOLOR,
                tabBarInactiveTintColor: COLOR.BLACK,
                tabBarStyle: {
                    borderTopRightRadius: 0, //10
                    borderTopLeftRadius: 0, //10
                    backgroundColor: COLOR.WHITE,
                    //height: 60
                },

                tabBarLabelStyle: { fontSize: 12, textTransform: KEY.CAPITALIZE },
                tabBarHideOnKeyboard: true,
                headerTintColor: COLOR.BLACK
            })}
            backBehavior="initialRoute" >
            <Tab.Screen name="Home" component={HomeStackScreen} options={{ headerShown: false, title: languageConfig.home }} />
            {memberInfo &&
                <Tab.Screen name="MyBooking" component={MyBookingStackScreen} options={{ headerShown: false, title: languageConfig.mybooking }} />
            }
            <Tab.Screen name="ourservice" component={OurServiceStackScreen} options={{ headerShown: false, title: languageConfig.services }} />
            <Tab.Screen name="Package" component={packagesStackScreen} options={{ headerShown: false, title: languageConfig.packages }} />
            {!memberInfo &&
                <Tab.Screen name="Support" component={SupportStackScreen} options={{ headerShown: false, title: languageConfig.support }} />
            }
            {!memberInfo &&
                <Tab.Screen name="Login" component={AuthStackScreen} options={{ headerShown: false, title: languageConfig.loginbtn }} />
            }
            {memberInfo &&
                <Tab.Screen name="Profile" component={MyProfileStackScreen} options={{ headerShown: false, title: languageConfig.myprofile }} />
            }
        </Tab.Navigator>
    )
}

export default NavigationsApp = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShadowVisible: false }}>
                <Stack.Screen name="SplashScreen" component={SPLASHSCREEN} options={{ headerShown: false }} />
                <Stack.Screen name="TabNavigation" component={TabNavigation} options={{ headerShown: false }} />
                <Stack.Screen name="Auth" component={AuthStackScreen} options={{ headerShown: false }} />
                {/* <Stack.Screen name="MainScreen" component={HomeStackScreen} options={{ headerShown: false }} /> */}
            </Stack.Navigator>
        </NavigationContainer>
    )
}
