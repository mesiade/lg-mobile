<template>
  <div class="course-info">
    <van-cell-group>
      <!-- 课程图片 -->
      <van-cell class="course-img">
        <img :src="course.courseImgUrl" alt="">
      </van-cell>
      <!-- 课程描述 -->
      <van-cell class="course-description">
        <!-- 课程名称 -->
        <h2 v-text="course.courseName"></h2>
        <!-- 课程概述 -->
        <p v-text="course.previewFirstField"></p>
        <!-- 课程销售信息 -->
        <div class="course-sale-info">
          <p class="course-price">
            <span class="discounts">￥{{ course.discounts }}</span>
            <span>￥{{ course.price }}</span>
          </p>
          <span class="tag">{{ course.sales }}人已购</span>
          <span class="tag">每周三、五更新</span>
        </div>
      </van-cell>
      <!-- 课程详细内容 -->
      <van-cell class="course-detail">
        <van-tabs scrollspy sticky>
          <van-tab title="详情">
            <!-- 课程详情信息在后台是通过富文本编辑器设置的，所以内容为HTML文本 -->
            <div v-html="course.courseDescription"></div>
          </van-tab>
          <van-tab title="内容">
            <course-section
              v-for="item in sections"
              :key="item.id"
              :section-data="item"
            />
          </van-tab>
        </van-tabs>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import CourseSection from './components/CourseSection'
import { getCourseById, getSectionAndLesson } from '@/services/course'
export default {
  name: 'CourseInfo',
  components: {
    CourseSection
  },
  props: {
    courseId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      // 课程信息
      course: {},
      // 课程章节信息
      sections: {}
    }
  },
  created () {
    this.loadCourse()
    this.loadSections()
  },
  methods: {
    async loadCourse () {
      const { data } = await getCourseById({
        courseId: this.courseId
      })
      this.course = data.content
    },
    async loadSections () {
      const { data } = await getSectionAndLesson({
        courseId: this.courseId
      })
      this.sections = data.content.courseSectionList
    }
  }
}
</script>

<style lang="scss" scoped>
.van-cell {
  padding: 0;
}

.course-img {
  height: 280px;
}

// 课程描述区域
.course-description{
  padding: 10px 20px;
  height: 150px;

  h2 {padding: 0;}
}

.course-sale-info {
  display: flex;

  .course-price {
    flex: 1;
    margin: 0;

    .discounts {
      color: #ff7452;
      font-size: 24px;
      font-weight: 700;
    }
  }

  .tag {
    background: #f8f9fa;
    font-size: 12px;
    font-weight: 700;
    color: #666;
    margin-left: 10px;
    padding: 7px;
    line-height: 15px;
    border-radius: 3px;
  }
}

</style>
