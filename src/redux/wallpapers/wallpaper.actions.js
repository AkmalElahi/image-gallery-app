import { wallpaperActionTypes } from './wallpaper.actions.types'
import { Path } from '../../configs/path'
import axios from 'axios'

const getWallpaper = () => ({
    type: wallpaperActionTypes.GET_WALLPAPER_REQUEST
})

const searchWallpapers = () => ({
    type: wallpaperActionTypes.SEARCH_WALLPAPER_REQUEST
})

const getNewWallpaperSuccess = wallpaper => ({
    type: wallpaperActionTypes.GET_NEW_WALLPAPER_SUCCESS,
    payload: wallpaper
})

const getFeaturedWallpaperSuccess = wallpaper => ({
    type: wallpaperActionTypes.GET_FEATURED_WALLPAPER_SUCCESS,
    payload: wallpaper
})
const getPopularWallpaperSuccess = wallpaper => ({
    type: wallpaperActionTypes.GET_POPULAR_WALLPAPER_SUCCESS,
    payload: wallpaper
})
const getRandomWallpaperSuccess = wallpaper => ({
    type: wallpaperActionTypes.GET_RANDOM_WALLPAPER_SUCCESS,
    payload: wallpaper
})

const searchWallpaperSuccess = wallpaper => ({
    type: wallpaperActionTypes.SEARCH_WALLPAPER_SUCCESS,
    payload: wallpaper
})

export const clearSearch = () => ({
    type: wallpaperActionTypes.CLEAR_SEARCH,
})

const getAlbumGridSuccess = grid => ({
    type: wallpaperActionTypes.GET_ALBUM_GRID_SUCCESS,
    payload: grid
})

const getWallpaperFailure = error => ({
    type: wallpaperActionTypes.GET_WALLPAPER_FAILURE,
    payload: error
})

export const getWallpaperMiddleware = (data) => {
    return async dispatch => {
        try {
            let url = data.type === 'search' ? `${Path.imagesUrl}?w=${data.type}&q=${data.query}&page=${data.page}` : `${Path.imagesUrl}?w=${data.type}&page=${data.page}`
            // console.log("URL", url)
            if (data.type === 'search') {
                dispatch(searchWallpapers())
            }
            else {
                dispatch(getWallpaper())
            }
            const response = await axios.get(url)
            // console.log("GET WALLPAPER RESPONSE", response.data)
            // if (data.type === 'search') {
            //     dispatch(searchWallpaperSuccess(response.data))
            // }
            // else {
            //     dispatch(getWallpaperSuccess(response.data))
            // }
            switch (data.type) {
                case 'search':
                    dispatch(searchWallpaperSuccess(response.data))
                    return
                case 'new':
                    dispatch(getNewWallpaperSuccess(response.data))
                    return
                case 'featured':
                    dispatch(getFeaturedWallpaperSuccess(response.data))
                    return
                case 'popular':
                    dispatch(getPopularWallpaperSuccess(response.data))
                    return
                case 'random':
                    dispatch(getRandomWallpaperSuccess(response.data))
                    return
            }
        } catch (error) {
            console.log(error)
            dispatch(getWallpaperFailure({ success: false, errorMessage: "Something went wrong please try again" }))
        }
    }
}

export const getAlbumGrid = (data) => {
    return async dispatch => {
        try {
            dispatch(getWallpaper())
            const response = await axios.get(`${Path.imagesUrl}?w=kw&slug=${data.slug}`)
            // console.log("GET ALBUMS URl", `${Path.albumUrl}?w=${data.type}&page=${data.page}`)
            dispatch(getAlbumGridSuccess(response.data))
        } catch (error) {
            // console.log(error)
            dispatch(getWallpaperFailure({ success: false, errorMessage: "Something went wrong please try again" }))
        }
    }
}