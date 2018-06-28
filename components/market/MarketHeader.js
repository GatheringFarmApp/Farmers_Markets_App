import React, { Component } from 'react';
import { Dimensions, Image, Linking, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

import { Text } from 'react-native-elements';
import StarRating from 'react-native-star-rating';

const DEVICE_HEIGHT = Dimensions.get('window').height;
const DEVICE_WIDTH = Dimensions.get('window').width;

export default class MarketHeader extends Component {

    render() {
        const { market } = this.props;
        return (
            <View>
                <View>
                    <Image source={{ uri: market.image}} style={{width: DEVICE_WIDTH, height: DEVICE_WIDTH}} />
                </View>
                <View style={{ padding: 10, flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                    <View style={styles.ratingAndOpening}>
                        <Text>SAT 9am - 1pm</Text>
                        <StarRating
                            starSize={20}
                            disabled={false}
                            emptyStar={'ios-star-outline'}
                            fullStar={'ios-star'}
                            halfStar={'ios-star-half'}
                            iconSet={'Ionicons'}
                            maxStars={5}
                            rating={market.rating.value}
                            fullStarColor={'red'}
                        />
                    </View>
                </View>
            </View>
        );
    }

    static propTypes = {
        market: PropTypes.object.isRequired,
        navigate: PropTypes.func.isRequired,
    }

}

const styles = StyleSheet.create({
    ratingAndOpening: {
        padding: 20,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: DEVICE_WIDTH,
    }
});
