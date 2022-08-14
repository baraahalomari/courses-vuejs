<template>
  <v-container class="mt-5">

    <h2 class="title" >{{ course.subject }}</h2>
    <h4>Description</h4>
    <p>{{ course.desc }}</p>
    <h4>Started At</h4>
    <p>{{ getDate(course.date) }}</p>
    sections
    <v-divider inset class="mb-5"></v-divider>
    <Students :students="course.students" />
    <v-spacer></v-spacer>
    Reviews
    <v-divider inset class="mb-5"></v-divider>
    <Reviews :reviews="course.reviews" :instructor_id="course.instractor" />


  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Students from "../../components/Students.vue";
import Reviews from "../../components/Reviews.vue";

export default {
  data() {
    return {
      id: this.$route.params.id,
    };
  },
  methods: {
    ...mapActions(["getById"]),
    getDate(date) {
      return new Date(date).toLocaleDateString();
    },
  },
  computed: {
    ...mapGetters({
      course: "getCourseById",
    }),
  },
  mounted() {
    this.getById(this.id);
  },
  components: {
    Students,Reviews
  },
};
</script>

<style scoped>
.title {
  font-size: 25px;
  font-weight: 900;
  margin-bottom: 20px;
  color: rgb(38,198,218);
}
</style>
