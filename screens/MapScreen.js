import React, {Component} from 'react';
import { MapView, Permissions, Location } from 'expo';
import {
    ActivityIndicator,
    StyleSheet,
    TouchableHighlight,
    View,
} from 'react-native';
import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/FontAwesome';

import Header from "../components/Header";
import MarketMarker from '../components/map/MarketMarker';
import MapMarketDetail from '../components/map/MapMarketDetail';

const SELECTED_MARKET_OFFSET = 0.005;

// TODO https://github.com/react-community/react-native-maps#animated-marker-position
class MapScreen extends Component {

    constructor(props) {
        super(props);
    }

    // TODO Default location?
    state = {
        mapLoaded: false,
        region: {
            latitude: 51.5272836436377,
            latitudeDelta: 0.4183249109798126,
            longitude: -0.11846434874026424,
            longitudeDelta: 0.43212968716792943,
        },
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
                    region: {
                        latitude: coords.latitude,
                        longitude: coords.longitude,
                        longitudeDelta: 0.04,
                        latitudeDelta: 0.09,
                    },
                }
            );
        });
    }

    componentDidMount() {
        this.setState({mapLoaded: true});
    }

    onRegionChangeComplete = (region) => {
        this.setState({region});
    };

    selectMarker(market) {
        this.setState({
            selectedMarket: market,
            originalRegion: this.state.region,
            region: {
                latitude: market.coordinates.latitude - SELECTED_MARKET_OFFSET,
                longitude: market.coordinates.longitude,
                longitudeDelta: 0.02,
                latitudeDelta: 0.045,
            }
        })
    }

    deselectMarker() {
        this.setState({
            selectedMarket: undefined,
            region: this.state.originalRegion,
        });
    }

    render() {
        if (!this.state.mapLoaded) {
            return (
                <View style={{flex: 1, flexDirection: 'column'}}>
                    <ActivityIndicator size='large'/>
                </View>
            )
        } else {
            return (
                <View style={styles.wrapper}>
                    {/*<Header />*/}
                    <MapView
                        region={this.state.region}
                        style={styles.map}
                        onRegionChangeComplete={this.onRegionChangeComplete}
                        showsUserLocation
                    >
                        {this.props.markets.map(market => (
                            <MarketMarker
                                key={market.id}
                                market={market}
                                userLocation={this.state.userLocation}
                                selectMarker={() => this.selectMarker(market)}
                                deselectMarker={() => this.deselectMarker()}
                                navigate={this.props.navigation.navigate}
                            />
                        ))}
                    </MapView>
                    <TouchableHighlight onPress={() => this.props.navigation.navigate('list')} style={ styles.viewSelector }>
                        <Icon name="list" size={20} color='rgba(0, 0, 0, 0.6)' />
                    </TouchableHighlight>
                    {this.state.selectedMarket ? <MapMarketDetail navigate={this.props.navigation.navigate} userLocation={this.state.userLocation} market={this.state.selectedMarket} closeDetail={() => this.deselectMarker()} /> : ''}
                </View>
            );

        }
    }
}

function mapStateToProps({marketsReducer}) {
    return {markets: marketsReducer};
}

export default connect(mapStateToProps, undefined)(MapScreen);

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
    map: {
        flex: 1,
    },
    viewSelector: {
        // shadowColor: '#000000',
        // shadowOffset: {
        //     width: 0,
        //     height: 3
        // },
        // shadowRadius: 5,
        // shadowOpacity: 1.0,
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
