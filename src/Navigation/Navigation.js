import { createStackNavigator } from 'react-navigation-stack';
import Home from '../Screens/Home/Home';
import { createAppContainer } from 'react-navigation';
import WallPaper from '../Screens/Wallpaper/wallpaper';
import SearchScreen from '../Screens/Search/Search';
import { createDrawerNavigator } from 'react-navigation-drawer';
import DrawerContent from '../Components/Drawer/Drawer';
import { Dimensions, Text, View, Animated, Image, ScrollView, TouchableOpacity, Alert, Platform } from 'react-native';
import header from '../assets/app-header.png'
import React, { useRef, useState, useEffect } from 'react';
import { createMaterialTopTabNavigator, createBottomTabNavigator } from 'react-navigation-tabs';
import { colors } from '../configs/colors';
import { images } from '../data/data';
import NewTab from '../Screens/NewTab/NewTab';
import FeaturedTab from '../Screens/FeaturedTab/FeaturedTab';
import RandomTab from '../Screens/RandomTab/RandomTab';
import PopularTab from '../Screens/PopularTab/PopularTab';
import CustomFooter from '../Components/CustomFooter/Footer'
import { Footer, FooterTab, Button, Toast, Icon } from 'native-base';
import FAvoritesTab from '../Screens/FavoritesTab/FavoritesTab';
import AlbumGrid from '../Components/AlbumGrid/AlbumGrid';



const NAVBAR_HEIGHT = 50;
const scroll = new Animated.Value(0);
let headerY = Animated.multiply(Animated.diffClamp(scroll, 0, NAVBAR_HEIGHT), -1)
let tabY = Animated.subtract(headerY, scroll)
const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scroll } } }],
    // { useNativeDriver: true },
    {
        useNativeDriver: true,
        // listener: event => {
        //     // if (isCloseToBottom(event.nativeEvent)) {
        //     //     setpage(page + 1)
        //     // }
        //     isCloseToBottom(event.nativeEvent)
        // }
    }
)
let globalnavigation = null
export const navigator = (router, route, activeRouteToBe, activeRoute) => {
    activeRouteToBe !== activeRoute && (
        globalnavigation.setParams({ activeRoute: activeRouteToBe,  }),
        router(route)
    )
}
const Tabbar = ({ navigation }) => {
    globalnavigation = navigation
    const [activeRoute, setActiveRoute] = useState('home');
    useEffect(() => {
        // console.log("ROUTE", navigation.state.routes[1])
        const route = navigation.getParam('activeRoute')
        route && (setActiveRoute(route))
    }, [navigation.state.params])
    return (
        // <View style={{
        //     height: 50,
        //     backgroundColor: colors.background,
        //     flexDirection: "row",
        //     justifyContent: 'space-around',
        //     alignItems: 'center',
        // }}>
        //     {console.log(navigation.state.routeName)}
        //     <TouchableOpacity onPress={()=> {navigation.openDrawer()}}>
        //         <Text style={{ color: 'white' }}>New</Text>
        //     </TouchableOpacity>
        //     <TouchableOpacity onPress={()=> {navigation.navigate('search')}}>
        //         <Text style={{ color: 'white' }}>FEATURED</Text>
        //     </TouchableOpacity>
        //     <TouchableOpacity>
        //         <Text style={{ color: 'white' }}>POPULAR</Text>
        //     </TouchableOpacity>
        //     <TouchableOpacity>
        //         <Text style={{ color: 'white' }}>RANDOM</Text>
        //     </TouchableOpacity>


        // </View>
        <Footer style={{ elevation: 0, backgroundColor: colors.background }} >
            {/* {console.log("NAVIGATION IN FOOTER", activeRoute)} */}
            <FooterTab style={{
                marginTop: 0,
                marginBottom: 0,
                paddingBottom: 0,
                alignSelf: "flex-end",
                backgroundColor: colors.background
            }}>
                <Button
                    // onPress={() => { changeRoute(NavigaationService.openDrawer, 'drawer') }}
                    onPress={() => navigator(navigation.openDrawer, '', activeRoute)}
                >
                    <Icon style={{ color: `${activeRoute === 'drawer' ? colors.highlight : '#FFF'}` }} name='md-menu' />
                </Button>
                <Button
                    // onPress={() => { changeRoute(NavigaationService.navigate, 'home') }}
                    onPress={() => navigator(navigation.navigate, 'tabs', 'home', activeRoute)}
                >
                    <Icon style={{ color: `${activeRoute === 'home' ? colors.highlight : '#FFF'}` }} name='md-home' />
                </Button>
                <Button
                    // onPress={() => { changeRoute(NavigaationService.navigate, 'search') }}
                    onPress={() => navigator(navigation.navigate, 'search', 'search', activeRoute)}
                >
                    <Icon style={{ color: `${activeRoute === 'search' ? colors.highlight : '#FFF'}` }} name='md-search' />
                </Button>
                <Button
                    // onPress={() => { changeRoute(NavigaationService.navigate, '') }}
                    onPress={() => Alert.alert("Upload", "Upload wallpapers is coming soon. Stay tuned!", [], { cancelable: true })}
                >
                    <Icon style={{ color: `${activeRoute === '' ? colors.highlight : '#FFF'}` }} name='ios-add-circle-outline' />
                </Button>
            </FooterTab>
        </Footer>
    )
}
// class HomeScreen extends React.Component {
//     render() {
//         return (
//             <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//                 <Animated.FlatList
//                     scrollEventThrottle={1}
//                     initialNumToRender={10}
//                     scrollEnabled={true}
//                     nestedScrollEnabled={true}
//                     showsVerticalScrollIndicator={false}
//                     style={{ backgroundColor: colors.background }}
//                     data={images}
//                     numColumns={3}
//                     // onMomentumScrollBegin={() => { console.log(onEndReachedCalledDuringMomentum) }}
//                     // onEndReached={({ distanceFromEnd }) => {
//                     //     // loadMore(currentTab)
//                     // }}
//                     // onEndReached={() => callOnScrollEnd = true}
//                     // onMomentumScrollEnd={() => {
//                     //     console.log("end")
//                     // }}

