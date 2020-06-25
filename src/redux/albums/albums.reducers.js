import { albumActionTypes } from './albums.action.types';
const loadMore = (albumsToAdd, oldAlbum) => {
    const isExist = !!albumsToAdd.length
    if (isExist) {
        return [...oldAlbum, ...albumsToAdd]
    }
    return oldAlbum

}
const INITIAL_STATE = {
    new: [],
    featured: [],
    random: [],
    popular: [],
    albumGrid:[],
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
                albumGrid:[],
                status: "get albums request"
            })
        case albumActionTypes.GET_NEW_ALBUMS_SUCCESS:
            // console.log("PAYLOAD IN ALBUMS", action.payload)
            return Object.assign({
                ...state,
                isloading: false,
                new: loadMore(action.payload, state.new),
                status: "get albums success",
            })
        case albumActionTypes.GET_FEATURED_ALBUMS_SUCCESS:
            // console.log("PAYLOAD IN ALBUMS", action.payload)
            return Object.assign({
                ...state,
                isloading: false,
                featured: loadMore(action.payload, state.featured),
                status: "get albums success",
            })
        case albumActionTypes.GET_POPULAR_ALBUMS_SUCCESS:
            // console.log("PAYLOAD IN ALBUMS", action.payload)
            return Object.assign({
                ...state,
                isloading: false,
                popular: loadMore(action.payload, state.popular),
                status: "get albums success",
            })
        case albumActionTypes.GET_RANDOM_ALBUMS_SUCCESS:
            // console.log("PAYLOAD IN ALBUMS", action.payload)
            return Object.assign({
                ...state,
                isloading: false,
                random: loadMore(action.payload, state.random),
                status: "get albums success",
            })
        case albumActionTypes.GET_ALBUM_GRID_SUCCESS:
            // console.log("PAYLOAD IN ALBUMS", action.payload)
            return Object.assign({
                ...state,
                isloading: false,
                albumGrid:action.payload,
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