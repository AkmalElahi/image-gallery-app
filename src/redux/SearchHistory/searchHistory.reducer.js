import { searchHistoryActionTypes } from "./searchHistory.actions.types"


const setHistory = (historytoAdd, oldHistory, findFor) => {
    const isExist = findFor === 'query' ? (oldHistory.find(history => history[findFor] === historytoAdd)) :
        (oldHistory.find(history => history[findFor] === historytoAdd[findFor]))
    if (isExist) {
        return oldHistory
    }
    return findFor === 'query' ? ([{ id: historytoAdd, query: historytoAdd }, ...oldHistory]) :
        ([...oldHistory, historytoAdd])
}
const removeFavorite = (historytoRemove, oldHistory, removeFor) => {
    const isExist = (oldHistory.find(history => history[removeFor] === historytoRemove[removeFor]))
    if (isExist) {
        return (oldHistory.filter(history => history[removeFor] !== historytoRemove[removeFor]))
    }
    return oldHistory

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
        default:
            return state
    }
}

export default searchHistoryReducer