<!-- <template>
  <div class="avue-top">
    <div class="top-bar__left">
      <div class="avue-breadcrumb"
           :class="[{ 'avue-breadcrumb--active': isCollapse }]"
           v-if="showCollapse">
        <i class="icon-navicon"
           @click="setCollapse"></i>
      </div>
      
    </div>
    <div class="top-bar__title">
      <div class="top-bar__item top-bar__item--show"
           v-if="showMenu">
        <top-menu></top-menu>
      </div>
      <span class="top-bar__item"
            v-if="showSearch">
        <top-search></top-search>
      </span>
    </div>
    <div class="top-bar__right">
      <el-tooltip v-if="showColor"
                  effect="dark"
                  :content="$t('navbar.color')"
                  placement="bottom">
        <div class="top-bar__item">
          <top-color></top-color>
        </div>
      </el-tooltip>
      <el-tooltip v-if="showDebug"
                  effect="dark"
                  :content="logsFlag?$t('navbar.bug'):logsLen+$t('navbar.bugs')"
                  placement="bottom">
        <div class="top-bar__item">
          <top-logs></top-logs>
        </div>
      </el-tooltip>
      <el-tooltip v-if="showLock"
                  effect="dark"
                  :content="$t('navbar.lock')"
                  placement="bottom">
        <div class="top-bar__item">
          <top-lock></top-lock>
        </div>
      </el-tooltip>
      <el-tooltip v-if="showTheme"
                  effect="dark"
                  :content="$t('navbar.theme')"
                  placement="bottom">
        <div class="top-bar__item top-bar__item--show">
          <top-theme></top-theme>
        </div>
      </el-tooltip>
      <el-tooltip effect="dark"
                  :content="$t('navbar.language')"
                  placement="bottom">
        <div class="top-bar__item top-bar__item--show">
          <top-lang></top-lang>
        </div>
      </el-tooltip>
      <el-tooltip v-if="showFullScren"
                  effect="dark"
                  :content="isFullScren?$t('navbar.screenfullF'):$t('navbar.screenfull')"
                  placement="bottom">
        <div class="top-bar__item">
          <i :class="isFullScren?'icon-tuichuquanping':'icon-quanping'"
             @click="handleScreen"></i>
        </div>
      </el-tooltip>
      <img class="top-bar__img"
           :src="userInfo.avatar">
      <el-dropdown>
        <span class="el-dropdown-link">
          {{userInfo.userName}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <router-link to="/">{{$t('navbar.dashboard')}}</router-link>
          </el-dropdown-item>
          <el-dropdown-item>
            <router-link to="/info/index">{{$t('navbar.userinfo')}}</router-link>
          </el-dropdown-item>
          <el-dropdown-item @click.native="logout"
                            divided>{{$t('navbar.logOut')}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template> -->
<template>
  <div>
    <div class="top-bar__left">
    </div>
    <div class="user">
      <el-dropdown trigger="click">
      <!-- <img class="top-bar__img"
           :src="userInfo.avatar"> -->
      <img class="top-bar__img finger"
           src="../../../assets/commonIcons/user.png">
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <div class="user-name">{{this.userInfo.nick_name}}，{{time}}！</div>
            <span class="sign">{{companyName}}</span>
          </el-dropdown-item>
          <el-dropdown-item class='violet'>
            <div @click="goHome">{{$t('navbar.dashboard')}}</div>
          </el-dropdown-item>
          <el-dropdown-item class='violet'>
            <router-link style="width: 100%;display: inline-block;" to="/info/index">{{$t('navbar.userinfo')}}</router-link>
          </el-dropdown-item>
          <el-dropdown-item @click.native="logout"
                            class='violet'
                            divided>{{$t('navbar.logOut')}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import { fullscreenToggel, listenfullscreen } from "@/util/util";
import topLock from "./top-lock";
import topMenu from "./top-menu";
import topSearch from "./top-search";
import topTheme from "./top-theme";
import topLogs from "./top-logs";
import topColor from "./top-color";
import topLang from "./top-lang";
export default {
  components: {
    topLock,
    topMenu,
    topSearch,
    topTheme,
    topLogs,
    topColor,
    topLang
  },
  name: "top",
  data() {
    return {
      flag:true,
      time:'',
      companyName: ""
    };
  },
  filters: {},
  created() {
    const currentHour = new Date().getHours();
    if(currentHour >= 0 && currentHour <= 12){ //看看当前时间是在0点到中午12点之间
      this.time = '上午好';
    } else{
      this.time = '下午好';
    }

    this.companyName = localStorage.getItem("companyName");
    console.log("created -> this.companyName", this.companyName)
  },
  mounted() {
    listenfullscreen(this.setScreen);
  },
  computed: {
    ...mapState({
      showDebug: state => state.common.showDebug,
      showTheme: state => state.common.showTheme,
      showLock: state => state.common.showLock,
      showFullScren: state => state.common.showFullScren,
      showCollapse: state => state.common.showCollapse,
      showSearch: state => state.common.showSearch,
      showMenu: state => state.common.showMenu,
      showColor: state => state.common.showColor
    }),
    ...mapGetters([
      "userInfo",
      "isFullScren",
      "tagWel",
      "tagList",
      "isCollapse",
      "tag",
      "logsLen",
      "logsFlag"
    ])
  },
  methods: {
    handleScreen() {
      fullscreenToggel();
    },
    setCollapse() {
      this.$store.commit("SET_COLLAPSE");
    },
    setScreen() {
      this.$store.commit("SET_FULLSCREN");
    },
    logout() {
      this.$confirm(this.$t("logoutTip"), this.$t("tip"), {
        confirmButtonText: this.$t("submitText"),
        cancelButtonText: this.$t("cancelText"),
        type: "warning"
      }).then(() => {
        this.$store.dispatch("LogOut").then(() => {
          this.$router.push({ path: "/login" });
          localStorage.clear(); // 清空所有缓存
          sessionStorage.removeItem('tabParent');
        });
      });
    },
    goHome() {
      
    },
  }
};
</script>

<style lang="scss" scoped>
  .top-bar__left {
    position: absolute;
    top: 7px;
    left: 15.625rem;
    z-index: 100;
  }
  .avue-breadcrumb {
    color: #ccc;
  }
  .user {
    position: absolute;
    top:6px;
    right: 30px;
    z-index: 99;
    border-left: 1px solid #D9D9D9;
    border-radius: 0.5px;
  }
  .top-bar__img {
    width: 30px;
    height: 30px;
    border: none;
  }
  .user-name {
    font-size: 14px;
    color: #435B76;
    font-weight: bold;
  }
  .sign {
    font-size: 10px;
    color: #8F8F8F;
  }
  .violet {
    font-size: 12px;
    color: #435B76;
    font-weight: 400;
  }
  .el-dropdown-menu {
    padding: 0;
  }
  .el-dropdown-menu__item:first-child {
    padding-top: 8px;
    border-bottom: 1px solid #EDF0F5;
  }
  .el-dropdown-menu__item:nth-child(2) {
    padding-top: 5px;
  }
  .el-dropdown-menu__item:nth-child(3) {
    padding-bottom: 5px;
  }
  .el-dropdown-menu__item:nth-child(4) {
    padding-bottom: 5px;
  }
  /deep/.el-dropdown-menu__item--divided {
    margin-top: 0;
  }
</style>
