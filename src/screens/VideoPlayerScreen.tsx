// Video Player Screen - BharatFlex V2
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  Dimensions,
} from 'react-native';
import { COLORS, SPACING, FONTS, LABELS } from '../config/theme';
import { whatsappShareUtils } from '../utils/whatsappShare';

const { width, height } = Dimensions.get('window');

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

interface VideoPlayerProps {
  route?: { params?: { video: Video; dataSaverMode: boolean } };
  onNavigate?: (screen: string) => void;
}

export const VideoPlayerScreen: React.FC<VideoPlayerProps> = ({ route, onNavigate }) => {
  const video = route?.params?.video || {
    id: '1',
    title: 'सैंपल वीडियो',
    channel: 'BharatFlex',
    views: '1.2 लाख',
    time: '1 सप्ताह पहले',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324331cd?w=500',
    description: 'यह एक सैंपल वीडियो विवरण है।',
    channelImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50',
  };

  const dataSaverMode = route?.params?.dataSaverMode || false;
  const [isLiked, setIsLiked] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [likeCount, setLikeCount] = useState(15200);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  const handleSubscribe = () => {
    setIsSubscribed(!isSubscribed);
    Alert.alert(
      isSubscribed ? 'सदस्यता रद्द' : 'सदस्यता लीं',
      isSubscribed
        ? 'आपने इस चैनल की सदस्यता समाप्त कर दी है।'
        : 'आपने इस चैनल की सदस्यता ले ली है! 🎉'
    );
  };

  const handleShare = async () => {
    try {
      await whatsappShareUtils.shareOnWhatsApp({
        videoTitle: video.title,
        videoUrl: `bharatflex://video/${video.id}`,
        channelName: video.channel,
      });
    } catch (error) {
      console.error('Share error:', error);
    }
  };

  const handleComment = () => {
    Alert.alert('कमेंट', 'कमेंट सेक्शन जल्द आ रहा है।');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.DARK_BG} />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Video Player Area */}
        <View style={styles.playerContainer}>
          <Image
            source={{ uri: video.thumbnail }}
            style={styles.thumbnail}
          />
          <TouchableOpacity style={styles.playButton}>
            <Text style={styles.playIcon}>▶️</Text>
          </TouchableOpacity>

          {/* Data Saver Badge */}
          {dataSaverMode && (
            <View style={styles.dataSaverBadge}>
              <Text style={styles.dataSaverText}>📊 डेटा बचाना चालू है</Text>
            </View>
          )}
        </View>

        {/* Video Info */}
        <View style={styles.infoSection}>
          {/* Title */}
          <Text style={styles.videoTitle}>{video.title}</Text>

          {/* Views and Time */}
          <Text style={styles.viewsAndTime}>
            {video.views} • {video.time}
          </Text>

          {/* Action Buttons Row */}
          <View style={styles.actionButtonsRow}>
            <TouchableOpacity style={styles.miniButton} onPress={handleLike}>
              <Text style={styles.buttonIcon}>{isLiked ? '❤️' : '🤍'}</Text>
              <Text style={styles.buttonText}>{(likeCount / 1000).toFixed(1)}K</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.miniButton} onPress={handleComment}>
              <Text style={styles.buttonIcon}>💬</Text>
              <Text style={styles.buttonText}>2.5K</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.miniButton} onPress={handleShare}>
              <Text style={styles.buttonIcon}>🔗</Text>
              <Text style={styles.buttonText}>शेयर करें</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.miniButton}>
              <Text style={styles.buttonIcon}>📥</Text>
              <Text style={styles.buttonText}>बचाएं</Text>
            </TouchableOpacity>
          </View>

          {/* Channel Section */}
          <View style={styles.channelSection}>
            <Image source={{ uri: video.channelImage }} style={styles.channelImage} />
            <View style={styles.channelInfo}>
              <Text style={styles.channelName}>{video.channel}</Text>
              <Text style={styles.subscriberCount}>8.9K जुड़े हुए</Text>
            </View>
            <TouchableOpacity
              style={[styles.subscribeButton, isSubscribed && styles.subscribeButtonActive]}
              onPress={handleSubscribe}
            >
              <Text style={styles.subscribeButtonText}>
                {isSubscribed ? '✓ जुड़े हुए' : 'सब्सक्राइब'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Description */}
          <TouchableOpacity style={styles.descriptionSection}>
            <Text style={styles.descriptionText} numberOfLines={2}>
              {video.description}
            </Text>
            <Text style={styles.readMore}>और दिखाएं</Text>
          </TouchableOpacity>

          {/* WhatsApp Share Button */}
          <TouchableOpacity style={styles.whatsappShareButton} onPress={handleShare}>
            <Text style={styles.whatsappIcon}>💬</Text>
            <Text style={styles.whatsappShareText}>{LABELS.WHATSAPP_SHARE}</Text>
          </TouchableOpacity>

          {/* Data Saver Option */}
          <View style={styles.qualityOption}>
            <Text style={styles.qualityLabel}>वीडियो गुणवत्ता:</Text>
            <View style={styles.qualityButtonsRow}>
              <TouchableOpacity style={[styles.qualityButton, !dataSaverMode && styles.qualityButtonActive]}>
                <Text style={[styles.qualityButtonText, !dataSaverMode && styles.qualityButtonTextActive]}>
                  HD
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.qualityButton, dataSaverMode && styles.qualityButtonActive]}>
                <Text style={[styles.qualityButtonText, dataSaverMode && styles.qualityButtonTextActive]}>
                  SD (डेटा बचाएं)
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Comments Section */}
          <View style={styles.commentsSection}>
            <Text style={styles.commentsSectionTitle}>कमेंट्स (250)</Text>
            
            {/* Sample Comment */}
            <View style={styles.commentItem}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40' }}
                style={styles.commentAvatar}
              />
              <View style={styles.commentContent}>
                <Text style={styles.commentAuthor}>भारतफ्लेक्स दर्शक</Text>
                <Text style={styles.commentText}>
                  शानदार वीडियो! बहुत अच्छी सामग्री। 🙌
                </Text>
                <View style={styles.commentActions}>
                  <TouchableOpacity>
                    <Text style={styles.commentActionText}>👍 पसंद</Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text style={styles.commentActionText}>💬 जवाब</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
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
  playerContainer: {
    width: width,
    height: (width * 9) / 16,
    backgroundColor: COLORS.DARK_BG,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  playButton: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  playIcon: {
    fontSize: 32,
  },
  dataSaverBadge: {
    position: 'absolute',
    top: SPACING.MD,
    right: SPACING.MD,
    paddingHorizontal: SPACING.MD,
    paddingVertical: SPACING.SM,
    backgroundColor: 'rgba(255, 153, 51, 0.8)',
    borderRadius: 4,
  },
  dataSaverText: {
    color: COLORS.PRIMARY_WHITE,
    fontSize: FONTS.FONT_SIZE_XS,
    fontWeight: 'bold',
  },
  infoSection: {
    padding: SPACING.LG,
  },
  videoTitle: {
    fontSize: FONTS.FONT_SIZE_MD,
    fontWeight: 'bold',
    color: COLORS.TEXT_PRIMARY,
    lineHeight: 24,
    marginBottom: SPACING.SM,
  },
  viewsAndTime: {
    fontSize: FONTS.FONT_SIZE_SM,
    color: COLORS.TEXT_SECONDARY,
    marginBottom: SPACING.MD,
  },
  actionButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: SPACING.MD,
    borderTopWidth: 1,
    borderTopColor: COLORS.BORDER_COLOR,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER_COLOR,
    marginBottom: SPACING.MD,
  },
  miniButton: {
    alignItems: 'center',
    flex: 1,
  },
  buttonIcon: {
    fontSize: 20,
    marginBottom: SPACING.SM,
  },
  buttonText: {
    fontSize: FONTS.FONT_SIZE_XS,
    color: COLORS.TEXT_PRIMARY,
  },
  channelSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.MD,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER_COLOR,
  },
  channelImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: SPACING.MD,
  },
  channelInfo: {
    flex: 1,
  },
  channelName: {
    fontSize: FONTS.FONT_SIZE_SM,
    fontWeight: '600',
    color: COLORS.TEXT_PRIMARY,
  },
  subscriberCount: {
    fontSize: FONTS.FONT_SIZE_XS,
    color: COLORS.TEXT_SECONDARY,
    marginTop: SPACING.SM,
  },
  subscribeButton: {
    paddingHorizontal: SPACING.MD,
    paddingVertical: SPACING.SM,
    borderRadius: 6,
    backgroundColor: COLORS.PRIMARY_SAFFRON,
  },
  subscribeButtonActive: {
    backgroundColor: COLORS.LIGHT_BG,
  },
  subscribeButtonText: {
    fontSize: FONTS.FONT_SIZE_SM,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_WHITE,
  },
  descriptionSection: {
    paddingVertical: SPACING.MD,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER_COLOR,
  },
  descriptionText: {
    fontSize: FONTS.FONT_SIZE_SM,
    color: COLORS.TEXT_PRIMARY,
    lineHeight: 20,
    marginBottom: SPACING.SM,
  },
  readMore: {
    fontSize: FONTS.FONT_SIZE_SM,
    fontWeight: 'bold',
    color: COLORS.TEXT_SECONDARY,
  },
  whatsappShareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.LG,
    paddingVertical: SPACING.MD,
    paddingHorizontal: SPACING.MD,
    backgroundColor: '#25D366',
    borderRadius: 8,
    justifyContent: 'center',
  },
  whatsappIcon: {
    fontSize: 20,
    marginRight: SPACING.SM,
  },
  whatsappShareText: {
    color: COLORS.PRIMARY_WHITE,
    fontWeight: 'bold',
    fontSize: FONTS.FONT_SIZE_SM,
  },
  qualityOption: {
    marginTop: SPACING.LG,
    paddingBottom: SPACING.LG,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER_COLOR,
  },
  qualityLabel: {
    fontSize: FONTS.FONT_SIZE_SM,
    fontWeight: '600',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.SM,
  },
  qualityButtonsRow: {
    flexDirection: 'row',
    gap: SPACING.MD,
  },
  qualityButton: {
    flex: 1,
    paddingVertical: SPACING.SM,
    borderWidth: 1,
    borderColor: COLORS.BORDER_COLOR,
    borderRadius: 6,
    alignItems: 'center',
  },
  qualityButtonActive: {
    backgroundColor: COLORS.PRIMARY_SAFFRON,
    borderColor: COLORS.PRIMARY_SAFFRON,
  },
  qualityButtonText: {
    fontSize: FONTS.FONT_SIZE_XS,
    fontWeight: '500',
    color: COLORS.TEXT_PRIMARY,
  },
  qualityButtonTextActive: {
    color: COLORS.PRIMARY_WHITE,
  },
  commentsSection: {
    marginTop: SPACING.LG,
  },
  commentsSectionTitle: {
    fontSize: FONTS.FONT_SIZE_MD,
    fontWeight: 'bold',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.MD,
  },
  commentItem: {
    flexDirection: 'row',
    marginBottom: SPACING.MD,
  },
  commentAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: SPACING.MD,
  },
  commentContent: {
    flex: 1,
  },
  commentAuthor: {
    fontSize: FONTS.FONT_SIZE_SM,
    fontWeight: '600',
    color: COLORS.TEXT_PRIMARY,
  },
  commentText: {
    fontSize: FONTS.FONT_SIZE_SM,
    color: COLORS.TEXT_PRIMARY,
    marginTop: SPACING.SM,
    lineHeight: 18,
  },
  commentActions: {
    flexDirection: 'row',
    marginTop: SPACING.SM,
  },
  commentActionText: {
    fontSize: FONTS.FONT_SIZE_XS,
    color: COLORS.TEXT_SECONDARY,
    marginRight: SPACING.LG,
  },
});

export default VideoPlayerScreen;
