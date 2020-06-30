import React from 'react';
import { Modal, Text, View, Alert, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
import { colors } from '../../configs/colors';
import { Icon } from 'native-base';
const SetAsModal = ({ modalVisible, onclose, setWallpaperFor }) => (
    // <View style={styles.modal}>
    // </View>
    <Modal transparent={true}
        animationType={"fade"}
        visible={modalVisible}
    // onRequestClose={this.closeModal}
    >
        <TouchableOpacity activeOpacity={1} style={styles.modal} onPress={onclose}>
            <View style={styles.modalView}>
                {/* <Image source={img} style={{width:50,height:50}}/> */}
                <Text style={styles.text}>
                    Set wallpaper
                </Text>
                <TouchableOpacity style={styles.buttonContainer} onPress={()=> setWallpaperFor('HOME')}>
                    <Icon style={{fontSize:18, color:colors.iconColor}} name='home' />
                    <Text style={styles.btnText} >Home Screen</Text>
                </TouchableOpacity >
                <TouchableOpacity style={styles.buttonContainer} onPress={()=> setWallpaperFor('LOCK')}>
                    <Icon style={{fontSize:18, color:colors.iconColor}} name='lock' />
                    <Text style={styles.btnText} >Lock Screen</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonContainer} onPress={()=> setWallpaperFor('BOTH')}>
                    <Icon style={{fontSize:18, color:colors.iconColor}} name='md-phone-portrait' />
                    <Text style={styles.btnText} >Home Screen and Lock Screen</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    </Modal>
);

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: "rgba(0, 0, 0, 0.7)"
    },
    modalView: {
        // paddingTop:"10%",
        // justifyContent: "center",
        // alignItems: "center",
        width: width * 0.8,
        height: height * 0.3,
        backgroundColor: "white",
        borderRadius: 15,
    },
    text: {
        marginTop: "8%",
        fontSize: 20,
        paddingLeft: '10%',
        fontWeight: 'bold'
        // textAlign: "center",
        // width: "90%",
    },
    buttonContainer: {
        marginTop: "6%",
        paddingLeft: '10%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    btnText: {
        paddingLeft: '10%',
        textAlign: 'center',
        fontSize: 14,
        // fontWeight: 'bold'
    }
})
export default SetAsModal;