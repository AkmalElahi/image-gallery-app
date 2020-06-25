import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage'
import albumReducer from "./albums/albums.reducers";
import wallpaperReducer from "./wallpapers/wallpaper.reducers";
import searchHistoryReducer from "./SearchHistory/searchHistory.reducer";
import activeRouteReducer from "./activeRoute/activeRoute.reducer";


const config = {
    key: "root",
    storage: AsyncStorage,
    //   whitelist: ['search'],
    blacklist: ['wallpaper', 'albums']
}

const rootReducer = combineReducers({
    albums: albumReducer,
    wallpaper: wallpaperReducer,
    search: searchHistoryReducer,
    activeRoute: activeRouteReducer
});

export default persistReducer(config, rootReducer)