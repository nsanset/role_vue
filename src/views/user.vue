<template>
  <div class="user">
    <span v-if="loading === true" class="loading animate__animated animate__fadeIn">
        <div class="overlays">
          <img style="border-radius: 50%;" src="../assets/Spinner-3.gif">
        </div>
    </span> 
    <div class="wrapper">
      <div class="row">
        <div class="col-md-3">
          <div class="placeMenu">
            <h1 class="titleMenu">Menu</h1>
            <div class="menuItem">
              <div class="tabs row">
                <div class="tab col-sm-12">
                  <div class="tabBtn row " v-on:click="activetab='1'" v-bind:class="[ activetab === '1' ? 'active' : '' ]">
                    <div class="iconBtn col-sm-2">
                      <font-awesome-icon icon="address-card" />
                    </div>
                    <div class="iconText col-sm-2">
                      INFO
                    </div>
                  </div>
                </div>
                <div class="tab col-sm-12">
                  <div class="tabBtn row" v-on:click="activetab='2'" v-bind:class="[ activetab === '2' ? 'active' : '' ]">
                    <div class="iconBtn col-sm-2">
                      <font-awesome-icon icon="file-image" />
                    </div>
                    <div class="iconText col-sm-2">
                      DOCUMENTS
                    </div>
                  </div>
                </div>
                <div class="tab col-sm-12">
                  <div class="tabBtn row" v-on:click="activetab='3'" v-bind:class="[ activetab === '3' ? 'active' : '' ]">
                    <div class="iconBtn col-sm-2">
                      <font-awesome-icon icon="user-cog" />
                    </div>
                    <div class="iconText col-sm-2">
                      SETTING
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-9 column">
          <div class="col-md-12">
            <div class="info placeInfo">
              <div class="row">
                <div class="column col-sm-3 avatarBlock">
                  <div class="col-md-12">
                    <div v-if="avatar.length">
                      <img class="avatar" :src="'data:image/png;base64,' + avatar[0].avatar.data.toString('base64')"/>
                    </div>
                    <div v-else>
                      <img class="avatarEmpty" alt="logo profile" src="../assets/noavatar.png">
                    </div> 
                  </div>
                </div>
                <div class="col-sm-5 column userNameInfo">
                  <div class="col-md-12"><h4 class="userNameInfoText">{{firstName}} {{lastName}}</h4></div>
                </div>
                <div class="col-sm-4 column d-flex justify-content-end status">
                    <div class="row">
                        <div class="col-md-4">
                          <h4 class="statusText">Status:</h4>
                        </div>
                        <div class="col-md-8 statusForm">
                          <form>
                            <select v-model="status" value='status'>
                              <option style="color: green;" value="active">Active</option>
                              <option style="color: red;" value="disable">Inactive</option>
                            </select>
                            <button class="btnStatus" @click.prevent="setStatus(content._id)">
                              <div class="btnStatusText" v-if="status === 'active'" style="background-color: #5D967F;">Change</div>
                              <div class="btnStatusText" v-if="status === 'disable'" style="background-color: #ED6868;">Change</div>
                            </button>
                          </form>
                        </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-12 place">
            <div class="content">
              <div class="placeDocInfo">
                <div v-if="activetab ==='1'" class="tabcontent animate__animated animate__fadeIn">
                    <div class="infoTitle">
                      <h1>Info</h1>
                    </div>
                    <div class="row">
                      <div class="col-md-7 infoBlockLeft">
                        <div class="infoItem" v-if="firstName"><span>First name:</span> {{firstName}}</div>
                        <div class="infoItem" v-else><font-awesome-icon class="infoWarningIcon" icon="exclamation-circle"/> Need to fill First name</div>

                        <div class="infoItem" v-if="lastName"><span>Last name:</span> {{lastName}}</div>
                        <div class="infoItem" v-else><font-awesome-icon class="infoWarningIcon" icon="exclamation-circle"/> Need to fill Last name</div>

                        <div class="infoItem" v-if="dateOfBirth"><span>Date of birth: </span>{{ dateOfBirth | moment("MM/DD/YYYY") }}</div>
                        <div class="infoItem" v-else><font-awesome-icon class="infoWarningIcon" icon="exclamation-circle"/> Need to fill Date of birth</div>

                        <div class="infoItem" v-if="socialSecurityNumber" ><span>Social security number:</span> {{socialSecurityNumber}}</div>
                        <div class="infoItem" v-else><font-awesome-icon class="infoWarningIcon" icon="exclamation-circle"/> Need to fill Social security number</div>

                        <div class="infoItem" v-if="driverLicenseNumber"><span>Driver license number:</span> {{driverLicenseNumber}}</div>
                        <div class="infoItem" v-else><font-awesome-icon class="infoWarningIcon" icon="exclamation-circle"/> Need to fill Driver license number</div>

                        <div class="infoItem" v-if="driverLicenseState"><span>Driver license state:</span> {{driverLicenseState}}</div>
                        <div class="infoItem" v-else><font-awesome-icon class="infoWarningIcon" icon="exclamation-circle"/> Need to fill Driver license state</div>

                        <div class="infoItem" v-if="driverLicenseIssueDate"><span>Driver license issue date:</span> {{ driverLicenseIssueDate | moment("MM/DD/YYYY") }}</div>
                        <div class="infoItem" v-else><font-awesome-icon class="infoWarningIcon" icon="exclamation-circle"/> Need to fill Driver license issue date</div>

                        <div class="infoItem" v-if="endOfDateDriverLicense"><span>Driver Licence expired date:</span> {{ endOfDateDriverLicense | moment("MM/DD/YYYY") }}</div>
                        <div class="infoItem" v-else><font-awesome-icon class="infoWarningIcon" icon="exclamation-circle"/> Data Driver Licence not specified</div>

                        <div class="infoItem" v-if="homeAdress"><span>Home adress:</span> {{homeAdress}}</div>
                        <div class="infoItem" v-else><font-awesome-icon class="infoWarningIcon" icon="exclamation-circle"/> Need to fill Home adress</div>

                        <div class="infoItem" v-if="phoneNumber"><span>Phone number:</span> {{phoneNumber}}</div>
                        <div class="infoItem" v-else><font-awesome-icon class="infoWarningIcon" icon="exclamation-circle"/> Need to fill Phone number</div>

                        <div class="infoItem" v-if="email"><span>Email:</span> {{email}}</div>
                        <div class="infoItem" v-else><font-awesome-icon class="infoWarningIcon" icon="exclamation-circle"/> Need to fill Email</div>
                      </div>
                      <div class="col-md-5 infoBlockRight">
                        <div class="infoItem" v-if="employingCompany"><span>Employing company:</span> {{employingCompany}}</div>
                        <div class="infoItem" v-else><font-awesome-icon class="infoWarningIcon" icon="exclamation-circle"/> Need to fill Employing company</div>

                        <div class="infoItem" v-if="dateOfEmplouyment"><span>Date of employment:</span> {{ dateOfEmplouyment | moment("MM/DD/YYYY") }}</div>
                        <div class="infoItem" v-else><font-awesome-icon class="infoWarningIcon" icon="exclamation-circle"/> Need to fill Date of employment</div>

                        <div class="infoItem" v-if="dateOfDismissal"><span>Date of dismissal:</span> {{ dateOfDismissal | moment("MM/DD/YYYY") }}</div>
<!--                         <div class="infoItem" v-else><font-awesome-icon class="infoWarningIcon" icon="exclamation-circle"/> Need to fill Date of dismissal</div> -->


                        <div class="infoItem infoComment" v-if="comment"><span>Comment:</span> {{comment}}</div>
                      </div>

                        <!-- <div class="infoItem infoComment" v-if="comment"><span>Comment:</span> {{comment}}</div> -->
                    </div>
                  </div>
                </div>




                <div  v-if="activetab ==='2'" class="tabcontent animate__animated animate__fadeIn">
                  <div class="documentsTitle">
                      <h1>Documents</h1>
                  </div>


                  <!-- DOC 1 -->
                  <div class="placeDoc">
                    <div>
                      <div class="row headerDoc">
                        <div class="row col-sm-8">
                          <div class="column animate__animated animate__fadeIn">
                            <div class="col-md-12 nameDocument">
                              <h4 v-if="!showDoc1 === false">1. Driver Licence</h4>
                              <h4 v-else style="color: #ED6868;">1. Driver Licence</h4>
                            </div> 
                            <div class="col-md-12 ">
                              <div v-if="showDoc1" class="btnShowHide"  v-on:click="showDoc1 = !showDoc1">Show &#9660;</div>
                              <div v-if="!showDoc1" class="btnShowHide" v-on:click="showDoc1 = !showDoc1">Hide &#9650;</div>
                            </div>   
                          </div>
                        </div>

                        <div class="col-sm-4 infoDoc animate__animated animate__fadeIn">
                          <div v-if="endOfDateDriverLicense" class="expiredDoc">
                            <span v-if="!color.length" class="infoDocOk">
                              <font-awesome-icon icon="check-circle" />
                            </span>
                            <span v-else style="color: orange;" class="infoDocOk">
                              <font-awesome-icon icon="check-circle" />
                            </span> 
                            Exp. {{ endOfDateDriverLicense | moment("MM/DD/YYYY") }}
                          </div>
                          <div v-else class="animate__animated animate__fadeInLeft"><span class="infoDocWarning"><font-awesome-icon icon="exclamation-circle" /></span> Need set date</div>
                          <div v-if="images.length" class="animate__animated animate__fadeInLeft">
                              <span class="totalImages"><span class="infoDocOk"><font-awesome-icon icon="check-circle" />
                              </span> {{lengthImages}} Downloaded</span>
                          </div>
                          <div v-else class="animate__animated animate__fadeInLeft"><span class="infoDocWarning"><font-awesome-icon icon="exclamation-circle" /></span> No images</div>
                        </div>
                          
                      </div>
                      <div v-show="!showDoc1">                       
                        <div class="row"> 
                            <div class="row navDoc col-md-12">
                                <div class="col-md-6">
                                    <form @submit.prevent>
                                        <input type="file" name="img" v-on:change="onChange" :key="fileInputKey">
                                        <button v-if="img" class="btnSubmit" @click="onUpload">Submit</button>
                                    </form>
                                </div>
                                <div  v-if="images.length" class="row col-md-4 animate__animated animate__bounceInRight">
                                            <div>
                                              <Countdown :date="content.endOfDateDriverLicense" @onFinish="finish()"></Countdown>
                                              <form @submit.prevent>
                                                <input type="hidden" v-model="endOfDateDriverLicense" name="dates" value="dates">
                                                <input type="date" v-model="endOfDateDriverLicense" name="endOfDateDriverLicense" value="endOfDateDriverLicense">
                                                <button v-if="endOfDateDriverLicense" class="btnSetDate animate__animated animate__fadeIn" @click="setDate(content._id, endOfDateDriverLicense)">Сonfirm</button>
                                              </form>
                                            </div>
                                </div>                                            
                                  <div v-if="endOfDateDriverLicense" class="col-md-2 animate__animated animate__fadeIn">
                                      <form>
                                          <input type="hidden" v-model="dates" name="dates" value="dates">
                                          <button class="btnClearDate" @click.prevent="dateClearLiecenseDoc(content._id)">Clear date</button>
                                      </form>
                                  </div>
<!--                                 <div v-if="images.length" class="col-md-1 animate__animated animate__bounceInRight">
                                  <button @click="deleteImgAll(content._id)">Del all</button>
                                </div>   -->                          
                            </div>

                            <div class="col-md-12 imagesContainer">
                                  <div v-if="images.length" class="column animate__animated animate__fadeIn">
                                          <div class="row">
                                            <div class="col-sm-3" v-for="item in images" :key="item._id">
                                                  <img v-img:group1 class="imageDocument" :src="'data:image/png;base64,' + item.img.data.toString('base64')"/>
                                                  <button class="btnDelete" @click="deleteImg(item._id)">Delete</button>                  
                                            </div>
                                          </div>
                                  </div>
                            </div>     
                          </div> 
                        </div> 
                    </div>
                  </div>





                  <!-- DOC 2 -->
                  <div class="placeDoc">
                    <div>
                      <div class="row headerDoc">
                        <div class="row col-sm-8">
                          <div class="column animate__animated animate__fadeIn">
                            <div class="col-md-12 nameDocument">
                              <h4 v-if="!showDoc2 === false">2. Medical Card</h4>
                              <h4 v-else style="color: #ED6868;">2. Medical Card</h4>
                            </div> 
                            <div class="col-md-12">
                              <div v-if="showDoc2" class="btnShowHide" v-on:click="showDoc2 = !showDoc2">Show &#9660;</div>
                              <div v-if="!showDoc2" class="btnShowHide" v-on:click="showDoc2 = !showDoc2">Hide &#9650;</div>
                            </div>   
                          </div>
                        </div>

                        <div class="col-sm-4 infoDoc animate__animated animate__fadeIn">
                          <div v-if="endOfDateMedicalCard">
                            <span v-if="!color2.length" class="infoDocOk">
                              <font-awesome-icon icon="check-circle" />
                            </span>
                            <span v-else style="color: orange;" class="infoDocOk">
                              <font-awesome-icon icon="check-circle" />
                            </span>
                            Exp. {{ endOfDateMedicalCard | moment("MM/DD/YYYY") }}
                          </div>
                          <div v-else class="animate__animated animate__fadeInLeft"><span class="infoDocWarning"><font-awesome-icon icon="exclamation-circle" /></span> Need set date</div>
                          <div v-if="medicals.length" class="animate__animated animate__fadeInLeft">        
                            <span class="totalImages">
                              <span class="infoDocOk"><font-awesome-icon icon="check-circle" /></span> {{lengthMedicals}} Downloaded</span>
                          </div>
                          <div v-else class="animate__animated animate__fadeInLeft"><span class="infoDocWarning"><font-awesome-icon icon="exclamation-circle" /></span> No images</div>
                        </div>
                          
                      </div>
                      <div v-show="!showDoc2">                       
                        <div class="row">
                            <div class="row navDoc col-md-12">
                                  <div class="col-md-6">
                                    <form @submit.prevent>
                                        <input type="file" name="medicalCard" v-on:change="onChangeMedical" :key="fileInputKey">
                                        <button v-if="medicalCard" class="btnSubmit" @click="onUploadMedical">Submit</button>
                                    </form>
                                  </div>
                                  <div v-if="medicals.length" class="row col-md-4 animate__animated animate__bounceInRight">
                                            <div>
                                              <Countdown :date="content.endOfDateMedicalCard" @onFinish="finish2()"></Countdown>
                                              <form @submit.prevent>
                                                <input type="hidden" v-model="endOfDateMedicalCard" name="dates" value="dates">
                                                <input type="date" v-model="endOfDateMedicalCard" name="endOfDateMedicalCard" value="endOfDateMedicalCard">
                                                <button v-if="endOfDateMedicalCard" class="btnSetDate animate__animated animate__fadeIn" @click="setDateMedical(content._id, endOfDateMedicalCard)">Confirm</button>
                                              </form>
                                            </div>
                                    </div>                                            
                                    <div v-if="endOfDateMedicalCard" class="col-md-2 animate__animated animate__fadeIn">
                                        <form>
                                            <input type="hidden" v-model="dates" name="dates" value="dates">
                                            <button class="btnClearDate" @click.prevent="dateClearMedicalCard(content._id)">Clear date</button>
                                        </form>
                                    </div> 
