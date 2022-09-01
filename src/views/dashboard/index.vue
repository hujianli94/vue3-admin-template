<template>
  <div class="scroll-y">
    <el-button @click="toggleHtmlClass('dark')">切换主题色(dark-theme)</el-button>
    <el-button @click="toggleHtmlClass('lighting-theme')">切换主题色(lighting-theme)</el-button>
    <el-button @click="toggleHtmlClass('base-theme')">切换主题色(base-theme)(default)</el-button>
    <p>
      See
      <a href="https://element-plus.org" target="_blank">element-plus</a>
      for more information.
    </p>
    <!-- example components -->
    <el-button @click="toast">El Message</el-button>
    <el-button type="primary" @click="count++">count is: {{ count }}</el-button>
    <el-button type="success" @click="count++">count is: {{ count }}</el-button>
    <el-button type="warning" @click="count++">count is: {{ count }}</el-button>
    <el-button type="danger" @click="count++">count is: {{ count }}</el-button>
    <el-button type="info" @click="count++">count is: {{ count }}</el-button>
    <h1><center>Python 测试运维自动化平台 </center> </h1>
    </div>
</template>
<script setup>
import { ElMessage } from 'element-plus'

const count = ref(0)
const input = ref('element-plus')

const curDate = ref('')

const toast = () => {
  ElMessage.success('Hello')
}
import { toggleHtmlClass } from '@/theme/utils'

import { useUserStore } from '@/store/user'

const userStore = useUserStore()
const username = computed(() => {
  return userStore.username
})

const showObj = ref(GLOBAL_VAR)
// eslint-disable-next-line no-undef
const showObjString = ref(GLOBAL_STRING)
</script>
