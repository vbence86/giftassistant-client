import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import SettingsView from '../components/SettingsView';
import Settings from '../helpers/Settings';

const conf = require('../../../package.json');
const SETTINGS_NOTIFICATIONS = 'notifications';
const SETTINGS_VERSION = 'version';

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
    this.onSetNotifications = this.onSetNotifications.bind(this);

    this.settings = Settings.getInstance();
  }

  componentDidMount() {
    this.settings
      .syncFromLocalStorage()
      .then(this.updateSettings.bind(this));
  }

  updateSettings() {
    const settings = this.settings.get();
    const defaultProps = {
      version: conf.version,
    };
    this.setState({...settings, ...defaultProps});
  }

  onSetNotifications() {
    const notifications = !!this.settings.get(SETTINGS_NOTIFICATIONS);
    this.settings.set(SETTINGS_NOTIFICATIONS, !notifications);
    this.updateSettings();
  } 

  onBack() {
    this.props.navigator.pop({
      closeMenu: true
    });
  } 

  render() {
    return (
      <View style={styles.container}>
        <SettingsView {...this.state} 
          onBack={this.onBack} 
          onSetNotifications={this.onSetNotifications}/>
      </View>
    );
  }

}
