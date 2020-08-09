import React, { Component } from 'react';
import { Content, View, Thumbnail, Icon, } from 'native-base';
import { StyleSheet, Image, Text, Dimensions, TouchableOpacity, NativeModules, Linking, Platform, Share } from 'react-native'
import { colors } from '../../configs/colors';
import banner from '../../assets/banner.png'
import { clearSearch } from '../../redux/wallpapers/wallpaper.actions';
import { deleteSearchHistory } from '../../redux/SearchHistory/searchHistory.actions';
import { connect } from 'react-redux';
import Toast from 'react-native-root-toast';
import { color } from 'react-native-reanimated';
var clearCacheModuleObj = NativeModules.ClearCacheModule;

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const radius = width * 0.5

const showToast = (text) => {
    // Toast.show({
    //     text: text,
    //     textStyle: { textAlign: "center", color: "black", },
    //     style: { marginBottom: '30%', width: "90%", alignSelf: "center", borderRadius: 25, backgroundColor: 'rgba(250,250,250,0.7)' },
    //     position: "bottom",
    //     duration: 1000
    // })
    Toast.show(text, {
        duration: Toast.durations.SHORT,
        position: -80,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        backgroundColor: 'rgba(250,250,250,1)',
        textColor:'black',
        styles:{borderRadius:25}
    });
}

const clearCache = (navigation) => {
    clearCacheModuleObj.clearAppCache(() => {
        navigation.closeDrawer()
        showToast('App cache data deleted')
    });
}
const onShare = async () => {
    // console.log({currentWallpaper})
    const content = Platform.OS === 'ios' ? {
        message: 'Hey! Checkout this WallpaperCave app',
        url: 'https://wallpapercave.com'
    } : {
            message: `Hey! Checkout this WallpaperCave app https://wallpapercave.com`,
        }
    try {
        const result = await Share.share(content);
        if (result.action === Share.sharedAction) {
            if (result.activityType) {
                // shared with activity type of result.activityType
            } else {
                // shared
            }
        } else if (result.action === Share.dismissedAction) {
            // dismissed
        }
    } catch (error) {
        console.log(error.message);
    }
}
const handleDeleteHistory = (navigation, deleteHistory) => {
    navigation.closeDrawer()
    deleteHistory()
    showToast('Search history deleted')
}



const DrawerContent = ({ navigation, deleteSearch }) => {
    return (
        <Content style={styles.content}>
            <Image source={banner} style={{ width: '100%', height: height * 0.3 }} />
            <View style={styles.body}>
                <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('tabs')}>
                    <Icon name='home' style={styles.icon} />
                    <Text style={styles.text}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('Favorites')}>
                    <Icon name='heart' style={styles.icon} />
                    <Text style={styles.text}>Favorites</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.row} onPress={() => handleDeleteHistory(navigation, deleteSearch)}>
                    <Icon name='md-search' style={styles.icon} />
                    <Text style={styles.text}>Delete search history</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.row} onPress={() => clearCache(navigation)}>
                    <Icon name='md-refresh' style={styles.icon} />
                    <Text style={styles.text}>Clear app cache</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.row} onPress={()=> alert("Rate us dialog will apppear here")}>
                    <Icon name='star' style={{ ...styles.icon, color: colors.highlight }} />
                    <Text style={styles.text}>Rate us!</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ ...styles.row, marginBottom: 60 }} onPress={onShare}>
                    <Icon name='md-share-social' style={styles.icon} />
                    <Text style={styles.text}>Share this app</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity style={{ ...styles.row, paddingLeft: 0 }} onPress={() => { Linking.openURL('https://wallpapercave.com/about') }}>
                    <Text style={styles.text}>About us</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ ...styles.row, paddingLeft: 0 }} onPress={() => { Linking.openURL('https://wallpapercave.com/dmca') }}>
                    <Text style={styles.text}>DMCA</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ ...styles.row, paddingLeft: 0 }} onPress={() => { Linking.openURL('https://wallpapercave.com/terms') }}>
                    <Text style={styles.text}>Terms of Services</Text>
                </TouchableOpacity>
            </View>
        </Content>
    );
}
const styles = StyleSheet.create({
    content: {
        backgroundColor: colors.background,
        // marginTop:"5%",
        marginBottom: 0,
        flexDirection: "column",
        paddingBottom: 0
    },
    body: {
        flex: 2,
        marginTop: 10,
        borderBottomColor: 'grey',
        borderBottomWidth: 0.5
    },
    row: {
        padding: 10,
        paddingLeft: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        color: '#fff',
        paddingLeft: 20,
        fontSize: 14
    },
    icon: {
        color: colors.drawerIcon,
        fontSize: 16
    },
    footer: {
        marginTop: 10,
        flex: 1
    }
})
const mapDispatchToProps = dispatch => ({
    deleteSearch: () => dispatch(deleteSearchHistory())
})
export default connect(null, mapDispatchToProps)(DrawerContent)