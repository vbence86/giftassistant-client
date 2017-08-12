import React, { Component } from 'react';
import { StyleSheet, View, Image, Animated, ScrollView } from 'react-native';
import { Grid, Row, Column, Button, Text, Divider } from 'react-native-elements';
import StarRating from 'react-native-star-rating';
import BackButton from './BackButton';

const FONT_SIZE_DEFAULT = 30;
const FONT_SIZE_SMALL = 20;
const FONT_SIZE_BUTTON = 12;

const styles = StyleSheet.create({
  navigatorContainer: {
    width: '100%', 
    height: 50,
    alignItems: 'flex-start',
    backgroundColor: '#f2f2f2', 
  },
  container: {
    width: '100%',
    height: '100%',
    padding: 0,
    margin: 0,
    alignItems: 'center',
    justifyContent: 'center'    
  },  
  ctaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'     
  },
  button: {
    width: '40%',
    height: 50,
    backgroundColor: '#007aff',
    borderRadius: 10,
  },
  buttonInverse: {
    width: '40%',
    height: '50%',
    margin: '5%',
    backgroundColor: 'red',
    borderRadius: 10,
  },
  contentContainer: {
    width: '100%',
    height: '150%',
  },
  imageContainer: {
    marginTop: 10,
    marginLeft: '25%',
    marginRight: '25%',
    maxHeight: 200,
  },
  textContainer: {
    marginLeft: '2%',
    marginTop: '2%',
    marginRight: '2%',
    marginBottom: '2%',
  },
  textHeader: {
    color: '#333',
    fontSize: 18,
    textAlign: 'center',
  },
  textDescription: {
    color: '#333',    
    marginTop: 10,
    fontSize: 13,
    textAlign: 'justify',
    lineHeight: 20,
  },  
  textRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 10,
  },
  textRatingCount: {
    paddingLeft: 5,
    fontSize: 9,
    color: '#aaa',
  },
  textPriceContainer: {
    width: '100%',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  image: {
    width: '100%',
    height: '100%',
    maxHeight: 300,
  },
  priceLabelText: {
    width: '100%',
    margin: 5,
    textAlign: 'center',
    color: 'white',
    fontSize: FONT_SIZE_SMALL    
  },
  MenuHeaderText: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
  divider: {
    backgroundColor: '#aaa',
  }  
});

export default class GiftDetailsView extends React.Component {

  constructor(props) {
    super(props);
    this.data = this.props.data;
  }

  render() {

    if (!this.props.data) {
      return null;
    }

    return (
      <View style={styles.container}>
        <View style={styles.navigatorContainer}>
          <BackButton onPress={this.props.onBack} />
          <Text style={styles.MenuHeaderText}>{this.data.label}</Text>
        </View>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{uri: this.data.largeImageURL}} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.textHeader}>{this.data.label}</Text>
            <View style={styles.textRatingContainer}>
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
              <Text style={styles.textRatingCount}>(38)</Text>
            </View>
            <View style={styles.ctaContainer}>
              <Button fontSize={FONT_SIZE_BUTTON} fontWeight='bold' buttonStyle={styles.button} title={`Buy for ${this.data.formattedPrice} on Amazon`} onPress={this.props.onBuy} large/>
              <Button fontSize={FONT_SIZE_BUTTON} buttonStyle={styles.buttonInverse} title="Remove" onPress={this.props.onRemove} large/>
            </View> 
            <Divider style={styles.divider} />           
            <View style={styles.textDescriptionContanier}>
              <Text style={styles.textDescription}>{this.data.description}</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

}
