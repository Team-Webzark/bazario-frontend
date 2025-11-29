// panels/customer/screens/HouseholdProfileStep2.js (Logic for Step 3)

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Slider from '@react-native-community/slider'; 

export default function HouseholdProfileStep2({ route, navigation }) {
  const { registrationData } = route.params || {};
  
  const [cookingFreq, setCookingFreq] = useState(null);
  const [budget, setBudget] = useState(5000); // Default 5k

  const freqOptions = [
    { label: 'Daily', value: 'Daily', icon: 'restaurant-outline', desc: 'Cook fresh meals every day' },
    { label: '3-4 times/week', value: 'Weekly', icon: 'calendar-outline', desc: 'Mix of cooking and ordering' },
    { label: 'Rarely', value: 'Rarely', icon: 'cafe-outline', desc: 'Mostly eat out or order in' },
  ];

  const handleFinish = () => {
    if (!cookingFreq) {
      return; // Button disabled visual handles this
    }
    
    // Add last step data
    const finalData = {
        ...registrationData,
        preferences: { cookingFreq, budget }
    };

    // Navigate to Location Capture (Step 3 finished -> Move to Location)
    // Wait, LocationCapture IS the final registration step in your flow usually. 
    // If this is the preference setup, next should be Location.
    navigation.navigate('LocationCapture', { registrationData: finalData });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Step 3 / 3</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Almost done!</Text>
          <Text style={styles.subtitle}>
            Help us understand your grocery needs better.
          </Text>
        </View>

        {/* Question 3: Cooking Frequency */}
        <View style={styles.section}>
          <Text style={styles.label}>How often do you cook?</Text>
          <View style={styles.list}>
            {freqOptions.map((option) => (
              <TouchableOpacity 
                key={option.value}
                style={[
                  styles.listItem, 
                  cookingFreq === option.value && styles.selectedListItem
                ]}
                onPress={() => setCookingFreq(option.value)}
                activeOpacity={0.7}
              >
                <View style={[
                    styles.iconBox,
                    cookingFreq === option.value && styles.selectedIconBox
                ]}>
                    <Ionicons 
                        name={option.icon} 
                        size={22} 
                        color={cookingFreq === option.value ? '#12783D' : '#6B7280'} 
                    />
                </View>
                <View style={styles.listItemContent}>
                    <Text style={[
                        styles.listItemTitle, 
                        cookingFreq === option.value && styles.selectedListItemText
                    ]}>
                        {option.label}
                    </Text>
                    <Text style={styles.listItemDesc}>{option.desc}</Text>
                </View>
                
                <View style={[
                    styles.radio,
                    cookingFreq === option.value && styles.selectedRadio
                ]}>
                    {cookingFreq === option.value && <View style={styles.radioDot} />}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Question 4: Budget Slider */}
        <View style={styles.section}>
          <Text style={styles.label}>Monthly Grocery Budget</Text>
          
          <View style={styles.budgetCard}>
             <Text style={styles.budgetLabel}>Estimated Range</Text>
             <Text style={styles.budgetValue}>₹{budget} - ₹{budget + 2000}</Text>
          </View>

          <View style={styles.sliderContainer}>
             <Slider
               style={{ width: '100%', height: 40 }}
               minimumValue={1000}
               maximumValue={20000}
               step={500}
               value={budget}
               onValueChange={setBudget}
               minimumTrackTintColor="#12783D"
               maximumTrackTintColor="#E5E7EB"
               thumbTintColor="#12783D"
             />
             <View style={styles.sliderLabels}>
                <Text style={styles.sliderLabel}>₹1k</Text>
                <Text style={styles.sliderLabel}>₹20k+</Text>
             </View>
          </View>
        </View>

      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.finishBtn, !cookingFreq && styles.disabledBtn]}
          onPress={handleFinish}
          disabled={!cookingFreq}
        >
          <Text style={styles.btnText}>Add Address</Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },

  // Top Bar
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 12,
    marginBottom: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  topBarTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },

  // Header
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
  },

  // Section
  section: {
    marginBottom: 32,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 16,
  },

  // List Items
  list: {
    gap: 12,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#F9FAFB',
    borderWidth: 1.5,
    borderColor: '#F3F4F6',
  },
  selectedListItem: {
    backgroundColor: '#F0FDF4',
    borderColor: '#12783D',
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  selectedIconBox: {
    borderColor: 'transparent',
  },
  listItemContent: {
    flex: 1,
  },
  listItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 2,
  },
  selectedListItemText: {
    color: '#12783D',
  },
  listItemDesc: {
    fontSize: 13,
    color: '#6B7280',
  },
  
  // Radio Button
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  selectedRadio: {
    borderColor: '#12783D',
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#12783D',
  },

  // Budget
  budgetCard: {
    backgroundColor: '#F0FDF4',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#DCFCE7',
  },
  budgetLabel: {
    fontSize: 13,
    color: '#166534',
    fontWeight: '600',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  budgetValue: {
    fontSize: 28,
    fontWeight: '800',
    color: '#12783D',
  },
  sliderContainer: {
    paddingHorizontal: 0,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  sliderLabel: {
    fontSize: 13,
    color: '#9CA3AF',
    fontWeight: '500',
  },

  // Footer
  footer: {
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    backgroundColor: '#fff',
  },
  finishBtn: {
    flexDirection: 'row',
    backgroundColor: '#12783D',
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#12783D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  disabledBtn: {
    backgroundColor: '#9CA3AF',
    shadowOpacity: 0,
    elevation: 0,
  },
  btnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    marginRight: 8,
  },
});
