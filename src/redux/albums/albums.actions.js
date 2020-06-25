import { albumActionTypes } from './albums.action.types'
import { Path } from '../../configs/path'
import axios from 'axios'

const getAlbums = () => ({
    type: albumActionTypes.GET_ALBUMS_REQUEST
})

const getNewAlbumsSuccess = albums => ({
    type: albumActionTypes.GET_NEW_ALBUMS_SUCCESS,
    payload: albums
})
const getFeaturedAlbumsSuccess = albums => ({
    type: albumActionTypes.GET_FEATURED_ALBUMS_SUCCESS,
    payload: albums
})
const getPopularAlbumsSuccess = albums => ({
    type: albumActionTypes.GET_POPULAR_ALBUMS_SUCCESS,
    payload: albums
})
const getRandomAlbumsSuccess = albums => ({
    type: albumActionTypes.GET_RANDOM_ALBUMS_SUCCESS,
    payload: albums
})

const getAlbumGridSuccess = grid => ({
    type: albumActionTypes.GET_ALBUM_GRID_SUCCESS,
    payload: grid
})

const getAlbumsFailure = error => ({
    type: albumActionTypes.GET_ALBUMS_FAILURE,
    payload: error
})

export const getAlbumMiddleware = (data) => {
    return async dispatch => {
        try {
            dispatch(getAlbums())
            const response = await axios.get(`${Path.albumUrl}?w=${data.type}&page=${data.page}`)
            // console.log("GET ALBUMS URl", `${Path.albumUrl}?w=${data.type}&page=${data.page}`)
            switch (data.type) {
                case 'new':
                    dispatch(getNewAlbumsSuccess(response.data))
                    return
                case 'featured':
                    dispatch(getFeaturedAlbumsSuccess(response.data))
                    return
                case 'popular':
                    dispatch(getPopularAlbumsSuccess(response.data))
                    return
                case 'random':
                    dispatch(getRandomAlbumsSuccess(response.data))
                    return
            }
        } catch (error) {
            // console.log(error)
            dispatch(getAlbumsFailure({ success: false, errorMessage: "Something went wrong please try again" }))
        }
    }
}

export const getAlbumGrid = (data) => {
    return async dispatch => {
        try {
            dispatch(getAlbums())
            const response = await axios.get(`${Path.imagesUrl}?w=kw&slug=${data.slug}`)
            // console.log("GET ALBUMS URl", `${Path.albumUrl}?w=${data.type}&page=${data.page}`)
            dispatch(getAlbumGridSuccess(response.data))
        } catch (error) {
            // console.log(error)
            dispatch(getAlbumsFailure({ success: false, errorMessage: "Something went wrong please try again" }))
        }
    }
}