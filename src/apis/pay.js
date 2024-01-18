import http from '@/utils/http.js'

export function getOrderAPI(id){
    return http({
        url: `/member/order/${id}`,
    })
}