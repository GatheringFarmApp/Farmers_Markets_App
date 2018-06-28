import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator } from 'react-native';

import { fetchMarkets } from '../actions';

class WelcomeScreen extends Component {

    componentDidMount() {
        this.props.fetchMarkets(() => {
            this.props.navigation.navigate('map');
        });
    }

    render() {
        return (
            <ActivityIndicator style={{ flex: 1, flexDirection: 'column' }} size='large' />
        );
    }
}

export default connect(null, { fetchMarkets })(WelcomeScreen);
