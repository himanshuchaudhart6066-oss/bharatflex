// Firebase Configuration for BharatFlex V2
import { initializeApp } from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import analytics from '@react-native-firebase/analytics';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase (Already done by @react-native-firebase/app)
const app = initializeApp(firebaseConfig);

export const firebaseAuth = auth();
export const firebaseDb = firestore();
export const firebaseAnalytics = analytics();

// Firestore Collections
export const COLLECTIONS = {
  USERS: 'users',
  VIDEOS: 'videos',
  CHANNELS: 'channels',
  ANALYTICS: 'analytics',
  SUBSCRIPTIONS: 'subscriptions',
  COMMENTS: 'comments',
};

// Firestore Utility Functions
export const firestoreUtils = {
  // User functions
  async createUserProfile(userId: string, userData: any) {
    try {
      await firebaseDb.collection(COLLECTIONS.USERS).doc(userId).set({
        ...userData,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error('Error creating user profile:', error);
      throw error;
    }
  },

  async getUserProfile(userId: string) {
    try {
      const doc = await firebaseDb.collection(COLLECTIONS.USERS).doc(userId).get();
      return doc.exists ? doc.data() : null;
    } catch (error) {
      console.error('Error getting user profile:', error);
      throw error;
    }
  },

  // Video functions
  async uploadVideoMetadata(videoData: any) {
    try {
      const docRef = await firebaseDb.collection(COLLECTIONS.VIDEOS).add({
        ...videoData,
        views: 0,
        likes: 0,
        comments: 0,
        shares: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error uploading video metadata:', error);
      throw error;
    }
  },

  async incrementVideoViews(videoId: string) {
    try {
      await firebaseDb.collection(COLLECTIONS.VIDEOS).doc(videoId).update({
        views: firestore.FieldValue.increment(1),
      });
    } catch (error) {
      console.error('Error incrementing video views:', error);
      throw error;
    }
  },

  // Analytics functions
  async getAnalytics(userId: string) {
    try {
      const doc = await firebaseDb.collection(COLLECTIONS.ANALYTICS).doc(userId).get();
      return doc.exists ? doc.data() : null;
    } catch (error) {
      console.error('Error getting analytics:', error);
      throw error;
    }
  },

  async updateAnalytics(userId: string, analyticsData: any) {
    try {
      await firebaseDb.collection(COLLECTIONS.ANALYTICS).doc(userId).update({
        ...analyticsData,
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error('Error updating analytics:', error);
      throw error;
    }
  },

  // Admin functions
  async getAllVideos() {
    try {
      const snapshot = await firebaseDb
        .collection(COLLECTIONS.VIDEOS)
        .orderBy('createdAt', 'desc')
        .get();
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error('Error getting all videos:', error);
      throw error;
    }
  },

  async deleteVideo(videoId: string) {
    try {
      await firebaseDb.collection(COLLECTIONS.VIDEOS).doc(videoId).delete();
    } catch (error) {
      console.error('Error deleting video:', error);
      throw error;
    }
  },

  async getAppAnalytics() {
    try {
      const videosSnapshot = await firebaseDb.collection(COLLECTIONS.VIDEOS).get();
      const usersSnapshot = await firebaseDb.collection(COLLECTIONS.USERS).get();
      
      let totalWatchTime = 0;
      let totalEarnings = 0;
      
      videosSnapshot.docs.forEach(doc => {
        const data = doc.data() as any;
        totalWatchTime += (data.views || 0) * 5; // Assume 5 min average per view
        totalEarnings += (data.views || 0) * 0.02; // Assume $0.02 per view
      });

      return {
        totalInstalls: usersSnapshot.size,
        totalVideos: videosSnapshot.size,
        totalWatchTime,
        totalEarnings,
        totalUsers: usersSnapshot.size,
      };
    } catch (error) {
      console.error('Error getting app analytics:', error);
      throw error;
    }
  },
};

export default app;
