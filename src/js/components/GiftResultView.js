import React, { Component } from 'react';
import { StyleSheet, View, Image, Animated } from 'react-native';
import { Grid, Row, Button, Text } from 'react-native-elements';
import Svg, { LinearGradient, Rect, Defs, Stop } from 'react-native-svg';
import { BoxShadow } from 'react-native-shadow';
import EmoticonChoiceList from './EmoticonChoiceList';

const FONT_SIZE_DEFAULT = 20;
const FONT_SIZE_SMALL = 20;

const styles = StyleSheet.create({
  header: {
    width: '100%',
    marginTop: '5%',
    textAlign: 'center',
    fontSize: FONT_SIZE_DEFAULT
  },
  price: {
    width: '100%',
    marginTop: '5%',
    textAlign: 'center',
    fontSize: FONT_SIZE_SMALL
  },
  container: {
    width: '100%',
    height: '100%',
    margin: 0,
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  svg: { 
    position: 'absolute', 
    zIndex: 0, 
    left: 0, 
    top: 0, 
    width: '100%', 
    height: '100%' 
  },
  imageContainer: {
    width: '60%',
    marginLeft: '20%',
    marginRight: '20%',
    marginTop: '10%',
    marginBottom: '10%',
    overflow: 'hidden',
    position: 'relative'
  },
  image: {
    width: '100%',
    minHeight: '100%',
  },
  priceLabelContainer: {
    position: 'absolute',
    width: '100%',
    left: 0,
    top: 0,
    backgroundColor: 'red',
    zIndex: 1,
    opacity: 0.85,
  },
  priceLabelText: {
    width: '100%',
    margin: 5,
    textAlign: 'center',
    color: 'white',
    fontSize: FONT_SIZE_SMALL    
  }
});

export default class GiftResultView extends React.Component {

  constructor(props) {
    super(props);
    this.animValue = new Animated.Value(1);
    this.onAnswer = this.onAnswer.bind(this);
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

  componentDidMount() {
    this.animate();
  }

  onAnswer() {
    if (!this.props.isLastGiftResult) {
      this.animate();
    }
    if (this.props.onAnswer) {
      let args = Array.prototype.slice.call(arguments);
      this.props.onAnswer.apply(null, args);
    }
  }

  render() {
    if (!this.props) {
      return null;
    }

    const scale = this.animValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1]
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
        <View style={styles.container}>
          <Grid style={{ width: '100%' }}>
            <Row size={80}>
              <View style={styles.imageContainer}>
                <Animated.View style={{ transform: [{scale}], opacity }}>
                  <Image style={styles.image} source={{uri: this.props.largeImageURL}} />
                  <View style={styles.priceLabelContainer}>
                    <Text style={styles.priceLabelText}>{this.props.formattedPrice}</Text>
                  </View>
                </Animated.View>
              </View>
            </Row>
            <Row size={20}>
              <EmoticonChoiceList onAnswer={this.onAnswer}/>
            </Row>
          </Grid>
        </View>
      </View>
    );
  }

}
