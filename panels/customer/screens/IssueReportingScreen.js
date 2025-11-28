import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
  ScrollView
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function IssueReportingScreen({ navigation }) {
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState('');

  const categories = ["Order Issue", "Payment Issue", "App Bug", "Other"];

  const handleSubmit = () => {
    if (!category || !message) return Alert.alert("Missing Info", "Please select a category and describe the issue.");
    Alert.alert("Submitted", "We will contact you shortly.", [{ text: "OK", onPress: () => navigation.goBack() }]);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <View style={styles.header}>
         <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#333" />
         </TouchableOpacity>
         <Text style={styles.title}>Help & Support</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
         <Text style={styles.label}>What's the issue?</Text>
         <View style={styles.cats}>
            {categories.map(cat => (
               <TouchableOpacity 
                 key={cat} 
                 style={[styles.catChip, category === cat && styles.catSelected]}
                 onPress={() => setCategory(cat)}
               >
                  <Text style={[styles.catText, category === cat && styles.textSelected]}>{cat}</Text>
               </TouchableOpacity>
            ))}
         </View>

         <Text style={styles.label}>Describe details</Text>
         <TextInput 
            style={styles.input} 
            multiline 
            numberOfLines={6} 
            placeholder="Tell us what happened..." 
            value={message}
            onChangeText={setMessage}
         />

         <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
            <Text style={styles.btnText}>Submit Report</Text>
         </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee' },
  title: { fontSize: 18, fontWeight: 'bold', marginLeft: 16, color: '#333' },
  content: { padding: 20 },
  label: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 12, marginTop: 12 },
  cats: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20 },
  catChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: '#ddd', marginRight: 8, marginBottom: 8 },
  catSelected: { backgroundColor: '#12783D', borderColor: '#12783D' },
  catText: { color: '#555' },
  textSelected: { color: '#fff', fontWeight: 'bold' },
  input: { backgroundColor: '#F9F9F9', borderRadius: 12, padding: 16, textAlignVertical: 'top', fontSize: 16, height: 150 },
  submitBtn: { backgroundColor: '#12783D', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 32 },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});



