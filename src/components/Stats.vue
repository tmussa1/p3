<template>
  <div v-cloak>
    <NavBar />
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
import {
  getWinCount,
  getLossCount,
  updateWinCount,
  updateLossCount,
} from '../../public/callFirebase';

/* eslint-disable no-unused-vars */
export default {
  data: function() {
    return {
      winningStatistics: winningStatistics,
      nowPlaying: this.$props.playerName,
      updatedLossCount: 0,
      updatedWinCount: 0,
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
    updateValues: function() {
      this.nowPlaying = this.$props.playerName;
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
    NavBar,
  },
  watch: {
    updatedWinCount: function() {
      this.winningStatistics.data.datasets[0].data[0] =
        parseInt(getWinCount(this.nowPlaying)) + parseInt(this.updatedWinCount);
      updateWinCount(
        this.playerName,
        parseInt(this.winningStatistics.data.datasets[0].data[0])
      );
      console.log('now playing', this.nowPlaying);
      console.log('get loss count ', getLossCount(this.nowPlaying));
      this.formChart(this.winningStatistics);
    },
    updatedLossCount: function() {
      this.winningStatistics.data.datasets[0].data[1] =
        parseInt(getLossCount(this.nowPlaying)) + parseInt(this.updatedLossCount);
      updateLossCount(
        this.playerName,
        parseInt(this.winningStatistics.data.datasets[0].data[1])
      );
      console.log('now playing', this.nowPlaying);
      console.log('get loss count ', getLossCount(this.nowPlaying));

      this.formChart(this.winningStatistics);
    },
  },
  props: ['playerName', 'winCount', 'lossCount'],
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
