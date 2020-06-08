import { wallpaperActionTypes } from './wallpaper.actions.types';
const INITIAL_STATE = {
    wallpapers: null,
    searchedWallpapers: [],
    isloading: false,
    message: '',
    status: ''
}

const wallpaperReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case wallpaperActionTypes.GET_WALLPAPER_REQUEST:
            return Object.assign({
                ...state,
                isloading: true,
                wallpapers: [],
                status: "get wallpaper request"
            })
        case wallpaperActionTypes.GET_WALLPAPER_SUCCESS:
            console.log("PAYLOAD IN WALLPAPER", action.payload)
            return Object.assign({
                ...state,
                isloading: false,
                wallpapers: action.payload,
                status: "get wallpaper success",
            })
        case wallpaperActionTypes.GET_WALLPAPER_FAILURE:
            return Object.assign({
                ...state,
                isloading: false,
                message: action.payload,
                status: "get wallpaper failure"
            })
        case wallpaperActionTypes.SEARCH_WALLPAPER_REQUEST:
            return Object.assign({
                ...state,
                isloading: true,
                searchedWallpapers: [],
                status: "search wallpaper request"
            })
        case wallpaperActionTypes.SEARCH_WALLPAPER_SUCCESS:
            return Object.assign({
                ...state,
                isloading: false,
                searchedWallpapers: action.payload,
                status: "search wallpaper success"

            })
        case wallpaperActionTypes.CLEAR_SEARCH:
            return Object.assign({
                ...state,
                isloading: false,
                searchedWallpapers: [],
                // wallpapers:[],
                status: "clear search"
            })
        case wallpaperActionTypes.CHANGE_MANAGER_STATUS_FAILURE:
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

export default wallpaperReducer