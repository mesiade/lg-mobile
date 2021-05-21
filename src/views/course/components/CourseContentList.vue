<template>
  <div class="course-content-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item" :title="item" />
    </van-list>
  </div>
</template>

<script>
import { getQueryCourses } from '@/services/course'

export default {
  name: 'CourseContentList',
  data () {
    return {
      list: [],
      // 是否正在加载
      loading: false,
      // 是否加载完毕
      finished: false,
      // 数据页数
      currentPage: 1
    }
  },
  methods: {
    async onLoad () {
      const { data } = await getQueryCourses({
        currentPage: this.currentPage,
        pageSize: 10,
        // 代表上架状态
        status: 1
      })

      // 下次请求下一页
      this.currentPage++
      // 加载状态结束
      this.loading = false

      // 数据全部加载完成
      if (data.data.records.length < 10) {
        this.finished = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.course-content-list {
  position: fixed;
  overflow-y: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
