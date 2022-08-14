<template>
  <div class="auth-container">

    <v-form v-model="valid" class="card-auth" @submit="onSubmit" ref="form">
      <v-col v-if="signup" cols="12" md="6">
        <v-text-field v-model="username" :rules="nameRules" :counter="10" label="Username" required></v-text-field>
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field v-model="password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="passwordRules" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Normal with hint text" hint="At least 5 characters" counter @click:append="show1 = !show1"></v-text-field>
        <p class="error-found">
          {{ error }}
        </p>

      </v-col>

      <v-col cols="12" md="6">
        <v-btn color="primary" type="submit" :disabled="!valid" block>
          {{ signup ? "Sign Up" : "Login" }}
        </v-btn>
      </v-col>

      <v-col cols="12" md="6">
        <v-btn @click="switchAccount" block>{{
            this.signup
              ? "Already Have an Account, Sign In ?"
              : "Don't Have an Account, Sign Up ?"
        }}</v-btn>
      </v-col>
    </v-form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "AuthPage",
  data() {
    return {
      signup: false,
      username: "",
      email: "",
      password: "",
      show1: false,
      valid: false,
      user: "",
      nameRules: [
        (v) => !!v || "Username is required",
        (v) => v.length < 12 || "Username must be less than 12 characters",
      ],
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /^.+@.+\..+$/.test(v) || "E-mail must be valid",
      ],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => v.length > 5 || "Password must be more than 5 characters",
      ],
    };
  },

  methods: {
    ...mapActions(["signUp", "signIn", "getTests"]),
    onSubmit(e) {
      e.preventDefault();
      if (this.$refs.form.validate()) {
        if (this.signup) {
          this.signUp({
            user: {
              username: this.username,
              email: this.email,
              password: this.password,
            },
            router: this.$router,
          });

        } else {
          this.signIn({
            user: { email: this.email, password: this.password }, router: this.$router
          });
        }
      }
    },
    switchAccount() {
      this.signup = !this.signup;
    },
  },

  computed: {
    ...mapGetters({ isLogged: 'getCurrentUser', error: 'getError' }),
    // getUser() {
    //   this.user = this.$store.getters.getCurrentUser;
    //   console.log(this.user);
    // },
  },
};
</script>

<style scoped>
.auth-container {
  margin-top: 100px;
  align-items: center;
  justify-content: center;
}

.card-auth {
  width: 100%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.error-found {
  color: red;
}
</style>
