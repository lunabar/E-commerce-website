import { defineStore } from "pinia";
import { ref } from "vue";
import { loginAPI } from "@/apis/user";
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