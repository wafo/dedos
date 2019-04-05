import React from 'react';
import { View } from 'react-native';
import styles from './src/styles/styles';
import TapView from './src/components/tapView';

const App = () => {
  return (
    <View style={styles.container}>
      <TapView />
    </View>
  );
};

export default App;
