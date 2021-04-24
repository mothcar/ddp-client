<template>
  <q-layout view="lHh Lpr lFf">
    <!-- HEADER ******************************************************************* -->
    <!-- HEADER ******************************************************************* -->
    <q-header elevated :class="changeColor">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          aria-label="Menu"
          @click="goBack"
        >
          <q-icon name="keyboard_arrow_left" />
        </q-btn>

        <q-toolbar-title>
          {{ pageTitle }}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container class="" :style="headerStyle">
      <router-view />
    </q-page-container>

    <!-- *************************************************************** -->
    <!-- Footer ******************************************************** -->
    <!-- *************************************************************** -->
    <div class="">
      <!-- <mobile-footer class="mobile-only"></mobile-footer>
      <desktopFooter class="desktop-only"></desktopFooter> -->
    </div>
  </q-layout>

</template>

<script>
import { mapState, mapActions } from 'vuex'
// import mobileFooter from '../components/mobileFooter'
// import desktopFooter from '../components/desktopFooter'

export default {
  name: 'PageLayout',
  // components:{mobileFooter, desktopFooter},

  data() {
    return {
      pageTitle: '',
      changeColor: 'bg-red-5',
      headerStyle: '',
    }
  },

  methods: {
    ...mapActions('G_NAME', ['setBack']),

    goBack() {
      // console.log('Back Clicked... : ', this.pageTitle )
      if(this.pageTitle == 'Admin') {
        // console.log('!!! Router upper')
        this.$router.push({path:'/'})
      } else {
        // console.log('!!! Router lower')
        this.$router.go(-1)
      }
    },

    thousandSeprator(amount) {
      return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }, // thousandSeprator



  }, // methods

  mounted() {
    console.log('!!! Page Layout .....', this.$route.name)
    let title = this.$route.name
    this.pageTitle = title
    // switch(title){
    //   case 'product':
    //     this.pageTitle = '제품정보'
    //   break
    //   case 'company':
    //     this.pageTitle = '기업정보'
    //   break
    //   case 'wallet':
    //     this.pageTitle = '월렛'
    //     this.changeColor = 'bg-light-blue-3'
    //     this.headerStyle = 'background: linear-gradient(to bottom, #95d6f0 0%, #7f7ff1 100%)'
    //   break
    //   case 'admin':
    //     this.pageTitle = 'Admin'
    //   break
    //   // bg-light-blue-3
    // }
  }, //mounted

  computed: {
    ...mapState('G_NAME',[
      'backbtnParmas'
    ]),
  }

  // beforeDestroy () {
  //   // this.$router.push({name:'person', params:{id:this.lab.id}})
  //   this.goBackButton()
  //   console.log('!!! beforeDestroy.....')
  // }



}
</script>

<style>
</style>
