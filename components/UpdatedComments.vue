<template>
  <div class="reviews-header" >
    <span v-if="!close">{{
      comment.comment
    }}</span>
    <span
      v-if="edit && anyComment === comment.review_id  && close"
      class="reviews-header"
    >
      <v-text-field v-model="updatedComment" :value="comment.comment">
      </v-text-field>
      <v-btn icon @click="onEdit(comment.review_id)">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </span>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: "UpdateComments",
  data() {
    return {
      updatedComment: this.comment.comment,
      close : true,
    };
  },
  props: {
    comment: Object,
    edit: Boolean,
    anyComment: String,
  },
  methods:{
    ...mapActions(['updateReviews']),
      onEdit(review_id){
        const payload = {
          comment: this.updatedComment,
          review_id: review_id,
        };
        
        this.updateReviews(payload);
        this.close = false;
      },

    
  }
};
</script>

<style scoped>
.reviews-header {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
</style>
