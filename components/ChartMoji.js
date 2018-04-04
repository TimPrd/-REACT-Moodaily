import React from 'react';
import { Text, View, Button } from 'react-native';
import { BarChart, XAxis } from 'react-native-svg-charts';
import * as scale from 'd3-scale';

class ChartMoji extends React.Component {
  constructor(props) {
    super(props);
    console.log('props : ', props)
    this.state = {
      flag: false,
      res: props.counts,
      labs: props.labels,
    };
  }


  render() {
    console.log( this.props.length != 0)
    
    
    return (
      <View style={{ }}>
        {this.state.labs.map((emot, index) => (
          <Text>
            {' '}{emot} N° {index + 1} : {this.state.res[index]}{' '}
          </Text>
        ))}

        <BarChart
          style={{ height: 200, weight:200, padding: 20 }}
          data={this.state.res}
          horizontal={true}
          svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
          gridMin={0}
        />


      </View>
    );
  }
}

export default ChartMoji;
