import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const EarningsScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Earnings</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {/* Total Balance Card */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <View style={styles.balanceRow}>
            <Text style={styles.balanceAmount}>₹1200</Text>
            <TouchableOpacity style={styles.withdrawButton}>
              <Text style={styles.withdrawText}>Withraw →</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Today's Trips */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Today's Trips</Text>
          
          <View style={styles.tripRow}>
            <Text style={styles.tripTime}>🕐 10:30 AM - #4455 - ₹45</Text>
            <Text style={styles.tripIcon}>🕐</Text>
          </View>
          <View style={styles.tripRow}>
            <Text style={styles.tripTime}>🕐 9:45 AM - #4450 - ₹60</Text>
            <Text style={styles.tripIcon}>🕐</Text>
          </View>
          <View style={styles.tripRow}>
            <Text style={styles.tripTime}>🕐 9:00 AM - #4442 - ₹35</Text>
            <Text style={styles.tripIcon}>🕐</Text>
          </View>
        </View>

        {/* Weekly Trend */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Weekly Earning Trend</Text>
          
          {/* Simple Chart Placeholder */}
          <View style={styles.chartContainer}>
            <View style={styles.chartLine} />
            <View style={[styles.chartBar, { height: 40 }]} />
            <View style={[styles.chartBar, { height: 60 }]} />
            <View style={[styles.chartBar, { height: 50 }]} />
            <View style={[styles.chartBar, { height: 80 }]} />
            <View style={[styles.chartBar, { height: 70 }]} />
            <View style={[styles.chartBar, { height: 100 }]} />
          </View>

          {/* Bonus Banner */}
          <View style={styles.bonusBanner}>
            <Text style={styles.bonusIcon}>🎁</Text>
            <Text style={styles.bonusText}>Complete 3 more orders to get ₹100 bonus</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EarningsScreen;

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
  balanceCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
  },
  balanceLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#00C853',
    marginBottom: 8,
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: '900',
    color: '#00C853',
  },
  withdrawButton: {
    backgroundColor: '#00C853',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  withdrawText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFF',
  },
  sectionCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 16,
  },
  tripRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  tripTime: { fontSize: 14, color: '#666' },
  tripIcon: { fontSize: 18 },
  chartContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    height: 120,
    marginBottom: 16,
    position: 'relative',
  },
  chartLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 100,
    borderTopWidth: 2,
    borderTopColor: '#E8F5E9',
  },
  chartBar: {
    width: 30,
    backgroundColor: '#C8E6C9',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  bonusBanner: {
    backgroundColor: '#E8F5E9',
    borderWidth: 2,
    borderColor: '#00C853',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bonusIcon: { fontSize: 24, marginRight: 8 },
  bonusText: { fontSize: 14, fontWeight: '600', color: '#00C853', flex: 1 },
});
