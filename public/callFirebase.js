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
    update('users', docRef.id, { wins: parseInt(winCount) });
  });
}

export function updateLossCount(playerName, lossCount) {
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }

  filter('users', 'name', playerName).then((result) => {
    let docRef = result.shift();
    update('users', docRef.id, { losses: parseInt(lossCount) });
  });
}

export function getWinCount(playerName) {
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }

  let api = firebase.firestore();
  let winCount = 0;

  filter('users', 'name', playerName).then(function(result) {
    let docRef = result.shift();
    api
      .collection('users')
      .doc(docRef.id)
      .get()
      .then(function(doc) {
        winCount = doc.data().wins;
      })
      .catch(function(error) {
        console.log('Error getting documents: ' + error);
      });
  });
  return winCount;
}

export function getLossCount(playerName) {
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }

  let api = firebase.firestore();
  let lossCount = 0;

  filter('users', 'name', playerName).then(function(result) {
    let docRef = result.shift();
    api
      .collection('users')
      .doc(docRef.id)
      .get()
      .then(function(doc) {
        lossCount = doc.data().losses;
      })
      .catch(function(error) {
        console.log('Error getting documents: ' + error);
      });
  });
  return lossCount;
}
