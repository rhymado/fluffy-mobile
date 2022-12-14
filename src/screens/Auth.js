import React, {useState, useEffect} from 'react';
import {View, Text, TextInput} from 'react-native';
import PushNotification from 'react-native-push-notification';

import FancyButton from '../components/FancyButton';
import Event from '../utils/events';

const Auth = ({navigation}) => {
  const [second, setSecond] = useState('');
  const [form, setForm] = useState({
    email: '',
    pwd: '',
  });

  const onChangeHandler = (text, type) => {
    setForm(form => ({...form, [type]: text}));
  };

  const listener = () => {
    console.log('listener');
  };

  const listenerWithArgs = (...x) => {
    console.log('listenerWithArguments', x);
  };

  useEffect(() => {
    // listener
    Event.addListener('test', listener);
    Event.addListener('test', listenerWithArgs);

    return () => {
      Event.removeListener('test', listener);
      Event.removeListener('test', listenerWithArgs);
    };
  }, []);

  const handleShowNotification = msg => {
    PushNotification.localNotification({
      channelId: 'local-notification',
      title: 'Local Notification',
      message: msg,
    });
  };

  const handleScheduledNotification = (msg, seconds = 1) => {
    PushNotification.localNotificationSchedule({
      channelId: 'local-notification',
      title: 'Scheduled Notification',
      message: msg,
      date: new Date(Date.now() + Number(seconds) * 1000),
    });
  };

  return (
    <View style={{backgroundColor: 'grey'}}>
      <Text>Login</Text>
      <TextInput
        keyboardType="email-address"
        value={form.email}
        placeholder="email"
        onChangeText={text => onChangeHandler(text, 'email')}
      />
      <TextInput
        secureTextEntry
        value={form.pwd}
        placeholder="password"
        onChangeText={text => onChangeHandler(text, 'pwd')}
      />
      <FancyButton
        color={'#E2C074'}
        text="Login"
        onPressHandler={{
          onPress: () => navigation.navigate('Home', form),
          onPressIn: () => console.log('Pressed In'),
          onPressOut: () => console.log('Pressed Out'),
          onLongPress: () => navigation.popToTop(),
        }}
      />
      <FancyButton
        color={'#E2C074'}
        text="Emit Event"
        onPressHandler={{
          onPress: () => Event.emit('test', 'Andi', 'Budi', 1, 2, 3),
          onPressIn: () => console.log('Pressed In'),
          onPressOut: () => console.log('Pressed Out'),
          onLongPress: () => navigation.popToTop(),
        }}
      />
      <FancyButton
        color={'#179EFE'}
        text="Trigger Notification"
        onPressHandler={{
          onPress: () => handleShowNotification('Welcome'),
          onPressIn: () => console.log('Pressed In'),
          onPressOut: () => console.log('Pressed Out'),
          onLongPress: () => navigation.popToTop(),
        }}
      />
      <TextInput
        style={{borderColor: 'black', borderWidth: 2}}
        keyboardType={'number-pad'}
        value={second}
        onChangeText={text => setSecond(text)}
      />
      <FancyButton
        color={'#8CD330'}
        text="Trigger Scheduled Notification"
        onPressHandler={{
          onPress: () => handleScheduledNotification('Hello', second),
          onPressIn: () => console.log('Pressed In'),
          onPressOut: () => console.log('Pressed Out'),
          onLongPress: () => navigation.popToTop(),
        }}
      />
    </View>
  );
};

export default Auth;
