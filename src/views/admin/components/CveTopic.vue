<!--
 * @Author: QKSword 1064615639@qq.com
 * @Date: 2022-12-15 10:40:38
 * @LastEditors: QKSword 1064615639@qq.com
 * @LastEditTime: 2022-12-15 17:08:22
 * @FilePath: \lab-front\src\views\admin\components\CveTopic.vue
 * @Description: 管理cve题目组件
-->
<template>
  <div class="components-container">
    <div class="cveTopic">
      <div class="filter-container">
        <div class="filter-group">
          <label class="base-label">题目类型</label>
          <el-select
            v-model="filter.cveType"
            clearable
            class="dark-el-select-multiple"
            :popper-append-to-body="false"
            size="small"
            filterable
            @change="topicSelect"
          >
            <el-option v-for="option in filter.cveTypeOptions" :key="option.value" :label="option.label" :value="option.value" />
          </el-select>
        </div>
        <div class="filter-group">
          <el-button type="green-el-button" icon="el-icon-refresh" size="medium" @click="clickRefreshTopic">刷新题目</el-button>
        </div>
        <div class="filter-group">
          <el-button type="green-el-button" icon="el-icon-delete-solid" size="medium" @click="clickSelectDelete">选中删除</el-button>
        </div>
        <div class="filter-group">
          <el-button type="green-el-button" icon="el-icon-circle-plus" size="medium" @click="clickCreateTopic">新增题目</el-button>
        </div>
      </div>

      <el-table
        ref="multipleTable"
        v-loading="loading"
        element-loading-spinner="el-icon-loading"
        element-loading-text="拼命努力中"
        element-loading-background="rgba(30, 30, 30, 0.8)"
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
        <el-table-column label="描述">
          <template v-slot="scope">
            <el-tooltip class="item" effect="dark" :content="scope.row.desc" placement="top">
              <div slot="content">{{ scope.row.desc }}</div>
              <div class="rowDisplay">{{ scope.row.desc }}</div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" width="180">
          <template v-slot="{row}">
            {{ row.created_at }}
          </template>
        </el-table-column>
        <el-table-column label="容器镜像">
          <template v-slot="scope">
            <el-tooltip class="item" effect="dark" :content="scope.row.image" placement="top">
              <div slot="content">{{ scope.row.image }}</div>
              <div class="rowDisplay">{{ scope.row.image }}</div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template v-slot="scope">
            <el-tooltip content="编辑题目" placement="top">
              <el-button type="gray-el-button" icon="el-icon-edit" size="mini" @click="handleEdit(scope.$index, scope.row)" />
            </el-tooltip>
            <el-tooltip content="删除题目" placement="top">
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

      <operate-cve-topic v-model="topicDialog" :topic-info="topicInfo" @topicResult="getTopicResult" />
    </div>
  </div>
</template>

<script>

import { getTopicInfo, deleteTopic } from '@/api/admin/sys-cve'
import OperateCveTopic from './OperateCveTopic.vue'

var proto = require('~/proto.js')

