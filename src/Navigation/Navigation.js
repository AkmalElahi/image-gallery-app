import { createStackNavigator } from 'react-navigation-stack';
import Home from '../Screens/Home/Home';
import { createAppContainer } from 'react-navigation';
import WallPaper from '../Screens/Wallpaper/wallpaper';
import SearchScreen from '../Screens/Search/Search';
import { createDrawerNavigator } from 'react-navigation-drawer';
import DrawerContent from '../Components/Drawer/Drawer';
import { Dimensions } from 'react-native';

const AppNavigator = createStackNavigator({
    home: {
        screen: Home,
        navigationOptions: {
            headerShown: false,
            gestureEnabled: false
        }
    },
    wallpaper: {
        screen: WallPaper,
        navigationOptions: {
            headerShown: false,
            gestureEnabled: false
        }
    },
    search: {
        screen: SearchScreen,
        navigationOptions: {
            headerShown: false,
            gestureEnabled: false
        }
    },
},
    {
        initialRouteName: 'home'
    })

const Drawer = createDrawerNavigator(
    {
        App: {
            screen: AppNavigator,
        },
    },
    {
        //For the Custom sidebar menu we have to provide our CustomSidebarMenu
        contentComponent: DrawerContent,
        //Sidebar width
        drawerWidth: Dimensions.get('window').width - 100,
        // overlayColor: 'rgba(176,196,222,0.4)',
    },
);


export default createAppContainer(Drawer);