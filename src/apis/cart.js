import http from '@/utils/http.js'

// 加入购物车
export function insertCartAPI({skuId, count}){
    return http({
        url: '/member/cart',
        method: 'POST',
        data: {
            skuId,
            count,
        }
    })
}

// 获取最新的购物车列表
export function findNewCartListAPI(){
    return http({
        url: '/member/cart',
    })
}