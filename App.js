/**
 * - Entry point -
 * Serves our TabView component
 * @author Timothé PARDIEU, Gabin FIQUET
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import TabView from './components/TabView';

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
  
      <TabView />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
