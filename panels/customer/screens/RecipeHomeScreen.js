import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  TextInput
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const RECIPES = [
  { id: '1', name: 'Masala Poha', time: '15 min', calories: '250 cal', image: 'https://via.placeholder.com/150', tags: ['Breakfast', 'Easy'] },
  { id: '2', name: 'Paneer Butter Masala', time: '45 min', calories: '450 cal', image: 'https://via.placeholder.com/150', tags: ['Dinner', 'Veg'] },
  { id: '3', name: 'Vegetable Maggi', time: '10 min', calories: '300 cal', image: 'https://via.placeholder.com/150', tags: ['Snack'] },
  { id: '4', name: 'Aloo Paratha', time: '30 min', calories: '350 cal', image: 'https://via.placeholder.com/150', tags: ['Breakfast'] },
];

export default function RecipeHomeScreen({ navigation }) {
  
  const renderRecipe = ({ item }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
             <Ionicons name="time-outline" size={12} color="#666" />
             <Text style={styles.metaText}>{item.time}</Text>
          </View>
          <View style={styles.metaItem}>
             <Ionicons name="flame-outline" size={12} color="#666" />
             <Text style={styles.metaText}>{item.calories}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Discover Recipes</Text>
        <TouchableOpacity>
           <Ionicons name="filter" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#999" />
          <TextInput placeholder="Search recipes, ingredients..." style={styles.input} />
        </View>
      </View>

      {/* Recipe Grid */}
      <FlatList
        data={RECIPES}
        renderItem={renderRecipe}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  
  searchContainer: { paddingHorizontal: 16, paddingBottom: 16, backgroundColor: '#fff' },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F0F2F5', borderRadius: 12, paddingHorizontal: 12, height: 48 },
  input: { flex: 1, marginLeft: 8, fontSize: 16 },

  list: { padding: 16 },
  row: { justifyContent: 'space-between' },
  card: { width: '48%', backgroundColor: '#fff', borderRadius: 12, marginBottom: 16, elevation: 2, overflow: 'hidden' },
  image: { width: '100%', height: 120, resizeMode: 'cover' },
  info: { padding: 10 },
  name: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 6 },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between' },
  metaItem: { flexDirection: 'row', alignItems: 'center' },
  metaText: { fontSize: 12, color: '#666', marginLeft: 4 },
});



