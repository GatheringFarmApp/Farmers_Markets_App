import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

import store from './store';

import ListScreen from "./screens/ListScreen";
import MapScreen from './screens/MapScreen';
import MarketScreen from "./screens/MarketScreen";
import NetworkStatusWrapper from "./components/NetworkStatusWrapper";
import StallScreen from "./screens/StallScreen";
import WelcomeScreen from './screens/WelcomeScreen';

export default class App extends Component {

    render() {

        const MainNavigator = createBottomTabNavigator({

            welcome: { screen: WelcomeScreen },
            map: { screen: MapScreen },
            list: { screen: ListScreen },
            details: createStackNavigator({
                market: { screen: MarketScreen },
                stall: { screen: StallScreen },
            }),

        }, {
            navigationOptions: {
                tabBarVisible: false,
            },
        });

        return (
            <Provider store={store}>
                <NetworkStatusWrapper>
                    <View style={styles.container}>
                        <MainNavigator />
                    </View>
                </NetworkStatusWrapper>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
