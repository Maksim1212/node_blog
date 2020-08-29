<template>
    <div>
        <div class="inputs">
            <form @submit.prevent="sendPost">
            <div class="form-group">
                 <small
                        v-if="!$v.title.required"
                        class="inputMess"> Write an article title
                </small>
                <input
                        size="90"
                        type="text"
                        class="form-control"
                        v-model="title"
                        :class="{'is-invalid' : $v.title.$error}">
            </div><br>
            <div class="form-group">
                <textarea
                        cols="90"
                        class="text-textarea"
                        v-model="body"
                        :class="{'is-invalid' : $v.body.$error}"
                ></textarea>
                <small
                        v-if="!$v.body.required"
                        class="inputMess2"> Write an article body
                </small>
            </div>
            <button type="submit"
                    class="btn-btn-primary"
                    :disabled="$v.$invalid">Save</button>
        </form>
        <button class="cancelButton" v-on:click="cancel">Cancel</button>
        </div>
    </div>
</template>

<script>

import { mapActions } from 'vuex';
import { required } from 'vuelidate/lib/validators';

export default {
  name: 'Create',
  data() {
    return {
      title: '',
      body: '',
      isButtonDisable: true,
    };
  },
  methods: {
    ...mapActions(['CREATE_POST_ITEM']),
    sendPost() {
      if (this.title.trim() && this.body.trim()) {
        const data = {
          author_id: localStorage.getItem('id'),
          author_name: localStorage.getItem('name'),
          title: this.title,
          body: this.body,
        };
        this.CREATE_POST_ITEM(data);
        alert('Your post has been successfully added!');
        this.$router.push('/');
      } else {
        console.log('Some error');
      }
    },
    cancel() {
      // this.$router.push('/posts/');
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
};
</script>

<style scoped>
.form-control{
    position: fixed;
    top: 74px;
    left: 22%
}
.post_form{
    text-align: center;
    max-width: 50rem;
    margin-left: 10rem;
    margin-top: 10rem;
    }
.text-textarea{
    height: 20rem;
    position: fixed;
    top:120px;
    left: 22%
}
.inputMess{
    position:fixed;
    top: 54px;
    left: 588px;
}
.inputMess2{
    position:fixed;
    top: 100px;
    left: 588px;
}
.btn-btn-primary{
    position: fixed;
    top: 460px;
    left: 286px;
}
.cancelButton{
    position: fixed;
    top: 460px;
    left: 388px;
}
</style>
