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
    BounceIn,
    ZoomInUp,
    interpolateColor,
    withSequence,
    withSpring,
    ZoomIn,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

const width = Dimensions.get('window').width;
const height = Dimensions.get('screen').height;

const SplashScreen = () => {
    const router = useRouter();
    const [imageIndex, setImageIndex] = useState(0);
    const radius = useSharedValue(300);  // Start with a small radius
    const scale = useSharedValue(0);    // Scale for the circle

    useEffect(() => {
        if (imageIndex === 1) {
            // Start with a delay then animate
            setTimeout(() => {
                radius.value = withSequence(
                    withSpring(width * 0.1, {
                        duration: 500
                    }),    // First shrink a bit
                    withSpring(width * 2, {     // Then expand
                        damping: 20,
                        stiffness: 90
                    })
                );
                scale.value = withSpring(1, {   // Scale up
                    damping: 20,
                    stiffness: 90
                });
            }, 100);
        }
    }, [imageIndex]);

    const animatedStyle = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(
            radius.value,
            [50, width * 2],
            ['#AB5CFD', '#6A5AE0']
        );

        return {
            width: radius.value * 2,
            height: radius.value * 2,
            borderRadius: radius.value,
            backgroundColor,
            transform: [
                { translateX: -radius.value },
                { translateY: -radius.value },
                { scale: scale.value }
            ],
        };
    });

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setImageIndex((prev) => prev + 1);
        }, 2000);

        if (imageIndex === 2) {
            clearTimeout(timeoutId);
            // router.push('/home');
        }

        return () => clearTimeout(timeoutId);
    }, [imageIndex]);

const CustomLinear = Animated.createAnimatedComponent(LinearGradient)

    return (
        <LinearGradient
            colors={imageIndex === 2 ? ['#6A5AE0', '#AB5CFD'] : ['#ffffff', '#ffffff']}
            style={styles.gradientContainer}
        >
            {imageIndex === 0 ? (
                <ImageBackground
                    key="imageOne"
                    style={styles.conOne}
                    source={require('../assets/images/UniClients-1.png')}
                >
                    <Animated.Image
                        entering={ZoomInUp.delay(50).duration(500).springify().damping(8)}
                        source={require('../assets/images/UniClients-2.png')}
                        style={styles.imageOne}
                    />
                </ImageBackground>
            ) : imageIndex === 1 ? (
                <CustomLinear start={{ x: 1, y: 0 }} colors={['#6A5AE0', '#AB5CFD']} style={[styles.circle, animatedStyle]} >
                <Animated.Image  entering={ZoomIn.delay(50).duration(500).springify().damping(8)} style={{zIndex: 999}} source={require('../assets/images/UniClients-3.png')} />
                </CustomLinear>
            ) : (
                imageIndex === 2 && (
                    <Animated.View key="imageFour" style={styles.lastContainer}>
                    <View style={styles.logoCon}>
                        <Image
                            style={styles.logo}
                            source={require('../assets/images/logo.png')}
                        />
                    </View>
                    <Animated.Image
                        entering={FadeInDown.delay(50).duration(600)}
                        source={require('../assets/images/UniClients-5.png')}
                        style={styles.imageFour}
                    />
                    <Animated.View
                        entering={FadeInDown.delay(50).duration(500)}
                        style={styles.buttonCon}
                    >
                        <TouchableOpacity style={styles.button}>
                            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Hello</Text>
                        </TouchableOpacity>
                    </Animated.View>
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
    imageTwo: {
        width: width * 0.8,
        height: width * 0.8,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    circleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
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
    buttonCon: {
        width: '100%',
        position: 'absolute',
        bottom: 20,
    },
    button: {
        width: '90%',
        borderRadius: 12,
        height: 50,
        backgroundColor: '#6A5AE0',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    circle: {
        position: 'absolute',
        top: height / 2,
        left: width / 2,
        zIndex: 409,
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default SplashScreen;
