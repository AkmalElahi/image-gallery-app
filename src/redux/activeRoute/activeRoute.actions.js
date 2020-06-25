import { activeRouteActionTypes } from "./activeRoute.actions.types";


export const setActiveRoute = route => ({
    type: activeRouteActionTypes.SET_ACTIVE_ROUTE,
    payload: route
})