import React, { Component } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { Grid, Col, Icon } from 'react-native-elements'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

class EmoticonButton extends React.Component {

  constructor(props) {
    super(props);
    this.animValue = new Animated.Value(0.5);
  }

  componentDidMount() {
    this.spring();
  }

  spring () {
    this.animValue.setValue(0.3);
    setTimeout(() => {
      Animated.spring(
        this.animValue,
        {
          toValue: 1,
          friction: 2
        }
      ).start();
    }, Math.random() * 200);
  }

  render () {
    return (
      <Animated.View style={{ transform: [{scale: this.animValue}] }}>
        <Icon {...this.props} size={60} type="font-awesome" reverse raised />
      </Animated.View>
    )
  }
}

class EmoticonChoiceList extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Grid>
          <Col><EmoticonButton name="close" color="#FF4200" onPress={this.handleClick.bind(this, 0)} /></Col>
          <Col><EmoticonButton name="check" color="#72D33E" onPress={this.handleClick.bind(this, 1)} /></Col>
        </Grid>
      </View>
    );
  }

  handleClick(answer) {
    this.props.onAnswer(answer);
  }

}

export default EmoticonChoiceList;
