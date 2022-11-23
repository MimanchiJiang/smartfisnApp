if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then((value) => promise.resolve(callback()).then(() => value), (reason) => promise.resolve(callback()).then(() => {
      throw reason;
    }));
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global = uni.requireGlobal();
  ArrayBuffer = global.ArrayBuffer;
  Int8Array = global.Int8Array;
  Uint8Array = global.Uint8Array;
  Uint8ClampedArray = global.Uint8ClampedArray;
  Int16Array = global.Int16Array;
  Uint16Array = global.Uint16Array;
  Int32Array = global.Int32Array;
  Uint32Array = global.Uint32Array;
  Float32Array = global.Float32Array;
  Float64Array = global.Float64Array;
  BigInt64Array = global.BigInt64Array;
  BigUint64Array = global.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(shared, vue) {
  "use strict";
  const ON_SHOW = "onShow";
  const ON_HIDE = "onHide";
  const ON_READY = "onReady";
  function isDebugMode() {
    return typeof __channelId__ === "string" && __channelId__;
  }
  function jsonStringifyReplacer(k, p) {
    switch (shared.toRawType(p)) {
      case "Function":
        return "function() { [native code] }";
      default:
        return p;
    }
  }
  function normalizeLog(type, filename, args) {
    if (isDebugMode()) {
      args.push(filename.replace("at ", "uni-app:///"));
      return console[type].apply(console, args);
    }
    const msgs = args.map(function(v) {
      const type2 = shared.toTypeString(v).toLowerCase();
      if (["[object object]", "[object array]", "[object module]"].indexOf(type2) !== -1) {
        try {
          v = "---BEGIN:JSON---" + JSON.stringify(v, jsonStringifyReplacer) + "---END:JSON---";
        } catch (e) {
          v = type2;
        }
      } else {
        if (v === null) {
          v = "---NULL---";
        } else if (v === void 0) {
          v = "---UNDEFINED---";
        } else {
          const vType = shared.toRawType(v).toUpperCase();
          if (vType === "NUMBER" || vType === "BOOLEAN") {
            v = "---BEGIN:" + vType + "---" + v + "---END:" + vType + "---";
          } else {
            v = String(v);
          }
        }
      }
      return v;
    });
    return msgs.join("---COMMA---") + " " + filename;
  }
  function formatAppLog(type, filename, ...args) {
    const res = normalizeLog(type, filename, args);
    res && console[type](res);
  }
  var _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$6 = {
    name: "UniCard",
    emits: ["click"],
    props: {
      title: {
        type: String,
        default: ""
      },
      subTitle: {
        type: String,
        default: ""
      },
      padding: {
        type: String,
        default: "10px"
      },
      margin: {
        type: String,
        default: "15px"
      },
      spacing: {
        type: String,
        default: "0 10px"
      },
      extra: {
        type: String,
        default: ""
      },
      cover: {
        type: String,
        default: ""
      },
      thumbnail: {
        type: String,
        default: ""
      },
      isFull: {
        type: Boolean,
        default: false
      },
      isShadow: {
        type: Boolean,
        default: true
      },
      shadow: {
        type: String,
        default: "0px 0px 3px 1px rgba(0, 0, 0, 0.08)"
      },
      border: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      onClick(type) {
        this.$emit("click", type);
      }
    }
  };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", {
      class: vue.normalizeClass(["uni-card", { "uni-card--full": $props.isFull, "uni-card--shadow": $props.isShadow, "uni-card--border": $props.border }]),
      style: vue.normalizeStyle({ "margin": $props.isFull ? 0 : $props.margin, "padding": $props.spacing, "box-shadow": $props.isShadow ? $props.shadow : "" })
    }, [
      vue.createCommentVNode(" \u5C01\u9762 "),
      vue.renderSlot(_ctx.$slots, "cover", {}, () => [
        $props.cover ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "uni-card__cover"
        }, [
          vue.createElementVNode("image", {
            class: "uni-card__cover-image",
            mode: "widthFix",
            onClick: _cache[0] || (_cache[0] = ($event) => $options.onClick("cover")),
            src: $props.cover
          }, null, 8, ["src"])
        ])) : vue.createCommentVNode("v-if", true)
      ], true),
      vue.renderSlot(_ctx.$slots, "title", {}, () => [
        $props.title || $props.extra ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "uni-card__header"
        }, [
          vue.createCommentVNode(" \u5361\u7247\u6807\u9898 "),
          vue.createElementVNode("view", {
            class: "uni-card__header-box",
            onClick: _cache[1] || (_cache[1] = ($event) => $options.onClick("title"))
          }, [
            $props.thumbnail ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "uni-card__header-avatar"
            }, [
              vue.createElementVNode("image", {
                class: "uni-card__header-avatar-image",
                src: $props.thumbnail,
                mode: "aspectFit"
              }, null, 8, ["src"])
            ])) : vue.createCommentVNode("v-if", true),
            vue.createElementVNode("view", { class: "uni-card__header-content" }, [
              vue.createElementVNode("text", { class: "uni-card__header-content-title uni-ellipsis" }, vue.toDisplayString($props.title), 1),
              $props.title && $props.subTitle ? (vue.openBlock(), vue.createElementBlock("text", {
                key: 0,
                class: "uni-card__header-content-subtitle uni-ellipsis"
              }, vue.toDisplayString($props.subTitle), 1)) : vue.createCommentVNode("v-if", true)
            ])
          ]),
          vue.createElementVNode("view", {
            class: "uni-card__header-extra",
            onClick: _cache[2] || (_cache[2] = ($event) => $options.onClick("extra"))
          }, [
            vue.createElementVNode("text", { class: "uni-card__header-extra-text" }, vue.toDisplayString($props.extra), 1)
          ])
        ])) : vue.createCommentVNode("v-if", true)
      ], true),
      vue.createCommentVNode(" \u5361\u7247\u5185\u5BB9 "),
      vue.createElementVNode("view", {
        class: "uni-card__content",
        style: vue.normalizeStyle({ padding: $props.padding }),
        onClick: _cache[3] || (_cache[3] = ($event) => $options.onClick("content"))
      }, [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ], 4),
      vue.createElementVNode("view", {
        class: "uni-card__actions",
        onClick: _cache[4] || (_cache[4] = ($event) => $options.onClick("actions"))
      }, [
        vue.renderSlot(_ctx.$slots, "actions", {}, void 0, true)
      ])
    ], 6);
  }
  var __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$5], ["__scopeId", "data-v-19622063"], ["__file", "E:/\u5404\u7C7B\u6587\u4EF6/\u6BD5\u4E1A\u8BBE\u8BA1/uniapp/smartfish-app/uni_modules/uni-card/components/uni-card/uni-card.vue"]]);
  function resolveEasycom(component, easycom) {
    return shared.isString(component) ? easycom : component;
  }
  const createHook = (lifecycle) => (hook, target = vue.getCurrentInstance()) => {
    !vue.isInSSRComponentSetup && vue.injectHook(lifecycle, hook, target);
  };
  const onShow = /* @__PURE__ */ createHook(ON_SHOW);
  const onHide = /* @__PURE__ */ createHook(ON_HIDE);
  const onReady = /* @__PURE__ */ createHook(ON_READY);
  const _sfc_main$5 = {
    name: "UniNumberBox",
    emits: ["change", "input", "update:modelValue", "blur", "focus"],
    props: {
      value: {
        type: [Number, String],
        default: 1
      },
      modelValue: {
        type: [Number, String],
        default: 1
      },
      min: {
        type: Number,
        default: 0
      },
      max: {
        type: Number,
        default: 100
      },
      step: {
        type: Number,
        default: 1
      },
      background: {
        type: String,
        default: "#f5f5f5"
      },
      color: {
        type: String,
        default: "#333"
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        inputValue: 0
      };
    },
    watch: {
      value(val) {
        this.inputValue = +val;
      },
      modelValue(val) {
        this.inputValue = +val;
      }
    },
    created() {
      if (this.value === 1) {
        this.inputValue = +this.modelValue;
      }
      if (this.modelValue === 1) {
        this.inputValue = +this.value;
      }
    },
    methods: {
      _calcValue(type) {
        if (this.disabled) {
          return;
        }
        const scale = this._getDecimalScale();
        let value = this.inputValue * scale;
        let step = this.step * scale;
        if (type === "minus") {
          value -= step;
          if (value < this.min * scale) {
            return;
          }
          if (value > this.max * scale) {
            value = this.max * scale;
          }
        }
        if (type === "plus") {
          value += step;
          if (value > this.max * scale) {
            return;
          }
          if (value < this.min * scale) {
            value = this.min * scale;
          }
        }
        this.inputValue = (value / scale).toFixed(String(scale).length - 1);
        this.$emit("change", +this.inputValue);
        this.$emit("input", +this.inputValue);
        this.$emit("update:modelValue", +this.inputValue);
      },
      _getDecimalScale() {
        let scale = 1;
        if (~~this.step !== this.step) {
          scale = Math.pow(10, String(this.step).split(".")[1].length);
        }
        return scale;
      },
      _onBlur(event) {
        this.$emit("blur", event);
        let value = event.detail.value;
        if (!value) {
          return;
        }
        value = +value;
        if (value > this.max) {
          value = this.max;
        } else if (value < this.min) {
          value = this.min;
        }
        const scale = this._getDecimalScale();
        this.inputValue = value.toFixed(String(scale).length - 1);
        this.$emit("change", +this.inputValue);
        this.$emit("input", +this.inputValue);
      },
      _onFocus(event) {
        this.$emit("focus", event);
      }
    }
  };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-numbox" }, [
      vue.createElementVNode("view", {
        onClick: _cache[0] || (_cache[0] = ($event) => $options._calcValue("minus")),
        class: "uni-numbox__minus uni-numbox-btns",
        style: vue.normalizeStyle({ background: $props.background })
      }, [
        vue.createElementVNode("text", {
          class: vue.normalizeClass(["uni-numbox--text", { "uni-numbox--disabled": $data.inputValue <= $props.min || $props.disabled }]),
          style: vue.normalizeStyle({ color: $props.color })
        }, "-", 6)
      ], 4),
      vue.withDirectives(vue.createElementVNode("input", {
        disabled: $props.disabled,
        onFocus: _cache[1] || (_cache[1] = (...args) => $options._onFocus && $options._onFocus(...args)),
        onBlur: _cache[2] || (_cache[2] = (...args) => $options._onBlur && $options._onBlur(...args)),
        class: "uni-numbox__value",
        type: "number",
        "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.inputValue = $event),
        style: vue.normalizeStyle({ background: $props.background, color: $props.color })
      }, null, 44, ["disabled"]), [
        [vue.vModelText, $data.inputValue]
      ]),
      vue.createElementVNode("view", {
        onClick: _cache[4] || (_cache[4] = ($event) => $options._calcValue("plus")),
        class: "uni-numbox__plus uni-numbox-btns",
        style: vue.normalizeStyle({ background: $props.background })
      }, [
        vue.createElementVNode("text", {
          class: vue.normalizeClass(["uni-numbox--text", { "uni-numbox--disabled": $data.inputValue >= $props.max || $props.disabled }]),
          style: vue.normalizeStyle({ color: $props.color })
        }, "+", 6)
      ], 4)
    ]);
  }
  var __easycom_1 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$4], ["__scopeId", "data-v-dd94a2a8"], ["__file", "E:/\u5404\u7C7B\u6587\u4EF6/\u6BD5\u4E1A\u8BBE\u8BA1/uniapp/smartfish-app/uni_modules/uni-number-box/components/uni-number-box/uni-number-box.vue"]]);
  const _sfc_main$4 = {
    setup() {
      const quality = vue.ref("");
      const temp = vue.ref("");
      const time = vue.ref("");
      const timer = vue.ref("");
      vue.ref();
      vue.ref();
      const mqttStatus = vue.ref("");
      vue.ref(true);
      const feedTime = vue.ref(2);
      onShow(() => {
        uni.request({
          url: "http://10.149.3.126:8888/mqtt",
          method: "POST",
          success(res) {
            if (res.data == "connected") {
              mqttStatus.value = true;
            } else {
              mqttStatus.value = false;
            }
            formatAppLog("log", "at pages/equipment/equipment.vue:96", mqttStatus.value);
          }
        });
      });
      onReady(() => {
        timer.value = setInterval(() => {
          uni.request({
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
      onHide(() => {
        clearInterval(timer.value);
        formatAppLog("log", "at pages/equipment/equipment.vue:117", "\u5B9A\u65F6\u5668\u88AB\u524A\u9664\u4E86");
      });
      const TimingFeed = () => {
        formatAppLog("log", "at pages/equipment/equipment.vue:130", feedTime.value);
        uni.request({
          url: "http://10.149.3.126:8888/TimingFeed",
          method: "POST",
          data: {
            feedTime: feedTime.value
          },
          header: { "content-type": "application/json" },
          success() {
            formatAppLog("log", "at pages/equipment/equipment.vue:140", `\u5C06\u5728${feedTime.value}\u5C0F\u65F6\u540E\u5582\u98DF`);
          }
        });
      };
      const Reflash = () => {
        uni.request({
          url: "http://10.149.3.126:8888/mqtt",
          method: "POST",
          success(res) {
            if (res.data == "connected") {
              mqttStatus.value = true;
            } else {
              mqttStatus.value = false;
            }
            formatAppLog("log", "at pages/equipment/equipment.vue:154", mqttStatus.value);
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
        feedTime,
        TimingFeed
      };
    }
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_card = resolveEasycom(vue.resolveDynamicComponent("uni-card"), __easycom_0);
    const _component_uni_number_box = resolveEasycom(vue.resolveDynamicComponent("uni-number-box"), __easycom_1);
    return vue.openBlock(), vue.createElementBlock("view", { class: "box" }, [
      vue.createElementVNode("view", { class: "TopBar" }, [
        vue.createElementVNode("view", { class: "logo" }),
        vue.createElementVNode("view", { class: "connectStatus" }, [
          vue.createElementVNode("view", null, "mqtt:"),
          vue.createElementVNode("view", {
            class: vue.normalizeClass($setup.mqttStatus ? "mqtt-status-greenCircle" : "mqtt-status-redCircle")
          }, null, 2)
        ])
      ]),
      vue.createElementVNode("view", { class: "showData" }, [
        vue.createElementVNode("view", { class: "showDataQuality" }, [
          vue.createVNode(_component_uni_card, {
            title: "\u6C34\u8D28\u4F20\u611F\u5668",
            thumbnail: "../../static/quality.png"
          }, {
            default: vue.withCtx(() => [
              vue.createElementVNode("view", null, " \u6570\u503C:" + vue.toDisplayString($setup.quality), 1),
              vue.createElementVNode("view", null, " \u65F6\u95F4:" + vue.toDisplayString($setup.timestampToTime($setup.time)), 1)
            ]),
            _: 1
          })
        ]),
        vue.createElementVNode("view", { class: "showDataTemp" }, [
          vue.createVNode(_component_uni_card, {
            title: "\u6E29\u5EA6\u4F20\u611F\u5668",
            thumbnail: "../../static/temperature.png"
          }, {
            default: vue.withCtx(() => [
              vue.createElementVNode("view", null, " \u6570\u503C:" + vue.toDisplayString($setup.temp), 1),
              vue.createElementVNode("view", null, " \u65F6\u95F4:" + vue.toDisplayString($setup.timestampToTime($setup.time)), 1)
            ]),
            _: 1
          })
        ])
      ]),
      vue.createElementVNode("view", { class: "control" }, [
        vue.createElementVNode("view", { class: "controlAuto" }, [
          vue.createTextVNode(" \u81EA\u52A8/\u624B\u52A8\u6A21\u5F0F\u5207\u6362 "),
          vue.createElementVNode("button", {
            onClick: _cache[0] || (_cache[0] = (...args) => _ctx.ModelChange && _ctx.ModelChange(...args))
          }, "\u81EA\u52A8\u6A21\u5F0F"),
          vue.createTextVNode(" \u5B9A\u65F6\u5582\u98DF "),
          vue.createVNode(_component_uni_number_box, {
            modelValue: $setup.feedTime,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.feedTime = $event),
            min: 0,
            max: 9
          }, null, 8, ["modelValue"]),
          vue.createElementVNode("button", {
            onClick: _cache[2] || (_cache[2] = (...args) => $setup.TimingFeed && $setup.TimingFeed(...args))
          }, "\u70B9\u51FB\u6295\u5582"),
          vue.createElementVNode("view", { class: "reflash" }, [
            vue.createElementVNode("button", {
              onClick: _cache[3] || (_cache[3] = (...args) => $setup.Reflash && $setup.Reflash(...args))
            }, "\u5237\u65B0")
          ])
        ]),
        vue.createElementVNode("view", { class: "controlManual" }, [
          vue.createElementVNode("view", { class: "controlManualContent" }, [
            vue.createTextVNode(" \u706F\u5E26\u5F00\u5173 "),
            vue.createElementVNode("button", null, "\u706F\u5E26\u5F00\u5173"),
            vue.createTextVNode(" \u6C34\u6CF5\u5F00\u5173 "),
            vue.createElementVNode("button", null, "\u6C34\u6CF5\u5F00\u5173")
          ])
        ])
      ])
    ]);
  }
  var PagesEquipmentEquipment = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$3], ["__file", "E:/\u5404\u7C7B\u6587\u4EF6/\u6BD5\u4E1A\u8BBE\u8BA1/uniapp/smartfish-app/pages/equipment/equipment.vue"]]);
  const _sfc_main$3 = {
    data() {
      return {};
    },
    methods: {}
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", null, " \u8FD9\u662F\u8BBE\u5907\u63A7\u5236\u9875\u9762 ");
  }
  var PagesControlControl = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["__file", "E:/\u5404\u7C7B\u6587\u4EF6/\u6BD5\u4E1A\u8BBE\u8BA1/uniapp/smartfish-app/pages/control/control.vue"]]);
  const _sfc_main$2 = {
    data() {
      return {};
    },
    methods: {}
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", null, " \u8FD9\u662F\u5386\u53F2\u8BB0\u5F55\u5C55\u793A\u9875\u9762 ");
  }
  var PagesHistoryHistory = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__file", "E:/\u5404\u7C7B\u6587\u4EF6/\u6BD5\u4E1A\u8BBE\u8BA1/uniapp/smartfish-app/pages/history/history.vue"]]);
  const _sfc_main$1 = {
    setup(props, context) {
      const isShowLogin = vue.ref(true);
      const isShowRegister = vue.ref(false);
      const login = vue.ref({
        username: "",
        password: "",
        notice: "\u8BF7\u8F93\u5165\u7528\u6237\u540D\u548C\u5BC6\u7801",
        isError: false
      });
      const register = vue.ref({
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
    return vue.openBlock(), vue.createElementBlock("div", { class: "login" }, [
      vue.createElementVNode("div", { class: "login-logo" }, [
        vue.createElementVNode("i", { class: "iconfont icon-Fish icon" }),
        vue.createElementVNode("span", null, "\u667A\u80FD\u9C7C\u7F38\u7CFB\u7EDF")
      ]),
      vue.createElementVNode("div", { class: "form" }, [
        vue.createElementVNode("h3", {
          onClick: _cache[0] || (_cache[0] = (...args) => $setup.showRegister && $setup.showRegister(...args))
        }, "\u521B\u5EFA\u8D26\u6237"),
        vue.createElementVNode("div", {
          class: vue.normalizeClass([{ show: $setup.isShowRegister }, "register"])
        }, [
          vue.withDirectives(vue.createElementVNode("input", {
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.register.username = $event),
            type: "text",
            placeholder: "\u7528\u6237\u540D"
          }, null, 512), [
            [vue.vModelText, $setup.register.username]
          ]),
          vue.withDirectives(vue.createElementVNode("input", {
            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.register.password = $event),
            onKeyup: _cache[3] || (_cache[3] = vue.withKeys((...args) => $setup.onRegister && $setup.onRegister(...args), ["enter"])),
            type: "password",
            placeholder: "\u5BC6\u7801"
          }, null, 544), [
            [vue.vModelText, $setup.register.password]
          ]),
          vue.createElementVNode("p", {
            class: vue.normalizeClass({ error: $setup.register.isError })
          }, vue.toDisplayString($setup.register.notice), 3),
          vue.createElementVNode("div", {
            type: "submit",
            class: "button",
            onClick: _cache[4] || (_cache[4] = (...args) => $setup.onRegister && $setup.onRegister(...args)),
            onKeydown: _cache[5] || (_cache[5] = vue.withKeys((...args) => $setup.onRegister && $setup.onRegister(...args), ["enter"]))
          }, "\u521B\u5EFA\u8D26\u53F7", 32)
        ], 2),
        vue.createElementVNode("h3", {
          onClick: _cache[6] || (_cache[6] = (...args) => $setup.showLogin && $setup.showLogin(...args))
        }, "\u767B\u5F55"),
        vue.createElementVNode("div", {
          class: vue.normalizeClass([{ show: $setup.isShowLogin }, "login"])
        }, [
          vue.withDirectives(vue.createElementVNode("input", {
            type: "text",
            "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $setup.login.username = $event),
            placeholder: "\u8F93\u5165\u7528\u6237\u540D"
          }, null, 512), [
            [vue.vModelText, $setup.login.username]
          ]),
          vue.withDirectives(vue.createElementVNode("input", {
            onKeyup: _cache[8] || (_cache[8] = vue.withKeys((...args) => $setup.onLogin && $setup.onLogin(...args), ["enter"])),
            type: "password",
            "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => $setup.login.password = $event),
            placeholder: "\u5BC6\u7801"
          }, null, 544), [
            [vue.vModelText, $setup.login.password]
          ]),
          vue.createElementVNode("p", {
            class: vue.normalizeClass({ error: $setup.login.isError })
          }, "123123s" + vue.toDisplayString($setup.login.notice), 3),
          vue.createElementVNode("div", {
            class: "button",
            onClick: _cache[10] || (_cache[10] = (...args) => $setup.onLogin && $setup.onLogin(...args)),
            onKeydown: _cache[11] || (_cache[11] = vue.withKeys((...args) => $setup.onLogin && $setup.onLogin(...args), ["enter"]))
          }, "\u767B\u5F55", 32),
          vue.createElementVNode("navigator", { url: "/pages/index/equipment" }, "\u8DF3\u8F6C")
        ], 2)
      ])
    ]);
  }
  var PagesLoginLogin = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__scopeId", "data-v-b237504c"], ["__file", "E:/\u5404\u7C7B\u6587\u4EF6/\u6BD5\u4E1A\u8BBE\u8BA1/uniapp/smartfish-app/pages/login/login.vue"]]);
  __definePage("pages/equipment/equipment", PagesEquipmentEquipment);
  __definePage("pages/control/control", PagesControlControl);
  __definePage("pages/history/history", PagesHistoryHistory);
  __definePage("pages/login/login", PagesLoginLogin);
  const _sfc_main = {
    onLaunch: function() {
      formatAppLog("log", "at App.vue:4", "App Launch");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:7", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:10", "App Hide");
    }
  };
  var App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "E:/\u5404\u7C7B\u6587\u4EF6/\u6BD5\u4E1A\u8BBE\u8BA1/uniapp/smartfish-app/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(uni.VueShared, Vue);
