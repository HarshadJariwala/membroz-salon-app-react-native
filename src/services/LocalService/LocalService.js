import AsyncStorage from "@react-native-community/async-storage";
import { AUTHREMBERUSERINFO, AUTHUSER, AUTHUSERINFO, REMOTEDATA } from "../../context/actions/type";

// REMOTECONTROLLER USE TO AUTOCONFIG APP
export const LocalStorageService = async () => {
    var getUser = await AsyncStorage.getItem(AUTHUSER);
    var userData = JSON.parse(getUser);
    return userData;
};

//add local storage Records
export const AuthenticateMember = (user) => (
    AsyncStorage.setItem(AUTHUSER, JSON.stringify(user))
)

//add local storage Records
export const RemoveAuthenticateMember = () => (
    AsyncStorage.removeItem(AUTHUSER), AsyncStorage.removeItem(AUTHUSERINFO)
)

//Local Login User Infromation
export const LocalLoginStorageService = async () => {
    var getLoginUser = await AsyncStorage.getItem(AUTHUSERINFO);
    var getLoginUser = JSON.parse(getLoginUser);
    return getLoginUser;
};

//Local Login Rember User Infromation
export const LocalRemberLoginStorageService = async () => {
    var getLoginMember = await AsyncStorage.getItem(AUTHREMBERUSERINFO);
    var getLoginMember = JSON.parse(getLoginMember);
    return getLoginMember;
};

//remove Login Rember User Infromation data from local storage
export const RemoveRemberLocalLoginStorageService = async () => {
    AsyncStorage.removeItem(AUTHREMBERUSERINFO);
};

// CHECK AUTHCONTROLLER USE TO LOGIN OR NOT LOGIN
export const RemoteServerController = async () => {
    var getUser = await AsyncStorage.getItem(REMOTEDATA);
    var userData = JSON.parse(getUser);
    return userData;
};