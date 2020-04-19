<template>
  <div></div>
</template>

<script>
import firebaseUtil from "../../public/firebaseUtil";
import * as firebase from "firebase/app";
import "firebase/firestore";
import wordData from "../../public/wordData";

/* eslint-disable no-unused-vars */
export default {
  data: function() {
    return {
      config: firebaseUtil.data.config,
      wordData: wordData.data
    };
  },
  methods: {
    populateFirebase: function() {
      firebase.initializeApp(this.config);
      let api = firebase.firestore();
      api
        .collection("wordcollection")
        .add(this.wordData)
        .then(function(docRef) {
          console.log("Word document Document written");
        })
        .catch(function(error) {
          console.error("Unable to add document: ", error);
        });
    }
  },
  mounted() {
    this.populateFirebase();
  }
};
</script>

<style scoped>
</style>
