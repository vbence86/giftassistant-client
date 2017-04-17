import React, { Component } from 'react';
import { StyleSheet, View, Image, Animated } from 'react-native';
import { Grid, Row, Button, Text } from 'react-native-elements';
import EmoticonChoiceList from './EmoticonChoiceList';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    marginLeft: 15,
    marginRight: 15,
  },
  image: {
    width: 200,
    height: 200
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

    const marginLeft = this.animValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-300, 0]
    });
    
    const opacity = this.animValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1]
    });

    return (
      <Animated.View style={{ marginLeft, opacity }}>
        <View style={styles.container}>
          <Grid>
            <Row size={20}>
              <Text h3>{this.props.label}</Text>
            </Row>
            <Row size={40}>
              <Image style={styles.image} source={{uri: this.props.largeImageURL}} />
            </Row>
            <Row size={10}>
              <Text h3>{this.props.formattedPrice}</Text>
            </Row>
            <Row size={30}>
              <EmoticonChoiceList onAnswer={this.onAnswer}/>
            </Row>
          </Grid>
        </View>
      </Animated.View>
    );
  }

}
