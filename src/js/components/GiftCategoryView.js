import React, { Component } from 'react';
import { StyleSheet, View, Animated, Easing } from 'react-native';
import { Grid, Row, Button, Text } from 'react-native-elements';
import EmoticonChoiceList from './EmoticonChoiceList';

const FONT_SIZE_DEFAULT = 16;
const FONT_SIZE_HEADER = 18;
const FONT_SIZE_SMALL = 20;
const FONT_SIZE_BUTTON = 14;

const styles = StyleSheet.create({
  header: {
    width: '100%',
    marginTop: '40%',
    paddingLeft: 20,
    paddingRight: 20,
    textAlign: 'center',
    fontSize: FONT_SIZE_SMALL,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    margin: 0,
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  choiceListContainer: {
    position: 'absolute',
    width: '100%',
    height: 95,
    bottom: 0,
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
});


export default class GiftCategoryView extends React.Component {

  constructor(props) {
    super(props);
    this.animValue = new Animated.Value(1);
  }

  animate() {
    this.animValue.setValue(0);
    Animated.spring(
      this.animValue,
      {
        toValue: 1,
        friction: 7,
        tension: 40
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

    const left = this.animValue.interpolate({
      inputRange: [0, 1],
      outputRange: [500, 0]
    });

    return (
      <View>
        <Animated.View style={{ left }}>
          <View style={styles.container}>
            <Grid style={{ width: '100%' }}>
              <Row size={100}>
                <Text style={styles.header} h2>{this.props.name}</Text>
              </Row>
            </Grid>
          </View>
        </Animated.View>
        <View style={styles.choiceListContainer}>                
          <View style={styles.ctaContainer}>
            <Button onPress={this.onAnswer.bind(this, 0)} fontSize={FONT_SIZE_BUTTON} icon={{name: 'thumbs-o-down', type: 'font-awesome'}} buttonStyle={styles.buttonInverse} title="No" large/>
            <Button onPress={this.onAnswer.bind(this, 1)} fontSize={FONT_SIZE_BUTTON} icon={{name: 'thumbs-o-up', type: 'font-awesome'}} fontWeight='bold' buttonStyle={styles.button} title="Yes" large/>
          </View>             
        </View>
      </View>
    );
  }

}
