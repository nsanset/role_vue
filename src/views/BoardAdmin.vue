<template>
  <div class="pos">
    <div class="row">
      <div class="col-md-12 row">
        <div class="col-md-12">
          <h1 class="titleUser text-center">DRIVERS HR DEPARTMENT OF FLEET ADVANTAGE GROUP</h1>
        </div>

                <div class="modal-vue">
                  <!-- <div class="btnWarning" @click="showModal = true"><h4>Expired documents</h4></div> -->
                  <div class="overlays" v-if="showModal" @click="showModal = false"></div>
                  <div class="modals animate__animated animate__fadeIn" v-if="showModal">
                    <div class="closes" @click="showModal = false">x</div>
                    <div class="row">
                      <div class="col-md-6 row">
                        <div  class="col-md-12 animate__animated animate__fadeIn">
                          <h2>Expired Driver's Licence</h2>
                          <div  v-for="(item, i) in endDriverLicence" :key="i">  
                            <div v-if="item.status === 'active'">   
                              <router-link v-if="endDriverLicence.length" style="text-decoration: none; color: inherit;" :to="'admin/user/' + item.id">
                                <div class="userCardModal row">
                                  <img class="col-md-2" alt="logo profile" src="../assets/profile.png">
                                  <span class="col-md-6" >Driver: {{ item.firstName }} {{ item.lastName }} </span>
                                  <span class="col-md-4">End date: {{ item.date | moment("MM/DD/YYYY") }}</span>
                                </div> 
                              </router-link>
                            </div>    
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6 row">
                        <div class="col-md-12 animate__animated animate__fadeIn">
                          <h2>Expired Medical Card</h2>
                          <div v-for="(item, i) in endMedicalCard" :key="i">
                            <div v-if="item.status === 'active'">
                              <router-link v-if="endMedicalCard.length" style="text-decoration: none; color: inherit;" :to="'admin/user/' + item.id">
                                <div class="userCardModal row">
                                  <img class="col-md-2" alt="logo profile" src="../assets/profile.png">
                                  <span class="col-md-6" >Driver: {{ item.firstName }} {{ item.lastName }} </span>
                                  <span class="col-md-4">End date: {{ item.date | moment("MM/DD/YYYY") }}</span>
                                </div> 
                              </router-link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
      

            <div class="modal-vue">
              <div class="overlays" v-if="showModalMissing" @click="showModalMissing = false"></div>
              <div class="modals animate__animated animate__fadeIn" v-if="showModalMissing">
                <div class="closes" @click="showModalMissing = false">x</div>
                <div class="row">
                  <div class="col-md-5">
                      <h2>Missing driver license</h2>
                      <div v-for="item in content" :key="item._id">
                          <div v-if="item.images.length === 0">
                            <div v-if="item.status === 'active'">
                              <router-link  style="text-decoration: none; color: inherit;" :to="'admin/user/' + item._id">
                                  <div class="userCardModal row">
                                    <img class="col-md-2" alt="logo profile" src="../assets/profile.png">
                                    <span class="col-md-10" >Driver: {{ item.firstName }} {{ item.lastName }} </span>
                                  </div>
                              </router-link>
                            </div>
                          </div>
                      </div>
                  </div>
                  <div class="col-md-5">
                      <h2>Missing medical card</h2>
                      <div v-for="item in content" :key="item._id">
                          <div v-if="item.medicals.length === 0">
                            <div v-if="item.status === 'active'">
                              <router-link  style="text-decoration: none; color: inherit;" :to="'admin/user/' + item._id">
                                  <div class="userCardModal row">
                                      <img class="col-md-2" alt="logo profile" src="../assets/profile.png">
                                      <span class="col-md-10" >Driver: {{ item.firstName }} {{ item.lastName }} </span>
                                  </div>
                              </router-link>
                            </div>
                          </div>
                      </div>
                  </div>
                </div>
              </div>
            </div>

        <div class="col-xl-12 wrapperFilter animate__animated animate__fadeInDown" style="position: absolute; top: 110px; z-index: 20;">
          <div class="row">
            <div class="col-lg-6">
              <label class="filterUser">
                <input type="radio" v-model="selectedCategory" value="active" /> Active drivers
              </label>

              <label class="filterUser">
                <input type="radio" v-model="selectedCategory" value="disable" /> Inactive drivers
              </label>

              <label class="filterUser">
                <input type="radio" v-model="selectedCategory" value="All" /> All drivers
              </label>
            </div>

              <div class="col-lg-6" style="position: relative; z-index: 1;">
                  <div class="search-wrapper">
                    <input class="inputSearch" type="text" v-model="search" placeholder="Search"/>
                  </div>
                  <div v-if="search" class="searchMask">
                    <div class="searchUser" v-for="item in filteredList" :key="item._id">
                      <router-link class="linkSearch" style="text-decoration: none; color: inherit;" :to="'admin/user/' + item._id">
                        <div>{{item.firstName}} {{item.lastName}}</div>
                      </router-link>
                    </div>
                  </div>
              </div> 

          </div>
        </div>
        <div class="col-md-12 row">
          <div class="col-md-2 boardMenu">
            <div class="btnWarning animate__animated animate__fadeInDown" @click="showModal = true">Expired documents</div>
            <div class="btnWarning animate__animated animate__fadeInDown" @click="showModalMissing = true">Missing documents</div>
            <div class="dampFile animate__animated animate__fadeInDown">
              <json-excel
                :data = "filteredPeople"
                :exportFields = "json_fields"
                worksheet = "Drivers"
                :name = "fileName">
                <font-awesome-icon icon="download" /> Download Excel
              </json-excel>
            </div>
          </div>
          <div class="col-md-10 row users">
                <div class="col-md-4 animate__animated animate__headShake" v-for="item in pageOfItems" :key="item._id">
                    <router-link  style="text-decoration: none; color: inherit;" :to="'admin/user/' + item._id">
                      <div class="cardUser">
                        <div class="row">
                          <!-- <img class="iconProfile col-sm-2" alt="logo profile" src="../assets/profile.png"> -->
                          <div class="col-sm-10">                     
                            <ul>
                              <li v-if="!item.firstName || !item.lastName">
                                {{item.username}}
                              </li>
                              <li v-if="item.firstName || item.lastName" class="cardUserName">
                                <img class="cardUserIco" src="../assets/driver.jpg">
                                {{item.firstName}} {{item.lastName}}
                              </li>
                              <li v-if="item.employingCompany">
                                <img class="cardUserIco" src="../assets/trucks.jpg">
                                {{ item.employingCompany}}
                              </li>
                              <li v-if="item.dateOfEmplouyment">
                                <img class="cardUserIco" src="../assets/empl.jpg">
                                {{ item.dateOfEmplouyment | moment("MM/DD/YYYY") }}
                              </li>
                            </ul>
                          </div>
                          <div class="col-sm-2 cardUserNumber">{{item.number}}</div>
                        </div>
                      </div>
                    </router-link>
                </div>
                <div class="col-md-12 paginationUser">
                  <span class="totalUsers">Total: {{all.length}}</span>
                  <div>
                    <jw-pagination :items="all" :pageSize="12" @changePage="onChangePage"></jw-pagination>
                  </div>
                </div>
          </div>
        </div>
