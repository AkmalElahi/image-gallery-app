
import { NavigationActions } from 'react-navigation';
import { DrawerActions } from 'react-navigation-drawer';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
    _navigator = navigatorRef;
}

function navigate(routeName, params) {
    _navigator.dispatch(
        NavigationActions.navigate({
            routeName,
            params,
        })
    );
    // console.log(_navigator.state)

}

function openDrawer() {
    _navigator.dispatch(
        DrawerActions.openDrawer()
    );
    // console.log(_navigator.state)

}
// add other navigation functions that you need and export them

export default {
    navigate,
    setTopLevelNavigator,
    openDrawer
};