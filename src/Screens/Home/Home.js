// import React, { Component, useRef, useEffect, useState } from 'react'
// import { View, Text, FlatList, Image, Dimensions, StyleSheet, Animated } from 'react-native'
// import { Container, Tabs, ScrollableTab, Tab } from 'native-base';
import { images, albums } from '../../data/data'
import header from '../../assets/app-header.png'
import React, { Component, useEffect, useState, useRef } from "react";
import { Animated, Dimensions, Platform, Text, View, FlatList, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { Body, Header, List, ListItem as Item, ScrollableTab, Tab, Tabs, Title } from "native-base";

const NAVBAR_HEIGHT = 56;
const { width: SCREEN_WIDTH } = Dimensions.get("window");
import MainTab from '../../Components/MainTab/MainTab';
import { colors } from '../../configs/colors';
import { connect } from 'react-redux';
import { getAlbumMiddleware } from '../../redux/albums/albums.actions';
import { getWallpaperMiddleware } from '../../redux/wallpapers/wallpaper.actions';
import CustomFooter from '../../Components/CustomFooter/Footer';
const { width, height } = Dimensions.get('window')
const TAB_PROPS = {
    tabStyle: { backgroundColor: colors.background },
    activeTabStyle: { backgroundColor: colors.background },
    textStyle: { color: "white" },
    activeTextStyle: { color: colors.highlight }
};
const tabs = [
    {
        heading: "new"
    },
    {
        heading: "featured"
    },
    {
        heading: "popular"
    },
    {
        heading: "random"
    },
    {
        heading: "favorites"
    }
]


// const AnimatedTab = Animated.createAnimatedComponent(Tabs)




// const HEADER_MIN_HEIGHT = 0;
// const HEADER_MAX_HEIGHT = 60;
// const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT

const getData = (getAlbums, getWallpapers, type) => {
    getAlbums({ type: type.toLowerCase() }),
        getWallpapers({ type: type.toLowerCase() })
}
const Home = ({ navigation, albums, wallpaper }) => {
    // const [currentTab, setCurrentTab] = useState('new')
    // const [page, setpage] = useState(1)
    // const [active, setActive] = useState('wallpaper')
    // const [tabStatus, setTabStatus] = useState({
    //     currentTab: 'new',
    //     page: 1,
    //     active: 'wallpaper'
    // })
    // const _myScroll = useRef(null);

    const scroll = useRef(new Animated.Value(0)).current;


    const headerY = Animated.multiply(Animated.diffClamp(scroll, 0, NAVBAR_HEIGHT), -1)
    let tabY = Animated.add(scroll, headerY)


    const setTab = (i) => {
        // console.log("IN CHANGE TAB", i.ref.props.heading)
        // setType(i.ref.props.heading)
        setActive('wallpaper')
        setpage(1)
        _myScroll.current.scrollTo({ x: 0, y: 0, animated: true })

    }
    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        const paddingToBottom = 20
        // console.log({ layoutMeasurement, contentOffset, contentSize })
        if (contentOffset.y > 0 && !wallpaper.isloading) {
            if (layoutMeasurement.height + contentOffset.y >=
                contentSize.height - paddingToBottom) {
                setTabStatus({ ...tabStatus, page: tabStatus.page + 1 })
            }
        }
    }

    // useEffect(() => {
    //     getData(getAlbums, getWallpapers, type)
    // }, [type]);

    //     // const scrollYAnimatedValue = useRef(new Animated.Value(0))

    //     const headerHeight = scrollYAnimatedValue.interpolate(
    //         {
    //             // inputRange: [0, 0.8],
    //             // outputRange: [60, 0],
    //             // extrapolate: 'clamp',
    //             inputRange: [0, HEADER_SCROLL_DISTANCE],
    //             outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    //             extrapolate: 'clamp',
    //             useNativeDriver: true

    //         });

    //     // const headerBackgroundColor = scrollYAnimatedValue.current.interpolate(
    //     //     {
    //     //         inputRange: [(HEADER_MIN_HEIGHT - HEADER_MAX_HEIGHT),0],
    //     //         outputRange: [HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT],
    //     //         extrapolate: 'clamp',
    //     //         useNativeDriver: true
    //     //     });

    console.log("HERE HOME RENDERS ====>")
    return (
        <View style={{ backgroundColor: colors.background, flex: 1 }}>
            {Platform.OS === "ios" &&
                <View style={{ backgroundColor: colors.background, height: 20, width: "100%", position: "absolute", zIndex: 2 }} />}
            <Animated.View style={{
                width: "100%",
                position: "absolute",
                transform: [{
                    translateY: headerY
                }],
                elevation: 0,
                flex: 1,
                zIndex: 1,
                backgroundColor: colors.background
            }}>
                <Image source={header} style={{ backgroundColor: colors.background, width: width, height: NAVBAR_HEIGHT }} />
            </Animated.View>
            {/* <Animated.ScrollView
                ref={(myScrll) => _myScroll.current = myScrll}
                onResponderEnd={() => alert('end')}
                scrollEventThrottle={1}
                bounces={false}
                nestedScrollEnabled={true}
                scrollEnabled={true}
                showsVerticalScrollIndicator={false}
                // onMomentumScrollEnd={({ nativeEvent }) => {
                //     if (isCloseToBottom(nativeEvent)) {
                //         alert('end')
                //     }
                // }}
                style={{ zIndex: 0, height: "100%", elevation: -1, }}
                contentContainerStyle={{ paddingTop: NAVBAR_HEIGHT }}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scroll } } }],
                    // { useNativeDriver: true },
                    {
                        useNativeDriver: true,
                        listener: event => {
                            // if (isCloseToBottom(event.nativeEvent)) {
                            //     setpage(page + 1)
                            // }
                            isCloseToBottom(event.nativeEvent)
                        }
                    }
                )}
                // onScroll={Animated.event(
                //     [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
                //     {
                //       listener: event => {
                //         if (this.isCloseToBottom(event.nativeEvent)) {
                //           this.loadMoreData()
                //         }
                //       }
                //     }
                //   )}
                overScrollMode="never">
            </Animated.ScrollView> */}
                <Tabs renderTabBar={(props) => <Animated.View
                    style={[{
                        transform: [{ translateY: tabY }],
                        zIndex: 1,
                        width: "100%",
                        marginTop:NAVBAR_HEIGHT,
                        backgroundColor: colors.background,
                        borderBottomColor: '#000'
                    }, Platform.OS === "ios" ? { paddingTop: 20 } : null]}>
                    <ScrollableTab {...props} style={{
                        backgroundColor: colors.background,
                        borderBottomColor: '#000',
                        // transform: [{ translateY: headerHeight }], 
                    }} />
                    {/* <View style={{ height: 50, flexDirection: 'row', alignItems: 'center', }}>
                        <Text onPress={() => {
                            setTabStatus({
                                ...tabStatus,
                                active: 'wallpaper',
                                page: 1
                            })
                        }} style={{ height: '100%', textAlign: 'center', fontSize: 12, color: `${tabStatus.active === 'wallpaper' ? colors.highlight : 'grey'}`, width: '35%', padding: 16, paddingLeft: 3 }}>WALLPAPERS</Text>
                        <Text onPress={() => {
                            setTabStatus({
                                ...tabStatus,
                                active: 'album',
                                page: 1
                            })
                        }} style={{ height: '100%', textAlign: 'center', fontSize: 12, color: `${tabStatus.active === 'album' ? colors.highlight : 'grey'}`, width: '35%', padding: 16, paddingLeft: 0 }}>ALBUMS</Text>
                    </View> */}
                </Animated.View>
                }
                    // onChangeTab={(i) => {
                    //     // setCurrentTab(i.ref.props.heading.toLowerCase())
                    //     // setActive('wallpaper')
                    //     // setpage(1)
                    //     setTabStatus({
                    //         page: 1,
                    //         active: 'wallpaper',
                    //         currentTab: i.ref.props.heading.toLowerCase()
                    //     })
                    //     _myScroll.current.scrollTo({ x: 0, y: 0, animated: true })
                    // }}
                    tabBarUnderlineStyle={{ backgroundColor: colors.highlight }}
                >
                    {tabs.map(tab =>
                        <Tab heading={tab.heading.toUpperCase()} {...TAB_PROPS}>
                            <MainTab
                                // onStartShouldSetResponderCapture={() => {
                                //     setScroll(false);
                                //     if (_myScroll.current.contentOffset === 0
                                //         && enableScrollViewScroll === false) {
                                //         setScroll(true);
                                //     }
                                // }}
                                // page={tabStatus.page}
                                navigation={navigation}
                                // images={images}
                                // albums={albums}
                                // active={tabStatus.active}
                                currentTab={tab.heading}
                            // onScroll={Animated.event(
                            //     [{ nativeEvent: { contentOffset: { y: scrollYAnimatedValue } } }],
                            //     { useNativeDriver: false }
                            // )}
                            // onScroll={Animated.event(
                            //     [{ nativeEvent: { contentOffset: { y: scroll } } }],
                            //     { useNativeDriver: true },
                            // )}
                            />
                        </Tab>)}
                </Tabs>
                {/* {(wallpaper.isloading || albums.isloading) && tabStatus.page > 1 && <View style={{
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}><ActivityIndicator color={colors.highlight} /></View>} */}
            <CustomFooter isActive={'home'} navigation={navigation} />
        </View>
        //         <View style={[styles.container,]}>
        //             {console.log("INRENDER", type)}
        //             {/* <CustomHeader ishome={true} /> */}
        //             <Tabs
        //                 style={{
        //                     // transform: [{ translateY: headerBackgroundColor }],
        //                     // position:'absolute',
        //                     top: headerHeight
        //                 }}
        //                 tabBarBackgroundColor="#fff"
        //                 tabContainerStyle={{ elevation: 0 }} renderTabBar={() => <ScrollableTab style={{
        //                     backgroundColor: colors.background,
        //                     borderBottomColor: '#000',
        //                     // transform: [{ translateY: headerHeight }], 
        //                 }} />}
        //                 tabBarUnderlineStyle={{ backgroundColor: colors.highlight }}
        //                 onChangeTab={setTab}
        //             >
        //                 {tabs.map(tab =>
        //                     <Tab heading={tab.heading} tabStyle={styles.tabs} textStyle={{ color: 'grey', fontSize: 12 }} activeTabStyle={{ backgroundColor: colors.background, }} activeTextStyle={{ color: '#fff' }}>
        //                         <MainTab
        //                             navigation={navigation}
        //                             // images={images}
        //                             // albums={albums}
        //                             currentTab={tab.heading}
        //                             onScroll={Animated.event(
        //                                 [{ nativeEvent: { contentOffset: { y: scrollYAnimatedValue } } }],
        //                                 { useNativeDriver: false }
        //                             )}
        //                         />
        //                     </Tab>)}
        //             </Tabs>
        //             {/* <Animated.ScrollView style={[styles.container,{paddingTop:headerHeight}]}
        //             stickyHeaderIndices={[0]}
        //             onScroll={Animated.event(
        //                 [{ nativeEvent: { contentOffset: { y: scrollYAnimatedValue.current } } }],

        //             )}>
        //             </Animated.ScrollView> */}
        //             <CustomFooter isActive={'home'} navigation={navigation} />
        //             <Animated.View style={[styles.animatedHeaderContainer, { height: headerHeight, backgroundColor: colors.background }]}>
        //                 {/* <Animated.Image source={header} style={{ width: width, height: headerHeight }} /> */}
        //                 <Text>HEADER</Text>
        //             </Animated.View>
        //         </View>
    )
}

