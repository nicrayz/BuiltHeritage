// DetailsPage.js
import React from 'react';
import { View, Text, StyleSheet, Button, Dimensions, Image, ScrollView, TouchableOpacity } from 'react-native';
import * as Sharing from 'expo-sharing';
import * as Linking from 'expo-linking';
import MapView, { Marker } from 'react-native-maps';

const DetailsPage = ({ route, navigation }) => {
  const { site } = route.params;

  // Share heritage site
  const shareSite = async () => {
    const message = `Check out ${site.name} in ${site.city}: ${site.description}`;
    await Sharing.shareAsync(message);
  };

  // Open location in maps
  const openInMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${site.location.latitude},${site.location.longitude}`;
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
       {/* Image Carousel */}
       <ScrollView horizontal style={styles.imageContainer}>
        {site.images.map((image, index) => (
          <Image key={index} source={image} style={styles.image} />
        ))}
        </ScrollView>  
      <Text style={styles.title}>{site.name}</Text>
      <Text style={styles.description}>{site.description}</Text>
      <Text style={styles.location}>
        Location: {site.location.latitude}, {site.location.longitude}
      </Text>

      {/* Share Button */}
      <Button title="Share" onPress={shareSite} />

      {/* Map View */}
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: site.location.latitude,
            longitude: site.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: site.location.latitude,
              longitude: site.location.longitude,
            }}
            title={site.name}
            description={site.city}
          />
        </MapView>
      </View>

      <Button title="Add to Favorites" onPress={() => { /* Implement favorites */ }} />
      <Button title="View on Map" onPress={openInMaps} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
  location: {
    fontSize: 14,
    marginBottom: 16,
  },
  imageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  image: {
    width: 300,
    height: 180,
    marginRight: 8,
    borderRadius: 8,
  },
  mapContainer: {
    width: Dimensions.get('window').width - 32,
    height: 150,
    marginBottom: 16,
  },
  map: {
    flex: 1,
  },
});

export default DetailsPage;