<template>
  <el-dialog
    v-loading="loading"
    element-loading-spinner="el-icon-loading"
    element-loading-text="拼命努力中"
    :visible.sync="localUserDialog.userDialogVisible"
    class="dark-el-dialog"
    append-to-body
    :title="dialogTitle"
  >
    <el-form
      ref="localUserInfo"
      :model="localUserInfo"
      :rules="userInfoRules"
      autocomplete="on"
    >
      <el-row>
        <el-col :xs="24" :sm="24" :lg="18">
          <el-form-item prop="_id" class="dark-el-form-item">
            <el-input v-model="localUserInfo._id" class="dialogInput-el-input" size="small" readonly>
              <template slot="prepend">ObjectId</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="6">
          <el-form-item prop="id" class="dark-el-form-item">
            <el-input v-model="localUserInfo.id" class="dialogInput-el-input" size="small" readonly>
              <template slot="prepend">ID</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :xs="24" :sm="24" :lg="12">
          <el-form-item prop="created_at" class="dark-el-form-item">
            <el-input v-model="localUserInfo.created_at" class="dialogInput-el-input" size="small" readonly>
              <template slot="prepend">创建时间</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="12">
          <el-form-item prop="updated_at" class="dark-el-form-item">
            <el-input v-model="localUserInfo.updated_at" class="dialogInput-el-input" size="small" readonly>
              <template slot="prepend">更新时间</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :xs="24" :sm="24" :lg="12">
          <el-form-item prop="username" class="dark-el-form-item">
            <el-input v-model="localUserInfo.username" class="dialogInput-el-input" size="small">
              <template slot="prepend">用户名</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="12">
          <el-form-item prop="password" class="dark-el-form-item">
            <el-input v-model="localUserInfo.password" class="dialogInput-el-input" size="small">
              <template slot="prepend">密码</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-form-item prop="email" class="dark-el-form-item">
          <el-input v-model="localUserInfo.email" class="dialogInput-el-input" size="small">
            <template slot="prepend">邮箱</template>
          </el-input>
        </el-form-item>
      </el-row>

      <el-row>
        <el-col :xs="24" :sm="24" :lg="8">
          <el-form-item prop="role" class="dark-el-form-item">
            <span class="base-span">用户权限</span>
            <el-select
              v-model="localUserInfo.role"
              clearable
              class="dark-el-select"
              :popper-append-to-body="false"
              size="small"
              filterable
            >
              <el-option v-for="option in roleTypeOptions" :key="option.value" :label="option.label" :value="option.value" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="8">
          <el-form-item prop="active" class="dark-el-form-item">
            <span class="base-span">用户状态</span>
            <el-select
              v-model="localUserInfo.active"
              clearable
              class="dark-el-select"
              :popper-append-to-body="false"
              size="small"
              filterable
            >
              <el-option v-for="option in activeTypeOptions" :key="option.value" :label="option.label" :value="option.value" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="8">
          <el-form-item prop="score" class="dark-el-form-item">
            <span class="base-span">用户总分</span>
            <el-input-number v-model="localUserInfo.score" class="dark-el-input-number" size="small" controls-position="right" :min="0" :step="1" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <div class="confirm-button">
      <el-button type="green-el-button" size="medium" @click="clickConfirm">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>

import { createUser, updateUser } from '@/api/admin/sys-user'

var proto = require('~/proto.js')

