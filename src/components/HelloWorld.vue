<template>
  <div></div>
</template>

<script>
require("dotenv").config();
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  methods: {
    callApi: function() {
      // console.log(process.env.VUE_APP_WORD_API_KEY);
      var data = null;

      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;

      xhr.addEventListener("readystatechange", function() {
        if (this.readyState === this.DONE) {
          console.log(this.responseText);
        }
      });

      xhr.open("GET", "https://wordsapiv1.p.rapidapi.com/words/monday");
      xhr.setRequestHeader("x-rapidapi-host", "wordsapiv1.p.rapidapi.com");
      xhr.setRequestHeader("x-rapidapi-key", process.env.VUE_APP_WORD_API_KEY);

      xhr.send(data);
    }
  },
  mounted() {
    // console.log(process.env.VUE_APP_WORD_API_KEY);
    this.callApi();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
