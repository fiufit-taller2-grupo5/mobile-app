import React, { useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { View } from 'react-native';
import { NativeBaseProvider, Button, extendTheme } from 'native-base';
import { mapStyles } from "../styles";


interface Props {
  navigation: any;
}

export default function MapScreen(props: Props) {
  const { navigation } = props;
  const [location, setLocation] = useState(getInitialCoordinates());
  const [region, setRegion] = useState(getInitialRegion());

  function getInitialCoordinates() {
    return {
      latitude: -34.61315,
      longitude: -58.37723,
    }
  }

  function getInitialRegion() {
    return {
      latitude: -34.61315,
      longitude: -58.37723,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
  }
  
  function onRegionChange(region: any) {
    setRegion(region);
  }

  const theme = extendTheme({
    components: {
      Button: {
        defaultProps: {
          background: '#018141',
        }
      }
    }
  });

  return (
    <NativeBaseProvider theme={theme}>
      <View style={mapStyles.container}>
        <MapView
          provider={ PROVIDER_GOOGLE }
          style={mapStyles.map}
          region={region}
          onRegionChange={onRegionChange}
        >
          <Marker
            coordinate={location}
          />
            <Marker draggable
              coordinate={location}
              onDragEnd={(e) => {
                setLocation(e.nativeEvent.coordinate);
              }}
            />
        </MapView>
        <Button
          _text={{color: "#FFFFFF"}}
          style={mapStyles.button}
          onPress={() => {
            navigation.navigate('ExtraInfoScreen', {latitude: location.latitude, longitude: location.longitude});
          }}
        >
          Guardar
        </Button>
      </View>
    </NativeBaseProvider>
  );
}
