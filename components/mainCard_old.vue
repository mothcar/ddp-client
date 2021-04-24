<template>
  <!-- <q-page class=""> -->

    <div class="flex flex-center " >

      <q-card @click="gopost"
        class="flex flex-center q-ma-sm full-width" :square="true" >
        <q-card-section class="q-mt-sm">
          <q-img :src="post.photo" style="width:200px" :ratio="16/9"/>
        </q-card-section>

        <q-card-section class="text-center">
          <div class="text-h6">{{post.name}}</div>
          <div class="text-subtitle2">some data </div>
        </q-card-section>

        <q-card-section class="text-center">
          <div class="text-subtitle2">{{post.post}}</div>
        </q-card-section>

        <q-card-section>
          <q-chip v-if="post.like"
            dense color="red-5" text-color="white" icon="star">
            좋아요
          </q-chip>
        </q-card-section>
      </q-card>
    </div>

  <!-- </q-page> -->
</template>

<script>
export default {
  name: 'SampleComponent',

  props: ['myData'],

  data () {
    return {
      title_name:'Test',
      lorem:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
      post: {},
      searchKeyword: '',
      dense: false,
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
  },

  created() {

  }, // created()

  mounted() {
    this.post = this.myData
    console.log('!!! Props : ', this.myData)

  } // mounted()
}
</script>

<style>

</style>
