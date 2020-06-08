import { albumActionTypes } from './albums.action.types';
const INITIAL_STATE = {
    albums: null,
    isloading: false,
    message: '',
    status: ''
}

const albumReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case albumActionTypes.GET_ALBUMS_REQUEST:
            return Object.assign({
                ...state,
                isloading: true,
                status: "get albums request"
            })
        case albumActionTypes.GET_ALBUMS_SUCCESS:
            console.log("PAYLOAD IN ALBUMS", action.payload)
            return Object.assign({
                ...state,
                isloading: false,
                albums: action.payload,
                status: "get albums success",
            })
        case albumActionTypes.GET_ALBUMS_FAILURE:
            return Object.assign({
                ...state,
                isloading: false,
                message: action.payload,
                status: "get albums failure"
            })
        case albumActionTypes.CHANGE_MANAGER_STATUS_REQUEST:
            return Object.assign({
                ...state,
                isloading: true,
                status: "change manager status request"

            })
        case albumActionTypes.CHANGE_MANAGER_STATUS_SUCCESS:
            return Object.assign({
                ...state,
                isloading: false,
                managers: null,
                status: "change manager status success"
            })
        case albumActionTypes.CHANGE_MANAGER_STATUS_FAILURE:
            return Object.assign({
                ...state,
                isloading: false,
                status: "change manager status falilure",
                message: action.payload
            })
        default:
            return state
    }
}

export default albumReducer