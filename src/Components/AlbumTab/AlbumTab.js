import React, { PureComponent, useState } from 'react'
import { Animated, ImageBackground, View, Text, Dimensions, ActivityIndicator, TouchableWithoutFeedback, TouchableOpacity } from "react-native"
import { Card, CardItem } from "native-base"
import { colors } from "../../configs/colors"
import { connect } from 'react-redux'
import WallpaperTab from '../WallpaperTab/WallpaperTab'
import { images } from '../../data/data'
import AlbumsGrid from '../AlbumGrid/AlbumGrid'
const { width, height } = Dimensions.get('window')

class AlbumContainer extends PureComponent {
    render() {
        const { item: { item }, setGridState, navigation } = this.props
        return (
            <Card style={{
                backgroundColor: 'rgba(20, 20, 20, 0.5)',
                paddingVertical: 2,
                marginBottom: 0,
                marginTop: 0,
                borderWidth: 0,
                width: width,
                height: height / 5,
                borderColor: colors.background
            }} >
                {/* <CardItem
                    // button
                    // onPress={() => navigation.navigate('wallpaper', {
                    //     album: albums.indexOf(item)
                    // })}
                    cardBody style={{ marginHorizontal: 10, backgroundColor: colors.background }}>
                </CardItem> */}
                <ImageBackground source={{ uri: item.thumb }} style={{
                    height: height / 5,
                    width: width - 3,
                    marginVertical: 2,
                    alignSelf: 'center',
                    justifyContent: 'center',
                }} >
                    <TouchableOpacity onPress={() => navigation.navigate('albumGrid', {
                        slug: item.slug,
                        title:item.title
                    })} style={{
                        flex: 1,
                        backgroundColor: 'rgba(20, 20, 20, 0.5)',
                        justifyContent: 'center',
                    }}>
                        <Text style={{
                        paddingHorizontal: 38,
                        textAlign: 'center',
                        color: 'rgba(255,255,255,0.9)',
                        fontSize: 23,
                        fontWeight: 'bold'
                    }}>{item.title}</Text>
                    <Text style={{
                        paddingHorizontal: 38,
                        textAlign: 'center',
                        color: 'rgba(255,255,255,0.7)',
                        fontSize: 14,
                        fontWeight: 'bold'
                    }}>{item.photos} wallpapers</Text>
                    </TouchableOpacity>
                </ImageBackground>
            </Card >
        )
    }
}


const AlbumTab = ({ onScroll, albums, currentTab, page, setPage, wallpapers, navigation }) => {
    const [gridStete, setGridState] = useState({ showGrid: false, slug: '' })
    // console.log(gridStete)
    return (
        // gridStete.showGrid ?
        (
            // <AlbumsGrid slug={gridStete.slug} />) : (
            !albums.length ? <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}><ActivityIndicator color={colors.highlight} /></View> :
                <Animated.FlatList
                    scrollEventThrottle={16}
                    onScroll={onScroll}
                    showsVerticalScrollIndicator={false}
                    style={{ backgroundColor: colors.background }}
                    data={albums}
                    numColumns={1}
                    onEndReached={({ distanceFromEnd }) => {
                        setPage(page + 1)
                    }}
                    renderItem={(item) => (<AlbumContainer navigation={navigation} setGridState={setGridState} item={item} />)}
                    keyExtractor={(item) => item.title}
                />)
    )
}


export default AlbumTab