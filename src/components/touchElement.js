import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const TouchElement = ({ size, color, top, left, fill }) => {
  const oRingSize = size + 30;

  const position = {
    top: top - oRingSize / 2,
    left: left - oRingSize / 2,
  };

  const ball = {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: color,
    padding: 5,
  };

  return (
    <AnimatedCircularProgress
      size={oRingSize}
      width={10}
      fill={fill}
      tintColor={color}
      duration={100}
      style={[{ position: 'absolute' }, position]}
    >
      {() => (<View style={ball} />)}
    </AnimatedCircularProgress>
  );
};

TouchElement.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  top: PropTypes.number,
  left: PropTypes.number,
  fill: PropTypes.number,
};

TouchElement.defaultProps = {
  size: 75,
  color: '#fff',
  top: 0,
  left: 0,
  fill: 0,
};

export default TouchElement;