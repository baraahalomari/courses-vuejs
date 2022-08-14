import axios from "axios";

const user = {
  state: {
    user: null,
    error: null,
  },
  mutations: {
    setSignUp: (state, payload) => {

      state.user = payload;
      localStorage.setItem("user", JSON.stringify(payload));
      state.error = null;
    },
    setSignIn: (state, payload) => {
      state.user = payload;
      console.log(state.user);
      localStorage.setItem("user", JSON.stringify(payload));
      state.error = null;
    },
    setError: (state, payload) => {
      state.error = payload;
    },
    setCurrentUser : (state, payload) => {
      state.user = payload;
    },
  },
  actions: {
    async signUp({ commit }, payload) {
      try {
        const { data } = await axios.post(
          "http://localhost:5000/users/signup",
          payload.user
        );
        commit("setSignUp", data);
        payload.router.push("/");
      } catch (error) {
        console.log(error);
      }
    },
    async signIn({ commit }, payload) {
      try {
        const { data } = await axios.post(
          "http://localhost:5000/users/signin",
          payload.user
        );
        commit("setSignIn", data);
        payload.router.push("/");
      } catch (error) {
        console.log(error?.response?.data?.message);
        commit("setError", error?.response?.data?.message);
      }
    },
  },

  getters: {
    getCurrentUser: (state) => {
      return state.user;
    },
    getError: (state) => {
      return state.error;
    },
  },
};

export default user;
