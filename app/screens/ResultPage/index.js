import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Button
} from 'react-native';
import {styles, customNavigationStyle} from './style';

const REGEX = /<it>|<\/it>/g;
const DICTIONARYAPIURL = 'https://www.dictionaryapi.com/api/v1/references/collegiate/xml/';

var parseString = require('react-native-xml2js').parseString;

class ResultPage extends Component {
  static navigatorStyle = customNavigationStyle;
  
  constructor(props) {
    super(props);
    this.state = {
      text: 'Searching definition...',
      numOfDefinitions: ''
    };
    this._replaceTag = this._replaceTag.bind(this);
  }

  _replaceTag = (str) => {
    return str.replace(REGEX, '');
  }

  _getDefinition = async () => {
    try {
      var definitionList = [];
      let response = await fetch(DICTIONARYAPIURL + this.props.word + '?key=' + this.props.apiKey);
      var responseXml = await response.text().then(function(text) {
        var tempText = this._replaceTag(text);
        return tempText;
      }.bind(this));
    
      parseString(responseXml, function(err, result) {
        var jsonObject = JSON.parse(JSON.stringify(result));
        var definitionEntries = jsonObject.entry_list.entry[0].def[0].dt;
        for (entry in definitionEntries) {
          if (typeof(definitionEntries[entry]) === 'string') {
            definitionList.push(definitionEntries[entry]);
          }
        }
      });
    
      return definitionList;
    }
    catch(error) {
      console.log("_getDefinition: Failed to retrieve definition");
      throw error;
    }
  }

  componentWillMount = () => {
    this.props._setTransition(false);
  }

  componentDidMount = async () => {
    try {
      var definition = await this._getDefinition(this.props.word, this.props.apiKey);
      this._displayDefinition(definition);
    }
    catch(error) {
      console.log(error);
      this.setState({text: 'Failed to find definition.'});
    }
  }

  _displayDefinition = (definition) => {
    var display = '';
    var i;

    for (i = 0; i < definition.length; i++) {
      display = display + (i+1) + '.' + definition[i] + '\n\n\n';
    }
    display = display.replace(/:/g, ' ');
    this.setState({
      numOfDefinitions: i + ' definitions were found:', 
      text: display
    });
  }

  render() {
    return (
      <View style={styles.resultPageStyle}>
        <Text 
          style={styles.wordStyle}
          numberOfLines={1}
        >
          {this.props.word}
        </Text>
        <Text style={styles.definitionCountStyle}>
          {this.state.numOfDefinitions}
        </Text>
        <ScrollView 
          style={styles.definitionBoxStyle} 
          showsVerticalScrollIndicator={true}
        >
          <Text style={styles.definitionTextStyle}>
            {this.state.text}
          </Text>
        </ScrollView>
      </View>
    )
  }
}

module.exports = ResultPage;