<!--                                     <div v-if="medicals.length" class="col-md-1 animate__animated animate__bounceInRight">
                                        <button @click="deleteMedicalAll(content._id)">Del all</button>
                                    </div> -->
                            </div>

                            <div class="col-md-12 imagesContainer">
                                  <div v-if="medicals.length" class="column animate__animated animate__fadeIn">
                                          <div class="row">
                                            <div class="col-sm-3" v-for="item in medicals" :key="item._id">
                                                <img v-img:group2 class="imageDocument" :src="'data:image/png;base64,' + item.medicalCard.data.toString('base64')"/>
                                                <button class="btnDelete" @click="deleteMedicalCard(item._id)">Delete</button>                  
                                            </div>
                                          </div>

                                  </div>
                            </div>     
                          </div> 
                        </div> 
                    </div>
                  </div>




                  <!-- DOC 3 -->
                  <div class="placeDoc">
                    <div>
                      <div class="row headerDoc">
                        <div class="row col-sm-8">
                          <div class="column animate__animated animate__fadeIn">
                            <div class="col-md-12 nameDocument">
                              <h4 v-if="!showDoc3 === false">3. Social security card</h4>
                              <h4 v-else style="color: #ED6868;">3. Social security card</h4>
                            </div> 
                            <div class="col-md-12 ">
                              <div v-if="showDoc3" class="btnShowHide"  v-on:click="showDoc3 = !showDoc3">Show &#9660;</div>
                              <div v-if="!showDoc3" class="btnShowHide" v-on:click="showDoc3 = !showDoc3">Hide &#9650;</div>
                            </div>   
                          </div>
                        </div>

                        <div class="col-sm-4 infoDoc animate__animated animate__fadeIn">
                          <div v-if="securitys.length" class="animate__animated animate__fadeInLeft">
                            <span class="totalImages">
                              <span class="infoDocOk">
                                <font-awesome-icon icon="check-circle" />
                              </span> {{lengthSecuritys}} Downloaded</span></div>
                          <div v-else class="animate__animated animate__fadeInLeft"><span class="infoDocWarning"><font-awesome-icon icon="exclamation-circle" /></span> No images</div>
                        </div>
                          
                      </div>
                      <div v-show="!showDoc3">
                        <div class="row"> 
                            <div class="row navDoc col-md-12">
                                  <div class="col-md-12">
                                    <form @submit.prevent>
                                        <input type="file" name="security" v-on:change="onChangeSecurity" :key="fileInputKey">
                                        <button v-if="security" class="btnSubmit" @click="onUploadSecurity">Submit</button>
                                    </form>
                                  </div>
<!--                                   <div v-if="securitys.length" class="col-md-2 animate__animated animate__bounceInRight">
                                      <button @click="deleteSecurityAll()">Delete all</button>
                                  </div> -->
                            </div>
                            <div class="col-md-12 imagesContainer">
                                  <div v-if="securitys.length" class="column animate__animated animate__fadeIn">
                                          <div class="row">
                                            <div class="col-sm-3" v-for="item in securitys" :key="item._id">
                                                <div>
                                                  <img v-img:group3 class="imageDocument" :src="'data:image/png;base64,' + item.security.data.toString('base64')"/>
                                                  <button class="btnDelete" @click="deleteSecurity(item._id)">Delete</button>
                                                </div>                    
                                            </div>
                                          </div>
                                  </div>
                            </div>     
                          </div> 
                        </div> 
                    </div>
                  </div>






                  <!-- DOC 4 -->
                  <div class="placeDoc">
                    <div>
                      <div class="row headerDoc">
                        <div class="row col-sm-8">
                          <div class="column animate__animated animate__fadeIn">
                            <div class="col-md-12 nameDocument">
                              <h4 v-if="!showDoc4 === false">4. Driver's Application for Employment</h4>
                              <h4 v-else style="color: #ED6868;">4. Driver's Application for Employment</h4>
                            </div> 
                            <div class="col-md-12 ">
                              <div v-if="showDoc4" class="btnShowHide"  v-on:click="showDoc4 = !showDoc4">Show &#9660;</div>
                              <div v-if="!showDoc4" class="btnShowHide" v-on:click="showDoc4 = !showDoc4">Hide &#9650;</div>
                            </div>   
                          </div>
                        </div>

                        <div class="col-sm-4 infoDoc animate__animated animate__fadeIn">
                          <div v-if="employments.length" class="animate__animated animate__fadeInLeft">
                            <span class="totalImages">
                              <span class="infoDocOk"><font-awesome-icon icon="check-circle" />
                              </span> {{lengthEmployments}} Downloaded</span>
                          </div>
                          <div v-else class="animate__animated animate__fadeInLeft"><span class="infoDocWarning"><font-awesome-icon icon="exclamation-circle" /></span> No images</div>
                        </div>
                          
                      </div>
                      <div v-show="!showDoc4">                       
                        <div class="row"> 
                            <div class="row navDoc col-md-12">
                                <div class="col-md-12">
                                  <div>
                                    <form @submit.prevent>
                                        <input type="file" name="employment" v-on:change="onChangeEmployment" :key="fileInputKey">
                                        <button v-if="employment" class="btnSubmit" @click="onUploadEmployment">Submit</button>
                                    </form>
                                  </div>
                                </div>
<!--                                 <div v-if="employments.length" class="col-md-2 animate__animated animate__bounceInRight">
                                  <button @click="deleteEmploymentAll(content._id)">Delete all</button>
                                </div> -->
                            </div>
                            <div class="col-md-12 imagesContainer">

                                  <div v-if="employments.length" class="column animate__animated animate__fadeIn">
                                          <div class="row">
                                            <div class="col-sm-3" v-for="item in employments" :key="item._id">
                                                <div>
                                                  <img v-img:group4 class="imageDocument" :src="'data:image/png;base64,' + item.employment.data.toString('base64')"/>
                                                  <button class="btnDelete" @click="deleteEmployment(item._id)">Delete</button>
                                                </div>                    
                                            </div>
                                          </div>
                                  </div>
                            </div>     
                          </div> 
                        </div> 
                    </div>
                  </div>





                  <!-- DOC 5 -->
                  <div class="placeDoc">
                    <div>
                      <div class="row headerDoc">
                        <div class="row col-sm-8">
                          <div class="column animate__animated animate__fadeIn">
                            <div class="col-md-12 nameDocument">
                              <h4 v-if="!showDoc5 === false">5. W4 form (Application page 21)</h4>
                              <h4 v-else style="color: #ED6868;">5. W4 form (Application page 21)</h4>
                            </div> 
                            <div class="col-md-12 ">
                              <div v-if="showDoc5" class="btnShowHide"  v-on:click="showDoc5 = !showDoc5">Show &#9660;</div>
                              <div v-if="!showDoc5" class="btnShowHide" v-on:click="showDoc5 = !showDoc5">Hide &#9650;</div>
                            </div>   
                          </div>
                        </div>

                        <div class="col-sm-4 infoDoc animate__animated animate__fadeIn">
                          <div v-if="w4forms.length" class="animate__animated animate__fadeInLeft">
                            <span class="totalImages">
                              <span class="infoDocOk"><font-awesome-icon icon="check-circle" />
                              </span> {{lengthW4forms}} Downloaded</span>
                          </div>
                          <div v-else class="animate__animated animate__fadeInLeft"><span class="infoDocWarning"><font-awesome-icon icon="exclamation-circle" /></span> No images</div>
                        </div>
                          
                      </div>
                      <div v-show="!showDoc5">                       
                        <div class="row"> 
                            <div class="row navDoc col-md-12">
                                <div class="col-md-12">
                                  <div>
                                    <form @submit.prevent>
                                        <input type="file" name="w4form" v-on:change="onChangeW4form" :key="fileInputKey">
                                        <button v-if="w4form" class="btnSubmit" @click="onUploadW4form">Submit</button>
                                    </form>
                                  </div>
                                </div>
<!--                                 <div v-if="w4forms.length" class="col-md-2 animate__animated animate__bounceInRight">
                                  <button @click="deleteW4formAll(content._id)">Delete all</button>
                                </div> -->
                            </div>
                            <div class="col-md-12 imagesContainer">

                                  <div v-if="w4forms.length" class="column animate__animated animate__fadeIn">
                                          <div class="row">
                                            <div class="col-sm-3" v-for="item in w4forms" :key="item._id">
                                                <div>
                                                  <img v-img:group5 class="imageDocument" :src="'data:image/png;base64,' + item.w4form.data.toString('base64')"/>
                                                  <button class="btnDelete" @click="deleteW4form(item._id)">Delete</button>
                                                </div>                    
                                            </div>
                                          </div>
                                  </div>
                            </div>     
                          </div> 
                        </div> 
                    </div>
                  </div>






                  <!-- DOC 6 -->
                  <div class="placeDoc">
                    <div>
                      <div class="row headerDoc">
                        <div class="row col-sm-8">
                          <div class="column animate__animated animate__fadeIn">
                            <div class="col-md-12 nameDocument">
                              <h4 v-if="!showDoc6 === false">6. Confidential info and Company Property Policy</h4>
                              <h4 v-else style="color: #ED6868;">6. Confidential info and Company Property Policy</h4>
                            </div> 
                            <div class="col-md-12 ">
                              <div v-if="showDoc6" class="btnShowHide"  v-on:click="showDoc6 = !showDoc6">Show &#9660;</div>
                              <div v-if="!showDoc6" class="btnShowHide" v-on:click="showDoc6 = !showDoc6">Hide &#9650;</div>
                            </div>   
                          </div>
                        </div>

                        <div class="col-sm-4 infoDoc animate__animated animate__fadeIn">
                          <div v-if="confidentials.length" class="animate__animated animate__fadeInLeft">
                            <span class="totalImages">
                              <span class="infoDocOk"><font-awesome-icon icon="check-circle" />
                              </span> {{lengthConfidential}} Downloaded</span>
                          </div>
                          <div v-else class="animate__animated animate__fadeInLeft"><span class="infoDocWarning"><font-awesome-icon icon="exclamation-circle" /></span> No images</div>
                        </div>
                          
                      </div>
                      <div v-show="!showDoc6">                       
                        <div class="row"> 
                            <div class="row navDoc col-md-12">
                                <div class="col-md-12">
                                  <div>
                                    <form @submit.prevent>
                                        <input type="file" name="confidential" v-on:change="onChangeConfidential" :key="fileInputKey">
                                        <button v-if="confidential" class="btnSubmit" @click="onUploadConfidential">Submit</button>
                                    </form>
                                  </div>
                                </div>
<!--                                 <div v-if="confidentials.length" class="col-md-2 animate__animated animate__bounceInRight">
                                  <button @click="deleteConfidentialAll(content._id)">Delete all</button>
                                </div> -->
                            </div>
                            <div class="col-md-12 imagesContainer">

                                  <div v-if="confidentials.length" class="column animate__animated animate__fadeIn">
                                          <div class="row">
                                            <div class="col-sm-3" v-for="item in confidentials" :key="item._id">
                                                <div>
                                                  <img v-img:group6 class="imageDocument" :src="'data:image/png;base64,' + item.confidential.data.toString('base64')"/>
                                                  <button class="btnDelete" @click="deleteConfidential(item._id)">Delete</button>
                                                </div>                    
                                            </div>
                                          </div>
                                  </div>
                            </div>     
                          </div> 
                        </div> 
                    </div>
                  </div>





                  <!-- DOC 7 -->
                  <div class="placeDoc">
                    <div>
                      <div class="row headerDoc">
                        <div class="row col-sm-8">
                          <div class="column animate__animated animate__fadeIn">
                            <div class="col-md-12 nameDocument">
                              <h4 v-if="!showDoc7 === false">7. "TAKE-HOME" Company-owned Vehicle Policy</h4>
                              <h4 v-else style="color: #ED6868;">7. "TAKE-HOME" Company-owned Vehicle Policy</h4>
                            </div> 
                            <div class="col-md-12 ">
                              <div v-if="showDoc7" class="btnShowHide"  v-on:click="showDoc7 = !showDoc7">Show &#9660;</div>
                              <div v-if="!showDoc7" class="btnShowHide" v-on:click="showDoc7 = !showDoc7">Hide &#9650;</div>
                            </div>   
                          </div>
                        </div>

                        <div class="col-sm-4 infoDoc animate__animated animate__fadeIn">
                          <div v-if="owneds.length" class="animate__animated animate__fadeInLeft">
                            <span class="totalImages">
                              <span class="infoDocOk"><font-awesome-icon icon="check-circle" /></span> {{lengthOwned}} Downloaded</span>
                          </div>
                          <div v-else class="animate__animated animate__fadeInLeft"><span class="infoDocWarning"><font-awesome-icon icon="exclamation-circle" /></span> No images</div>
                        </div>
                          
                      </div>
                      <div v-show="!showDoc7">                       
                        <div class="row"> 
                            <div class="row navDoc col-md-12">
                                <div class="col-md-12">
                                  <div>
                                    <form @submit.prevent>
                                        <input type="file" name="owned" v-on:change="onChangeOwned" :key="fileInputKey">
                                        <button v-if="owned" class="btnSubmit" @click="onUploadOwned">Submit</button>
                                    </form>
                                  </div>
                                </div>
<!--                                 <div v-if="owneds.length" class="col-md-2 animate__animated animate__bounceInRight">
                                  <button @click="deleteOwnedAll(content._id)">Delete all</button>
                                </div> -->
                            </div>
                            <div class="col-md-12 imagesContainer">

                                  <div v-if="owneds.length" class="column animate__animated animate__fadeIn">
                                          <div class="row">
                                            <div class="col-sm-3" v-for="item in owneds" :key="item._id">
                                                <div>
                                                  <img v-img:group7 class="imageDocument" :src="'data:image/png;base64,' + item.owned.data.toString('base64')"/>
                                                  <button class="btnDelete" @click="deleteOwned(item._id)">Delete</button>
                                                </div>                    
                                            </div>
                                          </div>
                                  </div>
                            </div>     
                          </div> 
                        </div> 
                    </div>
                  </div>





                  <!-- DOC 8 -->
                  <div class="placeDoc">
                    <div>
                      <div class="row headerDoc">
                        <div class="row col-sm-8">
                          <div class="column animate__animated animate__fadeIn">
                            <div class="col-md-12 nameDocument">
                              <h4 v-if="!showDoc8 === false">8. Hiring expenses agreement</h4>
                              <h4 v-else style="color: #ED6868;">8. Hiring expenses agreement</h4>
                            </div> 
                            <div class="col-md-12 ">
                              <div v-if="showDoc8" class="btnShowHide"  v-on:click="showDoc8 = !showDoc8">Show &#9660;</div>
                              <div v-if="!showDoc8" class="btnShowHide" v-on:click="showDoc8 = !showDoc8">Hide &#9650;</div>
                            </div>   
                          </div>
                        </div>

                        <div class="col-sm-4 infoDoc animate__animated animate__fadeIn">
                          <div v-if="expensess.length" class="animate__animated animate__fadeInLeft">
                            <span class="totalImages">
                              <span class="infoDocOk"><font-awesome-icon icon="check-circle" />
                              </span> {{lengthExpenses}} Downloaded</span>
                          </div>
                          <div v-else class="animate__animated animate__fadeInLeft"><span class="infoDocWarning"><font-awesome-icon icon="exclamation-circle" /></span> No images</div>
                        </div>
                          
                      </div>
                      <div v-show="!showDoc8">                       
                        <div class="row"> 
                            <div class="row navDoc col-md-12">
                                <div class="col-md-12">
                                  <div>
                                    <form @submit.prevent>
                                        <input type="file" name="expenses" v-on:change="onChangeExpenses" :key="fileInputKey">
                                        <button v-if="expenses" class="btnSubmit" @click="onUploadExpenses">Submit</button>
                                    </form>
                                  </div>
                                </div>
