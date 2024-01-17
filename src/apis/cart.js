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

// 删除购物车商品
export function delCartAPI(ids){
    return http({
        url: '/member/cart',
        method: 'DELETE',
        data: {
            ids,
        }
    })
}

// 获取最新的购物车列表
export function findNewCartListAPI(){
    return http({
        url: '/member/cart',
    })
}