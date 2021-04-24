<template>
  <q-page class="flex column">
    <!-- *************************************************************** -->
    <!-- TABS ********************************************************** -->
    <!-- *************************************************************** -->
    <div class="full-width q-mt-sm">
      <q-tabs
        v-model="tab"
        dense
        align="justify"
        active-color="red-5"
        @input="inputTab"
      >
      <q-tab class="" name="dong" label="">
          <q-item-label>동네</q-item-label>
          <q-item-label caption class="q-mb-xs">읍면동</q-item-label>
      </q-tab>
        <q-tab class="" name="gugun" label="">
            <q-item-label>구군</q-item-label>
            <q-item-label caption class="q-mb-xs">구군단위</q-item-label>
        </q-tab>
        <q-tab class="" name="city" label="">
            <q-item-label>시도</q-item-label>
            <q-item-label caption class="q-mb-xs">광역시, 도청</q-item-label>
        </q-tab>
        <q-tab class="" name="country" label="">
          <q-item-label>국가</q-item-label>
          <q-item-label caption class="q-mb-xs">대한민국</q-item-label>
        </q-tab>
      </q-tabs>
      <q-separator class="bg-grey-5"/>
      <div class="map-wrapper ">
        <!-- <div id="map" class="">
        </div> -->
        <div id="map" style="width:100%;height:200px;"></div>
      </div>
    </div>
    <!-- *************************************************************** -->
    <!-- Post Mode  **************************************************** -->
    <!-- *************************************************************** -->
    <div id="mydiv" v-if="mode=='post'">
      <div id="mydivheader">
        <!-- <span style="font-size: 25px; color: white;">
          <i class="fas fa-align-right"></i>
          <i :class="theme"></i>
        </span> -->
        <div class="">
          {{ area_name }}
        </div>
      </div>
      <!-- angle-down / angle-up -->
      <!-- *************************************************************** -->
      <!-- Panels ******************************************************** -->
      <!-- *************************************************************** -->
      <q-tab-panels v-model="tab" animated swipeable @input="inputTab"
       class="full-width shadow-1 rounded-borders bg-grey-2">
        <q-tab-panel name="dong" class="q-pa-none q-pt-xs" keep-alive>
          <div class="">
            <postsContainer></postsContainer>
          </div>
        </q-tab-panel>

        <q-tab-panel name="gugun" class="q-pa-none q-pt-xs" keep-alive>
          <div class="">
            <postsContainer></postsContainer>
          </div>
        </q-tab-panel>

        <q-tab-panel name="city" class="q-pa-none q-pt-xs" keep-alive>
          <div class="">
            <postsContainer></postsContainer>
          </div>
        </q-tab-panel>

        <q-tab-panel name="country" class="q-pa-none q-pt-xs" keep-alive>
          <div class="">
            <postsContainer></postsContainer>
          </div>
        </q-tab-panel>
      </q-tab-panels>

    </div>

    <!-- *************************************************************** -->
    <!-- Place Container *********************************************** -->
    <!-- *************************************************************** -->
    <!-- <q-slide-transition> -->
    <transition name="slide-fade">
      <div id="mydiv" v-if="mode!='post'">
        <div id="mydivheader" class="bg-orange-5 flex row items-center">
          <!-- <span style="font-size: 25px; color: white;">
              <i class="fas fa-align-right"></i>
              <i class="fas" :class="theme"></i>
            </span> -->
            <q-btn @click="goPostMode" flat class="col-2">
              <span style="font-size: 20px; color: white;">
                  <i class="fas fa-arrow-left"></i>
                </span>
            </q-btn>
            <div class="">
              <span style="font-size: 25px; color: white;">
                <i  class="q-ml-lg fas" :class="theme"></i>
              </span>
            </div>

            <div class="col-6">
              {{ placeName }}
            </div>
        </div>

        <placeContainer></placeContainer>
      </div>
    </transition>

    <!-- </q-slide-transition> -->

    <!-- *************************************************************** -->
   <!-- Dialog ******************************************************** -->
   <!-- *************************************************************** -->
   <leftProfileOne v-if="showProfile" :myData="userData"></leftProfileOne>
   <fullDailog v-if="showDialog" ></fullDailog>



  </q-page>
</template>

<style>
</style>

<script>
import postsContainer from '../components/postsContainer'
import placeContainer from '../components/placeContainer'

import leftProfileOne from '../components/profile'
import fullDailog from '../components/fullDialog'

