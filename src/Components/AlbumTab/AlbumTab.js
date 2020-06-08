import React from 'react'
import { Animated, ImageBackground, View, Text, Dimensions } from "react-native"
import { Card, CardItem } from "native-base"
import { colors } from "../../configs/colors"
import { connect } from 'react-redux'
const { width, height } = Dimensions.get('window')

const albumContainer = ({ item }) => (
    <Card style={{
        backgroundColor: 'rgba(20, 20, 20, 0.5)',
        paddingVertical: 2,
        marginBottom: 0,
        marginTop: 0,
        borderWidth: 0,
        borderColor: colors.background
    }} >
        <CardItem
            // button
            // onPress={() => navigation.navigate('wallpaper', {
            //     album: albums.indexOf(item)
            // })}
            cardBody style={{ marginHorizontal: 10, backgroundColor: colors.background }}>
            <ImageBackground source={{ uri: item.thumb }} style={{
                height: height / 5,
                width: null,
                flex: 1,
                justifyContent: 'center',
            }} >
                <View style={{
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
                </View>
            </ImageBackground>
        </CardItem>
    </Card>
)


const AlbumTab = ({ onScroll, albums }) => {
    return (
        <Animated.FlatList
            scrollEventThrottle={16}
            onScroll={onScroll}
            showsVerticalScrollIndicator={false}
            style={{ backgroundColor: colors.background }}
            data={albums}
            numColumns={1}
            renderItem={(item) => albumContainer(item)}
            keyExtractor={(item, index) => index}
        />
    )
}

const mapStateToProps = ({ albums: { albums } }) => ({
    albums
})

export default connect(mapStateToProps)(AlbumTab)