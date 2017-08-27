import React, {Component} from 'react';
import { Navigation } from 'react-native-navigation';
import { registerScreens } from './app/screens';
import APIKEY from './api.key';

registerScreens();

Navigation.startTabBasedApp({
  tabs: [
    {
      screen: 'DictionaryApp.SearchPage',
      title: ' ',
      passProps: {apiKey: APIKEY}
    }
  ]
});