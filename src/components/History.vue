<template>
  <div>
    <NavBar />
    <h3>
      <span id="history">{{ playerName }}'s</span>
      History || Total Score {{totalScore}}
    </h3>
    <!-- render data records for players with history -->
    <div v-if="!noHistory">
      <b-table hover :items="items" class="col-md-6" id="table"></b-table>
    </div>
    <!-- fallback message for players with no history -->
    <div v-if="noHistory" class="noHistory">
      <b-overlay rounded="sm" class="col-md-6">
        <b-card title="You have no history yet">
          <b-card-text>Keep playing the game to build your reputation</b-card-text>
          <b-button variant="primary" @click="keepPlaying">Keep Playing</b-button>
        </b-card>
      </b-overlay>
    </div>
  </div>
</template>
<script>
import NavBar from "./NavBar.vue";
import store from "../../src/common/store";

/* eslint-disable no-unused-vars */
export default {
  components: {
    NavBar
  },
  data() {
    return {
      items: [],
      noHistory: true,
      store: store
    };
  },
  methods: {
    // Populates fields of history for a given user
    setItemValue: function() {
      for (let item1 in this.history) {
        let item = {
          Word: this.history[item1].word,
          "Final Response": this.history[item1].response,
          points: parseInt(this.history[item1].points),
          status: this.history[item1].correctStatus ? "Correct" : "Incorrect",
          _rowVariant: this.history[item1].correctStatus ? "success" : "danger"
        };
        this.items.push(item);
        this.noHistory = false;
      }
    },
    //Go back to home page
    keepPlaying: function() {
      this.$router.push({
        name: "HomePage"
      });
    }
  },
  computed: {
    //Retrieve player name from local storage
    playerName: function() {
      return localStorage.getItem("player");
    },
    //Retrieve existing history from VueX
    history: function() {
      return this.$store.state.history;
    },
    totalScore: function() {
      return this.$store.getters.getTotalForPlayer(this.playerName);
    }
  },
  //Populate values to render the table
  mounted() {
    this.setItemValue();
  }
};
</script>
<style scoped>
#table {
  margin-left: 400px;
  margin-top: 50px;
}
h3 {
  margin-left: 450px;
  margin-top: 40px;
  border: 3px red solid;
  width: 35%;
}
#history {
  padding-left: 60px;
}
.noHistory {
  margin-left: 500px;
  margin-top: 50px;
}
</style>