<!--                                 <div v-if="expensess.length" class="col-md-2 animate__animated animate__bounceInRight">
                                  <button @click="deleteExpensesAll(content._id)">Delete all</button>
                                </div> -->
                            </div>
                            <div class="col-md-12 imagesContainer">

                                  <div v-if="expensess.length" class="column animate__animated animate__fadeIn">
                                          <div class="row">
                                            <div class="col-sm-3" v-for="item in expensess" :key="item._id">
                                                <div>
                                                  <img v-img:group8 class="imageDocument" :src="'data:image/png;base64,' + item.expenses.data.toString('base64')"/>
                                                  <button class="btnDelete" @click="deleteExpenses(item._id)">Delete</button>
                                                </div>                    
                                            </div>
                                          </div>
                                  </div>
                            </div>     
                          </div> 
                        </div> 
                    </div>
                  </div>




                  <!-- DOC 9 -->
                  <div class="placeDoc">
                    <div>
                      <div class="row headerDoc">
                        <div class="row col-sm-8">
                          <div class="column animate__animated animate__fadeIn">
                            <div class="col-md-12 nameDocument">
                              <h4 v-if="!showDoc9 === false">9. Direct desposit form</h4>
                              <h4 v-else style="color: #ED6868;">9. Direct desposit form</h4>
                            </div> 
                            <div class="col-md-12 ">
                              <div v-if="showDoc9" class="btnShowHide"  v-on:click="showDoc9 = !showDoc9">Show &#9660;</div>
                              <div v-if="!showDoc9" class="btnShowHide" v-on:click="showDoc9 = !showDoc9">Hide &#9650;</div>
                            </div>   
                          </div>
                        </div>

                        <div class="col-sm-4 infoDoc animate__animated animate__fadeIn">
                          <div v-if="desposits.length" class="animate__animated animate__fadeInLeft">
                            <span class="totalImages">
                              <span class="infoDocOk"><font-awesome-icon icon="check-circle" />
                              </span> {{lengthDesposit}} Downloaded</span>
                          </div>
                          <div v-else class="animate__animated animate__fadeInLeft"><span class="infoDocWarning"><font-awesome-icon icon="exclamation-circle" /></span> No images</div>
                        </div>
                          
                      </div>
                      <div v-show="!showDoc9">                       
                        <div class="row"> 
                            <div class="row navDoc col-md-12">
                                <div class="col-md-12">
                                  <div>
                                    <form @submit.prevent>
                                        <input type="file" name="desposit" v-on:change="onChangeDesposit" :key="fileInputKey">
                                        <button v-if="desposit" class="btnSubmit" @click="onUploadDesposit">Submit</button>
                                    </form>
                                  </div>
                                </div>
<!--                                 <div v-if="desposits.length" class="col-md-2 animate__animated animate__bounceInRight">
                                  <button @click="deleteDespositAll(content._id)">Delete all</button>
                                </div> -->
                            </div>
                            <div class="col-md-12 imagesContainer">

                                  <div v-if="desposits.length" class="column animate__animated animate__fadeIn">
                                          <div class="row">
                                            <div class="col-sm-3" v-for="item in desposits" :key="item._id">
                                                <div>
                                                  <img v-img:group9 class="imageDocument" :src="'data:image/png;base64,' + item.desposit.data.toString('base64')"/>
                                                  <button class="btnDelete" @click="deleteDesposit(item._id)">Delete</button>
                                                </div>                    
                                            </div>
                                          </div>
                                  </div>
                            </div>     
                          </div> 
                        </div> 
                    </div>
                  </div>





                   <!-- DOC 10 -->
                  <div class="placeDoc">
                    <div>
                      <div class="row headerDoc">
                        <div class="row col-sm-8">
                          <div class="column animate__animated animate__fadeIn">
                            <div class="col-md-12 nameDocument">
                              <h4 v-if="!showDoc10 === false">10. Fair credit (Application page 16)</h4>
                              <h4 v-else style="color: #ED6868;">10. Fair credit (Application page 16)</h4>
                            </div> 
                            <div class="col-md-12 ">
                              <div v-if="showDoc10" class="btnShowHide"  v-on:click="showDoc10 = !showDoc10">Show &#9660;</div>
                              <div v-if="!showDoc10" class="btnShowHide" v-on:click="showDoc10 = !showDoc10">Hide &#9650;</div>
                            </div>   
                          </div>
                        </div>

                        <div class="col-sm-4 infoDoc animate__animated animate__fadeIn">
                          <div v-if="credits.length" class="animate__animated animate__fadeInLeft">
                            <span class="totalImages">
                              <span class="infoDocOk"><font-awesome-icon icon="check-circle" />
                              </span> {{lengthCredit}} Downloaded</span>
                          </div>
                          <div v-else class="animate__animated animate__fadeInLeft"><span class="infoDocWarning"><font-awesome-icon icon="exclamation-circle" /></span> No images</div>
                        </div>
                          
                      </div>
                      <div v-show="!showDoc10">                       
                        <div class="row"> 
                            <div class="row navDoc col-md-12">
                                <div class="col-md-12">
                                  <div>
                                    <form @submit.prevent>
                                        <input type="file" name="credit" v-on:change="onChangeCredit" :key="fileInputKey">
                                        <button v-if="credit" class="btnSubmit" @click="onUploadCredit">Submit</button>
                                    </form>
                                  </div>
                                </div>
<!--                                 <div v-if="credits.length" class="col-md-2 animate__animated animate__bounceInRight">
                                  <button @click="deleteCreditAll(content._id)">Delete all</button>
                                </div> -->
                            </div>
                            <div class="col-md-12 imagesContainer">

                                  <div v-if="credits.length" class="column animate__animated animate__fadeIn">
                                          <div class="row">
                                            <div class="col-sm-3" v-for="item in credits" :key="item._id">
                                                <div>
                                                  <img v-img:group10 class="imageDocument" :src="'data:image/png;base64,' + item.credit.data.toString('base64')"/>
                                                  <button class="btnDelete" @click="deleteCredit(item._id)">Delete</button>
                                                </div>                    
                                            </div>
                                          </div>
                                  </div>
                            </div>     
                          </div> 
                        </div> 
                    </div>
                  </div>





                  <!-- DOC 11 -->
                  <div class="placeDoc">
                    <div>
                      <div class="row headerDoc">
                        <div class="row col-sm-8">
                          <div class="column animate__animated animate__fadeIn">
                            <div class="col-md-12 nameDocument">
                              <h4 v-if="!showDoc11 === false">11. Employment eligiibity verification</h4>
                              <h4 v-else style="color: #ED6868;">11. Employment eligiibity verification</h4>
                            </div> 
                            <div class="col-md-12 ">
                              <div v-if="showDoc11" class="btnShowHide"  v-on:click="showDoc11 = !showDoc11">Show &#9660;</div>
                              <div v-if="!showDoc11" class="btnShowHide" v-on:click="showDoc11 = !showDoc11">Hide &#9650;</div>
                            </div>   
                          </div>
                        </div>

                        <div class="col-sm-4 infoDoc animate__animated animate__fadeIn">
                          <div v-if="eligiibitys.length" class="animate__animated animate__fadeInLeft">
                            <span class="totalImages">
                              <span class="infoDocOk"><font-awesome-icon icon="check-circle" />
                              </span> {{lengthEligiibity}} Downloaded</span>
                          </div>
                          <div v-else class="animate__animated animate__fadeInLeft"><span class="infoDocWarning"><font-awesome-icon icon="exclamation-circle" /></span> No images</div>
                        </div>
                          
                      </div>
                      <div v-show="!showDoc11">                       
                        <div class="row"> 
                            <div class="row navDoc col-md-12">
                                <div class="col-md-12">
                                  <div>
                                    <form @submit.prevent>
                                        <input type="file" name="eligiibity" v-on:change="onChangeEligiibity" :key="fileInputKey">
                                        <button v-if="eligiibity" class="btnSubmit" @click="onUploadEligiibity">Submit</button>
                                    </form>
                                  </div>
                                </div>
<!--                                 <div v-if="eligiibitys.length" class="col-md-2 animate__animated animate__bounceInRight">
                                  <button @click="deleteEligiibityAll(content._id)">Delete all</button>
                                </div> -->
                            </div>
                            <div class="col-md-12 imagesContainer">

                                  <div v-if="eligiibitys.length" class="column animate__animated animate__fadeIn">
                                          <div class="row">
                                            <div class="col-sm-3" v-for="item in eligiibitys" :key="item._id">
                                                <div>
                                                  <img v-img:group11 class="imageDocument" :src="'data:image/png;base64,' + item.eligiibity.data.toString('base64')"/>
                                                  <button class="btnDelete" @click="deleteEligiibity(item._id)">Delete</button>
                                                </div>                    
                                            </div>
                                          </div>
                                  </div>
                            </div>     
                          </div> 
                        </div> 
                    </div>
                  </div>



                  <!-- DOC 12 -->
                  <div class="placeDoc">
                    <div>
                      <div class="row headerDoc">
                        <div class="row col-sm-8">
                          <div class="column animate__animated animate__fadeIn">
                            <div class="col-md-12 nameDocument">
                              <h4 v-if="!showDoc12 === false">12. Drug test</h4>
                              <h4 v-else style="color: #ED6868;">12. Drug test</h4>
                            </div> 
                            <div class="col-md-12 ">
                              <div v-if="showDoc12" class="btnShowHide"  v-on:click="showDoc12 = !showDoc12">Show &#9660;</div>
                              <div v-if="!showDoc12" class="btnShowHide" v-on:click="showDoc12 = !showDoc12">Hide &#9650;</div>
                            </div>   
                          </div>
                        </div>

                        <div class="col-sm-4 infoDoc animate__animated animate__fadeIn">
                          <div v-if="drugs.length" class="animate__animated animate__fadeInLeft">
                            <span class="totalImages">
                              <span class="infoDocOk"><font-awesome-icon icon="check-circle" />
                              </span> {{lengthDrug}} Downloaded</span>
                          </div>
                          <div v-else class="animate__animated animate__fadeInLeft"><span class="infoDocWarning"><font-awesome-icon icon="exclamation-circle" /></span> No images</div>
                        </div>
                          
                      </div>
                      <div v-show="!showDoc12">                       
                        <div class="row"> 
                            <div class="row navDoc col-md-12">
                                <div class="col-md-12">
                                  <div>
                                    <form @submit.prevent>
                                        <input type="file" name="drug" v-on:change="onChangeDrug" :key="fileInputKey">
                                        <button v-if="drug" class="btnSubmit" @click="onUploadDrug">Submit</button>
                                    </form>
                                  </div>
                                </div>
<!--                                 <div v-if="drugs.length" class="col-md-2 animate__animated animate__bounceInRight">
                                  <button @click="deleteDrugAll(content._id)">Delete all</button>
                                </div> -->
                            </div>
                            <div class="col-md-12 imagesContainer">

                                  <div v-if="drugs.length" class="column animate__animated animate__fadeIn">
                                          <div class="row">
                                            <div class="col-sm-3" v-for="item in drugs" :key="item._id">
                                                <div>
                                                  <img v-img:group12 class="imageDocument" :src="'data:image/png;base64,' + item.drug.data.toString('base64')"/>
                                                  <button class="btnDelete" @click="deleteDrug(item._id)">Delete</button>
                                                </div>                    
                                            </div>
                                          </div>
                                  </div>
                            </div>     
                          </div> 
                        </div> 
                    </div>
                  </div>



                  <!-- DOC 13 -->
                  <div class="placeDoc">
                    <div>
                      <div class="row headerDoc">
                        <div class="row col-sm-8">
                          <div class="column animate__animated animate__fadeIn">
                            <div class="col-md-12 nameDocument">
                              <h4 v-if="!showDoc14 === false">13. MVR</h4>
                              <h4 v-else style="color: #ED6868;">13. MVR</h4>
                            </div> 
                            <div class="col-md-12 ">
                              <div v-if="showDoc14" class="btnShowHide"  v-on:click="showDoc14 = !showDoc14">Show &#9660;</div>
                              <div v-if="!showDoc14" class="btnShowHide" v-on:click="showDoc14 = !showDoc14">Hide &#9650;</div>
                            </div>   
                          </div>
                        </div>

                        <div class="col-sm-4 infoDoc animate__animated animate__fadeIn">
                          <div v-if="mvrs.length" class="animate__animated animate__fadeInLeft">
                            <span class="totalImages">
                              <span class="infoDocOk"><font-awesome-icon icon="check-circle" />
                              </span> {{lengthMvr}} Downloaded</span>
                          </div>
                          <div v-else class="animate__animated animate__fadeInLeft"><span class="infoDocWarning"><font-awesome-icon icon="exclamation-circle" /></span> No images</div>
                        </div>
                          
                      </div>
                      <div v-show="!showDoc14">                       
                        <div class="row"> 
                            <div class="row navDoc col-md-12">
                                <div class="col-md-12">
                                  <div>
                                    <form @submit.prevent>
                                        <input type="file" name="mvr" v-on:change="onChangeMvr" :key="fileInputKey">
                                        <button v-if="mvr" class="btnSubmit" @click="onUploadMvr">Submit</button>
                                    </form>
                                  </div>
                                </div>
