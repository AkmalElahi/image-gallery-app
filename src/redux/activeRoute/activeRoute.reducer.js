import { activeRouteActionTypes } from "./activeRoute.actions.types"

const INITIAL_STATE = {
    activeRoute: 'home',
}

const activeRouteReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case activeRouteActionTypes.SET_ACTIVE_ROUTE:
            return Object.assign({
                ...state,
                activeRoute: action.payload
            })
        default:
            return state
    }

}

export default activeRouteReducer