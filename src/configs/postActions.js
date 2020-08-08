import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import { Path } from "./path";

export const types = {
    DOWNLOAD: "download",
    FAVORITE: "favorite",
    REPORT: "report",
    VIEW: "view"
}
let deviceID
const getUserId = async () => {
    deviceID = await AsyncStorage.getItem('deviceID');
}
const getWallpaperId = (url) => {
    // console.log(url)
    // console.log(url.split('/wp/wp')[1])
    return url?.split('/wp/wp')[1]
}
export const userAction = async ({ type, wallpaperUrl }) => {
    try {
        await getUserId()
        const wallpaperId = getWallpaperId(wallpaperUrl)
        const url = `${Path.actionUrl}/${type}?id=${wallpaperId}&uuid=${deviceID}`
        // console.log("URL", url)
        const { data } = await axios.post(url)
    } catch (error) {
        console.log("ERROR FROM POST ACTIONS", error)
    }
}