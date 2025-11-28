import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  StatusBar,
  ScrollView
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment'; // You might need 'npm install moment'

export default function TimeSlotSelectionScreen({ navigation }) {
  const [selectedDate, setSelectedDate] = useState(0); // Index of selected date
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [dates, setDates] = useState([]);

  // Generate next 7 days
  useEffect(() => {
    const nextDays = [];
    for (let i = 0; i < 7; i++) {
      const date = moment().add(i, 'days');
      nextDays.push({
        day: date.format('ddd'), // Mon
        date: date.format('D'), // 24
        fullDate: date.format('YYYY-MM-DD'),
        isToday: i === 0
      });
    }
    setDates(nextDays);
  }, []);

  const timeSlots = [
    { id: '1', time: '06:00 AM - 08:00 AM', type: 'Morning' },
    { id: '2', time: '08:00 AM - 10:00 AM', type: 'Morning' },
    { id: '3', time: '10:00 AM - 12:00 PM', type: 'Morning' },
    { id: '4', time: '12:00 PM - 02:00 PM', type: 'Afternoon' },
    { id: '5', time: '02:00 PM - 04:00 PM', type: 'Afternoon' },
    { id: '6', time: '04:00 PM - 06:00 PM', type: 'Evening' },
    { id: '7', time: '06:00 PM - 08:00 PM', type: 'Evening' },
  ];

  const renderDateItem = ({ item, index }) => (
    <TouchableOpacity 
      style={[styles.dateCard, selectedDate === index && styles.selectedDateCard]}
      onPress={() => {
         setSelectedDate(index);
         setSelectedSlot(null); // Reset slot on date change
      }}
    >
      <Text style={[styles.dayText, selectedDate === index && styles.selectedText]}>{item.day}</Text>
      <Text style={[styles.dateText, selectedDate === index && styles.selectedText]}>{item.date}</Text>
      {item.isToday && <Text style={[styles.todayLabel, selectedDate === index && styles.selectedText]}>Today</Text>}
    </TouchableOpacity>
  );

  const renderSlotItem = (slot) => (
    <TouchableOpacity 
      key={slot.id}
      style={[styles.slotCard, selectedSlot === slot.id && styles.selectedSlotCard]}
      onPress={() => setSelectedSlot(slot.id)}
    >
       <Text style={[styles.slotTime, selectedSlot === slot.id && styles.selectedSlotText]}>{slot.time}</Text>
       {selectedSlot === slot.id && <Ionicons name="checkmark-circle" size={18} color="#12783D" style={styles.checkIcon} />}
    </TouchableOpacity>
  );

  const handleProceed = () => {
    if (!selectedSlot) return alert('Please select a time slot');
    navigation.navigate('Payment');
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Select Delivery Slot</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        {/* Horizontal Date Picker */}
        <Text style={styles.sectionTitle}>Day</Text>
        <View>
           <FlatList
             horizontal
             data={dates}
             renderItem={renderDateItem}
             keyExtractor={item => item.fullDate}
             showsHorizontalScrollIndicator={false}
             contentContainerStyle={styles.dateList}
           />
        </View>

        {/* Time Slots Grid */}
        <Text style={styles.sectionTitle}>Time</Text>
        <View style={styles.grid}>
           {timeSlots.map(slot => renderSlotItem(slot))}
        </View>

        {/* Info Note */}
        <View style={styles.noteBox}>
           <Ionicons name="information-circle-outline" size={20} color="#666" />
           <Text style={styles.noteText}>Delivery charges may vary based on the slot selected.</Text>
        </View>

      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
         <TouchableOpacity 
           style={[styles.proceedBtn, !selectedSlot && styles.disabledBtn]}
           onPress={handleProceed}
           disabled={!selectedSlot}
         >
            <Text style={styles.btnText}>Proceed to Pay</Text>
         </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#fff', elevation: 2 },
  title: { fontSize: 18, fontWeight: 'bold', marginLeft: 16, color: '#333' },

  content: { paddingBottom: 20 },
  
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', margin: 16, marginBottom: 8 },

  // Date Picker
  dateList: { paddingHorizontal: 16, paddingBottom: 8 },
  dateCard: { backgroundColor: '#fff', width: 70, height: 90, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 12, elevation: 1, borderWidth: 1, borderColor: 'transparent' },
  selectedDateCard: { backgroundColor: '#12783D', elevation: 4 },
  dayText: { fontSize: 14, color: '#888', marginBottom: 4 },
  dateText: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  todayLabel: { fontSize: 10, color: '#12783D', marginTop: 4, fontWeight: 'bold' },
  selectedText: { color: '#fff' },

  // Time Slots
  grid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16 },
  slotCard: { width: '48%', backgroundColor: '#fff', padding: 16, borderRadius: 8, marginBottom: 12, marginRight: '2%', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#eee' },
  selectedSlotCard: { borderColor: '#12783D', backgroundColor: '#F0FDF4' },
  slotTime: { fontSize: 12, fontWeight: '600', color: '#333' },
  selectedSlotText: { color: '#12783D', fontWeight: 'bold' },
  checkIcon: { position: 'absolute', top: 8, right: 8 },

  noteBox: { flexDirection: 'row', margin: 16, backgroundColor: '#E3F2FD', padding: 12, borderRadius: 8, alignItems: 'center' },
  noteText: { marginLeft: 8, color: '#0D47A1', fontSize: 12, flex: 1 },

  footer: { padding: 16, backgroundColor: '#fff', elevation: 10 },
  proceedBtn: { backgroundColor: '#12783D', paddingVertical: 16, borderRadius: 12, alignItems: 'center' },
  disabledBtn: { backgroundColor: '#ccc' },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});



