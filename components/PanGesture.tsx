import React from 'react';
import { StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const PanGesture: React.FC = () => {
  return (
    <GestureHandlerRootView>
      <View></View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({});

export default PanGesture;
