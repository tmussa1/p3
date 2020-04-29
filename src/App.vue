<template>
  <div id="app" v-cloak>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: function() {
    return {
    };
  },
};
</script>

<style>
[v-cloak] {
  display: none;
}
</style>
