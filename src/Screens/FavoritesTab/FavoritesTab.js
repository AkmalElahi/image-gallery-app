import React, { useEffect } from 'react'
import { View, Text } from 'react-native';
import { colors } from '../../configs/colors';
import { connect } from 'react-redux';
import WallpaperTab from '../../Components/WallpaperTab/WallpaperTab';
const FAvoritesTab = ({ navigation, wallpapers }) => {
    // console.log("FAVORITES", wallpapers)
    return (
        <View style={{ flex: 1, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }}>
            {!!wallpapers?.length ? (<WallpaperTab
                wallpapers={wallpapers}
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
export default connect(mapStateToProps)(FAvoritesTab)