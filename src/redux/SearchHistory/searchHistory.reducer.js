import { searchHistoryActionTypes } from "./searchHistory.actions.types"


const setHistory = (historytoAdd, oldHistory, findFor) => {
    const isExist = findFor === 'query' ? (oldHistory.find(history => history[findFor] === historytoAdd)) :
        (oldHistory.find(history => history[findFor] === historytoAdd[findFor]))
    if (isExist) {
        if (findFor === 'query') {
            return oldHistory
        }
        const objIndex = oldHistory.findIndex((obj => obj.url === historytoAdd.url));
        oldHistory[objIndex].isFavorite = true
        return [...oldHistory]
    }
    return findFor === 'query' ? ([{ id: historytoAdd, query: historytoAdd }, ...oldHistory]) :
        ([...oldHistory, { ...historytoAdd, isFavorite: true }])
}
const removeFavorite = (historytoRemove, oldHistory, removeFor) => {
    const isExist = (oldHistory.find(history => history[removeFor] === historytoRemove[removeFor]))
    if (isExist) {
        if (removeFor === 'query') {
            return (oldHistory.filter(history => history[removeFor] !== historytoRemove[removeFor]))
        }
        const objIndex = oldHistory.findIndex((obj => obj.url === historytoRemove.url));
        oldHistory[objIndex].isFavorite = false
        return [...oldHistory]
    }
    return oldHistory

}
const removeUnFavorites = (wallpapers) => {
    return wallpapers.filter(wallpaper => wallpaper.isFavorite)
}
// {
//     id: 'batman',
//     query: 'batman'
// },
// {
//     id: 'nature',
//     query: 'nature'
// },
// {
//     id: 'cars',
//     query: 'cars'
// }
const INITIAL_STATE = {
    history: [],
    wallpapers: []
}

const searchHistoryReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case searchHistoryActionTypes.GET_HISTORY:
            return Object.assign({
                ...state,
                // history: !!state.history ? state.history.reverse() : []
            })
        case searchHistoryActionTypes.SET_HISTORY:
            return Object.assign({
                ...state,
                history: setHistory(action.payload, state.history, 'query')

            })
        case searchHistoryActionTypes.ADD_TO_FAVORITE:
            return Object.assign({
                ...state,
                wallpapers: setHistory(action.payload, state.wallpapers, 'url')
            })
        case searchHistoryActionTypes.REMOVE_FROM_FAVORITE:
            return Object.assign({
                ...state,
                wallpapers: removeFavorite(action.payload, state.wallpapers, 'url')
            })
        case searchHistoryActionTypes.REMOVE_ALL_UNFAVORITES:
            return Object.assign({
                ...state,
                wallpapers: removeUnFavorites(state.wallpapers)
            })
        default:
            return state
    }
}

export default searchHistoryReducer