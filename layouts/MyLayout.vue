<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title @click="goTitle" class="text-subtitle1 text-weight-bolder">
          DDP
        </q-toolbar-title>

        <div>ver {{ $p.version }}</div>

        <q-btn round flat v-if="isLoggedIn">
          <span style="font-size: 30px; color: #fff;">
            <i class="fas fa-user-circle"></i>
          </span>
          <q-menu>
            <q-list style="min-width: 100px">
              <q-item clickable v-close-popup @click="openMyAsset">
                <q-item-section>내자산</q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="openEditProfile">
                <q-item-section>프로필수정</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable v-close-popup @click="logOut">
                <q-item-section>Log Out</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>

        <q-btn round flat v-if="!isLoggedIn" @click="goLogin">

          <q-icon size="24px" name="img:statics/img/sign_in.svg"></q-icon>
        </q-btn>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-2"
    >
      <q-list class="flex column">
        <div class="row justify-between">
          <q-item-label class="" header>Admin Board</q-item-label>
          <q-btn flat class="q-mr-xs " @click="leftDrawerOpen=false">
            <!-- <q-icon name="clear" />
          </q-btn> -->
          <!-- <q-btn round flat style="font-size: 20px; " icon="fas fa-window-close vanished" @click="leftDrawerOpen=false"> -->
            <span style="font-size: 30px; color: #222;">
              <i class="fas fa-window-close"></i>
            </span>
          </q-btn>
        </div>

          <!-- <q-item clickable tag="a" target="_blank" href="https://quasar.dev"> -->
          <q-item clickable >
            <q-item-section avatar>
              <q-icon name="school" />
            </q-item-section>
            <q-item-section>
              <q-item-label>사용방법</q-item-label>
              <q-item-label caption>google.com</q-item-label>
            </q-item-section>
          </q-item>
          <!-- <q-item clickable tag="a" target="_blank" href="https://github.quasar.dev"> -->
          <q-item clickable >
            <q-item-section avatar>
              <q-icon name="code" />
            </q-item-section>
            <q-item-section>
              <q-item-label @click="test">Go Dictionary Page</q-item-label>
              <q-item-label caption>Dictionary Test</q-item-label>
            </q-item-section>
          </q-item>

      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'MyLayout',

  data () {
    return {
      // leftDrawerOpen: this.$q.platform.is.desktop,
      leftDrawerOpen: false,
      isLoggedIn: false,
    }
  },

  methods: {
    openURL,

    goTitle() {
      this.$router.push({path:'/'})
      window.scrollTo(0,0)
      // console.log('!!! Go Title ')
    },

    openMyAsset() {
      // console.log('# User openMyAsset Clicked....')
      this.$router.push({path:'/myAsset'})
    },

    openEditProfile() {
      // console.log('# User openEditProfile Clicked....')
      this.$router.push({path:'/editProfile'})
    },

    goLogin() {
      console.log('### Go Login')
      this.$router.push({path:'/login'})
    },

    logOut() {
      // localStorage.removeItem('userStore')
      this.isLoggedIn = false
      this.$q.notify({
        message: '로그아웃하였습니다',
        color: 'orange-5',
        icon: 'fas fa-check-circle',
        timeout: 800,
      })
      // this.$router.push({path:'/login'})
      // console.log('### log out')
    },

    goSingup() {
      console.log('### Go goSingup')
      this.$router.push({path:'/login'})
    },

    test() {
      console.log('@@ This is Test....')
      this.$router.push({path:'/dictionary'})
    },

  }, //methods

  async mounted() {
    console.log('%c!!! MyLayout mounted', 'color:gray; font-weight:bold;')
    let userData = this.$p._data.users[0]
    if(userData){
      this.isLoggedIn = true
    }
    // let test = await this.$axios.get('http://localhost:9090/test/user')
    // console.log('!!! Get data : ', test.data.data.item)
  }, // mounted
}
</script>

<style>
</style>
