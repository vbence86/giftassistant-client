import React, { Component } from 'react';
import { StyleSheet, View, Animated, Easing } from 'react-native';
import { Grid, Row, Button, Text } from 'react-native-elements';
import Slider from 'react-native-slider';
import LinearGradient from 'react-native-linear-gradient';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    marginLeft: 15,
    marginRight: 15,
  },
  header: {
    width: '100%',
    marginTop: 50,
    textAlign: 'center',
    fontSize: 50
  },
  selectionContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 0,
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  selectionItem: {
    width: '80%',
    height: '20%',
    padding: 50,
    margin: 20,
    backgroundColor: '#397af8',
    borderRadius: 5,
  },
  selectionItemSmall: {
    width: '40%',
    height: '20%',
    padding: 50,
    margin: 20,
    backgroundColor: '#397af8',
    borderRadius: 5,
  }
  
});

class SliderGroup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 0
    }
    this.onPress = this.onPress.bind(this);
  }

  render() {
    let { min, max } = this.props.values;
    let shownValue;
    min = parseInt(min);
    max = parseInt(max);
    shownValue = Math.round(this.state.value * (max - min) + min);
    return (
      <View style={styles.container}>
        <Slider value={this.state.value} 
                onValueChange={(value) => this.setState({value})} />
        <Text h4>{shownValue}</Text>
        <Button title="OK" onPress={this.onPress}/>
      </View>
    );
  }

  onPress() {
    this.props.onAnswer(Math.round(this.state.value));
  }

}

class SelectionGroup extends React.Component {

  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
  }
    
  render() {
    
    const { values } = this.props;
    const keys = Object.keys(values);
    const numberOfValues = keys.length;
    let selection = keys.map((key) => {
      const value = values[key];
      let buttonStyle = styles.selectionItem;
      let fontSize = 30;
      if (numberOfValues > 3) {
        buttonStyle = styles.selectionItemSmall;
        fontSize = 20;
      }
      return (
        <Button fontSize={fontSize} buttonStyle={buttonStyle} title={value} key={key} onPress={this.onPress.bind(this, key)} raised large/>
      );
    });
    
    return (
      <View style={styles.selectionContainer}>{selection}</View>
    );
  };

  onPress(value) {
    this.props.onAnswer(value);
  }

}

class Choice extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 0
    }
  }

  render() {
    
    const type = this.props.type;
    const values = this.props.values || {};

    if (type === 'slider') {
      return (
        <SliderGroup values={values} onAnswer={this.props.onAnswer} />
      );
    } else if (type === 'select') {
      return (
        <SelectionGroup values={values} onAnswer={this.props.onAnswer} />
      );
    } else {
      return (
        <Text>Please Wait...</Text>
      )
    }
  }

}

export default class QuestionView extends React.Component {

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
    if (!this.props.isLastQuestion) {
      this.animate();
    }
    if (this.props.onAnswer) {
      let args = Array.prototype.slice.call(arguments);
      this.props.onAnswer.apply(null, args);
    }
  }

  render() {
    if (!this.props || !this.props.input) {
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
        <Grid style={{ width: 500 }}>
          <Row size={20}>
            <Text style={styles.header} h3>{this.props.label}</Text>
          </Row>
          <Row size={80}>
            <Choice type={this.props.input} values={this.props.values} onAnswer={this.onAnswer}/>
          </Row>
        </Grid>
      </Animated.View>
    );
  }

}
