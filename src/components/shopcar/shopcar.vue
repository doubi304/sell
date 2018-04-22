<template>
<div class="nothing">
  <div class="shopcar">
      <div class="content">
          <div class="content-left" v-on:click="toggleList">
              <div class="logo-wrapper">
                  <div class="logo" v-bind:class="{'highlight' : totalCount > 0}">
                      <span class="icon-shopping_cart" v-bind:class="{'highlight' : totalCount > 0}"></span>
                  </div>
                  <div class="num" v-show="totalCount != 0">{{totalCount}}</div>
              </div>
              <div class="price" v-bind:class="{'highlight' : totalCount > 0}">{{totalPrice}}</div>
              <div class="desc">另需配送费 ￥{{deliveryPrice}}元</div>
          </div>
          <div class="content-right" v-on:click="pay">
              <div class="pay" v-bind:class="payClass">
                  {{payDesc}}
              </div>
          </div>
      </div>
      <transition name="fold">
      <div class="shopcar-list" v-show="fold">
          <div class="list-header">
              <div class="title">购物车</div>
              <span class="empty" v-on:click="empty">清空</span>
          </div>
          <div class="list-content" ref="listContent">
              <ul>
                  <li class="food" v-for="(food,index) in selectFoods" v-bind:key="index">
                      <span class="name">{{food.name}}</span>
                      <div class="price">
                          <span>￥{{food.price * food.count}}</span>
                      </div>
                      <div class="carcontrol-wrapper">
                          <carcontrol v-bind:food="food"></carcontrol>
                      </div>
                  </li>
              </ul>
          </div>
      </div>
      </transition>
  </div>
  <transition name="fade-backdrop">
         <div class="listMask" v-show="fold" v-on:click="hideBackdrop"></div>
       </transition>
</div>
</template>
<script>
import carcontrol from '../carcontrol/carcontrol.vue';
import Bscroll from 'better-scroll';
export default {
    props: {
        selectFoods: {
            type: Array,
            default () {
                return [];// 数组/对象的默认值应当由一个工厂函数返回
            }
        },
        deliveryPrice: {
            type: Number,
            default: 0
        },
        minPrice: {
            type: Number,
            default: 0
        }
    },
    data () {
        return {
            fold: false
        };
    },
    computed: {
        totalPrice () {
            // console.log(food.count);
            let total = 0;
            this.selectFoods.forEach((food) => {
                total += food.price * food.count;
            });
            return total;
        },
        totalCount () {
            let count = 0;
            this.selectFoods.forEach((food) => {
                count += food.count;
            });
            return count;
        },
        payDesc () {
            if (this.totalPrice === 0) {
                return `￥${this.totalPrice}元起送`;
            } else if (this.totalPrice < this.minPrice) {
                let rest = this.minPrice - this.totalPrice;
                return `还差￥${rest}元起送`;
            } else {
                return '去结算';
            }
        },
        payClass () {
            if (this.minPrice < this.totalPrice) {
                return 'enough';
            }
        }
    },
    methods: {
       toggleList () {
           if (!this.totalCount) {
               return;
           } else {
           this.fold = !this.fold;
         }
         if (this.fold) {
             this.$nextTick(() => {
                this.scroll = new Bscroll(this.$refs.listContent, {click: true});
             });
         }
       },
       empty () {
           this.selectFoods.forEach((food) => {
                food.count = 0;
           });
       },
       hideBackdrop () {
           this.fold = false;
       },
       pay () {
           if (this.minPrice > this.totalPrice) {
                return;
            }
            window.alert(`支付${this.totalPrice}元`);
       }
    },
    components: {
        carcontrol
    }
};
</script>
<style>
.shopcar{
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 80;
    width: 100%;
    height: 48px;
}
.shopcar .content{
    display: flex;
    background-color: #141d27;
}
.shopcar .content .content-left{
    flex: 1;
}
.shopcar .content .content-left .logo-wrapper{
    display: inline-block;
    position: relative;
    vertical-align: top;
    top: -10px;
    margin: 0 12px;
    padding: 6px;
    width: 56px;
    height: 56px;
    box-sizing: border-box;
    border-radius: 50%;
    background-color: #141d27;
}
.shopcar .content .content-left .logo-wrapper .num{
    position: absolute;
    top: 0;
    right: 0;
    width: 24px;
    height: 16px;
    line-height: 16px;
    text-align: center;
    border-radius: 16px;
    font-size: 12px;
    font-weight: 700;
    color: #fff;
    background-color: orangered;
}
.shopcar .content .content-left .logo-wrapper .logo{
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #2b343c;
}
.shopcar .content .content-left .logo-wrapper .highlight{
    background-color: aqua;
}
.shopcar .content .content-left .logo-wrapper .logo .icon-shopping_cart{
    line-height: 44px;
    font-size: 24px;
    color: #80858a;
}
.shopcar .content .content-left .logo-wrapper .logo .highlight{
    color: #fff;
}
.shopcar .content .content-left .price{
    display: inline-block;
    vertical-align: top;
    margin-top: 12px;
    line-height: 24px;
    padding-right: 12px;
    box-sizing: border-box;
    border-right: 1px solid rgba(255, 255, 255, 0.1);
    font-size: 16px;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.4);
}
.shopcar .content .content-left .highlight{
    color: #fff;
}
.shopcar .content .content-left .desc{
    display: inline-block;
    vertical-align: top;
    margin: 12px 0 0 12px;
    line-height: 24px;
    color: rgba(255, 255, 255, 0.4);
    font-size: 12px;
}
.shopcar .content .content-right{
    flex: 0 0 105px;
    width: 105px;
    background-color: red;
}
.shopcar .content .content-right .pay{
    height: 48px;
    line-height: 48px;
    text-align: center;
    font-size: 16px;
    font-weight: 700;
    background-color: #2b333b;
    color: rgba(255, 255, 255, 0.4);
}
.shopcar .content .content-right .enough{
    background-color: green;
}
.shopcar .shopcar-list{
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    transform: translateY(-100%);
}
.shopcar .shopcar-list .list-header{
    height: 40px;
    line-height: 40px;
    padding: 0 18px;
    background-color: #f3f5f7;
    border-bottom: 1px solid rgba(7,17,27,0.2);
}
.shopcar .shopcar-list .list-header .title{
    float: left;
    font-size: 14px;
    color: rgb(7, 17, 27);
}
.shopcar .shopcar-list .list-header .empty{
    float: right;
    font-size: 12px;
    color: rgb(0,160,220);
}
.fold-enter-active, .fold-leave-active {
  transition: all 0.5s;
}
.fold-enter, .fold-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(0);
}
.shopcar .shopcar-list .list-content{
    padding: 0 18px;
    max-height: 196px;
    overflow: hidden;
    background-color: #fff;
}
.shopcar .shopcar-list .list-content .food{
    position: relative;
    padding: 12px 0;
    box-sizing: border-box;
    border-bottom: 1px solid rgba(7,17,27,0.2);
}
.shopcar .shopcar-list .list-content .food .name{
    line-height: 24px;
    font-size: 14px;
    color: rgb(7,17,27);
}
.shopcar .shopcar-list .list-content .food .price{
    position: absolute;
    right: 90px;
    bottom: 12px;
    line-height: 24px;
    font-size: 14px;
    color: rgb(240,20,20);
}
.shopcar .shopcar-list .list-content .carcontrol-wrapper{
  position: absolute;
  right: 0;
  bottom: 6px;
}
.listMask{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 40;
    background-color: rgba(7, 17, 27, 0.6);
}
.fade-enter-active, .fade-leave-active {
  transition: all 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>