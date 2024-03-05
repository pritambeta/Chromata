import {ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST, SET_DATA} from "./constants";

export function addToWishList(item) {
    return {
        type: ADD_TO_WISHLIST,
        data: item
    }
}

export function removeFromWishList(item) {
    return {
        type: REMOVE_FROM_WISHLIST,
        data: item
    }
}

export function setData(data) {
    return {
        type: SET_DATA,
        data: data
    }
}