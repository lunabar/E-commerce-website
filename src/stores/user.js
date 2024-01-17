import { defineStore } from "pinia";
import { ref } from "vue";
import { loginAPI } from "@/apis/user";
import { useCartStore } from "./cartStore.js";
export const useUserStore = defineStore('user', () => {
    // 1.定义state
    const userInfo = ref({})
    // 2.定义action
    // 获得用户信息
    const getUserInfo = async ({account, password}) => {
        const res = await loginAPI({account, password})
        userInfo.value = res.data.result
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