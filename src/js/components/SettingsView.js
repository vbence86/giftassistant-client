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
  listHeader: {
    borderBottomWidth: 1, 
    backgroundColor: '#f7f7f8',
    borderColor: '#c8c7cc'
  },
  listHeaderText: {
    alignSelf: 'center',
    marginTop: 15,
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },  
  svg: { 
    position: 'absolute', 
    zIndex: 0, 
    left: 0, 
    top: 0, 
    width: '100%', 
    height: '100%' 
  }
});

export default class SettingsView extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.navigatorContainer}>
          <BackButton onPress={this.props.onBack} />
        </View>      
        <View style={{backgroundColor:'#EFEFF4',flex:1}}>
          <View style={styles.listHeader}>
            <Text style={styles.listHeaderText}>Settings</Text>
          </View>        
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
        </View>
      </View>
    );
  }

}
