<template>
  <v-container >
    <v-btn color="primary"  @click="dialog = true" >Add Course </v-btn>
    <AddCourse v-if="user" :dialog="dialog" @closeDialog="dialog = false" />
    <CoursesPage :byPage="coursesByPage" />
    <Pagination />
  </v-container>
</template>

<script>
import CoursesPage from '../components/CoursesPage.vue'
import AddCourse from '../components/AddCourse.vue'
import Pagination from '../components/Paginations.vue'
import getUser from "../utilts/getUser";
import {  mapGetters } from 'vuex';
export default {
  name: 'IndexPage',
  data (){
    return {
      dialog: false,
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
