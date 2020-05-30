import React from 'react'
import { FlatList, Dimensions, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Tabs, ScrollableTab, Tab } from 'native-base';
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height


const MainTab = ({ images, navigation }) => (
    <Tabs
        style={{ backgroundColor: "black" }}
        tabContainerStyle={{ elevation: 0, backgroundColor: "black", width: "65%" }}
        tabBarUnderlineStyle={{ backgroundColor: 'black' }}
    // onChangeTab={(i) => this.setTab(i)}
    >
        <Tab heading={'WALLPAPERS'} tabStyle={styles.tabs} textStyle={{ color: 'grey' }} activeTabStyle={{ backgroundColor: 'black', }} activeTextStyle={{ color: 'orange' }}>
            <FlatList
                showsVerticalScrollIndicator={false}
                style={{ backgroundColor: "#000" }}
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
        </Tab>
        <Tab heading={'ALBUMS'} tabStyle={styles.tabs} textStyle={{ color: 'grey' }} activeTabStyle={{ backgroundColor: 'black', }} activeTextStyle={{ color: 'orange' }}>
            <FlatList
                showsVerticalScrollIndicator={false}
                style={{ backgroundColor: "#000" }}
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
        backgroundColor: "black"
    },
    tabs: {
        backgroundColor: "black",
        borderBottomWidth: 0,
        elevation: 0,
    }
})
export default MainTab