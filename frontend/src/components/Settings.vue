<template>
    <div>
<!-- <Head/> -->
        <div class="about">
            <form @submit.prevent="updatePass">
            <div class="">
              <br>
              <div class="">
                <small
                        v-if="!$v.email.required"
                        class="">Confirm Email
                </small>
                <input

                        type="email"
                        class=""
                        v-model="email"
                        :class="{'is-invalid' : $v.email.$error}">
            </div><br>
                <input

                        type="password"
                        class=""
                        autocomplete="off"
                        v-model="newPassword"
                        :class="{'is-invalid' : $v.newPassword.$error}"
                >
                <small
                        v-if="!$v.newPassword.required"
                        class="">Enter newPassword
                </small>
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
                    :disabled="$v.$invalid">Confirm</button>
        </form>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import { required } from 'vuelidate/lib/validators';
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
      newPassword: '',
      isButtonDisable: true,
    };
  },
  methods: {
    async updatePass() {
      try{if (this.email.trim() && this.password.trim() && this.newPassword.trim()) {
        const data = {
          newPassword: this.newPassword,
          email: this.email,
          password: this.password,
        };
        const result = await axios.post('http://127.0.0.1:3000/v1/auth/update', {
        email: `${this.email}`, password: `${this.password}`,newPassword: `${this.newPassword}`});
        localStorage.clear();
        this.$router.push('/account');
      } else {
        throw error;
      }}catch(error){
       alert('wrong email + password combination');
      }
    },
  },
  computed: {
  },
  validations: {
    email: {
      required,
    },
    password: {
      required,
    },
    newPassword: {
      required,
    },
  },
};
</script>

<style scoped>

</style>
