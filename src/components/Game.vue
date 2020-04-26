<template>
  <div v-cloak>
    <NavBar :showLogIn="false" :winCount="winCount" :lossCount="lossCount" />
    <h3>Category - {{ category }}</h3>
    <b-card title="Name a word for" body-class="text-center" header-tag="nav" class="card-top">
      <b-card-text v-if="noData && dataLoaded" class="hints">
        Sorry, there is no defintion available for the selected word or category
        <div class="spacer"></div>
        <router-link to="/">
          <b-button variant="danger" id="go-back">Try a different category</b-button>
        </router-link>
      </b-card-text>

      <div class="hint-cards">
        <b-card-text v-if="hintone" class="hints">
          <span>- {{ hintone }}</span>
        </b-card-text>
        <b-card-text v-if="hinttwo" class="hints">
          <span>- {{ hinttwo }}</span>
        </b-card-text>
        <b-card-text v-if="hintthree" class="hints">
          <span>- {{ hintthree }}</span>
        </b-card-text>
      </div>

      <div v-if="hintone || hinttwo || hintthree">
        <div v-if="showFailure" id="fail-alerter">
          <div :class="alertFailure" role="alert">
            Incorrect answer. You have
            <span id="word-ans">{{ attemptLeft }}</span> more attempts and the
            correct answer will be displayed
          </div>
        </div>
        <div v-if="showSuccess" id="success-alerter">
          <div :class="alertSuccess" role="alert">
            Congratulations, your response was correct! Click
            <span id="word-ans">Play Again</span> or choose a different category
          </div>
        </div>
        <div v-if="countBiggerThanThree" id="answer-alerter">
          <div :class="alertAnswer" role="alert">
            You have attempted
            <span id="word-ans">3</span>times. The correct answer is
            <span id="word-ans">{{ randomWord }}</span>
            Click
            <span id="word-ans">Play Again</span> to continue playing
          </div>
        </div>
        <b-form-input v-model="answer" placeholder="Enter your answer" class="col-md-4"></b-form-input>
        <b-button variant="primary" id="sub-button" @click="submitAnswer">Submit Answer</b-button>
        <div class="row">
          <b-button variant="danger" class="again-button" @click="replayGame">Play Again</b-button>
        </div>
      </div>
    </b-card>
  </div>
</template>

<script>
require("dotenv").config();
import wordData from "../../public/wordData";
import axios from "axios";
import NavBar from "./NavBar.vue";

/* eslint-disable no-unused-vars */
export default {
  data: function() {
    return {
      wordData: wordData.data,
      randomWord: "",
      category: this.$route.params.category,
      hintone: "",
      hinttwo: "",
      hintthree: "",
      answer: "",
      showFailure: false,
      showSuccess: false,
      alertFailure: "alert alert-danger col-md-8",
      alertSuccess: "alert alert-success col-md-8",
      alertAnswer: "alert alert-secondary col-md-8",
      attemptCount: 0,
      attemptLeft: 3,
      countBiggerThanThree: false,
      winCount: 0,
      lossCount: 0,
      dataLoaded: false,
      noData: false
    };
  },
  methods: {
    pickWord: function() {
      for (let i = 0; i < this.wordData.words.length; i++) {
        if (
          this.wordData.words[i].category.trim().toLowerCase() ==
          this.category.trim().toLowerCase()
        ) {
          var wordArray = this.wordData.words[i].wordList;
          let rand = Math.floor(Math.random() * wordArray.length);
          this.randomWord = wordArray[rand];
        }
      }
    },
    populateHint: function() {
      axios({
        method: "GET",
        url: "https://wordsapiv1.p.rapidapi.com/words/" + this.randomWord,
        headers: {
          "content-type": "application/octet-stream",
          "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
          "x-rapidapi-key": process.env.VUE_APP_WORD_API_KEY
        }
      })
        .then(response => {
          this.dataLoaded = true;
          this.noData = false;
          this.hintone =
            response.data.results[0] == null
              ? ""
              : response.data.results[0].definition;
          this.hinttwo =
            response.data.results[1] == null
              ? ""
              : response.data.results[1].definition;
          this.hintthree =
            response.data.results[2] == null
              ? ""
              : response.data.results[2].definition;
        })
        .catch(error => {
          this.dataLoaded = true;
          this.noData = true;
          console.log(error);
        });
    },
    replayGame: function() {
      this.showFailure = false;
      this.attemptCount = 0;
      this.attemptLeft = 3;
      this.countBiggerThanThree = false;
      this.pickWord();
      this.populateHint();
      this.showSuccess = false;
      document.getElementById("sub-button").disabled = false;
    },
    submitAnswer: function() {
      if (
        this.randomWord.trim().toLowerCase() == this.answer.trim().toLowerCase()
      ) {
        this.showFailure = false;
        this.showSuccess = true;
        this.winCount += 1;
        document.getElementById("sub-button").disabled = true;
      } else {
        this.showFailure = true;
        this.showSuccess = false;
        this.attemptCount += 1;
        this.attemptLeft -= 1;
      }
      this.answer = "";
    }
  },
  created() {
    this.pickWord();
    this.populateHint();
  },
  watch: {
    attemptCount: function() {
      if (this.attemptCount == 3) {
        this.countBiggerThanThree = true;
        this.showFailure = false;
        this.showSuccess = false;
        this.lossCount += 1;
        document.getElementById("sub-button").disabled = true;
      }
    }
  },
  components: {
    NavBar
  }
};
</script>

<style scoped>
[v-cloak] {
  display: none !important;
}
.spacer {
  margin-left: 120px;
}
.hints {
  font-style: italic;
  font-weight: bold;
}
input {
  display: inline-block;
  border: 3px grey solid;
}
.row {
  margin-top: 50px;
  margin-left: 600px;
}
.card-top {
  margin-bottom: 50px;
}
h3 {
  text-align: center;
  font-weight: bold;
}
#sub-button {
  margin-left: 20px;
}
.again-button {
  padding-left: 10px;
  padding-right: 10px;
}
#fail-alerter,
#success-alerter,
#answer-alerter {
  margin-left: 450px;
  margin-right: 240px;
}
#word-ans {
  font-weight: bold;
}
.hint-cards {
  width: 50%;
  margin-left: 300px;
  margin-bottom: 50px;
  border: 5px grey solid;
}
</style>
