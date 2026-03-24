// Mux Video Integration Utilities
// Get credentials from .env file (Mux Token ID and API Key)

const MUX_TOKEN_ID = process.env.REACT_APP_MUX_TOKEN_ID || '';
const MUX_API_KEY = process.env.REACT_APP_MUX_API_KEY || '';
const MUX_API_BASE = 'https://api.mux.com/video/v1';

interface MuxUploadURLResponse {
  data: {
    id: string;
    url: string;
  };
}

interface MuxAssetResponse {
  data: {
    id: string;
    status: string;
    playback_ids?: Array<{ id: string; policy: string }>;
  };
}

export const muxVideoUtils = {
  // Get upload URL from Mux
  async getUploadURL(): Promise<string> {
    try {
      const auth = Buffer.from(`${MUX_TOKEN_ID}:${MUX_API_KEY}`).toString('base64');
      
      const response = await fetch(`${MUX_API_BASE}/uploads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${auth}`,
        },
        body: JSON.stringify({
          cors_origin: '*',
        }),
      });

      const data: MuxUploadURLResponse = await response.json();
      return data.data.url;
    } catch (error) {
      console.error('Error getting Mux upload URL:', error);
      throw error;
    }
  },

  // Upload video file to Mux
  async uploadVideoToMux(filePath: string, uploadURL: string): Promise<void> {
    try {
      const file = {
        uri: filePath,
        type: 'video/mp4',
        name: 'bharatflex_video.mp4',
      };

      const formData = new FormData();
      formData.append('file', file as any);

      const response = await fetch(uploadURL, {
        method: 'PUT',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (!response.ok) {
        throw new Error(`Upload failed with status ${response.status}`);
      }
    } catch (error) {
      console.error('Error uploading video to Mux:', error);
      throw error;
    }
  },

  // Get video asset status
  async getAssetStatus(assetId: string): Promise<MuxAssetResponse> {
    try {
      const auth = Buffer.from(`${MUX_TOKEN_ID}:${MUX_API_KEY}`).toString('base64');
      
      const response = await fetch(`${MUX_API_BASE}/assets/${assetId}`, {
        headers: {
          'Authorization': `Basic ${auth}`,
        },
      });

      const data: MuxAssetResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error getting asset status:', error);
      throw error;
    }
  },

  // Get playback URL
  getPlaybackURL(playbackId: string, quality: 'high' | 'medium' | 'low' = 'high'): string {
    const qualityParams = {
      high: '?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
      medium: '?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
      low: '?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
    };

    return `https://image.mux.com/${playbackId}/animated.gif${qualityParams[quality]}`;
  },

  // Quality preset for data saver mode
  getQualityPreset(dataSaverMode: boolean): string {
    return dataSaverMode ? 'low' : 'high';
  },
};

export default muxVideoUtils;
