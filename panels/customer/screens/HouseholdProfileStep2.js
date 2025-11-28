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
import Ionicons from 'react-native-vector-icons/Ionicons';
import Slider from '@react-native-community/slider'; // Make sure to install this or use basic View slider logic

export default function HouseholdProfileStep2({ route, navigation }) {
  const [cookingFreq, setCookingFreq] = useState(null);
  const [budget, setBudget] = useState(5000); // Default 5k

  const freqOptions = [
    { label: 'Daily', value: 'Daily' },
    { label: '3-4 times/week', value: 'Weekly' },
    { label: 'Rarely', value: 'Rarely' },
  ];

  const handleFinish = () => {
    if (!cookingFreq) {
      alert('Please select cooking frequency.');
      return;
    }
    
    Alert.alert(
      "Setup Complete! 🎉",
      "Your profile has been personalized.",
      [
        { text: "Let's Shop", onPress: () => navigation.reset({ index: 0, routes: [{ name: 'CustomerTabs' }] }) }
      ]
    );
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
             <View style={[styles.progressFill, { width: '100%' }]} />
          </View>
          <Text style={styles.stepText}>Step 2 of 2</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Almost done!</Text>
        <Text style={styles.subtitle}>Just a few more details.</Text>

        {/* Question 3: Cooking Frequency */}
        <Text style={styles.question}>How often do you cook?</Text>
        <View style={styles.grid}>
           {freqOptions.map((option) => (
              <TouchableOpacity 
                key={option.value}
                style={[styles.card, cookingFreq === option.value && styles.selectedCard]}
                onPress={() => setCookingFreq(option.value)}
              >
                 <Text style={[styles.cardText, cookingFreq === option.value && styles.selectedText]}>
                    {option.label}
                 </Text>
                 {cookingFreq === option.value && (
                    <Ionicons name="checkmark-circle" size={20} color="#12783D" style={styles.checkIcon} />
                 )}
              </TouchableOpacity>
           ))}
        </View>

        {/* Question 4: Budget Slider */}
        <Text style={styles.question}>Monthly Grocery Budget</Text>
        <Text style={styles.budgetValue}>₹{budget} - ₹{budget + 2000}</Text>
        
        <View style={styles.sliderContainer}>
           <Slider
             style={{ width: '100%', height: 40 }}
             minimumValue={1000}
             maximumValue={20000}
             step={500}
             value={budget}
             onValueChange={setBudget}
             minimumTrackTintColor="#12783D"
             maximumTrackTintColor="#ddd"
             thumbTintColor="#12783D"
           />
           <View style={styles.sliderLabels}>
              <Text style={styles.label}>₹1k</Text>
              <Text style={styles.label}>₹20k+</Text>
           </View>
        </View>

      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
         <TouchableOpacity 
           style={[styles.nextBtn, !cookingFreq && styles.disabledBtn]}
           onPress={handleFinish}
           disabled={!cookingFreq}
         >
            <Text style={styles.btnText}>Finish Setup</Text>
            <Ionicons name="checkmark-circle-outline" size={24} color="#fff" />
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
  
  grid: { marginBottom: 32 },
  card: { padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#ddd', marginBottom: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fff' },
  selectedCard: { borderColor: '#12783D', backgroundColor: '#F0FDF4' },
  cardText: { fontSize: 16, fontWeight: '600', color: '#555' },
  selectedText: { color: '#12783D', fontWeight: 'bold' },
  
  budgetValue: { fontSize: 24, fontWeight: 'bold', color: '#12783D', marginBottom: 8, textAlign: 'center' },
  sliderContainer: { alignItems: 'stretch', justifyContent: 'center' },
  sliderLabels: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 },
  label: { color: '#888' },

  footer: { padding: 24, borderTopWidth: 1, borderTopColor: '#f5f5f5' },
  nextBtn: { flexDirection: 'row', backgroundColor: '#12783D', paddingVertical: 16, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  disabledBtn: { backgroundColor: '#ccc' },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16, marginRight: 8 },
});



