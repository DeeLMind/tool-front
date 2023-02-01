<!--
 * @Author: QKSword 1064615639@qq.com
 * @Date: 2022-08-05 10:11:57
 * @LastEditors: QKSword 1064615639@qq.com
 * @LastEditTime: 2022-12-15 17:10:50
 * @FilePath: \lab-front\src\views\admin\components\OperateTopic.vue
 * @Description: 操作题目组件
-->
<template>
  <el-dialog
    v-loading.fullscreen="loading"
    element-loading-spinner="el-icon-loading"
    element-loading-text="拼命努力中"
    :visible.sync="localTopicDialog.topicDialogVisible"
    class="dark-el-dialog"
    append-to-body
    :title="dialogTitle"
  >
    <el-form
      ref="localTopicInfo"
      :model="localTopicInfo"
      :rules="topicInfoRules"
      autocomplete="on"
    >
      <el-row>
        <el-form-item prop="id" class="dark-el-form-item">
          <el-input v-model="localTopicInfo.id" class="dialogInput-el-input" size="small" readonly>
            <template slot="prepend">ID</template>
          </el-input>
        </el-form-item>
      </el-row>

      <el-row>
        <el-col :xs="24" :sm="24" :lg="12">
          <el-form-item prop="created_at" class="dark-el-form-item">
            <el-input v-model="localTopicInfo.created_at" class="dialogInput-el-input" size="small" readonly>
              <template slot="prepend">创建时间</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="12">
          <el-form-item prop="updated_at" class="dark-el-form-item">
            <el-input v-model="localTopicInfo.updated_at" class="dialogInput-el-input" size="small" readonly>
              <template slot="prepend">更新时间</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :xs="24" :sm="24" :lg="8">
          <el-form-item prop="score" class="dark-el-form-item">
            <span class="base-span">题目分数</span>
            <el-input-number v-model="localTopicInfo.score" class="dark-el-input-number" size="small" controls-position="right" :min="0" :step="1" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="8">
          <el-form-item prop="time" class="dark-el-form-item">
            <span class="base-span">容器开启(时)</span>
            <el-input-number v-model="localTopicInfo.time" class="dark-el-input-number" size="small" controls-position="right" :min="0" :step="1" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="8">
          <el-form-item prop="overTime" class="dark-el-form-item">
            <span class="base-span">容器超时(分)</span>
            <el-input-number v-model="localTopicInfo.overTime" class="dark-el-input-number" size="small" controls-position="right" :min="0" :step="1" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-form-item prop="image" class="dark-el-form-item">
          <el-input v-model="localTopicInfo.image" class="dialogInput-el-input" size="small">
            <template slot="prepend">容器镜像</template>
          </el-input>
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item prop="title" class="dark-el-form-item">
          <el-input v-model="localTopicInfo.title" class="dialogInput-el-input" size="small">
            <template slot="prepend">题目名称</template>
          </el-input>
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item prop="desc" class="dark-el-form-item">
          <el-input v-model="localTopicInfo.desc" class="dialogInput-el-input" size="small">
            <template slot="prepend">题目描述</template>
          </el-input>
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item prop="url" class="dark-el-form-item">
          <el-input v-model="localTopicInfo.url" class="dialogInput-el-input" size="small">
            <template slot="prepend">题目下载地址</template>
          </el-input>
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item prop="flag" class="dark-el-form-item">
          <el-input v-model="localTopicInfo.flag" class="dialogInput-el-input" size="small">
            <template slot="prepend">flag</template>
          </el-input>
        </el-form-item>
      </el-row>
    </el-form>

    <div class="confirm-button">
      <el-button type="green-el-button" size="medium" @click="clickConfirm">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { createTopic, updateTopic } from '@/api/admin/sys-ctf'

var proto = require('~/proto.js')

