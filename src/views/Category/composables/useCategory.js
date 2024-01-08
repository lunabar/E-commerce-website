import { getTopCategoryAPI } from "@/apis/category.js";
import { onMounted, ref } from "vue";
import { useRoute, onBeforeRouteUpdate } from "vue-router";

export function useCategory(){
    const topCategory = ref({});
    const route = useRoute();
    console.log('route为：',route)
    const getTopCategory = async (id = route.params.id) => {
    const res = await getTopCategoryAPI(id);
    console.log("面包屑的数据", res);
    topCategory.value = res.data.result;
    };
    // 默认id为没切换路由的参数值，是为了渲染面包屑
    onMounted(() => getTopCategory());
    
    // 这部分就只重新渲染category组件变化数据的部分
    // 监听路由切换，数据进行改变
    onBeforeRouteUpdate((to) => {
      // 路由参数不同，组件相同，切换路由后的对象有fullpath，params，path等信息
      console.log('路由切换至to',to)
      // 不能用默认id=route.params.id这是为切换路由前的当前id
      getTopCategory(to.params.id)
    })
    return {
        topCategory
    }
}