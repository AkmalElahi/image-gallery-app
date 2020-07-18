import React, { useState, useEffect } from 'react'
import { View, TextInput, TouchableOpacity, FlatList, Dimensions, ActivityIndicator, Keyboard } from 'react-native';
import { Text, Header, Left, Icon, Body, Input, Right } from 'native-base';
import { colors } from '../../configs/colors';
import CustomFooter from '../../Components/CustomFooter/Footer';
import WallpaperTab from '../../Components/WallpaperTab/WallpaperTab';
import { connect } from 'react-redux';
import { getWallpaperMiddleware, clearSearch } from '../../redux/wallpapers/wallpaper.actions';
import FastImage from 'react-native-fast-image';
import { searchHistory, setSearchHistory } from '../../redux/SearchHistory/searchHistory.actions';
import { setActiveRoute } from '../../redux/activeRoute/activeRoute.actions';
import { navigator } from '../../Navigation/Navigation';
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
        wallpaperIndex: images.indexOf(item),
        currentTab: 'searchedWallpapers'
    })}>
        {/* <Image
            force-cache={true}
            source={{ uri: item.url }}
            style={{ width: width / 3, height: height / 3 }} /> */}
        <FastImage
            source={{
                uri: item.thumbnail_url,
                priority: FastImage.priority.high,
            }}

            style={{ width: width / 3, height: height / 3 }}
        />
    </TouchableOpacity>
)
const SearchScreen = ({ navigation, searchWallpapers, clearSearch, wallpaper, getHistory, history, setHistory, setActiveRoute }) => {
    const [query, setQuery] = useState('')
    const [page, setWallpaperPage] = useState(1)
    const [submitted, submit] = useState(false)
    const [isListShow, showList] = useState(true)


    useEffect(() => {
        if (submitted === true && !!query.length) {
            setHistory(query)
            searchWallpapers({ type: 'search', query: query, page: 1 })
        }
    }, [submitted, query]);
    useEffect(() => {
        page > 1 && (searchWallpapers({ type: 'search', query: query, page: page }))
    }, [page])
    // useEffect(() => {
    // }, []);
    useEffect(() => {
        getHistory()
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                // getHistory()
                showList(true); // or some other action
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                showList(false); // or some other action
            }
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
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
                        setWallpaperPage(1),
                            submit(false)
                        setQuery('')
                        // navigation.setParams({ activeRoute: 'home' })
                        // navigation.navigate('tabs')
                        navigator(navigation.navigate, 'tabs', 'home', 'search')
                    }} name='arrow-back' />
                </Left>
                <Body style={{ flex: 5 }}>
                    <TextInput
                        onFocus={() => {
                            // showList(true)
                            submit(false)
                            // setWallpaperPage(1)
                        }}
                        value={query}
                        onChangeText={(text) => {
                            setQuery(text)
                            // submit(true)
                            // setWallpaperPage(1)
                        }}
                        keyboardType='default'
                        returnKeyType='search'
                        autoFocus={true}
                        onSubmitEditing={() => {
                            submit(true)
                            // showList(false)
                            setWallpaperPage(1)
                        }}

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
            {(!wallpaper.searchedWallpapers?.length && wallpaper.isloading) ?
                (<View style={{ backgroundColor: colors.background, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator color={colors.highlight} />
                </View>) :
                (<FlatList
                    scrollEventThrottle={16}
                    scrollEnabled={true}
                    nestedScrollEnabled={true}
                    initialNumToRender={15}
                    showsVerticalScrollIndicator={false}
                    style={{ backgroundColor: colors.background }}
                    data={wallpaper.searchedWallpapers}
                    numColumns={3}
                    onEndReached={({ distanceFromEnd }) => {
                        setWallpaperPage(page + 1)
                    }}
                    // inverted
                    onEndReachedThreshold={0.5}
                    renderItem={(item) => ImageContainer(item, navigation, wallpaper.searchedWallpapers)}
                    keyExtractor={(item, index) => index}
                />)}
            <View style={{ position: 'absolute', top: 55, left: 0, right: 0 }}>
                {isListShow && <FlatList
                    keyboardShouldPersistTaps={'handled'}
                    horizontal={false}
                    scrollEnabled={false}
                    // initialNumToRender={5}
                    maxToRenderPerBatch={5}
                    // inverted={true}
                    style={{ backgroundColor: colors.background, maxHeight: 320 }}
                    data={history}
                    renderItem={({ item }) => {
                        return (
                            <View style={{ backgroundColor: colors.background, flex: 1, width: '100%' }}>
                                <TouchableOpacity onPress={() => {
                                    setQuery(item.query)
                                    submit(true)
                                    Keyboard.dismiss()
                                    // showList(false)
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
})
export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen)