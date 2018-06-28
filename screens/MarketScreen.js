import React, { Component } from 'react';
import { Permissions, Location } from 'expo';
import {
    Button,
    Dimensions,
    Image,
    Linking,
    Platform,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';

import { Icon } from 'react-native-elements';
import { HeaderBackButton } from 'react-navigation';

import MarketHeader from "../components/market/MarketHeader";
import MarketBasicInfo from "../components/market/MarketBasicInfo";
import MarketStalls from "../components/market/MarketStalls";

export default class MarketScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('market').name,
            // tabBarIcon: ({ tintColor }) => {
            //     return <Icon name='favourite' size={25} color={tintColor} />
            // },
            headerLeft: <HeaderBackButton onPress={() => navigation.navigate(navigation.getParam('backDestination') ? navigation.getParam('backDestination') : 'list')} />,
            headerStyle: {
                marginTop: Platform.OS === 'android' ? 24 : 0
            }
        };
    };

    state = {};

    // TODO This is repeated all over the place
    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }

        let { coords } = await Location.getCurrentPositionAsync();

        return coords;
    };

    componentWillMount() {
        this._getLocationAsync().then((coords) => {
            this.setState(
                {
                    userLocation: {
                        latitude: coords.latitude,
                        longitude: coords.longitude,
                    },
                }
            );
        });
    }

    render() {
        const market = this.props.navigation.getParam('market');

        return (
            <View style={styles.wrapper}>
                <ScrollView>

                    <MarketHeader
                        market={market}
                        navigate={this.props.navigation.navigate}
                    />

                    <MarketBasicInfo
                        market={market}
                        userLocation={this.state.userLocation}
                    />

                    <MarketStalls
                        stalls={market.stalls}
                        navigate={this.props.navigation.navigate}
                    />

                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        flexDirection: 'column',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});
