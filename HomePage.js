import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Animated,
  ActivityIndicator,
  Dimensions,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { heritageSites as heritageSitesData } from './data'; // Ensure this import is correct

const cities = ['All', 'Kampala', 'Entebbe', 'Fort Portal', 'Jinja'];
const PAGE_SIZE = 10;
const { width } = Dimensions.get('window');

const HomePage = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [filteredSites, setFilteredSites] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const fadeAnim = useState(new Animated.Value(0))[0];

  // Ensure heritageSites is defined
  const heritageSites = heritageSitesData || [];

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem('favorites');
        const cachedSites = await AsyncStorage.getItem('cachedSites');

        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }

        if (cachedSites) {
          setFilteredSites(JSON.parse(cachedSites));
        } else {
          filterSites('', 'All');
        }
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    loadData();
  }, []);

  const filterSites = (searchText, city, pageNumber = 1) => {
    let filtered = heritageSites.filter((site) => {
      const matchesSearch =
        site.name?.toLowerCase().includes(searchText.toLowerCase()) ||
        site.city?.toLowerCase().includes(searchText.toLowerCase());

      const matchesCity = city === 'All' || site.city === city;
      return matchesSearch && matchesCity;
    });

    const paginatedSites = filtered.slice(0, PAGE_SIZE * pageNumber);
    setFilteredSites(paginatedSites);
    setPage(pageNumber);

    AsyncStorage.setItem('cachedSites', JSON.stringify(paginatedSites)).catch((error) =>
      console.error('Error caching sites:', error)
    );
  };

  const handleSearch = (text) => {
    setSearch(text);
    filterSites(text, selectedCity);
  };

  const handleCityFilter = (city) => {
    setSelectedCity(city);
    filterSites(search, city);
  };

  const loadMoreSites = () => {
    if (!loading && filteredSites.length < heritageSites.length) {
      setLoading(true);
      setTimeout(() => {
        filterSites(search, selectedCity, page + 1);
        setLoading(false);
      }, 1000);
    }
  };

  const toggleFavorite = async (site) => {
    let updatedFavorites;
    if (favorites.some((fav) => fav.id === site.id)) {
      updatedFavorites = favorites.filter((fav) => fav.id !== site.id);
    } else {
      updatedFavorites = [...favorites, site];
    }
    setFavorites(updatedFavorites);
    await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [filteredSites]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search heritage sites..."
        value={search}
        onChangeText={handleSearch}
      />

      <Text style={styles.filterTitle}>Choose a city to explore</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cityFilterContainer}>
        {cities.map((city, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.cityButton, selectedCity === city && styles.selectedCityButton]}
            onPress={() => handleCityFilter(city)}
          >
            <Text style={[styles.cityButtonText, selectedCity === city && styles.selectedCityButtonText]}>
              {city}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {filteredSites.length === 0 ? (
        <Text style={styles.noDataText}>No heritage sites found.</Text>
      ) : (
        <FlatList
          data={filteredSites}
          keyExtractor={(item) => item.id?.toString()}
          numColumns={2}
          onEndReached={loadMoreSites}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loading ? <ActivityIndicator size="large" color="#6200ee" /> : null}
          renderItem={({ item }) => (
            <Animated.View style={{ opacity: fadeAnim }}>
              <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('Details', { site: item })}
              >
                <Image source={item.images?.[0]} style={styles.cardImage} />
                <TouchableOpacity style={styles.favoriteIcon} onPress={() => toggleFavorite(item)}>
                  <Ionicons
                    name={favorites.some((fav) => fav.id === item.id) ? 'heart' : 'heart-outline'}
                    size={24}
                    color={favorites.some((fav) => fav.id === item.id) ? 'red' : '#fff'}
                  />
                </TouchableOpacity>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text style={styles.cardSubtitle}>{item.city}</Text>
              </TouchableOpacity>
            </Animated.View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 8,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 9,
  },
  cityFilterContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingVertical: 16,
  },
  cityButton: {
    height: 30,
    paddingHorizontal: 16,
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
    marginRight: 8,
  },
  selectedCityButton: {
    backgroundColor: '#ff5733',
  },
  cityButtonText: {
    color: '#000',
  },
  selectedCityButtonText: {
    color: '#fff',
  },
  noDataText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
    color: '#777',
  },
  card: {
    width: (width - 40) / 2,
    height: 200,
    margin: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  favoriteIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 12,
    padding: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 8,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
});

export default HomePage;
