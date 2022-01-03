<template>
  <div class="container pos">
    <div v-if="endDriverLicence.length || endMedicalCard.length"> 
      <div class="modal-vue">
        <button @click="showModal = true">Warning!</button>
        <div class="overlays" v-if="showModal" @click="showModal = false"></div>
        <div class="modals" v-if="showModal">
          <button class="closes" @click="showModal = false">x</button>
          <h3>Docoments</h3>
          <div v-if="endDriverLicence.length" class="col-md-4 animate__animated animate__flash">
            <div v-for="(item, i) in endDriverLicence" :key="i">
              <hr>
                <p>Need updated driver licence</p>
                <router-link :to="'admin/user/' + item.id">
                  {{ item.name }}
                </router-link> 
                <hr>
            </div>
          </div>
          <div v-if="endMedicalCard.length" class="col-md-4 animate__animated animate__flash">
            <div v-for="(item, i) in endMedicalCard" :key="i">
                <p>Need updated medical card</p>
                <router-link :to="'admin/user/' + item.id">{{ item.name }}</router-link>
                <hr>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div id="search">
        <input name="search" @keyup.enter="findUser" v-model="searchTerm">
        <button color="indigo" @click="findUser">Search user</button>      
        <div v-for="result in searchResult" :key="result._id">
            {{result.first}} {{result.last}}
            <router-link :to="'admin/user/' + result._id">{{ result.username }}</router-link>
            <p v-if="result === 'not'">user not found</p>    
        </div>
    </div>


    <div class="row">
      <div class="col-md-12">
        <div v-if="content.length">
          <div class="pp users row">
            <div>
              <h4>Users</h4>
            </div>
            <div>
                <div class="filter">
                  <label><input type="radio" v-model="selectedCategory" value="active" /> active</label>
                  <label><input type="radio" v-model="selectedCategory" value="disable" /> disable</label>
                  <label><input type="radio" v-model="selectedCategory" value="All" /> all</label>
                </div>                
            </div>
            <div>
              <div>
                <div v-for="(item, index) in pageOfItems" :key="item._id">
                      <router-link :to="'admin/user/' + item._id">
                        {{ index +1 }}
                        {{ item.username }}
                      </router-link>
                </div>
              </div>
              <div >
                <jw-pagination
                  :items="filteredPeople"
                  :pageSize="10"
                  @changePage="onChangePage"
                ></jw-pagination>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          No users
        </div>
      </div>



          <div v-for="item in content" :key="item._id">
              <Countdown :date="item.endOfDateDriverLicense" @onFinish="finish(item._id, item.username)"></Countdown>
              <Countdown :date="item.endOfDateMedicalCard" @onFinish="finish2(item._id, item.username)"></Countdown>
          </div>


    </div>
  </div>
</template>

// <script>
import Vue from 'vue';
import Toasted from 'vue-toasted';
Vue.config.productionTip = false;
Vue.config.devtools = false;
Vue.use(Toasted);
// import axios from 'axios';
// import authHeader from '../services/auth-header';
import UserService from '../services/user.service';
import Countdown from '../components/Countdown';
export default {
  name: 'Admin',
  components:{
    Countdown
  },
  data() {
    return {
      content: [],
      endDriverLicence: [],
      endMedicalCard: [],
      pageOfItems: [],
      showModal: false,
      showModalSearch: false,
      selectedCategory: "active",
      searchResult: [],
      searchTerm: null,
    };
  },
  computed: {
    filteredPeople: function() {
      var vm = this;
      var status = vm.selectedCategory;
      
      if(status === "All") {
        return vm.content;
      } else {
        return vm.content.filter(function(person) {
          return person.status === status;
        });
      }
    }
  },
  mounted() {
    UserService.getAdminBoard().then(
      response => {
        this.content = response.data;
      },
      error => {
        this.content =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  },
  methods: {
    finish(id, name) {
      setTimeout(() => this.endDriverLicence.push({id: id, name: name}), 1000)
    },
    finish2(id, name) {
      setTimeout(() => this.endMedicalCard.push({id: id, name: name}), 1000)
    },
    onChangePage(pageOfItems) {
      this.pageOfItems = pageOfItems;
    },
    findUser() {
            const resultFirstName = this.content.find(
                content => content.first === this.searchTerm,
            );
            const resultLastName = this.content.find(
                content => content.last === this.searchTerm,
            );
            const resultNickName = this.content.find(
                content => content.nick === this.searchTerm,
            );
            const resultNickUsername = this.content.find(
                content => content.username === this.searchTerm,
            );
            if (resultFirstName) {
                this.searchResult.splice(0, 1, resultFirstName);
            }
            else if (resultLastName) {
               this.searchResult.splice(0, 1, resultLastName); 
            }
            else if (resultNickName) {
               this.searchResult.splice(0, 1, resultNickName); 
            }
            else if (resultNickUsername) {
               this.searchResult.splice(0, 1, resultNickUsername); 
            }
            else {
               this.searchResult = ['not']
            }
        },
  },
  // mounted() {
  //   axios
  //     .get('http://localhost:8080/user/', { headers: authHeader()})
  //     .then(response => (this.content = response.data));
  // }
};
</script>
<style>
.pp{
  border: 1px solid red;
}
.pos {
  position: relative;
}
.users {
  position: relative;
  height: 80vh;
}
.modal-vue .overlays {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
}

.modal-vue .modals {
  position: absolute;
  top: 0px;
  width: 100%;
  height: 90vh;
  z-index: 9999;
  margin: 0 auto;
  padding: 20px 30px;
  background-color: #fff;
}

.modal-vue .closes{
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>