import { mapState, mapActions } from 'vuex'

export default {
  name: 'IndexPage',
  components: { leftProfileOne, postsContainer, placeContainer, fullDailog},

  data() {
    return {
      tab: 'dong',
      theme: 'fa-building',
      address: null,
      area_name: '지역명',
      c_level: 3,
      map: null,
      old_infowindows: [],
      mode: 'post',
      placeName: 'place name',
      place: {},
      showProfile: false,
      showDialog: false,
      // leftProfile: false,
      userData: {},
      forMapPlaceData: null,
    }
  },

  computed: {
     ...mapState('G_NAME', ['fullDialog', 'leftProfile','profileData', 'currentTab', 'modeState', 'placeData', 'c_coordinates'])
   },

  watch: {

    theme(val) {
      this.theme = val
      // console.log('!!! Theme activate : ', val)
    },

    address(val) {
      let level = this.tab
      this.setCurrentAddress(val)
      switch(level) {
        case 'dong':
          this.area_name = val.adminDong+' '+"("+val.city_do+' '+val.gu_gun+")"
        break
        case 'gugun':
          this.area_name = val.gu_gun+' ('+val.city_do+')'
        break
        case 'city':
          this.area_name = val.city_do
        break
        case 'country':
          this.area_name = '대한민국'
        break
      }
      // console.log('!!! Address Changed', val)
    }, // address

    modeState(val) {
      this.mode = val
      // console.log('!!! Watch PlaceData : ', this.placeData)
      if(val == 'place') this.placeName = this.placeData.placeName
      // console.log('!!! Mode state : ', val)
    },

    placeData(val, oldVal) {
      // console.log('!!!  placeData location : ', val.location.coordinates)
      // console.log('!!!  placeData oldVal location : ', oldVal.location.coordinates)

      this.place = val
      this.forMapPlaceData = val
      this.updateMap(val.location.coordinates)
    },

    leftProfile(val) {
    // console.log('!!!! Watch leftprofile : ', val)
    // console.log('!!!! Watch this.profileData : ', this.profileData)
      this.userData = this.profileData
      this.showProfile = val
    },

    fullDialog(val) {
      this.showDialog = val
      // console.log('@@ fullDialog : ', val)
    },

  }, // watch

  methods: {
    ...mapActions('G_NAME', ['setArrow', 'setTab', 'setMode', 'setCurrentAddress']),

    inputTab(val) {
      // this.setTab(val)
      switch(val) {
        case 'dong':
          this.map.setLevel(5 , {animate:{duration: 500 }} )
        break
        case 'gugun':
          this.map.setLevel(8 , {animate:{duration: 500 }} )
        break
        case 'city':
          this.map.setLevel(11 , {animate:{duration: 500 }} )
        break
        case 'country':
          this.map.setLevel(13 , {animate:{duration: 500 }} )
        break
      }
      // console.log('!!! Input val : ', val)
    },

    updateMap(location) {
      // console.log('!! location : ', location)
      // kakao.maps.event.removeListener(this.map, 'idle', function() {});
      // this.map.setLevel(3, {animate:{duration: 500 }} )
      let loc = this.forMapPlaceData.location.coordinates
      this.map.setCenter(new daum.maps.LatLng(loc[1], loc[0]))
    },

    goPostMode() {
      this.setMode('post')
      // setTimeout(()=>{
      //
      // }, 500)

    },

    setAddress() {
      var _this = this
      // 주소-좌표 변환 객체를 생성합니다
      var geocoder = new kakao.maps.services.Geocoder();
      setAddress()

      // var marker = new kakao.maps.Marker(), // 클릭한 위치를 표시할 마커입니다
      //     infowindow = new kakao.maps.InfoWindow({zindex:1}); // 클릭한 위치에 대한 주소를 표시할 인포윈도우입니다

      // 현재 지도 중심좌표로 주소를 검색해서 지도 좌측 상단에 표시합니다
      // searchAddrFromCoords(_this.map.getCenter(), displayCenterInfo);

      // 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다
      // kakao.maps.event.addListener(this.map, 'click', function(mouseEvent) {
      //
      // });

      // 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다
      kakao.maps.event.addListener(this.map, 'idle', function() {
          // searchAddrFromCoords(_this.map.getCenter(), displayCenterInfo);
          // console.log('!!! Map IDLE getLevel : ')
          setAddress()
          // getMarker()
          // console.log('@@ Zoom : ', _this.map.getLevel())
      });


      async function setAddress() {
        let thisCenter = _this.map.getCenter()

        let skt = await _this.$axios.get('http://api2.sktelecom.com/tmap/geo/reversegeocoding?lon='+thisCenter.getLng()+"&lat=" +thisCenter.getLat()+'&version=1&appKey=d190b96b-b402-4632-8453-e7fca774f9d2&coordType=WGS84GEO&addressType=A10')
        // console.log('!!! skt : ', skt)
        if(skt.status==200) {
          _this.address = skt.data.addressInfo
          // searchDetailAddrFromCoords(_this.map.getCenter(), function(result, status) {
          //     if (status === kakao.maps.services.Status.OK) {
          //       // console.log('!!! getLevel : ', _this.map.getLevel())
          //       // _this.address = result[0].address
          //       // console.log('!!! Road Address : ', result[0].road_address)
          //         var detailAddr = !!result[0].road_address ? '<div>도로명주소 : ' + result[0].road_address.address_name + '</div>' : '';
          //         detailAddr += '<div>지번 주소 : ' + result[0].address.address_name + '</div>';
          //
          //         var content = '<div class="bAddr">' +
          //                         '<span class="title">법정동 주소정보</span>' +
          //                         detailAddr +
          //                     '</div>';
          //
          //         // 마커를 클릭한 위치에 표시합니다
          //         // marker.setPosition(_this.map.getCenter());
          //         // marker.setMap(_this.map);
          //
          //         // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
          //         // infowindow.setContent(content);
          //         // infowindow.open(_this.map, marker);
          //     }
          // });
        }

      } //setAddress()

      function searchAddrFromCoords(coords, callback) {
          // 좌표로 행정동 주소 정보를 요청합니다
          geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
      }

      function searchDetailAddrFromCoords(coords, callback) {
          // 좌표로 법정동 상세 주소 정보를 요청합니다
          geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
      }

      // 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
      function displayCenterInfo(result, status) {
          if (status === kakao.maps.services.Status.OK) {
              var infoDiv = document.getElementById('centerAddr');

              for(var i = 0; i < result.length; i++) {
                  // 행정동의 region_type 값은 'H' 이므로
                  if (result[i].region_type === 'H') {
                      // infoDiv.innerHTML = result[i].address_name;
                      // break;
                      // console.log('!!! Done')
                  }
              }
          }
      }
    }, //setAddress()

    initMap() {
      console.log('!!! Init map Start.........')
      let _this = this
      // // var center =
      // var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
      // var options= {}
      //
      // if(this.placeData.placeName != null) {
      //   // console.log('!!! this.placeData if: ', this.placeData)
      //   let loc = this.placeData.location.coordinates
      //   options = { //지도를 생성할 때 필요한 기본 옵션
      //    	// center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
      //    	center: new kakao.maps.LatLng(loc[1], loc[0]), //지도의 중심좌표.
      //    	level: 3 //지도의 레벨(확대, 축소 정도)
      //   }
      //   this.placeName = this.placeData.placeName
      // } else {
      //   // console.log('!!! this.placeData else : ', this.placeData)
      //   options = { //지도를 생성할 때 필요한 기본 옵션
      //    	// center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
      //    	center: new kakao.maps.LatLng(37.4913758, 126.92364), //지도의 중심좌표.
      //    	level: 3 //지도의 레벨(확대, 축소 정도)
      //   }
      // }
      //
      // var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
      // this.map = map
      // console.log('!!! center type : ', options.center)
      this.setAddress()
      showFakeMarker()

      kakao.maps.event.addListener(this.map, 'idle', function() {
        console.log('!!! Init IDLE!!!')
        showFakeMarker()
        // getMarker()
      })

      function showFakeMarker() {
        let val = _this.map.getLevel()

        var bounds = _this.map.getBounds();
        console.log('@@ bounds : ', bounds)

        var bound_bottom_lat = bounds.la
        var bound_bottom_lng = bounds.ea
        var bound_top_lat = bounds.ka
        var bound_top_lng = bounds.ja
        // console.log('bounds box : ', bounds)
        // console.log('bounds : ', bound_bottom_lat)
        let queryParams = {
          b_lat : bound_bottom_lat,
          b_lng : bound_bottom_lng,
          t_lat : bound_top_lat,
          t_lng : bound_top_lng
        }

        console.log('queryParams : ', queryParams)

        _this.$axios.get(process.env.API+'/infocenter/getMarker',{
              params: queryParams
            })
        .then(res=>{
          // localStorage.setItem('markers', res.data)
          // let markers = res.data.data.item
          // // if(markers.length > 0) {
          // //   _this.showMarkers(markers)
          // // }
          // _this.showMarkers(markers)
          // // localStorage.setItem('old_markers', JSON.stringify(markers))

          switch(val) {
            case 3: case 4: case 5:         // 5
              _this.tab = 'dong'
              _this.setTab('dong')
            break
            case 6: case 7: case 8: case 9: // 8
              _this.tab = 'gugun'
              _this.setTab('gugun')
            break
            case 10: case 11: case 12:      // 11
              _this.tab = 'city'
              _this.setTab('city')
            break
            case 13: case 14:               // 13
              _this.tab = 'country'
              _this.setTab('country')
            break
          }
          // console.log('!!! initMap  Mode : ', _this.modeState)
          let spots = []
          if(_this.modeState=='post') {
            // spots = _this.$p._data.posts
            spots = res.data.data.item
          } else {
            spots.push(_this.placeData)
            // console.log('@@ _this.placeData : ', _this.placeData)
          }

          var old_iws = _this.old_infowindows
          var set_old_iws = []


          if(old_iws.length > 0) {
            for(var k = 0; k < old_iws.length; k++){
              // old_iws[k].close()
              old_iws[k].setMap(null)
              // console.log('deleted infowindow : ', old_iws[k])
            }
          }

          for (var i = 0; i < spots.length; i ++) {
            // console.log('location.coordiantes : ', typeof spots[i].location )
            var lat = spots[i].location.coordinates[1]
            var lng = spots[i].location.coordinates[0]
            var latlng = _this.set_standard_coords(lat, lng)
            // 지도를 클릭한 위치에 표출할 마커입니다
            var marker = new kakao.maps.Marker({
                position: latlng,
                clickable: true
            })

            var iwContent = '<div style="padding:5px;font-size:10px;">'+spots[i].name+'</div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
              iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

            // 인포윈도우를 생성합니다
            var infowindow = new kakao.maps.InfoWindow({
                content : iwContent,
                removable : iwRemoveable
            });



            if(spots.length > 0 && _this.modeState=='post'){
                let pos_level = spots[i].level // 'dong', 'gugun', 'city'
                let currentPos = _this.currentTab
                // console.log('!!! currentPos : ', currentPos)
                // console.log('!!! pos_level : ', pos_level)
                switch(currentPos) {
                  case 'dong':
                  marker.setMap(_this.map)
                  set_old_iws.push(marker);
                  break
                  case 'gugun':
                  if(pos_level == 'dong') {

                  } else {
                    marker.setMap(_this.map)
                    set_old_iws.push(marker);

                  }
                  break
                  case 'city':
                  if(pos_level == 'dong'||pos_level == 'gugun') {

                  } else {
                    marker.setMap(_this.map)
                    set_old_iws.push(marker);
                  }
                  break
                  case 'country':
                  if(pos_level == currentPos) {
                    marker.setMap(_this.map)
                    set_old_iws.push(marker);
                  }
                  break
                } // switch

                (function(marker, infowindow) {
                    kakao.maps.event.addListener(marker, 'click', function() {
                        infowindow.open(_this.map, marker);
                    });
                })(marker, infowindow);


            } else {
              marker.setMap(_this.map)
              set_old_iws.push(marker);
            }

            (function(marker, infowindow) {
                kakao.maps.event.addListener(marker, 'click', function() {
                    infowindow.open(_this.map, marker);
                });
            })(marker, infowindow);



          } // for
          _this.old_infowindows = set_old_iws

          console.log('Marker  #524 : ', res.data.data.item)
        })

      } // function showMarker()



      // let _this= this
      //
      // var lat1=37.49153, lng1=126.92381, center= null
      //
      // if (localStorage.getItem('pan_latitude') == Number.NEGATIVE_INFINITY || localStorage.getItem('pan_latitude') == null || localStorage.getItem('pan_latitude') === 'NaN') {
      //   center =  new daum.maps.LatLng(lat1,lng1);
      //   this.g_center = center
      //   // console.log('center : ', center)
      // } else {
      //   lat1 = localStorage.getItem('pan_latitude');
      //   lng1 = localStorage.getItem('pan_longitude');
      //   // console.log('# PAN LATITUDE : ', lat1)
      //   center =  new daum.maps.LatLng(lat1,lng1);
      //   this.g_center = center
      //   // console.log('center else : ', center)
      // }
      //
      // var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
      // var options = { //지도를 생성할 때 필요한 기본 옵션
      //   center: center, //지도의 중심좌표.
      //   level: this.zoomLevel //지도의 레벨(확대, 축소 정도)
      // };
      // var map = new daum.maps.Map(container, options); //지도 생성 및 객체 리턴
      // this.nMap = map
      //
      // var tabLevel = localStorage.getItem(this.TAB_LEVEL)
      // var zoomLevel = LEVEL.changeTab(tabLevel)
      // this.nMap.setLevel(zoomLevel, {animate:{duration: 500 }} )
    }, // initMap()

    set_standard_coords(lat, lng) {
      let latlng = new kakao.maps.LatLng(lat, lng)
      return latlng
    },

  },

  mounted() {
    // console.log('@@@ Index Mounted: ')
    this.mode = this.modeState
    // console.log('!!! height : ', document.documentElement.clientHeight)
    if(this.placeData!=null) {
      this.placeName = this.placeData.placeName
    }

    let _this = this
    // var center =
    var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
    var options= {}

    if(this.placeData.placeName != null) {
      // console.log('!!! this.placeData if: ', this.placeData)
      let loc = this.placeData.location.coordinates
      options = { //지도를 생성할 때 필요한 기본 옵션
        // center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
        center: new kakao.maps.LatLng(loc[1], loc[0]), //지도의 중심좌표.
        level: 3 //지도의 레벨(확대, 축소 정도)
      }
      this.placeName = this.placeData.placeName
    } else {
      // console.log('!!! this.placeData else : ', this.placeData)
      options = { //지도를 생성할 때 필요한 기본 옵션
        // center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
        center: new kakao.maps.LatLng(37.4913758, 126.92364), //지도의 중심좌표.
        level: 3 //지도의 레벨(확대, 축소 정도)
      }
    }

    var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
    this.map = map

    // cf Project : 'daum_one'

    // Make the DIV element draggable:
    let thema = 'fa-building';
    let direction = 'down'
    let mapEl = document.getElementById("map")

    dragElement(document.getElementById("mydiv"));

    function dragElement(elmnt) {

      var pos1 = 0, pos2 = 200, pos3 = 0, pos4 = 0;
      if (document.getElementById(elmnt.id + "header")) {
        // if present, the header is where you move the DIV from:
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
        document.getElementById(elmnt.id + "header").ontouchstart = dragMouseDown;
      } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
        elmnt.ontouchstart = dragMouseDown;
      }

      function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        // pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.ontouchend = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
        document.ontouchmove = elementDrag;
      }

      function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        // pos1 = pos3 - e.clientX;

        pos2 = pos4 - e.clientY;
        // pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:

        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        mapEl.style.height = (parseInt(getComputedStyle(mapEl, '').height) - pos2) + "px";
        // console.log('!!!! El : ', pos2)
        if(pos2 == 0 ) {
          return
        } else if(pos2 > 0 ){
          // go up
          direction = 'up'

        } else {
          // go down
          direction = 'down'

        }
      }

      function closeDragElement(e) {
        e = e || window.event;
        e.preventDefault();
        // console.log('!!! Drag End height : ', e.clientY)
        // console.log('!!! direction : ', direction)

        if(direction == 'down') {
          // action down
          thema = 'far fa-building'
          mapEl.style.height = (document.documentElement.clientHeight-155) + "px";
          elmnt.style.height = "50px";
        } else {
          // action up
          thema = 'far fa-building'
          elmnt.style.height = document.documentElement.clientHeight +"px";
          mapEl.style.height = "200px";
        }

        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;

        document.ontouchend = null;
        document.ontouchmove = null;

        _this.map.relayout();
      }

      // console.log('!!! Retuen Thema : ', thema);
      // return thema;
    } // dragElement()
    // console.log('!!! Retuen Thema : ', thema);
    this.theme = thema
    // let isPlaceData = this.placeData
    // console.log('!!! IS Place Data : ', isPlaceData)
    // if(isPlaceData != null) {
    //   update
    // } else {
    this.initMap()
    // }

    // console.log('!!! data : ', this.$p._data)
  }, // mounted()



} //export default
</script>
