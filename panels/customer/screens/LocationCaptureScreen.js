// panels/customer/screens/LocationCaptureScreen.js

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
  Animated,
  Dimensions,
  Modal,
  FlatList
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// Indian States List
const STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 
  'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 
  'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 
  'Uttarakhand', 'West Bengal', 'Delhi', 'Jammu and Kashmir', 'Ladakh'
];

export default function LocationCaptureScreen({ navigation, route }) {
  const { registrationData } = route.params || {};

  const [region, setRegion] = useState({
    latitude: 28.3670,
    longitude: 79.4304,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });

  const [formData, setFormData] = useState({
    pincode: '',
    state: '',
    city: '',
    houseNo: '',
    area: '',
    landmark: '',
    type: 'Home',
  });
  
  const [isMapExpanded, setIsMapExpanded] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showStateModal, setShowStateModal] = useState(false);

  // Animations
  const sheetTranslateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const mapHeightAnim = useRef(new Animated.Value(SCREEN_HEIGHT * 0.4)).current;

  useEffect(() => {
    // Slide up sheet on mount
    Animated.spring(sheetTranslateY, {
      toValue: 0,
      useNativeDriver: true,
      damping: 20,
      stiffness: 90
    }).start();
  }, []);

  // Expand/Collapse Map Animation
  useEffect(() => {
    Animated.timing(mapHeightAnim, {
      toValue: isMapExpanded ? SCREEN_HEIGHT * 0.4 : SCREEN_HEIGHT * 0.2,
      duration: 300,
      useNativeDriver: false // Width/Height require false
    }).start();
  }, [isMapExpanded]);

  const handleConfirm = async () => {
    const { pincode, houseNo, area, state, city } = formData;

    if (!pincode || !houseNo || !area || !state || !city) {
      Alert.alert('Missing Details', 'Please fill all required fields marked with *');
      return;
    }

    setLoading(true);
    try {
      const completeData = {
        ...registrationData,
        location: {
          latitude: region.latitude,
          longitude: region.longitude,
          addressDetails: formData,
        },
      };

      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Registration Complete:', completeData);

      navigation.reset({
        index: 0,
        routes: [{
          name: 'CustomerApp',
          params: { registrationComplete: true, showWelcome: true }
        }]
      });

    } catch (error) {
      Alert.alert('Error', 'Failed to save address.');
    } finally {
      setLoading(false);
    }
  };

  const updateForm = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" translucent barStyle="dark-content" />

      {/* --- MAP VIEW (Animated Height) --- */}
      <Animated.View style={[styles.mapContainer, { height: mapHeightAnim }]}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={region}
          onRegionChangeComplete={setRegion}
          onTouchStart={() => setIsMapExpanded(true)}
        />
        
        <View style={styles.pinContainer}>
          <Ionicons name="location" size={40} color="#EA4335" />
          <View style={styles.pinShadow} />
        </View>

        <SafeAreaView style={styles.topButtons} edges={['top']}>
            <TouchableOpacity 
              style={styles.backBtn} 
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
        </SafeAreaView>
      </Animated.View>

      {/* --- DETAILED FORM SHEET --- */}
      <Animated.View 
        style={[
          styles.bottomSheet, 
          { transform: [{ translateY: sheetTranslateY }] }
        ]}
      >
        <View style={styles.dragHandle} />
        
        <KeyboardAvoidingView
           behavior={Platform.OS === 'ios' ? 'padding' : undefined}
           style={{ flex: 1 }}
           keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}
        >
          <ScrollView 
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            onScrollBeginDrag={() => setIsMapExpanded(false)} // Collapse map on scroll
          >
            <Text style={styles.sheetTitle}>Add Address Details</Text>
            <Text style={styles.sheetSubtitle}>Please provide precise location for delivery.</Text>

            {/* Address Type Tags */}
            <View style={styles.tagContainer}>
               {['Home', 'Work', 'Other'].map(type => (
                   <TouchableOpacity 
                      key={type}
                      style={[styles.typeTag, formData.type === type && styles.selectedTag]}
                      onPress={() => updateForm('type', type)}
                      activeOpacity={0.7}
                   >
                      <Ionicons 
                          name={type === 'Home' ? 'home' : type === 'Work' ? 'briefcase' : 'location'} 
                          size={16} 
                          color={formData.type === type ? '#fff' : '#666'} 
                      />
                      <Text style={[styles.tagText, formData.type === type && styles.selectedTagText]}>{type}</Text>
                   </TouchableOpacity>
               ))}
            </View>

            {/* Pincode & State Row */}
            <View style={styles.row}>
                <View style={styles.halfInput}>
                    <TextInput 
                      style={styles.input} 
                      placeholder="Pincode *" 
                      placeholderTextColor="#9CA3AF"
                      keyboardType="number-pad"
                      maxLength={6}
                      value={formData.pincode}
                      onChangeText={(t) => updateForm('pincode', t)}
                    />
                </View>
                <View style={styles.halfInput}>
                    <TouchableOpacity 
                      style={[styles.input, styles.dropdownInput]} 
                      onPress={() => setShowStateModal(true)}
                    >
                      <Text style={formData.state ? styles.inputText : styles.placeholderText}>
                        {formData.state || "State *"}
                      </Text>
                      <Ionicons name="chevron-down" size={20} color="#666" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* City */}
            <TextInput 
              style={styles.input} 
              placeholder="Town/City *" 
              placeholderTextColor="#9CA3AF"
              value={formData.city}
              onChangeText={(t) => updateForm('city', t)}
            />

            {/* Address Fields */}
            <TextInput 
              style={styles.input} 
              placeholder="House No., Flat, Building *" 
              placeholderTextColor="#9CA3AF"
              value={formData.houseNo}
              onChangeText={(t) => updateForm('houseNo', t)}
            />

            <TextInput 
              style={styles.input} 
              placeholder="Area, Colony, Street *" 
              placeholderTextColor="#9CA3AF"
              value={formData.area}
              onChangeText={(t) => updateForm('area', t)}
            />

            <TextInput 
              style={styles.input} 
              placeholder="Landmark (Optional)" 
              placeholderTextColor="#9CA3AF"
              value={formData.landmark}
              onChangeText={(t) => updateForm('landmark', t)}
            />

            {/* Spacer for keyboard */}
            <View style={{ height: 20 }} />

            {/* Confirm Button */}
            <TouchableOpacity 
              style={[styles.confirmBtn, loading && styles.confirmBtnDisabled]} 
              onPress={handleConfirm}
              disabled={loading}
              activeOpacity={0.8}
            >
              <Text style={styles.btnText}>
                {loading ? 'Saving...' : 'Save Address & Continue'}
              </Text>
            </TouchableOpacity>
            
            <View style={{ height: 60 }} />
          </ScrollView>
        </KeyboardAvoidingView>
      </Animated.View>

      {/* State Selection Modal */}
      <Modal visible={showStateModal} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select State</Text>
              <TouchableOpacity onPress={() => setShowStateModal(false)}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={STATES}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.stateItem}
                  onPress={() => {
                    updateForm('state', item);
                    setShowStateModal(false);
                  }}
                >
                  <Text style={[
                    styles.stateText, 
                    formData.state === item && styles.selectedStateText
                  ]}>
                    {item}
                  </Text>
                  {formData.state === item && (
                    <Ionicons name="checkmark" size={20} color="#12783D" />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  
  mapContainer: { 
    width: '100%',
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    overflow: 'hidden',
  },
  map: { ...StyleSheet.absoluteFillObject },
  
  pinContainer: { alignItems: 'center', marginBottom: 40 },
  pinShadow: { width: 10, height: 4, backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 5, marginTop: 2 },

  topButtons: {
      position: 'absolute',
      top: 0,
      left: 0,
      padding: 16,
  },
  backBtn: { 
    backgroundColor: '#fff', 
    padding: 10, 
    borderRadius: 20, 
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  // Bottom Sheet
  bottomSheet: { 
    flex: 1,
    backgroundColor: '#fff', 
    borderTopLeftRadius: 24, 
    borderTopRightRadius: 24, 
    marginTop: -24, // Overlap map
    elevation: 20, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: -4 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 12,
    overflow: 'hidden',
  },
  dragHandle: { 
    width: 40, 
    height: 5, 
    backgroundColor: '#E5E7EB', 
    borderRadius: 2.5, 
    alignSelf: 'center', 
    marginTop: 12,
    marginBottom: 8
  },
  
  scrollContent: {
      padding: 24,
      paddingBottom: 40, // Extra padding for bottom
  },

  sheetTitle: { 
    fontSize: 20, 
    fontWeight: '800', 
    color: '#1F2937', 
    marginBottom: 4 
  },
  sheetSubtitle: {
      fontSize: 14,
      color: '#6B7280',
      marginBottom: 24,
  },

  // Tags
  tagContainer: {
      flexDirection: 'row',
      marginBottom: 24,
      gap: 12,
  },
  typeTag: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      backgroundColor: '#F3F4F6',
      borderWidth: 1,
      borderColor: '#E5E7EB',
      gap: 6,
  },
  selectedTag: {
      backgroundColor: '#12783D',
      borderColor: '#12783D',
  },
  tagText: {
      fontSize: 14,
      fontWeight: '600',
      color: '#4B5563',
  },
  selectedTagText: {
      color: '#fff',
  },

  // Form
  row: {
      flexDirection: 'row',
      gap: 12,
      marginBottom: 0,
  },
  halfInput: {
      flex: 1,
  },
  input: { 
    backgroundColor: '#fff', 
    borderRadius: 12, 
    padding: 16, 
    marginBottom: 16, 
    fontSize: 15, 
    borderWidth: 1, 
    borderColor: '#E5E7EB',
    color: '#1F2937',
    height: 56,
  },
  dropdownInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputText: {
    color: '#1F2937',
    fontSize: 15,
  },
  placeholderText: {
    color: '#9CA3AF',
    fontSize: 15,
  },

  confirmBtn: { 
    backgroundColor: '#12783D', 
    paddingVertical: 16, 
    borderRadius: 12, 
    alignItems: 'center', 
    shadowColor: '#12783D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  confirmBtnDisabled: {
    backgroundColor: '#9CA3AF',
    elevation: 0,
  },
  btnText: { 
    color: '#fff', 
    fontWeight: '700', 
    fontSize: 16 
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: '70%',
    padding: 24,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  stateItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  stateText: {
    fontSize: 16,
    color: '#374151',
  },
  selectedStateText: {
    color: '#12783D',
    fontWeight: '600',
  },
});
