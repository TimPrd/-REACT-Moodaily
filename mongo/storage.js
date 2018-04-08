var Datastore = require("react-native-local-mongodb");
import { Alert } from "react-native";

/**
 * STORAGE
 * This class is a wrapper of the localmongodb package
 * mainly used for insert-create-delete-update
 */
export default class Database {
  constructor() {
    console.log("****DB OBTAINED***");
    this.db = new Datastore({ filename: "emoji", autoload: true });
  }


  /** return the db */
  _getDB() {
    return this.db;
  }

  /** delete all occurrences from the db */
  _deleteAll() {
    this.db.remove({ emoji: { $regex: /.*/ } }, { multi: true }, function(
      err,
      res
    ) {
      Alert.alert(
        "REMOVE",
        "Votre base est vide :'( ",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    });
  }

  /** retrieves all the records */
  async _getAllByCounter() {
    console.log("FETCH BY COUNTER");
    return await this.db.findAsync({});
  }

  /** retrieves all the records, sorted by the date 
   * (not impletemented yet)
   * todo: implement
  */
  _getAllByDate() {
    this.db
      .find({})
      .sort({ date: -1 })
      .limit(~new Date().getDate)
      .exec(function(err, docs) {
        console.log(docs);
      });
  }

  /**
   * Used to choose if we insert a new record or update an existing one
   * @param {*} options all the data to insert (object emoji)
   * todo : can be cleaned with : 
      var doesExists = await this._isExist(...options).then(
      doesExists ? this._update(...options) : this._insert(...options);
   */
  _insertOrUpdate(...options) {
    var that = this;
    this.db.find({ emoji: options[0].emoji }, function(err, docs) {
      if (docs.length === 0) {
        that._insert(...options);
      } else {
        that._update(...options);
      }
    });
  }

  /**
   * Insert in a new record in the db
   * @param {*} options all the data to insert
   */
  async _insert(...options) {
    console.log("INSERT");
    await this.db.insertAsync({ ...options[0], counter: 1 });
    Alert.alert(
      "INSERTION",
      "Vous avez ajouté une humeur ! ",
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );
    /*this.db.insert({ ...options[0], counter: 1 }, function(err, newDocs) {
      console.log(newDocs);
    });*/
  }

  /**
   * Update an existing record
   * @param {*} options data to update (fresh data)
   */
  async _update(...options) {
    console.log("UPDATE");
    await this.db.updateAsync(
      { emoji: options[0].emoji },
      { $set: { date: options[0].date }, $inc: { counter: 1 } }
    );
    Alert.alert(
      "MODIFICATION",
      "Vous avez incrémenté une humeur ! ",
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );
  }

  /**
   * Check if an object already exists in the db
   * @param {*} options data to search
   */
  async _isExist(...options) {
    return await new Promise(function(resolve, reject) {
      this.db.find({ emoji: options[0].emoji }, function(err, docs) {
        console.log("Callback");
        console.log(docs.length);
        resolve(true);
        //docs.length === 0 ?  resolve (true) :  reject (false
      });
    });
  }

  /**
   * @deprecated
   * Find with specific data
   * @param {*} options data to search
   */
  _find(...options) {
    this.db.find(options, function(err, docs) {
      console.log(docs);
      if (docs.length > 0) {
        console.log("EXISTS");
      } else {
        console.log("EXISTS PAS");
      }
    });
  }
}
