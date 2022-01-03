<template>
  <div class="background">
    <div class="col-md-12 ">
      <div class="card card-container">
        <form name="form" @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="username">Username</label>
            <input
              v-model="user.username"
              v-validate="'required'"
              type="text"
              class="form-control"
              name="username"
            />
            <div
              v-if="errors.has('username')"
              class="alert alert-danger"
              role="alert"
            >Username is required!</div>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              v-model="user.password"
              v-validate="'required'"
              type="password"
              class="form-control"
              name="password"
            />
            <div
              v-if="errors.has('password')"
              class="alert alert-danger"
              role="alert"
            >Password is required!</div>
          </div>
          <div class="form-group">
            <button class="btnLogin" :disabled="loading">
              <span v-show="loading" class="spinner-border spinner-border-sm"></span>
              <span>Login</span>
            </button>
          </div>
          <div class="form-group">
            <div v-if="message" class="alert alert-danger" role="alert">{{message}}</div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import User from '../models/user';

export default {
  name: 'Login',
  data() {
    return {
      user: new User('', ''),
      loading: false,
      message: ''
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  created() {
    if (this.loggedIn) {
      this.$router.push('/admin');
    }
  },
  methods: {
    handleLogin() {
      this.loading = true;
      this.$validator.validateAll().then(isValid => {
        if (!isValid) {
          this.loading = false;
          return;
        }

        if (this.user.username && this.user.password) {
          this.$store.dispatch('auth/login', this.user).then(
            () => {
              this.$router.push('/admin');
            },
            error => {
              this.loading = false;
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
            }
          );
        }
      });
    }
  }
};
</script>
<style scoped>
.background{
  position: absolute;
  top: 70px;
  left: 0px;
  bottom: 0px;
  width: 100%;
  background: url("../assets/bg.jpeg") no-repeat center center fixed; 
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  box-shadow: 0 0 100px 700px rgba(219, 219, 219, 0.5) inset;
  height: auto;
}
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.card {
  background-color: rgba(240, 255, 240, 0.600);
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 150px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  color: #000;

}
.form-group > input, textarea {
  background-color: rgba(56, 60, 87, 0.5);
  color: #fff;
}
.btnLogin {
  text-transform: uppercase;
  outline: 0;
  background: rgb(56, 60, 87);
  width: 100%;
  border: 0;
  border-radius: 5px;
  padding: 10px;
  color: #FFFFFF;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
  margin-top: 30px;
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
}
.btnLogin:hover {
  transform: scale(1.10, 1.10);
  box-shadow: 0px 25px 9px -17px rgba(34, 60, 80, 0.62);
}
</style>