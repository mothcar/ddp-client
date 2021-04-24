<template>
  <q-layout view="lHh Lpr lFf">
    <q-header reveal elevated class="bg-grey-10">
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
          {{ title }}
        </q-toolbar-title>

        <div class="q-mr-sm" @click="goSignUp">
          {{ sub_title }}
        </div>
      </q-toolbar>

    </q-header>

  <!-- HEADER ******************************************************************* -->
  <!-- HEADER ******************************************************************* -->
      <q-page-container class="">
        <signin v-if="currentComp=== 'signin'" @c2p="childData"></signin>
        <signup v-if="currentComp=== 'signup'" @c2p="childData"></signup>
      </q-page-container>
      </q-layout>
</template>

<script>
import signin from '../components/signin.vue'
import signup from '../components/signup.vue'

export default {
  name: 'ClubPage',
  components: { signin, signup },

  data () {
    return {
      title: 'LogIn',
      title_name:'Artist',
      sub_title: '회원가입',
      currentComp: 'signin'
    }
  },

  methods: {
    goBack() {
      this.$router.go(-1)
    },

    goSignUp() {
      console.log('Go Sign Up clicked sub_title: ', this.currentComp)
      if(this.currentComp =='signin'){
        this.title = '회원가입'
        this.sub_title = '로그인'
        this.currentComp = 'signup'
      } else {
        this.title = 'Log In'
        this.sub_title = '회원가입'
        this.currentComp = 'signin'
      }
    },

    childData(val) {
      console.log('From data child :', val)
      if(val) {
        this.title = 'Log In'
        this.sub_title = '회원가입'
        this.currentComp = 'signin'
      } else {
        this.title = '회원가입'
        this.sub_title = '로그인'
        this.currentComp = 'signup'
      }
    }

  }, // methods

  computed: {
  },

  created() {

  }, // created()

  mounted() {
    console.log('# mounted ()')
  } // mounted()
}
</script>

<style>

</style>
