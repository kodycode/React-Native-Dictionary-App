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
      keyboardHidden: true,
      transitioning: false,
      word: ''
    };
  }

  componentWillMount() {
    this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this._keyboardWillShow);
    this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this._keyboardWillHide);
    this.props.navigator.toggleTabs({
      to: 'hidden',
      animated: false
    });
  }

  _transitionScreen = () => {
    this.props.navigator.push({
      screen: 'DictionaryApp.ResultPage',
      title: 'Definition of:',
      passProps: {
        _setTransition: this._setTransition,
        word: this.state.word,
        apiKey: this.props.apiKey
      }
    });
  }

  _setTransition = (bool) => {
    this.setState({transitioning: bool});
  }
  
  _keyboardWillShow = () => {
    this.setState({keyboardHidden: false});
  }

  _keyboardWillHide = () => {
    this.setState({keyboardHidden: true});
    if (this.state.transitioning) {
      this._transitionScreen();
    }
  }

  _onPress = () => {
    if (!this.state.transitioning) {
      this._setTransition(true);

      if (!this.state.keyboardHidden) {
        Keyboard.dismiss();
        return;
      }
      this._transitionScreen();
    }
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