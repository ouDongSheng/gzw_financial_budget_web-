<template>
  <div class="avue-logo">
    <transition name="fade">
      <span v-if="keyCollapse"
            class="avue-logo_subtitle"
            key="0">
        <!-- <img src="img/bg/img-logo.png"
             width="30" /> -->
			<div class="avue-breadcrumb"
			     :class="[{ 'avue-breadcrumb--active': isCollapse }]"
			     v-if="showCollapse">
			  <i class="unfoldMenuIcon finger"
			     @click="setCollapse"></i>
			</div>
      </span>
    </transition>
    <transition-group name="fade">
      <template v-if="!keyCollapse">
        <span class="avue-logo_title"
              key="1">
          <div>
            <img class="menulogo" src="img/bg/menulogo.png" alt="">
            <!-- 产权监管系统 -->
          </div>
          <div class="avue-breadcrumb"
               :class="[{ 'avue-breadcrumb--active': isCollapse }]"
               v-if="showCollapse">
            <i class="unfoldMenuIcon finger"
               @click="setCollapse"></i>
          </div>
        </span>
      </template>
    </transition-group>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  name: "logo",
  data() {
    return {};
  },
  created() {},
  computed: {
    ...mapState({showCollapse: state => state.common.showCollapse}),
    ...mapGetters(["website", "keyCollapse", "isCollapse"])
  },
  methods: {
    setCollapse() {
      this.$store.commit("SET_COLLAPSE");
    }
  }
};
</script>

<style lang="scss">
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-active {
  transition: opacity 2.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.avue-logo {
  position: fixed;
  top: 0;
  left: 0;
  width: 240px;
  height: 40px;
  line-height: 50px;
  background-color: #20222a;
  font-size: 20px;
  // overflow: hidden;
  box-sizing: border-box;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.15);
  color: rgba(255, 255, 255, 0.7);
  z-index: 1024;
  &_title {
    display: block;
    text-align: center;
    font-weight: 300;
    font-size: 16px;
    div {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 34%;
      img {
        margin: 16px 20px;
      }
    }
  }
  &_subtitle {
    padding-top: 10px;
    display: block;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
  }
}
.avue-logo_title {
  div {
    font-size: 16px;
    float: left;
  }
}

.avue-breadcrumb--active .unfoldMenuIcon {
  left: 21px;
  top: -26px;
}
</style>
