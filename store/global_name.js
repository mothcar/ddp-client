import axios from 'axios'

export default {
  namespaced: true,

  state : {
    counter: 0,
    testa: 'test',
    arrow: 'fa-angle-down',
    fullDialog: false,
    currentTab: 'dong',     // dong / gugun / city / country
    leftProfile: false,
    profileData: {},
    modeState: 'post',      // post / place
    placeData: {},
    currentAddress: {},     // for infocenter card
    // beforeZoom: 14,
    // c_coordinates: [
    //   126.918891,
    //   37.4913805
    // ],

  },

  // Like Computed
  getters: {
    getTempExamId: state => {
      console.log('2222222222222222222222222')
      return state.tempExamId
    }
  },


  mutations :  {
    async luckyCounter (state, payload) {
      // state.counter--
      // console.log('### lucky Called ....')
      let raw = await axios.get('http://localhost:9090/test/mutation', {params:{}})
      // console.log('### lucky raw :', raw)
      let data = raw.data.data.item
      state.counter = data+1
    },

    UPDATE_QUERY_TEXT(state, newValue) {
      // state.queryText = newValue
    },

    setArrow(state, val) {
      state.arrow = val
    },

    setDialog(state, val) {
      state.fullDialog = val
    },

    setTab(state, val) {
      state.currentTab = val
    },

    setProfile(state, val) {
      state.leftProfile = val
    },

    setProfileData(state, val) {
      state.profileData = val
    },

    setMode(state, val) {
      state.modeState = val
    },

    setPlace(state, val) {
      state.placeData = val
    },

    setCurrentAddress(state, val) {
      state.currentAddress = val
    },

    // setCoordinates(state, val) {
    //   state.c_coordinates = val
    // },

    // setZoom(state, val) {
    //   state.beforeZoom = val
    // },

  },

  actions : {
    updateQueryText ( {commit}, newQueryText) {
      commit('UPDATE_QUERY_TEXT', newQueryText)
    },

    setArrow({commit}, payload) {
      commit('setArrow', payload)
    },

    setDialog({commit}, payload) {
      commit('setDialog', payload)
    },

    setTab({commit}, payload) {
      commit('setTab', payload)
    },

    setProfile({commit}, payload) {
      commit('setProfile', payload)
    },

    setProfileData({commit}, payload) {
      commit('setProfileData', payload)
    },

    setMode({commit}, payload) {
      commit('setMode', payload)
    },

    setPlace({commit}, payload) {
      commit('setPlace', payload)
      // console.log('!!! set Place Actions payload: ', payload)
    },

    setCurrentAddress({commit}, payload) {
      commit('setCurrentAddress', payload)
    },

    // setCoordinates({commit}, payload) {
    //   commit('setCoordinates', payload)
    //   // console.log('!!! set Coordinates Actions payload: ', payload)
    // },

    // setZoom({commit}, payload) {
    //   commit('setZoom', payload)
    //   console.log('!!! setZoom Actions payload: ', payload)
    // },

  } // actions
}
