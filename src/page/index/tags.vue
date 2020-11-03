<template>
  <div class="avue-tags" v-if="showTag">
    <!-- 返回按钮 -->
    <div v-if="isBlue === 4 && showBack" class="mr20">
      <el-button class="iconButton normalWeight ps-r c-common" type="text" @click="backClick()">
        <i class="backIcon iconCommon"></i>
        返回
      </el-button>
    </div>
    <!-- tag盒子 -->
    <div v-if="contextmenuFlag" class="avue-tags__contentmenu" :style="{left:contentmenuX+'px',top:contentmenuY+'px'}">
      <div class="item" @click="closeOthersTags">{{$t('tagsView.closeOthers')}}</div>
      <div class="item" @click="closeAllTags">{{$t('tagsView.closeAll')}}</div>
    </div>
    <div class="avue-tags__box" :class="{'avue-tags__box--close':!website.isFirstPage}">
      <!-- <el-tabs v-model="active"
               type="card"
               @contextmenu.native="handleContextmenu"
               :closable="tagLen!==1"
               @tab-click="openTag"
               @edit="menuTag">
        <el-tab-pane :key="item.value"
                     v-for="item in tagList"
                     :label="generateTitle(item)+'>'"
                     :name="item.value">
        </el-tab-pane>

      </el-tabs>-->
      <!-- <el-tabs v-model="active"
               type="card"
               @contextmenu.native="handleContextmenu"
               @tab-click="openTag"
               :closable="tagLen!==1"
               @edit="menuTag">
        <div class="tab">
          <span class="tab-home finger" @click="goHome">{{tagList[0].label}}</span>
          <img  class="tab-unfold" v-if="parent && tag.label !=='首页'" src="../../../public/icon/unfold.png" />
          <span class="tab-main" v-if="tag.label !=='首页'">{{parent.name}}</span>
          <img  class="tab-unfold" v-if="parent && tag.label !=='首页'"  src="../../../public/icon/unfold.png" />
          <span class="tab-minor" v-if="parent && tag.label !=='首页'">{{tag.label}}</span>
        </div>
      </el-tabs>-->
      <!-- <el-dropdown class="avue-tags__menu">
       <el-button type="primary"
                   size="mini">
          {{$t('tagsView.menu')}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="closeOthersTags">{{$t('tagsView.closeOthers')}}</el-dropdown-item>
          <el-dropdown-item @click.native="closeAllTags">{{$t('tagsView.closeAll')}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>-->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <!-- <el-breadcrumb-item :to="{ path: tagList[0].value }">{{tagList[0].label}}</el-breadcrumb-item> -->
        <el-breadcrumb-item v-if="tag.label !=='首页' && (secondMenu && secondMenu !== topMenu.parent.name)">
          {{secondMenu}}</el-breadcrumb-item>
        <el-breadcrumb-item v-if="tag.label !=='首页'">{{topMenu.parent.name}}</el-breadcrumb-item>
        <el-breadcrumb-item :class="{'present':isBlue===3}" v-if="tag.label !=='首页'">{{topMenu.child.name}}
        </el-breadcrumb-item>
        <el-breadcrumb-item :class="{'present':isBlue===4}" v-if="topMenu && isBlue===4">{{tag.label}}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>
<script>
  import {
    mapGetters,
    mapState
  } from "vuex";
  export default {
    name: "tags",
    data() {
      return {
        active: "",
        contentmenuX: "",
        contentmenuY: "",
        contextmenuFlag: false,
        flag: false,
        isBlue: false,
        showBack: false,
        secondMenu: null
      };
    },
    created() {
      this.flag = true;
      if (this.flag == true && JSON.parse(sessionStorage.getItem("tabParent"))) {
        this.$store.state.tags.topMenu = JSON.parse(sessionStorage.getItem('tabParent'));
      }
    },
    mounted() {
      this.setActive();
    },
    watch: {
      tag(value) {
        this.showBack = true;
        this.activeTag(value);
      },
      contextmenuFlag() {
        window.addEventListener("mousedown", this.watchContextmenu);
      },
      topMenu(value) {
        const menuLength = this.menu.length;
        for (let i = 0; i < menuLength; i++) {
          const temp = this.menu[i];
          const tempLength = temp.children.length;
          for (let index = 0; index < tempLength; index++) {
            if (temp.children[index].name === value.parent.name) {
              this.secondMenu = temp.name;
              return false;
            } else {
              this.secondMenu = "";
            }
          }
        }
      }
    },
    computed: {
      ...mapGetters(["tagWel", "tagList", "tag", "website", "type", "menu"]),
      ...mapState({
        showTag: state => state.common.showTag,
        topMenu: state => state.tags.topMenu
      }),
      tagLen() {
        return this.tagList.length || 0;
      }
    },
    methods: {
      generateTitle(item) {
        return this.$router.$avueRouter.generateTitle(
          item.label,
          (item.meta || {}).i18n
        );
      },
      activeTag(value) {
        this.setActive();
        if (
          value.label === "新增" ||
          value.label === "查看" ||
          value.label === "编辑"
        ) {
          this.isBlue = 4;
        } else {
          this.isBlue = 3;
        }
      },
      watchContextmenu(event) {
        if (!this.$el.contains(event.target) || event.button !== 0) {
          this.contextmenuFlag = false;
        }
        window.removeEventListener("mousedown", this.watchContextmenu);
      },
      handleContextmenu(event) {
        let target = event.target;
        // 解决 https://github.com/d2-projects/d2-admin/issues/54
        let flag = false;
        if (target.className.indexOf("el-tabs__item") > -1) flag = true;
        else if (target.parentNode.className.indexOf("el-tabs__item") > -1) {
          target = target.parentNode;
          flag = true;
        }
        if (flag) {
          event.preventDefault();
          event.stopPropagation();
          this.contentmenuX = event.clientX;
          this.contentmenuY = event.clientY;
          this.tagName = target.getAttribute("aria-controls").slice(5);
          this.contextmenuFlag = true;
        }
      },
      //激活当前选项
      setActive() {
        this.active = this.tag.value;
      },
      menuTag(value, action) {
        if (action === "remove") {
          let {
            tag,
            key
          } = this.findTag(value);
          this.$store.commit("DEL_TAG", tag);
          if (tag.value === this.tag.value) {
            tag = this.tagList[key === 0 ? key : key - 1]; //如果关闭本标签让前推一个
            this.openTag(tag);
          }
        }
      },
      openTag(item) {
        let tag;
        if (item.name) {
          tag = this.findTag(item.name).tag;
        } else {
          tag = item;
        }
        this.$router.push({
          path: this.$router.$avueRouter.getPath({
            name: tag.label,
            src: tag.value,
            i18n: tag.meta.i18n
          }),
          query: tag.query
        });
      },
      closeOthersTags() {
        this.contextmenuFlag = false;
        this.$store.commit("DEL_TAG_OTHER");
      },
      findTag(value) {
        let tag, key;
        this.tagList.map((item, index) => {
          if (item.value === value) {
            tag = item;
            key = index;
          }
        });
        return {
          tag: tag,
          key: key
        };
      },
      closeAllTags() {
        this.contextmenuFlag = false;
        this.$store.commit("DEL_ALL_TAG");
        this.$store.dispatch("subtractFun");
        this.$router.push({
          path: this.$router.$avueRouter.getPath({
            src: this.tagWel.value
          }),
          query: this.tagWel.query
        });
      },
      //跳转到首页
      // goHome() {
      //   this.$store.dispatch('subtractFun');
      //   this.$router.push(this.tagList[0].value);
      //   sessionStorage.removeItem('tabParent');
      //   this.flge = false;
      // }

      // 返回
      backClick() {
        const companyInfo = JSON.parse(localStorage.getItem('companyInfo'));
        if (companyInfo.parentPath) {
          this.$router.push({
            path: companyInfo.parentPath
          })
        } else {
          this.$router.go(-1);
        }
      }
    }
  };

</script>
<style scoped="scoped">
  .avue-tags {
    height: 41px;
    border-bottom: 1px solid #d9d9d9;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 7px 20px !important;
  }

  .backIcon {
    background: url("../../assets/commonIcons/back.png");
  }

  .iconCommon {
    width: 18px;
    height: 18px;
    line-height: 18px;
    position: absolute;
    left: 0;
    top: 10px;
  }

  .iconButton {
    padding-left: 23px;
    position: relative;
    font-weight: normal !important;
    color: #435b76;
  }

  .tab {
    font-size: 14px;
    color: #95a1af;
    margin: 0 0 0 10px;
  }

  .tab .tab-home {}

  .tab .tab-main {}

  .tab .tab-unfold {
    padding: 0 10px;
  }

  .tab .tab-minor {
    color: #438ae9;
  }

</style>
