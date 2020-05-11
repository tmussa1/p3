<template>
  <div>
    <!-- This is the login page that prompts user for name and date of birth -->
    <b-navbar type="dark" variant="dark">
      <b-navbar-nav>
        <router-link to="/" class="log-text">
          <b-nav-item>Log In</b-nav-item>
        </router-link>
      </b-navbar-nav>
    </b-navbar>
    <div class="col-md-4" id="name-dob">
      <label for="player-name">What's your name?</label>
      <b-form-input
        v-model="$v.playername.$model"
        id="player-name"
        placeholder="Enter your name"
        v-on:keyup.enter="savePlayer"
        :class="{ 'form-input-error': $v.playername.$error }"
      ></b-form-input>
      <div
        class="form-feedback-error"
        v-if="$v.playername.$dirty && !$v.playername.required"
      >
        Player name is required
      </div>
      <div
        class="form-feedback-error"
        v-if="$v.playername.$dirty && !$v.playername.alpha"
      >
        Must enter alphabet characters
      </div>
      <label for="datepicker-placeholder">What's your birthday?</label>
      <b-form-datepicker
        v-model="$v.birthdate.$model"
        id="datepicker-placeholder"
        placeholder="Choose a date"
        local="en"
        :class="{ 'form-input-error': $v.birthdate.$error }"
      ></b-form-datepicker>
      <div
        class="form-feedback-error"
        v-if="$v.birthdate.$dirty && !$v.birthdate.required"
      >
        Birth date is required
      </div>
      <div
        class="form-feedback-error"
        v-if="$v.birthdate.$dirty && !$v.birthdate.adultValidation"
      >
        You must be at least 13 years of age
      </div>
      <b-button variant="primary" @click.prevent="savePlayer" id="save-player"
        >Let's Play</b-button
      >
    </div>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import { saveUser } from '../../public/callFirebase';
import { alpha, required } from 'vuelidate/lib/validators';

export default {
  data: function() {
    return {
      playername: '',
      birthdate: '',
    };
  },
  methods: {
    //Persist the player's name and date of birth
    //Then redirect to the homepage
    savePlayer: function() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        saveUser(this.playername, this.birthdate);
        localStorage.setItem('player', this.playername);
        this.$router.push({
          name: 'HomePage',
        });
      }
    },
  },
  validations: {
    playername: {
      required,
      alpha,
    },
    birthdate: {
      required,
      adultValidation(date) {
        let dateArr = date.split('-');
        return parseInt(dateArr[0]) <= 2007;
      },
    },
  },
};
</script>

<style scoped>
.log-text {
  margin-left: 650px;
}
#name-dob {
  margin-left: 500px;
  margin-top: 100px;
  font-weight: bold;
}
#save-player {
  margin-top: 50px;
  margin-left: 160px;
}
.form-feedback-error {
  color: red;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
