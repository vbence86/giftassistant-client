import React, { Component } from 'react';
import { StyleSheet, View, Animated, Easing } from 'react-native';
import { Grid, Row, Button, Text } from 'react-native-elements';
import Slider from 'react-native-slider';

const FONT_SIZE_DEFAULT = 16;
const FONT_SIZE_SMALL = 20;
const FONT_SIZE_BUTTON = 14;

const styles = StyleSheet.create({
  header: {
    width: '100%',
    marginTop: '5%',
    textAlign: 'center',
    fontSize: FONT_SIZE_DEFAULT
  },
  selectionContainer: {
    width: '100%',
    minWidth: '100%',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 0,
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  selectionItem: {
    width: 240,
    minWidth: 240,
    height: '20%',
    margin: '5%',
    backgroundColor: '#007aff',
    borderRadius: 10,
  },
  selectionItemSmall: {
    width: 120,
    minWidth: 120,
    height: '20%',
    margin: '5%',    
    backgroundColor: '#007aff',
    borderRadius: 10,
    alignSelf: 'center',  
    justifyContent: 'center', 
  },
  sliderContainer: {
    flex: 1,
    flexDirection: 'column',
    margin: 0,
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  sliderItem: {
    width: '80%',
    height: '20%',
  },
  sliderText: {
    width: '100%',
    height: '20%',
    padding: '10%',
    margin: '5%',
    textAlign: 'center',
    fontSize: FONT_SIZE_DEFAULT
  },
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
      <View style={styles.sliderContainer}>
        <Slider style={styles.sliderItem} value={this.state.value} 
                onValueChange={(value) => this.setState({value})} />
        <Text styles={styles.sliderText} h3>{shownValue}</Text>
        <Button fontSize={FONT_SIZE_BUTTON} buttonStyle={styles.selectionItem} title="OK" onPress={this.onPress}/>
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
      let fontSize = FONT_SIZE_BUTTON + 3;
      if (numberOfValues > 3) {
        buttonStyle = styles.selectionItemSmall;
        fontSize = FONT_SIZE_BUTTON;
      }
      return (
        <Button fontSize={fontSize} buttonStyle={buttonStyle} title={value} key={key} onPress={this.onPress.bind(this, key)} large/>
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
        tension: 40
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

    const left = this.animValue.interpolate({
      inputRange: [0, 1],
      outputRange: [500, 0]
    });
    
    return (
      <View>
        <Animated.View style={{ left }}>
          <Grid style={{ width: '100%' }}>
            <Row size={15}>
              <Text style={styles.header} h3>{this.props.label}</Text>
            </Row>
            <Row size={85}>
              <Choice type={this.props.input} values={this.props.values} onAnswer={this.onAnswer}/>
            </Row>
          </Grid>
        </Animated.View>
      </View>
    );
  }

}
