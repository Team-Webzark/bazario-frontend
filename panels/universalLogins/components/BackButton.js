import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function BackButton({ navigation, onPress, style, fallbackRoute = null }) {
  const handlePress = () => {
    if (onPress) {
      onPress();
    } else if (navigation) {
      try {
        // Check if we can go back
        if (typeof navigation.canGoBack === 'function' && navigation.canGoBack()) {
          navigation.goBack();
        } else {
          // If we can't go back, navigate to fallback route or default screen
          if (fallbackRoute) {
            navigation.navigate(fallbackRoute);
          } else {
            // Default fallback: try to navigate to sign in screen
            try {
              navigation.navigate('UniversalSignIn');
            } catch (e) {
              // If that fails, try to reset to splash
              try {
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Splash' }],
                });
              } catch (err) {
                console.warn('Navigation error:', err);
              }
            }
          }
        }
      } catch (error) {
        // If goBack fails, try fallback navigation
        console.warn('goBack failed, using fallback:', error);
        if (fallbackRoute) {
          try {
            navigation.navigate(fallbackRoute);
          } catch (e) {
            try {
              navigation.navigate('UniversalSignIn');
            } catch (err) {
              console.warn('Fallback navigation failed:', err);
            }
          }
        } else {
          try {
            navigation.navigate('UniversalSignIn');
          } catch (e) {
            console.warn('Navigation to UniversalSignIn failed:', e);
          }
        }
      }
    }
  };

  // Always show the back button if navigation exists
  if (!navigation) {
    return null;
  }

  return (
    <TouchableOpacity
      style={[styles.backButton, style]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <Ionicons name="arrow-back" size={24} color="#333" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginLeft: 16,
    marginTop: 16,
  },
});

