<script setup>
    import { getCategoryFilterAPI } from '@/apis/category.js'
    import { useRoute } from 'vue-router'
    import { ref, onMounted } from 'vue'
    import HomeGoodsItem from '@/views/Home/components/HomeGoodsItem.vue'
    import { getSubCategoryAPI } from '@/apis/category.js'
    const route = useRoute()
    const categoryData = ref({})
    const getCategoryData = async() => {
        const res = await getCategoryFilterAPI(route.params.id)
        console.log('二级category的res：', res)
        categoryData.value = res.data.result
    }
    onMounted(() => {
        getCategoryData()
    })

    const reqData = ref({
        categoryId: route.params.id,
        page: 1,
        pageSize: 20,
        sortField: 'publishTime' | 'orderNum' | 'evaluateNum',
    })

    const goodList = ref([])
    const getSubCategory = async() => {
        const res = await getSubCategoryAPI(reqData.value)
        console.log('二级分类下商品信息的res：',res)
        goodList.value = res.data.result.items
    }

    onMounted(() => {
        getSubCategory()
    })

    const disabled = ref(false)
    // tab切换回调
    const tabChange = () => {
        disabled.value = false
        reqData.value.page = 1 
        getSubCategory()
    }

    
    const load = async() => {
        // console.log('加载触底了')
        reqData.value.page++
        const res = await getSubCategoryAPI(reqData.value)
        if(res.data.result.items.length){
            goodList.value = [...goodList.value, ...res.data.result.items]
        }else{
            disabled.value = true
        }
        
    }



</script>

<template>
  <div class="container ">
    <!-- 面包屑 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/category/${categoryData.parentId}` }">{{categoryData.parentName}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{categoryData.name}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
        <!-- 点击tab，切换筛选条件参数sortField，重新发送列表请求 -->
        <!-- v-model='activeName' 绑定的是选中的tab的name值，把reqData的sortField定义为activeName，收集的是商品排序的方式 -->
        <!-- activeName改变时触发的事件,触发tab-change事件回调tabChange函数 -->
      <el-tabs v-model="reqData.sortField" @tab-change='tabChange'>
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <!-- 使用elementPlus提供的v-infinite-scroll指令监听是否满足触底条件，满足条件时让页数参数加一获取下一页数据，
      接着做新老数据的拼接渲染，加载完毕结束监听 -->
      <div class="body" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
         <!-- 商品列表-->
         <HomeGoodsItem v-for="item in goodList" :key="item.id" :good='item'/>
      </div>
    </div>
  </div>

</template>



<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }


}
</style>