import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage'
import albumReducer from "./albums/albums.reducers";
import wallpaperReducer from "./wallpapers/wallpaper.reducers";


const config = {
    key: "root",
    storage: AsyncStorage,
    //   whitelist: ['admin'],
    blacklist: ['wallpaper', 'albums']
}

const rootReducer = combineReducers({
    albums: albumReducer,
    wallpaper: wallpaperReducer
});

export default persistReducer(config, rootReducer)