import {
    createSwitchNavigator,
    createAppContainer
} from "react-navigation";
import Login from './components/Login';

/**
* - AppSwitchNavigator
*    - AuthenticationScreen
*    - HomeScreenNavigation
*          - HomeScreen - HomeScreenStackNavigator(needed for header and to change the header based on the tab)
*            - HomeScreenTabNavigator
*              - Tab 1 - HomeStack
*            - Any files you don't want to be a part of the Tab Navigator can go here.
*/


const AppSwitchNavigator = createSwitchNavigator(
    {
        Authentication: { screen: Login }, // AUthentication Screen
        // Home: { screen: HomeScreenNavigation }  // Home SCreen navigation
    },
    {
        initialRouteName: "Authentication"
    }
);

export const Navigation = createAppContainer(AppSwitchNavigator);
