<template>
    <div class="" >
          <q-card class="flex q-mt-sm full-width" :square="true" >
            <!-- *************************************************************** -->
            <!-- profile Div in List ******************************************* -->
            <!-- *************************************************************** -->
            <q-card-section class="q-mt-sm row full-width ">
                <div class="">
                    <q-avatar class=""  @click="goProfile" >
                      <!-- <img v-show="showPhoto===false" class="avatar mr-2" style="object-fit: cover; width:30px; height:30px;" @click="" :src="adminPhoto" /> -->
                      <img class="" style="object-fit: cover; width:40px; height:40px;" @click="" :src="infoCenter.user.photo" />
                    </q-avatar>
                </div>

              <div class="col-4 q-ml-md">
                <div class="flex row text-subtitle2 text-weight-bolder">
                  <div class=""  @click="goProfile" >
                    {{infoCenter.owner}} <span style="font-size: 9px; color: #aaa;"><i class="fas fa-play q-mr-xs"></i></span>
                  </div>
                  <div class=""  @click="goPlace" >
                      {{infoCenter.placeName}}
                  </div>
                </div>
                <!-- <div class="flex text-caption">{{ infoCenter.createdAt | moment("from") }}</div> -->
              </div>
              <div class="col-2 q-ml-lg self-center">
                {{ infoCenter.subject }}
              </div>
              <!-- <div class="col-4 text-right" style="font-size: 25px; color:grey;" @click="openOption">
                <i class="fas fa-ellipsis-h"></i>
              </div> -->
              <div class="col-3 flex justify-end" >
                  <q-icon class=" q-ml-lg" size="20px" @click="openOption"
                    name="img:statics/img/ellipsis.svg" />
              </div>

            </q-card-section>
            <!-- *************************************************************** -->
            <!-- infoCenter Div ****************************************************** -->
            <!-- *************************************************************** -->
            <q-card-section class="text-justify">
              <div class="text-subtitle2">
                  <!-- <q-item> -->
                  <q-item-label  :lines="3" :overline="false">
                      {{infoCenter.post}}
                  </q-item-label>

                  <!-- </q-item> -->
              </div>
            </q-card-section>
            <!-- *************************************************************** -->
            <!-- Image Div ***************************************************** -->
            <!-- *************************************************************** -->
            <q-card-section class="" v-if="infoCenter.image != ''" @click="openImage">
              <img :src="infoCenter.image" style="width:100%; max-height:300px;">
              <!-- <q-img :src="infoCenter.image" style="width:100%; max-height:300px;" :ratio="1"/> -->
            </q-card-section>

            <!-- *************************************************************** -->
            <!-- Post Div ****************************************************** -->
            <!-- *************************************************************** -->
            <q-card-section class="text-justify">
              <div class="text-subtitle2">
                  <!-- <q-item> -->
                  <q-item-label  :lines="3" :overline="false">
                      {{infoCenter.description}}
                  </q-item-label>

                  <!-- </q-item> -->
              </div>
            </q-card-section>
          </q-card>
    </div>

</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'InfocenterComponent',
  components: {},

  data () {
    return {
      infoCenter: { user: { photo:'statics/img/leejea.jpg'}},
      dense: false,
      comment: '',
      showDialog: false,
      placeName: '',
      user: null,
      addressLevel: {},
      mode: 'post',
    }
  },

  watch: {
    fullDialog(val) {
      this.showDialog = val
      // console.log('!!! showDialog : ' , val)
    },

    currentTab(val) {
      // console.log('!!!! Watch currentTab : ', this.currentTab)
      // console.log('!!!! Watch Val !!! : ', val)

      // VAL : dong / gugun / city / country
      this.getCenterData(val)
    },

    currentAddress(val) {
        let tab = this.currentTab
        // console.log('!!! Level val : ', this.currentAddress) // SKT address set
        switch(tab) {
            case 'dong':
                this.addressLevel = this.currentAddress.adminDong
            break
            case 'gugun':
                this.addressLevel = this.currentAddress.gu_gun
            break
            case 'city':
                this.addressLevel = this.currentAddress.city_do
            break
            case 'country':
                this.addressLevel = '대한민국'
            break
        }
    },

  },

  methods: {
    ...mapActions('G_NAME', ['setDialog', 'setProfile','setProfileData', 'setMode', 'setPlace']),

    showDialogComp() {
      // console.log('!!! Data showDialog : ', this.showDialog)
      this.setDialog(true)
    },

    openOption() {
      this.$q.notify({
        message: '준비중입니다',
        color: 'red-5',
        icon: 'fas fa-check-circle',
        timeout: 800,
      })
    },

    goProfile() {
      // this.$router.push({path:'/profile'})
      // this.setProfile(true)
      // let user = this.infoCenter
      // this.user = user
      let _this = this
      // let preData = this.$p._data.posts
      let users = this.$p._data.users
      users.filter(userArr=>{
        // console.log('!!! this.userArr : ', userArr)
        if(userArr.name==this.infoCenter.owner) {

          this.user = userArr
          this.setProfileData(userArr)
          this.setProfile(true)
          this.showProfile = true
        }
      })

      // users.filter(userData=>{
      //  if(this.posts[idx].userName == userData.name) {
      //      console.log('!!! if user name : ', userData)
      //
      //  }
      // })
    },

    goPlace() {
        this.setMode('place')
        let place = this.infoCenter
        this.setPlace(place)

        // console.log('!!! Go Place')
    },

    getCenterData(val) {
      let prePlace = this.$p._data.places
      let users = this.$p._data.users
      // let currentLevel = this.currentTab
      let resultData = {}
      prePlace.forEach((data, idx) =>{
        if(val==data.level&& data.type=='infocenter') {
          users.filter(user=>{
              // console.log('!!! user : ', user)
              // console.log('!!! data.userName : ', data.userName)
              if(user.name == data.owner) {
                data.user = user
                resultData = data
              }
          })
        }
      })
      this.addressLevel = this.currentAddress.adminDong
      // console.log('!!! resultData: ', resultData)
      this.infoCenter = resultData
      // this.setPlace(resultData)
    },

    openImage() {
      console.log('!!! Open Image ')
    },

    goCreate() {
      console.log('Be ready!!!!')

    },




  }, //methods

  computed: {
    ...mapState('G_NAME', ['fullDialog','currentTab', 'modeState','currentAddress'])
  },

  created() {

  }, // created()

  mounted() {
    let _this = this
    // this.post = this.myData
    // console.log('!!! Props : ', this.myData)
    // get Data

    // console.log('!!! Mounted this.fullDialog : ', this.fullDialog)
    this.showDialog = this.fullDialog

    // console.log('!!!@ mode : ', this.modeState)
    if(this.modeState=='post') this.mode = 'post'
    else this.mode = 'place'


    this.getCenterData(this.currentTab)

  } // mounted()
}
</script>

<style>

</style>
