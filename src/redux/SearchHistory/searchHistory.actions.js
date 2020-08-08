import { searchHistoryActionTypes } from "./searchHistory.actions.types";

export const searchHistory = () => ({
    type: searchHistoryActionTypes.GET_HISTORY
})

export const setSearchHistory = query => ({
    type: searchHistoryActionTypes.SET_HISTORY,
    payload: query
})

export const addToFavorite = wallpaper => ({
    type: searchHistoryActionTypes.ADD_TO_FAVORITE,
    payload: wallpaper
})

export const removeFromFavorite = wallpaper => ({
    type: searchHistoryActionTypes.REMOVE_FROM_FAVORITE,
    payload: wallpaper
})

export const removeAllUnfavorites = () => ({
    type: searchHistoryActionTypes.REMOVE_ALL_UNFAVORITES,
})