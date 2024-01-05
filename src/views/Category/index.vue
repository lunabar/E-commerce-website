<script setup>
import { getTopCategoryAPI } from "@/apis/category.js";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { getBannerAPI } from "@/apis/home.js";
import HomeGoodsItem from '@/views/Home/components/HomeGoodsItem.vue'

const topCategory = ref({});
const route = useRoute();
const getTopCategory = async () => {
  const res = await getTopCategoryAPI(route.params.id);
  console.log("面包屑的数据", res);
  topCategory.value = res.data.result;
};
onMounted(() => getTopCategory());

const categoryBannerList = ref([]);
const params = { distribution: 2 };
const getCategoryBanner = async () => {
  const res = await getBannerAPI(params);
  console.log("分类中的轮播图数据", res);
  categoryBannerList.value = res.data.result;
};
onMounted(() => getCategoryBanner());
</script>

<template>
  <div class="top-category">
    <div class="container m-top-20">
      <!-- 面包屑 -->
      <div class="bread-container">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ topCategory.name }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="home-banner">
        <el-carousel height="500px">
          <el-carousel-item v-for="item in categoryBannerList" :key="item.id">
            <img :src="item.imgUrl" alt="" />
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="i in topCategory.children" :key="i.id">
            <RouterLink to="/">
              <img :src="i.picture" />
              <p>{{ i.name }}</p>
            </RouterLink>
          </li>
        </ul>
      </div>
      <div
        class="ref-goods"
        v-for="item in topCategory.children"
        :key="item.id"
      >
        <div class="head">
          <h3>- {{ item.name }}-</h3>
        </div>
        <div class="body">
          <HomeGoodsItem v-for="good in item.goods" :good="good" :key="good.id" />
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped lang="scss">
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }

  .sub-list {
    margin-top: 20px;
    background-color: #fff;

    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;

      li {
        width: 168px;
        height: 160px;

        a {
          text-align: center;
          display: block;
          font-size: 16px;

          img {
            width: 100px;
            height: 100px;
          }

          p {
            line-height: 40px;
          }

          &:hover {
            color: $xtxColor;
          }
        }
      }
    }
  }

  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;

    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }

      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }

    .body {
      display: flex;
      justify-content: space-around;
      padding: 0 40px 30px;
    }
  }

  .bread-container {
    padding: 25px 0;
  }
  .home-banner {
    width: 1240px;
    height: 500px;
    margin: 0 auto;
    z-index: 98;

    img {
      width: 100%;
      height: 500px;
    }
  }
}
</style>