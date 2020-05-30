import React from 'react';
import { StyleSheet, Image } from 'react-native'
import { Left, Body, Right, Header, Icon, Title, Badge, Text } from 'native-base';

const CustomHeader = ({ icon, header, leftButton }) => {
    return (
        <Header style={styles.header} androidStatusBarColor="#fff" iosBarStyle="light-content">
            <Left style={{ flex: 1 }}>
                <Icon onPress={leftButton} name={icon} />
            </Left>
            <Body style={{ flex: 0 }}>
                <Title style={{ color: "#fff", fontWeight: "normal" }} >{header}</Title>
            </Body>
            <Right style={{ flex: 1 }} >
            </Right>

        </Header>

    )
}


const styles = StyleSheet.create({
    header: {
        backgroundColor: "transparent",
        elevation: 0,
        borderBottomWidth: 0
        // width: "95%",
        // alignSelf: "center",
    }
})

export default CustomHeader;