import React from 'react';
import { Text, View, Button } from 'react-native';
import { BarChart, XAxis } from 'react-native-svg-charts';
import Database from './../mongo/storage';
import * as scale from 'd3-scale';

class AreaChartExample extends React.Component {
  constructor(props) {
    super(props);
    this.db = new Database();
    this.dataset;
    this.state = {
      res: [50, 10, 40],
      labs: ['a', 'b', 'c'],
      colors: [
        'red',
        'blue',
        'lime',
        'deeppink',
        'deepskyblue',
        'orangered',
        'whitesmoke',
        'yellow',
        'teal',
        'violet',
      ],
      flag: false,
    };
  }

  async componentWillMount() {
      var data = await this.db._getAllByCounter();

      //console.log(data);
      //console.log(data.map(a => a.counter));
      if (data.length != 0) {
        this.setState({
          res: data.map(a => a.counter),
          labs: data.map(a => a.emoji),
        });
      }
  }

  render() {
    const data = [
      50,
      10,
      40,
      95,
      -4,
      -24,
      85,
      91,
      35,
      53,
      -53,
      24,
      50,
      -20,
      -80,
    ];

    return (
      <View style={{ height: 200, padding: 20 }}>
        {this.state.labs.map((emot, index) => (
          <Text style={{ color: this.state.colors[index] }}>
            {' '}{emot} N° {index + 1} : {this.state.res[index]}{' '}
          </Text>
        ))}

        <BarChart
          style={{ flex: 1 }}
          data={this.state.res}
          horizontal={true}
          svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
          gridMin={0}
        />
        <XAxis
          style={{ marginTop: 10 }}
          data={this.state.res}
          scale={scale.scaleBand}
          labelStyle={{ color: 'black' }}
        />

      </View>
    );
  }
}

export default AreaChartExample;
