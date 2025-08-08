// AboutPage.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

const AboutPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About Built Heritage app</Text>
      <Text style={styles.description}>
      This app has been created to bring Uganda's history to life as you walk down the street.
      </Text>
      <Text style={styles.description}>
      "It has been designed by the Cross-Cultural Foundation of Uganda, with the support of the European Union, as part of the European Year of Cultural Heritage 2018. Find out more about our other publications here."
      "ATTENTION! Access and photography restrictions may apply to some sites: ensure permission beforehand."
      "This app was created and maintained with the financial support of the European Union. Its contents are the sole responsibility of CCFU (Cross Cultural Foundation of Uganda) and do not necessarily reflect the views of the European Union."
      </Text>

      
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
    lineHeight: 24,
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingVertical: 8,
  },
  navButton: {
    alignItems: 'center',
  },
  navButtonText: {
    fontSize: 12,
    color: '#6200ee',
  },
});

export default AboutPage;