// panels/customer/screens/HouseholdProfileStep1.js (Step 2)

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
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

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
    // edges=['top'] ensures content starts below notch/status bar
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={hp('3%')} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Step 2 / 3</Text>
        <View style={{ width: wp('10%') }} /> 
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
                    size={hp('3%')} 
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
                    <Ionicons name="checkmark" size={hp('1.5%')} color="#fff" />
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
                  size={hp('2.5%')} 
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

        {/* Spacer to push content up */}
        <View style={{ height: hp('5%') }} />

        {/* Buttons */}
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

        {/* Extra padding for safe bottom scroll */}
        <View style={{ height: hp('2%') }} />

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
    paddingHorizontal: wp('6%'), // 6% padding from sides
    paddingBottom: hp('4%'),
  },
  
  // Top Bar
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp('4%'),
    height: hp('8%'), // Fixed height relative to screen
    marginBottom: hp('1%'),
  },
  backButton: {
    width: wp('10%'),
    height: wp('10%'),
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  topBarTitle: {
    fontSize: hp('2%'), // Responsive Font
    fontWeight: '600',
    color: '#6B7280',
  },

  // Header
  header: {
    marginBottom: hp('4%'),
  },
  title: {
    fontSize: hp('3.5%'), // Responsive Title
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: hp('1%'),
  },
  subtitle: {
    fontSize: hp('2%'),
    color: '#6B7280',
    lineHeight: hp('3%'),
  },

  // Section
  section: {
    marginBottom: hp('4%'),
  },
  label: {
    fontSize: hp('2%'),
    fontWeight: '600',
    color: '#374151',
    marginBottom: hp('2%'),
  },

  // Grid Cards
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: wp('3%'),
  },
  card: {
    width: wp('42%'), // Nearly half width
    padding: hp('2%'),
    borderRadius: wp('4%'),
    borderWidth: 1.5,
    borderColor: '#F3F4F6', 
    backgroundColor: '#F9FAFB', 
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: hp('18%'), // Responsive height
  },
  selectedCard: {
    borderColor: '#12783D',
    backgroundColor: '#F0FDF4',
  },
  iconCircle: {
    width: wp('12%'),
    height: wp('12%'),
    borderRadius: wp('6%'),
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp('1.5%'),
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  selectedIconCircle: {
    backgroundColor: '#fff',
    borderColor: 'transparent',
  },
  cardLabel: {
    fontSize: hp('1.8%'),
    fontWeight: '700',
    color: '#374151',
    textAlign: 'center',
    marginBottom: hp('0.5%'),
  },
  cardSubLabel: {
    fontSize: hp('1.6%'),
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
    top: wp('2.5%'),
    right: wp('2.5%'),
    width: wp('5%'),
    height: wp('5%'),
    borderRadius: wp('2.5%'),
    backgroundColor: '#12783D',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Chips
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: wp('2.5%'),
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1.5%'),
    borderRadius: wp('3%'),
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  selectedChip: {
    backgroundColor: '#12783D',
    borderColor: '#12783D',
  },
  chipIcon: {
    marginRight: wp('1.5%'),
  },
  chipText: {
    fontSize: hp('1.8%'),
    fontWeight: '600',
    color: '#4B5563',
  },
  selectedChipText: {
    color: '#fff',
  },

  // Buttons
  continueButton: {
    backgroundColor: '#12783D',
    height: hp('7%'), // Responsive height
    borderRadius: wp('4%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp('2%'),
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
    fontSize: hp('2%'),
    fontWeight: '700',
  },
  skipButton: {
    paddingVertical: hp('1.5%'),
    alignItems: 'center',
  },
  skipButtonText: {
    fontSize: hp('1.8%'),
    color: '#6B7280',
    fontWeight: '500',
  },
});
