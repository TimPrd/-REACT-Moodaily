import React from 'react';
import { View, Text, Button } from 'react-native';
import Database from './../mongo/storage';

class SecondPane extends React.Component {
  constructor(props) {
    super(props);
    this.db = new Database();
  }


  onPressDelete(){
    this.db._deleteAll();
  }
  render() {
   

    return (
        <View style={{flex:1}}>
        <Text>Created by Timothé PARDIEU et Gabin FIQUET</Text>

        <Button
        onPress={() =>this.onPressDelete()}
        title="DELETE DATA"
        color="red"
        accessibilityLabel="Delete all of your records"

      />
      </View>
    );
  }
}

export default SecondPane;
