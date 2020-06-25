import React, { Component } from 'react';
import { Content, View, Thumbnail, Icon, } from 'native-base';
import { StyleSheet, Image, Text, Dimensions, TouchableOpacity, Platform } from 'react-native'
import { colors } from '../../configs/colors';
import banner from '../../assets/banner.png'
import { connect } from 'react-redux';


const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const radius = width * 0.5


const DrawerContent = ({ navigation }) => {
    return (
        <Content style={styles.content}>
            <Image source={banner} style={{ width: '100%', height: 220 }} />
            <View style={styles.body}>
                <TouchableOpacity style={styles.row} onPress={()=> navigation.navigate('tabs')}>
                    <Icon name='home' style={styles.icon} />
                    <Text style={styles.text}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.row}>
                    <Icon name='heart' style={styles.icon} />
                    <Text style={styles.text}>Favorites</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.row}>
                    <Icon name='md-search' style={styles.icon} />
                    <Text style={styles.text}>Delete search history</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.row}>
                    <Icon name='md-refresh' style={styles.icon} />
                    <Text style={styles.text}>Clear app cache</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.row}>
                    <Icon name='star' style={{ ...styles.icon, color: colors.highlight }} />
                    <Text style={styles.text}>Rate us!</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.row}>
                    <Icon name='share' style={styles.icon} />
                    <Text style={styles.text}>Share this app</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity style={{...styles.row, paddingLeft:0}}>
                    <Text style={styles.text}>About us</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{...styles.row, paddingLeft:0}}>
                    <Text style={styles.text}>DMCA</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{...styles.row, paddingLeft:0}}>
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
        fontSize: 16
    },
    icon: {
        color: '#fff',
        fontSize: 20
    },
    footer: {
        marginTop:10,
        flex: 1
    }
})

export default DrawerContent