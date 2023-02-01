<!--
 * @Author: QKSword 1064615639@qq.com
 * @Date: 2022-08-09 16:26:06
 * @LastEditors: QKSword 1064615639@qq.com
 * @LastEditTime: 2022-12-28 18:01:18
 * @FilePath: \lab-front\src\views\admin\components\OperateUser.vue
 * @Description: 用户信息管理组件
-->
<template>
  <div class="components-container">
    <div class="userTable">
      <div class="filter-container">
        <div class="filter-group">
          <label class="base-label">用户权限</label>
          <el-select
            v-model="search.roleType"
            clearable
            class="dark-el-select"
            :popper-append-to-body="false"
            size="small"
            filterable
          >
            <el-option v-for="option in search.roleTypeOptions" :key="option.value" :label="option.label" :value="option.value" />
          </el-select>
        </div>
        <div class="filter-group">
          <label class="base-label">创建时间</label>
          <el-date-picker
            v-model="search.createTime"
            class="dark-el-data-picker"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            popper-class="dark-datepicker-popper"
          />
        </div>
        <div class="filter-group">
          <label class="base-label">分数范围</label>
          <el-input-number v-model="search.minScore" class="dark-el-input-number" size="small" controls-position="right" :min="0" :step="1" />
          <el-input-number v-model="search.maxScore" class="dark-el-input-number" size="small" controls-position="right" :min="0" :step="1" />
        </div>
        <div class="filter-group">
          <label class="base-label">用户状态</label>
          <el-select
            v-model="search.activeType"
            clearable
            class="dark-el-select"
            :popper-append-to-body="false"
            size="small"
            filterable
          >
            <el-option v-for="option in search.activeTypeOptions" :key="option.value" :label="option.label" :value="option.value" />
          </el-select>
        </div>
        <div class="filter-group">
          <el-input v-model="search.email" class="search-el-input" size="small">
            <template slot="prepend">邮箱</template>
          </el-input>
        </div>
        <div class="filter-group">
          <el-button type="green-el-button" icon="el-icon-search" size="medium" @click="clickSearchUser">搜索用户</el-button>
        </div>
      </div>
      <div class="filter-container">
        <div class="filter-group">
          <el-button type="green-el-button" icon="el-icon-refresh" size="medium" @click="clickRefreshUser">刷新用户</el-button>
        </div>
        <div class="filter-group">
          <el-button type="green-el-button" icon="el-icon-delete-solid" size="medium" @click="clickSelectDelete">选中删除</el-button>
        </div>
        <div class="filter-group">
          <el-button type="green-el-button" icon="el-icon-circle-plus" size="medium" @click="clickCreateUser">新增用户</el-button>
        </div>
      </div>

      <el-table
        ref="multipleTable"
        v-loading="loading"
        element-loading-spinner="el-icon-loading"
        element-loading-text="拼命努力中"
        class="dark-el-table"
        :data="tableData.display"
        :cell-style="cellStyle"
        :header-cell-style="headerCellStyle"
        :default-sort="{order: 'descending'}"
        @select="handleSelect"
        @select-all="handleSelect"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column width="80" label="ID">
          <template v-slot="{row}">
            {{ row.id }}
          </template>
        </el-table-column>
        <el-table-column label="用户名">
          <template v-slot="scope">
            <el-tooltip class="item" effect="dark" :content="scope.row.username" placement="top">
              <div slot="content">{{ scope.row.username }}</div>
              <div class="rowDisplay">{{ scope.row.username }}</div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="邮箱">
          <template v-slot="scope">
            <el-tooltip class="item" effect="dark" :content="scope.row.email" placement="top">
              <div slot="content">{{ scope.row.email }}</div>
              <div class="rowDisplay">{{ scope.row.email }}</div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column width="80" label="权限">
          <template v-slot="{row}">
            {{ row.role }}
          </template>
        </el-table-column>
        <el-table-column width="180" label="创建时间">
          <template v-slot="{row}">
            {{ row.created_at }}
          </template>
        </el-table-column>
        <el-table-column sortable width="100" label="总分" prop="score">
          <template v-slot="{row}">
            {{ row.score }}
          </template>
        </el-table-column>
        <el-table-column sortable width="80" label="状态" prop="active">
          <template v-slot="{row}">
            <el-tag effect="dark" :type="row.active | activeFilter">
              {{ row.active === true ? '注销' : '正常' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column width="80" label="运行容器">
          <template v-slot="scope">
            <el-tooltip content="查看运行容器" placement="top">
              <el-button type="gray-el-button" icon="el-icon-search" size="mini" @click="handleViewTask(scope.$index, scope.row)" />
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column width="80" label="完成题目">
          <template v-slot="scope">
            <el-tooltip content="查看完成题目" placement="top">
              <el-button type="gray-el-button" icon="el-icon-search" size="mini" @click="handleViewTaskOver(scope.$index, scope.row)" />
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template v-slot="scope">
            <el-tooltip content="编辑用户" placement="top">
              <el-button type="gray-el-button" icon="el-icon-edit" size="mini" @click="handleEdit(scope.$index, scope.row)" />
            </el-tooltip>
            <el-tooltip content="删除用户" placement="top">
              <el-button type="gray-el-button" icon="el-icon-delete" size="mini" @click="handleDelete(scope.$index, scope.row)" />
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination">
        <el-pagination
          class="dark-el-pagination"
          background
          layout="sizes, prev, pager, next, jumper"
          :page-sizes="[10, 15, 20]"
          :page-size="pagination.pageSize"
          :total="pagination.totalPage"
          popper-class="dark-pagination-popper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>

      <user-tasks v-model="taskDialog" />
      <user-task-over v-model="taskOverDialog" />
      <operate-user v-model="userDialog" :user-info="userInfo" @userResult="getUserResult" />
    </div>
  </div>
</template>

<script>
import { getUserInfo, deleteUser, searchUser } from '@/api/admin/sys-user'
import { FormatDataToSecond } from '@/libs/common/data'
import UserTasks from '@/views/admin/components/UserTasks.vue'
import UserTaskOver from '@/views/admin/components/UserTaskOver.vue'
import OperateUser from '@/views/admin/components/OperateUser.vue'

var proto = require('~/proto.js')

export default {
  components: { UserTasks, UserTaskOver, OperateUser },
  filters: {
    activeFilter(active) {
      if (active === true) {
        return 'danger'
      } else {
        return 'success'
      }
    }
  },
  data() {
    return {
      loading: false,
      // feat(QKSword)：显示数据
      tableData: {
        display: [], // 显示数据
        selection: [] // 当前页面选中项
      },
      // feat(QKSword)：用于用户搜索
      search: {
        roleType: 'all', // 用户权限
        roleTypeOptions: [
          { label: 'all', value: 'all' },
          { label: 'user', value: 'user' },
          { label: 'admin', value: 'admin' }
        ],
        createTime: [], // 用户创建时间段
        minScore: 0,
        maxScore: 0,
        activeType: 'all',
        activeTypeOptions: [
          { label: 'all', value: 'all' },
          { label: '正常', value: 'false' },
          { label: '注销', value: 'true' }
        ],
        email: ''
      },
      // feat(QKSword)：分页
      pagination: {
        pageSize: 10, // 一页显示项数
        currentPage: 1, // 用户选择的当前页
        totalPage: 1 // 一共有多少页
      },
      // feat(QKSword): 运行容器对话框内容
      taskDialog: {
        taskVisible: false,
        taskEmail: '' // 指定运行容器对应的用户邮箱
      },
      // feat(QKSword): 完成题目对话框
      taskOverDialog: {
        taskOverVisible: false,
        taskOverEmail: ''
      },
      // feat(QKSword)：题目对话框操作
      userDialog: {
        userDialogVisible: false, // 显示对话框
        userOperate: 1 // 对题目的操作，1是新增用户；2是修改用户
      },
      // feat(QKSword)：题目数据
      userInfo: {
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
      }
    }
  },
  mounted() {
    this.getPageUserInfo()
  },
  methods: {
    getUserResult(e) {
      if (e === true) {
        this.getPageUserInfo()
      }
    },
    // feat(QKSword)：搜索用户
    clickSearchUser() {
      this.loading = true
      searchUser(this.createSearchUserProto()).then(response => {
        this.loading = false
        var data = response.data
        if (data.error === '') {
          this.pagination.totalPage = data.sysUserSearchNum
          this.tableData.display = data.sysUserSearchInfo
          this.$message({
            message: '搜索成功',
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
      })
    },
    // feat(QKSword):生成搜索用户信息的protobuf
    createSearchUserProto() {
      var roleType = ''
      var startTime = ''
      var endTime = ''
      var activeType = ''

      if (this.search.roleType === 'all') {
        roleType = ''
      } else {
        roleType = this.search.roleType
      }

      if (this.search.createTime !== null && this.search.createTime.length !== 0) {
        startTime = FormatDataToSecond(this.search.createTime[0].getTime())
        endTime = FormatDataToSecond(this.search.createTime[1].getTime())
      } else {
        startTime = ''
        endTime = ''
      }

      if (this.search.activeType === 'all') {
        activeType = ''
      } else {
        activeType = this.search.activeType
      }

      var sysUserSearchUser = proto.lookup('SysUserSearchUser')
      var msg = sysUserSearchUser.create({
        pageSize: this.pagination.pageSize,
        currentPage: this.pagination.currentPage,
        role: roleType,
        startTime: startTime,
        endTime: endTime,
        minScore: this.search.minScore,
        maxScore: this.search.maxScore,
        active: activeType,
        userEmail: this.search.email
      })

      var encodeMsg = sysUserSearchUser.encode(msg).finish()
      return encodeMsg.slice(0, encodeMsg.length)
    },
    // feat(QKSword)：刷新用户
    clickRefreshUser() {
      this.getPageUserInfo()
    },
    // feat(QKSword)：删除选中
    clickSelectDelete() {
      var deleteUserId = []
      this.tableData.selection.forEach(item => {
        deleteUserId.push(item._id)
      })

      this.deleteSelectUser(deleteUserId)
    },
    // feat(QKSword)：删除指定用户
    deleteSelectUser(deleteUserId) {
      this.loading = true
      deleteUser(this.createDeleteUserProto(deleteUserId)).then(response => {
        this.loading = false
        var data = response.data
        if (data.error === '') {
          this.getPageUserInfo()
          this.$message({
            message: '成功删除',
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
      })
    },
    // feat(QKSword):生成删除指定用户的protobuf
    createDeleteUserProto(deleteUserId) {
      var sysUserDeleteUser = proto.lookup('SysUserDeleteUser')
      var msg = sysUserDeleteUser.create({
        id: deleteUserId
      })

      var encodeMsg = sysUserDeleteUser.encode(msg).finish()
      return encodeMsg.slice(0, encodeMsg.length)
    },
    // feat(QKSword)：创建用户
    clickCreateUser() {
      var newUserDialog = {}
      var newUserInfo = {}

      newUserDialog.userDialogVisible = true
      newUserDialog.userOperate = 1
      this.userDialog = newUserDialog

      newUserInfo._id = ''
      newUserInfo.id = 0
      newUserInfo.username = ''
      newUserInfo.password = ''
      newUserInfo.email = ''
      newUserInfo.role = 'user'
      newUserInfo.created_at = ''
      newUserInfo.updated_at = ''
      newUserInfo.score = 0
      newUserInfo.active = false
      this.userInfo = newUserInfo
    },
    // feat(QKSword)：处理选中项
    handleSelect(row) {
      this.tableData.selection = row
    },
    // feat(QKSword)：响应查看用户正在运行的容器
    handleViewTask(index, row) {
      var dialog = {}

      dialog.taskVisible = true
      dialog.taskEmail = row.email

      this.taskDialog = dialog
    },
    // feat(QKSword)：响应查看用户完成题目
    handleViewTaskOver(index, row) {
      var dialog = {}

      dialog.taskOverVisible = true
      dialog.taskOverEmail = row.email

      this.taskOverDialog = dialog
    },
    // feat(QKSword):响应编辑用户信息
    handleEdit(index, row) {
      var newUserDialog = {}

      newUserDialog.userDialogVisible = true
      newUserDialog.userOperate = 2
      this.userDialog = newUserDialog

      this.userInfo = row
    },
    // feat(QKSword):响应删除用户信息
    handleDelete(index, row) {
      this.$confirm('确认删除此用户？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        customClass: 'dark-msgbox'
      }).then(() => {
        var deleteUserId = []
        deleteUserId.push(row._id)

        this.deleteSelectUser(deleteUserId)
      }).catch()
    },
    // feat(QKSword)：选择每页显示数量
    handleSizeChange(val) {
      this.pagination.pageSize = val
      this.getPageUserInfo()
    },
    // feat(QKSword)：选择不同页面
    handleCurrentChange(val) {
      this.pagination.currentPage = val
      this.getPageUserInfo()
    },
    // feat(QKSword)：获取指定页面用户信息
    getPageUserInfo() {
      this.loading = true
      getUserInfo(this.createGetUserInfoProto()).then(response => {
        this.loading = false
        var data = response.data
        if (data.error === '') {
          this.pagination.totalPage = data.sysUserNum
          this.tableData.display = data.sysUserInfo
        } else {
          this.$message({
            message: data.error,
            type: 'error',
            duration: 1.5 * 1000,
            customClass: 'geekMsg' })
        }
      })
    },
    // feat(QKSword):生成getUserInfo的protobuf
    createGetUserInfoProto() {
      var sysUserGetUserInfo = proto.lookup('SysUserGetUserInfo')
      var msg = sysUserGetUserInfo.create({
        pageSize: this.pagination.pageSize,
        currentPage: this.pagination.currentPage
      })

      var encodeMsg = sysUserGetUserInfo.encode(msg).finish()
      return encodeMsg.slice(0, encodeMsg.length)
    },
    headerCellStyle({ row, column, rowIndex, columnIndex }) {
      let headerCellSytle = {}
      headerCellSytle = {
        'background-color': '#1e1e1e',
        'font-family': 'Microsoft YaHei',
        'color': '#fe6d32',
        'border-color': '#b9b8b8'
      }
      return headerCellSytle
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      let cellSytle = {}
      cellSytle = {
        'background-color': '#252322',
        'font-family': 'Microsoft YaHei',
        'color': '#b9b8b8',
        'border-color': '#b9b8b8'
      }
      return cellSytle
    }
  }
}

</script>

<style lang="scss" scoped>
@import "@/styles/app-main.scss";

.components-container{
    padding: 20px;
}

// feat(QKSword)：el-input-number自定义样式
.dark-el-input-number{
    width: 100px;
}

// feat(QKSword)：大量数据在el-table中一行显示
.rowDisplay{
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: 1; //行数
  -webkit-box-orient: vertical;
}

// feat(DeeLMind)固定task大写，添加滚动栏
.userTable{
  height: 600px;
  overflow-y:auto;
  position: relative;
}

// feat(QKSword):每个过滤项布局
.filter-group{
  display: inline-block;
  padding-right: 15px;
}

.input-group{
  display: inline-block;
}

// feat(QKSword): 日历选择器样式
.dark-el-data-picker{
  background-color: $selectColor;
  border-color: $selectColor;
  width: 250px;
}

.dark-el-data-picker:hover{
  border-color: $geekColor;
}

// feat(QKSword): 日历选择器开始日期,结束日期的布局
::v-deep.dark-el-data-picker.el-date-editor .el-range-input {
  background-color: transparent;
  font-family: "Microsoft YaHei";
  color: $fontColor;
}

::v-deep.dark-el-data-picker.el-date-editor .el-range-separator{
  color: $fontColor;
}

// feat(QKSword)：分页选择布局
.pagination{
  float: right;
}

// feat(QKSword)：el-table中结果项显示样式
::v-deep.el-tag--dark.el-tag--success{
  font-family: "Microsoft YaHei";
  color: black;
}

::v-deep.el-tag--dark.el-tag--danger{
  font-family: "Microsoft YaHei";
  color: black;
}

::v-deep.el-tag--dark.el-tag--warning{
  font-family: "Microsoft YaHei";
  color: black;
}

// feat(QKSword):对话框输入框样式
.search-el-input{
    ::v-deep.el-input__inner{
        border-radius: 5px;
        border-color: transparent;
        font-family: "Microsoft YaHei";
        color: $fontColor;
        background-color: $inputColor;
        font-size: 14px;
    }

    ::v-deep.el-input-group__prepend{
        padding: 0px 10px 0px 0px;
        font-weight:700;
        color: $geekSecondaryColor;
        background-color: transparent;
        border-color: transparent;
        font-family: "Microsoft YaHei";
        font-size: 16px;
    }

    ::v-deep.el-input__inner:focus,
    ::v-deep.el-input__inner:active,
    ::v-deep.el-input__inner:hover{
        background-color: $inputColor;
        border-color: $geekColor;
        color: $fontColor;
    }
}

</style>

<style lang="scss">
@import "@/styles/app-main.scss";

// 时间选择器下拉框样式
.dark-datepicker-popper{
  background-color: $mainColor;
  border-color: $geekColor;
  color:white;

  // 日历分割线样式
  .el-date-range-picker__content.is-left{
    border-right: 1px solid $geekColor;
  }

  // 月份选择按钮样式
  .el-picker-panel__icon-btn{
    color: white;
  }

  // 表头颜色
  .el-date-table th{
    color: white;
    border-bottom: 1px solid $geekColor;
  }

  // 选择位置样式
  .el-date-table td.start-date div,
  .el-date-table td.end-date div,
  .el-date-table td.in-range div{
    background-color: $geekColor;
    color: $mainColor;
  }

  // 选择开始/结束位置圆形样式
  .el-date-table td.start-date span,
  .el-date-table td.end-date span{
    background-color: $geekColor;
  }

  .el-date-table td:hover{
    color: $geekColor;
  }

  .el-date-table td.today span{
    color: $orangeColor;
  }
}

// 下拉框处的三角形
.dark-datepicker-popper[x-placement^=bottom] .popper__arrow{
  border-bottom-color: $geekColor;
}

.dark-datepicker-popper[x-placement^=bottom] .popper__arrow::after{
  border-bottom-color: $mainColor;
}

// feat(QKSword)：分页选择下拉框样式
.dark-pagination-popper{
  color: $selectFontColor;
  background-color: $mainColor;
  border-color: $geekColor;
  font-family: "Microsoft YaHei";

  .el-select-dropdown__item.hover{
      color: $mainColor;
      background-color: $geekColor;
  }

  .el-select-dropdown__item.selected{
      color: #FFFFFF;
  }
}

</style>

