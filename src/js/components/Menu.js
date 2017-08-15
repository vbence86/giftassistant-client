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
    this.toggleSideMenu = this.toggleSideMenu.bind(this);
    this.onSideMenuChange = this.onSideMenuChange.bind(this);
    this.goStraightToFavouritesPages = this.goStraightToFavouritesPages.bind(this);
  }


  toggleSideMenu() {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }
  
  onSideMenuChange(isOpen) {
    this.setState({
      isOpen: isOpen
    })
  }

  getDataModel() {

    return [
      {
        title: 'New Gift',
        subtitle: 'Create a new session to find awesome gifts',
        leftIcon: {
          type: 'font-awesome',
          name: 'repeat'
        },
        onPress: () => this.goToPersonalQuestionsPage()
      },
      {
        title: 'Trolley',
        subtitle: 'Browse items you have added to the Trolley',
        leftIcon: {
          type: 'font-awesome',
          name: 'shopping-cart'
        },
        onPress: () => this.goToFavouritesPages()
      },
      {
        title: 'Settings',
        subtitle: 'Change your personal settings',
        leftIcon: {
          type: 'font-awesome',
          name: 'cog'
        },
        onPress: () => this.goToSettingsPages()
      },      
    ];

  }

  goToFavouritesPages() {
    this.toggleSideMenu();
    this.props.navigator.push({
      id: 'FavouritesPage'
    });
  }

  goStraightToFavouritesPages() {
    this.props.navigator.push({
      id: 'FavouritesPage'
    });
  }

  goToSettingsPages() {
    this.toggleSideMenu();
    this.props.navigator.push({
      id: 'SettingsPage'
    });
  }  

  goToPersonalQuestionsPage() {
    this.toggleSideMenu();
    this.props.navigator.resetTo({
      id: 'PersonalQuestionsPage',
      reset: true
    });
  }

  render() {
    return (
      <SideMenu 
        onChange={this.onSideMenuChange} 
        isOpen={this.state.isOpen} 
        menu={this.getSideMenu()}>
        <MenuButton onMenuButton={this.toggleSideMenu} onTrolleyButton={this.goStraightToFavouritesPages}/>
        {this.props.page}
      </SideMenu>
    )
  }

  getSideMenu() {
    return (
      <View style={{flex: 1, backgroundColor: '#f2f2f2', paddingTop: 50, margin: 0}}>
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

}

export default Menu;
