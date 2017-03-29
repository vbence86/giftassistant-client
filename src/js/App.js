import React, { Component } from 'react';
import { Navigator, View } from 'react-native';
import { SideMenu, List, ListItem } from 'react-native-elements';
import SplashPage from './pages/SplashPage';
import PersonalQuestionsPage from './pages/PersonalQuestionsPage';
import LoginPage from './pages/LoginPage';
import GiftCategoryPage from './pages/GiftCategoryPage';
import GiftResultPage from './pages/GiftResultPage';
import MenuButton from './components/MenuButton';

export default class App extends React.Component {

  constructor () {
    super()
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

  getSideMenu() {

    list = [
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

    return (
      <View style={{flex: 1, backgroundColor: '#ededed', paddingTop: 50}}>
        <List containerStyle={{marginBottom: 20}}>
        {
          list.map((l, i) => (
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

  renderPageWithSideMenu(page) {
    return (
      <SideMenu
        isOpen={this.state.isOpen}
        menu={this.getSideMenu()}>
        <MenuButton onPress={() => this.toggleSideMenu()} />
        {page}
      </SideMenu>
    )
  }  

  renderScene(route, navigator) {
    const routeId = route.id;
    if (routeId === 'SplashPage') {
      return <SplashPage navigator={navigator} />
    } else if (routeId === 'PersonalQuestionsPage') {
      page = <PersonalQuestionsPage navigator={navigator} />
    } else if (routeId === 'GiftCategoryPage') {
      page = <GiftCategoryPage navigator={navigator} />
    } else if (routeId === 'GiftResultPage') {
      page = <GiftResultPage navigator={navigator} />
    }
    return this.renderPageWithSideMenu(page);
  }

  render () {
    return (
      <Navigator
            initialRoute={{id: 'SplashPage', name: 'Index'}}
            renderScene={this.renderScene.bind(this)}
            configureScene={(route) => {
        if (route.sceneConfig) {
          return route.sceneConfig;
        }
        return Navigator.SceneConfigs.HorizontalSwipeJump;
      }}/>
    );
  }
}
