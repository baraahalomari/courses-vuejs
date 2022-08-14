<template>
  <v-container fluid class="cards">
    <div  :key="course.id" v-for="course in byPage">
      <CoursePage :course="course" />
    </div>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import CoursePage from "./Course.vue";
export default {
  name: "CoursesPage",
  props: {
    byPage : Array
  },
  components: { CoursePage },
  computed: {
    ...mapGetters({ courses: "getCoursesByPage" }),
  },
  methods: {
    ...mapActions(["getCourses"]),
  }
};
</script>

<style scoped>
.cards{
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  grid-template-rows: repeat(auto-fill, minmax(20rem, 1fr));
  grid-gap: 0.5rem;
  padding: 0.5rem;
  margin: 0.5rem;
 
}
</style>
