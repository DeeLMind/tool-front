<!--
 * @Author: DeeLMind
 * @Date: 2022-02-18 14:42:50
 * @LastEditTime: 2022-03-21 15:15:20
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \gkattack-front\src\views\dashboard\guest\index.vue
-->
<template>
  <autocomplete
    class="search"
    :search="search"
    placeholder="搜索框"
    @submit="handleSubmit"
  />
</template>

<script>
import Autocomplete from '@trevoreyre/autocomplete-vue'

export default {
  components: {
    Autocomplete
  },
  data() {
    return {
      // Feat(DeeLMind):跳转路由表
      rpath: []
    }
  },
  methods: {
    unique(arr) {
      return arr.filter(function(item, index, arr) {
        // 当前元素，在原始数组中的第一个索引==当前索引值，否则返回当前元素
        return arr.indexOf(item, 0) === index
      })
    },
    // Feat(DeeLMind):搜索本网站路由
    search(input) {
      var result = []
      if (input.length < 1) { return [] }
      // Feat(DeeLMind):获取跳转路由
      var roters = this.$store.getters.permission_routes
      // console.log(roters)
      for (var i in roters) {
        // Feat(DeeLMind):获取路由Title
        try {
          if (roters[i].meta.title) {
            result.push(roters[i].meta.title)
          }
        } catch {
          // console.log('Error1 : No Title')
        }

        // Feat(DeeLMind):获取子路由Title
        try {
          for (var j in roters[i].children) {
            result.push(roters[i].children[j].meta.title)
            // console.log(roters[i].children[j].path)
            this.rpath.push({ key: roters[i].children[j].meta.title.toString(), value: roters[i].path + '/' + roters[i].children[j].path })
          }
        } catch {
          // console.log('Error2 : No Title')
        }
      }
      var resultShow = this.unique(result)
      //   var result = ['1', '2', '3', '1', '2', '3', '1', '2', '3', '1', '2', '3', '1', '2', '3']
      // console.log(this.rpath)
      return resultShow.filter(resultShow => {
        return resultShow.toLowerCase()
          .startsWith(input.toLowerCase())
      })
    },
    // Feat(DeeLMind):搜索成功路由跳转
    handleSubmit(result) {
      // console.log(result)
      // console.log(this.rpath)
      if (result) {
        for (var i in this.rpath) {
          var table = this.rpath[i]
          // console.log(table)
          try {
            if (table.key.toString().toLowerCase() === result.toString().toLowerCase()) {
              var path = table.value
              // console.log(path)
              this.$router.push({ path: path })
            }
          } catch {
          // console.log('Error2 : No Title')
          }
        }
      }
    }
  }
}
</script>

<style scoped>
/* Feat(DeeLMind): 样式穿透,修改搜索框样式 >>> */
.search >>> .autocomplete-input{
    background-color: #1e1e1e;
    border: 0.5px solid #42B983;
    /* border-left:0.5px solid #42B983;
    border-right:0.5px solid #42B983;
    border-top:0.5px solid #42B983; */
    margin-top: 6px;
    color:#DFF0D8;
    height: 44px;
}
.search >>> li{
  border-top:0px;
  color:#DFF0D8;
}
.search >>> li:hover{
  /*feat(QKSword):搜索项鼠标聚焦时文字颜色*/
  color:#42B983;
}
.search >>> .autocomplete-result-list{
    background-color: #1e1e1e;
    /*feat(QKSword):搜索框边框颜色*/
    border-color: #42B983;
}
.search >>> .autocomplete-result{
  cursor: pointer;
}

</style>
