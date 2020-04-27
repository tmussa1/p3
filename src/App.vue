<template>
  <div id="app" v-cloak>
    <router-view
      v-on:save-player="savePlayer($event)"
      :playerName="playerName"
    ></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: function() {
    return {
      playerName: '',
    };
  },
  methods: {
    savePlayer: function(playerName) {
      this.playerName = playerName;
    },
  },
};
</script>

<style>
[v-cloak] {
  display: none;
}
</style>
