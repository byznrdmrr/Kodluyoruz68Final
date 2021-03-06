import React from 'react';
import {SafeAreaView, View, StyleSheet, Image, Text} from 'react-native';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import Snackbar from 'react-native-snackbar';
import auth from '@react-native-firebase/auth';

const CustomSidebarMenu = (props) => {
  const BASE_PATH =
    'https://raw.githubusercontent.com/AboutReact/sampleresource/master/';
  const proileImage = 'react_logo.png';

  const userDisplayName =
    auth().currentUser && auth().currentUser.displayName !== null
      ? auth().currentUser.displayName
      : '';

  const userEmail =
    auth().currentUser && auth().currentUser.email !== null
      ? auth().currentUser.email
      : '';

  const handleSignOut = () => {
    if (auth().currentUser) {
      auth().signOut();
      Snackbar.show({
        text: 'Çıkış yapıldı!',
        duration: 1600,
        backgroundColor: 'tomato',
        textColor: 'white',
      });
      setTimeout(() => {
        props.navigation.navigate('Signin');
      }, 600);
    } else {
      props.navigation.navigate('Signin');
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {auth().currentUser ? (
        <View style={styles.sideMenuHeader}>
          <Image
            source={{uri: BASE_PATH + proileImage}}
            style={[
              styles.sideMenuProfileIcon,
              styles.sideMenuProfileIconLoggedIn,
            ]}
          />
          <View>
            <Text>{userDisplayName}</Text>
            <Text>{userEmail}</Text>
          </View>
        </View>
      ) : (
        <View style={styles.sideMenuHeader}>
          <Image
            source={require(`../assets/images/user.png`)}
            style={[
              styles.sideMenuProfileIcon,
              styles.sideMenuProfileIconNotLoggedIn,
            ]}
          />
          <View>
            <DrawerItem
              label="Giriş yap"
              onPress={() => props.navigation.navigate('Signin')}
            />
          </View>
        </View>
      )}
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Visit Us"
          // onPress={() => } You Can handle click this item
        />
        <View style={styles.customItem}>
          <Text
          // onPress={() => } You Can handle click this item
          >
            Rate Us
          </Text>
          <Image
            source={{uri: BASE_PATH + 'star_filled.png'}}
            style={styles.iconStyle}
          />
        </View>
      </DrawerContentScrollView>
      <DrawerItem
        label="Çıkış yap"
        onPress={() => handleSignOut()} //You Can handle click this item
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sideMenuHeader: {
    borderBottomWidth: 1,
    borderBottomColor: '#888',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  sideMenuProfileIcon: {
    width: 64,
    height: 64,
    borderRadius: 100 / 2,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,.4)',
    backgroundColor: '#eee',
  },
  sideMenuProfileIconLoggedIn: {
    marginBottom: 12,
  },
  sideMenuProfileIconNotLoggedIn: {
    padding: 20,
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  customItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CustomSidebarMenu;
