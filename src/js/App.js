import React, { Component } from 'react';
import { Navigator } from 'react-native';
import SplashPage from './pages/SplashPage';
import LoginPage from './pages/LoginPage';

export default class App extends React.Component {

  renderScene(route, navigator) {
    var routeId = route.id;
    if (routeId === 'SplashPage') {
      return <SplashPage navigator={navigator} />
    } else if (routeId === 'LoginPage') {
      return <LoginPage navigator={navigator} />
    }
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