<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <div>hi</div>
  <router-link to='/xxx'>frank</router-link>
  <!-- 用于展示路由对应的页面 -->
  <router-view></router-view>
</template>

<script>
import Frank from './components/Frank.vue'


export default {
  name: 'App',
  components: {
    Frank,
  }
}
</script>