<!--                                 <div v-if="anothers.length" class="col-md-2 animate__animated animate__bounceInRight">
                                  <button @click="deleteAnotherAll(content._id)">Delete all</button>
                                </div> -->
                            </div>
                            <div class="col-md-12 imagesContainer">

                                  <div v-if="mvrs.length" class="column animate__animated animate__fadeIn">
                                          <div class="row">
                                            <div class="col-sm-3" v-for="item in mvrs" :key="item._id">
                                                <div>
                                                  <img v-img:group14 class="imageDocument" :src="'data:image/png;base64,' + item.mvr.data.toString('base64')"/>
                                                  <button class="btnDelete" @click="deleteMvr(item._id)">Delete</button>
                                                </div>                    
                                            </div>
                                          </div>
                                  </div>
                            </div>     
                          </div> 
                        </div> 
                    </div>
                  </div>




                  <!-- DOC 14 -->
                  <div class="placeDoc">
                    <div>
                      <div class="row headerDoc">
                        <div class="row col-sm-8">
                          <div class="column animate__animated animate__fadeIn">
                            <div class="col-md-12 nameDocument">
                              <h4 v-if="!showDoc13 === false">14. Another document</h4>
                              <h4 v-else style="color: #ED6868;">14. Another document</h4>
                            </div> 
                            <div class="col-md-12 ">
                              <div v-if="showDoc13" class="btnShowHide"  v-on:click="showDoc13 = !showDoc13">Show &#9660;</div>
                              <div v-if="!showDoc13" class="btnShowHide" v-on:click="showDoc13 = !showDoc13">Hide &#9650;</div>
                            </div>   
                          </div>
                        </div>

                        <div class="col-sm-4 infoDoc animate__animated animate__fadeIn">
                          <div v-if="anothers.length" class="animate__animated animate__fadeInLeft">
                            <span class="totalImages">
                              <span class="infoDocOk"><font-awesome-icon icon="check-circle" />
                              </span> {{lengthAnother}} Downloaded</span>
                          </div>
                          <div v-else class="animate__animated animate__fadeInLeft"><span class="infoDocWarning"><font-awesome-icon icon="exclamation-circle" /></span> No images</div>
                        </div>
                          
                      </div>
                      <div v-show="!showDoc13">                       
                        <div class="row"> 
                            <div class="row navDoc col-md-12">
                                <div class="col-md-12">
                                  <div>
                                    <form @submit.prevent>
                                        <input type="file" name="another" v-on:change="onChangeAnother" :key="fileInputKey">
                                        <button v-if="another" class="btnSubmit" @click="onUploadAnother">Submit</button>
                                    </form>
                                  </div>
                                </div>
<!--                                 <div v-if="anothers.length" class="col-md-2 animate__animated animate__bounceInRight">
                                  <button @click="deleteAnotherAll(content._id)">Delete all</button>
                                </div> -->
                            </div>
                            <div class="col-md-12 imagesContainer">

                                  <div v-if="anothers.length" class="column animate__animated animate__fadeIn">
                                          <div class="row">
                                            <div class="col-sm-3" v-for="item in anothers" :key="item._id">
                                                <div>
                                                  <img v-img:group13 class="imageDocument" :src="'data:image/png;base64,' + item.another.data.toString('base64')"/>
                                                  <button class="btnDelete" @click="deleteAnother(item._id)">Delete</button>
                                                </div>                    
                                            </div>
                                          </div>
                                  </div>
                            </div>     
                          </div> 
                        </div> 
                    </div>
                  </div>
                </div>




                <div v-if="activetab ==='3'" class="tabcontent animate__animated animate__slideInUp">
                  <div class="documentsSetting">
                      <h1>Setting</h1>
<!--                       <button class="btnDeleteUser" @click="deleteUser(content._id)">&#128465; Delete driver</button> -->
                              <div class="modalWrapperDeleteUser">
                                <button @click="showModal = true" class="btnDeleteUser">&#128465; Delete driver</button>
                                <div class="overlays" v-if="showModal" @click="showModal = false"></div>
                                <div class="modalDeleteUser animate__animated animate__fadeIn" v-if="showModal">
                                  <div>
                                      <h4>Delete</h4>
                                      <p>Are you sure you want to delete?</p>
                                  </div>
                                  <div class="btnDeleteUserModal" @click="deleteUser(content._id)">Yes, delete</div>
                                  <div class="closeMadal" @click="showModal = false">Сancel</div>
                                </div>
                              </div>
                  </div>
                  <div class="placeDocSetting row">
                    <div class="col-md-6">
                      <div class="itemSetting">
                        <div class="settingTitle">First name</div>
                        <form>
                          <input type="text" v-model="firstName" size="32" value='firstName'>
                          <button v-if="firstName" class="btnСonfirmSetting animate__animated animate__fadeInDown" @click.prevent="setFirstName(content._id, firstName)">Сonfirm</button>
<!--                           <button v-if="firstName" class="btnClearSetiing animate__animated animate__fadeInDown" @click.prevent="firstNameClear(content._id)">Clear</button> -->
                        </form>
                      </div>

                      <div class="itemSetting">
                        <div class="settingTitle">Last name</div>
                        <form>
                          <input type="text" v-model="lastName" size="32" value='lastName'>
                          <button v-if="lastName" class="btnСonfirmSetting animate__animated animate__fadeInDown" @click.prevent="setLastName(content._id)">Сonfirm</button>
<!--                           <button v-if="lastName" class="btnClearSetiing animate__animated animate__fadeInDown" @click.prevent="lastNameClear(content._id)">Clear</button> -->
                        </form>
                      </div>


                      <div class="itemSetting">
                        <div class="settingTitle">Date of birth</div>
                        <form>
                          <input type="date"  v-model="dateOfBirth" value='dateOfBirth'>
                          <button v-if="dateOfBirth" class="btnСonfirmSettingDate animate__animated animate__fadeInDown" @click.prevent="setDateOfBirth(content._id)">Сonfirm</button>
                          <button v-if="dateOfBirth" class="btnClearSetiing animate__animated animate__fadeInDown" @click.prevent="dateOfBirthClear(content._id)">Clear</button>
                        </form>
                      </div>


                      <div class="itemSetting">
                        <div class="settingTitle">Social security number</div>
                        <form>
                          <input type="text" v-model="socialSecurityNumber" size="32" value='socialSecurityNumber'>
                          <button v-if="socialSecurityNumber" class="btnСonfirmSetting animate__animated animate__fadeInDown" @click.prevent="setSocialSecurityNumber(content._id)">Сonfirm</button>
                          <button v-if="socialSecurityNumber" class="btnClearSetiing animate__animated animate__fadeInDown" @click.prevent="socialSecurityNumberClear(content._id)">Clear</button>
                        </form>
                      </div>


                      <div class="itemSetting">
                        <div class="settingTitle">Driver license number</div>
                        <form>
                          <input type="text" v-model="driverLicenseNumber" size="32" value='driverLicenseNumber'>
                          <button v-if="driverLicenseNumber" class="btnСonfirmSetting animate__animated animate__fadeInDown" @click.prevent="setDriverLicenseNumber(content._id)">Сonfirm</button>
                          <button v-if="driverLicenseNumber" class="btnClearSetiing animate__animated animate__fadeInDown" @click.prevent="driverLicenseNumberClear(content._id)">Clear</button>
                        </form>
                      </div>


                      <div class="itemSetting">
                        <div class="settingTitle">Driver license state</div>
                        <form>
                          <input type="text" v-model="driverLicenseState" size="32" value='driverLicenseState'>
                          <button v-if="driverLicenseState" class="btnСonfirmSetting animate__animated animate__fadeInDown" @click.prevent="setDriverLicenseState(content._id)">Сonfirm</button>
                          <button v-if="driverLicenseState" class="btnClearSetiing animate__animated animate__fadeInDown" @click.prevent="driverLicenseStateClear(content._id)">Clear</button>
                        </form>
                      </div>

                      <div class="itemSetting">
                        <div class="settingTitle">Driver license issue date</div>
                          <form>
                            <input type="date" v-model="driverLicenseIssueDate" size="32" value='driverLicenseIssueDate'>
                            <button v-if="driverLicenseIssueDate" class="btnСonfirmSettingDate animate__animated animate__fadeInDown" @click.prevent="setDriverLicenseIssueDate(content._id)">Сonfirm</button>
                            <button v-if="driverLicenseIssueDate" class="btnClearSetiing animate__animated animate__fadeInDown" @click.prevent="driverLicenseIssueDateClear(content._id)">Clear</button>
                          </form>
                      </div>
                    </div>


                    
                  <div class="col-md-6">


                    <div class="itemSetting">
                        <div class="settingTitle">Home adress</div>
                        <form>
                          <input type="text" v-model="homeAdress" size="32" value='homeAdress'>
                          <button v-if="homeAdress" class="btnСonfirmSetting animate__animated animate__fadeInDown" @click.prevent="setHomeAdress(content._id)">Сonfirm</button>
                          <button v-if="homeAdress" class="btnClearSetiing animate__animated animate__fadeInDown" @click.prevent="homeAdressClear(content._id)">Clear</button>
                        </form>
                    </div>


                    <div class="itemSetting">
                        <div class="settingTitle">Phone number</div>
                        <form>
                          <input type="text" v-model="phoneNumber" size="32" value='phoneNumber'>
                          <button v-if="phoneNumber" class="btnСonfirmSetting animate__animated animate__fadeInDown" @click.prevent="setPhoneNumber(content._id)">Сonfirm</button>
                          <button v-if="phoneNumber" class="btnClearSetiing animate__animated animate__fadeInDown" @click.prevent="phoneNumberClear(content._id)">Clear</button>
                        </form>
                    </div>



                    <div class="itemSetting">
                        <div class="settingTitle">Email</div>
                        <form> 
                          <input type="text" v-model="email" size="32" value='email'>
                          <button v-if="email" class="btnСonfirmSetting animate__animated animate__fadeInDown" @click.prevent="setEmail(content._id)">Сonfirm</button>
                          <button v-if="email" class="btnClearSetiing animate__animated animate__fadeInDown" @click.prevent="emailClear(content._id)">Clear</button>
                        </form>
                    </div>




                    <div class="itemSetting">
                        <div class="settingTitle">Employing company</div>
                        <form>
                          <input type="text" v-model="employingCompany" size="32" value='employingCompany'>
                          <button v-if="employingCompany" class="btnСonfirmSetting animate__animated animate__fadeInDown" @click.prevent="setEmployingCompany(content._id)">Сonfirm</button>
                          <button v-if="employingCompany" class="btnClearSetiing animate__animated animate__fadeInDown" @click.prevent="employingCompanyClear(content._id)">Clear</button>
                        </form>
                    </div>


                    <div class="itemSetting">
                        <div class="settingTitle">Date of employment</div>
                        <form>
                          <input type="date" v-model="dateOfEmplouyment" value='dateOfEmplouyment'>
                          <button v-if="dateOfEmplouyment" class="btnСonfirmSettingDate animate__animated animate__fadeInDown" @click.prevent="setDateOfEmplouyment(content._id)">Сonfirm</button>
                          <button v-if="dateOfEmplouyment" class="btnClearSetiing animate__animated animate__fadeInDown" @click.prevent="dateOfEmplouymentClear(content._id)">Clear</button>
                        </form>
                    </div>


                    <div class="itemSetting">
                      <div class="settingTitle">Date of dismissal</div>
                      <form>
                          <input type="date" v-model="dateOfDismissal" value='dateOfDismissal'>
                          <button v-if="dateOfDismissal" class="btnСonfirmSettingDate animate__animated animate__fadeInDown" @click.prevent="setDateOfDismissal(content._id)">Сonfirm</button>
                          <button v-if="dateOfDismissal" class="btnClearSetiing animate__animated animate__fadeInDown" @click.prevent="dateOfDismissalClear(content._id)">Clear</button>
                        </form>
                    </div>


                    <div class="itemSetting">
                        <div class="settingTitle">Avatar</div>
                        <div v-if="avatar.length">
                              <div v-for="item in avatar" :key="item._id">
                                <button class="btnDellAvatar animate__animated animate__fadeInDown" @click="deleteAvatar(item._id)">Delete avatar</button>    
                              </div>           
                        </div>
                        <div v-else> 
                              <div >
                                <form @submit.prevent>
                                  <input type="file" name="avatar" v-on:change="onChangeAvatar" :key="fileInputKey">
                                  <button v-if="avatarUpl" class="btnAddAvatar animate__animated animate__fadeInDown" @click="onUploadAvatar">Add avatar</button>
                                </form>
                              </div>
                        </div>
                      </div>
                  </div>



                    <div class="settingComment"> 
                      <div class="settingTitle">Comment</div>
                      <form>
                        <textarea v-model="comment" value='comment' rows="3"></textarea>
                        <button v-if="comment" class="btnСonfirmSetting animate__animated animate__fadeInDown" @click.prevent="setComment(content._id)">Сonfirm</button>
                        <button v-if="comment" class="btnClearSetiing animate__animated animate__fadeInDown" @click.prevent="commentClear(content._id)">Clear</button>
                      </form>
                     
                    </div>




                  </div> 
                </div>
            </div>
          </div>
        </div>
      </div>     
    </div>
  </div>
</template>
<script>
const url = 'http://31.172.69.136:3000/'
// 'http://localhost:3000/'
// 'http://31.172.69.136:3000/'
const vueImgConfig = {
  // Use `alt` attribute as gallery slide title
  altAsTitle: false,
  // Display 'download' button near 'close' that opens source image in new tab
  sourceButton: false,
  // Event listener to open gallery will be applied to <img> element
  openOn: 'click',
  // Show thumbnails for all groups with more than 1 image
  thumbnails: true,
}
import moment from 'moment'

