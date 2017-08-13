import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Icon } from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  touchable: {
    position: 'absolute',
    left: 10,
    top: 20,
    width: 100,
    height: 50,
    alignItems: 'flex-start',
  },
  title: {
    color: '#007aff',
    marginLeft: 10,
  },
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
      <TouchableOpacity onPress={this.handlePress} style={styles.touchable}>
        <View style={styles.container}>
          <Icon name='chevron-left' type='font-awesome' color='#007aff' />
          <Text style={styles.title}>Back</Text>
        </View>    
      </TouchableOpacity>
    );
  }
}
