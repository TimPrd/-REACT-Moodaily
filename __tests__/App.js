import 'react-native';
import React from 'react';
import App from '../App';
import ListScreen from './../components/ListScreen'
import Database from './../mongo/storage';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';




//TESTING SET
const LIST_EMOJI = [
  {
      "emoji": "😀"
    , "aliases": [
        "grinning"
      ]
  }
  , 
  {
      "emoji": "😃"
    , "aliases": [
        "smiley"
      ]
  }
]


/*****************************
 * TESTING THE LIST PROPERTY *
 *****************************/
const listscreen = renderer.create(<ListScreen />);
const instanceList = listscreen.getInstance();

it('SEARCH WITH FULL MATCH', () => {
  console.log("search : grinning in ", LIST_EMOJI)
  expect( instanceList.filterNotes("grinning", LIST_EMOJI)  ).toHaveLength(1);});
it('SEARCH WITH PARTIAL MATCH', () => {
  console.log("search : grin to match grinnin")
  expect( instanceList.filterNotes("grin", LIST_EMOJI)  ).toHaveLength(1);
});
/*********************************
 * END TESTING THE LIST PROPERTY *
 *********************************/


/*********************************
 * TESTING THE DATABASE PROPERTY *
 *********************************/
/*const db = new Datastore({ filename: 'emoji_TEST', autoload: true });

it('INSERT IN DB', async done => {
  const smiley1 = await db.findOneAsync({ emoji: '😀' })

  await db.insertAsync({
    "emoji": "😀"
  , "aliases": [
      "grinning"
    ]
  })

  const smiley2 = await db.findOneAsync({ emoji: '😀' })

  expect(smiley1.emoji).toBeUndefined()


  await db.insertAsync( {
    "emoji": "😃"
  , "aliases": [
      "smiley"
    ]
  })

  expect(smiley2).toHaveLength(2)
});*/

/*************************************
 * END TESTING THE DATABASE PROPERTY *
 *************************************/