<template>
  <div>
    <v-dialog transition="dialog-bottom-transition" max-width="600" v-model="dialog">
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="mx-2" fab dark color="#cccc00" v-bind="attrs" v-on="on" @click="dialog = true">
          <v-icon dark> mdi-pencil </v-icon>
        </v-btn>
      </template>
      <template>
        <v-card>
          <v-toolbar color="primary" dark>Edit Course</v-toolbar>
          <v-form v-model="valid" align="center" justify="center" @submit="onSubmit" ref="form">
            <v-col cols="12" md="12">
             <v-text-field v-model="subject" :rules="subjectRule" :counter="20" label="Subject" required></v-text-field>
            </v-col>

            <v-col cols="12" md="12">
              <v-text-field v-model="desc" :rules="descRules" label="Description" required></v-text-field>
            </v-col>

            <v-col cols="12" sm="12" md="12">
              <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="date" transition="scale-transition" offset-y min-width="auto">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field :rules="dateRules" v-model="date" label="Picker in menu" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" required></v-text-field>
                </template>
                <v-date-picker v-model="date" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu = false">
                    Cancel
                  </v-btn>
                  <v-btn text color="primary" @click="$refs.menu.save(date)">
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-card-actions class="justify-end">
              <v-btn type="submit" :disabled="!valid">Edit </v-btn>
              <v-btn text @click="dialog = false">Close</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "EditForm",
  data() {
    return {
      subject: this.editedCourse.subject,
      date: this.editedCourse.date,
      desc: this.editedCourse.desc,
      valid: false,
      dialog: false,
    };
  },
  props: {
    editedCourse: Object,
  },
  methods: {
    ...mapActions(["updateCourse"]),
    onSubmit(e) {
      e.preventDefault();
      if (this.$refs.form.validate()) {
        this.updateCourse({
          course_id: this.editedCourse.course_id,
          course: {
            subject: this.subject,
            date: this.date,
            desc: this.desc,
            instractor: this.editedCourse.instractor,
          },
        });
        this.dialog = false;
      }
    },
  },
};
</script>

<style scoped>
</style>
