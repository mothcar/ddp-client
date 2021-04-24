<template>
  <div class="" >
    <q-dialog
      v-model="dialog"
      animated
      persistent
      :maximized="maximizedToggle"
      transition-show="flip-down"
      transition-hide="flip-up"
      :duration="1000"
    >
    <!-- slide-left /right jump-up/down -->
      <q-card class="">
        <!-- *************************************************************** -->
        <!-- Bar Div ******************************************************* -->
        <!-- *************************************************************** -->
        <q-bar class="q-pa-lg">
          <div>{{ user.name }}</div>
          <q-space />
          <q-btn dense flat icon="close" style="z-index:90;" @click="setStoreState">
          </q-btn>
        </q-bar>
        <!-- *************************************************************** -->
        <!-- List Div ****************************************************** -->
        <!-- *************************************************************** -->
        <q-card-section class="q-mt-md q-pt-xl" style="bottom:50px;">
          <q-img class="back" style="max-width: 1000px; height: 200px;" :src="checkBgImage()" />

          <div >
            <q-item>
              <q-avatar class="front shadow-up-6" style="width:150px; height:150px;">
                <!-- <img src="https://cdn.quasar.dev/img/boy-avatar.png"> -->
                <img class="" style="object-fit: cover;" @click="" :src="user.photo" />
              </q-avatar>
              <!-- <q-item-section side top>
                <q-badge label="10k" />
              </q-item-section> -->
            </q-item>
          </div>

        </q-card-section>
        <q-card-section>
          <!-- *************************************************************** -->
          <!-- Name Div ****************************************************** -->
          <!-- *************************************************************** -->
          <!-- <q-item top>
            <q-item-section>
              <q-item-label class="subtitle2">{{ user.name }}</q-item-label>
              <q-item-label caption>{{ user.comment}}</q-item-label>
            </q-item-section>
          </q-item> -->

          <div class="text-center">
            <div class="text-h6 text-weight-bold ">
              {{ user.name }}
            </div>
          </div>

          <div class="q-mt-lg text-center">
            <div class="text-subtitle1 text-weight-bold ">
              직책
            </div>
            <div class="text-subtitle2 text-center">
              칸 사이버 국회의원
            </div>
          </div>

          <div class="q-mt-lg text-center">
            <div class="text-subtitle1 text-weight-bold ">
              선거구
            </div>
            <div class="text-subtitle2 text-center">
              서울 구로구
            </div>
          </div>

          <div class="q-mt-lg text-center">
            <div class="text-subtitle1 text-weight-bold ">
              이메일
            </div>
            <div class="text-subtitle2 text-center">
              {{ user.email}}
            </div>
          </div>

          <div class="q-mt-lg text-center" v-if="user.org!=null">
            <div class="text-subtitle1 text-weight-bold ">
              소속
            </div>
            <div class="text-subtitle2 text-center">
              {{ user.org}}
            </div>
          </div>

          <div class="q-mt-lg text-center" v-if="user.grade!=null">
            <div class="text-subtitle1 text-weight-bold ">
              소속 직위
            </div>
            <div class="text-subtitle2 text-center">
              {{ user.grade}}
            </div>
          </div>

          <div class="q-mt-lg text-center">
            <div class="text-subtitle1 text-weight-bold ">
              휴대전화
            </div>
            <div class="text-subtitle2 text-center">
              010-9876-1234
            </div>
          </div>

          <div class="q-mt-lg text-center q-mb-lg">
            <div class="text-subtitle1 text-weight-bold ">
              주요약력
            </div>
            <div class="text-subtitle2 text-center">
              (현)제3대 세종특별자치시의회 의원 <br />
              (전)제2대 세종특별자치시의회 교육위원회 위원장(후반기)  <br />
              (현)노무현재단(세종·대전·충남) 운영위원
            </div>
          </div>


          <div class="p-bottom q-pb-sm" style="width:90%">
            <!-- <q-separator class="q-mb-sm" />
            <q-input rounded outlined v-model="myComment" label="댓글" dense/> -->
          </div>
        </q-card-section>

        <q-card-section>
          <!-- *************************************************************** -->
          <!-- User Posts  *************************************************** -->
          <!-- *************************************************************** -->
          <q-list class="" v-for="(post, idx) in posts" :key="post.id">
               <q-item  class="column q-pa-none">
                   <!-- v-ripple -->

                 <q-card class="flex q-ma-sm full-width" :square="true" >
                   <!-- *************************************************************** -->
                   <!-- profile Div *************************************************** -->
                   <!-- *************************************************************** -->
                   <q-card-section class="q-mt-sm row full-width ">
                       <div class="">
                           <q-avatar class=""  @click="" >
                             <!-- <img v-show="showPhoto===false" class="avatar mr-2" style="object-fit: cover; width:30px; height:30px;" @click="" :src="adminPhoto" /> -->
                             <img class="" style="object-fit: cover; width:40px; height:40px;" @click="" :src="post.photo" />
                           </q-avatar>
                       </div>

                     <div class="col-4 q-ml-md">
                       <div class="flex row text-subtitle2 text-weight-bolder">
                         <div class=""  @click="" >
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
        </q-card-section>
      </q-card>




    </q-dialog>

  </div>

</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'ProfileComponent',
  props: ['myData'],
  // props: {
  //   myData: Object
  // },


  data () {
    return {
      dialog: true,
      maximizedToggle: true,
      // post: {},
      // backgroundImage: 'https://images.pexels.com/photos/255379/pexels-photo-255379.jpeg',
      backgroundImage: 'https://ak9.picdn.net/shutterstock/videos/27152179/thumb/1.jpg',
      posts: [],
      user: {name:''},
    }
  },

  watch: {
  },

  methods: {
    ...mapActions('G_NAME', ['setDialog', 'setProfile']),

    setStoreState() {
      let _this = this
      this.dialog = false
      setTimeout(function(){ _this.setProfile(false) }, 500)

    },

    checkBgImage() {
      if(this.user.backgroundImage == '') {
        return this.backgroundImage
      } else {
        return this.user.backgroundImage
      }
    },

    goPlace(idx) {
        this.setMode('place')
        let place = this.posts[idx]
        this.setPlace(place)

        console.log('!!! Go Place')
    },

    openOption() {
      this.$q.notify({
        message: '준비중입니다',
        color: 'red-5',
        icon: 'fas fa-check-circle',
        timeout: 800,
      })
    },

    openImage() {
      console.log('!!! Open Image ')
    },

    showDialogComp() {
        // console.log('!!! Data showDialog : ', this.showDialog)
        this.setDialog(true)
      },


  }, //methods

  computed: {
    // ...mapState('G_NAME', ['fullDialog'])
  },

  created() {

  }, // created()

  mounted() {
    console.log('!!! Props : ', this.myData)

    this.user = this.myData

    let prePost = this.$p._data.posts
    let userPosts = []

    prePost.forEach(data=>{

      if(data.name==this.myData.name) {
        // console.log('!!! data : ', data)
        userPosts.push(data)
      }
    })
    this.posts = userPosts
    // console.log('!!! posts : ', userPosts)

  } // mounted()
}
</script>

<style>

</style>
