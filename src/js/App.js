import React, { Component } from 'react';
import { Navigator, View } from 'react-native';
import Menu from './components/Menu';
import SplashPage from './pages/SplashPage';
import LoginPage from './pages/LoginPage';
import PersonalQuestionsPage from './pages/PersonalQuestionsPage';
import GiftCategoryPage from './pages/GiftCategoryPage';
import GiftResultPage from './pages/GiftResultPage';
import GiftDetailsPage from './pages/GiftDetailsPage';
import FavouritesPage from './pages/FavouritesPage';

export default class App extends React.Component {

  constructor(props) {
    super(props);
  }

  updateScene(route, navigator) {
    const routeId = route.id;
    if (routeId === 'SplashPage') {
      return <SplashPage navigator={navigator} />
    } else if (routeId === 'LoginPage') {
      return <LoginPage navigator={navigator} />
    } else if (routeId === 'PersonalQuestionsPage') {
      page = <PersonalQuestionsPage reset={route.reset} navigator={navigator} />
    } else if (routeId === 'GiftCategoryPage') {
      page = <GiftCategoryPage navigator={navigator} />
    } else if (routeId === 'GiftResultPage') {
      page = <GiftResultPage navigator={navigator} />
    } else if (routeId === 'GiftDetailsPage') {
      return <GiftDetailsPage navigator={navigator} data={route.data} index={route.index} />
    } else if (routeId === 'FavouritesPage') {
      return <FavouritesPage navigator={navigator} />
    }
    return <Menu page={page} navigator={navigator} closeMenu={route.closeMenu}/>
  }

  render () {
    return (
      <Navigator
            initialRoute={{id: 'SplashPage', name: 'Index'}}
            renderScene={this.updateScene.bind(this)}
            configureScene={(route) => {
        if (route.sceneConfig) {
          return route.sceneConfig;
        }
        return Navigator.SceneConfigs.HorizontalSwipeJump;
      }}/>
    );
  }
}
