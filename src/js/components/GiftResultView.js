import React, { Component } from 'react';
import { StyleSheet, View, Image, Animated } from 'react-native';
import { Grid, Row, Button, Text } from 'react-native-elements';
import StarRating from 'react-native-star-rating';

const FONT_SIZE_SMALL = 20;
const FONT_SIZE_BUTTON = 12;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    margin: 0,
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  choiceListContainer: {
    position: 'absolute',
    width: '100%',
    height: 100,
    bottom: 0
  },
  ctaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'     
  },
  button: {
    width: 120,
    margin: '5%',
    backgroundColor: '#007aff',
    borderRadius: 10,
  },
  buttonInverse: {
    width: 120,
    margin: '5%',
    backgroundColor: 'red',
    borderRadius: 10,
  },
  contentContainer: {
    width: '100%',
    height: '100%',
    marginTop: 10,
  },
  imageContainer: {
    marginLeft: '25%',
    marginRight: '25%',
    maxHeight: 200,     
  },
  textContainer: {
    marginLeft: '2%',
    marginTop: '2%',
    marginRight: '2%',
    marginBottom: '2%',
  },
  textHeader: {
    color: '#333',
    fontSize: 18,
    textAlign: 'center',
  },
  textDescription: {
    color: '#333',    
    marginTop: 20,
    fontSize: 13,
    textAlign: 'justify',
    lineHeight: 20,
  },  
  textRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 10,
  },
  textRatingCount: {
    paddingLeft: 5,
    fontSize: 9,
    color: '#aaa',
  },
  image: {
    width: '100%',
    height: '100%',
    maxHeight: 300,
  },
  priceLabelText: {
    width: '100%',
    margin: 5,
    textAlign: 'center',
    color: 'white',
    fontSize: FONT_SIZE_SMALL    
  },    
});

export default class GiftResultView extends React.Component {

  constructor(props) {
    super(props);
    this.initAnimations();
  }

  initAnimations() {
    this.introAnimValue = new Animated.Value(1);
    this.outroAnimValue = new Animated.Value(0);
  }

  animateNewGift() {
    const anim = this.getNewGiftAnimation();
    this.introAnimValue.setValue(0);
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
          {this.renderGiftResultComponent({opacity, marginLeft})}
          <View style={styles.choiceListContainer}>                
            <View style={styles.ctaContainer}>
              <Button onPress={this.onAnswer.bind(this, 0)} fontSize={FONT_SIZE_BUTTON} icon={{name: 'trash', type: 'font-awesome'}} buttonStyle={styles.buttonInverse} title="Bin" large/>
              <Button onPress={this.onAnswer.bind(this, 1)} fontSize={FONT_SIZE_BUTTON} icon={{name: 'shopping-cart'}} fontWeight='bold' buttonStyle={styles.button} title="Trolley" large/>
            </View>             
          </View>
        </View>
      </View>
    );
  }

  renderGiftResultComponent({opacity, marginLeft}) {
    if (!this.props.largeImageURL) return null;
    return (
        <View style={styles.contentContainer}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{uri: this.props.largeImageURL}} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.textHeader}>{this.props.label}</Text>
            <View style={styles.textRatingContainer}>
              <StarRating
                disabled={true}
                emptyStar={'star-o'}
                fullStar={'star'}
                halfStar={'star-half-empty'}
                iconSet={'FontAwesome'}
                maxStars={5}
                rating={4.5}
                starColor={'#ffc200'}
                starSize={10}
              />
              <Text style={styles.textRatingCount}>(38)</Text>
            </View>
          </View>
        </View>
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


}
