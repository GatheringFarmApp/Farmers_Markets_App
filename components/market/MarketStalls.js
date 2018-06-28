import React, { Component } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Icon, Text } from 'react-native-elements';
import PropTypes from 'prop-types';

export default class MarketStalls extends Component {

    render() {
        const { stalls, navigate } = this.props;
        return (
            <View>
                <View style={{ padding: 20 }}>
                    { stalls.map(stall => (
                        <View key={stall.id} style={styles.stallWrapper}>
                            <Image source={{ uri: stall.image}} style={{width: 100, height: 100}} />
                            <View>
                                <Text h4>{stall.name}</Text>
                                <Text>{stall.description.substring(0, 30)}...</Text>
                            </View>
                            <Icon onPress={() => { navigate('stall', { stall }) }} name='chevron-right' size={25} />
                        </View>
                    ))}
                </View>
            </View>
        );
    }

    static propTypes = {
        stalls: PropTypes.array.isRequired,
        navigate: PropTypes.func.isRequired,
    }

}

const styles = StyleSheet.create({
    stallWrapper: {
        flex: 1,
        flexDirection: 'row',
    },
});
