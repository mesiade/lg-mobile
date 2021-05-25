<template>
  <div class="user">
    <!-- 顶部功能 -->
    <van-cell-group>
      <!-- 用户信息区域 -->
      <van-cell class="user-info" :border="false">
        <!-- 头像 -->
        <van-image
          width="50"
          height="50"
          round
          :src="userInfo.portrait"
        ></van-image>
        <!-- 用户信息内容区域 -->
        <div class="user-info-content">
          <h3 v-text="userInfo.userName"></h3>
          <span>
            <van-icon name="edit" />
            编辑个人资料
          </span>
        </div>
      </van-cell>
      <!-- 账户信息 -->
      <van-cell class="account-info">
        <van-grid :border="false">
          <van-grid-item>
            <span class="grid-item-value">14.05</span>
            <span>学习时长</span>
          </van-grid-item>
          <van-grid-item>
            <span class="grid-item-value">200</span>
            <span>钱包/勾豆</span>
          </van-grid-item>
          <van-grid-item>
            <span class="grid-item-value">1</span>
            <span>优惠券</span>
          </van-grid-item>
          <van-grid-item>
            <span class="grid-item-value">213</span>
            <span>学分</span>
          </van-grid-item>
        </van-grid>
      </van-cell>
      <!-- 列表区域 -->
      <van-cell title="分销中心" icon="user-o" value="收益200元" is-link></van-cell>
      <van-cell title="个性化设置" icon="setting-o" is-link></van-cell>
      <van-cell title="我的下载" icon="down" is-link></van-cell>
      <van-cell title="帮助与反馈" icon="question-o" is-link></van-cell>
      <van-cell title="关于拉钩教育" icon="info-o" value="v2.0.0" is-link></van-cell>
    </van-cell-group>

    <!-- 底部导航 -->
    <layout-footer></layout-footer>
  </div>
</template>

<script>
import LayoutFooter from '@/components/LayoutFooter'
import { getInfo } from '@/services/user'
export default {
  name: 'User',
  components: {
    LayoutFooter
  },
  data () {
    return {
      userInfo: {}
    }
  },
  created () {
    this.loadUserInfo()
  },
  methods: {
    async loadUserInfo () {
      const { data } = await getInfo()
      this.userInfo = data.content
    }
  }
}
</script>

<style lang="scss" scoped>
// 用户信息
.user-info {
  padding: 30px 20px 0;
  background-color: rgb(248, 150, 3);

  .van-cell__value {
    display: flex;
  }
}

.user-info-content {
  padding-left: 15px;

  h3 {margin: 5px;font-size: 18px;}
}

// 账户信息
.account-info {
  background-color: rgb(248, 150, 3);
  margin-top: -1px;

  .van-cell__value {
    border-radius: 10px;
  }

  .grid-item-value {
    font-size: 22px;
    font-weight: 700;
  }
}
</style>
