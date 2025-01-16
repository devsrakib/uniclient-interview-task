import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, runOnJS } from 'react-native-reanimated';
import { useRouter } from 'expo-router';

const SplashScreen = () => {
  const router = useRouter();

  // Shared values for each image
  const progress1 = useSharedValue(0);
  const progress2 = useSharedValue(0);
  const progress3 = useSharedValue(0);
  const progress4 = useSharedValue(0);
  const progress5 = useSharedValue(0);

  useEffect(() => {
    // Trigger animations sequentially
    progress1.value = withTiming(1, { duration: 1000 }, () => {
      progress2.value = withTiming(1, { duration: 1000 }, () => {
        progress3.value = withTiming(1, { duration: 1000 }, () => {
          progress4.value = withTiming(1, { duration: 1000 }, () => {
            progress5.value = withTiming(1, { duration: 1000 }, () => {
              runOnJS(router.push)('/home'); // Navigate to the home page
            });
          });
        });
      });
    });
  }, []);

  // Animated styles for each image
  const animatedStyle1 = useAnimatedStyle(() => ({
    opacity: progress1.value,
    transform: [{ scale: progress1.value }],
  }));
  const animatedStyle2 = useAnimatedStyle(() => ({
    opacity: progress2.value,
    transform: [{ scale: progress2.value }],
  }));
  const animatedStyle3 = useAnimatedStyle(() => ({
    opacity: progress3.value,
    transform: [{ scale: progress3.value }],
  }));
  const animatedStyle4 = useAnimatedStyle(() => ({
    opacity: progress4.value,
    transform: [{ scale: progress4.value }],
  }));
  const animatedStyle5 = useAnimatedStyle(() => ({
    opacity: progress5.value,
    transform: [{ scale: progress5.value }],
  }));

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../assets/images/UniClients-1.png')}
        style={[styles.image, animatedStyle1]}
      />
      <Animated.Image
        source={require('../assets/images/UniClients-2.png')}
        style={[styles.image, animatedStyle2]}
      />
      <Animated.Image
        source={require('../assets/images/UniClients-3.png')}
        style={[styles.image, animatedStyle3]}
      />
      <Animated.Image
        source={require('../assets/images/UniClients-4.png')}
        style={[styles.image, animatedStyle4]}
      />
      <Animated.Image
        source={require('../assets/images/UniClients-5.png')}
        style={[styles.image, animatedStyle5]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: 200,
    height: 200,
    position: 'absolute',
  },
});

export default SplashScreen;
