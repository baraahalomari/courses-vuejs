import axios from "axios";

const courses = {
  state: {
    courses: [],
    numOfPages: 1,
    CoursesPage: [],
    getOne : {},
    loading: false,
    response: false,
    page: 1,
  },
  mutations: {
    setCourses(state, payload) {
      state.courses = payload;
    },
    setAddCourse(state, payload) {
      // state.CoursesPage.push(payload);
    },
    setDeleteCourse(state, payload) { 
     state.CoursesPage = state.CoursesPage.filter(
        (course) => course.course_id !== payload
      );
     
    },
    setUpdateCourse(state, payload) {
      state.CoursesPage.forEach((course) => {
        if (course.course_id === payload.course_id) {
          course.subject = payload.subject;
          course.date = payload.date;
          course.desc = payload.desc;
        }
      });
    },
    setJoinCourse(state, payload) {
      state.CoursesPage.forEach((course) => {
        if (course.course_id === payload.courses_id) {
          course.students.push(payload);
          state.response = "joined";
        }
      });
    },
    setLeaveCourse(state, payload) {
      state.CoursesPage.forEach((course) => {
        if (course.course_id === payload.course_id) {
          course.students.splice(
            course.students.findIndex((i) => i.user_id === payload.user_id),
            1
          );
        }
      });
    },
    setCoursesByPage(state, payload) {
      state.CoursesPage = payload.rows;
      state.numOfPages = Math.ceil(payload.count / 3);
    },
    setCourse(state, payload) {
      state.getOne= payload
    },
    setChangePage(state, payload) {
      state.page = payload;
    }
  },

  actions: {
    async getCourses({ commit }, payload) {
      try {
        const { data } = await axios.get("http://localhost:5000/courses/");
        commit("setCourses", data.response);
      } catch (error) {
        console.log(error);
      }
    },

    async addCourse({ commit }, payload) {
      try {
        const { data } = await axios.post(
          "http://localhost:5000/courses/",
          payload
        );
        commit("setAddCourse", data);
      } catch (error) {
        console.log(error);
      }
    },

    async deleteCourse({ commit }, courseId) {
      try {
        const { data } = await axios.delete(
          `http://localhost:5000/courses/${courseId}`
        );
        commit("setDeleteCourse", courseId);
      } catch (error) {
        console.log(error);
      }
    },

    async updateCourse({ commit }, payload) {
      try {
        const { data } = await axios.put(
          `http://localhost:5000/courses/${payload.course_id}`,
          payload.course
        );
        commit("setUpdateCourse", data);
      } catch (error) {
        console.log(error);
      }
    },

    async joinCourse({ commit }, payload) {
      try {
        const { data } = await axios.post(
          `http://localhost:5000/courses/${payload.course_id}/join`,
          { user: payload.student }
        );
        setTimeout(() => {
          state.response = false;
        }, 500);
        console.log(data);
        commit("setJoinCourse", data);
      } catch (error) {
        console.log(error);
      }
    },
    async leaveCourse({ commit }, payload) {
      try {
       await axios.delete(
          `http://localhost:5000/courses/${payload.course_id}/leave`,
          { data: { user_id: payload.user_id } }
        );
        commit("setLeaveCourse", payload);
      } catch (error) {
        console.log(error);
      }
    },
    async getByBage({ commit }, payload) {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/courses/${payload}/page`
        );
        commit("setCoursesByPage", data);
      } catch (error) {
        console.log(error);
      }
    },
    async getById({ commit }, payload) {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/courses/${payload}`
        );
        commit("setCourse", data);
      } catch (error) {
        console.log(error);
      }
    },
  },

  getters: {
    getAllCourses: (state) => {
      return state.courses;
    },
    getResponse: (state) => {
      return state.response;
    },
    getCoursesByPage: (state) => {
      return state.CoursesPage;
    },
    getNumberOfPages: (state) => {
      return state.numOfPages;
    },
    getCourseById: (state) => {
      return state.getOne;
    },
    getPage: (state) => {
      return state.page;
    }

  },
};

export default courses;
