<template>
  <q-page padding class="">
      <div class="flex justify-center  q-mt-lg q-mb-lg">
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
        <q-input class="q-mt-lg"
        outlined v-model="password" label="Password"
        type="password"
        style="width: 300px; max-width:600px;"
        />
      </div>
      <div class="flex justify-center q-mt-lg">
        <q-btn color="primary" @click="login" style="width: 300px; height:50px;">
          Log In
        </q-btn>
      </div>
      <div class="row justify-center q-mt-lg q-mb-lg" style="text-align:center;">
          <div class="col-3 col-md-2" @click="findPw" style="width:100px">
            password
          </div>
          <div class="col-1 col-md-2" style="width:50px">
            |
          </div>
          <div class="col-3 col-md-2" @click="goSignUp" style="width:100px">
            Sign Up
          </div>

      </div>

      <!-- dialog ******************************************************* -->
      <q-dialog v-model="noExist">
        <q-card>
          <q-card-section>
            <div class="text-h6">Alert</div>
          </q-card-section>
          <q-card-section>
            {{ comment }}
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="OK" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <!-- **********************************************************-->
      <!-- Dialog                                                    -->
      <!-- **********************************************************-->
      <q-dialog v-model="showConfirm" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <span class="q-ml-sm">로그인해주세요</span>
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
      email: null,
      password: null,
      noExist: false,
      comment: '아이디가 없습니다. 다시 시도해주세요.',
      showConfirm: false,
    }
  },

  methods: {
    goBack() {
      this.$router.go(-1)
    },

    async login() {
      console.log('# signin Comp login() clicked')
      var params = {
        email: this.email,
        password: this.password
      }
      var rawData = await this.$axios.post(process.env.API+'/auth/login', params)
      let data = rawData.data.data.item
      console.log('# login() log in : ', data)
      if(data) {
        if(data._id==='000'){
          this.noExist = true
        } else if(data._id==='001'){
          this.comment = '비밀번호를 확인해주세요'
          this.noExist = true
        } else {
          localStorage.setItem('userStore', JSON.stringify(data))
          // console.log('### STORE : ', this.$store.getters['G_NAME/getTempExamId'])
          let tempExamId = this.$store.getters['G_NAME/getTempExamId']
          if(tempExamId != null) {
            this.$router.push({name:'exam', params:{idx:tempExamId}})
          } else {
            this.$router.push({path:'/'})
          }

        }
      } else {
        console.log('### set localStorage!!!!!')
        this.showConfirm = true
        // var userId = localStorage.getItem(this.USER_ID)
      }
    },

    findPw() {
      console.log('find password')
    },

    goSignUp() {
      console.log('go Sign up')
      this.$emit('c2p', false)
    }

  },
  computed: {
  },

  created() {

  }, // created()

  mounted() {
    // console.log('### STORE : ', this.$store.getters.G_NAME/getTempExamId)
    console.log('### STORE : ', this.$store.getters['G_NAME/getTempExamId'])
    // console.log('### STORE : ', this.$store.state.tempExamId)

  } // mounted()
}
</script>

<style>

</style>
