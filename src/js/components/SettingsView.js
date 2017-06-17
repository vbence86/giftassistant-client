import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import Svg, { LinearGradient, Rect, Defs, Stop } from 'react-native-svg';
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
  list: {
    backgroundColor: '#fff'
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
    this.onValueChange = this.onValueChange.bind(this);
  }

  onValueChange() {
    
  }

  render() {

    if (!this.props.favourites) return null;
    
    return (
      <View style={styles.container}>
        <Svg style={styles.svg}>
          <Defs> 
            <LinearGradient id="lgrad" x1="0%" y1="100%" x2="100%" y2="0%" > 
              <Stop offset="0" stopColor="rgb(255, 255, 255)" stopOpacity="1" />
              <Stop offset="1" stopColor="rgb(156, 199, 255)" stopOpacity="1" />
            </LinearGradient> 
          </Defs>
          <Rect x="0" y="0" width="100%" height="100%" fill="url(#lgrad)"/>
        </Svg>
        <View style={styles.navigatorContainer}>
          <BackButton onPress={this.props.onBack} />
        </View>      
        <View style={{backgroundColor:'#EFEFF4',flex:1}}>
          <SettingsList borderColor='#c8c7cc' defaultItemSize={50}>
            <SettingsList.Header headerStyle={{marginTop:15}}/>
            <SettingsList.Item
              icon={<Image style={styles.imageStyle} source={require('./images/airplane.png')}/>}
              hasSwitch={true}
              switchState={this.props.switchValue}
              switchOnValueChange={this.onValueChange}
              hasNavArrow={false}
              title="Airplane Mode" />
          </SettingsList>
        </View>
      </View>
    );
  }

}
