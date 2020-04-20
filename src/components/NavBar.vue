<template>
  <div>
    <b-navbar type="dark" variant="dark">
      <router-link to="/">
        <b-navbar-brand id="nav-home">Vocabulary Quiz</b-navbar-brand>
      </router-link>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input
              size="sm"
              class="mr-sm-2"
              placeholder="Filter categories"
              v-model="searchWord"
            ></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit" @click="searchCategory">Search</b-button>
          </b-nav-form>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import wordData from "../../public/wordData";

/* eslint-disable no-unused-vars */
export default {
  data: function() {
    return {
      wordData: wordData.data,
      searchWord: ""
    };
  },
  methods: {
    searchCategory: function() {
      this.$router.push({
        path: "/"
      });
      this.$router.push({
        path: "categories/" + this.searchWord
      });
    }
  }
};
</script>

<style scoped>
.nav-home {
  font-weight: bold;
}
</style>
