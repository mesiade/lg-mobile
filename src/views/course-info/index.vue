<template>
  <div class="course-info">课程内容{{ courseId }}</div>
</template>

<script>
export default {
  name: 'CourseInfo',
  props: {
    courseId: {
      type: [String, Number],
      required: true
    }
  }
}
</script>

<style lang="scss" scoped></style>
