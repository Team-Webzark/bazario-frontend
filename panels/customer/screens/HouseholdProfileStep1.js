// panels/customer/screens/HouseholdProfileStep1.js (Actually Step 2)

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function HouseholdProfileStep1({ navigation, route }) {
  const { registrationData } = route.params || {};
  
  const [familySize, setFamilySize] = useState(null);
  const [diet, setDiet] = useState('Veg');

  const sizeOptions = [
    { label: 'Just Me', sub: '(1)', value: 1, icon: 'person-outline' },
    { label: 'Couple', sub: '(2)', value: 2, icon: 'people-outline' },
    { label: 'Small Family', sub: '(3-4)', value: 3, icon: 'home-outline' },
    { label: 'Large Family', sub: '(5+)', value: 5, icon: 'business-outline' },
  ];

  const dietOptions = [
    { label: 'Veg', icon: 'leaf-outline' },
    { label: 'Non-Veg', icon: 'nutrition-outline' },
    { label: 'Eggetarian', icon: 'egg-outline' },
    { label: 'Vegan', icon: 'flower-outline' },
  ];

  const handleContinue = () => {
    if (familySize) {
      navigation.navigate('HouseholdProfileStep2', { 
        registrationData: { ...registrationData, household: { familySize, diet } } 
      });
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      {/* Top Bar (Consistent with Step 1) */}
      <View style={styles.topBar}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Step 2 / 3</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Household Profile</Text>
          <Text style={styles.subtitle}>
            Tell us about your household to get personalized pack sizes.
          </Text>
        </View>

        {/* Question 1: Size */}
        <View style={styles.section}>
          <Text style={styles.label}>How many members?</Text>
          <View style={styles.grid}>
            {sizeOptions.map((option) => (
              <TouchableOpacity 
                key={option.value}
                style={[
                  styles.card, 
                  familySize === option.value && styles.selectedCard
                ]}
                onPress={() => setFamilySize(option.value)}
                activeOpacity={0.7}
              >
                <View style={[
                  styles.iconCircle,
                  familySize === option.value && styles.selectedIconCircle
                ]}>
                  <Ionicons 
                    name={option.icon} 
                    size={22} 
                    color={familySize === option.value ? '#12783D' : '#6B7280'} 
                  />
                </View>
                <Text style={[
                  styles.cardLabel, 
                  familySize === option.value && styles.selectedCardText
                ]}>
                  {option.label}
                </Text>
                <Text style={[
                  styles.cardSubLabel,
                  familySize === option.value && styles.selectedCardSubText
                ]}>
                  {option.sub}
                </Text>
                
                {familySize === option.value && (
                  <View style={styles.checkBadge}>
                    <Ionicons name="checkmark" size={12} color="#fff" />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Question 2: Diet */}
        <View style={styles.section}>
          <Text style={styles.label}>Dietary Preference</Text>
          <View style={styles.chipContainer}>
            {dietOptions.map((option) => (
              <TouchableOpacity 
                key={option.label}
                style={[
                  styles.chip, 
                  diet === option.label && styles.selectedChip
                ]}
                onPress={() => setDiet(option.label)}
                activeOpacity={0.7}
              >
                <Ionicons 
                  name={option.icon} 
                  size={18} 
                  color={diet === option.label ? '#fff' : '#4B5563'} 
                  style={styles.chipIcon}
                />
                <Text style={[
                  styles.chipText, 
                  diet === option.label && styles.selectedChipText
                ]}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Spacer */}
        <View style={{ flex: 1 }} />

        {/* Buttons (Consistent with Step 1) */}
        <TouchableOpacity
          style={[styles.continueButton, !familySize && styles.disabledButton]}
          onPress={handleContinue}
          disabled={!familySize}
          activeOpacity={0.8}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.skipButton}
          onPress={() => navigation.replace('CustomerApp')}
        >
          <Text style={styles.skipButtonText}>Skip for now</Text>
        </TouchableOpacity>

      </ScrollView>
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

  // Grid Cards
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  card: {
    width: '48%',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#F3F4F6', // Consistent border color
    backgroundColor: '#F9FAFB', // Light bg for unselected
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 140,
  },
  selectedCard: {
    borderColor: '#12783D',
    backgroundColor: '#F0FDF4',
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  selectedIconCircle: {
    backgroundColor: '#fff',
    borderColor: 'transparent',
  },
  cardLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#374151',
    textAlign: 'center',
    marginBottom: 4,
  },
  cardSubLabel: {
    fontSize: 13,
    color: '#6B7280',
  },
  selectedCardText: {
    color: '#12783D',
  },
  selectedCardSubText: {
    color: '#166534',
  },
  checkBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#12783D',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Chips
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  selectedChip: {
    backgroundColor: '#12783D',
    borderColor: '#12783D',
  },
  chipIcon: {
    marginRight: 6,
  },
  chipText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#4B5563',
  },
  selectedChipText: {
    color: '#fff',
  },

  // Buttons
  continueButton: {
    backgroundColor: '#12783D',
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 16,
    shadowColor: '#12783D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  disabledButton: {
    backgroundColor: '#D1D5DB',
    shadowOpacity: 0,
    elevation: 0,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  skipButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  skipButtonText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
});
