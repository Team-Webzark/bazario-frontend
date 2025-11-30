// panels/customer/screens/SearchScreen.js

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState(['Milk', 'Bread', 'Onion']);
  const inputRef = useRef(null);

  // Auto-focus: Jaise hi screen aayegi, keyboard khul jayega
  useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (text) => {
    const searchTerm = text || query;
    if (searchTerm.trim()) {
      navigation.navigate('SearchResults', { query: searchTerm });
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar backgroundColor="#FFFBF2" barStyle="dark-content" />

      {/* --- HEADER (Matches HomeHeader Styles) --- */}
      <View style={styles.header}>
        
        {/* Back Button */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
           <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>

        {/* Active Search Bar */}
        <View style={styles.searchBox}>
           <Ionicons name="search" size={20} color="#12783D" style={{ marginRight: 8 }} />
           <TextInput
             ref={inputRef}
             style={styles.input}
             placeholder="Search for products..."
             placeholderTextColor="#999"
             value={query}
             onChangeText={setQuery}
             onSubmitEditing={() => handleSearch()}
             returnKeyType="search"
           />
           {query.length > 0 && (
             <TouchableOpacity onPress={() => setQuery('')}>
                <Ionicons name="close-circle" size={18} color="#ccc" />
             </TouchableOpacity>
           )}
        </View>
      </View>

      {/* --- CONTENT BODY --- */}
      <View style={styles.content}>
         
         {/* Recent Searches */}
         {recentSearches.length > 0 && (
            <View style={styles.section}>
               <Text style={styles.sectionTitle}>Recent</Text>
               <View style={styles.tagsRow}>
                  {recentSearches.map((item, index) => (
                     <TouchableOpacity 
                        key={index} 
                        style={styles.historyChip}
                        onPress={() => handleSearch(item)}
                     >
                        <Ionicons name="time-outline" size={14} color="#666" style={{ marginRight: 4 }} />
                        <Text style={styles.chipText}>{item}</Text>
                     </TouchableOpacity>
                  ))}
               </View>
            </View>
         )}

         {/* Trending */}
         <View style={styles.section}>
            <Text style={styles.sectionTitle}>Trending</Text>
            <View style={styles.tagsRow}>
               {['Atta', 'Rice', 'Chips', 'Paneer', 'Maggi'].map((tag, index) => (
                  <TouchableOpacity 
                     key={index} 
                     style={styles.trendChip}
                     onPress={() => handleSearch(tag)}
                  >
                     <Ionicons name="trending-up" size={14} color="#12783D" style={{ marginRight: 4 }} />
                     <Text style={styles.trendText}>{tag}</Text>
                  </TouchableOpacity>
               ))}
            </View>
         </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFBF2' }, // Same background as Home
  
  // Header Styling to match Home perfectly
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 20, 
    paddingVertical: 10, // Matches HomeHeader padding
  },
  
  backBtn: { marginRight: 12 },

  searchBox: { 
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#FFF', 
    borderRadius: 24, 
    paddingHorizontal: 16, 
    height: 48, 
    borderWidth: 1, 
    borderColor: '#12783D', // Highlighted border color for active state
    elevation: 2 
  },
  
  input: { flex: 1, fontSize: 15, color: '#333', height: '100%' },

  content: { padding: 20 },

  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: '#888', marginBottom: 12, textTransform: 'uppercase' },
  
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  
  // Chips
  historyChip: { 
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#fff', paddingHorizontal: 12, paddingVertical: 8, 
    borderRadius: 20, borderWidth: 1, borderColor: '#eee' 
  },
  chipText: { color: '#333', fontSize: 13 },

  trendChip: { 
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#F0FDF4', paddingHorizontal: 12, paddingVertical: 8, 
    borderRadius: 20, borderWidth: 1, borderColor: '#DCFCE7' 
  },
  trendText: { color: '#12783D', fontWeight: '600', fontSize: 13 },
});
