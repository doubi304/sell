<template>
   <div class="seller" ref="sell">
     <div class="seller-content">
     <div class="overview">
       <h1 class="title">{{seller.name}}</h1>
       <div class="desc">
         <star v-bind:size="36" v-bind:score="seller.score" class="star"></star>
         <span class="text">({{seller.ratingCount}})</span>
         <span class="text">月售{{seller.sellCount}}单</span>
       </div>
       <ul class="remark">
         <li class="block">
           <h2>起送价</h2>
           <div class="content">
             <span class="stress">{{seller.minPrice}}</span>
           </div>
         </li>
         <li class="block">
           <h2>商家配送</h2>
           <div class="content">
             <span class="stress">{{seller.deliveryPrice}}</span>
           </div>
         </li>
         <li class="block">
           <h2>平均配送时间</h2>
           <div class="content">
             <span class="stress">{{seller.deliveryTime}}</span>
           </div>
         </li>
       </ul>
       <div class="collect" v-on:click="collectFlag=!collectFlag">
            <span class="icon-favorite" :class="{'active':collectFlag}">收藏</span>
            <span class="text">{{collectFlag?'已收藏':'收藏'}}</span>
       </div>
     </div>
     <split></split>
     <div class="bulletin">
       <h1 class="title">公告与活动</h1>
       <div class="content-wrapper">
         <p class="content">{{seller.bulletin}}</p>
       </div>
       <ul class="supports" v-if="seller.supports">
            <li class="support-item" v-for="(item,index) in seller.supports" v-bind:key="index">
              <span class="icon" v-bind:class="classMap[seller.supports[index].type]"></span>
              <span class="text">{{seller.supports[index].description}}</span>
            </li>
        </ul>
     </div>
     <split></split>
     <div class="seller-imgs">
        <h1 class="title">商家实景</h1>
        <div class="img-wrapper" ref="picsWrapper">
          <div class="img-item" ref="picList">
            <img v-for="(pic,index) in seller.pics" v-bind:key="index" v-bind:src="pic" width="120" height="90">
          </div>
        </div>
      </div>
     <split></split>
      <div class="info">
        <h1 class="title">商家信息</h1>
        <ul>
          <li class="info-item" v-for="(info,index) in seller.infos" v-bind:key="index">
            {{info}}
          </li>
        </ul>
      </div>
   </div>
   </div>
