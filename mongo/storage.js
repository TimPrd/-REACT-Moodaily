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

  async _getAllByCounter() {
    console.log('FETCH BY COUNTER');
    return await this.db.findAsync({})
    
    //this.db._getAllByCounter()
    /*this.db.find({}).sort({ counter: -1 }).limit(10).exec(
      async function(err, docs) {
        return await docs
        new Promise(function(resolve, reject) {
          console.log('promise')
          resolve('2')
        })
      //console.log(docs);
      //return docs
      });*/
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
    /*var doesExists = this._isExist(...options).then(
        function(val) {
          console.log("promesse ok")
        }).catch(
        // Promesse rejetée
        function() { 
          console.log("promesse rompue")
        });
*/

    /*var doesExists = await this._isExist(...options).then(
    // On affiche un message avec la valeur
    function(val) {
      console.log('ok')
    }).catch(
      // Promesse rejetée
      function() { 
        console.log("promesse rompue");
      });*/

    //doesExists ? this._insert(...options) : this._update(...options)
    /*} catch (e) {
      console.error("FAIL");
    }
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
    /*return new Promise (function (resolve, reject) {
        this.db.find( {emoji:options[0].emoji },
            function(err,docs){
              console.log("TEST")
              return resolve(
                docs.length === 0
              )
            }
          )
      })
      */

    return await new Promise(function(resolve, reject) {
      this.db.find({ emoji: options[0].emoji }, function(err, docs) {
        console.log('Callback');
        console.log(docs.length);
        resolve(true);
        //docs.length === 0 ?  resolve (true) :  reject (false
      });
    });

    // use response here
    // snip
  }

  /*return await       console.log("async")
       this.db.find(
      { emoji: options[0].emoji },
      await function(err, docs) {
        console.log(docs);
        return docs.length === 0;
      }
    );
    }
  }*/

  /*
    console.log('dans base : ')
    this.db.find( {}, function(err,docs){
      console.log(docs)
    });
  }*/
  /*this.db.insert([options], function (err, newDocs) {
    });*/ _find(
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
  /*
  var doc = { hello: 'HELLO'
               , n: 5
               , today: new Date()
               , fruits: [ 'kejfoejjfejfoe' ]
               };

    this.db.insert(doc, function (err, newDoc) {
      console.log(newDoc)// Callback is optional
  // newDoc is the newly inserted document, including its _id
  // newDoc has no key called notToBeSaved since its value was undefined
});
  
  this.db.find({ n: 5 }, function (err, docs) {
      console.log(docs)

  docs.forEach( element => {
    console.log(element)
  })
  // docs is an array containing documents Mars, Earth, Jupiter
  // If no document is found, docs is equal to []
});
  
  
  _create*/
}


