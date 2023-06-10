import React, { useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { NativeBaseProvider, extendTheme, View } from 'native-base';
import { mapStyles } from "../styles";


interface Props {
  route: any
}

export default function MapScreen(props: Props) {
  const { route } = props;
  const { marker_altitude, marker_latitude } = route.params;
  const [region, setRegion] = useState(getInitialRegion());

  function getCoordinates() {
    return {
      latitude: marker_altitude,
      longitude: marker_latitude,
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
          style={mapStyles.map}
          region={region}
          onRegionChange={onRegionChange}
        >
          <Marker
            coordinate={getCoordinates()}
          />
        </MapView>
      </View>
    </NativeBaseProvider>
  );
}