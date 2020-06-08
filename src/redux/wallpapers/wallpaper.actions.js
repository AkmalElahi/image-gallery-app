import { wallpaperActionTypes } from './wallpaper.actions.types'
import { Path } from '../../configs/path'
import axios from 'axios'

const getWallpaper = () => ({
    type: wallpaperActionTypes.GET_WALLPAPER_REQUEST
})

const searchWallpapers = () => ({
    type: wallpaperActionTypes.SEARCH_WALLPAPER_REQUEST
})

const getWallpaperSuccess = wallpaper => ({
    type: wallpaperActionTypes.GET_WALLPAPER_SUCCESS,
    payload: wallpaper
})

const searchWallpaperSuccess = wallpaper => ({
    type: wallpaperActionTypes.SEARCH_WALLPAPER_SUCCESS,
    payload: wallpaper
})

export const clearSearch = () => ({
    type: wallpaperActionTypes.CLEAR_SEARCH,
})

const getWallpaperFailure = error => ({
    type: wallpaperActionTypes.GET_WALLPAPER_FAILURE,
    payload: error
})

export const getWallpaperMiddleware = (data) => {
    return async dispatch => {
        try {
            let url = data.type === 'search' ? `${Path.imagesUrl}?w=${data.type}&q=${data.query}` : `${Path.imagesUrl}?w=${data.type}`
            console.log("URL", url)
            if (data.type === 'search') {
                dispatch(searchWallpapers())
            }
            else {
                dispatch(getWallpaper())
            }
            const response = await axios.get(url)
            console.log("GET WALLPAPER RESPONSE", response.data)
            if (data.type === 'search') {
                dispatch(searchWallpaperSuccess(response.data))
            }
            else {
                dispatch(getWallpaperSuccess(response.data))
            }
        } catch (error) {
            console.log(error)
            dispatch(getWallpaperFailure({ success: false, errorMessage: "Something went wrong please try again" }))
        }
    }
}