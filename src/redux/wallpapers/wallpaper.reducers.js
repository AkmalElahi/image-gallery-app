import { wallpaperActionTypes } from './wallpaper.actions.types';
const loadMore = (wallpapersToAdd, oldWallpapers) => {
    const isExist = !!wallpapersToAdd.length
    if (isExist) {
        return [...oldWallpapers, ...wallpapersToAdd]
    }
    return oldWallpapers

}
const INITIAL_STATE = {
    new: [],
    featured: [],
    random: [],
    popular: [],
    searchedWallpapers: [],
    albumGrid: [],
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
                albumGrid:[],
                status: "get wallpaper request"
            })
        case wallpaperActionTypes.GET_NEW_WALLPAPER_SUCCESS:
            // console.log("PAYLOAD IN WALLPAPER", action.payload)
            return Object.assign({
                ...state,
                isloading: false,
                new: loadMore(action.payload, state.new),
                status: "get wallpaper success",
            })
        case wallpaperActionTypes.GET_FEATURED_WALLPAPER_SUCCESS:
            // console.log("PAYLOAD IN WALLPAPER", action.payload)
            return Object.assign({
                ...state,
                isloading: false,
                featured: loadMore(action.payload, state.featured),
                status: "get wallpaper success",
            })
        case wallpaperActionTypes.GET_POPULAR_WALLPAPER_SUCCESS:
            // console.log("PAYLOAD IN WALLPAPER", action.payload)
            return Object.assign({
                ...state,
                isloading: false,
                popular: loadMore(action.payload, state.popular),
                status: "get wallpaper success",
            })
        case wallpaperActionTypes.GET_RANDOM_WALLPAPER_SUCCESS:
            // console.log("PAYLOAD IN WALLPAPER", action.payload)
            return Object.assign({
                ...state,
                isloading: false,
                random: loadMore(action.payload, state.random),
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
                status: "clear search"
            })
        case wallpaperActionTypes.GET_ALBUM_GRID_SUCCESS:
            // console.log("PAYLOAD IN ALBUMS", action.payload)
            return Object.assign({
                ...state,
                isloading: false,
                albumGrid: action.payload,
                status: "get albums grid success",
            })
        default:
            return state
    }
}

export default wallpaperReducer