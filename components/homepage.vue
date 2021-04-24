<template>
  <!-- <q-page class=""> -->

    <div class="" >
      <div class="" v-html="content">

      </div>


    </div>

  <!-- </q-page> -->
</template>

<script>
import {mapState} from 'vuex'


export default {
  name: 'homepageComponent',

  props: ['myData'],

  data () {
    return {
      posts: [],
      searchKeyword: '',
      dense: false,
      content: '<h6>아직 소개글이 없습니다.</h6>',
    }
  },

  watch: {
    searchKeyword(val) {
      console.log('!!! searchKeyword : ' , val)
    },
  },

  methods: {
    goBack() {
      this.$router.go(-1)
    },

    gopost() {
      let postId = ''
      this.$router.push({name:'post', params:{id:postId}})
      console.log('bad guy postId : ' , postId)
    },

    goCreate() {
      console.log('Be ready!!!!')
      this.$q.notify({
        message: '준비중입니다',
        color: 'red-5',
        icon: 'fas fa-check-circle',
        timeout: 800,
      })
    },

    goFind() {
      console.log('!!! Search Keyword : ', this.searchKeyword)
      this.searchKeyword = ''

    }

  }, //methods

  computed: {
    ...mapState('G_NAME', ['placeData'])
  },

  created() {

  }, // created()

  mounted() {
    // this.post = this.myData
    // console.log('!!! Props : ', this.myData)
    // get Data
    this.posts = this.$p._data.posts
    console.log('@@@ Damun : ', this.placeData )
    if(this.placeData.homeContent!= undefined) this.content = this.placeData.homeContent


  } // mounted()
}
</script>

<style>

</style>
