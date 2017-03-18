import React, { Component } from 'react';
import { Navigator, View } from 'react-native';
import { SideMenu, List, ListItem } from 'react-native-elements';
import SplashPage from './pages/SplashPage';
import PersonalQuestionsPage from './pages/PersonalQuestionsPage';
import LoginPage from './pages/LoginPage';

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
        menu={this.getSideMenu}>
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
