import axios from "axios";

const Test = {
  namespace: true,
  state: {
    test : null,
  },
  mutations: {
    setTest: (state, payload) => {
      state.test = payload;
      // localStorage.setItem("user", JSON.stringify(payload));
    },
  },
  actions: {
    async getTests({ commit }, payload) {
      try {
        const { data } = await axios.get(
          "https://jsonplaceholder.typicode.com/todos/1",
        );
        commit("setTest", data);
        console.log(this.state.test);
      } catch (error) {
        console.log(error);
      }
    },
  },

  getters: {
    getTest: (state) => {
      return state.test;
    }
  },
};
export default Test;