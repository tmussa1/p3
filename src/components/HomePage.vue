<template>
  <div>
    <NavBar />
    <div class="row">
      <b-card-group deck>
        <div
          v-for="word in wordData.words"
          :key="word.category"
          class="col-lg-3 col-md-3 col-sm-3 col-xs-12"
        >
          <b-row class="card-indv">
            <b-card bg-variant="success" text-variant="black" class="text-center">
              <b-card-text>Category - {{ word.category }}</b-card-text>
              <router-link
                :to="{
                  name: 'Game',
                  params: {
                    category: word.category
                  },
                }"
              >
                <b-button variant="primary">Let's play</b-button>
              </router-link>
            </b-card>
          </b-row>
        </div>
      </b-card-group>
    </div>
  </div>
</template>

<script>
import wordData from "../../public/wordData";
import NavBar from "./NavBar.vue";

/* eslint-disable no-unused-vars */
export default {
  data: function() {
    return {
      wordData: wordData.data
    };
  },
  methods: {},
  mounted() {},
  components: {
    NavBar
  }
};
</script>
<style scoped>
.card-indv {
  margin: 25px 25px;
  font-weight: bold;
}
</style>
