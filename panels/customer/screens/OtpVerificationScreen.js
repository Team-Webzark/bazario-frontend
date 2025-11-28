import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator,
  StatusBar,
  Alert
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function OtpVerificationScreen({ route, navigation }) {
  // Get params from Login Screen (Role & Email/Phone)
  const { role, email } = route.params || { role: 'customer', email: 'user@example.com' };

  const [otp, setOtp] = useState(['', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  
  // Refs for inputs to manage focus
  const inputRefs = useRef([]);

  // Timer Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Handle OTP Input
  const handleChange = (text, index) => {
    if (text.length > 1) return; // Prevent multiple chars
    
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Auto Focus Next
    if (text && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle Backspace
  const handleBackspace = (key, index) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Verify Action
  const verifyOtp = async () => {
    const otpString = otp.join('');
    if (otpString.length < 4) {
      Alert.alert('Invalid OTP', 'Please enter a 4-digit code.');
      return;
    }

    Keyboard.dismiss();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      if (otpString === '1234') { // Mock correct OTP
        if (role === 'customer') {
          navigation.reset({
            index: 0,
            routes: [{ name: 'CustomerApp' }], // Make sure this matches App.js stack name
          });
        } else if (role === 'delivery') {
          Alert.alert("Coming Soon", "Delivery Partner App is next!");
          // navigation.reset({ index: 0, routes: [{ name: 'DeliveryApp' }] });
        } else {
          Alert.alert("Coming Soon", "Admin Panel is next!");
        }
      } else {
        Alert.alert('Error', 'Invalid OTP. Try 1234');
      }
    }, 1500);
  };

  const handleResend = () => {
    setTimer(30);
    Alert.alert("OTP Sent", "A new code has been sent.");
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>Verification Code</Text>
        <Text style={styles.subtitle}>
          We have sent the verification code to {email.replace(/(.{2})(.*)(@.*)/, "$1***$3")}
        </Text>

        {/* OTP Inputs */}
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              style={[styles.otpBox, digit && styles.otpFilled]}
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              onChangeText={(text) => handleChange(text, index)}
              onKeyPress={({ nativeEvent }) => handleBackspace(nativeEvent.key, index)}
            />
          ))}
        </View>

        {/* Verify Button */}
        <TouchableOpacity 
          style={[styles.verifyBtn, isLoading && styles.disabledBtn]} 
          onPress={verifyOtp}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.btnText}>Confirm</Text>
          )}
        </TouchableOpacity>

        {/* Resend Timer */}
        <View style={styles.resendContainer}>
          {timer > 0 ? (
            <Text style={styles.timerText}>Resend code in 00:{timer < 10 ? `0${timer}` : timer}</Text>
          ) : (
            <TouchableOpacity onPress={handleResend}>
               <Text style={styles.resendLink}>Resend Code</Text>
            </TouchableOpacity>
          )}
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  backBtn: { position: 'absolute', top: 50, left: 20, zIndex: 10, padding: 8 },
  
  content: { flex: 1, justifyContent: 'center', padding: 24, marginTop: -40 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 40, lineHeight: 24 },

  otpContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 40 },
  otpBox: { 
    width: 60, height: 60, borderRadius: 12, borderWidth: 1, borderColor: '#ddd', 
    backgroundColor: '#F9F9F9', textAlign: 'center', fontSize: 24, fontWeight: 'bold', color: '#333' 
  },
  otpFilled: { borderColor: '#12783D', backgroundColor: '#F0FDF4' },

  verifyBtn: { backgroundColor: '#12783D', paddingVertical: 16, borderRadius: 12, alignItems: 'center', shadowColor: '#12783D', shadowOpacity: 0.3, shadowRadius: 10, elevation: 5 },
  disabledBtn: { backgroundColor: '#A0CFA0' },
  btnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },

  resendContainer: { marginTop: 24, alignItems: 'center' },
  timerText: { color: '#888', fontSize: 14 },
  resendLink: { color: '#12783D', fontWeight: 'bold', fontSize: 16 },
});



