<template>
  <div class="container">
    <header class="jumbotron">
      <h3>{{content.username}}</h3>
      <h3>{{content.email}}</h3>
      <hr>
      <h1>&#128679; PAGE UNDER DEVELOPMENT &#128679;</h1>
    </header>
  </div>
</template>

<script>
import UserService from '../services/user.service';
export default {
  name: 'User',
  data() {
    return {
      content: ''
    };
  },
  mounted() {
    UserService.getUserBoard().then(
      response => {
        this.content = response.data;
      },
      error => {
        this.content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );
  }
};
</script>