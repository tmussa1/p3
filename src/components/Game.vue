<template>
  <div>
    <b-card
      title="Name something that is..."
      body-class="text-center"
      header-tag="nav"
    >
      <b-card-text>
        With supporting text below as a natural lead-in to additional content.
      </b-card-text>

      <div class="row">
        <b-button variant="success" id="first-button">Submit Answer</b-button>
        <div class="spacer"></div>
        <b-button variant="danger"
          ><router-link to="/">Go back to hompage</router-link></b-button
        >
      </div>
    </b-card>
  </div>
</template>

<script>
import wordData from '../../public/wordData';
/* eslint-disable no-unused-vars */
export default {
  data: function() {
    return {
      wordData: wordData.data,
      randomWord: '',
      category: this.$route.params.category,
      hint: ''
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
  mounted() {
    this.pickWord();
  },
};
</script>

<style scoped>
.spacer {
  margin-left: 50px;
}
#first-button {
  margin-left: 500px;
}
</style>
