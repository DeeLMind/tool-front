<!--
 * @Author: QKSword 1064615639@qq.com
 * @Date: 2022-08-14 15:57:35
 * @LastEditors: QKSword 1064615639@qq.com
 * @LastEditTime: 2022-12-26 16:52:18
 * @FilePath: \lab-front\src\views\admin\components\UserTaskOver.vue
 * @Description: 展示用户完成题目信息
-->
<template>
  <el-dialog
    :visible.sync="localTaskOverVisible"
    class="dark-el-dialog"
    append-to-body
    :title="dialogTitle"
    :before-close="handleClose"
  >
    <div class="userTaskOverTable">

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
        <el-table-column label="题目">
          <template v-slot="scope">
            <el-tooltip class="item" effect="dark" :content="scope.row.title" placement="top">
              <div slot="content">{{ scope.row.title }}</div>
              <div class="rowDisplay">{{ scope.row.title }}</div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="完成时间" width="180">
          <template v-slot="{row}">
            {{ row.time }}
          </template>
        </el-table-column>
        <el-table-column label="题目类型" width="100">
          <template v-slot="{row}">
            {{ row.type }}
          </template>
        </el-table-column>
        <el-table-column label="题目分数" width="100">
          <template v-slot="{row}">
            {{ row.score }}
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
import { getUserTaskOverInfo } from '@/api/admin/sys-user'

var proto = require('~/proto.js')

export default ({
  model: {
    prop: 'taskOverDialog',
    event: 'taskOverDialogChange'
  },
  props: {
    taskOverDialog: {
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
      dialogTitle: '完成题目',
      // feat(QKSword)：运行容器对话框显示操作
      localTaskOverVisible: false,
      // feat(QKSword)：运行容器对应用户邮箱
      localTaskOverEmail: '',
      // feat(QKSword)：分页管理
      pagination: {
        pageSize: 10, // 一页显示项数
        currentPage: 1, // 用户选择的当前页
        totalPage: 1 // 一共有多少页
      }
    }
  },
  watch: {
    taskOverDialog(newVal) {
      this.localTaskOverVisible = newVal.taskOverVisible
      this.localTaskOverEmail = newVal.taskOverEmail

      if (newVal.taskOverVisible === true) {
        this.getPageTaskOverInfo()
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
        dialog.taskOverVisible = false

        this.localTaskOverVisible = false
        this.$emit('taskOverDialogChange', dialog)
        done()
      })
    },
    // feat(QKSword)：获取指定页面用户完成题目信息
    getPageTaskOverInfo() {
      this.loading = true
      getUserTaskOverInfo(this.createGetUserTaskOverInfoProto()).then(response => {
        this.loading = false
        var data = response.data
        if (data.error === '') {
          this.pagination.totalPage = data.sysUserTaskOverNum
          this.tableData.display = data.sysUserTaskOverInfo
        } else {
          this.$message({
            message: data.error,
            type: 'error',
            duration: 1.5 * 1000,
            customClass: 'geekMsg' })
        }
      })
    },
    // feat(QKSword):生成getUserTaskOverInfo的protobuf
    createGetUserTaskOverInfoProto() {
      var sysUserGetUserTaskOverInfo = proto.lookup('SysUserGetUserTaskOverInfo')
      var msg = sysUserGetUserTaskOverInfo.create({
        email: this.localTaskOverEmail,
        pageSize: this.pagination.pageSize,
        currentPage: this.pagination.currentPage
      })

      var encodeMsg = sysUserGetUserTaskOverInfo.encode(msg).finish()
      return encodeMsg.slice(0, encodeMsg.length)
    },
    // feat(QKSword)：生成getUserTaskOverNum的protobuf
    createGetUserTaskOverNumProto() {
      var sysUserGetUserTaskOverNum = proto.lookup('SysUserGetUserTaskOverNum')
      var msg = sysUserGetUserTaskOverNum.create({
        email: this.localTaskEmail
      })

      var encodeMsg = sysUserGetUserTaskOverNum.encode(msg).finish()
      return encodeMsg.slice(0, encodeMsg.length)
    },
    // feat(QKSword)：处理选中项
    handleSelect(row) {
      this.tableData.selection = row
    },
    // feat(QKSword)：选择每页显示数量
    handleSizeChange(val) {
      this.pagination.pageSize = val
      this.getPageTaskOverInfo()
    },
    // feat(QKSword)：选择不同页面
    handleCurrentChange(val) {
      this.pagination.currentPage = val
      this.getPageTaskOverInfo()
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

})
</script>

<style lang="scss" scoped>
@import "@/styles/app-main.scss";

// feat(DeeLMind)固定task大写，添加滚动栏
.userTaskOverTable{
  height: 600px;
  overflow-y:auto;
  position: relative;
}

// feat(QKSword)：分页选择布局
.pagination{
  float: right;
}

</style>
