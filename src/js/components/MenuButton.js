import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import IconBadge from 'react-native-icon-badge';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    backgroundColor: '#efefef',
  },
  menuContainer: {
    position: 'absolute',
    left: 0,
    width: '50%',
  },
  trolleyIconContainer: {
    position: 'absolute',
    right: 0,
    width: '50%',
  },
  button: {
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
  },     
});

export default class MenuButton extends Component {

  constructor(props) {
    super(props);
    this.onMenuButton = this.onMenuButton.bind(this);
    this.onTrolleyButton = this.onTrolleyButton.bind(this);
  }

  onMenuButton(e) {
    if (this.props.onMenuButton) {
      this.props.onMenuButton(e);
    }
  }

  onTrolleyButton(e) {
    if (this.props.onTrolleyButton) {
      this.props.onTrolleyButton(e);
    }
  }  

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.menuContainer} onPress={this.onMenuButton}>
          <Icon 
            name="bars"
            type="font-awesome"
            size={32}
            iconStyle={styles.button} />
          <Text>{this.props.children}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.trolleyIconContainer} onPress={this.onTrolleyButton}>
          <IconBadge
            MainElement={
              <Icon 
                name="shopping-cart"
                type="font-awesome"
                size={32}
                iconStyle={styles.button} />
            }
            BadgeElement={
              <Text style={{color:'white'}}>{this.props.trolleyCount}</Text>
            }
            IconBadgeStyle={
              {width:15,
              height:15,
              backgroundColor: 'red'}
            }
            Hidden={!this.props.trolleyCount}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
