import Vuex from "vuex";

import user from "./modules/users";
import courses from "./modules/courses";
import reviews from "./modules/reviews";

const createStore = () => {
  return new Vuex.Store({
    modules: {
      user,
      courses,
      reviews
    },
  });
};

export default createStore;
