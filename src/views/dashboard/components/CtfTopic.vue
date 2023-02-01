<!--
 * @Author: QKSword 1064615639@qq.com
 * @Date: 2022-06-05 16:46:26
 * @LastEditors: QKSword 1064615639@qq.com
 * @LastEditTime: 2023-01-09 20:48:45
 * @FilePath: \lab\src\views\dashboard\components\CtfTopic.vue
 * @Description: ctf题目数量显示组件
-->
<template>
  <div class="ctf-component">
    <el-row :gutter="40" class="panel-group">
      <el-col :xs="12" :sm="12" :lg="6">
        <el-card class="ctf-el-card">
          <div slot="header">
            <div class="card-panel">
              <div class="card-panel-icon-wrapper icon-web">
                <svg-icon icon-class="ctf-web" class-name="card-panel-icon" />
              </div>
              <div class="card-panel-description">
                <div class="card-panel-text">
                  WEB
                </div>
                <div class="card-panel-num">
                  {{ ctfTopic.webNum }}
                </div>
              </div>
            </div>
          </div>
          <el-table
            class="ctf-el-table"
            :data="ctfTopic.web"
            :cell-style="cellStyle"
            :header-cell-style="headerCellStyle"
          >
            <el-table-column width="100" label="题目">
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
          </el-table>
        </el-card>
      </el-col>

      <el-col :xs="12" :sm="12" :lg="6">
        <el-card class="ctf-el-card">
          <div slot="header">
            <div class="card-panel">
              <div class="card-panel-icon-wrapper icon-rev">
                <svg-icon icon-class="ctf-rev" class-name="card-panel-icon" />
              </div>
              <div class="card-panel-description">
                <div class="card-panel-text">
                  REVERSE
                </div>
                <div class="card-panel-num">
                  {{ ctfTopic.reverseNum }}
                </div>
              </div>
            </div>
          </div>

          <el-table
            class="ctf-el-table"
            :data="ctfTopic.reverse"
            :cell-style="cellStyle"
            :header-cell-style="headerCellStyle"
          >
            <el-table-column width="100" label="题目">
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
          </el-table>
        </el-card>
      </el-col>

      <el-col :xs="12" :sm="12" :lg="6">
        <el-card class="ctf-el-card">
          <div slot="header">
            <div class="card-panel">
              <div class="card-panel-icon-wrapper icon-pwn">
                <svg-icon icon-class="ctf-pwn" class-name="card-panel-icon" />
              </div>
              <div class="card-panel-description">
                <div class="card-panel-text">
                  PWN
                </div>
                <div class="card-panel-num">
                  {{ ctfTopic.pwnNum }}
                </div>
              </div>
            </div>
          </div>

          <el-table
            class="ctf-el-table"
            :data="ctfTopic.pwn"
            :cell-style="cellStyle"
            :header-cell-style="headerCellStyle"
          >
            <el-table-column width="100" label="题目">
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
          </el-table>
        </el-card>
      </el-col>

      <el-col :xs="12" :sm="12" :lg="6">
        <el-card class="ctf-el-card">
          <div slot="header">
            <div class="card-panel">
              <div class="card-panel-icon-wrapper icon-misc">
                <svg-icon icon-class="ctf-misc" class-name="card-panel-icon" />
              </div>
              <div class="card-panel-description">
                <div class="card-panel-text">
                  MISC
                </div>
                <div class="card-panel-num">
                  {{ ctfTopic.miscNum }}
                </div>
              </div>
            </div>
          </div>

          <el-table
            class="ctf-el-table"
            :data="ctfTopic.misc"
            :cell-style="cellStyle"
            :header-cell-style="headerCellStyle"
          >
            <el-table-column width="100" label="题目">
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
          </el-table>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
