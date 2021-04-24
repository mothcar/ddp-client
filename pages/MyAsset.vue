<template>
  <q-page class="">
    <!-- *************************************************************** -->
    <!-- Carousel ****************************************************** -->
    <!-- *************************************************************** -->
    <div class="flex flex-center q-pa-md text-subtitle2 text-weight-bolder">
      My Asset Page
    </div>

    <!-- <div class="flex flex-center column q-mb-lg">
    </div> -->

    <!-- *************************************************************** -->
    <!-- TABS ********************************************************** -->
    <!-- *************************************************************** -->
    <div class="full-width q-mt-sm">
      <q-tabs
        v-model="tab"
        dense
        align="justify"
        active-color="red-5"
        >
        <q-tab class="" name="wallet" label="">
            <q-item-label>지갑</q-item-label>
            <q-item-label caption class="q-mb-xs">나의페이 내역</q-item-label>
        </q-tab>
        <q-tab class="" name="estate" label="">
            <q-item-label>부동산</q-item-label>
            <q-item-label caption class="q-mb-xs">보유 부동산</q-item-label>
        </q-tab>
      </q-tabs>
      <q-separator class="bg-grey-5"/>
    </div>

    <!-- *************************************************************** -->
    <!-- Panels ******************************************************** -->
    <!-- *************************************************************** -->
    <q-tab-panels v-model="tab" animated swipeable
     class="full-width shadow-1 rounded-borders bg-grey-2">
      <q-tab-panel name="wallet" class="q-pa-none q-pt-xs" keep-alive>
        <div class="">
          <wallet></wallet>
        </div>
      </q-tab-panel>

      <q-tab-panel name="estate" class="q-pa-none q-pt-xs" keep-alive>
        <div class="">
          <estate></estate>
        </div>
      </q-tab-panel>
    </q-tab-panels>




    <div class="q-pa-md q-gutter-md flex flex-center column">

    </div>

    <div class="q-pa-md q-gutter-md flex flex-center">

    </div>

  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { openURL } from 'quasar'
import wallet from '../components/wallet'
import estate from '../components/estate'

export default {
  name: 'MyAssetPage',
  components: { wallet, estate },

  data() {
    return {
      tab: 'wallet',
    }
  },

  methods: {
    openURL,
    ...mapActions('G_NAME', ['setBack']),


  }, // methods

  mounted() {
    // console.log('### Mounted ..... ')

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
