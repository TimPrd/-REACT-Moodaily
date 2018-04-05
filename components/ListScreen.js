import React from 'react';
import {
  View,
  TouchableHighlight,
  ListView,
  StyleSheet,
  Text,
  TextInput,
  Switch,
  ScrollView,
} from 'react-native';
import Database from './../mongo/storage';
import { LIST_EMOJI } from './../data/data-list';
import ChartMoji from './ChartMoji';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emot: {
    fontSize: 28,
    marginLeft: 25,
  },
  contentContainer:
  {
    flex:1,
  }
  
});

class ListViewDemo extends React.Component {
  constructor(props) {
    super(props);
    this.db = new Database();
    this.ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      listEMoji: LIST_EMOJI,
      searchText: '',
      flag: false
    };
  }

  _pressRow(z) {
    var date = new Date(); 
    this.db._insertOrUpdate({ emoji: z, date });
    this.setState({
      flag:true
    })
  }

  setSearchText = e => {
    let searchText = e.nativeEvent.text;
    if (searchText === '') {
      this.setState({
        listEMoji: LIST_EMOJI,
      });
    } else {
      let filteredData = this.filterNotes(searchText, this.state.listEMoji);
      console.log(filteredData);
      this.setState({
        listEMoji: filteredData,
      });
    }
  };

  filterNotes(searchText, notes) {
    let text = searchText.toLowerCase();
    var ar = [];
    notes.filter(function(element) {
      element.aliases.forEach(function(alias) {
        console.log(alias);
        if (alias.includes(text)) ar.push(element);
      });
    });
    return ar;
  }

  async componentWillMount() {
    var data = await this.db._getAllByCounter();
    console.log(data.map(a => a.counter));
    if (data.length != 0) {
      this.setState({
        res: data.map(a => a.counter),
        labs: data.map(a => a.emoji),
      });
    }
  }

  getChart() {
    if (this.state.res !== undefined)
      return <ChartMoji labels={this.state.labs} counts={this.state.res}></ChartMoji>
  }
  
  changeFlag(){
    this.setState({
      flag: !this.state.flag
    })
  }

  render() {
    const isdisplay = this.state.flag;

    const chart = isdisplay ? this.getChart() : <Text>Ajouter un émoji pour voir vos stats.</Text>;

    return (

      <ScrollView contentContainerStyle={styles.contentContainer}>
        {chart}

        <ListView
          style={styles.container}
          dataSource={this.ds.cloneWithRows(this.state.listEMoji)}
          renderHeader={() => (
            <TextInput
              placeholder="Search an emotion..."
              onChange={this.setSearchText}
            />
          )}
          renderRow={data => (
            <TouchableHighlight
              underlayColor="whitesmoke"
              onPress={() => this._pressRow(data.emoji)}>
              <View>
                <Text style={styles.emot}>{data.emoji}</Text>
              </View>
            </TouchableHighlight>
          )}
        />
      </ScrollView>
    );
  }
}


export default ListViewDemo;
