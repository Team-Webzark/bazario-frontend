// panels/customer/screens/IssueReportingScreen.js

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function IssueReportingScreen({ navigation }) {
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState('');

  const categories = ["Order Issue", "Payment Problem", "App Bug", "Feedback", "Other"];

  const handleSubmit = () => {
    if (!category || !message.trim()) return;
    
    Alert.alert(
        "Report Submitted", 
        "Thank you for your feedback. Our support team will contact you shortly.", 
        [{ text: "OK", onPress: () => navigation.goBack() }]
    );
  };

  const isFormValid = category && message.trim().length > 0;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      
      <View style={styles.header}>
         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#1F2937" />
         </TouchableOpacity>
         <Text style={styles.title}>Help & Support</Text>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
           
           <Text style={styles.headline}>How can we help you?</Text>
           <Text style={styles.subHeadline}>Select an issue category below</Text>

           <View style={styles.catsContainer}>
              {categories.map(cat => (
                 <TouchableOpacity 
                    key={cat} 
                    style={[styles.catChip, category === cat && styles.catSelected]}
                    onPress={() => setCategory(cat)}
                    activeOpacity={0.8}
                 >
                    {category === cat && <Ionicons name="checkmark" size={16} color="#fff" style={{ marginRight: 6 }} />}
                    <Text style={[styles.catText, category === cat && styles.textSelected]}>{cat}</Text>
                 </TouchableOpacity>
              ))}
           </View>

           <Text style={styles.label}>Describe the issue</Text>
           <View style={styles.inputWrapper}>
               <TextInput 
                  style={styles.input} 
                  multiline 
                  numberOfLines={6} 
                  placeholder="Please verify order ID if applicable and describe your issue in detail..." 
                  placeholderTextColor="#9CA3AF"
                  value={message}
                  onChangeText={setMessage}
               />
           </View>

           <TouchableOpacity 
              style={[styles.submitBtn, !isFormValid && styles.disabledBtn]} 
              onPress={handleSubmit}
              disabled={!isFormValid}
           >
              <Text style={[styles.btnText, !isFormValid && styles.disabledText]}>Submit Report</Text>
              <Ionicons name="paper-plane-outline" size={20} color={isFormValid ? "#fff" : "#9CA3AF"} style={{ marginLeft: 8 }} />
           </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  
  header: { 
      flexDirection: 'row', alignItems: 'center', paddingHorizontal: wp('5%'), 
      paddingVertical: hp('2%'), backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#E5E7EB'
  },
  backBtn: { padding: 4 },
  title: { fontSize: hp('2.2%'), fontWeight: '700', marginLeft: 16, color: '#111' },

  content: { padding: wp('5%') },

  headline: { fontSize: hp('2.4%'), fontWeight: '800', color: '#1F2937', marginBottom: 4 },
  subHeadline: { fontSize: hp('1.8%'), color: '#6B7280', marginBottom: hp('3%') },

  catsContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: hp('3%'), gap: 8 },
  catChip: { 
      flexDirection: 'row', alignItems: 'center',
      paddingHorizontal: 16, paddingVertical: 10, borderRadius: 24, 
      backgroundColor: '#fff', borderWidth: 1, borderColor: '#E5E7EB',
      shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 4, elevation: 1
  },
  catSelected: { backgroundColor: '#12783D', borderColor: '#12783D' },
  catText: { fontSize: hp('1.7%'), color: '#4B5563', fontWeight: '600' },
  textSelected: { color: '#fff', fontWeight: '700' },

  label: { fontSize: hp('1.9%'), fontWeight: '700', color: '#374151', marginBottom: 12 },
  
  inputWrapper: {
      backgroundColor: '#fff', borderRadius: 16, padding: 4,
      borderWidth: 1, borderColor: '#E5E7EB',
      shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 4, elevation: 1,
      marginBottom: hp('4%')
  },
  input: { 
      padding: 16, textAlignVertical: 'top', fontSize: hp('1.8%'), 
      minHeight: 150, color: '#111' 
  },

  submitBtn: { 
      flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
      backgroundColor: '#12783D', paddingVertical: 16, borderRadius: 16,
      shadowColor: '#12783D', shadowOpacity: 0.3, shadowOffset: { width: 0, height: 4 }, elevation: 4
  },
  disabledBtn: { backgroundColor: '#E5E7EB', shadowOpacity: 0, elevation: 0 },
  btnText: { color: '#fff', fontWeight: '700', fontSize: hp('2%') },
  disabledText: { color: '#9CA3AF' },
});
