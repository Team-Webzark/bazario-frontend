import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Alert,
  ScrollView
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function OrderRatingScreen({ navigation }) {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [tags, setTags] = useState([
    { id: '1', label: 'Fast Delivery', selected: false },
    { id: '2', label: 'Good Packaging', selected: false },
    { id: '3', label: 'Fresh Items', selected: false },
    { id: '4', label: 'Polite Partner', selected: false },
  ]);

  const toggleTag = (id) => {
    setTags(prev => prev.map(tag => 
      tag.id === id ? { ...tag, selected: !tag.selected } : tag
    ));
  };

  const handleSubmit = () => {
    if (rating === 0) {
      Alert.alert("Rating Required", "Please select at least 1 star.");
      return;
    }
    
    Alert.alert(
      "Thank You!",
      "Your feedback helps us improve.",
      [
        { text: "OK", onPress: () => navigation.navigate('HomeTab') }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      
      {/* Header (Close Button) */}
      <View style={styles.header}>
         <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="close" size={28} color="#333" />
         </TouchableOpacity>
         <Text style={styles.headerTitle}>Rate Order</Text>
         <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
         
         <Text style={styles.title}>How was your order?</Text>
         <Text style={styles.subtitle}>Order #12345 from Sharma Kirana</Text>

         {/* Star Rating */}
         <View style={styles.starContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
               <TouchableOpacity key={star} onPress={() => setRating(star)}>
                  <Ionicons 
                     name={star <= rating ? "star" : "star-outline"} 
                     size={40} 
                     color={star <= rating ? "#F79009" : "#ccc"} 
                     style={styles.star}
                  />
               </TouchableOpacity>
            ))}
         </View>
         <Text style={styles.ratingLabel}>
            {rating === 5 ? "Excellent!" : rating >= 4 ? "Very Good" : rating >= 3 ? "Good" : rating > 0 ? "Could be better" : "Tap to Rate"}
         </Text>

         <View style={styles.divider} />

         {/* Feedback Tags */}
         <Text style={styles.sectionTitle}>What went well?</Text>
         <View style={styles.tagsContainer}>
            {tags.map((tag) => (
               <TouchableOpacity 
                  key={tag.id} 
                  style={[styles.tag, tag.selected && styles.tagSelected]}
                  onPress={() => toggleTag(tag.id)}
               >
                  <Text style={[styles.tagText, tag.selected && styles.tagTextSelected]}>
                     {tag.label}
                  </Text>
               </TouchableOpacity>
            ))}
         </View>

         {/* Text Input */}
         <Text style={styles.sectionTitle}>Leave a note (Optional)</Text>
         <TextInput
            style={styles.input}
            placeholder="Tell us more about your experience..."
            multiline
            numberOfLines={4}
            value={feedback}
            onChangeText={setFeedback}
         />

      </ScrollView>

      {/* Submit Button */}
      <View style={styles.footer}>
         <TouchableOpacity 
            style={[styles.submitBtn, rating === 0 && styles.disabledBtn]}
            onPress={handleSubmit}
            disabled={rating === 0}
         >
            <Text style={styles.submitText}>Submit Feedback</Text>
         </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },

  content: { padding: 20, alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 8 },
  subtitle: { fontSize: 14, color: '#888', marginBottom: 32 },

  starContainer: { flexDirection: 'row', marginBottom: 12 },
  star: { marginHorizontal: 4 },
  ratingLabel: { fontSize: 18, fontWeight: 'bold', color: '#F79009', marginBottom: 32 },

  divider: { width: '100%', height: 1, backgroundColor: '#eee', marginBottom: 24 },

  sectionTitle: { alignSelf: 'flex-start', fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 12 },
  
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 24, width: '100%' },
  tag: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: '#ddd', marginRight: 8, marginBottom: 8, backgroundColor: '#fff' },
  tagSelected: { backgroundColor: '#F0FDF4', borderColor: '#12783D' },
  tagText: { color: '#666' },
  tagTextSelected: { color: '#12783D', fontWeight: 'bold' },

  input: { width: '100%', backgroundColor: '#F9F9F9', borderRadius: 12, padding: 16, height: 100, textAlignVertical: 'top', fontSize: 16 },

  footer: { padding: 16, borderTopWidth: 1, borderTopColor: '#eee' },
  submitBtn: { backgroundColor: '#12783D', paddingVertical: 16, borderRadius: 12, alignItems: 'center' },
  disabledBtn: { backgroundColor: '#ccc' },
  submitText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});



