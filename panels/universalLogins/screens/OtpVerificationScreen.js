// panels/universalLogins/screens/OtpVerificationScreen.js

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
// ✅ Import from react-native-safe-area-context
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { detectUserRole } from '../../../config/userRoles';

export default function OtpVerificationScreen({ route, navigation }) {
  const { email } = route.params;
  
  const [otp, setOtp] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  
  const inputRefs = useRef([]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    const otpCode = otp.join('');
    if (otpCode.length !== 4) {
      Alert.alert('Error', 'Please enter complete 4-digit OTP');
      return;
    }
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      if (otpCode === '1234') {
        const role = detectUserRole(email);
        if (role === 'admin') navigation.replace('AdminApp');
        else if (role === 'delivery') navigation.replace('DeliveryApp');
        else if (role === 'customer') navigation.replace('CustomerApp');
        else navigation.replace('CustomerRegistration', { email });
      } else {
        Alert.alert('Invalid OTP', 'The code you entered is incorrect.');
        setOtp(['', '', '', '']);
        inputRefs.current[0]?.focus();
      }
    } catch (error) {
      Alert.alert('Error', 'Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setResendLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      Alert.alert('Sent!', `New code sent to ${email}`);
      setTimer(60);
      setOtp(['', '', '', '']);
      inputRefs.current[0]?.focus();
    } catch (error) {
      Alert.alert('Error', 'Failed to resend OTP.');
    } finally {
      setResendLoading(false);
    }
  };

  return (
    // ✅ Use edges prop to handle safe area correctly
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        {/* Top Bar: Back Button + Brand */}
        <View style={styles.topBar}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#1F2937" />
          </TouchableOpacity>
          
          <View style={styles.brandContainer}>
            <Text style={styles.brandText}>BAZARIO</Text>
          </View>
          
          <View style={{ width: 40 }} /> 
        </View>

        <View style={styles.content}>
          {/* Header Text */}
          <View style={styles.header}>
            <Text style={styles.title}>Enter Verification Code</Text>
            <Text style={styles.subtitle}>
              We have sent the 4-digit code to
            </Text>
            <Text style={styles.email}>{email}</Text>
          </View>

          {/* OTP Inputs */}
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputRefs.current[index] = ref)}
                style={[
                  styles.otpInput,
                  focusedIndex === index && styles.otpInputFocused,
                  digit && styles.otpInputFilled,
                ]}
                value={digit}
                onChangeText={(value) => handleOtpChange(value, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                onFocus={() => setFocusedIndex(index)}
                onBlur={() => setFocusedIndex(-1)}
                keyboardType="number-pad"
                maxLength={1}
                selectTextOnFocus
                cursorColor="#12783D"
              />
            ))}
          </View>

          {/* Resend Timer */}
          <View style={styles.resendContainer}>
            {timer > 0 ? (
              <Text style={styles.timerText}>
                Resend code in <Text style={styles.timerBold}>{timer}s</Text>
              </Text>
            ) : (
              <TouchableOpacity onPress={handleResendOtp} disabled={resendLoading}>
                <Text style={styles.resendText}>
                  {resendLoading ? 'Sending...' : 'Resend Code'}
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Verify Button */}
          <TouchableOpacity
            style={[styles.verifyButton, loading && styles.verifyButtonDisabled]}
            onPress={handleVerifyOtp}
            disabled={loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.verifyButtonText}>Verify & Continue</Text>
            )}
          </TouchableOpacity>

          {/* Change Email Option */}
          <View style={styles.changeEmailContainer}>
            <Text style={styles.wrongEmailText}>Entered wrong email?</Text>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.changeEmailBtn}>
              <Text style={styles.changeEmailText}>Change Email</Text>
            </TouchableOpacity>
          </View>

        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardView: {
    flex: 1,
  },
  
  // Top Bar
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginBottom: 32,
    marginTop: 12, // Slightly adjusted for visual balance
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  brandContainer: {
    alignItems: 'center',
  },
  brandText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#12783D',
    letterSpacing: 2,
  },

  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  
  // Header
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 6,
  },
  email: {
    fontSize: 16,
    fontWeight: '700',
    color: '#12783D',
  },

  // Inputs
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 32,
  },
  otpInput: {
    width: 64,
    height: 64,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    backgroundColor: '#F9FAFB',
  },
  otpInputFocused: {
    borderColor: '#12783D',
    backgroundColor: '#fff',
    transform: [{scale: 1.05}],
    shadowColor: '#12783D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  otpInputFilled: {
    backgroundColor: '#fff',
    borderColor: '#12783D',
  },

  // Resend
  resendContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  timerText: {
    fontSize: 14,
    color: '#6B7280',
  },
  timerBold: {
    color: '#12783D',
    fontWeight: '700',
  },
  resendText: {
    fontSize: 15,
    color: '#12783D',
    fontWeight: '600',
  },

  // Buttons
  verifyButton: {
    backgroundColor: '#12783D',
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    shadowColor: '#12783D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  verifyButtonDisabled: {
    backgroundColor: '#9EC8AE',
    elevation: 0,
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  // Change Email
  changeEmailContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  wrongEmailText: {
    fontSize: 14,
    color: '#6B7280',
    marginRight: 6,
  },
  changeEmailBtn: {
    paddingVertical: 4,
  },
  changeEmailText: {
    fontSize: 14,
    color: '#12783D',
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});
