import {
  StyleSheet,
  Dimensions
} from 'react-native';

var {width, height} = Dimensions.get('screen');

const customNavigationStyle = {
  navBarBackgroundColor: '#f5f5dc',
  drawUnderNavBar: true,
  drawUnderTabBar: true,
  navBarNoBorder: true
}

const styles = StyleSheet.create({
  resultPageStyle: {
    width: width,
    height: height-65,
    backgroundColor: '#f5f5dc',
    flexDirection: 'column',
    alignItems: 'center'
  },
  wordStyle: {
    fontSize: 50,
    fontWeight: 'bold',
    fontStyle: 'italic',
    textDecorationLine: 'underline'
  },
  definitionCountStyle: {
    marginTop: 40,
  },
  definitionBoxStyle: {
    height: 100,
    width: width * 0.9,
    backgroundColor: 'white',
    borderColor: 'black',
    borderRadius: 5,
    borderWidth: 2
  },
  definitionTextStyle: {
    fontFamily: 'Helvetica',
    fontSize: 20
  }
})

module.exports = {styles, customNavigationStyle};