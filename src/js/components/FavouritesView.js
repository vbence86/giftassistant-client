import React, { Component } from 'react';
import { StyleSheet, View, Animated, Easing } from 'react-native';
import { Grid, Row, Button, Text } from 'react-native-elements';
import Svg, { LinearGradient, Rect, Defs, Stop } from 'react-native-svg';

const FONT_SIZE_DEFAULT = 30;
const FONT_SIZE_SMALL = 20;

const styles = StyleSheet.create({
  header: {
    width: '100%',
    marginTop: '5%',
    textAlign: 'center',
    fontSize: FONT_SIZE_DEFAULT
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 0,
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    width: '80%',
    height: '20%',
    margin: '5%',
    backgroundColor: '#397af8',
    borderRadius: 5,
  },
  buttonSmall: {
    width: '40%',
    height: '20%',
    margin: '5%',
    backgroundColor: '#397af8',
    borderRadius: 5,
  },
  svg: { 
    position: 'absolute', 
    zIndex: 0, 
    left: 0, 
    top: 0, 
    width: '100%', 
    height: '100%' 
  }
});

export default class FavouritesView extends React.Component {

  constructor(props) {
    super(props);
    this.animValue = new Animated.Value(1);
    this.onSelect = this.onSelect.bind(this);
  }
  
  animate() {
    this.animValue.setValue(0);
    Animated.spring(
      this.animValue,
      {
        toValue: 1,
        friction: 7,
        tension: 50
      }
    ).start();
  }

  onSelect() {
  }

  render() {
    if (!this.props || !this.props.input) {
      return null;
    }

    const marginTop = this.animValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-150, 0]
    });
    
    const opacity = this.animValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1]
    });
    
    return (
      <View>
        <Svg style={styles.svg}>
          <Defs> 
            <LinearGradient id="lgrad" x1="0%" y1="100%" x2="100%" y2="0%" > 
              <Stop offset="0" stopColor="rgb(255, 255, 255)" stopOpacity="1" />
              <Stop offset="1" stopColor="rgb(156, 199, 255)" stopOpacity="1" />
            </LinearGradient> 
          </Defs>
          <Rect x="0" y="0" width="100%" height="100%" fill="url(#lgrad)"/>
        </Svg>
        <Animated.View style={{ marginTop, opacity }}>
          <Text>List</Text>
        </Animated.View>
      </View>
    );
  }

}
