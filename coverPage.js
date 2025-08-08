import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const CoverPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image 
        source={require('./assets/cover.png')} 
        style={styles.image}
      />
      <View style={styles.bottomContent}>
        <Text style={styles.title}>Uganda's Built Heritage</Text>
        <Text style={styles.title1}>Discover all Uganda's Heritage at the tip of your figure tips</Text>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('Main')}
        >
          <Text style={styles.buttonText}>Click to Explore</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '70%', 
  },
  bottomContent: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    color: 'black', 
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  title1: {
    fontSize: 20,
    color: 'black', 
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#671b0b',
    padding: 10,
    borderRadius: 25,
    width: '50%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  }
});

export default CoverPage;