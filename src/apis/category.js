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

// 二级分类后商品信息接口
export function getSubCategoryAPI(data){
    return http({
        url: '/category/goods/temporary',
        method: 'POST',
        data,
    })
}
