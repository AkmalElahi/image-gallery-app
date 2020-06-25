import React, { Component, useState } from 'react';
import { StyleSheet, Image, Platform, Dimensions } from 'react-native';
import { Footer, FooterTab, Button, Text, View, Toast, Icon } from 'native-base';
import { colors } from '../../configs/colors';
import NavigaationService from '../../Navigation/NavigaationService'
import { connect } from 'react-redux';
import { setActiveRoute } from '../../redux/activeRoute/activeRoute.actions';
import Navigation from '../../Navigation/Navigation';
const height = Dimensions.get('window').height
// console.log(height)
// #F52680
// #FD90C3

const CustomFooter = ({ activeRoute, setActiveRoute, navigation }) => {
    // const [activeRoute, setActiveRoute] = useState('home')
    const changeRoute = (routeFunction, activeRouteToBe) => {
        routeFunction(activeRouteToBe)
        setActiveRoute(activeRouteToBe)

    }
    return (
        <Footer style={{ elevation: 0, backgroundColor: colors.background }} >
            {/* {console.log("NAVIGATION IN FOOTER", activeRoute)} */}
            {console.log("ROUTE NAME",navigation.state.routeName)}
            <FooterTab style={styles.footer}>
                <Button 
                // onPress={() => { changeRoute(NavigaationService.openDrawer, 'drawer') }}
                onPress={()=>navigation.openDrawer()}
                >
                    <Icon style={{ ...styles.icon, color: `${activeRoute === 'drawer' ? colors.highlight : '#FFF'}` }} name='md-menu' />
                </Button>
                <Button 
                // onPress={() => { changeRoute(NavigaationService.navigate, 'home') }}
                onPress={()=>navigation.navigate('home')}
                >
                    <Icon style={{ ...styles.icon, color: `${activeRoute === 'home' ? colors.highlight : '#FFF'}` }} name='md-home' />
                </Button>
                <Button 
                // onPress={() => { changeRoute(NavigaationService.navigate, 'search') }}
                onPress={()=>navigation.navigate('search')}
                >
                    <Icon style={{ ...styles.icon, color: `${activeRoute === 'search' ? colors.highlight : '#FFF'}` }} name='md-search' />
                </Button>
                <Button 
                // onPress={() => { changeRoute(NavigaationService.navigate, '') }}
                onPress={()=>navigation.navigate('')}
                >
                    <Icon style={{ ...styles.icon, color: `${activeRoute === '' ? colors.highlight : '#FFF'}` }} name='ios-add-circle-outline' />
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
        backgroundColor: colors.background
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
const mapStateToProps = ({ activeRoute: { activeRoute } }) => ({
    activeRoute
})
const mapDispatchToProps = dispatch => ({
    setActiveRoute: activeRouteToBe => dispatch(setActiveRoute(activeRouteToBe))
})
// export default connect(mapStateToProps, mapDispatchToProps)(CustomFooter);

export default CustomFooter