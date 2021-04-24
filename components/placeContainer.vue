<template>
  <!-- <q-page class=""> -->

    <div class="" >
      <!-- *************************************************************** -->
      <!-- Place Info **************************************************** -->
      <!-- *************************************************************** -->
      <!-- <div class="flex q-pa-xs column q-pt-md q-pb-md bg-grey-5">
        <div class="text-weight-bolder self-start">
          장소정보
        </div>

        <q-btn class="self-center q-mt-sm" style="width:100px;">더보기...</q-btn>
      </div> -->

      <!-- icon="perm_identity" -->
      <q-expansion-item
        expand-separator
        label="장소정보"
        caption="펼치기"
      >
        <q-card>
          <q-card-section>
            <div class="row self-start full-width">
                <div class="col-4">
                    관리자
                </div>
                <div class="col-4">
                    황상익
                </div>
            </div>
            <div class="row self-start full-width">
                <div class="col-4">
                    ㎡기준 시세
                </div>
                <div class="col-4">
                    100,000,000
                </div>
            </div>
            <div class="row self-start full-width">
                <div class="col-4">
                    Address
                </div>
                <div class="col-6">
                    서울 동작구 신대방동 395-21
                </div>
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <!-- *************************************************************** -->
      <!-- TABS ********************************************************** -->
      <!-- *************************************************************** -->
      <div class="full-width q-mt-sm">
        <q-tabs
          v-model="tab"
          dense
          align="justify"
          active-color="red-5"
          @input="inputTab"
          >
          <q-tab class="" name="post" label="">
              <q-item-label>소식</q-item-label>
              <q-item-label caption class="q-mb-xs">장소소식</q-item-label>
          </q-tab>
          <q-tab class="" name="member" label="">
              <q-item-label>사람들</q-item-label>
              <q-item-label caption class="q-mb-xs">장소관련인물</q-item-label>
          </q-tab>
          <q-tab class="" name="room" label="">
              <q-item-label>시설</q-item-label>
              <q-item-label caption class="q-mb-xs">내부시설</q-item-label>
          </q-tab>
          <q-tab class="" name="homepage" label="">
              <q-item-label>소개</q-item-label>
              <q-item-label caption class="q-mb-xs">기능추가</q-item-label>
          </q-tab>
        </q-tabs>
        <q-separator class="bg-grey-5"/>
      </div>

      <!-- *************************************************************** -->
      <!-- Panels ******************************************************** -->
      <!-- *************************************************************** -->
      <q-tab-panels v-model="tab" animated swipeable @input="inputTab"
       class="full-width shadow-1 rounded-borders bg-grey-2">
        <q-tab-panel name="post" class="q-pa-none q-pt-xs" keep-alive>
          <div class="">
            <postsContainer></postsContainer>
          </div>
        </q-tab-panel>

        <q-tab-panel name="member" class="q-pa-none q-pt-xs" keep-alive>
          <div class="">
            <memberContainer></memberContainer>
          </div>
        </q-tab-panel>

        <q-tab-panel name="room" class="q-pa-none q-pt-xs" keep-alive>
          <div class="">
            <memberContainer></memberContainer>
          </div>
        </q-tab-panel>

        <q-tab-panel name="homepage" class="q-pa-none q-pt-xs" keep-alive>
          <div class="">
            <homepage></homepage>
          </div>
        </q-tab-panel>
      </q-tab-panels>


      <!-- *************************************************************** -->
      <!-- Dialog ******************************************************** -->
      <!-- *************************************************************** -->
      <fullDailog v-if="showDialog"></fullDailog>
      <!-- <leftProfile v-if="showProfile"></leftProfile> -->

    </div>

  <!-- </q-page> -->
</template>

<script>
import fullDailog from './fullDialog'
// import leftProfile from './profile'
import { mapActions, mapState } from 'vuex'
import postsContainer from './postsContainer'
import homepage from './homepage'
import memberContainer from './member'

export default {
  name: 'placeComponent',
  components: {fullDailog, postsContainer, homepage, memberContainer},

  data () {
    return {
      tab:'post',


      dense: false,
      comment: '',
      showDialog: false,
      showProfile: false,
    }
  },

  watch: {
    fullDialog(val) {
      this.showDialog = val
      // console.log('!!! showDialog : ' , val)
    },

    // leftProfile(val) {
    //   this.showProfile = val
    // },

    currentTab(val) {
      console.log('!!!! Watch currentTab : ', this.currentTab)
      this.getPost(val)

    },
  },

  methods: {
    ...mapActions('G_NAME', ['setDialog', 'setProfile']),

    inputTab(val) {
      console.log('!!! input Tab : ', val )
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
      this.setProfile(true)
      // this.showProfile = true
      console.log('!!! Go profile')
    },

    goPlace() {
        console.log('!!! Go Place')
    },

    openImage() {
      console.log('!!! Open Image ')
    },

    goCreate() {
      console.log('Be ready!!!!')

    },




  }, //methods

  computed: {
    ...mapState('G_NAME', ['fullDialog', 'currentTab', 'placeData'])
  },

  created() {

  }, // created()

  mounted() {
    window.scrollTo(0,0)
    let _this = this
    // this.post = this.myData
    // console.log('!!! Props : ', this.myData)
    // get Data

    // console.log('!!! Mounted this.fullDialog : ', this.fullDialog)
    this.showDialog = this.fullDialog



  } // mounted()
}
</script>

<style>

</style>
