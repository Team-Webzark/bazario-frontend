import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
  Keyboard,
} from 'react-native';

export default function OtpVerificationScreen({ navigation, route }) {
  // 1. Get email and role from previous screen
  const { email = 'user@example.com', role = 'customer' } = route.params || {};

  const [otp, setOtp] = useState(['', '', '', '']); // Array for 4 digits
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(30); // 30-second countdown
  
  // Refs to manage focus between inputs
  const inputRefs = useRef([]);

  // 2. Countdown Timer Logic
  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // 3. Handle Input Change
  const handleChange = (text, index) => {
    // Only allow numbers
    if (!/^\d*$/.test(text)) return;

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Auto-focus next input if text is entered
    if (text && index < 3) {
      inputRefs.current[index + 1].focus();
    }

    // Auto-submit if all 4 digits are filled
    if (newOtp.every((digit) => digit !== '') && index === 3) {
      verifyOtp(newOtp.join(''));
    }
  };

  // 4. Handle Backspace (Move to previous input)
  const handleBackspace = (key, index) => {
    if (key === 'Backspace') {
      if (!otp[index] && index > 0) {
        // If current box is empty, move back and clear previous
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
        inputRefs.current[index - 1].focus();
      }
    }
  };

  // 5. Verify OTP API Mock
  // Inside OtpVerificationScreen.js

  const verifyOtp = async (otpString) => {
    Keyboard.dismiss();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      if (otpString === '1234') { 
        // ✅ LOGIC CHANGE HERE
        if (role === 'customer') {
          // Stack reset karke CustomerApp par le jao (User wapas back nahi kar payega)
          navigation.reset({
            index: 0,
            routes: [{ name: 'CustomerApp' }],
          });
        } else if (role === 'delivery') {
          // Future: Navigate to DeliveryDashboard
          Alert.alert("Delivery Partner", "Delivery Panel Coming Soon!");
        } else if (role === 'admin') {
           // Admin flow is usually password based, but handling just in case
           Alert.alert("Admin", "Admin Panel Coming Soon!");
        }
      } else {
        Alert.alert('Error', 'Invalid OTP. Try 1234');
      }
    }, 1000);
  };

  
  const navigateToHome = () => {
      // Navigation logic based on role
      // For now, just going back or to a placeholder 'Home'
      console.log(`Navigating to ${role} home`);
      // navigation.replace('CustomerAppStack'); // Example
  };

  const handleResend = () => {
    if (timer === 0) {
      setTimer(30);
      Alert.alert('Sent', 'A new code has been sent to your email.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.contentContainer}>
        {/* Header */}
        <Text style={styles.title}>Verify your email</Text>
        <Text style={styles.subtitle}>
          Enter the 4-digit code we sent to{'\n'}
          <Text style={styles.emailText}>{email}</Text>
        </Text>

        {/* OTP Inputs */}
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              style={[
                styles.otpBox,
                digit ? styles.otpBoxFilled : null,
                // Highlight focused input logic could go here if using state for focus
              ]}
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              onChangeText={(text) => handleChange(text, index)}
              onKeyPress={({ nativeEvent }) =>
                handleBackspace(nativeEvent.key, index)
              }
              // UI Polish
              cursorColor="#12783D"
              selectionColor="#A0CFA0"
            />
          ))}
        </View>

        {/* Verify Button */}
        <TouchableOpacity
          style={[
            styles.button,
            (otp.some((d) => d === '') || isLoading) && styles.buttonDisabled
          ]}
          onPress={() => verifyOtp(otp.join(''))}
          disabled={otp.some((d) => d === '') || isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>Verify</Text>
          )}
        </TouchableOpacity>

        {/* Resend Timer */}
        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>Didn't receive code? </Text>
          <TouchableOpacity 
            onPress={handleResend} 
            disabled={timer > 0}
          >
            <Text style={[
              styles.resendLink, 
              timer > 0 && styles.resendLinkDisabled
            ]}>
              {timer > 0 ? `Resend in ${timer}s` : 'Resend'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF6EF', // Matches previous screens
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
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
  emailText: {
    fontWeight: '600',
    color: '#12783D', // Brand Green
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Spreads the 4 boxes evenly
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  otpBox: {
    width: 60,
    height: 64,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E0E0E0', // Default border
    backgroundColor: '#FFFFFF',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#242424',
    elevation: 1, // Slight shadow on Android
    shadowColor: '#000', // IOS Shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
  },
  otpBoxFilled: {
    borderColor: '#12783D', // Green border when filled
    backgroundColor: '#F0FDF4', // Very light green tint
  },
  button: {
    backgroundColor: '#12783D',
    borderRadius: 32,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  },
  buttonDisabled: {
    backgroundColor: '#A0CFA0',
    elevation: 0,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  resendText: {
    color: '#595959',
    fontSize: 14,
  },
  resendLink: {
    color: '#12783D',
    fontWeight: 'bold',
    fontSize: 14,
  },
  resendLinkDisabled: {
    color: '#A0A0A0', // Grey when timer is running
  },
});
