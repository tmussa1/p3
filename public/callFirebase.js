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

export function updateWinCount(playerName, winCount) {
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }
  let api = firebase.firestore();
  api
    .collection('users')
    .where('name', '==', playerName)
    .set({ wins: winCount });
}

export function updateLossCount(playerName, lossCount) {
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }
  let api = firebase.firestore();
  api
    .collection('users')
    .where('name', '==', playerName)
    .set({ losses: lossCount });
}

export function getWinCount(playerName) {
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }
  let api = firebase.firestore();
  api
    .collection('users')
    .where('name', '==', playerName)
    .get()
    .then(function(querySnapshot) {
      return querySnapshot.docs.shift().data();
    });
}

export function getLossCount(playerName) {
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }
  let api = firebase.firestore();
  api
    .collection('users')
    .where('name', '==', playerName)
    .get()
    .then(function(querySnapshot) {
      return querySnapshot.docs.shift().data();
    });
}
