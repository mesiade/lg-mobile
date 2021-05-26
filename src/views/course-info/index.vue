<template>  
  <div class="course-info">课程内容{{ courseId }}</div>
</template>

<script>
import { getCourseById } from '@/services/course'
export default {
  name: 'CourseInfo',
  props: {
    courseId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      // 课程信息
      course: {}
    }
  },
  created () {
    this.loadCourse()
  },
  methods: {
    async loadCourse () {
      const { data } = await getCourseById({
        courseId: this.courseId
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
