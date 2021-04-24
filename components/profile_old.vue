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
          <div>Profile</div>
          <q-space />
          <q-btn dense flat icon="close" style="z-index:90;" @click="setStoreState">
          </q-btn>
        </q-bar>
        <!-- *************************************************************** -->
        <!-- List Div ****************************************************** -->
        <!-- *************************************************************** -->
        <q-card-section class="q-mt-lg q-pt-xl" style="bottom:50px;">
          <div >
            <q-item>
              <q-item-section top avatar>
                <q-avatar>
                  <!-- <img src="https://cdn.quasar.dev/img/boy-avatar.png"> -->
                  <img class="avatar mr-2" style="object-fit: cover; width:40px; height:40px;" @click="" :src="post.photo" />
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label class="subtitle2">{{ post.name }}</q-item-label>
                <q-item-label caption>{{ post.comment}}</q-item-label>
              </q-item-section>

              <q-item-section side top>
                <q-badge label="10k" />
              </q-item-section>
            </q-item>
          </div>
        </q-card-section>
        <q-card-section>
          <!-- *************************************************************** -->
          <!-- Comment Div *************************************************** -->
          <!-- *************************************************************** -->
          <div class="p-bottom q-pb-sm" style="width:90%">
            <!-- <q-separator class="q-mb-sm" />
            <q-input rounded outlined v-model="myComment" label="댓글" dense/> -->
          </div>
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


  data () {
    return {
      dialog: true,
      maximizedToggle: true,
      post: {},
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




  }, //methods

  computed: {
    // ...mapState('G_NAME', ['fullDialog'])
  },

  created() {

  }, // created()

  mounted() {
    console.log('!!! Props : ', this.myData)

    this.post = this.myData

  } // mounted()
}
</script>

<style>

</style>
