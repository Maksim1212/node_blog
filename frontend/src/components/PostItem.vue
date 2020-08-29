<template>
  <div class="PostItem">
      <h3>{{posts_data.title}}</h3>
      <!-- <div class="icons" v-if="checkUserId">
     <router-link :to="{name: 'Edit', params: {id: posts_data._id}}">
          <img class="edit" src="../assets/pencil.svg">
      </router-link>
      </div> -->
      <!-- <div class="icons" v-else></div> -->
      <div>
          <p class="dataInfo"> <router-link :to="{name: 'Read',
          params: {id: posts_data.author_id}}">
             {{getName}}
          </router-link> | {{getDate}}</p>
      <p>{{getContent}}
           <router-link :to="{name: 'Read', params: {id: posts_data._id}}">
              ...
          </router-link>
      </p>
      <p>{{getLikesCount}} likes</p>
      </div>
  </div>
</template>

<script>
/* eslint-disable */

export default {
  name: 'PostItem',
  data() {
    return {
      // googleId:Number,
    };
  },
  props: {
    posts_data: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {},
  computed: {
    getDate() {
      return this.posts_data.creation_time.split('T')[0];
    },
    getContent() {
      return this.posts_data.body.substring(0, 70);
    },
    getName(){
      return this.posts_data.author_name;
    },
    getLikesCount(){
      return this.posts_data.likes.length;
    },
    checkUserId() {
      // let sessionUserId = localStorage.getItem('sessionUserId');
      // let authorID = this.posts_data.author._id;
      // if(sessionUserId == authorID){
      //     return true;
      // } else return false;
      return true;
    },
  },

  mounted() {},
};
</script>

<style scoped>
.PostItem {
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
