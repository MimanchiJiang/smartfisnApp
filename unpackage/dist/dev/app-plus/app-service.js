var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
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
  const ON_PULL_DOWN_REFRESH = "onPullDownRefresh";
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
  const _sfc_main$9 = {
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
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
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
  var __easycom_0$2 = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$8], ["__scopeId", "data-v-19622063"], ["__file", "E:/\u5404\u7C7B\u6587\u4EF6/\u6BD5\u4E1A\u8BBE\u8BA1/uniapp/smartfish-app/uni_modules/uni-card/components/uni-card/uni-card.vue"]]);
  function resolveEasycom(component, easycom) {
    return shared.isString(component) ? easycom : component;
  }
  const createHook = (lifecycle) => (hook, target = vue.getCurrentInstance()) => {
    !vue.isInSSRComponentSetup && vue.injectHook(lifecycle, hook, target);
  };
  const onShow = /* @__PURE__ */ createHook(ON_SHOW);
  const onHide = /* @__PURE__ */ createHook(ON_HIDE);
  const onReady = /* @__PURE__ */ createHook(ON_READY);
  const onPullDownRefresh = /* @__PURE__ */ createHook(ON_PULL_DOWN_REFRESH);
  var popup = {
    data() {
      return {};
    },
    created() {
      this.popup = this.getParent();
    },
    methods: {
      getParent(name = "uniPopup") {
        let parent = this.$parent;
        let parentName = parent.$options.name;
        while (parentName !== name) {
          parent = parent.$parent;
          if (!parent)
            return false;
          parentName = parent.$options.name;
        }
        return parent;
      }
    }
  };
  const _sfc_main$8 = {
    name: "uniPopupMessage",
    mixins: [popup],
    props: {
      type: {
        type: String,
        default: "success"
      },
      message: {
        type: String,
        default: ""
      },
      duration: {
        type: Number,
        default: 3e3
      },
      maskShow: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {};
    },
    created() {
      this.popup.maskShow = this.maskShow;
      this.popup.messageChild = this;
    },
    methods: {
      timerClose() {
        if (this.duration === 0)
          return;
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.popup.close();
        }, this.duration);
      }
    }
  };
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-popup-message" }, [
      vue.createElementVNode("view", {
        class: vue.normalizeClass(["uni-popup-message__box fixforpc-width", "uni-popup__" + $props.type])
      }, [
        vue.renderSlot(_ctx.$slots, "default", {}, () => [
          vue.createElementVNode("text", {
            class: vue.normalizeClass(["uni-popup-message-text", "uni-popup__" + $props.type + "-text"])
          }, vue.toDisplayString($props.message), 3)
        ], true)
      ], 2)
    ]);
  }
  var __easycom_1 = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$7], ["__scopeId", "data-v-38167fe2"], ["__file", "E:/\u5404\u7C7B\u6587\u4EF6/\u6BD5\u4E1A\u8BBE\u8BA1/uniapp/smartfish-app/uni_modules/uni-popup/components/uni-popup-message/uni-popup-message.vue"]]);
  class MPAnimation {
    constructor(options, _this) {
      this.options = options;
      this.animation = uni.createAnimation(options);
      this.currentStepAnimates = {};
      this.next = 0;
      this.$ = _this;
    }
    _nvuePushAnimates(type, args) {
      let aniObj = this.currentStepAnimates[this.next];
      let styles = {};
      if (!aniObj) {
        styles = {
          styles: {},
          config: {}
        };
      } else {
        styles = aniObj;
      }
      if (animateTypes1.includes(type)) {
        if (!styles.styles.transform) {
          styles.styles.transform = "";
        }
        let unit = "";
        if (type === "rotate") {
          unit = "deg";
        }
        styles.styles.transform += `${type}(${args + unit}) `;
      } else {
        styles.styles[type] = `${args}`;
      }
      this.currentStepAnimates[this.next] = styles;
    }
    _animateRun(styles = {}, config = {}) {
      let ref = this.$.$refs["ani"].ref;
      if (!ref)
        return;
      return new Promise((resolve, reject) => {
        nvueAnimation.transition(ref, __spreadValues({
          styles
        }, config), (res) => {
          resolve();
        });
      });
    }
    _nvueNextAnimate(animates, step = 0, fn) {
      let obj = animates[step];
      if (obj) {
        let {
          styles,
          config
        } = obj;
        this._animateRun(styles, config).then(() => {
          step += 1;
          this._nvueNextAnimate(animates, step, fn);
        });
      } else {
        this.currentStepAnimates = {};
        typeof fn === "function" && fn();
        this.isEnd = true;
      }
    }
    step(config = {}) {
      this.animation.step(config);
      return this;
    }
    run(fn) {
      this.$.animationData = this.animation.export();
      this.$.timer = setTimeout(() => {
        typeof fn === "function" && fn();
      }, this.$.durationTime);
    }
  }
  const animateTypes1 = [
    "matrix",
    "matrix3d",
    "rotate",
    "rotate3d",
    "rotateX",
    "rotateY",
    "rotateZ",
    "scale",
    "scale3d",
    "scaleX",
    "scaleY",
    "scaleZ",
    "skew",
    "skewX",
    "skewY",
    "translate",
    "translate3d",
    "translateX",
    "translateY",
    "translateZ"
  ];
  const animateTypes2 = ["opacity", "backgroundColor"];
  const animateTypes3 = ["width", "height", "left", "right", "top", "bottom"];
  animateTypes1.concat(animateTypes2, animateTypes3).forEach((type) => {
    MPAnimation.prototype[type] = function(...args) {
      this.animation[type](...args);
      return this;
    };
  });
  function createAnimation(option, _this) {
    if (!_this)
      return;
    clearTimeout(_this.timer);
    return new MPAnimation(option, _this);
  }
  const _sfc_main$7 = {
    name: "uniTransition",
    emits: ["click", "change"],
    props: {
      show: {
        type: Boolean,
        default: false
      },
      modeClass: {
        type: [Array, String],
        default() {
          return "fade";
        }
      },
      duration: {
        type: Number,
        default: 300
      },
      styles: {
        type: Object,
        default() {
          return {};
        }
      },
      customClass: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        isShow: false,
        transform: "",
        opacity: 1,
        animationData: {},
        durationTime: 300,
        config: {}
      };
    },
    watch: {
      show: {
        handler(newVal) {
          if (newVal) {
            this.open();
          } else {
            if (this.isShow) {
              this.close();
            }
          }
        },
        immediate: true
      }
    },
    computed: {
      stylesObject() {
        let styles = __spreadProps(__spreadValues({}, this.styles), {
          "transition-duration": this.duration / 1e3 + "s"
        });
        let transform = "";
        for (let i in styles) {
          let line = this.toLine(i);
          transform += line + ":" + styles[i] + ";";
        }
        return transform;
      },
      transformStyles() {
        return "transform:" + this.transform + ";opacity:" + this.opacity + ";" + this.stylesObject;
      }
    },
    created() {
      this.config = {
        duration: this.duration,
        timingFunction: "ease",
        transformOrigin: "50% 50%",
        delay: 0
      };
      this.durationTime = this.duration;
    },
    methods: {
      init(obj = {}) {
        if (obj.duration) {
          this.durationTime = obj.duration;
        }
        this.animation = createAnimation(Object.assign(this.config, obj), this);
      },
      onClick() {
        this.$emit("click", {
          detail: this.isShow
        });
      },
      step(obj, config = {}) {
        if (!this.animation)
          return;
        for (let i in obj) {
          try {
            if (typeof obj[i] === "object") {
              this.animation[i](...obj[i]);
            } else {
              this.animation[i](obj[i]);
            }
          } catch (e) {
            formatAppLog("error", "at uni_modules/uni-transition/components/uni-transition/uni-transition.vue:139", `\u65B9\u6CD5 ${i} \u4E0D\u5B58\u5728`);
          }
        }
        this.animation.step(config);
        return this;
      },
      run(fn) {
        if (!this.animation)
          return;
        this.animation.run(fn);
      },
      open() {
        clearTimeout(this.timer);
        this.transform = "";
        this.isShow = true;
        let { opacity, transform } = this.styleInit(false);
        if (typeof opacity !== "undefined") {
          this.opacity = opacity;
        }
        this.transform = transform;
        this.$nextTick(() => {
          this.timer = setTimeout(() => {
            this.animation = createAnimation(this.config, this);
            this.tranfromInit(false).step();
            this.animation.run();
            this.$emit("change", {
              detail: this.isShow
            });
          }, 20);
        });
      },
      close(type) {
        if (!this.animation)
          return;
        this.tranfromInit(true).step().run(() => {
          this.isShow = false;
          this.animationData = null;
          this.animation = null;
          let { opacity, transform } = this.styleInit(false);
          this.opacity = opacity || 1;
          this.transform = transform;
          this.$emit("change", {
            detail: this.isShow
          });
        });
      },
      styleInit(type) {
        let styles = {
          transform: ""
        };
        let buildStyle = (type2, mode) => {
          if (mode === "fade") {
            styles.opacity = this.animationType(type2)[mode];
          } else {
            styles.transform += this.animationType(type2)[mode] + " ";
          }
        };
        if (typeof this.modeClass === "string") {
          buildStyle(type, this.modeClass);
        } else {
          this.modeClass.forEach((mode) => {
            buildStyle(type, mode);
          });
        }
        return styles;
      },
      tranfromInit(type) {
        let buildTranfrom = (type2, mode) => {
          let aniNum = null;
          if (mode === "fade") {
            aniNum = type2 ? 0 : 1;
          } else {
            aniNum = type2 ? "-100%" : "0";
            if (mode === "zoom-in") {
              aniNum = type2 ? 0.8 : 1;
            }
            if (mode === "zoom-out") {
              aniNum = type2 ? 1.2 : 1;
            }
            if (mode === "slide-right") {
              aniNum = type2 ? "100%" : "0";
            }
            if (mode === "slide-bottom") {
              aniNum = type2 ? "100%" : "0";
            }
          }
          this.animation[this.animationMode()[mode]](aniNum);
        };
        if (typeof this.modeClass === "string") {
          buildTranfrom(type, this.modeClass);
        } else {
          this.modeClass.forEach((mode) => {
            buildTranfrom(type, mode);
          });
        }
        return this.animation;
      },
      animationType(type) {
        return {
          fade: type ? 1 : 0,
          "slide-top": `translateY(${type ? "0" : "-100%"})`,
          "slide-right": `translateX(${type ? "0" : "100%"})`,
          "slide-bottom": `translateY(${type ? "0" : "100%"})`,
          "slide-left": `translateX(${type ? "0" : "-100%"})`,
          "zoom-in": `scaleX(${type ? 1 : 0.8}) scaleY(${type ? 1 : 0.8})`,
          "zoom-out": `scaleX(${type ? 1 : 1.2}) scaleY(${type ? 1 : 1.2})`
        };
      },
      animationMode() {
        return {
          fade: "opacity",
          "slide-top": "translateY",
          "slide-right": "translateX",
          "slide-bottom": "translateY",
          "slide-left": "translateX",
          "zoom-in": "scale",
          "zoom-out": "scale"
        };
      },
      toLine(name) {
        return name.replace(/([A-Z])/g, "-$1").toLowerCase();
      }
    }
  };
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    return $data.isShow ? (vue.openBlock(), vue.createElementBlock("view", {
      key: 0,
      ref: "ani",
      animation: $data.animationData,
      class: vue.normalizeClass($props.customClass),
      style: vue.normalizeStyle($options.transformStyles),
      onClick: _cache[0] || (_cache[0] = (...args) => $options.onClick && $options.onClick(...args))
    }, [
      vue.renderSlot(_ctx.$slots, "default")
    ], 14, ["animation"])) : vue.createCommentVNode("v-if", true);
  }
  var __easycom_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$6], ["__file", "E:/\u5404\u7C7B\u6587\u4EF6/\u6BD5\u4E1A\u8BBE\u8BA1/uniapp/smartfish-app/uni_modules/uni-transition/components/uni-transition/uni-transition.vue"]]);
  const _sfc_main$6 = {
    name: "uniPopup",
    components: {},
    emits: ["change", "maskClick"],
    props: {
      animation: {
        type: Boolean,
        default: true
      },
      type: {
        type: String,
        default: "center"
      },
      isMaskClick: {
        type: Boolean,
        default: null
      },
      maskClick: {
        type: Boolean,
        default: null
      },
      backgroundColor: {
        type: String,
        default: "none"
      },
      safeArea: {
        type: Boolean,
        default: true
      },
      maskBackgroundColor: {
        type: String,
        default: "rgba(0, 0, 0, 0.4)"
      }
    },
    watch: {
      type: {
        handler: function(type) {
          if (!this.config[type])
            return;
          this[this.config[type]](true);
        },
        immediate: true
      },
      isDesktop: {
        handler: function(newVal) {
          if (!this.config[newVal])
            return;
          this[this.config[this.type]](true);
        },
        immediate: true
      },
      maskClick: {
        handler: function(val) {
          this.mkclick = val;
        },
        immediate: true
      },
      isMaskClick: {
        handler: function(val) {
          this.mkclick = val;
        },
        immediate: true
      },
      showPopup(show) {
      }
    },
    data() {
      return {
        duration: 300,
        ani: [],
        showPopup: false,
        showTrans: false,
        popupWidth: 0,
        popupHeight: 0,
        config: {
          top: "top",
          bottom: "bottom",
          center: "center",
          left: "left",
          right: "right",
          message: "top",
          dialog: "center",
          share: "bottom"
        },
        maskClass: {
          position: "fixed",
          bottom: 0,
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: "rgba(0, 0, 0, 0.4)"
        },
        transClass: {
          position: "fixed",
          left: 0,
          right: 0
        },
        maskShow: true,
        mkclick: true,
        popupstyle: this.isDesktop ? "fixforpc-top" : "top"
      };
    },
    computed: {
      isDesktop() {
        return this.popupWidth >= 500 && this.popupHeight >= 500;
      },
      bg() {
        if (this.backgroundColor === "" || this.backgroundColor === "none") {
          return "transparent";
        }
        return this.backgroundColor;
      }
    },
    mounted() {
      const fixSize = () => {
        const {
          windowWidth,
          windowHeight,
          windowTop,
          safeArea,
          screenHeight,
          safeAreaInsets
        } = uni.getSystemInfoSync();
        this.popupWidth = windowWidth;
        this.popupHeight = windowHeight + (windowTop || 0);
        if (safeArea && this.safeArea) {
          this.safeAreaInsets = safeAreaInsets.bottom;
        } else {
          this.safeAreaInsets = 0;
        }
      };
      fixSize();
    },
    unmounted() {
      this.setH5Visible();
    },
    created() {
      if (this.isMaskClick === null && this.maskClick === null) {
        this.mkclick = true;
      } else {
        this.mkclick = this.isMaskClick !== null ? this.isMaskClick : this.maskClick;
      }
      if (this.animation) {
        this.duration = 300;
      } else {
        this.duration = 0;
      }
      this.messageChild = null;
      this.clearPropagation = false;
      this.maskClass.backgroundColor = this.maskBackgroundColor;
    },
    methods: {
      setH5Visible() {
      },
      closeMask() {
        this.maskShow = false;
      },
      disableMask() {
        this.mkclick = false;
      },
      clear(e) {
        e.stopPropagation();
        this.clearPropagation = true;
      },
      open(direction) {
        if (this.showPopup) {
          clearTimeout(this.timer);
          this.showPopup = false;
        }
        let innerType = ["top", "center", "bottom", "left", "right", "message", "dialog", "share"];
        if (!(direction && innerType.indexOf(direction) !== -1)) {
          direction = this.type;
        }
        if (!this.config[direction]) {
          formatAppLog("error", "at uni_modules/uni-popup/components/uni-popup/uni-popup.vue:280", "\u7F3A\u5C11\u7C7B\u578B\uFF1A", direction);
          return;
        }
        this[this.config[direction]]();
        this.$emit("change", {
          show: true,
          type: direction
        });
      },
      close(type) {
        this.showTrans = false;
        this.$emit("change", {
          show: false,
          type: this.type
        });
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.showPopup = false;
        }, 300);
      },
      touchstart() {
        this.clearPropagation = false;
      },
      onTap() {
        if (this.clearPropagation) {
          this.clearPropagation = false;
          return;
        }
        this.$emit("maskClick");
        if (!this.mkclick)
          return;
        this.close();
      },
      top(type) {
        this.popupstyle = this.isDesktop ? "fixforpc-top" : "top";
        this.ani = ["slide-top"];
        this.transClass = {
          position: "fixed",
          left: 0,
          right: 0,
          backgroundColor: this.bg
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
        this.$nextTick(() => {
          if (this.messageChild && this.type === "message") {
            this.messageChild.timerClose();
          }
        });
      },
      bottom(type) {
        this.popupstyle = "bottom";
        this.ani = ["slide-bottom"];
        this.transClass = {
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          paddingBottom: this.safeAreaInsets + "px",
          backgroundColor: this.bg
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
      },
      center(type) {
        this.popupstyle = "center";
        this.ani = ["zoom-out", "fade"];
        this.transClass = {
          position: "fixed",
          display: "flex",
          flexDirection: "column",
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
          justifyContent: "center",
          alignItems: "center"
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
      },
      left(type) {
        this.popupstyle = "left";
        this.ani = ["slide-left"];
        this.transClass = {
          position: "fixed",
          left: 0,
          bottom: 0,
          top: 0,
          backgroundColor: this.bg,
          display: "flex",
          flexDirection: "column"
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
      },
      right(type) {
        this.popupstyle = "right";
        this.ani = ["slide-right"];
        this.transClass = {
          position: "fixed",
          bottom: 0,
          right: 0,
          top: 0,
          backgroundColor: this.bg,
          display: "flex",
          flexDirection: "column"
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
      }
    }
  };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_transition = resolveEasycom(vue.resolveDynamicComponent("uni-transition"), __easycom_0$1);
    return $data.showPopup ? (vue.openBlock(), vue.createElementBlock("view", {
      key: 0,
      class: vue.normalizeClass(["uni-popup", [$data.popupstyle, $options.isDesktop ? "fixforpc-z-index" : ""]])
    }, [
      vue.createElementVNode("view", {
        onTouchstart: _cache[1] || (_cache[1] = (...args) => $options.touchstart && $options.touchstart(...args))
      }, [
        $data.maskShow ? (vue.openBlock(), vue.createBlock(_component_uni_transition, {
          key: "1",
          name: "mask",
          "mode-class": "fade",
          styles: $data.maskClass,
          duration: $data.duration,
          show: $data.showTrans,
          onClick: $options.onTap
        }, null, 8, ["styles", "duration", "show", "onClick"])) : vue.createCommentVNode("v-if", true),
        vue.createVNode(_component_uni_transition, {
          key: "2",
          "mode-class": $data.ani,
          name: "content",
          styles: $data.transClass,
          duration: $data.duration,
          show: $data.showTrans,
          onClick: $options.onTap
        }, {
          default: vue.withCtx(() => [
            vue.createElementVNode("view", {
              class: vue.normalizeClass(["uni-popup__wrapper", [$data.popupstyle]]),
              style: vue.normalizeStyle({ backgroundColor: $options.bg }),
              onClick: _cache[0] || (_cache[0] = (...args) => $options.clear && $options.clear(...args))
            }, [
              vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
            ], 6)
          ]),
          _: 3
        }, 8, ["mode-class", "styles", "duration", "show", "onClick"])
      ], 32)
    ], 2)) : vue.createCommentVNode("v-if", true);
  }
  var __easycom_2 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$5], ["__scopeId", "data-v-7c43d41b"], ["__file", "E:/\u5404\u7C7B\u6587\u4EF6/\u6BD5\u4E1A\u8BBE\u8BA1/uniapp/smartfish-app/uni_modules/uni-popup/components/uni-popup/uni-popup.vue"]]);
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
  var __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$4], ["__scopeId", "data-v-dd94a2a8"], ["__file", "E:/\u5404\u7C7B\u6587\u4EF6/\u6BD5\u4E1A\u8BBE\u8BA1/uniapp/smartfish-app/uni_modules/uni-number-box/components/uni-number-box/uni-number-box.vue"]]);
  const _sfc_main$4 = {
    setup() {
      const quality = vue.ref("");
      const temp = vue.ref("");
      const time = vue.ref("");
      const timer = vue.ref("");
      const mqttStatus = vue.ref("");
      const autoStatus = vue.ref(true);
      const lightStatus = vue.ref(false);
      const pumpStatus = vue.ref(false);
      const servoTime = vue.ref(2);
      const modelBtnText = vue.ref("\u8BBE\u5907\u5904\u4E8E\u81EA\u52A8\u6A21\u5F0F");
      const lightBtnText = vue.ref("\u5F00\u706F");
      const pumpBtnText = vue.ref("\u5F00\u6C34\u6CF5");
      const autoControlPopupDom = vue.ref();
      const pumpText = vue.ref();
      const lightText = vue.ref();
      const timingFeedText = vue.ref();
      const autoControlText = vue.ref();
      const timingFeedMessageType = vue.ref("success");
      const lightControlMessageType = vue.ref("success");
      const pumpControlMessageType = vue.ref("success");
      const autoControlMessageType = vue.ref("success");
      const lightControlPopupDom = vue.ref();
      const pumpControlPopupDom = vue.ref();
      const timingFeedControlPopupDom = vue.ref();
      const autoControlPopupOpen = () => {
        autoControlPopupDom.value.open("top");
      };
      const lightControlPopupOpen = () => {
        lightControlPopupDom.value.open("top");
      };
      const pumpControlPopupOpen = () => {
        pumpControlPopupDom.value.open("top");
      };
      const timingFeedControlPopupOpen = () => {
        timingFeedControlPopupDom.value.open("top");
      };
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
            formatAppLog("log", "at pages/equipment/equipment.vue:150", mqttStatus.value);
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
        formatAppLog("log", "at pages/equipment/equipment.vue:171", "\u5B9A\u65F6\u5668\u88AB\u524A\u9664\u4E86");
      });
      const pumpControl = () => {
        formatAppLog("log", "at pages/equipment/equipment.vue:175", "\u5207\u6362\u524D\uFF1A" + pumpStatus.value);
        pumpStatus.value = !pumpStatus.value;
        uni.request({
          url: "http://10.149.3.126:8888/pump",
          method: "POST",
          data: JSON.stringify({
            pump: pumpStatus.value
          }),
          success() {
            if (pumpStatus.value == true) {
              pumpBtnText.value = "\u5173\u6C34\u6CF5";
              pumpText.value = "\u6C34\u6CF5\u5DF2\u5F00\u542F";
              pumpControlMessageType.value = "success";
              pumpControlPopupOpen();
            } else {
              pumpBtnText.value = "\u5F00\u6C34\u6CF5";
              pumpText.value = "\u6C34\u6CF5\u5DF2\u5173\u95ED";
              pumpControlMessageType.value = "success";
              pumpControlPopupOpen();
            }
          },
          fail() {
            formatAppLog("log", "at pages/equipment/equipment.vue:197", "\u6295\u5582\u5931\u8D25\uFF01\u8BF7\u5237\u65B0\u91CD\u8BD5");
            timingFeedText.value = "\u6295\u5582\u5931\u8D25\uFF01\u8BF7\u5237\u65B0\u91CD\u8BD5";
          }
        });
      };
      const lightControl = () => {
        formatAppLog("log", "at pages/equipment/equipment.vue:204", "\u5207\u6362\u524D\uFF1A" + lightStatus.value);
        lightStatus.value = !lightStatus.value;
        uni.request({
          url: "http://10.149.3.126:8888/light",
          method: "POST",
          data: JSON.stringify({
            light: lightStatus.value
          }),
          success() {
            if (lightStatus.value == true) {
              lightBtnText.value = "\u5173\u706F";
              lightText.value = "\u706F\u5149\u5DF2\u5F00\u542F";
              lightControlMessageType.value = "success";
              lightControlPopupOpen();
            } else {
              lightBtnText.value = "\u5F00\u706F";
              lightText.value = "\u706F\u5149\u5DF2\u5173\u95ED";
              lightControlMessageType.value = "success";
              lightControlPopupOpen();
            }
          },
          fail() {
            lightText.value = "\u706F\u5149\u63A7\u5236\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5\uFF01";
            lightControlMessageType.value = "error";
            lightControlPopupOpen();
          }
        });
      };
      const autoControl = () => {
        formatAppLog("log", "at pages/equipment/equipment.vue:234", autoStatus.value);
        autoStatus.value = !autoStatus.value;
        uni.request({
          url: "http://10.149.3.126:8888/autoControl",
          method: "POST",
          data: JSON.stringify({
            autoStatus: autoStatus.value
          }),
          success() {
            if (autoStatus.value == true) {
              modelBtnText.value = "\u8BBE\u5907\u5904\u4E8E\u81EA\u52A8\u6A21\u5F0F";
            } else {
              modelBtnText.value = "\u8BBE\u5907\u5904\u4E8E\u624B\u52A8\u6A21\u5F0F";
            }
            autoControlMessageType.value = "success";
            autoControlText.value = "\u6A21\u5F0F\u5207\u6362\u6210\u529F";
            autoControlPopupOpen();
          },
          fail() {
            autoControlMessageType.value = "error";
            autoControlText.value = "\u6A21\u5F0F\u5207\u6362\u5931\u8D25";
            autoControlPopupOpen();
          }
        });
      };
      const TimingFeed = () => {
        formatAppLog("log", "at pages/equipment/equipment.vue:261", servoTime.value);
        uni.request({
          url: "http://10.149.3.126:8888/TimingFeed",
          method: "POST",
          data: JSON.stringify({
            servoTime: servoTime.value
          }),
          success() {
            timingFeedMessageType.value = "success";
            timingFeedText.value = `\u6295\u5582\u6210\u529F\uFF01\u5C06\u5728${servoTime.value}\u5C0F\u65F6\u540E\u5582\u98DF`;
            timingFeedControlPopupOpen();
          },
          fail() {
            timingFeedMessageType.value = "error";
            timingFeedText.value = `\u6295\u5582\u5931\u8D25\uFF01\u8BF7\u5237\u65B0\u540E\u91CD\u8BD5`;
            timingFeedControlPopupOpen();
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
            formatAppLog("log", "at pages/equipment/equipment.vue:291", mqttStatus.value);
          }
        });
      };
      onPullDownRefresh(() => {
        uni.request({
          url: "http://10.149.3.126:8888/mqtt",
          method: "POST",
          success(res) {
            if (res.data == "connected") {
              mqttStatus.value = true;
            } else {
              mqttStatus.value = false;
            }
            formatAppLog("log", "at pages/equipment/equipment.vue:306", mqttStatus.value);
            uni.stopPullDownRefresh();
          }
        });
      });
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
        autoStatus,
        modelBtnText,
        lightBtnText,
        lightStatus,
        lightControl,
        pumpBtnText,
        pumpControl,
        pumpStatus,
        autoControlPopupDom,
        pumpText,
        lightText,
        timingFeedText,
        autoControlText,
        timingFeedMessageType,
        lightControlMessageType,
        pumpControlMessageType,
        autoControlMessageType,
        timingFeedControlPopupDom,
        lightControlPopupDom,
        pumpControlPopupDom
      };
    }
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_card = resolveEasycom(vue.resolveDynamicComponent("uni-card"), __easycom_0$2);
    const _component_uni_popup_message = resolveEasycom(vue.resolveDynamicComponent("uni-popup-message"), __easycom_1);
    const _component_uni_popup = resolveEasycom(vue.resolveDynamicComponent("uni-popup"), __easycom_2);
    const _component_uni_number_box = resolveEasycom(vue.resolveDynamicComponent("uni-number-box"), __easycom_0);
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
          vue.createElementVNode("view", { class: "controlAutoText" }, " \u81EA\u52A8/\u624B\u52A8\u6A21\u5F0F\u5207\u6362 "),
          vue.createElementVNode("button", {
            onClick: _cache[0] || (_cache[0] = (...args) => $setup.autoControl && $setup.autoControl(...args)),
            textContent: vue.toDisplayString($setup.modelBtnText)
          }, null, 8, ["textContent"]),
          vue.createVNode(_component_uni_popup, {
            ref: "autoControlPopupDom",
            type: "message"
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uni_popup_message, {
                type: $setup.autoControlMessageType,
                message: $setup.autoControlText,
                duration: "2000"
              }, null, 8, ["type", "message"])
            ]),
            _: 1
          }, 512),
          vue.createElementVNode("view", { class: "timingFeedText" }, " \u5B9A\u65F6\u5582\u98DF "),
          vue.createElementVNode("view", { class: "numberBox" }, [
            vue.createVNode(_component_uni_number_box, {
              class: "numberBoxContent",
              modelValue: $setup.servoTime,
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.servoTime = $event),
              min: 0,
              max: 9
            }, null, 8, ["modelValue"])
          ]),
          vue.createElementVNode("button", {
            onClick: _cache[2] || (_cache[2] = (...args) => $setup.TimingFeed && $setup.TimingFeed(...args)),
            class: "TimingFeed"
          }, "\u70B9\u51FB\u6295\u5582"),
          vue.createVNode(_component_uni_popup, {
            ref: "timingFeedControlPopupDom",
            type: "message"
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uni_popup_message, {
                type: $setup.timingFeedMessageType,
                message: $setup.timingFeedText,
                duration: "2000"
              }, null, 8, ["type", "message"])
            ]),
            _: 1
          }, 512)
        ]),
        vue.createElementVNode("view", { class: "controlManual" }, [
          vue.createElementVNode("view", { class: "controlManualContent" }, [
            vue.createElementVNode("view", { class: "lightControlText" }, " \u706F\u5E26\u5F00\u5173 "),
            vue.createElementVNode("button", {
              onClick: _cache[3] || (_cache[3] = (...args) => $setup.lightControl && $setup.lightControl(...args)),
              textContent: vue.toDisplayString($setup.lightBtnText)
            }, null, 8, ["textContent"]),
            vue.createVNode(_component_uni_popup, {
              ref: "lightControlPopupDom",
              type: "message"
            }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_uni_popup_message, {
                  type: $setup.lightControlMessageType,
                  message: $setup.lightText,
                  duration: "2000"
                }, null, 8, ["type", "message"])
              ]),
              _: 1
            }, 512),
            vue.createElementVNode("view", { class: "pumpControlText" }, " \u6C34\u6CF5\u5F00\u5173 "),
            vue.createElementVNode("button", {
              onClick: _cache[4] || (_cache[4] = (...args) => $setup.pumpControl && $setup.pumpControl(...args)),
              textContent: vue.toDisplayString($setup.pumpBtnText)
            }, null, 8, ["textContent"]),
            vue.createVNode(_component_uni_popup, {
              ref: "pumpControlPopupDom",
              type: "message"
            }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_uni_popup_message, {
                  type: $setup.pumpControlMessageType,
                  message: $setup.pumpText,
                  duration: "2000"
                }, null, 8, ["type", "message"])
              ]),
              _: 1
            }, 512),
            vue.createElementVNode("view", { class: "reflash" }, [
              vue.createElementVNode("button", {
                onClick: _cache[5] || (_cache[5] = (...args) => $setup.Reflash && $setup.Reflash(...args))
              }, "\u5237\u65B0")
            ])
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
    const _component_uni_number_box = resolveEasycom(vue.resolveDynamicComponent("uni-number-box"), __easycom_0);
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("view", { class: "control" }, [
        vue.createElementVNode("view", { class: "controlAuto" }, [
          vue.createTextVNode(" \u81EA\u52A8/\u624B\u52A8\u6A21\u5F0F\u5207\u6362 "),
          vue.createElementVNode("button", {
            onClick: _cache[0] || (_cache[0] = (...args) => _ctx.autoControl && _ctx.autoControl(...args))
          }, "\u81EA\u52A8\u6A21\u5F0F"),
          vue.createTextVNode(" \u5B9A\u65F6\u5582\u98DF "),
          vue.createVNode(_component_uni_number_box, {
            modelValue: _ctx.servoTime,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.servoTime = $event),
            min: 0,
            max: 9
          }, null, 8, ["modelValue"]),
          vue.createElementVNode("button", {
            onClick: _cache[2] || (_cache[2] = (...args) => _ctx.TimingFeed && _ctx.TimingFeed(...args))
          }, "\u70B9\u51FB\u6295\u5582"),
          vue.createElementVNode("view", { class: "reflash" }, [
            vue.createElementVNode("button", {
              onClick: _cache[3] || (_cache[3] = (...args) => _ctx.Reflash && _ctx.Reflash(...args))
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
