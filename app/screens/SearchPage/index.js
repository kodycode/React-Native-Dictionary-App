import React, {Component} from 'react';
import {
  View,
  Image,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import {styles, customNavigationStyle} from './style';

class SearchPage extends Component {
  static navigatorStyle = customNavigationStyle;

  constructor(props) {
    super(props);
    this.state = {
      word: ''
    };
  }

  componentWillMount() {
    this.props.navigator.toggleTabs({
      to: 'hidden',
      animated: false
    });
  }

  _onPress = () => {
    this.props.navigator.push({
      screen: 'DictionaryApp.ResultPage',
      title: 'Definition of:',
      passProps: {
        word: this.state.word,
        apiKey: this.props.apiKey
      }
    });
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.pageContainer}>
          <Image 
            style={styles.textStyle} 
            source={require('./mw-logo.png')}
          />
          <TextInput 
            style={styles.textInput} 
            placeholder='Enter word to define here'
            onChangeText={(text) => this.setState({word: text})}
            onSubmitEditing={Keyboard.dismiss}
          />
          <View style={styles.searchBtn}>
            <Button 
              title='Search' 
              onPress={this._onPress}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

module.exports = SearchPage;