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
import {
  getWinCount,
  getLossCount,
  updateWinCount,
  updateLossCount
} from "../../public/callFirebase";

/* eslint-disable no-unused-vars */
export default {
  data: function() {
    return {
      winningStatistics: winningStatistics,
      nowPlaying: localStorage.getItem("player"),
      updatedLossCount: getWinCount(this.nowPlaying),
      updatedWinCount: getLossCount(this.nowPlaying)
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
    updateValues: function() {
      this.nowPlaying = localStorage.getItem("player");
    },
    playGame: function() {
      this.$router.push({
        path: "/categories"
      });
    }
  },
  mounted() {
    this.updateValues();
    this.winningStatistics.data.datasets[0].data[0] = parseInt(
      getWinCount(this.nowPlaying)
    );
    this.winningStatistics.data.datasets[0].data[1] = parseInt(
      getLossCount(this.nowPlaying)
    );

    this.formChart(this.winningStatistics);
  },
  components: {
    NavBar
  },
  watch: {
    updatedWinCount: function() {
      this.winningStatistics.data.datasets[0].data[0] = parseInt(
        getWinCount(this.nowPlaying)
      );
      updateWinCount(
        this.nowPlaying,
        parseInt(this.winningStatistics.data.datasets[0].data[0])
      );
      this.formChart(this.winningStatistics);
    },
    updatedLossCount: function() {
      this.winningStatistics.data.datasets[0].data[1] = parseInt(
        getLossCount(this.nowPlaying)
      );
      updateLossCount(
        this.nowPlaying,
        parseInt(this.winningStatistics.data.datasets[0].data[1])
      );
      this.formChart(this.winningStatistics);
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
