<template>
  <div>
    <b-card
      title="Name a word fitting the descriptions below"
      body-class="text-center"
      header-tag="nav"
    >
      <b-card-text v-if="!hintone && !hinttwo && !hintthree" class="hints"
        >Sorry there is no hint available for the selected word
        <b-button variant="danger" id="go-back">
          <div class="spacer"></div>
          <router-link to="/">Try again</router-link>
        </b-button>
      </b-card-text>

      <b-card-text v-if="hintone" class="hints"
        >Hint - {{ hintone }}</b-card-text
      >
      <b-card-text v-if="hinttwo" class="hints"
        >Hint - {{ hinttwo }}</b-card-text
      >
      <b-card-text v-if="hintthree" class="hints"
        >Hint - {{ hintthree }}</b-card-text
      >

      <div class="row" v-if="hintone || hinttwo || hintthree">
        <b-button variant="success" id="first-button">Submit Answer</b-button>
        <div class="spacer"></div>
        <b-button variant="danger" id="go-back">
          <router-link to="/">Select a different category</router-link>
        </b-button>
      </div>
    </b-card>
  </div>
</template>

<script>
require('dotenv').config();
import wordData from '../../public/wordData';
import axios from 'axios';
/* eslint-disable no-unused-vars */
export default {
  data: function() {
    return {
      wordData: wordData.data,
      randomWord: '',
      category: this.$route.params.category,
      hintone: '',
      hinttwo: '',
      hintthree: '',
    };
  },
  methods: {
    pickWord: function() {
      for (let i = 0; i < this.wordData.words.length; i++) {
        if (this.wordData.words[i].category == this.category) {
          var wordArray = this.wordData.words[i].wordList;
          let rand = Math.floor(Math.random() * wordArray.length);
          this.randomWord = wordArray[rand];
        }
      }
    },
  },
  created() {
    this.pickWord();
    axios({
      method: 'GET',
      url: 'https://wordsapiv1.p.rapidapi.com/words/' + this.randomWord,
      headers: {
        'content-type': 'application/octet-stream',
        'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com',
        'x-rapidapi-key': process.env.VUE_APP_WORD_API_KEY,
      },
    })
      .then((response) => {
        console.log(response);
        console.log(this.randomWord);
        this.hintone = response.data.results[0].definition;
        this.hinttwo = response.data.results[1].definition;
        this.hintthree = response.data.results[2].definition;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style scoped>
.spacer {
  margin-left: 100px;
}
#first-button {
  margin-left: 500px;
}
.hints {
  font-style: italic;
  font-weight: bold;
  background: grey;
}
#go-back {
  font-weight: bold;
}
</style>
