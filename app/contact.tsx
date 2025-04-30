import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Swipeable, ScrollView } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';

export default function ContactScreen() {
  const router = useRouter();
  const contacts = [
    {
      name: 'Ana da Silva',
      phone: '(10) 7892-0938',
      image: '',
      role: 'Mãe',
      onPress: (item: any) => console.log('pressed', item)
    },
    {
      name: 'Joaquina',
      phone: '(10) 7892-0938',
      image: '',
      role: 'Esposa',
      onPress: (item: any) => console.log('pressed', item)
    },
    {
      name: 'Marina',
      phone: '(10) 7892-0938',
      image: '',
      role: 'Enfermeira',
      onPress: (item: any) => console.log('pressed', item)
    }
  ];

  function renderLeftActions () {
    return (
      <View style={styles.ContactLeftAction}>
        <View style={styles.ContactLeftActionBackground}></View>
        <Ionicons name="create-outline" size={26} color="#fff" />
      </View>
    )
  }

  function renderRightActions () {
    return (
      <View style={styles.ContactRightAction}>
        <View style={styles.ContactRightActionBackground}></View> 
        <Ionicons name="trash-outline" size={26} color="#fff" />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.header}>
        <Ionicons name="chevron-back-circle-outline" size={28} color="#fff" />

        <Text style={styles.headerText}>Contatos e notificações</Text>
      </TouchableOpacity>

      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Image source={require('../assets/images/person.png')} style={styles.avatarImage} />
        </View>

        <Text style={styles.avatarText}>João da Silva</Text>
      </View>

      <ScrollView style={styles.ContactGrid}>
        <FlatList
          data={contacts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <Swipeable
                renderRightActions={renderRightActions}
                renderLeftActions={renderLeftActions}
                overshootLeft={false}
                overshootRight={false}
              >
                <TouchableOpacity
                  onPress={() => console.log(item)}
                  style={[styles.ContactItem, { marginBottom: index === contacts.length - 1 ? 0 : 20 }]}
                >
                  <View style={styles.ContactItemAvatar}>
                    <Image source={require('../assets/images/person.png')} style={styles.ContactItemAvatarImage} />
                  </View>

                  <View style={styles.ContactItemInfo}>
                    <Text style={styles.ProfileMenuItemText}>
                      { item.name }
                    </Text>
                    <Text style={styles.ProfileMenuItemText}>
                      { item.phone }
                    </Text>
                    <Text style={styles.ProfileMenuItemText}>
                      { item.role }
                    </Text>
                  </View>

                  <Ionicons name="notifications-outline" size={26} color="#000" style={{ transform: 'rotate(-15deg)'}} />
                </TouchableOpacity>
              </Swipeable>
            );
          }}
        />

        <TouchableOpacity onPress={() => router.push('/novo-contato')} style={styles.footer}>
          <Ionicons name="add-circle" size={34} color="#7121D9" />
          <Text style={styles.footerText}>Adicionar novo contato</Text>
        </TouchableOpacity>
      </ScrollView>

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
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    marginTop: 20,
  },
  footerText: {
    color: '#000',
    fontSize: 18,
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 20,
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
  ContactGrid: {
    marginBottom: 20,
    gap: 60,
    width: '100%',
    padding: 40,
    maxHeight: '80%'
  },
  ContactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    gap: 20,
    width: 310,
    height: 97,
    borderRadius: 50,
    padding: 10
  },
  ContactItemAvatar: {
    borderRadius: 50,
    width: 80,
    height: 80,
    backgroundColor: '#6891E4',
    justifyContent: 'center',
    alignItems: 'center'
  },
  ContactItemAvatarImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: '#6891E4'
  },
  ContactItemInfo: {
    flexDirection: 'column',
  },
  ContactLeftAction: {
    backgroundColor: '#7121D9',
    width: 55,
    height: 97,
    justifyContent: 'center',
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    position: 'relative',
    paddingLeft: 20,
  },
  ContactLeftActionBackground: {
    backgroundColor: '#7121D9',
    width: 55,
    height: 97,    
    position: 'absolute',
    left: 55,
  },
  ContactRightAction: {
    backgroundColor: '#FD9696',
    width: 55,
    height: 97,
    justifyContent: 'center',
    alignItems: 'flex-end',
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    position: 'relative',
    paddingRight: 20,
  },
  ContactRightActionBackground: {
    backgroundColor: '#FD9696',
    width: 55,
    height: 97,
    position: 'absolute',
    right: 55,
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