// }
const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background,
        flex: 1,
    },
    tabs: {
        backgroundColor: colors.background,
        borderBottomWidth: 0,
        borderColor: "black",
        elevation: 0,
    },
    animatedHeaderContainer: {
        position: 'absolute',
        top: (Platform.OS == 'ios') ? 20 : 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerText: {
        color: 'white',
        fontSize: 22
    },

})
// const mapStateToProps = ({ albums, wallpaper }) => ({
//     albums,
//     wallpaper
// })

export default Home


    // class Home extends Component {
    //     scroll = new Animated.Value(0);
    //     headerY;

    //     constructor(props) {
    //         super(props);
    //         this.headerY = Animated.multiply(Animated.diffClamp(this.scroll, 0, NAVBAR_HEIGHT), -1);
    //     }

    //     render() {
    //         // const tabContent = (
    //         //   <List>{new Array(20).fill(null).map((_, i) => <Item
    //         //     key={i}><Text>Item {i}</Text></Item>)}</List>);
    //         const tabY = Animated.add(this.scroll, this.headerY);
    //         return (
    //             <View>
    //                 {Platform.OS === "ios" &&
    //                     <View style={{ backgroundColor: COLOR, height: 20, width: "100%", position: "absolute", zIndex: 2 }} />}
    //                 <Animated.View style={{
    //                     width: "100%",
    //                     position: "absolute",
    //                     transform: [{
    //                         translateY: this.headerY
    //                     }],
    //                     elevation: 0,
    //                     flex: 1,
    //                     zIndex: 1,
    //                     backgroundColor: COLOR
    //                 }}>
    //                     <Header style={{ backgroundColor: "transparent" }} hasTabs>
    //                         <Body>
    //                             {/* <Title>
    //           <Text style={{color: "white"}}>
    //             Collapsing Navbar
    //           </Text>
    //         </Title> */}
    //                             <Image source={header} style={{ width: '100%', height: '100%' }} />

    //                         </Body>
    //                     </Header>
    //                 </Animated.View>
    //                 <Animated.ScrollView
    //                     scrollEventThrottle={1}
    //                     bounces={false}
    //                     showsVerticalScrollIndicator={false}
    //                     style={{ zIndex: 0, height: "100%", elevation: -1 }}
    //                     contentContainerStyle={{ paddingTop: NAVBAR_HEIGHT }}
    //                     onScroll={Animated.event(
    //                         [{ nativeEvent: { contentOffset: { y: this.scroll } } }],
    //                         { useNativeDriver: true },
    //                     )}
    //                     overScrollMode="never">
    //                     <Tabs renderTabBar={(props) => <Animated.View
    //                         style={[{
    //                             transform: [{ translateY: tabY }],
    //                             zIndex: 1,
    //                             width: "100%",
    //                             backgroundColor: COLOR
    //                         }, Platform.OS === "ios" ? { paddingTop: 20 } : null]}>
    //                         <ScrollableTab {...props} underlineStyle={{ backgroundColor: "white" }} />
    //                     </Animated.View>
    //                     }>
    //                         <Tab heading="Tab 1" {...TAB_PROPS}>
    //                             <FlatList
    //                                 data={images}
    //                                 renderItem={({ item }) => <Image
    //                                     source={{ uri: item.url }} style={{ width: '100%', height: 100 }}
    //                                 />}
    //                             />
    //                         </Tab>
    //                         <Tab heading="Tab 2" {...TAB_PROPS}>
    //                             <FlatList
    //                                 data={images}
    //                                 renderItem={({ item }) => <Image
    //                                     source={{ uri: item.url }} style={{ width: '100%', height: 100 }}
    //                                 />}
    //                             />
    //                         </Tab>
    //                     </Tabs>
    //                 </Animated.ScrollView>
    //             </View>
    //         );
    //     }
    // }
    // export default Home