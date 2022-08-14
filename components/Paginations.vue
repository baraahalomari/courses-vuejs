<template>
  <div class="text-center">
    <v-pagination v-model="page" :length="lengthOfPages" circle></v-pagination>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Pagination",
  data() {
    return {
      page: this.$store.state.courses.page,
    };
  },
  methods: {
    ...mapActions(["getByBage"]),
  },
  computed: {
    ...mapGetters({
      lengthOfPages: "getNumberOfPages",
      coursesByPage: "getPage",
    }),
  },
  watch: {
    page: function (val) {
      this.$store.commit("setChangePage", val);
      this.getByBage(this.$store.state.courses.page);
    },
  },
  mounted() {
    this.getByBage(this.$store.state.courses.page);
  },
};
</script>

<style  scoped></style>
