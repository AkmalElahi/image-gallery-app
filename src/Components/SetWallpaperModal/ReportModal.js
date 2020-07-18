import React from 'react';
import { Modal, Text, View, Alert, StyleSheet, Dimensions, Image, TouchableOpacity, TextBase } from 'react-native';
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
import { colors } from '../../configs/colors';
import { Left, Right, Radio } from 'native-base';
const reasons = [
    "Sexual explicit",
    "Offensive",
    "Bad quality",
    "Copyrighted",
]
const ReportModal = ({ modalVisible, onclose, reportReason, setReason, onOk }) => (
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
                    Report image
                </Text>
                {reasons.map(reason => (
                    <TouchableOpacity key={reason} style={styles.buttonContainer} onPress={() => setReason(reason)}>
                        <Radio selectedColor={colors.highlight} color='black' selected={reason === reportReason} />
                        <Text style={styles.btnText} >{reason}</Text>
                    </TouchableOpacity >
                ))}
                <View style={{ height: 45, width: '100%', backgroundColor: colors.iconColor, flexDirection:'row', justifyContent:'flex-end' }}>
                    <TouchableOpacity style={styles.lowerBtns} onPress={onclose}>
                        <Text style={{...styles.btnText, color:colors.highlight, fontWeight:'bold'}} >CANCEL</Text>
                    </TouchableOpacity >
                    <TouchableOpacity style={styles.lowerBtns} disabled={!reportReason} onPress={onOk} >
                        <Text style={{...styles.btnText, color:colors.highlight, fontWeight:'bold'}}>OK</Text>
                    </TouchableOpacity >
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
        justifyContent: "space-between",
        // alignItems: "center",
        width: width * 0.8,
        height: height * 0.4,
        backgroundColor: "white",
        // borderRadius: 15,
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
        // marginTop: "5%",
        paddingLeft: '10%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    btnText: {
        paddingLeft: '10%',
        textAlign: 'center',
        fontSize: 14,
    },
    lowerBtns:{
        justifyContent:'center',
        width:100
    }
})
export default ReportModal;