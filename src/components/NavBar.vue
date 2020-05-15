<template>
  <div>
    <!-- Provides router powered navigation and search functionality -->
    <b-navbar type="dark" variant="dark">
      <router-link to="/categories">
        <b-navbar-brand id="nav-home">Category</b-navbar-brand>
      </router-link>
      <b-navbar variant="faded" type="light">
        <router-link :to="{
            name: 'stats'}">
          <b-navbar-brand>Score</b-navbar-brand>
        </router-link>
      </b-navbar>
      <b-navbar variant="faded" type="light">
        <router-link :to="{
            name: 'history'}">
          <b-navbar-brand>History</b-navbar-brand>
        </router-link>
      </b-navbar>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input
              size="sm"
              class="mr-sm-2"
              placeholder="Filter categories"
              data-test="search-category"
              v-model="searchWord"
            ></b-form-input>
            <b-button
              size="sm"
              class="my-2 my-sm-0"
              type="submit"
              @click="searchCategory"
              data-test="search-category-button"
            >Search</b-button>
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
  //The app has a search functionality. It enables case insensitive finding of
  //one of the 12 categories. Displays a friendly error message if the category
  //to be searched is not one in the list
  methods: {
    searchCategory: function() {
      this.$router.push({
        path: "/categories/" + this.searchWord
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
