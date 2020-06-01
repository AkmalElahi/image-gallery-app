import React from 'react'
import { FlatList, Dimensions, Image, StyleSheet, TouchableOpacity, ImageBackground, Text } from 'react-native';
import { Container, Tabs, ScrollableTab, Tab, Card, CardItem, Title } from 'native-base';
import { colors } from '../../configs/colors';
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height


//     there is 10px margin on the sides, 4px vertical separation between cards

// inside the card we have 38px horizontal padding and centered vertically

// album title can be one or two lines

// the cover image of each card has a gray overlay, is gray #141414 with 50% alpha or rgba(20, 20, 20, 0.5)

// album title text is 23px size, white with 90% opacity
// number of wallpapers text is 14px size, white with 70% opacity

const MainTab = ({ images, navigation, onScroll, albums }) => (
    <Tabs
        style={{ backgroundColor: colors.background }}
        tabContainerStyle={{ elevation: 100, backgroundColor: colors.background, width: "65%" }}
        tabBarUnderlineStyle={{ backgroundColor: colors.background }}
    // onChangeTab={(i) => this.setTab(i)}
    >
        <Tab heading={'WALLPAPERS'} tabStyle={styles.tabs} textStyle={{ color: 'grey', fontSize: 12 }} activeTabStyle={{ backgroundColor: colors.background, }} activeTextStyle={{ color: colors.highlight, fontSize: 12 }}>
            <>
                <FlatList
                    onScroll={onScroll}
                    showsVerticalScrollIndicator={false}
                    style={{ backgroundColor: colors.background }}
                    data={images}
                    numColumns={3}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => navigation.navigate('wallpaper', {
                            wallpaper: images.indexOf(item)
                        })}>
                            <Image source={{ uri: item.url }} style={{ width: width / 3, height: height / 3 }} />
                        </TouchableOpacity>
                    )}
                    keyExtractor={item => item.id}
                />
            </>
        </Tab>
        <Tab heading={'ALBUMS'} tabStyle={styles.tabs} textStyle={{ color: 'grey', fontSize: 12 }} activeTabStyle={{ backgroundColor: colors.background, }} activeTextStyle={{ color: colors.highlight, fontSize: 12 }}>
            <FlatList
                scrollEventThrottle={16}
                onScroll={onScroll}
                showsVerticalScrollIndicator={false}
                style={{ backgroundColor: colors.background }}
                data={albums}
                numColumns={1}
                renderItem={({ item }) => (
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
                            cardBody style={{ marginHorizontal: 10, backgroundColor:colors.background }}>
                            <ImageBackground source={{ uri: item.thumb }} style={{
                                height: height / 5,
                                width: null,
                                flex: 1,
                                justifyContent: 'center',
                            }} >
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
                            </ImageBackground>
                        </CardItem>
                    </Card>
                )}
                keyExtractor={item => item.id}
            />
        </Tab>

    </Tabs>

)
const styles = StyleSheet.create({
    container: {
        marginTop: "3%",
        backgroundColor: colors.background
    },
    tabs: {
        backgroundColor: colors.background,
        // borderBottomWidth: 0,
        elevation: 100,
    }
})
export default MainTab