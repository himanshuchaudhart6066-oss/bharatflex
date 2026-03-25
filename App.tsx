import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';

const App = (): JSX.Element => {
  const userName = 'User';

  return (
    <View style={styles.container}>
      <StatusBar barStyle='light-content' />
      <Text style={styles.greeting}>नमस्ते, {userName}! आज क्या नया है?</Text>
      <Text style={styles.title}>BharatFlex</Text>
      <Text style={styles.subtitle}>वीडियो चढ़ रहा है...</Text>
      <Text style={styles.info}>जुड़े हुए लोग: 1234 | डेटा बचाएं</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  greeting: {
    fontSize: 20,
    color: '#000080',
    fontWeight: 'bold',
    marginBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF9933',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#000080',
    marginBottom: 4,
  },
  info: {
    fontSize: 16,
    color: '#000080',
    marginTop: 12,
  },
});

export default App;
