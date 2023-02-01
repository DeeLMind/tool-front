<!--
 * @Author: QKSword 1064615639@qq.com
 * @Date: 2022-08-14 15:57:16
 * @LastEditors: QKSword 1064615639@qq.com
 * @LastEditTime: 2022-12-14 11:06:38
 * @FilePath: \lab-front\src\views\admin\components\UserTasks.vue
 * @Description: 展示用户正在运行的容器信息
-->
<template>
  <el-dialog
    :visible.sync="localTaskVisible"
    class="dark-el-dialog"
    append-to-body
    :title="dialogTitle"
    width="80%"
    :before-close="handleClose"
  >
    <div class="userTasksTable">

      <div class="filter-container">
        <div class="filter-group">
          <el-button type="green-el-button" icon="el-icon-delete-solid" size="medium" @click="clickSelectDelete">选中删除</el-button>
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
        @select="handleSelect"
        @select-all="handleSelect"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column label="题目" width="100">
          <template v-slot="scope">
            <el-tooltip class="item" effect="dark" :content="scope.row.title" placement="top">
              <div slot="content">{{ scope.row.title }}</div>
              <div class="rowDisplay">{{ scope.row.title }}</div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="url" width="200">
          <template v-slot="scope">
            <el-tooltip class="item" effect="dark" :content="scope.row.url" placement="top">
              <div slot="content">{{ scope.row.url }}</div>
              <div class="rowDisplay">{{ scope.row.url }}</div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="容器到期时间" width="180">
          <template v-slot="{row}">
            {{ row.time }}
          </template>
        </el-table-column>
        <el-table-column label="容器开启超时" width="180">
          <template v-slot="{row}">
            {{ row.overTime }}
          </template>
        </el-table-column>
        <el-table-column label="容器端口" width="100">
          <template v-slot="{row}">
            {{ row.port }}
          </template>
        </el-table-column>
        <el-table-column label="状态" width="100">
          <template v-slot="{row}">
            <el-tag effect="dark" :type="row.over | overFilter">
              {{ row.over === 1 ? '成功' : (row.over === 2 ? '失败': '正在运行') }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="容器目录">
          <template v-slot="scope">
            <el-tooltip class="item" effect="dark" :content="scope.row.containerId" placement="top">
              <div slot="content">{{ scope.row.dockerFileDir }}</div>
              <div class="rowDisplay">{{ scope.row.dockerFileDir }}</div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="80">
          <template v-slot="scope">
            <el-tooltip content="删除容器" placement="top">
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
    </div>
  </el-dialog>
</template>

<script>
import { getUserTasksInfo, deleteUserTasks } from '@/api/admin/sys-user'

var proto = require('~/proto.js')

export default {
  filters: {
    overFilter(over) {
      if (over === 1) {
        return 'success'
      } else if (over === 2) {
        return 'danger'
      } else if (over === 3) {
        return 'warning'
      }
    }
  },
  model: {
    prop: 'taskDialog',
    event: 'taskDialogChange'
  },
  props: {
    taskDialog: {
      type: Object,
      default: () => {}
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
      // feat(QKSword)：对话框标题
      dialogTitle: '运行容器',
      // feat(QKSword)：运行容器对话框显示操作
      localTaskVisible: false,
      // feat(QKSword)：运行容器对应用户邮箱
      localTaskEmail: '',
      // feat(QKSword)：分页管理
      pagination: {
        pageSize: 10, // 一页显示项数
        currentPage: 1, // 用户选择的当前页
        totalPage: 1 // 一共有多少页
      }
    }
  },
  watch: {
    taskDialog(newVal) {
      this.localTaskVisible = newVal.taskVisible
      this.localTaskEmail = newVal.taskEmail

      if (newVal.taskVisible === true) {
        this.getPageTaskInfo()
      }
    }
  },
  methods: {
    // feat(QKSword)：响应对话框关闭操作
    handleClose(done) {
      this.$confirm('确认关闭窗口？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        customClass: 'dark-msgbox'
      }).then(() => {
        var dialog = {}
        dialog.taskVisible = false

        this.localTaskVisible = dialog.taskVisible
        this.$emit('taskDialogChange', dialog)
        done()
      })
    },
    // feat(QKSword)：释放容器
    handleDelete(index, row) {
      this.$confirm('确认删除此容器？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        customClass: 'dark-msgbox'
      }).then(() => {
        var deleteTasksId = []
        deleteTasksId.push(row.id)

        this.deleteSelectTask(deleteTasksId)
      }).catch()
    },
    // feat(QKSword)：处理选中项
    handleSelect(row) {
      this.tableData.selection = row
    },
    // feat(QKSword)：删除选中
    clickSelectDelete() {
      var deleteTasksId = []
      this.tableData.selection.forEach(item => {
        deleteTasksId.push(item.id)
      })

      this.deleteSelectTask(deleteTasksId)
    },
    // feat(QKSword)：选择每页显示数量
    handleSizeChange(val) {
      this.pagination.pageSize = val
      this.getPageTaskInfo()
    },
    // feat(QKSword)：选择不同页面
    handleCurrentChange(val) {
      this.pagination.currentPage = val
      this.getPageTaskInfo()
    },
    // feat(QKSword)：获取指定页面用户信息
    getPageTaskInfo() {
      this.loading = true
      getUserTasksInfo(this.createGetUserTasksInfoProto()).then(response => {
        this.loading = false
        var data = response.data
        if (data.error === '') {
          this.pagination.totalPage = data.sysUserTasksNum
          this.tableData.display = data.sysUserTasksInfo
        } else {
          this.$message({
            message: data.error,
            type: 'error',
            duration: 1.5 * 1000,
            customClass: 'geekMsg' })
        }
      })
    },
    // feat(QKSword):生成getUserTasksInfo的protobuf
    createGetUserTasksInfoProto() {
      var sysUserGetUserTasksInfo = proto.lookup('SysUserGetUserTasksInfo')
      var msg = sysUserGetUserTasksInfo.create({
        email: this.localTaskEmail,
        pageSize: this.pagination.pageSize,
        currentPage: this.pagination.currentPage
      })

      var encodeMsg = sysUserGetUserTasksInfo.encode(msg).finish()
      return encodeMsg.slice(0, encodeMsg.length)
    },
    // feat(QKSword):生成getUserTasksNum的protobuf
    createGetUserTasksNumProto() {
      var sysUserGetUserTasksNum = proto.lookup('SysUserGetUserTasksNum')
      var msg = sysUserGetUserTasksNum.create({
        email: this.localTaskEmail
      })

      var encodeMsg = sysUserGetUserTasksNum.encode(msg).finish()
      return encodeMsg.slice(0, encodeMsg.length)
    },
    // feat(QKSword)：删除指定容器
    deleteSelectTask(deleteTasksId) {
      this.loading = true
      deleteUserTasks(this.createDeleteUserTasksProto(deleteTasksId)).then(response => {
        this.loading = false
        var data = response.data
        if (data.error === '') {
          this.getPageTaskInfo()
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
    // feat(QKSword):生成deleteUserTasks的protobuf
    createDeleteUserTasksProto(deleteTasksId) {
      var sysUserDeleteTasks = proto.lookup('SysUserDeleteTasks')
      var msg = sysUserDeleteTasks.create({
        email: this.localTaskEmail,
        id: deleteTasksId
      })

      var encodeMsg = sysUserDeleteTasks.encode(msg).finish()
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

// feat(QKSword)：分页选择布局
.pagination{
  float: right;
}

// feat(DeeLMind)固定task大写，添加滚动栏
.userTasksTable{
  height: 600px;
  overflow-y:auto;
  position: relative;
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
</style>

<style lang="scss">
@import "@/styles/app-main.scss";

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
