import firebaseUtil from './firebaseUtil';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import wordData from './wordData';

const config = firebaseUtil.data.config;
const saveData = wordData.data;

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

export function saveUser(playerName, playerDOB) {
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }
  let api = firebase.firestore();
  let user = { name: playerName, dob: playerDOB, wins: 0, losses: 0 };
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

export function updateWinCount(playerName, winCount) {
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }


  filter('users', 'name', playerName).then((result) => {
    let docRef = result.shift();
    update('users', docRef.id, { wins: winCount });
  });
}

export function updateLossCount(playerName, lossCount) {
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }


  filter('users', 'name', playerName).then((result) => {
    let docRef = result.shift();
    update('users', docRef.id, { losses: lossCount });
  });
}

export function getWinCount(playerName) {
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }

  filter('users', 'name', playerName).then(function(querySnapshot) {
    console.log('data1 ' + querySnapshot.shift().data()[0]);
    return querySnapshot.shift();
  });
}

export function getLossCount(playerName) {
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }

  filter('users', 'name', playerName).then(function(querySnapshot) {
    console.log('data2 ' + querySnapshot.shift().data()[0]);
    return querySnapshot.shift();
  });
}
