import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function HouseholdProfileStep1({ navigation }) {
  const [familySize, setFamilySize] = useState(null);
  const [diet, setDiet] = useState('Veg'); // Default

  const sizeOptions = [
    { label: 'Just Me (1)', value: 1 },
    { label: 'Couple (2)', value: 2 },
    { label: 'Small Family (3-4)', value: 3 },
    { label: 'Large Family (5+)', value: 5 },
  ];

  const dietOptions = ['Veg', 'Non-Veg', 'Eggetarian', 'Vegan'];

  const handleNext = () => {
    if (!familySize) {
      alert('Please select your household size.');
      return;
    }
    // Navigate to Step 2
    navigation.navigate('HouseholdProfileStep2', { familySize, diet });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
             <View style={[styles.progressFill, { width: '50%' }]} />
          </View>
          <Text style={styles.stepText}>Step 1 of 2</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Tell us about your household</Text>
        <Text style={styles.subtitle}>This helps us suggest the right pack sizes.</Text>

        {/* Question 1: Size */}
        <Text style={styles.question}>How many members?</Text>
        <View style={styles.grid}>
           {sizeOptions.map((option) => (
              <TouchableOpacity 
                key={option.value}
                style={[styles.card, familySize === option.value && styles.selectedCard]}
                onPress={() => setFamilySize(option.value)}
              >
                 <Text style={[styles.cardText, familySize === option.value && styles.selectedText]}>
                    {option.label}
                 </Text>
                 {familySize === option.value && (
                    <Ionicons name="checkmark-circle" size={20} color="#12783D" style={styles.checkIcon} />
                 )}
              </TouchableOpacity>
           ))}
        </View>

        {/* Question 2: Diet */}
        <Text style={styles.question}>Dietary Preference</Text>
        <View style={styles.chipContainer}>
           {dietOptions.map((option) => (
              <TouchableOpacity 
                 key={option}
                 style={[styles.chip, diet === option && styles.selectedChip]}
                 onPress={() => setDiet(option)}
              >
                 <Text style={[styles.chipText, diet === option && styles.selectedChipText]}>
                    {option}
                 </Text>
              </TouchableOpacity>
           ))}
        </View>

      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
         <TouchableOpacity 
           style={[styles.nextBtn, !familySize && styles.disabledBtn]}
           onPress={handleNext}
           disabled={!familySize}
         >
            <Text style={styles.btnText}>Next Step</Text>
            <Ionicons name="arrow-forward" size={20} color="#fff" />
         </TouchableOpacity>
         
         <TouchableOpacity onPress={() => navigation.navigate('CustomerTabs')} style={styles.skipBtn}>
            <Text style={styles.skipText}>Skip for now</Text>
         </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#f5f5f5' },
  progressContainer: { flex: 1, marginLeft: 16, marginRight: 16 },
  progressBar: { height: 6, backgroundColor: '#eee', borderRadius: 3, marginBottom: 4 },
  progressFill: { height: 6, backgroundColor: '#12783D', borderRadius: 3 },
  stepText: { fontSize: 12, color: '#888', alignSelf: 'flex-end' },

  content: { padding: 24 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 32 },

  question: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 16 },
  
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 32 },
  card: { width: '48%', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#ddd', marginBottom: 12, alignItems: 'center', justifyContent: 'center', height: 80, backgroundColor: '#fff' },
  selectedCard: { borderColor: '#12783D', backgroundColor: '#F0FDF4' },
  cardText: { fontSize: 14, fontWeight: '600', color: '#555', textAlign: 'center' },
  selectedText: { color: '#12783D', fontWeight: 'bold' },
  checkIcon: { position: 'absolute', top: 8, right: 8 },

  chipContainer: { flexDirection: 'row', flexWrap: 'wrap' },
  chip: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 24, backgroundColor: '#f5f5f5', marginRight: 10, marginBottom: 10 },
  selectedChip: { backgroundColor: '#12783D' },
  chipText: { color: '#555', fontWeight: '500' },
  selectedChipText: { color: '#fff', fontWeight: 'bold' },

  footer: { padding: 24, borderTopWidth: 1, borderTopColor: '#f5f5f5' },
  nextBtn: { flexDirection: 'row', backgroundColor: '#12783D', paddingVertical: 16, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  disabledBtn: { backgroundColor: '#ccc' },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16, marginRight: 8 },
  skipBtn: { alignItems: 'center' },
  skipText: { color: '#888', fontWeight: '600' },
});



