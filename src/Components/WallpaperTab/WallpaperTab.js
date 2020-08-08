import React, { useEffect, useState, PureComponent } from 'react'
import { FlatList, TouchableOpacity, Dimensions, Animated, ActivityIndicator, View, ImageComponent } from 'react-native';
import FastImage from 'react-native-fast-image';
import { connect } from 'react-redux';
import { colors } from '../../configs/colors';
import { getWallpaperMiddleware } from '../../redux/wallpapers/wallpaper.actions';
import { userAction, types } from '../../configs/postActions';
const { width, height } = Dimensions.get('window')
let callOnScrollEnd = false
class ImageContainer extends PureComponent {
    state = {
        loaded: false
    }
    render() {
        const { item: { item }, index, navigation, images, currentTab } = this.props
        return (

            <TouchableOpacity style={{ backgroundColor: colors.imageBg, borderColor: 'black', borderWidth: 1 }} onPress={() => {
                userAction({ type: types.VIEW, wallpaperUrl: item.url })
                navigation?.navigate('wallpaper', {
                    wallpaperIndex: images.indexOf(item),
                    currentTab: currentTab
                })
            }}>
                {/* {images.length - 1 === images.indexOf(item) && console.log('end')} */}

                {/* <Image
                    force-cache={true}
                    source={{ uri: item.url }}
                    style={{ width: width / 3, height: height / 3 }} /> */}
                <FastImage
                    source={{
                        uri: item.thumbnail_url,
                        priority: FastImage.priority.high,
                    }}
                    style={{ width: width / 3, height: height / 3,  }}
                    // onLoadEnd={() => this.setState({ loaded: true })}
                />
            </TouchableOpacity>
        )
    }
}
// const getData = (getAlbums, getWallpapers, type) => {
//     getAlbums({ type: type.toLowerCase() }),
//         getWallpapers({ type: type.toLowerCase() })
// }
class WallpaperTab extends PureComponent {
    // useEffect(() =>
    //     getWallpapers({ type: type.toLowerCase() })
    //     , []);
    // { console.log(wallpaper) }
    render() {
        const { getWallpapers, onScroll, wallpapers, navigation, type, currentTab, loadMore, page, setPage } = this.props
        // console.log("COUNTS", page, currentTab)
        return (
            // (wallpaper.isloading && page === 1) ?
            //     <View style={{ flex: 1, backgroundColor: colors.background, }}>
            //         <ActivityIndicator color={colors.highlight} />
            //     </View> : 
            !wallpapers.length ? <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}><ActivityIndicator color={colors.highlight} /></View> :
                <Animated.FlatList
                    scrollEventThrottle={1}
                    initialNumToRender={10}
                    scrollEnabled={true}
                    nestedScrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                    style={{ backgroundColor: colors.background }}
                    data={wallpapers}
                    numColumns={3}
                    // onMomentumScrollBegin={() => { console.log(onEndReachedCalledDuringMomentum) }}
                    onEndReached={({ distanceFromEnd }) => {
                        setPage && setPage(page + 1)
                    }}

                    onScroll={onScroll}
                    onEndReachedThreshold={0.5}
                    renderItem={(item, index) => (<ImageContainer item={item} index={index} navigation={navigation} images={wallpapers} currentTab={currentTab} />)}
                    keyExtractor={(item, index) => index}
                />
        )

    }
}

// const mapStateToProps = ({ wallpaper }) => ({
//     wallpaper
// })
// const mapDispatchToProps = dispatch => ({
//     // getAlbums: data => dispatch(getAlbumMiddleware(data)),
//     getWallpapers: data => dispatch(getWallpaperMiddleware(data))
// })
export default WallpaperTab