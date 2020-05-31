import React from 'react'
import { FlatList, Dimensions, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Tabs, ScrollableTab, Tab } from 'native-base';
import { colors } from '../../configs/colors';
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height


const MainTab = ({ images, navigation, onScroll }) => (
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
                data={images}
                numColumns={3}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('wallpaper')}>
                        <Image source={{ uri: item.url }} style={{ width: width / 3, height: height / 3 }} />
                    </TouchableOpacity>
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