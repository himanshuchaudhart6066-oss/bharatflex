// Admin Dashboard Screen - Track app metrics and manage videos
import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  FlatList,
  Image,
} from 'react-native';
import { COLORS, FONTS, SPACING, LABELS } from '../config/theme';
import { firestoreUtils } from '../config/firebase';
import { AshokaChakraLoader } from '../components/AshokaChakraLoader';

interface Video {
  id: string;
  title: string;
  thumbnailUrl?: string;
  views?: number;
  userId?: string;
  createdAt?: any;
}

interface AppAnalytics {
  totalInstalls: number;
  totalVideos: number;
  totalWatchTime: number;
  totalEarnings: number;
  totalUsers: number;
}

export const AdminScreen = () => {
  const [analytics, setAnalytics] = useState<AppAnalytics | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  // Fetch all app analytics and videos
  const fetchAnalytics = async () => {
    try {
      const appAnalytics = await firestoreUtils.getAppAnalytics();
      const allVideos = await firestoreUtils.getAllVideos();
      
      setAnalytics(appAnalytics);
      setVideos(allVideos);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      Alert.alert('Error', 'Failed to load analytics');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  // Handle video deletion
  const handleDeleteVideo = (videoId: string, videoTitle: string) => {
    Alert.alert(
      '⚠️ डिलीट करें?',
      `"${videoTitle}" को हटाना चाहते हैं?`,
      [
        {
          text: 'रद्द करें',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'डिलीट करें',
          onPress: async () => {
            setDeleting(videoId);
            try {
              await firestoreUtils.deleteVideo(videoId);
              setVideos(videos.filter(v => v.id !== videoId));
              Alert.alert('सफल', '✅ वीडियो हटा दिया गया');
            } catch (error) {
              console.error('Error deleting video:', error);
              Alert.alert('Error', 'Failed to delete video');
            } finally {
              setDeleting(null);
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  // Format numbers with commas
  const formatNumber = (num: number) => {
    return num.toLocaleString('en-US');
  };

  // Format watch time to hours
  const formatWatchTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <AshokaChakraLoader size={80} color={COLORS.PRIMARY_NAVY} />
        <Text style={styles.loadingText}>📊 डेटा लोड हो रहा है...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>👑 Admin Dashboard</Text>
        <Text style={styles.headerSubtitle}>आपके BharatFlex को प्रबंधित करें</Text>
      </View>

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={() => {
          setRefreshing(true);
          fetchAnalytics();
        }}
      >
        {/* Analytics Cards */}
        {analytics && (
          <View style={styles.analyticsGrid}>
            {/* Total Installs */}
            <View style={[styles.analyticsCard, styles.cardPrimary]}>
              <Text style={styles.cardLabel}>📱 कुल इंस्टॉल</Text>
              <Text style={styles.cardValue}>
                {formatNumber(analytics.totalInstalls)}
              </Text>
              <Text style={styles.cardSubtitle}>सक्रिय उपयोगकर्ता</Text>
            </View>

            {/* Total Videos */}
            <View style={[styles.analyticsCard, styles.cardSecondary]}>
              <Text style={styles.cardLabel}>🎥 कुल वीडियो</Text>
              <Text style={styles.cardValue}>
                {formatNumber(analytics.totalVideos)}
              </Text>
              <Text style={styles.cardSubtitle}>अपलोड किए गए</Text>
            </View>

            {/* Total Watch Time */}
            <View style={[styles.analyticsCard, styles.cardTertiary]}>
              <Text style={styles.cardLabel}>⏱️ कुल समय</Text>
              <Text style={styles.cardValue}>
                {formatWatchTime(Math.floor(analytics.totalWatchTime))}
              </Text>
              <Text style={styles.cardSubtitle}>देखने का समय</Text>
            </View>

            {/* Total Earnings */}
            <View style={[styles.analyticsCard, styles.cardSuccess]}>
              <Text style={styles.cardLabel}>💰 कमाई</Text>
              <Text style={styles.cardValue}>
                ₹{Math.floor(analytics.totalEarnings)}
              </Text>
              <Text style={styles.cardSubtitle}>अनुमानित आय</Text>
            </View>
          </View>
        )}

        {/* Videos Management Section */}
        <View style={styles.videosSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>📹 सभी वीडियो सूची</Text>
            <Text style={styles.videoCount}>
              {videos.length} {videos.length === 1 ? 'वीडियो' : 'वीडियो'}
            </Text>
          </View>

          {videos.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateIcon}>📂</Text>
              <Text style={styles.emptyStateText}>कोई वीडियो नहीं</Text>
              <Text style={styles.emptyStateSubtext}>
                अभी तक कोई वीडियो अपलोड नहीं किया गया है
              </Text>
            </View>
          ) : (
            <FlatList
              scrollEnabled={false}
              data={videos}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <View style={styles.videoCard}>
                  {/* Thumbnail */}
                  {item.thumbnailUrl ? (
                    <Image
                      source={{ uri: item.thumbnailUrl }}
                      style={styles.thumbnail}
                    />
                  ) : (
                    <View style={[styles.thumbnail, styles.placeholderThumbnail]}>
                      <Text style={styles.placeholderIcon}>🎬</Text>
                    </View>
                  )}

                  {/* Video Info */}
                  <View style={styles.videoInfo}>
                    <Text style={styles.videoTitle} numberOfLines={2}>
                      {item.title || 'बिना शीर्षक'}
                    </Text>
                    <View style={styles.videoMeta}>
                      <Text style={styles.metaText}>
                        👁️ {formatNumber(item.views || 0)} views
                      </Text>
                      <Text style={styles.metaText}>
                        📅{' '}
                        {item.createdAt
                          ? new Date(item.createdAt.toDate()).toLocaleDateString('hi-IN')
                          : 'N/A'}
                      </Text>
                    </View>
                  </View>

                  {/* Delete Button */}
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDeleteVideo(item.id, item.title)}
                    disabled={deleting === item.id}
                  >
                    {deleting === item.id ? (
                      <ActivityIndicator color={COLORS.ERROR_RED} size={20} />
                    ) : (
                      <Text style={styles.deleteButtonText}>🗑️</Text>
                    )}
                  </TouchableOpacity>
                </View>
              )}
            />
          )}
        </View>

        {/* Admin Tips */}
        <View style={styles.tipsSection}>
          <Text style={styles.tipsTitle}>💡 Admin Tips</Text>
          <View style={styles.tipItem}>
            <Text style={styles.tipIcon}>✓</Text>
            <Text style={styles.tipText}>
              Refresh को ऊपर स्वाइप करके सभी डेटा अपडेट करें
            </Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipIcon}>✓</Text>
            <Text style={styles.tipText}>
              किसी भी वीडियो को स्वाइप करके तुरंत हटाएं
            </Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipIcon}>✓</Text>
            <Text style={styles.tipText}>
              सभी analytics real-time में अपडेट होते हैं
            </Text>
          </View>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY_WHITE,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARY_WHITE,
  },
  loadingText: {
    marginTop: SPACING.MEDIUM,
    fontSize: FONTS.FONT_SIZE_MEDIUM,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: '600',
  },
  header: {
    backgroundColor: COLORS.PRIMARY_NAVY,
    paddingTop: SPACING.LARGE,
    paddingHorizontal: SPACING.MEDIUM,
    paddingBottom: SPACING.MEDIUM,
  },
  headerTitle: {
    fontSize: FONTS.FONT_SIZE_XLARGE,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_WHITE,
    marginBottom: SPACING.SMALL,
  },
  headerSubtitle: {
    fontSize: FONTS.FONT_SIZE_SMALL,
    color: COLORS.SECONDARY_LIGHT_GRAY,
  },
  scrollContainer: {
    flex: 1,
  },
  analyticsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: SPACING.MEDIUM,
    justifyContent: 'space-between',
  },
  analyticsCard: {
    width: '48%',
    borderRadius: 12,
    padding: SPACING.MEDIUM,
    marginBottom: SPACING.MEDIUM,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  cardPrimary: {
    backgroundColor: COLORS.PRIMARY_SAFFRON,
  },
  cardSecondary: {
    backgroundColor: COLORS.PRIMARY_NAVY,
  },
  cardTertiary: {
    backgroundColor: COLORS.SECONDARY_DARK_GRAY,
  },
  cardSuccess: {
    backgroundColor: '#10B981',
  },
  cardLabel: {
    fontSize: FONTS.FONT_SIZE_SMALL,
    color: COLORS.PRIMARY_WHITE,
    marginBottom: SPACING.SMALL,
    opacity: 0.95,
  },
  cardValue: {
    fontSize: FONTS.FONT_SIZE_XXXLARGE,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_WHITE,
    marginBottom: SPACING.TINY,
  },
  cardSubtitle: {
    fontSize: FONTS.FONT_SIZE_EXTRA_SMALL,
    color: COLORS.PRIMARY_WHITE,
    opacity: 0.85,
  },
  videosSection: {
    paddingHorizontal: SPACING.MEDIUM,
    marginTop: SPACING.MEDIUM,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.MEDIUM,
  },
  sectionTitle: {
    fontSize: FONTS.FONT_SIZE_LARGE,
    fontWeight: 'bold',
    color: COLORS.TEXT_PRIMARY,
  },
  videoCount: {
    fontSize: FONTS.FONT_SIZE_SMALL,
    color: COLORS.TEXT_SECONDARY,
    backgroundColor: COLORS.SECONDARY_LIGHT_GRAY,
    paddingHorizontal: SPACING.SMALL,
    paddingVertical: 4,
    borderRadius: 12,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: SPACING.XLARGE,
    backgroundColor: COLORS.SECONDARY_LIGHT_GRAY,
    borderRadius: 12,
  },
  emptyStateIcon: {
    fontSize: 48,
    marginBottom: SPACING.SMALL,
  },
  emptyStateText: {
    fontSize: FONTS.FONT_SIZE_MEDIUM,
    fontWeight: 'bold',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.SMALL,
  },
  emptyStateSubtext: {
    fontSize: FONTS.FONT_SIZE_SMALL,
    color: COLORS.TEXT_SECONDARY,
  },
  videoCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.PRIMARY_WHITE,
    borderRadius: 12,
    marginBottom: SPACING.MEDIUM,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.BORDER_COLOR,
  },
  thumbnail: {
    width: 80,
    height: 80,
    backgroundColor: COLORS.SECONDARY_LIGHT_GRAY,
  },
  placeholderThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderIcon: {
    fontSize: 32,
  },
  videoInfo: {
    flex: 1,
    padding: SPACING.SMALL,
    justifyContent: 'center',
  },
  videoTitle: {
    fontSize: FONTS.FONT_SIZE_SMALL,
    fontWeight: '600',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.TINY,
  },
  videoMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metaText: {
    fontSize: FONTS.FONT_SIZE_EXTRA_SMALL,
    color: COLORS.TEXT_SECONDARY,
  },
  deleteButton: {
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.ERROR_RED,
  },
  deleteButtonText: {
    fontSize: 24,
  },
  tipsSection: {
    backgroundColor: COLORS.SECONDARY_LIGHT_GRAY,
    marginHorizontal: SPACING.MEDIUM,
    marginTop: SPACING.LARGE,
    marginBottom: SPACING.MEDIUM,
    borderRadius: 12,
    padding: SPACING.MEDIUM,
  },
  tipsTitle: {
    fontSize: FONTS.FONT_SIZE_MEDIUM,
    fontWeight: 'bold',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.SMALL,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.SMALL,
  },
  tipIcon: {
    fontSize: FONTS.FONT_SIZE_MEDIUM,
    color: COLORS.PRIMARY_SAFFRON,
    marginRight: SPACING.SMALL,
    fontWeight: 'bold',
  },
  tipText: {
    flex: 1,
    fontSize: FONTS.FONT_SIZE_SMALL,
    color: COLORS.TEXT_PRIMARY,
    lineHeight: 18,
  },
  bottomSpacer: {
    height: SPACING.XLARGE,
  },
});
