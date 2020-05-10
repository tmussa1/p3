<template>
  <div>
    <NavBar />
    <h3>{{playerName}}'s History</h3>
    <b-table hover :items="items" class="col-md-6" id="table"></b-table>
  </div>
</template>
<script>
import NavBar from "./NavBar.vue";

/* eslint-disable no-unused-vars */
export default {
  components: {
    NavBar
  },
  data() {
    return {
      items: [
        {
          word: "Chicken",
          points: 0,
          status: "Incorrect",
          _rowVariant: "danger"
        },
        {
          word: "Stock",
          points: 3,
          status: "Correct",
          _rowVariant: "success"
        }
      ]
    };
  },
  computed: {
    playerName: function() {
      return localStorage.getItem("player");
    }
  }
};
</script>
<style scoped>
#table {
  margin-left: 400px;
  margin-top: 50px;
}
h3 {
  margin-left: 625px;
  margin-top: 40px;
  border: 3px red solid;
  width: 17%;
  padding-left: 25px;
}
</style>