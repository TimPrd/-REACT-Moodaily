import React from "react";
import {
  View,
  TouchableHighlight,
  ListView,
  StyleSheet,
  Text,
  TextInput,
  Switch,
  ScrollView,
  Share
} from "react-native";
import Database from "./../mongo/storage";
import { LIST_EMOJI } from "./../data/data-list";
import ChartMoji from "./ChartMoji";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  emot: {
    fontSize: 28,
    marginLeft: 25
  },
  contentContainer: {
    flex: 1
  }
});

/** The first view (list, search, chart..)*/
class ListViewDemo extends React.Component {
  constructor(props) {
    super(props);
    this.db = new Database();
    this.ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    });
    this.state = {
      listEMoji: LIST_EMOJI,
      searchText: "",
      flag: false
    };
  }

  /**
   * When we press a row, we add the emoji in the db
   * @param {*} emojiSelected the emoji to add in db
   */
  _pressRow(emojiSelected) {
    //Get the current date when we record the emoji
    var date = new Date();
    //Insert with our wrapper
    this.db._insertOrUpdate({ emoji: emojiSelected, date });
    //Setting the state in order to view the chart
    this.setState({
      flag: true
    });

    Share.share(
      {
        message: emojiSelected[0].emoji,
        url: "",
        title: "ShareMood"
      },
      {
        // Android only:
        dialogTitle: "Share your mood",
        // iOS only:
        excludedActivityTypes: ["com.apple.UIKit.activity.PostToTwitter"]
      }
    );
  }

  /**
   * Search in the list the text entered (in the search bar)
   */
  setSearchText = e => {
    let searchText = e.nativeEvent.text;
    //Reset to the all list if empty
    if (searchText === "") {
      this.setState({
        listEMoji: LIST_EMOJI
      });
    } else {
      //Get the filtered list
      let filteredData = this.filterList(searchText, this.state.listEMoji);
      console.log(filteredData);
      //Render the list with the filtered data
      this.setState({
        listEMoji: filteredData
      });
    }
  };

  /**
   * Filter a list with an occurence of text desired
   * @param {*} searchText the text to search
   * @param {*} listToFilter the list to filter
   */
  filterList(searchText, listToFilter) {
    //Text is in lowercase to match all
    let text = searchText.toLowerCase();
    //ar = returned list
    var ar = [];
    listToFilter.filter(function(element) {
      element.aliases.forEach(function(alias) {
        console.log(alias);
        if (alias.includes(text)) ar.push(element);
      });
    });
    return ar;
  }

  /** At componentWillMount, load the db for the chart*/
  async componentWillMount() {
    var data = await this.db._getAllByCounter();
    console.log(data.map(a => a.counter));
    if (data.length != 0) {
      this.setState({
        res: data.map(a => a.counter),
        labs: data.map(a => a.emoji)
      });
    }
  }

  /** Retrieve our chart (display it)*/
  getChart() {
    if (this.state.res !== undefined)
      return <ChartMoji labels={this.state.labs} counts={this.state.res} />;
  }

  /** Change the flag of the chart (visible or not) */
  changeFlag() {
    this.setState({
      flag: !this.state.flag
    });
  }

  render() {
    const isdisplay = this.state.flag;
    const chart = isdisplay ? (
      this.getChart()
    ) : (
      <Text>Ajouter un émoji pour voir vos stats.</Text>
    );

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
              onPress={() => this._pressRow(data.emoji)}
            >
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
