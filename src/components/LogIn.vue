<template>
  <div>
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
        v-model="playername"
        id="player-name"
        placeholder="Enter your name"
      ></b-form-input>
      <label for="datepicker-placeholder">What's your birthday?</label>
      <b-form-datepicker
        v-model="birthdate"
        id="datepicker-placeholder"
        placeholder="Choose a date"
        local="en"
      ></b-form-datepicker>
      <b-button variant="primary" @click="savePlayer" id="save-player"
        >Let's Play</b-button
      >
    </div>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import { saveUser } from '../../public/callFirebase';

export default {
  data: function() {
    return {
      playername: '',
      birthdate: '',
    };
  },
  methods: {
    savePlayer: function() {
      saveUser(this.playername, this.birthdate);
      this.$router.push({
        name: 'HomePage',
        params: { playerName: this.playername },
      });
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
</style>
