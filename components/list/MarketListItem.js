import React, { Component } from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';

import { Avatar, ListItem } from 'react-native-elements';

const DEFAULT_DESCRIPTION = 'No description for this market';

export default class MarketListItem extends Component {

    render() {

        const market = this.props.market.item;

        let subtitle = '';
        if (market.distance) {
            subtitle = 'Distance ' + market.distance + 'm';
        }

        return (
            <ListItem
                onPress={() => this.props.navigate('market', { market })}
                avatar={<Avatar
                    large
                    source={{ uri: market.image }}
                />}
                title={market.name}
                subtitle={subtitle}
            />
        );
    }

    static propTypes = {
        market: PropTypes.object.isRequired,
        navigate: PropTypes.func.isRequired,
        userLocation: PropTypes.object,
    }

}
