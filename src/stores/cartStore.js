import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useUserStore } from './user.js'
import { insertCartAPI, findNewCartListAPI } from '@/apis/cart.js'
export const useCartStore = defineStore('cartStore', () => {
    // state
    const cartList = ref([])

    const userStore = useUserStore()
    const isLogin = computed(() => userStore.userInfo.token)
    console.log('isLogin', isLogin)
    // active
    const addCart = async (goodsParams) => {
        console.log('goodsParams:', goodsParams)
        const {skuId, count} = goodsParams
        console.log('{skuId, count}:',{skuId, count})
        // 添加购物车，若用户登录（token有效）调用接口
        if (isLogin.value) {
            await insertCartAPI({skuId, count})
            const res = await findNewCartListAPI()
            console.log('获取最新购物车列表信息', res)
            cartList.value = res.data.result
        }else{
            // 添加购物车操作，用户没登录，添加到本地购物车cartList写到localStorage里
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

        
    }
    // 删除Header购物车里的指定商品
    const deleteCart = (skuId) => {
        const index = cartList.value.findIndex((item) => item.skuId === skuId)
        cartList.value.splice(index,1)
    }

    // 切换selected属性功能
    const changeSelected = (skuId, selected) => {
        const item = cartList.value.find((item) => item.skuId === skuId )
        item.selected = selected
    }

    // 全选决定单选，全选的状态就是每个单选的状态
    const checkAll = (selectedValue) => cartList.value.forEach(item => item.selected = selectedValue)

    // 单选决定全选,只有单选全部为selected，isAll才为true
    const isAll = computed(() => cartList.value.every(item => item.selected===true))

    // 计算属性总数和总价
    const allCount = computed(() => cartList.value.reduce((a,b) => a+b.count ,0 )
    )
    const allPrice = computed(() => cartList.value.reduce((a,b) => a+b.count * b.price ,0)
    )

    // 计算购物车列表详情的商品总数和总价
    // 已选择数量=cartList中所有selected字段为true的count之后
    const selectedCount = computed(() => cartList.value.filter(item => item.selected === true).reduce((a, c) => a + c.count, 0))
    // 商品合计
    const selectedPrice = computed(() => cartList.value.filter(item => item.selected === true).reduce((a, c) => a + c.count * c.price, 0))
    
    return {
        cartList,
        addCart,
        deleteCart,
        changeSelected,
        checkAll,
        allCount,
        allPrice,
        isAll,
        selectedCount,
        selectedPrice,
    }
},
// 解决刷新页面不释放内存问题
{
    persist: true,
},
)