import React, { Component } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';

import { SocialIcon } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';

import distance from '../../utils/distance';
import { formatPostcode } from "../../utils/formatter";
import { getDirections, openYoutube } from "../../utils/thirdpartyApps";


export default class MarketBasicInfo extends Component {

    // TODO Rename address fields
    render() {
        const { market, userLocation } = this.props;
        return (
            <View style={styles.wrapper}>
                <View style={styles.locationInfoWrapper}>
                    <View style={styles.addressWrapper}>
                        <Text>{market.address['address line 1']}</Text>
                        <Text>{market.address['address line 2']}</Text>
                        <Text>{market.address.city}</Text>
                        <Text>{formatPostcode(market.address.postcode)}</Text>
                    </View>
                    <View style={styles.directionsWrapper}>
                        <Button onPress={() => getDirections(userLocation, market.coordinates)} title="Get Directions" />
                        <Text style={{ marginLeft: 2, fontSize: 10 }}>
                            Distance: {
                            this.props.userLocation ? (distance(
                                market.coordinates,
                                userLocation,
                                'K'
                            ) * 1000).toString().split('.')[0] : ''
                        }m
                        </Text>
                    </View>
                </View>

                <View>
                    <SocialIcon
                        light={false}
                        raised
                        onPress={() => openYoutube('https://www.youtube.com/watch?v=1lFoyDOi-Ww')}
                        type='youtube'
                    />
                </View>

                <View style={styles.usefulInfoWrapper}>
                    <View>
                        <Icon size={20} name='local-atm' />
                        <Text>Sainsburys Balham</Text>
                        <Text>High Street</Text>
                    </View>
                    <View>
                        <Icon size={20} name='local-parking' />
                        <Text>On street parking</Text>
                        <Text>or Sainsburys car park</Text>
                    </View>
                </View>

                <View style={styles.descriptionWrapper}>
                    <Text>{market.description}</Text>
                </View>
            </View>
        );
    }

    static propTypes = {
        market: PropTypes.object.isRequired,
        userLocation: PropTypes.object,
    }

}

const styles = StyleSheet.create({
    wrapper: {
        padding: 20,
    },
    locationInfoWrapper: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    addressWrapper: {
    },
    directionsWrapper: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    usefulInfoWrapper: {
        paddingTop: 20,
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    descriptionWrapper: {
        paddingTop: 20,
    }
});
