import React, { Component } from 'react';
import { StyleSheet, View, Image, Animated } from 'react-native';
import { Grid, Row, Button, Text } from 'react-native-elements';
import Svg, { LinearGradient, Rect, Defs, Stop } from 'react-native-svg';

const FONT_SIZE_DEFAULT = 30;
const FONT_SIZE_SMALL = 20;

const styles = StyleSheet.create({
  header: {
    width: '100%',
    marginTop: '5%',
    textAlign: 'center',
    fontSize: FONT_SIZE_DEFAULT
  },
  price: {
    width: '100%',
    marginTop: '5%',
    textAlign: 'center',
    fontSize: FONT_SIZE_SMALL
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    margin: 0,
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  svg: { 
    position: 'absolute', 
    zIndex: 0, 
    left: 0, 
    top: 0, 
    width: '100%', 
    height: '100%' 
  },
  image: {
    width: 200,
    height: 200
  }
});

export default class GiftDetailsView extends React.Component {

  constructor(props) {
    super(props);
  }
 

  render() {
    if (!this.props) {
      return null;
    }

    return (
      <View>
        <Svg style={styles.svg}>
          <Defs> 
            <LinearGradient id="lgrad" x1="0%" y1="100%" x2="100%" y2="0%" > 
              <Stop offset="0" stopColor="rgb(255, 255, 255)" stopOpacity="1" />
              <Stop offset="1" stopColor="rgb(156, 199, 255)" stopOpacity="1" />
            </LinearGradient> 
          </Defs>
          <Rect x="0" y="0" width="100%" height="100%" fill="url(#lgrad)"/>
        </Svg>      
        <View style={styles.container}>
        <Grid>
            <Row size={20}>
            <Text style={styles.header} h3>{this.props.label}</Text>
            </Row>
            <Row size={40}>
            <Image style={styles.image} source={{uri: this.props.largeImageURL}} />
            </Row>
            <Row size={10}>
            <Text style={styles.price} h3>{this.props.formattedPrice}</Text>
            </Row>
            <Row size={30}>
            <EmoticonChoiceList onAnswer={this.onAnswer}/>
            </Row>
        </Grid>
        </View>
      </View>
    );
  }

}
