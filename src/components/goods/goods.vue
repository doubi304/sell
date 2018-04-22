<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item,index) in goods" v-bind:key="index" class="menu-item" v-bind:class="{'current':currentIndex === index}" v-on:click="select(index)">
          <span class="text">
            <span class="icon" v-show="item.type>0" v-bind:class="classMap[item.type]"></span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li class="food-list  food-list-item" v-for="(item,index) in goods" v-bind:key="index">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li class="food-item" v-on:click="selectFood(food,$event)" v-for="(food,index) in item.foods" v-bind:key="index">
                <div class="icon">
                  <img v-bind:src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}</span>
                    <span>好评率{{food.rating}}</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span v-show="food.oldPrice" class="old">{{food.oldPrice}}</span>
                  </div>
                  <div class="carcontrol-wrapper">
                    <carcontrol v-bind:food="food"></carcontrol>
                  </div>
                </div>
              </li>
            </ul>
        </li>
      </ul>
    </div>
    <shopcar v-bind:delivery-price="seller.deliveryPrice" v-bind:min-price="seller.minPrice" v-bind:selectFoods="selectFoods"></shopcar>
     <foodDetail :food="selectedFood" ref="foodDetail"></foodDetail>
  </div>
</template>
<script>
import Bscroll from 'better-scroll';
import shopcar from '../shopcar/shopcar.vue';
import carcontrol from '../carcontrol/carcontrol.vue';
import foodDetail from '../food/food.vue';
import axios from 'axios';
// const ERR_OK = 0;
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      goods: [],
      listHeight: [],
      scrollY: 0,
      selectedFood: {}
    };
  },
  computed: {
    currentIndex () {
      for (let i = 0; i < this.listHeight.length; i++) {
         let h1 = this.listHeight[i];
         let h2 = this.listHeight[i + 1];
         if (!h2 || (this.scrollY >= h1 && this.scrollY < h2)) {
           return i;
         }
      }
      return 0;
    },
    selectFoods () {
      let foods = [];
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
           if (food.count) {
             foods.push(food);
           }
        });
      });
      return foods;
    }
  },
  created: function () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    axios.get('../static/data.json').then((res) => {
        this.goods = res.data.goods;
        this.$nextTick(() => {
        this.initScroll();
        this.caculateHeight();
      });
    });
  },
  methods: {
    initScroll () {
      this.menuScroll = new Bscroll(this.$refs.menuWrapper, {click: true});
      this.foodsScroll = new Bscroll(this.$refs.foodsWrapper, {click: true, probeType: 3});
      this.foodsScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y));
      });
    },
    caculateHeight () {
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-item');
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    },
    select (index) {
      // console.log(i);
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-item');
      let el = foodList[index];
      this.foodsScroll.scrollToElement(el, 800);
    },
    selectFood (food, event) {
      this.selectedFood = food;
      this.$refs.foodDetail.show();
    }
  },
  components: {
    shopcar,
    carcontrol,
    foodDetail
  }
};
</script>

<style>
.goods{
  display: flex;
  position: absolute;
  top: 176px;
  bottom: 46px;
  width: 100%;
  overflow: hidden;
}
.goods .menu-wrapper{
  flex: 0 0 80px;
  width: 80px;
  background-color: #f3f5f7;
}
.goods .foods-wrapper{
  flex: 1;
}
.goods .menu-wrapper .menu-item{
  display: table;
  height: 54px;
  width: 56px;
  line-height: 14px;
  text-align: center;
  padding: 0 12px;
}
/* 左边菜单高亮样式 */
.goods .menu-wrapper .current{
  /* position: relative; */
  margin-top: -1px;
  z-index: 10;
  background-color: #fff;
  font-weight: 700;
}
.goods .menu-wrapper .menu-item .icon{
   display: inline-block;
   vertical-align: top;
   width: 12px;
   height: 12px;
   margin-right: 2px;
   background-size: 12px 12px;
   background-repeat: no-repeat;
}
.goods .menu-wrapper .menu-item .text{
  display: table-cell;
  width: 56px;
  vertical-align: middle;
  font-size: 12px;
  border-bottom: 1px solid rgba(7, 17, 27, 0.1)
}
.goods .menu-wrapper .menu-item .decrease{
  background-image: url(decrease_3@2x.png);
}
.goods .menu-wrapper .menu-item .discount{
  background-image: url(discount_3@2x.png);
}
.goods .menu-wrapper .menu-item .guarantee{
  background-image: url(guarantee_3@2x.png);
}
.goods .menu-wrapper .menu-item .invoice{
  background-image: url(invoice_3@2x.png);
}
.goods .menu-wrapper .menu-item .special{
  background-image: url(special_3@2x.png);
}
.goods .foods-wrapper .title{
  padding-left: 14px;
  height: 26px;
  line-height: 26px;
  border-left: 2px solid #d9dde1;
  font-size: 12px;
  color: rgb(147, 153, 159);
  background-color: #f3f5f7;
}
.goods .foods-wrapper ul{
  list-style: none;
}
.goods .foods-wrapper .food-item{
  display: flex;
  margin: 18px;
  padding-bottom: 18px;
  border-bottom: 1px solid rgba(7,17,27,0.1);
  position: relative;
}
.goods .foods-wrapper .food-item:last-child{
  border: none;
  padding-bottom: 0;
}
.goods .foods-wrapper .food-item .icon{
  flex: 0 0 57px;
  margin-right: 10px;
  /* vertical-align: top; */
}
.goods .foods-wrapper .food-item .icon img{
    display: inline-block;
    width: 57px;
    height: 57px;
}
.goods .foods-wrapper .food-item .content{
  flex: 1;
  /* position: relative; */
}
.goods .foods-wrapper .food-item .content .name{
  margin: 2px 0 8px 0;
  height: 14px;
  line-height: 14px;
  font-size: 14px;
  color: rgb(7,17,27);
}
.goods .foods-wrapper .food-item .content .desc{
  margin-bottom: 8px;
  line-height: 10px;
  font-size: 10px;
  color: rgb(147, 153, 159);
}
.goods .foods-wrapper .food-item .content .extra{
  line-height: 10px;
  font-size: 10px;
  color: rgb(147, 153, 159);
}
.goods .foods-wrapper .food-item .content .extra .count{
  margin-right: 12px;
}
.goods .foods-wrapper .food-item .content .price{
  font-weight: 700;
  line-height: 24px;
}
.goods .foods-wrapper .food-item .content .price .now{
  margin-right: 8px;
  font-size: 14px;
  color: rgb(240,20,20);
}
.goods .foods-wrapper .food-item .content .price .old{
  text-decoration: line-through;
  font-size: 10px;
  color: rgb(147, 153, 159);
}
.goods .foods-wrapper .food-item .content .carcontrol-wrapper{
  position: absolute;
  right: 0;
  bottom: 12px;
}
</style>
