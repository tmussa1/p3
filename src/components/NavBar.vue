<template>
  <div>
    <b-navbar type="dark" variant="dark">
      <b-navbar-brand id="nav-home">
        <router-link to="/">Vocabulary Quiz</router-link>
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input
              size="sm"
              class="mr-sm-2"
              placeholder="Filter categories"
            ></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit"
              >Search</b-button
            >
          </b-nav-form>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import wordData from '../../public/wordData';

/* eslint-disable no-unused-vars */
export default {
  data: function() {
    return {
      wordData: wordData.data,
    };
  },
  methods: {},
  mounted() {},
};
</script>

<style scoped>
.nav-home {
  font-weight: bold;
}
</style>
