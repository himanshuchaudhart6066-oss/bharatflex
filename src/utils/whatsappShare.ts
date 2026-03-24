// WhatsApp Sharing Utility
import { Linking, Alert } from 'react-native';

interface ShareVideoParams {
  videoTitle: string;
  videoUrl: string;
  channelName?: string;
  customMessage?: string;
}

export const whatsappShareUtils = {
  // Generate WhatsApp share message
  generateShareMessage(params: ShareVideoParams): string {
    const { videoTitle, channelName, customMessage } = params;
    const baseMessage = customMessage 
      ? customMessage 
      : `देखो यह वीडियो! 🎥\n\n${videoTitle}`;
    
    const channelInfo = channelName ? `\n\n📱 ${channelName} के साथ BharatFlex पर देखें` : '';
    
    return `${baseMessage}${channelInfo}\n\n🇮🇳 BharatFlex - Desi Swag का साथ`;
  },

  // Share video on WhatsApp
  async shareOnWhatsApp(params: ShareVideoParams): Promise<void> {
    try {
      const message = this.generateShareMessage(params);
      const encodedMessage = encodeURIComponent(message);
      
      const whatsappUrl = `whatsapp://send?text=${encodedMessage}`;
      
      const canOpen = await Linking.canOpenURL(whatsappUrl);
      
      if (canOpen) {
        await Linking.openURL(whatsappUrl);
      } else {
        Alert.alert(
          'WhatsApp नहीं मिला',
          'कृपया पहले WhatsApp इंस्टॉल करें।',
          [{ text: 'ठीक है' }]
        );
      }
    } catch (error) {
      console.error('Error sharing on WhatsApp:', error);
      Alert.alert('त्रुटि', 'शेयर करने में समस्या हुई। कृपया बाद में कोशिश करें।');
    }
  },

  // Share video with image on WhatsApp (for groups)
  async shareWithThumbnail(params: ShareVideoParams, thumbnailUrl?: string): Promise<void> {
    try {
      const message = this.generateShareMessage(params);
      
      // If thumbnail is available, we can include it in the share intent
      // This depends on the platform implementation
      await this.shareOnWhatsApp(params);
    } catch (error) {
      console.error('Error sharing with thumbnail:', error);
      throw error;
    }
  },

  // Quick share button handler
  async quickShareVideo(
    videoTitle: string,
    videUrl: string,
    channelName?: string
  ): Promise<void> {
    await this.shareOnWhatsApp({
      videoTitle,
      videoUrl: videUrl,
      channelName,
    });
  },

  // Create sharable link
  createShareableLink(videoId: string, channelId: string): string {
    return `bharatflex://video/${videoId}?channel=${channelId}`;
  },
};

export default whatsappShareUtils;
