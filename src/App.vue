<template>
  <!-- 用于展示路由对应的页面 -->
  <router-view></router-view>
</template>

<script lang="ts">
import {ref, provide} from 'vue'
import {router} from './router'
export default {
  name: 'App',
  setup() {
    const width = document.documentElement.clientWidth;
    const menuVisible = ref(width<=500? false : true)
    provide('menuVisible',menuVisible); // set menuVisible
    router.afterEach(()=>{
      if(width<=500){
        menuVisible.value = false
      }
    })
  }
}
</script>