Vue.prototype.moment = moment
import VueImg from 'v-img';
Vue.use(VueImg, vueImgConfig);
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
      loading: false,
      fileInputKey: 0,
      showModal: false,
      activetab: '1',
      showDoc1: true,
      showDoc2: true,
      showDoc3: true,
      showDoc4: true,
      showDoc5: true,
      showDoc6: true,
      showDoc7: true,
      showDoc8: true,
      showDoc9: true,
      showDoc10: true,
      showDoc11: true,
      showDoc12: true,
      showDoc13: true,
      showDoc14: true,
      status: '',
      username: '',
      email: '',
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      socialSecurityNumber: '',
      driverLicenseNumber: '',
      driverLicenseState: '',
      driverLicenseIssueDate: '',
      homeAdress: '',
      phoneNumber: '',
      employingCompany: '',
      dateOfEmplouyment: '',
      dateOfDismissal: '',
      endOfDateDriverLicense: '',
      endOfDateMedicalCard: '',
      comment: '',
      dates: '',
      images: '',
      medicals: '',
      avatar: '',
      securitys: '',
      employments: '',
      w4forms: '',
      confidentials: '',
      owneds: '',
      expensess: '',
      desposits: '',
      credits: '',
      eligiibitys: '',
      drugs: '',
      anothers: '',
      mvrs: '',
      empty: '',
      color: [],
      color2: [],
      img: '',
      medicalCard: '',
      security: '',
      employment: '',
      w4form: '',
      confidential: '',
      owned: '',
      expenses: '',
      desposit: '',
      credit: '',
      eligiibity: '',
      drug: '',
      mvr: '',
      another: '',
      avatarUpl: '',
    }
  },
  computed: {
    timestamp() {
      return moment(this.endOfDateDriverLicense).format('MM/DD/YYYY')
    },
    lengthImages() {
      return this.images.length
    },
    lengthMedicals() {
      return this.medicals.length
    },
    lengthSecuritys() {
      return this.securitys.length
    },
    lengthEmployments() {
      return this.employments.length
    },
    lengthW4forms() {
      return this.w4forms.length
    },
    lengthConfidential() {
      return this.confidentials.length
    },
    lengthOwned() {
      return this.owneds.length
    },
    lengthExpenses() {
      return this.expensess.length
    },
    lengthDesposit() {
      return this.desposits.length
    },
    lengthCredit() {
      return this.credits.length
    },
    lengthEligiibity() {
      return this.eligiibitys.length
    },
    lengthDrug() {
      return this.drugs.length
    },
    lengthMvr() {
      return this.mvrs.length
    },
    lengthAnother() {
      return this.anothers.length
    }
  },
  mounted() {
    // all data
    this.getData()
    //driver licence
    this.getendOfDateDriverLicense()
    this.getImages()
    //get status
    this.getStatus()
    //get username
    this.getUsername()
    //get Email
    this.getEmail()
    //get first name
    this.getFirstName()
    //get last name
    this.getLastName()
    //get date of birth
    this.getDateOfBirth()
    //get socialSecurityNumber
    this.getSocialSecurityNumber()
    //get Driver License Number
    this.getDriverLicenseNumber()
    //get driver License State
    this.getDriverLicenseState()
    //get driver License Issue Date
    this.getDriverLicenseIssueDate()
    //get home Adress
    this.getHomeAdress()
    //get phone Number
    this.getPhoneNumber()
    //get employing Company
    this.getEmployingCompany()
    //get date Of Emplouyment
    this.getDateOfEmplouyment()
    //get date Of Dismissal
    this.getDateOfDismissal()
    //get comment
    this.getComment()
    //medical card
    this.getendOfDateMedicalCard()
    this.getMedicals()
    //security card
    this.getSecurity()
    //employment card
    this.getEmployments()
    //w4form
    this.getW4forms()
    //Confidentials
    this.getConfidentials()
    //Owned
    this.getOwneds()
    //Expenses 
    this.getExpensess()
    //desposit 
    this.getDesposits()
    //credit 
    this.getCredits()
    //eligiibity 
    this.getEligiibitys()
    //drug 
    this.getDrugs()
    //mvr 
    this.getMvrs()
    //another 
    this.getAnothers()
    //get avatar
    this.getAvatar()
  },
  methods: {
      // input clear
      clear() {
        this.fileInputKey++;
        if (this.img) {
          this.img = null;
        }
        else if (this.security) {
          this.security = null;
        }
        else if (this.employment) {
          this.employment = null;
        }
        else if (this.medicalCard) {
          this.medicalCard = null;
        }
        else if (this.w4form) {
          this.w4form = null;
        }
        else if (this.confidential) {
          this.confidential = null;
        }
        else if (this.owned) {
          this.owned = null;
        }
        else if (this.expenses) {
          this.expenses = null;
        }
        else if (this.desposit) {
          this.desposit = null;
        }
        else if (this.credit) {
          this.credit = null;
        }
        else if (this.eligiibity) {
          this.eligiibity = null;
        }
        else if (this.drug) {
          this.drug = null;
        }
        else if (this.mvr) {
          this.mvr = null;
        }
        else if (this.another) {
          this.another = null;
        }
        else if (this.avatarUpl) {
          this.avatarUpl = null;
        }
      },
      //show end documents
      finish() {
        this.color.push({color: 1})
        Vue.toasted.show( "Driver Licence expire soon &#10071;", {
          theme: "toasted-primary",
          position: "top-right",
          duration: 3000,
        });
      },

      finish2() {
        this.color2.push({color: 1})
        Vue.toasted.show( "Medical Card expire soon &#10071;", {
          theme: "toasted-primary",
          position: "top-right",
          duration: 3000,
        });
      },


    //get all data
    getData() {
      axios
        .get(url + 'admin/' + this.$route.params.id, { headers: authHeader()})
          .then(response => {
            return response.data
          })
          .then(data => {
             return this.content = data
          })
          .catch(err => {
             console.log(err)
          })
      },

    //delete user
    deleteUser() {
      axios
        .delete(url + 'user/' + this.$route.params.id, { headers: authHeader()})
        .then(() => {
          Vue.toasted.show("Driver deleted", {
            theme: "toasted-primary",
            position: "top-right",
             duration: 3000,
          });

        });
        this.$router.push('/admin');
    },

    // username
    getUsername() {
        axios
          .get(url + 'admin/' + this.$route.params.id, { headers: authHeader()})
          .then(response => (this.username = response.data.username));
    },

    setUsername(id) {
        const updateData = { username: this.username }
        axios
          .put(url + 'user/' + id, updateData, { headers: authHeader()})
          .then(() => {
            this.getUsername()
            Vue.toasted.show('username', {
              theme: "toasted-primary",
              position: "top-right",
              duration: 3000,
            });
         });
      },
    usernameClear(id) {
        const update = { username: this.empty }
        axios
          .put(url + 'user/' + id, update, { headers: authHeader()})
          .then(() => {
            this.getusername()
          });
      },


    // first name
    getFirstName() {
        axios
          .get(url + 'admin/' + this.$route.params.id, { headers: authHeader()})
          .then(response => (this.firstName = response.data.firstName));
    },

    setFirstName(id, name) {
        const updateData = { firstName: this.firstName }
        axios
          .put(url + 'user/' + id, updateData, { headers: authHeader()})
          .then(() => {
            this.getLastName()
            Vue.toasted.show('First name changed! &#9989;', {
              theme: "toasted-primary",
              position: "top-right",
              duration: 3000,
            });
            Vue.toasted.show('Nice name ' + name + " &#128076;",  {
              theme: "toasted-primary",
              position: "top-right",
              duration: 3000,
            });
         });
      },
    firstNameClear(id) {
        const update = { firstName: this.empty }
        axios
          .put(url + 'user/' + id, update, { headers: authHeader()})
          .then(() => {
            this.getFirstName()
            Vue.toasted.show('First name clear &#10060;', {
              theme: "toasted-primary",
              position: "top-right",
              duration: 3000,
            });
          });
      },

    // last name
    getLastName() {
        axios
          .get(url + 'admin/' + this.$route.params.id, { headers: authHeader()})
          .then(response => (this.lastName = response.data.lastName));
    },

    setLastName(id) {
        const updateData = { lastName: this.lastName }
        axios
          .put(url + 'user/' + id, updateData, { headers: authHeader()})
          .then(() => {
            this.getLastName()
            Vue.toasted.show('last name changed &#9989;', {
              theme: "toasted-primary",
              position: "top-right",
              duration: 3000,
            });
         });
      },
    lastNameClear(id) {
        const update = { lastName: this.empty }
        axios
          .put(url + 'user/' + id, update, { headers: authHeader()})
          .then(() => {
            this.getLastName()
            Vue.toasted.show('last name clear &#10060;', {
              theme: "toasted-primary",
              position: "top-right",
              duration: 3000,
            });
          });
      },


    // email
    getEmail() {
        axios
          .get(url + 'admin/' + this.$route.params.id, { headers: authHeader()})
          .then(response => (this.email = response.data.email));
    },

    setEmail(id) {
        const updateData = { email: this.email }
        axios
          .put(url + 'user/' + id, updateData, { headers: authHeader()})
          .then(() => {
            this.getEmail()
            Vue.toasted.show('Email changed &#9989;', {
              theme: "toasted-primary",
              position: "top-right",
              duration: 3000,
            });
         });
      },
    emailClear(id) {
        const update = { email: this.empty }
        axios
          .put(url + 'user/' + id, update, { headers: authHeader()})
          .then(() => {
            this.getEmail()
            Vue.toasted.show('Email clear &#10060;', {
              theme: "toasted-primary",
              position: "top-right",
              duration: 3000,
            });
          });
      },



    // date of birth
    getDateOfBirth() {
        axios
          .get(url + 'admin/' + this.$route.params.id, { headers: authHeader()})
          .then(response => (this.dateOfBirth = response.data.dateOfBirth));
    },

    setDateOfBirth(id) {
        const updateData = { dateOfBirth: this.dateOfBirth }
        axios
          .put(url + 'user/' + id, updateData, { headers: authHeader()})
          .then(() => {
            this.getDateOfBirth()
            Vue.toasted.show('Date of birth changed &#9989;', {
              theme: "toasted-primary",
              position: "top-right",
              duration: 3000,
            });
         });
      },
    dateOfBirthClear(id) {
        const update = { dateOfBirth: this.empty }
        axios
          .put(url + 'user/' + id, update, { headers: authHeader()})
          .then(() => {
            this.getDateOfBirth()
            Vue.toasted.show('Date of birth clear &#10060;', {
              theme: "toasted-primary",
              position: "top-right",
              duration: 3000,
            });
          });
      },


    // socialSecurityNumber
    getSocialSecurityNumber() {
        axios
          .get(url + 'admin/' + this.$route.params.id, { headers: authHeader()})
          .then(response => (this.socialSecurityNumber = response.data.socialSecurityNumber));
    },

    setSocialSecurityNumber(id) {
        const updateData = { socialSecurityNumber: this.socialSecurityNumber }
        axios
          .put(url + 'user/' + id, updateData, { headers: authHeader()})
          .then(() => {
            this.getSocialSecurityNumber()
            Vue.toasted.show('Social security number changed &#9989;', {
              theme: "toasted-primary",
              position: "top-right",
              duration: 3000,
            });
         });
      },
    socialSecurityNumberClear(id) {
        const update = { socialSecurityNumber: this.empty }
        axios
          .put(url + 'user/' + id, update, { headers: authHeader()})
          .then(() => {
            this.getSocialSecurityNumber()
            Vue.toasted.show('Social security number clear &#10060;', {
              theme: "toasted-primary",
              position: "top-right",
              duration: 3000,
            });
          });
      },


    // Driver License Number
    getDriverLicenseNumber() {
        axios
          .get(url + 'admin/' + this.$route.params.id, { headers: authHeader()})
          .then(response => (this.driverLicenseNumber = response.data.driverLicenseNumber));
    },

    setDriverLicenseNumber(id) {
        const updateData = { driverLicenseNumber: this.driverLicenseNumber }
        axios
          .put(url + 'user/' + id, updateData, { headers: authHeader()})
          .then(() => {
            this.getDriverLicenseNumber()
            Vue.toasted.show('Driver license number changed &#9989;', {
              theme: "toasted-primary",
              position: "top-right",
              duration: 3000,
            });
         });
      },
    driverLicenseNumberClear(id) {
        const update = { driverLicenseNumber: this.empty }
        axios
          .put(url + 'user/' + id, update, { headers: authHeader()})
          .then(() => {
            this.getDriverLicenseNumber()
            Vue.toasted.show('Driver license number clear &#10060;', {
              theme: "toasted-primary",
              position: "top-right",
              duration: 3000,
            });
          });
      },


    // driver License State
    getDriverLicenseState() {
        axios
          .get(url + 'admin/' + this.$route.params.id, { headers: authHeader()})
          .then(response => (this.driverLicenseState = response.data.driverLicenseState));
    },

    setDriverLicenseState(id) {
        const updateData = { driverLicenseState: this.driverLicenseState }
        axios
          .put(url + 'user/' + id, updateData, { headers: authHeader()})
          .then(() => {
            this.getDriverLicenseState()
            Vue.toasted.show('Driver license state changed &#9989;', {
              theme: "toasted-primary",
              position: "top-right",
              duration: 3000,
            });
         });
      },

    driverLicenseStateClear(id) {
        const update = { driverLicenseState: this.empty }
        axios
          .put(url + 'user/' + id, update, { headers: authHeader()})
          .then(() => {
            this.getDriverLicenseState()
            Vue.toasted.show('Driver license state clear &#10060;', {
              theme: "toasted-primary",
              position: "top-right",
              duration: 3000,
            });
          });
      },



    // driver License Issue Date
    getDriverLicenseIssueDate() {
        axios
          .get(url + 'admin/' + this.$route.params.id, { headers: authHeader()})
          .then(response => (this.driverLicenseIssueDate = response.data.driverLicenseIssueDate));
    },

    setDriverLicenseIssueDate(id) {
        const updateData = { driverLicenseIssueDate: this.driverLicenseIssueDate }
        axios
          .put(url + 'user/' + id, updateData, { headers: authHeader()})
          .then(() => {
            this.getDriverLicenseIssueDate()
            Vue.toasted.show('Driver license issue date changed &#9989;', {
              theme: "toasted-primary",
              position: "top-right",
              duration: 3000,
            });
         });
      },

    driverLicenseIssueDateClear(id) {
        const update = { driverLicenseIssueDate: this.empty }
        axios
          .put(url + 'user/' + id, update, { headers: authHeader()})
          .then(() => {
            this.getDriverLicenseIssueDate()
            Vue.toasted.show('Driver license issue date clear &#10060;', {
              theme: "toasted-primary",
              position: "top-right",
              duration: 3000,
            });
          });
      },



    // driver License Issue Date
    getHomeAdress() {
        axios
          .get(url + 'admin/' + this.$route.params.id, { headers: authHeader()})
          .then(response => (this.homeAdress = response.data.homeAdress));
    },

    setHomeAdress(id) {
        const updateData = { homeAdress: this.homeAdress }
        axios
          .put(url + 'user/' + id, updateData, { headers: authHeader()})
          .then(() => {
            this.getHomeAdress()
            Vue.toasted.show('Home adress changed &#9989;', {
              theme: "toasted-primary",
              position: "top-right",
              duration: 3000,
            });
         });
      },

    homeAdressClear(id) {
        const update = { homeAdress: this.empty }
        axios
          .put(url + 'user/' + id, update, { headers: authHeader()})
          .then(() => {
            this.getHomeAdress()
            Vue.toasted.show('Home adress clear &#10060;', {
              theme: "toasted-primary",
              position: "top-right",
              duration: 3000,
            });
          });
      },


    // phone Number
    getPhoneNumber() {
        axios
          .get(url + 'admin/' + this.$route.params.id, { headers: authHeader()})
          .then(response => (this.phoneNumber = response.data.phoneNumber));
    },

    setPhoneNumber(id) {
        const updateData = { phoneNumber: this.phoneNumber }
        axios
          .put(url + 'user/' + id, updateData, { headers: authHeader()})
          .then(() => {
            this.getPhoneNumber()
            Vue.toasted.show('Phone number changed &#9989;', {
              theme: "toasted-primary",
              position: "top-right",
              duration: 3000,
            });
         });
      },

    phoneNumberClear(id) {
        const update = { phoneNumber: this.empty }
        axios
          .put(url + 'user/' + id, update, { headers: authHeader()})
          .then(() => {
            this.getPhoneNumber()
            Vue.toasted.show('Phone number clear &#10060;', {
              theme: "toasted-primary",
              position: "top-right",
              duration: 3000,
            });
          });
      },


    // employing Company
    getEmployingCompany() {
        axios
          .get(url + 'admin/' + this.$route.params.id, { headers: authHeader()})
          .then(response => (this.employingCompany = response.data.employingCompany));
    },

    setEmployingCompany(id) {
        const updateData = { employingCompany: this.employingCompany }
        axios
          .put(url + 'user/' + id, updateData, { headers: authHeader()})
          .then(() => {
            this.getEmployingCompany()
            Vue.toasted.show('Employing company changed &#9989;', {
              theme: "toasted-primary",
              position: "top-right",
              duration: 3000,
            });
         });
      },

    employingCompanyClear(id) {
        const update = { employingCompany: this.empty }
        axios
          .put(url + 'user/' + id, update, { headers: authHeader()})
          .then(() => {
            this.getEmployingCompany()
            Vue.toasted.show('Employing company clear &#10060;', {
              theme: "toasted-primary",
              position: "top-right",
              duration: 3000,
            });
          });
      },


    // employing Company
    getDateOfEmplouyment() {
        axios
          .get(url + 'admin/' + this.$route.params.id, { headers: authHeader()})
          .then(response => (this.dateOfEmplouyment = response.data.dateOfEmplouyment));
    },

    setDateOfEmplouyment(id) {
        const updateData = { dateOfEmplouyment: this.dateOfEmplouyment }
        axios
          .put(url + 'user/' + id, updateData, { headers: authHeader()})
          .then(() => {
            this.getDateOfEmplouyment()
            Vue.toasted.show('Date of employment changed &#9989;', {
              theme: "toasted-primary",
              position: "top-right",
              duration: 3000,
            });
         });
      },

    dateOfEmplouymentClear(id) {
        const update = { dateOfEmplouyment: this.empty }
        axios
          .put(url + 'user/' + id, update, { headers: authHeader()})
          .then(() => {
            this.getDateOfEmplouyment()
            Vue.toasted.show('Date of employment clear &#10060;', {
              theme: "toasted-primary",
              position: "top-right",
              duration: 3000,
            });
          });
      },


    // date Of Dismissal
    getDateOfDismissal() {
        axios
          .get(url + 'admin/' + this.$route.params.id, { headers: authHeader()})
          .then(response => (this.dateOfDismissal = response.data.dateOfDismissal));
    },

    setDateOfDismissal(id) {
        const updateData = { dateOfDismissal: this.dateOfDismissal }
        axios
          .put(url + 'user/' + id, updateData, { headers: authHeader()})
          .then(() => {
            this.getDateOfDismissal()
            Vue.toasted.show('Date of dismissal changed &#9989;', {
              theme: "toasted-primary",
              position: "top-right",
              duration: 3000,
            });
         });
      },

    dateOfDismissalClear(id) {
        const update = { dateOfDismissal: this.empty }
        axios
          .put(url + 'user/' + id, update, { headers: authHeader()})
          .then(() => {
            this.getDateOfDismissal()
            Vue.toasted.show('Date of dismissal clear &#10060;', {
              theme: "toasted-primary",
              position: "top-right",
              duration: 3000,
            });
          });
      },


    // comment
    getComment() {
        axios
          .get(url + 'admin/' + this.$route.params.id, { headers: authHeader()})
          .then(response => (this.comment = response.data.comment));
    },

    setComment(id) {
        const updateData = { comment: this.comment }
        axios
          .put(url + 'user/' + id, updateData, { headers: authHeader()})
          .then(() => {
            this.getComment()
            Vue.toasted.show('Сomment added &#128173; &#9989;', {
              theme: "toasted-primary",
              position: "top-right",
              duration: 3000,
            });
         });
      },
    commentClear(id) {
        const update = { comment: this.empty }
        axios
          .put(url + 'user/' + id, update, { headers: authHeader()})
          .then(() => {
            this.getComment()
            Vue.toasted.show('Сomment deleted &#10060;', {
              theme: "toasted-primary",
              position: "top-right",
              duration: 3000,
            });
          });
      },


            
    // set status
    getStatus() {
        axios
          .get(url + 'admin/' + this.$route.params.id, { headers: authHeader()})
          .then(response => (this.status = response.data.status));
    },
    setStatus(id) {
        // this.dateClear(id)
        // this.dateClearMedical(id)
        const updateData = { status: this.status }
        axios
          .put(url + 'user/' + id, updateData, { headers: authHeader()})
          .then(() => {
            this.getendOfDateDriverLicense()
            this.getendOfDateMedicalCard()
            Vue.toasted.show("Status " + this.status + "&#9989;", {
              theme: "toasted-primary",
              position: "top-right",
              duration: 3000,
            });
         });
      },


      //avatar
      getAvatar() {
        axios
          .get(url + 'admin/' + this.$route.params.id, { headers: authHeader()})
          .then(response => (this.avatar = response.data.avatars));
        this.loading = false
      },
      onChangeAvatar (event) {
        this.avatarUpl = event.target.files[0]
      },
      onUploadAvatar() {
        this.loading = true
        const formData = new FormData()
        formData.append('avatar', this.avatarUpl)
        axios.post(url + 'user/avatar/' + this.$route.params.id + '/avatar', formData, { headers: authHeader()})
        .then(() => {
          this.clear()
          Vue.toasted.show("Avatar uploads &#128526;", {
            theme: "toasted-primary",
            position: "top-right",
            duration: 3000,
          });
          this.getAvatar()
        })
        .catch(err => {
          console.log(err)
        })
      },

      deleteAvatar(id) {
        this.loading = true
        axios
          .delete(url + 'user/avatar/' + id, { headers: authHeader()})
          .then(() => {
            this.getAvatar()
            Vue.toasted.show("Avatar deleted &#9989;", {
              theme: "toasted-primary",
              position: "top-right",
              duration: 3000,
            });
          });
      },

      // deleteAvatar() {
      //   axios
      //     .delete('http://localhost:3000/user/avatar', { headers: authHeader()})
      //     .then((response) => {
      //       console.log(response);
      //       this.getAvatar()
      //       Vue.toasted.show("Avatar deleted", {
      //         theme: "bubble",
      //         position: "top-right",
      //         duration: 3000,
      //       });
      //     });
      // },




      // driver license
      getImages() {
        axios
          .get(url + 'admin/' + this.$route.params.id, { headers: authHeader()})
          .then(response => (
            this.images = response.data.images));
          this.loading = false
      },
      getendOfDateDriverLicense() {
        axios
          .get(url + 'admin/' + this.$route.params.id, { headers: authHeader()})
          .then(response => (this.endOfDateDriverLicense = response.data.endOfDateDriverLicense));
      },
      onChange (event) {
        this.img = event.target.files[0]
      },
      onUpload() {
        if (this.img) {
          this.loading = true
          const formData = new FormData()
          formData.append('img', this.img)
          axios.post(url + 'user/img/' + this.$route.params.id + '/img', formData, { headers: authHeader()})
          .then(() => {
            this.clear()
            Vue.toasted.show("Driver licence uploads &#9989;", {
              theme: "toasted-primary",
              position: "top-right",
              duration: 3000,
            });          
            this.getImages()
          })
        } else {console.log("empty")}
      },
      deleteImg(id) {
        // this.dateClear(id2)
        this.loading = true
        axios
          .delete(url + 'user/img/' + id, { headers: authHeader()})
          .then(() => {
            Vue.toasted.show("Driver licence deleted &#10060;", {
              theme: "toasted-primary",
              position: "top-right",
              duration: 3000,
            });            
            this.getImages()
            this.getendOfDateDriverLicense()
          });
      },
      deleteImgAll(id) {
        this.loading = true
        this.dateClear(id)
        axios
          .delete(url + 'user/img/', { headers: authHeader()})
          .then(() => {
            Vue.toasted.show("All images deleted", {
              theme: "toasted-primary",
              position: "top-right",
              duration: 3000,
            });
            this.getImages()
            this.getendOfDateDriverLicense()
          });
      },
      setDate(id, date) {
        const update = { endOfDateDriverLicense: this.endOfDateDriverLicense }
        axios
          .put(url + 'user/' + id, update, { headers: authHeader()})
          .then(() => {
            Vue.toasted.show("Date driver licence date: " + moment(date).format('MM/DD/YYYY'), {
              theme: "toasted-primary",
              position: "top-right",
              duration: 3000,
            });
          });
      },
      dateClearLiecenseDoc(id) {
        const update = { endOfDateDriverLicense: this.dates }
        axios
          .put(url + 'user/' + id, update, { headers: authHeader()})
          .then(() => {
            this.getendOfDateDriverLicense()
            Vue.toasted.show("Date driver licence clear &#10060;", {
              theme: "toasted-primary",
              position: "top-right",
              duration: 3000,
            });
          });
      },
      dateClear(id) {
        const update = { endOfDateDriverLicense: this.dates }
        axios
          .put(url + 'user/' + id, update, { headers: authHeader()})
          .then(() => {
          });
      },


      // medical card
      getMedicals() {
        axios
          .get(url + 'admin/' + this.$route.params.id, { headers: authHeader()})
          .then(response => (this.medicals = response.data.medicals));
        this.loading = false
      },
      getendOfDateMedicalCard() {
        axios
          .get(url + 'admin/' + this.$route.params.id, { headers: authHeader()})
          .then(response => (this.endOfDateMedicalCard = response.data.endOfDateMedicalCard));
      },
      onChangeMedical (event) {
        this.medicalCard = event.target.files[0]
      },
      onUploadMedical() {
        if (this.medicalCard) {
          this.loading = true
          const formData = new FormData()
          formData.append('medicalCard', this.medicalCard)
          axios.post(url + 'user/medical/' + this.$route.params.id + '/medical', formData, { headers: authHeader()})
          .then(() => {
            this.clear()
            Vue.toasted.show("Medical card uploads &#9989;", {
              theme: "toasted-primary",
              position: "top-right",
              duration: 3000,
            });
            this.getMedicals()
          })
        } else {console.log("empty")}
      },
      deleteMedicalCard(id) {
        // this.dateClearMedical(id2)
        this.loading = true
        axios
          .delete(url + 'user/medical/' + id, { headers: authHeader()})
          .then(() => {
            Vue.toasted.show("Medical card deleted &#10060;", {
              theme: "toasted-primary",
              position: "top-right",
              duration: 3000,
            });            
            this.getMedicals()
            this.getendOfDateMedicalCard()
          });
      },
      deleteMedicalAll(id) {
        this.dateClearMedical(id)
        axios
          .delete(url + 'user/medical/', { headers: authHeader()})
          .then(() => {
            this.getMedicals()
            this.getendOfDateMedicalCard()
            Vue.toasted.show("All images deleted", {
              theme: "toasted-primary",
              position: "top-right",
              duration: 3000,
            });
          });
      },
      setDateMedical(id, date) {
        const update = { endOfDateMedicalCard: this.endOfDateMedicalCard }
        axios
          .put(url + 'user/' + id, update, { headers: authHeader()})
          .then(() => {
            Vue.toasted.show("Date medical card: " + moment(date).format('MM/DD/YYYY'), {
              theme: "toasted-primary",
              position: "top-right",
              duration: 3000,
            });
          });
      },
      dateClearMedicalCard(id) {
        const update = { endOfDateMedicalCard: this.dates }
        axios
          .put(url + 'user/' + id, update, { headers: authHeader()})
          .then(() => {
            Vue.toasted.show("Date medical card clear &#10060;", {
              theme: "toasted-primary",
              position: "top-right",
              duration: 3000,
            });
            this.getendOfDateMedicalCard()
          });
      },
      dateClearMedical(id) {
        const update = { endOfDateMedicalCard: this.dates }
        axios
          .put(url + 'user/' + id, update, { headers: authHeader()})
          .then(() => {
          });
      },



      // security card
      getSecurity() {
        axios
          .get(url + 'admin/' + this.$route.params.id, { headers: authHeader()})
          .then(response => (this.securitys = response.data.securitys));
        this.loading = false
      },
      onChangeSecurity (event) {
        this.security = event.target.files[0]
      },
      onUploadSecurity() {
        if (this.security) {
          this.loading = true
          const formData = new FormData()
          formData.append('security', this.security)
          axios.post(url + 'user/security/' + this.$route.params.id + '/security', formData, { headers: authHeader()})
          .then(() => {
            this.clear()
            Vue.toasted.show("Social security card uploads &#9989;", {
              theme: "toasted-primary",
              position: "top-right",
              duration: 3000,
            });
            this.getSecurity()
          })
        } else {console.log("empty")}
      },
      deleteSecurity(id) {
        this.loading = true
        axios
          .delete(url + 'user/security/' + id, { headers: authHeader()})
          .then(() => {
            Vue.toasted.show("Social security card delete &#10060;", {
              theme: "toasted-primary",
              position: "top-right",
              duration: 3000,
            });
            this.getSecurity()
          });
      },
      deleteSecurityAll() {
        axios
          .delete(url + 'user/security/', { headers: authHeader()})
          .then(() => {
            Vue.toasted.show("All Security deleted", {
              theme: "toasted-primary",
              position: "top-right",
              duration: 3000,
            });
            this.getSecurity()
          });
      },



      // employment card
      getEmployments() {
        axios
          .get(url + 'admin/' + this.$route.params.id, { headers: authHeader()})
          .then(response => (this.employments = response.data.employments));
        this.loading = false
      },
      onChangeEmployment (event) {
        this.employment = event.target.files[0]
      },
      onUploadEmployment() {
        if (this.employment) {
          this.loading = true
          const formData = new FormData()
          formData.append('employment', this.employment)
          axios.post(url + 'user/employment/' + this.$route.params.id + '/employment', formData, { headers: authHeader()})
          .then(() => {
            this.clear()
            Vue.toasted.show("Driver's Application for Employment uploads &#9989;", {
              theme: "toasted-primary",
              position: "top-right",
              duration: 3000,
            });
            this.getEmployments()
          })
        } else {console.log("empty")}  
      },
      deleteEmployment(id) {
        this.loading = true
        axios
          .delete(url + 'user/employment/' + id, { headers: authHeader()})
          .then(() => {
            Vue.toasted.show("Driver's Application for Employment deleted &#10060;", {
              theme: "toasted-primary",
              position: "top-right",
              duration: 3000,
            });
            this.getEmployments()
          });
      },
      deleteEmploymentAll() {
        axios
          .delete(url + 'user/employment/', { headers: authHeader()})
          .then(() => {
            this.getEmployments()
            Vue.toasted.show("All Employment deleted &#10060;", {
              theme: "toasted-primary",
              position: "top-right",
              duration: 3000,
            });
          });
      },





      // w4form
      getW4forms() {
        axios
          .get(url + 'admin/' + this.$route.params.id, { headers: authHeader()})
          .then(response => (this.w4forms = response.data.w4forms));
        this.loading = false
      },
      onChangeW4form (event) {
        this.w4form = event.target.files[0]
      },
      onUploadW4form() {
        if (this.w4form) {
          this.loading = true
          const formData = new FormData()
          formData.append('w4form', this.w4form)
          axios.post(url + 'user/w4form/' + this.$route.params.id + '/w4form', formData, { headers: authHeader()})
          .then(() => {
            this.clear()
            Vue.toasted.show("W4 form (Application page 21) uploads &#9989;", {
              theme: "toasted-primary",
              position: "top-right",
              duration: 3000,
            });
            this.getW4forms()
          })
        } else {console.log("empty")}
      },
      deleteW4form(id) {
        this.loading = true
        axios
          .delete(url + 'user/w4form/' + id, { headers: authHeader()})
          .then(() => {
            Vue.toasted.show("W4 form (Application page 21) deleted &#10060;", {
              theme: "toasted-primary",
              position: "top-right",
              duration: 3000,
            });
            this.getW4forms()
          });
      },
      deleteW4formAll() {
        axios
          .delete(url + 'user/w4form/', { headers: authHeader()})
          .then(() => {
            Vue.toasted.show("All w4form deleted &#10060;", {
              theme: "toasted-primary",
              position: "top-right",
              duration: 3000,
            });
            this.getW4forms()
          });
      },





      // Confidentials
      getConfidentials() {
        axios
          .get(url + 'admin/' + this.$route.params.id, { headers: authHeader()})
          .then(response => (this.confidentials = response.data.confidentials));
        this.loading = false
      },
      onChangeConfidential (event) {
        this.confidential = event.target.files[0]
      },
      onUploadConfidential() {
        if (this.confidential) {
          this.loading = true
          const formData = new FormData()
          formData.append('confidential', this.confidential)
          axios.post(url + 'user/confidential/' + this.$route.params.id + '/confidential', formData, { headers: authHeader()})
          .then(() => {
            this.clear()
            Vue.toasted.show("Confidential info and Company Property Policy uploads &#9989;", {
              theme: "toasted-primary",
              position: "top-right",
              duration: 3000,
            });
            this.getConfidentials()
          })
        } else {console.log("empty")}  
      },
      deleteConfidential(id) {
        this.loading = true
        axios
          .delete(url + 'user/confidential/' + id, { headers: authHeader()})
          .then(() => {
            Vue.toasted.show("Confidential info and Company Property Policy deleted &#10060;", {
              theme: "toasted-primary",
              position: "top-right",
              duration: 3000,
            });
            this.getConfidentials()
          });
      },
      deleteConfidentialAll() {
        axios
          .delete(url + 'user/confidential/', { headers: authHeader()})
          .then(() => {
            Vue.toasted.show("All confidential deleted", {
              theme: "toasted-primary",
              position: "top-right",
              duration: 3000,
            });
            this.getConfidentials()
          });
      },






      // Owned
      getOwneds() {
        axios
          .get(url + 'admin/' + this.$route.params.id, { headers: authHeader()})
          .then(response => (this.owneds = response.data.owneds));
        this.loading = false
      },
      onChangeOwned (event) {
        this.owned = event.target.files[0]
      },
      onUploadOwned() {
        if (this.owned) {
          this.loading = true
          const formData = new FormData()
          formData.append('owned', this.owned)
          axios.post(url + 'user/owned/' + this.$route.params.id + '/owned', formData, { headers: authHeader()})
          .then(() => {
            this.clear()
            Vue.toasted.show("TAKE-HOME " + "Company-owned Vehicle Policy uploads &#9989;", {
              theme: "toasted-primary",
              position: "top-right",
              duration: 3000,
            });
            this.getOwneds()
          })
        } else {console.log("empty")}
      },
      deleteOwned(id) {
        this.loading = true
        axios
          .delete(url + 'user/owned/' + id, { headers: authHeader()})
          .then(() => {
            Vue.toasted.show("TAKE-HOME " + "Company-owned Vehicle Policy deleted &#10060;", {
              theme: "toasted-primary",
              position: "top-right",
              duration: 3000,
            });
            this.getOwneds()
          });
      },
      deleteOwnedAll() {
        axios
          .delete(url + 'user/owned/', { headers: authHeader()})
          .then(() => {
            Vue.toasted.show("All owned deleted", {
              theme: "bubble",
              position: "top-right",
              duration: 3000,
            });
            this.getOwneds()
          });
      },




      // Expenses 
      getExpensess() {
        axios
          .get(url + 'admin/' + this.$route.params.id, { headers: authHeader()})
          .then(response => (this.expensess = response.data.expensess));
        this.loading = false
      },
      onChangeExpenses (event) {
        this.expenses = event.target.files[0]
      },
      onUploadExpenses() {
        if (this.expenses) {
          this.loading = true
          const formData = new FormData()
          formData.append('expenses', this.expenses)
          axios.post(url + 'user/expenses/' + this.$route.params.id + '/expenses', formData, { headers: authHeader()})
          .then(() => {
            this.clear()
            Vue.toasted.show("Hiring expenses agreement uploads &#9989;", {
              theme: "toasted-primary",
              position: "top-right",
              duration: 3000,
            });
            this.getExpensess()
          })
        } else {console.log("empty")}  
      },
      deleteExpenses(id) {
        this.loading = true
        axios
          .delete(url + 'user/expenses/' + id, { headers: authHeader()})
          .then(() => {
            Vue.toasted.show("Hiring expenses agreement deleted &#10060;", {
              theme: "toasted-primary",
              position: "top-right",
              duration: 3000,
            });
            this.getExpensess()
          });
      },
      deleteExpensesAll() {
        axios
          .delete(url + 'user/expenses/', { headers: authHeader()})
          .then(() => {
            Vue.toasted.show("All expenses deleted", {
              theme: "toasted-primary",
              position: "top-right",
              duration: 3000,
            });
            this.getExpensess()
          });
      },





      // Desposit
      getDesposits() {
        axios
          .get(url + 'admin/' + this.$route.params.id, { headers: authHeader()})
          .then(response => (this.desposits = response.data.desposits));
        this.loading = false
      },
      onChangeDesposit(event) {
        this.desposit = event.target.files[0]
      },
      onUploadDesposit() {
        if (this.desposit) {
          this.loading = true
          const formData = new FormData()
          formData.append('desposit', this.desposit)
          axios.post(url + 'user/desposit/' + this.$route.params.id + '/desposit', formData, { headers: authHeader()})
          .then(() => {
            this.clear()
            Vue.toasted.show("Direct desposit form uploads &#9989;", {
              theme: "toasted-primary",
              position: "top-right",
              duration: 3000,
            });
            this.getDesposits()
          })
        } else {console.log("empty")}
      },
      deleteDesposit(id) {
        this.loading = true
        axios
          .delete(url + 'user/desposit/' + id, { headers: authHeader()})
          .then(() => {
            Vue.toasted.show("Direct desposit form deleted &#10060;", {
              theme: "toasted-primary",
              position: "top-right",
              duration: 3000,
            });
            this.getDesposits()
          });
      },
      deleteDespositAll() {
        axios
          .delete(url + 'user/desposit/', { headers: authHeader()})
          .then(() => {
            Vue.toasted.show("All desposit deleted", {
              theme: "toasted-primary",
              position: "top-right",
              duration: 3000,
            });
            this.getDesposits()
          });
      },




      // credit
      getCredits() {
        axios
          .get(url + 'admin/' + this.$route.params.id, { headers: authHeader()})
          .then(response => (this.credits = response.data.credits));
        this.loading = false
      },
      onChangeCredit (event) {
        this.credit = event.target.files[0]
      },
      onUploadCredit() {
        if (this.credit) {
          this.loading = true
          const formData = new FormData()
          formData.append('credit', this.credit)
          axios.post(url + 'user/credit/' + this.$route.params.id + '/credit', formData, { headers: authHeader()})
          .then(() => {
            this.clear()
            Vue.toasted.show("Fair credit (Application page 16) uploads &#9989;", {
              theme: "toasted-primary",
              position: "top-right",
              duration: 3000,
            });
            this.getCredits()
          })
        } else {console.log("empty")}  
      },
      deleteCredit(id) {
        this.loading = true
        axios
          .delete(url + 'user/credit/' + id, { headers: authHeader()})
          .then(() => {
            Vue.toasted.show("Fair credit (Application page 16) deleted &#10060;", {
              theme: "toasted-primary",
              position: "top-right",
              duration: 3000,
            });
            this.getCredits()
          });
      },
      deleteCreditAll() {
        axios
          .delete(url + 'user/credit/', { headers: authHeader()})
          .then(() => {
            Vue.toasted.show("All credit deleted", {
              theme: "toasted-primary",
              position: "top-right",
              duration: 3000,
            });
            this.getCredits()
          });
      },




      // eligiibity Eligiibity
      getEligiibitys() {
        axios
          .get(url + 'admin/' + this.$route.params.id, { headers: authHeader()})
          .then(response => (this.eligiibitys = response.data.eligiibitys));
        this.loading = false
      },
      onChangeEligiibity (event) {
        this.eligiibity = event.target.files[0]
      },
      onUploadEligiibity() {
        if (this.eligiibity) {
          this.loading = true
          const formData = new FormData()
          formData.append('eligiibity', this.eligiibity)
          axios.post(url + 'user/eligiibity/' + this.$route.params.id + '/eligiibity', formData, { headers: authHeader()})
          .then(() => {
            this.clear()
            Vue.toasted.show("Employment eligiibity verification uploads &#9989;", {
              theme: "toasted-primary",
              position: "top-right",
              duration: 3000,
            });
            this.getEligiibitys()
          })
        } else {console.log("empty")}  
      },
      deleteEligiibity(id) {
        this.loading = true
        axios
          .delete(url + 'user/eligiibity/' + id, { headers: authHeader()})
          .then(() => {
            Vue.toasted.show("Employment eligiibity verification deleted &#10060;", {
              theme: "toasted-primary",
              position: "top-right",
              duration: 3000,
            });
            this.getEligiibitys()
          });
      },
      deleteEligiibityAll() {
        axios
          .delete(url + 'user/eligiibity/', { headers: authHeader()})
          .then(() => {
            Vue.toasted.show("All eligiibity deleted", {
              theme: "toasted-primary",
              position: "top-right",
              duration: 3000,
            });
            this.getEligiibitys()
          });
      },




      // drug Drug
      getDrugs() {
        axios
          .get(url + 'admin/' + this.$route.params.id, { headers: authHeader()})
          .then(response => (this.drugs = response.data.drugs));
        this.loading = false
      },
      onChangeDrug (event) {
        this.drug = event.target.files[0]
      },
      onUploadDrug() {
        if (this.drug) {
          this.loading = true
          const formData = new FormData()
          formData.append('drug', this.drug)
          axios.post(url + 'user/drug/' + this.$route.params.id + '/drug', formData, { headers: authHeader()})
          .then(() => {
            this.clear()
            Vue.toasted.show("Drug test uploads &#9989; &#128684;", {
              theme: "toasted-primary",
              position: "top-right",
              duration: 3000,
            });
            this.getDrugs()
          })
        } else {console.log("empty")}  
      },
      deleteDrug(id) {
        this.loading = true
        axios
          .delete(url + 'user/drug/' + id, { headers: authHeader()})
          .then(() => {
            Vue.toasted.show("Drug test deleted &#9989; &#10060;", {
              theme: "toasted-primary",
              position: "top-right",
              duration: 3000,
            });
            this.getDrugs()
          });
      },
      deleteDrugAll() {
        axios
          .delete(url + 'user/drug/', { headers: authHeader()})
          .then(() => {
            Vue.toasted.show("All drug deleted", {
              theme: "toasted-primary",
              position: "top-right",
              duration: 3000,
            });
            this.getDrugs()
          });
      },


      // mvr
      getMvrs() {
        axios
          .get(url + 'admin/' + this.$route.params.id, { headers: authHeader()})
          .then(response => (this.mvrs = response.data.mvrs));
        this.loading = false
      },
      onChangeMvr (event) {
        this.mvr = event.target.files[0]
      },
      onUploadMvr() {
        if (this.mvr) {
          this.loading = true
          const formData = new FormData()
          formData.append('mvr', this.mvr)
          axios.post(url + 'user/mvr/' + this.$route.params.id + '/mvr', formData, { headers: authHeader()})
          .then(() => {
            this.clear()
            Vue.toasted.show("MVR document uploads &#9989;", {
              theme: "toasted-primary",
              position: "top-right",
              duration: 3000,
            });
            this.getMvrs()
          })
        } else {console.log("empty")}  
      },
      deleteMvr(id) {
        this.loading = true
        axios
          .delete(url + 'user/mvr/' + id, { headers: authHeader()})
          .then(() => {
            Vue.toasted.show("MVR document deleted &#10060;", {
              theme: "toasted-primary",
              position: "top-right",
              duration: 3000,
            });
            this.getMvrs()
          });
      },
      deleteMvrAll() {
        axios
          .delete(url + 'user/mvr/', { headers: authHeader()})
          .then(() => {
            Vue.toasted.show("All MVR deleted", {
              theme: "toasted-primary",
              position: "top-right",
              duration: 3000,
            });
            this.getMvrs()
          });
      },




      // another Another
      getAnothers() {
        axios
          .get(url + 'admin/' + this.$route.params.id, { headers: authHeader()})
          .then(response => (this.anothers = response.data.anothers));
        this.loading = false
      },
      onChangeAnother (event) {
        this.another = event.target.files[0]
      },
      onUploadAnother() {
        if (this.another) {
          this.loading = true
          const formData = new FormData()
          formData.append('another', this.another)
          axios.post(url + 'user/another/' + this.$route.params.id + '/another', formData, { headers: authHeader()})
          .then(() => {
            this.clear()
            Vue.toasted.show("Another document uploads &#9989;", {
              theme: "toasted-primary",
              position: "top-right",
              duration: 3000,
            });
            this.getAnothers()
          })
        } else {console.log("empty")}
      },
      deleteAnother(id) {
        this.loading = true
        axios
          .delete(url + 'user/another/' + id, { headers: authHeader()})
          .then(() => {
            Vue.toasted.show("Another document deleted &#10060;", {
              theme: "toasted-primary",
              position: "top-right",
              duration: 3000,
            });
            this.getAnothers()
          });
      },
      deleteAnotherAll() {
        axios
          .delete(url + 'user/another/', { headers: authHeader()})
          .then(() => {
            Vue.toasted.show("All another deleted", {
              theme: "toasted-primary",
              position: "top-right",
              duration: 3000,
            });
            this.getAnothers()
          });
      },





  }
};
</script>

