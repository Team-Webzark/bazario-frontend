import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  StatusBar,
  Dimensions
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

export default function SplashScreen({ navigation }) {
  // Animation Values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;

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
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();

    // Navigate after delay
    const timer = setTimeout(() => {
       // Check if user logged in (mock logic)
       const isLoggedIn = false; 
       if (isLoggedIn) {
          // If logged in, go to Main Customer App
          navigation.replace('CustomerApp');
       } else {
          // If not logged in, go to Onboarding (or straight to RoleSelection if preferred)
          navigation.replace('OnboardingCarousel');
       }
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#12783D" barStyle="light-content" />
      
      <Animated.View 
         style={[
            styles.logoContainer, 
            { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }
         ]}
      >
         <View style={styles.iconCircle}>
            <Ionicons name="basket" size={60} color="#12783D" />
         </View>
         
         <Text style={styles.appName}>Bazario</Text>
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
    backgroundColor: '#12783D', // Brand Primary Color
  },
  logoContainer: {
    alignItems: 'center',
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 10, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  appName: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 16,
    color: '#E8F5E9',
    opacity: 0.9,
  },
  footer: {
    position: 'absolute',
    bottom: 40,
  },
  footerText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
  },
});



