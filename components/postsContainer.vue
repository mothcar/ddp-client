<template>
  <!-- <q-page class=""> -->

    <div class="" >

      <q-banner  class="bg-grey-3 shadow-1">
        의견을 올리시려면 로그인해주세요
        <template v-slot:action>
          <q-btn flat color="grey-7" label="손님으로 계속 둘러보기" />
          <q-btn flat color="grey-7" label="Sign in" />
        </template>
      </q-banner>

      <!-- *************************************************************** -->
      <!-- Info Center *************************************************** -->
      <!-- *************************************************************** -->
      <!-- <q-banner v-if="mode=='post'" class="bg-grey-3 shadow-1 q-mt-sm">
          <q-btn flat  label="" class="flex-center full-width">
              {{ addressLevel }}  정보센터 <span class="text-grey-7" > &nbsp 둘러보기</span>
          </q-btn>
      </q-banner> -->
      <iCenterCard v-if="mode=='post'"></iCenterCard>

      <q-list class="" v-for="(post, idx) in posts" :key="post.id">
        <q-item  class="column q-pa-none">
            <!-- v-ripple -->

          <q-card class="flex q-ma-xs full-width" :square="true" >
            <!-- *************************************************************** -->
            <!-- profile Div in List ******************************************* -->
            <!-- *************************************************************** -->
            <q-card-section class="q-mt-sm row full-width ">
                <div class="">
                    <q-avatar class=""  @click="goProfile(idx)" >
                      <!-- <img v-show="showPhoto===false" class="avatar mr-2" style="object-fit: cover; width:30px; height:30px;" @click="" :src="adminPhoto" /> -->
                      <img class="" style="object-fit: cover; width:40px; height:40px;" @click="" :src="post.user.photo" />
                    </q-avatar>
                </div>

              <div class="col-4 q-ml-md">
                <div class="flex row text-subtitle2 text-weight-bolder">
                  <div class=""  @click="goProfile(idx)" >
                    {{post.user.name}} <span style="font-size: 9px; color: #aaa;"><i class="fas fa-play q-mr-xs"></i></span>
                  </div>
                  <div class=""  @click="goPlace(idx)" >
                      {{post.placeName}}
                  </div>
                </div>
                <div class="flex text-caption">{{ post.createdAt | moment("from") }}</div>
              </div>
              <div class="col-2 q-ml-lg self-center">
                {{ post.subject }}
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
            <!-- Post Div ****************************************************** -->
            <!-- *************************************************************** -->
            <q-card-section class="text-justify">
              <div class="text-subtitle2">
                  <!-- <q-item> -->
                  <q-item-label v-html="post.post" :lines="3" :overline="false">
                      <pre>
                          {{ post.post }}
                      </pre>
                  </q-item-label>

                  <!-- </q-item> -->
              </div>
            </q-card-section>
            <!-- *************************************************************** -->
            <!-- Image Div ***************************************************** -->
            <!-- *************************************************************** -->
            <q-card-section class="" v-if="post.image != ''" @click="openImage">
              <img :src="post.image" style="width:100%; max-height:300px;">
              <!-- <q-img :src="post.image" style="width:100%; max-height:300px;" :ratio="1"/> -->
            </q-card-section>
            <!-- *************************************************************** -->
            <!-- Reply Div ***************************************************** -->
            <!-- *************************************************************** -->
            <q-card-section class="full-width flex justify-end" v-if="post.comments > 0"
              @click="showDialogComp">
              <div class="flex justify-end text-caption">
                {{ post.comments }} 댓글
              </div>
            </q-card-section>
            <!-- *************************************************************** -->
            <!-- Comment Div *************************************************** -->
            <!-- *************************************************************** -->

            <q-card-section clickable class="full-width ">
              <q-separator class="q-mb-sm" />
              <!-- <q-input rounded outlined v-model="comment" label="댓글" dense/> -->
              <!-- <q-avatar class="" rounded size="30px" font-size="20px" color="">
                <i class="fas fa-comment-alt" ></i>
              </q-avatar> -->
              <!-- <q-icon size="120px" name="img:http://yun0304.cdn3.cafe24.com/img/comment.svg" /> -->
              <div class="flex row items-center" @click="showDialogComp">
                  <div class="">
                      <q-icon class="flex justify-start q-ml-lg" size="30px"
                        name="img:statics/img/comments.svg" />
                  </div>

                  <div class="q-ml-sm"> 댓글 </div>
              </div>

            </q-card-section>


          </q-card>
        </q-item>

      </q-list>
      <!-- *************************************************************** -->
     <!-- Dialog ******************************************************** -->
     <!-- *************************************************************** -->


    </div>

  <!-- </q-page> -->
