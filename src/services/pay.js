import request from '@/utils/request'

// 创建商品订单
export const createOrder = data => {
  return request({
    method: 'POST',
    url: '/front/order/saveOrder',
    data
  })
}

// 获取支付方式接口
export const getPayInfo = params => {
  return request({
    method: 'GET',
    url: '/front/pay/getPayInfo',
    params
  })
}

// 创建订单
export const initPayment = data => {
  return request({
    method: 'POST',
    url: '/front/pay/saveOrder',
    data
  })
}

// 查询订单
export const getPayResult = params => {
  return request({
    method: 'GET',
    url: '/front/pay/getPayResult',
    headers: { 'content-type': 'application/json' },
    params
  })
}
