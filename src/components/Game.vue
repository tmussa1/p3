<template>
  <!-- This page is the cruz of the game -->
  <div v-cloak>
    <NavBar />
    <h3>Category - {{ category }}</h3>
    <!-- Display appropriate message when defintion is not available to the selected word -->
    <b-card title="Name a word for" body-class="text-center" header-tag="nav" class="card-top">
      <b-card-text v-if="noData && !dataLoaded" class="hints">
        Sorry, there is no defintion available for the selected word or category
        <div class="spacer"></div>
        <router-link to="/categories">
          <b-button variant="danger" id="go-back">Try a different category</b-button>
        </router-link>
      </b-card-text>

      <!-- Show a maximum of 3 definitions -->
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

      <!-- Display a friendly message for wrong answers and show attempts left -->
      <div v-if="hintone || hinttwo || hintthree">
        <div v-if="showFailure" id="fail-alerter">
          <div :class="alertFailure" role="alert">
            Incorrect answer. You have
            <span id="word-ans">{{ attemptLeft }}</span> more attempts and the
            correct answer will be displayed
          </div>
        </div>
        <!-- Display a friendly message upon a correct answer -->
        <div v-if="showSuccess" id="success-alerter">
          <div :class="alertSuccess" role="alert">
            Congratulations, your response was correct! Click
            <span id="word-ans">Play Again</span> or choose a different category
          </div>
        </div>
        <!-- Show correct answer after 3 attempts and disable submitting answer -->
        <div v-if="countBiggerThanThree" id="answer-alerter">
          <div :class="alertAnswer" role="alert">
            You have attempted
            <span id="word-ans">3</span> times. The correct answer is
            <span id="word-ans">{{ randomWord }}</span>
            Click
            <span id="word-ans">Play Again</span> to continue playing
          </div>
        </div>
        <!-- Buttons to submit answer and replay game with a different word -->
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
import {
  updateWinCount,
  updateLossCount,
  getCounts
} from "../../public/callFirebase";

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
      dataLoaded: false,
      noData: false,
      winCount: null,
      lossCount: null
    };
  },
  methods: {
    // Randomly picks a word populated in firebase
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
    // Pulls definitions of those words from WordAPI
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
          this.dataLoaded = false;
          this.noData = true;
          console.log(error);
        });
    },
    //Pulls a new word with the corresponding definition
    replayGame: function() {
      this.showFailure = false;
      this.attemptCount = 0;
      this.attemptLeft = 3;
      this.countBiggerThanThree = false;
      this.pickWord();
      this.populateHint();
      this.showSuccess = false;
      document.getElementById("sub-button").disabled = false;
      this.answer = "";
    },
    //Submits an answer and updates the number of correct answers in firebase when user
    //gets it right
    submitAnswer: function() {
      if (
        this.randomWord.trim().toLowerCase() == this.answer.trim().toLowerCase()
      ) {
        this.showFailure = false;
        this.showSuccess = true;
        document.getElementById("sub-button").disabled = true;
        this.winCount += 1;
        updateWinCount(this.playerName, this.winCount);
      } else {
        this.showFailure = true;
        this.showSuccess = false;
        this.attemptCount += 1;
        this.attemptLeft -= 1;
      }
      this.answer = "";
    }
  },
  //Uses created lifecycle hook to pull in the word and its definition
  created() {
    this.pickWord();
    this.populateHint();
  },
  watch: {
    //After 3 attempts, update loss count
    attemptCount: function() {
      if (this.attemptCount == 3) {
        this.countBiggerThanThree = true;
        this.showFailure = false;
        this.showSuccess = false;
        document.getElementById("sub-button").disabled = true;
        this.lossCount += 1;
        updateLossCount(this.playerName, this.lossCount);
      }
    }
  },
  //Gets the player name from local storage
  computed: {
    playerName: function() {
      return localStorage.getItem("player");
    }
  },
  //Get the counts of wins and losses for this user if they have played before
  //It will be zero if they never played before
  mounted() {
    getCounts(this.playerName).then(response => {
      this.winCount = response.wins;
      this.lossCount = response.losses;
    });
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
