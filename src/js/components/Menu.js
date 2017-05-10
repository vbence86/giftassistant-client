import React, { Component } from 'react';
import { View } from 'react-native';
import { SideMenu, List, ListItem } from 'react-native-elements';
import MenuButton from './MenuButton';

class Menu extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      isOpen: false
    }
    this.toggleSideMenu = this.toggleSideMenu.bind(this)
  }

  toggleSideMenu () {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  getDataModel() {

    return [
      {
        title: 'Favourites',
        subtitle: 'Browse your previously liked items',
        leftIcon: {
          type: 'font-awesome',
          name: 'gift'
        },
        onPress: () => this.goToFavouritesPages()
      }
    ];

  }

  getSideMenu() {
    return (
      <View style={{flex: 1, backgroundColor: '#ededed', paddingTop: 50}}>
        <List containerStyle={{marginBottom: 20}}>
        {
          this.getDataModel().map((l, i) => (
            <ListItem roundAvatar key={i} {...l} />
          ))
        }
        </List>
      </View>
    );
  }

  goToFavouritesPages() {
    this.props.navigator.push({
      id: 'FavouritesPage',
      name: 'FavouritesPage'
    });
  }

  render() {
    return (
      <SideMenu isOpen={this.state.isOpen} menu={this.getSideMenu()}>
        <MenuButton onPress={() => this.toggleSideMenu()} />
        {this.props.page}
      </SideMenu>
    )
  }
}

export default Menu;
