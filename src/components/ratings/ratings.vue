<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
        <div class="overview">
          <div class="overview-left">
            <h1 class="score">{{seller.score}}</h1>
            <div class="title">综合评分</div>
            <div class="rank">高于周边商家{{seller.rankRate}}%</div>
          </div>
          <div class="overview-right">
              <div class="score-wrapper">
                   <span class="title">服务态度</span>
                    <star class="star" v-bind:size="36" v-bind:score="seller.serviceScore"></star>
                    <span class="score">{{seller.foodScore}}</span>
              </div>
              <div class="score-wrapper">
                   <span class="title">商品评分</span>
                    <star class="star" v-bind:size="36" v-bind:score="seller.foodScore"></star>
                    <span class="score">{{seller.foodScore}}</span>
              </div>
              <div class="delivery-wrapper">
                   <span class="title">送达时间</span>
                    <span class="delivery">{{seller.deliveryTime}}</span>
              </div>
          </div>
        </div>
        <split></split>
        <ratingselect v-on:ratingtypeSelect="getType" v-on:contentToggle="getOnlyContent" v-bind:ratings="ratings"></ratingselect>
        <div class="rating-wrapper">
          <ul>
            <li v-for="(rating,index) in ratings" v-bind:key="index" class="rating-item" v-show="needShow(rating.rateType, rating.text)">
              <div class="avatar">
                <img v-bind:src="rating.avatar" width="28" height="28">
              </div>
              <div class="content">
                <h1 class="name">{{rating.username}}</h1>
                <div class="star-wrapper">
                  <star v-bind:size="24" v-bind:score="rating.score" class="star"></star>
                  <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟</span>
                </div>
                <p class="text">{{rating.text}}</p>
                <div class="recommend" v-show="rating.recommend &&rating.recommend.length">
                  <span class="up"></span>
                  <span class="item" v-for="(item,index) in rating.recommend" v-bind:key="index">{{item}}</span>
                </div>
                <div class="time">
                  {{rating.rateTime | formatDate}}
                </div>
              </div>
            </li>
          </ul>
        </div>
    </div>
  </div>
</template>

<script>
import star from './../star/star.vue';
import split from '../split/split.vue';
import ratingselect from '../ratingselect/ratingselect.vue';
import axios from 'axios';
import '../../common/js/time.js';
import Bscroll from 'better-scroll';
const ALL = 2;
export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
             ratings: [],
             showFlag: false,
             selectType: ALL,
             onlyContent: true
      };
    },
    created () {
     axios.get('../static/data.json').then((res) => {
        this.ratings = res.data.ratings;
        this.$nextTick(() => {
        this.scroll = new Bscroll(this.$refs.ratings, {click: true});
      });
    });
    },
    methods: {
     getType (t) {
         this.selectType = t;
     },
     getOnlyContent (m) {
        this.onlyContent = m;
     },
     needShow (type, text) {
         if (this.onlyContent && !text) {
            return false;
         }
         if (this.selectType === ALL) {
             return true;
         } else {
             return type === this.selectType;
         }
     }
    },
    components: {
      star,
      split,
      ratingselect
    }
};
</script>

<style>
.ratings{
  position: absolute;
  top: 176px;
  left: 0;
  bottom: 0;
  width: 100%;
  overflow: hidden;
}
.ratings .overview{
  display: flex;
  padding: 18px 0;
}
.ratings .overview .overview-left{
  flex: 0 0 137px;
  padding: 6px 0;
  border-right: 1px solid rgba(7,17,27,0.1);
  text-align: center;
}
.ratings .overview .overview-left .score{
  line-height: 28px;
  font-size: 24px;
  color: rgb(255,153,0);
}
.ratings .overview .overview-left .title{
  margin-bottom: 6px;
  line-height: 12px;
  font-size: 12px;
  color: rgb(7,17,27);
}
.ratings .overview .overview-left .rank{
  line-height: 10px;
  font-size: 10px;
  color: rgb(147,153,159);
  padding-bottom: 16px;
}
.ratings .overview .overview-right{
  flex: 1;
  padding: 6px 0 6px 24px;
}
.ratings .overview .overview-right .score-wrapper{
  margin-bottom: 8px;
  line-height: 18px;
  font-size: 0;
}
.ratings .overview .overview-right .score-wrapper .title{
  font-size: 12px;
  line-height: 18px;
  color: rgb(7,17,27);
}
.ratings .overview .overview-right .score-wrapper .star{
  display: inline-block;
  margin: 0 12px;
  vertical-align: top;
}
.ratings .overview .overview-right .score-wrapper .score{
  display: inline-block;
  line-height: 18px;
  vertical-align: top;
  font-size: 12px;
  color: rgb(255,153,0);
}
.ratings .overview .overview-right .delivery-wrapper{
  font-size: 0;
}
.ratings .overview .overview-right .delivery-wrapper .title{
  font-size: 12px;
  line-height: 18px;
  color: rgb(7,17,27);
}
.ratings .overview .overview-right .delivery-wrapper .delivery{
  margin-left: 12px;
  font-size: 12px;
  color: rgb(147,153,159);
}
.ratings .rating-wrapper{
  padding: 0 18px;
}
.ratings .rating-wrapper .rating-item{
  display: flex;
  padding: 18px 0;
  border-bottom: 1px solid rgba(7,17,27,0.1);
}
.ratings .rating-wrapper .rating-item .avatar{
  flex: 0 0 28px;
  width: 28px;
  margin-right: 12px;
}
.ratings .rating-wrapper .rating-item img{
  border-radius: 50%;
}
.ratings .rating-wrapper .rating-item .content{
  position: relative;
  flex: 1;
}
.ratings .rating-wrapper .rating-item .content .name{
  margin-bottom: 4px;
  line-height: 12px;
  font-size: 12px;
}
.ratings .rating-wrapper .rating-item .content .star-wrapper{
  margin-bottom: 6px;
  font-size: 0;
}
.ratings .rating-wrapper .rating-item .content .star-wrapper .star{
  display: inline-block;
  margin-right: 6px;
  vertical-align: top;
}
.ratings .rating-wrapper .rating-item .content .star-wrapper .delivery{
  display: inline-block;
  vertical-align: top;
  font-size: 14px;
  color: rgb(147,153,159);
}
.ratings .rating-wrapper .rating-item .content .text{
  margin-bottom: 18px;
  line-height: 18px;
  color: rgb(7,17,27);
  font-size: 14px;
}
.ratings .rating-wrapper .rating-item .content .recommend{
  line-height: 16px;
}
.ratings .rating-wrapper .rating-item .content .recommend .up,
.ratings .rating-wrapper .rating-item .content .recommend .item{
  display: inline-block;
  margin: 0 8px 4px 0;
  font-size: 12px;
}
.ratings .rating-wrapper .rating-item .content .recommend .up{
  color: rgb(0,160,220);
}
.ratings .rating-wrapper .rating-item .content .recommend .item{
  padding: 0 6px;
  border: 1px solid rgba(7,17,27,0.1);
  border-radius: 2px;
  color: rgb(147,153,159);
  background-color: #fff;
}
.ratings .rating-wrapper .rating-item .content .time{
  position: absolute;
  top: 0;
  right: 0;
  line-height: 12px;
  font-size: 12px;
  color: rgb(147,153,159);
}
</style>
