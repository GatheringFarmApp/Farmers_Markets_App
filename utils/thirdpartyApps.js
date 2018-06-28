import { Linking, Platform } from 'react-native';

const getDirections = (source, destination) => {

    const saddrAndDaddr = `saddr=${source.latitude},${source.longitude}&daddr=${destination.latitude},${destination.longitude}`;

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

const openYoutube = (address) => {
    Linking.openURL(address);
};

export { getDirections, openYoutube };
