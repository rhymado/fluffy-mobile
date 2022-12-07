import React from 'react';
import {TouchableOpacity, View, Text, useWindowDimensions} from 'react-native';

const FancyButton = ({
  text,
  color,
  onPressHandler: {onPressIn, onPressOut, onLongPress, onPress},
  size,
}) => {
  const {height, width} = useWindowDimensions();
  const componentHeight = size?.height || height / 10;
  const componentWidth = size?.width || width;
  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onLongPress={onLongPress}
      activeOpacity={0.5}>
      <View
        style={{
          backgroundColor: color,
          height: componentHeight,
          width: componentWidth,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: 'black'}}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default FancyButton;
