<template>
  <div>

    <v-expansion-panels color="#26c6da" class="mb-3">
      <v-expansion-panel class="comments-con">
        <v-expansion-panel-header>Show Reviews</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-list-item two-line class="comments-con">
            <v-list-item-title v-if="comments?.length == 0 || !comments">No Reviews</v-list-item-title>
            <v-list-item-content :key="comment.id" v-for="comment in comments" class="comments-views">
              <v-list-item-title class="reviews-header"><span>{{ comment.username }} </span>
                <span>{{ getTime(comment.createdAt) }}</span>
              </v-list-item-title>

              <v-list-item-subtitle class="reviews-header">
                <span v-if="!edit || anyComment != comment.review_id">{{
                    comment.comment
                }}</span>

                <UpdateComments :comment="comment" :edit="edit" :anyComment="anyComment" />

                <span>
                  <v-menu bottom left>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn icon v-bind="attrs" v-on="on" v-show="handleShowListIcon(comment.user_id)">
                        <v-icon>mdi-dots-vertical</v-icon>
                      </v-btn>
                    </template>

                    <v-list>
                      <v-list-item v-for="item in items" :key="item.value" v-show="selectSection(item.show, comment.user_id)" @click="selectSection(item.value, comment.review_id)">
                        <v-list-item-title>{{ item.text }}</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </span>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <div class="reviews-header">
            <v-text-field label="Add Comment" block v-model="newComment"></v-text-field>
            <v-btn class="mx-2" fab dark color="indigo" :disabled="!newComment" @click="onAddComment">
              <v-icon dark> mdi-plus </v-icon>
            </v-btn>
          </div>

        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import UpdateComments from "./UpdatedComments.vue";
import getUser from "../utilts/getUser";
import moment from "moment";
export default {
  name: "Reviews",
  data() {
    return {
      updatedComment: "",
      anyComment: "",
      id: this.$route.params.id,
      newComment: "",
      isOwner: this.checkIsOwner(),
      edit: false,
      items: [
        {
          text: "Edit",
          icon: "mdi-pencil",
          value: "edit",
          color: "indigo",
          show: "showEdit",
        },
        {
          text: "Delete",
          icon: "mdi-delete",
          value: "delete",
          color: "red",
          show: "showDelete",
        },
      ],
      isLogin: getUser(),
    };
  },
  computed: {
    ...mapGetters({ comments: "getReviews" }),
  },
  methods: {
    ...mapActions(["getReviews", "addReviews", "deleteReviews"]),
    getTime(date) {
      return moment(date).fromNow();
    },
    onAddComment() {
      const user = getUser();
      const payload = {
        comment: this.newComment,
        username: user?.user?.username,
        course_id: this.id,
        user_id: user?.user?.user_id,
      };
      this.addReviews(payload);
      this.newComment = "";
    },
    checkIsOwner(user_id) {
      const user = getUser();
      return user?.user?.user_id === user_id;
    },

    selectSection(item, review_id) {
      switch (item) {
        case "edit":
          this.handleShowComment(review_id);
          break;
        case "delete":
          this.deleteReview(review_id);
          break;
        case "showEdit":
          return this.checkIsOwner(review_id);

        case "showDelete":
          const user = getUser();

          return (
            this.instructor_id == user?.user?.user_id ||
            this.checkIsOwner(review_id)
          );
      }
    },
    handleShowListIcon(review_id) {
      const user = getUser();
      return this.instructor_id == user?.user?.user_id || this.checkIsOwner(review_id)
    },

    handleShowComment(review_id) {
      this.edit = true;

      this.anyComment = this.comments.find(
        (comment) => comment.review_id === review_id
      )?.review_id;
    },
    deleteReview(review_id) {
      this.deleteReviews(review_id);
    },
  },
  mounted() {
    this.getReviews(this.id);
  },
  components: {
    UpdateComments,
  },
  props: {
    instructor_id: String,
  },
};
</script>

<style scoped>
.reviews-header {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.comments-views {
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: 14px;
  border-bottom: 1px solid #e0e0e0;
}

.comments-con {
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>
