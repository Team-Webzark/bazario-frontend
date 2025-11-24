import React, { useRef, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';

const slides = [
  {
    key: 1,
    title: "Shop Locally, Live Better",
    desc: "Fresh produce & staples delivered to your doorstep in 30–60 mins",
    // img: require('../assets/onboard1.png'),
  },
  {
    key: 2,
    title: "Smart Recommendations",
    desc: "Never run out of essentials. Get AI-powered refill suggestions.",
    // img: require('../assets/onboard2.png'),
  },
  {
    key: 3,
    title: "Easy, Fast, Trustworthy",
    desc: "Track live, know exactly where your order is",
    // img: require('../assets/onboard3.png'),
  },
];

const { width } = Dimensions.get('window');

export default function OnboardingScreen({ navigation }) {
  const [index, setIndex] = useState(0);
  const flatRef = useRef(null);

  const goNext = () => {
    if (index < slides.length - 1) {
      flatRef.current.scrollToIndex({ index: index + 1 });
    } else {
      navigation.replace('Login');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatRef}
        data={slides}
        keyExtractor={item => item.key.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={ev => {
          const newIndex = Math.round(ev.nativeEvent.contentOffset.x / width);
          setIndex(newIndex);
        }}
        renderItem={({ item }) => (
          <View style={[styles.slide, { width }]}>
            <Image source={item.img} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.desc}>{item.desc}</Text>
          </View>
        )}
      />
      <View style={styles.dots}>
        {slides.map((_, i) => (
          <View key={i} style={[styles.dot, i === index && styles.activeDot]} />
        ))}
      </View>
      <TouchableOpacity style={styles.button} onPress={goNext}>
        <Text style={styles.buttonText}>
          {index === slides.length - 1 ? 'Get Started' : 'Next'}
        </Text>
      </TouchableOpacity>
      {index < slides.length - 1 && (
        <TouchableOpacity style={styles.skip} onPress={() => navigation.replace('Login')}>
          <Text style={{ color: '#aaa' }}>Skip</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  slide: { alignItems: 'center', justifyContent: 'center', padding: 30 },
  image: { width: 280, height: 220, marginBottom: 30, resizeMode: 'contain' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#18181b', marginBottom: 12 },
  desc: { fontSize: 15, color: '#27272a', textAlign: 'center', marginHorizontal: 16 },
  dots: { flexDirection: 'row', alignSelf: 'center', marginBottom: 15 },
  dot: { width: 8, height: 8, borderRadius: 8, backgroundColor: '#d4d4d8', margin: 4 },
  activeDot: { backgroundColor: '#22c55e', width: 16 },
  button: { backgroundColor: '#22c55e', marginHorizontal: 50, borderRadius: 8, padding: 14, alignItems: 'center' },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  skip: { position: 'absolute', top: 44, right: 18 },
});
