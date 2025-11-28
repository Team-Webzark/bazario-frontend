import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  StatusBar,
  Keyboard
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState(['Milk', 'Bread', 'Onion']);
  const inputRef = useRef(null);

  // Auto-focus on mount
  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  const handleSearch = (text) => {
    const searchTerm = text || query;
    if (searchTerm.trim()) {
      // Add to recent (mock logic)
      if (!recentSearches.includes(searchTerm)) {
         setRecentSearches([searchTerm, ...recentSearches]);
      }
      navigation.navigate('SearchResults', { query: searchTerm });
    }
  };

  const clearRecent = () => setRecentSearches([]);

  const trendingTags = ['Atta', 'Rice', 'Chips', 'Chocolate', 'Paneer', 'Maggi'];

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      {/* Header with Search Bar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
           <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.searchBox}>
           <Ionicons name="search" size={20} color="#12783D" />
           <TextInput
             ref={inputRef}
             style={styles.input}
             placeholder="Search for products..."
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

      <View style={styles.content}>
         {/* Recent Searches */}
         {recentSearches.length > 0 && (
            <View style={styles.section}>
               <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Recent Searches</Text>
                  <TouchableOpacity onPress={clearRecent}>
                     <Text style={styles.clearText}>Clear</Text>
                  </TouchableOpacity>
               </View>
               {recentSearches.map((item, index) => (
                  <TouchableOpacity 
                     key={index} 
                     style={styles.recentItem}
                     onPress={() => handleSearch(item)}
                  >
                     <Ionicons name="time-outline" size={20} color="#888" />
                     <Text style={styles.recentText}>{item}</Text>
                     <Ionicons name="arrow-forward-outline" size={16} color="#ddd" style={{ marginLeft: 'auto' }} />
                  </TouchableOpacity>
               ))}
            </View>
         )}

         {/* Trending Tags */}
         <View style={styles.section}>
            <Text style={styles.sectionTitle}>Trending Near You</Text>
            <View style={styles.tagContainer}>
               {trendingTags.map((tag, index) => (
                  <TouchableOpacity 
                     key={index} 
                     style={styles.tag}
                     onPress={() => handleSearch(tag)}
                  >
                     <Text style={styles.tagText}>{tag}</Text>
                  </TouchableOpacity>
               ))}
            </View>
         </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 12, borderBottomWidth: 1, borderBottomColor: '#eee' },
  backBtn: { marginRight: 12 },
  searchBox: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#f5f5f5', borderRadius: 8, paddingHorizontal: 12, height: 44 },
  input: { flex: 1, marginLeft: 8, fontSize: 16, color: '#333' },
  
  content: { padding: 16 },
  
  section: { marginBottom: 24 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', color: '#666', textTransform: 'uppercase' },
  clearText: { color: '#12783D', fontSize: 12, fontWeight: 'bold' },

  recentItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f9f9f9' },
  recentText: { marginLeft: 12, fontSize: 16, color: '#333' },

  tagContainer: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 8 },
  tag: { paddingHorizontal: 16, paddingVertical: 8, backgroundColor: '#F0FDF4', borderRadius: 20, borderWidth: 1, borderColor: '#12783D', marginRight: 8, marginBottom: 8 },
  tagText: { color: '#12783D', fontWeight: 'bold' },
});