export default {
  model: {
    prop: 'topicDialog',
    event: 'topicDialogChange'
  },
  props: {
    topicDialog: {
      type: Object,
      default: () => {}
    },
    topicInfo: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      loading: false,
      // feat(QKSword)：对话框标题
      dialogTitle: '',
      // feat(QKSword)：题目对话框操作
      localTopicDialog: {
        topicDialogVisible: false, // 显示对话框
        topicOperate: 1, // 对题目的操作，1是新增题目；2是修改题目
        topicType: '' // 操作的题目类型
      },
      // feat(QKSword)：题目数据
      localTopicInfo: {
        id: '',
        created_at: '',
        updated_at: '',
        title: '',
        desc: '',
        score: 0,
        time: 0,
        overTime: 0,
        flag: '',
        url: '',
        image: ''
      },
      topicInfoRules: {
        title: [
          { required: true, message: '题目名称不能为空', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '题目描述不能为空', trigger: 'blur' }
        ],
        score: [
          { required: true, message: '题目分数不能为空', trigger: 'blur' }
        ],
        flag: [
          { required: true, message: 'flag不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    topicDialog(newVal) {
      this.localTopicDialog = newVal
      if (this.localTopicDialog.topicOperate === 1) {
        this.dialogTitle = '新增' + this.localTopicDialog.topicType + '题目'
      } else if (this.localTopicDialog.topicOperate === 2) {
        this.dialogTitle = '编辑' + this.localTopicDialog.topicType + '题目'
      }
    },
    topicInfo(newVal) {
      this.localTopicInfo = newVal
    }
  },
  methods: {
    // feat(QKSword)：dialog点击确认事件
    clickConfirm() {
      if (this.checkConfirmInfo() === false) {
        return
      }

      if (this.localTopicDialog.topicOperate === 1) {
        // 调用新增题目接口
        this.loading = true
        createTopic(this.createCtfCreateTopicProto()).then(response => {
          this.loading = false
          var data = response.data
          this.processData(data)
        })
      } else if (this.localTopicDialog.topicOperate === 2) {
        // 调用更新题目接口
        this.loading = true
        updateTopic(this.createCtfUpdateTopicProto()).then(response => {
          this.loading = false
          var data = response.data
          this.processData(data)
        })
      }
    },
    // feat(QKSword): 检测题目某些项是否存在
    checkConfirmInfo() {
      if (this.localTopicInfo.title === '') {
        this.$message({
          message: '题目名称不能为空',
          type: 'error',
          duration: 1.5 * 1000,
          customClass: 'geekMsg'
        })
        return false
      }

      if (this.localTopicInfo.desc === '') {
        this.$message({
          message: '题目描述不能为空',
          type: 'error',
          duration: 1.5 * 1000,
          customClass: 'geekMsg'
        })
        return false
      }

      if (this.localTopicInfo.score === 0) {
        this.$message({
          message: '题目分数不能为空',
          type: 'error',
          duration: 1.5 * 1000,
          customClass: 'geekMsg'
        })
        return false
      }

      if (this.localTopicInfo.flag === '') {
        this.$message({
          message: 'flag不能为空',
          type: 'error',
          duration: 1.5 * 1000,
          customClass: 'geekMsg'
        })
        return false
      }
    },
    // feat(QKSword)：生成创建题目protobuf
    createCtfCreateTopicProto() {
      var sysCtfCreateTopic = proto.lookup('SysCtfCreateTopic')
      var msg = sysCtfCreateTopic.create({
        title: this.localTopicInfo.title,
        desc: this.localTopicInfo.desc,
        score: this.localTopicInfo.score,
        time: this.localTopicInfo.time,
        overTime: this.localTopicInfo.overTime,
        flag: this.localTopicInfo.flag,
        url: this.localTopicInfo.url,
        image: this.localTopicInfo.image,
        type: this.localTopicDialog.topicType.toLowerCase()
      })

      var encodeMsg = sysCtfCreateTopic.encode(msg).finish()
      return encodeMsg.slice(0, encodeMsg.length)
    },
    // feat(QKSword)：生成更新题目protobuf
    createCtfUpdateTopicProto() {
      var sysCtfUpdateTopic = proto.lookup('SysCtfUpdateTopic')
      var msg = sysCtfUpdateTopic.create({
        title: this.localTopicInfo.title,
        desc: this.localTopicInfo.desc,
        score: this.localTopicInfo.score,
        time: this.localTopicInfo.time,
        overTime: this.localTopicInfo.overTime,
        flag: this.localTopicInfo.flag,
        url: this.localTopicInfo.url,
        image: this.localTopicInfo.image,
        id: this.localTopicInfo.id,
        type: this.localTopicDialog.topicType.toLowerCase()
      })

      var encodeMsg = sysCtfUpdateTopic.encode(msg).finish()
      return encodeMsg.slice(0, encodeMsg.length)
    },
    // feat(QKSword)：处理接口返回结果
    processData(data) {
      if (data.error === '') {
        var msg = ''

        this.localTopicDialog.topicDialogVisible = false
        this.$emit('topicDialogChange', this.localTopicDialog)
        this.$emit('topicResult', true)

        if (this.localTopicDialog.topicOperate === 1) {
          msg = '新增题目成功'
        } else if (this.localTopicDialog.topicOperate === 2) {
          msg = '更新题目成功'
        }

        this.$message({
          message: msg,
          type: 'success',
          duration: 1.5 * 1000,
          customClass: 'geekMsg' })
      } else {
        this.$message({
          message: data.error,
          type: 'error',
          duration: 1.5 * 1000,
          customClass: 'geekMsg' })
      }
    }
  }
}

</script>

<style lang="scss" scoped>
@import "@/styles/app-main.scss";

// feat(QKSword):对话框row样式
.dialog-el-row{
    margin-bottom: 30px;
}

// feat(QKSword):字体间隔
.base-span{
    padding: 0 20px;
}

// feat(QKSword):提交按钮样式
.confirm-button{
    text-align: center;
}

// feat(QKSword):数字输入框样式
.dark-el-input-number{
    width: 100px;
    ::v-deep.el-input__inner{
      color: $geekSecondaryColor;
    }
}

</style>
