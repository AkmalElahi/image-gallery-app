import { createSelector } from 'reselect';

const selectwallpaper = state => state.wallpaper

export const selectwallpaperNew = createSelector(
    [selectwallpaper],
    wallpaper => wallpaper.new
)

export const selectwallpaperFeatured = createSelector(
    [selectwallpaper],
    wallpaper => wallpaper.featured
)
export const selectwallpaperRandom = createSelector(
    [selectwallpaper],
    wallpaper => wallpaper.random
)
export const selectwallpaperPopular = createSelector(
    [selectwallpaper],
    wallpaper => wallpaper.popular
)
export const selectAlbumGrid = createSelector(
    [selectwallpaper],
    wallpaper => wallpaper.albumGrid
)
export const selectwallpaperLoading = createSelector(
    [selectwallpaper],
    wallpaper => wallpaper.isloading
)