// panels/customer/screens/PreferencesEditScreen.js

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Switch,
  Alert,
  TextInput,
  Dimensions
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function PreferencesEditScreen({ navigation }) {
  // --- STATE ---
  // Personal Info
  const [name, setName] = useState('Shadmaan');
  const [email, setEmail] = useState('shadmaan@example.com');
  const [phone, setPhone] = useState('+91 98765 43210');

  // Cooking Preferences
  const [diet, setDiet] = useState('Veg');
  const [cookingFreq, setCookingFreq] = useState('Daily');
  const [familySize, setFamilySize] = useState(3);

  // App Settings
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('English');

  // Options
  const dietOptions = ['Veg', 'Non-Veg', 'Eggetarian', 'Vegan'];
  const freqOptions = ['Daily', 'Weekly', 'Rarely', 'Never'];
  const langOptions = ['English', 'Hindi', 'Urdu'];

  const handleSave = () => {
    // Simulate API Call
    Alert.alert("Profile Updated", "Your preferences have been saved successfully.", [
      { text: "OK", onPress: () => navigation.goBack() }
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#1F2937" />
         </TouchableOpacity>
         <Text style={styles.headerTitle}>Edit Profile & Preferences</Text>
         <TouchableOpacity onPress={handleSave}>
            <Text style={styles.saveText}>Save</Text>
         </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
         
         {/* --- SECTION 1: PERSONAL DETAILS --- */}
         <View style={styles.section}>
            <Text style={styles.sectionHeader}>PERSONAL DETAILS</Text>
            
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput 
                    value={name}
                    onChangeText={setName}
                    style={styles.input}
                    placeholder="Enter your name"
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Email Address</Text>
                <TextInput 
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                    keyboardType="email-address"
                    placeholder="Enter your email"
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Phone Number</Text>
                <View style={[styles.input, styles.disabledInput]}>
                    <Text style={{ color: '#9CA3AF' }}>{phone}</Text>
                    <Ionicons name="lock-closed" size={16} color="#9CA3AF" />
                </View>
            </View>
         </View>

         {/* --- SECTION 2: COOKING PREFERENCES --- */}
         <View style={styles.section}>
            <Text style={styles.sectionHeader}>COOKING PREFERENCES</Text>
            
            <Text style={styles.subLabel}>Dietary Preference</Text>
            <View style={styles.chipContainer}>
               {dietOptions.map((option) => (
                  <TouchableOpacity 
                     key={option}
                     style={[styles.chip, diet === option && styles.chipSelected]}
                     onPress={() => setDiet(option)}
                  >
                     <Text style={[styles.chipText, diet === option && styles.chipTextSelected]}>{option}</Text>
                  </TouchableOpacity>
               ))}
            </View>

            <Text style={styles.subLabel}>How often do you cook?</Text>
            <View style={styles.chipContainer}>
               {freqOptions.map((option) => (
                  <TouchableOpacity 
                     key={option}
                     style={[styles.chip, cookingFreq === option && styles.chipSelected]}
                     onPress={() => setCookingFreq(option)}
                  >
                     <Text style={[styles.chipText, cookingFreq === option && styles.chipTextSelected]}>{option}</Text>
                  </TouchableOpacity>
               ))}
            </View>

            <View style={styles.rowBetween}>
                <Text style={styles.rowLabel}>Household Members</Text>
                <View style={styles.stepperControls}>
                   <TouchableOpacity onPress={() => setFamilySize(Math.max(1, familySize - 1))} style={styles.stepBtn}>
                      <Ionicons name="remove" size={18} color="#12783D" />
                   </TouchableOpacity>
                   <Text style={styles.stepValue}>{familySize}</Text>
                   <TouchableOpacity onPress={() => setFamilySize(familySize + 1)} style={styles.stepBtn}>
                      <Ionicons name="add" size={18} color="#12783D" />
                   </TouchableOpacity>
                </View>
            </View>
         </View>

         {/* --- SECTION 3: APP SETTINGS --- */}
         <View style={styles.section}>
            <Text style={styles.sectionHeader}>APP SETTINGS</Text>
            
            <View style={styles.rowBetween}>
               <Text style={styles.rowLabel}>Push Notifications</Text>
               <Switch
                  trackColor={{ false: "#E5E7EB", true: "#A7F3D0" }}
                  thumbColor={notifications ? "#12783D" : "#F3F4F6"}
                  onValueChange={setNotifications}
                  value={notifications}
               />
            </View>

            <View style={styles.rowBetween}>
               <Text style={styles.rowLabel}>Dark Mode</Text>
               <Switch
                  trackColor={{ false: "#E5E7EB", true: "#A7F3D0" }}
                  thumbColor={darkMode ? "#12783D" : "#F3F4F6"}
                  onValueChange={setDarkMode}
                  value={darkMode}
               />
            </View>

            <View style={styles.languageRow}>
                <Text style={styles.rowLabel}>App Language</Text>
                <View style={{ flexDirection: 'row', gap: 8 }}>
                    {langOptions.map((lang) => (
                        <TouchableOpacity 
                            key={lang}
                            onPress={() => setLanguage(lang)}
                            style={[styles.langChip, language === lang && styles.langChipSelected]}
                        >
                            <Text style={[styles.langText, language === lang && styles.langTextSelected]}>{lang}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
         </View>

         <View style={{ height: hp('5%') }} />

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  
  // Header
  header: { 
      flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', 
      paddingHorizontal: wp('5%'), paddingVertical: hp('2%'), backgroundColor: '#fff',
      borderBottomWidth: 1, borderBottomColor: '#E5E7EB'
  },
  headerTitle: { fontSize: hp('2.2%'), fontWeight: '700', color: '#111' },
  saveText: { color: '#12783D', fontWeight: '700', fontSize: hp('2%') },
  backBtn: { padding: 4 },

  content: { padding: wp('5%') },

  // Section
  section: { marginBottom: hp('4%') },
  sectionHeader: { 
      fontSize: hp('1.5%'), fontWeight: '700', color: '#9CA3AF', 
      marginBottom: hp('2%'), letterSpacing: 1 
  },

  // Inputs
  inputGroup: { marginBottom: hp('2%') },
  label: { fontSize: hp('1.7%'), fontWeight: '600', color: '#374151', marginBottom: 6 },
  input: { 
      backgroundColor: '#fff', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12,
      paddingHorizontal: 16, height: hp('6%'), fontSize: hp('1.8%'), color: '#111',
      flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'
  },
  disabledInput: { backgroundColor: '#F3F4F6', color: '#9CA3AF' },

  // Preferences
  subLabel: { fontSize: hp('1.8%'), fontWeight: '600', color: '#374151', marginBottom: 10, marginTop: 4 },
  chipContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 16, gap: 8 },
  chip: { 
      paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, 
      backgroundColor: '#fff', borderWidth: 1, borderColor: '#E5E7EB' 
  },
  chipSelected: { backgroundColor: '#F0FDF4', borderColor: '#12783D' },
  chipText: { color: '#6B7280', fontSize: hp('1.7%'), fontWeight: '500' },
  chipTextSelected: { color: '#12783D', fontWeight: '700' },

  // Rows (Stepper/Switch)
  rowBetween: { 
      flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', 
      backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 12,
      borderWidth: 1, borderColor: '#F3F4F6'
  },
  rowLabel: { fontSize: hp('1.9%'), fontWeight: '600', color: '#374151' },
  
  stepperControls: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  stepBtn: { 
      width: 32, height: 32, borderRadius: 16, backgroundColor: '#F0FDF4', 
      justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#DCFCE7' 
  },
  stepValue: { fontSize: 18, fontWeight: '700', color: '#1F2937', minWidth: 20, textAlign: 'center' },

  // Language
  languageRow: { marginTop: 8 },
  langChip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, borderWidth: 1, borderColor: '#E5E7EB', backgroundColor: '#fff' },
  langChipSelected: { backgroundColor: '#12783D', borderColor: '#12783D' },
  langText: { fontSize: 13, color: '#6B7280' },
  langTextSelected: { color: '#fff', fontWeight: '700' },
});
