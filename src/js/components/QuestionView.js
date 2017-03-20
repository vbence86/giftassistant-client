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
  }

  render() {
    let { min, max } = this.props.values;
    min = parseInt(min);
    max = parseInt(max);
    return (
      <View style={styles.container}>
        <Slider value={this.state.value} 
                onValueChange={(value) => this.setState({value})} />
        <Button title="OK" />
      </View>
    );
  }

}

class SelectionGroup extends React.Component {
    
  render() {
    
    const { values } = this.props.values;
    const selection = [];

    Object.keys(values).forEach((key) => {
      const value = values[key];
      selection.push(<Button title={value} value={value} key={key} />);
    });
    
    return selection;
  };

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
        <SliderGroup values={values} />
      );
    } else if (type === 'select') {
      return (
        <SelectionGroup values={values} />
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
            <Choice type={this.props.input} values={this.props.values} />
          </Row>
        </Grid>
      </View>
    );
  }

}