//                     onScroll={onScroll}
//                     onEndReachedThreshold={0.5}
//                     renderItem={({ item }) => (
//                         <Image source={{ uri: item.url }} style={{
//                             height: 100,
//                             width: '100%'
//                         }} />
//                     )}
//                     keyExtractor={(item, index) => index}
//                 />
//             </View>
//         );
//     }
// }

// class SettingsScreen extends React.Component {
//     render() {
//         return (
//             <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//                 <Animated.FlatList
//                     scrollEventThrottle={1}
//                     initialNumToRender={10}
//                     scrollEnabled={true}
//                     nestedScrollEnabled={true}
//                     showsVerticalScrollIndicator={false}
//                     style={{ backgroundColor: colors.background }}
//                     data={images}
//                     numColumns={3}
//                     // onMomentumScrollBegin={() => { console.log(onEndReachedCalledDuringMomentum) }}
//                     // onEndReached={({ distanceFromEnd }) => {
//                     //     // loadMore(currentTab)
//                     // }}
//                     // onEndReached={() => callOnScrollEnd = true}
//                     // onMomentumScrollEnd={() => {
//                     //     console.log("end")
//                     // }}

//                     onScroll={onScroll}
//                     onEndReachedThreshold={0.5}
//                     renderItem={({ item }) => (
//                         <Image source={{ uri: item.url }} style={{
//                             height: 100,
//                             width: '100%'
//                         }} />
//                     )}
//                     keyExtractor={(item, index) => index}
//                 />
//             </View>
//         );
//     }
// }


const TabNavigator = createMaterialTopTabNavigator({
    New: {
        screen: NewTab,
        // navigationOptions: {
        //     tabBarLabel: <Text style={{ textAlign: 'center',  backgroundColor:"green" }}>NEW</Text>,

        // }
    },
    Featured: FeaturedTab,
    Random: RandomTab,
    Popular: PopularTab,
    Favorites: FAvoritesTab
    // }, {
    //     // tabBarComponent: Tabbar,
    //     style: {
    //         backgroundColor: colors.background,
    //         // marginTop:20,
    //         // transform: [{ translateY: headerY}],

    //     },
    //     tabStyle: {
    //         backgroundColor: colors.background,
    //         color: colors.background
    //     },

    // }
},
    {
        swipeEnabled: true,
        animationEnabled: true,
        tabBarOptions: {
            activeTintColor: colors.highlight,
            inactiveTintColor: 'grey',
            scrollEnabled: true,
            // width:60,
            tabStyle: {
        marginTop:Platform.OS === 'ios' ? 30 : 0,

                width: 100,
                // width:100,
                alignSelf: 'center',
                // backgroundColor:"green",
                padding: 0,
                paddingHorizontal: 5,
            },
            // indicatorStyle:{
            //     backgroundColor:'red',
            //     width:50,
            //     alignSelf:'center'
            // },

            // showLabel: false,
            style: {
                // shadowColor: 'rgba(58,55,55,0.1)',
                // shadowOffset: { width: 0, height: 0 },
                // shadowOpacity: 1,
                // shadowRadius: 15,
                // elevation: 3,
                // borderTopColor: 'transparent',
                backgroundColor: colors.background,
                width: Dimensions.get('window').width,
                justifyContent: 'flex-start',
                // borderTopLeftRadius: 20,
                // borderTopRightRadius: 20,
                // height: 52
            },
            activeTabStyle: {
                backgroundColor: colors.highlight,
                // borderBottomWidth: 4,
                // borderColor: '#6C1D7C'
            }
        },
    }
);
const HomeTabs = createBottomTabNavigator({
    tabs: {
        screen: TabNavigator,
        navigationOptions: {
            headerShown: false,
            gestureEnabled: false,
            // activeRoute: 'home'
        }
    },
    search: {
        screen: SearchScreen,
        navigationOptions: {
            headerShown: false,
            gestureEnabled: false,
            // activeRoute: 'search'
        }
    },
    albumGrid: {
        screen: AlbumGrid,
        navigationOptions: {
            headerShown: false,
            gestureEnabled: false
        }
    },

}, {
    tabBarComponent: Tabbar
})
// export default createAppContainer(TabNavigator);
const AppNavigator = createStackNavigator({
    home: {
        screen: HomeTabs,
        navigationOptions: {
            headerShown: false,
            gestureEnabled: false,
            // header: () => <View>
            //     <Image source={header} style={{ height: NAVBAR_HEIGHT, width: '100%' }} />
            // </View>
        }
    },
    wallpaper: {
        screen: WallPaper,
        navigationOptions: {
            headerShown: false,
            gestureEnabled: false,
        }
    },

    // albumGrid: {
    //     screen: AlbumGrid,
    //     navigationOptions: {
    //         headerShown: false,
    //         gestureEnabled: false
    //     }
    // },
},
    {
        initialRouteName: 'home',

        defaultNavigationOptions: ({ navigation }) => ({
            animationEnabled: false,
        })
    })

const Drawer = createDrawerNavigator(
    {
        App: {
            screen: AppNavigator,
        },
    },
    {
        //For the Custom sidebar menu we have to provide our CustomSidebarMenu
        contentComponent: DrawerContent,
        //Sidebar width
        drawerWidth: Dimensions.get('window').width - 100,
        // overlayColor: 'rgba(176,196,222,0.4)',
    },
);


export default createAppContainer(Drawer);