export default {
  model: {
    prop: 'userDialog',
    event: 'userDialogChange'
  },
  props: {
    userDialog: {
      type: Object,
      default: () => {}
    },
    userInfo: {
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
      localUserDialog: {
        userDialogVisible: false, // 显示对话框
        userOperate: 1 // 对题目的操作，1是新增用户；2是编辑用户
      },
      // feat(QKSword)：题目数据
      localUserInfo: {
        _id: '',
        id: 0,
        username: '',
        password: '',
        email: '',
        role: '',
        created_at: '',
        updated_at: '',
        score: 0,
        active: false
      },
      // feat(QKSword)：用户权限选择
      roleTypeOptions: [
        { label: 'user', value: 'user' },
        { label: 'admin', value: 'admin' }
      ],
      // feat(QKSword)：用户状态选择
      activeTypeOptions: [
        { label: '正常', value: false },
        { label: '注销', value: true }
      ],
      // feat(QKSword)：用户状态选择
      userInfoRules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '用户密码不能为空', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '用户邮箱不能为空', trigger: 'blur' }
        ],
        role: [
          { required: true, message: '用户权限不能为空', trigger: 'blur' }
        ],
        active: [
          { required: true, message: '用户状态不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    userDialog(newVal) {
      this.localUserDialog = newVal
      if (this.localUserDialog.userOperate === 1) {
        this.dialogTitle = '新增用户'
      } else if (this.localUserDialog.userOperate === 2) {
        this.dialogTitle = '编辑用户'
      }
    },
    userInfo(newVal) {
      this.localUserInfo = newVal
    }
  },
  methods: {
    // feat(QKSword)：dialog点击确认事件
    clickConfirm() {
      if (this.checkConfirmInfo() === false) {
        return
      }

      if (this.localUserDialog.userOperate === 1) {
        // 调用新增用户接口
        this.loading = true
        createUser(this.createCreateUserProto()).then(response => {
          this.loading = false
          var data = response.data
          this.processData(data)
        })
      } else if (this.localUserDialog.userOperate === 2) {
        // 调用更新用户接口
        this.loading = true
        updateUser(this.createUpdateUserProto()).then(response => {
          this.loading = false
          var data = response.data
          this.processData(data)
        })
      }
    },
    // feat(QKSword)：生成createUser相关protobuf
    createCreateUserProto() {
      var sysUserCreateUser = proto.lookup('SysUserCreateUser')
      var msg = sysUserCreateUser.create({
        username: this.localUserInfo.username,
        password: this.localUserInfo.password,
        email: this.localUserInfo.email,
        role: this.localUserInfo.role,
        score: this.localUserInfo.score,
        active: this.localUserInfo.active
      })

      var encodeMsg = sysUserCreateUser.encode(msg).finish()
      return encodeMsg.slice(0, encodeMsg.length)
    },
    // feat(QKSword)：生成createUser相关protobuf
    createUpdateUserProto() {
      var sysUserUpdateUser = proto.lookup('SysUserUpdateUser')
      var msg = sysUserUpdateUser.create({
        id: this.localUserInfo._id,
        username: this.localUserInfo.username,
        password: this.localUserInfo.password,
        email: this.localUserInfo.email,
        role: this.localUserInfo.role,
        score: this.localUserInfo.score,
        active: this.localUserInfo.active
      })

      var encodeMsg = sysUserUpdateUser.encode(msg).finish()
      return encodeMsg.slice(0, encodeMsg.length)
    },
    // feat(QKSword)：处理接口返回结果
    processData(data) {
      if (data.error === '') {
        var msg = ''

        this.localUserDialog.userDialogVisible = false
        this.$emit('userDialogChange', this.localUserDialog)
        this.$emit('userResult', true)

        if (this.localUserDialog.userOperate === 1) {
          msg = '新增用户'
        } else if (this.localUserDialog.userOperate === 2) {
          msg = '编辑用户'
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
    },
    // feat(QKSword): 检测题目某些项是否存在
    checkConfirmInfo() {
      if (this.localUserInfo.username === '') {
        this.$message({
          message: '用户名不能为空',
          type: 'error',
          duration: 1.5 * 1000,
          customClass: 'geekMsg'
        })
        return false
      }

      if (this.localUserInfo.password === '') {
        this.$message({
          message: '用户密码不能为空',
          type: 'error',
          duration: 1.5 * 1000,
          customClass: 'geekMsg'
        })
        return false
      }

      if (this.localUserInfo.email === '') {
        this.$message({
          message: '用户邮箱不能为空',
          type: 'error',
          duration: 1.5 * 1000,
          customClass: 'geekMsg'
        })
        return false
      }

      if (this.localUserInfo.role === '') {
        this.$message({
          message: '用户权限不能为空',
          type: 'error',
          duration: 1.5 * 1000,
          customClass: 'geekMsg'
        })
        return false
      }

      if (this.localUserInfo.active === '') {
        this.$message({
          message: '用户状态不能为空',
          type: 'error',
          duration: 1.5 * 1000,
          customClass: 'geekMsg'
        })
        return false
      }
    }
  }
}

</script>

<style lang="scss" scoped>
@import "@/styles/app-main.scss";

// feat(QKSword):字体间隔
.base-span{
    padding: 0 20px;
    vertical-align: middle;
}

// feat(QKSword):新增选择框样式
.dark-el-select{
    ::v-deep.el-input--small .el-input__inner{
        color: $geekSecondaryColor;
        background-color: $selectColor;
        border-color: $selectColor;
        font-family: "Microsoft YaHei";
        font-size: 14px;
    }
}

// feat(QKSword):提交按钮样式
.confirm-button{
    text-align: center;
}

// feat(QKSword):数据输入框样式
.dark-el-input-number{
    width: 125px;
}
</style>
