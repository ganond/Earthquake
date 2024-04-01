import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button } from 'react-native';

const ResultsScreen = ({ route }) => {
  const { startDate, endDate } = route.params;
  const [earthquakes, setEarthquakes] = useState([]);
  const [page, setPage] = useState(1);
  const pageSize = 10; // Tamaño de la página

  useEffect(() => {
    fetchEarthquakes();
  }, [page]);

  const fetchEarthquakes = async () => {
    try {
      // Simulamos una lista de terremotos (debes reemplazarlo con tu lógica de solicitud real)
      const totalEarthquakes = generateDummyEarthquakes();
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const currentPageEarthquakes = totalEarthquakes.slice(startIndex, endIndex);
      setEarthquakes(currentPageEarthquakes);
    } catch (error) {
      console.error('Error fetching earthquakes:', error);
    }
  };

  const generateDummyEarthquakes = () => {
    // Generar una lista de terremotos de ejemplo (simulación de la respuesta de la API)
    const dummyEarthquakes = [];
    for (let i = 1; i <= 100; i++) {
      dummyEarthquakes.push({ id: i, place: `Place ${i}`, magnitude: Math.random() * 10, time: new Date().toISOString() });
    }
    return dummyEarthquakes;
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const renderEarthquakeItem = ({ item }) => (
    <View style={{ marginVertical: 5 }}>
      <Text>ID: {item.id}</Text>
      <Text>Place: {item.place}</Text>
      <Text>Magnitude: {item.magnitude.toFixed(2)}</Text>
      <Text>Time: {new Date(item.time).toLocaleString()}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>Earthquakes</Text>
      <FlatList
        data={earthquakes}
        renderItem={renderEarthquakeItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
        <Button title="Previous Page" onPress={handlePrevPage} disabled={page === 1} />
        <Button title="Next Page" onPress={handleNextPage} />
      </View>
    </View>
  );
};

export default ResultsScreen;
