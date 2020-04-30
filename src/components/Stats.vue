<template>
  <!-- A responsive running score graph showing wins/losses statistics. The data is persisted
  based on player name and is accessible at a later point -->
  <div v-cloak>
    <NavBar />
    <div class="row">
      <div id="chartDiv">
        <canvas id="player-statistics"></canvas>
      </div>
      <div class="spacer"></div>
      <b-button variant="success" @click="playGame" id="game-button">Choose a Category</b-button>
    </div>
  </div>
</template>
<script>
import NavBar from "./NavBar.vue";
import Chart from "chart.js";
import winningStatistics from "./../../public/winningStatistics";
import { getCounts } from "../../public/callFirebase";

/* eslint-disable no-unused-vars */
export default {
  data: function() {
    return {
      winningStatistics: winningStatistics,
      winCount: null,
      lossCount: null
    };
  },
  methods: {
    //Draws the chart based on Canvas API and Chart.js
    formChart: function(statistics) {
      let chartCanvas = document.getElementById("player-statistics");
      let playerChart = new Chart(chartCanvas, {
        type: statistics.type,
        data: statistics.data,
        options: statistics.options
      });
    },
    //Players can navigate to the categories section from here
    playGame: function() {
      this.$router.push({
        path: "/categories"
      });
    }
  },
  mounted() {
    //Fetches records of current player and forms initial graph
    getCounts(this.playerName).then(response => {
      this.winCount = response.wins;
      this.lossCount = response.losses;
      this.winningStatistics.data.datasets[0].data[0] = this.winCount;
      this.winningStatistics.data.datasets[0].data[1] = this.lossCount;
      this.formChart(this.winningStatistics);
    });
  },
  components: {
    NavBar
  },
  computed: {
    //Fetches current player name from local storage
    playerName: function() {
      return localStorage.getItem("player");
    }
  }
};
</script>

<style scoped>
[v-cloak] {
  display: none !important;
}
#chartDiv {
  width: 500px;
  height: 500px;
  margin-left: 360px;
}
#game-button {
  height: 40px;
  margin-top: 100px;
}
.spacer {
  margin-left: 20px;
  margin-right: 20px;
}
</style>
