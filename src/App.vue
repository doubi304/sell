<template>
  <div id="app">
    <Header v-bind:seller='seller'></Header>
    <div class="nav">
      <div class="items">
        <router-link to='/goods'>商品</router-link>
      </div>
      <div class="items">
         <router-link to='/ratings'>评价</router-link>
      </div>
      <div class="items">
         <router-link to='/seller'>商家</router-link>
      </div>
    </div>
    <!-- <div class="content">content</div> -->
    <keep-alive>
    <router-view v-bind:seller="seller" ></router-view>
    </keep-alive>
</div>
</template>
<script>
import Header from './components/header/header.vue';
import axios from 'axios';
// const ERR_OK = 0;
export default {
  name: 'App',
  components: {
    Header
  },
  data () {
    return {
      seller: {}
    };
  },
  created () {
   axios.get('static/data.json').then((res) => {
      this.seller = res.data.seller;
    });
  }
};
</script>

<style>
   .clearfix{
     display: inline-block;
   }
   .clearfix::after{
     display: block;
     content: ".";
     height: 0;
     clear: both;
     visibility: hidden;
   }
   #app .nav{
       display: flex;
       width: 100%;
       height: 40px;
       line-height: 40px;
   }
   #app .nav .items{
     flex: 1;
     text-align: center;
   }
    #app .nav .items a{
      text-decoration: none;
      display: block;
      color: rgb(77,85,93);
      font-size: 14px;
      border-bottom: 1px solid rgba(7,17,27,0.1)
    }
/*  .router-link-active{//权重问题，color不生效 color: orangered;} */
   #app .nav .items a.router-link-active{
    color: rgb(240,20,20)
  }

</style>
