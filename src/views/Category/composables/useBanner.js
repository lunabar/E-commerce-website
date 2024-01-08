import { getBannerAPI } from "@/apis/home.js";
import { onMounted, ref } from "vue";

export function useBanner(){
    const categoryBannerList = ref([]);
    const params = { distribution: 2 };
    const getCategoryBanner = async () => {
    const res = await getBannerAPI(params);
    console.log("分类中的轮播图数据", res);
    categoryBannerList.value = res.data.result;
    };
    onMounted(() => getCategoryBanner());
    return {
        categoryBannerList
    }
}