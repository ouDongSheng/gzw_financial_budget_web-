<template>
  <!-- <el-form class="login-form"
           status-icon
           :rules="loginRules"
           ref="loginForm"
           :model="loginForm"
           label-width="0">
    <el-form-item v-if="tenantMode" prop="tenantId">
      <el-input size="small"
                @keyup.enter.native="handleLogin"
                v-model="loginForm.tenantId"
                auto-complete="off"
                :placeholder="$t('login.tenantId')">
        <i slot="prefix"
           class="icon-quanxian"></i>
      </el-input>
    </el-form-item>
    <el-form-item prop="username">
      <el-input size="small"
                @keyup.enter.native="handleLogin"
                v-model="loginForm.username"
                auto-complete="off"
                :placeholder="$t('login.username')">
        <i slot="prefix"
           class="icon-yonghu"></i>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input size="small"
                @keyup.enter.native="handleLogin"
                :type="passwordType"
                v-model="loginForm.password"
                auto-complete="off"
                :placeholder="$t('login.password')">
        <i class="el-icon-view el-input__icon"
           slot="suffix"
           @click="showPassword"></i>
        <i slot="prefix"
           class="icon-mima"></i>
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary"
                 size="small"
                 @click.native.prevent="handleLogin"
                 class="login-submit">{{$t('login.submit')}}</el-button>
    </el-form-item>
  </el-form> -->

  <div class="loginInputBox">
    <div class="errorContainer">
      <div v-if="showError" class="errorBox">
        <img class="errorImg" src="../../assets/commonIcons/notice.png">
        <span class="errorText"> {{ errorMessage }} </span>
      </div>
    </div>
    <el-form class="userlogin" :model="loginForm" status-icon :rules="loginRules" ref="loginForm" label-width="100px">
      <el-form-item v-if="tenantMode" prop="tenantId">
        <el-input :placeholder="$t('login.tenantId')" v-model="loginForm.tenantId" autocomplete="off">
        </el-input>
      </el-form-item>
      <el-form-item prop="username">
        <el-input :placeholder="$t('login.username')" v-model="loginForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input :type="passwordType" :placeholder="$t('login.password')" v-model="loginForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                  @click.native.prevent="handleLogin"
                  class="login-submit"
                  :class="active ? activeBtn : ''">{{$t('login.submit')}}</el-button>
      </el-form-item>
    </el-form>
  </div>
  
</template>

<script>
import { mapGetters } from "vuex";
import website from '@/config/website';

export default {
  name: "userlogin",
  data() {
    return {
      tenantMode: website.tenantMode,
      loginForm: {
        tenantId: "",
        username: "",
        password: "",
        type: "account"
      },
      loginRules: {
        tenantId: [
          { required: false, message: "请输入租户ID", trigger: "blur" }
        ],
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 1, message: "密码长度最少为6位", trigger: "blur" }
        ]
      },
      passwordType: "password",
      companyList: [],
      active: false,
      showError: false, // 显示错误
      errorMessage: "请重试", // 错误提示内容
    };
  },
  created() {},
  mounted() {},
  computed: {
    ...mapGetters(["tagWel", "tenantId","loginError"])
  },
  props: [],
  methods: {
    showPassword() {
      this.passwordType == ""
        ? (this.passwordType = "password")
        : (this.passwordType = "");
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: '登录中,请稍后。。。',
            spinner: "el-icon-loading"
          });
          this.$store.dispatch("LoginByUsername", this.loginForm).then(() => {
            // console.log(this.tagWel, this.tagWel.value);
            this.$router.push({ path: this.tagWel.value });

            loading.close();
          }).catch(() => {
            loading.close()
          });
        }
      });
    },

    //根据对应可以匹配对应label
    matching(nodeData, tenantId) {
      let selectedWorkName = null;
      selectedWorkName = nodeData.find((item) => {
        console.log(item.tenantId, tenantId);
        
        return item.tenantId === tenantId;
      });
      return selectedWorkName.tenantName;
    },
  }
};
</script>

<style scoped="scoped">
  .login-submit {
    height: 60px;
    font-size: 18px;
    border-radius: 4px;
    color: #FFFFFF;
    background-color: rgba(0, 0, 0, 0.2);
    border: none;
    font-weight: bold;
  }
  .el-button--primary:focus, .el-button--primary:hover {
    background-color: #78B929;
  }
</style>

<style lang="scss">
.loginInputBox {
  width: 500px;
  margin-left: -80px;
  .errorContainer {
    width: 180px;
    height: 40px;
    margin: 10px 210px 15px 210px;
    min-height: 40px;

    .errorBox {
      display: flex;
      background-color: rgba(255, 92, 92, 0.7);
      border-radius: 4px;

      .errorImg {
        margin: 8px;
      }

      .errorText {
        font-size: 14px;
        color: #FFFFFF;
        line-height: 40px;
      }
    }
  }
  
  .el-input__inner {
    width: 400px;
    height: 60px;
    background-color: rgba(255, 255, 255, 0.7) !important;
    border: 1px solid #45A9FF;
    border-radius: 4px;
    box-shadow: 0px 0px 6px #3A6AB7 inset;
  }
  .el-icon-arrow-up:before {
    color: #2567C0;
  }
  input::-webkit-input-placeholder {
    color: #717171;
  }
  input::-moz-input-placeholder {
    color: #717171;
  }
  input::-ms-input-placeholder {
    color: #717171;
  }

  .el-form-item--feedback .el-input__validateIcon {
    display: none;
  }
}
</style>
