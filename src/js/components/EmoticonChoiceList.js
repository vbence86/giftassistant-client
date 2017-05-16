import React, { Component } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { Grid, Col, Icon } from 'react-native-elements'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    margin: 0,
    padding: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'    
  },
  likeButton: {
    marginRight: 10
  },
  dislikeButton: {
    marginLeft: 10
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
          <View style={this.props.style}>
            <Icon {...this.props} size={40} type="font-awesome" reverse raised />
          </View>
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
        <EmoticonButton style={styles.dislikeButton} name="close" color="#FF4200" onPress={this.handleClick.bind(this, 0)} />
        <EmoticonButton style={styles.likeButton} name="check" color="#72D33E" onPress={this.handleClick.bind(this, 1)} />
      </View>
    );
  }

  handleClick(answer) {
    this.props.onAnswer(answer);
  }

}

export default EmoticonChoiceList;
