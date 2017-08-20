import React, { Component } from 'react';
import { StyleSheet, View, Animated, Easing } from 'react-native';
import { Grid, Row, Button, Text } from 'react-native-elements';
import EmoticonChoiceList from './EmoticonChoiceList';

const FONT_SIZE_DEFAULT = 16;
const FONT_SIZE_HEADER = 18;
const FONT_SIZE_SMALL = 20;
const FONT_SIZE_BUTTON = 14;
const FONT_SIZE_CATEGORY_BUTTON = 10;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    minWidth: '100%',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 0,
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryButtonFlagged: {
    width: 75,
    height:  50,
    margin: '2%',    
    backgroundColor: '#007aff',
    borderRadius: 10,
    alignSelf: 'center',  
    justifyContent: 'center',
  },
  categoryButton: {
    width: 75,
    height:  50,
    margin: '2%',    
    backgroundColor: '#a3a3a3',
    borderRadius: 10,
    alignSelf: 'center',  
    justifyContent: 'center',
  },   
  choiceListContainer: {
    position: 'absolute',
    height: 95,
    bottom: 0,
    right: 0,
  },
  button: {
    width: 120,
    margin: '5%',
    backgroundColor: '#007aff',
    borderRadius: 10,
  },
});


export default class GiftCategoryView extends React.Component {

  constructor(props) {
    super(props);
    this.animValue = new Animated.Value(1);
  }

  animate() {
    this.animValue.setValue(0);
    Animated.spring(
      this.animValue,
      {
        toValue: 1,
        friction: 7,
        tension: 40
      }
    ).start();
  }

  onPressCategoryButton(id) {
    if (!this.props.onFlagCategory) return;
    this.props.onFlagCategory({id, value: !this.props.answers[id]});
  }

  render() {
    if (!this.props) {
      return null;
    }

    const left = this.animValue.interpolate({
      inputRange: [0, 1],
      outputRange: [500, 0]
    });

    return (
      <View>
        <Animated.View style={{ left }}>
          <View style={styles.container}>
            {this.renderCategories()}
          </View>
        </Animated.View>
        <View style={styles.choiceListContainer}>                
          <Button onPress={this.props.onComplete} fontSize={FONT_SIZE_BUTTON} icon={{name: 'thumbs-o-up', type: 'font-awesome'}} fontWeight='bold' buttonStyle={styles.button} title="I'm done!" large/>            
        </View>
      </View>
    );
  }

  renderCategories() {
    const categories = this.props.categories;
    const answers = this.props.answers;
    if (!categories || !answers) return null;
    return categories.map(category => (
      <Button 
        fontSize={FONT_SIZE_CATEGORY_BUTTON} 
        buttonStyle={answers[category.id] ? styles.categoryButtonFlagged : styles.categoryButton} 
        title={category.categoryName} 
        key={category.id} 
        onPress={this.onPressCategoryButton.bind(this, category.id)}
        large />
    ));
  }

}
