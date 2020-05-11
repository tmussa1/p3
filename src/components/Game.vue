<template>
  <!-- This page is the cruz of the game -->
  <div>
    <NavBar />
    <div class="difficulty-buttons">
      <b-button-group>
        <b-button variant="success" @click="switchDifficulty(0)">Easy</b-button>
        <b-button variant="warning" @click="switchDifficulty(1)"
          >Medium</b-button
        >
        <b-button variant="danger" @click="switchDifficulty(2)">Hard</b-button>
      </b-button-group>
      <span id="difficulty">-- Switch Difficulty Level --</span>
    </div>
    <div>
      <h5>Category - {{ category }} || Difficulty - {{ difficulty }}</h5>
      <!-- Display appropriate message when defintion is not available to the selected word -->
      <b-card
        title="Name a word for"
        body-class="text-center"
        header-tag="nav"
        class="card-top"
      >
        <b-card-text v-if="noData && !dataLoaded" class="hints">
          Sorry, there is no defintion available for the selected word or
          category
          <div class="spacer"></div>
          <router-link to="/categories">
            <b-button variant="danger" id="go-back"
              >Try a different category</b-button
            >
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
              <span id="word-ans">Play Again</span> or choose a different
              category
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
          <b-form-input
            v-model="$v.answer.$model"
            placeholder="Enter your answer"
            class="col-md-4"
            :class="{ 'form-input-error': $v.answer.$error }"
          ></b-form-input>
          <b-button variant="primary" id="sub-button" @click="submitAnswer"
            >Submit Answer</b-button
          >
          <div
            class="form-feedback-error"
            v-if="$v.answer.$dirty && !$v.answer.required"
          >
            Answer is required
          </div>
          <div
            class="form-feedback-error"
            v-if="$v.answer.$dirty && !$v.answer.alpha"
          >
            Must enter alphabet characters
          </div>
          <div class="row">
            <b-button variant="danger" class="again-button" @click="replayGame"
              >Play Again</b-button
            >
          </div>
        </div>
      </b-card>
    </div>
  </div>
</template>

<script>
require('dotenv').config();
import wordData from '../../public/wordData';
import axios from 'axios';
import NavBar from './NavBar.vue';
import {
  updateWinCount,
  updateLossCount,
  getCounts,
} from '../../public/callFirebase';
import store from '../../src/common/store';
import { required, alpha } from 'vuelidate/lib/validators';

/* eslint-disable no-unused-vars */
export default {
  data: function() {
    return {
      wordData: wordData.data,
      randomWord: '',
      difficulty: '',
      difficultyIndex: 0,
      category: this.$route.params.category,
      hintone: '',
      hinttwo: '',
      hintthree: '',
      answer: '',
      showFailure: false,
      showSuccess: false,
      alertFailure: 'alert alert-danger col-md-8',
      alertSuccess: 'alert alert-success col-md-8',
      alertAnswer: 'alert alert-secondary col-md-8',
      attemptCount: 0,
      attemptLeft: 3,
      countBiggerThanThree: false,
      dataLoaded: false,
      noData: false,
      winCount: null,
      lossCount: null,
      store: store,
      difficultyArray: ['Easy', 'Medium', 'Hard'],
    };
  },
  methods: {
    // Randomly picks a word populated in firebase
    pickWord: function(difficultyIndex) {
      for (let i = 0; i < this.wordData.words.length; i++) {
        if (
          this.wordData.words[i].category.trim().toLowerCase() ==
          this.category.trim().toLowerCase()
        ) {
          this.difficulty = this.difficultyArray[difficultyIndex];
          var wordArray = this.wordData.words[i].wordList[
            this.difficulty.toLowerCase()
          ];
          let rand = Math.floor(Math.random() * wordArray.length);
          this.randomWord = wordArray[rand];
          let record = {
            player: this.playerName,
            word: this.randomWord,
            points: 0,
          };
          this.$store.commit('setWordToGuessAndPlayer', record);
        }
      }
    },
    // Pulls definitions of those words from WordAPI
    populateHint: function() {
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
          this.dataLoaded = true;
          this.noData = false;
          this.hintone =
            response.data.results[0] == null
              ? ''
              : response.data.results[0].definition;
          this.hinttwo =
            response.data.results[1] == null
              ? ''
              : response.data.results[1].definition;
          this.hintthree =
            response.data.results[2] == null
              ? ''
              : response.data.results[2].definition;
        })
        .catch((error) => {
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
      this.pickWord(this.difficultyIndex);
      this.populateHint();
      this.showSuccess = false;
      document.getElementById('sub-button').disabled = false;
      this.answer = '';
    },
    //Submits an answer and updates the number of correct answers in firebase when user
    //gets it right
    submitAnswer: function() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        if (
          this.randomWord.trim().toLowerCase() ==
          this.answer.trim().toLowerCase()
        ) {
          this.showFailure = false;
          this.showSuccess = true;
          document.getElementById('sub-button').disabled = true;
          this.winCount += 1;
          let point =
            this.difficultyIndex == 0 ? 1 : this.difficultyIndex == 1 ? 3 : 5;
          let record = {
            player: this.playerName,
            word: this.randomWord,
            response: this.answer,
            points: point,
            correctStatus: true,
          };
          this.$store.commit('updateResponseAndPoints', record);
          updateWinCount(this.playerName, this.winCount);
          this.answer = '';
        } else {
          this.showFailure = true;
          this.showSuccess = false;
          this.attemptCount += 1;
          this.attemptLeft -= 1;
        }
      }
    },
    switchDifficulty: function(index) {
      this.difficultyIndex = parseInt(index);
      this.replayGame();
    },
  },
  //Uses created lifecycle hook to pull in the word and its definition
  created() {
    this.pickWord(this.difficultyIndex);
    this.populateHint();
  },
  watch: {
    //After 3 attempts, update loss count
    attemptCount: function() {
      if (this.attemptCount == 3) {
        this.countBiggerThanThree = true;
        this.showFailure = false;
        this.showSuccess = false;
        let record = {
          player: this.playerName,
          word: this.randomWord,
          response: this.answer,
          points: 0,
          correctStatus: false,
        };
        this.$store.commit('updateResponseAndPoints', record);
        document.getElementById('sub-button').disabled = true;
        this.lossCount += 1;
        updateLossCount(this.playerName, this.lossCount);
      }
    },
  },
  //Gets the player name from local storage
  computed: {
    playerName: function() {
      return localStorage.getItem('player');
    },
  },
  //Get the counts of wins and losses for this user if they have played before
  //It will be zero if they never played before
  mounted() {
    getCounts(this.playerName).then((response) => {
      this.winCount = response.wins;
      this.lossCount = response.losses;
    });
  },
  components: {
    NavBar,
  },
  validations: {
    answer: {
      required,
      alpha,
    },
  },
};
</script>

<style scoped>
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
h5 {
  text-align: center;
  font-weight: bold;
  border: 3px green solid;
  width: 27%;
  margin-left: 500px;
  margin-top: 50px;
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
.difficulty-buttons {
  font-weight: bold;
  text-decoration-color: aqua;
}
#difficulty {
  border: 3px red dotted;
  margin-left: 5px;
}
.form-feedback-error {
  color: red;
}
</style>
