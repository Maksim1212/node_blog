<template>
    <div>
<!-- <Head/> -->
        <div class="about">
            <form @submit.prevent="loginUser">
            <div class="">
              <br>
              <div class="">
                <input

                        type="text"
                        class=""
                        autocomplete="off"
                        v-model="name"
                        :class="{'is-invalid' : $v.name.$error}"
                >
                <small
                        v-if="!$v.name.required"
                        class="">Enter name
                </small>
            </div><br>
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
                    :disabled="$v.$invalid">Register</button>
        </form>
        </div>
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
      name: '',
      isButtonDisable: true,
    };
  },
  methods: {
    ...mapActions(['REGISTER_USER']),

    async loginUser() {
      if (this.email.trim() && this.password.trim() && this.name.trim()) {
        const data = {
          name: this.name,
          email: this.email,
          password: this.password,
        };
        const result = await this.REGISTER_USER(data);
        console.log(result);
        this.$router.push('/account');
      } else {
        console.log('Some error');
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
    name: {
      required,
    },
  },
};
</script>

<style scoped>

</style>
