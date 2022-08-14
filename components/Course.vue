<template>
  <v-card class="mx-auto" color="#26c6da" dark max-width="400">
    <v-card-header class="bg-white p-4 border-b border-gray-200">
      <v-card-title class="text-2xl font-semibold text-gray-900">
        <v-icon large left router> mdi-book </v-icon>
        {{ course.subject }}
      </v-card-title>
    </v-card-header>
    <v-card-text class="text-h5 font-weight-bold">
      {{ course.desc }}
    </v-card-text>
    <v-card-text class="text-h5 font-weight-bold">
      {{ getDate(course.date) }}
    </v-card-text>

    <!-- <Students :students="course.students" /> -->

    <v-card-actions class="mt-3" v-if="user">
      <v-card-actions-button class="btn btn-sm btn-primary ml-2">
        <v-btn class="mx-2" fab dark color="red" @click="onDelete" v-if="isOwner">
          <v-icon dark> mdi-delete </v-icon>
        </v-btn>
        <EditForm :editedCourse="course" v-if="isOwner" />
        <v-btn rounded color="gray" dark @click="onJoinCourse" v-show="!isDisabled && !isOwner">
          Join Course
        </v-btn>
        <v-btn rounded color="red" dark @click="onLeaveCourse" v-show="isDisabled && !isOwner">
          Leave Course
        </v-btn>

        <v-btn class="mx-2" fab color="gray" :to="`course/${course.course_id}`">
          <v-icon>mdi-arrow-expand-all</v-icon>
        </v-btn>
      </v-card-actions-button>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import EditForm from "./EditForm.vue";
import Students from "./Students.vue";
import getUser from "../utilts/getUser";
export default {
  name: "CoursePage",
  data() {
    return {
      isDisabled: this.isIncluded(),
      isOwner: this.setIsOwner(),
      user: getUser(),
    };
  },
  props: {
    course: Object,
  },
  methods: {
    ...mapActions(["deleteCourse", "joinCourse", "leaveCourse", "getByBage"]),
    onDelete() {
      this.deleteCourse(this.course.course_id);
      if (this.$store.state.courses.CoursesPage.length === 1) {
        console.log("length is 0");
        this.getByBage(this.$store.state.courses.page - 1);
        this.$store.commit("setChangePage", this.$store.state.courses.page - 1);
      }
    },
    async onJoinCourse() {
      const user = getUser();
      const payload = { course_id: this.course.course_id, student: user?.user };
      await this.joinCourse(payload);
      if (this.response) {
        this.isDisabled = !this.isDisabled;
      }
    },
    isIncluded() {
      const user = getUser();
      return this.course.students.some((student) => {
        return student.user_id === user?.user?.user_id

      });
    },
    async onLeaveCourse() {
      const { user } = getUser();
      const payload = {
        course_id: this.course.course_id,
        user_id: user.user_id,
      };
      await this.leaveCourse(payload);
      this.isDisabled = !this.isDisabled;
    },
    setIsOwner() {
      const user = getUser();
      return this.course.instractor === user?.user?.user_id;
    },
    getDate(date) {
      return new Date(date).toLocaleDateString();
    },
  },
  components: { EditForm, Students },
  computed: {
    ...mapGetters({ response: "getResponse" }),
  },
};
</script>

<style scoped>
v-card-actions-button {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 1px;
}
</style>
