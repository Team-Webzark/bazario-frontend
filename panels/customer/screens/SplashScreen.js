// panels/customer/screens/SplashScreen.js

import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  StatusBar,
  Dimensions,
  Image
} from 'react-native';

// Get screen dimensions to size image properly if needed
const { width } = Dimensions.get('window');

export default function SplashScreen({ navigation }) {
  // Animation Values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current; // Start slightly larger

  useEffect(() => {
    // Start Animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    // Navigate after delay
    const timer = setTimeout(() => {
       // Check if user logged in (mock logic)
       const isLoggedIn = false; 
       if (isLoggedIn) {
         navigation.replace('CustomerApp');
       } else {
         navigation.replace('UniversalSignIn');
       }
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Dark content for white background */}
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      
      <Animated.View 
         style={[
           styles.logoContainer, 
           { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }
         ]}
      >
         {/* YOUR LOGO IMAGE */}
         {/* Make sure to save your image in assets folder */}
         <Image 
            source={require('../../../assets/bazario.png')} 
            style={styles.logoImage}
            resizeMode="contain"
         />
         
         {/* Tagline (Optional - since logo has text, you might want to keep it minimal) */}
         <Text style={styles.tagline}>Groceries in minutes</Text>
      </Animated.View>

      <View style={styles.footer}>
         <Text style={styles.footerText}>Made with ❤️ in India</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff', // White background to match logo
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.8, // 80% of screen width
    height: width * 0.8,
  },
  logoImage: {
    width: '100%',
    height: '100%', 
    marginBottom: 20,
  },
  // Since the logo image already has "BAZARIO" text, we removed the duplicate Text component.
  
  tagline: {
    fontSize: 16,
    color: '#666', // Dark Grey for better readability on white
    marginTop: -40, // Pull up slightly if logo has a lot of whitespace
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  footer: {
    position: 'absolute',
    bottom: 40,
  },
  footerText: {
    color: '#999', // Light Grey
    fontSize: 12,
  },
});
