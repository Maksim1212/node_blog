<template>
    <div v-if = authUser>
<!-- <Head/> -->
        <div class="about">
            <form @submit.prevent="loginUser">
            <div class="">
              <br>
                 <small
                        v-if="!$v.email.required"
                        class="">Enter login
                </small>
                <input

                        type="email"
                        class=""
                        v-model="email"
                        :class="{'is-invalid' : $v.email.$error}">
            </div><br>
            <div class="">
                <input

                        type="password"
                        class=""
                        autocomplete="off"
                        v-model="password"
                        :class="{'is-invalid' : $v.password.$error}"
                >
                <small
                        v-if="!$v.password.required"
                        class="">Enter password
                </small>
            </div>
            <br>
            <button type="submit"
                    class=""
                    :disabled="$v.$invalid">Login</button>
        </form>
        </div>
       <p>
         if you don't have account ,  <router-link to="/register">Register</router-link>
       </p>
    </div>
    <div v-else>
      <p>Account settings:
        <router-link to="/update/password">Update Password</router-link>
      </p>
      <p><button class="" v-on:click="signOut">signOut</button></p>
    </div>
</template>

<script>
/* eslint-disable */
import { mapActions } from 'vuex';
import { required } from 'vuelidate/lib/validators';

export default {
  data() {
    return {
      email: '',
      password: '',
      isButtonDisable: true,
    };
  },
  methods: {
    ...mapActions(['LOGIN_USER']),

    async loginUser() {
      try{
        if (this.email.trim() && this.password.trim()) {
        const data = {
          email: this.email,
          password: this.password,
        };
        const result = await this.LOGIN_USER(data);
        console.log(result);
        localStorage.setItem('name', result.data.name);
        localStorage.setItem('id', result.data._id);
        localStorage.setItem('accessToken', result.data.accessToken);
        this.$router.go('');
      } else {
        throw error;
      }} catch(error) {
       alert('wrong email + password combination');
       this.$router.go('');
      }
    },
    signOut(){
      try{
        localStorage.clear();
        this.$router.go('');
      }catch(error){
        alert('request processing error');
      }
    }
  },
  computed: {
    authUser() {
      if(localStorage.getItem('id')) {
        return false;
      } else return true;
    }
  },
  validations: {
    email: {
      required,
    },
    password: {
      required,
    },
  },
};
</script>

<style scoped>

</style>
