<template>
  <div v-cloak>
    <NavBar />
    <div class="row">
      <div id="chartDiv">
        <canvas id="player-statistics"></canvas>
      </div>
      <div class="spacer"></div>
      <b-button variant="success" @click="playGame" id="game-button">Go back to the game</b-button>
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
      lossCOunt: null
    };
  },
  methods: {
    formChart: function(statistics) {
      let chartCanvas = document.getElementById("player-statistics");
      let playerChart = new Chart(chartCanvas, {
        type: statistics.type,
        data: statistics.data,
        options: statistics.options
      });
    },
    playGame: function() {
      this.$router.push({
        path: "/categories"
      });
    }
  },
  mounted() {
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
  width: 200px;
  height: 40px;
  margin-top: 100px;
}
.spacer {
  margin-left: 20px;
  margin-right: 20px;
}
</style>
