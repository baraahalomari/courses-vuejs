<template>
  <v-container >
    <AddCourse v-if="user" />
    <CoursesPage :byPage="coursesByPage" />
    <Pagination />
  </v-container>
</template>

<script>
import CoursesPage from '../components/Courses.vue'
import AddCourse from '../components/AddCourse.vue'
import Pagination from '../components/Paginations.vue'
import getUser from "../utilts/getUser";
import {  mapGetters } from 'vuex';
export default {
  name: 'IndexPage',
  data (){
    return {
      user : getUser(),
    }
  },
  components: {
    CoursesPage,AddCourse,Pagination
  },
  
  computed : {
    ...mapGetters({coursesByPage : "getCoursesByPage"})
  }
}
</script>
