import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import SettingsView from '../components/SettingsView';
import Settings from '../helpers/Settings';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default class SettingsPage extends React.Component {

  constructor(props) {
    super(props);
    this.onBack = this.onBack.bind(this);
  }

  componentWillMount() {
    this.setState(Settings.getInstance().get());
  }

  onBack() {
    this.navigateBack();
  }  

  navigateBack() {
    this.props.navigator.pop();
  }  

  render() {
    
    return (
      <View style={styles.container}>
        <SettingsView {...this.state} onBack={this.onBack} />
      </View>
    );

  }

}
