<template>
  <div class="course-content">
    <!-- 轮播组件 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in activeAdList" :key="item.id">
        <img :src="item.img" alt="">
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { getAllAds } from '@/services/course'

export default {
  name: 'CourseContent',
  data () {
    return {
      // 轮播图片列表
      adList: []
    }
  },
  created () {
    this.loadAds()
  },
  methods: {
    async loadAds () {
      const { data } = await getAllAds({
        // 999代表首页顶部轮播图广告位
        spaceKeys: '999'
      })
      console.log(data)
      // 存储到 adList
      this.adList = data.content[0].adDTOList
    }
  },
  computed: {
    activeAdList () {
      return this.adList.filter(item => item.status === 1)
    }
  }
}
</script>

<style lang='scss' scoped>
.my-swipe {
  width: 100%;

  .van-swipe-item {
    display: flex;
    justify-content: center;
    overflow: hidden;
  }

  img {
    height: 170px;
  }
}
</style>
