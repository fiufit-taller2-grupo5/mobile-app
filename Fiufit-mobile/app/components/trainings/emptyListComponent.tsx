import React, { useEffect, useState } from "react";
import {
  FlatList,
  VStack,
  Icon,
  Input,
  View,
  Select,
  ChevronDownIcon,
  Button,
  Image,
  Text,
} from 'native-base';
import { ActivityIndicator, RefreshControl, StyleSheet } from 'react-native';



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginBottom: 100
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    color: 'grey',
  },
});

export const EmptyListComponent = ({ text }: { text: string }) => {
  return (
    <View style={styles.container}>
      <Image
        alt="no trainings available"
        source={require('../../../assets/images/empty.png')} // replace with the path to your image
        style={styles.image}
      />
      <Text style={styles.text}>{text ? text : "No se encontraron resultados"}</Text>
    </View>
  );
};