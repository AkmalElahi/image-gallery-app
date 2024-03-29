import React, { useEffect, useState } from 'react'
import { FlatList, Dimensions, Image, StyleSheet, TouchableOpacity, ImageBackground, Text, Animated, ActivityIndicator } from 'react-native';
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

const MainTab = ({ navigation, onScroll, getAlbums, getWallpapers, currentTab, onStartShouldSetResponderCapture }) => {
    const [wapllpaperPage, setWallpaperPage] = useState(1)
    const [albumPage, setAlbumPage] = useState(1)

    const [active, setActive] = useState('wallpaper')

    const getData = () => {
        if (active === 'wallpaper') {
            getWallpapers({ type: currentTab, page: wapllpaperPage })
            return
        }
        if (active === 'album') {
            getAlbums({ type: currentTab, page: albumPage })
            return
        }

    }
    // const SetTab=(i) =>{
    //     console.log(i)
    // }
    // useEffect(() => {
    //     getData(currentTab)
    // }, []);
    useEffect(() => {
        getData()
    }, [active, albumPage, wapllpaperPage]);
    return (
        // <Tabs
        //     style={{ backgroundColor: colors.background }}
        //     tabContainerStyle={{ elevation: 100, backgroundColor: colors.background, width: "65%" }}
        //     tabBarUnderlineStyle={{ backgroundColor: colors.background }}
        // >
        //     {/* {console.log(type)} */}
        //     <Tab heading={'WALLPAPERS'} tabStyle={styles.tabs} textStyle={{ color: 'grey', fontSize: 12 }} activeTabStyle={{ backgroundColor: colors.background, }} activeTextStyle={{ color: colors.highlight, fontSize: 12 }}>
        //         <WallpaperTab
        //             navigation={navigation}
        //             onScroll={onScroll}
        //         />
        //     </Tab>
        //     <Tab heading={'ALBUMS'} tabStyle={styles.tabs} textStyle={{ color: 'grey', fontSize: 12 }} activeTabStyle={{ backgroundColor: colors.background, }} activeTextStyle={{ color: colors.highlight, fontSize: 12 }}>
        //         <AlbumTab
        //             navigation={navigation}
        //             onScroll={onScroll}
        //         />
        //     </Tab>

        // </Tabs>
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <View style={{ height: 45, flexDirection: 'row', alignItems: 'center', backgroundColor: colors.background, padding: 0 }}>
                <Text onPress={() => {
                    setActive('wallpaper')
                }
                } style={{ height: '100%', textAlign: 'center', fontSize: 12, color: `${active === 'wallpaper' ? colors.highlight : 'grey'}`, width: '35%', padding: 16, paddingLeft: 3 }}>WALLPAPERS</Text>
                <Text onPress={() => { setActive('album') }} style={{ height: '100%', textAlign: 'center', fontSize: 12, color: `${active === 'album' ? colors.highlight : 'grey'}`, width: '35%', padding: 16, paddingLeft: 0 }}>ALBUMS</Text>
            </View>
            {/* {console.log("ALBUM PAGE",albumPage, "WALLPAPER PAGE", wapllpaperPage, currentTab)} */}

            {active === 'wallpaper' ? (<WallpaperTab
                currentTab={currentTab}
                navigation={navigation}
                // onScroll={onScroll}
                page={wapllpaperPage}
                setPage={setWallpaperPage}
            // loadMore={getData}
            />) : (
                    <AlbumTab
                        currentTab={currentTab}
                        page={albumPage}
                        setPage={setAlbumPage}
                    />
                )}
            {/* {(wallpaper.isloading || albums.isloading) && (wapllpaperPage > 1 || albumPage > 1) && <View style={{
                height: 50,
                justifyContent: 'center',
                alignItems: 'center'
            }}><ActivityIndicator color={colors.highlight} /></View>} */}
        </View>

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
// const mapStateToProps = ({ albums, wallpaper }) => ({
//     albums,
//     wallpaper
// })
const mapDispatchToProps = dispatch => ({
    getAlbums: data => dispatch(getAlbumMiddleware(data)),
    getWallpapers: data => dispatch(getWallpaperMiddleware(data))
})
export default connect(null, mapDispatchToProps)(MainTab)