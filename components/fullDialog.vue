<template>
  <div class="" >
    <q-dialog
      v-model="dialog"
      animated
      persistent
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"

    >
      <q-card class="">
        <!-- *************************************************************** -->
        <!-- Bar Div ******************************************************* -->
        <!-- *************************************************************** -->
        <q-bar class="q-pa-lg">
          <q-space />
          <q-btn dense flat icon="close" style="z-index:90;" @click="setStoreState">
          </q-btn>
        </q-bar>
        <!-- *************************************************************** -->
        <!-- List Div ****************************************************** -->
        <!-- *************************************************************** -->
        <q-card-section class="q-mt-lg q-pt-xl" style="bottom:50px;">
          <div class="text-h6" v-for="(comment, idx) in comments" :key="idx">
            <q-item>
              <q-item-section top avatar>
                <q-avatar>
                  <!-- <img src="https://cdn.quasar.dev/img/boy-avatar.png"> -->
                  <img class="avatar mr-2" style="object-fit: cover; width:40px; height:40px;" @click="" :src="comment.photo" />
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label class="subtitle2">{{ comment.name }}</q-item-label>
                <q-item-label caption>{{ comment.comment}}</q-item-label>
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
            <q-separator class="q-mb-sm" />
            <q-input rounded outlined v-model="myComment" label="댓글" dense/>
          </div>
        </q-card-section>
      </q-card>


    </q-dialog>

  </div>

</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'DialogComponent',


  data () {
    return {
      dialog: true,
      maximizedToggle: true,
      comments: [],
      myComment: '',
    }
  },

  watch: {
  },

  methods: {
    ...mapActions('G_NAME', ['setDialog']),

    setStoreState() {
      let _this = this
      this.dialog = false
      setTimeout(function(){ _this.setDialog(false) }, 500)

    },




  }, //methods

  computed: {
    // ...mapState('G_NAME', ['fullDialog'])
  },

  created() {

  }, // created()

  mounted() {
    this.comments = this.$p._data.comments

  } // mounted()
}
</script>

<style>

</style>
