import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function TipsScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.push('/home')} style={styles.header}>
        <Ionicons name="chevron-back-circle-outline" size={28} color="#fff" />

        <Text style={styles.headerText}>Dicas e sintomas</Text>
      </TouchableOpacity>

      <View style={styles.TipsGrid}>
        <ImageBackground source={require("../assets/images/dicasecuidados.jpg")} style={styles.TipsCardImage} imageStyle={styles.TipsCardImage}>
          <View style={styles.TipsCard}>
            <Text style={styles.TipsCardText}>Dicas e Cuidados</Text>
          </View>
        </ImageBackground>

        <ImageBackground source={require("../assets/images/saude.jpg")} style={styles.TipsCardImage} imageStyle={styles.TipsCardImage}>
          <View style={styles.TipsCard}>
            <Text style={styles.TipsCardText}>Minha saúde</Text>
          </View>
        </ImageBackground>

        <ImageBackground source={require("../assets/images/bulas.jpg")} style={styles.TipsCardImage} imageStyle={styles.TipsCardImage}>
          <View style={styles.TipsCard}>
            <Text style={styles.TipsCardText}>Bulas</Text>
          </View>
        </ImageBackground>
      </View>

      <View style={styles.navbar}>
        <TouchableOpacity>
          <Ionicons name="home-outline" size={26} color="#fff" onPress={() => router.push('/home')}/>
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="pulse-outline" size={26} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="add" size={30} color="#fff" onPress={() => router.push('/create-medicine')}/>
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="book-outline" size={26} color="#a89eff" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="person-outline" size={26} color="#fff" onPress={() => router.push('/profile')}/>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8793FF',
    paddingTop: 70,
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginLeft: 20,
    gap: 20
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 300
  },
  TipsGrid: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 60,
    gap: 30
  },
  TipsCard: {
    width: 350, 
    height: 150, 
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },
  TipsCardImage: {
    width: 350, 
    height: 150,
    borderRadius: 50,
  },
  TipsCardText: {
    fontSize: 22,
    fontWeight: 700
  },
  navbar: {
    backgroundColor: '#3a3a4d',
    padding: 12,
    borderRadius: 40,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    height: 70,
  },
});
