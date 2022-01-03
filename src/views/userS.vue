<template>
  <div class="container">
    <header class="jumbotron">
      <h1>{{content.username}}</h1>
      <h1>{{content.email}}</h1>
<!--       <button @click="showToast3">Show Toast</button><br/> -->
      <div>
          <form>
            <select v-model="status" value='status'>
              <option value="active">Active</option>
              <option value="not active">Not active</option>
            </select>
            <button @click.prevent="setStatus(content._id)" >Change</button>
          </form>
      </div>
      <div>
        <form @submit.prevent>
            <input type="file" name="img" v-on:change="onChange">
            <button @click="onUpload">Submit</button>
        </form>
      </div>
      <div>
            <div v-if="images.length">
                     <div v-for="item in images" :key="item._id">
                        <div>
                          <img :src="'data:image/png;base64,' + item.img.data.toString('base64')"/>
                          <button @click="deleteImg(item._id)">Delete</button>
                        </div>                    
                    </div>
                    <div>
                        <Countdown :date="content.endOfDateDriverLicense" @onFinish="finish()"></Countdown>
                        <form @submit.prevent>
                          <input type="hidden" v-model="endOfDateDriverLicense" name="dates" value="dates">
                          <input type="date" v-model="endOfDateDriverLicense" name="endOfDateDriverLicense" value="endOfDateDriverLicense">
                          <button @click="setDate(content._id, endOfDateDriverLicense)">Set date</button>
                        </form>
                        <form>
                          <input type="hidden" v-model="dates" name="dates" value="dates">
                          <button @click.prevent="dateClear(content._id)">Clear date</button>
                        </form>
                    </div>   
                    <button @click="deleteImgAll()">Delete all</button>
            </div>
            <div v-else>
              No images
            </div>
        </div>
    </header>
  </div>
</template>
<script>
import Vue from 'vue';
import Toasted from 'vue-toasted';
Vue.config.productionTip = false;
Vue.config.devtools = false;
Vue.use(Toasted);
import axios from 'axios';
import authHeader from '../services/auth-header';
import Countdown from '../components/Countdown';
export default {
  name: 'User1',
  components: {
    Countdown
  },
  data() {
    return {
      content: '',
      status: '',
      endOfDateDriverLicense: '',
      dates: '',
      images: ''
    }
  },
  computed: {

  },
  mounted() {
    // axios
    //   .get('http://localhost:3000/admin/' + this.$route.params.id, { headers: authHeader()})
    //   .then(response => (this.content = response.data));
    this.getData()
    this.getStatus()
    this.getendOfDateDriverLicense()
    this.getImages()
  },
    methods: {
      getData() {
        axios
          .get('http://localhost:3000/admin/' + this.$route.params.id, { headers: authHeader()})
            .then(response => {
              console.log(response)
              return response.data
            })
            .then(data => {
              return this.content = data
            })
            .catch(err => {
              console.log(err)
            })

      },
      getStatus() {
        axios
          .get('http://localhost:3000/admin/' + this.$route.params.id, { headers: authHeader()})
          .then(response => (this.status = response.data.status));
      },
      getImages() {
        axios
          .get('http://localhost:3000/admin/' + this.$route.params.id, { headers: authHeader()})
          .then(response => (this.images = response.data.images));
      },
      setStatus(id) {
        Vue.toasted.show("Status", {
          theme: "bubble",
          position: "top-right",
          duration: 3000,
        });
        this.dateClear(id)
        const updateData = { status: this.status }
        axios
          .put('http://localhost:3000/user/' + id, updateData, { headers: authHeader()})
          .then(response => {
            console.log(response);
         });
      },
      getendOfDateDriverLicense() {
        axios
          .get('http://localhost:3000/admin/' + this.$route.params.id, { headers: authHeader()})
          .then(response => (this.endOfDateDriverLicense = response.data.endOfDateDriverLicense));
      },
      onChange (event) {
        this.img = event.target.files[0]
      },
      onUpload() {
        Vue.toasted.show("Image uploads", {
          theme: "bubble",
          position: "top-right",
          duration: 3000,
        });
        const formData = new FormData()
        formData.append('img', this.img)
        axios.post('http://localhost:3000/user/' + this.$route.params.id + '/img', formData, { headers: authHeader()})
        .then((response) => {
          console.log(response);
          this.getImages()
        })
      },
      deleteImg(id) {
      Vue.toasted.show("Image delete", {
          theme: "bubble",
          position: "top-right",
          duration: 3000,
        });
        axios
          .delete('http://localhost:3000/user/' + id, { headers: authHeader()})
          .then((response) => {
            console.log(response);
            this.getImages()
          });
      },
      deleteImgAll() {
        Vue.toasted.show("All images deleted", {
          theme: "bubble",
          position: "top-right",
          duration: 3000,
        });
        axios
          .delete('http://localhost:3000/user', { headers: authHeader()})
          .then((response) => {
            console.log(response);
            this.getImages()
          });
      },
      finish() {
        Vue.toasted.show( "Driver license needs to be updated", {
          theme: "bubble",
          position: "top-right",
          duration: 3000,
        });
      },
      setDate(id, date) {
        Vue.toasted.show("Now date " + date, {
          theme: "outline",
          position: "top-right",
          duration: 3000,
        });
        const update = { endOfDateDriverLicense: this.endOfDateDriverLicense }
        axios
          .put('http://localhost:3000/user/' + id, update, { headers: authHeader()})
          .then(response => {
            console.log(response);
          });
      },
      dateClear(id) {
        Vue.toasted.show("Date clear!", {
          theme: "bubble",
          position: "top-right",
          duration: 3000,
        });
        const update = { endOfDateDriverLicense: this.dates }
        axios
          .put('http://localhost:3000/user/' + id, update, { headers: authHeader()})
          .then(response => {
            console.log(response);
          });
      },
    }
};
</script>

<style scoped>
img {
  width: 15%;
}
</style>