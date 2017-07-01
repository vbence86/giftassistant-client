import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Icon } from 'react-native-elements';

const styles = StyleSheet.create({
  button: {
    width: '100%',
    margin: 5,
    alignItems: 'flex-start',    
  }
});

export default class BackButton extends Component {

  constructor(props) {
    super(props);
    this.handlePress = this.handlePress.bind(this);
  }

  handlePress(e) {
    if (this.props.onPress) {
      this.props.onPress(e);
    }
  }

  render() {
    return (
      <TouchableOpacity onPress={this.handlePress} style={styles.button} >
        <Text>{this.props.children}</Text>
        <Icon name='chevron-left' type='font-awesome' color='#777' />    
      </TouchableOpacity>
    );
  }
}
