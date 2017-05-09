import React, { Component } from 'react';
import FavouritesView from '../components/FavouritesView';
import Favourites from '../helpers/Favourites';

export default class FavouritesPage extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.setState({
      favourites: Favourites.getInstance().get()
    });
  }


  navigateToGiftResultPage() {
    this.props.navigator.push({
      id: 'GiftResultPage',
      name: 'GiftResultPage'
    });
  }

  render() {
    
    return (
      <FavouritesView {...this.state} />
    );

  }

}
