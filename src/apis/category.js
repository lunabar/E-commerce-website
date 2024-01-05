import http from '@/utils/http.js'

export function getTopCategoryAPI(id){
    return http({
        url: '/category',
        params: {
            id,
        }
    })
}