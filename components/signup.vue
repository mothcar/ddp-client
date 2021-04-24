<template>
  <q-page padding>
      <div class="flex justify-center q-mt-lg q-mb-lg">
        <q-img
          :src='imageSrc'
          style="height: 100%; max-width: 150px"
          :ratio="1"
          basic
        />
      </div>
      <div class="flex justify-center">
        <q-input outlined v-model="email" label="email@id.com"
        style="width: 300px; max-width:600px;"
        />
      </div>
      <div class="flex justify-center">
        <q-input class="q-mt-lg" outlined v-model="userName" label="홍길동"
        style="width: 300px; max-width:600px;"
        />
      </div>
      <div class="flex justify-center">
        <q-input class="q-mt-lg"
        outlined v-model="password" label="Password"
        type="password"
        style="width: 300px; max-width:600px;"
        />
      </div>
      <div class="flex justify-center">
        <q-input class="q-mt-lg"
        outlined v-model="c_password" label="Confirm Password"
        type="password"
        style="width: 300px; max-width:600px;"
        />
      </div>
      <div class="flex justify-center q-mt-lg">
        <q-btn color="primary" @click="submit" :disable="verified"
        style="width: 300px; height:50px;">
          회원가입
        </q-btn>
      </div>
      <div class="row justify-center q-mt-lg q-mb-lg" style="text-align:center;">
          <div class="col-3 col-md-2" @click="findPw" style="width:100px">
            License
          </div>
          <div class="col-1 col-md-2" style="width:50px">
            |
          </div>
          <div class="col-3 col-md-2" @click="goSignIn" style="width:100px">
            Log In
          </div>

      </div>

      <!-- dialog ******************************************************* -->
      <q-dialog v-model="exist">
        <q-card>
          <q-card-section>
            <div class="text-h6">Alert</div>
          </q-card-section>
          <q-card-section>
            아이디가 이미 존재합니다. 다른 아이디를 사용해 주세요.
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="OK" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>



  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'SampleComponent',

  data () {
    return {
      title_name:'Artist',
      imageSrc: 'statics/img/logo.jpg',
      userName: null,
      email: null,
      password: null,
      c_password: null,
      verified: true,
      exist: false,
    }
  },

  watch: {
    password() {
      if(this.password===this.c_password) this.verified = false
      else this.verified = true
    },
    c_password() {
      if(this.password===this.c_password) this.verified = false
      else this.verified = true
    }
  },

  methods: {
    goBack() {
      this.$router.go(-1)
    },

    findPw() {
      console.log('find password')
    },

    async submit() {
      console.log('# signup()')
      try{
        if(this.userName === null) throw '실명을 입력해주세요'
      } catch(evt) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'fas fa-exclamation-triangle',
          timeout: 800,
          message: evt
        })
        return null
      }



      var params = {
        email: this.email,
        name: this.userName,
        password: this.password
      }
      console.log('# signup() param : ', params)

      var rawData = await this.$axios.post(process.env.API+'/auth/signup', params)
      let data = rawData.data.data.item
      console.log('### Sign UP : ', data)

      if(data._id !=='already exist') {
        console.log('Sign Up OK!!!')
        this.$emit('c2p', true)
        console.log('### To do : save localStorage : ', data._id)
      } else {
        console.log('Sign Up NOT ok !!!')
        this.exist = true
      }
      console.log('# signup get from Server !! ', rawData.data.data)
      // auth/signup
    },



    async goSignIn() {
      console.log('# goSignup()')
      this.$emit('c2p', true)
    }

  },
  computed: {
  },

  created() {

  }, // created()

  mounted() {

  } // mounted()
}
</script>

<style>

</style>
