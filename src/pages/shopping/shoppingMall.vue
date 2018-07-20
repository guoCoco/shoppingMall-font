<template>
  <div>
    <div class="search-bar">
      <van-row>
          <van-col span="3"><img :src="locationIcon" width="70%"></van-col>
          <van-col span="16"><input type="text" class="search-input"/></van-col>
          <van-col span="5"><van-button size="mini">查找</van-button></van-col>
      </van-row>
    </div>
    <div class="swiper-area">
      <van-swipe :autoplay="200000">
          <van-swipe-item v-for="(banner,index) in bannerPicArray" :key="index">
              <img :src="banner.imageUrl" width="100%"/>
          </van-swipe-item>
      </van-swipe>
    </div>
    <div class="type-bar">
      <div  v-for="(cate,index) in category" :key="index" >
        <img :src="cate.image" width="90%" />
        <span>{{cate.mallCategoryName}}</span>
      </div>
    </div>
    <!--AD banner area-->
    <div class="ad-banner">
      <img :src="adBanner.PICTURE_ADDRESS" width="100%">
    </div>
    <!--Recommend goods area-->
    <div class="recommend-area">
        <div class="recommend-title">
            商品推荐
        </div>
        <div class="recommend-body">
           <!--swiper-->
          <swiper :options="swiperOption">
            <swiper-slide v-for=" (item ,index) in recommendGoods" :key="index">
              <div class="recommend-item">
                <img :src="item.image" width="80%" />
                <div>{{item.goodsName}}</div>
                <div>￥{{item.price}} (￥{{item.mallPrice}})</div>
              </div>
            </swiper-slide>
          </swiper>
        </div>
    </div>
    <!--floor one area-->
    <div class="floor">
      <floorComponent :floor1='floor1' :floorTitle='floorName.floor1'></floorComponent>
      <floorComponent :floor1='floor2' :floorTitle='floorName.floor2'></floorComponent>
      <floorComponent :floor1='floor3' :floorTitle='floorName.floor3'></floorComponent>
    </div>
     <div class="hot-area">
      <div class="hot-title">热卖商品</div>
      <div class="hot-goods">
        <van-list>
          <van-row gutter="20">
            <van-col span="12" v-for="( item, index) in hotGoods" :key="index">
              <goods-info :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.price"></goods-info>
            </van-col>
          </van-row>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import floorComponent from '../common/floorComponent'
import goodsInfo from '../common/goodsInfoComponent'
export default {
  name: 'shoppingMall',
  components: {
    swiper,
    swiperSlide,
    floorComponent,
    goodsInfo
  },
  data () {
    return {
      locationIcon: require('../../assets/img/loacation.png'),
      bannerPicArray: [
        {imageUrl: require('../../assets/img/banner1.jpg')},
        {imageUrl: require('../../assets/img/banner2.jpg')},
        {imageUrl: require('../../assets/img/banner3.jpg')}
      ],
      category: [],
      adBanner: '',
      recommendGoods: '',
      swiperOption: {
        slidesPerView: 3
      },
      floor1: [],
      floor2: [],
      floor3: [],
      floorName: {},
      hotGoods: []
    }
  },
  created () {
    this.$http.run('getInitData', null, (res) => {
      this.category = res.data.category
      this.adBanner = res.data.advertesPicture
      this.recommendGoods = res.data.recommend
      this.floor1 = res.data.floor1
      this.floor2 = res.data.floor2
      this.floor3 = res.data.floor3
      this.floorName = res.data.floorName
      this.hotGoods = res.data.hotGoods
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.search-bar{
  height: 2.2rem;
  background-color: #e5017d;
  line-height:2.2rem;
}
.search-input{
      width:100%;
      height: 1.3rem;
      border-top:0px;
      border-left:0px;
      border-right:0px;
      border-bottom: 1px solid 1px !important ;
      background-color: #e5017d;
      color:#fff;
  }
  .location-icon{
      padding-top: .2rem;
      padding-left: .3rem;
  }
  .swiper-area{
      width:100%;
      clear:both;
      vertical-align:middle;
  }
   .type-bar{
      background-color: #fff;
      margin:0 .3rem .3rem .3rem;
      border-radius: .3rem;
      font-size:14px;
      display: flex;
      flex-direction:row;
      flex-wrap:nowrap;
  }
  .type-bar div{
      padding: .3rem;
      font-size: 12px;
      text-align: center;
  }
  .recommend-area{
       background-color: #fff;
       margin-top: .3rem;
  }
  .recommend-title{
      border-bottom:1px solid #eee;
      font-size:14px;
      padding:.2rem;
      color:#e5017d;
  }
   .recommend-body{
       border-bottom: 1px solid #eee;
   }

  .recommend-item{
      width:99%;
      border-right: 1px solid #eee;
      font-size: 12px;
      text-align: center;
  }
  .hot-area{
      text-align: center;
      font-size:14px;
      height: 1.8rem;
      line-height:1.8rem;
  }
</style>
