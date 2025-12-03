import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const HelpScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help & Support</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {/* Quick Actions */}
        <View style={styles.card}>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.buttonIcon}>📞</Text>
            <Text style={styles.buttonText}>Call Support</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.buttonIcon}>💬</Text>
            <Text style={styles.secondaryButtonText}>Chat with Support</Text>
          </TouchableOpacity>
        </View>

        {/* FAQs */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>FAQs</Text>
          <Text style={styles.faqText}>• How do I accept an order?</Text>
          <Text style={styles.faqText}>• What if an item is unavailable?</Text>
          <Text style={styles.faqText}>• How do I get paid?</Text>
          <Text style={styles.faqText}>• How often are payouts done?</Text>
        </View>

        {/* Contact Info */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Contact</Text>
          <Text style={styles.contactText}>Phone: +91 98xx-xx-xxxx</Text>
          <Text style={styles.contactText}>Email: support@bazario.com</Text>
          <Text style={styles.contactText}>Working hours: 9 AM – 8 PM</Text>
        </View>

        <Text style={styles.version}>App version 1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HelpScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: { fontSize: 28, color: '#333' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#333' },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 1,
  },
  primaryButton: {
    backgroundColor: '#00C853',
    paddingVertical: 16,
    borderRadius: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    elevation: 2,
  },
  buttonIcon: { fontSize: 20, marginRight: 8 },
  buttonText: { fontSize: 16, fontWeight: '700', color: '#FFF' },
  secondaryButton: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 14,
    borderRadius: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: { fontSize: 16, fontWeight: '600', color: '#333' },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  faqText: { fontSize: 14, color: '#666', marginBottom: 8 },
  contactText: { fontSize: 14, color: '#666', marginBottom: 6 },
  version: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginTop: 16,
  },
});
