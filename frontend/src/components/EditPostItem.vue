<template>
<div class="EditPostItem">
  <Head/>
     <div class="formPosition">
        <form id="edit-post-form" @submit.prevent="editPost">
          <div class="form-group col-md-12">
              <input type="text"
              id="title"
              size="90"
              v-model="title"
              name="title"
              class="form-control"
              placeholder="Enter title"
              :class="{'is-invalid' : $v.title.$error}">
           </div><br>
        <div class="form-group col-md-12">
           <textarea id="body" cols="90" rows="20" v-model="body" class="form-control"
                        :class="{'is-invalid' : $v.body.$error}"></textarea>
        </div>
           <div class="successButton">
             <button class="btn btn-success" type="submit"
             :disabled="$v.$invalid"> Сохранить </button>
        </div>
        </form>
      </div>
          <div class="cancelButton">
            <button v-on:click="cancel">Отменить</button>
          </div>
      </div>

</template>

<script>
/* eslint-disable */
import { mapActions } from 'vuex';
import { required } from 'vuelidate/lib/validators';

export default {
  name: 'Edit',
  data() {
    return {
      title: '',
      body: '',
    };
  },
  methods: {
    ...mapActions(['GET_POST_ITEM_BY_ID_FROM_API', 'UPDATE_POST_ITEM_BY_ID_FROM_API']),
    cancel() {
      this.$router.push('/post/' + this.$route.params.id);
    },
    editPost() {
      const postData = {
        title: this.title,
        body: this.body,
        id: this.$route.params.id,
        // token: localStorage.getItem('api_token'),
      };
      this.UPDATE_POST_ITEM_BY_ID_FROM_API(postData);
      this.$router.push('/post/' + this.$route.params.id);
    },
  },
  validations: {
    title: {
      required,
    },
    body: {
      required,
    },
  },
  async mounted() {
    const result = await this.GET_POST_ITEM_BY_ID_FROM_API(this.$route.params.id);
    this.title = result.data.post['title'];
    this.body = result.data.post['body'];
  },
};
</script>

<style>
.successButton{
  position: fixed;
  left: 25%;
  top: 510px;
}
.formPosition{
  position: fixed;
  left: 25%;
  top: 25%;
}
.cancelButton{
  position: fixed;
  left: 32%;
  top: 510px;
}
</style>