<style>
.user{
  padding-top: 5%;
  position: relative;
}
.overlays {
  padding-top: 20%;
  position: fixed;
  z-index: 9998;
  top: 0px;
  right: 0%;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
}
.loading {
  position: absolute;
  top: 50px;
  left: 500px;
  z-index: 999;  
  text-align: center;
  padding-top: 500px;
}
.loading > img {
  width: 80px;
  height: 80px;

}
.avatar > img {
  width: 100%;
}
.avatar {
  border-radius: 10px;
  min-width: 190px;
  min-height: 130px;
  max-width: 190px;
  max-height: 130px;
}
.avatarEmpty{
  border-radius: 10px;
  min-width: 190px;
  min-height: 130px;
  max-width: 190px;
  max-height: 130px;
}
.userNameInfo {
  padding-top: 30px;
  color: rgba(56, 60, 87, 0.7);
}
.userNameInfoText {
  padding: 0px 5px 5px 0px;
}
.status{
  padding-top: 30px;
}
.statusForm {

}
.statusText {
  font-size: 25px;
  color: rgba(176, 176, 176, 1);
}
.place {

}
.placeDocInfo {

}
.placeDocSetting {
  padding-top: 25px;
}
.placeMenu{

}
.btnShowHide {
  width: 60px;
  cursor: pointer;
}
.placeInfo{
  margin-bottom: 25px;
  margin-top: 25px;
}
.placeDoc{
  border-radius: 8px;
  border: 2px solid rgb(123 154 159 / 50%);
  padding-left: 10px;
  padding-top: 10px;
  margin-bottom: 10px;
}
.headerDoc{
  height: 70px;
  margin: 0px 0px 10px 0px;
}
.navDoc {
  margin-left: 3px;
  padding-bottom: 10px;
  margin-bottom: 10px;
}
.imagesContainer{
  width: 95%;
  padding-left: 25px;
  padding-bottom: 10px;
  margin-bottom: 10px;
}
.nameDocument {
  border-radius: 3px;
}
.imageDocument{
  min-width: 200px;
  min-height: 125px;
  max-width: 200px;
  max-height: 125px;
  border-radius: 5px;
}
.titleMenu {
  padding-left: 5%;
  color: rgba(176, 176, 176, 0.9);
}
.tabs {
  padding-left: 25px;
  padding-right: 25px;
}
.tab {
  padding-top: 10px;
  padding-bottopm: 10px;
}
.tab .tabBtn{
  cursor: pointer;
  transition: background-color 0.2s;
  background-color: rgba(226, 228, 228, 0.8);
  padding: 10px 10px 10px 10px;
  font-weight: 500;
  text-decoration: none;
  border-radius: 4px;
}
.iconBtn {
  width: 13%;
  color: rgba(56, 60, 87, 0.7);;
}
.tab .tabBtn:hover {
  background-color: #aaa;
  color: #fff;
}

