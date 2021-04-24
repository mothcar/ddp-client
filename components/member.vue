<template>
  <!-- <q-page class=""> -->

    <div class="" >

      <q-banner rounded class="bg-grey-3 shadow-2">
        가입을 원하시면 로그인해주세요
        <template v-slot:action>
          <q-btn flat color="grey-7" label="손님으로 계속 둘러보기" />
          <q-btn flat color="grey-7" label="Sign in" />
        </template>
      </q-banner>

      <q-list class="" v-for="(member, idx) in members" :key="member.id">
          <q-card class="my-card q-mb-md" :square="true">
              <q-card-section>
                <div class="text-subtitle2 flex justify-start">{{ member.rank }}</div>
              </q-card-section>

              <q-separator />

              <q-card-section class="row">
                <div class="col">
                    <q-avatar class=""  @click="goProfile(idx)" >
                      <!-- <img v-show="showPhoto===false" class="avatar mr-2" style="object-fit: cover; width:30px; height:30px;" @click="" :src="adminPhoto" /> -->
                      <img class="" style="object-fit: cover; width:60px; height:60px;" @click="" :src="member.photo" />
                    </q-avatar>
                </div>

                <div class="col-4 q-ml-md">
                  <div class="flex row text-subtitle2 text-weight-bolder">
                    <div class=""  @click="goProfile(idx)" >
                      {{member.name}}
                    </div>
                    <div class=""  @click="goPlace(idx)" >
                        {{member.placeName}}
                    </div>
                  </div>
                  <!-- <div class="flex text-caption">{{ member.createdAt | moment("from") }}</div> -->
                </div>
                <div class="col-2 q-ml-lg self-center">
                  {{ member.subject }}
                </div>
                <div class="col-3 flex justify-end" >
                    <q-icon class=" q-ml-lg" size="20px" @click="openOption"
                      name="img:statics/img/ellipsis.svg" />
                </div>
              </q-card-section>
            </q-card>



        <!-- <q-item  class="column q-pa-none">

        </q-item> -->

      </q-list>

      <!-- *************************************************************** -->
      <!-- Dialog ******************************************************** -->
      <!-- *************************************************************** -->
      <fullDailog v-if="showDialog"></fullDailog>
      <leftProfile v-if="showProfile" :myData="user"></leftProfile>

    </div>

  <!-- </q-page> -->
</template>

<script>
import fullDailog from './fullDialog'
import leftProfile from './profile'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'memberComponent',
  components: {fullDailog, leftProfile},

  data () {
    return {
      members: [],
      dense: false,
      comment: '',
      showDialog: false,
      showProfile: false,
      placeName: '',
      user: null,
    }
  },

  watch: {
    fullDialog(val) {
      this.showDialog = val
      // console.log('!!! showDialog : ' , val)
    },

    leftProfile(val) {
      this.showProfile = val
    },

    currentTab(val) {
      console.log('!!!! Watch currentTab : ', this.currentTab)
      this.getMember(val)

    },
  },

  methods: {
    ...mapActions('G_NAME', ['setDialog', 'setProfile', 'setMode', 'setPlace']),

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

    goProfile(idx) {
      // this.$router.push({path:'/profile'})
      this.setProfile(true)
      let user = this.members[idx]
      this.user = user
      // this.showProfile = true
      console.log('!!! Go profile idx : ', idx)
    },

    goPlace(idx) {
        this.setMode('place')
        let place = this.members[idx]
        this.setPlace(place)

        console.log('!!! Go Place')
    },

    // dong / gugun / city / country
    getMember(val) {
      let prePost = this.$p._data.users
      let dongPost = []

      switch(val) {
        case 'dong':
        // console.log('!!!! currentTab is Dong ')
        prePost.forEach(data=>{
            dongPost.push(data)
            this.placeName = data.placeName
            // console.log('!!!! Array data :', data)
        })
        break

        case 'gugun':
        // console.log('!!!! currentTab is gugun ')
        prePost.forEach(data=>{
          if(data.level=='dong') {

          } else {
                dongPost.push(data)
          }
        })
        break

        case 'city':
        // console.log('!!!! currentTab is city ')
        prePost.forEach(data=>{
            if(data.level=='dong'||data.level=='gugun') {

            } else {
                  dongPost.push(data)
            }
        })
        break

        case 'country':
        // console.log('!!!! currentTab is country ')
        prePost.forEach(data=>{
          if(data.level=='country'){
            dongPost.push(data)
          }
        })
        break
      }
      // console.log('Done')
      this.members = dongPost
    },

    openImage() {
      console.log('!!! Open Image ')
    },

    goCreate() {
      console.log('Be ready!!!!')

    },




  }, //methods

  computed: {
    ...mapState('G_NAME', ['fullDialog', 'leftProfile', 'currentTab'])
  },

  created() {

  }, // created()

  mounted() {
    let _this = this

    // console.log('!!! Mounted this.fullDialog : ', this.fullDialog)
    this.showDialog = this.fullDialog

    this.getMember(this.currentTab)


  } // mounted()
}
</script>

<style>

</style>
