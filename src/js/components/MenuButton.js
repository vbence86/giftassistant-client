import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text } from 'react-native';
import { Icon } from 'react-native-elements'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    alignItems: 'flex-start',
    marginTop: 0,
    backgroundColor: '#f2fff2'
  },
  button: {
    margin: 10
  }
});

export default class MenuButton extends Component {

  handlePress(e) {
    if (this.props.onPress) {
      this.props.onPress(e);
    }
  }

  render() {
    return (
      <View style={styles.container} >
        <Icon 
          name="bars"
          type="font-awesome"
          size={32}
          iconStyle={styles.button}
          onPress={this.handlePress.bind(this)} />
        <Text>{this.props.children}</Text>
      </View>
    );
  }
}
