<template>
<div>
<div class="post">
    <!-- <div class="icons" v-if="checkUserId">
          <img class="postsActions" src="../assets/clear.svg" v-on:click="deleteItem">
     <router-link :to="{name: 'Edit', params: {}}">
  <img class="edit" src="../assets/pencil.svg">
      </router-link>
      </div> -->
      <!-- <div v-else></div> -->
      <h1>{{this.POSTS.title}}</h1>
      <p>{{this.POSTS.author_id}} | {{getDate}}</p>
      <br>
      <p>{{this.POSTS.body}}</p>
</div>
     <!-- <div class="buttons" v-if="checkUserId">
        <button v-on:click="editItem">Редактировать</button>
        <button class="delButton" v-on:click="deleteItem">Удалить</button>
     </div> -->
     <!-- <div class="buttons" v-else></div> -->
  </div>
</template>

<script>
/* eslint-disable */
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'Post',
  data() {
    return {
      authorID: '',
    };
  },
  methods: {
    ...mapActions(['GET_POST_ITEM_BY_ID_FROM_API']),
    ...mapActions(['FIND_USER']),
    deleteItem() {
      const data = {
        id: this.$route.params.id,
        token: localStorage.getItem('api_token'),
      };
      this.DELETE_POSTS_ITEM_BY_ID_FROM_API(data);
      this.$router.push('/posts');
    },
    editItem() {
      this.$router.push('/posts/' + this.$route.params.id + '/edit');
    },
  },
  computed: {
    ...mapGetters(['POSTS']),
    getDate() {
      return this.POSTS.creation_time.split('T')[0];
    },
    getName(){
      this.FIND_USER(this.posts_data.author_id);
      return this.NAME;
    },
    // checkUserId() {
    //   const sessionUserId = localStorage.getItem('sessionUserId');
    //   if (sessionUserId === this.authorID) {
    //     return true;
    //   } return false;
    // },
  },
  async mounted() {
    const res = await this.GET_POST_ITEM_BY_ID_FROM_API(this.$route.params.id);
    console.log(res);
   // this.authorID = res.data.creator._id;
  },
  components: {

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
  position: fixed;
  top: 50%;
}
.delButton{
  margin-left: 6px;
}
</style>
