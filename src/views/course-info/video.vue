<template>
  <div class="course-video">
    <van-nav-bar
      title="视频"
      left-text="返回"
      left-arrow
      @click-left="$router.go(-1)"
    >
    </van-nav-bar>
    <!-- 设置视频容器 -->
    <div id="video-container"></div>
  </div>
</template>

<script>
import { navBar } from 'vant'
import { getVideoInfo } from '@/services/course'
export default {
  name: 'CourseVideo',
  components: {
    VanNavBar: navBar
  },
  props: {
    lessonId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      // 视频信息
      videoInfo: {}
    }
  },
  created () {
    this.loadVideo()
  },
  methods: {
    async loadVideo () {
      const { data } = await getVideoInfo({
        lessonId: this.lessonId
      })
      // 初始化播放器
      const player = new window.Aliplayer({
        id: 'video-container',
        vid: data.content.fileId,
        playauth: data.content.playAuth,
        qualitySort: 'asc',
        format: 'mp4',
        mediaType: 'video',
        width: '100%',
        height: '100%',
        autoplay: true,
        isLive: false,
        rePlay: false,
        playsinline: true,
        preload: true,
        controlBarVisibility: 'hover',
        useH5Prism: true
      }, function (player) {
        console.log('The player is created')
      })
      console.log(player)
    }
  }
}
</script>

<style lang="scss" scopde>
.course-video {
  height: 210px;
}
</style>
