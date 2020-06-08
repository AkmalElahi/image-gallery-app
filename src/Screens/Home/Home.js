// import React, { Component, useRef, useEffect, useState } from 'react'
// import { View, Text, FlatList, Image, Dimensions, StyleSheet, Animated } from 'react-native'
// import { Container, Tabs, ScrollableTab, Tab } from 'native-base';
import { images, albums } from '../../data/data'
import header from '../../assets/app-header.png'
import React, { Component, useEffect, useState } from "react";
import { Animated, Dimensions, Platform, Text, View, FlatList, Image, StyleSheet } from 'react-native';
import { Body, Header, List, ListItem as Item, ScrollableTab, Tab, Tabs, Title } from "native-base";

const NAVBAR_HEIGHT = 56;
const { width: SCREEN_WIDTH } = Dimensions.get("window");
import MainTab from '../../Components/MainTab/MainTab';
import { colors } from '../../configs/colors';
import { connect } from 'react-redux';
import { getAlbumMiddleware } from '../../redux/albums/albums.actions';
import { getWallpaperMiddleware } from '../../redux/wallpapers/wallpaper.actions';
import CustomFooter from '../../Components/CustomFooter/Footer';
// const { width } = Dimensions.get('window')
const TAB_PROPS = {
    tabStyle: { backgroundColor: colors.background },
    activeTabStyle: { backgroundColor: colors.background },
    textStyle: { color: "white" },
    activeTextStyle: { color: colors.highlight }
};
const tabs = [
    {
        heading: "NEW"
    },
    {
        heading: "FEATURED"
    },
    {
        heading: "POPULAR"
    },
    {
        heading: "FAVORITES"
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
const Home = ({ navigation, getAlbums, getWallpapers }) => {
    const [type, setType] = useState('new')
    const scroll = new Animated.Value(0);
    let headerY;

    headerY = Animated.multiply(Animated.diffClamp(scroll, 0, NAVBAR_HEIGHT), -1)
    let tabY = Animated.add(scroll, headerY)


    const setTab = (i) => {
        console.log("IN CHANGE TAB", i.ref.props.heading)
        setType(i.ref.props.heading)

    }
    useEffect(() => {
        getData(getAlbums, getWallpapers, type)
    }, [type]);

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

    return (
        <View style={{ backgroundColor: colors.background, flex:1 }}>
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
                <Header androidStatusBarColor={colors.background} style={{ backgroundColor: "transparent" }} hasTabs>
                    <Image source={header} style={{ width: '100%', height: '100%' }} />
                </Header>
            </Animated.View>
            <Animated.ScrollView
                scrollEventThrottle={1}
                bounces={false}
                showsVerticalScrollIndicator={false}
                style={{ zIndex: 0, height: "100%", elevation: -1 }}
                contentContainerStyle={{ paddingTop: NAVBAR_HEIGHT }}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scroll } } }],
                    { useNativeDriver: true },
                )}
                overScrollMode="never">
                <Tabs renderTabBar={(props) => <Animated.View
                    style={[{
                        transform: [{ translateY: tabY }],
                        zIndex: 1,
                        width: "100%",
                        backgroundColor: colors.background,
                        borderBottomColor: '#000'
                    }, Platform.OS === "ios" ? { paddingTop: 20 } : null]}>
                    <ScrollableTab {...props} style={{
                        backgroundColor: colors.background,
                        borderBottomColor: '#000',
                        // transform: [{ translateY: headerHeight }], 
                    }} />
                </Animated.View>
                }
                    onChangeTab={setTab}
                    tabBarUnderlineStyle={{ backgroundColor: colors.highlight }}
                >
                    {tabs.map(tab =>
                        <Tab heading={tab.heading} {...TAB_PROPS}>
                            <MainTab
                                navigation={navigation}
                                // images={images}
                                // albums={albums}
                                currentTab={tab.heading}
                            // onScroll={Animated.event(
                            //     [{ nativeEvent: { contentOffset: { y: scrollYAnimatedValue } } }],
                            //     { useNativeDriver: false }
                            // )}
                            />
                        </Tab>)}
                </Tabs>
            </Animated.ScrollView>
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
// const mapStateToProps = ({ albums: { albums }, wallpaper: { wallpapers } }) => ({
//     albums,
//     wallpapers
// })
const mapDispatchToProps = dispatch => ({
    getAlbums: data => dispatch(getAlbumMiddleware(data)),
    getWallpapers: data => dispatch(getWallpaperMiddleware(data))
})
export default connect(null, mapDispatchToProps)(Home)


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