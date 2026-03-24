// Splash Screen Component
import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, Animated } from 'react-native';
import { COLORS, SPACING, FONTS } from '../config/theme';
import RNSplashScreen from 'react-native-splash-screen';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);

  useEffect(() => {
    // Hide splash screen after 1.5 seconds
    const timer = setTimeout(() => {
      RNSplashScreen.hide();
      onFinish();
    }, 1500);

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    return () => clearTimeout(timer);
  }, [fadeAnim, scaleAnim, onFinish]);

  return (
    <View style={styles.container}>
      {/* Gradient Background Simulation */}
      <View style={styles.gradientBg}>
        <View style={[styles.gradientBlock, { backgroundColor: COLORS.PRIMARY_SAFFRON }]} />
        <View style={[styles.gradientBlock, { backgroundColor: COLORS.PRIMARY_NAVY }]} />
      </View>

      {/* Logo Section */}
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {/* Stylized B Logo */}
        <View style={styles.bLogo}>
          <Text style={styles.bText}>B</Text>
        </View>
      </Animated.View>

      {/* App Title */}
      <Animated.Text
        style={[
          styles.title,
          {
            opacity: fadeAnim,
          },
        ]}
      >
        BharatFlex
      </Animated.Text>

      {/* Tagline */}
      <Animated.Text
        style={[
          styles.tagline,
          {
            opacity: fadeAnim,
          },
        ]}
      >
        Desi Swag
      </Animated.Text>

      {/* Loading Indicator */}
      <View style={styles.loader}>
        <View style={[styles.loaderDot, { backgroundColor: COLORS.PRIMARY_SAFFRON }]} />
        <View style={[styles.loaderDot, { backgroundColor: COLORS.PRIMARY_NAVY }]} />
        <View style={[styles.loaderDot, { backgroundColor: COLORS.PRIMARY_SAFFRON }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARY_WHITE,
  },
  gradientBg: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
  },
  gradientBlock: {
    flex: 1,
    opacity: 0.1,
  },
  logoContainer: {
    marginBottom: SPACING.XL,
  },
  bLogo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.PRIMARY_SAFFRON,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: COLORS.PRIMARY_NAVY,
  },
  bText: {
    fontSize: FONTS.FONT_SIZE_XXXL + 20,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_WHITE,
    letterSpacing: -2,
  },
  title: {
    fontSize: FONTS.FONT_SIZE_XXXL,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_SAFFRON,
    marginBottom: SPACING.SM,
    letterSpacing: 1,
  },
  tagline: {
    fontSize: FONTS.FONT_SIZE_MD,
    color: COLORS.PRIMARY_NAVY,
    letterSpacing: 2,
    marginBottom: SPACING.XXL * 2,
  },
  loader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.XXL,
  },
  loaderDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: SPACING.SM,
    opacity: 0.6,
  },
});

export default SplashScreen;
