<template>
  <q-page class="">
    <!-- *************************************************************** -->
    <!-- Carousel ****************************************************** -->
    <!-- *************************************************************** -->
    <div class="flex flex-center q-pa-md text-subtitle2 text-weight-bolder">
      Dictionary Page
    </div>




    <div class="q-pa-md" style="max-width: 400px">
      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md"
      >
        <q-input
          filled
          v-model="name"
          label="Input Keyword *"
          hint="Any word you want."
          lazy-rules

        />
        <!--
        :rules="[ val => val && val.length > 0 || 'Please type something']"
       -->

        <div>
          <q-btn label="Submit" type="submit" color="primary"/>
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
      </q-form>

      <div class="q-gutter-md" style="max-width: 300px">
        <q-input v-model="returnText" label="Standard" />
      </div>

    </div>












    <div class="q-pa-md q-gutter-md flex flex-center column">

    </div>

    <div class="q-pa-md q-gutter-md flex flex-center">

    </div>

  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { openURL } from 'quasar'

export default {
  name: 'DictionaryPage',

  data() {
    return {
      name: null,
      returnText: null,

    }
  },

  methods: {
    openURL,
    ...mapActions('G_NAME', ['setBack']),

    async onSubmit () {
      let word = this.name
      let skt = await this.$axios.get(process.env.API+'/test/dic',{
            params: {word: word}
      })
      let result = skt
      console.log('@@@ : ', skt.data.data.item)
      this.returnText = skt.data.data.item

    },

    onReset () {
      this.name = null
    },


  }, // methods

  mounted() {
    console.log('### Mounted ..... ')

  }, //mounted

  computed: {
    ...mapState('G_NAME',[
      'backbtnParmas'
    ]),
  }



}
</script>

<style>
</style>
