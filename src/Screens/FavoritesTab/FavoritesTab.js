import React, { useEffect } from 'react'
import { View, Text } from 'react-native';
import { colors } from '../../configs/colors';
const FAvoritesTab = ({ }) => {
    return (
        <View style={{ flex: 1, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: colors.highlight }}>
                No saved favorites yet.
            </Text>
        </View>
    )
}
// const mapStateToProps = createStructuredSelector({
//     wallpapers: selectAlbumGrid,
//     // albums: selectAlbumNew,
//     // wallpapersLoading: selectwallpaperLoading,
//     // albumsLoading: selectalbumLoading
// })
// const mapDispatchToProps = dispatch => ({
//     getAlbumGrid: data => dispatch(getAlbumGrid(data))
// })
export default FAvoritesTab