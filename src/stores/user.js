import { defineStore } from "pinia";
import { ref } from "vue";
import { loginAPI } from "@/apis/user";
export const useUserStore = defineStore('user', () => {
    // 1.定义state
    const userInfo = ref({})
    // 2.定义action
    const getUserInfo = async ({account, password}) => {
        const res = await loginAPI({account, password})
        userInfo.value = res.data.result
    }
    // 3.返回state和action
    return {
        userInfo,
        getUserInfo,
    }
})