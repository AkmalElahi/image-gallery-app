import React, { useState, useEffect } from 'react'
import { View, TextInput, TouchableOpacity, FlatList, Dimensions, ActivityIndicator } from 'react-native';
import { Text, Header, Left, Icon, Body, Input, Right } from 'native-base';
import { colors } from '../../configs/colors';
import CustomFooter from '../../Components/CustomFooter/Footer';
import WallpaperTab from '../../Components/WallpaperTab/WallpaperTab';
import { connect } from 'react-redux';
import { getWallpaperMiddleware, clearSearch } from '../../redux/wallpapers/wallpaper.actions';
import FastImage from 'react-native-fast-image';
import { searchHistory, setSearchHistory } from '../../redux/SearchHistory/searchHistory.actions';
import { setActiveRoute } from '../../redux/activeRoute/activeRoute.actions';
const { width, height } = Dimensions.get('window')
// const historyContainer = ({ item, onPress }) => (
//     <View style={{ backgroundColor: colors.background, flex: 1, width: '100%' }}>
//         {console.log(item)}
//         <TouchableOpacity onPress={onPress} style={{ flexDirection: 'row', padding: 10, alignItems: 'center' }}>
//             <Icon name='md-refresh' style={{ color: '#fff', padding: 5, fontSize: 35 }} />
//             <Text style={{ color: 'white', paddingLeft: 10 }}>{item} </Text>
//         </TouchableOpacity>
//     </View>
// )
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
const SearchScreen = ({ navigation, searchWallpapers, clearSearch, wallpaper, getHistory, history, setHistory, setActiveRoute }) => {
    const [query, setQuery] = useState('')
    const [submitted, submit] = useState(false)

    useEffect(() => {
        if (submitted === true && !!query.length) {
            setHistory(query)
            searchWallpapers({ type: 'search', query: query })
        }
    }, [submitted]);
    useEffect(() => {
        getHistory(),
        setActiveRoute(navigation.state.routeName)
    }, []);


    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <Header androidStatusBarColor={colors.background} iosBarStyle="light-content"
                style={{
                    backgroundColor: 'lightgrey',
                    shadowColor: colors.background,
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 1,
                    shadowRadius: 2,
                    elevation: 100
                }}>
                <Left style={{ flex: 1, alignItems: 'center' }}>
                    <Icon onPress={() => {
                        clearSearch()
                        navigation.goBack(),
                        setActiveRoute('home')
                    }} name='arrow-back' />
                </Left>
                <Body style={{ flex: 5 }}>
                    <TextInput
                        onFocus={() => submit(false)}
                        value={query}
                        onChangeText={(text) => setQuery(text)}
                        keyboardType='default'
                        returnKeyType='search'
                        autoFocus={true}
                        onSubmitEditing={() => submit(true)}
                        style={{
                            color: '#000',
                            fontSize: 16,
                            fontWeight: 'bold',
                            flex: 1,
                            width: '100%'
                        }} />
                </Body>
                <Right style={{ flex: 1, alignItems: 'center' }}>
                    {!!query.length && <Icon onPress={() => setQuery('')} name='close' />}
                </Right>
            </Header>
            {/* <WallpaperTab /> */}
            {!wallpaper.isloading ? <FlatList
                scrollEventThrottle={16}
                scrollEnabled={true}
                nestedScrollEnabled={true}
                initialNumToRender={15}
                showsVerticalScrollIndicator={false}
                style={{ backgroundColor: colors.background }}
                data={wallpaper.searchedWallpapers}
                numColumns={3}
                renderItem={(item) => ImageContainer(item, navigation, wallpaper.wallpapers)}
                keyExtractor={(item, index) => index}
            /> : <View style={{ backgroundColor: colors.background, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator color={colors.highlight} />
                </View>}
            <View style={{ position: 'absolute', top: 55, left: 0, right: 0 }}>
                {!submitted && <FlatList
                    horizontal={false}
                    scrollEnabled={false}
                    initialNumToRender={5}
                    maxToRenderPerBatch={5}
                    style={{ backgroundColor: colors.background, maxHeight:320 }}
                    data={history}
                    renderItem={({ item }) => {
                        return (
                            <View style={{ backgroundColor: colors.background, flex: 1, width: '100%' }}>
                                <TouchableOpacity onPress={() => {
                                    setQuery(item.query),
                                        submit(true)
                                }} style={{ flexDirection: 'row', padding: 10, alignItems: 'center' }}>
                                    <Icon name='md-refresh' style={{ color: '#fff', padding: 5, fontSize: 35 }} />
                                    <Text style={{ color: 'white', paddingLeft: 10 }}>{item.query} </Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }
                    }
                    keyExtractor={(item) => item.id}
                />}
            </View>
        </View>
    )
}
const mapStateToProps = ({ wallpaper, search: { history } }) => ({
    wallpaper,
    history
})
const mapDispatchToProps = dispatch => ({
    searchWallpapers: data => dispatch(getWallpaperMiddleware(data)),
    clearSearch: () => dispatch(clearSearch()),
    getHistory: () => dispatch(searchHistory()),
    setHistory: data => dispatch(setSearchHistory(data)),
    setActiveRoute: data => dispatch(setActiveRoute(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen)