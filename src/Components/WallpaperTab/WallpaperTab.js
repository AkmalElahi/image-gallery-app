import React, { useEffect } from 'react'
import { FlatList, TouchableOpacity, Dimensions, Animated } from 'react-native';
import FastImage from 'react-native-fast-image';
import { connect } from 'react-redux';
import { colors } from '../../configs/colors';
import { getWallpaperMiddleware } from '../../redux/wallpapers/wallpaper.actions';
const { width, height } = Dimensions.get('window')

const ImageContainer = ({ item }, navigation, images) => (
    <TouchableOpacity onPress={() => navigation.navigate('wallpaper', {
        wallpaper: images.indexOf(item)
    })}>
        {/* <Image
            force-cache={true}
            source={{ uri: item.url }}
            style={{ width: width / 3, height: height / 3 }} /> */}
        <FastImage
            source={{
                uri: item.url,
                priority: FastImage.priority.high,
            }}

            style={{ width: width / 3, height: height / 3 }}
        />
    </TouchableOpacity>
)
// const getData = (getAlbums, getWallpapers, type) => {
//     getAlbums({ type: type.toLowerCase() }),
//         getWallpapers({ type: type.toLowerCase() })
// }
const WallpaperTab = ({ getWallpapers, onScroll, wallpaper, navigation, type }) => {
    // useEffect(() =>
    //     getWallpapers({ type: type.toLowerCase() })
    //     , []);
    return (
        <Animated.FlatList
            scrollEventThrottle={16}
            scrollEnabled={true}
            nestedScrollEnabled={true}
            initialNumToRender={15}
            onScroll={onScroll}
            showsVerticalScrollIndicator={false}
            style={{ backgroundColor: colors.background }}
            data={wallpaper.wallpapers}
            numColumns={3}
            renderItem={(item) => ImageContainer(item, navigation, wallpaper.wallpapers)}
            keyExtractor={(item, index) => index}
        />
    )
}

const mapStateToProps = ({ wallpaper }) => ({
    wallpaper
})
// const mapDispatchToProps = dispatch => ({
//     // getAlbums: data => dispatch(getAlbumMiddleware(data)),
//     getWallpapers: data => dispatch(getWallpaperMiddleware(data))
// })
export default connect(mapStateToProps)(WallpaperTab)