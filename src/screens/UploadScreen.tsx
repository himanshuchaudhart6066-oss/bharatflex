// Upload Screen - BharatFlex V2
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { COLORS, SPACING, FONTS, LABELS } from '../config/theme';
import { AshokaChakraLoader } from '../components/AshokaChakraLoader';
import { muxVideoUtils } from '../utils/muxVideo';
import { firestoreUtils } from '../config/firebase';

interface UploadScreenProps {
  userProfile?: any;
  onUploadComplete?: (videoId: string) => void;
}

export const UploadScreen: React.FC<UploadScreenProps> = ({ userProfile, onUploadComplete }) => {
  const [videoTitle, setVideoTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const handleSelectVideo = () => {
    // In a real app, this would open a file picker
    Alert.alert(
      'वीडियो चुनें',
      'अपनी गैलरी से वीडियो चुनें',
      [
        {
          text: 'गैलरी खोलें',
          onPress: () => {
            // File picker implementation would go here
            Alert.alert('सूचना', 'फ़ाइल पिकर समर्थन जल्द आ रहा है।');
          },
        },
        { text: 'रद्द करें', style: 'cancel' },
      ]
    );
  };

  const handleSelectThumbnail = () => {
    Alert.alert(
      'थंबनेल चुनें',
      'अपनी गैलरी से छवि चुनें',
      [
        {
          text: 'गैलरी खोलें',
          onPress: () => {
            Alert.alert('सूचना', 'फ़ाइल पिकर समर्थन जल्द आ रहा है।');
          },
        },
        { text: 'रद्द करें', style: 'cancel' },
      ]
    );
  };

  const handleUpload = async () => {
    if (!videoTitle.trim()) {
      Alert.alert('त्रुटि', 'कृपया वीडियो का नाम दर्ज करें।');
      return;
    }

    if (!selectedFile) {
      Alert.alert('त्रुटि', 'कृपया एक वीडियो चुनें।');
      return;
    }

    setIsUploading(true);
    try {
      // Get upload URL from Mux
      const uploadURL = await muxVideoUtils.getUploadURL();

      // Simulate upload progress
      for (let i = 0; i <= 100; i++) {
        setUploadProgress(i);
        await new Promise<void>(resolve => setTimeout(resolve, 30));
      }

      // Save video metadata to Firestore
      const videoId = await firestoreUtils.uploadVideoMetadata({
        title: videoTitle,
        description: description,
        channelId: userProfile?.uid,
        channelName: userProfile?.displayName,
        channelImage: userProfile?.photoURL,
        uploadDate: new Date().toISOString(),
        quality: 'high',
      });

      setIsUploading(false);
      Alert.alert(
        'सफलता! 🎉',
        'आपका वीडियो अपलोड हो गया।\nउसे प्रकाशित करने के लिए तैयार हो जाएं।',
        [
          {
            text: 'ठीक है',
            onPress: () => {
              setVideoTitle('');
              setDescription('');
              setSelectedFile(null);
              onUploadComplete?.(videoId);
            },
          },
        ]
      );
    } catch (error) {
      setIsUploading(false);
      console.error('Upload error:', error);
      Alert.alert('त्रुटि', 'अपलोड करने में समस्या हुई।');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.PRIMARY_WHITE} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>{LABELS.UPLOAD_VIDEO}</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Upload Area */}
        <TouchableOpacity style={styles.uploadArea} onPress={handleSelectVideo}>
          <Text style={styles.uploadIcon}>📹</Text>
          <Text style={styles.uploadText}>वीडियो चुनें</Text>
          <Text style={styles.uploadSubText}>MP4, MOV या अन्य वीडियो प्रारूप</Text>
          {selectedFile && <Text style={styles.selectedFile}>✓ वीडियो चुने गए</Text>}
        </TouchableOpacity>

        {/* Thumbnail Selection */}
        <TouchableOpacity style={styles.thumbnailArea} onPress={handleSelectThumbnail}>
          <Text style={styles.thumbnailIcon}>🖼️</Text>
          <Text style={styles.thumbnailText}>{LABELS.SELECT_THUMBNAIL}</Text>
          <Text style={styles.thumbnailSubText}>1280x720 पिक्सेल सुझाई गई है</Text>
        </TouchableOpacity>

        {/* Title Input */}
        <View style={styles.section}>
          <Text style={styles.label}>{LABELS.VIDEO_TITLE}</Text>
          <TextInput
            placeholder="उदा. मेरी पहली वीडियो"
            placeholderTextColor={COLORS.TEXT_MUTED}
            style={styles.input}
            value={videoTitle}
            onChangeText={setVideoTitle}
            maxLength={100}
          />
          <Text style={styles.charCount}>{videoTitle.length}/100</Text>
        </View>

        {/* Description Input */}
        <View style={styles.section}>
          <Text style={styles.label}>{LABELS.VIDEO_DESCRIPTION}</Text>
          <TextInput
            placeholder="विवरण जोड़ें..."
            placeholderTextColor={COLORS.TEXT_MUTED}
            style={[styles.input, styles.descriptionInput]}
            value={description}
            onChangeText={setDescription}
            maxLength={500}
            multiline
          />
          <Text style={styles.charCount}>{description.length}/500</Text>
        </View>

        {/* Upload Button */}
        <TouchableOpacity
          style={[styles.uploadButton, isUploading && styles.uploadButtonDisabled]}
          onPress={handleUpload}
          disabled={isUploading}
        >
          {isUploading ? (
            <View style={styles.uploadingContainer}>
              <AshokaChakraLoader size={30} color={COLORS.PRIMARY_WHITE} />
              <Text style={styles.uploadingText}>{LABELS.UPLOADING}</Text>
            </View>
          ) : (
            <Text style={styles.uploadButtonText}>अभी अपलोड करें ⬆️</Text>
          )}
        </TouchableOpacity>

        {/* Progress Bar */}
        {isUploading && (
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { width: `${uploadProgress}%` }]} />
          </View>
        )}

        {/* Tips Section */}
        <View style={styles.tipsSection}>
          <Text style={styles.tipsTitle}>💡 सलाह</Text>
          <Text style={styles.tipItem}>• अच्छी गुणवत्ता की वीडियो चुनें</Text>
          <Text style={styles.tipItem}>• आकर्षक शीर्षक लिखें</Text>
          <Text style={styles.tipItem}>• विवरण में प्रासंगिक हैशटैग जोड़ें</Text>
          <Text style={styles.tipItem}>• आपकी वीडियो को WhatsApp पर साझा करें</Text>
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
  uploadArea: {
    marginHorizontal: SPACING.LG,
    marginVertical: SPACING.LG,
    paddingVertical: SPACING.XXL * 1.5,
    paddingHorizontal: SPACING.LG,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: COLORS.PRIMARY_SAFFRON,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#FFF9F0',
  },
  uploadIcon: {
    fontSize: 48,
    marginBottom: SPACING.MD,
  },
  uploadText: {
    fontSize: FONTS.FONT_SIZE_MD,
    fontWeight: 'bold',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.SM,
  },
  uploadSubText: {
    fontSize: FONTS.FONT_SIZE_XS,
    color: COLORS.TEXT_SECONDARY,
  },
  selectedFile: {
    fontSize: FONTS.FONT_SIZE_SM,
    color: COLORS.SUCCESS,
    marginTop: SPACING.MD,
    fontWeight: 'bold',
  },
  thumbnailArea: {
    marginHorizontal: SPACING.LG,
    paddingVertical: SPACING.LG,
    paddingHorizontal: SPACING.MD,
    borderWidth: 1,
    borderColor: COLORS.BORDER_COLOR,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: COLORS.LIGHT_BG,
  },
  thumbnailIcon: {
    fontSize: 40,
    marginBottom: SPACING.SM,
  },
  thumbnailText: {
    fontSize: FONTS.FONT_SIZE_SM,
    fontWeight: '600',
    color: COLORS.TEXT_PRIMARY,
  },
  thumbnailSubText: {
    fontSize: FONTS.FONT_SIZE_XS,
    color: COLORS.TEXT_SECONDARY,
    marginTop: SPACING.SM,
  },
  section: {
    marginHorizontal: SPACING.LG,
    marginTop: SPACING.LG,
  },
  label: {
    fontSize: FONTS.FONT_SIZE_MD,
    fontWeight: '600',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.SM,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.BORDER_COLOR,
    borderRadius: 8,
    paddingHorizontal: SPACING.MD,
    paddingVertical: SPACING.MD,
    fontSize: FONTS.FONT_SIZE_SM,
    color: COLORS.TEXT_PRIMARY,
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  charCount: {
    fontSize: FONTS.FONT_SIZE_XS,
    color: COLORS.TEXT_MUTED,
    marginTop: SPACING.SM,
    textAlign: 'right',
  },
  uploadButton: {
    marginHorizontal: SPACING.LG,
    marginVertical: SPACING.LG,
    paddingVertical: SPACING.LG,
    backgroundColor: COLORS.PRIMARY_SAFFRON,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadButtonDisabled: {
    opacity: 0.7,
  },
  uploadButtonText: {
    fontSize: FONTS.FONT_SIZE_MD,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_WHITE,
  },
  uploadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  uploadingText: {
    color: COLORS.PRIMARY_WHITE,
    fontSize: FONTS.FONT_SIZE_SM,
    marginLeft: SPACING.MD,
    fontWeight: '600',
  },
  progressContainer: {
    marginHorizontal: SPACING.LG,
    height: 4,
    backgroundColor: COLORS.LIGHT_BG,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: COLORS.PRIMARY_SAFFRON,
  },
  tipsSection: {
    marginHorizontal: SPACING.LG,
    marginVertical: SPACING.LG,
    paddingHorizontal: SPACING.MD,
    paddingVertical: SPACING.MD,
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

export default UploadScreen;
