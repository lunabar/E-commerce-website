import http from '@/utils/http.js'

// 获取banner

export function getBannerAPI() {
    return http({
        url: '/home/banner',
    })
}
