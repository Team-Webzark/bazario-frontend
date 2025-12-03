import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SuccessScreen = ({ navigation }) => {
  const scaleAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      navigation.navigate('DeliveryHome');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Confetti Background */}
      <View style={styles.confettiContainer}>
        <Text style={styles.confetti}>🎉</Text>
        <Text style={styles.confetti}>✨</Text>
        <Text style={styles.confetti}>⭐</Text>
        <Text style={styles.confetti}>💚</Text>
        <Text style={styles.confetti}>✓</Text>
      </View>

      {/* Success Check */}
      <Animated.View style={[styles.checkContainer, { transform: [{ scale: scaleAnim }] }]}>
        <View style={styles.checkCircle}>
          <Text style={styles.checkmark}>✓</Text>
        </View>
      </Animated.View>

      <Text style={styles.title}>Order Delivered{'\n'}Successfully!</Text>
      <Text style={styles.earnings}>You earned ₹45</Text>
      <Text style={styles.subtitle}>Great job! Keep up the{'\n'}excellent work.</Text>

      <View style={styles.footer}>
        <Text style={styles.redirectText}>Auto-redirecting to Home in 3s...</Text>
      </View>
    </SafeAreaView>
  );
};

export default SuccessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  confettiContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confetti: {
    position: 'absolute',
    fontSize: 40,
    opacity: 0.6,
  },
  checkContainer: {
    marginBottom: 32,
  },
  checkCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#00C853',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
  checkmark: {
    fontSize: 64,
    color: '#FFF',
    fontWeight: '800',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 16,
  },
  earnings: {
    fontSize: 40,
    fontWeight: '900',
    color: '#00C853',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#AAA',
    textAlign: 'center',
    lineHeight: 24,
  },
  footer: {
    position: 'absolute',
    bottom: 40,
  },
  redirectText: {
    fontSize: 12,
    color: '#777',
  },
});