export default {
  components: { OperateCveTopic },
  data() {
    return {
      loading: false,
      // feat(QKSword)：显示数据
      tableData: {
        display: [], // 显示数据
        selection: [] // 当前页面选中项
      },
      // feat(QKSword)：题目类型选择
      filter: {
        cveType: 'main',
        cveTypeOptions: [
          { label: 'main', value: 'main' },
          { label: 'wordpress', value: 'wordpress' }]
      },
      // feat(QKSword)：分页管理
      pagination: {
        pageSize: 10, // 一页显示项数
        currentPage: 1, // 用户选择的当前页
        totalPage: 1 // 一共有多少页
      },
      // feat(QKSword)：题目对话框操作
      topicDialog: {
        topicDialogVisible: false, // 显示对话框
        topicOperate: 1, // 对题目的操作，1是新增题目；2是修改题目
        topicType: '' // 操作的题目类型
      },
      // feat(QKSword)：题目数据
      topicInfo: {
        id: '',
        created_at: '',
        updated_at: '',
        title: '',
        desc: '',
        time: 0,
        overTime: 0,
        image: ''
      }

    }
  },
  mounted() {
    this.getPageTopicInfo()
  },
  methods: {
    // feat(QKSword)：检测题目创建/更新接口执行结果
    getTopicResult(e) {
      if (e === true) {
        this.getPageTopicInfo()
      }
    },
    // feat(QKSword)：题目类型选中改变
    topicSelect() {
      if (this.filter.cveType === '') {
        this.tableData.display = []
      } else {
        this.getPageTopicInfo()
      }
    },
    // feat(QKSword)：响应点击编辑按钮
    handleEdit(index, row) {
      var newTopicDialog = {}

      this.topicInfo = row

      newTopicDialog.topicType = this.filter.cveType.toUpperCase()
      newTopicDialog.topicOperate = 2
      newTopicDialog.topicDialogVisible = true
      this.topicDialog = newTopicDialog
    },
    // feat(QKSword)：响应点击删除按钮
    handleDelete(index, row) {
      this.$confirm('确认删除此题目？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        customClass: 'dark-msgbox'
      }).then(() => {
        var deleteTopicId = []
        deleteTopicId.push(row.id)

        this.deleteSelectTopic(deleteTopicId)
      }).catch()
    },
    // feat(QKSword)：点击刷新题目信息
    clickRefreshTopic() {
      this.getPageTopicInfo()
    },
    // feat(QKSword)：点击选中删除
    clickSelectDelete() {
      var deleteTopicId = []
      this.tableData.selection.forEach(item => {
        deleteTopicId.push(item.id)
      })

      this.deleteSelectTopic(deleteTopicId)
    },
    // feat(QKSword)：点击创建题目
    clickCreateTopic() {
      var newTopicDialog = {}
      var newTopicInfo = {}

      // 如果不初始化则组件内没有对应键值
      newTopicInfo.id = ''
      newTopicInfo.created_at = ''
      newTopicInfo.updated_at = ''
      newTopicInfo.title = ''
      newTopicInfo.desc = ''
      newTopicInfo.time = 1
      newTopicInfo.overTime = 5
      this.topicInfo = newTopicInfo

      newTopicDialog.topicType = this.filter.cveType.toUpperCase()
      newTopicDialog.topicOperate = 1
      newTopicDialog.topicDialogVisible = true
      this.topicDialog = newTopicDialog
    },
    // feat(QKSword)：获取指定页面题目信息
    getPageTopicInfo() {
      this.loading = true
      getTopicInfo(this.createGetTopicInfoProto()).then(response => {
        this.loading = false
        var data = response.data
        if (data.error === '') {
          this.pagination.totalPage = data.sysCveTopicNum
          this.tableData.display = data.sysCveTopicInfo
        } else {
          this.$message({
            message: data.error,
            type: 'error',
            duration: 1.5 * 1000,
            customClass: 'geekMsg' })
        }
      })
    },
    // feat(QKSword):生成getTopicInfo的protobuf
    createGetTopicInfoProto() {
      var sysCveGetTopicInfo = proto.lookup('SysCveGetTopicInfo')
      var msg = sysCveGetTopicInfo.create({
        type: this.filter.cveType,
        pageSize: this.pagination.pageSize,
        currentPage: this.pagination.currentPage
      })

      var encodeMsg = sysCveGetTopicInfo.encode(msg).finish()
      return encodeMsg.slice(0, encodeMsg.length)
    },
    // feat(QKSword)：删除指定题目
    deleteSelectTopic(deleteTopicId) {
      this.loading = true
      deleteTopic(this.createDeleteTopicProto(deleteTopicId)).then(response => {
        this.loading = false
        var data = response.data
        if (data.error === '') {
          this.getPageTopicInfo()
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
    // feat(QKSword):生成createDeleteTopicProto的protobuf
    createDeleteTopicProto(deleteTopicId) {
      var sysCveDeleteTopic = proto.lookup('SysCveDeleteTopic')
      var msg = sysCveDeleteTopic.create({
        type: this.filter.cveType,
        id: deleteTopicId
      })

      var encodeMsg = sysCveDeleteTopic.encode(msg).finish()
      return encodeMsg.slice(0, encodeMsg.length)
    },
    // feat(QKSword)：选择每页显示数量
    handleSizeChange(val) {
      this.pagination.pageSize = val
      this.getPageTopicInfo()
    },
    // feat(QKSword)：选择不同页面
    handleCurrentChange(val) {
      this.pagination.currentPage = val
      this.getPageTopicInfo()
    },
    // feat(QKSword)：处理选中项
    handleSelect(row) {
      this.tableData.selection = row
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
// feat(DeeLMind)固定task大写，添加滚动栏
.cveTopic{
  height: 600px;
  overflow-y:auto;
  position: relative;
}

// feat(QKSword)：过滤/条件框的每一项
.filter-group{
  display: inline-block;
  padding-right: 15px;
}

// feat(QKSword)：分页选择布局
.pagination{
  float: right;
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
