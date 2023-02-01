<!--
 * @Author: QKSword 1064615639@qq.com
 * @Date: 2022-08-02 10:15:27
 * @LastEditors: QKSword 1064615639@qq.com
 * @LastEditTime: 2022-12-16 16:00:59
 * @FilePath: \lab-front\src\views\admin\topic.vue
 * @Description: 题目管理页面
-->
<template>
  <div class="components-container">
    <el-tabs v-model="activeTab" class="dark-el-tabs">
      <el-tab-pane label="CTF题目" name="ctfTopic">
        <ctf-topic />
      </el-tab-pane>
      <el-tab-pane label="CVE复现" name="vulTopic">
        <cve-topic />
      </el-tab-pane>
      <el-tab-pane label="靶场环境" name="vulhubTopic">
        <labs-topic />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import CtfTopic from '@/views/admin/components/CtfTopic.vue'
import CveTopic from '@/views/admin/components/CveTopic.vue'
import LabsTopic from './components/LabsTopic.vue'

export default {
  components: { CtfTopic, CveTopic, LabsTopic },
  data() {
    return {
      activeTab: 'ctfTopic'
    }
  }
}

</script>

<style lang="scss" scoped>
@import "@/styles/app-main.scss";
.components-container{
    padding: 20px;
    border-top: 2px solid $mainColor;
}

// feat(QKSword)：修改tabs字体大小
.dark-el-tabs{
    ::v-deep.el-tabs__item{
        font-size: 17px;
    }
}

</style>
