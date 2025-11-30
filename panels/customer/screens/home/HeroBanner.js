// panels/customer/components/Home/HeroBanner.js

import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const ASSETS = {
    heroPerson: { uri: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400' },
};

export default function HeroBanner() {
  const navigation = useNavigation();

  return (
    <View style={styles.heroBanner}>
        
        {/* Text Content */}
        <View style={styles.heroTextContent}>
            <Text style={styles.greeting}>Good evening, Shaw! 👋</Text>
            <Text style={styles.heroSub}>Kitchen looking empty? Let's fill it up.</Text>
            
            <View style={styles.heroActions}>
                {/* Primary Action */}
                <TouchableOpacity 
                    style={styles.ctaPrimary}
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate('CategoryListing', { category: 'Monthly Essentials' })}
                >
                    <Text style={styles.ctaPrimaryText}>Refill Essentials</Text>
                    <Ionicons name="arrow-forward" size={14} color="#fff" />
                </TouchableOpacity>

                {/* Secondary Action */}
                <TouchableOpacity 
                    style={styles.ctaSecondary}
                    activeOpacity={0.6}
                    onPress={() => navigation.navigate('RecipesTab')}
                >
                    <Text style={styles.ctaSecondaryText}>Plan Meals</Text>
                </TouchableOpacity>
            </View>
        </View>

        {/* Image */}
       
    </View>
  );
}

const styles = StyleSheet.create({
  heroBanner: { 
    marginTop: 24, 
    backgroundColor: '#FFECB3', // Thoda soft gold/yellow
    borderRadius: 24, 
    padding: 24, 
    flexDirection: 'row', 
    alignItems: 'center', 
    overflow: 'hidden', 
    minHeight: 170,
    // Shadow for depth
    elevation: 4,
    shadowColor: '#F57C00',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  heroTextContent: { 
    flex: 1, 
    zIndex: 2, 
    paddingRight: 10 
  },
  greeting: { 
    fontSize: 20, 
    fontWeight: '800', 
    color: '#3E2723', 
    marginBottom: 6 
  },
  heroSub: { 
    fontSize: 14, 
    color: '#5D4037', 
    marginBottom: 20, 
    fontWeight: '500',
    lineHeight: 20,
    maxWidth: '90%'
  },
  heroActions: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 12 
  },
  
  // Refill Button (Solid)
  ctaPrimary: { 
    backgroundColor: '#F57C00', 
    paddingVertical: 10, 
    paddingHorizontal: 16, 
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    elevation: 2
  },
  ctaPrimaryText: { 
    color: '#fff', 
    fontWeight: '700', 
    fontSize: 13 
  },

  // Plan Button (Outline/Text)
  ctaSecondary: { 
    paddingVertical: 10, 
    paddingHorizontal: 12,
    borderWidth: 1.5,
    borderColor: '#5D4037',
    borderRadius: 30
  },
  ctaSecondaryText: { 
    color: '#3E2723', 
    fontWeight: '700', 
    fontSize: 13 
  },

  // Image Positioning
  heroPersonImage: { 
    width: 130, 
    height: 170, 
    position: 'absolute', 
    right: -15, 
    bottom: -10, 
    zIndex: 1, 
    resizeMode: 'contain' 
  },
});
