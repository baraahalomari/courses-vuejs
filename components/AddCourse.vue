<template>
  <div>
    <v-col cols="auto">
     
      <v-dialog
        transition="dialog-bottom-transition"
        max-width="600"
        v-model="dialog"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" v-bind="attrs" v-on="on" @click="dialog = true"
            >Add Course     </v-btn>
        </template>
        <template>
          <v-card>
            <v-toolbar color="primary" dark>Add New Course</v-toolbar>
            <v-form
              v-model="valid"
              align="center"
              justify="center"
              @submit="onSubmit"
              ref="form"
              class="add-form"
            >
              <v-col cols="12" md="12">
                <v-text-field
                  v-model="subject"
                  :rules="subjectRule"
                  :counter="20"
                  label="Subject"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="12">
                <v-text-field
                  v-model="desc"
                  :rules="descRules"
                  label="Description"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="12" md="12">
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="date"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      :rules="dateRules"
                      v-model="date"
                      label="Picker in menu"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      required
                    ></v-text-field>
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
                <v-btn type="submit" :disabled="!valid">Add </v-btn>
                <v-btn text @click="dialog = false">Close</v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </template>
      </v-dialog>
    </v-col>
  </div>
</template>

<script>
import { mapActions ,mapState } from "vuex";
import getUser from "../utilts/getUser";

export default {
  name: "AddCourse",
  data() {
    return {
      subject: "",
      menu: false,
      valid: false,
      dialog: false,
      desc: "",
      date: "",
      subjectRule: [(v) => !!v || "Subject is required"],
      descRules: [(v) => !!v || "Description is required"],
      dateRules: [(v) => !!v || "Date is required"],
    };
  },
  methods: {
    ...mapActions(["addCourse","getByBage"]),
    onSubmit(e) {
      e.preventDefault();
      if (this.$refs.form.validate()) {
        const { user } = getUser();
        this.addCourse({
          subject: this.subject,
          desc: this.desc,
          date: this.date,
          instractor: user.user_id,
        });
        this.$refs.form.reset();
        this.dialog = false;
    
         this.getByBage(this.$store.state.courses.page);
      }
    },
  },
  computed: {
    ...mapState({
      coursesByPage: (state) => state.page,
    }),
  },
};
</script>

<style scoped>
.add-form {
  justify-content: center;
  align-items: center;
}
</style>
