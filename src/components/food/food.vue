<template>
<transition name="move">
  <div class="food" v-show="showFlag" ref="food">
      <div class="food-content">
          <div class="image-header">
              <img v-bind:src="food.image">
              <div class="back" v-on:click="hide">
                  <span class="arrow"> 返回 </span>
              </div>
          </div>
          <div class="content">
              <h1 class="title">{{food.name}}</h1>
              <div class="extra">
                  <span class="sell-count">月售{{food.sellCount}}份</span>
                  <span class="rating">好评率{{food.rating}}</span>
              </div>
              <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span v-show="food.oldPrice" class="old">{{food.oldPrice}}</span>
            </div>
            <div class="carcontrol-wrapper">
              <carcontrol v-bind:food="food"></carcontrol>
          </div>
          <div class="buy" v-show="!food.count || food.count === 0" v-on:click="addOne($event)">加入购物车</div>
          </div>
          <split></split>
          <div class="info" v-show="food.info">
            <h1 class="title">商品信息</h1>
            <p class="text">{{food.info}}</p>
           </div>
        <div class="rating">
            <h1 class="title">商品评价</h1>
            <ratingselect v-on:ratingtypeSelect="getType" v-on:contentToggle="getOnlyContent" v-bind:desc="desc" v-bind:ratings="food.ratings"></ratingselect>
            <div class="rating-wrapper">
                <ul v-show="food.ratings && food.ratings.length">
                    <li class="rating-item" v-show="needShow(rating.rateType, rating.text)" v-for="(rating,index) in food.ratings" v-bind:key="index">
                        <div class="user">
                            <span class="name">{{rating.username}}</span>
                            <img v-bind:src="rating.avatar" alt="" class="avatar" width="12" height="12">
                        </div>
                        <div class="time">{{rating.rateTime | formatDate}}</div>
                        <p class="text">
                            <span v-bind:class="{'up': rating.rateType === 0, 'down': rating.rateType === 1}"></span>
                             <span class="text">{{rating.text}}</span>
                        </p>
                    </li>
                </ul>
                <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
            </div>
        </div>
      </div>
  </div>
</transition>
</template>

<script>
import Vue from 'vue';
import Bscroll from 'better-scroll';
import carcontrol from '../carcontrol/carcontrol.vue';
import split from '../split/split.vue';
import ratingselect from '../ratingselect/ratingselect.vue';
import '../../common/js/time.js';
// const POSITIVE = 0;
// const NEGATIVE = 1;
const ALL = 2;
export default {
 props: {
     food: {
         type: Object
     }
 },
 data () {
     return {
         showFlag: false,
         selectType: ALL,
         onlyContent: true,
         desc: {
             all: '全部',
             positive: '推荐',
             negative: '吐槽'
         }
     };
 },
 methods: {
     show () {
         this.showFlag = true;
         this.selectType = ALL;
         this.onlyContent = true;
         if (this.showFlag) {
             this.$nextTick(() => {
                   if (!this.scroll) {
                   this.scroll = new Bscroll(this.$refs.food, {click: true});
                 }
            });
         }
     },
     hide () {
         this.showFlag = false;
     },
     addOne (event) {
        Vue.set(this.food, 'count', 1);
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
     },
     getType (t) {
         this.selectType = t;
     },
     getOnlyContent (m) {
        this.onlyContent = m;
     }
 },
 components: {
     carcontrol,
     split,
     ratingselect
 }
};
</script>

<style>
.food{
    position: fixed;
    left: 0;
    top: 0;
    bottom: 48px;
    z-index: 30;
    width: 100%;
    background-color: #fff;
}
.move-enter-active, .move-leave-active {
  transition: all 0.5s;
}
.move-enter, .move-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(100%);
}
.food .food-content .image-header{
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 100%;
}
.food .food-content .image-header img{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
.food .food-content .image-header .back{
    position: absolute;
    top: 10px;
    left: 10px;
}

.food .food-content .image-header .back .arrow{
    display: block;
    padding: 10px;
    font-size: 16px;
    color: #fff;
}
.food .food-content .content{
   position: relative;
   padding: 18px;
}
.food .food-content .content .title{
    line-height: 14px;
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 700;
    color: rgb(7,17,27);
}
.food .food-content .content .extra{
    margin-bottom: 18px;
    line-height: 10px;
    /* font-size: 0; */
}
.food .food-content .content .extra .sell-count{
    font-size: 10px;
    color: rgb(147,153,159);
    margin-right: 12px;
}
.food .food-content .content .extra .rating{
    font-size: 10px;
    color: rgb(147,153,159);
}
.food .food-content .content .price{
  font-weight: 700;
  line-height: 24px;
}
.food .food-content .content .price .now{
  margin-right: 8px;
  font-size: 14px;
  color: rgb(240,20,20);
}
.food .food-content .content .price .old{
  text-decoration: line-through;
  font-size: 10px;
  color: rgb(147, 153, 159);
}
.food .food-content .carcontrol-wrapper{
    position: absolute;
    right: 12px;
    bottom: 18px;
}
.food .food-content .buy{
    position: absolute;
    right: 12px;
    bottom:18px;
    z-index: 10;
    height: 24px;
    line-height: 24px;
    padding: 0 12px;
    box-sizing: border-box;
    font-size: 10px;
    border-radius: 12px;
    color: #fff;
    background-color: rgb(0,160,220);
}
.food .info{
    padding: 18px;
}
.food .info .title{
    line-height: 14px;
    margin-bottom: 6px;
    font-size: 14px;
    color: rgb(7,17,27);
}
.food .info .text{
    line-height: 24px;
    padding: 0 8px;
    font-size: 12px;
    color: rgb(77,85,93);
}
.food .rating{
    padding-top: 18px;
}
.food .rating .title{
    line-height: 14px;
    margin-left: 18px;
    font-size: 14px;
    color: rgb(7,17,27);
}
.food .rating .rating-wrapper{
    padding: 0 18px;
}
.food .rating .rating-wrapper .rating-item{
    position: relative;
    padding: 16px 0;
    border-bottom: 1px solid rgba(7,17,27,0.1);
}
.food .rating .rating-wrapper .rating-item .user{
    position:absolute;
    right: 0;
    top: 16px;
    line-height: 12px;
    font-size: 0;
}
.food .rating .rating-wrapper .rating-item .user .name{
    display: inline-block;
    margin-right: 6px;
    vertical-align: top;
    font-size: 10px;
    color: rgb(147,153,159);
}
.food .rating .rating-wrapper .rating-item .user .avatar{
    border-radius: 50%;
}
.food .rating .rating-wrapper .rating-item .time{
    margin-bottom: 6px;
    line-height: 12px;
    font-size: 10px;
    color: rgb(147,153,159);
}
.food .rating .rating-wrapper .rating-item .text{
    line-height: 16px;
    font-size: 12px;
    color: rgb(7, 17, 27);
}
.food .rating .rating-wrapper .rating-item .text .up{
    margin-right: 4px;
    line-height: 24px;
    font-size: 12px;
    color: rgb(0,160,220);
}
.food .rating .rating-wrapper .rating-item .text .down{
    margin-right: 4px;
    line-height: 24px;
    font-size: 12px;
    color: rgb(147,153,159);
}
.food .rating .no-rating{
    padding: 16px 0;
    font-size: 12p;
    color: rgb(147,153,159);
}
</style>
