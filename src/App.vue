<template>
  <div id="app">
    <div class="navHeader">
      <div class="container">
        <div class="cantainerHeader">
          <div class="navAdmin">
<!--             <div class="col-md-6">
              <router-link class="link" to="/home">
                <font-awesome-icon icon="home" />Home
              </router-link>
            </div> -->
            <div v-if="showAdminBoard">
              <router-link class="link" to="/admin"><font-awesome-icon icon="home" /> Admin Board</router-link>
              <router-link class="link" to="/admin/newuser"><font-awesome-icon icon="user" /> Add new driver</router-link>
            </div>
    <!--         <li v-if="showModeratorBoard" class="nav-item">
              <router-link to="/mod" class="nav-link">Moderator Board</router-link>
            </li> -->
    <!--         <li class="nav-item">
              <router-link v-if="currentUser" to="/user" class="nav-link">User</router-link>
            </li> -->
          </div>

          <div class="navAuth" v-if="!currentUser">

<!--               <router-link class="link" to="/register">
                <font-awesome-icon icon="user-plus" />Sign Up
              </router-link> -->


<!--               <router-link class="link" to="/login">
                <font-awesome-icon icon="sign-in-alt" />Login
              </router-link> -->

          </div>

          <div class="navLogout" v-if="currentUser">
            <div>
              <router-link class="link" to="/profile">
                <font-awesome-icon icon="user" />
                {{ currentUser.username }}
              </router-link>
              <a class="link" href @click.prevent="logOut">
                <font-awesome-icon icon="sign-out-alt" />LogOut
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <router-view class="animate__animated animate__fadeIn" :key="$route.fullPath"></router-view>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_ADMIN');
      }
      return false;
    },
    showModeratorBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_MODERATOR');
      }
      return false;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
};
</script>
<style>
*{
  margin:0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  position: relative;
  background-size : cover;
  height : 100vh;
}
.link {
  text-decoration: none; 
  color: #fff;
  padding-left: 10px;
  padding-right: 10px
}

.link:hover{
  color: #DB4664;
}
.navHeader {
  padding-top: 20px;
  background-color: rgb(56, 60, 87);
  height: 70px;
}
.cantainerHeader{
  position: relative;
}
.navAdmin {
  position: absolute;
  left: 0px;
}
.navAuth{
  position: absolute;
  right: 00px;
}
.navLogout {
  position: absolute;
  right: 0px;
}
@media screen and (max-width: 767px) {
  #app {
    height: 100%;
  }
}
@media screen and (max-width: 575px) {
  .navHeader {
    height: 90px;
    padding-top: 8px;
    background-color: rgb(56, 60, 87);
  }
  .link {
    display: block;
    padding-bottom: 3px;
    border: 2px solid #fff;
    border-radius: 10px;
    margin-top: 4px;
  }
}

</style>