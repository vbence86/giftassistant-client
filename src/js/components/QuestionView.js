import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Grid, Row, Button, Text, Slider } from 'react-native-elements'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

class SelectionList extends React.Component {
    
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

  static propTypes = {
    type: React.PropTypes.string.isRequired,
    values: React.PropTypes.object.isRequired
  };

  render() {
    
    const type = this.props.type;
    const values = this.props.values || {};

    if (type === 'slider') {
      const { min, max } = values;
      return (
        <Slider minimumValue={min} maximumVaue={max} />
      );
    } else if (type === 'select') {
      return (
        <SelectionList values={values} />
      );
    }
  }

}

export default class QuestionView extends React.Component {

  render() {
    return (
      <View>
        <Grid>
          <Row size={30}>
            <Text h1>{this.props.label}</Text>
          </Row>
          <Row size={70}>
            <Choice type={this.props.type} values={this.props.values} />
          </Row>
        </Grid>
      </View>
    );
  }

}
