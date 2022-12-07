import React from 'react';
import {View, Text} from 'react-native';

const Card = ({children, title}) => {
  return (
    <View>
      <Text style={{fontSize: 32, fontFamily: 'Metropolis-Medium'}}>
        {title}
      </Text>
      <Text style={{fontSize: 25}}>{children}</Text>
    </View>
  );
};

export default Card;
