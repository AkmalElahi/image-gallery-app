import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, Image, Dimensions, StyleSheet, ImageBackground, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Swiper from 'react-native-swiper';
import { images, albums } from '../../data/data'
import CustomFooter from '../../Components/CustomFooter/Footer';
import CustomHeader from '../../Components/CustomHeader/Header';
import { Icon } from 'native-base';
import { colors } from '../../configs/colors';
import FastImage from 'react-native-fast-image';
import { connect } from 'react-redux';
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const WallPaper = ({ navigation, wallpapers }) => {
    const [opacity, setOpacity] = useState(0.7);
    // useEffect(() => {

    //     return () => clearInterval(t);
    // }, [opacity]);
    const wallpaper = navigation.getParam('wallpaper')
    const album = navigation.getParam('album')

    useEffect(() => {
        const intervalId = setInterval(() => {  //assign interval to a variaable to clear it
            if (opacity > 0) {
                console.log("OPA", opacity)
                setOpacity(opacity - 0.3)
            }
        }, 5)

        return () => clearInterval(intervalId); //This is important

    }, [opacity])
    return (
        <View style={{ flex: 1 }}>
            {/* <CustomHeader leftButton={() => navigation.goBack()} istransparent={true} ishome={false} icon={'arrow-back'} /> */}
            <Swiper
                index={wallpaper}
                containerStyle={{ flex: 1, borderWidth: 0, backgroundColor: colors.background }}
                loadMinimal={true}
                loadMinimalSize={0}
                autoplay={false}
                loop={false}
                showsPagination={false}
                scrollEnabled={true}>
                {wallpapers.map(image => (
                    <TouchableWithoutFeedback onPress={() => setOpacity(0.7)}>
                    <FastImage source={{ uri: image.url }} style={{ width, height }} />
                </TouchableWithoutFeedback>))}
            </Swiper>
            <TouchableOpacity style={styles.header} onPress={() => navigation.goBack()}>
                <Icon name='arrow-back' style={{ color: 'white' }} />
            </TouchableOpacity>
            <View style={styles.iconsContainer}>
                <TouchableOpacity style={{
                    backgroundColor: `rgba(${colors.backgroundRgba},${opacity})`,
                    ...styles.fadeButton
                }}>
                    <Icon name='md-heart-empty' style={styles.icon} />
                    {opacity > 0 && <Text style={styles.iconText}>FAVORITES</Text>}
                </TouchableOpacity>
                <TouchableOpacity style={{
                    backgroundColor: `rgba(${colors.backgroundRgba},${opacity})`,
                    ...styles.fadeButton
                }}>
                    <Icon name='arrow-down' style={styles.icon} />
                    {opacity > 0 && <Text style={styles.iconText}>DOWNLOAD</Text>}
                </TouchableOpacity>
                <TouchableOpacity style={{
                    backgroundColor: `rgba(${colors.backgroundRgba},${opacity})`,
                    ...styles.fadeButton
                }}>
                    <Icon name='md-phone-portrait' style={styles.icon} />
                    {opacity > 0 && <Text style={styles.iconText}>WALLPAPER</Text>}
                </TouchableOpacity>
                <TouchableOpacity style={{
                    backgroundColor: `rgba(${colors.backgroundRgba},${opacity})`,
                    ...styles.fadeButton
                }}>
                    <Icon name='md-share' style={styles.icon} />
                    {opacity > 0 && <Text style={styles.iconText}>SHARE</Text>}
                </TouchableOpacity>

            </View>

            {/* <CustomFooter navigation={navigation} /> */}
        </View>
    )
}
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    header: {
        // backgroundColor:"green",
        width:40,
        // alignContent:'center',
        alignItems:'center',
        justifyContent:'center',
        position: 'absolute',
        bottom: "93%",
        left: "5%",
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB'
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5'
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9'
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },
    iconsContainer: {
        position: 'absolute',
        top: '70%',
        flexDirection: "row",
        // alignItems: "stretch",
        justifyContent: 'space-between',
        width: "100%",
        alignSelf: 'center',
        // paddingHorizontal: 10
    },
    fadeButton: {
        width: 80,
        borderRadius: 10,
        alignItems: 'center',
        padding: 10
    },
    icon: {
        color: 'white'
    },
    iconText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold'
    }
})

const mapStateToProps = ({ wallpaper: { wallpapers } }) => ({
    wallpapers
})
export default connect(mapStateToProps)(WallPaper)