import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ProfileScreen() {
  const router = useRouter();
  const menuOptions = [
    {
      icon: 'notifications-outline',
      text: 'contatos e notificações',
      onPress: () => router.push('/contact')
    },
    {
      icon: 'person-outline',
      text: 'editar perfil',
      onPress: () => router.push('/editar-perfil')
    },
    {
      icon: 'print-outline',
      text: 'imprimir relatório',
      onPress: () => router.push('/login')
    },
    {
      icon: 'log-out-outline',
      text: 'logout',
      onPress: () => router.push('/login')
    }
  ]

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.header}>
        <Ionicons name="chevron-back-circle-outline" size={28} color="#fff" />

        <Text style={styles.headerText}>Meu perfil</Text>
      </TouchableOpacity>

      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Image source={require('../assets/images/person.png')} style={styles.avatarImage} />
        </View>

        <Text style={styles.avatarText}>João da Silva</Text>
      </View>

      <View style={styles.ProfileMenu}>
        <FlatList
          data={menuOptions}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                onPress={() => item.onPress()}
                style={[styles.ProfileMenuItem, { marginBottom: index ===  menuOptions.length - 1 ? 0 : 30 }]}
              >
                <Ionicons name={ item.icon } size={26} color="#000" />

                <Text style={styles.ProfileMenuItemText}>
                  { item.text }
                </Text>
              </TouchableOpacity>
            );
          }}
        />
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
          <Ionicons name="book-outline" size={26} color="#fff" onPress={() => router.push('/home')}/>
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="person-outline" size={26} color="#a89eff"/>
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
  avatarContainer: {
    alignItems: 'center',
    marginTop: 70,
    gap: 20
  },
  avatar: {
    borderRadius: 120,
    width: 120,
    height: 120,
    backgroundColor: '#6891E4',
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatarImage: {
    width: 110,
    height: 110
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 500
  },
  ProfileMenu: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 60,
    gap: 60,
    backgroundColor: '#ffffff33',
    // height: 100,
    width: '100%',
    borderRadius: 50,
    padding: 40,
  },
  ProfileMenuItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 20,
  },
  ProfileMenuItemText: {
    color: '#000',
    fontSize: 18
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
