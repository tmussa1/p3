//Utility methods for interacting with firebase API
import firebaseUtil from './firebaseUtil';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import wordData from './wordData';

const config = firebaseUtil.data.config;
const saveData = wordData.data;

//Populates the words in each category to choose from
//This is used for seeding
export function populatewords() {
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }
  let api = firebase.firestore();
  api
    .collection('wordcollection')
    .add(saveData)
    .then(function(docRef) {
      console.log('Word document Document written' + docRef);
    })
    .catch(function(error) {
      console.error('Unable to add document: ', error);
    });
}

//Persists a new user. Does nothing if user already exists
export function saveUser(playerName, playerDOB) {
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }
  let api = firebase.firestore();
  let user = { name: playerName, dob: playerDOB, wins: 0, losses: 0 };

  filter('users', 'name', playerName).then((result) => {
    if (!result.shift()) {
      api
        .collection('users')
        .add(user)
        .then(function(docRef) {
          console.log('Word document Document written' + docRef);
        })
        .catch(function(error) {
          console.error('Unable to add document: ', error);
        });
    }
  });
}

//Method used to internally to filter a record based on a field and a value
export async function filter(collection, field, value) {
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }
  let api = firebase.firestore();
  const snapshot = await api
    .collection(collection)
    .where(field, '==', value)
    .get();
  return snapshot.docs;
}

//Method used internally to update a record based on id
export function update(collection, id, updatedValue) {
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }
  let api = firebase.firestore();
  api
    .collection(collection)
    .doc(id)
    .update(updatedValue);
}

//Updates the win count of the current player
export function updateWinCount(playerName, winCount) {
 
  filter('users', 'name', playerName).then((result) => {
    let docRef = result.shift();
    update('users', docRef.id, { wins: parseInt(winCount) });
  });
}

//Updates the loss count of the current player
export function updateLossCount(playerName, lossCount) {
 
  filter('users', 'name', playerName).then((result) => {
    let docRef = result.shift();
    update('users', docRef.id, { losses: parseInt(lossCount) });
  });
}

//Gets the win and loss counts of current player
export function getCounts(playerName) {
  return filter('users', 'name', playerName).then(function(result) {
    let docRef = result.shift();
    let wins = docRef.data().wins;
    let losses = docRef.data().losses;
    return {
      wins: wins,
      losses: losses,
    };
  });
}
