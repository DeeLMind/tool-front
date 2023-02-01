<template>
  <div
    v-loading.fullscreen="loading"
    class="navbar"
    element-loading-spinner="el-icon-loading"
    element-loading-text="拼命努力中"
  >
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

    <div class="right-menu">
      <el-row v-if="checkPermission(['admin','user'])" :gutter="30" class="row">
        <el-col :span="25">
          <search />
        </el-col>
        <!-- <el-col :span="5">
          <el-button type="green-el-button" @click="register">BUG提交</el-button>
        </el-col> -->
        <el-col :span="5" class="col">
          <el-dropdown
            class="avatar-container right-menu-item hover-effect"
            trigger="click"
          >
            <div class="avatar-wrapper">
              <img :src="avatar" alt="avatar" class="user-avatar color-permission">
              <!-- <i class="el-icon-caret-bottom" /> -->
            </div>
            <el-dropdown-menu slot="dropdown" class="dark-el-dropdown-menu">
              <router-link to="/profile/index">
                <el-dropdown-item v-if="checkPermission(['admin','user'])">个人设置</el-dropdown-item>
              </router-link>

              <el-dropdown-item>
                <a target="_blank" href="https://www.deelmind.com/">关于我们</a>
              </el-dropdown-item>
              <el-dropdown-item divided @click.native="bug">
                <span style="display: block">问题反馈</span>
              </el-dropdown-item>

              <el-dropdown-item v-if="checkPermission(['admin','user'])" divided @click.native="logout">
                <span style="display: block">退出登录</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>

      <!-- <el-row v-if="checkPermission(['guest'])" :gutter="20" class="row">
        <el-col :span="10">
          <el-button type="green-el-button" @click="register">注册</el-button>
        </el-col>
        <el-col :span="10">
          <el-button type="green-el-button" @click="login">登录</el-button>
        </el-col>
      </el-row> -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import checkPermission from '@/utils/permission'
import { packMouse } from '@/utils/mouse'

var proto = require('~/proto.js')

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      loading: false,
      avatar: 'avatar'
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'device', 'roles'])
  },
  watch: {
    '$store.state.user.avatar': function(newVal) {
      this.avatar = newVal
    }
  },
  created: function() {
    this.getAvatar()
  },
  methods: {
    // 提交BUG
    bug() {
      this.$alert('QQ:759256729', '问题反馈', {
        confirmButtonText: '确定',
        iconClass: 'el-icon-bell',
        customClass: 'dark-msgbox'
      })
    },
    // feat(DeeLMind):获取用户头像，默认值为极客方舟
    getAvatar() {
      this.avatar = this.$store.state.user.avatar
    },
    checkPermission,
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    // feat(QKSword):点击注册按钮
    register() {
      this.$store.dispatch('login/register')
        .then(() => {
          this.$router.push(`/login`)
        })
        .catch(() => {
        })
    },
    // feat(QKSword):点击登录按钮
    login() {
      this.$store.dispatch('login/login', '')
        .then(() => {
          this.$router.push(`/login`)
        })
        .catch(() => {
        })
    },
    async logout() {
      this.loading = true
      await this.$store.dispatch('user/logout', this.createLoginProto())
      this.loading = false
      this.$router.push({ path: '/' })
      // 重新设置动态路由,不能使用，导致路由跳转失败
      // this.$router.go(0)
      // this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    // feat(QKSword):生成用户登录的protobuf
    createLoginProto() {
      var userLogout = proto.lookup('UserUserLogout')
      var msg = userLogout.create({
        mouse: packMouse()
      })

      var encodeMsg = userLogout.encode(msg).finish()

      return encodeMsg.slice(0, encodeMsg.length)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/app-main.scss";

  .dark-el-dropdown-menu{
    border-color: $geekColor;
    background-color: $mainColor;

    .el-dropdown-menu__item{
      color: $fontColor;
    }

    .el-dropdown-menu__item:hover,
    .el-dropdown-menu__item:focus{
      background-color: $geekColor;
      color: white;
    }

    .el-dropdown-menu__item.el-dropdown-menu__item--divided:hover,
    .el-dropdown-menu__item.el-dropdown-menu__item--divided:focus{
      background-color: $geekColor;
      color: white;
    }

    .el-dropdown-menu__item.el-dropdown-menu__item--divided::before{
      background-color: $mainColor;
    }
  }

  .el-popper[x-placement^=bottom] .popper__arrow{
    border-bottom-color: $geekColor;
  }

  .el-popper[x-placement^=bottom] .popper__arrow::after{
    border-bottom-color: $mainColor;
  }
</style>

<style lang="scss" scoped>
@import "@/styles/app-main.scss";
.navbar {
  height: 50px;
  // overflow: hidden;
  position: relative;
  background: #1e1e1e;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  // 快捷搜索框样式
  .dark-search-el-input{

    ::v-deep.el-input__inner{
      width: 200px;
      padding: 5px;
      border-color: transparent;
      font-family: "Microsoft YaHei";
      color: $geekSecondaryColor;
      background-color: $inputColor;
      font-size: 14px;
    }

    ::v-deep.el-input__inner:focus,
    ::v-deep.el-input__inner:active,
    ::v-deep.el-input__inner:hover{
      width: 200px;
      background-color: $inputColor;
      border-color: $geekColor;
      color: $geekSecondaryColor;
    }
  }

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    &:focus {
      outline: none;
    }
z-index: 9999;
    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius:50%;
          border-style:solid;
          border-width: 1px;
          // border-color: #42B983;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
