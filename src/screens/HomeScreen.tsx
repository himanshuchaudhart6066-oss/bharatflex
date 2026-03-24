// Home Screen - BharatFlex V2
import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
  TextInput,
  Dimensions,
} from 'react-native';
import { COLORS, SPACING, FONTS, LABELS } from '../config/theme';
import { firestoreUtils } from '../config/firebase';

const { width } = Dimensions.get('window');

interface Video {
  id: string;
  title: string;
  channel: string;
  views: string;
  time: string;
  thumbnail: string;
  description: string;
  channelImage: string;
}

interface HomeScreenProps {
  userProfile?: any;
  onNavigate: (screen: string, params?: any) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ userProfile, onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [dataSaverMode, setDataSaverMode] = useState(false);

  const categories = ['सभी', 'रोस्टिंग', 'गेमिंग', 'वलॉग', 'टेक', 'संगीत'];

  const videoData: Video[] = [
    {
      id: '1',
      title: 'कैसे बनाएं 2026 में AI से एप्लिकेशन',
      channel: 'Digital Tejbhan',
      views: '3.2 लाख',
      time: '2 महीने पहले',
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324331cd?w=500',
      description: 'AI टूल्स का उपयोग करके मोबाइल एप्लिकेशन कैसे बनाएं।',
      channelImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50',
    },
    {
      id: '2',
      title: 'असीमित बाहुबली थाली चैलेंज',
      channel: 'फूडी इंडिया',
      views: '10 लाख',
      time: '1 दिन पहले',
      thumbnail: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500',
      description: 'भारतीय खाने की असली चुनौती।',
      channelImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=50',
    },
    {
      id: '3',
      title: 'भारतीय टेक इनोवेशन 2026',
      channel: 'Tech Talks India',
      views: '5.5 लाख',
      time: '3 दिन पहले',
      thumbnail: 'https://images.unsplash.com/photo-1591468324173-4bf57ce1b19c?w=500',
      description: 'भारत में सबसे बड़े टेक ट्रेंड्स क्या हैं।',
      channelImage: 'https://images.unsplash.com/photo-1516321318423-f06a6b1ef42f?w=50',
    },
  ];

  const filteredVideos = videoData.filter(v =>
    selectedCategory === 'सभी' ||
    v.channel.includes(selectedCategory)
  );

  const handleVideoPress = useCallback((video: Video) => {
    firestoreUtils.incrementVideoViews(video.id).catch(err => console.error(err));
    onNavigate('VideoPlayer', { video, dataSaverMode });
  }, [dataSaverMode, onNavigate]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.PRIMARY_WHITE} />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>
            🙏 {LABELS.GREETING}, {userProfile?.displayName?.split(' ')[0] || 'मित्र'}!
          </Text>
          <Text style={styles.subGreeting}>आज क्या नया है?</Text>
        </View>
        <TouchableOpacity onPress={() => onNavigate('Notifications')}>
          <Text style={styles.icon}>🔔</Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder={LABELS.SEARCH}
          placeholderTextColor={COLORS.TEXT_MUTED}
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <TouchableOpacity>
          <Text style={styles.searchIcon}>🔍</Text>
        </TouchableOpacity>
      </View>

      {/* Data Saver Toggle */}
      <TouchableOpacity
        style={[styles.dataSaverButton, dataSaverMode && styles.dataSaverActiveButton]}
        onPress={() => setDataSaverMode(!dataSaverMode)}
      >
        <Text style={styles.dataSaverText}>
          {dataSaverMode ? '📊 डेटा बचाव: चालू' : '📊 डेटा बचाव: बंद'}
        </Text>
      </TouchableOpacity>

