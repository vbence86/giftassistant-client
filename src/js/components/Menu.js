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
        name: 'Menu 1',
        subtitle: 'Menu 1 subtitle',
        avatar_url: 'https://cdn1.iconfinder.com/data/icons/DarkGlass_Reworked/128x128/apps/package_favourite.png'
      },
      {
        name: 'Menu 2',
        subtitle: 'Menu 2 subtitle',
        avatar_url: 'https://cdn1.iconfinder.com/data/icons/DarkGlass_Reworked/128x128/apps/package_favourite.png'
      },
      {
        name: 'Menu 3',
        subtitle: 'Menu 3 subtitle',
        avatar_url: 'https://cdn1.iconfinder.com/data/icons/DarkGlass_Reworked/128x128/apps/package_favourite.png'
      }
    ];

  }

  getSideMenu() {
    return (
      <View style={{flex: 1, backgroundColor: '#ededed', paddingTop: 50}}>
        <List containerStyle={{marginBottom: 20}}>
        {
          this.getDataModel().map((l, i) => (
            <ListItem
              roundAvatar
              onPress={() => console.log('Pressed')}
              avatar={l.avatar_url}
              key={i}
              title={l.name}
              subtitle={l.subtitle}
            />
          ))
        }
        </List>
      </View>
    );
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
