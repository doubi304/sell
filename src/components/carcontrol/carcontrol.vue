<template>
  <div class="car-control">
     <transition name="fade">
      <div class="decrease" v-show="food.count > 0" v-on:click.stop="decCount">-</div>
    </transition>
    <transition name="fade2">
        <div class="count" v-show="food.count > 0">{{food.count}}</div>
    </transition>
      <div class="add" v-on:click.stop="addCount">+</div>
  </div>
</template>

<script>
import Vue from 'vue';
export default {
  props: {
      food: {
          type: Object
      }
  },
  methods: {
      addCount () {
        //   console.log(11);
          if (!this.food.count) {
            //   this.food.count = 1; food中不存在count字段，检测不到字段变化
              Vue.set(this.food, 'count', 1);// 设置新字段用set接口
          } else {
              this.food.count++;
          }
      },
      decCount () {
          if (this.food.count) {
              this.food.count--;
         }
      }
  }
};
</script>
<style>
.car-control{
    font-size: 0;
}
.car-control .decrease{
    display: inline-block;
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    font-size: 16px;
    background-color: aqua;
    font-weight: 700;
    border-radius: 50%;
    color: #fff;
}
.fade-enter-active, .fade-leave-active {
  transition: all 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: rotate(0);
  transform: translateX(20px);
}
.car-control .add{
    display: inline-block;
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    font-size: 16px;
    background-color: aqua;
    font-weight: 700;
    border-radius: 50%;
    color: #fff;
}
.car-control .count{
    display: inline-block;
    width: 24px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    font-size: 10px;
    color: orangered;
}
.fade2-enter-active, .fade2-leave-active {
  transition: all 0.5s;
}
.fade2-enter, .fade2-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>