      {/* Category Scroll */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScroll}
      >
        {categories.map(cat => (
          <TouchableOpacity
            key={cat}
            onPress={() => setSelectedCategory(cat)}
            style={[
              styles.categoryChip,
              selectedCategory === cat && styles.categoryChipActive,
            ]}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === cat && styles.categoryTextActive,
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Video Feed */}
      <FlatList
        data={filteredVideos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleVideoPress(item)}
            style={styles.videoCard}
          >
            {/* Thumbnail */}
            <Image
              source={{ uri: item.thumbnail }}
              style={styles.thumbnail}
            />

            {/* Video Info */}
            <View style={styles.videoInfo}>
              <Image
                source={{ uri: item.channelImage }}
                style={styles.channelImage}
              />
              <View style={styles.videoDetails}>
                <Text style={styles.videoTitle} numberOfLines={2}>
                  {item.title}
                </Text>
                <Text style={styles.channelName}>{item.channel}</Text>
                <Text style={styles.videoMeta}>
                  {item.views} • {item.time}
                </Text>
              </View>
              <TouchableOpacity onPress={() => Alert.alert('विकल्प', 'और विकल्प आ रहे हैं...')}>
                <Text style={styles.moreIcon}>⋮</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        scrollEnabled={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY_WHITE,
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
  greeting: {
    fontSize: FONTS.FONT_SIZE_LG,
    fontWeight: 'bold',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.SM,
  },
  subGreeting: {
    fontSize: FONTS.FONT_SIZE_SM,
    color: COLORS.TEXT_SECONDARY,
  },
  icon: {
    fontSize: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: SPACING.LG,
    marginVertical: SPACING.MD,
    backgroundColor: COLORS.LIGHT_BG,
    borderRadius: 24,
    paddingHorizontal: SPACING.MD,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: COLORS.TEXT_PRIMARY,
    fontSize: FONTS.FONT_SIZE_SM,
  },
  searchIcon: {
    fontSize: 18,
  },
  dataSaverButton: {
    marginHorizontal: SPACING.LG,
    marginBottom: SPACING.MD,
    paddingHorizontal: SPACING.MD,
    paddingVertical: SPACING.SM,
    backgroundColor: COLORS.LIGHT_BG,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.BORDER_COLOR,
  },
  dataSaverActiveButton: {
    backgroundColor: COLORS.PRIMARY_SAFFRON,
    borderColor: COLORS.PRIMARY_SAFFRON,
  },
  dataSaverText: {
    color: COLORS.TEXT_PRIMARY,
    fontSize: FONTS.FONT_SIZE_SM,
    fontWeight: '500',
  },
  categoryScroll: {
    paddingHorizontal: SPACING.LG,
    paddingVertical: SPACING.MD,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER_COLOR,
  },
  categoryChip: {
    paddingHorizontal: SPACING.MD,
    paddingVertical: SPACING.SM,
    borderRadius: 12,
    marginRight: SPACING.MD,
    backgroundColor: COLORS.LIGHT_BG,
  },
  categoryChipActive: {
    backgroundColor: COLORS.PRIMARY_SAFFRON,
  },
  categoryText: {
    fontSize: FONTS.FONT_SIZE_SM,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: '500',
  },
  categoryTextActive: {
    color: COLORS.PRIMARY_WHITE,
  },
  videoCard: {
    marginBottom: SPACING.MD,
  },
  thumbnail: {
    width: '100%',
    height: 240,
    backgroundColor: COLORS.LIGHT_BG,
  },
  videoInfo: {
    flexDirection: 'row',
    padding: SPACING.MD,
    alignItems: 'flex-start',
  },
  channelImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: SPACING.MD,
    backgroundColor: COLORS.LIGHT_BG,
  },
  videoDetails: {
    flex: 1,
  },
  videoTitle: {
    fontSize: FONTS.FONT_SIZE_SM,
    fontWeight: '500',
    color: COLORS.TEXT_PRIMARY,
    lineHeight: 20,
  },
  channelName: {
    fontSize: FONTS.FONT_SIZE_XS,
    color: COLORS.TEXT_SECONDARY,
    marginTop: SPACING.SM,
  },
  videoMeta: {
    fontSize: FONTS.FONT_SIZE_XS,
    color: COLORS.TEXT_MUTED,
    marginTop: SPACING.SM,
  },
  moreIcon: {
    fontSize: 18,
    paddingHorizontal: SPACING.SM,
  },
});

export default HomeScreen;
