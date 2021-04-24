<template>
  <div class="" >

  </div>

</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'walletComponent',

  data () {
    return {

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
    console.log('!!! Asset Mounted : ')

  } // mounted()
}
</script>

<style>

</style>
