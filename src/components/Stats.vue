<template>
  <div v-cloak>
    <NavBar :showStats="true" />
    <div class="row">
      <div id="chartDiv">
        <canvas id="player-statistics"></canvas>
      </div>
      <div class="spacer"></div>
      <b-button variant="success" @click="playGame" id="game-button"
        >Go back to the game</b-button
      >
    </div>
  </div>
</template>

<script>
import NavBar from './NavBar.vue';
import Chart from 'chart.js';
import winningStatistics from './../../public/winningStatistics';

/* eslint-disable no-unused-vars */
export default {
  data: function() {
    return {
      winningStatistics: winningStatistics,
      updatedWinCount: 0,
      updatedLossCount: 0,
    };
  },
  methods: {
    formChart: function(statistics) {
      let chartCanvas = document.getElementById('player-statistics');
      let playerChart = new Chart(chartCanvas, {
        type: statistics.type,
        data: statistics.data,
        options: statistics.options,
      });
    },
    updateCount: function() {
      this.updatedWinCount = parseInt(this.$route.params.winCount);
      this.updatedLossCount = parseInt(this.$route.params.lossCount);
    },
    playGame: function() {
      this.$router.push({
        path: '/categories',
      });
    },
  },
  mounted() {
    this.updateCount();
    this.winningStatistics.data.datasets[0].data[0] = this.updatedWinCount;
    this.winningStatistics.data.datasets[0].data[1] = this.updatedLossCount;
    this.formChart(this.winningStatistics);
  },
  components: {
    NavBar,
  },
  watch: {
    updatedWinCount: function() {
      this.winningStatistics.data.datasets[0].data[0] += this.updatedWinCount;
      this.formChart(this.winningStatistics);
    },
    updatedLossCount: function() {
      this.winningStatistics.data.datasets[0].data[1] += this.updatedLossCount;
      this.formChart(this.winningStatistics);
    },
  },
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
