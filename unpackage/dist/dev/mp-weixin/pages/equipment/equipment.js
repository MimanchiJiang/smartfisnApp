"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  setup() {
    const quality = common_vendor.ref("");
    const temp = common_vendor.ref("");
    const time = common_vendor.ref("");
    const timer = common_vendor.ref("");
    common_vendor.ref();
    common_vendor.ref();
    const mqttStatus = common_vendor.ref("");
    const autoStatus = common_vendor.ref(true);
    const servoTime = common_vendor.ref(2);
    common_vendor.onShow(() => {
      common_vendor.index.request({
        url: "http://10.149.3.126:8888/mqtt",
        method: "POST",
        success(res) {
          if (res.data == "connected") {
            mqttStatus.value = true;
          } else {
            mqttStatus.value = false;
          }
          console.log(mqttStatus.value);
        }
      });
    });
    common_vendor.onReady(() => {
      timer.value = setInterval(() => {
        common_vendor.index.request({
          url: "http://10.149.3.126:8888/data",
          method: "POST",
          success: (res) => {
            temp.value = res.data[0].temp;
            quality.value = res.data[0].quality;
            time.value = res.data[0].time;
          }
        });
      }, 1e3);
    });
    common_vendor.onHide(() => {
      clearInterval(timer.value);
      console.log("\u5B9A\u65F6\u5668\u88AB\u524A\u9664\u4E86");
    });
    const autoControl = () => {
      console.log(autoStatus.value);
      autoStatus.value = !autoStatus.value;
      common_vendor.index.request({
        url: "http://10.149.3.126:8888/autoControl",
        method: "POST",
        data: JSON.stringify({
          autoStatus: autoStatus.value
        }),
        success() {
          console.log(autoStatus.value);
          console.log("\u5207\u6362\u6210\u529F");
        }
      });
    };
    const TimingFeed = () => {
      console.log(servoTime.value);
      common_vendor.index.request({
        url: "http://10.149.3.126:8888/TimingFeed",
        method: "POST",
        data: JSON.stringify({
          servoTime: servoTime.value
        }),
        success() {
          console.log(`\u5C06\u5728${servoTime.value}\u5C0F\u65F6\u540E\u5582\u98DF`);
        }
      });
    };
    const Reflash = () => {
      common_vendor.index.request({
        url: "http://10.149.3.126:8888/mqtt",
        method: "POST",
        success(res) {
          if (res.data == "connected") {
            mqttStatus.value = true;
          } else {
            mqttStatus.value = false;
          }
          console.log(mqttStatus.value);
        }
      });
    };
    const timestampToTime = (timestamp) => {
      var date = new Date(timestamp);
      var Y = date.getFullYear() + "-";
      var M = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-";
      var D = date.getDate() + " ";
      var h = (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      var m = (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) + ":";
      var s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return Y + M + D + h + m + s;
    };
    return {
      temp,
      time,
      quality,
      timestampToTime,
      mqttStatus,
      Reflash,
      servoTime,
      TimingFeed,
      autoControl,
      autoStatus
    };
  }
};
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_number_box2 = common_vendor.resolveComponent("uni-number-box");
  (_easycom_uni_card2 + _easycom_uni_number_box2)();
}
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_number_box = () => "../../uni_modules/uni-number-box/components/uni-number-box/uni-number-box.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uni_number_box)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.n($setup.mqttStatus ? "mqtt-status-greenCircle" : "mqtt-status-redCircle"),
    b: common_vendor.t($setup.quality),
    c: common_vendor.t($setup.timestampToTime($setup.time)),
    d: common_vendor.p({
      title: "\u6C34\u8D28\u4F20\u611F\u5668",
      thumbnail: "../../static/quality.png"
    }),
    e: common_vendor.t($setup.temp),
    f: common_vendor.t($setup.timestampToTime($setup.time)),
    g: common_vendor.p({
      title: "\u6E29\u5EA6\u4F20\u611F\u5668",
      thumbnail: "../../static/temperature.png"
    }),
    h: common_vendor.o((...args) => $setup.autoControl && $setup.autoControl(...args)),
    i: common_vendor.o(($event) => $setup.servoTime = $event),
    j: common_vendor.p({
      min: 0,
      max: 9,
      modelValue: $setup.servoTime
    }),
    k: common_vendor.o((...args) => $setup.TimingFeed && $setup.TimingFeed(...args)),
    l: common_vendor.o((...args) => $setup.Reflash && $setup.Reflash(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/\u5404\u7C7B\u6587\u4EF6/\u6BD5\u4E1A\u8BBE\u8BA1/uniapp/smartfish-app/pages/equipment/equipment.vue"]]);
wx.createPage(MiniProgramPage);
