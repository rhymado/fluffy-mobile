import React from 'react';
import {Pressable, View, Text} from 'react-native';

const CustomButton = ({
  text,
  color,
  onPressHandler: {onPressIn, onPressOut, onLongPress, onPress},
  size,
}) => {
  return (
    <Pressable
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onLongPress={onLongPress}
      delayLongPress={2000}>
      <View
        style={{
          backgroundColor: color,
          height: size.height,
          width: size.width,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: 'black'}}>{text}</Text>
      </View>
    </Pressable>
  );
};

export default CustomButton;
