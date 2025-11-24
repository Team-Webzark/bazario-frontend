import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Onboarding');
    }, 2000); // 2 second splash
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* <Image source={require('../assets/icon.png')} style={styles.logo} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
    backgroundColor: '#22c55e', // Brand primary green
  },
  logo: { width: 120, height: 120 },
});
