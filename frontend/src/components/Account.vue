<template>
    <div>
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
    </div>
</template>

<script>
/* eslint-disable */
import { mapActions } from 'vuex';
import { required } from 'vuelidate/lib/validators';
// import Head from '../components/Head';
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
        this.$router.push('/');
      } else {
        console.log('Some error');
      }
    },
  },
  computed: {
  },
  components: {
    // Head
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
