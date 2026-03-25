// BharatFlex V2 - Main App Component
import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as ExpoSplashScreen from 'expo-splash-screen';
import { COLORS, SPACING, FONTS } from './src/config/theme';
import { configureGoogleSignIn } from './src/config/googleSignIn';
import { validateEnvironmentVariables } from './src/config/env';

// Screens
import { AuthScreen } from './src/screens/AuthScreen';
import { SplashScreen } from './src/components/SplashScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { ShortsScreen } from './src/screens/ShortsScreen';
import { UploadScreen } from './src/screens/UploadScreen';
import { AnalyticsScreen } from './src/screens/AnalyticsScreen';
import { YouScreen } from './src/screens/YouScreen';
import { VideoPlayerScreen } from './src/screens/VideoPlayerScreen';
import { AdminScreen } from './src/screens/AdminScreen';

// Navigation Setup
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tab Navigator
const BottomTabNavigator = ({ userProfile }: { userProfile: any }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({ 
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.PRIMARY_WHITE,
          borderTopWidth: 1,
          borderTopColor: COLORS.BORDER_COLOR,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: FONTS.FONT_SIZE_XS,
          marginTop: 4,
        },
        tabBarActiveTintColor: COLORS.PRIMARY_SAFFRON,
        tabBarInactiveTintColor: COLORS.TEXT_SECONDARY,
      })}
    >
      <Tab.Screen
        name="Home"
        options={{
          tabBarLabel: 'होम',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>🏠</Text>,
        }}
        children={() => (
          <HomeScreen userProfile={userProfile} onNavigate={() => {}} />
        )}
      />
      <Tab.Screen
        name="Shorts"
        options={{
          tabBarLabel: 'शॉर्ट्स',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>⚡</Text>,
        }}
        children={() => <ShortsScreen />}
      />
      <Tab.Screen
        name="Upload"
        options={{
          tabBarLabel: 'डालें',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>➕</Text>,
        }}
        children={() => (
          <UploadScreen userProfile={userProfile} onUploadComplete={() => {}} />
        )}
      />
      <Tab.Screen
        name="Subscriptions"
        options={{
          tabBarLabel: 'जुड़े',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>📺</Text>,
        }}
        children={() => (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>सब्सक्राइबर्स स्क्रीन - जल्द आ रहा है</Text>
          </View>
        )}
      />
      <Tab.Screen
        name="You"
        options={{
          tabBarLabel: 'आप',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>👤</Text>,
        }}
        children={() => <YouScreen userProfile={userProfile} onNavigate={() => {}} />}
      />
      <Tab.Screen
        name="Admin"
        options={{
          tabBarLabel: '👑',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>👑</Text>,
        }}
        children={() => <AdminScreen />}
      />
    </Tab.Navigator>
  );
};

// Main App Component
const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Validate environment variables are configured
    const envValid = validateEnvironmentVariables();
    if (!envValid) {
      console.warn(
        '⚠️ Some environment variables are missing. ' +
        'See .env.example and ENVIRONMENT_SETUP.md for setup instructions.'
      );
    }

    // Configure Google Sign-In
    configureGoogleSignIn();

    // Hide splash screen after 1.5 seconds
    const timer = setTimeout(() => {
      setShowSplash(false);
      ExpoSplashScreen.hideAsync();
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleAuthSuccess = (user: any) => {
    setUserProfile(user);
  };

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {!userProfile ? (
          <Stack.Screen
            name="Auth"
            options={{
              headerShown: false,
            }}
            children={() => (
              <AuthScreen onAuthSuccess={handleAuthSuccess} />
            )}
          />
        ) : (
          <>
            <Stack.Screen
              name="MainApp"
              options={{
                headerShown: false,
              }}
              children={() => <BottomTabNavigator userProfile={userProfile} />}
            />
            <Stack.Screen
              name="VideoPlayer"
              options={{
                headerShown: false,
              }}
              children={() => <VideoPlayerScreen route={{ params: {} }} onNavigate={() => {}} />}
            />
            <Stack.Screen
              name="Analytics"
              children={() => (
                <AnalyticsScreen userProfile={userProfile} onNavigate={() => {}} />
              )}
              options={{
                headerShown: false,
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
