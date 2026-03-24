// Auth Screen - BharatFlex V2
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
} from 'react-native';
import { COLORS, SPACING, FONTS, LABELS } from '../config/theme';
import { googleSignInUtils } from '../config/googleSignIn';

interface AuthScreenProps {
  onAuthSuccess: (user: any) => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onAuthSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const result = await googleSignInUtils.signInWithGoogle();
      if (result && result.success) {
        onAuthSuccess(result.user);
      } else {
        Alert.alert('त्रुटि', 'साइन इन करने में समस्या हुई। कृपया पुनः प्रयास करें।');
      }
    } catch (error) {
      console.error('Auth error:', error);
      Alert.alert('त्रुटि', 'कुछ गलत हुआ।');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.PRIMARY_WHITE} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Top Decoration */}
        <View style={styles.decorationTop}>
          <View style={[styles.decorationCircle, styles.decorationCircle1]} />
          <View style={[styles.decorationCircle, styles.decorationCircle2]} />
        </View>

        {/* Logo Section */}
        <View style={styles.logoSection}>
          <View style={styles.bLogo}>
            <Text style={styles.bText}>B</Text>
          </View>
          <Text style={styles.appName}>BharatFlex</Text>
          <Text style={styles.tagline}>🇮🇳 Desi स्वाग</Text>
        </View>

        {/* Info Section */}
        <View style={styles.infoSection}>
          <Text style={styles.heading}>BharatFlex V2 स्वागत है!</Text>
          <Text style={styles.description}>
            अपने भारतीय वीडियो साझा करें, Desi Swag के साथ कमाई करें।
          </Text>

          {/* Features List */}
          <View style={styles.featuresList}>
            <Feature icon="🎬" text="4K वीडियो अपलोड करें" />
            <Feature icon="💰" text="YouTube जैसी कमाई करें" />
            <Feature icon="🇮🇳" text="Hindi में पूर्ण समर्थन" />
            <Feature icon="💬" text="WhatsApp पर सीधे शेयर करें" />
            <Feature icon="📊" text="विस्तृत Analytics देखें" />
            <Feature icon="⚡" text="डेटा बचाव मोड" />
          </View>
        </View>

        {/* Auth Section */}
        <View style={styles.authSection}>
          <TouchableOpacity
            style={styles.googleButton}
            onPress={handleGoogleSignIn}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={COLORS.PRIMARY_WHITE} size="large" />
            ) : (
              <>
                <Text style={styles.googleIcon}>🔐</Text>
                <Text style={styles.googleButtonText}>Google से साइन इन करें</Text>
              </>
            )}
          </TouchableOpacity>

          <Text style={styles.termsText}>
            साइन इन करके, आप हमारी शर्तों से सहमत हैं।
          </Text>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>या</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity style={styles.guestButton}>
            <Text style={styles.guestButtonText}>अतिथि के रूप में जारी रखें</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Info */}
        <View style={styles.bottomInfo}>
          <Text style={styles.infoText}>🔒 आपका डेटा सुरक्षित और निजी है।</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

interface FeatureProps {
  icon: string;
  text: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, text }) => (
  <View style={styles.featureItem}>
    <Text style={styles.featureIcon}>{icon}</Text>
    <Text style={styles.featureText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY_WHITE,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: SPACING.LG,
  },
  decorationTop: {
    position: 'relative',
    height: 100,
    marginBottom: SPACING.LG,
  },
  decorationCircle: {
    position: 'absolute',
    borderRadius: 999,
  },
  decorationCircle1: {
    width: 150,
    height: 150,
    backgroundColor: COLORS.PRIMARY_SAFFRON,
    opacity: 0.1,
    top: -50,
    left: -50,
  },
  decorationCircle2: {
    width: 120,
    height: 120,
    backgroundColor: COLORS.PRIMARY_NAVY,
    opacity: 0.1,
    top: 20,
    right: -40,
  },
  logoSection: {
    alignItems: 'center',
    marginVertical: SPACING.XXL,
  },
  bLogo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.PRIMARY_SAFFRON,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: COLORS.PRIMARY_NAVY,
    marginBottom: SPACING.MD,
  },
  bText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_WHITE,
  },
  appName: {
    fontSize: FONTS.FONT_SIZE_XXXL,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_SAFFRON,
    letterSpacing: 1,
  },
  tagline: {
    fontSize: FONTS.FONT_SIZE_MD,
    color: COLORS.PRIMARY_NAVY,
    letterSpacing: 2,
    marginTop: SPACING.SM,
  },
  infoSection: {
    marginVertical: SPACING.LG,
  },
  heading: {
    fontSize: FONTS.FONT_SIZE_LG,
    fontWeight: 'bold',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.MD,
  },
  description: {
    fontSize: FONTS.FONT_SIZE_SM,
    color: COLORS.TEXT_SECONDARY,
    lineHeight: 22,
    marginBottom: SPACING.LG,
  },
  featuresList: {
    gap: SPACING.MD,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.MD,
    paddingVertical: SPACING.SM,
    backgroundColor: COLORS.LIGHT_BG,
    borderRadius: 8,
  },
  featureIcon: {
    fontSize: 24,
    marginRight: SPACING.MD,
  },
  featureText: {
    fontSize: FONTS.FONT_SIZE_SM,
    color: COLORS.TEXT_PRIMARY,
    flex: 1,
  },
  authSection: {
    marginVertical: SPACING.XXL,
  },
  googleButton: {
    flexDirection: 'row',
    paddingVertical: SPACING.LG,
    paddingHorizontal: SPACING.MD,
    backgroundColor: COLORS.PRIMARY_SAFFRON,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleIcon: {
    fontSize: 24,
    marginRight: SPACING.MD,
  },
  googleButtonText: {
    fontSize: FONTS.FONT_SIZE_MD,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_WHITE,
  },
  termsText: {
    fontSize: FONTS.FONT_SIZE_XS,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    marginTop: SPACING.MD,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SPACING.LG,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.BORDER_COLOR,
  },
  dividerText: {
    marginHorizontal: SPACING.MD,
    color: COLORS.TEXT_SECONDARY,
    fontSize: FONTS.FONT_SIZE_SM,
  },
  guestButton: {
    paddingVertical: SPACING.LG,
    borderWidth: 2,
    borderColor: COLORS.PRIMARY_NAVY,
    borderRadius: 12,
    alignItems: 'center',
  },
  guestButtonText: {
    fontSize: FONTS.FONT_SIZE_MD,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_NAVY,
  },
  bottomInfo: {
    alignItems: 'center',
    paddingVertical: SPACING.LG,
  },
  infoText: {
    fontSize: FONTS.FONT_SIZE_SM,
    color: COLORS.TEXT_SECONDARY,
  },
});

export default AuthScreen;
