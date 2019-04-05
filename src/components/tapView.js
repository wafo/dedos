import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, PanResponder } from 'react-native';
import usePrevious from '../hooks/usePrevious';
import TouchElement from './touchElement';
import styles from '../styles/styles';

const colors = [
  '#4FC1E8',
  '#A0D568',
  '#FFCE54',
  '#ED5564',
  '#AC92EB',
];
const timeLimit = 3000; // miliseconds
let timerInterval;

function TapView() {
  const [fingers, setFingers] = useState([]);
  const prevFingers = usePrevious(fingers); // saves previous state.
  const [timer, setTimer] = useState(0);
  const [fill, setFill] = useState(0);
  const [winner, setWinner] = useState(null);

  // Effect based on finger number
  useEffect(() => {
    if ((prevFingers.length !== fingers.length) && fingers.length > 1) {
      startTimer();
    } else if (fingers.length < 2) {
      stopTimer();
    }
  }, [fingers]);

  // Effect based on timer
  useEffect(() => {
    setFill(timer * 100 / timeLimit);
    if (timer === (timeLimit + 100)) { // So animation can finish
      clearInterval(timerInterval);
      const winner = fingers[Math.floor(Math.random() * fingers.length)];
      setWinner(winner.identifier);
    }
  }, [timer]);

  const startTimer = () => {
    if (winner !== null) { return; }
    setTimer(0);
    setFill(0);
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      setTimer(prevTime => prevTime + 100);
    }, 100);
  };

  const stopTimer = () => {
    clearInterval(timerInterval);
    setTimer(0);
    setFill(0);
    setWinner(null);
  };

  /**
   * Used to convert the event to just the coords and update state accordingly.
   * @function eventToFingers
   * @param {object} event - Event from PanResponder.
   */
  const eventToFingers = useCallback((event) => {
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
      {fingers.map((finger) => {
        if (winner !== null && finger.identifier !== winner) { return null; }
        return (
          <TouchElement
            key={finger.identifier}
            color={colors[finger.identifier]}
            top={finger.pageY}
            left={finger.pageX}
            fill={fill}
          />
        );
      })}
    </View>
  );
}

export default TapView;