import React, { Component } from 'react';
import { Button, Slider } from 'react-native-elements'

class SelectionList extends React.Component {
    
    render() {
        const selection = [];
        Object.keys(this.props.values).forEach((key) => {
            const value = this.props.values[key];
            selection.push(<Button title={value} />);
        });
        return selection;
    };

}

class Choice extends React.Component {

    render() {
        if (this.props.input === 'slider') {
            return (
                <Slider {...this.props} />
            );
        } else if (this.props.input === 'select') {
            return (
                <SelectionList {...this.props} />
            );
        }
    }

}

export default class QuestionView extends React.Component {

  render() {
    return (
      <div>  
        
      </div>
    );
  }

}
