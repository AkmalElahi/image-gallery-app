import React from 'react';
import { Modal, Text, View, Alert, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
import { colors } from '../../configs/colors';
import { Icon } from 'native-base';
import ImageIcon from 'react-native-vector-icons/MaterialCommunityIcons';
const SetAsModal = ({ modalVisible, onclose, wallpaper, }) => (
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
                    Image info
                </Text>
                <View style={styles.buttonContainer} >
                    <Icon style={{ fontSize: 18, color: colors.iconColor }} name='md-calendar' />
                    <Text style={{ ...styles.btnText, marginLeft: '9%' }} >Published: </Text><Text style={{fontWeight:'bold'}}>{wallpaper?.published?.split(' ')[0]}</Text>
                </View >
                <View style={styles.buttonContainer} >
                    <Icon style={{ fontSize: 18, color: colors.iconColor }} name='md-document' />
                    <Text style={styles.btnText} >Filesize: </Text><Text style={{fontWeight:'bold'}}>{wallpaper?.filesize} Kb</Text>
                </View>
                <View style={styles.buttonContainer} >
                    <ImageIcon style={{ fontSize: 18, color: colors.iconColor }} name='image-size-select-large' />
                    <Text style={{ ...styles.btnText, marginLeft: '8%' }} >Dimensions: </Text><Text style={{fontWeight:'bold'}}>{wallpaper?.width}x{wallpaper?.height} px</Text>
                </View>
                <View style={styles.buttonContainer} >
                    <Icon style={{ fontSize: 18, color: colors.iconColor }} name='md-image' />
                    <Text style={styles.btnText} >Image type: </Text><Text style={{fontWeight:'bold'}}>{wallpaper?.type}</Text>
                </View>
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
        backgroundColor: "rgba(0, 0, 0, 0.6)"
    },
    modalView: {
        // paddingTop:"10%",
        // justifyContent: "space-around",
        // alignItems: "center",
        width: width * 0.8,
        height: height * 0.32,
        backgroundColor: "white",
        borderRadius: 15,
    },
    text: {
        marginTop: "8%",
        fontSize: 18,
        paddingLeft: '10%',
        fontWeight: 'bold'
        // textAlign: "center",
        // width: "90%",
    },
    buttonContainer: {
        marginTop: "5%",
        paddingLeft: '10%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    btnText: {
        marginLeft: '10%',
        textAlign: 'center',
        fontSize: 14,
        // fontWeight: 'bold'
    }
})
export default SetAsModal;