import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useCartStore = defineStore('cartStore', () => {
    // state
    const cartList = ref([])
    console.log('cartList.value.skuId', cartList.value.skuId)
    // active
    const addCart = (goodsParams) => {
        // 添加购物车操作
        // 1.已添加过 - count +1
        // 没有添加过 - 直接push
        // 通过匹配传递过来的商品对象中的skuId能不能在cartList中找到，找到了就是添加过
        const item = cartList.value.find((item) => goodsParams.skuId === item.skuId)
        if (item) {
            item.count++
        } else {
            cartList.value.push(goodsParams)
        }
    }
    // 删除Header购物车里的指定商品
    const deleteCart = (skuId) => {
        const index = cartList.value.findIndex((item) => item.skuId === skuId)
        cartList.value.splice(index,1)
    }
    return {
        cartList,
        addCart,
        deleteCart,
    }
},
// 解决刷新页面不释放内存问题
{
    persist: true,
},
)