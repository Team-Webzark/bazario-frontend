import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

export default function RoleSelectionScreen({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#FAF6EF', // Soft off-white, like onboarding
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
      }}
    >
      {/* Brand logo/icon */}
      {/* Replace 'require()' image path with your actual asset */}
      <Image
        source={require('../../../assets/logo.png')}
        style={{ width: 64, height: 64, marginBottom: 20 }}
        resizeMode="contain"
        accessibilityLabel="App logo"
      />

      {/* Heading */}
      <Text
        style={{
          fontSize: 28,
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: 8,
          color: '#242424',
        }}
      >
        Select your role
      </Text>
      <Text
        style={{
          fontSize: 16,
          color: '#595959',
          textAlign: 'center',
          marginBottom: 24,
        }}
      >
        Continue as customer, delivery partner, or admin
      </Text>

      {/* Role options */}
      <TouchableOpacity
        onPress={() => navigation.navigate('MobileNumberInput', { role: 'customer' })}
        style={{
          backgroundColor: '#12783D',
          paddingVertical: 16,
          paddingHorizontal: 32,
          borderRadius: 32,
          marginBottom: 16,
          width: '100%',
        }}
        accessibilityLabel="Continue as Customer"
        accessibilityRole="button"
      >
        <Text style={{ color: 'white', fontSize: 18, fontWeight: '600', textAlign: 'center' }}>
          Customer
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('MobileNumberInput', { role: 'delivery' })}
        style={{
          backgroundColor: '#F79009',
          paddingVertical: 16,
          paddingHorizontal: 32,
          borderRadius: 32,
          marginBottom: 16,
          width: '100%',
        }}
        accessibilityLabel="Continue as Delivery Partner"
        accessibilityRole="button"
      >
        <Text style={{ color: 'white', fontSize: 18, fontWeight: '600', textAlign: 'center' }}>
          Delivery Partner
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('PasswordLogin', { role: 'admin' })}
        style={{
          backgroundColor: '#484848',
          paddingVertical: 16,
          paddingHorizontal: 32,
          borderRadius: 32,
          marginBottom: 16,
          width: '100%',
        }}
        accessibilityLabel="Continue as Admin"
        accessibilityRole="button"
      >
        <Text style={{ color: 'white', fontSize: 18, fontWeight: '600', textAlign: 'center' }}>
          Admin
        </Text>
      </TouchableOpacity>

      {/* Footer */}
      <View style={{ marginTop: 40 }}>
        <Text style={{ color: '#B0B0B0', fontSize: 13, textAlign: 'center' }}>
          Powered by <Text style={{ color: '#12783D', fontWeight: 'bold' }}>YourBrand</Text>
        </Text>
      </View>
    </View>
  );
}