export default {
  props: {
    ctfTopic: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
    }
  },
  methods: {
    headerCellStyle({ row, column, rowIndex, columnIndex }) {
      let headerCellSytle = {}
      headerCellSytle = {
        'background-color': '#2c2c2c',
        'font-family': 'Microsoft YaHei',
        'font-size': '18px',
        'color': '#fe6d32',
        'border-color': 'transparent'
      }
      return headerCellSytle
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      let cellSytle = {}
      cellSytle = {
        'background-color': '#2c2c2c',
        'font-family': 'Microsoft YaHei',
        'font-size': '15px',
        'color': '#b9b8b8',
        'border-color': 'transparent'
      }
      return cellSytle
    }
  }
}

</script>

<style lang="scss" scoped>
@import "@/styles/app-main.scss";

// feat(QKSword)：大量数据在el-table中一行显示
.rowDisplay{
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: 1; //行数
  -webkit-box-orient: vertical;
}

//feat(QKSword)：ctf卡片显示样式
.ctf-el-card{
    margin-top: 18px;
    background: $dashboardColor;
    border-color: transparent;

    ::v-deep.el-card__header{
      padding: 0;
      border-bottom:1px solid $geekColor;
      // border-bottom:1px solid transparent;

      .ctf-el-card-span{
        font-weight: 700;
        color: $geekColor;
        font-size: 18px;
        text-transform: uppercase;
      }

      .ctf-el-card-icon{
        float: left;
        font-size: 28px;
        color: #000;
      }
    }

    ::v-deep.el-card__body{
      height: 300px;

      .ctf-el-card-body-text{
        padding: 3px;
        color: #e4e4e8;
        font-size: 16px;
      }
    }
}

// feat(QKSword)：ctf表格样式
.ctf-el-table{
    // 排序图标样式
    ::v-deep.descending .sort-caret.descending{
      border-top-color:$orangeColor;
    }

    ::v-deep.ascending  .sort-caret.ascending{
      border-bottom-color:$orangeColor;
    }

    // 多选框样式
    ::v-deep.el-checkbox__inner{
      background-color: transparent;
      border-color: #747474;
    }

    ::v-deep.el-checkbox__inner:hover,
    ::v-deep.el-checkbox__inner:active{
      border-color:$geekColor;
    }

    ::v-deep.el-checkbox__input.is-checked .el-checkbox__inner{
      background-color: $orangeColor;
      border-color: $orangeColor;
    }

    ::v-deep.el-checkbox__label{
      color: $fontColor;
    }

    ::v-deep.el-checkbox__input.is-checked + .el-checkbox__label{
      color: $fontColor;
    }

    // feat(QKSword):el-table没有数据时的样式
    ::v-deep.el-table__empty-block{
      min-height: 100px;
      background-color: $selectColor;
      border-color: transparent;
    }

    // feat(QKSword):el-table没有数据时显示text的样式
    ::v-deep.el-table__empty-text{
      color: #FFFFFF;
    }

    //feat(QKSword):修复固定height右边有白边问题
    ::v-deep.el-table__header-wrapper {
    .el-table__header {
            width: calc(100% + 32px) !important;
        }
    }

    ::v-deep.el-table__body-wrapper {
        width: calc(100% + 16px) !important;
        .el-table__body {
            width: calc(100% + 16px) !important;
        }
    }
}

// feat(QKSword)：ctf表格结尾处线条样式
.ctf-el-table::before{
  background-color: transparent;
}

.ctf-component {
    margin-left: 20px;
    margin-right: 20px;
}

//feat(QKSword)：ctf卡片头样式
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    background: $dashboardColor;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {

      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-web {
        background: #40c9c6;
      }

      .icon-rev {
        background: #36a3f7;
      }

      .icon-pwn {
        background: #f4516c;
      }

      .icon-misc {
        background: #34bfa3
      }
    }

    .icon-web {
      color: #40c9c6;
    }

    .icon-rev {
      color: #36a3f7;
    }

    .icon-pwn {
      color: #f4516c;
    }

    .icon-misc {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: $geekColor;
        font-size: 20px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
        color: $fontColor;
      }
    }
  }
}

</style>
