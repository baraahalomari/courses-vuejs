<template>
  <v-expansion-panels color="#26c6da" max-width="400"  class="mb-3">
    <v-expansion-panel>
      <v-expansion-panel-header> Students Joined </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-list-item class="listOfStudent">
          <v-list-item-title v-if="students?.length == 0 || !students"
            >No Students Joined</v-list-item-title
          >
          <v-list-item-content :key="student.id" v-for="student in students" class="radiusButtom" >
            <v-list-item-title  >{{ student.username }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Students",
  props: {
    students: Array,
  },
  methods: {
    ...mapActions(["joinCourse"]),
  },
};
</script>

<style scoped>
.listOfStudent{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  font-size: 14px;
  overflow: hidden;
}

.radiusButtom{
  border-bottom : 1px solid #e0e0e0;
  width: 100%;

}
</style>
