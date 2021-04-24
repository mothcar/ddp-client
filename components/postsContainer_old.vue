<template>
  <!-- <q-page class=""> -->

    <div class="" >

      <q-banner rounded class="bg-grey-3 shadow-2">
        의견을 올리시려면 로그인해주세요
        <template v-slot:action>
          <q-btn flat color="grey-7" label="손님으로 계속 둘러보기" />
          <q-btn flat color="grey-7" label="Sign in" />
        </template>
      </q-banner>

      <q-list class="" v-for="(post, idx) in posts" :key="post.id">
        <q-item  class="column q-pa-none">
            <!-- v-ripple -->

          <q-card class="flex q-ma-sm full-width" :square="true" >
            <!-- *************************************************************** -->
            <!-- profile Div *************************************************** -->
            <!-- *************************************************************** -->
            <q-card-section class="q-mt-sm row full-width ">
                <div class="">
                    <q-avatar class=""  @click="goProfile(idx)" >
                      <!-- <img v-show="showPhoto===false" class="avatar mr-2" style="object-fit: cover; width:30px; height:30px;" @click="" :src="adminPhoto" /> -->
                      <img class="" style="object-fit: cover; width:40px; height:40px;" @click="" :src="post.photo" />
                    </q-avatar>
                </div>

              <div class="col-4 q-ml-md">
                <div class="flex row text-subtitle2 text-weight-bolder">
                  <div class=""  @click="goProfile(idx)" >
                    {{post.name}} <span style="font-size: 9px; color: #aaa;"><i class="fas fa-play q-mr-xs"></i></span>
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
                  <q-icon class=" q-ml-lg" size="25px" @click="openOption"
                    name="img:statics/img/ellipsis.svg" />
              </div>

            </q-card-section>
            <!-- *************************************************************** -->
            <!-- Post Div ****************************************************** -->
            <!-- *************************************************************** -->
            <q-card-section class="text-justify">
              <div class="text-subtitle2">
                  <!-- <q-item> -->
                  <q-item-label  :lines="3" :overline="false">
                      {{post.post}}
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
  name: 'SampleComponent',
  components: {fullDailog, leftProfile},

  data () {
    return {
      posts: [],
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
      this.getPost(val)

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
      let user = this.posts[idx]
      this.user = user
      // this.showProfile = true
      console.log('!!! Go profile idx : ', idx)
    },

    goPlace(idx) {
        this.setMode('place')
        let place = this.posts[idx]
        this.setPlace(place)

        console.log('!!! Go Place')
    },

    getPost(val) {
      let prePost = this.$p._data.posts
      let dongPost = []

      switch(val) {
        case 'dong':
        // console.log('!!!! currentTab is Dong ')
        prePost.forEach(data=>{
          if(data.level=='dong'){
            dongPost.push(data)
            this.placeName = data.placeName
            // console.log('!!!! Array data :', data)
          }
        })
        break

        case 'gugun':
        // console.log('!!!! currentTab is gugun ')
        prePost.forEach(data=>{
          if(data.level=='gugun'){
            dongPost.push(data)
          }
        })
        break

        case 'city':
        // console.log('!!!! currentTab is city ')
        prePost.forEach(data=>{
          if(data.level=='city'){
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
    // this.post = this.myData
    // console.log('!!! Props : ', this.myData)
    // get Data

    // console.log('!!! Mounted this.fullDialog : ', this.fullDialog)
    this.showDialog = this.fullDialog

    this.getPost(this.currentTab)



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
