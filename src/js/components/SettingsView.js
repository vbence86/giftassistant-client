import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, Image } from 'react-native';
import SettingsList from 'react-native-settings-list';
import BackButton from './BackButton';

const FONT_SIZE_DEFAULT = 30;
const FONT_SIZE_SMALL = 20;

const styles = StyleSheet.create({
  navigatorContainer: {
    width: '100%', 
    height: 50,
    alignItems: 'flex-start',
    backgroundColor: '#f2f2f2', 
  },
  container: {
    width: '100%',
    height: '100%',
    padding: 0
  },
  header: {
    alignItems: 'center',
    fontSize: FONT_SIZE_SMALL,
    marginTop: 15,
    marginBottom: 15
  },
  list: {
    backgroundColor: '#fff'
  },
  MenuHeaderText: {
    alignSelf: 'center',
    marginTop: 15,
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },  
});

export default class SettingsView extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const version = this.props.version || '1.0.0';
    return (
      <View style={styles.container}>
        <View style={styles.navigatorContainer}>
          <BackButton onPress={this.props.onBack} />
          <Text style={styles.MenuHeaderText}>Settings</Text>
        </View>      
        <View style={{backgroundColor:'#EFEFF4',flex:1}}>     
          <SettingsList borderColor='#c8c7cc' defaultItemSize={50}>
            <SettingsList.Header headerStyle={styles.header} headerText="Basic" />
            <SettingsList.Item
              icon={<Image style={styles.imageStyle} source={require('../../../resources/img/notifications.png')}/>}
              hasSwitch={true}
              switchState={this.props.notifications}
              switchOnValueChange={this.props.onSetNotifications}
              hasNavArrow={false}
              title="Notifications" />
          </SettingsList>
          <SettingsList.Item
              icon={<Image style={styles.imageStyle} source={require('../../../resources/img/notifications.png')}/>}
              hasSwitch={false}
              hasNavArrow={false}
              title={`Version ${version}`} />
          </SettingsList>          
        </View>
      </View>
    );
  }

}
