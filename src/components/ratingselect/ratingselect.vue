<template>
  <div class="ratingselect">
      <div class="rating-type">
          <span v-on:click="select(2,$event)" class="block all" v-bind:class="{'allActive': selectType === 2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
          <span v-on:click="select(0,$event)" class="block positive" v-bind:class="{'posActive': selectType === 0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
          <span v-on:click="select(1,$event)" class="block negative" v-bind:class="{'negActive': selectType === 1}">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
      </div>
      <div v-on:click="toggleContent" class="switch" v-bind:class="{'on':onlyContent}">
          <span class="checkText">对勾</span>
          <span class="text">只看有内容的评价</span>
      </div>
  </div>
</template>

<script>
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;// 所有评价
export default {
   props: {
    ratings: {
        type: Array,
        default () {
            return [];
        }
    },
    // selectType: {
    //     type: Number,
    //     default: ALL
    // },
    // onlyContent: {
    //     type: Boolean,
    //     default: false
    // },
    desc: {
        type: Object,
        default () {
            return {
               all: '全部',
               positive: '满意',
               negative: '不满意'
            };
        }
    }
},
   data () {
      return {
         selectType: ALL,
         onlyContent: true
      };
   },
    methods: {
        select (type, event) {
            this.selectType = type;
            this.$emit('ratingtypeSelect', type);
        },
        toggleContent () {
            this.onlyContent = !this.onlyContent;
            this.$emit('contentToggle', this.onlyContent);
        }
    },
    computed: {
        positives () {
            return this.ratings.filter((rating) => {
                  return rating.rateType === POSITIVE;
            });
        },
         negatives () {
            return this.ratings.filter((rating) => {
                  return rating.rateType === NEGATIVE;
            });
        }
    }
};
</script>

<style>
.ratingselect .rating-type{
    padding: 18px 0;
    margin-left: 0 18px;
    border-bottom: 1px solid rgba(7.17,27,0.1);
    font-size: 0;
}
.ratingselect .on{
    color: orangered;
    font-weight: 700;
}
.ratingselect .rating-type .block{
    display: inline-block;
    padding: 8px 12px;
    margin-right: 8px;
    border-radius: 1px;
    color: rgba(77.85,93);
    font-size: 14px;
}

.ratingselect .rating-type .block .count{
    margin-left: 4px;
    font-size: 12px;
}
.ratingselect .rating-type .all{
    background-color: rgba(0,160,220,0,3);
}
.ratingselect .rating-type .allActive{
    color: #fff;
    background-color: rgb(0,160,220);
}
.ratingselect .rating-type .positive{
background-color: rgba(0,160,220,0.3);
}
.ratingselect .rating-type .posActive{
    background-color: rgb(0,160,220);
}
.ratingselect .rating-type .negative{
    background-color: rgba(77,85,93,0.2);
}
.ratingselect .rating-type .negActive{
    background-color: rgb(77,85,93);
}
.switch{
    color: rgb(147,153,159);
}
</style>
