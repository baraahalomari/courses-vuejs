import axios from "axios";

const reviews = {
  state: {
    reviews: [],
  },
  mutations: {
    setReviews(state, payload) {
      state.reviews = payload;
    },
    setAddReviews(state, payload) {
      state.reviews.push(payload);
    },
    setDeleteReviews(state, payload) {
      state.reviews = state.reviews.filter(
        (review) => review.review_id !== payload
      );
    },
    setUpdateReviews(state, payload) {
      state.reviews.forEach((review) => {
        if (review.review_id === payload.review_id) {
          review.comment = payload.comment;
        }
      });
    },
  },
  actions: {
    async getReviews({ commit }, payload) {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/reviews/${payload}`
        );
        commit("setReviews", data);
      } catch (error) {
        console.log(error);
      }
    },
    async addReviews({ commit }, payload) {
      try {
        const { data } = await axios.post(
          `http://localhost:5000/reviews`,
          payload
        );
        commit("setAddReviews", data);
      } catch (error) {
        console.log(error);
      }
    },
    async deleteReviews({ commit }, payload) {
      try {
        const { data } = await axios.delete(
          `http://localhost:5000/reviews/${payload}`
        );
        console.log(data);
        commit("setDeleteReviews", payload);
      } catch (error) {
        console.log(error);
      }
    },
    async updateReviews({ commit }, payload) {
      try {
        const { data } = await axios.put(
          `http://localhost:5000/reviews/${payload.review_id}`,
          { comment: payload.comment }
        );
        commit("setUpdateReviews", data);
      } catch (error) {
        console.log(error);
      }
    },
  },
  getters: {
    getReviews(state) {
      return state.reviews;
    },
  },
};

export default reviews;
