import React, { useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { NativeBaseProvider, extendTheme, View } from 'native-base';
import { mapStyles } from "../styles";


interface Props {
  route: any
}

export default function MapScreen(props: Props) {
  const { route } = props;
  const { marker_longitude, marker_latitude } = route.params;
  const [region, setRegion] = useState(getInitialRegion());

  function getInitialRegion() {
    return {
      latitude: marker_latitude,
      longitude: marker_longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
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
          provider={PROVIDER_GOOGLE}
        >
          <Marker
            coordinate={{
              longitude: marker_longitude,
              latitude: marker_latitude
            }}
          />
        </MapView>
      </View>
    </NativeBaseProvider>
  );
}