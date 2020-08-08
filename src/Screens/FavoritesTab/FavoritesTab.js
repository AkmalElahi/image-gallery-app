import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native';
import { colors } from '../../configs/colors';
import { connect } from 'react-redux';
import WallpaperTab from '../../Components/WallpaperTab/WallpaperTab';
import { withNavigationFocus } from 'react-navigation';
const FavoritesTab = ({ navigation, wallpapers, isFocused }) => {
    const [favorites, setFavorites] = useState([])
    // console.log("FAVORITES", wallpapers)
    useEffect(()=>{
        const favorites = wallpapers?.filter(wallpaper => wallpaper.isFavorite)
        setFavorites(favorites)
    },[isFocused])
    return (
        <View style={{ flex: 1, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }}>
            {!!favorites?.length ? (<WallpaperTab
                wallpapers={favorites}
                currentTab={'favorites'}
                navigation={navigation}
            />) :
                (< Text style={{ color: colors.highlight }}>
                    No saved favorites yet.
                </Text>)}
        </View >
    )
}
const mapStateToProps = ({ search: { wallpapers } }) => ({
    wallpapers
})
// const mapDispatchToProps = dispatch => ({
//     getAlbumGrid: data => dispatch(getAlbumGrid(data))
// })
export default connect(mapStateToProps)(withNavigationFocus(FavoritesTab))