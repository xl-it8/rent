<template>
  <div class="Item_house">
    <img :src="'http://liufusong.top:8080' + houseImg" alt="" />
    <div class="Item_content">
      <h3 class="Item_title">{{title}}</h3>
      <div class="Item_desc">{{desc}}</div>
      <div class="Item_tag">
        <span v-for="(item, index) in tags" :key="index">{{ item }}</span>
      </div>
      <div class="Item_price">
        <span class="Item_priceNum">{{price}}</span>
        元/月
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    desc: {
      type: String,
      required: true
    },
    houseImg: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    tags: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
@import url("@/styles/base.less");

.Item_house {
  height: 120px;
  display: flex;
  box-sizing: border-box;
  justify-content: flexs-start;
  padding-top: 18px;
  border-bottom: 1px solid #e5e5e5;
  img {
    width: 106px;
    height: 80px;
  }
  .Item_content {
    margin-left: 15px;
    h3 {
      font-size: 15px;
      color: #394043;
    }
    .Item_desc {
      font-size: 12px;
      color: #afb2b3;
    }
    .Item_tag {
      display: inline-block;
      font-size: 12px;
      border-radius: 3px;
      padding: 4px 5px;
      margin-right: 5px;
      line-height: 12px;
      color: #39becd;
      background: #e1f5f8;
    }

    .Item_price {
      font-size: 14px;
      color: #fa5741;
      .Item_priceNum {
        font-size: 12px;
      }
    }
  }
}
</style>
