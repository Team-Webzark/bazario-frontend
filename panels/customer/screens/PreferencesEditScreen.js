import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Switch,
  Alert
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function PreferencesEditScreen({ navigation }) {
  // Mock Initial State (Would come from User Profile API)
  const [diet, setDiet] = useState('Veg');
  const [cookingFreq, setCookingFreq] = useState('Daily');
  const [familySize, setFamilySize] = useState(3);
  const [notifications, setNotifications] = useState(true);

  const dietOptions = ['Veg', 'Non-Veg', 'Eggetarian', 'Vegan'];
  const freqOptions = ['Daily', 'Weekly', 'Rarely'];

  const handleSave = () => {
    // Simulate API Call
    Alert.alert("Success", "Your preferences have been updated.", [
      { text: "OK", onPress: () => navigation.goBack() }
    ]);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
         <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#333" />
         </TouchableOpacity>
         <Text style={styles.headerTitle}>Edit Preferences</Text>
         <TouchableOpacity onPress={handleSave}>
            <Text style={styles.saveText}>Save</Text>
         </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
         
         {/* Diet Section */}
         <Text style={styles.sectionTitle}>Dietary Preference</Text>
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

         {/* Cooking Frequency */}
         <Text style={styles.sectionTitle}>Cooking Frequency</Text>
         <View style={styles.radioGroup}>
            {freqOptions.map((option) => (
               <TouchableOpacity 
                 key={option} 
                 style={styles.radioRow}
                 onPress={() => setCookingFreq(option)}
               >
                  <Text style={styles.radioLabel}>{option}</Text>
                  <Ionicons 
                    name={cookingFreq === option ? "radio-button-on" : "radio-button-off"} 
                    size={20} 
                    color={cookingFreq === option ? "#12783D" : "#ccc"} 
                  />
               </TouchableOpacity>
            ))}
         </View>

         {/* Household Size */}
         <Text style={styles.sectionTitle}>Household Size</Text>
         <View style={styles.stepperRow}>
            <Text style={styles.stepperLabel}>Members</Text>
            <View style={styles.stepperControls}>
               <TouchableOpacity onPress={() => setFamilySize(Math.max(1, familySize - 1))} style={styles.stepBtn}>
                  <Ionicons name="remove" size={20} color="#12783D" />
               </TouchableOpacity>
               <Text style={styles.stepValue}>{familySize}</Text>
               <TouchableOpacity onPress={() => setFamilySize(familySize + 1)} style={styles.stepBtn}>
                  <Ionicons name="add" size={20} color="#12783D" />
               </TouchableOpacity>
            </View>
         </View>

         {/* Toggle Switch Example */}
         <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Receive Personalized Suggestions</Text>
            <Switch
               trackColor={{ false: "#767577", true: "#A0CFA0" }}
               thumbColor={notifications ? "#12783D" : "#f4f3f4"}
               onValueChange={setNotifications}
               value={notifications}
            />
         </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: '#fff', elevation: 2 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  saveText: { color: '#12783D', fontWeight: 'bold', fontSize: 16 },

  content: { padding: 20 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#555', marginBottom: 12, marginTop: 8 },

  chipContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 24 },
  chip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#fff', borderWidth: 1, borderColor: '#ddd', marginRight: 8, marginBottom: 8 },
  chipSelected: { backgroundColor: '#E8F5E9', borderColor: '#12783D' },
  chipText: { color: '#555' },
  chipTextSelected: { color: '#12783D', fontWeight: 'bold' },

  radioGroup: { backgroundColor: '#fff', borderRadius: 12, padding: 8, marginBottom: 24 },
  radioRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12, borderBottomWidth: 1, borderBottomColor: '#f9f9f9' },
  radioLabel: { fontSize: 16, color: '#333' },

  stepperRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 24 },
  stepperLabel: { fontSize: 16, color: '#333' },
  stepperControls: { flexDirection: 'row', alignItems: 'center' },
  stepBtn: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#E8F5E9', justifyContent: 'center', alignItems: 'center' },
  stepValue: { fontSize: 18, fontWeight: 'bold', color: '#333', marginHorizontal: 16 },

  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  switchLabel: { fontSize: 14, color: '#666', flex: 1, marginRight: 16 },
});



