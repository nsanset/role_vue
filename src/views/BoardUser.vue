<template>
  <div class="container">
    <header class="jumbotron">
      <h3>{{content.username}}</h3>
      <h3>{{content.email}}</h3>
    </header>
    <div>
        <form @submit.prevent="onUpload">
            <div class="form-group">
                <input type="file" name="img" @change="onChange">
            </div>
            <div class="form-group">
                <button class="btn btn-success">Submit</button>
            </div>
        </form>
    </div>
    <ul id="example-1">
      <li v-for="item in content.images" :key="item.id">
<!--         {{ item.img.data }} -->
<!--         <img :src="data:image/png;base64, item.img.data.toString('base64')" /> -->
        <img :src="`data:image/png;base64,${item.img.data.toString('base64')}`" />
      </li>
    </ul>
  </div>
</template>

<script>
import UserService from '../services/user.service';
import authHeader from '../services/auth-header';
import axios from 'axios';
export default {
  name: 'User',
  data() {
    return {
      content: '',
      img: null
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
  },
    methods: {
        onChange (event) {
          this.img = event.target.files[0]
        },
        onUpload() {
          const formData = new FormData()
          formData.append('img', this.img)
          axios.post('http://localhost:3000/user/615493e64ffac842b2a2c8b9/img', formData, { headers: authHeader()})
          .then((response) => {
            console.log(response)
          })
        }  
    }
};
</script>