</template>

<script>

import iCenterCard from './iCenterCard'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'SampleComponent',
  components: {iCenterCard},

  data () {
    return {
      posts: [],
      dense: false,
      comment: '',

      placeName: '',
      user: null,
      addressLevel: {},
      mode: 'post',
    }
  },

  watch: {
    currentTab(val) {
      // console.log('!!!! Watch currentTab : ', this.currentTab)
      // console.log('!!!! Watch Val !!! : ', val) // dong / gugun / city / country
      if(this.mode=='post') {
          this.getPost(val)
      } else {
          this.getPlacePost(val)
      }

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

    goProfile(idx) {
      // this.$router.push({path:'/profile'})
      let _this = this
      let preData = this.$p._data.posts
      let users = this.$p._data.users
      users.filter(userData=>{
          if(this.posts[idx].userName == userData.name) {
              // console.log('!!! if user name : ', userData)
              this.user = userData
              this.setProfileData(userData)
              this.setProfile(true)
              this.showProfile = true
          }
      })
      // let user = this.posts[idx]



    },

    goPlace(idx) {
        this.setMode('place')
        let post = this.posts[idx]
        let places = this.$p._data.places
        let result = {}
        // console.log('!!!! Post Object : ', post)
        places.forEach(place=>{
            if(post.placeId==place.id) {
                // console.log('!!! place Object : ', place)
                result = place
                // console.log('!!!!! set coordinates : ', place.location.coordinates)
                this.setPlace(place)
            }
        })
        // this.setPlace(result)

        // console.log('!!! Go Place')
    },

    getPost(val) {
      let prePost = this.$p._data.posts
      let users = this.$p._data.users
      prePost.forEach((data, idx) =>{
          users.filter(user=>{
              // console.log('!!! user : ', user)
              // console.log('!!! data.userName : ', data.userName)
              if(user.name == data.userName) prePost[idx].user = user
          })
      })
      let dongPost = []
      this.addressLevel = this.currentAddress.adminDong

      switch(val) {
        case 'dong':
        // console.log('!!!! currentTab is Dong ')
        prePost.forEach(data=>{
            dongPost.push(data)
            this.placeName = data.name
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
      this.posts = dongPost
    },

    getPlacePost(val) {
        console.log('!!! current Tab : ', val)
        let placePosts = []
        let prePost = this.$p._data.posts
        let currentPlace = this.placeData
        prePost.forEach(data=>{
            if(data.placeId==currentPlace.id) {
                placePosts.push(data)
            }
        })

        this.posts = placePosts
    },

    openImage() {
      console.log('!!! Open Image ')
    },

    goCreate() {
      console.log('Be ready!!!!')

    },




  }, //methods

  computed: {
    ...mapState('G_NAME', ['currentTab', 'modeState','currentAddress', 'placeData'])
  },

  created() {

  }, // created()

  mounted() {
    let _this = this
    // this.post = this.myData
    // console.log('!!! Props : ', this.myData)
    // get Data

    // console.log('!!!@ mode : ', this.modeState)
    if(this.modeState=='post') {
        this.mode = 'post'
        this.getPost(this.currentTab)
    } else {
        this.mode = 'place'
        this.getPlacePost(this.currentTab)
    }






    // if(window.history && history.pushState){ // check for history api support
    // 	window.addEventListener('load', function(){
    // 		// create history states
    // 		history.pushState(-1, null); // back state
    // 		history.pushState(0, null); // main state
    // 		history.pushState(1, null); // forward state
    // 		history.go(-1); // start in main state
    //
    // 		this.addEventListener('popstate', function(event, state){
    // 			// check history state and fire custom events
    //       // console.log('!!! Back button pressed')
    //       _this.setDialog(false)
    // 			// if(state = event.state){
    //       //
    // 			// 	event = document.createEvent('Event');
    // 			// 	event.initEvent(state > 0 ? 'next' : 'previous', true, true);
    // 			// 	this.dispatchEvent(event);
    //       //
    // 			// 	// reset state
    // 			// 	history.go(-state);
    // 			// }
    // 		}, false);
    // 	}, false);
    // } // history back

  } // mounted()
}
</script>

<style>

</style>
