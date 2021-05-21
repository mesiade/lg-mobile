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
export default {
  name: 'CourseContentList',
  data () {
    return {
      list: [],
      // 是否正在加载
      loading: false,
      // 是否加载完毕
      finished: false
    }
  },
  methods: {
    onLoad () {
      
    }
  }
}
</script>

<style lang="scss" scoped></style>
