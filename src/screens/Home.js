import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  Text,
  useWindowDimensions,
  View,
  Button,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import axios from 'axios';

import Card from '../components/Card';
import CustomButton from '../components/CustomButton';
import FancyButton from '../components/FancyButton';
// import styles from '../styles/Home';

const Home = props => {
  const navigation = useNavigation();
  //   const navigation = props.navigation;
  const route = useRoute();
  //   const route = props.route;
  //   console.log('router', route);
  const [input, setInput] = useState('');
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const screens = useWindowDimensions();
  const onPressHandler = () => {
    console.log('Pressed');
  };

  const get = async () => {
    try {
      const result = await axios.get(
        'https://jsonplaceholder.typicode.com/users',
      );
      setContent(result.data);
      setLoading(false);
      console.log('success');
      // console.log(result.data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => get(), 1000);
  }, []);

  useEffect(() => {
    let refresh = false;
    const removeFocusevent = navigation.addListener('focus', e => {
      console.log('focus', e.target);
      if (refresh) {
        setLoading(true);
        setTimeout(() => get(), 1000);
      }
    });
    const removeBlurEvent = navigation.addListener('blur', e => {
      console.log('blur', e.target);
      console.log(refresh);
      refresh = true;
    });

    // wajib di cleanup
    return () => {
      removeFocusevent();
      removeBlurEvent();
    };
    // return removeListener;
  }, [navigation]);

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <Button
        title={`Welcome ${route.params.email}`}
        onPress={onPressHandler}
        color={'#D72672'}
      />
      <CustomButton
        text="Refresh Data"
        color={'#66D3C8'}
        size={{height: screens.height / 5, width: screens.width}}
        onPressHandler={{
          onPress: () => {
            setLoading(true);
            setTimeout(() => get(), 1000);
          },
          onPressIn: () => console.log('Pressed In'),
          onPressOut: () => console.log('Pressed Out'),
          onLongPress: () => console.log('Long Pressed'),
        }}
      />
      {loading ? (
        <View>
          <ActivityIndicator size={'large'} />
        </View>
      ) : (
        content.length > 0 && (
          <>
            <ScrollView style={{flex: 1}}>
              {content.slice(0, 5).map(user => (
                <Card key={user.id} title={user.name}>
                  {user.phone}
                </Card>
              ))}
            </ScrollView>
            <Text>===========================</Text>
            <ScrollView style={{flex: 1}}>
              {content.slice(5, 10).map(user => (
                <Card key={user.id} title={user.name}>
                  {user.phone}
                </Card>
              ))}
            </ScrollView>
          </>
        )
      )}
      <TextInput
        secureTextEntry={true}
        value={input}
        onChangeText={text => {
          setInput(text);
        }}
        // keyboardType="visible-password"
      />
      <FancyButton
        text="Press to Navigate to Auth"
        color={'#007ACC'}
        size={{height: screens.height / 10, width: screens.width}}
        onPressHandler={{
          onPress: () => navigation.push('Auth'),
          onPressIn: () => console.log('Pressed In'),
          onPressOut: () => console.log('Pressed Out'),
          onLongPress: () => console.log('Long Pressed'),
        }}
      />
    </View>
  );
};

export default Home;
