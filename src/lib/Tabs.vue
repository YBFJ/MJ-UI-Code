<template>
  <div class="gulu-tabs">
    <div class="gulu-tabs-nav" ref="container">
      <div class="gulu-tabs-nav-item" v-for="(t,index) in titles" 
      :ref="el => {if(t===selected) {selectedItem = el}}"
      @click="select(t)"
      :class="{selected: t===selected}"
      :key="index"
      >
      {{t}}
      </div>
      <div class="gulu-tabs-nav-indicator" ref="indicator"></div>
    </div>
    <div class="gulu-tabs-content">
      <component :is="current" :key="current.props.title" />
    </div>
  </div>
</template>
<script lang="ts">
import { computed, onMounted, ref, watchEffect } from 'vue';
import Tab from './Tab.vue'
export default {
  props:{
    selected: String
  },
  setup(props, context) {
    const selectedItem = ref <any> ()
    const indicator  = ref <HTMLDivElement> ()
    const container  = ref <HTMLDivElement> ()
    onMounted(() => {
      watchEffect(()=>{
        const {left:left1} = container.value!.getBoundingClientRect()
        const {width, left:left2} = selectedItem.value!.getBoundingClientRect()
        indicator.value!.style.width = width + 'px'
        indicator.value!.style.left = (left2 - left1) + 'px'
      })
    })
    const defaults = (context?.slots as any)?.default()
    defaults?.forEach((tag)=>{
      if(tag.type !== Tab){
        throw new Error('Tabs 子标签必须是 Tab')
      }
    })
    const current = computed(()=>{
      return defaults.find((tag)=> tag.props!.title === props.selected)
    }) 
    const titles = defaults.map((tag) => {
      return tag.props!.title
    })
    const select = (title:string) => {
      context.emit("update:selected", title)
    }
    return {
      current,
      defaults,
      titles,
      select,
      selectedItem,
      indicator,
      container
    }
  },
}
</script>
<style lang="scss">
$blue: #40a9ff;
$color: #333;
$border-color: #d9d9d9;

.gulu-tabs {
  &-nav {
    display: flex;
    color: $color;
    border-bottom: 1px solid $border-color;
    position: relative;

    &-item {
      padding: 8px 0;
      margin: 0 16px;
      cursor: pointer;

      &:first-child {
        margin-left: 0;
      }

      &.selected {
        color: $blue;
      }
    }

    &-indicator {
      position: absolute;
      height: 3px;
      background: $blue;
      left: 0;
      bottom: -1px;
      width: 100px;
      transition: all 250ms;
    }
  }

  &-content {
    padding: 8px 0;
  }
}
</style>