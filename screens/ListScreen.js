import React, {Component} from 'react';
import { Permissions, Location } from 'expo';
import {
    FlatList,
    StyleSheet,
    TouchableHighlight,
    View,
} from 'react-native';
import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/FontAwesome';

import distance from '../utils/distance';
import Header from "../components/Header";
import MarketListItem from "../components/list/MarketListItem";

class ListScreen extends Component {

    // TODO Default location?
    state = {
    };

    _getLocationAsync = async () => {
        let {status} = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }

        let {coords} = await Location.getCurrentPositionAsync();

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

        let sortedMarkets = this.props.markets;
        if (this.state.userLocation) {
            sortedMarkets = this.props.markets.map((market) => {
                const d = (distance(
                    market.coordinates,
                    this.state.userLocation,
                    'K'
                ) * 1000).toString().split('.')[0];

                return { ...market, distance: d }
            }).sort((marketA, marketB) => marketA.distance - marketB.distance);

            sortedMarkets = sortedMarkets.concat(sortedMarkets);

        }

        return (
            <View style={styles.wrapper}>
                {/*<Header />*/}
                <FlatList
                    data={sortedMarkets}
                    renderItem={(market) => <MarketListItem navigate={this.props.navigation.navigate} market={market} />}
                    keyExtractor={(market, index) => index + market.id.toString()}
                    extraData={this.state.userLocation}
                />
                <TouchableHighlight onPress={() => this.props.navigation.navigate('map')} style={ styles.viewSelector }>
                    <Icon name="map" size={20} color='rgba(0, 0, 0, 0.6)' />
                </TouchableHighlight>
            </View>
        );
    }
}

function mapStateToProps({marketsReducer}) {
    return { markets: marketsReducer };
}

export default connect(mapStateToProps, undefined)(ListScreen);

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        flexDirection: 'column',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        paddingTop: 20,
        paddingBottom: 20,
    },
    viewSelector: {
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 4,
        shadowOpacity: 0.6,
        borderRadius: 25,
        width: 50,
        height: 50,
        padding: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'absolute',
        right: 20,
        bottom: 20,
    }
});
