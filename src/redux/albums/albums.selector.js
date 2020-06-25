import { createSelector } from 'reselect';

const selectAlbum = state => state.albums

export const selectAlbumNew = createSelector(
    [selectAlbum],
    albums => albums.new
)

export const selectAlbumFeatured = createSelector(
    [selectAlbum],
    albums => albums.featured
)
export const selectAlbumRandom = createSelector(
    [selectAlbum],
    albums => albums.random
)
export const selectAlbumPopular = createSelector(
    [selectAlbum],
    albums => albums.popular
)

export const selectAlbumGrid = createSelector(
    [selectAlbum],
    albums => albums.albumGrid
)

export const selectalbumLoading = createSelector(
    [selectAlbum],
    albums => albums.isloading
)