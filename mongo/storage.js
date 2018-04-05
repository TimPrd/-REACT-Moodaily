var Datastore = require('react-native-local-mongodb');
import { Alert } from 'react-native'

export default class Database{
  constructor() {
      console.log('****DB OBTAINED***')
     this.db = new Datastore({ filename: 'emoji', autoload: true });
  }

  _getDB() {
    return this.db;
  }

  _deleteAll(){
    this.db.remove({ emoji: { $regex: /.*/} }, { multi: true }, function(err, res) {
      Alert.alert(
        'REMOVE',
        'Votre base est vide :\'( ',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
    })
  }


  async _getAllByCounter() {
    console.log('FETCH BY COUNTER');
    return await this.db.findAsync({})
  }

  _getAllByDate() {
    this.db
      .find({})
      .sort({ date: -1 })
      .limit(~new Date().getDate)
      .exec(function(err, docs) {
        console.log(docs);
      });
  }

  _insertOrUpdate(...options) {

    /*var doesExists = await this._isExist(...options).then(
    //doesExists ? this._update(...options) : this._insert(...options);*/

    var that = this;
    this.db.find({ emoji: options[0].emoji }, function(err, docs) {
      if (docs.length === 0) {
        that._insert(...options);
      } else {
        that._update(...options);
      }
    });
  }


 async _insert(...options) {
    console.log('INSERT');
    await this.db.insertAsync({ ...options[0], counter: 1 });
    Alert.alert(
        'INSERTION',
        'Vous avez ajouté une humeur ! ',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
    /*this.db.insert({ ...options[0], counter: 1 }, function(err, newDocs) {
      console.log(newDocs);
    });*/
  }

  async _update(...options) {
    console.log('UPDATE');
    await this.db.updateAsync(
      { emoji: options[0].emoji },
      { $set: { date: options[0].date }, $inc: { counter: 1 } }
    )
    Alert.alert(
        'MODIFICATION',
        'Vous avez incrémenté une humeur ! ',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )

  }
  
  
  async _isExist(...options) {
    return await new Promise(function(resolve, reject) {
      this.db.find({ emoji: options[0].emoji }, function(err, docs) {
        console.log('Callback');
        console.log(docs.length);
        resolve(true);
        //docs.length === 0 ?  resolve (true) :  reject (false
      });
    });
  }


  _find(
    ...options
  ) {
    this.db.find(options, function(err, docs) {
      console.log(docs);
      if (docs.length > 0) {
        console.log('EXISTS');
      } else {
        console.log('EXISTS PAS');
        //var date = new Date();
        //this.db._insert({z,date});
      }
      // docs contains only Mars
    });
  }
}


