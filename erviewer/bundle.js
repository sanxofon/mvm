!(function e(t, n, r) {
  function i(o, f) {
    if (!n[o]) {
      if (!t[o]) {
        var u = "function" == typeof require && require;
        if (!f && u) return u(o, !0);
        if (a) return a(o, !0);
        var s = new Error("Cannot find module '" + o + "'");
        throw ((s.code = "MODULE_NOT_FOUND"), s);
      }
      var c = (n[o] = { exports: {} });
      t[o][0].call(
        c.exports,
        function (e) {
          var n = t[o][1][e];
          return i(n || e);
        },
        c,
        c.exports,
        e,
        t,
        n,
        r
      );
    }
    return n[o].exports;
  }
  for (
    var a = "function" == typeof require && require, o = 0;
    o < r.length;
    o++
  )
    i(r[o]);
  return i;
})(
  {
    1: [
      function (e, t, n) {
        "use strict";
        var r = e("get-canvas-context");
        t.exports = function () {
          var e = r("webgl");
          return e ? e.getParameter(e.MAX_TEXTURE_SIZE) : 1024;
        };
      },
      { "get-canvas-context": 14 },
    ],
    2: [
      function (e, t, n) {
        "use strict";
        function r(e, t) {
          o(e, {
            onDragEnter: function () {
              f.style.display = "";
            },
            onDragLeave: function () {
              f.style.display = "none";
            },
            onDrop: function (e) {
              var n = new Image();
              (n.onload = function () {
                t.texture(n);
              }),
                (n.onerror = function () {
                  alert("Could not load image!");
                }),
                (n.crossOrigin = "Anonymous"),
                (n.src = URL.createObjectURL(e[0]));
            },
          });
        }
        var i = e("../"),
          a = e("./getMaxTextureSize"),
          o = e("drag-drop"),
          f = document.querySelector("#drop-region"),
          u = (function () {
            var e =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : {},
              t = e.viewport || [0, 0],
              n = e.canvas || document.createElement("canvas");
            (n.style.position = "absolute"),
              (n.style.top = t[0] + "px"),
              (n.style.left = t[1] + "px");
            var r = function () {
              var e = "number" == typeof t[2] ? t[2] : window.innerWidth,
                r = "number" == typeof t[3] ? t[3] : window.innerHeight,
                i = window.devicePixelRatio;
              (n.width = e * i),
                (n.height = r * i),
                (n.style.width = e + "px"),
                (n.style.height = r + "px");
            };
            return (
              window.addEventListener("resize", r),
              r(),
              (function () {
                n.addEventListener("mousedown", function () {
                  document.documentElement.classList.remove("grabbing"),
                    document.documentElement.classList.add("grabbing");
                }),
                  window.addEventListener("mouseup", function () {
                    document.documentElement.classList.remove("grabbing");
                  });
              })(),
              n
            );
          })({ canvas: document.querySelector("#canvas") }),
          s = (function () {
            var e = a(),
              t = "maquina-dibujo-9000x4500.jpg";
            return t;
          })(),
          c = new Image();
        (c.src = s),
          (c.onload = function () {
            var e = i({ image: c, canvas: u });
            r(u, e), e.start(), e.on("tick", function (e) {});
          });
      },
      { "../": 3, "./getMaxTextureSize": 1, "drag-drop": 11 },
    ],
    3: [
      function (e, t, n) {
        "use strict";
        function r(e) {
          function t(e) {
            var t = { min: "linear", mag: "linear" };
            if (
              e instanceof Image ||
              e instanceof HTMLImageElement ||
              e instanceof HTMLMediaElement ||
              e instanceof HTMLVideoElement
            ) {
              var n = e.width * e.height;
              return l(t, { data: n > 0 ? e : null });
            }
            return l(t, e);
          }
          function n() {
            (b = !0), w.stop(), h.disable(), d.destroy();
          }
          function r() {
            if (!b) {
              d.poll();
              var e = g.drawingBufferWidth,
                t = g.drawingBufferHeight;
              (v.color = w.clearColor),
                d.clear(v),
                h.update(),
                h.copyInto(m.position, m.direction, m.up),
                (m.viewport[0] = 0),
                (m.viewport[1] = 0),
                (m.viewport[2] = e),
                (m.viewport[3] = t),
                m.update(),
                x({ projection: m.projection, view: m.view }),
                g.flush();
            }
          }
          var p = (e = e || {}).canvas || document.createElement("canvas");
          i || (i = a(1, { segments: 64 }));
          var d = u({ canvas: p }),
            m = f({ fov: c(e.fov, (45 * Math.PI) / 180), near: 0.1, far: 10 }),
            h = o(
              l({}, e, {
                element: p,
                parent: window,
                rotateSpeed: c(e.rotateSpeed, 0.75 / (2 * Math.PI)), // Change 0.75 for less to slow moving around
                damping: c(e.damping, 0.35),
                zoom: !1, // Change this to 0.1 to allow weird zooming!
                pinch: !1,
                distance: 0,
              })
            ),
            v = { color: [0, 0, 0, 0], depth: 1 },
            g = d._gl,
            b = !1,
            y = d.texture(t(e.image)),
            x = d({
              uniforms: {
                map: y,
                projection: d.prop("projection"),
                view: d.prop("view"),
              },
              frag: [
                "precision highp float;",
                "uniform sampler2D map;",
                "uniform vec4 color;",
                "varying vec2 vUv;",
                "void main() {",
                "  vec2 uv = 1.0 - vUv;",
                "  gl_FragColor = texture2D(map, uv);",
                "}",
              ].join("\n"),
              vert: [
                "precision highp float;",
                "attribute vec3 position;",
                "attribute vec2 uv;",
                "uniform mat4 projection;",
                "uniform mat4 view;",
                "varying vec2 vUv;",
                "void main() {",
                "  vUv = uv;",
                "  gl_Position = projection * view * vec4(position.xyz, 1.0);",
                "}",
              ].join("\n"),
              attributes: {
                position: d.buffer(i.positions),
                uv: d.buffer(i.uvs),
              },
              elements: d.elements(i.cells),
            }),
            w = s(r);
          return (
            (w.clearColor = e.clearColor || v.color),
            (w.canvas = p),
            (w.enableControls = h.enable),
            (w.disableControls = h.disable),
            (w.destroy = n),
            (w.render = r),
            (w.texture = function (e) {
              y(t(e));
            }),
            (w.controls = h),
            (w.camera = m),
            (w.gl = g),
            r(),
            w
          );
        }
        var i,
          a = e("primitive-sphere"),
          o = e("orbit-controls"),
          f = e("perspective-camera"),
          u = e("regl"),
          s = e("raf-loop"),
          c = e("defined"),
          l = e("object-assign");
        t.exports = r;
      },
      {
        defined: 9,
        "object-assign": 44,
        "orbit-controls": 45,
        "perspective-camera": 49,
        "primitive-sphere": 54,
        "raf-loop": 57,
        regl: 64,
      },
    ],
    4: [
      function (e, t, n) {
        function r(e, t, n, r, u) {
          a(e, n[0], n[1], 0),
            a(t, n[0], n[1], 1),
            i(e, e, r, u),
            i(t, t, r, u),
            o(t, t, e),
            f(t, t);
        }
        var i = e("camera-unproject"),
          a = e("gl-vec3/set"),
          o = e("gl-vec3/subtract"),
          f = e("gl-vec3/normalize");
        t.exports = r;
      },
      {
        "camera-unproject": 6,
        "gl-vec3/normalize": 30,
        "gl-vec3/set": 33,
        "gl-vec3/subtract": 35,
      },
    ],
    5: [
      function (e, t, n) {
        function r(e, t, n, r) {
          var s = n[0],
            c = n[1],
            l = n[2],
            p = n[3],
            d = o,
            m = f;
          a(u, t[0], t[1], t[2], 1), i(u, u, r);
          var h = u[3];
          return (
            0 !== h &&
              ((u[0] = u[0] / h), (u[1] = u[1] / h), (u[2] = u[2] / h)),
            (e[0] = s + (l / 2) * u[0] + (0 + l / 2)),
            (e[1] = c + (p / 2) * u[1] + (0 + p / 2)),
            (e[2] = ((m - d) / 2) * u[2] + (m + d) / 2),
            (e[3] = 0 === h ? 0 : 1 / h),
            e
          );
        }
        var i = e("gl-vec4/transformMat4"),
          a = e("gl-vec4/set"),
          o = 0,
          f = 1,
          u = [0, 0, 0, 0];
        t.exports = r;
      },
      { "gl-vec4/set": 39, "gl-vec4/transformMat4": 40 },
    ],
    6: [
      function (e, t, n) {
        function r(e, t, n, r) {
          var a = n[0],
            o = n[1],
            f = n[2],
            u = n[3],
            s = t[0],
            c = t[1],
            l = t[2];
          return (
            (s -= a),
            (c = u - c - 1),
            (c -= o),
            (e[0] = (2 * s) / f - 1),
            (e[1] = (2 * c) / u - 1),
            (e[2] = 2 * l - 1),
            i(e, e, r)
          );
        }
        var i = e("./lib/projectMat4");
        t.exports = r;
      },
      { "./lib/projectMat4": 7 },
    ],
    7: [
      function (e, t, n) {
        function r(e, t, n) {
          var r = t[0],
            i = t[1],
            a = t[2],
            o = n[0],
            f = n[1],
            u = n[2],
            s = n[3],
            c = n[4],
            l = n[5],
            p = n[6],
            d = n[7],
            m = n[8],
            h = n[9],
            v = n[10],
            g = n[11],
            b = n[12],
            y = n[13],
            x = n[14],
            w = 1 / (r * s + i * d + a * g + n[15]);
          return (
            (e[0] = (r * o + i * c + a * m + b) * w),
            (e[1] = (r * f + i * l + a * h + y) * w),
            (e[2] = (r * u + i * p + a * v + x) * w),
            e
          );
        }
        t.exports = r;
      },
      {},
    ],
    8: [
      function (e, t, n) {
        function r(e, t, n) {
          return t < n
            ? e < t
              ? t
              : e > n
              ? n
              : e
            : e < n
            ? n
            : e > t
            ? t
            : e;
        }
        t.exports = r;
      },
      {},
    ],
    9: [
      function (e, t, n) {
        t.exports = function () {
          for (var e = 0; e < arguments.length; e++)
            if (void 0 !== arguments[e]) return arguments[e];
        };
      },
      {},
    ],
    10: [
      function (e, t, n) {
        function r(e, t) {
          return { configurable: !0, enumerable: !0, get: e, set: t };
        }
        t.exports = r;
      },
      {},
    ],
    11: [
      function (e, t, n) {
        function r(e, t) {
          function n(e) {
            return (
              t.onDragEnter && t.onDragEnter(e),
              e.stopPropagation(),
              e.preventDefault(),
              !1
            );
          }
          function r(n) {
            if (
              (n.stopPropagation(), n.preventDefault(), n.dataTransfer.items)
            ) {
              var r = a(n.dataTransfer.items),
                i = r.filter(function (e) {
                  return "file" === e.kind;
                }),
                o = r.filter(function (e) {
                  return "string" === e.kind;
                });
              if (0 === i.length && !t.onDropText) return;
              if (0 === o.length && !t.onDrop) return;
              if (0 === i.length && 0 === o.length) return;
            }
            return (
              e.classList.add("drag"),
              clearTimeout(p),
              t.onDragOver && t.onDragOver(n),
              (n.dataTransfer.dropEffect = "copy"),
              !1
            );
          }
          function u(e) {
            return (
              e.stopPropagation(),
              e.preventDefault(),
              t.onDragLeave && t.onDragLeave(e),
              clearTimeout(p),
              (p = setTimeout(c, 50)),
              !1
            );
          }
          function s(e) {
            e.stopPropagation(),
              e.preventDefault(),
              t.onDragLeave && t.onDragLeave(e),
              clearTimeout(p),
              c();
            var n = { x: e.clientX, y: e.clientY },
              r = e.dataTransfer.getData("text");
            if (
              (r && t.onDropText && t.onDropText(r, n), e.dataTransfer.items)
            ) {
              var u = a(e.dataTransfer.items).filter(function (e) {
                return "file" === e.kind;
              });
              if (0 === u.length) return;
              f(
                u.map(function (e) {
                  return function (t) {
                    i(e.webkitGetAsEntry(), t);
                  };
                }),
                function (e, r) {
                  if (e) throw e;
                  t.onDrop && t.onDrop(o(r), n);
                }
              );
            } else {
              var s = a(e.dataTransfer.files);
              if (0 === s.length) return;
              s.forEach(function (e) {
                e.fullPath = "/" + e.name;
              }),
                t.onDrop && t.onDrop(s, n);
            }
            return !1;
          }
          function c() {
            e.classList.remove("drag");
          }
          if ("string" == typeof e) {
            var l = e;
            if (!(e = window.document.querySelector(e)))
              throw new Error('"' + l + '" does not match any HTML elements');
          }
          if (!e) throw new Error('"' + e + '" is not a valid HTML element');
          "function" == typeof t && (t = { onDrop: t });
          var p;
          return (
            e.addEventListener("dragenter", n, !1),
            e.addEventListener("dragover", r, !1),
            e.addEventListener("dragleave", u, !1),
            e.addEventListener("drop", s, !1),
            function () {
              c(),
                e.removeEventListener("dragenter", n, !1),
                e.removeEventListener("dragover", r, !1),
                e.removeEventListener("dragleave", u, !1),
                e.removeEventListener("drop", s, !1);
            }
          );
        }
        function i(e, t) {
          function n() {
            u.readEntries(function (e) {
              e.length > 0 ? ((o = o.concat(a(e))), n()) : r();
            });
          }
          function r() {
            f(
              o.map(function (e) {
                return function (t) {
                  i(e, t);
                };
              }),
              t
            );
          }
          var o = [];
          if (e.isFile)
            e.file(
              function (n) {
                (n.fullPath = e.fullPath), t(null, n);
              },
              function (e) {
                t(e);
              }
            );
          else if (e.isDirectory) {
            var u = e.createReader();
            n();
          }
        }
        function a(e) {
          return Array.prototype.slice.call(e || [], 0);
        }
        t.exports = r;
        var o = e("flatten"),
          f = e("run-parallel");
      },
      { flatten: 13, "run-parallel": 66 },
    ],
    12: [
      function (e, t, n) {
        function r() {
          (this._events = this._events || {}),
            (this._maxListeners = this._maxListeners || void 0);
        }
        function i(e) {
          return "function" == typeof e;
        }
        function a(e) {
          return "number" == typeof e;
        }
        function o(e) {
          return "object" == typeof e && null !== e;
        }
        function f(e) {
          return void 0 === e;
        }
        (t.exports = r),
          (r.EventEmitter = r),
          (r.prototype._events = void 0),
          (r.prototype._maxListeners = void 0),
          (r.defaultMaxListeners = 10),
          (r.prototype.setMaxListeners = function (e) {
            if (!a(e) || e < 0 || isNaN(e))
              throw TypeError("n must be a positive number");
            return (this._maxListeners = e), this;
          }),
          (r.prototype.emit = function (e) {
            var t, n, r, a, u, s;
            if (
              (this._events || (this._events = {}),
              "error" === e &&
                (!this._events.error ||
                  (o(this._events.error) && !this._events.error.length)))
            ) {
              if ((t = arguments[1]) instanceof Error) throw t;
              var c = new Error(
                'Uncaught, unspecified "error" event. (' + t + ")"
              );
              throw ((c.context = t), c);
            }
            if (((n = this._events[e]), f(n))) return !1;
            if (i(n))
              switch (arguments.length) {
                case 1:
                  n.call(this);
                  break;
                case 2:
                  n.call(this, arguments[1]);
                  break;
                case 3:
                  n.call(this, arguments[1], arguments[2]);
                  break;
                default:
                  (a = Array.prototype.slice.call(arguments, 1)),
                    n.apply(this, a);
              }
            else if (o(n))
              for (
                a = Array.prototype.slice.call(arguments, 1),
                  r = (s = n.slice()).length,
                  u = 0;
                u < r;
                u++
              )
                s[u].apply(this, a);
            return !0;
          }),
          (r.prototype.addListener = function (e, t) {
            var n;
            if (!i(t)) throw TypeError("listener must be a function");
            return (
              this._events || (this._events = {}),
              this._events.newListener &&
                this.emit("newListener", e, i(t.listener) ? t.listener : t),
              this._events[e]
                ? o(this._events[e])
                  ? this._events[e].push(t)
                  : (this._events[e] = [this._events[e], t])
                : (this._events[e] = t),
              o(this._events[e]) &&
                !this._events[e].warned &&
                (n = f(this._maxListeners)
                  ? r.defaultMaxListeners
                  : this._maxListeners) &&
                n > 0 &&
                this._events[e].length > n &&
                ((this._events[e].warned = !0),
                console.error(
                  "(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",
                  this._events[e].length
                ),
                "function" == typeof console.trace && console.trace()),
              this
            );
          }),
          (r.prototype.on = r.prototype.addListener),
          (r.prototype.once = function (e, t) {
            function n() {
              this.removeListener(e, n),
                r || ((r = !0), t.apply(this, arguments));
            }
            if (!i(t)) throw TypeError("listener must be a function");
            var r = !1;
            return (n.listener = t), this.on(e, n), this;
          }),
          (r.prototype.removeListener = function (e, t) {
            var n, r, a, f;
            if (!i(t)) throw TypeError("listener must be a function");
            if (!this._events || !this._events[e]) return this;
            if (
              ((n = this._events[e]),
              (a = n.length),
              (r = -1),
              n === t || (i(n.listener) && n.listener === t))
            )
              delete this._events[e],
                this._events.removeListener &&
                  this.emit("removeListener", e, t);
            else if (o(n)) {
              for (f = a; f-- > 0; )
                if (n[f] === t || (n[f].listener && n[f].listener === t)) {
                  r = f;
                  break;
                }
              if (r < 0) return this;
              1 === n.length
                ? ((n.length = 0), delete this._events[e])
                : n.splice(r, 1),
                this._events.removeListener &&
                  this.emit("removeListener", e, t);
            }
            return this;
          }),
          (r.prototype.removeAllListeners = function (e) {
            var t, n;
            if (!this._events) return this;
            if (!this._events.removeListener)
              return (
                0 === arguments.length
                  ? (this._events = {})
                  : this._events[e] && delete this._events[e],
                this
              );
            if (0 === arguments.length) {
              for (t in this._events)
                "removeListener" !== t && this.removeAllListeners(t);
              return (
                this.removeAllListeners("removeListener"),
                (this._events = {}),
                this
              );
            }
            if (((n = this._events[e]), i(n))) this.removeListener(e, n);
            else if (n)
              for (; n.length; ) this.removeListener(e, n[n.length - 1]);
            return delete this._events[e], this;
          }),
          (r.prototype.listeners = function (e) {
            return this._events && this._events[e]
              ? i(this._events[e])
                ? [this._events[e]]
                : this._events[e].slice()
              : [];
          }),
          (r.prototype.listenerCount = function (e) {
            if (this._events) {
              var t = this._events[e];
              if (i(t)) return 1;
              if (t) return t.length;
            }
            return 0;
          }),
          (r.listenerCount = function (e, t) {
            return e.listenerCount(t);
          });
      },
      {},
    ],
    13: [
      function (e, t, n) {
        t.exports = function (e, t) {
          function n(e, r) {
            return e.reduce(function (e, i) {
              return Array.isArray(i) && r < t
                ? e.concat(n(i, r + 1))
                : e.concat(i);
            }, []);
          }
          return (
            (t = "number" == typeof t ? t : 1 / 0),
            t
              ? n(e, 1)
              : Array.isArray(e)
              ? e.map(function (e) {
                  return e;
                })
              : e
          );
        };
      },
      {},
    ],
    14: [
      function (e, t, n) {
        function r(e, t) {
          if ("string" != typeof e)
            throw new TypeError("must specify type string");
          if (((t = t || {}), "undefined" == typeof document && !t.canvas))
            return null;
          var n = t.canvas || document.createElement("canvas");
          "number" == typeof t.width && (n.width = t.width),
            "number" == typeof t.height && (n.height = t.height);
          var r,
            i = t;
          try {
            var a = [e];
            0 === e.indexOf("webgl") && a.push("experimental-" + e);
            for (var o = 0; o < a.length; o++)
              if ((r = n.getContext(a[o], i))) return r;
          } catch (e) {
            r = null;
          }
          return r || null;
        }
        t.exports = r;
      },
      {},
    ],
    15: [
      function (e, t, n) {
        function r(e) {
          return (
            (e[0] = 1),
            (e[1] = 0),
            (e[2] = 0),
            (e[3] = 0),
            (e[4] = 0),
            (e[5] = 1),
            (e[6] = 0),
            (e[7] = 0),
            (e[8] = 0),
            (e[9] = 0),
            (e[10] = 1),
            (e[11] = 0),
            (e[12] = 0),
            (e[13] = 0),
            (e[14] = 0),
            (e[15] = 1),
            e
          );
        }
        t.exports = r;
      },
      {},
    ],
    16: [
      function (e, t, n) {
        function r(e, t) {
          var n = t[0],
            r = t[1],
            i = t[2],
            a = t[3],
            o = t[4],
            f = t[5],
            u = t[6],
            s = t[7],
            c = t[8],
            l = t[9],
            p = t[10],
            d = t[11],
            m = t[12],
            h = t[13],
            v = t[14],
            g = t[15],
            b = n * f - r * o,
            y = n * u - i * o,
            x = n * s - a * o,
            w = r * u - i * f,
            _ = r * s - a * f,
            k = i * s - a * u,
            E = c * h - l * m,
            A = c * v - p * m,
            S = c * g - d * m,
            T = l * v - p * h,
            j = l * g - d * h,
            D = p * g - d * v,
            O = b * D - y * j + x * T + w * S - _ * A + k * E;
          return O
            ? ((O = 1 / O),
              (e[0] = (f * D - u * j + s * T) * O),
              (e[1] = (i * j - r * D - a * T) * O),
              (e[2] = (h * k - v * _ + g * w) * O),
              (e[3] = (p * _ - l * k - d * w) * O),
              (e[4] = (u * S - o * D - s * A) * O),
              (e[5] = (n * D - i * S + a * A) * O),
              (e[6] = (v * x - m * k - g * y) * O),
              (e[7] = (c * k - p * x + d * y) * O),
              (e[8] = (o * j - f * S + s * E) * O),
              (e[9] = (r * S - n * j - a * E) * O),
              (e[10] = (m * _ - h * x + g * b) * O),
              (e[11] = (l * x - c * _ - d * b) * O),
              (e[12] = (f * A - o * T - u * E) * O),
              (e[13] = (n * T - r * A + i * E) * O),
              (e[14] = (h * y - m * w - v * b) * O),
              (e[15] = (c * w - l * y + p * b) * O),
              e)
            : null;
        }
        t.exports = r;
      },
      {},
    ],
    17: [
      function (e, t, n) {
        function r(e, t, n, r) {
          var a,
            o,
            f,
            u,
            s,
            c,
            l,
            p,
            d,
            m,
            h = t[0],
            v = t[1],
            g = t[2],
            b = r[0],
            y = r[1],
            x = r[2],
            w = n[0],
            _ = n[1],
            k = n[2];
          return Math.abs(h - w) < 1e-6 &&
            Math.abs(v - _) < 1e-6 &&
            Math.abs(g - k) < 1e-6
            ? i(e)
            : ((l = h - w),
              (p = v - _),
              (d = g - k),
              (m = 1 / Math.sqrt(l * l + p * p + d * d)),
              (l *= m),
              (p *= m),
              (d *= m),
              (a = y * d - x * p),
              (o = x * l - b * d),
              (f = b * p - y * l),
              (m = Math.sqrt(a * a + o * o + f * f)),
              m
                ? ((a *= m = 1 / m), (o *= m), (f *= m))
                : ((a = 0), (o = 0), (f = 0)),
              (u = p * f - d * o),
              (s = d * a - l * f),
              (c = l * o - p * a),
              (m = Math.sqrt(u * u + s * s + c * c)),
              m
                ? ((u *= m = 1 / m), (s *= m), (c *= m))
                : ((u = 0), (s = 0), (c = 0)),
              (e[0] = a),
              (e[1] = u),
              (e[2] = l),
              (e[3] = 0),
              (e[4] = o),
              (e[5] = s),
              (e[6] = p),
              (e[7] = 0),
              (e[8] = f),
              (e[9] = c),
              (e[10] = d),
              (e[11] = 0),
              (e[12] = -(a * h + o * v + f * g)),
              (e[13] = -(u * h + s * v + c * g)),
              (e[14] = -(l * h + p * v + d * g)),
              (e[15] = 1),
              e);
        }
        var i = e("./identity");
        t.exports = r;
      },
      { "./identity": 15 },
    ],
    18: [
      function (e, t, n) {
        function r(e, t, n) {
          var r = t[0],
            i = t[1],
            a = t[2],
            o = t[3],
            f = t[4],
            u = t[5],
            s = t[6],
            c = t[7],
            l = t[8],
            p = t[9],
            d = t[10],
            m = t[11],
            h = t[12],
            v = t[13],
            g = t[14],
            b = t[15],
            y = n[0],
            x = n[1],
            w = n[2],
            _ = n[3];
          return (
            (e[0] = y * r + x * f + w * l + _ * h),
            (e[1] = y * i + x * u + w * p + _ * v),
            (e[2] = y * a + x * s + w * d + _ * g),
            (e[3] = y * o + x * c + w * m + _ * b),
            (y = n[4]),
            (x = n[5]),
            (w = n[6]),
            (_ = n[7]),
            (e[4] = y * r + x * f + w * l + _ * h),
            (e[5] = y * i + x * u + w * p + _ * v),
            (e[6] = y * a + x * s + w * d + _ * g),
            (e[7] = y * o + x * c + w * m + _ * b),
            (y = n[8]),
            (x = n[9]),
            (w = n[10]),
            (_ = n[11]),
            (e[8] = y * r + x * f + w * l + _ * h),
            (e[9] = y * i + x * u + w * p + _ * v),
            (e[10] = y * a + x * s + w * d + _ * g),
            (e[11] = y * o + x * c + w * m + _ * b),
            (y = n[12]),
            (x = n[13]),
            (w = n[14]),
            (_ = n[15]),
            (e[12] = y * r + x * f + w * l + _ * h),
            (e[13] = y * i + x * u + w * p + _ * v),
            (e[14] = y * a + x * s + w * d + _ * g),
            (e[15] = y * o + x * c + w * m + _ * b),
            e
          );
        }
        t.exports = r;
      },
      {},
    ],
    19: [
      function (e, t, n) {
        function r(e, t, n, r, i) {
          var a = 1 / Math.tan(t / 2),
            o = 1 / (r - i);
          return (
            (e[0] = a / n),
            (e[1] = 0),
            (e[2] = 0),
            (e[3] = 0),
            (e[4] = 0),
            (e[5] = a),
            (e[6] = 0),
            (e[7] = 0),
            (e[8] = 0),
            (e[9] = 0),
            (e[10] = (i + r) * o),
            (e[11] = -1),
            (e[12] = 0),
            (e[13] = 0),
            (e[14] = 2 * i * r * o),
            (e[15] = 0),
            e
          );
        }
        t.exports = r;
      },
      {},
    ],
    20: [
      function (e, t, n) {
        function r(e, t, n) {
          var r = Math.sin(n),
            i = Math.cos(n),
            a = t[0],
            o = t[1],
            f = t[2],
            u = t[3],
            s = t[8],
            c = t[9],
            l = t[10],
            p = t[11];
          return (
            t !== e &&
              ((e[4] = t[4]),
              (e[5] = t[5]),
              (e[6] = t[6]),
              (e[7] = t[7]),
              (e[12] = t[12]),
              (e[13] = t[13]),
              (e[14] = t[14]),
              (e[15] = t[15])),
            (e[0] = a * i - s * r),
            (e[1] = o * i - c * r),
            (e[2] = f * i - l * r),
            (e[3] = u * i - p * r),
            (e[8] = a * r + s * i),
            (e[9] = o * r + c * i),
            (e[10] = f * r + l * i),
            (e[11] = u * r + p * i),
            e
          );
        }
        t.exports = r;
      },
      {},
    ],
    21: [
      function (e, t, n) {
        function r(e, t, n) {
          var r = Math.sin(n),
            i = Math.cos(n),
            a = t[0],
            o = t[1],
            f = t[2],
            u = t[3],
            s = t[4],
            c = t[5],
            l = t[6],
            p = t[7];
          return (
            t !== e &&
              ((e[8] = t[8]),
              (e[9] = t[9]),
              (e[10] = t[10]),
              (e[11] = t[11]),
              (e[12] = t[12]),
              (e[13] = t[13]),
              (e[14] = t[14]),
              (e[15] = t[15])),
            (e[0] = a * i + s * r),
            (e[1] = o * i + c * r),
            (e[2] = f * i + l * r),
            (e[3] = u * i + p * r),
            (e[4] = s * i - a * r),
            (e[5] = c * i - o * r),
            (e[6] = l * i - f * r),
            (e[7] = p * i - u * r),
            e
          );
        }
        t.exports = r;
      },
      {},
    ],
    22: [
      function (e, t, n) {
        function r(e, t) {
          var n = t[0],
            r = t[1],
            i = t[2],
            a = t[3],
            o = n * n + r * r + i * i + a * a,
            f = o ? 1 / o : 0;
          return (
            (e[0] = -n * f), (e[1] = -r * f), (e[2] = -i * f), (e[3] = a * f), e
          );
        }
        t.exports = r;
      },
      {},
    ],
    23: [
      function (e, t, n) {
        t.exports = e("gl-vec4/normalize");
      },
      { "gl-vec4/normalize": 38 },
    ],
    24: [
      function (e, t, n) {
        function r(e, t) {
          var n = t[0] - e[0],
            r = t[1] - e[1];
          return Math.sqrt(n * n + r * r);
        }
        t.exports = r;
      },
      {},
    ],
    25: [
      function (e, t, n) {
        function r(e, t, n) {
          return (
            (e[0] = t[0] + n[0]), (e[1] = t[1] + n[1]), (e[2] = t[2] + n[2]), e
          );
        }
        t.exports = r;
      },
      {},
    ],
    26: [
      function (e, t, n) {
        function r(e, t) {
          return (e[0] = t[0]), (e[1] = t[1]), (e[2] = t[2]), e;
        }
        t.exports = r;
      },
      {},
    ],
    27: [
      function (e, t, n) {
        function r(e, t, n) {
          var r = t[0],
            i = t[1],
            a = t[2],
            o = n[0],
            f = n[1],
            u = n[2];
          return (
            (e[0] = i * u - a * f),
            (e[1] = a * o - r * u),
            (e[2] = r * f - i * o),
            e
          );
        }
        t.exports = r;
      },
      {},
    ],
    28: [
      function (e, t, n) {
        function r(e, t) {
          return e[0] * t[0] + e[1] * t[1] + e[2] * t[2];
        }
        t.exports = r;
      },
      {},
    ],
    29: [
      function (e, t, n) {
        function r(e) {
          var t = e[0],
            n = e[1],
            r = e[2];
          return Math.sqrt(t * t + n * n + r * r);
        }
        t.exports = r;
      },
      {},
    ],
    30: [
      function (e, t, n) {
        function r(e, t) {
          var n = t[0],
            r = t[1],
            i = t[2],
            a = n * n + r * r + i * i;
          return (
            a > 0 &&
              ((a = 1 / Math.sqrt(a)),
              (e[0] = t[0] * a),
              (e[1] = t[1] * a),
              (e[2] = t[2] * a)),
            e
          );
        }
        t.exports = r;
      },
      {},
    ],
    31: [
      function (e, t, n) {
        function r(e, t, n) {
          return (e[0] = t[0] * n), (e[1] = t[1] * n), (e[2] = t[2] * n), e;
        }
        t.exports = r;
      },
      {},
    ],
    32: [
      function (e, t, n) {
        function r(e, t, n, r) {
          return (
            (e[0] = t[0] + n[0] * r),
            (e[1] = t[1] + n[1] * r),
            (e[2] = t[2] + n[2] * r),
            e
          );
        }
        t.exports = r;
      },
      {},
    ],
    33: [
      function (e, t, n) {
        function r(e, t, n, r) {
          return (e[0] = t), (e[1] = n), (e[2] = r), e;
        }
        t.exports = r;
      },
      {},
    ],
    34: [
      function (e, t, n) {
        function r(e, t) {
          var n = t[0] - e[0],
            r = t[1] - e[1],
            i = t[2] - e[2];
          return n * n + r * r + i * i;
        }
        t.exports = r;
      },
      {},
    ],
    35: [
      function (e, t, n) {
        function r(e, t, n) {
          return (
            (e[0] = t[0] - n[0]), (e[1] = t[1] - n[1]), (e[2] = t[2] - n[2]), e
          );
        }
        t.exports = r;
      },
      {},
    ],
    36: [
      function (e, t, n) {
        function r(e, t, n) {
          var r = t[0],
            i = t[1],
            a = t[2],
            o = n[3] * r + n[7] * i + n[11] * a + n[15];
          return (
            (o = o || 1),
            (e[0] = (n[0] * r + n[4] * i + n[8] * a + n[12]) / o),
            (e[1] = (n[1] * r + n[5] * i + n[9] * a + n[13]) / o),
            (e[2] = (n[2] * r + n[6] * i + n[10] * a + n[14]) / o),
            e
          );
        }
        t.exports = r;
      },
      {},
    ],
    37: [
      function (e, t, n) {
        function r(e, t, n) {
          var r = t[0],
            i = t[1],
            a = t[2],
            o = n[0],
            f = n[1],
            u = n[2],
            s = n[3],
            c = s * r + f * a - u * i,
            l = s * i + u * r - o * a,
            p = s * a + o * i - f * r,
            d = -o * r - f * i - u * a;
          return (
            (e[0] = c * s + d * -o + l * -u - p * -f),
            (e[1] = l * s + d * -f + p * -o - c * -u),
            (e[2] = p * s + d * -u + c * -f - l * -o),
            e
          );
        }
        t.exports = r;
      },
      {},
    ],
    38: [
      function (e, t, n) {
        function r(e, t) {
          var n = t[0],
            r = t[1],
            i = t[2],
            a = t[3],
            o = n * n + r * r + i * i + a * a;
          return (
            o > 0 &&
              ((o = 1 / Math.sqrt(o)),
              (e[0] = n * o),
              (e[1] = r * o),
              (e[2] = i * o),
              (e[3] = a * o)),
            e
          );
        }
        t.exports = r;
      },
      {},
    ],
    39: [
      function (e, t, n) {
        function r(e, t, n, r, i) {
          return (e[0] = t), (e[1] = n), (e[2] = r), (e[3] = i), e;
        }
        t.exports = r;
      },
      {},
    ],
    40: [
      function (e, t, n) {
        function r(e, t, n) {
          var r = t[0],
            i = t[1],
            a = t[2],
            o = t[3];
          return (
            (e[0] = n[0] * r + n[4] * i + n[8] * a + n[12] * o),
            (e[1] = n[1] * r + n[5] * i + n[9] * a + n[13] * o),
            (e[2] = n[2] * r + n[6] * i + n[10] * a + n[14] * o),
            (e[3] = n[3] * r + n[7] * i + n[11] * a + n[15] * o),
            e
          );
        }
        t.exports = r;
      },
      {},
    ],
    41: [
      function (e, t, n) {
        "function" == typeof Object.create
          ? (t.exports = function (e, t) {
              (e.super_ = t),
                (e.prototype = Object.create(t.prototype, {
                  constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0,
                  },
                }));
            })
          : (t.exports = function (e, t) {
              e.super_ = t;
              var n = function () {};
              (n.prototype = t.prototype),
                (e.prototype = new n()),
                (e.prototype.constructor = e);
            });
      },
      {},
    ],
    42: [
      function (e, t, n) {
        function r(e, t, n) {
          (t = t || e.currentTarget || e.srcElement),
            Array.isArray(n) || (n = [0, 0]);
          var r = e.clientX || 0,
            a = e.clientY || 0,
            o = i(t);
          return (n[0] = r - o.left), (n[1] = a - o.top), n;
        }
        function i(e) {
          return e === window || e === document || e === document.body
            ? a
            : e.getBoundingClientRect();
        }
        var a = { left: 0, top: 0 };
        t.exports = r;
      },
      {},
    ],
    43: [
      function (e, t, n) {
        "use strict";
        function r(e, t, n) {
          "function" == typeof e && ((n = !!t), (t = e), (e = window));
          var r = i("ex", e),
            a = function (e) {
              n && e.preventDefault();
              var i = e.deltaX || 0,
                a = e.deltaY || 0,
                o = e.deltaZ || 0,
                f = 1;
              switch (e.deltaMode) {
                case 1:
                  f = r;
                  break;
                case 2:
                  f = window.innerHeight;
              }
              if (((i *= f), (a *= f), (o *= f), i || a || o))
                return t(i, a, o, e);
            };
          return e.addEventListener("wheel", a), a;
        }
        var i = e("to-px");
        t.exports = r;
      },
      { "to-px": 67 },
    ],
    44: [
      function (e, t, n) {
        "use strict";
        function r(e) {
          if (null === e || void 0 === e)
            throw new TypeError(
              "Object.assign cannot be called with null or undefined"
            );
          return Object(e);
        }
        var i = Object.getOwnPropertySymbols,
          a = Object.prototype.hasOwnProperty,
          o = Object.prototype.propertyIsEnumerable;
        t.exports = (function () {
          try {
            if (!Object.assign) return !1;
            var e = new String("abc");
            if (((e[5] = "de"), "5" === Object.getOwnPropertyNames(e)[0]))
              return !1;
            for (var t = {}, n = 0; n < 10; n++)
              t["_" + String.fromCharCode(n)] = n;
            if (
              "0123456789" !==
              Object.getOwnPropertyNames(t)
                .map(function (e) {
                  return t[e];
                })
                .join("")
            )
              return !1;
            var r = {};
            return (
              "abcdefghijklmnopqrst".split("").forEach(function (e) {
                r[e] = e;
              }),
              "abcdefghijklmnopqrst" ===
                Object.keys(Object.assign({}, r)).join("")
            );
          } catch (e) {
            return !1;
          }
        })()
          ? Object.assign
          : function (e, t) {
              for (var n, f, u = r(e), s = 1; s < arguments.length; s++) {
                n = Object(arguments[s]);
                for (var c in n) a.call(n, c) && (u[c] = n[c]);
                if (i) {
                  f = i(n);
                  for (var l = 0; l < f.length; l++)
                    o.call(n, f[l]) && (u[f[l]] = n[f[l]]);
                }
              }
              return u;
            };
      },
      {},
    ],
    45: [
      function (e, t, n) {
        function r(e) {
          function t(e, t) {
            var n = 2 * Math.PI;
            (b[0] -= n * e * E.rotateSpeed), (b[1] -= n * t * E.rotateSpeed);
          }
          function n(e) {
            b[2] += e * E.zoomSpeed;
          }
          function r(e) {
            b[2] -= e * E.pinchSpeed;
          }
          function m() {
            var e = E.up || l;
            u(x, e, l), s(w, x);
            var t = E.distance;
            c.subtract(y, E.position, E.target), c.transformQuat(y, y, x);
            var n = Math.atan2(y[0], y[2]),
              r = Math.atan2(Math.sqrt(y[0] * y[0] + y[2] * y[2]), y[1]);
            (n += b[0]),
              (r += b[1]),
              (n = o(n, E.thetaBounds[0], E.thetaBounds[1])),
              (r = o(r, E.phiBounds[0], E.phiBounds[1])),
              (r = o(r, p, Math.PI - p)),
              (t += b[2]),
              (t = o(t, E.distanceBounds[0], E.distanceBounds[1]));
            var a = Math.abs(t) <= p ? p : t;
            (y[0] = a * Math.sin(r) * Math.sin(n)),
              (y[1] = a * Math.cos(r)),
              (y[2] = a * Math.sin(r) * Math.cos(n)),
              (_ = r),
              (k = n),
              (E.distance = t),
              c.transformQuat(y, y, w),
              c.add(E.position, E.target, y),
              i(E.direction, e, E.position, E.target);
          }
          function h() {
            m();
            for (
              var e = "number" == typeof E.damping ? E.damping : 1, t = 0;
              t < b.length;
              t++
            )
              b[t] *= 1 - e;
          }
          function v(e, t, n) {
            e && c.copy(e, E.position),
              t && c.copy(t, E.direction),
              n && c.copy(n, E.up);
          }
          function g() {
            var e = E.phi,
              t = E.theta;
            (t = o(t, E.thetaBounds[0], E.thetaBounds[1])),
              (e = o(e, E.phiBounds[0], E.phiBounds[1])),
              (e = o(e, p, Math.PI - p));
            var n = Math.max(p, E.distance);
            (E.position[0] = n * Math.sin(e) * Math.sin(t)),
              (E.position[1] = n * Math.cos(e)),
              (E.position[2] = n * Math.sin(e) * Math.cos(t)),
              c.add(E.position, E.position, E.target),
              m();
          }
          e = e || {};
          var b = [0, 0, 0],
            y = [0, 0, 0],
            x = [0, 0, 0, 1],
            w = x.slice(),
            _ = a(e.phi, Math.PI / 2),
            k = e.theta || 0,
            E = {
              update: h,
              copyInto: v,
              position: e.position ? e.position.slice() : [0, 0, 1],
              direction: [0, 0, -1],
              up: e.up ? e.up.slice() : [0, 1, 0],
              target: e.target ? e.target.slice() : [0, 0, 0],
              distance: a(e.distance, 1),
              damping: a(e.damping, 0.25),
              rotateSpeed: a(e.rotateSpeed, 0.28),
              zoomSpeed: a(e.zoomSpeed, 0.0075),
              pinchSpeed: a(e.pinchSpeed, 0.0075),
              pinch: !1 !== e.pinching,
              zoom: !1 !== e.zoom,
              rotate: !1 !== e.rotate,
              phiBounds: e.phiBounds || [0, Math.PI],
              thetaBounds: e.thetaBounds || [-1 / 0, 1 / 0],
              distanceBounds: e.distanceBounds || [0, 1 / 0],
            };
          "number" != typeof e.distance &&
            (c.subtract(d, E.position, E.target), (E.distance = c.length(d)));
          var A = f({
            parent: e.parent || window,
            element: e.element,
            rotate: !1 !== e.rotate ? t : null,
            zoom: !1 !== e.zoom ? n : null,
            pinch: !1 !== e.pinch ? r : null,
          });
          return (
            (E.enable = A.enable),
            (E.disable = A.disable),
            Object.defineProperties(E, {
              phi: {
                get: function () {
                  return _;
                },
                set: function (e) {
                  (_ = e), g();
                },
              },
              theta: {
                get: function () {
                  return k;
                },
                set: function (e) {
                  (k = e), g();
                },
              },
              dragging: {
                get: function () {
                  return A.isDragging();
                },
              },
              pinching: {
                get: function () {
                  return A.isPinching();
                },
              },
            }),
            g(),
            E
          );
        }
        function i(e, t, n, r) {
          c.copy(e, r), c.subtract(e, e, n), c.normalize(e, e);
        }
        var a = e("defined"),
          o = e("clamp"),
          f = e("./lib/input"),
          u = e("quat-from-unit-vec3"),
          s = e("gl-quat/invert"),
          c = {
            length: e("gl-vec3/length"),
            add: e("gl-vec3/add"),
            subtract: e("gl-vec3/subtract"),
            transformQuat: e("gl-vec3/transformQuat"),
            copy: e("gl-vec3/copy"),
            normalize: e("gl-vec3/normalize"),
            cross: e("gl-vec3/cross"),
          },
          l = [0, 1, 0],
          p = Math.pow(2, -23),
          d = [0, 0, 0];
        t.exports = r;
      },
      {
        "./lib/input": 46,
        clamp: 8,
        defined: 9,
        "gl-quat/invert": 22,
        "gl-vec3/add": 25,
        "gl-vec3/copy": 26,
        "gl-vec3/cross": 27,
        "gl-vec3/length": 29,
        "gl-vec3/normalize": 30,
        "gl-vec3/subtract": 35,
        "gl-vec3/transformQuat": 37,
        "quat-from-unit-vec3": 56,
      },
    ],
    46: [
      function (e, t, n) {
        function r(e) {
          function t() {
            j ||
              ((j = !0),
              A &&
                (b = i(
                  y,
                  function (e, t) {
                    A(t);
                  },
                  !0
                )),
              S &&
                (x.addEventListener("mousedown", p, !1),
                x.addEventListener("mousemove", m, !1),
                x.addEventListener("mouseup", d, !1)),
              (S || T) &&
                ((g = o(y)),
                y.addEventListener("touchstart", r, !1),
                S &&
                  (y.addEventListener("touchmove", f, !1),
                  g.on("place", u),
                  g.on("lift", s)),
                T && g.on("change", l)));
          }
          function n() {
            j &&
              ((j = !1),
              b && y.removeEventListener("wheel", b),
              g &&
                (g.disable(),
                y.removeEventListener("touchstart", r, !1),
                S && y.removeEventListener("touchmove", f, !1)),
              S &&
                (x.removeEventListener("mousedown", p, !1),
                x.removeEventListener("mousemove", m, !1),
                x.removeEventListener("mouseup", d, !1)));
          }
          function r(e) {
            e.preventDefault();
          }
          function f(e) {
            if (_ && !c())
              for (var t = 0; t < e.changedTouches.length; t++) {
                var n = e.changedTouches[t],
                  r = g.indexOfTouch(n);
                if (T ? -1 !== r : 0 === r) {
                  m(n);
                  break;
                }
              }
          }
          function u(e, t) {
            (_ = !c()) && p(t || e);
          }
          function s(e, t) {
            (_ = !c()) && t && a(t, y, w);
          }
          function c() {
            return g.pinching && T;
          }
          function l(e, t) {
            T(e - t);
          }
          function p(e) {
            a(e, y, w), h(w) && (_ = !0);
          }
          function d() {
            _ = !1;
          }
          function m(e) {
            var t = a(e, y, k);
            if (g && c()) w = t;
            else if (_) {
              var n = v(E),
                r = (t[0] - w[0]) / n[0],
                i = (t[1] - w[1]) / n[1];
              S(r, i), (w[0] = t[0]), (w[1] = t[1]);
            }
          }
          function h(e) {
            if (y === window || y === document || y === document.body)
              return !0;
            var t = y.getBoundingClientRect();
            return e[0] >= 0 && e[1] >= 0 && e[0] < t.width && e[1] < t.height;
          }
          function v(e) {
            var t = y;
            return (
              (t !== window && t !== document && t !== document.body) ||
                (t = document.documentElement),
              (e[0] = t.clientWidth),
              (e[1] = t.clientHeight),
              e
            );
          }
          var g,
            b,
            y = e.element || window,
            x = e.parent || y,
            w = [0, 0],
            _ = !1,
            k = [0, 0],
            E = [0, 0],
            A = e.zoom,
            S = e.rotate,
            T = e.pinch,
            j = !1;
          return (
            t(),
            {
              isDragging: function () {
                return _;
              },
              isPinching: c,
              enable: t,
              disable: n,
            }
          );
        }
        var i = e("mouse-wheel"),
          a = e("mouse-event-offset"),
          o = e("touch-pinch");
        t.exports = r;
      },
      { "mouse-event-offset": 42, "mouse-wheel": 43, "touch-pinch": 68 },
    ],
    47: [
      function (e, t, n) {
        t.exports = function (e, t) {
          t || (t = [0, ""]), (e = String(e));
          var n = parseFloat(e, 10);
          return (t[0] = n), (t[1] = e.match(/[\d.\-\+]*\s*(.*)/)[1] || ""), t;
        };
      },
      {},
    ],
    48: [
      function (e, t, n) {
        (function (e) {
          (function () {
            var n, r, i, a, o, f;
            "undefined" != typeof performance &&
            null !== performance &&
            performance.now
              ? (t.exports = function () {
                  return performance.now();
                })
              : void 0 !== e && null !== e && e.hrtime
              ? ((t.exports = function () {
                  return (n() - o) / 1e6;
                }),
                (r = e.hrtime),
                (a = (n = function () {
                  var e;
                  return 1e9 * (e = r())[0] + e[1];
                })()),
                (f = 1e9 * e.uptime()),
                (o = a - f))
              : Date.now
              ? ((t.exports = function () {
                  return Date.now() - i;
                }),
                (i = Date.now()))
              : ((t.exports = function () {
                  return new Date().getTime() - i;
                }),
                (i = new Date().getTime()));
          }.call(this));
        }.call(this, e("_process")));
      },
      { _process: 55 },
    ],
    49: [
      function (e, t, n) {
        t.exports = e("./lib/camera-perspective");
      },
      { "./lib/camera-perspective": 52 },
    ],
    50: [
      function (e, t, n) {
        var r = e("object-assign"),
          i = e("ray-3d"),
          a = e("camera-project"),
          o = e("camera-unproject"),
          f = e("./camera-look-at"),
          u = e("camera-picking-ray"),
          s = e("gl-vec3/add"),
          c = e("gl-mat4/multiply"),
          l = e("gl-mat4/invert"),
          p = e("gl-mat4/identity"),
          d = e("gl-vec3/set");
        t.exports = function (e) {
          function t() {
            if (
              (c(y.projView, y.projection, y.view),
              !l(y.invProjView, y.projView))
            )
              throw new Error("camera projection * view is non-invertible");
          }
          function n(e) {
            return f(y.direction, y.up, y.position, e), y;
          }
          function m() {
            return (
              d(y.position, 0, 0, 0),
              d(y.direction, 0, 0, -1),
              d(y.up, 0, 1, 0),
              p(y.view),
              p(y.projection),
              p(y.projView),
              p(y.invProjView),
              y
            );
          }
          function h(e) {
            return s(y.position, y.position, e), y;
          }
          function v(e) {
            var t = new i();
            return u(t.origin, t.direction, e, y.viewport, y.invProjView), t;
          }
          function g(e) {
            return a([], e, y.viewport, y.projView);
          }
          function b(e) {
            return o([], e, y.viewport, y.invProjView);
          }
          e = e || {};
          var y = {
            projection: p([]),
            view: p([]),
            position: e.position || [0, 0, 0],
            direction: e.direction || [0, 0, -1],
            up: e.up || [0, 1, 0],
            viewport: e.viewport || [-1, -1, 1, 1],
            projView: p([]),
            invProjView: p([]),
          };
          return r(y, {
            translate: h,
            identity: m,
            lookAt: n,
            createPickingRay: v,
            update: t,
            project: g,
            unproject: b,
          });
        };
      },
      {
        "./camera-look-at": 51,
        "camera-picking-ray": 4,
        "camera-project": 5,
        "camera-unproject": 6,
        "gl-mat4/identity": 15,
        "gl-mat4/invert": 16,
        "gl-mat4/multiply": 18,
        "gl-vec3/add": 25,
        "gl-vec3/set": 33,
        "object-assign": 53,
        "ray-3d": 59,
      },
    ],
    51: [
      function (e, t, n) {
        var r = e("gl-vec3/cross"),
          i = e("gl-vec3/subtract"),
          a = e("gl-vec3/normalize"),
          o = e("gl-vec3/copy"),
          f = e("gl-vec3/dot"),
          u = e("gl-vec3/scale"),
          s = [0, 0, 0];
        t.exports = function (e, t, n, c) {
          if (
            (i(s, c, n), a(s, s), !(0 === s[0] && 0 === s[1] && 0 === s[2]))
          ) {
            var l = f(s, t);
            Math.abs(l - 1) < 1e-9
              ? u(t, e, -1)
              : Math.abs(l + 1) < 1e-9 && o(t, e),
              o(e, s),
              r(s, e, t),
              a(s, s),
              r(t, s, e),
              a(t, t);
          }
        };
      },
      {
        "gl-vec3/copy": 26,
        "gl-vec3/cross": 27,
        "gl-vec3/dot": 28,
        "gl-vec3/normalize": 30,
        "gl-vec3/scale": 31,
        "gl-vec3/subtract": 35,
      },
    ],
    52: [
      function (e, t, n) {
        var r = e("./camera-base"),
          i = e("object-assign"),
          a = e("defined"),
          o = e("gl-mat4/perspective"),
          f = e("gl-mat4/lookAt"),
          u = e("gl-vec3/add");
        t.exports = function (e) {
          function t() {
            var e = n.viewport[2] / n.viewport[3];
            return (
              o(n.projection, n.fov, e, Math.abs(n.near), Math.abs(n.far)),
              u(s, n.position, n.direction),
              f(n.view, n.position, s, n.up),
              c(),
              n
            );
          }
          var n = r((e = e || {}));
          (n.fov = a(e.fov, Math.PI / 4)),
            (n.near = a(e.near, 1)),
            (n.far = a(e.far, 100));
          var s = [0, 0, 0],
            c = n.update;
          return t(), i(n, { update: t });
        };
      },
      {
        "./camera-base": 50,
        defined: 9,
        "gl-mat4/lookAt": 17,
        "gl-mat4/perspective": 19,
        "gl-vec3/add": 25,
        "object-assign": 53,
      },
    ],
    53: [
      function (e, t, n) {
        "use strict";
        function r(e) {
          if (null == e)
            throw new TypeError(
              "Object.assign cannot be called with null or undefined"
            );
          return Object(e);
        }
        t.exports =
          Object.assign ||
          function (e, t) {
            for (var n, i, a = r(e), o = 1; o < arguments.length; o++) {
              (n = arguments[o]), (i = Object.keys(Object(n)));
              for (var f = 0; f < i.length; f++) a[i[f]] = n[i[f]];
            }
            return a;
          };
      },
      {},
    ],
    54: [
      function (e, t, n) {
        function r(e, t) {
          (t = t || {}), (e = void 0 !== e ? e : 1);
          for (
            var n = 2 + (void 0 !== t.segments ? t.segments : 32),
              r = 2 * n,
              m = [],
              h = [],
              v = [],
              g = [],
              b = 0;
            b <= n;
            b++
          ) {
            for (var y = b / n, x = y * Math.PI, w = 0; w <= r; w++) {
              var _ = w / r,
                k = _ * Math.PI * 2;
              i(l),
                o(l, l, -x),
                i(c),
                a(c, c, k),
                u(d, p, l),
                u(d, d, c),
                f(d, d, -e),
                h.push(d.slice()),
                s(d, d),
                v.push(d.slice()),
                g.push([_, y]);
            }
            if (b > 0)
              for (var E = h.length, A = E - 2 * (r + 1); A + r + 2 < E; A++)
                m.push([A, A + 1, A + r + 1]),
                  m.push([A + r + 1, A + 1, A + r + 2]);
          }
          return { cells: m, positions: h, normals: v, uvs: g };
        }
        var i = e("gl-mat4/identity"),
          a = e("gl-mat4/rotateY"),
          o = e("gl-mat4/rotateZ"),
          f = e("gl-vec3/scale"),
          u = e("gl-vec3/transformMat4"),
          s = e("gl-vec3/normalize"),
          c = i([]),
          l = i([]),
          p = [0, 1, 0],
          d = [0, 0, 0];
        t.exports = r;
      },
      {
        "gl-mat4/identity": 15,
        "gl-mat4/rotateY": 20,
        "gl-mat4/rotateZ": 21,
        "gl-vec3/normalize": 30,
        "gl-vec3/scale": 31,
        "gl-vec3/transformMat4": 36,
      },
    ],
    55: [
      function (e, t, n) {
        function r() {
          throw new Error("setTimeout has not been defined");
        }
        function i() {
          throw new Error("clearTimeout has not been defined");
        }
        function a(e) {
          if (l === setTimeout) return setTimeout(e, 0);
          if ((l === r || !l) && setTimeout)
            return (l = setTimeout), setTimeout(e, 0);
          try {
            return l(e, 0);
          } catch (t) {
            try {
              return l.call(null, e, 0);
            } catch (t) {
              return l.call(this, e, 0);
            }
          }
        }
        function o(e) {
          if (p === clearTimeout) return clearTimeout(e);
          if ((p === i || !p) && clearTimeout)
            return (p = clearTimeout), clearTimeout(e);
          try {
            return p(e);
          } catch (t) {
            try {
              return p.call(null, e);
            } catch (t) {
              return p.call(this, e);
            }
          }
        }
        function f() {
          v &&
            m &&
            ((v = !1),
            m.length ? (h = m.concat(h)) : (g = -1),
            h.length && u());
        }
        function u() {
          if (!v) {
            var e = a(f);
            v = !0;
            for (var t = h.length; t; ) {
              for (m = h, h = []; ++g < t; ) m && m[g].run();
              (g = -1), (t = h.length);
            }
            (m = null), (v = !1), o(e);
          }
        }
        function s(e, t) {
          (this.fun = e), (this.array = t);
        }
        function c() {}
        var l,
          p,
          d = (t.exports = {});
        !(function () {
          try {
            l = "function" == typeof setTimeout ? setTimeout : r;
          } catch (e) {
            l = r;
          }
          try {
            p = "function" == typeof clearTimeout ? clearTimeout : i;
          } catch (e) {
            p = i;
          }
        })();
        var m,
          h = [],
          v = !1,
          g = -1;
        (d.nextTick = function (e) {
          var t = new Array(arguments.length - 1);
          if (arguments.length > 1)
            for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
          h.push(new s(e, t)), 1 !== h.length || v || a(u);
        }),
          (s.prototype.run = function () {
            this.fun.apply(null, this.array);
          }),
          (d.title = "browser"),
          (d.browser = !0),
          (d.env = {}),
          (d.argv = []),
          (d.version = ""),
          (d.versions = {}),
          (d.on = c),
          (d.addListener = c),
          (d.once = c),
          (d.off = c),
          (d.removeListener = c),
          (d.removeAllListeners = c),
          (d.emit = c),
          (d.prependListener = c),
          (d.prependOnceListener = c),
          (d.listeners = function (e) {
            return [];
          }),
          (d.binding = function (e) {
            throw new Error("process.binding is not supported");
          }),
          (d.cwd = function () {
            return "/";
          }),
          (d.chdir = function (e) {
            throw new Error("process.chdir is not supported");
          }),
          (d.umask = function () {
            return 0;
          });
      },
      {},
    ],
    56: [
      function (e, t, n) {
        function r(e, t, n) {
          var r = i(t, n) + 1;
          return (
            r < s
              ? ((r = 0),
                Math.abs(t[0]) > Math.abs(t[2])
                  ? a(u, -t[1], t[0], 0)
                  : a(u, 0, -t[2], t[1]))
              : f(u, t, n),
            (e[0] = u[0]),
            (e[1] = u[1]),
            (e[2] = u[2]),
            (e[3] = r),
            o(e, e),
            e
          );
        }
        var i = e("gl-vec3/dot"),
          a = e("gl-vec3/set"),
          o = e("gl-quat/normalize"),
          f = e("gl-vec3/cross"),
          u = [0, 0, 0],
          s = 1e-6;
        t.exports = r;
      },
      {
        "gl-quat/normalize": 23,
        "gl-vec3/cross": 27,
        "gl-vec3/dot": 28,
        "gl-vec3/set": 33,
      },
    ],
    57: [
      function (e, t, n) {
        function r(e) {
          if (!(this instanceof r)) return new r(e);
          (this.running = !1),
            (this.last = o()),
            (this._frame = 0),
            (this._tick = this.tick.bind(this)),
            e && this.on("tick", e);
        }
        var i = e("inherits"),
          a = e("events").EventEmitter,
          o = e("right-now"),
          f = e("raf");
        (t.exports = r),
          i(r, a),
          (r.prototype.start = function () {
            if (!this.running)
              return (
                (this.running = !0),
                (this.last = o()),
                (this._frame = f(this._tick)),
                this
              );
          }),
          (r.prototype.stop = function () {
            return (
              (this.running = !1),
              0 !== this._frame && f.cancel(this._frame),
              (this._frame = 0),
              this
            );
          }),
          (r.prototype.tick = function () {
            this._frame = f(this._tick);
            var e = o(),
              t = e - this.last;
            this.emit("tick", t), (this.last = e);
          });
      },
      { events: 12, inherits: 41, raf: 58, "right-now": 65 },
    ],
    58: [
      function (e, t, n) {
        (function (n) {
          for (
            var r = e("performance-now"),
              i = "undefined" == typeof window ? n : window,
              a = ["moz", "webkit"],
              o = "AnimationFrame",
              f = i["request" + o],
              u = i["cancel" + o] || i["cancelRequest" + o],
              s = 0;
            !f && s < a.length;
            s++
          )
            (f = i[a[s] + "Request" + o]),
              (u = i[a[s] + "Cancel" + o] || i[a[s] + "CancelRequest" + o]);
          if (!f || !u) {
            var c = 0,
              l = 0,
              p = [];
            (f = function (e) {
              if (0 === p.length) {
                var t = r(),
                  n = Math.max(0, 1e3 / 60 - (t - c));
                (c = n + t),
                  setTimeout(function () {
                    var e = p.slice(0);
                    p.length = 0;
                    for (var t = 0; t < e.length; t++)
                      if (!e[t].cancelled)
                        try {
                          e[t].callback(c);
                        } catch (e) {
                          setTimeout(function () {
                            throw e;
                          }, 0);
                        }
                  }, Math.round(n));
              }
              return p.push({ handle: ++l, callback: e, cancelled: !1 }), l;
            }),
              (u = function (e) {
                for (var t = 0; t < p.length; t++)
                  p[t].handle === e && (p[t].cancelled = !0);
              });
          }
          (t.exports = function (e) {
            return f.call(i, e);
          }),
            (t.exports.cancel = function () {
              u.apply(i, arguments);
            }),
            (t.exports.polyfill = function () {
              (i.requestAnimationFrame = f), (i.cancelAnimationFrame = u);
            });
        }.call(
          this,
          "undefined" != typeof global
            ? global
            : "undefined" != typeof self
            ? self
            : "undefined" != typeof window
            ? window
            : {}
        ));
      },
      { "performance-now": 48 },
    ],
    59: [
      function (e, t, n) {
        function r(e, t) {
          (this.origin = e || [0, 0, 0]), (this.direction = t || [0, 0, -1]);
        }
        var i = e("ray-triangle-intersection"),
          a = e("ray-plane-intersection"),
          o = e("ray-sphere-intersection"),
          f = e("ray-aabb-intersection"),
          u = e("gl-vec3/copy"),
          s = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
          ],
          c = [0, 0, 0];
        (t.exports = r),
          (r.prototype.set = function (e, t) {
            (this.origin = e), (this.direction = t);
          }),
          (r.prototype.copy = function (e) {
            u(this.origin, e.origin), u(this.direction, e.direction);
          }),
          (r.prototype.clone = function () {
            var e = new r();
            return e.copy(this), e;
          }),
          (r.prototype.intersectsSphere = function (e, t) {
            return o(c, this.origin, this.direction, e, t);
          }),
          (r.prototype.intersectsPlane = function (e, t) {
            return a(c, this.origin, this.direction, e, t);
          }),
          (r.prototype.intersectsTriangle = function (e) {
            return i(c, this.origin, this.direction, e);
          }),
          (r.prototype.intersectsBox = function (e) {
            return f(c, this.origin, this.direction, e);
          }),
          (r.prototype.intersectsTriangleCell = function (e, t) {
            var n = e[0],
              r = e[1],
              i = e[2];
            return (
              (s[0] = t[n]),
              (s[1] = t[r]),
              (s[2] = t[i]),
              this.intersectsTriangle(s)
            );
          });
      },
      {
        "gl-vec3/copy": 26,
        "ray-aabb-intersection": 60,
        "ray-plane-intersection": 61,
        "ray-sphere-intersection": 62,
        "ray-triangle-intersection": 63,
      },
    ],
    60: [
      function (e, t, n) {
        function r(e, t, n, r) {
          var a = i(t, n, r);
          if (a === 1 / 0) e = null;
          else {
            e = e || [];
            for (var o = 0; o < t.length; o++) e[o] = t[o] + n[o] * a;
          }
          return e;
        }
        function i(e, t, n) {
          for (var r = e.length, i = -1 / 0, a = 1 / 0, o = 0; o < r; o++) {
            var f = (n[0][o] - e[o]) / t[o],
              u = (n[1][o] - e[o]) / t[o];
            if (f > u) {
              var s = f;
              (f = u), (u = s);
            }
            if (u < i || f > a) return 1 / 0;
            f > i && (i = f), u < a && (a = u);
          }
          return i > a ? 1 / 0 : i;
        }
        (t.exports = r), (t.exports.distance = i);
      },
      {},
    ],
    61: [
      function (e, t, n) {
        function r(e, t, n, r, s) {
          var c = i(n, r);
          if (0 !== c) {
            var l = -(i(t, r) + s) / c;
            return l < 0 ? null : (o(u, n, l), a(e, t, u));
          }
          return i(r, t) + s === 0 ? f(e, t) : null;
        }
        var i = e("gl-vec3/dot"),
          a = e("gl-vec3/add"),
          o = e("gl-vec3/scale"),
          f = e("gl-vec3/copy");
        t.exports = r;
        var u = [0, 0, 0];
      },
      {
        "gl-vec3/add": 25,
        "gl-vec3/copy": 26,
        "gl-vec3/dot": 28,
        "gl-vec3/scale": 31,
      },
    ],
    62: [
      function (e, t, n) {
        function r(e, t, n, r, l) {
          o(c, r, t);
          var p = a(n, c);
          if (p < 0) return null;
          f(c, t, n, p);
          var d = i(r, c),
            m = l * l;
          return d > m ? null : (u(e, n, p - Math.sqrt(m - d)), s(e, e, t));
        }
        var i = e("gl-vec3/squaredDistance"),
          a = e("gl-vec3/dot"),
          o = e("gl-vec3/subtract"),
          f = e("gl-vec3/scaleAndAdd"),
          u = e("gl-vec3/scale"),
          s = e("gl-vec3/add"),
          c = [0, 0, 0];
        t.exports = r;
      },
      {
        "gl-vec3/add": 25,
        "gl-vec3/dot": 28,
        "gl-vec3/scale": 31,
        "gl-vec3/scaleAndAdd": 32,
        "gl-vec3/squaredDistance": 34,
        "gl-vec3/subtract": 35,
      },
    ],
    63: [
      function (e, t, n) {
        function r(e, t, n, r) {
          o(u, r[1], r[0]), o(s, r[2], r[0]), i(l, n, s);
          var d = a(u, l);
          if (d < f) return null;
          o(c, t, r[0]);
          var m = a(c, l);
          if (m < 0 || m > d) return null;
          i(p, c, u);
          var h = a(n, p);
          if (h < 0 || m + h > d) return null;
          var v = a(s, p) / d;
          return (
            (e[0] = t[0] + v * n[0]),
            (e[1] = t[1] + v * n[1]),
            (e[2] = t[2] + v * n[2]),
            e
          );
        }
        var i = e("gl-vec3/cross"),
          a = e("gl-vec3/dot"),
          o = e("gl-vec3/subtract"),
          f = 1e-6,
          u = [0, 0, 0],
          s = [0, 0, 0],
          c = [0, 0, 0],
          l = [0, 0, 0],
          p = [0, 0, 0];
        t.exports = r;
      },
      { "gl-vec3/cross": 27, "gl-vec3/dot": 28, "gl-vec3/subtract": 35 },
    ],
    64: [
      function (e, t, n) {
        !(function (e, r) {
          "object" == typeof n && void 0 !== t
            ? (t.exports = r())
            : "function" == typeof define && define.amd
            ? define(r)
            : (e.createREGL = r());
        })(this, function () {
          "use strict";
          function e(e) {
            return "undefined" != typeof btoa ? btoa(e) : "base64:" + e;
          }
          function t(e) {
            var t = new Error("(regl) " + e);
            throw (console.error(t), t);
          }
          function n(e, n) {
            e || t(n);
          }
          function r(e) {
            return e ? ": " + e : "";
          }
          function i(e, n, i) {
            e in n ||
              t(
                "unknown parameter (" +
                  e +
                  ")" +
                  r(i) +
                  ". possible values: " +
                  Object.keys(n).join()
              );
          }
          function a(e, n) {
            Ke(e) ||
              t("invalid parameter type" + r(n) + ". must be a typed array");
          }
          function o(e, n, i) {
            typeof e !== n &&
              t(
                "invalid parameter type" +
                  r(i) +
                  ". expected " +
                  n +
                  ", got " +
                  typeof e
              );
          }
          function f(e, n) {
            (e >= 0 && (0 | e) === e) ||
              t(
                "invalid parameter type, (" +
                  e +
                  ")" +
                  r(n) +
                  ". must be a nonnegative integer"
              );
          }
          function u(e, n, i) {
            n.indexOf(e) < 0 &&
              t("invalid value" + r(i) + ". must be one of: " + n);
          }
          function s(e) {
            Object.keys(e).forEach(function (e) {
              et.indexOf(e) < 0 &&
                t(
                  'invalid regl constructor argument "' +
                    e +
                    '". must be one of ' +
                    et
                );
            });
          }
          function c(e, t) {
            for (e += ""; e.length < t; ) e = " " + e;
            return e;
          }
          function l() {
            (this.name = "unknown"),
              (this.lines = []),
              (this.index = {}),
              (this.hasErrors = !1);
          }
          function p(e, t) {
            (this.number = e), (this.line = t), (this.errors = []);
          }
          function d(e, t, n) {
            (this.file = e), (this.line = t), (this.message = n);
          }
          function m() {
            var e = new Error(),
              t = (e.stack || e).toString(),
              n = /compileProcedure.*\n\s*at.*\((.*)\)/.exec(t);
            if (n) return n[1];
            var r = /compileProcedure.*\n\s*at\s+(.*)(\n|$)/.exec(t);
            return r ? r[1] : "unknown";
          }
          function h() {
            var e = new Error(),
              t = (e.stack || e).toString(),
              n = /at REGLCommand.*\n\s+at.*\((.*)\)/.exec(t);
            if (n) return n[1];
            var r = /at REGLCommand.*\n\s+at\s+(.*)\n/.exec(t);
            return r ? r[1] : "unknown";
          }
          function v(t, n) {
            var r = t.split("\n"),
              i = 1,
              a = 0,
              o = { unknown: new l(), 0: new l() };
            (o.unknown.name = o[0].name = n || m()),
              o.unknown.lines.push(new p(0, ""));
            for (var f = 0; f < r.length; ++f) {
              var u = r[f],
                s = /^\s*\#\s*(\w+)\s+(.+)\s*$/.exec(u);
              if (s)
                switch (s[1]) {
                  case "line":
                    var c = /(\d+)(\s+\d+)?/.exec(s[2]);
                    c &&
                      ((i = 0 | c[1]),
                      c[2] && ((a = 0 | c[2]) in o || (o[a] = new l())));
                    break;
                  case "define":
                    var d = /SHADER_NAME(_B64)?\s+(.*)$/.exec(s[2]);
                    d && (o[a].name = d[1] ? e(d[2]) : d[2]);
                }
              o[a].lines.push(new p(i++, u));
            }
            return (
              Object.keys(o).forEach(function (e) {
                var t = o[e];
                t.lines.forEach(function (e) {
                  t.index[e.number] = e;
                });
              }),
              o
            );
          }
          function g(e) {
            var t = [];
            return (
              e.split("\n").forEach(function (e) {
                if (!(e.length < 5)) {
                  var n = /^ERROR\:\s+(\d+)\:(\d+)\:\s*(.*)$/.exec(e);
                  n
                    ? t.push(new d(0 | n[1], 0 | n[2], n[3].trim()))
                    : e.length > 0 && t.push(new d("unknown", 0, e));
                }
              }),
              t
            );
          }
          function b(e, t) {
            t.forEach(function (t) {
              var n = e[t.file];
              if (n) {
                var r = n.index[t.line];
                if (r) return r.errors.push(t), void (n.hasErrors = !0);
              }
              (e.unknown.hasErrors = !0), e.unknown.lines[0].errors.push(t);
            });
          }
          function y(e, t, r, i, a) {
            if (!e.getShaderParameter(t, e.COMPILE_STATUS)) {
              var o = e.getShaderInfoLog(t),
                f = i === e.FRAGMENT_SHADER ? "fragment" : "vertex";
              S(r, "string", f + " shader source must be a string", a);
              var u = v(r, a),
                s = g(o);
              b(u, s),
                Object.keys(u).forEach(function (e) {
                  function t(e, t) {
                    r.push(e), i.push(t || "");
                  }
                  var n = u[e];
                  if (n.hasErrors) {
                    var r = [""],
                      i = [""];
                    t(
                      "file number " + e + ": " + n.name + "\n",
                      "color:red;text-decoration:underline;font-weight:bold"
                    ),
                      n.lines.forEach(function (e) {
                        if (e.errors.length > 0) {
                          t(
                            c(e.number, 4) + "|  ",
                            "background-color:yellow; font-weight:bold"
                          ),
                            t(
                              e.line + "\n",
                              "color:red; background-color:yellow; font-weight:bold"
                            );
                          var n = 0;
                          e.errors.forEach(function (r) {
                            var i = r.message,
                              a = /^\s*\'(.*)\'\s*\:\s*(.*)$/.exec(i);
                            if (a) {
                              var o = a[1];
                              switch (((i = a[2]), o)) {
                                case "assign":
                                  o = "=";
                              }
                              n = Math.max(e.line.indexOf(o, n), 0);
                            } else n = 0;
                            t(c("| ", 6)),
                              t(c("^^^", n + 3) + "\n", "font-weight:bold"),
                              t(c("| ", 6)),
                              t(i + "\n", "font-weight:bold");
                          }),
                            t(c("| ", 6) + "\n");
                        } else t(c(e.number, 4) + "|  "), t(e.line + "\n", "color:red");
                      }),
                      "undefined" != typeof document
                        ? ((i[0] = r.join("%c")), console.log.apply(console, i))
                        : console.log(r.join(""));
                  }
                }),
                n.raise("Error compiling " + f + " shader, " + u[0].name);
            }
          }
          function x(e, t, r, i, a) {
            if (!e.getProgramParameter(t, e.LINK_STATUS)) {
              var o = e.getProgramInfoLog(t),
                f = v(r, a),
                u =
                  'Error linking program with vertex shader, "' +
                  v(i, a)[0].name +
                  '", and fragment shader "' +
                  f[0].name +
                  '"';
              "undefined" != typeof document
                ? console.log(
                    "%c" + u + "\n%c" + o,
                    "color:red;text-decoration:underline;font-weight:bold",
                    "color:red"
                  )
                : console.log(u + "\n" + o),
                n.raise(u);
            }
          }
          function w(e) {
            e._commandRef = m();
          }
          function _(e, t, n, r) {
            function i(e) {
              return e ? r.id(e) : 0;
            }
            function a(e, t) {
              Object.keys(t).forEach(function (t) {
                e[r.id(t)] = !0;
              });
            }
            w(e),
              (e._fragId = i(e.static.frag)),
              (e._vertId = i(e.static.vert));
            var o = (e._uniformSet = {});
            a(o, t.static), a(o, t.dynamic);
            var f = (e._attributeSet = {});
            a(f, n.static),
              a(f, n.dynamic),
              (e._hasCount =
                "count" in e.static ||
                "count" in e.dynamic ||
                "elements" in e.static ||
                "elements" in e.dynamic);
          }
          function k(e, n) {
            var r = h();
            t(
              e +
                " in command " +
                (n || m()) +
                ("unknown" === r ? "" : " called from " + r)
            );
          }
          function E(e, t, n) {
            e || k(t, n || m());
          }
          function A(e, t, n, i) {
            e in t ||
              k(
                "unknown parameter (" +
                  e +
                  ")" +
                  r(n) +
                  ". possible values: " +
                  Object.keys(t).join(),
                i || m()
              );
          }
          function S(e, t, n, i) {
            typeof e !== t &&
              k(
                "invalid parameter type" +
                  r(n) +
                  ". expected " +
                  t +
                  ", got " +
                  typeof e,
                i || m()
              );
          }
          function T(e) {
            e();
          }
          function j(e, t, n) {
            e.texture
              ? u(
                  e.texture._texture.internalformat,
                  t,
                  "unsupported texture format for attachment"
                )
              : u(
                  e.renderbuffer._renderbuffer.format,
                  n,
                  "unsupported renderbuffer format for attachment"
                );
          }
          function D(e, t) {
            return e === st || e === ut || e === ct
              ? 2
              : e === lt
              ? 4
              : pt[e] * t;
          }
          function O(e) {
            return !(e & (e - 1) || !e);
          }
          function C(e, t, r) {
            var i,
              a = t.width,
              o = t.height,
              f = t.channels;
            n(
              a > 0 && a <= r.maxTextureSize && o > 0 && o <= r.maxTextureSize,
              "invalid texture shape"
            ),
              (e.wrapS === tt && e.wrapT === tt) ||
                n(
                  O(a) && O(o),
                  "incompatible wrap mode for texture, both width and height must be power of 2"
                ),
              1 === t.mipmask
                ? 1 !== a &&
                  1 !== o &&
                  n(
                    e.minFilter !== rt &&
                      e.minFilter !== at &&
                      e.minFilter !== it &&
                      e.minFilter !== ot,
                    "min filter requires mipmap"
                  )
                : (n(
                    O(a) && O(o),
                    "texture must be a square power of 2 to support mipmapping"
                  ),
                  n(
                    t.mipmask === (a << 1) - 1,
                    "missing or incomplete mipmap data"
                  )),
              t.type === ft &&
                (r.extensions.indexOf("oes_texture_float_linear") < 0 &&
                  n(
                    e.minFilter === nt && e.magFilter === nt,
                    "filter not supported, must enable oes_texture_float_linear"
                  ),
                n(
                  !e.genMipmaps,
                  "mipmap generation not supported with float textures"
                ));
            var u = t.images;
            for (i = 0; i < 16; ++i)
              if (u[i]) {
                var s = a >> i,
                  c = o >> i;
                n(t.mipmask & (1 << i), "missing mipmap data");
                var l = u[i];
                if (
                  (n(
                    l.width === s && l.height === c,
                    "invalid shape for mip images"
                  ),
                  n(
                    l.format === t.format &&
                      l.internalformat === t.internalformat &&
                      l.type === t.type,
                    "incompatible type for mip image"
                  ),
                  l.compressed)
                );
                else if (l.data) {
                  var p =
                    Math.ceil((D(l.type, f) * s) / l.unpackAlignment) *
                    l.unpackAlignment;
                  n(
                    l.data.byteLength === p * c,
                    "invalid data for image, buffer size is inconsistent with image format"
                  );
                } else l.element || l.copy;
              } else
                e.genMipmaps ||
                  n(0 == (t.mipmask & (1 << i)), "extra mipmap data");
            t.compressed &&
              n(
                !e.genMipmaps,
                "mipmap generation for compressed images not supported"
              );
          }
          function L(e, t, r, i) {
            var a = e.width,
              o = e.height,
              f = e.channels;
            n(
              a > 0 && a <= i.maxTextureSize && o > 0 && o <= i.maxTextureSize,
              "invalid texture shape"
            ),
              n(a === o, "cube map must be square"),
              n(
                t.wrapS === tt && t.wrapT === tt,
                "wrap mode not supported by cube map"
              );
            for (var u = 0; u < r.length; ++u) {
              var s = r[u];
              n(
                s.width === a && s.height === o,
                "inconsistent cube map face shape"
              ),
                t.genMipmaps &&
                  (n(
                    !s.compressed,
                    "can not generate mipmap for compressed textures"
                  ),
                  n(
                    1 === s.mipmask,
                    "can not specify mipmaps and generate mipmaps"
                  ));
              for (var c = s.images, l = 0; l < 16; ++l) {
                var p = c[l];
                if (p) {
                  var d = a >> l,
                    m = o >> l;
                  n(s.mipmask & (1 << l), "missing mipmap data"),
                    n(
                      p.width === d && p.height === m,
                      "invalid shape for mip images"
                    ),
                    n(
                      p.format === e.format &&
                        p.internalformat === e.internalformat &&
                        p.type === e.type,
                      "incompatible type for mip image"
                    ),
                    p.compressed ||
                      (p.data
                        ? n(
                            p.data.byteLength ===
                              d * m * Math.max(D(p.type, f), p.unpackAlignment),
                            "invalid data for image, buffer size is inconsistent with image format"
                          )
                        : p.element || p.copy);
                }
              }
            }
          }
          function M(e, t) {
            (this.id = mt++), (this.type = e), (this.data = t);
          }
          function z(e) {
            return e.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
          }
          function P(e) {
            if (0 === e.length) return [];
            var t = e.charAt(0),
              n = e.charAt(e.length - 1);
            if (e.length > 1 && t === n && ('"' === t || "'" === t))
              return ['"' + z(e.substr(1, e.length - 2)) + '"'];
            var r = /\[(false|true|null|\d+|'[^']*'|"[^"]*")\]/.exec(e);
            if (r)
              return P(e.substr(0, r.index))
                .concat(P(r[1]))
                .concat(P(e.substr(r.index + r[0].length)));
            var i = e.split(".");
            if (1 === i.length) return ['"' + z(e) + '"'];
            for (var a = [], o = 0; o < i.length; ++o) a = a.concat(P(i[o]));
            return a;
          }
          function B(e) {
            return "[" + P(e).join("][") + "]";
          }
          function F(e, t) {
            return new M(e, B(t + ""));
          }
          function I(e) {
            return ("function" == typeof e && !e._reglType) || e instanceof M;
          }
          function R(e, t) {
            return "function" == typeof e ? new M(ht, e) : e;
          }
          function q() {
            var e = { "": 0 },
              t = [""];
            return {
              id: function (n) {
                var r = e[n];
                return r || ((r = e[n] = t.length), t.push(n), r);
              },
              str: function (e) {
                return t[e];
              },
            };
          }
          function H(e, t, n) {
            function r() {
              var t = window.innerWidth,
                r = window.innerHeight;
              if (e !== document.body) {
                var i = e.getBoundingClientRect();
                (t = i.right - i.left), (r = i.bottom - i.top);
              }
              (a.width = n * t),
                (a.height = n * r),
                Je(a.style, { width: t + "px", height: r + "px" });
            }
            function i() {
              window.removeEventListener("resize", r), e.removeChild(a);
            }
            var a = document.createElement("canvas");
            return (
              Je(a.style, {
                border: 0,
                margin: 0,
                padding: 0,
                top: 0,
                left: 0,
              }),
              e.appendChild(a),
              e === document.body &&
                ((a.style.position = "absolute"),
                Je(e.style, { margin: 0, padding: 0 })),
              window.addEventListener("resize", r, !1),
              r(),
              { canvas: a, onDestroy: i }
            );
          }
          function W(e, t) {
            function n(n) {
              try {
                return e.getContext(n, t);
              } catch (e) {
                return null;
              }
            }
            return (
              n("webgl") || n("experimental-webgl") || n("webgl-experimental")
            );
          }
          function U(e) {
            return (
              "string" == typeof e.nodeName &&
              "function" == typeof e.appendChild &&
              "function" == typeof e.getBoundingClientRect
            );
          }
          function N(e) {
            return (
              "function" == typeof e.drawArrays ||
              "function" == typeof e.drawElements
            );
          }
          function G(e) {
            return "string" == typeof e
              ? e.split()
              : (dt(Array.isArray(e), "invalid extension array"), e);
          }
          function V(e) {
            return "string" == typeof e
              ? (dt(
                  "undefined" != typeof document,
                  "not supported outside of DOM"
                ),
                document.querySelector(e))
              : e;
          }
          function Q(e) {
            var t,
              n,
              r,
              i,
              a = e || {},
              o = {},
              f = [],
              u = [],
              s = "undefined" == typeof window ? 1 : window.devicePixelRatio,
              c = !1,
              l = function (e) {
                e && dt.raise(e);
              },
              p = function () {};
            if (
              ("string" == typeof a
                ? (dt(
                    "undefined" != typeof document,
                    "selector queries only supported in DOM enviroments"
                  ),
                  (t = document.querySelector(a)),
                  dt(t, "invalid query string for element"))
                : "object" == typeof a
                ? U(a)
                  ? (t = a)
                  : N(a)
                  ? (r = (i = a).canvas)
                  : (dt.constructor(a),
                    "gl" in a
                      ? (i = a.gl)
                      : "canvas" in a
                      ? (r = V(a.canvas))
                      : "container" in a && (n = V(a.container)),
                    "attributes" in a &&
                      ((o = a.attributes),
                      dt.type(o, "object", "invalid context attributes")),
                    "extensions" in a && (f = G(a.extensions)),
                    "optionalExtensions" in a && (u = G(a.optionalExtensions)),
                    "onDone" in a &&
                      (dt.type(
                        a.onDone,
                        "function",
                        "invalid or missing onDone callback"
                      ),
                      (l = a.onDone)),
                    "profile" in a && (c = !!a.profile),
                    "pixelRatio" in a &&
                      dt((s = +a.pixelRatio) > 0, "invalid pixel ratio"))
                : dt.raise("invalid arguments to regl"),
              t && ("canvas" === t.nodeName.toLowerCase() ? (r = t) : (n = t)),
              !i)
            ) {
              if (!r) {
                dt(
                  "undefined" != typeof document,
                  "must manually specify webgl context outside of DOM environments"
                );
                var d = H(n || document.body, l, s);
                if (!d) return null;
                (r = d.canvas), (p = d.onDestroy);
              }
              i = W(r, o);
            }
            return i
              ? {
                  gl: i,
                  canvas: r,
                  container: n,
                  extensions: f,
                  optionalExtensions: u,
                  pixelRatio: s,
                  profile: c,
                  onDone: l,
                  onDestroy: p,
                }
              : (p(),
                l(
                  "webgl not supported, try upgrading your browser or graphics drivers http://get.webgl.org"
                ),
                null);
          }
          function Y(e, t) {
            function n(t) {
              dt.type(t, "string", "extension name must be string");
              var n,
                i = t.toLowerCase();
              try {
                n = r[i] = e.getExtension(i);
              } catch (e) {}
              return !!n;
            }
            for (var r = {}, i = 0; i < t.extensions.length; ++i) {
              var a = t.extensions[i];
              if (!n(a))
                return (
                  t.onDestroy(),
                  t.onDone(
                    '"' +
                      a +
                      '" extension is not supported by the current WebGL context, try upgrading your system or a different browser'
                  ),
                  null
                );
            }
            return (
              t.optionalExtensions.forEach(n),
              {
                extensions: r,
                restore: function () {
                  Object.keys(r).forEach(function (e) {
                    if (!n(e))
                      throw new Error("(regl): error restoring extension " + e);
                  });
                },
              }
            );
          }
          function X(e) {
            return (
              !!e &&
              "object" == typeof e &&
              Array.isArray(e.shape) &&
              Array.isArray(e.stride) &&
              "number" == typeof e.offset &&
              e.shape.length === e.stride.length &&
              (Array.isArray(e.data) || Ke(e.data))
            );
          }
          function $(e, t) {
            for (var n = Array(e), r = 0; r < e; ++r) n[r] = t(r);
            return n;
          }
          function Z(e) {
            for (var t = 16; t <= 1 << 28; t *= 16) if (e <= t) return t;
            return 0;
          }
          function K(e) {
            var t, n;
            return (
              (t = (e > 65535) << 4),
              (e >>>= t),
              (n = (e > 255) << 3),
              (e >>>= n),
              (t |= n),
              (n = (e > 15) << 2),
              (e >>>= n),
              (t |= n),
              (n = (e > 3) << 1),
              (e >>>= n),
              (t |= n) | (e >> 1)
            );
          }
          function J(e) {
            var t = Z(e),
              n = jt[K(t) >> 2];
            return n.length > 0 ? n.pop() : new ArrayBuffer(t);
          }
          function ee(e) {
            jt[K(e.byteLength) >> 2].push(e);
          }
          function te(e, t) {
            var n = null;
            switch (e) {
              case wt:
                n = new Int8Array(J(t), 0, t);
                break;
              case _t:
                n = new Uint8Array(J(t), 0, t);
                break;
              case kt:
                n = new Int16Array(J(2 * t), 0, t);
                break;
              case Et:
                n = new Uint16Array(J(2 * t), 0, t);
                break;
              case At:
                n = new Int32Array(J(4 * t), 0, t);
                break;
              case St:
                n = new Uint32Array(J(4 * t), 0, t);
                break;
              case Tt:
                n = new Float32Array(J(4 * t), 0, t);
                break;
              default:
                return null;
            }
            return n.length !== t ? n.subarray(0, t) : n;
          }
          function ne(e) {
            ee(e.buffer);
          }
          function re(e, t, n) {
            for (var r = 0; r < t; ++r) n[r] = e[r];
          }
          function ie(e, t, n, r) {
            for (var i = 0, a = 0; a < t; ++a)
              for (var o = e[a], f = 0; f < n; ++f) r[i++] = o[f];
          }
          function ae(e, t, n, r, i, a) {
            for (var o = a, f = 0; f < t; ++f)
              for (var u = e[f], s = 0; s < n; ++s)
                for (var c = u[s], l = 0; l < r; ++l) i[o++] = c[l];
          }
          function oe(e, t, n, r, i) {
            for (var a = 1, o = n + 1; o < t.length; ++o) a *= t[o];
            var f = t[n];
            if (t.length - n == 4) {
              var u = t[n + 1],
                s = t[n + 2],
                c = t[n + 3];
              for (o = 0; o < f; ++o) ae(e[o], u, s, c, r, i), (i += a);
            } else for (o = 0; o < f; ++o) oe(e[o], t, n + 1, r, i), (i += a);
          }
          function fe(e, t, n, r) {
            var i = 1;
            if (t.length) for (var a = 0; a < t.length; ++a) i *= t[a];
            else i = 0;
            var o = r || Dt.allocType(n, i);
            switch (t.length) {
              case 0:
                break;
              case 1:
                re(e, t[0], o);
                break;
              case 2:
                ie(e, t[0], t[1], o);
                break;
              case 3:
                ae(e, t[0], t[1], t[2], o, 0);
                break;
              default:
                oe(e, t, 0, o, 0);
            }
            return o;
          }
          function ue(e) {
            for (var t = [], n = e; n.length; n = n[0]) t.push(n.length);
            return t;
          }
          function se(e) {
            return 0 | Ze[Object.prototype.toString.call(e)];
          }
          function ce(e, t) {
            for (var n = 0; n < t.length; ++n) e[n] = t[n];
          }
          function le(e, t, n, r, i, a, o) {
            for (var f = 0, u = 0; u < n; ++u)
              for (var s = 0; s < r; ++s) e[f++] = t[i * u + a * s + o];
          }
          function pe(e, t, n) {
            function r(t) {
              (this.id = l++),
                (this.buffer = e.createBuffer()),
                (this.type = t),
                (this.usage = Pt),
                (this.byteLength = 0),
                (this.dimension = 1),
                (this.dtype = Ft),
                (this.persistentData = null),
                n.profile && (this.stats = { size: 0 });
            }
            function i(e, t) {
              var n = d.pop();
              return n || (n = new r(e)), n.bind(), f(n, t, Bt, 0, 1, !1), n;
            }
            function a(e) {
              d.push(e);
            }
            function o(t, n, r) {
              (t.byteLength = n.byteLength), e.bufferData(t.type, n, r);
            }
            function f(e, t, n, r, i, a) {
              var f;
              if (((e.usage = n), Array.isArray(t))) {
                if (((e.dtype = r || It), t.length > 0)) {
                  var u;
                  if (Array.isArray(t[0])) {
                    f = zt(t);
                    for (var s = 1, c = 1; c < f.length; ++c) s *= f[c];
                    (e.dimension = s),
                      o(e, (u = Mt(t, f, e.dtype)), n),
                      a ? (e.persistentData = u) : Dt.freeType(u);
                  } else if ("number" == typeof t[0]) {
                    e.dimension = i;
                    var l = Dt.allocType(e.dtype, t.length);
                    ce(l, t),
                      o(e, l, n),
                      a ? (e.persistentData = l) : Dt.freeType(l);
                  } else
                    Ke(t[0])
                      ? ((e.dimension = t[0].length),
                        (e.dtype = r || se(t[0]) || It),
                        o(e, (u = Mt(t, [t.length, t[0].length], e.dtype)), n),
                        a ? (e.persistentData = u) : Dt.freeType(u))
                      : dt.raise("invalid buffer data");
                }
              } else if (Ke(t))
                (e.dtype = r || se(t)),
                  (e.dimension = i),
                  o(e, t, n),
                  a &&
                    (e.persistentData = new Uint8Array(
                      new Uint8Array(t.buffer)
                    ));
              else if (X(t)) {
                f = t.shape;
                var p = t.stride,
                  d = t.offset,
                  m = 0,
                  h = 0,
                  v = 0,
                  g = 0;
                1 === f.length
                  ? ((m = f[0]), (h = 1), (v = p[0]), (g = 0))
                  : 2 === f.length
                  ? ((m = f[0]), (h = f[1]), (v = p[0]), (g = p[1]))
                  : dt.raise("invalid shape"),
                  (e.dtype = r || se(t.data) || It),
                  (e.dimension = h);
                var b = Dt.allocType(e.dtype, m * h);
                le(b, t.data, m, h, v, g, d),
                  o(e, b, n),
                  a ? (e.persistentData = b) : Dt.freeType(b);
              } else dt.raise("invalid buffer data");
            }
            function u(n) {
              t.bufferCount--;
              var r = n.buffer;
              dt(r, "buffer must not be deleted already"),
                e.deleteBuffer(r),
                (n.buffer = null),
                delete p[n.id];
            }
            function s(i, a, o, s) {
              function c(t) {
                var r = Pt,
                  i = null,
                  a = 0,
                  o = 0,
                  u = 1;
                return (
                  Array.isArray(t) || Ke(t) || X(t)
                    ? (i = t)
                    : "number" == typeof t
                    ? (a = 0 | t)
                    : t &&
                      (dt.type(
                        t,
                        "object",
                        "buffer arguments must be an object, a number or an array"
                      ),
                      "data" in t &&
                        (dt(
                          null === i || Array.isArray(i) || Ke(i) || X(i),
                          "invalid data for buffer"
                        ),
                        (i = t.data)),
                      "usage" in t &&
                        (dt.parameter(t.usage, Lt, "invalid buffer usage"),
                        (r = Lt[t.usage])),
                      "type" in t &&
                        (dt.parameter(t.type, Ct, "invalid buffer type"),
                        (o = Ct[t.type])),
                      "dimension" in t &&
                        (dt.type(t.dimension, "number", "invalid dimension"),
                        (u = 0 | t.dimension)),
                      "length" in t &&
                        (dt.nni(
                          a,
                          "buffer length must be a nonnegative integer"
                        ),
                        (a = 0 | t.length))),
                  m.bind(),
                  i
                    ? f(m, i, r, o, u, s)
                    : (e.bufferData(m.type, a, r),
                      (m.dtype = o || Ft),
                      (m.usage = r),
                      (m.dimension = u),
                      (m.byteLength = a)),
                  n.profile && (m.stats.size = m.byteLength * Rt[m.dtype]),
                  c
                );
              }
              function l(t, n) {
                dt(
                  n + t.byteLength <= m.byteLength,
                  "invalid buffer subdata call, buffer is too small.  Can't write data of size " +
                    t.byteLength +
                    " starting from offset " +
                    n +
                    " to a buffer of size " +
                    m.byteLength
                ),
                  e.bufferSubData(m.type, n, t);
              }
              function d(e, t) {
                var n,
                  r = 0 | (t || 0);
                if ((m.bind(), Array.isArray(e))) {
                  if (e.length > 0)
                    if ("number" == typeof e[0]) {
                      var i = Dt.allocType(m.dtype, e.length);
                      ce(i, e), l(i, r), Dt.freeType(i);
                    } else if (Array.isArray(e[0]) || Ke(e[0])) {
                      n = zt(e);
                      var a = Mt(e, n, m.dtype);
                      l(a, r), Dt.freeType(a);
                    } else dt.raise("invalid buffer data");
                } else if (Ke(e)) l(e, r);
                else if (X(e)) {
                  n = e.shape;
                  var o = e.stride,
                    f = 0,
                    u = 0,
                    s = 0,
                    p = 0;
                  1 === n.length
                    ? ((f = n[0]), (u = 1), (s = o[0]), (p = 0))
                    : 2 === n.length
                    ? ((f = n[0]), (u = n[1]), (s = o[0]), (p = o[1]))
                    : dt.raise("invalid shape");
                  var d = Array.isArray(e.data) ? m.dtype : se(e.data),
                    h = Dt.allocType(d, f * u);
                  le(h, e.data, f, u, s, p, e.offset), l(h, r), Dt.freeType(h);
                } else dt.raise("invalid data for buffer subdata");
                return c;
              }
              t.bufferCount++;
              var m = new r(a);
              return (
                (p[m.id] = m),
                o || c(i),
                (c._reglType = "buffer"),
                (c._buffer = m),
                (c.subdata = d),
                n.profile && (c.stats = m.stats),
                (c.destroy = function () {
                  u(m);
                }),
                c
              );
            }
            function c() {
              xt(p).forEach(function (t) {
                (t.buffer = e.createBuffer()),
                  e.bindBuffer(t.type, t.buffer),
                  e.bufferData(
                    t.type,
                    t.persistentData || t.byteLength,
                    t.usage
                  );
              });
            }
            var l = 0,
              p = {};
            (r.prototype.bind = function () {
              e.bindBuffer(this.type, this.buffer);
            }),
              (r.prototype.destroy = function () {
                u(this);
              });
            var d = [];
            return (
              n.profile &&
                (t.getTotalBufferSize = function () {
                  var e = 0;
                  return (
                    Object.keys(p).forEach(function (t) {
                      e += p[t].stats.size;
                    }),
                    e
                  );
                }),
              {
                create: s,
                createStream: i,
                destroyStream: a,
                clear: function () {
                  xt(p).forEach(u), d.forEach(u);
                },
                getBuffer: function (e) {
                  return e && e._buffer instanceof r ? e._buffer : null;
                },
                restore: c,
                _initBuffer: f,
              }
            );
          }
          function de(e, t, n, r) {
            function i(e) {
              (this.id = l++),
                (c[this.id] = this),
                (this.buffer = e),
                (this.primType = Ut),
                (this.vertCount = 0),
                (this.type = 0);
            }
            function a(e) {
              var t = d.pop();
              return (
                t || (t = new i(n.create(null, $t, !0, !1)._buffer)),
                f(t, e, Zt, -1, -1, 0, 0),
                t
              );
            }
            function o(e) {
              d.push(e);
            }
            function f(r, i, a, o, f, u, s) {
              if ((r.buffer.bind(), i)) {
                var c = s;
                s ||
                  (Ke(i) && (!X(i) || Ke(i.data))) ||
                  (c = t.oes_element_index_uint ? Xt : Qt),
                  n._initBuffer(r.buffer, i, a, c, 3);
              } else e.bufferData($t, u, a), (r.buffer.dtype = l || Gt), (r.buffer.usage = a), (r.buffer.dimension = 3), (r.buffer.byteLength = u);
              var l = s;
              if (!s) {
                switch (r.buffer.dtype) {
                  case Gt:
                  case Nt:
                    l = Gt;
                    break;
                  case Qt:
                  case Vt:
                    l = Qt;
                    break;
                  case Xt:
                  case Yt:
                    l = Xt;
                    break;
                  default:
                    dt.raise("unsupported type for element array");
                }
                r.buffer.dtype = l;
              }
              (r.type = l),
                dt(
                  l !== Xt || !!t.oes_element_index_uint,
                  "32 bit element buffers not supported, enable oes_element_index_uint first"
                );
              var p = f;
              p < 0 &&
                ((p = r.buffer.byteLength),
                l === Qt ? (p >>= 1) : l === Xt && (p >>= 2)),
                (r.vertCount = p);
              var d = o;
              if (o < 0) {
                d = Ut;
                var m = r.buffer.dimension;
                1 === m && (d = Ht), 2 === m && (d = Wt), 3 === m && (d = Ut);
              }
              r.primType = d;
            }
            function u(e) {
              r.elementsCount--,
                dt(null !== e.buffer, "must not double destroy elements"),
                delete c[e.id],
                e.buffer.destroy(),
                (e.buffer = null);
            }
            function s(e, t) {
              function a(e) {
                if (e)
                  if ("number" == typeof e)
                    o(e),
                      (s.primType = Ut),
                      (s.vertCount = 0 | e),
                      (s.type = Gt);
                  else {
                    var t = null,
                      n = Kt,
                      r = -1,
                      i = -1,
                      u = 0,
                      c = 0;
                    Array.isArray(e) || Ke(e) || X(e)
                      ? (t = e)
                      : (dt.type(e, "object", "invalid arguments for elements"),
                        "data" in e &&
                          ((t = e.data),
                          dt(
                            Array.isArray(t) || Ke(t) || X(t),
                            "invalid data for element buffer"
                          )),
                        "usage" in e &&
                          (dt.parameter(
                            e.usage,
                            Lt,
                            "invalid element buffer usage"
                          ),
                          (n = Lt[e.usage])),
                        "primitive" in e &&
                          (dt.parameter(
                            e.primitive,
                            qt,
                            "invalid element buffer primitive"
                          ),
                          (r = qt[e.primitive])),
                        "count" in e &&
                          (dt(
                            "number" == typeof e.count && e.count >= 0,
                            "invalid vertex count for elements"
                          ),
                          (i = 0 | e.count)),
                        "type" in e &&
                          (dt.parameter(e.type, p, "invalid buffer type"),
                          (c = p[e.type])),
                        "length" in e
                          ? (u = 0 | e.length)
                          : ((u = i),
                            c === Qt || c === Vt
                              ? (u *= 2)
                              : (c !== Xt && c !== Yt) || (u *= 4))),
                      f(s, t, n, r, i, u, c);
                  }
                else o(), (s.primType = Ut), (s.vertCount = 0), (s.type = Gt);
                return a;
              }
              var o = n.create(null, $t, !0),
                s = new i(o._buffer);
              return (
                r.elementsCount++,
                a(e),
                (a._reglType = "elements"),
                (a._elements = s),
                (a.subdata = function (e, t) {
                  return o.subdata(e, t), a;
                }),
                (a.destroy = function () {
                  u(s);
                }),
                a
              );
            }
            var c = {},
              l = 0,
              p = { uint8: Gt, uint16: Qt };
            t.oes_element_index_uint && (p.uint32 = Xt),
              (i.prototype.bind = function () {
                this.buffer.bind();
              });
            var d = [];
            return {
              create: s,
              createStream: a,
              destroyStream: o,
              getElements: function (e) {
                return "function" == typeof e && e._elements instanceof i
                  ? e._elements
                  : null;
              },
              clear: function () {
                xt(c).forEach(u);
              },
            };
          }
          function me(e) {
            for (var t = Dt.allocType(tn, e.length), n = 0; n < e.length; ++n)
              if (isNaN(e[n])) t[n] = 65535;
              else if (e[n] === 1 / 0) t[n] = 31744;
              else if (e[n] === -1 / 0) t[n] = 64512;
              else {
                Jt[0] = e[n];
                var r = en[0],
                  i = (r >>> 31) << 15,
                  a = ((r << 1) >>> 24) - 127,
                  o = (r >> 13) & 1023;
                if (a < -24) t[n] = i;
                else if (a < -14) {
                  var f = -14 - a;
                  t[n] = i + ((o + 1024) >> f);
                } else t[n] = a > 15 ? i + 31744 : i + ((a + 15) << 10) + o;
              }
            return t;
          }
          function he(e) {
            return Array.isArray(e) || Ke(e);
          }
          function ve(e) {
            return "[object " + e + "]";
          }
          function ge(e) {
            return (
              Array.isArray(e) && (0 === e.length || "number" == typeof e[0])
            );
          }
          function be(e) {
            return !!Array.isArray(e) && !(0 === e.length || !he(e[0]));
          }
          function ye(e) {
            return Object.prototype.toString.call(e);
          }
          function xe(e) {
            return ye(e) === dr;
          }
          function we(e) {
            return ye(e) === mr;
          }
          function _e(e) {
            return ye(e) === hr;
          }
          function ke(e) {
            return ye(e) === vr;
          }
          function Ee(e) {
            if (!e) return !1;
            var t = ye(e);
            return gr.indexOf(t) >= 0 || ge(e) || be(e) || X(e);
          }
          function Ae(e) {
            return 0 | Ze[Object.prototype.toString.call(e)];
          }
          function Se(e, t) {
            var n = t.length;
            switch (e.type) {
              case Bn:
              case Fn:
              case In:
              case Rn:
                var r = Dt.allocType(e.type, n);
                r.set(t), (e.data = r);
                break;
              case kn:
                e.data = me(t);
                break;
              default:
                dt.raise(
                  "unsupported texture type, must specify a typed array"
                );
            }
          }
          function Te(e, t) {
            return Dt.allocType(e.type === kn ? Rn : e.type, t);
          }
          function je(e, t) {
            e.type === kn ? ((e.data = me(t)), Dt.freeType(t)) : (e.data = t);
          }
          function De(e, t, n, r, i, a) {
            for (
              var o = e.width,
                f = e.height,
                u = e.channels,
                s = Te(e, o * f * u),
                c = 0,
                l = 0;
              l < f;
              ++l
            )
              for (var p = 0; p < o; ++p)
                for (var d = 0; d < u; ++d)
                  s[c++] = t[n * p + r * l + i * d + a];
            je(e, s);
          }
          function Oe(e, t, n, r, i, a) {
            var o;
            if (
              ((o = void 0 !== yr[e] ? yr[e] : pr[e] * br[t]), a && (o *= 6), i)
            ) {
              for (var f = 0, u = n; u >= 1; ) (f += o * u * u), (u /= 2);
              return f;
            }
            return o * n * r;
          }
          function Ce(e, t, n, r, i, a, o) {
            function f() {
              (this.internalformat = fn),
                (this.format = fn),
                (this.type = Bn),
                (this.compressed = !1),
                (this.premultiplyAlpha = !1),
                (this.flipY = !1),
                (this.unpackAlignment = 1),
                (this.colorSpace = 0),
                (this.width = 0),
                (this.height = 0),
                (this.channels = 0);
            }
            function u(e, t) {
              (e.internalformat = t.internalformat),
                (e.format = t.format),
                (e.type = t.type),
                (e.compressed = t.compressed),
                (e.premultiplyAlpha = t.premultiplyAlpha),
                (e.flipY = t.flipY),
                (e.unpackAlignment = t.unpackAlignment),
                (e.colorSpace = t.colorSpace),
                (e.width = t.width),
                (e.height = t.height),
                (e.channels = t.channels);
            }
            function s(e, r) {
              if ("object" == typeof r && r) {
                if (
                  ("premultiplyAlpha" in r &&
                    (dt.type(
                      r.premultiplyAlpha,
                      "boolean",
                      "invalid premultiplyAlpha"
                    ),
                    (e.premultiplyAlpha = r.premultiplyAlpha)),
                  "flipY" in r &&
                    (dt.type(r.flipY, "boolean", "invalid texture flip"),
                    (e.flipY = r.flipY)),
                  "alignment" in r &&
                    (dt.oneOf(
                      r.alignment,
                      [1, 2, 4, 8],
                      "invalid texture unpack alignment"
                    ),
                    (e.unpackAlignment = r.alignment)),
                  "colorSpace" in r &&
                    (dt.parameter(r.colorSpace, I, "invalid colorSpace"),
                    (e.colorSpace = I[r.colorSpace])),
                  "type" in r)
                ) {
                  var i = r.type;
                  dt(
                    t.oes_texture_float || !("float" === i || "float32" === i),
                    "you must enable the OES_texture_float extension in order to use floating point textures."
                  ),
                    dt(
                      t.oes_texture_half_float ||
                        !("half float" === i || "float16" === i),
                      "you must enable the OES_texture_half_float extension in order to use 16-bit floating point textures."
                    ),
                    dt(
                      t.webgl_depth_texture ||
                        !(
                          "uint16" === i ||
                          "uint32" === i ||
                          "depth stencil" === i
                        ),
                      "you must enable the WEBGL_depth_texture extension in order to use depth/stencil textures."
                    ),
                    dt.parameter(i, R, "invalid texture type"),
                    (e.type = R[i]);
                }
                var a = e.width,
                  o = e.height,
                  f = e.channels,
                  u = !1;
                "shape" in r
                  ? (dt(
                      Array.isArray(r.shape) && r.shape.length >= 2,
                      "shape must be an array"
                    ),
                    (a = r.shape[0]),
                    (o = r.shape[1]),
                    3 === r.shape.length &&
                      ((f = r.shape[2]),
                      dt(f > 0 && f <= 4, "invalid number of channels"),
                      (u = !0)),
                    dt(a >= 0 && a <= n.maxTextureSize, "invalid width"),
                    dt(o >= 0 && o <= n.maxTextureSize, "invalid height"))
                  : ("radius" in r &&
                      ((a = o = r.radius),
                      dt(a >= 0 && a <= n.maxTextureSize, "invalid radius")),
                    "width" in r &&
                      ((a = r.width),
                      dt(a >= 0 && a <= n.maxTextureSize, "invalid width")),
                    "height" in r &&
                      ((o = r.height),
                      dt(o >= 0 && o <= n.maxTextureSize, "invalid height")),
                    "channels" in r &&
                      ((f = r.channels),
                      dt(f > 0 && f <= 4, "invalid number of channels"),
                      (u = !0))),
                  (e.width = 0 | a),
                  (e.height = 0 | o),
                  (e.channels = 0 | f);
                var s = !1;
                if ("format" in r) {
                  var c = r.format;
                  dt(
                    t.webgl_depth_texture ||
                      !("depth" === c || "depth stencil" === c),
                    "you must enable the WEBGL_depth_texture extension in order to use depth/stencil textures."
                  ),
                    dt.parameter(c, q, "invalid texture format");
                  var l = (e.internalformat = q[c]);
                  (e.format = $[l]),
                    c in R && ("type" in r || (e.type = R[c])),
                    c in H && (e.compressed = !0),
                    (s = !0);
                }
                !u && s
                  ? (e.channels = pr[e.format])
                  : u && !s
                  ? e.channels !== lr[e.format] &&
                    (e.format = e.internalformat = lr[e.channels])
                  : s &&
                    u &&
                    dt(
                      e.channels === pr[e.format],
                      "number of channels inconsistent with specified format"
                    );
              }
            }
            function c(t) {
              e.pixelStorei(ar, t.flipY),
                e.pixelStorei(or, t.premultiplyAlpha),
                e.pixelStorei(fr, t.colorSpace),
                e.pixelStorei(ir, t.unpackAlignment);
            }
            function l() {
              f.call(this),
                (this.xOffset = 0),
                (this.yOffset = 0),
                (this.data = null),
                (this.needsFree = !1),
                (this.element = null),
                (this.needsCopy = !1);
            }
            function p(e, t) {
              var r = null;
              if (
                (Ee(t)
                  ? (r = t)
                  : t &&
                    (dt.type(t, "object", "invalid pixel data type"),
                    s(e, t),
                    "x" in t && (e.xOffset = 0 | t.x),
                    "y" in t && (e.yOffset = 0 | t.y),
                    Ee(t.data) && (r = t.data)),
                dt(
                  !e.compressed || r instanceof Uint8Array,
                  "compressed texture data must be stored in a uint8array"
                ),
                t.copy)
              ) {
                dt(
                  !r,
                  "can not specify copy and data field for the same texture"
                );
                var a = i.viewportWidth,
                  o = i.viewportHeight;
                (e.width = e.width || a - e.xOffset),
                  (e.height = e.height || o - e.yOffset),
                  (e.needsCopy = !0),
                  dt(
                    e.xOffset >= 0 &&
                      e.xOffset < a &&
                      e.yOffset >= 0 &&
                      e.yOffset < o &&
                      e.width > 0 &&
                      e.width <= a &&
                      e.height > 0 &&
                      e.height <= o,
                    "copy texture read out of bounds"
                  );
              } else if (r) {
                if (Ke(r))
                  (e.channels = e.channels || 4),
                    (e.data = r),
                    "type" in t || e.type !== Bn || (e.type = Ae(r));
                else if (ge(r))
                  (e.channels = e.channels || 4),
                    Se(e, r),
                    (e.alignment = 1),
                    (e.needsFree = !0);
                else if (X(r)) {
                  var f = r.data;
                  Array.isArray(f) || e.type !== Bn || (e.type = Ae(f));
                  var u,
                    c,
                    l,
                    p,
                    d,
                    m,
                    h = r.shape,
                    v = r.stride;
                  3 === h.length
                    ? ((l = h[2]), (m = v[2]))
                    : (dt(
                        2 === h.length,
                        "invalid ndarray pixel data, must be 2 or 3D"
                      ),
                      (l = 1),
                      (m = 1)),
                    (u = h[0]),
                    (c = h[1]),
                    (p = v[0]),
                    (d = v[1]),
                    (e.alignment = 1),
                    (e.width = u),
                    (e.height = c),
                    (e.channels = l),
                    (e.format = e.internalformat = lr[l]),
                    (e.needsFree = !0),
                    De(e, f, p, d, m, r.offset);
                } else if (xe(r) || we(r))
                  xe(r) ? (e.element = r) : (e.element = r.canvas),
                    (e.width = e.element.width),
                    (e.height = e.element.height),
                    (e.channels = 4);
                else if (_e(r))
                  (e.element = r),
                    (e.width = r.naturalWidth),
                    (e.height = r.naturalHeight),
                    (e.channels = 4);
                else if (ke(r))
                  (e.element = r),
                    (e.width = r.videoWidth),
                    (e.height = r.videoHeight),
                    (e.channels = 4);
                else if (be(r)) {
                  var g = e.width || r[0].length,
                    b = e.height || r.length,
                    y = e.channels;
                  y = he(r[0][0]) ? y || r[0][0].length : y || 1;
                  for (var x = Ot.shape(r), w = 1, _ = 0; _ < x.length; ++_)
                    w *= x[_];
                  var k = Te(e, w);
                  Ot.flatten(r, x, "", k),
                    je(e, k),
                    (e.alignment = 1),
                    (e.width = g),
                    (e.height = b),
                    (e.channels = y),
                    (e.format = e.internalformat = lr[y]),
                    (e.needsFree = !0);
                }
              } else
                (e.width = e.width || 1),
                  (e.height = e.height || 1),
                  (e.channels = e.channels || 4);
              e.type === Rn
                ? dt(
                    n.extensions.indexOf("oes_texture_float") >= 0,
                    "oes_texture_float extension not enabled"
                  )
                : e.type === kn &&
                  dt(
                    n.extensions.indexOf("oes_texture_half_float") >= 0,
                    "oes_texture_half_float extension not enabled"
                  );
            }
            function d(t, n, i) {
              var a = t.element,
                o = t.data,
                f = t.internalformat,
                u = t.format,
                s = t.type,
                l = t.width,
                p = t.height;
              c(t),
                a
                  ? e.texImage2D(n, i, u, u, s, a)
                  : t.compressed
                  ? e.compressedTexImage2D(n, i, f, l, p, 0, o)
                  : t.needsCopy
                  ? (r(),
                    e.copyTexImage2D(n, i, u, t.xOffset, t.yOffset, l, p, 0))
                  : e.texImage2D(n, i, u, l, p, 0, u, s, o);
            }
            function m(t, n, i, a, o) {
              var f = t.element,
                u = t.data,
                s = t.internalformat,
                l = t.format,
                p = t.type,
                d = t.width,
                m = t.height;
              c(t),
                f
                  ? e.texSubImage2D(n, o, i, a, l, p, f)
                  : t.compressed
                  ? e.compressedTexSubImage2D(n, o, i, a, s, d, m, u)
                  : t.needsCopy
                  ? (r(),
                    e.copyTexSubImage2D(n, o, i, a, t.xOffset, t.yOffset, d, m))
                  : e.texSubImage2D(n, o, i, a, d, m, l, p, u);
            }
            function h() {
              return Z.pop() || new l();
            }
            function v(e) {
              e.needsFree && Dt.freeType(e.data), l.call(e), Z.push(e);
            }
            function g() {
              f.call(this),
                (this.genMipmaps = !1),
                (this.mipmapHint = er),
                (this.mipmask = 0),
                (this.images = Array(16));
            }
            function b(e, t, n) {
              var r = (e.images[0] = h());
              (e.mipmask = 1),
                (r.width = e.width = t),
                (r.height = e.height = n),
                (r.channels = e.channels = 4);
            }
            function y(e, t) {
              var n = null;
              if (Ee(t))
                u((n = e.images[0] = h()), e), p(n, t), (e.mipmask = 1);
              else if ((s(e, t), Array.isArray(t.mipmap)))
                for (var r = t.mipmap, i = 0; i < r.length; ++i)
                  u((n = e.images[i] = h()), e),
                    (n.width >>= i),
                    (n.height >>= i),
                    p(n, r[i]),
                    (e.mipmask |= 1 << i);
              else u((n = e.images[0] = h()), e), p(n, t), (e.mipmask = 1);
              u(e, e.images[0]),
                ((e.compressed && e.internalformat === En) ||
                  e.internalformat === An ||
                  e.internalformat === Sn ||
                  e.internalformat === Tn) &&
                  dt(
                    e.width % 4 == 0 && e.height % 4 == 0,
                    "for compressed texture formats, mipmap level 0 must have width and height that are a multiple of 4"
                  );
            }
            function x(e, t) {
              for (var n = e.images, r = 0; r < n.length; ++r) {
                if (!n[r]) return;
                d(n[r], t, r);
              }
            }
            function w() {
              var e = K.pop() || new g();
              f.call(e), (e.mipmask = 0);
              for (var t = 0; t < 16; ++t) e.images[t] = null;
              return e;
            }
            function _(e) {
              for (var t = e.images, n = 0; n < t.length; ++n)
                t[n] && v(t[n]), (t[n] = null);
              K.push(e);
            }
            function k() {
              (this.minFilter = Qn),
                (this.magFilter = Qn),
                (this.wrapS = Un),
                (this.wrapT = Un),
                (this.anisotropic = 1),
                (this.genMipmaps = !1),
                (this.mipmapHint = er);
            }
            function E(e, t) {
              if ("min" in t) {
                var r = t.min;
                dt.parameter(r, F),
                  (e.minFilter = F[r]),
                  cr.indexOf(e.minFilter) >= 0 && (e.genMipmaps = !0);
              }
              if ("mag" in t) {
                var i = t.mag;
                dt.parameter(i, B), (e.magFilter = B[i]);
              }
              var a = e.wrapS,
                o = e.wrapT;
              if ("wrap" in t) {
                var f = t.wrap;
                "string" == typeof f
                  ? (dt.parameter(f, P), (a = o = P[f]))
                  : Array.isArray(f) &&
                    (dt.parameter(f[0], P),
                    dt.parameter(f[1], P),
                    (a = P[f[0]]),
                    (o = P[f[1]]));
              } else {
                if ("wrapS" in t) {
                  var u = t.wrapS;
                  dt.parameter(u, P), (a = P[u]);
                }
                if ("wrapT" in t) {
                  var s = t.wrapT;
                  dt.parameter(s, P), (o = P[s]);
                }
              }
              if (((e.wrapS = a), (e.wrapT = o), "anisotropic" in t)) {
                var c = t.anisotropic;
                dt(
                  "number" == typeof c && c >= 1 && c <= n.maxAnisotropic,
                  "aniso samples must be between 1 and "
                ),
                  (e.anisotropic = t.anisotropic);
              }
              if ("mipmap" in t) {
                var l = !1;
                switch (typeof t.mipmap) {
                  case "string":
                    dt.parameter(t.mipmap, z, "invalid mipmap hint"),
                      (e.mipmapHint = z[t.mipmap]),
                      (e.genMipmaps = !0),
                      (l = !0);
                    break;
                  case "boolean":
                    l = e.genMipmaps = t.mipmap;
                    break;
                  case "object":
                    dt(Array.isArray(t.mipmap), "invalid mipmap type"),
                      (e.genMipmaps = !1),
                      (l = !0);
                    break;
                  default:
                    dt.raise("invalid mipmap type");
                }
                !l || "min" in t || (e.minFilter = Xn);
              }
            }
            function A(n, r) {
              e.texParameteri(r, Vn, n.minFilter),
                e.texParameteri(r, Gn, n.magFilter),
                e.texParameteri(r, qn, n.wrapS),
                e.texParameteri(r, Hn, n.wrapT),
                t.ext_texture_filter_anisotropic &&
                  e.texParameteri(r, rr, n.anisotropic),
                n.genMipmaps && (e.hint(Jn, n.mipmapHint), e.generateMipmap(r));
            }
            function S(t) {
              f.call(this),
                (this.mipmask = 0),
                (this.internalformat = fn),
                (this.id = J++),
                (this.refCount = 1),
                (this.target = t),
                (this.texture = e.createTexture()),
                (this.unit = -1),
                (this.bindCount = 0),
                (this.texInfo = new k()),
                o.profile && (this.stats = { size: 0 });
            }
            function T(t) {
              e.activeTexture(sr), e.bindTexture(t.target, t.texture);
            }
            function j() {
              var t = ne[0];
              t ? e.bindTexture(t.target, t.texture) : e.bindTexture(rn, null);
            }
            function D(t) {
              var n = t.texture;
              dt(n, "must not double destroy texture");
              var r = t.unit,
                i = t.target;
              r >= 0 &&
                (e.activeTexture(sr + r),
                e.bindTexture(i, null),
                (ne[r] = null)),
                e.deleteTexture(n),
                (t.texture = null),
                (t.params = null),
                (t.pixels = null),
                (t.refCount = 0),
                delete ee[t.id],
                a.textureCount--;
            }
            function O(t, r) {
              function i(e, t) {
                var r = c.texInfo;
                k.call(r);
                var a = w();
                return (
                  "number" == typeof e
                    ? "number" == typeof t
                      ? b(a, 0 | e, 0 | t)
                      : b(a, 0 | e, 0 | e)
                    : e
                    ? (dt.type(
                        e,
                        "object",
                        "invalid arguments to regl.texture"
                      ),
                      E(r, e),
                      y(a, e))
                    : b(a, 1, 1),
                  r.genMipmaps && (a.mipmask = (a.width << 1) - 1),
                  (c.mipmask = a.mipmask),
                  u(c, a),
                  dt.texture2D(r, a, n),
                  (c.internalformat = a.internalformat),
                  (i.width = a.width),
                  (i.height = a.height),
                  T(c),
                  x(a, rn),
                  A(r, rn),
                  j(),
                  _(a),
                  o.profile &&
                    (c.stats.size = Oe(
                      c.internalformat,
                      c.type,
                      a.width,
                      a.height,
                      r.genMipmaps,
                      !1
                    )),
                  (i.format = N[c.internalformat]),
                  (i.type = G[c.type]),
                  (i.mag = V[r.magFilter]),
                  (i.min = Q[r.minFilter]),
                  (i.wrapS = Y[r.wrapS]),
                  (i.wrapT = Y[r.wrapT]),
                  i
                );
              }
              function f(e, t, n, r) {
                dt(!!e, "must specify image data");
                var a = 0 | t,
                  o = 0 | n,
                  f = 0 | r,
                  s = h();
                return (
                  u(s, c),
                  (s.width = 0),
                  (s.height = 0),
                  p(s, e),
                  (s.width = s.width || (c.width >> f) - a),
                  (s.height = s.height || (c.height >> f) - o),
                  dt(
                    c.type === s.type &&
                      c.format === s.format &&
                      c.internalformat === s.internalformat,
                    "incompatible format for texture.subimage"
                  ),
                  dt(
                    a >= 0 &&
                      o >= 0 &&
                      a + s.width <= c.width &&
                      o + s.height <= c.height,
                    "texture.subimage write out of bounds"
                  ),
                  dt(c.mipmask & (1 << f), "missing mipmap data"),
                  dt(s.data || s.element || s.needsCopy, "missing image data"),
                  T(c),
                  m(s, rn, a, o, f),
                  j(),
                  v(s),
                  i
                );
              }
              function s(t, n) {
                var r = 0 | t,
                  a = 0 | n || r;
                if (r === c.width && a === c.height) return i;
                (i.width = c.width = r), (i.height = c.height = a), T(c);
                for (var f = 0; c.mipmask >> f; ++f)
                  e.texImage2D(
                    rn,
                    f,
                    c.format,
                    r >> f,
                    a >> f,
                    0,
                    c.format,
                    c.type,
                    null
                  );
                return (
                  j(),
                  o.profile &&
                    (c.stats.size = Oe(c.internalformat, c.type, r, a, !1, !1)),
                  i
                );
              }
              var c = new S(rn);
              return (
                (ee[c.id] = c),
                a.textureCount++,
                i(t, r),
                (i.subimage = f),
                (i.resize = s),
                (i._reglType = "texture2d"),
                (i._texture = c),
                o.profile && (i.stats = c.stats),
                (i.destroy = function () {
                  c.decRef();
                }),
                i
              );
            }
            function C(t, r, i, f, c, l) {
              function d(e, t, r, i, a, f) {
                var c,
                  l = O.texInfo;
                for (k.call(l), c = 0; c < 6; ++c) C[c] = w();
                if ("number" != typeof e && e)
                  if ("object" == typeof e)
                    if (t)
                      y(C[0], e),
                        y(C[1], t),
                        y(C[2], r),
                        y(C[3], i),
                        y(C[4], a),
                        y(C[5], f);
                    else if ((E(l, e), s(O, e), "faces" in e)) {
                      var p = e.faces;
                      for (
                        dt(
                          Array.isArray(p) && 6 === p.length,
                          "cube faces must be a length 6 array"
                        ),
                          c = 0;
                        c < 6;
                        ++c
                      )
                        dt(
                          "object" == typeof p[c] && !!p[c],
                          "invalid input for cube map face"
                        ),
                          u(C[c], O),
                          y(C[c], p[c]);
                    } else for (c = 0; c < 6; ++c) y(C[c], e);
                  else dt.raise("invalid arguments to cube map");
                else {
                  var m = 0 | e || 1;
                  for (c = 0; c < 6; ++c) b(C[c], m, m);
                }
                for (
                  u(O, C[0]),
                    l.genMipmaps
                      ? (O.mipmask = (C[0].width << 1) - 1)
                      : (O.mipmask = C[0].mipmask),
                    dt.textureCube(O, l, C, n),
                    O.internalformat = C[0].internalformat,
                    d.width = C[0].width,
                    d.height = C[0].height,
                    T(O),
                    c = 0;
                  c < 6;
                  ++c
                )
                  x(C[c], on + c);
                for (
                  A(l, an),
                    j(),
                    o.profile &&
                      (O.stats.size = Oe(
                        O.internalformat,
                        O.type,
                        d.width,
                        d.height,
                        l.genMipmaps,
                        !0
                      )),
                    d.format = N[O.internalformat],
                    d.type = G[O.type],
                    d.mag = V[l.magFilter],
                    d.min = Q[l.minFilter],
                    d.wrapS = Y[l.wrapS],
                    d.wrapT = Y[l.wrapT],
                    c = 0;
                  c < 6;
                  ++c
                )
                  _(C[c]);
                return d;
              }
              function g(e, t, n, r, i) {
                dt(!!t, "must specify image data"),
                  dt(
                    "number" == typeof e && e === (0 | e) && e >= 0 && e < 6,
                    "invalid face"
                  );
                var a = 0 | n,
                  o = 0 | r,
                  f = 0 | i,
                  s = h();
                return (
                  u(s, O),
                  (s.width = 0),
                  (s.height = 0),
                  p(s, t),
                  (s.width = s.width || (O.width >> f) - a),
                  (s.height = s.height || (O.height >> f) - o),
                  dt(
                    O.type === s.type &&
                      O.format === s.format &&
                      O.internalformat === s.internalformat,
                    "incompatible format for texture.subimage"
                  ),
                  dt(
                    a >= 0 &&
                      o >= 0 &&
                      a + s.width <= O.width &&
                      o + s.height <= O.height,
                    "texture.subimage write out of bounds"
                  ),
                  dt(O.mipmask & (1 << f), "missing mipmap data"),
                  dt(s.data || s.element || s.needsCopy, "missing image data"),
                  T(O),
                  m(s, on + e, a, o, f),
                  j(),
                  v(s),
                  d
                );
              }
              function D(t) {
                var n = 0 | t;
                if (n !== O.width) {
                  (d.width = O.width = n), (d.height = O.height = n), T(O);
                  for (var r = 0; r < 6; ++r)
                    for (var i = 0; O.mipmask >> i; ++i)
                      e.texImage2D(
                        on + r,
                        i,
                        O.format,
                        n >> i,
                        n >> i,
                        0,
                        O.format,
                        O.type,
                        null
                      );
                  return (
                    j(),
                    o.profile &&
                      (O.stats.size = Oe(
                        O.internalformat,
                        O.type,
                        d.width,
                        d.height,
                        !1,
                        !0
                      )),
                    d
                  );
                }
              }
              var O = new S(an);
              (ee[O.id] = O), a.cubeCount++;
              var C = new Array(6);
              return (
                d(t, r, i, f, c, l),
                (d.subimage = g),
                (d.resize = D),
                (d._reglType = "textureCube"),
                (d._texture = O),
                o.profile && (d.stats = O.stats),
                (d.destroy = function () {
                  O.decRef();
                }),
                d
              );
            }
            function L() {
              for (var t = 0; t < te; ++t)
                e.activeTexture(sr + t),
                  e.bindTexture(rn, null),
                  (ne[t] = null);
              xt(ee).forEach(D), (a.cubeCount = 0), (a.textureCount = 0);
            }
            function M() {
              xt(ee).forEach(function (t) {
                (t.texture = e.createTexture()),
                  e.bindTexture(t.target, t.texture);
                for (var n = 0; n < 32; ++n)
                  if (0 != (t.mipmask & (1 << n)))
                    if (t.target === rn)
                      e.texImage2D(
                        rn,
                        n,
                        t.internalformat,
                        t.width >> n,
                        t.height >> n,
                        0,
                        t.internalformat,
                        t.type,
                        null
                      );
                    else
                      for (var r = 0; r < 6; ++r)
                        e.texImage2D(
                          on + r,
                          n,
                          t.internalformat,
                          t.width >> n,
                          t.height >> n,
                          0,
                          t.internalformat,
                          t.type,
                          null
                        );
                A(t.texInfo, t.target);
              });
            }
            var z = { "don't care": er, "dont care": er, nice: nr, fast: tr },
              P = { repeat: Wn, clamp: Un, mirror: Nn },
              B = { nearest: Qn, linear: Yn },
              F = Je(
                {
                  mipmap: Kn,
                  "nearest mipmap nearest": Xn,
                  "linear mipmap nearest": $n,
                  "nearest mipmap linear": Zn,
                  "linear mipmap linear": Kn,
                },
                B
              ),
              I = { none: 0, browser: ur },
              R = { uint8: Bn, rgba4: hn, rgb565: gn, "rgb5 a1": vn },
              q = {
                alpha: un,
                luminance: cn,
                "luminance alpha": ln,
                rgb: sn,
                rgba: fn,
                rgba4: pn,
                "rgb5 a1": dn,
                rgb565: mn,
              },
              H = {};
            t.ext_srgb && ((q.srgb = wn), (q.srgba = _n)),
              t.oes_texture_float && (R.float32 = R.float = Rn),
              t.oes_texture_half_float && (R.float16 = R["half float"] = kn),
              t.webgl_depth_texture &&
                (Je(q, { depth: yn, "depth stencil": xn }),
                Je(R, { uint16: Fn, uint32: In, "depth stencil": bn })),
              t.webgl_compressed_texture_s3tc &&
                Je(H, {
                  "rgb s3tc dxt1": En,
                  "rgba s3tc dxt1": An,
                  "rgba s3tc dxt3": Sn,
                  "rgba s3tc dxt5": Tn,
                }),
              t.webgl_compressed_texture_atc &&
                Je(H, {
                  "rgb atc": jn,
                  "rgba atc explicit alpha": Dn,
                  "rgba atc interpolated alpha": On,
                }),
              t.webgl_compressed_texture_pvrtc &&
                Je(H, {
                  "rgb pvrtc 4bppv1": Cn,
                  "rgb pvrtc 2bppv1": Ln,
                  "rgba pvrtc 4bppv1": Mn,
                  "rgba pvrtc 2bppv1": zn,
                }),
              t.webgl_compressed_texture_etc1 && (H["rgb etc1"] = Pn);
            var W = Array.prototype.slice.call(e.getParameter(nn));
            Object.keys(H).forEach(function (e) {
              var t = H[e];
              W.indexOf(t) >= 0 && (q[e] = t);
            });
            var U = Object.keys(q);
            n.textureFormats = U;
            var N = [];
            Object.keys(q).forEach(function (e) {
              var t = q[e];
              N[t] = e;
            });
            var G = [];
            Object.keys(R).forEach(function (e) {
              var t = R[e];
              G[t] = e;
            });
            var V = [];
            Object.keys(B).forEach(function (e) {
              var t = B[e];
              V[t] = e;
            });
            var Q = [];
            Object.keys(F).forEach(function (e) {
              var t = F[e];
              Q[t] = e;
            });
            var Y = [];
            Object.keys(P).forEach(function (e) {
              var t = P[e];
              Y[t] = e;
            });
            var $ = U.reduce(function (e, t) {
                var n = q[t];
                return (
                  n === cn ||
                  n === un ||
                  n === cn ||
                  n === ln ||
                  n === yn ||
                  n === xn
                    ? (e[n] = n)
                    : n === dn || t.indexOf("rgba") >= 0
                    ? (e[n] = fn)
                    : (e[n] = sn),
                  e
                );
              }, {}),
              Z = [],
              K = [],
              J = 0,
              ee = {},
              te = n.maxTextureUnits,
              ne = Array(te).map(function () {
                return null;
              });
            return (
              Je(S.prototype, {
                bind: function () {
                  var t = this;
                  t.bindCount += 1;
                  var n = t.unit;
                  if (n < 0) {
                    for (var r = 0; r < te; ++r) {
                      var i = ne[r];
                      if (i) {
                        if (i.bindCount > 0) continue;
                        i.unit = -1;
                      }
                      (ne[r] = t), (n = r);
                      break;
                    }
                    n >= te && dt.raise("insufficient number of texture units"),
                      o.profile &&
                        a.maxTextureUnits < n + 1 &&
                        (a.maxTextureUnits = n + 1),
                      (t.unit = n),
                      e.activeTexture(sr + n),
                      e.bindTexture(t.target, t.texture);
                  }
                  return n;
                },
                unbind: function () {
                  this.bindCount -= 1;
                },
                decRef: function () {
                  --this.refCount <= 0 && D(this);
                },
              }),
              o.profile &&
                (a.getTotalTextureSize = function () {
                  var e = 0;
                  return (
                    Object.keys(ee).forEach(function (t) {
                      e += ee[t].stats.size;
                    }),
                    e
                  );
                }),
              {
                create2D: O,
                createCube: C,
                clear: L,
                getTexture: function (e) {
                  return null;
                },
                restore: M,
              }
            );
          }
          function Le(e, t, n) {
            return _r[e] * t * n;
          }
          function Me(e, t, n, r, i, a) {
            function o(e, t, n) {
              (this.target = e), (this.texture = t), (this.renderbuffer = n);
              var r = 0,
                i = 0;
              t
                ? ((r = t.width), (i = t.height))
                : n && ((r = n.width), (i = n.height)),
                (this.width = r),
                (this.height = i);
            }
            function f(e) {
              e &&
                (e.texture && e.texture._texture.decRef(),
                e.renderbuffer && e.renderbuffer._renderbuffer.decRef());
            }
            function u(e, t, n) {
              if (e)
                if (e.texture) {
                  var r = e.texture._texture,
                    i = Math.max(1, r.width),
                    a = Math.max(1, r.height);
                  dt(
                    i === t && a === n,
                    "inconsistent width/height for supplied texture"
                  ),
                    (r.refCount += 1);
                } else {
                  var o = e.renderbuffer._renderbuffer;
                  dt(
                    o.width === t && o.height === n,
                    "inconsistent width/height for renderbuffer"
                  ),
                    (o.refCount += 1);
                }
            }
            function s(t, n) {
              n &&
                (n.texture
                  ? e.framebufferTexture2D(
                      Er,
                      t,
                      n.target,
                      n.texture._texture.texture,
                      0
                    )
                  : e.framebufferRenderbuffer(
                      Er,
                      t,
                      Ar,
                      n.renderbuffer._renderbuffer.renderbuffer
                    ));
            }
            function c(e) {
              var t = Sr,
                n = null,
                r = null,
                i = e;
              "object" == typeof e &&
                ((i = e.data), "target" in e && (t = 0 | e.target)),
                dt.type(i, "function", "invalid attachment data");
              var a = i._reglType;
              return (
                "texture2d" === a
                  ? ((n = i), dt(t === Sr))
                  : "textureCube" === a
                  ? ((n = i),
                    dt(t >= Tr && t < Tr + 6, "invalid cube map target"))
                  : "renderbuffer" === a
                  ? ((r = i), (t = Ar))
                  : dt.raise("invalid regl object for attachment"),
                new o(t, n, r)
              );
            }
            function l(e, t, n, a, f) {
              if (n) {
                var u = r.create2D({ width: e, height: t, format: a, type: f });
                return (u._texture.refCount = 0), new o(Sr, u, null);
              }
              var s = i.create({ width: e, height: t, format: a });
              return (s._renderbuffer.refCount = 0), new o(Ar, null, s);
            }
            function p(e) {
              return e && (e.texture || e.renderbuffer);
            }
            function d(e, t, n) {
              e &&
                (e.texture
                  ? e.texture.resize(t, n)
                  : e.renderbuffer && e.renderbuffer.resize(t, n));
            }
            function m() {
              (this.id = A++),
                (S[this.id] = this),
                (this.framebuffer = e.createFramebuffer()),
                (this.width = 0),
                (this.height = 0),
                (this.colorAttachments = []),
                (this.depthAttachment = null),
                (this.stencilAttachment = null),
                (this.depthStencilAttachment = null);
            }
            function h(e) {
              e.colorAttachments.forEach(f),
                f(e.depthAttachment),
                f(e.stencilAttachment),
                f(e.depthStencilAttachment);
            }
            function v(t) {
              var n = t.framebuffer;
              dt(n, "must not double destroy framebuffer"),
                e.deleteFramebuffer(n),
                (t.framebuffer = null),
                a.framebufferCount--,
                delete S[t.id];
            }
            function g(t) {
              var r;
              e.bindFramebuffer(Er, t.framebuffer);
              var i = t.colorAttachments;
              for (r = 0; r < i.length; ++r) s(jr + r, i[r]);
              for (r = i.length; r < n.maxColorAttachments; ++r)
                e.framebufferTexture2D(Er, jr + r, Sr, null, 0);
              e.framebufferTexture2D(Er, Cr, Sr, null, 0),
                e.framebufferTexture2D(Er, Dr, Sr, null, 0),
                e.framebufferTexture2D(Er, Or, Sr, null, 0),
                s(Dr, t.depthAttachment),
                s(Or, t.stencilAttachment),
                s(Cr, t.depthStencilAttachment);
              var a = e.checkFramebufferStatus(Er);
              a !== Lr &&
                dt.raise(
                  "framebuffer configuration not supported, status = " + Hr[a]
                ),
                e.bindFramebuffer(Er, w.next),
                (w.cur = w.next),
                e.getError();
            }
            function b(e, r) {
              function i(e, r) {
                var a;
                dt(
                  w.next !== f,
                  "can not update framebuffer which is currently in use"
                );
                var o = t.webgl_draw_buffers,
                  s = 0,
                  d = 0,
                  m = !0,
                  v = !0,
                  b = null,
                  y = !0,
                  x = "rgba",
                  A = "uint8",
                  S = 1,
                  T = null,
                  j = null,
                  D = null,
                  O = !1;
                if ("number" == typeof e) (s = 0 | e), (d = 0 | r || s);
                else if (e) {
                  dt.type(e, "object", "invalid arguments for framebuffer");
                  var C = e;
                  if ("shape" in C) {
                    var L = C.shape;
                    dt(
                      Array.isArray(L) && L.length >= 2,
                      "invalid shape for framebuffer"
                    ),
                      (s = L[0]),
                      (d = L[1]);
                  } else
                    "radius" in C && (s = d = C.radius),
                      "width" in C && (s = C.width),
                      "height" in C && (d = C.height);
                  ("color" in C || "colors" in C) &&
                    ((b = C.color || C.colors),
                    Array.isArray(b) &&
                      dt(
                        1 === b.length || o,
                        "multiple render targets not supported"
                      )),
                    b ||
                      ("colorCount" in C &&
                        ((S = 0 | C.colorCount),
                        dt(S > 0, "invalid color buffer count")),
                      "colorTexture" in C &&
                        ((y = !!C.colorTexture), (x = "rgba4")),
                      "colorType" in C &&
                        ((A = C.colorType),
                        y
                          ? (dt(
                              t.oes_texture_float ||
                                !("float" === A || "float32" === A),
                              "you must enable OES_texture_float in order to use floating point framebuffer objects"
                            ),
                            dt(
                              t.oes_texture_half_float ||
                                !("half float" === A || "float16" === A),
                              "you must enable OES_texture_half_float in order to use 16-bit floating point framebuffer objects"
                            ))
                          : "half float" === A || "float16" === A
                          ? (dt(
                              t.ext_color_buffer_half_float,
                              "you must enable EXT_color_buffer_half_float to use 16-bit render buffers"
                            ),
                            (x = "rgba16f"))
                          : ("float" !== A && "float32" !== A) ||
                            (dt(
                              t.webgl_color_buffer_float,
                              "you must enable WEBGL_color_buffer_float in order to use 32-bit floating point renderbuffers"
                            ),
                            (x = "rgba32f")),
                        dt.oneOf(A, E, "invalid color type")),
                      "colorFormat" in C &&
                        ((x = C.colorFormat),
                        _.indexOf(x) >= 0
                          ? (y = !0)
                          : k.indexOf(x) >= 0
                          ? (y = !1)
                          : y
                          ? dt.oneOf(
                              C.colorFormat,
                              _,
                              "invalid color format for texture"
                            )
                          : dt.oneOf(
                              C.colorFormat,
                              k,
                              "invalid color format for renderbuffer"
                            ))),
                    ("depthTexture" in C || "depthStencilTexture" in C) &&
                      ((O = !(!C.depthTexture && !C.depthStencilTexture)),
                      dt(
                        !O || t.webgl_depth_texture,
                        "webgl_depth_texture extension not supported"
                      )),
                    "depth" in C &&
                      ("boolean" == typeof C.depth
                        ? (m = C.depth)
                        : ((T = C.depth), (v = !1))),
                    "stencil" in C &&
                      ("boolean" == typeof C.stencil
                        ? (v = C.stencil)
                        : ((j = C.stencil), (m = !1))),
                    "depthStencil" in C &&
                      ("boolean" == typeof C.depthStencil
                        ? (m = v = C.depthStencil)
                        : ((D = C.depthStencil), (m = !1), (v = !1)));
                } else s = d = 1;
                var M = null,
                  z = null,
                  P = null,
                  B = null;
                if (Array.isArray(b)) M = b.map(c);
                else if (b) M = [c(b)];
                else
                  for (M = new Array(S), a = 0; a < S; ++a)
                    M[a] = l(s, d, y, x, A);
                dt(
                  t.webgl_draw_buffers || M.length <= 1,
                  "you must enable the WEBGL_draw_buffers extension in order to use multiple color buffers."
                ),
                  dt(
                    M.length <= n.maxColorAttachments,
                    "too many color attachments, not supported"
                  ),
                  (s = s || M[0].width),
                  (d = d || M[0].height),
                  T
                    ? (z = c(T))
                    : m && !v && (z = l(s, d, O, "depth", "uint32")),
                  j
                    ? (P = c(j))
                    : v && !m && (P = l(s, d, !1, "stencil", "uint8")),
                  D
                    ? (B = c(D))
                    : !T &&
                      !j &&
                      v &&
                      m &&
                      (B = l(s, d, O, "depth stencil", "depth stencil")),
                  dt(
                    !!T + !!j + !!D <= 1,
                    "invalid framebuffer configuration, can specify exactly one depth/stencil attachment"
                  );
                var F = null;
                for (a = 0; a < M.length; ++a)
                  if (
                    (u(M[a], s, d),
                    dt(
                      !M[a] ||
                        (M[a].texture &&
                          zr.indexOf(M[a].texture._texture.format) >= 0) ||
                        (M[a].renderbuffer &&
                          qr.indexOf(M[a].renderbuffer._renderbuffer.format) >=
                            0),
                      "framebuffer color attachment " + a + " is invalid"
                    ),
                    M[a] && M[a].texture)
                  ) {
                    var I =
                      Pr[M[a].texture._texture.format] *
                      Br[M[a].texture._texture.type];
                    null === F
                      ? (F = I)
                      : dt(
                          F === I,
                          "all color attachments much have the same number of bits per pixel."
                        );
                  }
                return (
                  u(z, s, d),
                  dt(
                    !z ||
                      (z.texture && z.texture._texture.format === Mr) ||
                      (z.renderbuffer &&
                        z.renderbuffer._renderbuffer.format === Fr),
                    "invalid depth attachment for framebuffer object"
                  ),
                  u(P, s, d),
                  dt(
                    !P ||
                      (P.renderbuffer &&
                        P.renderbuffer._renderbuffer.format === Ir),
                    "invalid stencil attachment for framebuffer object"
                  ),
                  u(B, s, d),
                  dt(
                    !B ||
                      (B.texture && B.texture._texture.format === Rr) ||
                      (B.renderbuffer &&
                        B.renderbuffer._renderbuffer.format === Rr),
                    "invalid depth-stencil attachment for framebuffer object"
                  ),
                  h(f),
                  (f.width = s),
                  (f.height = d),
                  (f.colorAttachments = M),
                  (f.depthAttachment = z),
                  (f.stencilAttachment = P),
                  (f.depthStencilAttachment = B),
                  (i.color = M.map(p)),
                  (i.depth = p(z)),
                  (i.stencil = p(P)),
                  (i.depthStencil = p(B)),
                  (i.width = f.width),
                  (i.height = f.height),
                  g(f),
                  i
                );
              }
              function o(e, t) {
                dt(
                  w.next !== f,
                  "can not resize a framebuffer which is currently in use"
                );
                var n = 0 | e,
                  r = 0 | t || n;
                if (n === f.width && r === f.height) return i;
                for (var a = f.colorAttachments, o = 0; o < a.length; ++o)
                  d(a[o], n, r);
                return (
                  d(f.depthAttachment, n, r),
                  d(f.stencilAttachment, n, r),
                  d(f.depthStencilAttachment, n, r),
                  (f.width = i.width = n),
                  (f.height = i.height = r),
                  g(f),
                  i
                );
              }
              var f = new m();
              return (
                a.framebufferCount++,
                i(e, r),
                Je(i, {
                  resize: o,
                  _reglType: "framebuffer",
                  _framebuffer: f,
                  destroy: function () {
                    v(f), h(f);
                  },
                  use: function (e) {
                    w.setFBO({ framebuffer: i }, e);
                  },
                })
              );
            }
            function y(e) {
              function i(e) {
                var n;
                dt(
                  o.indexOf(w.next) < 0,
                  "can not update framebuffer which is currently in use"
                );
                var a = t.webgl_draw_buffers,
                  f = { color: null },
                  u = 0,
                  s = null,
                  c = "rgba",
                  l = "uint8",
                  p = 1;
                if ("number" == typeof e) u = 0 | e;
                else if (e) {
                  dt.type(e, "object", "invalid arguments for framebuffer");
                  var d = e;
                  if ("shape" in d) {
                    var m = d.shape;
                    dt(
                      Array.isArray(m) && m.length >= 2,
                      "invalid shape for framebuffer"
                    ),
                      dt(m[0] === m[1], "cube framebuffer must be square"),
                      (u = m[0]);
                  } else
                    "radius" in d && (u = 0 | d.radius),
                      "width" in d
                        ? ((u = 0 | d.width),
                          "height" in d && dt(d.height === u, "must be square"))
                        : "height" in d && (u = 0 | d.height);
                  ("color" in d || "colors" in d) &&
                    ((s = d.color || d.colors),
                    Array.isArray(s) &&
                      dt(
                        1 === s.length || a,
                        "multiple render targets not supported"
                      )),
                    s ||
                      ("colorCount" in d &&
                        ((p = 0 | d.colorCount),
                        dt(p > 0, "invalid color buffer count")),
                      "colorType" in d &&
                        (dt.oneOf(d.colorType, E, "invalid color type"),
                        (l = d.colorType)),
                      "colorFormat" in d &&
                        ((c = d.colorFormat),
                        dt.oneOf(
                          d.colorFormat,
                          _,
                          "invalid color format for texture"
                        ))),
                    "depth" in d && (f.depth = d.depth),
                    "stencil" in d && (f.stencil = d.stencil),
                    "depthStencil" in d && (f.depthStencil = d.depthStencil);
                } else u = 1;
                var h;
                if (s)
                  if (Array.isArray(s))
                    for (h = [], n = 0; n < s.length; ++n) h[n] = s[n];
                  else h = [s];
                else {
                  h = Array(p);
                  var v = { radius: u, format: c, type: l };
                  for (n = 0; n < p; ++n) h[n] = r.createCube(v);
                }
                for (f.color = Array(h.length), n = 0; n < h.length; ++n) {
                  var g = h[n];
                  dt(
                    "function" == typeof g && "textureCube" === g._reglType,
                    "invalid cube map"
                  ),
                    (u = u || g.width),
                    dt(
                      g.width === u && g.height === u,
                      "invalid cube map shape"
                    ),
                    (f.color[n] = { target: Tr, data: h[n] });
                }
                for (n = 0; n < 6; ++n) {
                  for (var y = 0; y < h.length; ++y) f.color[y].target = Tr + n;
                  n > 0 &&
                    ((f.depth = o[0].depth),
                    (f.stencil = o[0].stencil),
                    (f.depthStencil = o[0].depthStencil)),
                    o[n] ? o[n](f) : (o[n] = b(f));
                }
                return Je(i, { width: u, height: u, color: h });
              }
              function a(e) {
                var t,
                  r = 0 | e;
                if (
                  (dt(
                    r > 0 && r <= n.maxCubeMapSize,
                    "invalid radius for cube fbo"
                  ),
                  r === i.width)
                )
                  return i;
                var a = i.color;
                for (t = 0; t < a.length; ++t) a[t].resize(r);
                for (t = 0; t < 6; ++t) o[t].resize(r);
                return (i.width = i.height = r), i;
              }
              var o = Array(6);
              return (
                i(e),
                Je(i, {
                  faces: o,
                  resize: a,
                  _reglType: "framebufferCube",
                  destroy: function () {
                    o.forEach(function (e) {
                      e.destroy();
                    });
                  },
                })
              );
            }
            function x() {
              xt(S).forEach(function (t) {
                (t.framebuffer = e.createFramebuffer()), g(t);
              });
            }
            var w = { cur: null, next: null, dirty: !1, setFBO: null },
              _ = ["rgba"],
              k = ["rgba4", "rgb565", "rgb5 a1"];
            t.ext_srgb && k.push("srgba"),
              t.ext_color_buffer_half_float && k.push("rgba16f", "rgb16f"),
              t.webgl_color_buffer_float && k.push("rgba32f");
            var E = ["uint8"];
            t.oes_texture_half_float && E.push("half float", "float16"),
              t.oes_texture_float && E.push("float", "float32");
            var A = 0,
              S = {};
            return Je(w, {
              getFramebuffer: function (e) {
                if ("function" == typeof e && "framebuffer" === e._reglType) {
                  var t = e._framebuffer;
                  if (t instanceof m) return t;
                }
                return null;
              },
              create: b,
              createCube: y,
              clear: function () {
                xt(S).forEach(v);
              },
              restore: x,
            });
          }
          function ze() {
            (this.state = 0),
              (this.x = 0),
              (this.y = 0),
              (this.z = 0),
              (this.w = 0),
              (this.buffer = null),
              (this.size = 0),
              (this.normalized = !1),
              (this.type = Wr),
              (this.offset = 0),
              (this.stride = 0),
              (this.divisor = 0);
          }
          function Pe(e, t, n, r, i) {
            for (var a = n.maxAttributes, o = new Array(a), f = 0; f < a; ++f)
              o[f] = new ze();
            return { Record: ze, scope: {}, state: o };
          }
          function Be(e, t, n, r) {
            function i(e, t, n, r) {
              (this.name = e),
                (this.id = t),
                (this.location = n),
                (this.info = r);
            }
            function a(e, t) {
              for (var n = 0; n < e.length; ++n)
                if (e[n].id === t.id) return void (e[n].location = t.location);
              e.push(t);
            }
            function o(n, r, i) {
              var a = n === Ur ? c : l,
                o = a[r];
              if (!o) {
                var f = t.str(r);
                (o = e.createShader(n)),
                  e.shaderSource(o, f),
                  e.compileShader(o),
                  dt.shaderError(e, o, f, n, i),
                  (a[r] = o);
              }
              return o;
            }
            function f(e, t) {
              (this.id = m++),
                (this.fragId = e),
                (this.vertId = t),
                (this.program = null),
                (this.uniforms = []),
                (this.attributes = []),
                r.profile &&
                  (this.stats = { uniformsCount: 0, attributesCount: 0 });
            }
            function u(n, f) {
              var u,
                s,
                c = o(Ur, n.fragId),
                l = o(Nr, n.vertId),
                p = (n.program = e.createProgram());
              e.attachShader(p, c),
                e.attachShader(p, l),
                e.linkProgram(p),
                dt.linkError(e, p, t.str(n.fragId), t.str(n.vertId), f);
              var d = e.getProgramParameter(p, Gr);
              r.profile && (n.stats.uniformsCount = d);
              var m = n.uniforms;
              for (u = 0; u < d; ++u)
                if ((s = e.getActiveUniform(p, u)))
                  if (s.size > 1)
                    for (var h = 0; h < s.size; ++h) {
                      var v = s.name.replace("[0]", "[" + h + "]");
                      a(m, new i(v, t.id(v), e.getUniformLocation(p, v), s));
                    }
                  else
                    a(
                      m,
                      new i(
                        s.name,
                        t.id(s.name),
                        e.getUniformLocation(p, s.name),
                        s
                      )
                    );
              var g = e.getProgramParameter(p, Vr);
              r.profile && (n.stats.attributesCount = g);
              var b = n.attributes;
              for (u = 0; u < g; ++u)
                (s = e.getActiveAttrib(p, u)) &&
                  a(
                    b,
                    new i(
                      s.name,
                      t.id(s.name),
                      e.getAttribLocation(p, s.name),
                      s
                    )
                  );
            }
            function s() {
              (c = {}), (l = {});
              for (var e = 0; e < d.length; ++e) u(d[e]);
            }
            var c = {},
              l = {},
              p = {},
              d = [],
              m = 0;
            return (
              r.profile &&
                ((n.getMaxUniformsCount = function () {
                  var e = 0;
                  return (
                    d.forEach(function (t) {
                      t.stats.uniformsCount > e && (e = t.stats.uniformsCount);
                    }),
                    e
                  );
                }),
                (n.getMaxAttributesCount = function () {
                  var e = 0;
                  return (
                    d.forEach(function (t) {
                      t.stats.attributesCount > e &&
                        (e = t.stats.attributesCount);
                    }),
                    e
                  );
                })),
              {
                clear: function () {
                  var t = e.deleteShader.bind(e);
                  xt(c).forEach(t),
                    (c = {}),
                    xt(l).forEach(t),
                    (l = {}),
                    d.forEach(function (t) {
                      e.deleteProgram(t.program);
                    }),
                    (d.length = 0),
                    (p = {}),
                    (n.shaderCount = 0);
                },
                program: function (e, t, r) {
                  dt.command(e >= 0, "missing vertex shader", r),
                    dt.command(t >= 0, "missing fragment shader", r);
                  var i = p[t];
                  i || (i = p[t] = {});
                  var a = i[e];
                  return (
                    a ||
                      ((a = new f(t, e)),
                      n.shaderCount++,
                      u(a, r),
                      (i[e] = a),
                      d.push(a)),
                    a
                  );
                },
                restore: s,
                shader: o,
                frag: -1,
                vert: -1,
              }
            );
          }
          function Fe(e, t, n, r, i, a) {
            function o(o) {
              var f;
              null === t.next
                ? (dt(
                    i.preserveDrawingBuffer,
                    'you must create a webgl context with "preserveDrawingBuffer":true in order to read pixels from the drawing buffer'
                  ),
                  (f = Yr))
                : (dt(
                    null !== t.next.colorAttachments[0].texture,
                    "You cannot read from a renderbuffer"
                  ),
                  (f = t.next.colorAttachments[0].texture._texture.type),
                  a.oes_texture_float
                    ? dt(
                        f === Yr || f === $r,
                        "Reading from a framebuffer is only allowed for the types 'uint8' and 'float'"
                      )
                    : dt(
                        f === Yr,
                        "Reading from a framebuffer is only allowed for the type 'uint8'"
                      ));
              var u = 0,
                s = 0,
                c = r.framebufferWidth,
                l = r.framebufferHeight,
                p = null;
              Ke(o)
                ? (p = o)
                : o &&
                  (dt.type(o, "object", "invalid arguments to regl.read()"),
                  (u = 0 | o.x),
                  (s = 0 | o.y),
                  dt(
                    u >= 0 && u < r.framebufferWidth,
                    "invalid x offset for regl.read"
                  ),
                  dt(
                    s >= 0 && s < r.framebufferHeight,
                    "invalid y offset for regl.read"
                  ),
                  (c = 0 | (o.width || r.framebufferWidth - u)),
                  (l = 0 | (o.height || r.framebufferHeight - s)),
                  (p = o.data || null)),
                p &&
                  (f === Yr
                    ? dt(
                        p instanceof Uint8Array,
                        "buffer must be 'Uint8Array' when reading from a framebuffer of type 'uint8'"
                      )
                    : f === $r &&
                      dt(
                        p instanceof Float32Array,
                        "buffer must be 'Float32Array' when reading from a framebuffer of type 'float'"
                      )),
                dt(
                  c > 0 && c + u <= r.framebufferWidth,
                  "invalid width for read pixels"
                ),
                dt(
                  l > 0 && l + s <= r.framebufferHeight,
                  "invalid height for read pixels"
                ),
                n();
              var d = c * l * 4;
              return (
                p ||
                  (f === Yr
                    ? (p = new Uint8Array(d))
                    : f === $r && (p = p || new Float32Array(d))),
                dt.isTypedArray(
                  p,
                  "data buffer for regl.read() must be a typedarray"
                ),
                dt(p.byteLength >= d, "data buffer for regl.read() too small"),
                e.pixelStorei(Xr, 4),
                e.readPixels(u, s, c, l, Qr, f, p),
                p
              );
            }
            function f(e) {
              var n;
              return (
                t.setFBO({ framebuffer: e.framebuffer }, function () {
                  n = o(e);
                }),
                n
              );
            }
            function u(e) {
              return e && "framebuffer" in e ? f(e) : o(e);
            }
            return u;
          }
          function Ie(e) {
            return Array.prototype.slice.call(e);
          }
          function Re(e) {
            return Ie(e).join("");
          }
          function qe() {
            function e(e) {
              for (var t = 0; t < u.length; ++t) if (u[t] === e) return f[t];
              var n = "g" + o++;
              return f.push(n), u.push(e), n;
            }
            function t() {
              function e() {
                n.push.apply(n, Ie(arguments));
              }
              function t() {
                var e = "v" + o++;
                return (
                  r.push(e),
                  arguments.length > 0 &&
                    (n.push(e, "="),
                    n.push.apply(n, Ie(arguments)),
                    n.push(";")),
                  e
                );
              }
              var n = [],
                r = [];
              return Je(e, {
                def: t,
                toString: function () {
                  return Re([r.length > 0 ? "var " + r + ";" : "", Re(n)]);
                },
              });
            }
            function n() {
              function e(e, t) {
                r(e, t, "=", n.def(e, t), ";");
              }
              var n = t(),
                r = t(),
                i = n.toString,
                a = r.toString;
              return Je(
                function () {
                  n.apply(n, Ie(arguments));
                },
                {
                  def: n.def,
                  entry: n,
                  exit: r,
                  save: e,
                  set: function (t, r, i) {
                    e(t, r), n(t, r, "=", i, ";");
                  },
                  toString: function () {
                    return i() + a();
                  },
                }
              );
            }
            function r() {
              var e = Re(arguments),
                t = n(),
                r = n(),
                i = t.toString,
                a = r.toString;
              return Je(t, {
                then: function () {
                  return t.apply(t, Ie(arguments)), this;
                },
                else: function () {
                  return r.apply(r, Ie(arguments)), this;
                },
                toString: function () {
                  var t = a();
                  return (
                    t && (t = "else{" + t + "}"),
                    Re(["if(", e, "){", i(), "}", t])
                  );
                },
              });
            }
            function i(e, t) {
              function r() {
                var e = "a" + i.length;
                return i.push(e), e;
              }
              var i = [];
              t = t || 0;
              for (var a = 0; a < t; ++a) r();
              var o = n(),
                f = o.toString;
              return (c[e] = Je(o, {
                arg: r,
                toString: function () {
                  return Re(["function(", i.join(), "){", f(), "}"]);
                },
              }));
            }
            function a() {
              var e = ['"use strict";', s, "return {"];
              Object.keys(c).forEach(function (t) {
                e.push('"', t, '":', c[t].toString(), ",");
              }),
                e.push("}");
              var t = Re(e)
                .replace(/;/g, ";\n")
                .replace(/}/g, "}\n")
                .replace(/{/g, "{\n");
              return Function.apply(null, f.concat(t)).apply(null, u);
            }
            var o = 0,
              f = [],
              u = [],
              s = t(),
              c = {};
            return {
              global: s,
              link: e,
              block: t,
              proc: i,
              scope: n,
              cond: r,
              compile: a,
            };
          }
          function He(e) {
            return Array.isArray(e) || Ke(e) || X(e);
          }
          function We(e) {
            return e.sort(function (e, t) {
              return e === Li ? -1 : t === Li ? 1 : e < t ? -1 : 1;
            });
          }
          function Ue(e, t, n, r) {
            (this.thisDep = e),
              (this.contextDep = t),
              (this.propDep = n),
              (this.append = r);
          }
          function Ne(e) {
            return e && !(e.thisDep || e.contextDep || e.propDep);
          }
          function Ge(e) {
            return new Ue(!1, !1, !1, e);
          }
          function Ve(e, t) {
            var n = e.type;
            if (n === ti) {
              var r = e.data.length;
              return new Ue(!0, r >= 1, r >= 2, t);
            }
            if (n === ai) {
              var i = e.data;
              return new Ue(i.thisDep, i.contextDep, i.propDep, t);
            }
            return new Ue(n === ii, n === ri, n === ni, t);
          }
          function Qe(e, t, n, r, i, a, o, f, u, s, c, l, p, d, m) {
            function h(e) {
              return e.replace(".", "_");
            }
            function v(e, t, n) {
              var r = h(e);
              te.push(e), (ee[r] = J[r] = !!n), (ne[r] = t);
            }
            function g(e, t, n) {
              var r = h(e);
              te.push(e),
                Array.isArray(n)
                  ? ((J[r] = n.slice()), (ee[r] = n.slice()))
                  : (J[r] = ee[r] = n),
                (re[r] = t);
            }
            function b() {
              var e = qe(),
                n = e.link,
                r = e.global;
              (e.id = oe++), (e.batchId = "0");
              var i = n(ie),
                a = (e.shared = { props: "a0" });
              Object.keys(ie).forEach(function (e) {
                a[e] = r.def(i, ".", e);
              }),
                dt.optional(function () {
                  (e.CHECK = n(dt)),
                    (e.commandStr = dt.guessCommand()),
                    (e.command = n(e.commandStr)),
                    (e.assert = function (e, t, r) {
                      e(
                        "if(!(",
                        t,
                        "))",
                        this.CHECK,
                        ".commandRaise(",
                        n(r),
                        ",",
                        this.command,
                        ");"
                      );
                    }),
                    (ae.invalidBlendCombinations = Ha);
                });
              var o = (e.next = {}),
                f = (e.current = {});
              Object.keys(re).forEach(function (e) {
                Array.isArray(J[e]) &&
                  ((o[e] = r.def(a.next, ".", e)),
                  (f[e] = r.def(a.current, ".", e)));
              });
              var u = (e.constants = {});
              Object.keys(ae).forEach(function (e) {
                u[e] = r.def(JSON.stringify(ae[e]));
              }),
                (e.invoke = function (t, r) {
                  switch (r.type) {
                    case ti:
                      var i = ["this", a.context, a.props, e.batchId];
                      return t.def(
                        n(r.data),
                        ".call(",
                        i.slice(0, Math.max(r.data.length + 1, 4)),
                        ")"
                      );
                    case ni:
                      return t.def(a.props, r.data);
                    case ri:
                      return t.def(a.context, r.data);
                    case ii:
                      return t.def("this", r.data);
                    case ai:
                      return r.data.append(e, t), r.data.ref;
                  }
                }),
                (e.attribCache = {});
              var c = {};
              return (
                (e.scopeAttrib = function (e) {
                  var r = t.id(e);
                  if (r in c) return c[r];
                  var i = s.scope[r];
                  return i || (i = s.scope[r] = new Y()), (c[r] = n(i));
                }),
                e
              );
            }
            function y(e) {
              var t,
                n = e.static,
                r = e.dynamic;
              if (Mi in n) {
                var i = !!n[Mi];
                (t = Ge(function (e, t) {
                  return i;
                })).enable = i;
              } else if (Mi in r) {
                var a = r[Mi];
                t = Ve(a, function (e, t) {
                  return e.invoke(t, a);
                });
              }
              return t;
            }
            function x(e, t) {
              var n = e.static,
                r = e.dynamic;
              if (zi in n) {
                var i = n[zi];
                return i
                  ? ((i = f.getFramebuffer(i)),
                    dt.command(i, "invalid framebuffer object"),
                    Ge(function (e, t) {
                      var n = e.link(i),
                        r = e.shared;
                      t.set(r.framebuffer, ".next", n);
                      var a = r.context;
                      return (
                        t.set(a, "." + Wi, n + ".width"),
                        t.set(a, "." + Ui, n + ".height"),
                        n
                      );
                    }))
                  : Ge(function (e, t) {
                      var n = e.shared;
                      t.set(n.framebuffer, ".next", "null");
                      var r = n.context;
                      return (
                        t.set(r, "." + Wi, r + "." + Vi),
                        t.set(r, "." + Ui, r + "." + Qi),
                        "null"
                      );
                    });
              }
              if (zi in r) {
                var a = r[zi];
                return Ve(a, function (e, t) {
                  var n = e.invoke(t, a),
                    r = e.shared,
                    i = r.framebuffer,
                    o = t.def(i, ".getFramebuffer(", n, ")");
                  dt.optional(function () {
                    e.assert(
                      t,
                      "!" + n + "||" + o,
                      "invalid framebuffer object"
                    );
                  }),
                    t.set(i, ".next", o);
                  var f = r.context;
                  return (
                    t.set(f, "." + Wi, o + "?" + o + ".width:" + f + "." + Vi),
                    t.set(f, "." + Ui, o + "?" + o + ".height:" + f + "." + Qi),
                    o
                  );
                });
              }
              return null;
            }
            function w(e, t, n) {
              function r(e) {
                if (e in i) {
                  var r = i[e];
                  dt.commandType(r, "object", "invalid " + e, n.commandStr);
                  var o,
                    f,
                    u = !0,
                    s = 0 | r.x,
                    c = 0 | r.y;
                  return (
                    "width" in r
                      ? ((o = 0 | r.width),
                        dt.command(o >= 0, "invalid " + e, n.commandStr))
                      : (u = !1),
                    "height" in r
                      ? ((f = 0 | r.height),
                        dt.command(f >= 0, "invalid " + e, n.commandStr))
                      : (u = !1),
                    new Ue(
                      !u && t && t.thisDep,
                      !u && t && t.contextDep,
                      !u && t && t.propDep,
                      function (e, t) {
                        var n = e.shared.context,
                          i = o;
                        "width" in r || (i = t.def(n, ".", Wi, "-", s));
                        var a = f;
                        return (
                          "height" in r || (a = t.def(n, ".", Ui, "-", c)),
                          [s, c, i, a]
                        );
                      }
                    )
                  );
                }
                if (e in a) {
                  var l = a[e],
                    p = Ve(l, function (t, n) {
                      var r = t.invoke(n, l);
                      dt.optional(function () {
                        t.assert(
                          n,
                          r + "&&typeof " + r + '==="object"',
                          "invalid " + e
                        );
                      });
                      var i = t.shared.context,
                        a = n.def(r, ".x|0"),
                        o = n.def(r, ".y|0"),
                        f = n.def(
                          '"width" in ',
                          r,
                          "?",
                          r,
                          ".width|0:",
                          "(",
                          i,
                          ".",
                          Wi,
                          "-",
                          a,
                          ")"
                        ),
                        u = n.def(
                          '"height" in ',
                          r,
                          "?",
                          r,
                          ".height|0:",
                          "(",
                          i,
                          ".",
                          Ui,
                          "-",
                          o,
                          ")"
                        );
                      return (
                        dt.optional(function () {
                          t.assert(n, f + ">=0&&" + u + ">=0", "invalid " + e);
                        }),
                        [a, o, f, u]
                      );
                    });
                  return (
                    t &&
                      ((p.thisDep = p.thisDep || t.thisDep),
                      (p.contextDep = p.contextDep || t.contextDep),
                      (p.propDep = p.propDep || t.propDep)),
                    p
                  );
                }
                return t
                  ? new Ue(t.thisDep, t.contextDep, t.propDep, function (e, t) {
                      var n = e.shared.context;
                      return [0, 0, t.def(n, ".", Wi), t.def(n, ".", Ui)];
                    })
                  : null;
              }
              var i = e.static,
                a = e.dynamic,
                o = r(Li);
              if (o) {
                var f = o;
                o = new Ue(o.thisDep, o.contextDep, o.propDep, function (e, t) {
                  var n = f.append(e, t),
                    r = e.shared.context;
                  return t.set(r, "." + Ni, n[2]), t.set(r, "." + Gi, n[3]), n;
                });
              }
              return { viewport: o, scissor_box: r(Ci) };
            }
            function _(e) {
              function n(e) {
                if (e in i) {
                  var n = t.id(i[e]);
                  dt.optional(function () {
                    c.shader(Na[e], n, dt.guessCommand());
                  });
                  var r = Ge(function () {
                    return n;
                  });
                  return (r.id = n), r;
                }
                if (e in a) {
                  var o = a[e];
                  return Ve(o, function (t, n) {
                    var r = t.invoke(n, o),
                      i = n.def(t.shared.strings, ".id(", r, ")");
                    return (
                      dt.optional(function () {
                        n(
                          t.shared.shader,
                          ".shader(",
                          Na[e],
                          ",",
                          i,
                          ",",
                          t.command,
                          ");"
                        );
                      }),
                      i
                    );
                  });
                }
                return null;
              }
              var r,
                i = e.static,
                a = e.dynamic,
                o = n(Bi),
                f = n(Pi),
                u = null;
              return (
                Ne(o) && Ne(f)
                  ? ((u = c.program(f.id, o.id)),
                    (r = Ge(function (e, t) {
                      return e.link(u);
                    })))
                  : (r = new Ue(
                      (o && o.thisDep) || (f && f.thisDep),
                      (o && o.contextDep) || (f && f.contextDep),
                      (o && o.propDep) || (f && f.propDep),
                      function (e, t) {
                        var n,
                          r = e.shared.shader;
                        n = o ? o.append(e, t) : t.def(r, ".", Bi);
                        var i,
                          a =
                            r +
                            ".program(" +
                            (i = f ? f.append(e, t) : t.def(r, ".", Pi)) +
                            "," +
                            n;
                        return (
                          dt.optional(function () {
                            a += "," + e.command;
                          }),
                          t.def(a + ")")
                        );
                      }
                    )),
                { frag: o, vert: f, progVar: r, program: u }
              );
            }
            function k(e, t) {
              function n(e, n) {
                if (e in r) {
                  var a = 0 | r[e];
                  return (
                    dt.command(!n || a >= 0, "invalid " + e, t.commandStr),
                    Ge(function (e, t) {
                      return n && (e.OFFSET = a), a;
                    })
                  );
                }
                if (e in i) {
                  var f = i[e];
                  return Ve(f, function (t, r) {
                    var i = t.invoke(r, f);
                    return (
                      n &&
                        ((t.OFFSET = i),
                        dt.optional(function () {
                          t.assert(r, i + ">=0", "invalid " + e);
                        })),
                      i
                    );
                  });
                }
                return n && o
                  ? Ge(function (e, t) {
                      return (e.OFFSET = "0"), 0;
                    })
                  : null;
              }
              var r = e.static,
                i = e.dynamic,
                o = (function () {
                  if (Fi in r) {
                    var e = r[Fi];
                    He(e)
                      ? (e = a.getElements(a.create(e, !0)))
                      : e &&
                        ((e = a.getElements(e)),
                        dt.command(e, "invalid elements", t.commandStr));
                    var n = Ge(function (t, n) {
                      if (e) {
                        var r = t.link(e);
                        return (t.ELEMENTS = r), r;
                      }
                      return (t.ELEMENTS = null), null;
                    });
                    return (n.value = e), n;
                  }
                  if (Fi in i) {
                    var o = i[Fi];
                    return Ve(o, function (e, t) {
                      var n = e.shared,
                        r = n.isBufferArgs,
                        i = n.elements,
                        a = e.invoke(t, o),
                        f = t.def("null"),
                        u = t.def(r, "(", a, ")"),
                        s = e
                          .cond(u)
                          .then(f, "=", i, ".createStream(", a, ");")
                          .else(f, "=", i, ".getElements(", a, ");");
                      return (
                        dt.optional(function () {
                          e.assert(
                            s.else,
                            "!" + a + "||" + f,
                            "invalid elements"
                          );
                        }),
                        t.entry(s),
                        t.exit(e.cond(u).then(i, ".destroyStream(", f, ");")),
                        (e.ELEMENTS = f),
                        f
                      );
                    });
                  }
                  return null;
                })(),
                f = n(qi, !0);
              return {
                elements: o,
                primitive: (function () {
                  if (Ii in r) {
                    var e = r[Ii];
                    return (
                      dt.commandParameter(
                        e,
                        qt,
                        "invalid primitve",
                        t.commandStr
                      ),
                      Ge(function (t, n) {
                        return qt[e];
                      })
                    );
                  }
                  if (Ii in i) {
                    var n = i[Ii];
                    return Ve(n, function (e, t) {
                      var r = e.constants.primTypes,
                        i = e.invoke(t, n);
                      return (
                        dt.optional(function () {
                          e.assert(
                            t,
                            i + " in " + r,
                            "invalid primitive, must be one of " +
                              Object.keys(qt)
                          );
                        }),
                        t.def(r, "[", i, "]")
                      );
                    });
                  }
                  return o
                    ? Ne(o)
                      ? Ge(
                          o.value
                            ? function (e, t) {
                                return t.def(e.ELEMENTS, ".primType");
                              }
                            : function () {
                                return Aa;
                              }
                        )
                      : new Ue(o.thisDep, o.contextDep, o.propDep, function (
                          e,
                          t
                        ) {
                          var n = e.ELEMENTS;
                          return t.def(n, "?", n, ".primType:", Aa);
                        })
                    : null;
                })(),
                count: (function () {
                  if (Ri in r) {
                    var e = 0 | r[Ri];
                    return (
                      dt.command(
                        "number" == typeof e && e >= 0,
                        "invalid vertex count",
                        t.commandStr
                      ),
                      Ge(function () {
                        return e;
                      })
                    );
                  }
                  if (Ri in i) {
                    var n = i[Ri];
                    return Ve(n, function (e, t) {
                      var r = e.invoke(t, n);
                      return (
                        dt.optional(function () {
                          e.assert(
                            t,
                            "typeof " +
                              r +
                              '==="number"&&' +
                              r +
                              ">=0&&" +
                              r +
                              "===(" +
                              r +
                              "|0)",
                            "invalid vertex count"
                          );
                        }),
                        r
                      );
                    });
                  }
                  if (o) {
                    if (Ne(o)) {
                      if (o)
                        return f
                          ? new Ue(
                              f.thisDep,
                              f.contextDep,
                              f.propDep,
                              function (e, t) {
                                var n = t.def(
                                  e.ELEMENTS,
                                  ".vertCount-",
                                  e.OFFSET
                                );
                                return (
                                  dt.optional(function () {
                                    e.assert(
                                      t,
                                      n + ">=0",
                                      "invalid vertex offset/element buffer too small"
                                    );
                                  }),
                                  n
                                );
                              }
                            )
                          : Ge(function (e, t) {
                              return t.def(e.ELEMENTS, ".vertCount");
                            });
                      var a = Ge(function () {
                        return -1;
                      });
                      return (
                        dt.optional(function () {
                          a.MISSING = !0;
                        }),
                        a
                      );
                    }
                    var u = new Ue(
                      o.thisDep || f.thisDep,
                      o.contextDep || f.contextDep,
                      o.propDep || f.propDep,
                      function (e, t) {
                        var n = e.ELEMENTS;
                        return e.OFFSET
                          ? t.def(n, "?", n, ".vertCount-", e.OFFSET, ":-1")
                          : t.def(n, "?", n, ".vertCount:-1");
                      }
                    );
                    return (
                      dt.optional(function () {
                        u.DYNAMIC = !0;
                      }),
                      u
                    );
                  }
                  return null;
                })(),
                instances: n(Hi, !1),
                offset: f,
              };
            }
            function E(e, t) {
              var n = e.static,
                i = e.dynamic,
                a = {};
              return (
                te.forEach(function (e) {
                  function o(t, r) {
                    if (e in n) {
                      var o = t(n[e]);
                      a[f] = Ge(function () {
                        return o;
                      });
                    } else if (e in i) {
                      var u = i[e];
                      a[f] = Ve(u, function (e, t) {
                        return r(e, t, e.invoke(t, u));
                      });
                    }
                  }
                  var f = h(e);
                  switch (e) {
                    case vi:
                    case fi:
                    case oi:
                    case Ai:
                    case li:
                    case Oi:
                    case xi:
                    case _i:
                    case ki:
                    case mi:
                      return o(
                        function (n) {
                          return (
                            dt.commandType(n, "boolean", e, t.commandStr), n
                          );
                        },
                        function (t, n, r) {
                          return (
                            dt.optional(function () {
                              t.assert(
                                n,
                                "typeof " + r + '==="boolean"',
                                "invalid flag " + e,
                                t.commandStr
                              );
                            }),
                            r
                          );
                        }
                      );
                    case pi:
                      return o(
                        function (n) {
                          return (
                            dt.commandParameter(
                              n,
                              Wa,
                              "invalid " + e,
                              t.commandStr
                            ),
                            Wa[n]
                          );
                        },
                        function (t, n, r) {
                          var i = t.constants.compareFuncs;
                          return (
                            dt.optional(function () {
                              t.assert(
                                n,
                                r + " in " + i,
                                "invalid " +
                                  e +
                                  ", must be one of " +
                                  Object.keys(Wa)
                              );
                            }),
                            n.def(i, "[", r, "]")
                          );
                        }
                      );
                    case di:
                      return o(
                        function (e) {
                          return (
                            dt.command(
                              he(e) &&
                                2 === e.length &&
                                "number" == typeof e[0] &&
                                "number" == typeof e[1] &&
                                e[0] <= e[1],
                              "depth range is 2d array",
                              t.commandStr
                            ),
                            e
                          );
                        },
                        function (e, t, n) {
                          return (
                            dt.optional(function () {
                              e.assert(
                                t,
                                e.shared.isArrayLike +
                                  "(" +
                                  n +
                                  ")&&" +
                                  n +
                                  ".length===2&&typeof " +
                                  n +
                                  '[0]==="number"&&typeof ' +
                                  n +
                                  '[1]==="number"&&' +
                                  n +
                                  "[0]<=" +
                                  n +
                                  "[1]",
                                "depth range must be a 2d array"
                              );
                            }),
                            [t.def("+", n, "[0]"), t.def("+", n, "[1]")]
                          );
                        }
                      );
                    case ci:
                      return o(
                        function (e) {
                          dt.commandType(
                            e,
                            "object",
                            "blend.func",
                            t.commandStr
                          );
                          var n = "srcRGB" in e ? e.srcRGB : e.src,
                            r = "srcAlpha" in e ? e.srcAlpha : e.src,
                            i = "dstRGB" in e ? e.dstRGB : e.dst,
                            a = "dstAlpha" in e ? e.dstAlpha : e.dst;
                          return (
                            dt.commandParameter(
                              n,
                              qa,
                              f + ".srcRGB",
                              t.commandStr
                            ),
                            dt.commandParameter(
                              r,
                              qa,
                              f + ".srcAlpha",
                              t.commandStr
                            ),
                            dt.commandParameter(
                              i,
                              qa,
                              f + ".dstRGB",
                              t.commandStr
                            ),
                            dt.commandParameter(
                              a,
                              qa,
                              f + ".dstAlpha",
                              t.commandStr
                            ),
                            dt.command(
                              -1 === Ha.indexOf(n + ", " + i),
                              "unallowed blending combination (srcRGB, dstRGB) = (" +
                                n +
                                ", " +
                                i +
                                ")",
                              t.commandStr
                            ),
                            [qa[n], qa[i], qa[r], qa[a]]
                          );
                        },
                        function (t, n, r) {
                          function i(i, o) {
                            var f = n.def(
                              '"',
                              i,
                              o,
                              '" in ',
                              r,
                              "?",
                              r,
                              ".",
                              i,
                              o,
                              ":",
                              r,
                              ".",
                              i
                            );
                            return (
                              dt.optional(function () {
                                t.assert(
                                  n,
                                  f + " in " + a,
                                  "invalid " +
                                    e +
                                    "." +
                                    i +
                                    o +
                                    ", must be one of " +
                                    Object.keys(qa)
                                );
                              }),
                              f
                            );
                          }
                          var a = t.constants.blendFuncs;
                          dt.optional(function () {
                            t.assert(
                              n,
                              r + "&&typeof " + r + '==="object"',
                              "invalid blend func, must be an object"
                            );
                          });
                          var o = i("src", "RGB"),
                            f = i("dst", "RGB");
                          dt.optional(function () {
                            var e = t.constants.invalidBlendCombinations;
                            t.assert(
                              n,
                              e + ".indexOf(" + o + '+", "+' + f + ") === -1 ",
                              "unallowed blending combination for (srcRGB, dstRGB)"
                            );
                          });
                          var u = n.def(a, "[", o, "]"),
                            s = n.def(a, "[", i("src", "Alpha"), "]");
                          return [
                            u,
                            n.def(a, "[", f, "]"),
                            s,
                            n.def(a, "[", i("dst", "Alpha"), "]"),
                          ];
                        }
                      );
                    case si:
                      return o(
                        function (n) {
                          return "string" == typeof n
                            ? (dt.commandParameter(
                                n,
                                X,
                                "invalid " + e,
                                t.commandStr
                              ),
                              [X[n], X[n]])
                            : "object" == typeof n
                            ? (dt.commandParameter(
                                n.rgb,
                                X,
                                e + ".rgb",
                                t.commandStr
                              ),
                              dt.commandParameter(
                                n.alpha,
                                X,
                                e + ".alpha",
                                t.commandStr
                              ),
                              [X[n.rgb], X[n.alpha]])
                            : void dt.commandRaise(
                                "invalid blend.equation",
                                t.commandStr
                              );
                        },
                        function (t, n, r) {
                          var i = t.constants.blendEquations,
                            a = n.def(),
                            o = n.def(),
                            f = t.cond("typeof ", r, '==="string"');
                          return (
                            dt.optional(function () {
                              function n(e, n, r) {
                                t.assert(
                                  e,
                                  r + " in " + i,
                                  "invalid " +
                                    n +
                                    ", must be one of " +
                                    Object.keys(X)
                                );
                              }
                              n(f.then, e, r),
                                t.assert(
                                  f.else,
                                  r + "&&typeof " + r + '==="object"',
                                  "invalid " + e
                                ),
                                n(f.else, e + ".rgb", r + ".rgb"),
                                n(f.else, e + ".alpha", r + ".alpha");
                            }),
                            f.then(a, "=", o, "=", i, "[", r, "];"),
                            f.else(
                              a,
                              "=",
                              i,
                              "[",
                              r,
                              ".rgb];",
                              o,
                              "=",
                              i,
                              "[",
                              r,
                              ".alpha];"
                            ),
                            n(f),
                            [a, o]
                          );
                        }
                      );
                    case ui:
                      return o(
                        function (e) {
                          return (
                            dt.command(
                              he(e) && 4 === e.length,
                              "blend.color must be a 4d array",
                              t.commandStr
                            ),
                            $(4, function (t) {
                              return +e[t];
                            })
                          );
                        },
                        function (e, t, n) {
                          return (
                            dt.optional(function () {
                              e.assert(
                                t,
                                e.shared.isArrayLike +
                                  "(" +
                                  n +
                                  ")&&" +
                                  n +
                                  ".length===4",
                                "blend.color must be a 4d array"
                              );
                            }),
                            $(4, function (e) {
                              return t.def("+", n, "[", e, "]");
                            })
                          );
                        }
                      );
                    case Si:
                      return o(
                        function (e) {
                          return (
                            dt.commandType(e, "number", f, t.commandStr), 0 | e
                          );
                        },
                        function (e, t, n) {
                          return (
                            dt.optional(function () {
                              e.assert(
                                t,
                                "typeof " + n + '==="number"',
                                "invalid stencil.mask"
                              );
                            }),
                            t.def(n, "|0")
                          );
                        }
                      );
                    case Ti:
                      return o(
                        function (n) {
                          dt.commandType(n, "object", f, t.commandStr);
                          var r = n.cmp || "keep",
                            i = n.ref || 0,
                            a = "mask" in n ? n.mask : -1;
                          return (
                            dt.commandParameter(
                              r,
                              Wa,
                              e + ".cmp",
                              t.commandStr
                            ),
                            dt.commandType(
                              i,
                              "number",
                              e + ".ref",
                              t.commandStr
                            ),
                            dt.commandType(
                              a,
                              "number",
                              e + ".mask",
                              t.commandStr
                            ),
                            [Wa[r], i, a]
                          );
                        },
                        function (e, t, n) {
                          var r = e.constants.compareFuncs;
                          return (
                            dt.optional(function () {
                              function i() {
                                e.assert(
                                  t,
                                  Array.prototype.join.call(arguments, ""),
                                  "invalid stencil.func"
                                );
                              }
                              i(n + "&&typeof ", n, '==="object"'),
                                i(
                                  '!("cmp" in ',
                                  n,
                                  ")||(",
                                  n,
                                  ".cmp in ",
                                  r,
                                  ")"
                                );
                            }),
                            [
                              t.def(
                                '"cmp" in ',
                                n,
                                "?",
                                r,
                                "[",
                                n,
                                ".cmp]",
                                ":",
                                Ma
                              ),
                              t.def(n, ".ref|0"),
                              t.def('"mask" in ', n, "?", n, ".mask|0:-1"),
                            ]
                          );
                        }
                      );
                    case ji:
                    case Di:
                      return o(
                        function (n) {
                          dt.commandType(n, "object", f, t.commandStr);
                          var r = n.fail || "keep",
                            i = n.zfail || "keep",
                            a = n.zpass || "keep";
                          return (
                            dt.commandParameter(
                              r,
                              Ua,
                              e + ".fail",
                              t.commandStr
                            ),
                            dt.commandParameter(
                              i,
                              Ua,
                              e + ".zfail",
                              t.commandStr
                            ),
                            dt.commandParameter(
                              a,
                              Ua,
                              e + ".zpass",
                              t.commandStr
                            ),
                            [e === Di ? Ta : Sa, Ua[r], Ua[i], Ua[a]]
                          );
                        },
                        function (t, n, r) {
                          function i(i) {
                            return (
                              dt.optional(function () {
                                t.assert(
                                  n,
                                  '!("' +
                                    i +
                                    '" in ' +
                                    r +
                                    ")||(" +
                                    r +
                                    "." +
                                    i +
                                    " in " +
                                    a +
                                    ")",
                                  "invalid " +
                                    e +
                                    "." +
                                    i +
                                    ", must be one of " +
                                    Object.keys(Ua)
                                );
                              }),
                              n.def(
                                '"',
                                i,
                                '" in ',
                                r,
                                "?",
                                a,
                                "[",
                                r,
                                ".",
                                i,
                                "]:",
                                Ma
                              )
                            );
                          }
                          var a = t.constants.stencilOps;
                          return (
                            dt.optional(function () {
                              t.assert(
                                n,
                                r + "&&typeof " + r + '==="object"',
                                "invalid " + e
                              );
                            }),
                            [
                              e === Di ? Ta : Sa,
                              i("fail"),
                              i("zfail"),
                              i("zpass"),
                            ]
                          );
                        }
                      );
                    case wi:
                      return o(
                        function (e) {
                          dt.commandType(e, "object", f, t.commandStr);
                          var n = 0 | e.factor,
                            r = 0 | e.units;
                          return (
                            dt.commandType(
                              n,
                              "number",
                              f + ".factor",
                              t.commandStr
                            ),
                            dt.commandType(
                              r,
                              "number",
                              f + ".units",
                              t.commandStr
                            ),
                            [n, r]
                          );
                        },
                        function (t, n, r) {
                          return (
                            dt.optional(function () {
                              t.assert(
                                n,
                                r + "&&typeof " + r + '==="object"',
                                "invalid " + e
                              );
                            }),
                            [n.def(r, ".factor|0"), n.def(r, ".units|0")]
                          );
                        }
                      );
                    case gi:
                      return o(
                        function (e) {
                          var n = 0;
                          return (
                            "front" === e ? (n = Sa) : "back" === e && (n = Ta),
                            dt.command(!!n, f, t.commandStr),
                            n
                          );
                        },
                        function (e, t, n) {
                          return (
                            dt.optional(function () {
                              e.assert(
                                t,
                                n + '==="front"||' + n + '==="back"',
                                "invalid cull.face"
                              );
                            }),
                            t.def(n, '==="front"?', Sa, ":", Ta)
                          );
                        }
                      );
                    case yi:
                      return o(
                        function (e) {
                          return (
                            dt.command(
                              "number" == typeof e &&
                                e >= r.lineWidthDims[0] &&
                                e <= r.lineWidthDims[1],
                              "invalid line width, must positive number between " +
                                r.lineWidthDims[0] +
                                " and " +
                                r.lineWidthDims[1],
                              t.commandStr
                            ),
                            e
                          );
                        },
                        function (e, t, n) {
                          return (
                            dt.optional(function () {
                              e.assert(
                                t,
                                "typeof " +
                                  n +
                                  '==="number"&&' +
                                  n +
                                  ">=" +
                                  r.lineWidthDims[0] +
                                  "&&" +
                                  n +
                                  "<=" +
                                  r.lineWidthDims[1],
                                "invalid line width"
                              );
                            }),
                            n
                          );
                        }
                      );
                    case bi:
                      return o(
                        function (e) {
                          return (
                            dt.commandParameter(e, Ga, f, t.commandStr), Ga[e]
                          );
                        },
                        function (e, t, n) {
                          return (
                            dt.optional(function () {
                              e.assert(
                                t,
                                n + '==="cw"||' + n + '==="ccw"',
                                "invalid frontFace, must be one of cw,ccw"
                              );
                            }),
                            t.def(n + '==="cw"?' + ja + ":" + Da)
                          );
                        }
                      );
                    case hi:
                      return o(
                        function (e) {
                          return (
                            dt.command(
                              he(e) && 4 === e.length,
                              "color.mask must be length 4 array",
                              t.commandStr
                            ),
                            e.map(function (e) {
                              return !!e;
                            })
                          );
                        },
                        function (e, t, n) {
                          return (
                            dt.optional(function () {
                              e.assert(
                                t,
                                e.shared.isArrayLike +
                                  "(" +
                                  n +
                                  ")&&" +
                                  n +
                                  ".length===4",
                                "invalid color.mask"
                              );
                            }),
                            $(4, function (e) {
                              return "!!" + n + "[" + e + "]";
                            })
                          );
                        }
                      );
                    case Ei:
                      return o(
                        function (e) {
                          dt.command(
                            "object" == typeof e && e,
                            f,
                            t.commandStr
                          );
                          var n = "value" in e ? e.value : 1,
                            r = !!e.invert;
                          return (
                            dt.command(
                              "number" == typeof n && n >= 0 && n <= 1,
                              "sample.coverage.value must be a number between 0 and 1",
                              t.commandStr
                            ),
                            [n, r]
                          );
                        },
                        function (e, t, n) {
                          return (
                            dt.optional(function () {
                              e.assert(
                                t,
                                n + "&&typeof " + n + '==="object"',
                                "invalid sample.coverage"
                              );
                            }),
                            [
                              t.def('"value" in ', n, "?+", n, ".value:1"),
                              t.def("!!", n, ".invert"),
                            ]
                          );
                        }
                      );
                  }
                }),
                a
              );
            }
            function A(e, t) {
              var n = e.static,
                r = e.dynamic,
                i = {};
              return (
                Object.keys(n).forEach(function (e) {
                  var r,
                    a = n[e];
                  if ("number" == typeof a || "boolean" == typeof a)
                    r = Ge(function () {
                      return a;
                    });
                  else if ("function" == typeof a) {
                    var o = a._reglType;
                    "texture2d" === o || "textureCube" === o
                      ? (r = Ge(function (e) {
                          return e.link(a);
                        }))
                      : "framebuffer" === o || "framebufferCube" === o
                      ? (dt.command(
                          a.color.length > 0,
                          'missing color attachment for framebuffer sent to uniform "' +
                            e +
                            '"',
                          t.commandStr
                        ),
                        (r = Ge(function (e) {
                          return e.link(a.color[0]);
                        })))
                      : dt.commandRaise(
                          'invalid data for uniform "' + e + '"',
                          t.commandStr
                        );
                  } else
                    he(a)
                      ? (r = Ge(function (t) {
                          return t.global.def(
                            "[",
                            $(a.length, function (n) {
                              return (
                                dt.command(
                                  "number" == typeof a[n] ||
                                    "boolean" == typeof a[n],
                                  "invalid uniform " + e,
                                  t.commandStr
                                ),
                                a[n]
                              );
                            }),
                            "]"
                          );
                        }))
                      : dt.commandRaise(
                          'invalid or missing data for uniform "' + e + '"',
                          t.commandStr
                        );
                  (r.value = a), (i[e] = r);
                }),
                Object.keys(r).forEach(function (e) {
                  var t = r[e];
                  i[e] = Ve(t, function (e, n) {
                    return e.invoke(n, t);
                  });
                }),
                i
              );
            }
            function S(e, n) {
              var r = e.static,
                a = e.dynamic,
                o = {};
              return (
                Object.keys(r).forEach(function (e) {
                  var a = r[e],
                    f = t.id(e),
                    u = new Y();
                  if (He(a))
                    (u.state = Jr),
                      (u.buffer = i.getBuffer(i.create(a, Xi, !1, !0))),
                      (u.type = 0);
                  else {
                    var s = i.getBuffer(a);
                    if (s) (u.state = Jr), (u.buffer = s), (u.type = 0);
                    else if (
                      (dt.command(
                        "object" == typeof a && a,
                        "invalid data for attribute " + e,
                        n.commandStr
                      ),
                      a.constant)
                    ) {
                      var c = a.constant;
                      (u.buffer = "null"),
                        (u.state = ei),
                        "number" == typeof c
                          ? (u.x = c)
                          : (dt.command(
                              he(c) && c.length > 0 && c.length <= 4,
                              "invalid constant for attribute " + e,
                              n.commandStr
                            ),
                            Zr.forEach(function (e, t) {
                              t < c.length && (u[e] = c[t]);
                            }));
                    } else {
                      (s = He(a.buffer)
                        ? i.getBuffer(i.create(a.buffer, Xi, !1, !0))
                        : i.getBuffer(a.buffer)),
                        dt.command(
                          !!s,
                          'missing buffer for attribute "' + e + '"',
                          n.commandStr
                        );
                      var l = 0 | a.offset;
                      dt.command(
                        l >= 0,
                        'invalid offset for attribute "' + e + '"',
                        n.commandStr
                      );
                      var p = 0 | a.stride;
                      dt.command(
                        p >= 0 && p < 256,
                        'invalid stride for attribute "' +
                          e +
                          '", must be integer betweeen [0, 255]',
                        n.commandStr
                      );
                      var d = 0 | a.size;
                      dt.command(
                        !("size" in a) || (d > 0 && d <= 4),
                        'invalid size for attribute "' +
                          e +
                          '", must be 1,2,3,4',
                        n.commandStr
                      );
                      var m = !!a.normalized,
                        h = 0;
                      "type" in a &&
                        (dt.commandParameter(
                          a.type,
                          Ct,
                          "invalid type for attribute " + e,
                          n.commandStr
                        ),
                        (h = Ct[a.type]));
                      var v = 0 | a.divisor;
                      "divisor" in a &&
                        (dt.command(
                          0 === v || Z,
                          'cannot specify divisor for attribute "' +
                            e +
                            '", instancing not supported',
                          n.commandStr
                        ),
                        dt.command(
                          v >= 0,
                          'invalid divisor for attribute "' + e + '"',
                          n.commandStr
                        )),
                        dt.optional(function () {
                          var t = n.commandStr,
                            r = [
                              "buffer",
                              "offset",
                              "divisor",
                              "normalized",
                              "type",
                              "size",
                              "stride",
                            ];
                          Object.keys(a).forEach(function (n) {
                            dt.command(
                              r.indexOf(n) >= 0,
                              'unknown parameter "' +
                                n +
                                '" for attribute pointer "' +
                                e +
                                '" (valid parameters are ' +
                                r +
                                ")",
                              t
                            );
                          });
                        }),
                        (u.buffer = s),
                        (u.state = Jr),
                        (u.size = d),
                        (u.normalized = m),
                        (u.type = h || s.dtype),
                        (u.offset = l),
                        (u.stride = p),
                        (u.divisor = v);
                    }
                  }
                  o[e] = Ge(function (e, t) {
                    var n = e.attribCache;
                    if (f in n) return n[f];
                    var r = { isStream: !1 };
                    return (
                      Object.keys(u).forEach(function (e) {
                        r[e] = u[e];
                      }),
                      u.buffer &&
                        ((r.buffer = e.link(u.buffer)),
                        (r.type = r.type || r.buffer + ".dtype")),
                      (n[f] = r),
                      r
                    );
                  });
                }),
                Object.keys(a).forEach(function (e) {
                  function t(t, r) {
                    function i(e) {
                      r(s[e], "=", a, ".", e, "|0;");
                    }
                    var a = t.invoke(r, n),
                      o = t.shared,
                      f = o.isBufferArgs,
                      u = o.buffer;
                    dt.optional(function () {
                      t.assert(
                        r,
                        a +
                          "&&(typeof " +
                          a +
                          '==="object"||typeof ' +
                          a +
                          '==="function")&&(' +
                          f +
                          "(" +
                          a +
                          ")||" +
                          u +
                          ".getBuffer(" +
                          a +
                          ")||" +
                          u +
                          ".getBuffer(" +
                          a +
                          ".buffer)||" +
                          f +
                          "(" +
                          a +
                          '.buffer)||("constant" in ' +
                          a +
                          "&&(typeof " +
                          a +
                          '.constant==="number"||' +
                          o.isArrayLike +
                          "(" +
                          a +
                          ".constant))))",
                        'invalid dynamic attribute "' + e + '"'
                      );
                    });
                    var s = { isStream: r.def(!1) },
                      c = new Y();
                    (c.state = Jr),
                      Object.keys(c).forEach(function (e) {
                        s[e] = r.def("" + c[e]);
                      });
                    var l = s.buffer,
                      p = s.type;
                    return (
                      r(
                        "if(",
                        f,
                        "(",
                        a,
                        ")){",
                        s.isStream,
                        "=true;",
                        l,
                        "=",
                        u,
                        ".createStream(",
                        Xi,
                        ",",
                        a,
                        ");",
                        p,
                        "=",
                        l,
                        ".dtype;",
                        "}else{",
                        l,
                        "=",
                        u,
                        ".getBuffer(",
                        a,
                        ");",
                        "if(",
                        l,
                        "){",
                        p,
                        "=",
                        l,
                        ".dtype;",
                        '}else if("constant" in ',
                        a,
                        "){",
                        s.state,
                        "=",
                        ei,
                        ";",
                        "if(typeof " + a + '.constant === "number"){',
                        s[Zr[0]],
                        "=",
                        a,
                        ".constant;",
                        Zr.slice(1)
                          .map(function (e) {
                            return s[e];
                          })
                          .join("="),
                        "=0;",
                        "}else{",
                        Zr.map(function (e, t) {
                          return (
                            s[e] +
                            "=" +
                            a +
                            ".constant.length>=" +
                            t +
                            "?" +
                            a +
                            ".constant[" +
                            t +
                            "]:0;"
                          );
                        }).join(""),
                        "}}else{",
                        "if(",
                        f,
                        "(",
                        a,
                        ".buffer)){",
                        l,
                        "=",
                        u,
                        ".createStream(",
                        Xi,
                        ",",
                        a,
                        ".buffer);",
                        "}else{",
                        l,
                        "=",
                        u,
                        ".getBuffer(",
                        a,
                        ".buffer);",
                        "}",
                        p,
                        '="type" in ',
                        a,
                        "?",
                        o.glTypes,
                        "[",
                        a,
                        ".type]:",
                        l,
                        ".dtype;",
                        s.normalized,
                        "=!!",
                        a,
                        ".normalized;"
                      ),
                      i("size"),
                      i("offset"),
                      i("stride"),
                      i("divisor"),
                      r("}}"),
                      r.exit(
                        "if(",
                        s.isStream,
                        "){",
                        u,
                        ".destroyStream(",
                        l,
                        ");",
                        "}"
                      ),
                      s
                    );
                  }
                  var n = a[e];
                  o[e] = Ve(n, t);
                }),
                o
              );
            }
            function T(e) {
              var t = e.static,
                n = e.dynamic,
                r = {};
              return (
                Object.keys(t).forEach(function (e) {
                  var n = t[e];
                  r[e] = Ge(function (e, t) {
                    return "number" == typeof n || "boolean" == typeof n
                      ? "" + n
                      : e.link(n);
                  });
                }),
                Object.keys(n).forEach(function (e) {
                  var t = n[e];
                  r[e] = Ve(t, function (e, n) {
                    return e.invoke(n, t);
                  });
                }),
                r
              );
            }
            function j(e, t, n, r, i) {
              function a(e) {
                var t = s[e];
                t && (l[e] = t);
              }
              var o = e.static,
                f = e.dynamic;
              dt.optional(function () {
                function e(e) {
                  Object.keys(e).forEach(function (e) {
                    dt.command(
                      t.indexOf(e) >= 0,
                      'unknown parameter "' + e + '"',
                      i.commandStr
                    );
                  });
                }
                var t = [zi, Pi, Bi, Fi, Ii, qi, Ri, Hi, Mi].concat(te);
                e(o), e(f);
              });
              var u = x(e, i),
                s = w(e, u, i),
                c = k(e, i),
                l = E(e, i),
                p = _(e, i);
              a(Li), a(h(Ci));
              var d = Object.keys(l).length > 0,
                m = { framebuffer: u, draw: c, shader: p, state: l, dirty: d };
              return (
                (m.profile = y(e, i)),
                (m.uniforms = A(n, i)),
                (m.attributes = S(t, i)),
                (m.context = T(r, i)),
                m
              );
            }
            function D(e, t, n) {
              var r = e.shared.context,
                i = e.scope();
              Object.keys(n).forEach(function (a) {
                t.save(r, "." + a);
                var o = n[a];
                i(r, ".", a, "=", o.append(e, t), ";");
              }),
                t(i);
            }
            function O(e, t, n, r) {
              var i,
                a = e.shared,
                o = a.gl,
                f = a.framebuffer;
              K && (i = t.def(a.extensions, ".webgl_draw_buffers"));
              var u,
                s = e.constants,
                c = s.drawBuffer,
                l = s.backBuffer;
              (u = n ? n.append(e, t) : t.def(f, ".next")),
                r || t("if(", u, "!==", f, ".cur){"),
                t(
                  "if(",
                  u,
                  "){",
                  o,
                  ".bindFramebuffer(",
                  Ia,
                  ",",
                  u,
                  ".framebuffer);"
                ),
                K &&
                  t(
                    i,
                    ".drawBuffersWEBGL(",
                    c,
                    "[",
                    u,
                    ".colorAttachments.length]);"
                  ),
                t("}else{", o, ".bindFramebuffer(", Ia, ",null);"),
                K && t(i, ".drawBuffersWEBGL(", l, ");"),
                t("}", f, ".cur=", u, ";"),
                r || t("}");
            }
            function C(e, t, n) {
              var r = e.shared,
                i = r.gl,
                a = e.current,
                o = e.next,
                f = r.current,
                u = r.next,
                s = e.cond(f, ".dirty");
              te.forEach(function (t) {
                var r = h(t);
                if (!(r in n.state)) {
                  var c, l;
                  if (r in o) {
                    (c = o[r]), (l = a[r]);
                    var p = $(J[r].length, function (e) {
                      return s.def(c, "[", e, "]");
                    });
                    s(
                      e
                        .cond(
                          p
                            .map(function (e, t) {
                              return e + "!==" + l + "[" + t + "]";
                            })
                            .join("||")
                        )
                        .then(
                          i,
                          ".",
                          re[r],
                          "(",
                          p,
                          ");",
                          p
                            .map(function (e, t) {
                              return l + "[" + t + "]=" + e;
                            })
                            .join(";"),
                          ";"
                        )
                    );
                  } else {
                    c = s.def(u, ".", r);
                    var d = e.cond(c, "!==", f, ".", r);
                    s(d),
                      r in ne
                        ? d(
                            e
                              .cond(c)
                              .then(i, ".enable(", ne[r], ");")
                              .else(i, ".disable(", ne[r], ");"),
                            f,
                            ".",
                            r,
                            "=",
                            c,
                            ";"
                          )
                        : d(
                            i,
                            ".",
                            re[r],
                            "(",
                            c,
                            ");",
                            f,
                            ".",
                            r,
                            "=",
                            c,
                            ";"
                          );
                  }
                }
              }),
                0 === Object.keys(n.state).length && s(f, ".dirty=false;"),
                t(s);
            }
            function L(e, t, n, r) {
              var i = e.shared,
                a = e.current,
                o = i.current,
                f = i.gl;
              We(Object.keys(n)).forEach(function (i) {
                var u = n[i];
                if (!r || r(u)) {
                  var s = u.append(e, t);
                  if (ne[i]) {
                    var c = ne[i];
                    Ne(u)
                      ? s
                        ? t(f, ".enable(", c, ");")
                        : t(f, ".disable(", c, ");")
                      : t(
                          e
                            .cond(s)
                            .then(f, ".enable(", c, ");")
                            .else(f, ".disable(", c, ");")
                        ),
                      t(o, ".", i, "=", s, ";");
                  } else if (he(s)) {
                    var l = a[i];
                    t(
                      f,
                      ".",
                      re[i],
                      "(",
                      s,
                      ");",
                      s
                        .map(function (e, t) {
                          return l + "[" + t + "]=" + e;
                        })
                        .join(";"),
                      ";"
                    );
                  } else t(f, ".", re[i], "(", s, ");", o, ".", i, "=", s, ";");
                }
              });
            }
            function M(e, t) {
              Z &&
                (e.instancing = t.def(
                  e.shared.extensions,
                  ".angle_instanced_arrays"
                ));
            }
            function z(e, t, n, r, i) {
              function a() {
                return "undefined" == typeof performance
                  ? "Date.now()"
                  : "performance.now()";
              }
              function o(e) {
                e((s = t.def()), "=", a(), ";"),
                  "string" == typeof i
                    ? e(m, ".count+=", i, ";")
                    : e(m, ".count++;"),
                  d &&
                    (r
                      ? e((c = t.def()), "=", v, ".getNumPendingQueries();")
                      : e(v, ".beginQuery(", m, ");"));
              }
              function f(e) {
                e(m, ".cpuTime+=", a(), "-", s, ";"),
                  d &&
                    (r
                      ? e(
                          v,
                          ".pushScopeStats(",
                          c,
                          ",",
                          v,
                          ".getNumPendingQueries(),",
                          m,
                          ");"
                        )
                      : e(v, ".endQuery();"));
              }
              function u(e) {
                var n = t.def(h, ".profile");
                t(h, ".profile=", e, ";"), t.exit(h, ".profile=", n, ";");
              }
              var s,
                c,
                l,
                p = e.shared,
                m = e.stats,
                h = p.current,
                v = p.timer,
                g = n.profile;
              if (g) {
                if (Ne(g))
                  return void (g.enable
                    ? (o(t), f(t.exit), u("true"))
                    : u("false"));
                u((l = g.append(e, t)));
              } else l = t.def(h, ".profile");
              var b = e.block();
              o(b), t("if(", l, "){", b, "}");
              var y = e.block();
              f(y), t.exit("if(", l, "){", y, "}");
            }
            function P(e, t, n, r, i) {
              function a(e) {
                switch (e) {
                  case sa:
                  case da:
                  case ga:
                    return 2;
                  case ca:
                  case ma:
                  case ba:
                    return 3;
                  case la:
                  case ha:
                  case ya:
                    return 4;
                  default:
                    return 1;
                }
              }
              function o(n, r, i) {
                function a() {
                  t(
                    "if(!",
                    c,
                    ".buffer){",
                    u,
                    ".enableVertexAttribArray(",
                    s,
                    ");}"
                  );
                  var n,
                    a = i.type;
                  if (
                    ((n = i.size ? t.def(i.size, "||", r) : r),
                    t(
                      "if(",
                      c,
                      ".type!==",
                      a,
                      "||",
                      c,
                      ".size!==",
                      n,
                      "||",
                      m
                        .map(function (e) {
                          return c + "." + e + "!==" + i[e];
                        })
                        .join("||"),
                      "){",
                      u,
                      ".bindBuffer(",
                      Xi,
                      ",",
                      p,
                      ".buffer);",
                      u,
                      ".vertexAttribPointer(",
                      [s, n, a, i.normalized, i.stride, i.offset],
                      ");",
                      c,
                      ".type=",
                      a,
                      ";",
                      c,
                      ".size=",
                      n,
                      ";",
                      m
                        .map(function (e) {
                          return c + "." + e + "=" + i[e] + ";";
                        })
                        .join(""),
                      "}"
                    ),
                    Z)
                  ) {
                    var o = i.divisor;
                    t(
                      "if(",
                      c,
                      ".divisor!==",
                      o,
                      "){",
                      e.instancing,
                      ".vertexAttribDivisorANGLE(",
                      [s, o],
                      ");",
                      c,
                      ".divisor=",
                      o,
                      ";}"
                    );
                  }
                }
                function o() {
                  t(
                    "if(",
                    c,
                    ".buffer){",
                    u,
                    ".disableVertexAttribArray(",
                    s,
                    ");",
                    "}if(",
                    Zr.map(function (e, t) {
                      return c + "." + e + "!==" + d[t];
                    }).join("||"),
                    "){",
                    u,
                    ".vertexAttrib4f(",
                    s,
                    ",",
                    d,
                    ");",
                    Zr.map(function (e, t) {
                      return c + "." + e + "=" + d[t] + ";";
                    }).join(""),
                    "}"
                  );
                }
                var u = f.gl,
                  s = t.def(n, ".location"),
                  c = t.def(f.attributes, "[", s, "]"),
                  l = i.state,
                  p = i.buffer,
                  d = [i.x, i.y, i.z, i.w],
                  m = ["buffer", "normalized", "offset", "stride"];
                l === Jr
                  ? a()
                  : l === ei
                  ? o()
                  : (t("if(", l, "===", Jr, "){"),
                    a(),
                    t("}else{"),
                    o(),
                    t("}"));
              }
              var f = e.shared;
              r.forEach(function (r) {
                var f,
                  u = r.name,
                  s = n.attributes[u];
                if (s) {
                  if (!i(s)) return;
                  f = s.append(e, t);
                } else {
                  if (!i(Va)) return;
                  var c = e.scopeAttrib(u);
                  dt.optional(function () {
                    e.assert(t, c + ".state", "missing attribute " + u);
                  }),
                    (f = {}),
                    Object.keys(new Y()).forEach(function (e) {
                      f[e] = t.def(c, ".", e);
                    });
                }
                o(e.link(r), a(r.info.type), f);
              });
            }
            function B(e, n, r, i, a) {
              for (var o, f = e.shared, u = f.gl, s = 0; s < i.length; ++s) {
                var c,
                  l = i[s],
                  p = l.name,
                  d = l.info.type,
                  m = r.uniforms[p],
                  h = e.link(l) + ".location";
                if (m) {
                  if (!a(m)) continue;
                  if (Ne(m)) {
                    var v = m.value;
                    if (
                      (dt.command(
                        null !== v && void 0 !== v,
                        'missing uniform "' + p + '"',
                        e.commandStr
                      ),
                      d === ka || d === Ea)
                    ) {
                      dt.command(
                        "function" == typeof v &&
                          ((d === ka &&
                            ("texture2d" === v._reglType ||
                              "framebuffer" === v._reglType)) ||
                            (d === Ea &&
                              ("textureCube" === v._reglType ||
                                "framebufferCube" === v._reglType))),
                        "invalid texture for uniform " + p,
                        e.commandStr
                      );
                      var g = e.link(v._texture || v.color[0]._texture);
                      n(u, ".uniform1i(", h, ",", g + ".bind());"),
                        n.exit(g, ".unbind();");
                    } else if (d === xa || d === wa || d === _a) {
                      dt.optional(function () {
                        dt.command(
                          he(v),
                          "invalid matrix for uniform " + p,
                          e.commandStr
                        ),
                          dt.command(
                            (d === xa && 4 === v.length) ||
                              (d === wa && 9 === v.length) ||
                              (d === _a && 16 === v.length),
                            "invalid length for matrix uniform " + p,
                            e.commandStr
                          );
                      });
                      var b = e.global.def(
                          "new Float32Array([" +
                            Array.prototype.slice.call(v) +
                            "])"
                        ),
                        y = 2;
                      d === wa ? (y = 3) : d === _a && (y = 4),
                        n(u, ".uniformMatrix", y, "fv(", h, ",false,", b, ");");
                    } else {
                      switch (d) {
                        case ua:
                          dt.commandType(
                            v,
                            "number",
                            "uniform " + p,
                            e.commandStr
                          ),
                            (o = "1f");
                          break;
                        case sa:
                          dt.command(
                            he(v) && 2 === v.length,
                            "uniform " + p,
                            e.commandStr
                          ),
                            (o = "2f");
                          break;
                        case ca:
                          dt.command(
                            he(v) && 3 === v.length,
                            "uniform " + p,
                            e.commandStr
                          ),
                            (o = "3f");
                          break;
                        case la:
                          dt.command(
                            he(v) && 4 === v.length,
                            "uniform " + p,
                            e.commandStr
                          ),
                            (o = "4f");
                          break;
                        case va:
                          dt.commandType(
                            v,
                            "boolean",
                            "uniform " + p,
                            e.commandStr
                          ),
                            (o = "1i");
                          break;
                        case pa:
                          dt.commandType(
                            v,
                            "number",
                            "uniform " + p,
                            e.commandStr
                          ),
                            (o = "1i");
                          break;
                        case ga:
                        case da:
                          dt.command(
                            he(v) && 2 === v.length,
                            "uniform " + p,
                            e.commandStr
                          ),
                            (o = "2i");
                          break;
                        case ba:
                        case ma:
                          dt.command(
                            he(v) && 3 === v.length,
                            "uniform " + p,
                            e.commandStr
                          ),
                            (o = "3i");
                          break;
                        case ya:
                        case ha:
                          dt.command(
                            he(v) && 4 === v.length,
                            "uniform " + p,
                            e.commandStr
                          ),
                            (o = "4i");
                      }
                      n(
                        u,
                        ".uniform",
                        o,
                        "(",
                        h,
                        ",",
                        he(v) ? Array.prototype.slice.call(v) : v,
                        ");"
                      );
                    }
                    continue;
                  }
                  c = m.append(e, n);
                } else {
                  if (!a(Va)) continue;
                  c = n.def(f.uniforms, "[", t.id(p), "]");
                }
                d === ka
                  ? n(
                      "if(",
                      c,
                      "&&",
                      c,
                      '._reglType==="framebuffer"){',
                      c,
                      "=",
                      c,
                      ".color[0];",
                      "}"
                    )
                  : d === Ea &&
                    n(
                      "if(",
                      c,
                      "&&",
                      c,
                      '._reglType==="framebufferCube"){',
                      c,
                      "=",
                      c,
                      ".color[0];",
                      "}"
                    ),
                  dt.optional(function () {
                    function t(t, r) {
                      e.assert(
                        n,
                        t,
                        'bad data or missing for uniform "' + p + '".  ' + r
                      );
                    }
                    function r(e) {
                      t(
                        "typeof " + c + '==="' + e + '"',
                        "invalid type, expected " + e
                      );
                    }
                    function i(n, r) {
                      t(
                        f.isArrayLike + "(" + c + ")&&" + c + ".length===" + n,
                        "invalid vector, should have length " + n,
                        e.commandStr
                      );
                    }
                    function a(n) {
                      t(
                        "typeof " +
                          c +
                          '==="function"&&' +
                          c +
                          '._reglType==="texture' +
                          (n === Zi ? "2d" : "Cube") +
                          '"',
                        "invalid texture type",
                        e.commandStr
                      );
                    }
                    switch (d) {
                      case pa:
                        r("number");
                        break;
                      case da:
                        i(2, "number");
                        break;
                      case ma:
                        i(3, "number");
                        break;
                      case ha:
                        i(4, "number");
                        break;
                      case ua:
                        r("number");
                        break;
                      case sa:
                        i(2, "number");
                        break;
                      case ca:
                        i(3, "number");
                        break;
                      case la:
                        i(4, "number");
                        break;
                      case va:
                        r("boolean");
                        break;
                      case ga:
                        i(2, "boolean");
                        break;
                      case ba:
                        i(3, "boolean");
                        break;
                      case ya:
                        i(4, "boolean");
                        break;
                      case xa:
                        i(4, "number");
                        break;
                      case wa:
                        i(9, "number");
                        break;
                      case _a:
                        i(16, "number");
                        break;
                      case ka:
                        a(Zi);
                        break;
                      case Ea:
                        a(Ki);
                    }
                  });
                var x = 1;
                switch (d) {
                  case ka:
                  case Ea:
                    var w = n.def(c, "._texture");
                    n(u, ".uniform1i(", h, ",", w, ".bind());"),
                      n.exit(w, ".unbind();");
                    continue;
                  case pa:
                  case va:
                    o = "1i";
                    break;
                  case da:
                  case ga:
                    (o = "2i"), (x = 2);
                    break;
                  case ma:
                  case ba:
                    (o = "3i"), (x = 3);
                    break;
                  case ha:
                  case ya:
                    (o = "4i"), (x = 4);
                    break;
                  case ua:
                    o = "1f";
                    break;
                  case sa:
                    (o = "2f"), (x = 2);
                    break;
                  case ca:
                    (o = "3f"), (x = 3);
                    break;
                  case la:
                    (o = "4f"), (x = 4);
                    break;
                  case xa:
                    o = "Matrix2fv";
                    break;
                  case wa:
                    o = "Matrix3fv";
                    break;
                  case _a:
                    o = "Matrix4fv";
                }
                if ((n(u, ".uniform", o, "(", h, ","), "M" === o.charAt(0))) {
                  var _ = Math.pow(d - xa + 2, 2),
                    k = e.global.def("new Float32Array(", _, ")");
                  n(
                    "false,(Array.isArray(",
                    c,
                    ")||",
                    c,
                    " instanceof Float32Array)?",
                    c,
                    ":(",
                    $(_, function (e) {
                      return k + "[" + e + "]=" + c + "[" + e + "]";
                    }),
                    ",",
                    k,
                    ")"
                  );
                } else
                  n(
                    x > 1
                      ? $(x, function (e) {
                          return c + "[" + e + "]";
                        })
                      : c
                  );
                n(");");
              }
            }
            function F(e, t, n, r) {
              function i(i) {
                var a = c[i];
                return a
                  ? (a.contextDep && r.contextDynamic) || a.propDep
                    ? a.append(e, n)
                    : a.append(e, t)
                  : t.def(s, ".", i);
              }
              function a() {
                function e() {
                  n(
                    v,
                    ".drawElementsInstancedANGLE(",
                    [p, m, g, d + "<<((" + g + "-" + Kr + ")>>1)", h],
                    ");"
                  );
                }
                function t() {
                  n(v, ".drawArraysInstancedANGLE(", [p, d, m, h], ");");
                }
                l
                  ? b
                    ? e()
                    : (n("if(", l, "){"), e(), n("}else{"), t(), n("}"))
                  : t();
              }
              function o() {
                function e() {
                  n(
                    u +
                      ".drawElements(" +
                      [p, m, g, d + "<<((" + g + "-" + Kr + ")>>1)"] +
                      ");"
                  );
                }
                function t() {
                  n(u + ".drawArrays(" + [p, d, m] + ");");
                }
                l
                  ? b
                    ? e()
                    : (n("if(", l, "){"), e(), n("}else{"), t(), n("}"))
                  : t();
              }
              var f = e.shared,
                u = f.gl,
                s = f.draw,
                c = r.draw,
                l = (function () {
                  var i,
                    a = c.elements,
                    o = t;
                  return (
                    a
                      ? (((a.contextDep && r.contextDynamic) || a.propDep) &&
                          (o = n),
                        (i = a.append(e, o)))
                      : (i = o.def(s, ".", Fi)),
                    i &&
                      o(
                        "if(" +
                          i +
                          ")" +
                          u +
                          ".bindBuffer(" +
                          $i +
                          "," +
                          i +
                          ".buffer.buffer);"
                      ),
                    i
                  );
                })(),
                p = i(Ii),
                d = i(qi),
                m = (function () {
                  var i,
                    a = c.count,
                    o = t;
                  return (
                    a
                      ? (((a.contextDep && r.contextDynamic) || a.propDep) &&
                          (o = n),
                        (i = a.append(e, o)),
                        dt.optional(function () {
                          a.MISSING &&
                            e.assert(t, "false", "missing vertex count"),
                            a.DYNAMIC &&
                              e.assert(o, i + ">=0", "missing vertex count");
                        }))
                      : ((i = o.def(s, ".", Ri)),
                        dt.optional(function () {
                          e.assert(o, i + ">=0", "missing vertex count");
                        })),
                    i
                  );
                })();
              if ("number" == typeof m) {
                if (0 === m) return;
              } else n("if(", m, "){"), n.exit("}");
              var h, v;
              Z && ((h = i(Hi)), (v = e.instancing));
              var g = l + ".type",
                b = c.elements && Ne(c.elements);
              Z && ("number" != typeof h || h >= 0)
                ? "string" == typeof h
                  ? (n("if(", h, ">0){"),
                    a(),
                    n("}else if(", h, "<0){"),
                    o(),
                    n("}"))
                  : a()
                : o();
            }
            function I(e, t, n, r, i) {
              var a = b(),
                o = a.proc("body", i);
              return (
                dt.optional(function () {
                  (a.commandStr = t.commandStr),
                    (a.command = a.link(t.commandStr));
                }),
                Z &&
                  (a.instancing = o.def(
                    a.shared.extensions,
                    ".angle_instanced_arrays"
                  )),
                e(a, o, n, r),
                a.compile().body
              );
            }
            function R(e, t, n, r) {
              M(e, t),
                P(e, t, n, r.attributes, function () {
                  return !0;
                }),
                B(e, t, n, r.uniforms, function () {
                  return !0;
                }),
                F(e, t, t, n);
            }
            function q(e, t) {
              var n = e.proc("draw", 1);
              M(e, n),
                D(e, n, t.context),
                O(e, n, t.framebuffer),
                C(e, n, t),
                L(e, n, t.state),
                z(e, n, t, !1, !0);
              var r = t.shader.progVar.append(e, n);
              if (
                (n(e.shared.gl, ".useProgram(", r, ".program);"),
                t.shader.program)
              )
                R(e, n, t, t.shader.program);
              else {
                var i = e.global.def("{}"),
                  a = n.def(r, ".id"),
                  o = n.def(i, "[", a, "]");
                n(
                  e
                    .cond(o)
                    .then(o, ".call(this,a0);")
                    .else(
                      o,
                      "=",
                      i,
                      "[",
                      a,
                      "]=",
                      e.link(function (n) {
                        return I(R, e, t, n, 1);
                      }),
                      "(",
                      r,
                      ");",
                      o,
                      ".call(this,a0);"
                    )
                );
              }
              Object.keys(t.state).length > 0 &&
                n(e.shared.current, ".dirty=true;");
            }
            function H(e, t, n, r) {
              function i() {
                return !0;
              }
              (e.batchId = "a1"),
                M(e, t),
                P(e, t, n, r.attributes, i),
                B(e, t, n, r.uniforms, i),
                F(e, t, t, n);
            }
            function W(e, t, n, r) {
              function i(e) {
                return (e.contextDep && o) || e.propDep;
              }
              function a(e) {
                return !i(e);
              }
              M(e, t);
              var o = n.contextDep,
                f = t.def(),
                u = t.def();
              (e.shared.props = u), (e.batchId = f);
              var s = e.scope(),
                c = e.scope();
              if (
                (t(
                  s.entry,
                  "for(",
                  f,
                  "=0;",
                  f,
                  "<",
                  "a1",
                  ";++",
                  f,
                  "){",
                  u,
                  "=",
                  "a0",
                  "[",
                  f,
                  "];",
                  c,
                  "}",
                  s.exit
                ),
                n.needsContext && D(e, c, n.context),
                n.needsFramebuffer && O(e, c, n.framebuffer),
                L(e, c, n.state, i),
                n.profile && i(n.profile) && z(e, c, n, !1, !0),
                r)
              )
                P(e, s, n, r.attributes, a),
                  P(e, c, n, r.attributes, i),
                  B(e, s, n, r.uniforms, a),
                  B(e, c, n, r.uniforms, i),
                  F(e, s, c, n);
              else {
                var l = e.global.def("{}"),
                  p = n.shader.progVar.append(e, c),
                  d = c.def(p, ".id"),
                  m = c.def(l, "[", d, "]");
                c(
                  e.shared.gl,
                  ".useProgram(",
                  p,
                  ".program);",
                  "if(!",
                  m,
                  "){",
                  m,
                  "=",
                  l,
                  "[",
                  d,
                  "]=",
                  e.link(function (t) {
                    return I(H, e, n, t, 2);
                  }),
                  "(",
                  p,
                  ");}",
                  m,
                  ".call(this,a0[",
                  f,
                  "],",
                  f,
                  ");"
                );
              }
            }
            function U(e, t) {
              function n(e) {
                return (e.contextDep && i) || e.propDep;
              }
              var r = e.proc("batch", 2);
              (e.batchId = "0"), M(e, r);
              var i = !1,
                a = !0;
              Object.keys(t.context).forEach(function (e) {
                i = i || t.context[e].propDep;
              }),
                i || (D(e, r, t.context), (a = !1));
              var o = t.framebuffer,
                f = !1;
              o
                ? (o.propDep ? (i = f = !0) : o.contextDep && i && (f = !0),
                  f || O(e, r, o))
                : O(e, r, null),
                t.state.viewport && t.state.viewport.propDep && (i = !0),
                C(e, r, t),
                L(e, r, t.state, function (e) {
                  return !n(e);
                }),
                (t.profile && n(t.profile)) || z(e, r, t, !1, "a1"),
                (t.contextDep = i),
                (t.needsContext = a),
                (t.needsFramebuffer = f);
              var u = t.shader.progVar;
              if ((u.contextDep && i) || u.propDep) W(e, r, t, null);
              else {
                var s = u.append(e, r);
                if (
                  (r(e.shared.gl, ".useProgram(", s, ".program);"),
                  t.shader.program)
                )
                  W(e, r, t, t.shader.program);
                else {
                  var c = e.global.def("{}"),
                    l = r.def(s, ".id"),
                    p = r.def(c, "[", l, "]");
                  r(
                    e
                      .cond(p)
                      .then(p, ".call(this,a0,a1);")
                      .else(
                        p,
                        "=",
                        c,
                        "[",
                        l,
                        "]=",
                        e.link(function (n) {
                          return I(W, e, t, n, 2);
                        }),
                        "(",
                        s,
                        ");",
                        p,
                        ".call(this,a0,a1);"
                      )
                  );
                }
              }
              Object.keys(t.state).length > 0 &&
                r(e.shared.current, ".dirty=true;");
            }
            function N(e, n) {
              function r(t) {
                var r = n.shader[t];
                r && i.set(a.shader, "." + t, r.append(e, i));
              }
              var i = e.proc("scope", 3);
              e.batchId = "a2";
              var a = e.shared,
                o = a.current;
              D(e, i, n.context),
                n.framebuffer && n.framebuffer.append(e, i),
                We(Object.keys(n.state)).forEach(function (t) {
                  var r = n.state[t].append(e, i);
                  he(r)
                    ? r.forEach(function (n, r) {
                        i.set(e.next[t], "[" + r + "]", n);
                      })
                    : i.set(a.next, "." + t, r);
                }),
                z(e, i, n, !0, !0),
                [Fi, qi, Ri, Hi, Ii].forEach(function (t) {
                  var r = n.draw[t];
                  r && i.set(a.draw, "." + t, "" + r.append(e, i));
                }),
                Object.keys(n.uniforms).forEach(function (r) {
                  i.set(
                    a.uniforms,
                    "[" + t.id(r) + "]",
                    n.uniforms[r].append(e, i)
                  );
                }),
                Object.keys(n.attributes).forEach(function (t) {
                  var r = n.attributes[t].append(e, i),
                    a = e.scopeAttrib(t);
                  Object.keys(new Y()).forEach(function (e) {
                    i.set(a, "." + e, r[e]);
                  });
                }),
                r(Pi),
                r(Bi),
                Object.keys(n.state).length > 0 &&
                  (i(o, ".dirty=true;"), i.exit(o, ".dirty=true;")),
                i("a1(", e.shared.context, ",a0,", e.batchId, ");");
            }
            function G(e) {
              if ("object" == typeof e && !he(e)) {
                for (var t = Object.keys(e), n = 0; n < t.length; ++n)
                  if (vt.isDynamic(e[t[n]])) return !0;
                return !1;
              }
            }
            function V(e, t, n) {
              function r(e, t) {
                o.forEach(function (n) {
                  var r = i[n];
                  if (vt.isDynamic(r)) {
                    var a = e.invoke(t, r);
                    t(c, ".", n, "=", a, ";");
                  }
                });
              }
              var i = t.static[n];
              if (i && G(i)) {
                var a = e.global,
                  o = Object.keys(i),
                  f = !1,
                  u = !1,
                  s = !1,
                  c = e.global.def("{}");
                o.forEach(function (t) {
                  var n = i[t];
                  if (vt.isDynamic(n)) {
                    "function" == typeof n && (n = i[t] = vt.unbox(n));
                    var r = Ve(n, null);
                    (f = f || r.thisDep),
                      (s = s || r.propDep),
                      (u = u || r.contextDep);
                  } else {
                    switch ((a(c, ".", t, "="), typeof n)) {
                      case "number":
                        a(n);
                        break;
                      case "string":
                        a('"', n, '"');
                        break;
                      case "object":
                        Array.isArray(n) && a("[", n.join(), "]");
                        break;
                      default:
                        a(e.link(n));
                    }
                    a(";");
                  }
                }),
                  (t.dynamic[n] = new vt.DynamicVariable(ai, {
                    thisDep: f,
                    contextDep: u,
                    propDep: s,
                    ref: c,
                    append: r,
                  })),
                  delete t.static[n];
              }
            }
            function Q(e, t, n, r, i) {
              var a = b();
              (a.stats = a.link(i)),
                Object.keys(t.static).forEach(function (e) {
                  V(a, t, e);
                }),
                Yi.forEach(function (t) {
                  V(a, e, t);
                });
              var o = j(e, t, n, r, a);
              return q(a, o), N(a, o), U(a, o), a.compile();
            }
            var Y = s.Record,
              X = { add: 32774, subtract: 32778, "reverse subtract": 32779 };
            n.ext_blend_minmax && ((X.min = Oa), (X.max = Ca));
            var Z = n.angle_instanced_arrays,
              K = n.webgl_draw_buffers,
              J = { dirty: !0, profile: m.profile },
              ee = {},
              te = [],
              ne = {},
              re = {};
            v(oi, ta),
              v(fi, ea),
              g(ui, "blendColor", [0, 0, 0, 0]),
              g(si, "blendEquationSeparate", [Ba, Ba]),
              g(ci, "blendFuncSeparate", [Pa, za, Pa, za]),
              v(li, ra, !0),
              g(pi, "depthFunc", Fa),
              g(di, "depthRange", [0, 1]),
              g(mi, "depthMask", !0),
              g(hi, hi, [!0, !0, !0, !0]),
              v(vi, Ji),
              g(gi, "cullFace", Ta),
              g(bi, bi, Da),
              g(yi, yi, 1),
              v(xi, aa),
              g(wi, "polygonOffset", [0, 0]),
              v(_i, oa),
              v(ki, fa),
              g(Ei, "sampleCoverage", [1, !1]),
              v(Ai, na),
              g(Si, "stencilMask", -1),
              g(Ti, "stencilFunc", [La, 0, -1]),
              g(ji, "stencilOpSeparate", [Sa, Ma, Ma, Ma]),
              g(Di, "stencilOpSeparate", [Ta, Ma, Ma, Ma]),
              v(Oi, ia),
              g(Ci, "scissor", [
                0,
                0,
                e.drawingBufferWidth,
                e.drawingBufferHeight,
              ]),
              g(Li, Li, [0, 0, e.drawingBufferWidth, e.drawingBufferHeight]);
            var ie = {
                gl: e,
                context: p,
                strings: t,
                next: ee,
                current: J,
                draw: l,
                elements: a,
                buffer: i,
                shader: c,
                attributes: s.state,
                uniforms: u,
                framebuffer: f,
                extensions: n,
                timer: d,
                isBufferArgs: He,
              },
              ae = {
                primTypes: qt,
                compareFuncs: Wa,
                blendFuncs: qa,
                blendEquations: X,
                stencilOps: Ua,
                glTypes: Ct,
                orientationType: Ga,
              };
            dt.optional(function () {
              ie.isArrayLike = he;
            }),
              K &&
                ((ae.backBuffer = [Ta]),
                (ae.drawBuffer = $(r.maxDrawbuffers, function (e) {
                  return 0 === e
                    ? [0]
                    : $(e, function (e) {
                        return Ra + e;
                      });
                })));
            var oe = 0;
            return {
              next: ee,
              current: J,
              procs: (function () {
                var t = b(),
                  n = t.proc("poll"),
                  i = t.proc("refresh"),
                  a = t.block();
                n(a), i(a);
                var o = t.shared,
                  f = o.gl,
                  u = o.next,
                  s = o.current;
                a(s, ".dirty=false;"), O(t, n), O(t, i, null, !0);
                var c,
                  l = e.getExtension("angle_instanced_arrays");
                l && (c = t.link(l));
                for (var p = 0; p < r.maxAttributes; ++p) {
                  var d = i.def(o.attributes, "[", p, "]"),
                    m = t.cond(d, ".buffer");
                  m
                    .then(
                      f,
                      ".enableVertexAttribArray(",
                      p,
                      ");",
                      f,
                      ".bindBuffer(",
                      Xi,
                      ",",
                      d,
                      ".buffer.buffer);",
                      f,
                      ".vertexAttribPointer(",
                      p,
                      ",",
                      d,
                      ".size,",
                      d,
                      ".type,",
                      d,
                      ".normalized,",
                      d,
                      ".stride,",
                      d,
                      ".offset);"
                    )
                    .else(
                      f,
                      ".disableVertexAttribArray(",
                      p,
                      ");",
                      f,
                      ".vertexAttrib4f(",
                      p,
                      ",",
                      d,
                      ".x,",
                      d,
                      ".y,",
                      d,
                      ".z,",
                      d,
                      ".w);",
                      d,
                      ".buffer=null;"
                    ),
                    i(m),
                    l &&
                      i(
                        c,
                        ".vertexAttribDivisorANGLE(",
                        p,
                        ",",
                        d,
                        ".divisor);"
                      );
                }
                return (
                  Object.keys(ne).forEach(function (e) {
                    var r = ne[e],
                      o = a.def(u, ".", e),
                      c = t.block();
                    c(
                      "if(",
                      o,
                      "){",
                      f,
                      ".enable(",
                      r,
                      ")}else{",
                      f,
                      ".disable(",
                      r,
                      ")}",
                      s,
                      ".",
                      e,
                      "=",
                      o,
                      ";"
                    ),
                      i(c),
                      n("if(", o, "!==", s, ".", e, "){", c, "}");
                  }),
                  Object.keys(re).forEach(function (e) {
                    var r,
                      o,
                      c = re[e],
                      l = J[e],
                      p = t.block();
                    if ((p(f, ".", c, "("), he(l))) {
                      var d = l.length;
                      (r = t.global.def(u, ".", e)),
                        (o = t.global.def(s, ".", e)),
                        p(
                          $(d, function (e) {
                            return r + "[" + e + "]";
                          }),
                          ");",
                          $(d, function (e) {
                            return o + "[" + e + "]=" + r + "[" + e + "];";
                          }).join("")
                        ),
                        n(
                          "if(",
                          $(d, function (e) {
                            return r + "[" + e + "]!==" + o + "[" + e + "]";
                          }).join("||"),
                          "){",
                          p,
                          "}"
                        );
                    } else (r = a.def(u, ".", e)), (o = a.def(s, ".", e)), p(r, ");", s, ".", e, "=", r, ";"), n("if(", r, "!==", o, "){", p, "}");
                    i(p);
                  }),
                  t.compile()
                );
              })(),
              compile: Q,
            };
          }
          function Ye() {
            return {
              bufferCount: 0,
              elementsCount: 0,
              framebufferCount: 0,
              shaderCount: 0,
              textureCount: 0,
              cubeCount: 0,
              renderbufferCount: 0,
              maxTextureUnits: 0,
            };
          }
          function Xe(e, t) {
            for (var n = 0; n < e.length; ++n) if (e[n] === t) return n;
            return -1;
          }
          function $e(e) {
            function t() {
              if (0 === N.length) return E && E.update(), void ($ = null);
              ($ = gt.next(t)), p();
              for (var e = N.length - 1; e >= 0; --e) {
                var n = N[e];
                n && n(j, null, 0);
              }
              g.flush(), E && E.update();
            }
            function n() {
              !$ && N.length > 0 && ($ = gt.next(t));
            }
            function r() {
              $ && (gt.cancel(t), ($ = null));
            }
            function i(e) {
              e.preventDefault(),
                (y = !0),
                r(),
                G.forEach(function (e) {
                  e();
                });
            }
            function a(e) {
              g.getError(),
                (y = !1),
                x.restore(),
                P.restore(),
                L.restore(),
                B.restore(),
                F.restore(),
                I.restore(),
                E && E.restore(),
                R.procs.refresh(),
                n(),
                V.forEach(function (e) {
                  e();
                });
            }
            function o() {
              (N.length = 0),
                r(),
                U &&
                  (U.removeEventListener(to, i), U.removeEventListener(no, a)),
                P.clear(),
                I.clear(),
                F.clear(),
                B.clear(),
                M.clear(),
                L.clear(),
                E && E.clear(),
                X.forEach(function (e) {
                  e();
                });
            }
            function f(e) {
              function t(e) {
                var t = {},
                  n = {};
                return (
                  Object.keys(e).forEach(function (r) {
                    var i = e[r];
                    vt.isDynamic(i) ? (n[r] = vt.unbox(i, r)) : (t[r] = i);
                  }),
                  { dynamic: n, static: t }
                );
              }
              function n(e) {
                for (; d.length < e; ) d.push(null);
                return d;
              }
              function r(e, t) {
                var r;
                if ((y && dt.raise("context lost"), "function" == typeof e))
                  return p.call(this, null, e, 0);
                if ("function" == typeof t) {
                  if ("number" == typeof e) {
                    for (r = 0; r < e; ++r) p.call(this, null, t, r);
                    return;
                  }
                  if (Array.isArray(e)) {
                    for (r = 0; r < e.length; ++r) p.call(this, e[r], t, r);
                    return;
                  }
                  return p.call(this, e, t, 0);
                }
                if ("number" == typeof e) {
                  if (e > 0) return l.call(this, n(0 | e), 0 | e);
                } else {
                  if (!Array.isArray(e)) return c.call(this, e);
                  if (e.length) return l.call(this, e, e.length);
                }
              }
              dt(!!e, "invalid args to regl({...})"),
                dt.type(e, "object", "invalid args to regl({...})");
              var i = t(e.context || {}),
                a = t(e.uniforms || {}),
                o = t(e.attributes || {}),
                f = t(
                  (function (e) {
                    function t(e) {
                      if (e in n) {
                        var t = n[e];
                        delete n[e],
                          Object.keys(t).forEach(function (r) {
                            n[e + "." + r] = t[r];
                          });
                      }
                    }
                    var n = Je({}, e);
                    return (
                      delete n.uniforms,
                      delete n.attributes,
                      delete n.context,
                      "stencil" in n &&
                        n.stencil.op &&
                        ((n.stencil.opBack = n.stencil.opFront = n.stencil.op),
                        delete n.stencil.op),
                      t("blend"),
                      t("depth"),
                      t("cull"),
                      t("stencil"),
                      t("polygonOffset"),
                      t("scissor"),
                      t("sample"),
                      n
                    );
                  })(e)
                ),
                u = { gpuTime: 0, cpuTime: 0, count: 0 },
                s = R.compile(f, o, a, i, u),
                c = s.draw,
                l = s.batch,
                p = s.scope,
                d = [];
              return Je(r, { stats: u });
            }
            function u(e, t) {
              var n = 0;
              R.procs.poll();
              var r = t.color;
              r &&
                (g.clearColor(+r[0] || 0, +r[1] || 0, +r[2] || 0, +r[3] || 0),
                (n |= Za)),
                "depth" in t && (g.clearDepth(+t.depth), (n |= Ka)),
                "stencil" in t && (g.clearStencil(0 | t.stencil), (n |= Ja)),
                dt(!!n, "called regl.clear with no buffer specified"),
                g.clear(n);
            }
            function s(e) {
              if (
                (dt(
                  "object" == typeof e && e,
                  "regl.clear() takes an object as input"
                ),
                "framebuffer" in e)
              )
                if (
                  e.framebuffer &&
                  "framebufferCube" === e.framebuffer_reglType
                )
                  for (var t = 0; t < 6; ++t)
                    Z(Je({ framebuffer: e.framebuffer.faces[t] }, e), u);
                else Z(e, u);
              else u(null, e);
            }
            function c(e) {
              function t() {
                function t() {
                  var e = Xe(N, t);
                  (N[e] = N[N.length - 1]),
                    (N.length -= 1),
                    N.length <= 0 && r();
                }
                var n = Xe(N, e);
                dt(n >= 0, "cannot cancel a frame twice"), (N[n] = t);
              }
              return (
                dt.type(
                  e,
                  "function",
                  "regl.frame() callback must be a function"
                ),
                N.push(e),
                n(),
                { cancel: t }
              );
            }
            function l() {
              var e = W.viewport,
                t = W.scissor_box;
              (e[0] = e[1] = t[0] = t[1] = 0),
                (j.viewportWidth =
                  j.framebufferWidth =
                  j.drawingBufferWidth =
                  e[2] =
                  t[2] =
                    g.drawingBufferWidth),
                (j.viewportHeight =
                  j.framebufferHeight =
                  j.drawingBufferHeight =
                  e[3] =
                  t[3] =
                    g.drawingBufferHeight);
            }
            function p() {
              (j.tick += 1), (j.time = m()), l(), R.procs.poll();
            }
            function d() {
              l(), R.procs.refresh(), E && E.update();
            }
            function m() {
              return (bt() - A) / 1e3;
            }
            function h(e, t) {
              dt.type(t, "function", "listener callback must be a function");
              var n;
              switch (e) {
                case "frame":
                  return c(t);
                case "lost":
                  n = G;
                  break;
                case "restore":
                  n = V;
                  break;
                case "destroy":
                  n = X;
                  break;
                default:
                  dt.raise(
                    "invalid event, must be one of frame,lost,restore,destroy"
                  );
              }
              return (
                n.push(t),
                {
                  cancel: function () {
                    for (var e = 0; e < n.length; ++e)
                      if (n[e] === t)
                        return (n[e] = n[n.length - 1]), void n.pop();
                  },
                }
              );
            }
            var v = Q(e);
            if (!v) return null;
            var g = v.gl,
              b = g.getContextAttributes(),
              y = g.isContextLost(),
              x = Y(g, v);
            if (!x) return null;
            var w = q(),
              _ = Ye(),
              k = x.extensions,
              E = $a(g, k),
              A = bt(),
              S = g.drawingBufferWidth,
              T = g.drawingBufferHeight,
              j = {
                tick: 0,
                time: 0,
                viewportWidth: S,
                viewportHeight: T,
                framebufferWidth: S,
                framebufferHeight: T,
                drawingBufferWidth: S,
                drawingBufferHeight: T,
                pixelRatio: v.pixelRatio,
              },
              D = {},
              O = {
                elements: null,
                primitive: 4,
                count: -1,
                offset: 0,
                instances: -1,
              },
              C = yt(g, k),
              L = pe(g, _, v),
              M = de(g, k, L, _),
              z = Pe(g, k, C, L, w),
              P = Be(g, w, _, v),
              B = Ce(
                g,
                k,
                C,
                function () {
                  R.procs.poll();
                },
                j,
                _,
                v
              ),
              F = kr(g, k, C, _, v),
              I = Me(g, k, C, B, F, _),
              R = Qe(g, w, k, C, L, M, B, I, D, z, P, O, j, E, v),
              H = Fe(g, I, R.procs.poll, j, b, k),
              W = R.next,
              U = g.canvas,
              N = [],
              G = [],
              V = [],
              X = [v.onDestroy],
              $ = null;
            U && (U.addEventListener(to, i, !1), U.addEventListener(no, a, !1));
            var Z = (I.setFBO = f({
              framebuffer: vt.define.call(null, ro, "framebuffer"),
            }));
            d();
            var K = Je(f, {
              clear: s,
              prop: vt.define.bind(null, ro),
              context: vt.define.bind(null, io),
              this: vt.define.bind(null, ao),
              draw: f({}),
              buffer: function (e) {
                return L.create(e, eo, !1, !1);
              },
              elements: function (e) {
                return M.create(e, !1);
              },
              texture: B.create2D,
              cube: B.createCube,
              renderbuffer: F.create,
              framebuffer: I.create,
              framebufferCube: I.createCube,
              attributes: b,
              frame: c,
              on: h,
              limits: C,
              hasExtension: function (e) {
                return C.extensions.indexOf(e.toLowerCase()) >= 0;
              },
              read: H,
              destroy: o,
              _gl: g,
              _refresh: d,
              poll: function () {
                p(), E && E.update();
              },
              now: m,
              stats: _,
            });
            return v.onDone(null, K), K;
          }
          var Ze = {
              "[object Int8Array]": 5120,
              "[object Int16Array]": 5122,
              "[object Int32Array]": 5124,
              "[object Uint8Array]": 5121,
              "[object Uint8ClampedArray]": 5121,
              "[object Uint16Array]": 5123,
              "[object Uint32Array]": 5125,
              "[object Float32Array]": 5126,
              "[object Float64Array]": 5121,
              "[object ArrayBuffer]": 5121,
            },
            Ke = function (e) {
              return Object.prototype.toString.call(e) in Ze;
            },
            Je = function (e, t) {
              for (var n = Object.keys(t), r = 0; r < n.length; ++r)
                e[n[r]] = t[n[r]];
              return e;
            },
            et = [
              "gl",
              "canvas",
              "container",
              "attributes",
              "pixelRatio",
              "extensions",
              "optionalExtensions",
              "profile",
              "onDone",
            ],
            tt = 33071,
            nt = 9728,
            rt = 9984,
            it = 9985,
            at = 9986,
            ot = 9987,
            ft = 5126,
            ut = 32819,
            st = 32820,
            ct = 33635,
            lt = 34042,
            pt = {};
          (pt[5120] = pt[5121] = 1),
            (pt[5122] = pt[5123] = pt[36193] = pt[ct] = pt[ut] = pt[st] = 2),
            (pt[5124] = pt[5125] = pt[ft] = pt[lt] = 4);
          var dt = Je(n, {
              optional: T,
              raise: t,
              commandRaise: k,
              command: E,
              parameter: i,
              commandParameter: A,
              constructor: s,
              type: o,
              commandType: S,
              isTypedArray: a,
              nni: f,
              oneOf: u,
              shaderError: y,
              linkError: x,
              callSite: h,
              saveCommandRef: w,
              saveDrawInfo: _,
              framebufferFormat: j,
              guessCommand: m,
              texture2D: C,
              textureCube: L,
            }),
            mt = 0,
            ht = 0,
            vt = {
              DynamicVariable: M,
              define: F,
              isDynamic: I,
              unbox: R,
              accessor: B,
            },
            gt = {
              next:
                "function" == typeof requestAnimationFrame
                  ? function (e) {
                      return requestAnimationFrame(e);
                    }
                  : function (e) {
                      return setTimeout(e, 16);
                    },
              cancel:
                "function" == typeof cancelAnimationFrame
                  ? function (e) {
                      return cancelAnimationFrame(e);
                    }
                  : clearTimeout,
            },
            bt =
              "undefined" != typeof performance && performance.now
                ? function () {
                    return performance.now();
                  }
                : function () {
                    return +new Date();
                  },
            yt = function (e, t) {
              var n = 1;
              t.ext_texture_filter_anisotropic && (n = e.getParameter(34047));
              var r = 1,
                i = 1;
              return (
                t.webgl_draw_buffers &&
                  ((r = e.getParameter(34852)), (i = e.getParameter(36063))),
                {
                  colorBits: [
                    e.getParameter(3410),
                    e.getParameter(3411),
                    e.getParameter(3412),
                    e.getParameter(3413),
                  ],
                  depthBits: e.getParameter(3414),
                  stencilBits: e.getParameter(3415),
                  subpixelBits: e.getParameter(3408),
                  extensions: Object.keys(t).filter(function (e) {
                    return !!t[e];
                  }),
                  maxAnisotropic: n,
                  maxDrawbuffers: r,
                  maxColorAttachments: i,
                  pointSizeDims: e.getParameter(33901),
                  lineWidthDims: e.getParameter(33902),
                  maxViewportDims: e.getParameter(3386),
                  maxCombinedTextureUnits: e.getParameter(35661),
                  maxCubeMapSize: e.getParameter(34076),
                  maxRenderbufferSize: e.getParameter(34024),
                  maxTextureUnits: e.getParameter(34930),
                  maxTextureSize: e.getParameter(3379),
                  maxAttributes: e.getParameter(34921),
                  maxVertexUniforms: e.getParameter(36347),
                  maxVertexTextureUnits: e.getParameter(35660),
                  maxVaryingVectors: e.getParameter(36348),
                  maxFragmentUniforms: e.getParameter(36349),
                  glsl: e.getParameter(35724),
                  renderer: e.getParameter(7937),
                  vendor: e.getParameter(7936),
                  version: e.getParameter(7938),
                }
              );
            },
            xt = function (e) {
              return Object.keys(e).map(function (t) {
                return e[t];
              });
            },
            wt = 5120,
            _t = 5121,
            kt = 5122,
            Et = 5123,
            At = 5124,
            St = 5125,
            Tt = 5126,
            jt = $(8, function () {
              return [];
            }),
            Dt = { alloc: J, free: ee, allocType: te, freeType: ne },
            Ot = { shape: ue, flatten: fe },
            Ct = {
              int8: 5120,
              int16: 5122,
              int32: 5124,
              uint8: 5121,
              uint16: 5123,
              uint32: 5125,
              float: 5126,
              float32: 5126,
            },
            Lt = { dynamic: 35048, stream: 35040, static: 35044 },
            Mt = Ot.flatten,
            zt = Ot.shape,
            Pt = 35044,
            Bt = 35040,
            Ft = 5121,
            It = 5126,
            Rt = [];
          (Rt[5120] = 1),
            (Rt[5122] = 2),
            (Rt[5124] = 4),
            (Rt[5121] = 1),
            (Rt[5123] = 2),
            (Rt[5125] = 4),
            (Rt[5126] = 4);
          var qt = {
              points: 0,
              point: 0,
              lines: 1,
              line: 1,
              triangles: 4,
              triangle: 4,
              "line loop": 2,
              "line strip": 3,
              "triangle strip": 5,
              "triangle fan": 6,
            },
            Ht = 0,
            Wt = 1,
            Ut = 4,
            Nt = 5120,
            Gt = 5121,
            Vt = 5122,
            Qt = 5123,
            Yt = 5124,
            Xt = 5125,
            $t = 34963,
            Zt = 35040,
            Kt = 35044,
            Jt = new Float32Array(1),
            en = new Uint32Array(Jt.buffer),
            tn = 5123,
            nn = 34467,
            rn = 3553,
            an = 34067,
            on = 34069,
            fn = 6408,
            un = 6406,
            sn = 6407,
            cn = 6409,
            ln = 6410,
            pn = 32854,
            dn = 32855,
            mn = 36194,
            hn = 32819,
            vn = 32820,
            gn = 33635,
            bn = 34042,
            yn = 6402,
            xn = 34041,
            wn = 35904,
            _n = 35906,
            kn = 36193,
            En = 33776,
            An = 33777,
            Sn = 33778,
            Tn = 33779,
            jn = 35986,
            Dn = 35987,
            On = 34798,
            Cn = 35840,
            Ln = 35841,
            Mn = 35842,
            zn = 35843,
            Pn = 36196,
            Bn = 5121,
            Fn = 5123,
            In = 5125,
            Rn = 5126,
            qn = 10242,
            Hn = 10243,
            Wn = 10497,
            Un = 33071,
            Nn = 33648,
            Gn = 10240,
            Vn = 10241,
            Qn = 9728,
            Yn = 9729,
            Xn = 9984,
            $n = 9985,
            Zn = 9986,
            Kn = 9987,
            Jn = 33170,
            er = 4352,
            tr = 4353,
            nr = 4354,
            rr = 34046,
            ir = 3317,
            ar = 37440,
            or = 37441,
            fr = 37443,
            ur = 37444,
            sr = 33984,
            cr = [Xn, Zn, $n, Kn],
            lr = [0, cn, ln, sn, fn],
            pr = {};
          (pr[cn] = pr[un] = pr[yn] = 1),
            (pr[xn] = pr[ln] = 2),
            (pr[sn] = pr[wn] = 3),
            (pr[fn] = pr[_n] = 4);
          var dr = ve("HTMLCanvasElement"),
            mr = ve("CanvasRenderingContext2D"),
            hr = ve("HTMLImageElement"),
            vr = ve("HTMLVideoElement"),
            gr = Object.keys(Ze).concat([dr, mr, hr, vr]),
            br = [];
          (br[Bn] = 1), (br[Rn] = 4), (br[kn] = 2), (br[Fn] = 2), (br[In] = 4);
          var yr = [];
          (yr[pn] = 2),
            (yr[dn] = 2),
            (yr[mn] = 2),
            (yr[xn] = 4),
            (yr[En] = 0.5),
            (yr[An] = 0.5),
            (yr[Sn] = 1),
            (yr[Tn] = 1),
            (yr[jn] = 0.5),
            (yr[Dn] = 1),
            (yr[On] = 1),
            (yr[Cn] = 0.5),
            (yr[Ln] = 0.25),
            (yr[Mn] = 0.5),
            (yr[zn] = 0.25),
            (yr[Pn] = 0.5);
          var xr = 36161,
            wr = 32854,
            _r = [];
          (_r[wr] = 2),
            (_r[32855] = 2),
            (_r[36194] = 2),
            (_r[33189] = 2),
            (_r[36168] = 1),
            (_r[34041] = 4),
            (_r[35907] = 4),
            (_r[34836] = 16),
            (_r[34842] = 8),
            (_r[34843] = 6);
          var kr = function (e, t, n, r, i) {
              function a(e) {
                (this.id = l++),
                  (this.refCount = 1),
                  (this.renderbuffer = e),
                  (this.format = wr),
                  (this.width = 0),
                  (this.height = 0),
                  i.profile && (this.stats = { size: 0 });
              }
              function o(t) {
                var n = t.renderbuffer;
                dt(n, "must not double destroy renderbuffer"),
                  e.bindRenderbuffer(xr, null),
                  e.deleteRenderbuffer(n),
                  (t.renderbuffer = null),
                  (t.refCount = 0),
                  delete p[t.id],
                  r.renderbufferCount--;
              }
              function f(t, o) {
                function f(t, r) {
                  var a = 0,
                    o = 0,
                    u = wr;
                  if ("object" == typeof t && t) {
                    var p = t;
                    if ("shape" in p) {
                      var d = p.shape;
                      dt(
                        Array.isArray(d) && d.length >= 2,
                        "invalid renderbuffer shape"
                      ),
                        (a = 0 | d[0]),
                        (o = 0 | d[1]);
                    } else
                      "radius" in p && (a = o = 0 | p.radius),
                        "width" in p && (a = 0 | p.width),
                        "height" in p && (o = 0 | p.height);
                    "format" in p &&
                      (dt.parameter(p.format, s, "invalid renderbuffer format"),
                      (u = s[p.format]));
                  } else
                    "number" == typeof t
                      ? ((a = 0 | t), (o = "number" == typeof r ? 0 | r : a))
                      : t
                      ? dt.raise(
                          "invalid arguments to renderbuffer constructor"
                        )
                      : (a = o = 1);
                  if (
                    (dt(
                      a > 0 &&
                        o > 0 &&
                        a <= n.maxRenderbufferSize &&
                        o <= n.maxRenderbufferSize,
                      "invalid renderbuffer size"
                    ),
                    a !== l.width || o !== l.height || u !== l.format)
                  )
                    return (
                      (f.width = l.width = a),
                      (f.height = l.height = o),
                      (l.format = u),
                      e.bindRenderbuffer(xr, l.renderbuffer),
                      e.renderbufferStorage(xr, u, a, o),
                      i.profile &&
                        (l.stats.size = Le(l.format, l.width, l.height)),
                      (f.format = c[l.format]),
                      f
                    );
                }
                function u(t, r) {
                  var a = 0 | t,
                    o = 0 | r || a;
                  return a === l.width && o === l.height
                    ? f
                    : (dt(
                        a > 0 &&
                          o > 0 &&
                          a <= n.maxRenderbufferSize &&
                          o <= n.maxRenderbufferSize,
                        "invalid renderbuffer size"
                      ),
                      (f.width = l.width = a),
                      (f.height = l.height = o),
                      e.bindRenderbuffer(xr, l.renderbuffer),
                      e.renderbufferStorage(xr, l.format, a, o),
                      i.profile &&
                        (l.stats.size = Le(l.format, l.width, l.height)),
                      f);
                }
                var l = new a(e.createRenderbuffer());
                return (
                  (p[l.id] = l),
                  r.renderbufferCount++,
                  f(t, o),
                  (f.resize = u),
                  (f._reglType = "renderbuffer"),
                  (f._renderbuffer = l),
                  i.profile && (f.stats = l.stats),
                  (f.destroy = function () {
                    l.decRef();
                  }),
                  f
                );
              }
              function u() {
                xt(p).forEach(function (t) {
                  (t.renderbuffer = e.createRenderbuffer()),
                    e.bindRenderbuffer(xr, t.renderbuffer),
                    e.renderbufferStorage(xr, t.format, t.width, t.height);
                }),
                  e.bindRenderbuffer(xr, null);
              }
              var s = {
                rgba4: wr,
                rgb565: 36194,
                "rgb5 a1": 32855,
                depth: 33189,
                stencil: 36168,
                "depth stencil": 34041,
              };
              t.ext_srgb && (s.srgba = 35907),
                t.ext_color_buffer_half_float &&
                  ((s.rgba16f = 34842), (s.rgb16f = 34843)),
                t.webgl_color_buffer_float && (s.rgba32f = 34836);
              var c = [];
              Object.keys(s).forEach(function (e) {
                var t = s[e];
                c[t] = e;
              });
              var l = 0,
                p = {};
              return (
                (a.prototype.decRef = function () {
                  --this.refCount <= 0 && o(this);
                }),
                i.profile &&
                  (r.getTotalRenderbufferSize = function () {
                    var e = 0;
                    return (
                      Object.keys(p).forEach(function (t) {
                        e += p[t].stats.size;
                      }),
                      e
                    );
                  }),
                {
                  create: f,
                  clear: function () {
                    xt(p).forEach(o);
                  },
                  restore: u,
                }
              );
            },
            Er = 36160,
            Ar = 36161,
            Sr = 3553,
            Tr = 34069,
            jr = 36064,
            Dr = 36096,
            Or = 36128,
            Cr = 33306,
            Lr = 36053,
            Mr = 6402,
            zr = [6408],
            Pr = [];
          Pr[6408] = 4;
          var Br = [];
          (Br[5121] = 1), (Br[5126] = 4), (Br[36193] = 2);
          var Fr = 33189,
            Ir = 36168,
            Rr = 34041,
            qr = [32854, 32855, 36194, 35907, 34842, 34843, 34836],
            Hr = {};
          (Hr[Lr] = "complete"),
            (Hr[36054] = "incomplete attachment"),
            (Hr[36057] = "incomplete dimensions"),
            (Hr[36055] = "incomplete, missing attachment"),
            (Hr[36061] = "unsupported");
          var Wr = 5126,
            Ur = 35632,
            Nr = 35633,
            Gr = 35718,
            Vr = 35721,
            Qr = 6408,
            Yr = 5121,
            Xr = 3333,
            $r = 5126,
            Zr = "xyzw".split(""),
            Kr = 5121,
            Jr = 1,
            ei = 2,
            ti = 0,
            ni = 1,
            ri = 2,
            ii = 3,
            ai = 4,
            oi = "dither",
            fi = "blend.enable",
            ui = "blend.color",
            si = "blend.equation",
            ci = "blend.func",
            li = "depth.enable",
            pi = "depth.func",
            di = "depth.range",
            mi = "depth.mask",
            hi = "colorMask",
            vi = "cull.enable",
            gi = "cull.face",
            bi = "frontFace",
            yi = "lineWidth",
            xi = "polygonOffset.enable",
            wi = "polygonOffset.offset",
            _i = "sample.alpha",
            ki = "sample.enable",
            Ei = "sample.coverage",
            Ai = "stencil.enable",
            Si = "stencil.mask",
            Ti = "stencil.func",
            ji = "stencil.opFront",
            Di = "stencil.opBack",
            Oi = "scissor.enable",
            Ci = "scissor.box",
            Li = "viewport",
            Mi = "profile",
            zi = "framebuffer",
            Pi = "vert",
            Bi = "frag",
            Fi = "elements",
            Ii = "primitive",
            Ri = "count",
            qi = "offset",
            Hi = "instances",
            Wi = zi + "Width",
            Ui = zi + "Height",
            Ni = Li + "Width",
            Gi = Li + "Height",
            Vi = "drawingBufferWidth",
            Qi = "drawingBufferHeight",
            Yi = [ci, si, Ti, ji, Di, Ei, Li, Ci, wi],
            Xi = 34962,
            $i = 34963,
            Zi = 3553,
            Ki = 34067,
            Ji = 2884,
            ea = 3042,
            ta = 3024,
            na = 2960,
            ra = 2929,
            ia = 3089,
            aa = 32823,
            oa = 32926,
            fa = 32928,
            ua = 5126,
            sa = 35664,
            ca = 35665,
            la = 35666,
            pa = 5124,
            da = 35667,
            ma = 35668,
            ha = 35669,
            va = 35670,
            ga = 35671,
            ba = 35672,
            ya = 35673,
            xa = 35674,
            wa = 35675,
            _a = 35676,
            ka = 35678,
            Ea = 35680,
            Aa = 4,
            Sa = 1028,
            Ta = 1029,
            ja = 2304,
            Da = 2305,
            Oa = 32775,
            Ca = 32776,
            La = 519,
            Ma = 7680,
            za = 0,
            Pa = 1,
            Ba = 32774,
            Fa = 513,
            Ia = 36160,
            Ra = 36064,
            qa = {
              0: 0,
              1: 1,
              zero: 0,
              one: 1,
              "src color": 768,
              "one minus src color": 769,
              "src alpha": 770,
              "one minus src alpha": 771,
              "dst color": 774,
              "one minus dst color": 775,
              "dst alpha": 772,
              "one minus dst alpha": 773,
              "constant color": 32769,
              "one minus constant color": 32770,
              "constant alpha": 32771,
              "one minus constant alpha": 32772,
              "src alpha saturate": 776,
            },
            Ha = [
              "constant color, constant alpha",
              "one minus constant color, constant alpha",
              "constant color, one minus constant alpha",
              "one minus constant color, one minus constant alpha",
              "constant alpha, constant color",
              "constant alpha, one minus constant color",
              "one minus constant alpha, constant color",
              "one minus constant alpha, one minus constant color",
            ],
            Wa = {
              never: 512,
              less: 513,
              "<": 513,
              equal: 514,
              "=": 514,
              "==": 514,
              "===": 514,
              lequal: 515,
              "<=": 515,
              greater: 516,
              ">": 516,
              notequal: 517,
              "!=": 517,
              "!==": 517,
              gequal: 518,
              ">=": 518,
              always: 519,
            },
            Ua = {
              0: 0,
              zero: 0,
              keep: 7680,
              replace: 7681,
              increment: 7682,
              decrement: 7683,
              "increment wrap": 34055,
              "decrement wrap": 34056,
              invert: 5386,
            },
            Na = { frag: 35632, vert: 35633 },
            Ga = { cw: ja, ccw: Da },
            Va = new Ue(!1, !1, !1, function () {}),
            Qa = 34918,
            Ya = 34919,
            Xa = 35007,
            $a = function (e, t) {
              function n() {
                return p.pop() || l.createQueryEXT();
              }
              function r(e) {
                p.push(e);
              }
              function i(e) {
                var t = n();
                l.beginQueryEXT(Xa, t), d.push(t), s(d.length - 1, d.length, e);
              }
              function a() {
                l.endQueryEXT(Xa);
              }
              function o() {
                (this.startQueryIndex = -1),
                  (this.endQueryIndex = -1),
                  (this.sum = 0),
                  (this.stats = null);
              }
              function f() {
                return m.pop() || new o();
              }
              function u(e) {
                m.push(e);
              }
              function s(e, t, n) {
                var r = f();
                (r.startQueryIndex = e),
                  (r.endQueryIndex = t),
                  (r.sum = 0),
                  (r.stats = n),
                  h.push(r);
              }
              function c() {
                var e,
                  t,
                  n = d.length;
                if (0 !== n) {
                  (g.length = Math.max(g.length, n + 1)),
                    (v.length = Math.max(v.length, n + 1)),
                    (v[0] = 0),
                    (g[0] = 0);
                  var i = 0;
                  for (e = 0, t = 0; t < d.length; ++t) {
                    var a = d[t];
                    l.getQueryObjectEXT(a, Ya)
                      ? ((i += l.getQueryObjectEXT(a, Qa)), r(a))
                      : (d[e++] = a),
                      (v[t + 1] = i),
                      (g[t + 1] = e);
                  }
                  for (d.length = e, e = 0, t = 0; t < h.length; ++t) {
                    var o = h[t],
                      f = o.startQueryIndex,
                      s = o.endQueryIndex;
                    o.sum += v[s] - v[f];
                    var c = g[f],
                      p = g[s];
                    p === c
                      ? ((o.stats.gpuTime += o.sum / 1e6), u(o))
                      : ((o.startQueryIndex = c),
                        (o.endQueryIndex = p),
                        (h[e++] = o));
                  }
                  h.length = e;
                }
              }
              var l = t.ext_disjoint_timer_query;
              if (!l) return null;
              var p = [],
                d = [],
                m = [],
                h = [],
                v = [],
                g = [];
              return {
                beginQuery: i,
                endQuery: a,
                pushScopeStats: s,
                update: c,
                getNumPendingQueries: function () {
                  return d.length;
                },
                clear: function () {
                  p.push.apply(p, d);
                  for (var e = 0; e < p.length; e++) l.deleteQueryEXT(p[e]);
                  (d.length = 0), (p.length = 0);
                },
                restore: function () {
                  (d.length = 0), (p.length = 0);
                },
              };
            },
            Za = 16384,
            Ka = 256,
            Ja = 1024,
            eo = 34962,
            to = "webglcontextlost",
            no = "webglcontextrestored",
            ro = 1,
            io = 2,
            ao = 3;
          return $e;
        });
      },
      {},
    ],
    65: [
      function (e, t, n) {
        (function (e) {
          t.exports =
            e.performance && e.performance.now
              ? function () {
                  return performance.now();
                }
              : Date.now ||
                function () {
                  return +new Date();
                };
        }.call(
          this,
          "undefined" != typeof global
            ? global
            : "undefined" != typeof self
            ? self
            : "undefined" != typeof window
            ? window
            : {}
        ));
      },
      {},
    ],
    66: [
      function (e, t, n) {
        (function (e) {
          t.exports = function (t, n) {
            function r(t) {
              function r() {
                n && n(t, a), (n = null);
              }
              u ? e.nextTick(r) : r();
            }
            function i(e, t, n) {
              (a[e] = n), (0 == --o || t) && r(t);
            }
            var a,
              o,
              f,
              u = !0;
            Array.isArray(t)
              ? ((a = []), (o = t.length))
              : ((f = Object.keys(t)), (a = {}), (o = f.length)),
              o
                ? f
                  ? f.forEach(function (e) {
                      t[e](function (t, n) {
                        i(e, t, n);
                      });
                    })
                  : t.forEach(function (e, t) {
                      e(function (e, n) {
                        i(t, e, n);
                      });
                    })
                : r(null),
              (u = !1);
          };
        }.call(this, e("_process")));
      },
      { _process: 55 },
    ],
    67: [
      function (e, t, n) {
        "use strict";
        function r(e, t) {
          var n = o(getComputedStyle(e).getPropertyValue(t));
          return n[0] * a(n[1], e);
        }
        function i(e, t) {
          var n = document.createElement("div");
          (n.style["font-size"] = "128" + e), t.appendChild(n);
          var i = r(n, "font-size") / 128;
          return t.removeChild(n), i;
        }
        function a(e, t) {
          switch (
            ((t = t || document.body),
            (e = (e || "px").trim().toLowerCase()),
            (t !== window && t !== document) || (t = document.body),
            e)
          ) {
            case "%":
              return t.clientHeight / 100;
            case "ch":
            case "ex":
              return i(e, t);
            case "em":
              return r(t, "font-size");
            case "rem":
              return r(document.body, "font-size");
            case "vw":
              return window.innerWidth / 100;
            case "vh":
              return window.innerHeight / 100;
            case "vmin":
              return Math.min(window.innerWidth, window.innerHeight) / 100;
            case "vmax":
              return Math.max(window.innerWidth, window.innerHeight) / 100;
            case "in":
              return f;
            case "cm":
              return f / 2.54;
            case "mm":
              return f / 25.4;
            case "pt":
              return f / 72;
            case "pc":
              return f / 6;
          }
          return 1;
        }
        var o = e("parse-unit");
        t.exports = a;
        var f = 96;
      },
      { "parse-unit": 47 },
    ],
    68: [
      function (e, t, n) {
        function r(e) {
          function t(e) {
            for (var t = e.identifier, n = 0; n < m.length; n++)
              if (m[n] && m[n].touch && m[n].touch.identifier === t) return n;
            return -1;
          }
          function n() {
            b ||
              ((b = !0),
              e.addEventListener("touchstart", s, !1),
              e.addEventListener("touchmove", c, !1),
              e.addEventListener("touchend", l, !1),
              e.addEventListener("touchcancel", l, !1));
          }
          function r() {
            b &&
              ((b = !1),
              (h = 0),
              (m[0] = null),
              (m[1] = null),
              (v = 0),
              (g = !1),
              e.removeEventListener("touchstart", s, !1),
              e.removeEventListener("touchmove", c, !1),
              e.removeEventListener("touchend", l, !1),
              e.removeEventListener("touchcancel", l, !1));
          }
          function s(n) {
            for (var r = 0; r < n.changedTouches.length; r++) {
              var a = n.changedTouches[r];
              if (-1 === t(a.identifier) && h < 2) {
                var o = 0 === h,
                  f = m[0] ? 1 : 0,
                  s = m[0] ? 0 : 1,
                  c = new i();
                (m[f] = c), h++, (c.touch = a), u(a, e, c.position);
                var l = m[s] ? m[s].touch : void 0;
                if ((d.emit("place", a, l), !o)) {
                  var b = p();
                  (g = !1), d.emit("start", b), (v = b);
                }
              }
            }
          }
          function c(n) {
            for (var r = !1, i = 0; i < n.changedTouches.length; i++) {
              var a = n.changedTouches[i],
                o = t(a);
              -1 !== o && ((r = !0), (m[o].touch = a), u(a, e, m[o].position));
            }
            if (2 === h && r) {
              var f = p();
              d.emit("change", f, v), (v = f);
            }
          }
          function l(e) {
            for (var n = 0; n < e.changedTouches.length; n++) {
              var r = e.changedTouches[n],
                i = t(r);
              if (-1 !== i) {
                (m[i] = null), h--;
                var a = 0 === i ? 1 : 0,
                  o = m[a] ? m[a].touch : void 0;
                d.emit("lift", r, o);
              }
            }
            g || 2 === h || ((g = !0), d.emit("end"));
          }
          function p() {
            return h < 2 ? 0 : a(m[0].position, m[1].position);
          }
          e = e || window;
          var d = new o(),
            m = [null, null],
            h = 0,
            v = 0,
            g = !1,
            b = !1;
          return (
            Object.defineProperties(d, {
              pinching: f(function () {
                return 2 === h;
              }),
              fingers: f(function () {
                return m;
              }),
            }),
            n(),
            (d.enable = n),
            (d.disable = r),
            (d.indexOfTouch = t),
            d
          );
        }
        function i() {
          (this.position = [0, 0]), (this.touch = null);
        }
        var a = e("gl-vec2/distance"),
          o = e("events").EventEmitter,
          f = e("dprop"),
          u = e("mouse-event-offset");
        t.exports = r;
      },
      {
        dprop: 10,
        events: 12,
        "gl-vec2/distance": 24,
        "mouse-event-offset": 42,
      },
    ],
  },
  {},
  [2]
);
