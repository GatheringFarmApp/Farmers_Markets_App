import React, { Component } from 'react';
import { Alert, NetInfo, StyleSheet, Text, View } from 'react-native';

export default class NetworkStatusWrapper extends Component {

    constructor(props) {
        super(props);

        this.state = {
            initialConnectionStateDetermined: false,
            connected: false,
        }

    }

    handleOnlineStatusChange = (isConnected) => {

        if (this.state.initialConnectionStateDetermined) {
            if (isConnected) {
                this.callbackOnline();
            } else {
                this.callbackOffline();
            }
        }

        this.setState({
            initialConnectionStateDetermined: true,
            connected: isConnected,
        });

    };

    callbackOnline = () => {
        Alert.alert(
            'Online mode',
            'You\'re online, Will fetch latest data.',
            [
                {text: 'OK', onPress: () => console.log('OK pressed')},
            ],
            {cancelable: false}
        )

    };

    callbackOffline = () => {
        Alert.alert(
            'Offline mode',
            'You\'re offline, Gathering is using the data from the last time you were online.',
            [
                {text: 'OK', onPress: () => console.log('OK pressed')},
            ],
            {cancelable: false}
        );
    };

    componentDidMount() {
        NetInfo.isConnected.addEventListener(
            'connectionChange',
            this.handleOnlineStatusChange
        );
    }

    render() {

        let offlineMessage = '';
        if (!this.state.connected) {
            offlineMessage = (
                <View style={styles.offlineMessage}>
                    <Text style={{color: '#777777'}}>Offline mode. Reconnect to keep information up to date.</Text>
                </View>
            );
        }

        return (
            <View style={{ flex: 1 }}>
                { this.props.children }
                { offlineMessage }
            </View>
        );
    }

}

const styles = StyleSheet.create({
    offlineMessage: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'yellow',
        padding: 10,
        opacity: 0.6,

    },
});
