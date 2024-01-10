import http from '@/utils/http.js'

export function getDetailAPI(id){
    return http({
        url: '/goods',
        params: {
            id,
        }
    })
}