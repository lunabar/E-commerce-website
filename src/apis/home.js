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
