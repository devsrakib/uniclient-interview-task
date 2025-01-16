import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    ImageBackground,
    Image,
    TouchableOpacity,
    Text,
} from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    FadeInDown,
    ZoomInUp,
    interpolateColor,
    withSequence,
    withSpring,
    ZoomIn,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

const width = Dimensions.get('window').width; // Get device screen width
const height = Dimensions.get('screen').height; // Get device screen height

const SplashScreen = () => {
    const router = useRouter(); // Used for navigation
    const [imageIndex, setImageIndex] = useState(0); // Tracks which screen to show
    const radius = useSharedValue(300);  // Animation value for circle radius
    const scale = useSharedValue(0);    // Animation value for circle scaling

    // Animation logic for imageIndex === 1
    useEffect(() => {
        if (imageIndex === 1) {
            setTimeout(() => {
                radius.value = withSequence(
                    withSpring(width * 0.1, { duration: 1000 }), // Shrinks a bit
                    withSpring(width * 2, { damping: 20, stiffness: 90 }) // Expands fully
                );
                scale.value = withSpring(1, { damping: 20, stiffness: 90 }); // Scales up the circle
            }, 100);
        }
    }, [imageIndex]);

    // Animated style for the circle
    const animatedStyle = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(
            radius.value,
            [50, width * 2],
            ['#AB5CFD', '#6A5AE0'] // Gradual color transition
        );

        return {
            width: radius.value * 2,
            height: radius.value * 2,
            borderRadius: radius.value, // Ensures it stays a circle
            backgroundColor,
            transform: [
                { translateX: -radius.value }, // Centers the circle
                { translateY: -radius.value },
                { scale: scale.value }, // Adds scaling effect
            ],
        };
    });

    // Handles the imageIndex state transitions with delay
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setImageIndex((prev) => prev + 1); // Move to the next screen
        }, 2000);

        if (imageIndex === 2) {
            clearTimeout(timeoutId); // Clear timeout when animation ends
            // router.push('/home'); // Uncomment to navigate to the home screen
        }

        return () => clearTimeout(timeoutId); // Cleanup on component unmount
    }, [imageIndex]);

    // Wrap LinearGradient with Animated for animations
    const CustomLinear = Animated.createAnimatedComponent(LinearGradient);

    return (
        <LinearGradient
            colors={imageIndex === 2 ? ['#6A5AE0', '#AB5CFD'] : ['#ffffff', '#ffffff']}
            style={styles.gradientContainer}
        >
            {/* First screen with ImageBackground */}
            {imageIndex === 0 ? (
                <ImageBackground
                    key="imageOne"
                    style={styles.conOne}
                    source={require('../assets/images/UniClients-1.png')}
                >
                    <Animated.Image
                        entering={ZoomInUp.delay(50).duration(500).springify().damping(8)} // Animated entry
                        source={require('../assets/images/UniClients-2.png')}
                        style={styles.imageOne}
                    />
                </ImageBackground>
            ) : imageIndex === 1 ? (
                // Second screen with animated circle
                <CustomLinear start={{ x: 1, y: 0 }} colors={['#6A5AE0', '#AB5CFD']} style={[styles.circle, animatedStyle]}>
                    <Animated.Image
                        entering={ZoomIn.delay(50).duration(500).springify().damping(4)} // Animated image entry
                        style={{ zIndex: 999 }}
                        source={require('../assets/images/UniClients-3.png')}
                    />
                </CustomLinear>
            ) : (
                imageIndex === 2 && (
                    // Final screen with logo and button
                    <Animated.View key="imageFour" style={styles.lastContainer}>
                        <View style={styles.logoCon}>
                            <Image
                                style={styles.logo}
                                source={require('../assets/images/logo.png')}
                            />
                        </View>
                        <Animated.Image
                            entering={FadeInDown.delay(50).duration(400)} // Fade-in animation
                            source={require('../assets/images/UniClients-5.png')}
                            style={styles.imageFour}
                        />
                        <TouchableOpacity onPress={() => router.push('/home')} style={styles.button}>
                            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Continue</Text>
                        </TouchableOpacity>
                    </Animated.View>
                )
            )}
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    gradientContainer: {
        flex: 1,
    },
    conOne: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageOne: {
        marginTop: -77,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    imageFour: {
        resizeMode: 'contain',
    },
    lastContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoCon: {
        flex: 1,
        position: 'absolute',
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        zIndex: 100,
        marginTop: 20,
    },
    button: {
        width: '90%',
        borderRadius: 12,
        height: 50,
        backgroundColor: '#6A5AE0',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        position: 'absolute',
        bottom: 20,
        zIndex: 1000,
    },
    circle: {
        position: 'absolute',
        top: height / 2,
        left: width / 2,
        zIndex: 409,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default SplashScreen;
