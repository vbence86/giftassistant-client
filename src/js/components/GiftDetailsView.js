import React, { Component } from 'react';
import { StyleSheet, View, Image, Animated } from 'react-native';
import { Grid, Row, Column, Button, Text } from 'react-native-elements';
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 0,
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonSmall: {
    width: '40%',
    height: '20%',
    margin: '5%',
    backgroundColor: '#397af8',
    borderRadius: 5,
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
    this.data = this.props.data;
  }

  render() {

    if (!this.props.data) {
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
          <Grid style={{ width: '100%' }}>
              <Row size={20}>
                <Text style={styles.header} h3>{this.data.label}</Text>
              </Row>
              <Row size={40}>
                <Image style={styles.image} source={{uri: this.data.largeImageURL}} />
                <Text>description gfkglsdktr twetlekt gdfstorietoiw5 gflkgls</Text>
              </Row>
              <Row size={10}>
                <Text style={styles.price} h3>{this.data.formattedPrice}</Text>
              </Row>
              <Row size={30}>
                <View>
                  <Button fontSize={FONT_SIZE_SMALL} buttonStyle={styles.buttonSmall} title="Remove" onPress={this.props.onRemove} raised large/>
                  <Button fontSize={FONT_SIZE_SMALL} buttonStyle={styles.buttonSmall} title="Buy" onPress={this.props.onBuy} raised large/>
                </View>
              </Row>
          </Grid>
        </View>
      </View>
    );
  }

}
