import { defineStore } from "pinia";
import { ref } from "vue";
import { loginAPI } from "@/apis/user";
import { useCartStore } from "./cartStore.js";
import { mergeCartAPI } from '@/apis/cart.js'
export const useUserStore = defineStore('user', () => {
    // 1.定义state
    const userInfo = ref({})
    // 2.定义action
    // 获得用户信息,  登录的时候调用合并购物车接口， 让未登录时的购物车与登陆时的购物车接口合并
    const getUserInfo = async ({account, password}) => {
        const res = await loginAPI({account, password})
        userInfo.value = res.data.result
        // 调用合并购物车接口
        await mergeCartAPI(useCartStore().cartList.map(item => ({skuId: item.skuId,selected: item.selected,count: item.count,})))
        // 上面一句的完整形式， tips：箭头函数 return只有一句，既能省略return，又能省略花括号；若返回的是对象需要用小括号包裹对象后，省略return
        // await mergeCartAPI(useCartStore().cartList.map(item => { return {skuId: item.skuId,selected: item.selected,count: item.count,}}))
        useCartStore().updateCartList()
    }
    // 删除用户信息
    const clearUserInfo = () => {
        userInfo.value = {}
        // 触发pinia里的action，退出登录清空购物车
        const cartStore = useCartStore()
        cartStore.clearCartList()
    }

    // 3.返回state和action
    return {
        userInfo,
        getUserInfo,
        clearUserInfo,
    }
},
{
    persist: true,
},
)