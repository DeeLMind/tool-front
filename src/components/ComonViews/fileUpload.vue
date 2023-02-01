<template>
  <div class="input-group" @dragover="fileDragover" @drop="fileDrop">
    <el-upload
      action=""
      class="base-el-upload"
      :on-change="onUploadChange"
      :on-remove="onUploadRemove"
      :auto-upload="false"
      :file-list="fileList"
    >
      <!-- <i class="el-icon-upload" /> -->
      <!-- <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div> -->
      <el-button type="gray-el-button" icon="el-icon-upload2">选择文件/拖拽文件</el-button>
      <div slot="tip" class="el-upload__tip">上传文件最大为10M</div>
    </el-upload>
    <el-progress
      class="base-el-progress"
      :percentage="uploadPercent"
    />
  </div>

</template>

<script>
import Utils from '@/libs/utils'

export default {
  name: 'FileUpload',
  model: {
    prop: 'inputString',
    event: 'inputStringChange'
  },
  props: {
    inputString: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      MAX_FILE_SIZE: 10 * 1024 * 1024, // 文件大小
      privateString: '',
      uploadPercent: 0,
      fileList: []
    }
  },
  // 监控父组件值变化
  //   watch: {
  //     inputString(newString) {
  //       this.privateString = newString
  //     }
  //   },
  methods: {
    // 拖拽上传
    fileDragover(e) {
      // console.log('fileDragover')
      e.preventDefault()
    },
    fileDrop(e) {
      e.preventDefault()
      const file = e.dataTransfer.files[0] // 获取到第一个上传的文件对象
      // console.log('fileDrop', file)
      if (!file) return
      if (file.size > this.MAX_FILE_SIZE) {
        return alert('文件大小不能超过10M')
      }

      var reader = new FileReader()
      reader.readAsArrayBuffer(file)
      reader.onprogress = r => {
        this.uploadPercent = Math.round(r.loaded / r.total * 100)
      }

      reader.onload = r => {
        this.fileList = []
        this.fileList.push({
          name: file.name,
          size: file.size,
          type: file.type,
          raw: r.target.result
        })
        this.privateString = Utils.arrayBufferToStr(r.currentTarget.result, false)
        this.$emit('inputStringChange', this.privateString)
      }
    },
    // 移除上传文件后，把文件字符串数据清空
    onUploadRemove(file, fileList) {
      this.uploadPercent = 0
      this.privateString = ''
      this.$emit('inputStringChange', this.privateString)
    },
    onUploadChange(file, fileList) {
      const maxLimit = this.MAX_FILE_SIZE
      if (file.size > maxLimit) {
        this.$message({
          message: '文件大小不能超过10M',
          type: 'error',
          duration: 1.5 * 1000,
          customClass: 'geekMsg' })
        this.fileList = []
        return
      }

      this.fileList = []
      this.fileList.push({
        name: file.name,
        size: file.size,
        type: file.type,
        raw: file.raw
      })

      var reader = new FileReader()
      reader.readAsArrayBuffer(file.raw)

      reader.onprogress = r => {
        this.uploadPercent = Math.round(r.loaded / r.total * 100)
      }

      reader.onload = r => {
        this.privateString = Utils.arrayBufferToStr(r.currentTarget.result, false)
        this.$emit('inputStringChange', this.privateString)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/app-main.scss";

.base-el-upload{
  ::v-deep.el-upload-list__item-name{
    color: $fontColor;
  }

  ::v-deep.el-upload__tip{
    color: $tipColor
  }
}

.base-el-progress{
  ::v-deep.el-progress__text{
    color: #ffffff;
  }

  ::v-deep.el-progress-bar__inner{
    background-color: aqua;
  }
}

</style>
