<template>
  <div class="flex column" >
    <!-- *************************************************************** -->
    <!-- Upper ********************************************************* -->
    <!-- *************************************************************** -->
    <div class="flex column">
      <div class="q-ml-sm">
        Pay
      </div>
      <div class="flex flex-center text-grey-9 q-mb-md">
        <span style="font-size: 50px;">
          <i class="fas fa-piggy-bank"></i>
        </span>
      </div>
      <div class="flex flex-center">
        <div class="text-weight-bold">
          8,400 CONT
          <span class="text-weight-light">(W 250,000)</span>
        </div>

      </div>
      <div class="flex flex-center text-caption">
        +2.51%
      </div>
      <div class="flex flex-center full-width" style="height:80px;">
        <q-btn style="width:25%" color="red-5" class="q-mr-xs">송금</q-btn>
        <q-btn style="width:25%" color="orange-5">구매 / 매도</q-btn>
      </div>
    </div>

    <!-- *************************************************************** -->
    <!-- Content List ************************************************** -->
    <!-- *************************************************************** -->
    <q-banner  class="bg-grey-3 shadow-1">
       Today
     </q-banner>

    <div class="q-ma-sm">
      <q-list class="flex column" v-for="(content, idx) in lists" :key="content.id">
        <div class="col row q-pa-none">
          <q-item  class=" items-center">
            <span style="font-size: 20px; color: grey;">
              <i class="fas fa-arrow-circle-up"></i>
            </span>
          </q-item>
          <q-item  class="col q-pa-none items-center">
            {{ content.dist }}
          </q-item>
          <q-item  class="col q-pa-none items-center">
            {{ content.person }}
          </q-item>
          <q-item  class="col q-pa-none items-center">
            {{ content.amount }}
          </q-item>

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
  name: 'walletComponent',

  data () {
    return {
      lists: null,
    }
  },

  watch: {
  },

  methods: {
    ...mapActions('G_NAME', []),

  }, //methods

  computed: {
    // ...mapState('G_NAME', ['fullDialog'])
  },

  created() {

  }, // created()

  mounted() {
    // console.log('!!! Asset Mounted : ')
    let bank = this.$p._data.bank
    this.lists = bank

  } // mounted()
}
</script>

<style>

</style>
