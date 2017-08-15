import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Animated, Easing } from 'react-native';
import { Icon } from 'react-native-elements';
import IconBadge from 'react-native-icon-badge';
import Favourites from '../helpers/Favourites';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    backgroundColor: '#efefef',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,    
  },
});

export default class MenuButton extends Component {

  constructor(props) {
    super(props);
      
    this.state = {
      trolleyCount: 0,
    };

    this.favourites = Favourites.getInstance();
    this.favourites.on('update', this.updateTrolleyIcon.bind(this));
    
    this.onMenuButton = this.onMenuButton.bind(this);
    this.onTrolleyButton = this.onTrolleyButton.bind(this);

    this.animValue = new Animated.Value(1);
  }

  componentDidMount() {
    this.updateTrolleyIcon(this.favourites.get().length);
  }

  updateTrolleyIcon(count) {
    this.setState({
      trolleyCount: count,
    });
    this.animateTrolley();
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

  animateTrolley() {
    this.animValue.setValue(0.5);
    Animated.spring(
      this.animValue,
      {
        toValue: 1,
        friction: 7,
        tension: 40
      }
    ).start();
  }

  render() {

    const scale = this.animValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1]
    });

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.iconContainer} onPress={this.onMenuButton}>
          <Icon 
            name="bars"
            type="font-awesome"
            size={32}
            iconStyle={styles.icon} />
          <Text>{this.props.children}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer} onPress={this.onTrolleyButton}>
          <Animated.View style={{ transform: [{ scale }]  }}>
            <IconBadge
              MainElement={
                <Icon 
                  name="shopping-cart"
                  type="font-awesome"
                  size={32}
                  iconStyle={styles.icon} />
              }
              BadgeElement={
                <Text style={{color:'white'}}>{this.state.trolleyCount}</Text>
              }
              IconBadgeStyle={
                {width:20,
                height:20,
                top: 5,
                backgroundColor: 'red'}
              }
              Hidden={!this.state.trolleyCount}
            />
          </Animated.View>
        </TouchableOpacity>
      </View>
    );
  }
}
