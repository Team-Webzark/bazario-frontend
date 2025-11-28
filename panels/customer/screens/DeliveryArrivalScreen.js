import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  Linking
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function DeliveryArrivalScreen({ navigation }) {
  
  const handleCall = () => {
    Linking.openURL('tel:+919876543210');
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      {/* Close Button (Top Right) */}
      <TouchableOpacity 
        style={styles.closeButton} 
        onPress={() => navigation.navigate('HomeTab')}
      >
        <Ionicons name="close" size={24} color="#333" />
      </TouchableOpacity>

      <View style={styles.content}>
        {/* Animation/Image */}
        <View style={styles.iconContainer}>
           <Ionicons name="gift" size={60} color="#12783D" />
           {/* Simple decorative dots mimicking confetti */}
           <View style={[styles.dot, { top: 10, left: 10, backgroundColor: 'red' }]} />
           <View style={[styles.dot, { top: 20, right: 20, backgroundColor: 'blue' }]} />
           <View style={[styles.dot, { bottom: 10, left: 30, backgroundColor: 'orange' }]} />
        </View>

        <Text style={styles.title}>Your Order has Arrived!</Text>
        <Text style={styles.subtitle}>Enjoy your fresh groceries.</Text>

        {/* Partner Card */}
        <View style={styles.partnerCard}>
           <Image 
             source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} 
             style={styles.partnerImg} 
           />
           <View style={styles.partnerInfo}>
              <Text style={styles.partnerName}>Ramesh Kumar</Text>
              <Text style={styles.partnerRole}>Delivery Partner</Text>
           </View>
           <TouchableOpacity style={styles.callBtn} onPress={handleCall}>
              <Ionicons name="call" size={20} color="#fff" />
           </TouchableOpacity>
        </View>

        {/* Instructions */}
        <View style={styles.noteBox}>
           <Ionicons name="information-circle" size={20} color="#555" />
           <Text style={styles.noteText}>
              Please share the OTP <Text style={{ fontWeight: 'bold' }}>4590</Text> with the partner to collect your order.
           </Text>
        </View>

      </View>

      {/* Footer */}
      <View style={styles.footer}>
         <TouchableOpacity 
           style={styles.rateBtn}
           onPress={() => navigation.replace('OrderRating')}
         >
            <Text style={styles.btnText}>Collect & Rate Order</Text>
         </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', justifyContent: 'space-between' },
  closeButton: { alignSelf: 'flex-end', padding: 20 },
  
  content: { alignItems: 'center', paddingHorizontal: 24, flex: 1, justifyContent: 'center' },
  
  iconContainer: { width: 100, height: 100, backgroundColor: '#E8F5E9', borderRadius: 50, justifyContent: 'center', alignItems: 'center', marginBottom: 24, position: 'relative' },
  dot: { position: 'absolute', width: 8, height: 8, borderRadius: 4 },
  
  title: { fontSize: 24, fontWeight: 'bold', color: '#333', textAlign: 'center', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 40 },

  partnerCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FAFAFA', padding: 16, borderRadius: 12, width: '100%', marginBottom: 20, borderWidth: 1, borderColor: '#eee' },
  partnerImg: { width: 50, height: 50, borderRadius: 25, marginRight: 12 },
  partnerInfo: { flex: 1 },
  partnerName: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  partnerRole: { fontSize: 12, color: '#888' },
  callBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#12783D', justifyContent: 'center', alignItems: 'center' },

  noteBox: { flexDirection: 'row', backgroundColor: '#FFF3CD', padding: 16, borderRadius: 8, alignItems: 'center' },
  noteText: { marginLeft: 12, color: '#664D03', fontSize: 14, flex: 1 },

  footer: { padding: 20 },
  rateBtn: { backgroundColor: '#12783D', paddingVertical: 16, borderRadius: 12, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});



