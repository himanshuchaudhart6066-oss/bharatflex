// You Screen (Channel Profile) - BharatFlex V2
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
  Dimensions,
} from 'react-native';
import { COLORS, SPACING, FONTS, LABELS } from '../config/theme';
import { whatsappShareUtils } from '../utils/whatsappShare';

const { width } = Dimensions.get('window');

interface YouScreenProps {
  userProfile?: any;
  onNavigate: (screen: string, params?: any) => void;
}

export const YouScreen: React.FC<YouScreenProps> = ({ userProfile, onNavigate }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  // Mock channel stats
  const channelStats = {
    subscribers: 8950,
    videos: 24,
    totalViews: 125420,
  };

  const handleEditProfile = () => {
    Alert.alert(
      'प्रोफ़ाइल सुधारें',
      'आप अपनी प्रोफ़ाइल जानकारी को संपादित कर सकते हैं।',
      [
        {
          text: 'संपादित करें',
          onPress: () => {
            onNavigate('EditProfile', { userProfile });
          },
        },
        { text: 'रद्द करें', style: 'cancel' },
      ]
    );
  };

  const handleWhatsAppShare = async () => {
    try {
      await whatsappShareUtils.shareOnWhatsApp({
        videoTitle: `मेरा चैनल देखें: ${userProfile?.displayName}`,
        videoUrl: `bharatflex://channel/${userProfile?.uid}`,
        channelName: userProfile?.displayName,
        customMessage: `नमस्ते! 🇮🇳\n\nमेरे BharatFlex चैनल को सब्सक्राइब करें।\n\n📹 ${channelStats.videos} वीडियो\n👥 ${channelStats.subscribers} सब्सक्राइबर\n👁️ ${channelStats.totalViews} व्यूज`,
      });
    } catch (error) {
      console.error('WhatsApp share error:', error);
    }
  };

  const handleViewAnalytics = () => {
    onNavigate('Analytics');
  };

  const menuItems = [
    { icon: '📺', label: 'मेरी वीडियो', action: () => onNavigate('MyVideos') },
    { icon: '✂️', label: 'मेरे ड्राफ्ट', action: () => Alert.alert('ड्राफ्ट', 'आपके ड्राफ्ट वीडियो यहाँ दिखेंगे।') },
    { icon: '🔔', label: 'सूचनाएं', action: () => Alert.alert('सूचनाएं', 'आपकी सूचनाओं को यहाँ देखें।') },
    { icon: '⚙️', label: 'सेटिंग्स', action: () => onNavigate('Settings') },
    { icon: '📋', label: 'संपर्क संदेश', action: () => Alert.alert('संपर्क', 'हमसे संपर्क करने के लिए फॉर्म भरें।') },
    { icon: '🆘', label: 'सहायता', action: () => Alert.alert('सहायता', 'किसी भी समस्या के लिए हमसे संपर्क करें।') },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.PRIMARY_WHITE} />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header Background */}
        <View style={styles.headerBackground} />

        {/* Profile Section */}
        <View style={styles.profileSection}>
          {/* Profile Picture */}
          {userProfile?.photoURL ? (
            <Image source={{ uri: userProfile.photoURL }} style={styles.profileImage} />
          ) : (
            <View style={styles.profileImagePlaceholder}>
              <Text style={styles.profileImagePlaceholderText}>
                {userProfile?.displayName?.charAt(0) || 'B'}
              </Text>
            </View>
          )}

          {/* Channel Name */}
          <Text style={styles.channelName}>{userProfile?.displayName || 'BharatFlex Creator'}</Text>
          <Text style={styles.channelHandle}>@{userProfile?.displayName?.replace(/\s/g, '') || 'bharatflex'}</Text>

          {/* Channel Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{channelStats.videos}</Text>
              <Text style={styles.statLabel}>वीडियो</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{(channelStats.subscribers / 1000).toFixed(1)}K</Text>
              <Text style={styles.statLabel}>जुड़े हुए लोग</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{(channelStats.totalViews / 1000).toFixed(0)}K</Text>
              <Text style={styles.statLabel}>व्यूज</Text>
            </View>
          </View>

          {/* Description */}
          <Text style={styles.description}>
            🎬 BharatFlex पर आपका स्वागत है! यहाँ हम Desi Swag के साथ बेहतरीन सामग्री साझा करते हैं।
          </Text>

          {/* Action Buttons */}
          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity
              style={[styles.actionButton, styles.primaryButton]}
              onPress={handleEditProfile}
            >
              <Text style={styles.primaryButtonText}>✏️ {LABELS.EDIT_PROFILE}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.secondaryButton]}
              onPress={handleViewAnalytics}
            >
              <Text style={styles.secondaryButtonText}>📊 {LABELS.ANALYTICS}</Text>
            </TouchableOpacity>
          </View>

          {/* WhatsApp Share Button */}
          <TouchableOpacity style={styles.whatsappButton} onPress={handleWhatsAppShare}>
            <Text style={styles.whatsappIcon}>💬</Text>
            <Text style={styles.whatsappText}>{LABELS.WHATSAPP_SHARE}</Text>
          </TouchableOpacity>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={item.action}
            >
              <Text style={styles.menuIcon}>{item.icon}</Text>
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Section */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => Alert.alert('लॉगआउट', 'क्या आप सुनिश्चित हैं कि आप लॉगआउट करना चाहते हैं?')}
        >
          <Text style={styles.logoutText}>🚪 लॉगआउट</Text>
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>BharatFlex V2 • Desi Swag</Text>
          <Text style={styles.versionText}>संस्करण 2.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY_WHITE,
  },
  headerBackground: {
    height: 60,
    backgroundColor: COLORS.PRIMARY_SAFFRON,
  },
  profileSection: {
    paddingHorizontal: SPACING.LG,
    paddingVertical: SPACING.LG,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER_COLOR,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: SPACING.MD,
    borderWidth: 4,
    borderColor: COLORS.PRIMARY_SAFFRON,
  },
  profileImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: SPACING.MD,
    backgroundColor: COLORS.PRIMARY_NAVY,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: COLORS.PRIMARY_SAFFRON,
  },
  profileImagePlaceholderText: {
    fontSize: 40,
    color: COLORS.PRIMARY_WHITE,
    fontWeight: 'bold',
  },
  channelName: {
    fontSize: FONTS.FONT_SIZE_XL,
    fontWeight: 'bold',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.SM,
  },
  channelHandle: {
    fontSize: FONTS.FONT_SIZE_SM,
    color: COLORS.TEXT_SECONDARY,
    marginBottom: SPACING.LG,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.LG,
    width: '100%',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: FONTS.FONT_SIZE_LG,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_SAFFRON,
  },
  statLabel: {
    fontSize: FONTS.FONT_SIZE_XS,
    color: COLORS.TEXT_SECONDARY,
    marginTop: SPACING.SM,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: COLORS.BORDER_COLOR,
  },
  description: {
    fontSize: FONTS.FONT_SIZE_SM,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    marginBottom: SPACING.LG,
    lineHeight: 20,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    gap: SPACING.MD,
    width: '100%',
    marginBottom: SPACING.MD,
  },
  actionButton: {
    flex: 1,
    paddingVertical: SPACING.MD,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: COLORS.PRIMARY_SAFFRON,
  },
  primaryButtonText: {
    color: COLORS.PRIMARY_WHITE,
    fontWeight: 'bold',
    fontSize: FONTS.FONT_SIZE_SM,
  },
  secondaryButton: {
    backgroundColor: COLORS.PRIMARY_NAVY,
  },
  secondaryButtonText: {
    color: COLORS.PRIMARY_WHITE,
    fontWeight: 'bold',
    fontSize: FONTS.FONT_SIZE_SM,
  },
  whatsappButton: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical: SPACING.MD,
    paddingHorizontal: SPACING.LG,
    backgroundColor: '#25D366',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  whatsappIcon: {
    fontSize: 20,
    marginRight: SPACING.SM,
  },
  whatsappText: {
    color: COLORS.PRIMARY_WHITE,
    fontWeight: 'bold',
    fontSize: FONTS.FONT_SIZE_SM,
  },
  menuSection: {
    marginTop: SPACING.LG,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.LG,
    paddingVertical: SPACING.MD,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER_COLOR,
  },
  menuIcon: {
    fontSize: 24,
    marginRight: SPACING.MD,
  },
  menuLabel: {
    flex: 1,
    fontSize: FONTS.FONT_SIZE_MD,
    color: COLORS.TEXT_PRIMARY,
  },
  menuArrow: {
    fontSize: FONTS.FONT_SIZE_LG,
    color: COLORS.TEXT_MUTED,
  },
  logoutButton: {
    marginHorizontal: SPACING.LG,
    marginVertical: SPACING.LG,
    paddingVertical: SPACING.MD,
    borderColor: COLORS.ERROR,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    color: COLORS.ERROR,
    fontWeight: 'bold',
    fontSize: FONTS.FONT_SIZE_MD,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: SPACING.LG,
    borderTopWidth: 1,
    borderTopColor: COLORS.BORDER_COLOR,
  },
  footerText: {
    fontSize: FONTS.FONT_SIZE_SM,
    color: COLORS.TEXT_SECONDARY,
    marginBottom: SPACING.SM,
  },
  versionText: {
    fontSize: FONTS.FONT_SIZE_XS,
    color: COLORS.TEXT_MUTED,
  },
});

export default YouScreen;
