import React, { Component } from 'react'
import { View, Text, FlatList, Image, Dimensions, StyleSheet, Animated } from 'react-native'
import { Container, Tabs, ScrollableTab, Tab } from 'native-base';
import { images } from '../../data/data'
import header from '../../assets/app-header.png'
import CustomHeader from '../../Components/CustomHeader/Header'
import CustomFooter from '../../Components/CustomFooter/Footer'
import MainTab from '../../Components/MainTab/MainTab';
import { colors } from '../../configs/colors';

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

const HEADER_MIN_HEIGHT = 0;
const HEADER_MAX_HEIGHT = 60;

class Home extends Component {
    scrollYAnimatedValue = new Animated.Value(0);
    render() {
        const { navigation } = this.props
        let headerHeight = 60
        headerHeight = this.scrollYAnimatedValue.interpolate(
            {
                inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT)],
                outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
                extrapolate: 'clamp',
                useNativeDriver: true
            });

        // const headerBackgroundColor = this.scrollYAnimatedValue.interpolate(
        //     {
        //         inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT)],
        //         outputRange: ['#e91e63', '#1DA1F2'],
        //         extrapolate: 'clamp',
        //         useNativeDriver: true
        //     });
        return (
            <Animated.View style={[styles.container, { paddingTop: headerHeight }]}>

                {/* <CustomHeader ishome={true} /> */}
                <Tabs
                    tabBarBackgroundColor="#fff"
                    tabContainerStyle={{ elevation: 0 }} renderTabBar={() => <ScrollableTab style={{ backgroundColor: colors.background, borderBottomColor: '#000' }} />}
                    tabBarUnderlineStyle={{ backgroundColor: colors.highlight }}
                // onChangeTab={(i) => this.setTab(i)}
                >
                    {tabs.map(tab =>
                        <Tab heading={tab.heading} tabStyle={styles.tabs} textStyle={{ color: 'grey', fontSize: 12 }} activeTabStyle={{ backgroundColor: colors.background, }} activeTextStyle={{ color: '#fff' }}>
                            <MainTab
                                navigation={navigation}
                                images={images}
                                onScroll={Animated.event(
                                    [{ nativeEvent: { contentOffset: { y: this.scrollYAnimatedValue } } }]
                                )}
                            />
                        </Tab>)}
                </Tabs>
                <CustomFooter isActive={'home'} navigation={navigation} />
                <Animated.View style={[styles.animatedHeaderContainer, { height: headerHeight, backgroundColor: colors.background }]}>
                    <Image source={header} style={{ height: "100%", width: "100%" }} />
                </Animated.View>
            </Animated.View>
        )
    }
}
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
export default Home
