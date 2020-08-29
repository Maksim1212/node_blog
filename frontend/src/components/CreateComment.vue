<template>
    <div>
        <div class="inputs">
            <form @submit.prevent="saveComment">
            <div class="form-group">
                <textarea
                        cols="90"
                        class="text-textarea"
                        v-model="body"
                        :class="{'is-invalid' : $v.body.$error}"
                ></textarea>
                <small
                        v-if="!$v.body.required"
                        class="inputMess2"> Write a comment
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
/* eslint-disable */
import { mapActions } from 'vuex';
import { required } from 'vuelidate/lib/validators';

export default {
  name: 'Comment',
  data() {
    return {
      body: '',
      isButtonDisable: true,
    };
  },
  methods: {
    ...mapActions(['CREATE_COMMENT_ITEM']),
    saveComment() {
     try{
        this.body.trim();
        const data = {
          author_id: localStorage.getItem('id'),
          post_id: this.$route.params.id,
          body: this.body,
        };
        this.CREATE_COMMENT_ITEM(data);
        alert('Your comment has been successfully added!');
        this.$router.push('/post/' + this.$route.params.id);
      }catch(error){
       alert(error);
     }
    },
    cancel() {
       this.$router.push('/post/' + this.$route.params.id);
    },
  },
  validations: {
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
