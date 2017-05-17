import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Icon } from 'react-native-elements';

const styles = StyleSheet.create({
  button: {
    margin: 5
  }
});

export default class BackButton extends Component {

  handlePress(e) {
    if (this.props.onPress) {
      this.props.onPress(e);
    }
  }

  render() {
    return (
      <View style={styles.button} >
        <TouchableOpacity onPress={this.handlePress.bind(this)} style={this.props.style}>
          <Text>{this.props.children}</Text>
          <Icon name='chevron-left' type='font-awesome' color='#777' />    
        </TouchableOpacity>
      </View>
    );
  }
}