<!--         <div class="col-md-12 paginationUser">
          <span class="totalUsers">Total: {{all.length}}</span>
          <div>
            <jw-pagination :items="all" :pageSize="12" @changePage="onChangePage"></jw-pagination>
          </div>
        </div> -->
      </div>
    </div>
    <div v-for="item in content" :key="item._id">
      <Countdown :date="item.endOfDateDriverLicense" @onFinish="finish(item._id, item.firstName, item.lastName, item.endOfDateDriverLicense, item.status)"></Countdown>
      <Countdown :date="item.endOfDateMedicalCard" @onFinish="finish2(item._id, item.firstName, item.lastName, item.endOfDateMedicalCard, item.status)"></Countdown>
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

import JsonExcel from 'vue-json-excel'


export default {
  name: 'Admin',
  components:{
    Countdown, JsonExcel
  },
  data() {
    return {
      fileName:"Drivers.xls",
      json_fields: {
        "First name": 'firstName',
        "Last name": 'lastName',
        "Date of birth": 'dateOfBirth',
        "Social security number": 'socialSecurityNumber',
        "Driver license number": 'driverLicenseNumber',
        "Driver license state": 'driverLicenseState',
        "Driver license issue date": 'driverLicenseIssueDate',
        "Driver Licence expired date": 'endOfDateDriverLicense',
        "Home adress": 'homeAdress',
        "Phone number": 'phoneNumber',
        "Email": 'email',
        "Employing company": 'employingCompany',
        "Date of employment": 'dateOfEmplouyment',
        "Date of dismissal": 'dateOfDismissal',
        "Comment": 'comment'
      },
      json_meta: [
        [
          {
            'key': 'charset',
            'value': 'utf-8'
          }
        ]
      ],
      content: [],
      endDriverLicence: [],
      endMedicalCard: [],
      pageOfItems: [],
      showModal: false,
      showModalMissing: false, 
      showModalSearch: false,
      selectedCategory: "active",
      searchTerm: null,
      search: '',
    };
  },
  computed: {
    all() {
      var vm = this
      var n = 1
      var result = vm.filteredPeople.map(function(el) {
        var o = Object.assign({}, el);
        o.number = n++;
        return o;
      })
      return result
    },
    filteredPeople() {
      var vm = this;
      var status = vm.selectedCategory;
      if(status === "All") {
        return vm.content;
      } else {
        return vm.content.filter(function(person) {
          return person.status === status;
        });
      }
    },
    filteredList() {
      return this.content.filter(list => {
        return list.firstName.toLowerCase().includes(this.search.toLowerCase()) + list.lastName.toLowerCase().includes(this.search.toLowerCase())
      })
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
    finish(id, firstName, lastName, date, status) {
      setTimeout(() => this.endDriverLicence.push({id: id, firstName: firstName, lastName: lastName, date: date, status: status}), 1000)
    },
    finish2(id, firstName, lastName, date, status) {
      setTimeout(() => this.endMedicalCard.push({id: id, firstName: firstName, lastName: lastName, date: date, status: status}), 1000)
    },
    onChangePage(pageOfItems) {
      this.pageOfItems = pageOfItems;
    },
  }
};
</script>
<style>
.cardUser ul {
  list-style-type: none;
}
.cardUserIco {
  width: 20px;
  height: 20px;
}
.pp{
  border: 1px solid red;
  height: 100px;
}
.pos {
  position: relative;
}
.wrapperFilter: {
  position: absolute !important;
  z-index: 500 !important;
  top: 175px !important;
}
.iconProfile {
  width: 70px;
  height: 50px;
}
.cardUserCompany{
  padding-left: 20px;
}
.cardUserName {
  font-weight: 700;
}
.cardUserNumber {
  max-height: 30px;
  border-radius: 20px;
  padding-right: 15px;
  color: rgba(56, 60, 87, 0.7);
}
.searchUser {
  position: relative !important; 
  z-index: 10 !important;
  padding-left: 10px;
  cursor: pointer;
  border: 1px solid rgb(93 150 127 / 50%);
  width: 100%;
  border-radius: 6px;
  height: 30px;
  margin-bottom: 5px;
}
.searchUser:hover {
  background-color: rgba(226, 228, 228, 0.8);
}
.searchMask {
  background: #fff;
  max-height: 300px;
  overflow: auto;
  overflow-x: hidden;
}
.inputSearch {
  border: 2px solid rgb(179 179 179 / 50%);
  padding-top: 1px;
  padding-bottom: 1px;
  padding-left: 8px;
  border-radius: 5px;
  width: 100%;
  margin-bottom: 5px;
}
.warning {
  height: 50px;
  margin-top: 5px;
  margin-bottom: 30px;
}
.btnWarning {
  background: #ED6868;;
  border: 1px solid #FF4742;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.1) 1px 2px 4px;
  box-sizing: border-box;
  color: #FFFFFF;
  cursor: pointer;
  display: inline-block;
  font-size: 17px;
  font-weight: 500;
  line-height: 15px;
  min-height: 30px;
  outline: 0;
  padding: 10px 10px;
  text-align: center;
  text-rendering: geometricprecision;
  text-transform: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
  width: 95%;
  margin-bottom: 10px;
}

.btnWarning:hover,
.btnWarning:active {
  background-color: initial;
  background-position: 0 0;
  color: #FF4742;
}

.btnWarning:active {
  opacity: .5;
}
.titleUser {
  padding-top: 15px;
  padding-bottom: 15px;
  color: rgba(56, 60, 87, 0.7);
  border: 3px solid rgb(226, 228, 228);
  border-radius: 5px;
  margin-top: 10px;
}
.filterUser {
  padding-bottom: 20px;
  padding-right: 20px;
  font-weight: 700;
  color: rgba(56, 60, 87, 0.7);
}
.dampFile {
  position: absolute;
  top: 95px;
  width: 95%;
  margin-left: 0px;
  padding: 5px 5px;
  text-align: center;
  font-weight: 700;
  color: rgba(56, 60, 87, 0.7);
  border: 2px solid rgb(113 171 127 / 100%);
  border-radius: 5px;
  cursor: pointer;
}
.dampFile:hover {
  color: #fff;
  background-color: #48BF91;
}
.cardUser {
  border: 1px solid rgb(179 179 179 / 50%);
  border-radius: 8px;
  padding: 15px;
  height: 120px;
  background-color: #fff;
  vertical-align: middle;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -moz-osx-font-smoothing: grayscale;
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-property: transform;
  transition-property: transform;
  -webkit-transition-timing-function: ease-out;
  transition-timing-function: ease-out;

}
.cardUser:hover {
  border-left: 4px solid rgb(113 171 127 / 100%);
  box-shadow: 5px 5px 1px 0px rgb(179 179 179 / 50%);
  -webkit-transform: translateY(-6px);
  transform: translateY(-6px); 
}
.paginationUser {
  position: absolute;
  top: 530px;
}
.users {
  position: absolute; 
  z-index: 1;
  top: 180px;
  right: 22px;
  min-height: 55vh;
  margin-bottom: 20px;
  padding-left: 10px;
  padding-right: 0px;
}
.boardMenu {
  position: absolute; 
  z-index: 1;
  top: 180px;
  left: 0px;
  min-height: 55vh;
  margin-bottom: 20px;
  padding-left: 0px;
  padding-right: 0px;
}
.overlays {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
}

.modals {
  position: absolute;
  border-radius: 10px;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 90vh;
  z-index: 9999;
  padding: 20px 30px;
  background-color: #fff;
  overflow: auto;
  overflow-x: hidden;
}

.modal-vue .closes{
  position: absolute;
  border: 3px solid #ED6868;
  border-radius: 5px;
  width: 25px;
  padding-left: 6px;
  padding-bottom: 5px;
  top: 15px;
  right: 15px;
  cursor: pointer;
}
.closes:hover{
  background-color: #ED6868;
}
.userCardModal {
  padding-top: 5px;
  height: 55px;
  border: 1px solid rgb(179 179 179 / 80%);
  margin-bottom: 20px;
  margin-right: 20px;
  margin-left: 3px;
  padding-left: 12px;
  border-radius: 5px;
}
.userCardModal:hover {
  padding-left: 5px;
  background-color: rgb(179 179 179 / 15%);
}
.userCardModal > img{
  height: 30px;
  width: 50px;
}
.totalUsers{
  padding-left: 2px;
  font-weight: 700;
  color: rgba(56, 60, 87, 0.7);
}
.cardUser ul {
  padding-left: 5px;
}


@media screen and (max-width: 1399px) {
  .modals h2 {
    height: 80px;
  }
  .btnSearch {
    padding: 8px 0px;
  }
  .cardUser {    
    height: 110px;
    padding: 10px;
    margin-bottom: 5px;
  }
  .titleUser {
  padding-top: 15px;
  padding-bottom: 15px;
  font-size: 29px;
  }
}
@media screen and (max-width: 1199px) {
  .inputSearch {
    width: 61%;
    margin-left: 0px;
  }
  .filterUser {
    padding-bottom: 10px;
  }
  .inputSearch {
    width: 97%;
  }
  .cardUser ul {
    padding-left: 0px;
  }
  .cardUser {
    height: 125px;
    padding: 3px;
    margin-bottom: 5px;
  }
  .userCardModal {
    padding-top: 3px;
    height: 55px;
    margin-bottom: 15px;
    margin-right: 0px;
    margin-left: 0px;
    padding-left: 0px;
  }
  .dampFile {
    top: 125px;
  }
}
@media screen and (max-width: 991px) {
  .titleUser {
    font-size: 25px;
  }
  .inputSearch {
    margin-left: 0px;
    width: 82%;
    margin-bottom: 10px;
  }
  .cardUser {
    height: 125px;
    padding: 5px;
    margin-bottom: 15px;
    font-size: 15px;
  }
  .wrapperFilter {
    top: 90px!important; 
  }
  .btnSearch {
    padding: 8px 0px;
  }
  .userSearchCard {
    margin-bottom: 15px;
  }
  .iconProfile {
    width: 50px;
    height: 28px;
  }
  .userCardModal {
    padding-top: 3px;
    height: 100px;
    margin-bottom: 15px;
    margin-right: 0px;
    margin-left: 0px;
    padding-left: 0px;
  }
  .userCardModal > img {
    height: 25px;
    width: 45px;
    padding-left: -15px;
    padding-right: -15px;
  }
  .inputSearch {
    width: 100%;
  }
  .paginationUser {
    top: 580px;
  }
}
@media screen and (max-width: 767px) {
  .users {
    top: 480px;
  }
  .filterUser {
    display: block;
    margin-right: 20px;
    padding-left: 10px;
    padding-top: 5px;    
    margin-top: 10px;
    margin-bottom: 10px;
    padding-bottom: 10px;
    border: 3px solid #ED6868;
    border-radius: 6px;
  }
  .pos {
    padding-left: 20px;   
    margin-right: 0px; 
  }
  .inputSearch {
    margin-left: 0px;
    margin-bottom: 10px;
    width: 97%;
    height: 45px;
  }
  .searchUser {
    width: 97%;
    height: 45px;
  }
  .btnSearch {
    width: 100%;
    margin-top: 10px;
    margin-bottom: 15px;
  }
  .wrapperFilter {
    margin-top: 10px;
  }
  .warning {
    height: 12px;
    margin-top: 2px;
    margin-bottom: 30px;
  }
  .btnWarning {
    padding: 9px 3px;
    width: 91%;
  }
  .dampFile {
    top: 90px;
    width: 91%;
    margin-left: 0px;
    padding-left: 0px;
    padding-right: 0px;
  }
  .iconProfile {
    width: 0px;
    height: 0px;
  }
  .cardUser {
    height: 145px;
    padding-top: 10px;
    margin-top: 5px;
    margin-left: 10px;
    margin-right: -12px;
    width: 97%;
  }
  .cardUserNumber {
    padding-left: 90%;
  }
  .cardUser ul > li {
    padding-left: 15px;
  }
  .titleUser {
    font-size: 20px;
    padding-top: 5px;
    padding-bottom: 5px;
    color: rgba(56, 60, 87, 0.7);
  }
  .paginationUser {
    position: absolute;
    top: 2300px;
    padding-bottom: 50px;
  }
  .boardMenu {
    position: absolute;
    z-index: 1;
    margin-left: 10px;
    min-height: 80px;
    top: 330px;
    left: 10px;
    margin-bottom: 0px;
    padding-left: 0px;
    padding-right: 0px;
  }
  .paginationUser {
    top: 2000px;
    margin-left: 10px;
  }
}

</style>
