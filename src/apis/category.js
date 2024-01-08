import http from '@/utils/http.js'

// 一级分类接口
export function getTopCategoryAPI(id){
    return http({
        url: '/category',
        params: {
            id,
        }
    })
}

// 二级分类接口
export function getCategoryFilterAPI(id){
    return http({
      url:'/category/sub/filter',
      params:{
        id
      }
    })
  }
