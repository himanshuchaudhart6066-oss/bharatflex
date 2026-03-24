// Analytics Screen - BharatFlex V2
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { COLORS, SPACING, FONTS, LABELS } from '../config/theme';
import { AshokaChakraLoader } from '../components/AshokaChakraLoader';
import { firestoreUtils } from '../config/firebase';

const { width } = Dimensions.get('window');

interface AnalyticsScreenProps {
  userProfile?: any;
  onNavigate?: (screen: string) => void;
}

interface AnalyticsData {
  totalViews: number;
  totalSubscribers: number;
  estimatedEarnings: number;
  topLocations: { state: string; views: number }[];
}

export const AnalyticsScreen: React.FC<AnalyticsScreenProps> = ({ userProfile, onNavigate }) => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        if (userProfile?.uid) {
          const data = await firestoreUtils.getAnalytics(userProfile.uid);
          
          // Mock data if not found
          const mockData: AnalyticsData = {
            totalViews: 125420,
            totalSubscribers: 8950,
            estimatedEarnings: 12540,
            topLocations: [
              { state: 'महाराष्ट्र', views: 24500 },
              { state: 'दिल्ली', views: 21300 },
              { state: 'उत्तर प्रदेश', views: 18900 },
              { state: 'कर्नाटक', views: 16200 },
              { state: 'तमिलनाडु', views: 14300 },
              { state: 'बिहार', views: 12400 },
              { state: 'पश्चिम बंगाल', views: 10800 },
              { state: 'गुजरात', views: 9700 },
            ],
          };

          setAnalyticsData((data as AnalyticsData) || mockData);
        }
      } catch (error) {
        console.error('Error loading analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
  }, [userProfile?.uid]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loaderContainer}>
          <AshokaChakraLoader size={80} color={COLORS.PRIMARY_NAVY} />
          <Text style={styles.loadingText}>{LABELS.LOADING}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.PRIMARY_WHITE} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>{LABELS.ANALYTICS} 📊</Text>
      </View>

      {/* Time Range Selector */}
      <View style={styles.timeRangeContainer}>
        {(['week', 'month', 'year'] as const).map(range => (
          <TouchableOpacity
            key={range}
            onPress={() => setTimeRange(range)}
            style={[
              styles.timeRangeButton,
              timeRange === range && styles.timeRangeButtonActive,
            ]}
          >
            <Text
              style={[
                styles.timeRangeText,
                timeRange === range && styles.timeRangeTextActive,
              ]}
            >
              {range === 'week' ? 'सप्ताह' : range === 'month' ? 'महीना' : 'साल'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Key Metrics */}
        <View style={styles.metricsContainer}>
          {/* Total Views */}
          <View style={styles.metricCard}>
            <View style={styles.metricIcon}>
              <Text style={styles.icon}>👁️</Text>
            </View>
            <View style={styles.metricContent}>
              <Text style={styles.metricLabel}>{LABELS.TOTAL_VIEWS}</Text>
              <Text style={styles.metricValue}>
                {analyticsData?.totalViews.toLocaleString('hi-IN')}
              </Text>
            </View>
          </View>

          {/* Total Subscribers */}
          <View style={styles.metricCard}>
            <View style={styles.metricIcon}>
              <Text style={styles.icon}>👥</Text>
            </View>
            <View style={styles.metricContent}>
              <Text style={styles.metricLabel}>{LABELS.TOTAL_SUBSCRIBERS}</Text>
              <Text style={styles.metricValue}>
                {analyticsData?.totalSubscribers.toLocaleString('hi-IN')}
              </Text>
            </View>
          </View>

          {/* Estimated Earnings */}
          <View style={styles.metricCard}>
            <View style={styles.metricIcon}>
              <Text style={styles.icon}>💰</Text>
            </View>
            <View style={styles.metricContent}>
              <Text style={styles.metricLabel}>{LABELS.ESTIMATED_EARNINGS}</Text>
              <Text style={styles.metricValue}>
                ₹{analyticsData?.estimatedEarnings.toLocaleString('hi-IN')}
              </Text>
            </View>
          </View>
        </View>

        {/* Top Locations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🗺️ {LABELS.TOP_LOCATIONS}</Text>
          <View style={styles.locationsContainer}>
            {analyticsData?.topLocations.map((location, index) => (
              <View key={location.state} style={styles.locationItem}>
                <View style={styles.locationRank}>
                  <Text style={styles.rankNumber}>{index + 1}</Text>
                </View>
                <View style={styles.locationDetails}>
                  <Text style={styles.locationName}>{location.state}</Text>
                  <View style={styles.barContainer}>
                    <View
                      style={[
                        styles.bar,
                        {
                          width: `${
                            (location.views /
                              Math.max(...(analyticsData?.topLocations.map(l => l.views) || [1]))) *
                            100
                          }%`,
                        },
                      ]}
                    />
                  </View>
                </View>
                <Text style={styles.viewCount}>
                  {location.views.toLocaleString('hi-IN')}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Audience Demographics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>👨‍👩‍👧‍👦 {LABELS.AUDIENCE}</Text>
          
          {/* Gender Distribution */}
          <View style={styles.demographicCard}>
            <Text style={styles.demographicTitle}>लिंग वितरण</Text>
            <View style={styles.genderContainer}>
              <View style={styles.genderItem}>
                <View style={[styles.genderBar, { backgroundColor: COLORS.PRIMARY_NAVY }]}>
                  <Text style={styles.genderPercent}>58%</Text>
                </View>
                <Text style={styles.genderLabel}>पुरुष</Text>
              </View>
              <View style={styles.genderItem}>
                <View style={[styles.genderBar, { backgroundColor: COLORS.PRIMARY_SAFFRON }]}>
                  <Text style={styles.genderPercent}>42%</Text>
                </View>
                <Text style={styles.genderLabel}>महिला</Text>
              </View>
            </View>
          </View>

          {/* Age Distribution */}
          <View style={styles.demographicCard}>
            <Text style={styles.demographicTitle}>आयु वितरण</Text>
            <View style={styles.ageContainer}>
              {[
                { range: '13-17', percent: 15 },
                { range: '18-24', percent: 32 },
                { range: '25-34', percent: 28 },
                { range: '35-44', percent: 15 },
                { range: '45+', percent: 10 },
              ].map(item => (
                <View key={item.range} style={styles.ageItem}>
                  <Text style={styles.ageRange}>{item.range}</Text>
                  <View style={styles.ageBar}>
                    <View
                      style={[
                        styles.ageBarFill,
                        { width: `${item.percent * 2}%` },
                      ]}
                    />
                  </View>
                  <Text style={styles.agePercent}>{item.percent}%</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Tips Section */}
        <View style={styles.tipsSection}>
          <Text style={styles.tipsTitle}>💡 सुझाव</Text>
          <Text style={styles.tipItem}>
            • अपनी वीडियो को नियमित रूप से साझा करें
          </Text>
          <Text style={styles.tipItem}>• आपके दर्शकों के साथ संलग्न रहें</Text>
          <Text style={styles.tipItem}>• शीर्ष प्रदर्शन करने वाली सामग्री को बार-बार बनाएं</Text>
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
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: FONTS.FONT_SIZE_MD,
    color: COLORS.TEXT_SECONDARY,
    marginTop: SPACING.LG,
  },
  header: {
    paddingHorizontal: SPACING.LG,
    paddingVertical: SPACING.LG,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER_COLOR,
  },
  title: {
    fontSize: FONTS.FONT_SIZE_XL,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_SAFFRON,
  },
  timeRangeContainer: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.LG,
    paddingVertical: SPACING.MD,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER_COLOR,
  },
  timeRangeButton: {
    flex: 1,
    paddingVertical: SPACING.SM,
    marginHorizontal: SPACING.SM,
    borderRadius: 8,
    backgroundColor: COLORS.LIGHT_BG,
    alignItems: 'center',
  },
  timeRangeButtonActive: {
    backgroundColor: COLORS.PRIMARY_SAFFRON,
  },
  timeRangeText: {
    fontSize: FONTS.FONT_SIZE_SM,
    fontWeight: '500',
    color: COLORS.TEXT_PRIMARY,
  },
  timeRangeTextActive: {
    color: COLORS.PRIMARY_WHITE,
  },
  metricsContainer: {
    paddingHorizontal: SPACING.LG,
    paddingVertical: SPACING.LG,
    gap: SPACING.MD,
  },
  metricCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.MD,
    backgroundColor: COLORS.LIGHT_BG,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.PRIMARY_SAFFRON,
  },
  metricIcon: {
    marginRight: SPACING.MD,
  },
  icon: {
    fontSize: 32,
  },
  metricContent: {
    flex: 1,
  },
  metricLabel: {
    fontSize: FONTS.FONT_SIZE_SM,
    color: COLORS.TEXT_SECONDARY,
    marginBottom: SPACING.SM,
  },
  metricValue: {
    fontSize: FONTS.FONT_SIZE_XL,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_SAFFRON,
  },
  section: {
    paddingHorizontal: SPACING.LG,
    paddingVertical: SPACING.LG,
  },
  sectionTitle: {
    fontSize: FONTS.FONT_SIZE_LG,
    fontWeight: 'bold',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.MD,
  },
  locationsContainer: {
    gap: SPACING.MD,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.MD,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER_COLOR,
  },
  locationRank: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.PRIMARY_NAVY,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.MD,
  },
  rankNumber: {
    color: COLORS.PRIMARY_WHITE,
    fontWeight: 'bold',
    fontSize: FONTS.FONT_SIZE_MD,
  },
  locationDetails: {
    flex: 1,
  },
  locationName: {
    fontSize: FONTS.FONT_SIZE_SM,
    fontWeight: '600',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.SM,
  },
  barContainer: {
    height: 6,
    backgroundColor: COLORS.LIGHT_BG,
    borderRadius: 3,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    backgroundColor: COLORS.PRIMARY_SAFFRON,
  },
  viewCount: {
    fontSize: FONTS.FONT_SIZE_SM,
    fontWeight: '600',
    color: COLORS.TEXT_PRIMARY,
    marginLeft: SPACING.MD,
    minWidth: 50,
    textAlign: 'right',
  },
  demographicCard: {
    padding: SPACING.MD,
    backgroundColor: COLORS.LIGHT_BG,
    borderRadius: 12,
    marginBottom: SPACING.MD,
  },
  demographicTitle: {
    fontSize: FONTS.FONT_SIZE_MD,
    fontWeight: '600',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.MD,
  },
  genderContainer: {
    flexDirection: 'row',
    gap: SPACING.MD,
  },
  genderItem: {
    flex: 1,
    alignItems: 'center',
  },
  genderBar: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: SPACING.SM,
  },
  genderPercent: {
    color: COLORS.PRIMARY_WHITE,
    fontWeight: 'bold',
    fontSize: FONTS.FONT_SIZE_MD,
  },
  genderLabel: {
    marginTop: SPACING.SM,
    fontSize: FONTS.FONT_SIZE_SM,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: '500',
  },
  ageContainer: {
    gap: SPACING.SM,
  },
  ageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.MD,
  },
  ageRange: {
    width: 45,
    fontSize: FONTS.FONT_SIZE_SM,
    fontWeight: '600',
    color: COLORS.TEXT_PRIMARY,
  },
  ageBar: {
    flex: 1,
    height: 8,
    backgroundColor: COLORS.BORDER_COLOR,
    borderRadius: 4,
    overflow: 'hidden',
  },
  ageBarFill: {
    height: '100%',
    backgroundColor: COLORS.PRIMARY_NAVY,
  },
  agePercent: {
    width: 35,
    textAlign: 'right',
    fontSize: FONTS.FONT_SIZE_SM,
    fontWeight: '500',
    color: COLORS.TEXT_PRIMARY,
  },
  tipsSection: {
    margin: SPACING.LG,
    padding: SPACING.MD,
    backgroundColor: '#FFF9F0',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.PRIMARY_SAFFRON,
  },
  tipsTitle: {
    fontSize: FONTS.FONT_SIZE_MD,
    fontWeight: 'bold',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.MD,
  },
  tipItem: {
    fontSize: FONTS.FONT_SIZE_SM,
    color: COLORS.TEXT_SECONDARY,
    lineHeight: 20,
    marginBottom: SPACING.SM,
  },
});

export default AnalyticsScreen;
