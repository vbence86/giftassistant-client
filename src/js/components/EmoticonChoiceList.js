import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Grid, Col, Icon } from 'react-native-elements'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default class EmoticonChoiceList extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Grid>
          <Col><Icon name="close" size={60} color="#FF4200" type="font-awesome" reverse raised onPress={this.handleClick.bind(this, 0)} /></Col>
          <Col><Icon name="check" size={60} color="#72D33E" type="font-awesome" reverse raised onPress={this.handleClick.bind(this, 1)} /></Col>
        </Grid>
      </View>
    );
  }

  handleClick(answer) {
    this.props.onAnswer(answer);
  }

}
