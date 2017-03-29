import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Grid, Row, Button, Text } from 'react-native-elements';
import EmoticonChoiceList from './EmoticonChoiceList';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    marginLeft: 15,
    marginRight: 15,
  },
  image: {
    width: 200,
    height: 200
  }
});

export default class GiftResultView extends React.Component {

  render() {
    if (!this.props) {
      return null;
    }
    return (
      <View style={styles.container}>
        <Grid>
          <Row size={20}>
            <Text h3>{this.props.label}</Text>
          </Row>
          <Row size={40}>
            <Image style={styles.image} source={{uri: this.props.largeImageURL}} />
          </Row>
          <Row size={10}>
            <Text h3>{this.props.formattedPrice}</Text>
          </Row>
          <Row size={30}>
            <EmoticonChoiceList onAnswer={this.props.onAnswer}/>
          </Row>
        </Grid>
      </View>
    );
  }

}
