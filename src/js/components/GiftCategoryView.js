import React, { Component } from 'react';
import { StyleSheet, View, Animated, Easing } from 'react-native';
import { Grid, Row, Button, Text } from 'react-native-elements';
import EmoticonChoiceList from './EmoticonChoiceList';

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
    flexDirection: 'column',
    margin: 0,
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
});


export default class GiftCategoryView extends React.Component {

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
    if (!this.props.isLastCategory) {
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
        <Animated.View style={{ marginTop, opacity }}>
          <View style={styles.container}>
            <Grid style={{ width: '100%' }}>
              <Row size={30}>
                <Text style={styles.header} h3>What does the person like?</Text>
              </Row>
              <Row size={40}>
                <Text style={styles.header} h2>{this.props.name}</Text>
              </Row>
              <Row size={30}>
                <EmoticonChoiceList onAnswer={this.onAnswer}/>
              </Row>
            </Grid>
          </View>
        </Animated.View>
      </View>
    );
  }

}
