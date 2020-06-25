import { searchHistoryActionTypes } from "./searchHistory.actions.types";

export const searchHistory = () => ({
    type: searchHistoryActionTypes.GET_HISTORY
})

export const setSearchHistory = query => ({
    type: searchHistoryActionTypes.SET_HISTORY,
    payload: query
})