import { searchHistoryActionTypes } from "./searchHistory.actions.types"


const setSearchHistory = (historytoAdd, oldHistory) => {
    const isExist = oldHistory.find(history => history.query === historytoAdd)
    if (isExist) {
        return oldHistory
    }
    // const newHistory = oldHistory.push({ id: historytoAdd, query: historytoAdd })
    // console.log(isExist, historytoAdd, oldHistory, newHistory)
    return [...oldHistory, { id: historytoAdd, query: historytoAdd }]
}
const INITIAL_STATE = {
    history: [
        {
            id: 'batman',
            query: 'batman'
        },
        {
            id: 'nature',
            query: 'nature'
        },
        {
            id: 'cars',
            query: 'cars'
        }
    ]
}

const searchHistoryReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case searchHistoryActionTypes.GET_HISTORY:
            return Object.assign({ ...state })
        case searchHistoryActionTypes.SET_HISTORY:
            return Object.assign({
                ...state,
                history: setSearchHistory(action.payload, state.history)

            })
        default:
            return Object.assign({}, state)
    }
}

export default searchHistoryReducer