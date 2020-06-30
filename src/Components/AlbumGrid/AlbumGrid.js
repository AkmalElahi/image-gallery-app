import React, { useEffect } from 'react'
import { View, TouchableOpacity } from 'react-native';
import WallpaperTab from '../WallpaperTab/WallpaperTab';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectAlbumGrid } from '../../redux/wallpapers/wallpaper.selector';
import { getAlbumGrid } from '../../redux/wallpapers/wallpaper.actions';
import { colors } from '../../configs/colors';
import { Header, Title, Body, Text, Icon } from 'native-base';
import { setActiveRoute } from '../../redux/activeRoute/activeRoute.actions';
const AlbumsGrid = ({ wallpapers, getAlbumGrid, navigation, setActiveRoute }) => {
    const slug = navigation.getParam('slug')
    const title = navigation.getParam('title')

    useEffect(() => {
        getAlbumGrid({ slug });
        setActiveRoute('home')
    }, [slug, title]);
    console.log('RENDERED GRID', slug)
    return (
        <View style={{ flex: 1, backgroundColor: `rgba(${colors.backgroundRgba},${1})` }}>
            {/* <Header androidStatusBarColor={colors.background} style={{ backgroundColor: `rgba(${colors.backgroundRgba},${0.3})` }}>
                <Body style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                    <Title>slug</Title>
                </Body>
            </Header> */}
            <WallpaperTab wallpapers={wallpapers} currentTab='albumGrid' navigation={navigation} />
            <View style={{
                backgroundColor: `rgba(${colors.backgroundRgba},${0.9})`,
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 50,
                alignItems: 'center',
                // justifyContent,
                flexDirection: 'row'
            }}>
                <TouchableOpacity style={{ width: '10%', paddingLeft: 5, alignItems: 'center' }} onPress={() => navigation.goBack()}>
                    <Icon name='arrow-back' style={{ color: 'white' }} />
                </TouchableOpacity>
                <Text style={{
                    alignSelf: 'center',
                    width: '80%',
                    textAlign: 'center',
                    color: 'white'
                }}>{title}</Text>
            </View>
        </View>
    )
}
const mapStateToProps = createStructuredSelector({
    wallpapers: selectAlbumGrid,
    // albums: selectAlbumNew,
    // wallpapersLoading: selectwallpaperLoading,
    // albumsLoading: selectalbumLoading
})
const mapDispatchToProps = dispatch => ({
    getAlbumGrid: data => dispatch(getAlbumGrid(data)),
    setActiveRoute: data => dispatch(setActiveRoute(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(AlbumsGrid)