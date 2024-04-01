import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Modal, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Input, Button } from 'react-native-elements';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native'; 
import { Calendar } from 'react-native-calendars';
import { closeSession, getCurrentUser } from '../utils/actions'

const EarthquakeMapScreen = () => {
  const [startDate, setStartDate] = useState('2020-01-01');
  const [endDate, setEndDate] = useState('2020-01-02');
  const [earthquakes, setEarthquakes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showListModal, setShowListModal] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  
  const navigation = useNavigation();

  useEffect(() => {
    fetchEarthquakes();
  }, [page]);

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
  };

  const isValidDate = (dateString) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(dateString);
  };

  const fetchEarthquakes = async () => {
    if (!isValidDate(startDate) || !isValidDate(endDate)) {
      Alert.alert('Invalid Date', 'Please enter valid dates.');
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch(`https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${startDate}&endtime=${endDate}`);
      const data = await response.json();
      const totalEarthquakes = data.features;
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const currentPageEarthquakes = totalEarthquakes.slice(startIndex, endIndex);
      setEarthquakes(currentPageEarthquakes);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching earthquakes:', error);
      setError(error.message); 
      setLoading(false);
    }
  };

  const handleFilterPress = () => {
    setShowListModal(true);
    fetchEarthquakes();
  };

  const handleDetailsPress = (earthquake) => {
    navigation.navigate('Results', { earthquake });
  };

  const renderEarthquakeItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleDetailsPress(item)}> 
      <View style={styles.earthquakeItem}>
        <Text style={styles.title}>{item.properties.title}</Text>
        <Text>Magnitude: {item.properties.mag}</Text>
        <Text>Depth: {item.geometry.coordinates[2]}</Text>
        <Text>Location: {item.properties.place}</Text>
        <Text style={styles.detailButton}>View Details</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button
            title="Cerrar Sesión"
            buttonStyle={styles.button}
            onPress={() => {
                closeSession()
                navigation.navigate("login")
            }}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Start Date</Text>
        <TouchableOpacity onPress={() => setShowStartDatePicker(true)}>
          <Text style={styles.dateText}>{formatDate(startDate)}</Text>
        </TouchableOpacity>
        <Text style={styles.label}>End Date</Text>
        <TouchableOpacity onPress={() => setShowEndDatePicker(true)}>
          <Text style={styles.dateText}>{formatDate(endDate)}</Text>
        </TouchableOpacity>
        <Button title="Search" onPress={handleFilterPress} buttonStyle={styles.button} />
      </View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 0,
          longitude: 0,
          latitudeDelta: 30,
          longitudeDelta: 30,
        }}
      >
        {earthquakes.map((earthquake, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: earthquake.geometry.coordinates[1],
              longitude: earthquake.geometry.coordinates[0],
            }}
            title={earthquake.properties.title}
            description={`Magnitude: ${earthquake.properties.mag}`}
            pinColor="red"
          />
        ))}
      </MapView>
      <Modal visible={showListModal} animationType="slide">
        <View style={styles.listContainer}>
          <FlatList
            data={earthquakes}
            renderItem={renderEarthquakeItem}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={() => (
              <View style={styles.paginationContainer}>
                <Button title="Previous Page" onPress={() => setPage(page - 1)} disabled={page === 1} />
                <Button title="Next Page" onPress={() => setPage(page + 1)} />
              </View>
            )}
            ListFooterComponent={() => (
              <View style={styles.paginationContainer}>
                <Button title="Previous Page" onPress={() => setPage(page - 1)} disabled={page === 1} />
                <Button title="Next Page" onPress={() => setPage(page + 1)} />
              </View>
            )}
          />
          <Button title="Close" onPress={() => setShowListModal(false)} buttonStyle={styles.closeButton} />
        </View>
      </Modal>
      {showStartDatePicker && (
        <Calendar
          onDayPress={(day) => {
            setStartDate(day.dateString);
            setShowStartDatePicker(false);
          }}
        />
      )}
      {showEndDatePicker && (
        <Calendar
          onDayPress={(day) => {
            setEndDate(day.dateString);
            setShowEndDatePicker(false);
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    padding: 10,
  },
  inputContainer: {
    padding: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  dateText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#007bff',
    textDecorationLine: 'underline',
  },
  map: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  earthquakeItem: {
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  detailButton: {
    color: '#007bff',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
});

export default EarthquakeMapScreen;
