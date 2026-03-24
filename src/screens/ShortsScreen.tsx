// Shorts Screen - BharatFlex V2
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { COLORS, SPACING, FONTS } from '../config/theme';

const { width, height } = Dimensions.get('window');

interface Short {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  channel: string;
  views: string;
}

interface ShortsScreenProps {
  onNavigate?: (screen: string) => void;
}

export const ShortsScreen: React.FC<ShortsScreenProps> = ({ onNavigate }) => {
  const [shortsData] = useState<Short[]>([
    {
      id: 'short1',
      title: '15 सेकंड की मजेदार चुनौती',
      thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400',
      duration: '0:15',
      channel: 'Comedy Hub',
      views: '2.5 लाख',
    },
    {
      id: 'short2',
      title: 'भारतीय खाने की tip',
      thumbnail: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
      duration: '0:30',
      channel: 'Foodie Tips',
      views: '1.8 लाख',
    },
    {
      id: 'short3',
      title: 'टेक ट्रिक्स 2026',
      thumbnail: 'https://images.unsplash.com/photo-1591468324173-4bf57ce1b19c?w=400',
      duration: '0:20',
      channel: 'Tech Tricks',
      views: '3.2 लाख',
    },
    {
      id: 'short4',
      title: 'डांस चैलेंज',
      thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400',
      duration: '0:25',
      channel: 'Dance India',
      views: '5.1 लाख',
    },
  ]);

  const renderShortItem = ({ item }: { item: Short }) => (
    <TouchableOpacity
      style={styles.shortCard}
      onPress={() => onNavigate?.('VideoPlayer')}
    >
      <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />

      {/* Duration Badge */}
      <View style={styles.durationBadge}>
        <Text style={styles.durationText}>⏱️ {item.duration}</Text>
      </View>

      {/* Overlay Info */}
      <View style={styles.infoOverlay}>
        <View style={styles.infoContent}>
          <Text style={styles.shortTitle} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.channelName}>{item.channel}</Text>
          <Text style={styles.views}>{item.views} views</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>❤️</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>💬</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>🔗</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>⋮</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.DARK_BG} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>⚡ शॉर्ट्स</Text>
        <TouchableOpacity>
          <Text style={styles.headerIcon}>➕</Text>
        </TouchableOpacity>
      </View>

      {/* Shorts Grid */}
      <FlatList
        data={shortsData}
        keyExtractor={item => item.id}
        renderItem={renderShortItem}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.DARK_BG,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.LG,
    paddingVertical: SPACING.MD,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER_COLOR,
  },
  headerTitle: {
    fontSize: FONTS.FONT_SIZE_XL,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_WHITE,
  },
  headerIcon: {
    fontSize: 24,
  },
  listContent: {
    padding: SPACING.SM,
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: SPACING.SM,
  },
  shortCard: {
    flex: 1,
    marginHorizontal: SPACING.SM,
    borderRadius: 12,
    overflow: 'hidden',
    aspectRatio: 9 / 16,
    backgroundColor: COLORS.LIGHT_BG,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  durationBadge: {
    position: 'absolute',
    top: SPACING.MD,
    right: SPACING.MD,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: SPACING.SM,
    paddingVertical: SPACING.SM,
    borderRadius: 4,
  },
  durationText: {
    color: COLORS.PRIMARY_WHITE,
    fontSize: FONTS.FONT_SIZE_XS,
    fontWeight: 'bold',
  },
  infoOverlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.MD,
    paddingVertical: SPACING.MD,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  infoContent: {
    marginTop: 'auto',
  },
  shortTitle: {
    fontSize: FONTS.FONT_SIZE_SM,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_WHITE,
    lineHeight: 18,
    marginBottom: SPACING.SM,
  },
  channelName: {
    fontSize: FONTS.FONT_SIZE_XS,
    color: COLORS.PRIMARY_WHITE,
  },
  views: {
    fontSize: FONTS.FONT_SIZE_XS,
    color: COLORS.TEXT_MUTED,
    marginTop: SPACING.SM,
  },
  actionButtons: {
    alignItems: 'flex-end',
    gap: SPACING.MD,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionIcon: {
    fontSize: 20,
  },
});

export default ShortsScreen;
