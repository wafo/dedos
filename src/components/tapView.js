import React, { useState, useMemo } from 'react';
import { View, PanResponder } from 'react-native';
import TouchElement from './touchElement';
import styles from '../styles/styles';

const colors = [
  '#4FC1E8',
  '#A0D568',
  '#FFCE54',
  '#ED5564',
  '#AC92EB',
];

function TapView() {
  const [fingers, setFingers] = useState([]);

  /**
   * Used to convert the event to just the coords and update state accordingly.
   * @function eventToFingers
   * @param {object} event - Event from PanResponder.
   */
  const eventToFingers = React.useCallback((event) => {
    const { nativeEvent: { touches } } = event;
    const coords = touches.map(touch => ({
      identifier: touch.identifier,
      pageX: touch.pageX,
      pageY: touch.pageY,
    }));
    setFingers(coords);
  }, []);

  /** Memoized PanResponder */
  const panResponder = useMemo(() => PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => { /** */ },
    onPanResponderStart: event => eventToFingers(event),
    onPanResponderMove: event => eventToFingers(event),
    onPanResponderEnd: event => eventToFingers(event),
  }), []);

  return (
    <View
      style={styles.tapViewContainer}
      {...panResponder.panHandlers}
    >
      {fingers.map(finger => (
        <TouchElement
          key={finger.identifier}
          color={colors[finger.identifier]}
          top={finger.pageY}
          left={finger.pageX}
          fill={0}
        />
      ))}
    </View>
  );
}

export default TapView;