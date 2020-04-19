<template>
  <div>
    <div class="row">
      <b-card-group deck>
        <div
          v-for="word in wordData.words"
          :key="word.category"
          class="col-lg-3 col-md-3 col-sm-3 col-xs-12"
        >
          <b-row class="card-indv">
            <b-card
              bg-variant="success"
              text-variant="black"
              class="text-center"
            >
              <b-card-text>Category - {{ word.category }}</b-card-text>
              <b-button :href="'/categories/' + word.category" variant="primary"
                >Let's play</b-button
              >
            </b-card>
          </b-row>
        </div>
      </b-card-group>
    </div>
  </div>
</template>

<script>
require('dotenv').config();
import wordData from '../../public/wordData';

/* eslint-disable no-unused-vars */
export default {
  data: function() {
    return {
      wordData: wordData.data,
    };
  },
  methods: {
    callApi: function() {
      var data = null;

      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;

      xhr.addEventListener('readystatechange', function() {
        if (this.readyState === this.DONE) {
          console.log(this.responseText);
        }
      });

      xhr.open('GET', 'https://wordsapiv1.p.rapidapi.com/words/monday');
      xhr.setRequestHeader('x-rapidapi-host', 'wordsapiv1.p.rapidapi.com');
      xhr.setRequestHeader('x-rapidapi-key', process.env.VUE_APP_WORD_API_KEY);

      xhr.send(data);
      console.log(wordData);
    },
  },
  mounted() {
    this.callApi();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card-indv {
  margin: 25px 25px;
  font-weight: bold;
}
</style>
