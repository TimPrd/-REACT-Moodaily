import * as React from 'react';
import {
  View,
  Animated,
  TouchableOpacity,
  StyleSheet,
  Text
} from 'react-native';
import { TabViewAnimated, SceneMap } from 'react-native-tab-view';
//import { Constants } from 'expo';
import {StatusBar} from 'react-native';
import ListScreen from './ListScreen'
//import AreaChartExample from './AreaScreen'


const SecondRoute = () => (
  <View style={[styles.container, { backgroundColor: 'deeppink' }]}>
    <Text>Created by Timothé PARDIEU et Gabin FIQUET</Text>
  </View>
);

export default class TabViewExample extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'first', title: 'First' },
      { key: 'second', title: 'Second' },
    ],
  };

  _handleIndexChange = index => {this.setState({ index }); this.forceUpdate();};

  _renderHeader = props => {
    const inputRange = props.navigationState.routes.map((x, i) => i);

    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          const color = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map(
              inputIndex => (inputIndex === i ? '#D6356C' : '#222')
            ),
          });
          return (
            <TouchableOpacity
              style={styles.tabItem}
              onPress={() => this.setState({ index: i })}>
              <Animated.Text style={{ color }}>{route.title}</Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  _renderScene = SceneMap({
    first: ListScreen,
    second: SecondRoute,
  });

  render() {
    return (
      <TabViewAnimated
        navigationState={this.state}
        renderScene={this._renderScene}
        renderHeader={this._renderHeader}
        onIndexChange={this._handleIndexChange}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    paddingTop: StatusBar.currentHeight,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
});
