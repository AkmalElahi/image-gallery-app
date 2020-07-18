import React, { useState, useEffect } from 'react'
import { View, Text, BackHandler, Dimensions, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, ActivityIndicator, PermissionsAndroid, Platform, Share, Linking } from 'react-native';
import Swiper from 'react-native-swiper';
import { Icon, Toast } from 'native-base';
import { colors } from '../../configs/colors';
import FastImage from 'react-native-fast-image';
import { connect } from 'react-redux';
import ManageWallpaper, { TYPE } from 'react-native-manage-wallpaper';
// import CameraRoll from "@react-native-community/cameraroll";
import RNFetchBlob from 'rn-fetch-blob';
import SetAsModal from '../../Components/SetWallpaperModal/SetWallpaperModal';
import InfoModal from '../../Components/SetWallpaperModal/InfoModal';
import ReportModal from '../../Components/SetWallpaperModal/ReportModal';
import { userAction, types } from '../../configs/postActions';
import { addToFavorite, removeFromFavorite } from '../../redux/SearchHistory/searchHistory.actions';
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const WallPaper = ({ navigation, wallpaper, addToFavorite, favorites, removeFromFavorite }) => {
    const [opacity, setOpacity] = useState(0.7);
    const [showMore, setShowMore] = useState(false)
    const [modalVisible, setModal] = useState(false);
    const [infoModal, showInfoModal] = useState(false);
    const [reportModal, showReportModal] = useState(false);
    const [reason, setReason] = useState('');
    const [wallpapericonColor, setColor] = useState('white');
    const [settingWallPaper, setLoader] = useState(false);
    const [favoriteWallpaper, setFavorite] = useState(null);
    const [currentWallpaper, setCurrentWallpaper] = useState(null);
    const wallpaperIndex = navigation.getParam('wallpaperIndex')
    const currentTab = navigation.getParam('currentTab')
    const setWallpaper = () => {
        setOpacity(0.7)
        setModal(true)
        setColor(colors.highlight)
    }
    const closeModal = () => {
        setModal(false)
        showInfoModal(false)
        showReportModal(false)
        setColor('white')
        // setLoader(false)
    }
    const OnsetWallpaper = () => {
        setLoader(false)
        Toast.show({
            text: "Wallpaper set successfully",
            textStyle: { textAlign: "center", color: "black", },
            style: { marginBottom: '30%', width: "60%", alignSelf: "center", borderRadius: 25, backgroundColor: 'rgba(250,250,250,0.7)' },
            position: "bottom",
            // type: 'success',
            duration: 2000
        })
        setTimeout(() => BackHandler.exitApp(), 1200)
    }
    const _setWallpaper = (type) => {
        userAction({ type: types.DOWNLOAD, wallpaperUrl: currentWallpaper.url })
        closeModal()
        ManageWallpaper.setWallpaper({
            uri: currentWallpaper.url,
        }, () => OnsetWallpaper(), TYPE[type]);
    };
    async function hasAndroidPermission() {
        const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

        const hasPermission = await PermissionsAndroid.check(permission);
        if (hasPermission) {
            return true;
        }

        const status = await PermissionsAndroid.request(permission);
        return status === 'granted';
    }

    const getExtention = (filename) => {
        return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) :
            undefined;
    }
    const savePicture = async () => {
        userAction({ type: types.DOWNLOAD, wallpaperUrl: currentWallpaper.url })
        if (Platform.OS === "android" && !(await hasAndroidPermission())) {
            return;
        }
        var date = new Date();
        var image_URL = currentWallpaper.url;
        var ext = getExtention(image_URL);
        ext = "." + ext[0];
        const { config, fs } = RNFetchBlob;
        let PictureDir = fs.dirs.PictureDir
        let options = {
            fileCache: true,
            addAndroidDownloads: {
                useDownloadManager: true,
                notification: true,
                path: PictureDir + "/image_" + Math.floor(date.getTime()
                    + date.getSeconds() / 2) + ext,
                description: 'Image'
            }
        }
        config(options).fetch('GET', image_URL).then((res) => {
            Toast.show({
                text: "Wallpaper downloaded successfully",
                textStyle: { textAlign: "center", color: "black", },
                style: { marginBottom: '30%', width: "80%", alignSelf: "center", borderRadius: 25, backgroundColor: 'rgba(250,250,250,0.7)' },
                position: "bottom",
                // type: 'success',
                duration: 2000
            })

        });
        // CameraRoll.saveToCameraRoll(wallpaper[currentTab][wallpaperIndex].url);
    };
    useEffect(() => {
        if (!modalVisible) {
            setTimeout(() => {
                setOpacity(0)
            }, 700)
        }
    }, [opacity, modalVisible])
    const  imagePreload  = (wallpapers) =>{
        const sourses = []
        wallpapers.map(wallpaper =>  (
            sourses.push({uri:wallpaper.download_url})
        ))
        FastImage.preload(sourses)
    }
    useEffect(() => {
        setCurrentWallpaper(currentTab !== 'favorites' ? wallpaper[currentTab][wallpaperIndex] : favorites[wallpaperIndex])
        imagePreload(currentTab !== 'favorites' ? wallpaper[currentTab] : favorites)
    }, [])
    const handleViews = () => {
        showMore ? setShowMore(false) : setOpacity(0.7)
    }
    useEffect(() => {
        checkCurrentWallpaper()
    }, [currentWallpaper])
    const checkCurrentWallpaper = () => {
        // console.log({favorites, currentWallpaper})
        const isFavorite = favorites.find(wallpaper => (
            wallpaper.url === currentWallpaper?.url
        ))
        isFavorite ? setFavorite(isFavorite) : setFavorite(null)
    }
    const onOk = () => {
        showReportModal(false)
        reason === 'Copyrighted' ? (Linking.openURL('http://google.com/')) :
            (
                userAction({ type: types.REPORT, wallpaperUrl: currentWallpaper?.url }),
                Toast.show({
                    text: "Thank you!",
                    textStyle: { textAlign: "center", color: "black", },
                    style: { marginBottom: '30%', width: "80%", alignSelf: "center", borderRadius: 25, backgroundColor: 'rgba(250,250,250,0.7)' },
                    position: "bottom",
                    // type: 'success',
                    duration: 2000
                })
            )

    }
    const onShare = async () => {
        // console.log({currentWallpaper})
        const content = Platform.OS === 'ios' ? {
            message: 'hey checkout this cool wallpaper!',
            url: currentWallpaper.url
        } : {
                message: `hey checkout this cool wallpaper ${currentWallpaper.url}`,
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
            alert(error.message);
        }
    };
    return (
        <View style={{ flex: 1 }}>
            {/* <CustomHeader leftButton={() => navigation.goBack()} istransparent={true} ishome={false} icon={'arrow-back'} /> */}
            {/* {console.log(currentTab, wallpaperIndex)} */}
            <Swiper
                index={wallpaperIndex}
                containerStyle={{ flex: 1, borderWidth: 0, backgroundColor: colors.background }}
                loadMinimal={true}
                loadMinimalSize={2}
                autoplay={false}
                loop={false}
                onIndexChanged={(index) => setCurrentWallpaper(currentTab !== 'favorites' ? wallpaper[currentTab][index] : favorites[index])}
                onTouchStart={handleViews}
                loadMinimalLoader={<ActivityIndicator color={colors.highlight} />}
                showsPagination={false}
                scrollEnabled={true}>
                {currentTab !== 'favorites' ? (wallpaper[currentTab].map(image => (
                    <TouchableWithoutFeedback key={image} onPress={handleViews}>
                        <FastImage source={{
                            uri: image.url,
                            priority: FastImage.priority.high,
                        }} style={{ width, height }} />
                    </TouchableWithoutFeedback>))) : (favorites.map(image => (
                        <TouchableWithoutFeedback key={image} onPress={handleViews}>
                            <FastImage source={{
                                uri: image.url,
                                priority: FastImage.priority.high,
                            }} style={{ width, height }} />
                        </TouchableWithoutFeedback>)))}
            </Swiper>
            <View style={styles.header}>
                <TouchableOpacity style={styles.headerBtn} onPress={() => navigation.goBack()}>
                    <Icon name='arrow-back' style={{ color: 'white' }} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.headerBtn} onPress={() => setShowMore(true)}>
                    <Icon name='md-more' style={{ color: 'white' }} />
                </TouchableOpacity>
            </View>
            {!modalVisible && !settingWallPaper && < View style={styles.iconsContainer}>
                <TouchableOpacity onPress={() => {
                    !favoriteWallpaper ? (
                        addToFavorite(currentWallpaper),
                        userAction({ type: types.FAVORITE, wallpaperUrl: currentWallpaper?.url }),
                        setFavorite(currentWallpaper),
                        Toast.show({
                            text: "Wallpaper saved in favorites!",
                            textStyle: { textAlign: "center", color: "black", },
                            style: { marginBottom: '30%', width: "80%", alignSelf: "center", borderRadius: 25, backgroundColor: 'rgba(250,250,250,0.7)' },
                            position: "bottom",
                            // type: 'success',
                            duration: 1000
                        })) : (
                            removeFromFavorite(currentWallpaper),
                            setFavorite(null),
                            Toast.show({
                                text: "Wallpaper removed from favorites!",
                                textStyle: { textAlign: "center", color: "black", },
                                style: { marginBottom: '30%', width: "90%", alignSelf: "center", borderRadius: 25, backgroundColor: 'rgba(250,250,250,0.7)' },
                                position: "bottom",
                                // type: 'success',
                                duration: 1000
                            })
                        )
                }}
                    style={{
                        backgroundColor: `rgba(${colors.backgroundRgba},${opacity})`,
                        ...styles.fadeButton
                    }}>
                    <Icon name={`${favoriteWallpaper ? 'md-heart' : 'md-heart-empty'}`} style={styles.icon} />
                    {opacity > 0 && <Text style={styles.iconText}>FAVORITES</Text>}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => savePicture()} style={{
                    backgroundColor: `rgba(${colors.backgroundRgba},${opacity})`,
                    ...styles.fadeButton
                }}>
                    <Icon name='arrow-down' style={styles.icon} />
                    {opacity > 0 && <Text style={styles.iconText}>DOWNLOAD</Text>}
                </TouchableOpacity>
                <TouchableOpacity onPress={setWallpaper} style={{
                    backgroundColor: `rgba(${colors.backgroundRgba},${opacity})`,
                    ...styles.fadeButton
                }}>
                    <Icon name='md-phone-portrait' style={{ ...styles.icon, color: wallpapericonColor }} />
                    {opacity > 0 && <Text style={{ ...styles.iconText, color: wallpapericonColor }}>WALLPAPER</Text>}
                </TouchableOpacity>
                <TouchableOpacity onPress={onShare} style={{
                    backgroundColor: `rgba(${colors.backgroundRgba},${opacity})`,
                    ...styles.fadeButton
                }}>
                    <Icon name='md-share' style={styles.icon} />
                    {opacity > 0 && <Text style={styles.iconText}>SHARE</Text>}
                </TouchableOpacity>

            </View>}
            {showMore && <View style={styles.dropDown}>
                <TouchableOpacity style={{ alignItems: 'flex-start', width: '80%' }} onPress={() => {
                    showInfoModal(true)
                    setShowMore(false)
                }}>
                    <Text style={{ textAlign: 'left' }}>Image info</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ alignItems: 'flex-start', width: '80%' }} onPress={() => {
                    showReportModal(true)
                    setShowMore(false)
                }}>
                    <Text style={{ textAlign: 'left' }}>Report image...</Text>
                </TouchableOpacity>
            </View>}
            <SetAsModal modalVisible={modalVisible} onclose={closeModal} setWallpaperFor={_setWallpaper} />
            <InfoModal modalVisible={infoModal} onclose={closeModal} wallpaper={currentWallpaper} />
            <ReportModal modalVisible={reportModal} onclose={closeModal} onOk={onOk} reportReason={reason} setReason={(reason) => setReason(reason)} />
            {/* <CustomFooter navigation={navigation} /> */}
        </View >
    )
}
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    header: {
        height: 50,
        flexDirection: 'row',
        // alignContent:'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'absolute',
        top: height * 0.02,
        left: "3%",
        right: "3%"
    },
    headerBtn: {
        width: 40,
        alignItems: 'center',
        justifyContent: 'center'
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
    // loaderContainer: {
    //     position: 'absolute',
    //     top: '40%'

    // },
    fadeButton: {
        width: 80,
        // height:width * 0.22,
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
        // fontWeight: 'bold'
    },
    dropDown: {
        borderRadius: 5,
        position: 'absolute',
        height: 80,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white',
        top: height * 0.03,
        left: width * 0.60,
        right: "2%",
        borderWidth: 1,
        borderColor: 'white',
        marginBottom: 5,
        borderBottomWidth: 0,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.9,
        shadowRadius: 5,
        elevation: 20,
    }
})

const mapStateToProps = ({ wallpaper, search: { wallpapers } }) => ({
    wallpaper,
    favorites: wallpapers
})
const mapDispatchToProps = dispatch => ({
    addToFavorite: wallpaper => dispatch(addToFavorite(wallpaper)),
    removeFromFavorite: wallpaper => dispatch(removeFromFavorite(wallpaper))
})

export default connect(mapStateToProps, mapDispatchToProps)(WallPaper)