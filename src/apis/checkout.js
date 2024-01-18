import http from '@/utils/http.js'

// 获取结算信息
export function getCheckoutInfoAPI(){
    return http({
        url: '/member/order/pre',
    })
}

// 创建订单, 生成订单id
export function createOrderAPI(data){
    return http({
        url: '/member/order',
        method: 'POST',
        data,
    })
}