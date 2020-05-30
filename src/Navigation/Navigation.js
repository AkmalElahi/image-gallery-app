import { createStackNavigator } from 'react-navigation-stack';
import Home from '../Screens/Home/Home';
import { createAppContainer } from 'react-navigation';
import WallPaper from '../Screens/Wallpaper/wallpaper';

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
},
    {
        initialRouteName: 'home'
    })


export default createAppContainer(AppNavigator);