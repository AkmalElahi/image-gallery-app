import React, { useEffect, useState } from 'react'
import { FlatList, Dimensions, Image, StyleSheet, TouchableOpacity, ImageBackground, Text, Animated } from 'react-native';
import { Container, Tabs, ScrollableTab, Tab, Card, CardItem, Title, View } from 'native-base';
import { colors } from '../../configs/colors';
import FastImage from 'react-native-fast-image';
import { connect } from 'react-redux';
import { getAlbumMiddleware } from '../../redux/albums/albums.actions';
import { getWallpaperMiddleware } from '../../redux/wallpapers/wallpaper.actions';
import WallpaperTab from '../WallpaperTab/WallpaperTab';
import AlbumTab from '../AlbumTab/AlbumTab';
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height


//     there is 10px margin on the sides, 4px vertical separation between cards

// inside the card we have 38px horizontal padding and centered vertically

// album title can be one or two lines

// the cover image of each card has a gray overlay, is gray #141414 with 50% alpha or rgba(20, 20, 20, 0.5)

// album title text is 23px size, white with 90% opacity
// number of wallpapers text is 14px size, white with 70% opacity

// const getData = (getAlbums, getWallpapers, type) => {
//     getAlbums({ type: type.toLowerCase() }),
//         getWallpapers({ type: type.toLowerCase() })
// }
const MainTab = ({ wallpapers, navigation, onScroll, albums, getAlbums, getWallpapers, currentTab }) => {
    // const [type, setType] = useState('new')
    // const SetTab=(i) =>{
    //     console.log(i)
    // }
    // useEffect(() => {
    //     getData(getAlbums, getWallpapers, currentTab)
    // }, [type]);
    return (
        <Tabs
            style={{ backgroundColor: colors.background }}
            tabContainerStyle={{ elevation: 100, backgroundColor: colors.background, width: "65%" }}
            tabBarUnderlineStyle={{ backgroundColor: colors.background }}
        >
            {/* {console.log(type)} */}
            <Tab heading={'WALLPAPERS'} tabStyle={styles.tabs} textStyle={{ color: 'grey', fontSize: 12 }} activeTabStyle={{ backgroundColor: colors.background, }} activeTextStyle={{ color: colors.highlight, fontSize: 12 }}>
                <WallpaperTab
                    navigation={navigation}
                    onScroll={onScroll}
                />
            </Tab>
            <Tab heading={'ALBUMS'} tabStyle={styles.tabs} textStyle={{ color: 'grey', fontSize: 12 }} activeTabStyle={{ backgroundColor: colors.background, }} activeTextStyle={{ color: colors.highlight, fontSize: 12 }}>
                <AlbumTab
                    navigation={navigation}
                    onScroll={onScroll}
                />
            </Tab>

        </Tabs>

    )
}
const styles = StyleSheet.create({
    container: {
        marginTop: "3%",
        backgroundColor: colors.background
    },
    tabs: {
        backgroundColor: colors.background,
        // borderBottomWidth: 0,
        elevation: 100,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(20, 20, 20, 0.5)',
        justifyContent: 'center',
    }
})
const mapStateToProps = ({ albums: { albums }, wallpaper: { wallpapers } }) => ({
    albums,
    wallpapers
})
const mapDispatchToProps = dispatch => ({
    getAlbums: data => dispatch(getAlbumMiddleware(data)),
    getWallpapers: data => dispatch(getWallpaperMiddleware(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(MainTab)