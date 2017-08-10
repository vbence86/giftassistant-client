import React, { Component } from 'react';
import { StyleSheet, View, Image, Animated } from 'react-native';
import { Grid, Row, Button, Text } from 'react-native-elements';
import EmoticonChoiceList from './EmoticonChoiceList';

const FONT_SIZE_SMALL = 20;

const styles = StyleSheet.create({
  header: {
    width: '100%',
    marginTop: '5%',
    textAlign: 'center',
    fontSize: FONT_SIZE_SMALL
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
    marginTop: '5%',
    marginBottom: '30%',
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
  },
  choiceListContainer: {
    position: 'absolute',
    width: '100%',
    height: '20%',
    bottom: 0
  }
});

export default class GiftResultView extends React.Component {

  constructor(props) {
    super(props);
    this.initAnimations();
    this.initEventListeners();
  }

  initAnimations() {
    this.introAnimValue = new Animated.Value(1);
    this.outroAnimValue = new Animated.Value(0);
  }

  initEventListeners() {
    this.onAnswer = this.onAnswer.bind(this);    
  }
 
  animateNewGift() {
    const anim = this.getNewGiftAnimation();
    this.introAnimValue.setValue(0);
    anim.start();
  }

  animatePreviousGift() {
    const anim = this.getPreviousGiftAnimation();
    this.outroAnimValue.setValue(0);
    anim.start();
  }

  animateFullCycle() {
    this.introAnimValue.setValue(0);
    this.outroAnimValue.setValue(0);
    Animated.sequence([
      this.getNewGiftAnimation()
    ]).start();
  }

  componentDidMount() {
    this.animateNewGift();
  }

  onAnswer() {
    if (!this.props.isLastGiftResult) {
      this.animateFullCycle();
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

    const scale = this.introAnimValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1]
    });
    
    const opacity = this.introAnimValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1]
    });

    const marginLeft = this.outroAnimValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -1000]
    });

    return (
      <View>
        <View style={styles.container}>
          {this.renderGiftResultComponent({scale, opacity, marginLeft})}
          <View style={styles.choiceListContainer}>                
            <EmoticonChoiceList onAnswer={this.onAnswer}/>
          </View>
        </View>
      </View>
    );
  }

  renderGiftResultComponent({scale, opacity, marginLeft}) {
    if (!this.props.largeImageURL) return null;
    return (
      <Animated.View style={{ transform: [{scale}], opacity, marginLeft }}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{uri: this.props.largeImageURL}} />
          <View style={styles.priceLabelContainer}>
            <Text style={styles.priceLabelText}>{this.props.formattedPrice}</Text>
          </View>
        </View>
      </Animated.View>
    );
  }

  getNewGiftAnimation() {
    return Animated.spring(
      this.introAnimValue,
      {
        toValue: 1,
        friction: 7,
        tension: 50
      }
    );
  }

  getPreviousGiftAnimation() {
    return Animated.timing(
      this.outroAnimValue,
      {
        toValue: 1,
      }
    );
  }



}
