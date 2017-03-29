import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
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
  header: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 15,
  }
});

export default class GiftCategoryView extends React.Component {

  render() {
    if (!this.props) {
      return null;
    }
    return (
      <View style={styles.container}>
        <Grid>
          <Row size={30}>
            <Text h3>What does the person like?</Text>
          </Row>
          <Row size={40}>
            <Text h2>{this.props.name}</Text>
          </Row>
          <Row size={30}>
            <EmoticonChoiceList onAnswer={this.props.onAnswer}/>
          </Row>
        </Grid>
      </View>
    );
  }

}
