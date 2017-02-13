import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default class DialogPage extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Button title='Guest mode' icon={{ name: 'face' }} large raised />
      </View>
    );
  }

}
