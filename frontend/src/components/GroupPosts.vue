<template>
  <div class="hello">
      <div>
    <div class="addArticle" v-if="sessionUser == true">
        <router-link to="/create">Add Post</router-link>
      </div>
      <div v-else>
      </div>
  </div>
    <!-- <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p> -->
  <div>
        <PostItem
        v-for="post in POSTS"
        :key="(Object.assign({}, ...post))._id"
        :posts_data="post"
    />
  </div>
  </div>
</template>

<script>
/* eslint-disable */

import { mapActions, mapGetters } from 'vuex';
import PostItem from './PostItem.vue';

export default {
  name: 'Group',
  props: {
    msg: String,
  },
  methods: {
    ...mapActions(['GET_POSTS_BY_USER_ID']),
  },
  computed: {
    ...mapGetters(['POSTS']),
    sessionUser(){
      if(localStorage.getItem('name')) {
        return true;
      } else return false;
    }
  },
  components: {
    PostItem,
  },

  mounted() {
    this.GET_POSTS_BY_USER_ID(this.$route.params.id);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#hello {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
