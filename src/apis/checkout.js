import http from '@/utils/http.js'

// 获取结算信息
export function getCheckoutInfoAPI(){
    return http({
        url: '/member/order/pre',
    })
}