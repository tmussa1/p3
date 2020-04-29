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
import { getWinCount, getLossCount } from "../../public/callFirebase";

/* eslint-disable no-unused-vars */
export default {
  data: function() {
    return {
      winningStatistics: winningStatistics,
      updatedWinCount: 0,
      updatedLossCount: 0
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
    this.updatedWinCount += this.winCount;
    this.updatedLossCount += this.lossCount;
    console.log("from stats won ", this.updatedWinCount, " name ", this.playerName);
    console.log("from stats lost ", this.updatedLossCount, " name ", this.playerName);
    this.winningStatistics.data.datasets[0].data[0] = this.updatedWinCount;
    this.winningStatistics.data.datasets[0].data[1] = this.updatedLossCount;
    this.formChart(this.winningStatistics);
  },
  components: {
    NavBar
  },
  computed: {
    playerName: function() {
      return localStorage.getItem("player");
    },
    winCount: {
      get() {
        return getWinCount(this.playerName);
      },
      set(newCount) {
        this.winCount = newCount;
      }
    },
    lossCount: {
      get: function() {
        return getLossCount(this.playerName);
      },
      set: function(newCount) {
        this.lossCount = newCount;
      }
    }
  },
  watch: {
    winCount: function() {
      console.log("from stats won watch ", this.updatedWinCount);
      this.updatedWinCount += this.winCount;
      this.winningStatistics.data.datasets[0].data[0] = this.updatedWinCount;
      this.formChart(this.winningStatistics);
    },
    lossCount: function() {
      console.log("from stats lost watch", this.updatedLossCount);
      this.updatedLossCount += this.lossCount;
      this.winningStatistics.data.datasets[0].data[1] = this.updatedLossCount;
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
