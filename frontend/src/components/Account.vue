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
    loginUser() {
      if (this.email.trim() && this.password.trim()) {
        const data = {
          email: this.email,
          password: this.password,
        };
        this.LOGIN_USER(data);

        this.$router.push('/news');
      } else {
        console.log('Some error');
      }
    },
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
