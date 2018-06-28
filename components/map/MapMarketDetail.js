import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Dimensions, Image, Linking, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

// import { Rating } from 'react-native-elements';

import StarRating from 'react-native-star-rating';

// import getDirections from 'react-native-google-maps-directions';

import SlidingUpPanel from 'rn-sliding-up-panel';

import { HEADER_HEIGHT } from "../Header";

const DEVICE_HEIGHT = Dimensions.get('window').height;
const DEVICE_WIDTH = Dimensions.get('window').width;

export default class MapMarketDetail extends Component {

    // TODO Repeated in marketScreen
    handleGetDirections = () => {
        const user = this.props.userLocation;
        const market = this.props.market.coordinates;

        const saddrAndDaddr = `saddr=${user.latitude},${user.longitude}&daddr=${market.latitude},${market.longitude}`;

        // TODO How to open default?
        switch (Platform.OS) {
            case 'ios':
                Linking.openURL(`http://maps.apple.com/maps?${saddrAndDaddr}&dirflg=r`);
                break;
            case 'android':
                Linking.openURL(`http://maps.google.com/maps?${saddrAndDaddr}&dirflg=r`);
                break;
        }

    };

    componentDidMount() {
        this._panel.transitionTo({
            toValue: DEVICE_HEIGHT / 2.5,
            duration: 0,
        });
    }

    render() {
        return (
            <SlidingUpPanel
                ref={c => this._panel = c}
                visible={true}
                showBackdrop={false}
                draggableRange={{top: DEVICE_HEIGHT - HEADER_HEIGHT, bottom: 30}}
                onRequestClose={this.props.closeDetail}
            >
                <View style={{ backgroundColor: '#fff', height: DEVICE_HEIGHT - HEADER_HEIGHT }}>

                    <View style={styles.heading}>
                        <Text style={styles.headingText}>{this.props.market.name}</Text>
                        <StarRating
                            disabled={false}
                            emptyStar={'ios-star-outline'}
                            fullStar={'ios-star'}
                            halfStar={'ios-star-half'}
                            iconSet={'Ionicons'}
                            maxStars={5}
                            rating={this.props.market.rating ? this.props.market.rating.value : 0}
                            fullStarColor={'red'}
                            starSize={15}
                        />
                    </View>

                    <TouchableOpacity
                        onPress={() => this.props.navigate('market', { market: this.props.market, backDestination: 'map' }) }
                        style={{
                            alignItems:'center',
                            justifyContent:'center',
                            width:64,
                            height:64,
                            backgroundColor:'#01a699',
                            borderRadius:32,
                        }}
                    >
                        <Icon name={"chevron-right"}  size={30} color="white" />
                    </TouchableOpacity>

                    <View style={{ flex: 1, flexDirection: 'row', margin: 10, height: DEVICE_WIDTH / 3 }}>
                        <View style={{ backgroundColor: 'yellow', height: DEVICE_WIDTH / 3 }}>
                            <Image source={{ uri: this.props.market.image}} style={{ width: DEVICE_WIDTH / 3, height: DEVICE_WIDTH / 3 }} />
                        </View>
                        <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'yellow', height: DEVICE_WIDTH / 3 }}>
                            <Text>Address</Text>
                            <Button onPress={this.handleGetDirections} title="Get Directions" />
                        </View>
                    </View>

                    <View style={{ margin: 10 }}>
                        <Text style={styles.description}>{this.props.market.description}</Text>
                    </View>

                </View>
            </SlidingUpPanel>
        );
    }

    static propTypes = {
        market: PropTypes.object.isRequired,
        userLocation: PropTypes.object.isRequired,
        closeDetail: PropTypes.func.isRequired,
        navigate: PropTypes.func.isRequired,
    }

}

const styles = StyleSheet.create({
    heading: {
        padding: 10,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    headingText: {
        marginRight: 10,
        fontSize: 20,
        fontWeight: "bold",
        textAlign: 'center',
        marginBottom: 10,
    },
    description: {
        textAlign: 'justify',
    },
});
