<template>
  <q-page class="">
    <!-- *************************************************************** -->
    <!-- Carousel ****************************************************** -->
    <!-- *************************************************************** -->
    <div class="flex flex-center q-pa-md text-subtitle2 text-weight-bolder">
      Profile Page
    </div>

    <div class="flex flex-center column q-mb-lg">
      <q-btn class="flex flex-center">
        <div class="flex flex-center q-pa-md" >
            <q-item-label>Some Function</q-item-label>
        </div>
      </q-btn>
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
  name: 'EditProfilePage',

  data() {
    return {
    }
  },

  methods: {
    openURL,
    ...mapActions('G_NAME', ['setBack']),


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