</template>
<script>
import star from './../star/star.vue';
import split from '../split/split.vue';
import Bscroll from 'better-scroll';
export default {
   props: {
     seller: {
       type: Object
     }
   },
   data () {
      return {
        collectFlag: false
      };
   },
   components: {
     star,
     split
   },
   created: function () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    this.$nextTick(() => {
      this.scroll = new Bscroll(this.$refs.sell, {click: true});
      this.scrollX();
    });
    // 由于seller此时是异步获取，获取不到高度W
  },
  methods: {
    scrollX () {
       if (this.seller.pics) {
       const PIC_WIDTH = 120;
       const MARGIN = 6;
       let picLen = this.seller.pics.length;
       this.$refs.picList.style.width = PIC_WIDTH * picLen + MARGIN * (picLen - 1) + 'px';
       this.picsScroll = new Bscroll(this.$refs.picsWrapper, {
            scrollX: true
         });
      }
    }
  }
};
</script>
<style>
li{
  list-style: none;
}
.seller{
  position: absolute;
  top: 176px;
  left: 0;
  bottom: 0;
  width: 100%;
  overflow: hidden;
}
.seller .overview{
  padding: 18px;
}
.seller .overview .title{
  margin-bottom: 8px;
  line-height: 14px;
  color: rgb(7,17,27);
  font-size: 14px;
}
.seller .overview .desc{
  padding-bottom: 18px;
  border-bottom: 1px solid rgba(7,17,27,0.1);
  font-size: 0;
}
.seller .overview .desc .star{
  display: inline-block;
  margin-right: 8px;
  vertical-align: top;
}
.seller .overview .desc .text{
  margin-right: 12px;
  display: inline-block;
  vertical-align: top;
  line-height: 18px;
  font-size: 10px;
  color: rgb(77,85,93);
}
.seller .overview .remark{
  display: flex;
  padding-top: 18px;
}
.seller .overview .remark .block{
  flex: 1;
  text-align: center;
  border-right: 1px solid rgba(7,17,27,0.1);
}
.seller .overview .remark .block:last-child{
  border-right: none;
}
.seller .overview .remark .block h2{
  margin-bottom: 4px;
  line-height: 10px;
  font-size: 12px;
  color: rgb(147,153,159);
}
.seller .overview .remark .block .content{
  line-height: 24px;
  font-size: 12px;
  color: (7,17,27);
}
.seller .overview .remark .block .content .stress{
  font-size: 24px;
}
.seller .overview .collect{
  position: absolute;
  top: 18px;
  right: 8px;
  width: 50px;
  text-align: center;
}
.seller .overview .collect .icon-favorite{
  font-size: 24px;
  line-height: 24px;
  color: #d4d6d9;
}
.seller .overview .collect .active{
  color: rgb(240,20,20);
}
.seller .overview .collect .text{
  display: block;
  font-size: 12px;
  color: rgb(77,85,93);
  line-height: 10px;
  padding-top: 4px;
}
.seller .bulletin{
  padding: 18px 18px 0 18px;
}
.seller .bulletin .title{
  margin-bottom: 8px;
  line-height: 14px;
  color:rgb(7,17,27);
  font-size: 14px;
}
.seller .bulletin .content-wrapper{
  padding: 0 12px 16px 12px;
  border-bottom: 1px solid rgba(7,17,27,0.1);
}
.seller .bulletin .content-wrapper .content{
  line-height: 24px;
  font-size: 12px;
  color: rgb(240,20,20);
}
.seller .bulletin .supports .support-item{
  padding: 16px 12px;
  font-size: 0;
  border-bottom: rgba(7,17,27,0.1);
}
.supports .support-item .icon{
   display: inline-block;
   vertical-align: top;
   width: 16px;
   height: 16px;
   margin-right: 6px;
   background-size: 16px 16px;
   background-repeat: no-repeat;
}
 .supports .support-item .decrease{
   background-image: url(decrease_4@2x.png);
}
 .supports .support-item .discount{
   background-image: url(discount_4@2x.png);
}
 .supports .support-item .guarantee{
   background-image: url(guarantee_4@2x.png);
}
 .supports .support-item .invoice{
   background-image: url(invoice_4@2x.png);
}
.supports .support-item .special{
   background-image: url(special_4@2x.png);
}
.supports .support-item .text{
  font-size: 12px;
  line-height: 16px;
  color: rgb(7,17,27);
}
.seller .seller-imgs{
  padding: 18px;
}
.seller .seller-imgs .title{
  margin-bottom: 12px;
  line-height: 14px;
  color: rgb(7,17,27);
  font-size: 14px;
}
/* .seller .pics .pic-wrapper{
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
} */
.seller .seller-imgs .img-wrapper{
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  font-size: 0;
}
.seller .seller-imgs .img-wrapper .img-item{
  font-size: 0;
}
.seller .seller-imgs .img-wrapper img{
  display: inline-block;
  margin-right: 10px;
  width: 120px;
  height: 90px;
}
.seller .info{
  padding: 18px 18px 0 18px;
}
.seller .info .title{
  padding-bottom: 14px;
  line-height: 14px;
  border-bottom: 1px solid rgba(7,17,27,0.1);
  font-size: 14px;
}
.seller .info .info-item{
  padding: 16px 12px;
  line-height: 16px;
  border-bottom: 1px solid rgba(7,17,27,0.1);
  font-size: 14px;
}
.seller .info .info-item:last-child{
  border: none;
}
</style>
