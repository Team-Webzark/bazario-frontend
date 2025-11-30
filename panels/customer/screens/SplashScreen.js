// panels/customer/screens/SplashScreen.js
import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  StatusBar,
  Dimensions,
  Image,
  Easing
} from 'react-native';

const { width, height } = Dimensions.get('window');

// Brand Colors
const COLOR_ORANGE = '#F57C00';
const COLOR_GREEN = '#12783D';

export default function SplashScreen({ navigation }) {
  // --- Animation Values ---
  // 1. Logo Entrance
  const logoScale = useRef(new Animated.Value(0)).current;
  const logoRotate = useRef(new Animated.Value(0)).current;
  
  // 2. Shockwaves (Rings behind logo)
  const ripple1 = useRef(new Animated.Value(0)).current;
  const ripple2 = useRef(new Animated.Value(0)).current;
  const ripple3 = useRef(new Animated.Value(0)).current;

  // 3. Background Blobs Movement
  const blobRotate = useRef(new Animated.Value(0)).current;

  // 4. Text Entrance
  const textOpacity = useRef(new Animated.Value(0)).current;
  const textTranslate = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    // --- A. Start Background Rotation (Loop) ---
    Animated.loop(
      Animated.timing(blobRotate, {
        toValue: 1,
        duration: 10000, // 10 seconds per full rotation (Slow & Smooth)
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    // --- B. Start Ripple/Shockwave Effect (Loop) ---
    const createRipple = (anim, delay) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(anim, {
            toValue: 1,
            duration: 2000,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      );
    };

    createRipple(ripple1, 0).start();
    createRipple(ripple2, 600).start();
    createRipple(ripple3, 1200).start();

    // --- C. Main Entry Sequence ---
    Animated.sequence([
      // 1. Wait a tiny bit
      Animated.delay(300),
      
      // 2. Logo Spins & Pops In
      Animated.parallel([
        Animated.spring(logoScale, {
          toValue: 1,
          friction: 4,    // Extra Bouncy
          tension: 60,
          useNativeDriver: true,
        }),
        Animated.timing(logoRotate, {
          toValue: 1,
          duration: 800,
          easing: Easing.out(Easing.exp), // Fast spin at start, slows down
          useNativeDriver: true,
        })
      ]),

      // 3. Text Slides Up
      Animated.parallel([
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.spring(textTranslate, {
          toValue: 0,
          friction: 6,
          useNativeDriver: true,
        })
      ])
    ]).start(() => {
      // --- D. After Entry: Continuous "Heartbeat" (Breathing) ---
      // This runs after the logo has landed
      Animated.loop(
        Animated.sequence([
          Animated.timing(logoScale, {
            toValue: 1.08, // Scale up slightly
            duration: 800,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(logoScale, {
            toValue: 1,    // Scale back down
            duration: 800,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          })
        ])
      ).start();
    });

    // --- Navigation Timer ---
    const timer = setTimeout(() => {
      // Mock Auth Check
      const isLoggedIn = false; 
      if (isLoggedIn) {
        navigation.replace('CustomerApp');
      } else {
        navigation.replace('UniversalSignIn');
      }
    }, 3500); // Keep user for 3.5s to impress them

    return () => clearTimeout(timer);
  }, [navigation]);

  // Helper to render ripples
  const renderRipple = (animValue, color) => {
    return (
      <Animated.View
        style={[
          styles.ripple,
          {
            borderColor: color,
            opacity: animValue.interpolate({
              inputRange: [0, 0.7, 1],
              outputRange: [0.8, 0.4, 0], // Fade out as it expands
            }),
            transform: [
              { scale: animValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.5, 2.5] // Expand from small to huge
                }) 
              }
            ]
          }
        ]}
      />
    );
  };

  // Interpolate Rotation Values
  const spin = logoRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['-180deg', '0deg'] // Spin 180 degrees
  });

  const bgSpin = blobRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />

      {/* --- ROTATING BACKGROUND BLOBS --- */}
      <Animated.View 
        style={[
          styles.backgroundContainer, 
          { transform: [{ rotate: bgSpin }] }
        ]}
      >
        <View style={[styles.blob, styles.blobOrange]} />
        <View style={[styles.blob, styles.blobGreen]} />
      </Animated.View>

      {/* --- SHOCKWAVES (Behind Logo) --- */}
      <View style={styles.rippleContainer}>
        {renderRipple(ripple1, COLOR_ORANGE)}
        {renderRipple(ripple2, COLOR_GREEN)}
        {renderRipple(ripple3, COLOR_ORANGE)}
      </View>

      {/* --- MAIN LOGO --- */}
      <Animated.View 
        style={[
          styles.logoContainer,
          { 
            transform: [
              { scale: logoScale },
              { rotate: spin }
            ] 
          }
        ]}
      >
        <Image 
          source={require('../../../assets/bazario.png')} 
          style={styles.logoImage}
          resizeMode="contain"
        />
      </Animated.View>

      {/* --- TAGLINE --- */}
      <Animated.View 
        style={[
          styles.textContainer,
          { 
            opacity: textOpacity,
            transform: [{ translateY: textTranslate }]
          }
        ]}
      >
        <Text style={styles.tagline}>Groceries in minutes</Text>
        <View style={styles.divider} />
      </Animated.View>

      {/* --- FOOTER --- */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Made with ❤️ by WEBZARK</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  // Background Rotating Blobs
  backgroundContainer: {
    position: 'absolute',
    width: width * 1.5,
    height: width * 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blob: {
    position: 'absolute',
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: width,
    opacity: 0.08, // Very light background
  },
  blobOrange: {
    backgroundColor: COLOR_ORANGE,
    top: 0,
    left: -width * 0.2,
  },
  blobGreen: {
    backgroundColor: COLOR_GREEN,
    bottom: 0,
    right: -width * 0.2,
  },

  // Shockwaves
  rippleContainer: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ripple: {
    position: 'absolute',
    width: width * 0.5,
    height: width * 0.5,
    borderRadius: width,
    borderWidth: 2, // Thin rings
    zIndex: -1,
  },

  // Logo
  logoContainer: {
    width: width * 0.6,
    height: width * 0.6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: width,
    // Strong Shadow for "Floating" effect
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 25,
    elevation: 15,
    padding: 20,
    zIndex: 10,
  },
  logoImage: {
    width: '90%',
    height: '90%',
  },

  // Text
  textContainer: {
    marginTop: 40,
    alignItems: 'center',
    zIndex: 10,
  },
  tagline: {
    fontSize: 20,
    color: '#333',
    fontWeight: '800', // Extra Bold
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  divider: {
    width: 40,
    height: 4,
    backgroundColor: COLOR_ORANGE,
    borderRadius: 2,
    marginTop: 10,
  },

  footer: {
    position: 'absolute',
    bottom: 40,
  },
  footerText: {
    color: '#aaa',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
  },
});
