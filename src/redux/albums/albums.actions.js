import { albumActionTypes } from './albums.action.types'
import { Path } from '../../configs/path'
import axios from 'axios'

const getAlbums = () => ({
    type: albumActionTypes.GET_ALBUMS_REQUEST
})

const getAlbumsSuccess = albums => ({
    type: albumActionTypes.GET_ALBUMS_SUCCESS,
    payload: albums
})

const getAlbumsFailure = error => ({
    type: albumActionTypes.GET_ALBUMS_FAILURE,
    payload: error
})

export const getAlbumMiddleware = (data) => {
    return async dispatch => {
        try {
            dispatch(getAlbums())
            const response = await axios.get(`${Path.albumUrl}?w=${data.type}`)
            console.log("GET ALBUMS RESPONSE", response.data)
            dispatch(getAlbumsSuccess(response.data))
        } catch (error) {
            console.log(error)
            dispatch(getAlbumsFailure({ success: false, errorMessage: "Something went wrong please try again" }))
        }
    }
}