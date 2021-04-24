import axios from 'axios'
const moment = require('moment')
require('moment/locale/ko')
import VuePageTransition from 'vue-page-transition'


export default async ({ Vue }) => {
  Vue.prototype.$axios = axios
  Vue.use(VuePageTransition)
  // Vue.use(require('vue-moment'))

  // Vue.use(require('vue-moment'))
  Vue.use(require('vue-moment'), {
      moment
  })

  Vue.prototype.$thousandSeprator = function thousandSeprator(amount) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }
  // when use :  this.price = this.$thousandSeprator(product.price)

  Vue.prototype.$p = {
    version:'0.1',

    _data: {
      // ***********************************************************************
      // USER ******************************************************************
      // ***********************************************************************
      users:[
        {
          id: '001',
          name: '황상익',
          email: 'mothcar@naver.com',
          photo: 'statics/img/mothcar.jpg',
          backgroundImage: '',
          level: 'gugun',
          location:{
            type : 'Point',
            coordinates: [
              126.919324,
              37.4997208
            ]
          },
          like: true,
          rank: '시정보센터장',
        },
        {
          id: '002',
          name: '강성민',
          email: 'zayou@naver.com',
          photo: 'statics/img/kang.jpg',
          backgroundImage: '',
          level: 'gugun',
          location:{
            type : 'Point',
            coordinates: [
              126.93947,
              37.5124564
            ]
          },
          like: true,
          rank: '국회의원',
        },
        {
          id: '003',
          name: '황교안',
          email: 'zayou@naver.com',
          photo: 'statics/img/황교안.jpg',
          backgroundImage: '',
          level: 'gugun',
          location:{
            type : 'Point',
            coordinates: [
              126.9782495,
              37.5666727
            ]
          },
          like: true,
          rank: '부도지사',
        },
        {
          id: '004',
          name: '이낙연',
          email: 'zayou@naver.com',
          photo: 'statics/img/leenak.jpg',
          backgroundImage: '',
          level: 'gugun',
          location:{
            type : 'Point',
            coordinates: [
              126.9782495,
              37.5666727
            ]
          },
          like: true,
          rank: '부도지사',
        },
        {
          id: '005',
          name: '우상호',
          email: 'zayou@naver.com',
          photo: 'statics/img/woosang.jpg',
          backgroundImage: '',
          level: 'gugun',
          location:{
            type : 'Point',
            coordinates: [
              126.9782495,
              37.5666727
            ]
          },
          like: true,
          rank: '부도지사',
        },
        {
          id: '006',
          name: '김용환',
          email: 'kim@naver.com',
          photo: 'http://yun0304.cdn3.cafe24.com/img/kimyong.jpg',
          backgroundImage: 'https://images.pexels.com/photos/255379/pexels-photo-255379.jpeg',
          level: 'gugun',
          location:{
            type : 'Point',
            coordinates: [
              126.9782495,
              37.5666727
            ]
          },
          like: true,
          rank: '부도지사',
        },
        {
          id: '007',
          name: '한미경',
          email: 'hanmi@naver.com',
          photo: 'http://www.todayan.com/news/photo/201803/184518_169640_3125.jpg',
          backgroundImage: '',
          level: 'gugun',
          location:{
            type : 'Point',
            coordinates: [
              126.9782495,
              37.5666727
            ]
          },
          like: true,
          rank: '부도지사',
        },
        {
          id: '008',
          name: '이헌수',
          email: 'kimso@naver.com',
          photo: 'http://www.chunsa.kr/news/photo/201804/37606_5973_2034.jpg',
          backgroundImage: 'http://cdnimage.dailian.co.kr/news/201010/news1287105664_222737_1_m.jpg',
          level: 'gugun',
          location:{
            type : 'Point',
            coordinates: [
              126.9782495,
              37.5666727
            ]
          },
          like: true,
          rank: '부도지사',
        },
        {
          id: '009',
          name: '김낙연',
          email: 'kimnak@naver.com',
          photo: 'http://www.businesspost.co.kr/news/photo/201705/48876_67254_424.jpg',
          backgroundImage: 'http://cdnimage.dailian.co.kr/news/201010/news1287105664_222737_1_m.jpg',
          level: 'gugun',
          location:{
            type : 'Point',
            coordinates: [
              126.9782495,
              37.5666727
            ]
          },
          like: true,
          rank: '부도지사',
        },
        {
          id: '010',
          name: '강옥남',
          email: 'kangok@naver.com',
          photo: 'http://www.hanarotalk.co.kr/Card/ProductImg/20130531121908_20130531121946_2017461437224708.jpg',
          backgroundImage: '',
          level: 'gugun',
          location:{
            type : 'Point',
            coordinates: [
              126.9782495,
              37.5666727
            ]
          },
          like: true,
          rank: '부도지사',
        },
        {
          id: '011',
          name: '소춘수',
          email: 'so@naver.com',
          photo: 'statics/img/soshunsu.png',
          backgroundImage: 'http://www.gukjenews.com/news/photo/201611/595167_395401_183.jpg',
          level: 'gugun',
          location:{
            type : 'Point',
            coordinates: [
              127.152345,
              35.813573
            ]
          },
          like: true,
          rank: '전라북도지사',
        },
      ],
      // ***********************************************************************
      // POSTS ******************************************************************
      // ***********************************************************************
      posts:[
        {
          id: 'post_000',
          userName: '소춘수',
          like: true,
          post: '일단 저희는 여행코스를 짜지 않고 내려왔습니다~<br/>대부분 현지에서 실시간 검색을 통해<br/>즉흥적으로 이동해 다녔습니다.<br/><br/><br/>...<br/><br/><br/>그리고 전주 한옥마을은 생각한 것보다 컸지만<br/>대부분 먹거리 위주라 부담없이 둘러 볼 수 있었습니다.',
          createdAt: '2019-09-15T08:50:55.723Z',
          image: 'https://t1.daumcdn.net/cfile/tistory/19171C424E2FE0872C',
          comments: 5,
          location:{
            type : 'Point',
            coordinates: [
              127.152345,
              35.813573
            ]
          },
          subject:'정치',
          level: 'gugun',
          placeName: '일반장소',
          placeType: 'place',
          placeId: 'p_004',
        },
        {
          id: 'post_001',
          userName: '이낙연',
          like: true,
          post: '제주 해군기지 건설 문제는 제주특별자치도 서귀포시 강정마을에 대한민국 국방부가 주도하는 제주민군복합형관광미항과 관련된 논란이다. 2007년 대한민국 해군과 정부는 2014년까지 1조300억 원을 투입해 전투함 20여 척과 15만 톤급 크루즈선 2척이 동시에 정박할 수 있는 45만 제곱미터의 건설 계획을 내놓은 바 있다. 항만의 상주 인원은 장병과 가족을 포함해 7천5백여 명 정도가 될 것으로 예측하고 있다',
          createdAt: '2019-08-25T08:50:55.723Z',
          image: 'http://yun0304.cdn3.cafe24.com/img/jeju.jpg',
          comments: 5,
          location:{
            type : 'Point',
            coordinates: [
              126.919324,
              37.4997208
            ]
          },
          subject:'정치',
          level: 'gugun',
          placeName: '일반장소',
          placeType: 'place',
          placeId: 'p_001',
        },
        {
          id: 'post_002',
          userName: '황교안',
          post: '황교안 자유한국당 대표는 2일 문재인 대통령이 조국 법무부 장관 후보자 딸 입시 부정 의혹과 관련해 입시제도 전반 재검토를 주문한 것과 관련 “국정 최고 책임자로서 무책임하기 짝이 없는 발언”이라고 비판했다.',
          like: true,
          createdAt: '2019-08-23T08:50:55.723Z',
          image: '',
          comments: 3,
          location:{
            type : 'Point',
            coordinates: [
              126.93947,
              37.5124564
            ]
          },
          subject:'정치',
          level: 'gugun',
          placeName: '일반장소',
          placeType: 'place',
          placeId: 'p_002',
        },
        {
          id: 'post_003',
          userName: '우상호',
          post: '서울선 하루 평균 4건 몰려 현재 31건 선정·검토 중 20일부터 수원시가 시범운영에 들어간 ‘수원 시민의 정부’ 온라인 플랫폼 수원시는 20일 ‘수원 시민의 정부’ 온라인 플랫폼 ‘수다’(sooda.or.kr)을 개설해 시범 운영에 들어갔다. 회원으로 가입한 주민이 자유토론방에 정책을 제안하고 다른 주민들로부터 5개 이상의 선호를 얻으면 담당 부서로 넘어가 제안 보충과 실무심사를 거친 뒤 주민들의 투표를 거쳐 실행 여부가 결정된다. 사안에 따라 주민들의 원탁토론도 열리는데, 단순 제안은 한 달 안에 실행계획을 수립해 추진되고 어느 정도 예산이 필요한 장기 정책은 연차별 추진계획을 수립해 예산을 확보한다.',
          like: true,
          createdAt: '2019-08-22T08:50:55.723Z',
          image: 'statics/img/greece.jpg',
          comments: 0,
          location:{
            type : 'Point',
            coordinates: [
              126.9782495,
              37.5666727
            ]
          },
          subject:'정치',
          level: 'city',
          placeName: '통일당',
          placeType: 'place',
          placeId: 'p_003',
        },
        {
          id: 'post_004',
          userName: '김용환',
          post: '우리동네에서 가장 맛있는 돈가츠집이에요. ㅋㅋ ',
          like: true,
          createdAt: '2019-08-22T08:50:55.723Z',
          image: 'https://yum-yumfood.com/web/product/big/201607/29_shop1_382074.jpg',
          comments: 0,
          location:{
            type : 'Point',
            coordinates: [
              126.9241262,
              37.4912813
            ]
          },
          subject:'생활',
          level: 'dong',
          placeName: '맛돈까스',
          placeType: 'place',
          placeId: 'p_004',
        },
        {
          id: 'post_005',
          userName: '한미경',
          post: '우리동네에 교통이 참 불편하네요. ',
          like: true,
          createdAt: '2019-08-22T08:50:55.723Z',
          image: 'http://www.ingnews.kr/news/photo/201703/708_714_2250.jpg',
          comments: 0,
          location:{
            type : 'Point',
            coordinates: [
              126.9245586,
              37.4916004
            ]
          },
          subject:'생활',
          level: 'dong',
          placeName: '신대방2동 주민센터',
          placeType: 'infoCenter',
          placeId: 'p_005',
        },
        {
          id: 'post_006',
          userName: '이헌수',
          post: '여야간 쟁점은 ‘가족 증인’ 채택 문제입니다. 자유한국당은 조 후보자의 가족이 ‘핵심 증인’이니 반드시 출석해야 한다며 이를 포함한 20여명의 증인을 요구하고 있습니다. 반면 더불어민주당은 장관 후보자 인사청문회에서 대대적인 증인 신청부터 이례적인 일인데다, 조 후보자 관련 의혹에 대해선 후보자가 충분히 대답할 수 있는데도 가족들을 ‘인질’로 끌어들이려 한다고 주장합니다.',
          like: true,
          createdAt: '2019-08-22T08:50:55.723Z',
          image: 'http://img.hani.co.kr/imgdb/resize/2019/0901/00500953_20190901.JPG',
          comments: 50,
          location:{
            type : 'Point',
            coordinates: [
              127.73686,
              37.886864
            ]
          },
          subject:'정치',
          level: 'country',
          placeName: '통일당',
          placeType: 'place',
          placeId: 'p_003',
          org: '(사)남북강원도협력협회',
          grade: '이사장',
        },
        {
          id: 'post_007',
          userName: '김낙연',
          post: '조국을 법무부 장관으로 임명하는데 우리 동네에서 찬반 투표 해봅시다.',
          like: true,
          createdAt: '2019-08-22T08:50:55.723Z',
          image: 'statics/img/vote.jpg',
          comments: 0,
          location:{
            type : 'Point',
            coordinates: [
              126.9245586,
              37.4916004
            ]
          },
          subject:'정치',
          level: 'gugun',
          placeName: '동작구청',
          placeType: 'infoCenter',
          placeId: 'p_007',
        },
        {
          id: 'post_008',
          userName: '김낙연',
          post: '자한당에서 조국 반박 간담회를 열겠다고 하는데 이게 말이 됩니까? 투표해 봅시다.',
          like: true,
          createdAt: '2019-08-22T08:50:55.723Z',
          image: 'statics/img/vote.jpg',
          comments: 34,
          location:{
            type : 'Point',
            coordinates: [
              126.9245586,
              37.4916004
            ]
          },
          subject:'정치',
          level: 'city',
          placeName: '서울시청',
          placeType: 'infoCenter',
          placeId: 'p_008',
        },
        {
          id: 'post_009',
          userName: '강옥남',
          post: '자한당에서 조국 반박 간담회를 열겠다고 하는데 이게 말이 됩니까? 투표해 봅시다.',
          like: true,
          createdAt: '2019-08-22T08:50:55.723Z',
          image: 'statics/img/vote.jpg',
          comments: 34,
          location:{
            type : 'Point',
            coordinates: [
              127.012306,
              37.59698
            ]
          },
          subject:'정치',
          level: 'country',
          placeName: '사이버 청와대',
          placeType: 'infoCenter',
          placeId: 'p_009',
          org: '(사)한국NGO연합중앙회',
          grade: '총재',
        },
      ],
      // ***********************************************************************
      // PLACES ***************************************************************
      // ***********************************************************************
      places: [
        {
          id: 'p_001',
          type: 'place',
          level: 'country',
          subject: '일반장소',
          placeName: '천도교빌딩',
          owner:'some',
          price:1000,
          priceHistory:[],
          location:{
            type : 'Point',
            coordinates: [
              126.98614,
              37.5753145
            ]
          },
          address: {
            cityName:'서울',
            gugunName:'종로구',
            dongName:'경운동',
            bun:'88',
          },
          parent: '',
          photo: 'statics/img/building1.jpg',
        },
        {
          id: 'p_002',
          type: 'place',
          level: 'city',
          subject: '일반장소',
          placeName: '코오롱빌딩',
          owner:'some',
          price:1000,
          priceHistory:[],
          location:{
            type : 'Point',
            coordinates: [
              126.99036,
              37.4255303
            ]
          },
          address: {
            cityName:'경기도',
            gugunName:'과천시',
            dongName:'별양동',
            bun:'1-23',
          },
          parent: '',
          photo: 'statics/img/building2.jpg',
        },
        // ****************************************
        // Info Center ****************************
        // ****************************************
        {
          id: 'p_005',
          type: 'infocenter',
          level: 'dong',
          subject: '정보센터',
          placeName: '신대방2동 정보센터',
          owner:'황상익',
          price:1000,
          priceHistory:[],
          location:{
            type : 'Point',
            coordinates: [
              126.92592,
              37.498915
            ]
          },
          address: {
            cityName:'서울',
            gugunName:'동작구',
            dongName:'신대방2동',
            bun:'1-23',
          },
          parent: '',
          photo: '',
          description: '저희 신대방동은 열심히 하겠습니다.',
        },
        {
          id: 'p_007',
          type: 'infocenter',
          level: 'gugun',
          subject: '정보센터',
          placeName: '동작구 정보센터',
          owner:'강성민',
          price:1000,
          priceHistory:[],
          location:{
            type : 'Point',
            coordinates: [
              126.93946,
              37.5124201
            ]
          },
          address: {
            cityName:'서울',
            gugunName:'동작구',
            dongName:'노량진1동',
            bun:'1-23',
          },
          parent: '',
          photo: '',
          description: '저희 동작구는 열심히 하겠습니다.',
        },
        {
          id: 'p_008',
          type: 'infocenter',
          level: 'city',
          subject: '정보센터',
          placeName: '서울시 정보센터',
          owner:'우상호',
          price:1000,
          priceHistory:[],
          location:{
            type : 'Point',
            coordinates: [
              126.978339,
              37.566684
            ]
          },
          address: {
            cityName:'서울',
            gugunName:'중구',
            dongName:'태평로1가',
            bun:'31',
          },
          parent: '',
          photo: '',
          description: '저희 서울시는 열심히 하겠습니다.',
        },
        {
          id: 'p_009',
          type: 'infocenter',
          level: 'country',
          subject: '정보센터',
          placeName: '대한민국 정보센터',
          owner:'강옥남',
          price:1000,
          priceHistory:[],
          location:{
            type : 'Point',
            coordinates: [
              126.9594786,
              37.5327488
            ]
          },
          address: {
            cityName:'서울',
            gugunName:'용산구',
            dongName:'한강로3가',
            bun:'16-9',
          },
          parent: '',
          photo: '',
          description: '저희 대한민국은 열심히 하겠습니다.',
        },





        {
          id: 'p_003',
          type: 'place',
          level: 'city',
          subject: '일반장소',
          placeName: '통일당',
          owner:'김주연',
          price:1000,
          priceHistory:[],
          location:{
            type : 'Point',
            coordinates: [
              126.99036,
              37.4255303
            ]
          },
          address: {
            cityName:'경기도',
            gugunName:'과천시',
            dongName:'별양동',
            bun:'1-23',
          },
          parent: '',
          photo: '',
        },
        {
          id: 'p_004',
          type: 'place',
          level: 'city',
          subject: '일반장소',
          placeName: '다문',
          owner:'소춘수',
          price:1000,
          priceHistory:[],
          location:{
            type : 'Point',
            coordinates: [
              127.152345,
              35.813473
            ]
          },
          address: {
            cityName:'전라북도',
            gugunName:'전주시 완산구',
            dongName:'교동',
            bun:'82',
          },
          parent: '',
          photo: '',
          homeContent:'<h3>민생경제, 평화, 적폐청산을 향한 발걸음을 재촉하겠습니다.</h3> <br/> 반갑습니다. 더불어민주당 대표 이해찬입니다. <br /> 더불어민주당이 진정한 집권여당, 전국정당, 국민정당으로 <br /> 나아갈 수 있도록 지지해주신 국민 여러분과 당원 여러분께 감사드립니다..',
        },
      ],
      // ***********************************************************************
      // GROUPS ***************************************************************
      // ***********************************************************************
      groups: [
        {
          id: '0011',
          name: '통일당그룹',
          parent: '',
          child: [
            {

            },
          ],
          photo: '',
        },

      ],
      // ***********************************************************************
      // COMMENT ***************************************************************
      // ***********************************************************************
      comments: [
        {
          id: '0011',
          name: '이낙연',
          email: 'mothcar@naver.com',
          photo: 'statics/img/leenak.jpg',
          like: true,
          comment: '제주 해군기지 건설 문제는 제주특별자치도 서귀포시 강정마을에 대한민국 국방부가 주도하는 제주민군복합형관광미항과 관련된 논란이다. 2007년 대한민국 해군과 정부는 2014년까지 1조300억 원을 투입해 전투함 20여 척과 15만 톤급 크루즈선 2척이 동시에 정박할 수 있는 45만 제곱미터의 건설 계획을 내놓은 바 있다. 항만의 상주 인원은 장병과 가족을 포함해 7천5백여 명 정도가 될 것으로 예측하고 있다',
          parentPostId: '001',
          createdAt: '2019-08-25T08:50:55.723Z',
          image: 'http://yun0304.cdn3.cafe24.com/img/강정마을.jpg',
        },
        {
          id: '0011',
          name: '이낙연',
          email: 'mothcar@naver.com',
          photo: 'statics/img/leenak.jpg',
          like: true,
          comment: '제주 해군기지 건설 문제는 제주특별자치도 서귀포시 강정마을에 대한민국 국방부가 주도하는 제주민군복합형관광미항과 관련된 논란이다. 2007년 대한민국 해군과 정부는 2014년까지 1조300억 원을 투입해 전투함 20여 척과 15만 톤급 크루즈선 2척이 동시에 정박할 수 있는 45만 제곱미터의 건설 계획을 내놓은 바 있다. 항만의 상주 인원은 장병과 가족을 포함해 7천5백여 명 정도가 될 것으로 예측하고 있다',
          parentPostId: '001',
          createdAt: '2019-08-25T08:50:55.723Z',
          image: 'statics/img/greece.jpg',
        },
        {
          id: '0011',
          name: '이낙연',
          email: 'mothcar@naver.com',
          photo: 'statics/img/leenak.jpg',
          like: true,
          comment: '제주 해군기지 건설 문제는 제주특별자치도 서귀포시 강정마을에 대한민국 국방부가 주도하는 제주민군복합형관광미항과 관련된 논란이다. 2007년 대한민국 해군과 정부는 2014년까지 1조300억 원을 투입해 전투함 20여 척과 15만 톤급 크루즈선 2척이 동시에 정박할 수 있는 45만 제곱미터의 건설 계획을 내놓은 바 있다. 항만의 상주 인원은 장병과 가족을 포함해 7천5백여 명 정도가 될 것으로 예측하고 있다',
          parentPostId: '001',
          createdAt: '2019-08-25T08:50:55.723Z',
          image: 'statics/img/greece.jpg',
        },
        {
          id: '0011',
          name: '이낙연',
          email: 'mothcar@naver.com',
          photo: 'statics/img/leenak.jpg',
          like: true,
          comment: '제주 해군기지 건설 문제는 제주특별자치도 서귀포시 강정마을에 대한민국 국방부가 주도하는 제주민군복합형관광미항과 관련된 논란이다. 2007년 대한민국 해군과 정부는 2014년까지 1조300억 원을 투입해 전투함 20여 척과 15만 톤급 크루즈선 2척이 동시에 정박할 수 있는 45만 제곱미터의 건설 계획을 내놓은 바 있다. 항만의 상주 인원은 장병과 가족을 포함해 7천5백여 명 정도가 될 것으로 예측하고 있다',
          parentPostId: '001',
          createdAt: '2019-08-25T08:50:55.723Z',
          image: 'statics/img/greece.jpg',
        },
        {
          id: '0011',
          name: '이낙연',
          email: 'mothcar@naver.com',
          photo: 'statics/img/leenak.jpg',
          like: true,
          comment: '제주 해군기지 건설 문제는 제주특별자치도 서귀포시 강정마을에 대한민국 국방부가 주도하는 제주민군복합형관광미항과 관련된 논란이다. 2007년 대한민국 해군과 정부는 2014년까지 1조300억 원을 투입해 전투함 20여 척과 15만 톤급 크루즈선 2척이 동시에 정박할 수 있는 45만 제곱미터의 건설 계획을 내놓은 바 있다. 항만의 상주 인원은 장병과 가족을 포함해 7천5백여 명 정도가 될 것으로 예측하고 있다',
          parentPostId: '001',
          createdAt: '2019-08-25T08:50:55.723Z',
          image: 'statics/img/greece.jpg',
        },
      ],
      // ***********************************************************************
      // BANK ******************************************************************
      // ***********************************************************************
      bank: [
        {
          dist: 'send',   // buy
          person: 'who',  // userId
          amount: 500,
          date: '2019-08-25T08:50:55.723Z',
        },
        {
          dist: 'send',   // buy
          person: 'who',  // userId
          amount: 1500,
          date: '2019-08-25T08:50:55.723Z',
        },
        {
          dist: 'send',   // buy
          person: 'who',  // userId
          amount: 3000,
          date: '2019-08-25T08:50:55.723Z',
        },
      ],

      // ***********************************************************************
      // OTHER *****************************************************************
      // ***********************************************************************

    } // _data
  }
}
