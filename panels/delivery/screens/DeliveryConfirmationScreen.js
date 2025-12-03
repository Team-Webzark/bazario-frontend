import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const DeliveryConfirmationScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {/* COD Header */}
        <View style={styles.codHeader}>
          <Text style={styles.checkIcon}>✓</Text>
          <Text style={styles.codTitle}>Collect Cash ₹250</Text>
        </View>

        {/* Delivery Complete Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Delivery Completed!</Text>

          {/* Code and Photo Options */}
          <View style={styles.optionsRow}>
            <TouchableOpacity style={styles.optionBox}>
              <View style={styles.iconCircle}>
                <Text style={styles.optionIcon}>⋮⋮⋮</Text>
              </View>
              <Text style={styles.optionText}>Enter Delivery{'\n'}Code</Text>
              <Text style={styles.optionSubtext}>(4 digits)</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.optionBox, styles.optionBoxGreen]}>
              <View style={styles.iconCircleWhite}>
                <Text style={styles.optionIconWhite}>📷</Text>
              </View>
              <Text style={[styles.optionText, styles.optionTextWhite]}>Take Photo{'\n'}Proof</Text>
            </TouchableOpacity>
          </View>

          {/* Signature Section */}
          <View style={styles.signatureSection}>
            <Text style={styles.signatureLabel}>✏️ Customer Signature (Optional)</Text>
            <View style={styles.signatureBox}>
              <Text style={styles.signatureText}>Sign</Text>
            </View>
          </View>
        </View>

        {/* Mark Delivered Button */}
        <TouchableOpacity
          style={styles.deliveredButton}
          onPress={() => navigation.navigate('DeliverySuccess')}
        >
          <View style={styles.checkCircle}>
            <Text style={styles.checkmarkIcon}>›</Text>
          </View>
          <Text style={styles.deliveredText}>Mark Delivered</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DeliveryConfirmationScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E8F5E9' },
  codHeader: {
    backgroundColor: '#00C853',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 3,
  },
  checkIcon: {
    fontSize: 32,
    color: '#FFF',
    marginRight: 12,
    backgroundColor: 'rgba(255,255,255,0.3)',
    width: 44,
    height: 44,
    borderRadius: 22,
    textAlign: 'center',
    lineHeight: 44,
  },
  codTitle: { fontSize: 24, fontWeight: '800', color: '#FFF' },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    elevation: 2,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#00C853',
    textAlign: 'center',
    marginBottom: 20,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  optionBox: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#00C853',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 6,
  },
  optionBoxGreen: {
    backgroundColor: '#00C853',
    borderColor: '#00C853',
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  iconCircleWhite: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  optionIcon: { fontSize: 24, color: '#00C853', fontWeight: '800' },
  optionIconWhite: { fontSize: 28 },
  optionText: { fontSize: 14, fontWeight: '700', color: '#333', textAlign: 'center' },
  optionTextWhite: { color: '#FFF' },
  optionSubtext: { fontSize: 12, color: '#666', marginTop: 2 },
  signatureSection: {
    marginTop: 8,
  },
  signatureLabel: { fontSize: 14, fontWeight: '600', color: '#666', marginBottom: 8 },
  signatureBox: {
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAFAFA',
  },
  signatureText: { fontSize: 32, color: '#CCC', fontStyle: 'italic' },
  deliveredButton: {
    backgroundColor: '#00C853',
    paddingVertical: 16,
    borderRadius: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  checkCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkmarkIcon: { fontSize: 28, color: '#FFF', fontWeight: '700' },
  deliveredText: { fontSize: 18, fontWeight: '800', color: '#FFF' },
});
