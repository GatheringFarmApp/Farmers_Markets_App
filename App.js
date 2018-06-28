import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

import store from './store';

import MapScreen from './screens/MapScreen';
import NetworkStatusWrapper from "./components/NetworkStatusWrapper";
import WelcomeScreen from './screens/WelcomeScreen';

export default class App extends Component {

    render() {

        const MainNavigator = createBottomTabNavigator({
            welcome: { screen: WelcomeScreen },
            map: { screen: MapScreen },
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
