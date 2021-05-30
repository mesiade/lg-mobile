<template>
  <div class="pay">
    <van-cell-group>
      <van-cell class="course-info">
        <img :src="course.courseImgUrl" alt="">
        <div class="price-info">
          <div class="course-name" v-text="course.courseName">示例课程名称</div>
          <div class="discounts">￥{{ course.discounts }}</div>
        </div>
      </van-cell>
      <van-cell class="account-info">
        <div>购买信息</div>
        <div>购买课程后使用此账号登录「拉钩教育」学习课程</div>
        <div class="username">当前账号:{{ username }}</div>
      </van-cell>
      <!-- 支付功能 -->
      <van-cell class="pay-channel">
        <div class="title">
          <p>支付方式</p>
          <van-radio-group v-model="radio">
            <van-cell-group>
              <van-cell @click="radio = '1'">
                <template #title>
                  <img src="" alt="">
                  <span>微信支付</span>
                </template>
                <template #right-icon>
                  <van-radio name="1" />
                </template>
              </van-cell>
              <van-cell @click="radio = '2'">
                <template #title>
                  <img src="" alt="">
                  <span>支付宝支付</span>
                </template>
                <template #right-icon>
                  <van-radio name="2" />
                </template>
              </van-cell>
            </van-cell-group>
          </van-radio-group>
        </div>
        <van-button @click="handlePay">￥{{ course.discounts }} 立即支付</van-button>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { createOrder, initPayment, getPayResult } from '@/services/pay'
import { getCourseById } from '@/services/course'
export default {
  name: 'Pay',
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
      radio: '1',
      // 订单号
      orderNo: null
    }
  },
  created () {
    this.loadCourse()
    this.loadOrder()
  },
  methods: {
    async handlePay () {
      const { data } = await initPayment({
        goodsOrderNo: this.orderNo,
        channel: this.radio === '1' ? 'wechat' : 'alipay',
        returnUrl: 'http://edufront.lagou.com'
      })
      // 接受响应地址并跳转
      window.location.href = data.content.payUrl

      const timer = setInterval(async () => {
        // 发起查询支付结果请求
        const { data: payResult } = await getPayResult({
          orderNo: data.content.orderNo
        })
        if (payResult.content && payResult.content.status === 2) {
          clearInterval(timer)
          this.$toast.success('购买成功')
          this.$router.push({
            name: 'learn'
          })
        }
      }, 1000)
    },
    async loadOrder () {
      const { data } = await createOrder({
        goodsId: this.courseId
      })
      this.orderNo = data.content.orderNo
      // 获取支付信息
      // const { data: payInfo } = await getPayInfo({
      //   shopOrderNo: this.orderNo
      // })
    },
    async loadCourse () {
      const { data } = await getCourseById({
        courseId: this.courseId
      })
      this.course = data.content
    }
  },
  computed: {
    username () {
      return this.$store.state.user.organization.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
    }
  }
}
</script>

<style lang="scss" scoped>
.pay {
  position: absolute;
  height: 100%;
  width: 100%;
}

.van-cell-group {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.course-info {
  height: 170px;
  padding: 40px 20px 0;
  margin-bottom: 10px;

  img {
    width: 80px;
    height: 107px;
    border-radius: 10px;
  }

  .van-cell__value {
    display: flex;
  }

  .price-info {
    height: 107px;
    padding: 5px 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .course-name {
    font-size: 16px;
  }

  .discounts {
    font-size: 22px;
    font-weight: 700;
    color: #ff7452;
  }
}

.account-info {
  height: 120px;
  margin-bottom: 10px;

  .username {
    margin: 20px 0 10px;
    font-size: 16px;
  }
}

.account-info div:nth-child(2) {
  font-size: 12px;
  color: #999;
}

.pay-channel {
  flex: 1;

  .van-cell {
    padding: 20px 10px;

    span {
      font-size: 16px;
      margin-left: 10px;
    }

    img {
      width: 28px;
      height: 28px;}
  }

  .van-cell__value {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .van-cell__title {
    display: flex;
    align-items: center;
  }
}

// 右侧radio选中颜色
::v-deep .van-radio__icon--checked .van-icon {
  background-color: #fbc546;
  border-color: #fbc546;
}

// 底部按钮样式
.pay-channel .van-button {
  background: linear-gradient(270deg, #faa83e, #fbc546);
  border-radius: 20px;
  margin-bottom: 10px;
  font-size: 18px;
}
</style>
