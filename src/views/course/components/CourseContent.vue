<template>
  <div class="course-content">
    <!-- 轮播组件 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in activeAdList" :key="item.id">
        <img :src="item.img" alt="">
      </van-swipe-item>
    </van-swipe>
    <!-- 课程列表 -->
    <course-content-list></course-content-list>
  </div>
</template>

<script>
import { getAllAds } from '@/services/course'
import CourseContentList from '@/components/CourseContentList'

export default {
  name: 'CourseContent',
  components: {
    CourseContentList
  },
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

.course-content-list {
  top: 220px;
  bottom: 50px;
}
</style>
