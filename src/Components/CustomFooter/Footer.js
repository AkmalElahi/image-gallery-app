import React, { Component } from 'react';
import { StyleSheet, Image, Platform, Dimensions } from 'react-native';
import { Footer, FooterTab, Button, Text, View, Toast, Icon } from 'native-base';

const height = Dimensions.get('window').height
// console.log(height)
// #F52680
// #FD90C3
const CustomFooter = ({ isActive, navigation }) => {
    return (
        <Footer style={{ elevation: 0, backgroundColor: "black" }} >
            <FooterTab style={styles.footer}>
                <Button onPress={() => navigation.navigate("")}>
                    <Icon style={{ ...styles.icon, color: `${isActive === 'bookings' ? 'orange' : '#FFF'}` }} name='md-menu' />
                </Button>
                <Button onPress={() => navigation.navigate("home")}>
                    <Icon style={{ ...styles.icon, color: `${isActive === 'home' ? 'orange' : '#FFF'}` }} name='md-home' />
                </Button>
                <Button onPress={() => navigation.navigate("")}>
                    <Icon style={{ ...styles.icon, color: `${isActive === 'bookings' ? 'orange' : '#FFF'}` }} name='md-search' />
                </Button>
                <Button onPress={() => navigation.navigate("")}>
                    <Icon style={{ ...styles.icon, color: `${isActive === 'bookings' ? 'orange' : '#FFF'}` }} name='ios-add-circle-outline' />
                </Button>
            </FooterTab>
        </Footer>
    )
}
const styles = StyleSheet.create({
    footer: {
        marginTop: 0,
        marginBottom: 0,
        paddingBottom: 0,
        alignSelf: "flex-end",
        backgroundColor: "black"
    },
    items: {
        // textAlign:"center",
        // backgroundColor:"blue",
        position: 'absolute',
        display: "flex",
        alignSelf: "center",
        // backgroundColor:"green"
        // width: 50,
        // top: Platform.OS === 'ios' ? "20%" : "15%",
        // right: Platform.OS === 'ios' ? "10%" : "9.5%",
        // zIndex:-1
    },
    icon: {
        color: 'white'
    }
})
export default CustomFooter;