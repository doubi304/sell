<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" v-bind:src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon" v-bind:class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div class="support-count" v-if="seller.supports" v-on:click="showDetail">
        <span class="count">{{seller.supports.length}}个 ></span>
      </div>
    </div>
    <div class="bulletin-wrapper" v-on:click="showDetail">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
    </div>
    <div class="bground">
      <img v-bind:src="seller.avatar" width="100%" height="100%">
    </div>
    <transition name="fade">
    <div class="detail" v-show="detailShow">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
          <div class="star-wrapper">
            <star v-bind:size="48" v-bind:score="4"></star>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul class="supports" v-if="seller.supports">
            <li class="support-item" v-for="(item,index) in seller.supports" v-bind:key="index">
              <span class="icon" v-bind:class="classMap[seller.supports[index].type]"></span>
              <span class="text">{{seller.supports[index].description}}</span>
            </li>
          </ul>
          <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="bulletin">
            <p class="content">{{seller.bulletin}}</p>
          </div>
        </div>
      </div>
        <div class="detail-close" v-on:click="hideDetail">X</div>
    </div>
    </transition>
  </div>
</template>
<script>
import star from './../star/star.vue';
export default {
  props: {
    seller: {
      type: Object
    }
  },
  methods: {
    showDetail: function () {
      this.detailShow = true;
    },
    hideDetail: function () {
      this.detailShow = false;
    }
  },
  created: function () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  },
  components: {
    star
  },
  data: function () {
      return {
           detailShow: false
      };
  }
};
</script>
<style>
.header{
  color: white;
  position: relative;
  background-color: rgba(7, 17, 27, 0.5);
  overflow: hidden;
}
 .content-wrapper {
  padding: 24px 12px 18px 24px;
  font-size: 0;
  position: relative;
}
.content-wrapper .avatar {
  display: inline-block;
  vertical-align: top;
}
.content-wrapper .avatar img{
  border-radius: 2px;
}
.content-wrapper .content {
  display: inline-block;
  /* font-size: 14px; */
  margin-left: 16px;
}
.content-wrapper .content .title{
  margin: 2px 0 8px 0;
}
.content-wrapper .content .title .brand{
  display: inline-block;
  width: 30px;
  height: 18px;
  background-image: url(brand@2x.png);
  background-size: 30px 18px;
  background-repeat: no-repeat;
  vertical-align: top;
}
.content-wrapper .content .title .name{
  margin: 6px;
  font-size: 16px;
  line-height: 18px;
  font-weight: bold;
}
@media (-webkit-min-deivce-pixel-ratio:3),(min-deivce-pixel-ratio:3)
{
 .content-wrapper .content .title .brand{
    background-image: url(brand@3x.png);
}
 .content-wrapper .content .support .icon .decrease{
   background-image: url(decrease_1@3x.png);
 }
 .bulletin-wrapper .bulletin-title{
   background-image: url(bulletin@3x.png);
 }
}
.content-wrapper .content .description{
  margin-bottom: 10px;
  font-size: 12px;
  /* line-height: 12px; */
}
.content-wrapper .content .support .icon{
   display: inline-block;
   vertical-align: top;
   width: 16px;
   height: 16px;
   margin-right: 6px;
   background-size: 16px 16px;
   background-repeat: no-repeat;
}
.content-wrapper .content .support .decrease{
   background-image: url(decrease_1@2x.png);
}
.content-wrapper .content .support .discount{
   background-image: url(discount_1@2x.png);
}
.content-wrapper .content .support .guarantee{
   background-image: url(guarantee_1@2x.png);
}
.content-wrapper .content .support .invoice{
   background-image: url(invoice_1@2x.png);
}
.content-wrapper .content .support .special{
   background-image: url(special_1@2x.png);
}
.content-wrapper .content .support .text{
  display: inline-block;
  font-size: 12px;
  line-height: 12px;
}
.content-wrapper .support-count{
  position: absolute;
  right: 12px;
  bottom: 16px;
  padding: 0px 10px 0px 10px;
  height: 24px;
  line-height: 24px;
  border-radius: 14px;
  background-color: rgba(0,0,0,0.4);
  text-align: center;
}
.content-wrapper .support-count .count{
  font-size: 14px;
}
.bulletin-wrapper{
  width: 100%;
  height: 28px;
  line-height: 28px;
  padding:0 22px 0 12px;
  background-color: rgba(7,17,27,0.2);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.bulletin-wrapper .bulletin-title{
  display: inline-block;
  vertical-align: top;
  margin-top: 9px;
  width: 22px;
  height: 12px;
  background-size: 22px 12px;
  background-image: url(bulletin@2x.png);
}
.bulletin-wrapper .bulletin-text{
  font-size: 12px;
}
.bground{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  filter: blur(10px);
}
.detail{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(7,17,27,0.8);
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
/* 由于wrapper已经占满了本身的页面，
footer会将页面继续撑开，因此想要页面保持原本大小，
那应该设置margin-top为负，将它网上移，
移的距离看具体设置和需求
*/
.detail .detail-wrapper{
  width: 100%;
  min-height: 100%;
}
.detail .detail-wrapper .detail-main{
  margin-top: 64px;
  padding-bottom: 64px;
  /* background-color: red; */
}
.detail .detail-close{
  width: 32px;
  height: 64px;
  margin: -64px auto 0 auto;
  clear: both;
  font-size: 32px;
}
.detail .detail-wrapper .detail-main .name{
  line-height: 16px;
  font-size: 16px;
  text-align: center;
  font-weight: 700;
}
.detail .detail-wrapper .detail-main .star-wrapper{
  margin-top: 18px;
  padding: 2px 0;
  text-align: center;
}
.detail .detail-wrapper .detail-main .title{
  display: flex;
  width: 80%;
  margin:30px auto;
}
.detail .detail-wrapper .detail-main .title .line{
  flex: 1;
  position: relative;
  top: -7px;
  border-bottom: 1px solid rgba(255,255,255,0.2);
}
.detail .detail-wrapper .detail-main .title .text{
  font-size: 14px;
  padding: 0 14px;
}
.detail .detail-wrapper .detail-main .supports{
  width: 80%;
  margin:0 auto;
}
.detail .detail-wrapper .detail-main .supports .support-item{
  padding: 0 12px;
  margin-bottom: 12px;
  font-size: 0;
}
.detail .detail-wrapper .detail-main .supports .support-item:last-child{
  margin-bottom: 0;
}
.detail .detail-wrapper .detail-main .supports .support-item .text{
  line-height: 16px;
  font-size: 12px;
}
.detail .detail-wrapper .detail-main .supports .support-item .icon{
   display: inline-block;
   vertical-align: top;
   width: 16px;
   height: 16px;
   margin-right: 6px;
   background-size: 16px 16px;
   background-repeat: no-repeat;
}
.detail .detail-wrapper .detail-main .supports .support-item .decrease{
   background-image: url(decrease_2@2x.png);
}
.detail .detail-wrapper .detail-main .supports .support-item .discount{
   background-image: url(discount_2@2x.png);
}
.detail .detail-wrapper .detail-main .supports .support-item .guarantee{
   background-image: url(guarantee_2@2x.png);
}
.detail .detail-wrapper .detail-main .supports .support-item .invoice{
   background-image: url(invoice_2@2x.png);
}
.detail .detail-wrapper .detail-main .supports .support-item .special{
   background-image: url(special_2@2x.png);
}
.detail .detail-wrapper .detail-main .bulletin{
  width: 80%;
  margin: 0 auto;
}
.detail .detail-wrapper .detail-main .bulletin .content{
  padding: 0 12px;
  line-height: 24px;
  font-size: 12px;
}
</style>