"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  setup(props, context) {
    const isShowLogin = common_vendor.ref(true);
    const isShowRegister = common_vendor.ref(false);
    const login = common_vendor.ref({
      username: "",
      password: "",
      notice: "\u8BF7\u8F93\u5165\u7528\u6237\u540D\u548C\u5BC6\u7801",
      isError: false
    });
    const register = common_vendor.ref({
      username: "",
      password: "",
      notice: "\u521B\u5EFA\u8D26\u53F7\u540E\uFF0C\u8BF7\u8BB0\u4F4F\u7528\u6237\u540D\u548C\u5BC6\u7801",
      isError: false
    });
    const showLogin = () => {
      isShowLogin.value = true;
      isShowRegister.value = false;
    };
    const showRegister = () => {
      isShowLogin.value = false;
      isShowRegister.value = true;
    };
    const onRegister = () => {
      if (!/^[\w\u4e00-\u9fa5]{3,15}$/.test(register.value.username)) {
        register.value.isError = true;
        register.value.notice = "\u7528\u6237\u540D3~15\u4E2A\u5B57\u7B26\uFF0C\u4EC5\u9650\u4E8E\u5B57\u6BCD\u6570\u5B57\u4E0B\u5212\u7EBF\u4E2D\u6587";
        return;
      }
      if (!/^.{6,16}$/.test(register.value.password)) {
        register.value.isError = true;
        register.value.notice = "\u5BC6\u7801\u957F\u5EA6\u4E3A6~16\u4E2A\u5B57\u7B26";
        return;
      }
    };
    const onLogin = () => {
      if (!/^[\w\u4e00-\u9fa5]{3,15}$/.test(login.value.username)) {
        login.value.isError = true;
        login.value.notice = "\u7528\u6237\u540D3~15\u4E2A\u5B57\u7B26\uFF0C\u4EC5\u9650\u4E8E\u5B57\u6BCD\u6570\u5B57\u4E0B\u5212\u7EBF\u4E2D\u6587";
        return;
      }
      if (!/^.{6,16}$/.test(login.value.password)) {
        login.value.isError = true;
        login.value.notice = "\u5BC6\u7801\u957F\u5EA6\u4E3A6~16\u4E2A\u5B57\u7B26";
        return;
      }
    };
    const close = () => {
      context.emit("update:visible", false);
    };
    return {
      isShowLogin,
      isShowRegister,
      login,
      register,
      showLogin,
      showRegister,
      onRegister,
      onLogin,
      close
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $setup.showRegister && $setup.showRegister(...args)),
    b: $setup.register.username,
    c: common_vendor.o(($event) => $setup.register.username = $event.detail.value),
    d: common_vendor.o((...args) => $setup.onRegister && $setup.onRegister(...args)),
    e: $setup.register.password,
    f: common_vendor.o(($event) => $setup.register.password = $event.detail.value),
    g: common_vendor.t($setup.register.notice),
    h: $setup.register.isError ? 1 : "",
    i: common_vendor.o((...args) => $setup.onRegister && $setup.onRegister(...args)),
    j: common_vendor.o((...args) => $setup.onRegister && $setup.onRegister(...args)),
    k: $setup.isShowRegister ? 1 : "",
    l: common_vendor.o((...args) => $setup.showLogin && $setup.showLogin(...args)),
    m: $setup.login.username,
    n: common_vendor.o(($event) => $setup.login.username = $event.detail.value),
    o: common_vendor.o((...args) => $setup.onLogin && $setup.onLogin(...args)),
    p: $setup.login.password,
    q: common_vendor.o(($event) => $setup.login.password = $event.detail.value),
    r: common_vendor.t($setup.login.notice),
    s: $setup.login.isError ? 1 : "",
    t: common_vendor.o((...args) => $setup.onLogin && $setup.onLogin(...args)),
    v: common_vendor.o((...args) => $setup.onLogin && $setup.onLogin(...args)),
    w: $setup.isShowLogin ? 1 : ""
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-b237504c"], ["__file", "E:/\u5404\u7C7B\u6587\u4EF6/\u6BD5\u4E1A\u8BBE\u8BA1/uniapp/smartfish-app/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
