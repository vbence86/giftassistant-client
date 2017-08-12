import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, Image } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import StarRating from 'react-native-star-rating';
import BackButton from './BackButton';

const FONT_SIZE_DEFAULT = 30;
const FONT_SIZE_SMALL = 20;

const styles = StyleSheet.create({
  navigatorContainer: {
    position: 'relative',
    width: '100%',
    height: 50,
    backgroundColor: '#f2f2f2', 
  },
  container: {
    width: '100%',
    height: '100%',
    padding: 0
  },
  list: {
    backgroundColor: '#fff'
  },
  MenuHeaderText: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  subtitleContainer: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 10,
  },
  subtitleView: {
    flexDirection: 'column',
    paddingLeft: 10,
    paddingTop: 5,
  },
  subtitleText: {
    fontSize: 12,
    color: 'red',
  },
  starContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  ratingText: {
    paddingLeft: 5,
    fontSize: 9,
    color: '#aaa',
  },
  image: {
    width: 100,
    height: 100,
  }  
});

// <Image style={styles.image} source={{uri: data.largeImageURL}} />

export default class FavouritesView extends React.Component {

  renderRow (data, idx) {
    return (
      <ListItem
        key={idx}
        subtitle={
          <View style={styles.subtitleContainer}>
            <Image style={styles.image} source={{uri: data.largeImageURL}} />
            <View style={styles.subtitleView}>
              <Text style={styles.titleText}>{data.label}</Text>
              <Text style={styles.subtitleText}>{data.formattedPrice}</Text>
              <View style={styles.starContainer}>
                <StarRating
                  disabled={true}
                  emptyStar={'star-o'}
                  fullStar={'star'}
                  halfStar={'star-half-empty'}
                  iconSet={'FontAwesome'}
                  maxStars={5}
                  rating={4.5}
                  starColor={'#ffc200'}
                  starSize={10}
                />
                <Text style={styles.ratingText}>(38)</Text>
              </View>
            </View>
          </View>          
        }
        onPress={() => {
          this.props.onSelect(data, idx);
        }}
      />
    )
  }

  render() {

    return (
      <View style={styles.container}>
        <View style={styles.navigatorContainer}>
          <BackButton onPress={this.props.onBack} />
          <Text style={styles.MenuHeaderText}>Favourites</Text>
        </View>
        {this.renderFavouritesList()}
      </View>
    );
  }

  renderFavouritesList() {
    if (!this.props.favourites) return null;
    return (
      <ScrollView contentContainerStyle={styles.list}>
        {this.props.favourites.map((data, idx) => this.renderRow(data, idx))}
      </ScrollView>
    );
  }

}
