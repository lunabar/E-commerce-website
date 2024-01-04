import http from '@/utils/http.js'

// 获取banner

export function getBannerAPI() {
    return http({
        url: '/home/banner',
    })
}

// 获取新鲜好物
export function getNewAPI(){
    return http({
        url: '/home/new',
    })
}

// 获取人气好物
export function getHotAPI(){
    return http({
        url: '/home/hot',
    })
}

// 获取商品列表
export function getProductAPI(){
    return http({
        url: '/home/goods',
    })
}