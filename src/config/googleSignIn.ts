// Google Sign-In Configuration for BharatFlex V2
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { firebaseAuth, firestoreUtils } from './firebase';

// Configure Google Sign-In
export const configureGoogleSignIn = () => {
  GoogleSignin.configure({
    webClientId: process.env.REACT_APP_GOOGLE_WEB_CLIENT_ID,
    offlineAccess: true,
    forceCodeForRefreshToken: true,
  });
};

// Google SignIn Functions
export const googleSignInUtils = {
  async signInWithGoogle() {
    try {
      await GoogleSignin.hasPlayServices();
      const { user } = await GoogleSignin.signIn();
      
      // Get ID token
      const { idToken } = await GoogleSignin.getTokens();
      
      // Create Firebase credential
      const credential = firebaseAuth.GoogleAuthProvider.credential(idToken);
      
      // Sign in to Firebase
      const result = await firebaseAuth.signInWithCredential(credential);
      
      // Create/Update user profile in Firestore
      if (result.user) {
        const userProfile = {
          uid: result.user.uid,
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
          lastSignIn: new Date(),
        };
        
        await firestoreUtils.createUserProfile(result.user.uid, userProfile);
        
        return {
          success: true,
          user: result.user,
          userProfile,
        };
      }
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled the login flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Sign in is already in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play services not available');
      } else {
        console.error('Google Sign-In error:', error);
      }
      return { success: false, error };
    }
  },

  async signOutFromGoogle() {
    try {
      await GoogleSignin.signOut();
      return { success: true };
    } catch (error) {
      console.error('Sign out error:', error);
      return { success: false, error };
    }
  },

  async getCurrentUser() {
    try {
      const isSignedIn = await GoogleSignin.isSignedIn();
      if (isSignedIn) {
        const userInfo = await GoogleSignin.getCurrentUser();
        return userInfo;
      }
      return null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  },
};

export default googleSignInUtils;
