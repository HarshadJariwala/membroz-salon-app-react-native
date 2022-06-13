import AsyncStorage from '@react-native-community/async-storage';
import { WISHLISTS } from '../../context/actions/type';

export const getLocalWishList = async () => {
    const localWishLists = await AsyncStorage.getItem(WISHLISTS);
    return JSON.parse(localWishLists);
}

export const getLocalWishListByID = async (currentWishListId) => {
    let localWishLists = await getLocalWishList();
    let foundWishList;
    if (localWishLists) {
        foundWishList = localWishLists.find(x => x._id === currentWishListId)
    }
    return foundWishList;
}

export const saveLocalWishList = async (currentWishList) => {
    let localWishLists = await getLocalWishList();
    let filteredWishLists = [];
    if (localWishLists) {
        filteredWishLists = localWishLists.filter(x => x._id !== currentWishList._id)
    }
    if (!filteredWishLists) {
        filteredWishLists = [];
    }
    filteredWishLists.push(currentWishList);
    AsyncStorage.setItem(WISHLISTS, JSON.stringify(filteredWishLists));
}

export const removeLocalWishList = async (currentWishListObj) => {
    let localWishLists = await getLocalWishList();
    let filteredWishLists = [];
    if (localWishLists) {
        filteredWishLists = localWishLists.filter(x => x._id !== currentWishListObj._id)
        AsyncStorage.setItem(WISHLISTS, JSON.stringify(filteredWishLists));
    }
}
