import React, { Component } from 'react';
import { StyleSheet, View, TouchableHighlight, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default class SplashPage extends React.Component {

  _navigate(property){
    this.props.navigator.push({
      name: 'LoginPage',
      passProps: {
        name: property
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={ () => this._navigate() }>
          <Text>Login</Text>
        </TouchableHighlight>      
      </View>
    );
  }

}
