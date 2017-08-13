import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Icon } from 'react-native-elements'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    alignItems: 'flex-start',
    marginTop: 0,
    backgroundColor: '#f2f2f2'
  },
  button: {
    marginTop: 15,
    marginLeft: 10,
  }
});

export default class MenuButton extends Component {

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
      <TouchableOpacity style={styles.container} onPress={this.handlePress}>
        <Icon 
          name="bars"
          type="font-awesome"
          size={32}
          iconStyle={styles.button} />
        <Text>{this.props.children}</Text>
      </TouchableOpacity>
    );
  }
}
