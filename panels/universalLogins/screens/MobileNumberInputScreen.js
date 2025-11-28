import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';

export default function MobileNumberInputScreen({ navigation, route }) {
  // Receive role passed from previous screen (customer, delivery, etc.)
  const { role } = route.params || { role: 'customer' };
  
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (input) => {
    // Simple regex for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };

  const handleSendOtp = async () => {
    // 1. Validate Input
    if (!email) {
      setError('Email address is required');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      // 2. TODO: API Call to send OTP to email
      // await api.sendEmailOtp(email);
      
      // Simulate network delay for testing
      setTimeout(() => {
        setIsLoading(false);
        // Navigate to OTP Verification screen, passing email & role
        navigation.navigate('OtpVerification', { email, role });
      }, 1500);
      
    } catch (err) {
      setIsLoading(false);
      Alert.alert('Error', 'Failed to send OTP. Please try again.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.contentContainer}>
        {/* Header Text */}
        <Text style={styles.title}>What's your email?</Text>
        <Text style={styles.subtitle}>
          We'll send a verification code to your email address to log you in as a 
          <Text style={styles.roleText}> {role}</Text>.
        </Text>

        {/* Input Field */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={[styles.input, error ? styles.inputError : null]}
            placeholder="name@example.com"
            placeholderTextColor="#A0A0A0"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (error) setError('');
            }}
          />
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>

        {/* Action Button */}
        <TouchableOpacity
          style={[
            styles.button,
            (!email || isLoading) && styles.buttonDisabled
          ]}
          onPress={handleSendOtp}
          disabled={!email || isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>Send Code</Text>
          )}
        </TouchableOpacity>

        {/* Footer / Terms */}
        <Text style={styles.footerText}>
          By continuing, you agree to our{' '}
          <Text style={styles.linkText}>Terms of Service</Text> &{' '}
          <Text style={styles.linkText}>Privacy Policy</Text>.
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF6EF', // Matching your soft off-white background
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#242424',
    marginBottom: 12,
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 16,
    color: '#595959',
    lineHeight: 24,
    marginBottom: 32,
    textAlign: 'left',
  },
  roleText: {
    fontWeight: 'bold',
    color: '#12783D', // Brand Green
    textTransform: 'capitalize',
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#242424',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#242424',
  },
  inputError: {
    borderColor: '#D32F2F', // Red for error
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 12,
    marginTop: 6,
    marginLeft: 4,
  },
  button: {
    backgroundColor: '#12783D', // Brand Green
    borderRadius: 32, // Pill shape like your other buttons
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonDisabled: {
    backgroundColor: '#A0CFA0', // Lighter green when disabled
    elevation: 0,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  footerText: {
    marginTop: 24,
    fontSize: 13,
    color: '#8C8C8C',
    textAlign: 'center',
    lineHeight: 20,
  },
  linkText: {
    color: '#12783D',
    fontWeight: '600',
  },
});
