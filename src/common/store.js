import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

/**
 * Preserves the history of correct and incorrect answers with their
 * assigned points to be later shown by the history page
 */
export default new Vuex.Store({
  state: {
    history: [],
  },
  mutations: {
    setWordToGuessAndPlayer(state, payload) {
      state.history.push({
        player: payload.player,
        word: payload.word,
        points: 0,
      });
    },
    updateResponseAndPoints(state, payload) {
      for (let index in state.history) {
        let record = state.history[index];
        if (record.player == payload.player && record.word == payload.word) {
          record.points = payload.points + record.points;
          record.response = payload.response;
          record.correctStatus = payload.correctStatus;
        }
      }
    },
  },
});
