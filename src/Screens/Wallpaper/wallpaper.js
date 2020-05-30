import React from 'react'
import { View, Text, FlatList, Image, Dimensions, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import { images } from '../../data/data'
import CustomFooter from '../../Components/CustomFooter/Footer';
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const WallPaper = ({ navigation }) => (
    <View style={{ flex: 1 }}>
        {console.log(navigation.getParam('wallpaper'))}
        <Swiper
            index={navigation.getParam('wallpaper')}
            containerStyle={{ flex: 1, borderWidth: 0 }}
            loadMinimal={true}
            autoplay={false}
            loop={false}
            showsPagination={false}
            scrollEnabled={true}>
            {images.map(image => (
                <Image source={{ uri: image.url }} style={{ width, height }} />))}
        </Swiper>
        <CustomFooter navigation={navigation}/> 
    </View>
)
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
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
    }
})
export default WallPaper