import React, { Component } from 'react';
import {
    Dimensions,
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { SocialIcon } from 'react-native-elements';
import ZocialIcon from 'react-native-vector-icons/Zocial';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const DEVICE_HEIGHT = Dimensions.get('window').height;
const DEVICE_WIDTH = Dimensions.get('window').width;

const iconSize = 24;

export default class StallScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('stall').name,
            headerStyle: {
                marginTop: Platform.OS === 'android' ? 24 : 0
            }
        };
    };

    // card payments: ''

    render() {
        const stall = this.props.navigation.getParam('stall');
        return (
            <ScrollView style={styles.wrapper}>

                <Image source={{ uri: stall.image}} style={{width: DEVICE_WIDTH, height: DEVICE_WIDTH}} />

                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                    <View style={styles.iconWrapper}>
                        <View style={[styles.wtf, {backgroundColor: '#7a55b3'}]}>
                            <ZocialIcon style={styles.shadowIcon} name='email' size={iconSize} color={'white'} />
                        </View>
                    </View>

                    <View style={styles.iconWrapper}>
                        <View style={[styles.wtf, {backgroundColor: '#00c28a'}]}>
                            <MaterialCommunityIcon style={styles.shadowIcon} name='web' size={iconSize} color={'white'} />
                        </View>
                    </View>

                    <SocialIcon
                        light={false}
                        raised
                        type='instagram'
                        iconColor='gray'
                        style={{ backgroundColor: 'lightgray' }}
                    />
                    <SocialIcon
                        light={false}
                        raised
                        type='facebook'
                        iconColor='gray'
                        style={{ backgroundColor: 'lightgray' }}
                    />
                    <SocialIcon
                        light={false}
                        raised
                        type='twitter'
                    />
                </View>

                <View style={styles.descriptionWrapper}>
                    <Text style={styles.description}>{stall.description}</Text>
                </View>

            </ScrollView>
        );
    }

}

const styles = StyleSheet.create({
    wrapper: {},
    iconWrapper: {
    },
    wtf: {
        borderRadius: iconSize + 2,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: iconSize * 2 + 4,
        height: iconSize * 2 + 4,
        margin: 7,
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0,0,0, .4)',
                shadowOffset: { height: 1, width: 1 },
                shadowOpacity: 1,
                shadowRadius: 1,
            },
            android: {
                elevation: 2,
            },
        }),
    },
    shadowIcon: {
    },
    descriptionWrapper: {
        margin: 10,
    },
    description: {
        textAlign: 'justify',
    },
});
