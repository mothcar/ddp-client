<template>
  <div class="flex column" >
    <!-- *************************************************************** -->
    <!-- Content List ************************************************** -->
    <!-- *************************************************************** -->
    <div class="q-ma-sm">
      <q-list class="flex column" clickable ripple v-for="(content, idx) in estates" :key="content.id">
        <div class="col row q-pa-none" >
          <q-item  class="col-2 q-pa-none items-center">
            {{ content.type }}
          </q-item>

          <q-item  class="col-3 items-center">
            <!-- <img class="" style="object-fit: cover; width:40px; height:40px;" @click="" :src="content.photo" /> -->
            <img class="" style="object-fit: cover; width:50px; height:50px;" @click="" :src="showPhoto(content.photo)" />
          </q-item>

          <div class="col-4">
            <q-item  class="q-pa-none items-center">
              {{ content.placeName }}
            </q-item>
            <q-item  class="q-pa-none items-center" >
              {{ content.price | toThousand(content.price)}}
            </q-item>
          </div>


        </div>
        <div class="">
          <q-separator class="bg-grey-5"/>
        </div>

      </q-list>


    </div>

  </div>

</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'estateComponent',

  data () {
    return {
      estates: null,
    }
  },

  watch: {
  },

  filters: {
    toThousand(amount) {
      let num = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      return num
    },
  }, // filters

  methods: {
    ...mapActions('G_NAME', []),

    showPhoto(src) {
      console.log('!!! Source : ', src)
      if(src!='') return src
      else return 'statics/img/default_building.jpg'
    },



  }, //methods

  computed: {
    // ...mapState('G_NAME', ['fullDialog'])
  },

  created() {

  }, // created()

  mounted() {
    // console.log('!!! Asset Mounted : ')
    let places = this.$p._data.places
    this.estates = places

  } // mounted()
}
</script>

<style>

</style>