.tab .tabBtn.active {
  background-color: #ED6868;
  color: #fff;
  cursor: default;
  margin-left: -8px;
  margin-right: -17px;
  box-shadow: 0px 0px 29px 0px rgb(123, 154, 159, 0.1);
}
.info {
  height: 130px;
}
.infoDoc {
  padding-left: 140px;
}
.infoDocWarning {
  color: #ED6868;
}
.infoDocOk {
  color: rgba(17, 105, 78, 1);
}
.expiredDoc {
  padding: 0px 0px 0px 3px;
}
.totalImages {  
  padding: 0px 6px 0px 3px;
  border-radius: 3px;
  background-color: #48BF91;
  color: #fff;
}
.infoTitle{
  margin-bottom: 15px;
}
.documentsTitle {
  padding-bottom: 25px;
}
.documentsSetting {

}
.infoComment {
  padding: 5px;
  height: 235px; 
  margin-top: 10px;
  background-color: rgb(226, 228, 228);
  border-radius: 10px;
  overflow: auto;
}
.infoBlockLeft {
  font-size: 17px;
  font-weight: 400;
}
.infoWarningIcon{
  color: #ED6868;
}
.infoBlockRight {
  font-size: 17px;
  font-weight: 400;
}
.infoItem {
  padding-bottom: 5px;
}
.infoItem > span {
  font-weight: 600;
}
.itemSetting {
  padding-bottom: 10px;
  border-bottom: 2px solid rgb(179 179 179 / 80%);
}
.settingTitle {
  font-size: 16px;
  font-weight: 500;
}
.settingComment {
  padding-bottom: 10px;

}
.btnSetDate, .btnClearDate, .btnSubmit, .btnClearSetiing, .btnСonfirmSetting, .btnСonfirmSettingDate, .btnAddAvatar {
  appearance: none;
  backface-visibility: hidden;
  background-color: #5D967F;
  border-radius: 3px;
  border-style: none;
  box-shadow: rgba(39, 174, 96, .15) 0 4px 9px;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-size: 15px;
  font-weight: 400;
  letter-spacing: normal;
  line-height: 1.5;
  outline: none;
  overflow: hidden;
  padding: 3px 10px;
  position: relative;
  text-align: center;
  text-decoration: none;
  transform: translate3d(0, 0, 0);
  transition: all .3s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: top;
  white-space: nowrap;
  margin-left: 5px;
}
.btnClearSetiing{
  margin-left: 9px;
  padding-left: 15px;
  padding-right: 15px;
}
.btnСonfirmSetting{
  margin-left: 5px;
  padding-left: 15px;
  padding-right: 15px;
}
.btnСonfirmSettingDate{
  margin-left: 125px;
  padding-left: 15px;
  padding-right: 15px;
}
.btnStatus {
  border: none;
  padding: 0px 0px 0px 0px;
}
.btnStatusText {  
  color: #fff; 
  padding: 0px 7px 0px 5px;
  border-radius: 3px;
}
.btnSetDate:hover, .btnSubmit:hover, .btnСonfirmSetting:hover, .btnСonfirmSettingDate:hover, .btnAddAvatar:hover {
  background-color: #1e8449;
  opacity: 1;
  transform: translateY(0);
  transition-duration: .35s;
}
.btnClearDate:hover, .btnClearSetiing:hover {
  background-color: orange;
  opacity: 1;
  transform: translateY(0);
  transition-duration: .35s;
}
.btnSetDate:active, .btnClearDate:active, .btnSubmit:active, .btnStatus:active, .btnClearSetiing:active, .btnСonfirmSetting:active, .btnСonfirmSettingDate:active, .btnAddAvatar:active {
  transform: translateY(2px);
  transition-duration: .35s;
}
.btnSetDate:hover, .btnClearDate:hover, .btnClearDate:hover, .btnStatus:hover,.btnClearSetiing:hover, .btnСonfirmSetting:hover, btnСonfirmSettingDate:hover, .btnAddAvatar:hover {
  box-shadow: rgba(39, 174, 96, .2) 0 6px 12px;
}

