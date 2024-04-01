import React from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Button } from 'react-native-elements';

const DetailsScreen = ({ route, navigation }) => {
    const { earthquake } = route.params;
  
    // Depura para verificar si el objeto earthquake se está pasando correctamente
    console.log('Earthquake:', earthquake);
  
    // Verifica si el objeto earthquake existe y tiene las propiedades esperadas
    if (!earthquake || !earthquake.properties || !earthquake.geometry) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Error: No se encontraron detalles del terremoto</Text>
        </View>
      );
    }
  
    // Verifica la estructura del objeto earthquake y ajusta las propiedades en consecuencia
    const { properties, geometry } = earthquake;
    const { title, place } = properties;
    const { mag } = properties;
    const depth = geometry.coordinates[2]; // Verifica si profundidad está en el lugar correcto de la estructura
  
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>Detalles del Terremoto</Text>
        <Text>Titulo: {title}</Text>
        <Text>Lugar: {place}</Text>
        <Text>Magnitud: {mag}</Text>
        <Text>Profundidad: {depth}</Text>
        <MapView
          style={{ width: '100%', height: '50%', marginTop: 20 }}
          initialRegion={{
            latitude: geometry.coordinates[1],
            longitude: geometry.coordinates[0],
            latitudeDelta: 0.5,
            longitudeDelta: 0.5,
          }}
        >
          <Marker
            coordinate={{
              latitude: geometry.coordinates[1],
              longitude: geometry.coordinates[0],
            }}
            title={title}
            description={`Magnitud: ${mag}, Profundidad: ${depth}`}
            pinColor="red"
          />
        </MapView>
        <Button title="Volver" onPress={() => navigation.goBack()} />
      </View>
    );
  };
  
  export default DetailsScreen;