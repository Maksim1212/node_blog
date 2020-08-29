<template>
  <div class="CommentItem">
      <div>
          <p class="dataInfo">
              {{getDate}}</p>
      <p>{{getContent}}

      </p>
      <p>{{getLikesCount}} likes</p>
      <button v-on:click="addLike">like</button>
      </div>
  </div>
</template>

<script>
/* eslint-disable */

export default {
  name: 'CommentItem',
  data() {
    return {
      // googleId:Number,
    };
  },
  props: {
    comments_data: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    async addLike() {
      try {
        const data = {
        comment_id: this.comments_data._id,
        user_id: localStorage.getItem('id'),
        }
      await this.ADD_LIKE_FOR_POST_ITEM(data);
      // await this.GET_POST_ITEM_BY_ID_FROM_API(this.$route.params.id);
      // this.$route.go();
      } catch(error) {
         alert('you have already liked this post');
      }
    },
    addComment() {
      this.$router.push('/post/' + this.$route.params.id + '/comment');
    }
  },
  computed: {
    getDate() {
      return this.comments_data.creation_time.split('T')[0];
    },
    getContent() {
      return this.comments_data.body;
    },
    // getName(){
    //   return this.posts_data.author_name;
    // },
    getLikesCount(){
      return this.comments_data.likes.length;
    },
    checkUserId() {
      let sessionUserId = localStorage.getItem('id');
      let authorID = this.posts_data.author_id;
      if(sessionUserId == authorID){
          return true;
      } else return false;
    },
  },

  mounted() {},
};
</script>

<style scoped>
.CommentItem {
    outline: 1px solid #000;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
}
.edit{
    cursor: pointer;
    width: 22px;
    height: 18px;
    position: relative;
    left: -72%
}
.icons{
    position: relative;
    top: -38px;
    left: 96%;
    width: 48px;
}
.postsActions{
    position: relative;
    left: 30%;
    cursor: pointer;
    width: 22px;
    height: 18px;
}
</style>
