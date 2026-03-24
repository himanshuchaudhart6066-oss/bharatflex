// Ashoka Chakra Loading Animation Component
import React, { useEffect } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../config/theme';

interface AshokaChakraLoaderProps {
  size?: number;
  color?: string;
}

export const AshokaChakraLoader: React.FC<AshokaChakraLoaderProps> = ({
  size = 60,
  color = COLORS.PRIMARY_NAVY,
}) => {
  const rotateAnim = new Animated.Value(0);
  const chakraTrail = new Animated.Value(0);

  useEffect(() => {
    // Main rotation
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    ).start();

    // Trail animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(chakraTrail, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(chakraTrail, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [rotateAnim, chakraTrail]);

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* Outer circle (Chakra rim) */}
      <Animated.View
        style={[
          styles.chakraRim,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: 4,
            borderColor: color,
            transform: [{ rotate: rotation }],
          },
        ]}
      >
        {/* 24 Spokes indicator */}
        <View style={[styles.spoke, { backgroundColor: color, width: '100%' }]} />
      </Animated.View>

      {/* Inner circles (Ashoka Chakra design) */}
      <Animated.View
        style={[
          styles.chakraCenter,
          {
            width: size * 0.4,
            height: size * 0.4,
            borderRadius: (size * 0.4) / 2,
            borderWidth: 2,
            borderColor: color,
            opacity: chakraTrail.interpolate({
              inputRange: [0, 1],
              outputRange: [0.3, 1],
            }),
          },
        ]}
      />

      {/* Center dot */}
      <View
        style={[
          styles.center,
          {
            width: size * 0.1,
            height: size * 0.1,
            borderRadius: (size * 0.1) / 2,
            backgroundColor: color,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  chakraRim: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  spoke: {
    height: 2,
    position: 'absolute',
  },
  chakraCenter: {
    position: 'absolute',
  },
  center: {
    position: 'absolute',
  },
});

export default AshokaChakraLoader;
