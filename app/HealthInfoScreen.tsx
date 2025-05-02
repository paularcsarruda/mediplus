import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Footer from '@/components/Footer';
import { useRouter } from 'expo-router';

const HealthInfoScreen = () => {
  const router = useRouter(); // Corrigido para usar o hook corretamente
  
  const cardsData = [
    {
      title: 'Uso correto de medicamentos',
      description:
        'Aprenda como usar seus medicamentos de forma eficaz e segura. Não se automedique.',
      image: require('../assets/images/medicine1.png'),
      onPress: () => console.log('Card 1 clicked'),
    },
    {
      title: 'Efeitos colaterais comuns',
      description:
        'Saiba quais são os efeitos colaterais mais comuns ao tomar certos medicamentos.',
      image: require('../assets/images/medicine2.png'),
      onPress: () => console.log('Card 2 clicked'),
    },
    {
      title: 'Como armazenar medicamentos',
      description:
        'Dicas sobre como armazenar seus medicamentos de maneira segura e eficiente.',
      image: require('../assets/images/medicine3.png'),
      onPress: () => console.log('Card 3 clicked'),
    },
    {
      title: 'Medicamentos e gravidez',
      description:
        'Atenção ao tomar medicamentos durante a gravidez. Consulte sempre seu médico.',
      image: require('../assets/images/medicine4.png'),
      onPress: () => console.log('Card 4 clicked'),
    },
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={() => router.push('/HomeScreen')}>
        <Ionicons name="chevron-back-circle-outline" size={28} color="#fff" />
        <Text style={styles.headerText}>Informações de Saúde</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.cardsContainer}>
        {cardsData.map((card, index) => (
          <TouchableOpacity key={index} style={styles.card} onPress={card.onPress}>
            <Image source={card.image} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{card.title}</Text>
              <Text style={styles.cardDescription}>{card.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8793FF',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginLeft: 10,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'normal',
    color: '#fff',
    marginLeft: 10,
  },
  cardsContainer: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
  },
});

export default HealthInfoScreen;
