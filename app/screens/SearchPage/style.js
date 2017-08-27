import {
  StyleSheet,
  Dimensions
} from 'react-native';
  
var {width, height} = Dimensions.get('screen');
var textMargin = height/10;
var textInputWidth = width - (width/4);

const customNavigationStyle = {
  drawUnderNavBar: true,
  navBarHidden: true,
  navBarNoBorder: true,
  drawUnderTabBar: true
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: '#87ceeb',
    flexDirection: 'column',
    alignItems: 'center',
  },
  textStyle: {
    marginTop: textMargin
  },
  textInput: {
    marginTop: 75,
    width: textInputWidth,
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: 'black',
    paddingLeft: 5
  },
  searchBtn: {
    marginTop: 75,
    width: 100,
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'black',
    overflow: 'hidden'
  }
});
  
module.exports = {styles, customNavigationStyle};