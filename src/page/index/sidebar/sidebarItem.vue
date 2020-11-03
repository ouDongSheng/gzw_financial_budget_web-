<template>
  <div class="menu-wrapper">
    <template v-for="item in menu">
      <el-menu-item v-if="validatenull(item[childrenKey]) && vaildRoles(item)"
                    :index="item[pathKey]"
                    @click="open(item)"
                    :key="item[labelKey]"
                    :class="{'is-active':vaildAvtive(item)}">
        <i :class="item[iconKey]"></i>
        <span slot="title"
              :alt="item[pathKey]">{{generateTitle(item)}}</span>
      </el-menu-item>
      <el-submenu v-else-if="!validatenull(item[childrenKey])&&vaildRoles(item)"
                  :index="item[pathKey]"
                  :key="item[labelKey]">
        <template slot="title">
          <!-- <i :class="parseInt(item.parentId)===0?item[iconKey]:''"></i> -->
          <img v-if="parseInt(item.parentId)===0" 
               class="icon"
               :src="require(`../../../assets/menuIcons/${generateIcon(item)}`)">
          <span slot="title"
                :class="{'el-menu--display':collapse && first}">{{generateTitle(item)}}</span> <!-- 侧边导航栏 -->
        </template>
        <template v-for="(child,cindex) in item[childrenKey]">
          <el-menu-item :index="child[pathKey],cindex"
                        @click="open(child,item)"
                        :class="{'is-active':vaildAvtive(child)}"
                        v-if="validatenull(child[childrenKey])"
                        :key="child[labelKey]">
            <!-- <i :class="child[iconKey]"></i> -->
            <span slot="title">{{generateTitle(child)}}</span>
          </el-menu-item>
          <sidebar-item v-else
                        :menu="[child]"
                        :key="cindex"
                        :props="props"
                        :screen="screen"
                        :collapse="collapse"></sidebar-item>
        </template>
      </el-submenu>
    </template>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { validatenull } from "@/util/validate";
import config from "./config.js";
export default {
  name: "sidebarItem",
  data() {
    return {
      config: config,
    };
  },
  props: {
    menu: {
      type: Array
    },
    screen: {
      type: Number
    },
    first: {
      type: Boolean,
      default: false
    },
    props: {
      type: Object,
      default: () => {
        return {};
      }
    },
    collapse: {
      type: Boolean
    }
  },
  mounted() {},
  computed: {
    ...mapGetters(["roles","userInfo","keyCollapse"]),
    aa() {
      return this.$store.state.common.isCollapse;
    },
    labelKey() {
      return this.props.label || this.config.propsDefault.label;
    },
    pathKey() {
      return this.props.path || this.config.propsDefault.path;
    },
    iconKey() {
      return this.props.icon || this.config.propsDefault.icon;
    },
    childrenKey() {
      return this.props.children || this.config.propsDefault.children;
    },
    nowTagValue() {
      return this.$router.$avueRouter.getValue(this.$route);
    }
  },
  methods: {
    generateTitle(item) {
      return this.$router.$avueRouter.generateTitle(
        item[this.labelKey],
        (item.meta || {}).i18n
      );
    },
    generateIcon(item) {
      let icon = 'home.png';
      if (item.name === '企业基本信息库') {
        icon = 'basicInfo.png';
      } else if (item.name === '资产评估') {
        icon = 'assetAssessment.png';
      } else if (item.name === '产权交易监督') {
        icon = 'trade.png';
      } else if (item.name === '产权登记') {
        icon = 'register.png';
      } else if (item.name === '产权变动决策') {
        icon = 'change.png';
      } else if (item.name === '僵尸企业管理') {
        icon = 'zombie.png';
      } else if (item.name === '系统管理') {
        icon = 'system.png';
      } else if (item.name === '权限管理') {
        icon = 'permission.png';
      } else if (item.name === '消息中心') {
        icon = 'message.png';
      } else if (item.name === '系统监控') {
        icon = 'monitor.png';
      } else if (item.name === '研发工具') {
        icon = 'tool.png';
      }
      return icon;
    },
    vaildAvtive(item) {
      const groupFlag = (item["group"] || []).some(ele =>
        this.$route.path.includes(ele)
      );
      return this.nowTagValue === item[this.pathKey] || groupFlag;
    },
    vaildRoles(item) {
      item.meta = item.meta || {};
      return item.meta.roles ? item.meta.roles.includes(this.roles) : true;
    },
    validatenull(val) {
      return validatenull(val);
    },
    open(item,parent) {
      if (this.screen <= 1) this.$store.commit("SET_COLLAPSE");
      this.$router.$avueRouter.group = item.group;
      this.$router.$avueRouter.meta = item.meta;
      this.$router.push({
        path: this.$router.$avueRouter.getPath({
          name: item[this.labelKey], //传得名字
          src: item[this.pathKey],
          i18n: (item.meta || {}).i18n
        }),
        query: item.query
      });
      const topMenu = {
        child:item,
        parent
      }
      // this.$store.dispatch('addFun',parent);
      // sessionStorage.setItem('tabParent',JSON.stringify(parent));
      this.$store.dispatch('addFun',topMenu);
      sessionStorage.setItem('tabParent',JSON.stringify(topMenu));
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
      }).catch(() => {});
    }
  }
};
</script>
<style scoped="scoped">
.icon {
  margin-right: 5px;
}
</style>