.btnDelete, .btnDellAvatar, .btnDeleteUser {
  appearance: none;
  backface-visibility: hidden;
  background-color: rgb(237, 104, 104);
  border-radius: 3px;
  border-style: none;
  box-shadow: rgba(39, 174, 96, .15) 0 4px 9px;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-size: 15px;
  font-weight: 400;
  letter-spacing: normal;
  line-height: 1.5;
  outline: none;
  overflow: hidden;
  padding: 3px 10px;
  position: relative;
  text-align: center;
  text-decoration: none;
  transform: translate3d(0, 0, 0);
  transition: all .3s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: top;
  white-space: nowrap;
  width: 100%;
}
.btnDelete {
  margin-top: 10px;
  margin-bottom: 15px;
}
.btnDeleteUser{
  width: 130px;
}

.btnDelete:hover, .btnDellAvatar:hover, .btnDeleteUser:hover {
  background-color: #B3000C;
  opacity: 1;
  transform: translateY(0);
  transition-duration: .35s;
}

.btnDelete:active, .btnDellAvatar:active {
  transform: translateY(2px);
  transition-duration: .35s;
}
.btnDelete:hover, .btnDellAvatar:hover {
  box-shadow: rgba(39, 174, 96, .2) 0 6px 12px;
}

.statusForm select {
  font-size: 18px;
  font-weight: 400;
  outline: 0;
  padding: 0 0em 0 0em;
  color: rgba(176, 176, 176, 1);
  cursor: pointer;
}
.btnStatusText {
  padding: 3px 8px 1px 5px;
}


input[type="date"]::-webkit-datetime-edit, input[type="date"]::-webkit-inner-spin-button, input[type="date"]::-webkit-clear-button {
  color: #fff;
  position: relative;
  margin-top: 6px;
  max-height: 25px;
  margin-bottom: -6px;
}

input[type="date"]::-webkit-datetime-edit-year-field{
  position: absolute !important;
  padding: 0px;
  color:#000;
  padding-right: 0px;
  left: 58px;
  transform: skewX(-15deg);
  margin-top: -6px;
}

input[type="date"]::-webkit-datetime-edit-month-field{
  position: absolute !important;
  padding-top: 0px;
  color:#000;
  left: 4px;
  border-right: 1px solid #000;
  border-width: 1px;
  transform: skewX(-15deg);
  padding-right: 5px;
  height: 80%;
  margin-top: -6px;
}


input[type="date"]::-webkit-datetime-edit-day-field{
  position: absolute !important;
  color:#000;
  height: 80%;
  padding: 0px;
  left: 33px;
  border-right: 1px solid #000;
  transform: skewX(-15deg);
  padding-right: 3px;
  margin-top: -6px;
}

textarea {
  width: 100%
}

.modalDeleteUser {
  position: absolute;
  border-radius: 10px;
  top: 50px;
  left: 35%;
  width: 35%;
  height: 20%;
  z-index: 9999;
  padding: 20px 30px;
  background-color: #fff;
  overflow: auto;
  overflow-x: hidden;
}

.modalWrapperDeleteUser .closeMadal {
  position: absolute;
  border: 3px solid #ED6868;
  border-radius: 5px;
  width: 65px;
  padding-left: 6px;
  padding-bottom: 3px;
  top: 65%;
  left: 40%;
  cursor: pointer;
}
.closeMadal:hover {
  background-color: #ED6868;
}
.modalWrapperDeleteUser .btnDeleteUserModal {
  position: absolute;
  border: 3px solid #ED6868;
  border-radius: 5px;
  width: 90px;
  padding-left: 6px;
  padding-bottom: 3px;
  top: 65%;
  left: 9%;
  cursor: pointer;
}
.btnDeleteUserModal:hover{
  background-color: #ED6868;
}



@media screen and (max-width: 1400px) {
  .avatar {
    min-width: 170px;
    min-height: 110px;
    max-width: 170px;
    max-height: 110px;
  }
  .avatarEmpty {
    min-width: 170px;
    min-height: 110px;
    max-width: 170px;
    max-height: 110px;
  }
  .userNameInfoText {
    padding: px 0px 0px 0px;
    font-size: 20px;
  }
  .statusText {
    font-size: 20px;
    padding-left: 0%;
  }
  .statusForm select {
    font-size: 15px;
  }
  .btnStatusText {
    padding: 0px 2px 0px 2px;
  }
  .infoDoc {
    padding-left: 0px;
  }
  .btnSetDate, .btnSubmit, .btnClearSetiing, .btnСonfirmSetting, .btnСonfirmSettingDate, .btnAddAvatar {
    margin-left: 0px;
    margin-right: 5px;
    margin-top: 5px;
  }
  .btnSetDate {
    margin-left: 0px;
    margin-right: 5px;
    margin-top: 5px;
  }
  .imageDocument {
    min-width: 100%;
    min-height: 110px;
    max-width: 100%;
    max-height: 110px;
    border-radius: 5px;
  }
  input[type="text"] {
    width: 100%;
  }
  input[type="date"] {
    width: 100%;
  }
  .modalDeleteUser {
    left: 30%;
    width: 45%;
  }
}
@media screen and (max-width: 991px) {
  .titleMenu {
    padding-left: 5%;
    padding-top: 5%;
    padding-bottom: 3%;
  }
  .placeMenu {
    height: 210px;
    margin-bottom: 20px;
  }
  .tab .tabBtn {
    padding: 8px 0px 8px 0px;
    font-weight: 700;
    font-size: 13px;
  }
  .btnStatus {
    margin-top: 5px;
  }
  .titleMenu {
    padding-left: 3%;
    padding-top: 0%;
    padding-bottom: 0%;
  }
  .placeInfo {
    height: 90px;
  }
  .avatar {
    min-width: 128px;
    min-height: 95px;
    max-width: 128px;
    max-height: 95px;
  }
  .avatarEmpty {
    min-width: 128px;
    min-height: 95px;
    max-width: 128px;
    max-height: 95px;
  }
  .userNameInfoText {
    padding: 0px 0px 0px 0px;
    font-size: 16px;
  }
  .statusText {
    padding-top: 10px;
    font-size: 16px;
  }
  .btnStatusText {
    padding: 0px 12px 0px 9px;
  }
  .imageDocument {
    min-height: 80px;
    max-height: 80px;
  }
  .nameDocument > h4  {
    font-size: 18px;
  }
  .infoBlockLeft {
    font-size: 16px;
  }
  .infoBlockRight {
    font-size: 16px;
  }
  .modalDeleteUser {
    border-radius: 10px;
    top: 50px;
    left: 23%;
    width: 60%;
    height: 20%;
  }
}
@media screen and (max-width: 767px) {
  input[type="date"] {
   margin-top: 10px;
  }
  .titleMenu {
    font-size: 20px;
    padding-bottom: 0%;
  }
  .tabs {
    padding-left: 10px;
    padding-right: 0px;
  }
  .placeMenu {
    height: 90px;
    margin-bottom: 20px;
  }
  .tab {
    padding-bottopm: 7px;
    width: 33%;
    padding-right: 20px;
  }
  .tab .tabBtn {
    padding: 10px 0px 10px 0px;
    font-weight: 700;
    font-size: 13px;
  }
  .btnClearDate {
    width: 150px;
    margin-left: 0px;
    margin-top: 10px;
  }
  .avatarBlock {
    display: none;
  }
  .placeInfo {
    height: 70px;
    margin-top: 5px;
  }
  .status {
    padding-top: 0px;
    padding-left: 30%;
    width: 60%;
  }
  .userNameInfo {
    padding-top: 25px;    
    width: 40%;
  }
  .userNameInfoText {
    font-size: 25px;
  }
  .place {
    border-radius: 1%;
    height: 94%;
    overflow: hidden;
    overflow-x: hidden;
  }
  .infoBlockLeft {
    border-right: 0px;
  }
  .nameDocument > h4  {
    font-size: 18px;
  }
  .btnSetDate {
    width: 150px;
  }
  .btnSubmit{
    width: 150px;
  }
}
@media screen and (max-width: 575px) {
  .placeMenu {
    height: 100px;
  }
  .iconText {
    font-size: 11px;
  }
  .tab {
    padding-bottopm: 7px;
    width: 33%;
    padding-right: 35px;
  }
  .tab .tabBtn {
    padding: 6px 0px 8px 0px;
    font-weight: 700;
    font-size: 13px;
  }
  .placeInfo {
    height: 80px;
    padding-left: 0px;
  }
  .status {
    padding-top: 0px;
    width: 40%;
  }
  .statusText {
    padding-top: 5px;
  }
  .btnStatus {
    margin-top: 5px;
  }
  .btnClearDate {
    margin-left: 0px;
    margin-top: 10px;
  }
  .place {
    border-radius: 1%;
    height: 94%;
    overflow: hidden;
    overflow-x: hidden;
  }
  .infoBlockLeft {
    border-right: 0px;
  }
  .headerDoc {
  }
  .nameDocument > h4  {
    font-size: 18px;
  }
  .infoDoc {
    padding-left: 15px;
  }
  .headerDoc {
    height: 120px;
  }
  .imageDocument {
    min-height: 220px;
    max-height: 220px;
  }
  .placeDoc {
    border: 2px solid rgb(80 134 149 / 50%);
    border-radius: 10px;
    margin-bottom: 10px;
  }
  .userNameInfo{
    width: 40%;
  }
  .avatarBlock {
    width: 20%;
  }
  .link {
    display: block;
    padding-bottom: 3px;
  }
  .navHeader {
    height: 90px;
  }
  .modalDeleteUser {
    border-radius: 10px;
    top: 50px;
    left: 2%;
    width: 96%;
    height: 15%;
  }
}
</style>