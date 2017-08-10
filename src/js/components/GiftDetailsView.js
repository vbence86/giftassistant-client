import React, { Component } from 'react';
import { StyleSheet, View, Image, Animated } from 'react-native';
import { Grid, Row, Column, Button, Text } from 'react-native-elements';
import StarRating from 'react-native-star-rating';
import BackButton from './BackButton';

const FONT_SIZE_DEFAULT = 30;
const FONT_SIZE_SMALL = 20;

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
    width: '100%',
    height: '30%',
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'     
  },
  buttonSmall: {
    width: '40%',
    height: '50%',
    margin: '5%',
    backgroundColor: '#397af8',
    borderRadius: 5,
  },  
  contentContainer: {
    width: '100%',
    height: '70%',
    flexDirection: 'row'
  },
  imageContainer: {
    width: '48%',
    height: '60%',
    marginLeft: '2%',
    marginTop: '2%',
  },
  textContainer: {
    width: '46%',
    height: '80%',
    marginLeft: '2%',
    marginTop: '2%',
    marginRight: '2%',
    marginBottom: '2%',
  },
  textHeader: {
    fontSize: 18,
    textAlign: 'justify'
  },
  textDescription: {
    marginTop: 20,
    fontSize: 13,
    textAlign: 'justify',
    color: '#333'
  },  
  textRatingContainer: {
    width: 100,
    marginTop: 10,
  },  
  textPriceContainer: {
    width: '100%',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  textPrice: {
    color: 'red',
    fontSize: 25,
  },
  image: {
    width: '100%',
    minHeight: '100%',
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
    marginTop: 15,
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },  
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
        <View style={styles.contentContainer}>
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
                starSize={20}
              />
            </View>
            <View style={styles.textPriceContainer}>
              <Text style={styles.textPrice}>{this.data.formattedPrice}</Text>
            </View>
            <View style={styles.textDescriptionContanier}>
              <Text style={styles.textDescription}>{this.data.description}</Text>
            </View>
          </View>
        </View>
        <View style={styles.ctaContainer}>
          <Button fontSize={FONT_SIZE_SMALL} buttonStyle={styles.buttonSmall} title="Remove" onPress={this.props.onRemove} raised large/>
          <Button fontSize={FONT_SIZE_SMALL} buttonStyle={styles.buttonSmall} title="Buy" onPress={this.props.onBuy} raised large/>
        </View>
      </View>
    );
  }

}
