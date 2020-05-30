import React from 'react'
import { View, Text, FlatList, Image, Dimensions, StyleSheet } from 'react-native'
import { Container, Tabs, ScrollableTab, Tab } from 'native-base';
import { images } from '../../data/data'
import CustomHeader from '../../Components/CustomHeader/Header'
import CustomFooter from '../../Components/CustomFooter/Footer'
import MainTab from '../../Components/MainTab/MainTab';

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
const Home = ({ navigation }) => (
    <Container style={styles.container}>
        <CustomHeader header=""  />
        <Tabs tabContainerStyle={{ elevation: 0, backgroundColor: "white" }} renderTabBar={() => <ScrollableTab style={{ backgroundColor: "white" }} />}
            tabBarUnderlineStyle={{ backgroundColor: 'orange' }}
        // onChangeTab={(i) => this.setTab(i)}
        >
            {tabs.map(tab =>
                <Tab heading={tab.heading} tabStyle={styles.tabs} textStyle={{ color: 'grey', fontSize: 12 }} activeTabStyle={{ backgroundColor: 'black', }} activeTextStyle={{ color: '#fff' }}>
                    <MainTab
                        navigation={navigation}
                        images={images}
                    />
                </Tab>)}
        </Tabs>
        <CustomFooter isActive={'home'} navigation={navigation} />
    </Container>
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
export default Home
