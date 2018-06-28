import React, { Component } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';

const DEVICE_HEIGHT = Dimensions.get('window').height;
const DEVICE_WIDTH = Dimensions.get('window').width;
export const HEADER_HEIGHT = DEVICE_HEIGHT / 8;
const HEADER_SECTION_WIDTH = DEVICE_WIDTH / 3;

export default class Header extends Component {

    render() {
        return (
            <View style={styles.header}>
                <View style={styles.logo}>
                    <Image source={require('../icon.png')} />
                </View>
                <View style={styles.title}>
                    <Text>Gathering</Text>
                </View>
                <View style={styles.profile}>
                    <Image style={styles.profileIcon} source={{uri: 'https://lh3.googleusercontent.com/-4XiW6oBW27s/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq3Ff2UAa_s5KiJf73_mdQcKhHxwPA/s32-c-mo/photo.jpg'}} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        flex: 0,
        justifyContent: 'center',
        flexDirection: 'row',
        height: HEADER_HEIGHT,
        borderBottomColor: '#bbb',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    logo: {
        width: HEADER_SECTION_WIDTH,
    },
    title: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: HEADER_SECTION_WIDTH,
    },
    profile: {
        width: HEADER_SECTION_WIDTH,
        // flexDirection: 'column',
        // justifyContent: 'right',
        // alignItems: 'right',
    },
    profileIcon: {
        width: 30,
        height: 30,
        borderRadius: 15,
        position: 'absolute',
        right: 25,
        top: 25,
        bottom: 0,
    },
});
