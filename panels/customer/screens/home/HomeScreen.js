// panels/customer/screens/HomeScreen.js

import React from 'react';
import { StyleSheet, ScrollView, StatusBar, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Import Components
import HomeHeader from './HomeHeader';
import HeroBanner from './HeroBanner';
import BuyAgainList from './BuyAgainList';
import BudgetStrip from './BudgetStrip';
import RecipeList from './RecipeList';
import CategoryGrid from './CategoryGrid';
// import StoreCard from './StoreCard';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar backgroundColor="#FFFBF2" barStyle="dark-content" />

      <HomeHeader navigation={navigation} />

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
      >
        <HeroBanner />
        <BuyAgainList />
        <CategoryGrid navigation={navigation} />
        <BudgetStrip />
        <RecipeList />
        
        {/* <StoreCard /> */}
        
        <View style={{ height: 80 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFBF2' },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 20 },
});
