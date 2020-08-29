<template>
<div>
<div class="post">
      <h1>{{this.POSTS.title}}</h1>
      <p>{{this.POSTS.author_name}} | {{getDate}}</p>
      <br>
      <p>{{this.POSTS.body}}</p>
</div>
     <div class="buttons" v-if="checkUserId">
        <button v-on:click="editItem">Edit</button>
      </div>
     <div class="buttons" v-else></div>
     <div class="likes">
       <p> {{getLikesCount}} likes</p>
       <button v-on:click="addLike">like</button>
     </div>
     <br><br><br>
     <div>
       <button v-on:click="addComment">ADD Commnet</button>
     </div>
      <div>
        <CommentItem
        v-for="comment in COMMENTS"
        :key="(Object.assign({}, ...comment))._id"
        :comments_data="comment"
    />
  </div>
  </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios';
import { mapActions, mapGetters } from 'vuex';
import CommentItem from './CommentItem';

export default {
  name: 'Post',
  data() {
    return {
      likes: 0,
    };
  },
  methods: {
    ...mapActions(['GET_POST_ITEM_BY_ID_FROM_API',
    'ADD_LIKE_FOR_POST_ITEM', 'FIND_USER', 'GET_COMMENT_ITEMS_BY_ID_FROM_API']),
    editItem() {
      this.$router.push('/post/' + this.$route.params.id + '/edit');
    },
    async addLike() {
      try {
        const data = {
        post_id: this.POSTS._id,
        user_id: localStorage.getItem('id'),
        }
      await this.ADD_LIKE_FOR_POST_ITEM(data);
      await this.GET_POST_ITEM_BY_ID_FROM_API(this.$route.params.id);
      } catch(error) {
         alert('you have already liked this post');
      }
    },
    addComment() {
      this.$router.push('/post/' + this.$route.params.id + '/comment');
    }
  },
  computed: {
    ...mapGetters(['POSTS', 'COMMENTS']),
    getDate() {
      return this.POSTS.creation_time.split('T')[0];
    },
    getName(){
      this.FIND_USER(this.posts_data.author_id);
      return this.NAME;
    },
    checkUserId() {
      const sessionUserId = localStorage.getItem('id');
      if (sessionUserId === this.POSTS.author_id) {
        return true;
      } return false;
    },
    getLikesCount(){
      return this.POSTS.likes.length;
    },
  },
  async mounted() {
    await this.GET_POST_ITEM_BY_ID_FROM_API(this.$route.params.id);
    await this.GET_COMMENT_ITEMS_BY_ID_FROM_API(this.$route.params.id);
   // this.authorID = res.data.creator._id;
  },
   components: {
    CommentItem,
  },
};
</script>

<style scoped>
.post {
  position: relative;
  top: 56px;
    text-align: center;
    outline: 1px solid #000;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
}
.postsActions{
    position: relative;
    left: 49%;
    cursor: pointer;
    width: 22px;
    height: 18px;
}
.edit{
    cursor: pointer;
    width: 22px;
    height: 18px;
    position: relative;
    left: -68%
}
.icons{
    position: absolute;
    left: 95%;
}
.buttons{
  position: absolute;
  top: 20%;
}
.likes{
  position: fixed;
  top: 14%;
  left: 90%;
}
</style>
