import React from 'react';
import { StyleSheet, Image } from 'react-native'
import { Left, Body, Right, Header, Icon, Title, Badge, Text } from 'native-base';
import header from '../../assets/app-header.png'
import { colors } from '../../configs/colors';

const CustomHeader = ({ icon, leftButton, ishome, istransparent }) => {
    return (
        <Header style={{ ...styles.header, backgroundColor: `${istransparent ? 'transparent' : colors.background}` }} androidStatusBarColor={colors.background} >
            {/* <Left style={{ flex: 1 }}>
                <Icon onPress={leftButton} name={icon} style={{color:'#FFF'}} />
            </Left> */}
            <Body style={{ flex: 1 }}>
                {ishome && <Image source={header} style={{ width: '100%', height: "100%" }} />}
            </Body>
            {/* <Right style={{ flex: 1 }} >
            </Right> */}

        </Header>

    )
}


const styles = StyleSheet.create({
    header: {
        elevation: 0,
        borderBottomWidth: 0
        // width: "95%",
        // alignSelf: "center",
    }
})

export default CustomHeader;