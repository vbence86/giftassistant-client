import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Grid, Row, Button, Text } from 'react-native-elements';
import Slider from 'react-native-slider';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    marginLeft: 15,
    marginRight: 15,
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
    let selection = Object.keys(values).map((key) => {
      const value = values[key];
      return (
        <Button title={value} value={value} key={key} onPress={this.onPress}/>
      );
    });
    
    return (
      <View>{selection}</View>
    );
  };

  onPress() {
    this.props.onAnswer('Bence');
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

  render() {
    if (!this.props || !this.props.input) {
      return null;
    }
    return (
      <View style={styles.container}>
        <Grid>
          <Row size={30}>
            <Text h3>{this.props.label}</Text>
          </Row>
          <Row size={70}>
            <Choice type={this.props.input} values={this.props.values} onAnswer={this.props.onAnswer}/>
          </Row>
        </Grid>
      </View>
    );
  }

}
