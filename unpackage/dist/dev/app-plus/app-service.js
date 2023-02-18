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
  const global2 = uni.requireGlobal();
  ArrayBuffer = global2.ArrayBuffer;
  Int8Array = global2.Int8Array;
  Uint8Array = global2.Uint8Array;
  Uint8ClampedArray = global2.Uint8ClampedArray;
  Int16Array = global2.Int16Array;
  Uint16Array = global2.Uint16Array;
  Int32Array = global2.Int32Array;
  Uint32Array = global2.Uint32Array;
  Float32Array = global2.Float32Array;
  Float64Array = global2.Float64Array;
  BigInt64Array = global2.BigInt64Array;
  BigUint64Array = global2.BigUint64Array;
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
  function jsonStringifyReplacer(k2, p2) {
    switch (shared.toRawType(p2)) {
      case "Function":
        return "function() { [native code] }";
      default:
        return p2;
    }
  }
  function normalizeLog(type, filename, args) {
    if (isDebugMode()) {
      args.push(filename.replace("at ", "uni-app:///"));
      return console[type].apply(console, args);
    }
    const msgs = args.map(function(v2) {
      const type2 = shared.toTypeString(v2).toLowerCase();
      if (["[object object]", "[object array]", "[object module]"].indexOf(type2) !== -1) {
        try {
          v2 = "---BEGIN:JSON---" + JSON.stringify(v2, jsonStringifyReplacer) + "---END:JSON---";
        } catch (e) {
          v2 = type2;
        }
      } else {
        if (v2 === null) {
          v2 = "---NULL---";
        } else if (v2 === void 0) {
          v2 = "---UNDEFINED---";
        } else {
          const vType = shared.toRawType(v2).toUpperCase();
          if (vType === "NUMBER" || vType === "BOOLEAN") {
            v2 = "---BEGIN:" + vType + "---" + v2 + "---END:" + vType + "---";
          } else {
            v2 = String(v2);
          }
        }
      }
      return v2;
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
  const _sfc_main$f = {
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
  function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
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
  var __easycom_0$3 = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$e], ["__scopeId", "data-v-19622063"], ["__file", "E:/\u5404\u7C7B\u6587\u4EF6/\u6BD5\u4E1A\u8BBE\u8BA1/uniapp/smartfish-app/uni_modules/uni-card/components/uni-card/uni-card.vue"]]);
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
  const _sfc_main$e = {
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
  function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
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
  var __easycom_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$d], ["__scopeId", "data-v-38167fe2"], ["__file", "E:/\u5404\u7C7B\u6587\u4EF6/\u6BD5\u4E1A\u8BBE\u8BA1/uniapp/smartfish-app/uni_modules/uni-popup/components/uni-popup-message/uni-popup-message.vue"]]);
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
  const _sfc_main$d = {
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
        for (let i2 in styles) {
          let line = this.toLine(i2);
          transform += line + ":" + styles[i2] + ";";
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
        for (let i2 in obj) {
          try {
            if (typeof obj[i2] === "object") {
              this.animation[i2](...obj[i2]);
            } else {
              this.animation[i2](obj[i2]);
            }
          } catch (e) {
            formatAppLog("error", "at uni_modules/uni-transition/components/uni-transition/uni-transition.vue:139", `\u65B9\u6CD5 ${i2} \u4E0D\u5B58\u5728`);
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
  function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
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
  var __easycom_0$2 = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$c], ["__file", "E:/\u5404\u7C7B\u6587\u4EF6/\u6BD5\u4E1A\u8BBE\u8BA1/uniapp/smartfish-app/uni_modules/uni-transition/components/uni-transition/uni-transition.vue"]]);
  const _sfc_main$c = {
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
  function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_transition = resolveEasycom(vue.resolveDynamicComponent("uni-transition"), __easycom_0$2);
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
  var __easycom_2$1 = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$b], ["__scopeId", "data-v-7c43d41b"], ["__file", "E:/\u5404\u7C7B\u6587\u4EF6/\u6BD5\u4E1A\u8BBE\u8BA1/uniapp/smartfish-app/uni_modules/uni-popup/components/uni-popup/uni-popup.vue"]]);
  const _sfc_main$b = {
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
  function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
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
  var __easycom_3$1 = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$a], ["__scopeId", "data-v-dd94a2a8"], ["__file", "E:/\u5404\u7C7B\u6587\u4EF6/\u6BD5\u4E1A\u8BBE\u8BA1/uniapp/smartfish-app/uni_modules/uni-number-box/components/uni-number-box/uni-number-box.vue"]]);
  const _sfc_main$a = {
    setup() {
      const quality = vue.ref("");
      const temp = vue.ref("");
      const time = vue.ref("");
      const timer = vue.ref("");
      const mqttStatus = vue.ref("");
      const autoStatus = vue.ref(true);
      const lightStatus = vue.ref(false);
      const pumpStatus = vue.ref(false);
      const servoTime = vue.ref(1);
      const modelBtnText = vue.ref("\u8BBE\u5907\u5904\u4E8E\u81EA\u52A8\u6A21\u5F0F");
      const lightBtnText = vue.ref("\u5F00\u706F");
      const pumpBtnText = vue.ref("\u5F00\u6C34\u6CF5");
      const autoControlPopupDom = vue.ref();
      const lightControlPopupDom = vue.ref();
      const pumpControlPopupDom = vue.ref();
      const timingFeedControlPopupDom = vue.ref();
      const pumpText = vue.ref();
      const lightText = vue.ref();
      const timingFeedText = vue.ref();
      const autoControlText = vue.ref();
      const timingFeedMessageType = vue.ref("success");
      const lightControlMessageType = vue.ref("success");
      const pumpControlMessageType = vue.ref("success");
      const autoControlMessageType = vue.ref("success");
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
          url: "http://192.168.43.218:8888/mqtt",
          method: "POST",
          success(res) {
            if (res.data == "connected") {
              mqttStatus.value = true;
            } else {
              mqttStatus.value = false;
            }
            formatAppLog("log", "at pages/equipment/equipment.vue:164", mqttStatus.value);
          }
        });
      });
      onReady(() => {
        timer.value = setInterval(() => {
          uni.request({
            url: "http://192.168.43.218:8888/data",
            method: "POST",
            success: (res) => {
              temp.value = res.data[0].temp;
              if (res.data[0].quality > 25) {
                quality.value = "\u6B63\u5E38";
              }
              if (res.data[0].quality < 25 && res.data[0].quality > 10) {
                quality.value = "\u6709\u4E9B\u6D51\u6D4A";
              }
              if (res.data[0].quality < 10) {
                quality.value = "\u975E\u5E38\u6D51\u6D4A";
              }
              time.value = res.data[0].time;
              formatAppLog("log", "at pages/equipment/equipment.vue:189", res);
              if (res.data[0].light == "0") {
                lightBtnText.value = "\u5F00\u706F";
                lightStatus.value = false;
              }
              if (res.data[0].light == "1") {
                lightBtnText.value = "\u5173\u706F";
                lightStatus.value = true;
              }
              if (res.data[0].pump == "0") {
                pumpBtnText.value = "\u5F00\u542F\u6C34\u6CF5";
                pumpStatus.value = false;
              }
              if (res.data[0].pump == "1") {
                pumpBtnText.value = "\u5173\u95ED\u6C34\u6CF5";
                pumpStatus.value = true;
              }
              if (res.data[0].autoControl == "0") {
                modelBtnText.value = "\u5F53\u524D\u4E3A\u624B\u52A8\u6A21\u5F0F";
                autoStatus.value = false;
              }
              if (res.data[0].autoControl == "1") {
                modelBtnText.value = "\u5F53\u524D\u4E3A\u81EA\u52A8\u6A21\u5F0F";
                autoStatus.value = true;
              }
            }
          });
        }, 1e3);
      });
      onHide(() => {
        clearInterval(timer.value);
        formatAppLog("log", "at pages/equipment/equipment.vue:221", "\u5B9A\u65F6\u5668\u88AB\u524A\u9664\u4E86");
      });
      const pumpControl = () => {
        formatAppLog("log", "at pages/equipment/equipment.vue:225", "\u5207\u6362\u524D\uFF1A" + pumpStatus.value);
        pumpStatus.value = !pumpStatus.value;
        uni.request({
          url: "http://192.168.43.218:8888/pump",
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
            formatAppLog("log", "at pages/equipment/equipment.vue:250", "\u6295\u5582\u5931\u8D25\uFF01\u8BF7\u5237\u65B0\u91CD\u8BD5");
            timingFeedText.value = "\u6295\u5582\u5931\u8D25\uFF01\u8BF7\u5237\u65B0\u91CD\u8BD5";
          }
        });
      };
      const lightControl = () => {
        formatAppLog("log", "at pages/equipment/equipment.vue:257", "\u5207\u6362\u524D\uFF1A" + lightStatus.value);
        lightStatus.value = !lightStatus.value;
        uni.request({
          url: "http://192.168.43.218:8888/light",
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
        formatAppLog("log", "at pages/equipment/equipment.vue:290", autoStatus.value);
        autoStatus.value = !autoStatus.value;
        uni.request({
          url: "http://192.168.43.218:8888/autoControl",
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
        formatAppLog("log", "at pages/equipment/equipment.vue:320", servoTime.value);
        uni.request({
          url: "http://192.168.43.218:8888/TimingFeed",
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
          url: "http://192.168.43.218:8888/mqtt",
          method: "POST",
          success(res) {
            if (res.data == "connected") {
              mqttStatus.value = true;
            } else {
              mqttStatus.value = false;
            }
            formatAppLog("log", "at pages/equipment/equipment.vue:356", mqttStatus.value);
          }
        });
      };
      onPullDownRefresh(() => {
        uni.request({
          url: "http://192.168.43.218:8888/mqtt",
          method: "POST",
          success(res) {
            if (res.data == "connected") {
              mqttStatus.value = true;
            } else {
              mqttStatus.value = false;
            }
            formatAppLog("log", "at pages/equipment/equipment.vue:374", mqttStatus.value);
            uni.stopPullDownRefresh();
          }
        });
      });
      const timeShift = (timestamp) => {
        var date = new Date(timestamp);
        var Y2 = date.getFullYear() + "-";
        var M2 = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-";
        var D2 = date.getDate() + " ";
        var h2 = (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
        var m2 = (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) + ":";
        var s2 = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        return Y2 + M2 + D2 + h2 + m2 + s2;
      };
      return {
        temp,
        time,
        quality,
        timeShift,
        Reflash,
        servoTime,
        TimingFeed,
        autoControl,
        mqttStatus,
        autoStatus,
        pumpStatus,
        lightStatus,
        modelBtnText,
        lightBtnText,
        pumpBtnText,
        lightControl,
        pumpControl,
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
        pumpControlPopupDom,
        autoControlPopupDom
      };
    }
  };
  function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_card = resolveEasycom(vue.resolveDynamicComponent("uni-card"), __easycom_0$3);
    const _component_uni_popup_message = resolveEasycom(vue.resolveDynamicComponent("uni-popup-message"), __easycom_1$1);
    const _component_uni_popup = resolveEasycom(vue.resolveDynamicComponent("uni-popup"), __easycom_2$1);
    const _component_uni_number_box = resolveEasycom(vue.resolveDynamicComponent("uni-number-box"), __easycom_3$1);
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
              vue.createElementVNode("view", null, " \u65F6\u95F4:" + vue.toDisplayString($setup.timeShift($setup.time)), 1)
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
              vue.createElementVNode("view", null, " \u65F6\u95F4:" + vue.toDisplayString($setup.timeShift($setup.time)), 1)
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
  var PagesEquipmentEquipment = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$9], ["__file", "E:/\u5404\u7C7B\u6587\u4EF6/\u6BD5\u4E1A\u8BBE\u8BA1/uniapp/smartfish-app/pages/equipment/equipment.vue"]]);
  const isArray = Array.isArray;
  const isObject = (val) => val !== null && typeof val === "object";
  const defaultDelimiters = ["{", "}"];
  class BaseFormatter {
    constructor() {
      this._caches = /* @__PURE__ */ Object.create(null);
    }
    interpolate(message, values, delimiters = defaultDelimiters) {
      if (!values) {
        return [message];
      }
      let tokens = this._caches[message];
      if (!tokens) {
        tokens = parse(message, delimiters);
        this._caches[message] = tokens;
      }
      return compile(tokens, values);
    }
  }
  const RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
  const RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
  function parse(format, [startDelimiter, endDelimiter]) {
    const tokens = [];
    let position = 0;
    let text = "";
    while (position < format.length) {
      let char = format[position++];
      if (char === startDelimiter) {
        if (text) {
          tokens.push({ type: "text", value: text });
        }
        text = "";
        let sub = "";
        char = format[position++];
        while (char !== void 0 && char !== endDelimiter) {
          sub += char;
          char = format[position++];
        }
        const isClosed = char === endDelimiter;
        const type = RE_TOKEN_LIST_VALUE.test(sub) ? "list" : isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ? "named" : "unknown";
        tokens.push({ value: sub, type });
      } else {
        text += char;
      }
    }
    text && tokens.push({ type: "text", value: text });
    return tokens;
  }
  function compile(tokens, values) {
    const compiled = [];
    let index = 0;
    const mode = isArray(values) ? "list" : isObject(values) ? "named" : "unknown";
    if (mode === "unknown") {
      return compiled;
    }
    while (index < tokens.length) {
      const token = tokens[index];
      switch (token.type) {
        case "text":
          compiled.push(token.value);
          break;
        case "list":
          compiled.push(values[parseInt(token.value, 10)]);
          break;
        case "named":
          if (mode === "named") {
            compiled.push(values[token.value]);
          } else {
            {
              console.warn(`Type of token '${token.type}' and format of value '${mode}' don't match!`);
            }
          }
          break;
        case "unknown":
          {
            console.warn(`Detect 'unknown' type of token!`);
          }
          break;
      }
      index++;
    }
    return compiled;
  }
  const LOCALE_ZH_HANS = "zh-Hans";
  const LOCALE_ZH_HANT = "zh-Hant";
  const LOCALE_EN = "en";
  const LOCALE_FR = "fr";
  const LOCALE_ES = "es";
  const hasOwnProperty = Object.prototype.hasOwnProperty;
  const hasOwn = (val, key) => hasOwnProperty.call(val, key);
  const defaultFormatter = new BaseFormatter();
  function include(str, parts) {
    return !!parts.find((part) => str.indexOf(part) !== -1);
  }
  function startsWith(str, parts) {
    return parts.find((part) => str.indexOf(part) === 0);
  }
  function normalizeLocale(locale, messages2) {
    if (!locale) {
      return;
    }
    locale = locale.trim().replace(/_/g, "-");
    if (messages2 && messages2[locale]) {
      return locale;
    }
    locale = locale.toLowerCase();
    if (locale === "chinese") {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf("zh") === 0) {
      if (locale.indexOf("-hans") > -1) {
        return LOCALE_ZH_HANS;
      }
      if (locale.indexOf("-hant") > -1) {
        return LOCALE_ZH_HANT;
      }
      if (include(locale, ["-tw", "-hk", "-mo", "-cht"])) {
        return LOCALE_ZH_HANT;
      }
      return LOCALE_ZH_HANS;
    }
    const lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
    if (lang) {
      return lang;
    }
  }
  class I18n {
    constructor({ locale, fallbackLocale, messages: messages2, watcher, formater }) {
      this.locale = LOCALE_EN;
      this.fallbackLocale = LOCALE_EN;
      this.message = {};
      this.messages = {};
      this.watchers = [];
      if (fallbackLocale) {
        this.fallbackLocale = fallbackLocale;
      }
      this.formater = formater || defaultFormatter;
      this.messages = messages2 || {};
      this.setLocale(locale || LOCALE_EN);
      if (watcher) {
        this.watchLocale(watcher);
      }
    }
    setLocale(locale) {
      const oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      if (!this.messages[this.locale]) {
        this.messages[this.locale] = {};
      }
      this.message = this.messages[this.locale];
      if (oldLocale !== this.locale) {
        this.watchers.forEach((watcher) => {
          watcher(this.locale, oldLocale);
        });
      }
    }
    getLocale() {
      return this.locale;
    }
    watchLocale(fn) {
      const index = this.watchers.push(fn) - 1;
      return () => {
        this.watchers.splice(index, 1);
      };
    }
    add(locale, message, override = true) {
      const curMessages = this.messages[locale];
      if (curMessages) {
        if (override) {
          Object.assign(curMessages, message);
        } else {
          Object.keys(message).forEach((key) => {
            if (!hasOwn(curMessages, key)) {
              curMessages[key] = message[key];
            }
          });
        }
      } else {
        this.messages[locale] = message;
      }
    }
    f(message, values, delimiters) {
      return this.formater.interpolate(message, values, delimiters).join("");
    }
    t(key, locale, values) {
      let message = this.message;
      if (typeof locale === "string") {
        locale = normalizeLocale(locale, this.messages);
        locale && (message = this.messages[locale]);
      } else {
        values = locale;
      }
      if (!hasOwn(message, key)) {
        console.warn(`Cannot translate the value of keypath ${key}. Use the value of keypath as default.`);
        return key;
      }
      return this.formater.interpolate(message[key], values).join("");
    }
  }
  function watchAppLocale(appVm, i18n) {
    if (appVm.$watchLocale) {
      appVm.$watchLocale((newLocale) => {
        i18n.setLocale(newLocale);
      });
    } else {
      appVm.$watch(() => appVm.$locale, (newLocale) => {
        i18n.setLocale(newLocale);
      });
    }
  }
  function getDefaultLocale() {
    if (typeof uni !== "undefined" && uni.getLocale) {
      return uni.getLocale();
    }
    if (typeof global !== "undefined" && global.getLocale) {
      return global.getLocale();
    }
    return LOCALE_EN;
  }
  function initVueI18n(locale, messages2 = {}, fallbackLocale, watcher) {
    if (typeof locale !== "string") {
      [locale, messages2] = [
        messages2,
        locale
      ];
    }
    if (typeof locale !== "string") {
      locale = getDefaultLocale();
    }
    if (typeof fallbackLocale !== "string") {
      fallbackLocale = typeof __uniConfig !== "undefined" && __uniConfig.fallbackLocale || LOCALE_EN;
    }
    const i18n = new I18n({
      locale,
      fallbackLocale,
      messages: messages2,
      watcher
    });
    let t2 = (key, values) => {
      if (typeof getApp !== "function") {
        t2 = function(key2, values2) {
          return i18n.t(key2, values2);
        };
      } else {
        let isWatchedAppLocale = false;
        t2 = function(key2, values2) {
          const appVm = getApp().$vm;
          if (appVm) {
            appVm.$locale;
            if (!isWatchedAppLocale) {
              isWatchedAppLocale = true;
              watchAppLocale(appVm, i18n);
            }
          }
          return i18n.t(key2, values2);
        };
      }
      return t2(key, values);
    };
    return {
      i18n,
      f(message, values, delimiters) {
        return i18n.f(message, values, delimiters);
      },
      t(key, values) {
        return t2(key, values);
      },
      add(locale2, message, override = true) {
        return i18n.add(locale2, message, override);
      },
      watch(fn) {
        return i18n.watchLocale(fn);
      },
      getLocale() {
        return i18n.getLocale();
      },
      setLocale(newLocale) {
        return i18n.setLocale(newLocale);
      }
    };
  }
  function t$1(e) {
    return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
  }
  function n(e, t2, n2) {
    return e(n2 = { path: t2, exports: {}, require: function(e2, t3) {
      return function() {
        throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
      }(t3 == null && n2.path);
    } }, n2.exports), n2.exports;
  }
  var s = n(function(e, t2) {
    var n2;
    e.exports = (n2 = n2 || function(e2, t3) {
      var n3 = Object.create || function() {
        function e3() {
        }
        return function(t4) {
          var n4;
          return e3.prototype = t4, n4 = new e3(), e3.prototype = null, n4;
        };
      }(), s2 = {}, o2 = s2.lib = {}, r2 = o2.Base = { extend: function(e3) {
        var t4 = n3(this);
        return e3 && t4.mixIn(e3), t4.hasOwnProperty("init") && this.init !== t4.init || (t4.init = function() {
          t4.$super.init.apply(this, arguments);
        }), t4.init.prototype = t4, t4.$super = this, t4;
      }, create: function() {
        var e3 = this.extend();
        return e3.init.apply(e3, arguments), e3;
      }, init: function() {
      }, mixIn: function(e3) {
        for (var t4 in e3)
          e3.hasOwnProperty(t4) && (this[t4] = e3[t4]);
        e3.hasOwnProperty("toString") && (this.toString = e3.toString);
      }, clone: function() {
        return this.init.prototype.extend(this);
      } }, i2 = o2.WordArray = r2.extend({ init: function(e3, n4) {
        e3 = this.words = e3 || [], this.sigBytes = n4 != t3 ? n4 : 4 * e3.length;
      }, toString: function(e3) {
        return (e3 || c2).stringify(this);
      }, concat: function(e3) {
        var t4 = this.words, n4 = e3.words, s3 = this.sigBytes, o3 = e3.sigBytes;
        if (this.clamp(), s3 % 4)
          for (var r3 = 0; r3 < o3; r3++) {
            var i3 = n4[r3 >>> 2] >>> 24 - r3 % 4 * 8 & 255;
            t4[s3 + r3 >>> 2] |= i3 << 24 - (s3 + r3) % 4 * 8;
          }
        else
          for (r3 = 0; r3 < o3; r3 += 4)
            t4[s3 + r3 >>> 2] = n4[r3 >>> 2];
        return this.sigBytes += o3, this;
      }, clamp: function() {
        var t4 = this.words, n4 = this.sigBytes;
        t4[n4 >>> 2] &= 4294967295 << 32 - n4 % 4 * 8, t4.length = e2.ceil(n4 / 4);
      }, clone: function() {
        var e3 = r2.clone.call(this);
        return e3.words = this.words.slice(0), e3;
      }, random: function(t4) {
        for (var n4, s3 = [], o3 = function(t5) {
          t5 = t5;
          var n5 = 987654321, s4 = 4294967295;
          return function() {
            var o4 = ((n5 = 36969 * (65535 & n5) + (n5 >> 16) & s4) << 16) + (t5 = 18e3 * (65535 & t5) + (t5 >> 16) & s4) & s4;
            return o4 /= 4294967296, (o4 += 0.5) * (e2.random() > 0.5 ? 1 : -1);
          };
        }, r3 = 0; r3 < t4; r3 += 4) {
          var a3 = o3(4294967296 * (n4 || e2.random()));
          n4 = 987654071 * a3(), s3.push(4294967296 * a3() | 0);
        }
        return new i2.init(s3, t4);
      } }), a2 = s2.enc = {}, c2 = a2.Hex = { stringify: function(e3) {
        for (var t4 = e3.words, n4 = e3.sigBytes, s3 = [], o3 = 0; o3 < n4; o3++) {
          var r3 = t4[o3 >>> 2] >>> 24 - o3 % 4 * 8 & 255;
          s3.push((r3 >>> 4).toString(16)), s3.push((15 & r3).toString(16));
        }
        return s3.join("");
      }, parse: function(e3) {
        for (var t4 = e3.length, n4 = [], s3 = 0; s3 < t4; s3 += 2)
          n4[s3 >>> 3] |= parseInt(e3.substr(s3, 2), 16) << 24 - s3 % 8 * 4;
        return new i2.init(n4, t4 / 2);
      } }, u2 = a2.Latin1 = { stringify: function(e3) {
        for (var t4 = e3.words, n4 = e3.sigBytes, s3 = [], o3 = 0; o3 < n4; o3++) {
          var r3 = t4[o3 >>> 2] >>> 24 - o3 % 4 * 8 & 255;
          s3.push(String.fromCharCode(r3));
        }
        return s3.join("");
      }, parse: function(e3) {
        for (var t4 = e3.length, n4 = [], s3 = 0; s3 < t4; s3++)
          n4[s3 >>> 2] |= (255 & e3.charCodeAt(s3)) << 24 - s3 % 4 * 8;
        return new i2.init(n4, t4);
      } }, l2 = a2.Utf8 = { stringify: function(e3) {
        try {
          return decodeURIComponent(escape(u2.stringify(e3)));
        } catch (e4) {
          throw new Error("Malformed UTF-8 data");
        }
      }, parse: function(e3) {
        return u2.parse(unescape(encodeURIComponent(e3)));
      } }, h2 = o2.BufferedBlockAlgorithm = r2.extend({ reset: function() {
        this._data = new i2.init(), this._nDataBytes = 0;
      }, _append: function(e3) {
        typeof e3 == "string" && (e3 = l2.parse(e3)), this._data.concat(e3), this._nDataBytes += e3.sigBytes;
      }, _process: function(t4) {
        var n4 = this._data, s3 = n4.words, o3 = n4.sigBytes, r3 = this.blockSize, a3 = o3 / (4 * r3), c3 = (a3 = t4 ? e2.ceil(a3) : e2.max((0 | a3) - this._minBufferSize, 0)) * r3, u3 = e2.min(4 * c3, o3);
        if (c3) {
          for (var l3 = 0; l3 < c3; l3 += r3)
            this._doProcessBlock(s3, l3);
          var h3 = s3.splice(0, c3);
          n4.sigBytes -= u3;
        }
        return new i2.init(h3, u3);
      }, clone: function() {
        var e3 = r2.clone.call(this);
        return e3._data = this._data.clone(), e3;
      }, _minBufferSize: 0 });
      o2.Hasher = h2.extend({ cfg: r2.extend(), init: function(e3) {
        this.cfg = this.cfg.extend(e3), this.reset();
      }, reset: function() {
        h2.reset.call(this), this._doReset();
      }, update: function(e3) {
        return this._append(e3), this._process(), this;
      }, finalize: function(e3) {
        return e3 && this._append(e3), this._doFinalize();
      }, blockSize: 16, _createHelper: function(e3) {
        return function(t4, n4) {
          return new e3.init(n4).finalize(t4);
        };
      }, _createHmacHelper: function(e3) {
        return function(t4, n4) {
          return new d2.HMAC.init(e3, n4).finalize(t4);
        };
      } });
      var d2 = s2.algo = {};
      return s2;
    }(Math), n2);
  }), o = (n(function(e, t2) {
    var n2;
    e.exports = (n2 = s, function(e2) {
      var t3 = n2, s2 = t3.lib, o2 = s2.WordArray, r2 = s2.Hasher, i2 = t3.algo, a2 = [];
      !function() {
        for (var t4 = 0; t4 < 64; t4++)
          a2[t4] = 4294967296 * e2.abs(e2.sin(t4 + 1)) | 0;
      }();
      var c2 = i2.MD5 = r2.extend({ _doReset: function() {
        this._hash = new o2.init([1732584193, 4023233417, 2562383102, 271733878]);
      }, _doProcessBlock: function(e3, t4) {
        for (var n3 = 0; n3 < 16; n3++) {
          var s3 = t4 + n3, o3 = e3[s3];
          e3[s3] = 16711935 & (o3 << 8 | o3 >>> 24) | 4278255360 & (o3 << 24 | o3 >>> 8);
        }
        var r3 = this._hash.words, i3 = e3[t4 + 0], c3 = e3[t4 + 1], f2 = e3[t4 + 2], p2 = e3[t4 + 3], g = e3[t4 + 4], m2 = e3[t4 + 5], y2 = e3[t4 + 6], _2 = e3[t4 + 7], w2 = e3[t4 + 8], k2 = e3[t4 + 9], S2 = e3[t4 + 10], v2 = e3[t4 + 11], T2 = e3[t4 + 12], A2 = e3[t4 + 13], P2 = e3[t4 + 14], I2 = e3[t4 + 15], O2 = r3[0], b2 = r3[1], C2 = r3[2], E2 = r3[3];
        O2 = u2(O2, b2, C2, E2, i3, 7, a2[0]), E2 = u2(E2, O2, b2, C2, c3, 12, a2[1]), C2 = u2(C2, E2, O2, b2, f2, 17, a2[2]), b2 = u2(b2, C2, E2, O2, p2, 22, a2[3]), O2 = u2(O2, b2, C2, E2, g, 7, a2[4]), E2 = u2(E2, O2, b2, C2, m2, 12, a2[5]), C2 = u2(C2, E2, O2, b2, y2, 17, a2[6]), b2 = u2(b2, C2, E2, O2, _2, 22, a2[7]), O2 = u2(O2, b2, C2, E2, w2, 7, a2[8]), E2 = u2(E2, O2, b2, C2, k2, 12, a2[9]), C2 = u2(C2, E2, O2, b2, S2, 17, a2[10]), b2 = u2(b2, C2, E2, O2, v2, 22, a2[11]), O2 = u2(O2, b2, C2, E2, T2, 7, a2[12]), E2 = u2(E2, O2, b2, C2, A2, 12, a2[13]), C2 = u2(C2, E2, O2, b2, P2, 17, a2[14]), O2 = l2(O2, b2 = u2(b2, C2, E2, O2, I2, 22, a2[15]), C2, E2, c3, 5, a2[16]), E2 = l2(E2, O2, b2, C2, y2, 9, a2[17]), C2 = l2(C2, E2, O2, b2, v2, 14, a2[18]), b2 = l2(b2, C2, E2, O2, i3, 20, a2[19]), O2 = l2(O2, b2, C2, E2, m2, 5, a2[20]), E2 = l2(E2, O2, b2, C2, S2, 9, a2[21]), C2 = l2(C2, E2, O2, b2, I2, 14, a2[22]), b2 = l2(b2, C2, E2, O2, g, 20, a2[23]), O2 = l2(O2, b2, C2, E2, k2, 5, a2[24]), E2 = l2(E2, O2, b2, C2, P2, 9, a2[25]), C2 = l2(C2, E2, O2, b2, p2, 14, a2[26]), b2 = l2(b2, C2, E2, O2, w2, 20, a2[27]), O2 = l2(O2, b2, C2, E2, A2, 5, a2[28]), E2 = l2(E2, O2, b2, C2, f2, 9, a2[29]), C2 = l2(C2, E2, O2, b2, _2, 14, a2[30]), O2 = h2(O2, b2 = l2(b2, C2, E2, O2, T2, 20, a2[31]), C2, E2, m2, 4, a2[32]), E2 = h2(E2, O2, b2, C2, w2, 11, a2[33]), C2 = h2(C2, E2, O2, b2, v2, 16, a2[34]), b2 = h2(b2, C2, E2, O2, P2, 23, a2[35]), O2 = h2(O2, b2, C2, E2, c3, 4, a2[36]), E2 = h2(E2, O2, b2, C2, g, 11, a2[37]), C2 = h2(C2, E2, O2, b2, _2, 16, a2[38]), b2 = h2(b2, C2, E2, O2, S2, 23, a2[39]), O2 = h2(O2, b2, C2, E2, A2, 4, a2[40]), E2 = h2(E2, O2, b2, C2, i3, 11, a2[41]), C2 = h2(C2, E2, O2, b2, p2, 16, a2[42]), b2 = h2(b2, C2, E2, O2, y2, 23, a2[43]), O2 = h2(O2, b2, C2, E2, k2, 4, a2[44]), E2 = h2(E2, O2, b2, C2, T2, 11, a2[45]), C2 = h2(C2, E2, O2, b2, I2, 16, a2[46]), O2 = d2(O2, b2 = h2(b2, C2, E2, O2, f2, 23, a2[47]), C2, E2, i3, 6, a2[48]), E2 = d2(E2, O2, b2, C2, _2, 10, a2[49]), C2 = d2(C2, E2, O2, b2, P2, 15, a2[50]), b2 = d2(b2, C2, E2, O2, m2, 21, a2[51]), O2 = d2(O2, b2, C2, E2, T2, 6, a2[52]), E2 = d2(E2, O2, b2, C2, p2, 10, a2[53]), C2 = d2(C2, E2, O2, b2, S2, 15, a2[54]), b2 = d2(b2, C2, E2, O2, c3, 21, a2[55]), O2 = d2(O2, b2, C2, E2, w2, 6, a2[56]), E2 = d2(E2, O2, b2, C2, I2, 10, a2[57]), C2 = d2(C2, E2, O2, b2, y2, 15, a2[58]), b2 = d2(b2, C2, E2, O2, A2, 21, a2[59]), O2 = d2(O2, b2, C2, E2, g, 6, a2[60]), E2 = d2(E2, O2, b2, C2, v2, 10, a2[61]), C2 = d2(C2, E2, O2, b2, f2, 15, a2[62]), b2 = d2(b2, C2, E2, O2, k2, 21, a2[63]), r3[0] = r3[0] + O2 | 0, r3[1] = r3[1] + b2 | 0, r3[2] = r3[2] + C2 | 0, r3[3] = r3[3] + E2 | 0;
      }, _doFinalize: function() {
        var t4 = this._data, n3 = t4.words, s3 = 8 * this._nDataBytes, o3 = 8 * t4.sigBytes;
        n3[o3 >>> 5] |= 128 << 24 - o3 % 32;
        var r3 = e2.floor(s3 / 4294967296), i3 = s3;
        n3[15 + (o3 + 64 >>> 9 << 4)] = 16711935 & (r3 << 8 | r3 >>> 24) | 4278255360 & (r3 << 24 | r3 >>> 8), n3[14 + (o3 + 64 >>> 9 << 4)] = 16711935 & (i3 << 8 | i3 >>> 24) | 4278255360 & (i3 << 24 | i3 >>> 8), t4.sigBytes = 4 * (n3.length + 1), this._process();
        for (var a3 = this._hash, c3 = a3.words, u3 = 0; u3 < 4; u3++) {
          var l3 = c3[u3];
          c3[u3] = 16711935 & (l3 << 8 | l3 >>> 24) | 4278255360 & (l3 << 24 | l3 >>> 8);
        }
        return a3;
      }, clone: function() {
        var e3 = r2.clone.call(this);
        return e3._hash = this._hash.clone(), e3;
      } });
      function u2(e3, t4, n3, s3, o3, r3, i3) {
        var a3 = e3 + (t4 & n3 | ~t4 & s3) + o3 + i3;
        return (a3 << r3 | a3 >>> 32 - r3) + t4;
      }
      function l2(e3, t4, n3, s3, o3, r3, i3) {
        var a3 = e3 + (t4 & s3 | n3 & ~s3) + o3 + i3;
        return (a3 << r3 | a3 >>> 32 - r3) + t4;
      }
      function h2(e3, t4, n3, s3, o3, r3, i3) {
        var a3 = e3 + (t4 ^ n3 ^ s3) + o3 + i3;
        return (a3 << r3 | a3 >>> 32 - r3) + t4;
      }
      function d2(e3, t4, n3, s3, o3, r3, i3) {
        var a3 = e3 + (n3 ^ (t4 | ~s3)) + o3 + i3;
        return (a3 << r3 | a3 >>> 32 - r3) + t4;
      }
      t3.MD5 = r2._createHelper(c2), t3.HmacMD5 = r2._createHmacHelper(c2);
    }(Math), n2.MD5);
  }), n(function(e, t2) {
    var n2, o2, r2;
    e.exports = (o2 = (n2 = s).lib.Base, r2 = n2.enc.Utf8, void (n2.algo.HMAC = o2.extend({ init: function(e2, t3) {
      e2 = this._hasher = new e2.init(), typeof t3 == "string" && (t3 = r2.parse(t3));
      var n3 = e2.blockSize, s2 = 4 * n3;
      t3.sigBytes > s2 && (t3 = e2.finalize(t3)), t3.clamp();
      for (var o3 = this._oKey = t3.clone(), i2 = this._iKey = t3.clone(), a2 = o3.words, c2 = i2.words, u2 = 0; u2 < n3; u2++)
        a2[u2] ^= 1549556828, c2[u2] ^= 909522486;
      o3.sigBytes = i2.sigBytes = s2, this.reset();
    }, reset: function() {
      var e2 = this._hasher;
      e2.reset(), e2.update(this._iKey);
    }, update: function(e2) {
      return this._hasher.update(e2), this;
    }, finalize: function(e2) {
      var t3 = this._hasher, n3 = t3.finalize(e2);
      return t3.reset(), t3.finalize(this._oKey.clone().concat(n3));
    } })));
  }), n(function(e, t2) {
    e.exports = s.HmacMD5;
  }));
  const r = "FUNCTION", i = "OBJECT", a = "CLIENT_DB";
  function c(e) {
    return Object.prototype.toString.call(e).slice(8, -1).toLowerCase();
  }
  function u(e) {
    return c(e) === "object";
  }
  function l(e) {
    return e && typeof e == "string" ? JSON.parse(e) : e;
  }
  const h = true, d = "app", f = l({}.UNICLOUD_DEBUG), p = l("[]");
  let m = "";
  try {
    m = "__UNI__D8F7ACF";
  } catch (e) {
  }
  let y = {};
  function _(e, t2 = {}) {
    var n2, s2;
    return n2 = y, s2 = e, Object.prototype.hasOwnProperty.call(n2, s2) || (y[e] = t2), y[e];
  }
  const w = ["invoke", "success", "fail", "complete"], k = _("_globalUniCloudInterceptor");
  function S(e, t2) {
    k[e] || (k[e] = {}), u(t2) && Object.keys(t2).forEach((n2) => {
      w.indexOf(n2) > -1 && function(e2, t3, n3) {
        let s2 = k[e2][t3];
        s2 || (s2 = k[e2][t3] = []), s2.indexOf(n3) === -1 && typeof n3 == "function" && s2.push(n3);
      }(e, n2, t2[n2]);
    });
  }
  function v(e, t2) {
    k[e] || (k[e] = {}), u(t2) ? Object.keys(t2).forEach((n2) => {
      w.indexOf(n2) > -1 && function(e2, t3, n3) {
        const s2 = k[e2][t3];
        if (!s2)
          return;
        const o2 = s2.indexOf(n3);
        o2 > -1 && s2.splice(o2, 1);
      }(e, n2, t2[n2]);
    }) : delete k[e];
  }
  function T(e, t2) {
    return e && e.length !== 0 ? e.reduce((e2, n2) => e2.then(() => n2(t2)), Promise.resolve()) : Promise.resolve();
  }
  function A(e, t2) {
    return k[e] && k[e][t2] || [];
  }
  const P = _("_globalUniCloudListener"), I = "response", O = "clientdb", b = "cloudfunction", C = "cloudobject";
  function E(e) {
    return P[e] || (P[e] = []), P[e];
  }
  function U(e, t2) {
    const n2 = E(e);
    for (let e2 = 0; e2 < n2.length; e2++) {
      (0, n2[e2])(t2);
    }
  }
  function R(e, t2) {
    return t2 ? function(n2) {
      let s2 = false;
      if (t2 === "callFunction") {
        const e2 = n2 && n2.type || r;
        s2 = e2 !== r;
      }
      const o2 = t2 === "callFunction" && !s2;
      let i2;
      i2 = this.isReady ? Promise.resolve() : this.initUniCloud, n2 = n2 || {};
      const a2 = i2.then(() => s2 ? Promise.resolve() : T(A(t2, "invoke"), n2)).then(() => e.call(this, n2)).then((e2) => s2 ? Promise.resolve(e2) : T(A(t2, "success"), e2).then(() => T(A(t2, "complete"), e2)).then(() => (o2 && U(I, { type: b, content: e2 }), Promise.resolve(e2))), (e2) => s2 ? Promise.reject(e2) : T(A(t2, "fail"), e2).then(() => T(A(t2, "complete"), e2)).then(() => (U(I, { type: b, content: e2 }), Promise.reject(e2))));
      if (!(n2.success || n2.fail || n2.complete))
        return a2;
      a2.then((e2) => {
        n2.success && n2.success(e2), n2.complete && n2.complete(e2), o2 && U(I, { type: b, content: e2 });
      }, (e2) => {
        n2.fail && n2.fail(e2), n2.complete && n2.complete(e2), o2 && U(I, { type: b, content: e2 });
      });
    } : function(t3) {
      if (!((t3 = t3 || {}).success || t3.fail || t3.complete))
        return e.call(this, t3);
      e.call(this, t3).then((e2) => {
        t3.success && t3.success(e2), t3.complete && t3.complete(e2);
      }, (e2) => {
        t3.fail && t3.fail(e2), t3.complete && t3.complete(e2);
      });
    };
  }
  class x extends Error {
    constructor(e) {
      super(e.message), this.errMsg = e.message || "", this.errCode = this.code = e.code || "SYSTEM_ERROR", this.requestId = e.requestId;
    }
  }
  function D() {
    let e;
    try {
      if (uni.getLaunchOptionsSync) {
        if (uni.getLaunchOptionsSync.toString().indexOf("not yet implemented") > -1)
          return;
        const { scene: t2, channel: n2 } = uni.getLaunchOptionsSync();
        e = t2 || n2;
      }
    } catch (e2) {
    }
    return e;
  }
  let q;
  function L() {
    const e = uni.getLocale && uni.getLocale() || "en";
    if (q)
      return __spreadProps(__spreadValues({}, q), { locale: e, LOCALE: e });
    const t2 = uni.getSystemInfoSync(), { deviceId: n2, platform: s2, osName: o2, uniPlatform: r2, appId: i2 } = t2;
    return q = __spreadValues({ PLATFORM: r2 || d, OS: o2 || s2, APPID: i2 || m, DEVICEID: n2, channel: D() }, t2), __spreadProps(__spreadValues({}, q), { locale: e, LOCALE: e });
  }
  var F = { sign: function(e, t2) {
    let n2 = "";
    return Object.keys(e).sort().forEach(function(t3) {
      e[t3] && (n2 = n2 + "&" + t3 + "=" + e[t3]);
    }), n2 = n2.slice(1), o(n2, t2).toString();
  }, wrappedRequest: function(e, t2) {
    return new Promise((n2, s2) => {
      t2(Object.assign(e, { complete(e2) {
        e2 || (e2 = {});
        const t3 = e2.data && e2.data.header && e2.data.header["x-serverless-request-id"] || e2.header && e2.header["request-id"];
        if (!e2.statusCode || e2.statusCode >= 400)
          return s2(new x({ code: "SYS_ERR", message: e2.errMsg || "request:fail", requestId: t3 }));
        const o2 = e2.data;
        if (o2.error)
          return s2(new x({ code: o2.error.code, message: o2.error.message, requestId: t3 }));
        o2.result = o2.data, o2.requestId = t3, delete o2.data, n2(o2);
      } }));
    });
  } };
  var N = { request: (e) => uni.request(e), uploadFile: (e) => uni.uploadFile(e), setStorageSync: (e, t2) => uni.setStorageSync(e, t2), getStorageSync: (e) => uni.getStorageSync(e), removeStorageSync: (e) => uni.removeStorageSync(e), clearStorageSync: () => uni.clearStorageSync() }, M = { "uniCloud.init.paramRequired": "{param} required", "uniCloud.uploadFile.fileError": "filePath should be instance of File" };
  const { t: j } = initVueI18n({ "zh-Hans": { "uniCloud.init.paramRequired": "\u7F3A\u5C11\u53C2\u6570\uFF1A{param}", "uniCloud.uploadFile.fileError": "filePath\u5E94\u4E3AFile\u5BF9\u8C61" }, "zh-Hant": { "uniCloud.init.paramRequired": "\u7F3A\u5C11\u53C2\u6570\uFF1A{param}", "uniCloud.uploadFile.fileError": "filePath\u5E94\u4E3AFile\u5BF9\u8C61" }, en: M, fr: { "uniCloud.init.paramRequired": "{param} required", "uniCloud.uploadFile.fileError": "filePath should be instance of File" }, es: { "uniCloud.init.paramRequired": "{param} required", "uniCloud.uploadFile.fileError": "filePath should be instance of File" }, ja: M }, "zh-Hans");
  var $ = class {
    constructor(e) {
      ["spaceId", "clientSecret"].forEach((t2) => {
        if (!Object.prototype.hasOwnProperty.call(e, t2))
          throw new Error(j("uniCloud.init.paramRequired", { param: t2 }));
      }), this.config = Object.assign({}, { endpoint: "https://api.bspapp.com" }, e), this.config.provider = "aliyun", this.config.requestUrl = this.config.endpoint + "/client", this.config.envType = this.config.envType || "public", this.config.accessTokenKey = "access_token_" + this.config.spaceId, this.adapter = N, this._getAccessTokenPromise = null, this._getAccessTokenPromiseStatus = null;
    }
    get hasAccessToken() {
      return !!this.accessToken;
    }
    setAccessToken(e) {
      this.accessToken = e;
    }
    requestWrapped(e) {
      return F.wrappedRequest(e, this.adapter.request);
    }
    requestAuth(e) {
      return this.requestWrapped(e);
    }
    request(e, t2) {
      return Promise.resolve().then(() => this.hasAccessToken ? t2 ? this.requestWrapped(e) : this.requestWrapped(e).catch((t3) => new Promise((e2, n2) => {
        !t3 || t3.code !== "GATEWAY_INVALID_TOKEN" && t3.code !== "InvalidParameter.InvalidToken" ? n2(t3) : e2();
      }).then(() => this.getAccessToken()).then(() => {
        const t4 = this.rebuildRequest(e);
        return this.request(t4, true);
      })) : this.getAccessToken().then(() => {
        const t3 = this.rebuildRequest(e);
        return this.request(t3, true);
      }));
    }
    rebuildRequest(e) {
      const t2 = Object.assign({}, e);
      return t2.data.token = this.accessToken, t2.header["x-basement-token"] = this.accessToken, t2.header["x-serverless-sign"] = F.sign(t2.data, this.config.clientSecret), t2;
    }
    setupRequest(e, t2) {
      const n2 = Object.assign({}, e, { spaceId: this.config.spaceId, timestamp: Date.now() }), s2 = { "Content-Type": "application/json" };
      return t2 !== "auth" && (n2.token = this.accessToken, s2["x-basement-token"] = this.accessToken), s2["x-serverless-sign"] = F.sign(n2, this.config.clientSecret), { url: this.config.requestUrl, method: "POST", data: n2, dataType: "json", header: s2 };
    }
    getAccessToken() {
      if (this._getAccessTokenPromiseStatus === "pending")
        return this._getAccessTokenPromise;
      this._getAccessTokenPromiseStatus = "pending";
      return this._getAccessTokenPromise = this.requestAuth(this.setupRequest({ method: "serverless.auth.user.anonymousAuthorize", params: "{}" }, "auth")).then((e) => new Promise((t2, n2) => {
        e.result && e.result.accessToken ? (this.setAccessToken(e.result.accessToken), this._getAccessTokenPromiseStatus = "fulfilled", t2(this.accessToken)) : (this._getAccessTokenPromiseStatus = "rejected", n2(new x({ code: "AUTH_FAILED", message: "\u83B7\u53D6accessToken\u5931\u8D25" })));
      }), (e) => (this._getAccessTokenPromiseStatus = "rejected", Promise.reject(e))), this._getAccessTokenPromise;
    }
    authorize() {
      this.getAccessToken();
    }
    callFunction(e) {
      const t2 = { method: "serverless.function.runtime.invoke", params: JSON.stringify({ functionTarget: e.name, functionArgs: e.data || {} }) };
      return this.request(this.setupRequest(t2));
    }
    getOSSUploadOptionsFromPath(e) {
      const t2 = { method: "serverless.file.resource.generateProximalSign", params: JSON.stringify(e) };
      return this.request(this.setupRequest(t2));
    }
    uploadFileToOSS({ url: e, formData: t2, name: n2, filePath: s2, fileType: o2, onUploadProgress: r2 }) {
      return new Promise((i2, a2) => {
        const c2 = this.adapter.uploadFile({ url: e, formData: t2, name: n2, filePath: s2, fileType: o2, header: { "X-OSS-server-side-encrpytion": "AES256" }, success(e2) {
          e2 && e2.statusCode < 400 ? i2(e2) : a2(new x({ code: "UPLOAD_FAILED", message: "\u6587\u4EF6\u4E0A\u4F20\u5931\u8D25" }));
        }, fail(e2) {
          a2(new x({ code: e2.code || "UPLOAD_FAILED", message: e2.message || e2.errMsg || "\u6587\u4EF6\u4E0A\u4F20\u5931\u8D25" }));
        } });
        typeof r2 == "function" && c2 && typeof c2.onProgressUpdate == "function" && c2.onProgressUpdate((e2) => {
          r2({ loaded: e2.totalBytesSent, total: e2.totalBytesExpectedToSend });
        });
      });
    }
    reportOSSUpload(e) {
      const t2 = { method: "serverless.file.resource.report", params: JSON.stringify(e) };
      return this.request(this.setupRequest(t2));
    }
    uploadFile({ filePath: e, cloudPath: t2, fileType: n2 = "image", onUploadProgress: s2, config: o2 }) {
      if (c(t2) !== "string")
        throw new x({ code: "INVALID_PARAM", message: "cloudPath\u5FC5\u987B\u4E3A\u5B57\u7B26\u4E32\u7C7B\u578B" });
      if (!(t2 = t2.trim()))
        throw new x({ code: "CLOUDPATH_REQUIRED", message: "cloudPath\u4E0D\u53EF\u4E3A\u7A7A" });
      if (/:\/\//.test(t2))
        throw new x({ code: "INVALID_PARAM", message: "cloudPath\u4E0D\u5408\u6CD5" });
      const r2 = o2 && o2.envType || this.config.envType;
      let i2, a2;
      return this.getOSSUploadOptionsFromPath({ env: r2, filename: t2 }).then((t3) => {
        const o3 = t3.result;
        i2 = o3.id, a2 = "https://" + o3.cdnDomain + "/" + o3.ossPath;
        const r3 = { url: "https://" + o3.host, formData: { "Cache-Control": "max-age=2592000", "Content-Disposition": "attachment", OSSAccessKeyId: o3.accessKeyId, Signature: o3.signature, host: o3.host, id: i2, key: o3.ossPath, policy: o3.policy, success_action_status: 200 }, fileName: "file", name: "file", filePath: e, fileType: n2 };
        return this.uploadFileToOSS(Object.assign({}, r3, { onUploadProgress: s2 }));
      }).then(() => this.reportOSSUpload({ id: i2 })).then((t3) => new Promise((n3, s3) => {
        t3.success ? n3({ success: true, filePath: e, fileID: a2 }) : s3(new x({ code: "UPLOAD_FAILED", message: "\u6587\u4EF6\u4E0A\u4F20\u5931\u8D25" }));
      }));
    }
    deleteFile({ fileList: e }) {
      const t2 = { method: "serverless.file.resource.delete", params: JSON.stringify({ id: e[0] }) };
      return this.request(this.setupRequest(t2));
    }
    getTempFileURL({ fileList: e } = {}) {
      return new Promise((t2, n2) => {
        Array.isArray(e) && e.length !== 0 || n2(new x({ code: "INVALID_PARAM", message: "fileList\u7684\u5143\u7D20\u5FC5\u987B\u662F\u975E\u7A7A\u7684\u5B57\u7B26\u4E32" })), t2({ fileList: e.map((e2) => ({ fileID: e2, tempFileURL: e2 })) });
      });
    }
  };
  var B = { init(e) {
    const t2 = new $(e), n2 = { signInAnonymously: function() {
      return t2.authorize();
    }, getLoginState: function() {
      return Promise.resolve(false);
    } };
    return t2.auth = function() {
      return n2;
    }, t2.customAuth = t2.auth, t2;
  } };
  const K = typeof location != "undefined" && location.protocol === "http:" ? "http:" : "https:";
  var H;
  !function(e) {
    e.local = "local", e.none = "none", e.session = "session";
  }(H || (H = {}));
  var W = function() {
  };
  const z = () => {
    let e;
    if (!Promise) {
      e = () => {
      }, e.promise = {};
      const t3 = () => {
        throw new x({ message: 'Your Node runtime does support ES6 Promises. Set "global.Promise" to your preferred implementation of promises.' });
      };
      return Object.defineProperty(e.promise, "then", { get: t3 }), Object.defineProperty(e.promise, "catch", { get: t3 }), e;
    }
    const t2 = new Promise((t3, n2) => {
      e = (e2, s2) => e2 ? n2(e2) : t3(s2);
    });
    return e.promise = t2, e;
  };
  function J(e) {
    return e === void 0;
  }
  function Y(e) {
    return Object.prototype.toString.call(e) === "[object Null]";
  }
  var V;
  function X(e) {
    const t2 = (n2 = e, Object.prototype.toString.call(n2) === "[object Array]" ? e : [e]);
    var n2;
    for (const e2 of t2) {
      const { isMatch: t3, genAdapter: n3, runtime: s2 } = e2;
      if (t3())
        return { adapter: n3(), runtime: s2 };
    }
  }
  !function(e) {
    e.WEB = "web", e.WX_MP = "wx_mp";
  }(V || (V = {}));
  const G = { adapter: null, runtime: void 0 }, Q = ["anonymousUuidKey"];
  class Z extends W {
    constructor() {
      super(), G.adapter.root.tcbObject || (G.adapter.root.tcbObject = {});
    }
    setItem(e, t2) {
      G.adapter.root.tcbObject[e] = t2;
    }
    getItem(e) {
      return G.adapter.root.tcbObject[e];
    }
    removeItem(e) {
      delete G.adapter.root.tcbObject[e];
    }
    clear() {
      delete G.adapter.root.tcbObject;
    }
  }
  function ee(e, t2) {
    switch (e) {
      case "local":
        return t2.localStorage || new Z();
      case "none":
        return new Z();
      default:
        return t2.sessionStorage || new Z();
    }
  }
  class te {
    constructor(e) {
      if (!this._storage) {
        this._persistence = G.adapter.primaryStorage || e.persistence, this._storage = ee(this._persistence, G.adapter);
        const t2 = `access_token_${e.env}`, n2 = `access_token_expire_${e.env}`, s2 = `refresh_token_${e.env}`, o2 = `anonymous_uuid_${e.env}`, r2 = `login_type_${e.env}`, i2 = `user_info_${e.env}`;
        this.keys = { accessTokenKey: t2, accessTokenExpireKey: n2, refreshTokenKey: s2, anonymousUuidKey: o2, loginTypeKey: r2, userInfoKey: i2 };
      }
    }
    updatePersistence(e) {
      if (e === this._persistence)
        return;
      const t2 = this._persistence === "local";
      this._persistence = e;
      const n2 = ee(e, G.adapter);
      for (const e2 in this.keys) {
        const s2 = this.keys[e2];
        if (t2 && Q.includes(e2))
          continue;
        const o2 = this._storage.getItem(s2);
        J(o2) || Y(o2) || (n2.setItem(s2, o2), this._storage.removeItem(s2));
      }
      this._storage = n2;
    }
    setStore(e, t2, n2) {
      if (!this._storage)
        return;
      const s2 = { version: n2 || "localCachev1", content: t2 }, o2 = JSON.stringify(s2);
      try {
        this._storage.setItem(e, o2);
      } catch (e2) {
        throw e2;
      }
    }
    getStore(e, t2) {
      try {
        if (!this._storage)
          return;
      } catch (e2) {
        return "";
      }
      t2 = t2 || "localCachev1";
      const n2 = this._storage.getItem(e);
      if (!n2)
        return "";
      if (n2.indexOf(t2) >= 0) {
        return JSON.parse(n2).content;
      }
      return "";
    }
    removeStore(e) {
      this._storage.removeItem(e);
    }
  }
  const ne = {}, se = {};
  function oe(e) {
    return ne[e];
  }
  class re {
    constructor(e, t2) {
      this.data = t2 || null, this.name = e;
    }
  }
  class ie extends re {
    constructor(e, t2) {
      super("error", { error: e, data: t2 }), this.error = e;
    }
  }
  const ae = new class {
    constructor() {
      this._listeners = {};
    }
    on(e, t2) {
      return function(e2, t3, n2) {
        n2[e2] = n2[e2] || [], n2[e2].push(t3);
      }(e, t2, this._listeners), this;
    }
    off(e, t2) {
      return function(e2, t3, n2) {
        if (n2 && n2[e2]) {
          const s2 = n2[e2].indexOf(t3);
          s2 !== -1 && n2[e2].splice(s2, 1);
        }
      }(e, t2, this._listeners), this;
    }
    fire(e, t2) {
      if (e instanceof ie)
        return console.error(e.error), this;
      const n2 = typeof e == "string" ? new re(e, t2 || {}) : e;
      const s2 = n2.name;
      if (this._listens(s2)) {
        n2.target = this;
        const e2 = this._listeners[s2] ? [...this._listeners[s2]] : [];
        for (const t3 of e2)
          t3.call(this, n2);
      }
      return this;
    }
    _listens(e) {
      return this._listeners[e] && this._listeners[e].length > 0;
    }
  }();
  function ce(e, t2) {
    ae.on(e, t2);
  }
  function ue(e, t2 = {}) {
    ae.fire(e, t2);
  }
  function le(e, t2) {
    ae.off(e, t2);
  }
  const he = "loginStateChanged", de = "loginStateExpire", fe = "loginTypeChanged", pe = "anonymousConverted", ge = "refreshAccessToken";
  var me;
  !function(e) {
    e.ANONYMOUS = "ANONYMOUS", e.WECHAT = "WECHAT", e.WECHAT_PUBLIC = "WECHAT-PUBLIC", e.WECHAT_OPEN = "WECHAT-OPEN", e.CUSTOM = "CUSTOM", e.EMAIL = "EMAIL", e.USERNAME = "USERNAME", e.NULL = "NULL";
  }(me || (me = {}));
  const ye = ["auth.getJwt", "auth.logout", "auth.signInWithTicket", "auth.signInAnonymously", "auth.signIn", "auth.fetchAccessTokenWithRefreshToken", "auth.signUpWithEmailAndPassword", "auth.activateEndUserMail", "auth.sendPasswordResetEmail", "auth.resetPasswordWithToken", "auth.isUsernameRegistered"], _e = { "X-SDK-Version": "1.3.5" };
  function we(e, t2, n2) {
    const s2 = e[t2];
    e[t2] = function(t3) {
      const o2 = {}, r2 = {};
      n2.forEach((n3) => {
        const { data: s3, headers: i3 } = n3.call(e, t3);
        Object.assign(o2, s3), Object.assign(r2, i3);
      });
      const i2 = t3.data;
      return i2 && (() => {
        var e2;
        if (e2 = i2, Object.prototype.toString.call(e2) !== "[object FormData]")
          t3.data = __spreadValues(__spreadValues({}, i2), o2);
        else
          for (const e3 in o2)
            i2.append(e3, o2[e3]);
      })(), t3.headers = __spreadValues(__spreadValues({}, t3.headers || {}), r2), s2.call(e, t3);
    };
  }
  function ke() {
    const e = Math.random().toString(16).slice(2);
    return { data: { seqId: e }, headers: __spreadProps(__spreadValues({}, _e), { "x-seqid": e }) };
  }
  class Se {
    constructor(e = {}) {
      var t2;
      this.config = e, this._reqClass = new G.adapter.reqClass({ timeout: this.config.timeout, timeoutMsg: `\u8BF7\u6C42\u5728${this.config.timeout / 1e3}s\u5185\u672A\u5B8C\u6210\uFF0C\u5DF2\u4E2D\u65AD`, restrictedMethods: ["post"] }), this._cache = oe(this.config.env), this._localCache = (t2 = this.config.env, se[t2]), we(this._reqClass, "post", [ke]), we(this._reqClass, "upload", [ke]), we(this._reqClass, "download", [ke]);
    }
    async post(e) {
      return await this._reqClass.post(e);
    }
    async upload(e) {
      return await this._reqClass.upload(e);
    }
    async download(e) {
      return await this._reqClass.download(e);
    }
    async refreshAccessToken() {
      let e, t2;
      this._refreshAccessTokenPromise || (this._refreshAccessTokenPromise = this._refreshAccessToken());
      try {
        e = await this._refreshAccessTokenPromise;
      } catch (e2) {
        t2 = e2;
      }
      if (this._refreshAccessTokenPromise = null, this._shouldRefreshAccessTokenHook = null, t2)
        throw t2;
      return e;
    }
    async _refreshAccessToken() {
      const { accessTokenKey: e, accessTokenExpireKey: t2, refreshTokenKey: n2, loginTypeKey: s2, anonymousUuidKey: o2 } = this._cache.keys;
      this._cache.removeStore(e), this._cache.removeStore(t2);
      let r2 = this._cache.getStore(n2);
      if (!r2)
        throw new x({ message: "\u672A\u767B\u5F55CloudBase" });
      const i2 = { refresh_token: r2 }, a2 = await this.request("auth.fetchAccessTokenWithRefreshToken", i2);
      if (a2.data.code) {
        const { code: e2 } = a2.data;
        if (e2 === "SIGN_PARAM_INVALID" || e2 === "REFRESH_TOKEN_EXPIRED" || e2 === "INVALID_REFRESH_TOKEN") {
          if (this._cache.getStore(s2) === me.ANONYMOUS && e2 === "INVALID_REFRESH_TOKEN") {
            const e3 = this._cache.getStore(o2), t3 = this._cache.getStore(n2), s3 = await this.send("auth.signInAnonymously", { anonymous_uuid: e3, refresh_token: t3 });
            return this.setRefreshToken(s3.refresh_token), this._refreshAccessToken();
          }
          ue(de), this._cache.removeStore(n2);
        }
        throw new x({ code: a2.data.code, message: `\u5237\u65B0access token\u5931\u8D25\uFF1A${a2.data.code}` });
      }
      if (a2.data.access_token)
        return ue(ge), this._cache.setStore(e, a2.data.access_token), this._cache.setStore(t2, a2.data.access_token_expire + Date.now()), { accessToken: a2.data.access_token, accessTokenExpire: a2.data.access_token_expire };
      a2.data.refresh_token && (this._cache.removeStore(n2), this._cache.setStore(n2, a2.data.refresh_token), this._refreshAccessToken());
    }
    async getAccessToken() {
      const { accessTokenKey: e, accessTokenExpireKey: t2, refreshTokenKey: n2 } = this._cache.keys;
      if (!this._cache.getStore(n2))
        throw new x({ message: "refresh token\u4E0D\u5B58\u5728\uFF0C\u767B\u5F55\u72B6\u6001\u5F02\u5E38" });
      let s2 = this._cache.getStore(e), o2 = this._cache.getStore(t2), r2 = true;
      return this._shouldRefreshAccessTokenHook && !await this._shouldRefreshAccessTokenHook(s2, o2) && (r2 = false), (!s2 || !o2 || o2 < Date.now()) && r2 ? this.refreshAccessToken() : { accessToken: s2, accessTokenExpire: o2 };
    }
    async request(e, t2, n2) {
      const s2 = `x-tcb-trace_${this.config.env}`;
      let o2 = "application/x-www-form-urlencoded";
      const r2 = __spreadValues({ action: e, env: this.config.env, dataVersion: "2019-08-16" }, t2);
      if (ye.indexOf(e) === -1) {
        const { refreshTokenKey: e2 } = this._cache.keys;
        this._cache.getStore(e2) && (r2.access_token = (await this.getAccessToken()).accessToken);
      }
      let i2;
      if (e === "storage.uploadFile") {
        i2 = new FormData();
        for (let e2 in i2)
          i2.hasOwnProperty(e2) && i2[e2] !== void 0 && i2.append(e2, r2[e2]);
        o2 = "multipart/form-data";
      } else {
        o2 = "application/json", i2 = {};
        for (let e2 in r2)
          r2[e2] !== void 0 && (i2[e2] = r2[e2]);
      }
      let a2 = { headers: { "content-type": o2 } };
      n2 && n2.onUploadProgress && (a2.onUploadProgress = n2.onUploadProgress);
      const c2 = this._localCache.getStore(s2);
      c2 && (a2.headers["X-TCB-Trace"] = c2);
      const { parse: u2, inQuery: l2, search: h2 } = t2;
      let d2 = { env: this.config.env };
      u2 && (d2.parse = true), l2 && (d2 = __spreadValues(__spreadValues({}, l2), d2));
      let f2 = function(e2, t3, n3 = {}) {
        const s3 = /\?/.test(t3);
        let o3 = "";
        for (let e3 in n3)
          o3 === "" ? !s3 && (t3 += "?") : o3 += "&", o3 += `${e3}=${encodeURIComponent(n3[e3])}`;
        return /^http(s)?\:\/\//.test(t3 += o3) ? t3 : `${e2}${t3}`;
      }(K, "//tcb-api.tencentcloudapi.com/web", d2);
      h2 && (f2 += h2);
      const p2 = await this.post(__spreadValues({ url: f2, data: i2 }, a2)), g = p2.header && p2.header["x-tcb-trace"];
      if (g && this._localCache.setStore(s2, g), Number(p2.status) !== 200 && Number(p2.statusCode) !== 200 || !p2.data)
        throw new x({ code: "NETWORK_ERROR", message: "network request error" });
      return p2;
    }
    async send(e, t2 = {}) {
      const n2 = await this.request(e, t2, { onUploadProgress: t2.onUploadProgress });
      if (n2.data.code === "ACCESS_TOKEN_EXPIRED" && ye.indexOf(e) === -1) {
        await this.refreshAccessToken();
        const n3 = await this.request(e, t2, { onUploadProgress: t2.onUploadProgress });
        if (n3.data.code)
          throw new x({ code: n3.data.code, message: n3.data.message });
        return n3.data;
      }
      if (n2.data.code)
        throw new x({ code: n2.data.code, message: n2.data.message });
      return n2.data;
    }
    setRefreshToken(e) {
      const { accessTokenKey: t2, accessTokenExpireKey: n2, refreshTokenKey: s2 } = this._cache.keys;
      this._cache.removeStore(t2), this._cache.removeStore(n2), this._cache.setStore(s2, e);
    }
  }
  const ve = {};
  function Te(e) {
    return ve[e];
  }
  class Ae {
    constructor(e) {
      this.config = e, this._cache = oe(e.env), this._request = Te(e.env);
    }
    setRefreshToken(e) {
      const { accessTokenKey: t2, accessTokenExpireKey: n2, refreshTokenKey: s2 } = this._cache.keys;
      this._cache.removeStore(t2), this._cache.removeStore(n2), this._cache.setStore(s2, e);
    }
    setAccessToken(e, t2) {
      const { accessTokenKey: n2, accessTokenExpireKey: s2 } = this._cache.keys;
      this._cache.setStore(n2, e), this._cache.setStore(s2, t2);
    }
    async refreshUserInfo() {
      const { data: e } = await this._request.send("auth.getUserInfo", {});
      return this.setLocalUserInfo(e), e;
    }
    setLocalUserInfo(e) {
      const { userInfoKey: t2 } = this._cache.keys;
      this._cache.setStore(t2, e);
    }
  }
  class Pe {
    constructor(e) {
      if (!e)
        throw new x({ code: "PARAM_ERROR", message: "envId is not defined" });
      this._envId = e, this._cache = oe(this._envId), this._request = Te(this._envId), this.setUserInfo();
    }
    linkWithTicket(e) {
      if (typeof e != "string")
        throw new x({ code: "PARAM_ERROR", message: "ticket must be string" });
      return this._request.send("auth.linkWithTicket", { ticket: e });
    }
    linkWithRedirect(e) {
      e.signInWithRedirect();
    }
    updatePassword(e, t2) {
      return this._request.send("auth.updatePassword", { oldPassword: t2, newPassword: e });
    }
    updateEmail(e) {
      return this._request.send("auth.updateEmail", { newEmail: e });
    }
    updateUsername(e) {
      if (typeof e != "string")
        throw new x({ code: "PARAM_ERROR", message: "username must be a string" });
      return this._request.send("auth.updateUsername", { username: e });
    }
    async getLinkedUidList() {
      const { data: e } = await this._request.send("auth.getLinkedUidList", {});
      let t2 = false;
      const { users: n2 } = e;
      return n2.forEach((e2) => {
        e2.wxOpenId && e2.wxPublicId && (t2 = true);
      }), { users: n2, hasPrimaryUid: t2 };
    }
    setPrimaryUid(e) {
      return this._request.send("auth.setPrimaryUid", { uid: e });
    }
    unlink(e) {
      return this._request.send("auth.unlink", { platform: e });
    }
    async update(e) {
      const { nickName: t2, gender: n2, avatarUrl: s2, province: o2, country: r2, city: i2 } = e, { data: a2 } = await this._request.send("auth.updateUserInfo", { nickName: t2, gender: n2, avatarUrl: s2, province: o2, country: r2, city: i2 });
      this.setLocalUserInfo(a2);
    }
    async refresh() {
      const { data: e } = await this._request.send("auth.getUserInfo", {});
      return this.setLocalUserInfo(e), e;
    }
    setUserInfo() {
      const { userInfoKey: e } = this._cache.keys, t2 = this._cache.getStore(e);
      ["uid", "loginType", "openid", "wxOpenId", "wxPublicId", "unionId", "qqMiniOpenId", "email", "hasPassword", "customUserId", "nickName", "gender", "avatarUrl"].forEach((e2) => {
        this[e2] = t2[e2];
      }), this.location = { country: t2.country, province: t2.province, city: t2.city };
    }
    setLocalUserInfo(e) {
      const { userInfoKey: t2 } = this._cache.keys;
      this._cache.setStore(t2, e), this.setUserInfo();
    }
  }
  class Ie {
    constructor(e) {
      if (!e)
        throw new x({ code: "PARAM_ERROR", message: "envId is not defined" });
      this._cache = oe(e);
      const { refreshTokenKey: t2, accessTokenKey: n2, accessTokenExpireKey: s2 } = this._cache.keys, o2 = this._cache.getStore(t2), r2 = this._cache.getStore(n2), i2 = this._cache.getStore(s2);
      this.credential = { refreshToken: o2, accessToken: r2, accessTokenExpire: i2 }, this.user = new Pe(e);
    }
    get isAnonymousAuth() {
      return this.loginType === me.ANONYMOUS;
    }
    get isCustomAuth() {
      return this.loginType === me.CUSTOM;
    }
    get isWeixinAuth() {
      return this.loginType === me.WECHAT || this.loginType === me.WECHAT_OPEN || this.loginType === me.WECHAT_PUBLIC;
    }
    get loginType() {
      return this._cache.getStore(this._cache.keys.loginTypeKey);
    }
  }
  class Oe extends Ae {
    async signIn() {
      this._cache.updatePersistence("local");
      const { anonymousUuidKey: e, refreshTokenKey: t2 } = this._cache.keys, n2 = this._cache.getStore(e) || void 0, s2 = this._cache.getStore(t2) || void 0, o2 = await this._request.send("auth.signInAnonymously", { anonymous_uuid: n2, refresh_token: s2 });
      if (o2.uuid && o2.refresh_token) {
        this._setAnonymousUUID(o2.uuid), this.setRefreshToken(o2.refresh_token), await this._request.refreshAccessToken(), ue(he), ue(fe, { env: this.config.env, loginType: me.ANONYMOUS, persistence: "local" });
        const e2 = new Ie(this.config.env);
        return await e2.user.refresh(), e2;
      }
      throw new x({ message: "\u533F\u540D\u767B\u5F55\u5931\u8D25" });
    }
    async linkAndRetrieveDataWithTicket(e) {
      const { anonymousUuidKey: t2, refreshTokenKey: n2 } = this._cache.keys, s2 = this._cache.getStore(t2), o2 = this._cache.getStore(n2), r2 = await this._request.send("auth.linkAndRetrieveDataWithTicket", { anonymous_uuid: s2, refresh_token: o2, ticket: e });
      if (r2.refresh_token)
        return this._clearAnonymousUUID(), this.setRefreshToken(r2.refresh_token), await this._request.refreshAccessToken(), ue(pe, { env: this.config.env }), ue(fe, { loginType: me.CUSTOM, persistence: "local" }), { credential: { refreshToken: r2.refresh_token } };
      throw new x({ message: "\u533F\u540D\u8F6C\u5316\u5931\u8D25" });
    }
    _setAnonymousUUID(e) {
      const { anonymousUuidKey: t2, loginTypeKey: n2 } = this._cache.keys;
      this._cache.removeStore(t2), this._cache.setStore(t2, e), this._cache.setStore(n2, me.ANONYMOUS);
    }
    _clearAnonymousUUID() {
      this._cache.removeStore(this._cache.keys.anonymousUuidKey);
    }
  }
  class be extends Ae {
    async signIn(e) {
      if (typeof e != "string")
        throw new x({ param: "PARAM_ERROR", message: "ticket must be a string" });
      const { refreshTokenKey: t2 } = this._cache.keys, n2 = await this._request.send("auth.signInWithTicket", { ticket: e, refresh_token: this._cache.getStore(t2) || "" });
      if (n2.refresh_token)
        return this.setRefreshToken(n2.refresh_token), await this._request.refreshAccessToken(), ue(he), ue(fe, { env: this.config.env, loginType: me.CUSTOM, persistence: this.config.persistence }), await this.refreshUserInfo(), new Ie(this.config.env);
      throw new x({ message: "\u81EA\u5B9A\u4E49\u767B\u5F55\u5931\u8D25" });
    }
  }
  class Ce extends Ae {
    async signIn(e, t2) {
      if (typeof e != "string")
        throw new x({ code: "PARAM_ERROR", message: "email must be a string" });
      const { refreshTokenKey: n2 } = this._cache.keys, s2 = await this._request.send("auth.signIn", { loginType: "EMAIL", email: e, password: t2, refresh_token: this._cache.getStore(n2) || "" }), { refresh_token: o2, access_token: r2, access_token_expire: i2 } = s2;
      if (o2)
        return this.setRefreshToken(o2), r2 && i2 ? this.setAccessToken(r2, i2) : await this._request.refreshAccessToken(), await this.refreshUserInfo(), ue(he), ue(fe, { env: this.config.env, loginType: me.EMAIL, persistence: this.config.persistence }), new Ie(this.config.env);
      throw s2.code ? new x({ code: s2.code, message: `\u90AE\u7BB1\u767B\u5F55\u5931\u8D25: ${s2.message}` }) : new x({ message: "\u90AE\u7BB1\u767B\u5F55\u5931\u8D25" });
    }
    async activate(e) {
      return this._request.send("auth.activateEndUserMail", { token: e });
    }
    async resetPasswordWithToken(e, t2) {
      return this._request.send("auth.resetPasswordWithToken", { token: e, newPassword: t2 });
    }
  }
  class Ee extends Ae {
    async signIn(e, t2) {
      if (typeof e != "string")
        throw new x({ code: "PARAM_ERROR", message: "username must be a string" });
      typeof t2 != "string" && (t2 = "", console.warn("password is empty"));
      const { refreshTokenKey: n2 } = this._cache.keys, s2 = await this._request.send("auth.signIn", { loginType: me.USERNAME, username: e, password: t2, refresh_token: this._cache.getStore(n2) || "" }), { refresh_token: o2, access_token_expire: r2, access_token: i2 } = s2;
      if (o2)
        return this.setRefreshToken(o2), i2 && r2 ? this.setAccessToken(i2, r2) : await this._request.refreshAccessToken(), await this.refreshUserInfo(), ue(he), ue(fe, { env: this.config.env, loginType: me.USERNAME, persistence: this.config.persistence }), new Ie(this.config.env);
      throw s2.code ? new x({ code: s2.code, message: `\u7528\u6237\u540D\u5BC6\u7801\u767B\u5F55\u5931\u8D25: ${s2.message}` }) : new x({ message: "\u7528\u6237\u540D\u5BC6\u7801\u767B\u5F55\u5931\u8D25" });
    }
  }
  class Ue {
    constructor(e) {
      this.config = e, this._cache = oe(e.env), this._request = Te(e.env), this._onAnonymousConverted = this._onAnonymousConverted.bind(this), this._onLoginTypeChanged = this._onLoginTypeChanged.bind(this), ce(fe, this._onLoginTypeChanged);
    }
    get currentUser() {
      const e = this.hasLoginState();
      return e && e.user || null;
    }
    get loginType() {
      return this._cache.getStore(this._cache.keys.loginTypeKey);
    }
    anonymousAuthProvider() {
      return new Oe(this.config);
    }
    customAuthProvider() {
      return new be(this.config);
    }
    emailAuthProvider() {
      return new Ce(this.config);
    }
    usernameAuthProvider() {
      return new Ee(this.config);
    }
    async signInAnonymously() {
      return new Oe(this.config).signIn();
    }
    async signInWithEmailAndPassword(e, t2) {
      return new Ce(this.config).signIn(e, t2);
    }
    signInWithUsernameAndPassword(e, t2) {
      return new Ee(this.config).signIn(e, t2);
    }
    async linkAndRetrieveDataWithTicket(e) {
      this._anonymousAuthProvider || (this._anonymousAuthProvider = new Oe(this.config)), ce(pe, this._onAnonymousConverted);
      return await this._anonymousAuthProvider.linkAndRetrieveDataWithTicket(e);
    }
    async signOut() {
      if (this.loginType === me.ANONYMOUS)
        throw new x({ message: "\u533F\u540D\u7528\u6237\u4E0D\u652F\u6301\u767B\u51FA\u64CD\u4F5C" });
      const { refreshTokenKey: e, accessTokenKey: t2, accessTokenExpireKey: n2 } = this._cache.keys, s2 = this._cache.getStore(e);
      if (!s2)
        return;
      const o2 = await this._request.send("auth.logout", { refresh_token: s2 });
      return this._cache.removeStore(e), this._cache.removeStore(t2), this._cache.removeStore(n2), ue(he), ue(fe, { env: this.config.env, loginType: me.NULL, persistence: this.config.persistence }), o2;
    }
    async signUpWithEmailAndPassword(e, t2) {
      return this._request.send("auth.signUpWithEmailAndPassword", { email: e, password: t2 });
    }
    async sendPasswordResetEmail(e) {
      return this._request.send("auth.sendPasswordResetEmail", { email: e });
    }
    onLoginStateChanged(e) {
      ce(he, () => {
        const t3 = this.hasLoginState();
        e.call(this, t3);
      });
      const t2 = this.hasLoginState();
      e.call(this, t2);
    }
    onLoginStateExpired(e) {
      ce(de, e.bind(this));
    }
    onAccessTokenRefreshed(e) {
      ce(ge, e.bind(this));
    }
    onAnonymousConverted(e) {
      ce(pe, e.bind(this));
    }
    onLoginTypeChanged(e) {
      ce(fe, () => {
        const t2 = this.hasLoginState();
        e.call(this, t2);
      });
    }
    async getAccessToken() {
      return { accessToken: (await this._request.getAccessToken()).accessToken, env: this.config.env };
    }
    hasLoginState() {
      const { refreshTokenKey: e } = this._cache.keys;
      return this._cache.getStore(e) ? new Ie(this.config.env) : null;
    }
    async isUsernameRegistered(e) {
      if (typeof e != "string")
        throw new x({ code: "PARAM_ERROR", message: "username must be a string" });
      const { data: t2 } = await this._request.send("auth.isUsernameRegistered", { username: e });
      return t2 && t2.isRegistered;
    }
    getLoginState() {
      return Promise.resolve(this.hasLoginState());
    }
    async signInWithTicket(e) {
      return new be(this.config).signIn(e);
    }
    shouldRefreshAccessToken(e) {
      this._request._shouldRefreshAccessTokenHook = e.bind(this);
    }
    getUserInfo() {
      return this._request.send("auth.getUserInfo", {}).then((e) => e.code ? e : __spreadProps(__spreadValues({}, e.data), { requestId: e.seqId }));
    }
    getAuthHeader() {
      const { refreshTokenKey: e, accessTokenKey: t2 } = this._cache.keys, n2 = this._cache.getStore(e);
      return { "x-cloudbase-credentials": this._cache.getStore(t2) + "/@@/" + n2 };
    }
    _onAnonymousConverted(e) {
      const { env: t2 } = e.data;
      t2 === this.config.env && this._cache.updatePersistence(this.config.persistence);
    }
    _onLoginTypeChanged(e) {
      const { loginType: t2, persistence: n2, env: s2 } = e.data;
      s2 === this.config.env && (this._cache.updatePersistence(n2), this._cache.setStore(this._cache.keys.loginTypeKey, t2));
    }
  }
  const Re = function(e, t2) {
    t2 = t2 || z();
    const n2 = Te(this.config.env), { cloudPath: s2, filePath: o2, onUploadProgress: r2, fileType: i2 = "image" } = e;
    return n2.send("storage.getUploadMetadata", { path: s2 }).then((e2) => {
      const { data: { url: a2, authorization: c2, token: u2, fileId: l2, cosFileId: h2 }, requestId: d2 } = e2, f2 = { key: s2, signature: c2, "x-cos-meta-fileid": h2, success_action_status: "201", "x-cos-security-token": u2 };
      n2.upload({ url: a2, data: f2, file: o2, name: s2, fileType: i2, onUploadProgress: r2 }).then((e3) => {
        e3.statusCode === 201 ? t2(null, { fileID: l2, requestId: d2 }) : t2(new x({ code: "STORAGE_REQUEST_FAIL", message: `STORAGE_REQUEST_FAIL: ${e3.data}` }));
      }).catch((e3) => {
        t2(e3);
      });
    }).catch((e2) => {
      t2(e2);
    }), t2.promise;
  }, xe = function(e, t2) {
    t2 = t2 || z();
    const n2 = Te(this.config.env), { cloudPath: s2 } = e;
    return n2.send("storage.getUploadMetadata", { path: s2 }).then((e2) => {
      t2(null, e2);
    }).catch((e2) => {
      t2(e2);
    }), t2.promise;
  }, De = function({ fileList: e }, t2) {
    if (t2 = t2 || z(), !e || !Array.isArray(e))
      return { code: "INVALID_PARAM", message: "fileList\u5FC5\u987B\u662F\u975E\u7A7A\u7684\u6570\u7EC4" };
    for (let t3 of e)
      if (!t3 || typeof t3 != "string")
        return { code: "INVALID_PARAM", message: "fileList\u7684\u5143\u7D20\u5FC5\u987B\u662F\u975E\u7A7A\u7684\u5B57\u7B26\u4E32" };
    const n2 = { fileid_list: e };
    return Te(this.config.env).send("storage.batchDeleteFile", n2).then((e2) => {
      e2.code ? t2(null, e2) : t2(null, { fileList: e2.data.delete_list, requestId: e2.requestId });
    }).catch((e2) => {
      t2(e2);
    }), t2.promise;
  }, qe = function({ fileList: e }, t2) {
    t2 = t2 || z(), e && Array.isArray(e) || t2(null, { code: "INVALID_PARAM", message: "fileList\u5FC5\u987B\u662F\u975E\u7A7A\u7684\u6570\u7EC4" });
    let n2 = [];
    for (let s3 of e)
      typeof s3 == "object" ? (s3.hasOwnProperty("fileID") && s3.hasOwnProperty("maxAge") || t2(null, { code: "INVALID_PARAM", message: "fileList\u7684\u5143\u7D20\u5FC5\u987B\u662F\u5305\u542BfileID\u548CmaxAge\u7684\u5BF9\u8C61" }), n2.push({ fileid: s3.fileID, max_age: s3.maxAge })) : typeof s3 == "string" ? n2.push({ fileid: s3 }) : t2(null, { code: "INVALID_PARAM", message: "fileList\u7684\u5143\u7D20\u5FC5\u987B\u662F\u5B57\u7B26\u4E32" });
    const s2 = { file_list: n2 };
    return Te(this.config.env).send("storage.batchGetDownloadUrl", s2).then((e2) => {
      e2.code ? t2(null, e2) : t2(null, { fileList: e2.data.download_list, requestId: e2.requestId });
    }).catch((e2) => {
      t2(e2);
    }), t2.promise;
  }, Le = async function({ fileID: e }, t2) {
    const n2 = (await qe.call(this, { fileList: [{ fileID: e, maxAge: 600 }] })).fileList[0];
    if (n2.code !== "SUCCESS")
      return t2 ? t2(n2) : new Promise((e2) => {
        e2(n2);
      });
    const s2 = Te(this.config.env);
    let o2 = n2.download_url;
    if (o2 = encodeURI(o2), !t2)
      return s2.download({ url: o2 });
    t2(await s2.download({ url: o2 }));
  }, Fe = function({ name: e, data: t2, query: n2, parse: s2, search: o2 }, r2) {
    const i2 = r2 || z();
    let a2;
    try {
      a2 = t2 ? JSON.stringify(t2) : "";
    } catch (e2) {
      return Promise.reject(e2);
    }
    if (!e)
      return Promise.reject(new x({ code: "PARAM_ERROR", message: "\u51FD\u6570\u540D\u4E0D\u80FD\u4E3A\u7A7A" }));
    const c2 = { inQuery: n2, parse: s2, search: o2, function_name: e, request_data: a2 };
    return Te(this.config.env).send("functions.invokeFunction", c2).then((e2) => {
      if (e2.code)
        i2(null, e2);
      else {
        let t3 = e2.data.response_data;
        if (s2)
          i2(null, { result: t3, requestId: e2.requestId });
        else
          try {
            t3 = JSON.parse(e2.data.response_data), i2(null, { result: t3, requestId: e2.requestId });
          } catch (e3) {
            i2(new x({ message: "response data must be json" }));
          }
      }
      return i2.promise;
    }).catch((e2) => {
      i2(e2);
    }), i2.promise;
  }, Ne = { timeout: 15e3, persistence: "session" }, Me = {};
  class je {
    constructor(e) {
      this.config = e || this.config, this.authObj = void 0;
    }
    init(e) {
      switch (G.adapter || (this.requestClient = new G.adapter.reqClass({ timeout: e.timeout || 5e3, timeoutMsg: `\u8BF7\u6C42\u5728${(e.timeout || 5e3) / 1e3}s\u5185\u672A\u5B8C\u6210\uFF0C\u5DF2\u4E2D\u65AD` })), this.config = __spreadValues(__spreadValues({}, Ne), e), true) {
        case this.config.timeout > 6e5:
          console.warn("timeout\u5927\u4E8E\u53EF\u914D\u7F6E\u4E0A\u9650[10\u5206\u949F]\uFF0C\u5DF2\u91CD\u7F6E\u4E3A\u4E0A\u9650\u6570\u503C"), this.config.timeout = 6e5;
          break;
        case this.config.timeout < 100:
          console.warn("timeout\u5C0F\u4E8E\u53EF\u914D\u7F6E\u4E0B\u9650[100ms]\uFF0C\u5DF2\u91CD\u7F6E\u4E3A\u4E0B\u9650\u6570\u503C"), this.config.timeout = 100;
      }
      return new je(this.config);
    }
    auth({ persistence: e } = {}) {
      if (this.authObj)
        return this.authObj;
      const t2 = e || G.adapter.primaryStorage || Ne.persistence;
      var n2;
      return t2 !== this.config.persistence && (this.config.persistence = t2), function(e2) {
        const { env: t3 } = e2;
        ne[t3] = new te(e2), se[t3] = new te(__spreadProps(__spreadValues({}, e2), { persistence: "local" }));
      }(this.config), n2 = this.config, ve[n2.env] = new Se(n2), this.authObj = new Ue(this.config), this.authObj;
    }
    on(e, t2) {
      return ce.apply(this, [e, t2]);
    }
    off(e, t2) {
      return le.apply(this, [e, t2]);
    }
    callFunction(e, t2) {
      return Fe.apply(this, [e, t2]);
    }
    deleteFile(e, t2) {
      return De.apply(this, [e, t2]);
    }
    getTempFileURL(e, t2) {
      return qe.apply(this, [e, t2]);
    }
    downloadFile(e, t2) {
      return Le.apply(this, [e, t2]);
    }
    uploadFile(e, t2) {
      return Re.apply(this, [e, t2]);
    }
    getUploadMetadata(e, t2) {
      return xe.apply(this, [e, t2]);
    }
    registerExtension(e) {
      Me[e.name] = e;
    }
    async invokeExtension(e, t2) {
      const n2 = Me[e];
      if (!n2)
        throw new x({ message: `\u6269\u5C55${e} \u5FC5\u987B\u5148\u6CE8\u518C` });
      return await n2.invoke(t2, this);
    }
    useAdapters(e) {
      const { adapter: t2, runtime: n2 } = X(e) || {};
      t2 && (G.adapter = t2), n2 && (G.runtime = n2);
    }
  }
  var $e = new je();
  function Be(e, t2, n2) {
    n2 === void 0 && (n2 = {});
    var s2 = /\?/.test(t2), o2 = "";
    for (var r2 in n2)
      o2 === "" ? !s2 && (t2 += "?") : o2 += "&", o2 += r2 + "=" + encodeURIComponent(n2[r2]);
    return /^http(s)?:\/\//.test(t2 += o2) ? t2 : "" + e + t2;
  }
  class Ke {
    post(e) {
      const { url: t2, data: n2, headers: s2 } = e;
      return new Promise((e2, o2) => {
        N.request({ url: Be("https:", t2), data: n2, method: "POST", header: s2, success(t3) {
          e2(t3);
        }, fail(e3) {
          o2(e3);
        } });
      });
    }
    upload(e) {
      return new Promise((t2, n2) => {
        const { url: s2, file: o2, data: r2, headers: i2, fileType: a2 } = e, c2 = N.uploadFile({ url: Be("https:", s2), name: "file", formData: Object.assign({}, r2), filePath: o2, fileType: a2, header: i2, success(e2) {
          const n3 = { statusCode: e2.statusCode, data: e2.data || {} };
          e2.statusCode === 200 && r2.success_action_status && (n3.statusCode = parseInt(r2.success_action_status, 10)), t2(n3);
        }, fail(e2) {
          n2(new Error(e2.errMsg || "uploadFile:fail"));
        } });
        typeof e.onUploadProgress == "function" && c2 && typeof c2.onProgressUpdate == "function" && c2.onProgressUpdate((t3) => {
          e.onUploadProgress({ loaded: t3.totalBytesSent, total: t3.totalBytesExpectedToSend });
        });
      });
    }
  }
  const He = { setItem(e, t2) {
    N.setStorageSync(e, t2);
  }, getItem: (e) => N.getStorageSync(e), removeItem(e) {
    N.removeStorageSync(e);
  }, clear() {
    N.clearStorageSync();
  } };
  var We = { genAdapter: function() {
    return { root: {}, reqClass: Ke, localStorage: He, primaryStorage: "local" };
  }, isMatch: function() {
    return true;
  }, runtime: "uni_app" };
  $e.useAdapters(We);
  const ze = $e, Je = ze.init;
  ze.init = function(e) {
    e.env = e.spaceId;
    const t2 = Je.call(this, e);
    t2.config.provider = "tencent", t2.config.spaceId = e.spaceId;
    const n2 = t2.auth;
    return t2.auth = function(e2) {
      const t3 = n2.call(this, e2);
      return ["linkAndRetrieveDataWithTicket", "signInAnonymously", "signOut", "getAccessToken", "getLoginState", "signInWithTicket", "getUserInfo"].forEach((e3) => {
        t3[e3] = R(t3[e3]).bind(t3);
      }), t3;
    }, t2.customAuth = t2.auth, t2;
  };
  var Ye = ze;
  function Ve(e) {
    return e && Ve(e.__v_raw) || e;
  }
  function Xe() {
    return { token: N.getStorageSync("uni_id_token") || N.getStorageSync("uniIdToken"), tokenExpired: N.getStorageSync("uni_id_token_expired") };
  }
  function Ge({ token: e, tokenExpired: t2 } = {}) {
    e && N.setStorageSync("uni_id_token", e), t2 && N.setStorageSync("uni_id_token_expired", t2);
  }
  var Ze = class extends $ {
    getAccessToken() {
      return new Promise((e, t2) => {
        const n2 = "Anonymous_Access_token";
        this.setAccessToken(n2), e(n2);
      });
    }
    setupRequest(e, t2) {
      const n2 = Object.assign({}, e, { spaceId: this.config.spaceId, timestamp: Date.now() }), s2 = { "Content-Type": "application/json" };
      t2 !== "auth" && (n2.token = this.accessToken, s2["x-basement-token"] = this.accessToken), s2["x-serverless-sign"] = F.sign(n2, this.config.clientSecret);
      const o2 = L();
      s2["x-client-info"] = JSON.stringify(o2);
      const { token: r2 } = Xe();
      return s2["x-client-token"] = r2, { url: this.config.requestUrl, method: "POST", data: n2, dataType: "json", header: JSON.parse(JSON.stringify(s2)) };
    }
    uploadFileToOSS({ url: e, formData: t2, name: n2, filePath: s2, fileType: o2, onUploadProgress: r2 }) {
      return new Promise((i2, a2) => {
        const c2 = this.adapter.uploadFile({ url: e, formData: t2, name: n2, filePath: s2, fileType: o2, success(e2) {
          e2 && e2.statusCode < 400 ? i2(e2) : a2(new x({ code: "UPLOAD_FAILED", message: "\u6587\u4EF6\u4E0A\u4F20\u5931\u8D25" }));
        }, fail(e2) {
          a2(new x({ code: e2.code || "UPLOAD_FAILED", message: e2.message || e2.errMsg || "\u6587\u4EF6\u4E0A\u4F20\u5931\u8D25" }));
        } });
        typeof r2 == "function" && c2 && typeof c2.onProgressUpdate == "function" && c2.onProgressUpdate((e2) => {
          r2({ loaded: e2.totalBytesSent, total: e2.totalBytesExpectedToSend });
        });
      });
    }
    uploadFile({ filePath: e, cloudPath: t2, fileType: n2 = "image", onUploadProgress: s2 }) {
      if (!t2)
        throw new x({ code: "CLOUDPATH_REQUIRED", message: "cloudPath\u4E0D\u53EF\u4E3A\u7A7A" });
      let o2;
      return this.getOSSUploadOptionsFromPath({ cloudPath: t2 }).then((t3) => {
        const { url: r2, formData: i2, name: a2 } = t3.result;
        o2 = t3.result.fileUrl;
        const c2 = { url: r2, formData: i2, name: a2, filePath: e, fileType: n2 };
        return this.uploadFileToOSS(Object.assign({}, c2, { onUploadProgress: s2 }));
      }).then(() => this.reportOSSUpload({ cloudPath: t2 })).then((t3) => new Promise((n3, s3) => {
        t3.success ? n3({ success: true, filePath: e, fileID: o2 }) : s3(new x({ code: "UPLOAD_FAILED", message: "\u6587\u4EF6\u4E0A\u4F20\u5931\u8D25" }));
      }));
    }
    deleteFile({ fileList: e }) {
      const t2 = { method: "serverless.file.resource.delete", params: JSON.stringify({ fileList: e }) };
      return this.request(this.setupRequest(t2));
    }
    getTempFileURL({ fileList: e } = {}) {
      const t2 = { method: "serverless.file.resource.getTempFileURL", params: JSON.stringify({ fileList: e }) };
      return this.request(this.setupRequest(t2));
    }
  };
  var et = { init(e) {
    const t2 = new Ze(e), n2 = { signInAnonymously: function() {
      return t2.authorize();
    }, getLoginState: function() {
      return Promise.resolve(false);
    } };
    return t2.auth = function() {
      return n2;
    }, t2.customAuth = t2.auth, t2;
  } };
  function tt({ data: e }) {
    let t2;
    t2 = L();
    const n2 = JSON.parse(JSON.stringify(e || {}));
    if (Object.assign(n2, { clientInfo: t2 }), !n2.uniIdToken) {
      const { token: e2 } = Xe();
      e2 && (n2.uniIdToken = e2);
    }
    return n2;
  }
  function nt({ name: e, data: t2 }) {
    const { localAddress: n2, localPort: s2 } = this, o2 = { aliyun: "aliyun", tencent: "tcb" }[this.config.provider], r2 = this.config.spaceId, i2 = `http://${n2}:${s2}/system/check-function`, a2 = `http://${n2}:${s2}/cloudfunctions/${e}`;
    return new Promise((t3, n3) => {
      N.request({ method: "POST", url: i2, data: { name: e, platform: d, provider: o2, spaceId: r2 }, timeout: 3e3, success(e2) {
        t3(e2);
      }, fail() {
        t3({ data: { code: "NETWORK_ERROR", message: "\u8FDE\u63A5\u672C\u5730\u8C03\u8BD5\u670D\u52A1\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u5BA2\u6237\u7AEF\u662F\u5426\u548C\u4E3B\u673A\u5728\u540C\u4E00\u5C40\u57DF\u7F51\u4E0B\uFF0C\u81EA\u52A8\u5207\u6362\u4E3A\u5DF2\u90E8\u7F72\u7684\u4E91\u51FD\u6570\u3002" } });
      } });
    }).then(({ data: e2 } = {}) => {
      const { code: t3, message: n3 } = e2 || {};
      return { code: t3 === 0 ? 0 : t3 || "SYS_ERR", message: n3 || "SYS_ERR" };
    }).then(({ code: n3, message: s3 }) => {
      if (n3 !== 0) {
        switch (n3) {
          case "MODULE_ENCRYPTED":
            console.error(`\u6B64\u4E91\u51FD\u6570\uFF08${e}\uFF09\u4F9D\u8D56\u52A0\u5BC6\u516C\u5171\u6A21\u5757\u4E0D\u53EF\u672C\u5730\u8C03\u8BD5\uFF0C\u81EA\u52A8\u5207\u6362\u4E3A\u4E91\u7AEF\u5DF2\u90E8\u7F72\u7684\u4E91\u51FD\u6570`);
            break;
          case "FUNCTION_ENCRYPTED":
            console.error(`\u6B64\u4E91\u51FD\u6570\uFF08${e}\uFF09\u5DF2\u52A0\u5BC6\u4E0D\u53EF\u672C\u5730\u8C03\u8BD5\uFF0C\u81EA\u52A8\u5207\u6362\u4E3A\u4E91\u7AEF\u5DF2\u90E8\u7F72\u7684\u4E91\u51FD\u6570`);
            break;
          case "ACTION_ENCRYPTED":
            console.error(s3 || "\u9700\u8981\u8BBF\u95EE\u52A0\u5BC6\u7684uni-clientDB-action\uFF0C\u81EA\u52A8\u5207\u6362\u4E3A\u4E91\u7AEF\u73AF\u5883");
            break;
          case "NETWORK_ERROR": {
            const e2 = "\u8FDE\u63A5\u672C\u5730\u8C03\u8BD5\u670D\u52A1\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u5BA2\u6237\u7AEF\u662F\u5426\u548C\u4E3B\u673A\u5728\u540C\u4E00\u5C40\u57DF\u7F51\u4E0B";
            throw console.error(e2), new Error(e2);
          }
          case "SWITCH_TO_CLOUD":
            break;
          default: {
            const e2 = `\u68C0\u6D4B\u672C\u5730\u8C03\u8BD5\u670D\u52A1\u51FA\u73B0\u9519\u8BEF\uFF1A${s3}\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u73AF\u5883\u6216\u91CD\u542F\u5BA2\u6237\u7AEF\u518D\u8BD5`;
            throw console.error(e2), new Error(e2);
          }
        }
        return this._originCallFunction({ name: e, data: t2 });
      }
      return new Promise((e2, n4) => {
        const s4 = tt.call(this, { data: t2 });
        N.request({ method: "POST", url: a2, data: { provider: o2, platform: d, param: s4 }, success: ({ statusCode: t3, data: s5 } = {}) => !t3 || t3 >= 400 ? n4(new x({ code: s5.code || "SYS_ERR", message: s5.message || "request:fail" })) : e2({ result: s5 }), fail(e3) {
          n4(new x({ code: e3.code || e3.errCode || "SYS_ERR", message: e3.message || e3.errMsg || "request:fail" }));
        } });
      });
    });
  }
  const st = [{ rule: /fc_function_not_found|FUNCTION_NOT_FOUND/, content: "\uFF0C\u4E91\u51FD\u6570[{functionName}]\u5728\u4E91\u7AEF\u4E0D\u5B58\u5728\uFF0C\u8BF7\u68C0\u67E5\u6B64\u4E91\u51FD\u6570\u540D\u79F0\u662F\u5426\u6B63\u786E\u4EE5\u53CA\u8BE5\u4E91\u51FD\u6570\u662F\u5426\u5DF2\u4E0A\u4F20\u5230\u670D\u52A1\u7A7A\u95F4", mode: "append" }];
  var ot = /[\\^$.*+?()[\]{}|]/g, rt = RegExp(ot.source);
  function it(e, t2, n2) {
    return e.replace(new RegExp((s2 = t2) && rt.test(s2) ? s2.replace(ot, "\\$&") : s2, "g"), n2);
    var s2;
  }
  function at({ functionName: e, result: t2, logPvd: n2 }) {
    if (this.config.useDebugFunction && t2 && t2.requestId) {
      const s2 = JSON.stringify({ spaceId: this.config.spaceId, functionName: e, requestId: t2.requestId });
      console.log(`[${n2}-request]${s2}[/${n2}-request]`);
    }
  }
  function ct(e) {
    const t2 = e.callFunction, n2 = function(n3) {
      const s2 = n3.name;
      n3.data = tt.call(e, { data: n3.data });
      const o2 = { aliyun: "aliyun", tencent: "tcb", tcb: "tcb" }[this.config.provider];
      return t2.call(this, n3).then((e2) => (e2.errCode = 0, at.call(this, { functionName: s2, result: e2, logPvd: o2 }), Promise.resolve(e2)), (e2) => (at.call(this, { functionName: s2, result: e2, logPvd: o2 }), e2 && e2.message && (e2.message = function({ message: e3 = "", extraInfo: t3 = {}, formatter: n4 = [] } = {}) {
        for (let s3 = 0; s3 < n4.length; s3++) {
          const { rule: o3, content: r2, mode: i2 } = n4[s3], a2 = e3.match(o3);
          if (!a2)
            continue;
          let c2 = r2;
          for (let e4 = 1; e4 < a2.length; e4++)
            c2 = it(c2, `{$${e4}}`, a2[e4]);
          for (const e4 in t3)
            c2 = it(c2, `{${e4}}`, t3[e4]);
          return i2 === "replace" ? c2 : e3 + c2;
        }
        return e3;
      }({ message: `[${n3.name}]: ${e2.message}`, formatter: st, extraInfo: { functionName: s2 } })), Promise.reject(e2)));
    };
    e.callFunction = function(t3) {
      let s2;
      return e.debugInfo && !e.debugInfo.forceRemote && p ? (e._originCallFunction || (e._originCallFunction = n2), s2 = nt.call(this, t3)) : s2 = n2.call(this, t3), Object.defineProperty(s2, "result", { get: () => (console.warn("\u5F53\u524D\u8FD4\u56DE\u7ED3\u679C\u4E3APromise\u7C7B\u578B\uFF0C\u4E0D\u53EF\u76F4\u63A5\u8BBF\u95EE\u5176result\u5C5E\u6027\uFF0C\u8BE6\u60C5\u8BF7\u53C2\u8003\uFF1Ahttps://uniapp.dcloud.net.cn/uniCloud/faq?id=promise"), {}) }), s2;
    };
  }
  const ut = Symbol("CLIENT_DB_INTERNAL");
  function lt(e, t2) {
    return e.then = "DoNotReturnProxyWithAFunctionNamedThen", e._internalType = ut, e.__v_raw = void 0, new Proxy(e, { get(e2, n2, s2) {
      if (n2 === "_uniClient")
        return null;
      if (n2 in e2 || typeof n2 != "string") {
        const t3 = e2[n2];
        return typeof t3 == "function" ? t3.bind(e2) : t3;
      }
      return t2.get(e2, n2, s2);
    } });
  }
  function ht(e) {
    return { on: (t2, n2) => {
      e[t2] = e[t2] || [], e[t2].indexOf(n2) > -1 || e[t2].push(n2);
    }, off: (t2, n2) => {
      e[t2] = e[t2] || [];
      const s2 = e[t2].indexOf(n2);
      s2 !== -1 && e[t2].splice(s2, 1);
    } };
  }
  const dt = ["db.Geo", "db.command", "command.aggregate"];
  function ft(e, t2) {
    return dt.indexOf(`${e}.${t2}`) > -1;
  }
  function pt(e) {
    switch (c(e = Ve(e))) {
      case "array":
        return e.map((e2) => pt(e2));
      case "object":
        return e._internalType === ut || Object.keys(e).forEach((t2) => {
          e[t2] = pt(e[t2]);
        }), e;
      case "regexp":
        return { $regexp: { source: e.source, flags: e.flags } };
      case "date":
        return { $date: e.toISOString() };
      default:
        return e;
    }
  }
  class gt {
    constructor(e, t2, n2) {
      this.content = e, this.prevStage = t2 || null, this.udb = null, this._database = n2;
    }
    toJSON() {
      let e = this;
      const t2 = [e.content];
      for (; e.prevStage; )
        e = e.prevStage, t2.push(e.content);
      return { $db: t2.reverse().map((e2) => ({ $method: e2.$method, $param: pt(e2.$param) })) };
    }
    getAction() {
      const e = this.toJSON().$db.find((e2) => e2.$method === "action");
      return e && e.$param && e.$param[0];
    }
    getCommand() {
      return { $db: this.toJSON().$db.filter((e) => e.$method !== "action") };
    }
    get useAggregate() {
      let e = this, t2 = false;
      for (; e.prevStage; ) {
        e = e.prevStage;
        const n2 = e.content.$method;
        if (n2 === "aggregate" || n2 === "pipeline") {
          t2 = true;
          break;
        }
      }
      return t2;
    }
    get count() {
      if (!this.useAggregate)
        return function() {
          return this._send("count", Array.from(arguments));
        };
      const e = this;
      return function() {
        return mt({ $method: "count", $param: pt(Array.from(arguments)) }, e, this._database);
      };
    }
    get() {
      return this._send("get", Array.from(arguments));
    }
    add() {
      return this._send("add", Array.from(arguments));
    }
    remove() {
      return this._send("remove", Array.from(arguments));
    }
    update() {
      return this._send("update", Array.from(arguments));
    }
    end() {
      return this._send("end", Array.from(arguments));
    }
    set() {
      throw new Error("clientDB\u7981\u6B62\u4F7F\u7528set\u65B9\u6CD5");
    }
    _send(e, t2) {
      const n2 = this.getAction(), s2 = this.getCommand();
      if (s2.$db.push({ $method: e, $param: pt(t2) }), h) {
        const e2 = s2.$db.find((e3) => e3.$method === "collection"), t3 = e2 && e2.$param;
        t3 && t3.length === 1 && typeof e2.$param[0] == "string" && e2.$param[0].indexOf(",") > -1 && console.warn("\u68C0\u6D4B\u5230\u4F7F\u7528JQL\u8BED\u6CD5\u8054\u8868\u67E5\u8BE2\u65F6\uFF0C\u672A\u4F7F\u7528getTemp\u5148\u8FC7\u6EE4\u4E3B\u8868\u6570\u636E\uFF0C\u5728\u4E3B\u8868\u6570\u636E\u91CF\u5927\u7684\u60C5\u51B5\u4E0B\u53EF\u80FD\u4F1A\u67E5\u8BE2\u7F13\u6162\u3002\n- \u5982\u4F55\u4F18\u5316\u8BF7\u53C2\u8003\u6B64\u6587\u6863\uFF1Ahttps://uniapp.dcloud.net.cn/uniCloud/jql?id=lookup-with-temp \n- \u5982\u679C\u4E3B\u8868\u6570\u636E\u91CF\u5F88\u5C0F\u8BF7\u5FFD\u7565\u6B64\u4FE1\u606F\uFF0C\u9879\u76EE\u53D1\u884C\u65F6\u4E0D\u4F1A\u51FA\u73B0\u6B64\u63D0\u793A\u3002");
      }
      return this._database._callCloudFunction({ action: n2, command: s2 });
    }
  }
  function mt(e, t2, n2) {
    return lt(new gt(e, t2, n2), { get(e2, t3) {
      let s2 = "db";
      return e2 && e2.content && (s2 = e2.content.$method), ft(s2, t3) ? mt({ $method: t3 }, e2, n2) : function() {
        return mt({ $method: t3, $param: pt(Array.from(arguments)) }, e2, n2);
      };
    } });
  }
  function yt({ path: e, method: t2 }) {
    return class {
      constructor() {
        this.param = Array.from(arguments);
      }
      toJSON() {
        return { $newDb: [...e.map((e2) => ({ $method: e2 })), { $method: t2, $param: this.param }] };
      }
    };
  }
  class _t extends class {
    constructor({ uniClient: e = {} } = {}) {
      this._uniClient = e, this._authCallBacks = {}, this._dbCallBacks = {}, e.isDefault && (this._dbCallBacks = _("_globalUniCloudDatabaseCallback")), this.auth = ht(this._authCallBacks), Object.assign(this, ht(this._dbCallBacks)), this.env = lt({}, { get: (e2, t2) => ({ $env: t2 }) }), this.Geo = lt({}, { get: (e2, t2) => yt({ path: ["Geo"], method: t2 }) }), this.serverDate = yt({ path: [], method: "serverDate" }), this.RegExp = yt({ path: [], method: "RegExp" });
    }
    getCloudEnv(e) {
      if (typeof e != "string" || !e.trim())
        throw new Error("getCloudEnv\u53C2\u6570\u9519\u8BEF");
      return { $env: e.replace("$cloudEnv_", "") };
    }
    _callback(e, t2) {
      const n2 = this._dbCallBacks;
      n2[e] && n2[e].forEach((e2) => {
        e2(...t2);
      });
    }
    _callbackAuth(e, t2) {
      const n2 = this._authCallBacks;
      n2[e] && n2[e].forEach((e2) => {
        e2(...t2);
      });
    }
    multiSend() {
      const e = Array.from(arguments), t2 = e.map((e2) => {
        const t3 = e2.getAction(), n2 = e2.getCommand();
        if (n2.$db[n2.$db.length - 1].$method !== "getTemp")
          throw new Error("multiSend\u53EA\u652F\u6301\u5B50\u547D\u4EE4\u5185\u4F7F\u7528getTemp");
        return { action: t3, command: n2 };
      });
      return this._callCloudFunction({ multiCommand: t2, queryList: e });
    }
  } {
    _callCloudFunction({ action: e, command: t2, multiCommand: n2, queryList: s2 }) {
      function o2(e2, t3) {
        if (n2 && s2)
          for (let n3 = 0; n3 < s2.length; n3++) {
            const o3 = s2[n3];
            o3.udb && typeof o3.udb.setResult == "function" && (t3 ? o3.udb.setResult(t3) : o3.udb.setResult(e2.result.dataList[n3]));
          }
      }
      const r2 = this;
      function i2(e2) {
        return r2._callback("error", [e2]), T(A("database", "fail"), e2).then(() => T(A("database", "complete"), e2)).then(() => (o2(null, e2), U(I, { type: O, content: e2 }), Promise.reject(e2)));
      }
      const c2 = T(A("database", "invoke")), u2 = this._uniClient;
      return c2.then(() => u2.callFunction({ name: "DCloud-clientDB", type: a, data: { action: e, command: t2, multiCommand: n2 } })).then((e2) => {
        const { code: t3, message: n3, token: s3, tokenExpired: r3, systemInfo: a2 = [] } = e2.result;
        if (a2)
          for (let e3 = 0; e3 < a2.length; e3++) {
            const { level: t4, message: n4, detail: s4 } = a2[e3], o3 = console[t4] || console.log;
            let r4 = "[System Info]" + n4;
            s4 && (r4 = `${r4}
\u8BE6\u7EC6\u4FE1\u606F\uFF1A${s4}`), o3(r4);
          }
        if (t3) {
          return i2(new x({ code: t3, message: n3, requestId: e2.requestId }));
        }
        e2.result.errCode = e2.result.code, e2.result.errMsg = e2.result.message, s3 && r3 && (Ge({ token: s3, tokenExpired: r3 }), this._callbackAuth("refreshToken", [{ token: s3, tokenExpired: r3 }]), this._callback("refreshToken", [{ token: s3, tokenExpired: r3 }]));
        const c3 = [{ prop: "affectedDocs", tips: "affectedDocs\u4E0D\u518D\u63A8\u8350\u4F7F\u7528\uFF0C\u8BF7\u4F7F\u7528inserted/deleted/updated/data.length\u66FF\u4EE3" }, { prop: "code", tips: "code\u4E0D\u518D\u63A8\u8350\u4F7F\u7528\uFF0C\u8BF7\u4F7F\u7528errCode\u66FF\u4EE3" }, { prop: "message", tips: "message\u4E0D\u518D\u63A8\u8350\u4F7F\u7528\uFF0C\u8BF7\u4F7F\u7528errMsg\u66FF\u4EE3" }];
        for (let t4 = 0; t4 < c3.length; t4++) {
          const { prop: n4, tips: s4 } = c3[t4];
          if (n4 in e2.result) {
            const t5 = e2.result[n4];
            Object.defineProperty(e2.result, n4, { get: () => (console.warn(s4), t5) });
          }
        }
        return function(e3) {
          return T(A("database", "success"), e3).then(() => T(A("database", "complete"), e3)).then(() => (o2(e3, null), U(I, { type: O, content: e3 }), Promise.resolve(e3)));
        }(e2);
      }, (e2) => {
        /fc_function_not_found|FUNCTION_NOT_FOUND/g.test(e2.message) && console.warn("clientDB\u672A\u521D\u59CB\u5316\uFF0C\u8BF7\u5728web\u63A7\u5236\u53F0\u4FDD\u5B58\u4E00\u6B21schema\u4EE5\u5F00\u542FclientDB");
        return i2(new x({ code: e2.code || "SYSTEM_ERROR", message: e2.message, requestId: e2.requestId }));
      });
    }
  }
  function wt(e) {
    e.database = function(t2) {
      if (t2 && Object.keys(t2).length > 0)
        return e.init(t2).database();
      if (this._database)
        return this._database;
      const n2 = function(e2, t3 = {}) {
        return lt(new e2(t3), { get: (e3, t4) => ft("db", t4) ? mt({ $method: t4 }, null, e3) : function() {
          return mt({ $method: t4, $param: pt(Array.from(arguments)) }, null, e3);
        } });
      }(_t, { uniClient: e });
      return this._database = n2, n2;
    };
  }
  function kt(e) {
    e.onResponse = function(e2) {
      !function(e3, t2) {
        const n2 = E(e3);
        n2.includes(t2) || n2.push(t2);
      }(I, e2);
    }, e.offResponse = function(e2) {
      !function(e3, t2) {
        const n2 = E(e3), s2 = n2.indexOf(t2);
        s2 !== -1 && n2.splice(s2, 1);
      }(I, e2);
    };
  }
  let St;
  const vt = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", Tt = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;
  function At() {
    const e = Xe().token || "", t2 = e.split(".");
    if (!e || t2.length !== 3)
      return { uid: null, role: [], permission: [], tokenExpired: 0 };
    let n2;
    try {
      n2 = JSON.parse((s2 = t2[1], decodeURIComponent(St(s2).split("").map(function(e2) {
        return "%" + ("00" + e2.charCodeAt(0).toString(16)).slice(-2);
      }).join(""))));
    } catch (e2) {
      throw new Error("\u83B7\u53D6\u5F53\u524D\u7528\u6237\u4FE1\u606F\u51FA\u9519\uFF0C\u8BE6\u7EC6\u9519\u8BEF\u4FE1\u606F\u4E3A\uFF1A" + e2.message);
    }
    var s2;
    return n2.tokenExpired = 1e3 * n2.exp, delete n2.exp, delete n2.iat, n2;
  }
  St = typeof atob != "function" ? function(e) {
    if (e = String(e).replace(/[\t\n\f\r ]+/g, ""), !Tt.test(e))
      throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
    var t2;
    e += "==".slice(2 - (3 & e.length));
    for (var n2, s2, o2 = "", r2 = 0; r2 < e.length; )
      t2 = vt.indexOf(e.charAt(r2++)) << 18 | vt.indexOf(e.charAt(r2++)) << 12 | (n2 = vt.indexOf(e.charAt(r2++))) << 6 | (s2 = vt.indexOf(e.charAt(r2++))), o2 += n2 === 64 ? String.fromCharCode(t2 >> 16 & 255) : s2 === 64 ? String.fromCharCode(t2 >> 16 & 255, t2 >> 8 & 255) : String.fromCharCode(t2 >> 16 & 255, t2 >> 8 & 255, 255 & t2);
    return o2;
  } : atob;
  var Pt = t$1(n(function(e, t2) {
    Object.defineProperty(t2, "__esModule", { value: true });
    const n2 = "chooseAndUploadFile:ok", s2 = "chooseAndUploadFile:fail";
    function o2(e2, t3) {
      return e2.tempFiles.forEach((e3, n3) => {
        e3.name || (e3.name = e3.path.substring(e3.path.lastIndexOf("/") + 1)), t3 && (e3.fileType = t3), e3.cloudPath = Date.now() + "_" + n3 + e3.name.substring(e3.name.lastIndexOf("."));
      }), e2.tempFilePaths || (e2.tempFilePaths = e2.tempFiles.map((e3) => e3.path)), e2;
    }
    function r2(e2, t3, { onChooseFile: s3, onUploadProgress: o3 }) {
      return t3.then((e3) => {
        if (s3) {
          const t4 = s3(e3);
          if (t4 !== void 0)
            return Promise.resolve(t4).then((t5) => t5 === void 0 ? e3 : t5);
        }
        return e3;
      }).then((t4) => t4 === false ? { errMsg: n2, tempFilePaths: [], tempFiles: [] } : function(e3, t5, s4 = 5, o4) {
        (t5 = Object.assign({}, t5)).errMsg = n2;
        const r3 = t5.tempFiles, i2 = r3.length;
        let a2 = 0;
        return new Promise((n3) => {
          for (; a2 < s4; )
            c2();
          function c2() {
            const s5 = a2++;
            if (s5 >= i2)
              return void (!r3.find((e4) => !e4.url && !e4.errMsg) && n3(t5));
            const u2 = r3[s5];
            e3.uploadFile({ filePath: u2.path, cloudPath: u2.cloudPath, fileType: u2.fileType, onUploadProgress(e4) {
              e4.index = s5, e4.tempFile = u2, e4.tempFilePath = u2.path, o4 && o4(e4);
            } }).then((e4) => {
              u2.url = e4.fileID, s5 < i2 && c2();
            }).catch((e4) => {
              u2.errMsg = e4.errMsg || e4.message, s5 < i2 && c2();
            });
          }
        });
      }(e2, t4, 5, o3));
    }
    t2.initChooseAndUploadFile = function(e2) {
      return function(t3 = { type: "all" }) {
        return t3.type === "image" ? r2(e2, function(e3) {
          const { count: t4, sizeType: n3, sourceType: r3 = ["album", "camera"], extension: i2 } = e3;
          return new Promise((e4, a2) => {
            uni.chooseImage({ count: t4, sizeType: n3, sourceType: r3, extension: i2, success(t5) {
              e4(o2(t5, "image"));
            }, fail(e5) {
              a2({ errMsg: e5.errMsg.replace("chooseImage:fail", s2) });
            } });
          });
        }(t3), t3) : t3.type === "video" ? r2(e2, function(e3) {
          const { camera: t4, compressed: n3, maxDuration: r3, sourceType: i2 = ["album", "camera"], extension: a2 } = e3;
          return new Promise((e4, c2) => {
            uni.chooseVideo({ camera: t4, compressed: n3, maxDuration: r3, sourceType: i2, extension: a2, success(t5) {
              const { tempFilePath: n4, duration: s3, size: r4, height: i3, width: a3 } = t5;
              e4(o2({ errMsg: "chooseVideo:ok", tempFilePaths: [n4], tempFiles: [{ name: t5.tempFile && t5.tempFile.name || "", path: n4, size: r4, type: t5.tempFile && t5.tempFile.type || "", width: a3, height: i3, duration: s3, fileType: "video", cloudPath: "" }] }, "video"));
            }, fail(e5) {
              c2({ errMsg: e5.errMsg.replace("chooseVideo:fail", s2) });
            } });
          });
        }(t3), t3) : r2(e2, function(e3) {
          const { count: t4, extension: n3 } = e3;
          return new Promise((e4, r3) => {
            let i2 = uni.chooseFile;
            if (typeof wx != "undefined" && typeof wx.chooseMessageFile == "function" && (i2 = wx.chooseMessageFile), typeof i2 != "function")
              return r3({ errMsg: s2 + " \u8BF7\u6307\u5B9A type \u7C7B\u578B\uFF0C\u8BE5\u5E73\u53F0\u4EC5\u652F\u6301\u9009\u62E9 image \u6216 video\u3002" });
            i2({ type: "all", count: t4, extension: n3, success(t5) {
              e4(o2(t5));
            }, fail(e5) {
              r3({ errMsg: e5.errMsg.replace("chooseFile:fail", s2) });
            } });
          });
        }(t3), t3);
      };
    };
  }));
  const It = "manual";
  function Ot(e) {
    return { props: { localdata: { type: Array, default: () => [] }, options: { type: [Object, Array], default: () => ({}) }, spaceInfo: { type: Object, default: () => ({}) }, collection: { type: [String, Array], default: "" }, action: { type: String, default: "" }, field: { type: String, default: "" }, orderby: { type: String, default: "" }, where: { type: [String, Object], default: "" }, pageData: { type: String, default: "add" }, pageCurrent: { type: Number, default: 1 }, pageSize: { type: Number, default: 20 }, getcount: { type: [Boolean, String], default: false }, gettree: { type: [Boolean, String], default: false }, gettreepath: { type: [Boolean, String], default: false }, startwith: { type: String, default: "" }, limitlevel: { type: Number, default: 10 }, groupby: { type: String, default: "" }, groupField: { type: String, default: "" }, distinct: { type: [Boolean, String], default: false }, foreignKey: { type: String, default: "" }, loadtime: { type: String, default: "auto" }, manual: { type: Boolean, default: false } }, data: () => ({ mixinDatacomLoading: false, mixinDatacomHasMore: false, mixinDatacomResData: [], mixinDatacomErrorMessage: "", mixinDatacomPage: {} }), created() {
      this.mixinDatacomPage = { current: this.pageCurrent, size: this.pageSize, count: 0 }, this.$watch(() => {
        var e2 = [];
        return ["pageCurrent", "pageSize", "localdata", "collection", "action", "field", "orderby", "where", "getont", "getcount", "gettree", "groupby", "groupField", "distinct"].forEach((t2) => {
          e2.push(this[t2]);
        }), e2;
      }, (e2, t2) => {
        if (this.loadtime === It)
          return;
        let n2 = false;
        const s2 = [];
        for (let o2 = 2; o2 < e2.length; o2++)
          e2[o2] !== t2[o2] && (s2.push(e2[o2]), n2 = true);
        e2[0] !== t2[0] && (this.mixinDatacomPage.current = this.pageCurrent), this.mixinDatacomPage.size = this.pageSize, this.onMixinDatacomPropsChange(n2, s2);
      });
    }, methods: { onMixinDatacomPropsChange(e2, t2) {
    }, mixinDatacomEasyGet({ getone: e2 = false, success: t2, fail: n2 } = {}) {
      this.mixinDatacomLoading || (this.mixinDatacomLoading = true, this.mixinDatacomErrorMessage = "", this.mixinDatacomGet().then((n3) => {
        this.mixinDatacomLoading = false;
        const { data: s2, count: o2 } = n3.result;
        this.getcount && (this.mixinDatacomPage.count = o2), this.mixinDatacomHasMore = s2.length < this.pageSize;
        const r2 = e2 ? s2.length ? s2[0] : void 0 : s2;
        this.mixinDatacomResData = r2, t2 && t2(r2);
      }).catch((e3) => {
        this.mixinDatacomLoading = false, this.mixinDatacomErrorMessage = e3, n2 && n2(e3);
      }));
    }, mixinDatacomGet(t2 = {}) {
      let n2 = e.database(this.spaceInfo);
      const s2 = t2.action || this.action;
      s2 && (n2 = n2.action(s2));
      const o2 = t2.collection || this.collection;
      n2 = Array.isArray(o2) ? n2.collection(...o2) : n2.collection(o2);
      const r2 = t2.where || this.where;
      r2 && Object.keys(r2).length && (n2 = n2.where(r2));
      const i2 = t2.field || this.field;
      i2 && (n2 = n2.field(i2));
      const a2 = t2.foreignKey || this.foreignKey;
      a2 && (n2 = n2.foreignKey(a2));
      const c2 = t2.groupby || this.groupby;
      c2 && (n2 = n2.groupBy(c2));
      const u2 = t2.groupField || this.groupField;
      u2 && (n2 = n2.groupField(u2));
      (t2.distinct !== void 0 ? t2.distinct : this.distinct) === true && (n2 = n2.distinct());
      const l2 = t2.orderby || this.orderby;
      l2 && (n2 = n2.orderBy(l2));
      const h2 = t2.pageCurrent !== void 0 ? t2.pageCurrent : this.mixinDatacomPage.current, d2 = t2.pageSize !== void 0 ? t2.pageSize : this.mixinDatacomPage.size, f2 = t2.getcount !== void 0 ? t2.getcount : this.getcount, p2 = t2.gettree !== void 0 ? t2.gettree : this.gettree, g = t2.gettreepath !== void 0 ? t2.gettreepath : this.gettreepath, m2 = { getCount: f2 }, y2 = { limitLevel: t2.limitlevel !== void 0 ? t2.limitlevel : this.limitlevel, startWith: t2.startwith !== void 0 ? t2.startwith : this.startwith };
      return p2 && (m2.getTree = y2), g && (m2.getTreePath = y2), n2 = n2.skip(d2 * (h2 - 1)).limit(d2).get(m2), n2;
    } } };
  }
  function bt(e) {
    return function(t2, n2 = {}) {
      n2 = function(e2, t3 = {}) {
        return e2.customUI = t3.customUI || e2.customUI, Object.assign(e2.loadingOptions, t3.loadingOptions), Object.assign(e2.errorOptions, t3.errorOptions), e2;
      }({ customUI: false, loadingOptions: { title: "\u52A0\u8F7D\u4E2D...", mask: true }, errorOptions: { type: "modal", retry: false } }, n2);
      const { customUI: s2, loadingOptions: o2, errorOptions: r2 } = n2, a2 = !s2;
      return new Proxy({}, { get: (n3, s3) => async function n4(...c2) {
        let u2;
        a2 && uni.showLoading({ title: o2.title, mask: o2.mask });
        try {
          u2 = await e.callFunction({ name: t2, type: i, data: { method: s3, params: c2 } });
        } catch (e2) {
          u2 = { result: e2 };
        }
        const { errCode: l2, errMsg: h2, newToken: d2 } = u2.result || {};
        if (a2 && uni.hideLoading(), d2 && d2.token && d2.tokenExpired && Ge(d2), l2) {
          if (a2)
            if (r2.type === "toast")
              uni.showToast({ title: h2, icon: "none" });
            else {
              if (r2.type !== "modal")
                throw new Error(`Invalid errorOptions.type: ${r2.type}`);
              {
                const { confirm: e3 } = await async function({ title: e4, content: t3, showCancel: n5, cancelText: s4, confirmText: o3 } = {}) {
                  return new Promise((r3, i2) => {
                    uni.showModal({ title: e4, content: t3, showCancel: n5, cancelText: s4, confirmText: o3, success(e5) {
                      r3(e5);
                    }, fail() {
                      r3({ confirm: false, cancel: true });
                    } });
                  });
                }({ title: "\u63D0\u793A", content: h2, showCancel: r2.retry, cancelText: "\u53D6\u6D88", confirmText: r2.retry ? "\u91CD\u8BD5" : "\u786E\u5B9A" });
                if (r2.retry && e3)
                  return n4(...c2);
              }
            }
          const e2 = new x({ code: l2, message: h2, requestId: u2.requestId });
          throw e2.detail = u2.result, U(I, { type: C, content: e2 }), e2;
        }
        return U(I, { type: C, content: u2.result }), u2.result;
      } });
    };
  }
  async function Ct(e, t2) {
    const n2 = `http://${e}:${t2}/system/ping`;
    try {
      const e2 = await (s2 = { url: n2, timeout: 500 }, new Promise((e3, t3) => {
        N.request(__spreadProps(__spreadValues({}, s2), { success(t4) {
          e3(t4);
        }, fail(e4) {
          t3(e4);
        } }));
      }));
      return !(!e2.data || e2.data.code !== 0);
    } catch (e2) {
      return false;
    }
    var s2;
  }
  function Et(e) {
    if (e.initUniCloudStatus && e.initUniCloudStatus !== "rejected")
      return;
    let t2 = Promise.resolve();
    var n2;
    n2 = 1, t2 = new Promise((e2, t3) => {
      setTimeout(() => {
        e2();
      }, n2);
    }), e.isReady = false, e.isDefault = false;
    const s2 = e.auth();
    e.initUniCloudStatus = "pending", e.initUniCloud = t2.then(() => s2.getLoginState()).then((e2) => e2 ? Promise.resolve() : s2.signInAnonymously()).then(() => {
      if (e.debugInfo) {
        const { address: t3, servePort: n3 } = e.debugInfo;
        return async function(e2, t4) {
          let n4;
          for (let s3 = 0; s3 < e2.length; s3++) {
            const o2 = e2[s3];
            if (await Ct(o2, t4)) {
              n4 = o2;
              break;
            }
          }
          return { address: n4, port: t4 };
        }(t3, n3);
      }
    }).then(({ address: t3, port: n3 } = {}) => {
      if (t3)
        e.localAddress = t3, e.localPort = n3;
      else if (e.debugInfo) {
        const t4 = console["warn"];
        let n4 = "";
        e.debugInfo.initialLaunchType === "remote" ? (e.debugInfo.forceRemote = true, n4 = "\u5F53\u524D\u5BA2\u6237\u7AEF\u548CHBuilderX\u4E0D\u5728\u540C\u4E00\u5C40\u57DF\u7F51\u4E0B\uFF08\u6216\u5176\u4ED6\u7F51\u7EDC\u539F\u56E0\u65E0\u6CD5\u8FDE\u63A5HBuilderX\uFF09\uFF0CuniCloud\u672C\u5730\u8C03\u8BD5\u670D\u52A1\u4E0D\u5BF9\u5F53\u524D\u5BA2\u6237\u7AEF\u751F\u6548\u3002\n- \u5982\u679C\u4E0D\u4F7F\u7528uniCloud\u672C\u5730\u8C03\u8BD5\u670D\u52A1\uFF0C\u8BF7\u76F4\u63A5\u5FFD\u7565\u6B64\u4FE1\u606F\u3002\n- \u5982\u9700\u4F7F\u7528uniCloud\u672C\u5730\u8C03\u8BD5\u670D\u52A1\uFF0C\u8BF7\u5C06\u5BA2\u6237\u7AEF\u4E0E\u4E3B\u673A\u8FDE\u63A5\u5230\u540C\u4E00\u5C40\u57DF\u7F51\u4E0B\u5E76\u91CD\u65B0\u8FD0\u884C\u5230\u5BA2\u6237\u7AEF\u3002\n- \u5982\u679C\u5728HBuilderX\u5F00\u542F\u7684\u72B6\u6001\u4E0B\u5207\u6362\u8FC7\u7F51\u7EDC\u73AF\u5883\uFF0C\u8BF7\u91CD\u542FHBuilderX\u540E\u518D\u8BD5\n- \u68C0\u67E5\u7CFB\u7EDF\u9632\u706B\u5899\u662F\u5426\u62E6\u622A\u4E86HBuilderX\u81EA\u5E26\u7684nodejs") : n4 = "\u65E0\u6CD5\u8FDE\u63A5uniCloud\u672C\u5730\u8C03\u8BD5\u670D\u52A1\uFF0C\u8BF7\u68C0\u67E5\u5F53\u524D\u5BA2\u6237\u7AEF\u662F\u5426\u4E0E\u4E3B\u673A\u5728\u540C\u4E00\u5C40\u57DF\u7F51\u4E0B\u3002\n- \u5982\u9700\u4F7F\u7528uniCloud\u672C\u5730\u8C03\u8BD5\u670D\u52A1\uFF0C\u8BF7\u5C06\u5BA2\u6237\u7AEF\u4E0E\u4E3B\u673A\u8FDE\u63A5\u5230\u540C\u4E00\u5C40\u57DF\u7F51\u4E0B\u5E76\u91CD\u65B0\u8FD0\u884C\u5230\u5BA2\u6237\u7AEF\u3002\n- \u5982\u679C\u5728HBuilderX\u5F00\u542F\u7684\u72B6\u6001\u4E0B\u5207\u6362\u8FC7\u7F51\u7EDC\u73AF\u5883\uFF0C\u8BF7\u91CD\u542FHBuilderX\u540E\u518D\u8BD5\n- \u68C0\u67E5\u7CFB\u7EDF\u9632\u706B\u5899\u662F\u5426\u62E6\u622A\u4E86HBuilderX\u81EA\u5E26\u7684nodejs", t4(n4);
      }
    }).then(() => {
      e.isReady = true, e.initUniCloudStatus = "fulfilled";
    }).catch((t3) => {
      console.error(t3), e.initUniCloudStatus = "rejected";
    });
  }
  let Ut = new class {
    init(e) {
      let t2 = {};
      const n2 = e.debugFunction !== false && h && d === "app-plus";
      switch (e.provider) {
        case "tcb":
        case "tencent":
          t2 = Ye.init(Object.assign(e, { useDebugFunction: n2 }));
          break;
        case "aliyun":
          t2 = B.init(Object.assign(e, { useDebugFunction: n2 }));
          break;
        case "private":
          t2 = et.init(Object.assign(e, { useDebugFunction: n2 }));
          break;
        default:
          throw new Error("\u672A\u63D0\u4F9B\u6B63\u786E\u7684provider\u53C2\u6570");
      }
      const s2 = f;
      s2 && !s2.code && (t2.debugInfo = s2), Et(t2), t2.reInit = function() {
        Et(this);
      }, ct(t2), function(e2) {
        const t3 = e2.uploadFile;
        e2.uploadFile = function(e3) {
          return t3.call(this, e3);
        };
      }(t2), wt(t2), function(e2) {
        e2.getCurrentUserInfo = At, e2.chooseAndUploadFile = Pt.initChooseAndUploadFile(e2), Object.assign(e2, { get mixinDatacom() {
          return Ot(e2);
        } }), e2.importObject = bt(e2);
      }(t2);
      return ["callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile", "chooseAndUploadFile"].forEach((e2) => {
        if (!t2[e2])
          return;
        const n3 = t2[e2];
        t2[e2] = function() {
          return t2.reInit(), n3.apply(t2, Array.from(arguments));
        }, t2[e2] = R(t2[e2], e2).bind(t2);
      }), t2.init = this.init, t2;
    }
  }();
  (() => {
    {
      const e = p;
      let t2 = {};
      if (e.length === 1)
        t2 = e[0], Ut = Ut.init(t2), Ut.isDefault = true;
      else {
        const t3 = ["auth", "callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile", "database", "getCurrentUSerInfo", "importObject"];
        let n2;
        n2 = e && e.length > 0 ? "\u5E94\u7528\u6709\u591A\u4E2A\u670D\u52A1\u7A7A\u95F4\uFF0C\u8BF7\u901A\u8FC7uniCloud.init\u65B9\u6CD5\u6307\u5B9A\u8981\u4F7F\u7528\u7684\u670D\u52A1\u7A7A\u95F4" : "\u5E94\u7528\u672A\u5173\u8054\u670D\u52A1\u7A7A\u95F4\uFF0C\u8BF7\u5728uniCloud\u76EE\u5F55\u53F3\u952E\u5173\u8054\u670D\u52A1\u7A7A\u95F4", t3.forEach((e2) => {
          Ut[e2] = function() {
            return console.error(n2), Promise.reject(new x({ code: "SYS_ERR", message: n2 }));
          };
        });
      }
      Object.assign(Ut, { get mixinDatacom() {
        return Ot(Ut);
      } }), kt(Ut), Ut.addInterceptor = S, Ut.removeInterceptor = v;
    }
  })();
  var Rt = Ut;
  var en = {
    "uni-load-more.contentdown": "Pull up to show more",
    "uni-load-more.contentrefresh": "loading...",
    "uni-load-more.contentnomore": "No more data"
  };
  var zhHans = {
    "uni-load-more.contentdown": "\u4E0A\u62C9\u663E\u793A\u66F4\u591A",
    "uni-load-more.contentrefresh": "\u6B63\u5728\u52A0\u8F7D...",
    "uni-load-more.contentnomore": "\u6CA1\u6709\u66F4\u591A\u6570\u636E\u4E86"
  };
  var zhHant = {
    "uni-load-more.contentdown": "\u4E0A\u62C9\u986F\u793A\u66F4\u591A",
    "uni-load-more.contentrefresh": "\u6B63\u5728\u52A0\u8F09...",
    "uni-load-more.contentnomore": "\u6C92\u6709\u66F4\u591A\u6578\u64DA\u4E86"
  };
  var messages = {
    en,
    "zh-Hans": zhHans,
    "zh-Hant": zhHant
  };
  let platform;
  setTimeout(() => {
    platform = uni.getSystemInfoSync().platform;
  }, 16);
  const {
    t
  } = initVueI18n(messages);
  const _sfc_main$9 = {
    name: "UniLoadMore",
    emits: ["clickLoadMore"],
    props: {
      status: {
        type: String,
        default: "more"
      },
      showIcon: {
        type: Boolean,
        default: true
      },
      iconType: {
        type: String,
        default: "auto"
      },
      iconSize: {
        type: Number,
        default: 24
      },
      color: {
        type: String,
        default: "#777777"
      },
      contentText: {
        type: Object,
        default() {
          return {
            contentdown: "",
            contentrefresh: "",
            contentnomore: ""
          };
        }
      },
      showText: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        webviewHide: false,
        platform,
        imgBase64: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QzlBMzU3OTlEOUM0MTFFOUI0NTZDNERBQURBQzI4RkUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QzlBMzU3OUFEOUM0MTFFOUI0NTZDNERBQURBQzI4RkUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpDOUEzNTc5N0Q5QzQxMUU5QjQ1NkM0REFBREFDMjhGRSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpDOUEzNTc5OEQ5QzQxMUU5QjQ1NkM0REFBREFDMjhGRSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pt+ALSwAAA6CSURBVHja1FsLkFZVHb98LM+F5bHL8khA1iSeiyQBCRM+YGqKUnnJTDLGI0BGZlKDIU2MMglUiDApEZvSsZnQtBRJtKwQNKQMFYeRDR10WOLd8ljYXdh+v8v5fR3Od+797t1dnOnO/Ofce77z+J//+b/P+ZqtXbs2sJ9MJhNUV1cHJ06cCJo3bx7EPc2aNcvpy7pWrVoF+/fvDyoqKoI2bdoE9fX1F7TjN8a+EXBn/fkfvw942Tf+wYMHg9mzZwfjxo0LDhw4EPa1x2MbFw/fOGfPng1qa2tzcCkILsLDydq2bRsunpOTMM7TD/W/tZDZhPdeKD+yGxHhdu3aBV27dg3OnDlzMVANMheLAO3btw8KCwuDmpoaX5OxbgUIMEq7K8IcPnw4KCsrC/r37x8cP378/4cAXAB3vqSkJMuiDhTkw+XcuXNhOWbMmKBly5YhUT8xArhyFvP0BfwRsAuwxJZJsm/nzp2DTp06he/OU+cZ64K6o0ePBkOHDg2GDx8e6gEbJ5Q/NHNuAJQ1hgBeHUDlR7nVTkY8rQAvAi4z34vR/mPs1FoRsaCgIJThI0eOBC1atEiFGGV+5MiRoS45efJkqFjJFXV1dQuA012m2WcwTw98fy6CqBdsaiIO4CScrGPHjvk4odhavPquRtFWXEC25VgkREKOCh/qDSq+vn37htzD/mZTOmOc5U7zKzBPEedygWshcDyWvs30igAbU+6oyMgJBCFhwQE0fccxN60Ay9iebbjoDh06hMowjQxT4fXq1SskArmHZpkArvixp/kWzHdMeArExSJEaiXIjjRjRJ4DaAGWpibLzXN3Fm1vA5teBgh3j1Rv3bp1YgKwPdmf2p9zcyNYYgPKMfY0T5f5nNYdw158nJ8QawW4CLKwiOBSEgO/hok2eBydR+3dYH+PLxA5J8Vv0KBBwenTp0P2JWAx6+yFEBfs8lMY+y0SWMBNI9E4ThKi58VKTg3FQZS1RQF1cz27eC0QHMu+3E0SkUowjhVt5VdaWhp07949ZHv2Qd1EjDXM2cla1M0nl3GxAs3J9yREzyTdFVKVFOaE9qRA8GM0WebRuo9JGZKA7Mv2SeS/Z8+eoQ9BArMfFrLGo6jvxbhHbJZnKX2Rzz1O7QhJJ9Cs2ZMaWIyq/zhdeqPNfIoHd58clIQD+JSXl4dKlyIAuBdVXZwFVWKspSSoxE++h8x4k3uCnEhE4I5KwRiFWGOU0QWKiCYLbdoRMRKAu2kQ9vkfLU6dOhX06NEjlH+yMRZSinnuyWnYosVcji8CEA/6Cg2JF+IIUBqnGKUTCNwtwBN4f89RiK1R96DEgO2o0NDmtEdvVFdVVYV+P3UAPUEs6GFwV3PHmXkD4vh74iDFJysVI/MlaQhwKeBNTLYX5VuA8T4/gZxA4MRGFxDB6R7OmYPfyykGRJbyie+XnGYnQIC/coH9+vULiYrxrkL9ZA9+0ykaHIfEpM7ge8TiJ2CsHYwyMfafAF1yCGBHYIbCVDjDjKt7BeB51D+LgQa6OkG7IDYEEtvQ7lnXLKLtLdLuJBpE4gPUXcW2+PkZwOex+4cGDhwYDBkyRL7/HFcEwUGPo/8uWRUpYnfxGHco8HkewLHLyYmAawAPuIFZxhOpDfJQ8gbUv41yORAptMWBNr6oqMhWird5+u+iHmBb2nhjDV7HWBNQTgK8y11l5NetWzc5ULscAtSj7nbNI0skhWeUZCc0W4nyH/jO4Vz0u1IeYhbk4AiwM6tjxIWByHsoZ9qcIBPJd/y+DwPfBESOmCa/QF3WiZHucLlEDpNxcNhmheEOPgdQNx6/VZFQzFZ5TN08AHXQt2Ii3EdyFuUsPtTcGPhW5iMiCNELvz+Gdn9huG4HUJaW/w3g0wxV0XaG7arG2WeKiUWYM4Y7GO5ezshTARbbWGw/DvXkpp/ivVvE0JVoMxN4rpGzJMhE5Pl+xlATsDIqikP9F9D2z3h9nOksEUFhK+qO4rcPkoalMQ/HqJLIyb3F3JdjrCcw1yZ8joyJLR5gCo54etlag7qIoeNh1N1BRYj3DTFJ0elotxPlVzkGuYAmL0VSJVGAJA41c4Z6A3BzTLfn0HYwYKEI6CUAMzZEWvLsIcQOo1AmmyyM72nHJCfYsogflGV6jEk9vyQZXSuq6w4c16NsGcGZbwOPr+H1RkOk2LEzjNepxQkihHSCQ4ynAYNRx2zMKV92CQMWqj8J0BRE8EShxRFN6YrfCRhC0x3r/Zm4IbQCcmJoV0kMamllccR6FjHqUC5F2R/wS2dcymOlfAKOS4KmzQb5cpNC2MC7JhVn5wjXoJ44rYhLh8n0eXOCorJxa7POjbSlCGVczr34/RsAmrcvo9s+wGp3tzVhntxiXiJ4nvEYb4FJkf0O8HocAePmLvCxnL0AORraVekJk6TYjDabRVXfRE2lCN1h6ZQRN1+InUbsCpKwoBZHh0dODN9JBCUffItXxEavTQkUtnfTVAplCWL3JISz29h4NjotnuSsQKJCk8dF+kJR6RARjrqFVmfPnj3ZbK8cIJ0msd6jgHPGtfVTQ8VLmlvh4mct9sobRmPic0DyDQQnx/NlfYUgyz59+oScsH379pAwXABD32nTpoUHIToESeI5mnbE/UqDdyLcafEBf2MCqgC7NwxIbMREJQ0g4D4sfJwnD+AmRrII05cfMWJE+L1169bQr+fip06dGp4oJ83lmYd5wj/EmMa4TaHivo4EeCguYZBnkB5g2aWA69OIEnUHOaGysjIYMGBAMGnSpODYsWPZwCpFmm4lNq+4gSLQA7jcX8DwtjEyRC8wjabnXEx9kfWnTJkSJkAo90xpJVV+FmcVNeYAF5zWngS4C4O91MBxmAv8blLEpbjI5sz9MTdAhcgkCT1RO8mZkAjfiYpTEvStAS53Uw1vAiUGgZ3GpuQEYvoiBqlIan7kSDHnTwJQFNiPu0+5VxCVYhcZIjNrdXUDdp+Eq5AZ3Gkg8QAyVZRZIk4Tl4QAbF9cXJxNYZMAtAokgs4BrNxEpCtteXg7DDTMDKYNSuQdKsnJBek7HxewvxaosWxLYXtw+cJp18217wql4aKCfBNoEu0O5VU+PhctJ0YeXD4C6JQpyrlpSLTojpGGGN5YwNziChdIZLk4lvLcFJ9jMX3QdiImY9bmGQU+TRUL5CHITTRlgF8D9ouD1MfmLoEPl5xokIumZ2cfgMpHt47IW9N64Hsh7wQYYjyIugWuF5fCqYncXRd5vPMWyizzvhi/32+nvG0dZc9vR6fZOu0md5e+uC408FvKSIOZwXlGvxPv95izA2Vtvg1xKFWARI+vMX66HUhpQQb643uW1bSjuTWyw2SBvDrBvjFic1eGGlz5esq3ko9uSIlBRqPuFcCv8F4WIcN12nVaBd0SaYwI6PDDImR11JkqgHcPmQssjxIn6bUshygDFJUTxPMpHk+jfjPgupgdnYV2R/g7xSjtpah8RJBewhwf0gGK6XI92u4wXFEU40afJ4DN4h5LcAd+40HI3JgJecuT0c062W0i2hQJUTcxan3/CMW1PF2K6bbA+Daz4xRs1D3Br1Cm0OihKCqizW78/nXAF/G5TXrEcVzaNMH6CyMswqsAHqDyDLEyou8lwOXnKF8DjI6KjV3KzMBiXkDH8ij/H214J5A596ekrZ3F0zXlWeL7+P5eUrNo3/QwC15uxthuzidy7DzKRwEDaAViiDgKbTbz7CJnzo0bN7pIfIiid8SuPwn25o3QCmpnyjlZkyxPP8EomCJzrGb7GJMx7tNsq4MT2xMUYaiErZOluTzKsnz3gwCeCZyVRZJfYplNEokEjwrPtxlxjeYAk+F1F74VAzPxQRNYYdtpOUvWs8J1sGhBJMNsb7igN8plJs1eSmLIhLKE4rvaCX27gOhLpLOsIzJ7qn/i+wZzcvSOZ23/du8TZjwV8zHIXoP4R3ifBxiFz1dcVpa3aPntPE+c6TmIWE9EtcMmAcPdWAhYhAXxcLOQi9L1WhD1Sc8p1d2oL7XGiRKp8F4A2i8K/nfI+y/gsTDJ/YC/8+AD5Uh04KHiGl+cIFPnBDDrPMjwRGkLXyxO4VGbfQWnDH2v0bVWE3C9QOXlepbgjEfIJQI6XDG3z5ahD9cw2pS78ipB85wyScNTvsVzlzzhL8/jRrnmVjfFJK/m3m4nj9vbgQTguT8XZTjsm672R5uJKEaQmBI/c58gyus8ZDagLpEVSJBIyHp4jn++xqPV71OgQgJYEWOtZ/haxRtKmWOBu8xdBLftWltsY84zE6WIEy/eIOWL+BaayMx+KHtL7EAkqdNDLiEXmEMUHniedtJqg9HmZtfvt26vNi0BdG3Ft3g8ZOf7PAu59TxtzivLNIekyi+wD1i8CuUiD9FXAa8C+/xS3JPmZnomyc7H+fb4/Se0bk41Fel621r4cgVxbq91V4jVqwB7HTe2M7jgB+QWHavZkDRPmZcASoZEmBx6i75bGjPcMdL4/VKGFAGWZkGzPG0XAbdL9A81G5LOmUnC9hHKJeO7dcUMjblSl12867ElFTtaGl20xvvLGPdVz/8TVuU7y0x1PG7vtNg24oz9Uo/Z412++VFWI7Fcog9tu9Lm6gvRmIPv9x1xmQAu6RDkXtbOtlGEmpgD5Nvnyc0dcv0EE6cfdi1HmhMf9wDF3k3gtRvEedhxjpgfqPb9PU9iEJHnyOUA7bQUXh6kq/D7l2iTjWv7XOD530BDr8jIrus+srXjt4MzumJMHuTsBa63YKE1+RR5lBjEikCCnWKWiHdzOgKO+nRIBAF88za/IFmJ3eMZov4CYxGBabcpGL8EYx+SeMXJeRwHNsV/h+vdxeuhEpN3ZyNY78Gm2fknJxVGhyjixPiQvVkNzT1elD9Py/aTAL64Hb9vcYmC9zfdXdT/C1LeGbg4rnBaAihDFJH12W5ulfNCNe/xTsP3bp8ikzJs5BF+5PNfAQYAPaseTdsEcaYAAAAASUVORK5CYII="
      };
    },
    computed: {
      iconSnowWidth() {
        return (Math.floor(this.iconSize / 24) || 1) * 2;
      },
      contentdownText() {
        return this.contentText.contentdown || t("uni-load-more.contentdown");
      },
      contentrefreshText() {
        return this.contentText.contentrefresh || t("uni-load-more.contentrefresh");
      },
      contentnomoreText() {
        return this.contentText.contentnomore || t("uni-load-more.contentnomore");
      }
    },
    mounted() {
      var pages = getCurrentPages();
      var page = pages[pages.length - 1];
      var currentWebview = page.$getAppWebview();
      currentWebview.addEventListener("hide", () => {
        this.webviewHide = true;
      });
      currentWebview.addEventListener("show", () => {
        this.webviewHide = false;
      });
    },
    methods: {
      onClick() {
        this.$emit("clickLoadMore", {
          detail: {
            status: this.status
          }
        });
      }
    }
  };
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", {
      class: "uni-load-more",
      onClick: _cache[0] || (_cache[0] = (...args) => $options.onClick && $options.onClick(...args))
    }, [
      !$data.webviewHide && ($props.iconType === "circle" || $props.iconType === "auto" && $data.platform === "android") && $props.status === "loading" && $props.showIcon ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        style: vue.normalizeStyle({ width: $props.iconSize + "px", height: $props.iconSize + "px" }),
        class: "uni-load-more__img uni-load-more__img--android-MP"
      }, [
        vue.createElementVNode("view", {
          class: "uni-load-more__img-icon",
          style: vue.normalizeStyle({ borderTopColor: $props.color, borderTopWidth: $props.iconSize / 12 })
        }, null, 4),
        vue.createElementVNode("view", {
          class: "uni-load-more__img-icon",
          style: vue.normalizeStyle({ borderTopColor: $props.color, borderTopWidth: $props.iconSize / 12 })
        }, null, 4),
        vue.createElementVNode("view", {
          class: "uni-load-more__img-icon",
          style: vue.normalizeStyle({ borderTopColor: $props.color, borderTopWidth: $props.iconSize / 12 })
        }, null, 4)
      ], 4)) : !$data.webviewHide && $props.status === "loading" && $props.showIcon ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        style: vue.normalizeStyle({ width: $props.iconSize + "px", height: $props.iconSize + "px" }),
        class: "uni-load-more__img uni-load-more__img--ios-H5"
      }, [
        vue.createElementVNode("image", {
          src: $data.imgBase64,
          mode: "widthFix"
        }, null, 8, ["src"])
      ], 4)) : vue.createCommentVNode("v-if", true),
      $props.showText ? (vue.openBlock(), vue.createElementBlock("text", {
        key: 2,
        class: "uni-load-more__text",
        style: vue.normalizeStyle({ color: $props.color })
      }, vue.toDisplayString($props.status === "more" ? $options.contentdownText : $props.status === "loading" ? $options.contentrefreshText : $options.contentnomoreText), 5)) : vue.createCommentVNode("v-if", true)
    ]);
  }
  var __easycom_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$8], ["__scopeId", "data-v-90d4256a"], ["__file", "E:/\u5404\u7C7B\u6587\u4EF6/\u6BD5\u4E1A\u8BBE\u8BA1/uniapp/smartfish-app/uni_modules/uni-load-more/components/uni-load-more/uni-load-more.vue"]]);
  const _sfc_main$8 = {
    name: "uniDataChecklist",
    mixins: [Rt.mixinDatacom || {}],
    emits: ["input", "update:modelValue", "change"],
    props: {
      mode: {
        type: String,
        default: "default"
      },
      multiple: {
        type: Boolean,
        default: false
      },
      value: {
        type: [Array, String, Number],
        default() {
          return "";
        }
      },
      modelValue: {
        type: [Array, String, Number],
        default() {
          return "";
        }
      },
      localdata: {
        type: Array,
        default() {
          return [];
        }
      },
      min: {
        type: [Number, String],
        default: ""
      },
      max: {
        type: [Number, String],
        default: ""
      },
      wrap: {
        type: Boolean,
        default: false
      },
      icon: {
        type: String,
        default: "left"
      },
      selectedColor: {
        type: String,
        default: ""
      },
      selectedTextColor: {
        type: String,
        default: ""
      },
      emptyText: {
        type: String,
        default: "\u6682\u65E0\u6570\u636E"
      },
      disabled: {
        type: Boolean,
        default: false
      },
      map: {
        type: Object,
        default() {
          return {
            text: "text",
            value: "value"
          };
        }
      }
    },
    watch: {
      localdata: {
        handler(newVal) {
          this.range = newVal;
          this.dataList = this.getDataList(this.getSelectedValue(newVal));
        },
        deep: true
      },
      mixinDatacomResData(newVal) {
        this.range = newVal;
        this.dataList = this.getDataList(this.getSelectedValue(newVal));
      },
      value(newVal) {
        this.dataList = this.getDataList(newVal);
      },
      modelValue(newVal) {
        this.dataList = this.getDataList(newVal);
      }
    },
    data() {
      return {
        dataList: [],
        range: [],
        contentText: {
          contentdown: "\u67E5\u770B\u66F4\u591A",
          contentrefresh: "\u52A0\u8F7D\u4E2D",
          contentnomore: "\u6CA1\u6709\u66F4\u591A"
        },
        isLocal: true,
        styles: {
          selectedColor: "#2979ff",
          selectedTextColor: "#666"
        },
        isTop: 0
      };
    },
    computed: {
      dataValue() {
        if (this.value === "")
          return this.modelValue;
        if (this.modelValue === "")
          return this.value;
        return this.value;
      }
    },
    created() {
      if (this.localdata && this.localdata.length !== 0) {
        this.isLocal = true;
        this.range = this.localdata;
        this.dataList = this.getDataList(this.getSelectedValue(this.range));
      } else {
        if (this.collection) {
          this.isLocal = false;
          this.loadData();
        }
      }
    },
    methods: {
      loadData() {
        this.mixinDatacomGet().then((res) => {
          this.mixinDatacomResData = res.result.data;
          if (this.mixinDatacomResData.length === 0) {
            this.isLocal = false;
            this.mixinDatacomErrorMessage = this.emptyText;
          } else {
            this.isLocal = true;
          }
        }).catch((err) => {
          this.mixinDatacomErrorMessage = err.message;
        });
      },
      getForm(name = "uniForms") {
        let parent = this.$parent;
        let parentName = parent.$options.name;
        while (parentName !== name) {
          parent = parent.$parent;
          if (!parent)
            return false;
          parentName = parent.$options.name;
        }
        return parent;
      },
      chagne(e) {
        const values = e.detail.value;
        let detail = {
          value: [],
          data: []
        };
        if (this.multiple) {
          this.range.forEach((item) => {
            if (values.includes(item[this.map.value] + "")) {
              detail.value.push(item[this.map.value]);
              detail.data.push(item);
            }
          });
        } else {
          const range = this.range.find((item) => item[this.map.value] + "" === values);
          if (range) {
            detail = {
              value: range[this.map.value],
              data: range
            };
          }
        }
        this.$emit("input", detail.value);
        this.$emit("update:modelValue", detail.value);
        this.$emit("change", {
          detail
        });
        if (this.multiple) {
          this.dataList = this.getDataList(detail.value, true);
        } else {
          this.dataList = this.getDataList(detail.value);
        }
      },
      getDataList(value) {
        let dataList = JSON.parse(JSON.stringify(this.range));
        let list = [];
        if (this.multiple) {
          if (!Array.isArray(value)) {
            value = [];
          }
        }
        dataList.forEach((item, index) => {
          item.disabled = item.disable || item.disabled || false;
          if (this.multiple) {
            if (value.length > 0) {
              let have = value.find((val) => val === item[this.map.value]);
              item.selected = have !== void 0;
            } else {
              item.selected = false;
            }
          } else {
            item.selected = value === item[this.map.value];
          }
          list.push(item);
        });
        return this.setRange(list);
      },
      setRange(list) {
        let selectList = list.filter((item) => item.selected);
        let min = Number(this.min) || 0;
        let max = Number(this.max) || "";
        list.forEach((item, index) => {
          if (this.multiple) {
            if (selectList.length <= min) {
              let have = selectList.find((val) => val[this.map.value] === item[this.map.value]);
              if (have !== void 0) {
                item.disabled = true;
              }
            }
            if (selectList.length >= max && max !== "") {
              let have = selectList.find((val) => val[this.map.value] === item[this.map.value]);
              if (have === void 0) {
                item.disabled = true;
              }
            }
          }
          this.setStyles(item, index);
          list[index] = item;
        });
        return list;
      },
      setStyles(item, index) {
        item.styleBackgroud = this.setStyleBackgroud(item);
        item.styleIcon = this.setStyleIcon(item);
        item.styleIconText = this.setStyleIconText(item);
        item.styleRightIcon = this.setStyleRightIcon(item);
      },
      getSelectedValue(range) {
        if (!this.multiple)
          return this.dataValue;
        let selectedArr = [];
        range.forEach((item) => {
          if (item.selected) {
            selectedArr.push(item[this.map.value]);
          }
        });
        return this.dataValue.length > 0 ? this.dataValue : selectedArr;
      },
      setStyleBackgroud(item) {
        let styles = {};
        let selectedColor = this.selectedColor ? this.selectedColor : "#2979ff";
        if (this.selectedColor) {
          if (this.mode !== "list") {
            styles["border-color"] = item.selected ? selectedColor : "#DCDFE6";
          }
          if (this.mode === "tag") {
            styles["background-color"] = item.selected ? selectedColor : "#f5f5f5";
          }
        }
        let classles = "";
        for (let i2 in styles) {
          classles += `${i2}:${styles[i2]};`;
        }
        return classles;
      },
      setStyleIcon(item) {
        let styles = {};
        let classles = "";
        if (this.selectedColor) {
          let selectedColor = this.selectedColor ? this.selectedColor : "#2979ff";
          styles["background-color"] = item.selected ? selectedColor : "#fff";
          styles["border-color"] = item.selected ? selectedColor : "#DCDFE6";
          if (!item.selected && item.disabled) {
            styles["background-color"] = "#F2F6FC";
            styles["border-color"] = item.selected ? selectedColor : "#DCDFE6";
          }
        }
        for (let i2 in styles) {
          classles += `${i2}:${styles[i2]};`;
        }
        return classles;
      },
      setStyleIconText(item) {
        let styles = {};
        let classles = "";
        if (this.selectedColor) {
          let selectedColor = this.selectedColor ? this.selectedColor : "#2979ff";
          if (this.mode === "tag") {
            styles.color = item.selected ? this.selectedTextColor ? this.selectedTextColor : "#fff" : "#666";
          } else {
            styles.color = item.selected ? this.selectedTextColor ? this.selectedTextColor : selectedColor : "#666";
          }
          if (!item.selected && item.disabled) {
            styles.color = "#999";
          }
        }
        for (let i2 in styles) {
          classles += `${i2}:${styles[i2]};`;
        }
        return classles;
      },
      setStyleRightIcon(item) {
        let styles = {};
        let classles = "";
        if (this.mode === "list") {
          styles["border-color"] = item.selected ? this.styles.selectedColor : "#DCDFE6";
        }
        for (let i2 in styles) {
          classles += `${i2}:${styles[i2]};`;
        }
        return classles;
      }
    }
  };
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_load_more = resolveEasycom(vue.resolveDynamicComponent("uni-load-more"), __easycom_0$1);
    return vue.openBlock(), vue.createElementBlock("view", {
      class: "uni-data-checklist",
      style: vue.normalizeStyle({ "margin-top": $data.isTop + "px" })
    }, [
      !$data.isLocal ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "uni-data-loading"
      }, [
        !_ctx.mixinDatacomErrorMessage ? (vue.openBlock(), vue.createBlock(_component_uni_load_more, {
          key: 0,
          status: "loading",
          iconType: "snow",
          iconSize: 18,
          "content-text": $data.contentText
        }, null, 8, ["content-text"])) : (vue.openBlock(), vue.createElementBlock("text", { key: 1 }, vue.toDisplayString(_ctx.mixinDatacomErrorMessage), 1))
      ])) : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
        $props.multiple ? (vue.openBlock(), vue.createElementBlock("checkbox-group", {
          key: 0,
          class: vue.normalizeClass(["checklist-group", { "is-list": $props.mode === "list" || $props.wrap }]),
          onChange: _cache[0] || (_cache[0] = (...args) => $options.chagne && $options.chagne(...args))
        }, [
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($data.dataList, (item, index) => {
            return vue.openBlock(), vue.createElementBlock("label", {
              class: vue.normalizeClass(["checklist-box", ["is--" + $props.mode, item.selected ? "is-checked" : "", $props.disabled || !!item.disabled ? "is-disable" : "", index !== 0 && $props.mode === "list" ? "is-list-border" : ""]]),
              style: vue.normalizeStyle(item.styleBackgroud),
              key: index
            }, [
              vue.createElementVNode("checkbox", {
                class: "hidden",
                hidden: "",
                disabled: $props.disabled || !!item.disabled,
                value: item[$props.map.value] + "",
                checked: item.selected
              }, null, 8, ["disabled", "value", "checked"]),
              $props.mode !== "tag" && $props.mode !== "list" || $props.mode === "list" && $props.icon === "left" ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "checkbox__inner",
                style: vue.normalizeStyle(item.styleIcon)
              }, [
                vue.createElementVNode("view", { class: "checkbox__inner-icon" })
              ], 4)) : vue.createCommentVNode("v-if", true),
              vue.createElementVNode("view", {
                class: vue.normalizeClass(["checklist-content", { "list-content": $props.mode === "list" && $props.icon === "left" }])
              }, [
                vue.createElementVNode("text", {
                  class: "checklist-text",
                  style: vue.normalizeStyle(item.styleIconText)
                }, vue.toDisplayString(item[$props.map.text]), 5),
                $props.mode === "list" && $props.icon === "right" ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 0,
                  class: "checkobx__list",
                  style: vue.normalizeStyle(item.styleBackgroud)
                }, null, 4)) : vue.createCommentVNode("v-if", true)
              ], 2)
            ], 6);
          }), 128))
        ], 34)) : (vue.openBlock(), vue.createElementBlock("radio-group", {
          key: 1,
          class: vue.normalizeClass(["checklist-group", { "is-list": $props.mode === "list", "is-wrap": $props.wrap }]),
          onChange: _cache[1] || (_cache[1] = (...args) => $options.chagne && $options.chagne(...args))
        }, [
          vue.createCommentVNode(" "),
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($data.dataList, (item, index) => {
            return vue.openBlock(), vue.createElementBlock("label", {
              class: vue.normalizeClass(["checklist-box", ["is--" + $props.mode, item.selected ? "is-checked" : "", $props.disabled || !!item.disabled ? "is-disable" : "", index !== 0 && $props.mode === "list" ? "is-list-border" : ""]]),
              style: vue.normalizeStyle(item.styleBackgroud),
              key: index
            }, [
              vue.createElementVNode("radio", {
                class: "hidden",
                hidden: "",
                disabled: $props.disabled || item.disabled,
                value: item[$props.map.value] + "",
                checked: item.selected
              }, null, 8, ["disabled", "value", "checked"]),
              $props.mode !== "tag" && $props.mode !== "list" || $props.mode === "list" && $props.icon === "left" ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "radio__inner",
                style: vue.normalizeStyle(item.styleBackgroud)
              }, [
                vue.createElementVNode("view", {
                  class: "radio__inner-icon",
                  style: vue.normalizeStyle(item.styleIcon)
                }, null, 4)
              ], 4)) : vue.createCommentVNode("v-if", true),
              vue.createElementVNode("view", {
                class: vue.normalizeClass(["checklist-content", { "list-content": $props.mode === "list" && $props.icon === "left" }])
              }, [
                vue.createElementVNode("text", {
                  class: "checklist-text",
                  style: vue.normalizeStyle(item.styleIconText)
                }, vue.toDisplayString(item[$props.map.text]), 5),
                $props.mode === "list" && $props.icon === "right" ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 0,
                  style: vue.normalizeStyle(item.styleRightIcon),
                  class: "checkobx__list"
                }, null, 4)) : vue.createCommentVNode("v-if", true)
              ], 2)
            ], 6);
          }), 128))
        ], 34))
      ], 2112))
    ], 4);
  }
  var __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$7], ["__scopeId", "data-v-84d5d996"], ["__file", "E:/\u5404\u7C7B\u6587\u4EF6/\u6BD5\u4E1A\u8BBE\u8BA1/uniapp/smartfish-app/uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.vue"]]);
  const _sfc_main$7 = {
    name: "uniTh",
    options: {
      virtualHost: true
    },
    components: {},
    emits: ["sort-change", "filter-change"],
    props: {
      width: {
        type: [String, Number],
        default: ""
      },
      align: {
        type: String,
        default: "left"
      },
      rowspan: {
        type: [Number, String],
        default: 1
      },
      colspan: {
        type: [Number, String],
        default: 1
      },
      sortable: {
        type: Boolean,
        default: false
      },
      filterType: {
        type: String,
        default: ""
      },
      filterData: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    data() {
      return {
        border: false,
        ascending: false,
        descending: false
      };
    },
    computed: {
      customWidth() {
        if (typeof this.width === "number") {
          return this.width;
        } else if (typeof this.width === "string") {
          let regexHaveUnitPx = new RegExp(/^[1-9][0-9]*px$/g);
          let regexHaveUnitRpx = new RegExp(/^[1-9][0-9]*rpx$/g);
          let regexHaveNotUnit = new RegExp(/^[1-9][0-9]*$/g);
          if (this.width.match(regexHaveUnitPx) !== null) {
            return this.width.replace("px", "");
          } else if (this.width.match(regexHaveUnitRpx) !== null) {
            let numberRpx = Number(this.width.replace("rpx", ""));
            let widthCoe = uni.getSystemInfoSync().screenWidth / 750;
            return Math.round(numberRpx * widthCoe);
          } else if (this.width.match(regexHaveNotUnit) !== null) {
            return this.width;
          } else {
            return "";
          }
        } else {
          return "";
        }
      },
      contentAlign() {
        let align = "left";
        switch (this.align) {
          case "left":
            align = "flex-start";
            break;
          case "center":
            align = "center";
            break;
          case "right":
            align = "flex-end";
            break;
        }
        return align;
      }
    },
    created() {
      this.root = this.getTable("uniTable");
      this.rootTr = this.getTable("uniTr");
      this.rootTr.minWidthUpdate(this.customWidth ? this.customWidth : 140);
      this.border = this.root.border;
      this.root.thChildren.push(this);
    },
    methods: {
      sort() {
        if (!this.sortable)
          return;
        this.clearOther();
        if (!this.ascending && !this.descending) {
          this.ascending = true;
          this.$emit("sort-change", { order: "ascending" });
          return;
        }
        if (this.ascending && !this.descending) {
          this.ascending = false;
          this.descending = true;
          this.$emit("sort-change", { order: "descending" });
          return;
        }
        if (!this.ascending && this.descending) {
          this.ascending = false;
          this.descending = false;
          this.$emit("sort-change", { order: null });
        }
      },
      ascendingFn() {
        this.clearOther();
        this.ascending = !this.ascending;
        this.descending = false;
        this.$emit("sort-change", { order: this.ascending ? "ascending" : null });
      },
      descendingFn() {
        this.clearOther();
        this.descending = !this.descending;
        this.ascending = false;
        this.$emit("sort-change", { order: this.descending ? "descending" : null });
      },
      clearOther() {
        this.root.thChildren.map((item) => {
          if (item !== this) {
            item.ascending = false;
            item.descending = false;
          }
          return item;
        });
      },
      ondropdown(e) {
        this.$emit("filter-change", e);
      },
      getTable(name) {
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
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", {
      class: vue.normalizeClass(["uni-table-th", { "table--border": $data.border }]),
      style: vue.normalizeStyle({ width: $options.customWidth + "px", "text-align": $props.align })
    }, [
      vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
    ], 6);
  }
  var __easycom_1 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$6], ["__scopeId", "data-v-511e81f9"], ["__file", "E:/\u5404\u7C7B\u6587\u4EF6/\u6BD5\u4E1A\u8BBE\u8BA1/uniapp/smartfish-app/uni_modules/uni-table/components/uni-th/uni-th.vue"]]);
  const _sfc_main$6 = {
    name: "TableCheckbox",
    emits: ["checkboxSelected"],
    props: {
      indeterminate: {
        type: Boolean,
        default: false
      },
      checked: {
        type: [Boolean, String],
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      index: {
        type: Number,
        default: -1
      },
      cellData: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    watch: {
      checked(newVal) {
        if (typeof this.checked === "boolean") {
          this.isChecked = newVal;
        } else {
          this.isChecked = true;
        }
      },
      indeterminate(newVal) {
        this.isIndeterminate = newVal;
      }
    },
    data() {
      return {
        isChecked: false,
        isDisabled: false,
        isIndeterminate: false
      };
    },
    created() {
      if (typeof this.checked === "boolean") {
        this.isChecked = this.checked;
      }
      this.isDisabled = this.disabled;
    },
    methods: {
      selected() {
        if (this.isDisabled)
          return;
        this.isIndeterminate = false;
        this.isChecked = !this.isChecked;
        this.$emit("checkboxSelected", {
          checked: this.isChecked,
          data: this.cellData
        });
      }
    }
  };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", {
      class: "uni-table-checkbox",
      onClick: _cache[0] || (_cache[0] = (...args) => $options.selected && $options.selected(...args))
    }, [
      !$props.indeterminate ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: vue.normalizeClass(["checkbox__inner", { "is-checked": $data.isChecked, "is-disable": $data.isDisabled }])
      }, [
        vue.createElementVNode("view", { class: "checkbox__inner-icon" })
      ], 2)) : (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "checkbox__inner checkbox--indeterminate"
      }, [
        vue.createElementVNode("view", { class: "checkbox__inner-icon" })
      ]))
    ]);
  }
  var tableCheckbox = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$5], ["__scopeId", "data-v-68100fa0"], ["__file", "E:/\u5404\u7C7B\u6587\u4EF6/\u6BD5\u4E1A\u8BBE\u8BA1/uniapp/smartfish-app/uni_modules/uni-table/components/uni-tr/table-checkbox.vue"]]);
  const _sfc_main$5 = {
    name: "uniTr",
    components: { tableCheckbox },
    props: {
      disabled: {
        type: Boolean,
        default: false
      },
      keyValue: {
        type: [String, Number],
        default: ""
      }
    },
    options: {
      virtualHost: true
    },
    data() {
      return {
        value: false,
        border: false,
        selection: false,
        widthThArr: [],
        ishead: true,
        checked: false,
        indeterminate: false
      };
    },
    created() {
      this.root = this.getTable();
      this.head = this.getTable("uniThead");
      if (this.head) {
        this.ishead = false;
        this.head.init(this);
      }
      this.border = this.root.border;
      this.selection = this.root.type;
      this.root.trChildren.push(this);
      const rowData = this.root.data.find((v2) => v2[this.root.rowKey] === this.keyValue);
      if (rowData) {
        this.rowData = rowData;
      }
      this.root.isNodata();
    },
    mounted() {
      if (this.widthThArr.length > 0) {
        const selectionWidth = this.selection === "selection" ? 50 : 0;
        this.root.minWidth = this.widthThArr.reduce((a2, b2) => Number(a2) + Number(b2)) + selectionWidth;
      }
    },
    unmounted() {
      const index = this.root.trChildren.findIndex((i2) => i2 === this);
      this.root.trChildren.splice(index, 1);
      this.root.isNodata();
    },
    methods: {
      minWidthUpdate(width) {
        this.widthThArr.push(width);
      },
      checkboxSelected(e) {
        let rootData = this.root.data.find((v2) => v2[this.root.rowKey] === this.keyValue);
        this.checked = e.checked;
        this.root.check(rootData || this, e.checked, rootData ? this.keyValue : null);
      },
      change(e) {
        this.root.trChildren.forEach((item) => {
          if (item === this) {
            this.root.check(this, e.detail.value.length > 0 ? true : false);
          }
        });
      },
      getTable(name = "uniTable") {
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
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_table_checkbox = vue.resolveComponent("table-checkbox");
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-table-tr" }, [
      $data.selection === "selection" ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: vue.normalizeClass(["checkbox", { "tr-table--border": $data.border }])
      }, [
        vue.createVNode(_component_table_checkbox, {
          checked: $data.checked,
          indeterminate: $data.indeterminate,
          disabled: $props.disabled,
          onCheckboxSelected: $options.checkboxSelected
        }, null, 8, ["checked", "indeterminate", "disabled", "onCheckboxSelected"])
      ], 2)) : vue.createCommentVNode("v-if", true),
      vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
    ]);
  }
  var __easycom_2 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$4], ["__scopeId", "data-v-c2c83a8e"], ["__file", "E:/\u5404\u7C7B\u6587\u4EF6/\u6BD5\u4E1A\u8BBE\u8BA1/uniapp/smartfish-app/uni_modules/uni-table/components/uni-tr/uni-tr.vue"]]);
  const _sfc_main$4 = {
    name: "uniTd",
    options: {
      virtualHost: true
    },
    props: {
      width: {
        type: [String, Number],
        default: ""
      },
      align: {
        type: String,
        default: "left"
      },
      rowspan: {
        type: [Number, String],
        default: 1
      },
      colspan: {
        type: [Number, String],
        default: 1
      }
    },
    data() {
      return {
        border: false
      };
    },
    created() {
      this.root = this.getTable();
      this.border = this.root.border;
    },
    methods: {
      getTable() {
        let parent = this.$parent;
        let parentName = parent.$options.name;
        while (parentName !== "uniTable") {
          parent = parent.$parent;
          if (!parent)
            return false;
          parentName = parent.$options.name;
        }
        return parent;
      }
    }
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
      vue.createCommentVNode(` :class="{'table--border':border}"  `),
      vue.createElementVNode("view", {
        class: vue.normalizeClass(["uni-table-td", { "table--border": $data.border }]),
        style: vue.normalizeStyle({ width: $props.width + "px", "text-align": $props.align })
      }, [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ], 6)
    ], 2112);
  }
  var __easycom_3 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$3], ["__scopeId", "data-v-321f8e79"], ["__file", "E:/\u5404\u7C7B\u6587\u4EF6/\u6BD5\u4E1A\u8BBE\u8BA1/uniapp/smartfish-app/uni_modules/uni-table/components/uni-td/uni-td.vue"]]);
  const _sfc_main$3 = {
    name: "uniTable",
    options: {
      virtualHost: true
    },
    emits: ["selection-change"],
    props: {
      data: {
        type: Array,
        default() {
          return [];
        }
      },
      border: {
        type: Boolean,
        default: false
      },
      stripe: {
        type: Boolean,
        default: false
      },
      type: {
        type: String,
        default: ""
      },
      emptyText: {
        type: String,
        default: "\u6CA1\u6709\u66F4\u591A\u6570\u636E"
      },
      loading: {
        type: Boolean,
        default: false
      },
      rowKey: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        noData: true,
        minWidth: 0,
        multiTableHeads: []
      };
    },
    watch: {
      loading(val) {
      },
      data(newVal) {
        this.theadChildren;
        if (this.theadChildren) {
          this.theadChildren.rowspan;
        }
        this.noData = false;
      }
    },
    created() {
      this.trChildren = [];
      this.thChildren = [];
      this.theadChildren = null;
      this.backData = [];
      this.backIndexData = [];
    },
    methods: {
      isNodata() {
        this.theadChildren;
        let rowspan = 1;
        if (this.theadChildren) {
          rowspan = this.theadChildren.rowspan;
        }
        this.noData = this.trChildren.length - rowspan <= 0;
      },
      selectionAll() {
        let startIndex = 1;
        let theadChildren = this.theadChildren;
        if (!this.theadChildren) {
          theadChildren = this.trChildren[0];
        } else {
          startIndex = theadChildren.rowspan - 1;
        }
        let isHaveData = this.data && this.data.length.length > 0;
        theadChildren.checked = true;
        theadChildren.indeterminate = false;
        this.trChildren.forEach((item, index) => {
          if (!item.disabled) {
            item.checked = true;
            if (isHaveData && item.keyValue) {
              const row = this.data.find((v2) => v2[this.rowKey] === item.keyValue);
              if (!this.backData.find((v2) => v2[this.rowKey] === row[this.rowKey])) {
                this.backData.push(row);
              }
            }
            if (index > startIndex - 1 && this.backIndexData.indexOf(index - startIndex) === -1) {
              this.backIndexData.push(index - startIndex);
            }
          }
        });
        this.$emit("selection-change", {
          detail: {
            value: this.backData,
            index: this.backIndexData
          }
        });
      },
      toggleRowSelection(row, selected) {
        row = [].concat(row);
        this.trChildren.forEach((item, index) => {
          const select = row.findIndex((v2) => {
            if (typeof v2 === "number") {
              return v2 === index - 1;
            } else {
              return v2[this.rowKey] === item.keyValue;
            }
          });
          let ischeck = item.checked;
          if (select !== -1) {
            if (typeof selected === "boolean") {
              item.checked = selected;
            } else {
              item.checked = !item.checked;
            }
            if (ischeck !== item.checked) {
              this.check(item.rowData || item, item.checked, item.rowData ? item.keyValue : null, true);
            }
          }
        });
        this.$emit("selection-change", {
          detail: {
            value: this.backData,
            index: this.backIndexData
          }
        });
      },
      clearSelection() {
        let theadChildren = this.theadChildren;
        if (!this.theadChildren) {
          theadChildren = this.trChildren[0];
        }
        theadChildren.checked = false;
        theadChildren.indeterminate = false;
        this.trChildren.forEach((item) => {
          item.checked = false;
        });
        this.backData = [];
        this.backIndexData = [];
        this.$emit("selection-change", {
          detail: {
            value: [],
            index: []
          }
        });
      },
      toggleAllSelection() {
        let list = [];
        let startIndex = 1;
        let theadChildren = this.theadChildren;
        if (!this.theadChildren) {
          theadChildren = this.trChildren[0];
        } else {
          startIndex = theadChildren.rowspan - 1;
        }
        this.trChildren.forEach((item, index) => {
          if (!item.disabled) {
            if (index > startIndex - 1) {
              list.push(index - startIndex);
            }
          }
        });
        this.toggleRowSelection(list);
      },
      check(child, check, keyValue, emit) {
        let theadChildren = this.theadChildren;
        if (!this.theadChildren) {
          theadChildren = this.trChildren[0];
        }
        let childDomIndex = this.trChildren.findIndex((item, index) => child === item);
        if (childDomIndex < 0) {
          childDomIndex = this.data.findIndex((v2) => v2[this.rowKey] === keyValue) + 1;
        }
        this.trChildren.filter((v2) => !v2.disabled && v2.keyValue).length;
        if (childDomIndex === 0) {
          check ? this.selectionAll() : this.clearSelection();
          return;
        }
        if (check) {
          if (keyValue) {
            this.backData.push(child);
          }
          this.backIndexData.push(childDomIndex - 1);
        } else {
          const index = this.backData.findIndex((v2) => v2[this.rowKey] === keyValue);
          const idx = this.backIndexData.findIndex((item) => item === childDomIndex - 1);
          if (keyValue) {
            this.backData.splice(index, 1);
          }
          this.backIndexData.splice(idx, 1);
        }
        const domCheckAll = this.trChildren.find((item, index) => index > 0 && !item.checked && !item.disabled);
        if (!domCheckAll) {
          theadChildren.indeterminate = false;
          theadChildren.checked = true;
        } else {
          theadChildren.indeterminate = true;
          theadChildren.checked = false;
        }
        if (this.backIndexData.length === 0) {
          theadChildren.indeterminate = false;
        }
        if (!emit) {
          this.$emit("selection-change", {
            detail: {
              value: this.backData,
              index: this.backIndexData
            }
          });
        }
      }
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", {
      class: vue.normalizeClass(["uni-table-scroll", { "table--border": $props.border, "border-none": !$data.noData }])
    }, [
      vue.createElementVNode("view", {
        class: vue.normalizeClass(["uni-table", { "table--stripe": $props.stripe }]),
        style: vue.normalizeStyle({ "min-width": $data.minWidth + "px" })
      }, [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true),
        $data.noData ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "uni-table-loading"
        }, [
          vue.createElementVNode("view", {
            class: vue.normalizeClass(["uni-table-text", { "empty-border": $props.border }])
          }, vue.toDisplayString($props.emptyText), 3)
        ])) : vue.createCommentVNode("v-if", true),
        $props.loading ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 1,
          class: vue.normalizeClass(["uni-table-mask", { "empty-border": $props.border }])
        }, [
          vue.createElementVNode("div", { class: "uni-table--loader" })
        ], 2)) : vue.createCommentVNode("v-if", true)
      ], 6)
    ], 2);
  }
  var __easycom_4 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["__scopeId", "data-v-6cd49106"], ["__file", "E:/\u5404\u7C7B\u6587\u4EF6/\u6BD5\u4E1A\u8BBE\u8BA1/uniapp/smartfish-app/uni_modules/uni-table/components/uni-table/uni-table.vue"]]);
  const _sfc_main$2 = {
    setup(props, context) {
      const historyArray = vue.ref([]);
      const value = vue.ref(0);
      const range = [{ "value": "light", "text": "\u706F\u5E26" }, { "value": "pump", "text": "\u6C34\u6CF5" }, { "value": "feed", "text": "\u8235\u673A" }, { "value": "quality", "text": "\u6C34\u8D28" }, { "value": "temp", "text": "\u6E29\u5EA6" }, { "value": "time", "text": "\u65F6\u95F4" }, { "value": "1", "text": "\u5168\u90E8" }];
      onReady(() => {
        uni.request({
          url: "http://192.168.43.218:8888/history",
          method: "POST",
          success(res) {
            historyArray.value = res.data;
            historyArray.value.forEach((e) => {
              if (e.light == "0") {
                e.light = "\u5173\u95ED";
              } else {
                e.light = "\u5F00\u542F";
              }
              if (e.pump == "0") {
                e.pump = "\u5173\u95ED";
              } else {
                e.pump = "\u5F00\u542F";
              }
              if (e.feed == "0") {
                e.feed = "\u5173\u95ED";
              } else {
                e.feed = "\u5F00\u542F";
              }
            });
            formatAppLog("log", "at pages/history/history.vue:83", historyArray.value);
          }
        });
      });
      const change = (e) => {
        formatAppLog("log", "at pages/history/history.vue:88", e.detail.value);
      };
      const timeShift = (timestamp) => {
        var date = new Date(timestamp);
        var Y2 = date.getFullYear() + "-";
        var M2 = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-";
        var D2 = date.getDate() + " ";
        var h2 = (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
        var m2 = (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) + ":";
        var s2 = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        return Y2 + M2 + D2 + h2 + m2 + s2;
      };
      return {
        historyArray,
        timeShift,
        range,
        value,
        change
      };
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_data_checkbox = resolveEasycom(vue.resolveDynamicComponent("uni-data-checkbox"), __easycom_0);
    const _component_uni_th = resolveEasycom(vue.resolveDynamicComponent("uni-th"), __easycom_1);
    const _component_uni_tr = resolveEasycom(vue.resolveDynamicComponent("uni-tr"), __easycom_2);
    const _component_uni_td = resolveEasycom(vue.resolveDynamicComponent("uni-td"), __easycom_3);
    const _component_uni_table = resolveEasycom(vue.resolveDynamicComponent("uni-table"), __easycom_4);
    return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
      vue.createVNode(_component_uni_data_checkbox, {
        modelValue: $setup.value,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.value = $event),
        localdata: $setup.range,
        onChange: $setup.change
      }, null, 8, ["modelValue", "localdata", "onChange"]),
      vue.createElementVNode("view", { class: "uni-container" }, [
        vue.createVNode(_component_uni_table, {
          ref: "table",
          loading: _ctx.loading,
          border: "",
          stripe: "",
          emptyText: "\u6682\u65E0\u66F4\u591A\u6570\u636E",
          onSelectionChange: _ctx.selectionChange
        }, {
          default: vue.withCtx(() => [
            vue.createVNode(_component_uni_tr, null, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_uni_th, {
                  width: "150",
                  align: "center"
                }, {
                  default: vue.withCtx(() => [
                    vue.createTextVNode("\u706F\u5E26")
                  ]),
                  _: 1
                }),
                vue.createVNode(_component_uni_th, {
                  width: "150",
                  align: "center"
                }, {
                  default: vue.withCtx(() => [
                    vue.createTextVNode("\u6C34\u6CF5")
                  ]),
                  _: 1
                }),
                vue.createVNode(_component_uni_th, { align: "center" }, {
                  default: vue.withCtx(() => [
                    vue.createTextVNode("\u8235\u673A")
                  ]),
                  _: 1
                }),
                vue.createVNode(_component_uni_th, { align: "center" }, {
                  default: vue.withCtx(() => [
                    vue.createTextVNode("\u6C34\u8D28")
                  ]),
                  _: 1
                }),
                vue.createVNode(_component_uni_th, { align: "center" }, {
                  default: vue.withCtx(() => [
                    vue.createTextVNode("\u6E29\u5EA6")
                  ]),
                  _: 1
                }),
                vue.createVNode(_component_uni_th, {
                  width: "204",
                  align: "center"
                }, {
                  default: vue.withCtx(() => [
                    vue.createTextVNode("\u65F6\u95F4")
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }),
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($setup.historyArray, (item, index) => {
              return vue.openBlock(), vue.createBlock(_component_uni_tr, { key: index }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uni_td, { align: "center" }, {
                    default: vue.withCtx(() => [
                      vue.createTextVNode(vue.toDisplayString(item.temp), 1)
                    ]),
                    _: 2
                  }, 1024),
                  vue.createVNode(_component_uni_td, { align: "center" }, {
                    default: vue.withCtx(() => [
                      vue.createTextVNode(vue.toDisplayString(item.quality), 1)
                    ]),
                    _: 2
                  }, 1024),
                  vue.createVNode(_component_uni_td, { align: "center" }, {
                    default: vue.withCtx(() => [
                      vue.createTextVNode(vue.toDisplayString(item.pump), 1)
                    ]),
                    _: 2
                  }, 1024),
                  vue.createVNode(_component_uni_td, { align: "center" }, {
                    default: vue.withCtx(() => [
                      vue.createTextVNode(vue.toDisplayString(item.feed), 1)
                    ]),
                    _: 2
                  }, 1024),
                  vue.createVNode(_component_uni_td, { align: "center" }, {
                    default: vue.withCtx(() => [
                      vue.createTextVNode(vue.toDisplayString(item.light), 1)
                    ]),
                    _: 2
                  }, 1024),
                  vue.createVNode(_component_uni_td, { align: "center" }, {
                    default: vue.withCtx(() => [
                      vue.createTextVNode(vue.toDisplayString($setup.timeShift(item.time)), 1)
                    ]),
                    _: 2
                  }, 1024)
                ]),
                _: 2
              }, 1024);
            }), 128))
          ]),
          _: 1
        }, 8, ["loading", "onSelectionChange"])
      ])
    ], 64);
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
