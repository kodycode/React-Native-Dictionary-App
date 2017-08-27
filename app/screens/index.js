import { Navigation } from 'react-native-navigation';

import SearchPage from './SearchPage';
import ResultPage from './ResultPage';

export function registerScreens() {
  Navigation.registerComponent('DictionaryApp.SearchPage', () => SearchPage);
  Navigation.registerComponent('DictionaryApp.ResultPage', () => ResultPage);
}