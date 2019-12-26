// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/countup.js/dist/countUp.min.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CountUp = void 0;

var __assign = void 0 && (void 0).__assign || function () {
  return (__assign = Object.assign || function (t) {
    for (var i, a = 1, s = arguments.length; a < s; a++) for (var n in i = arguments[a]) Object.prototype.hasOwnProperty.call(i, n) && (t[n] = i[n]);

    return t;
  }).apply(this, arguments);
},
    CountUp = function () {
  function t(t, i, a) {
    var s = this;
    this.target = t, this.endVal = i, this.options = a, this.version = "2.0.4", this.defaults = {
      startVal: 0,
      decimalPlaces: 0,
      duration: 2,
      useEasing: !0,
      useGrouping: !0,
      smartEasingThreshold: 999,
      smartEasingAmount: 333,
      separator: ",",
      decimal: ".",
      prefix: "",
      suffix: ""
    }, this.finalEndVal = null, this.useEasing = !0, this.countDown = !1, this.error = "", this.startVal = 0, this.paused = !0, this.count = function (t) {
      s.startTime || (s.startTime = t);
      var i = t - s.startTime;
      s.remaining = s.duration - i, s.useEasing ? s.countDown ? s.frameVal = s.startVal - s.easingFn(i, 0, s.startVal - s.endVal, s.duration) : s.frameVal = s.easingFn(i, s.startVal, s.endVal - s.startVal, s.duration) : s.countDown ? s.frameVal = s.startVal - (s.startVal - s.endVal) * (i / s.duration) : s.frameVal = s.startVal + (s.endVal - s.startVal) * (i / s.duration), s.countDown ? s.frameVal = s.frameVal < s.endVal ? s.endVal : s.frameVal : s.frameVal = s.frameVal > s.endVal ? s.endVal : s.frameVal, s.frameVal = Math.round(s.frameVal * s.decimalMult) / s.decimalMult, s.printValue(s.frameVal), i < s.duration ? s.rAF = requestAnimationFrame(s.count) : null !== s.finalEndVal ? s.update(s.finalEndVal) : s.callback && s.callback();
    }, this.formatNumber = function (t) {
      var i,
          a,
          n,
          e,
          r,
          o = t < 0 ? "-" : "";

      if (i = Math.abs(t).toFixed(s.options.decimalPlaces), n = (a = (i += "").split("."))[0], e = a.length > 1 ? s.options.decimal + a[1] : "", s.options.useGrouping) {
        r = "";

        for (var l = 0, h = n.length; l < h; ++l) 0 !== l && l % 3 == 0 && (r = s.options.separator + r), r = n[h - l - 1] + r;

        n = r;
      }

      return s.options.numerals && s.options.numerals.length && (n = n.replace(/[0-9]/g, function (t) {
        return s.options.numerals[+t];
      }), e = e.replace(/[0-9]/g, function (t) {
        return s.options.numerals[+t];
      })), o + s.options.prefix + n + e + s.options.suffix;
    }, this.easeOutExpo = function (t, i, a, s) {
      return a * (1 - Math.pow(2, -10 * t / s)) * 1024 / 1023 + i;
    }, this.options = __assign({}, this.defaults, a), this.formattingFn = this.options.formattingFn ? this.options.formattingFn : this.formatNumber, this.easingFn = this.options.easingFn ? this.options.easingFn : this.easeOutExpo, this.startVal = this.validateValue(this.options.startVal), this.frameVal = this.startVal, this.endVal = this.validateValue(i), this.options.decimalPlaces = Math.max(this.options.decimalPlaces), this.decimalMult = Math.pow(10, this.options.decimalPlaces), this.resetDuration(), this.options.separator = String(this.options.separator), this.useEasing = this.options.useEasing, "" === this.options.separator && (this.options.useGrouping = !1), this.el = "string" == typeof t ? document.getElementById(t) : t, this.el ? this.printValue(this.startVal) : this.error = "[CountUp] target is null or undefined";
  }

  return t.prototype.determineDirectionAndSmartEasing = function () {
    var t = this.finalEndVal ? this.finalEndVal : this.endVal;
    this.countDown = this.startVal > t;
    var i = t - this.startVal;

    if (Math.abs(i) > this.options.smartEasingThreshold) {
      this.finalEndVal = t;
      var a = this.countDown ? 1 : -1;
      this.endVal = t + a * this.options.smartEasingAmount, this.duration = this.duration / 2;
    } else this.endVal = t, this.finalEndVal = null;

    this.finalEndVal ? this.useEasing = !1 : this.useEasing = this.options.useEasing;
  }, t.prototype.start = function (t) {
    this.error || (this.callback = t, this.duration > 0 ? (this.determineDirectionAndSmartEasing(), this.paused = !1, this.rAF = requestAnimationFrame(this.count)) : this.printValue(this.endVal));
  }, t.prototype.pauseResume = function () {
    this.paused ? (this.startTime = null, this.duration = this.remaining, this.startVal = this.frameVal, this.determineDirectionAndSmartEasing(), this.rAF = requestAnimationFrame(this.count)) : cancelAnimationFrame(this.rAF), this.paused = !this.paused;
  }, t.prototype.reset = function () {
    cancelAnimationFrame(this.rAF), this.paused = !0, this.resetDuration(), this.startVal = this.validateValue(this.options.startVal), this.frameVal = this.startVal, this.printValue(this.startVal);
  }, t.prototype.update = function (t) {
    cancelAnimationFrame(this.rAF), this.startTime = null, this.endVal = this.validateValue(t), this.endVal !== this.frameVal && (this.startVal = this.frameVal, this.finalEndVal || this.resetDuration(), this.determineDirectionAndSmartEasing(), this.rAF = requestAnimationFrame(this.count));
  }, t.prototype.printValue = function (t) {
    var i = this.formattingFn(t);
    "INPUT" === this.el.tagName ? this.el.value = i : "text" === this.el.tagName || "tspan" === this.el.tagName ? this.el.textContent = i : this.el.innerHTML = i;
  }, t.prototype.ensureNumber = function (t) {
    return "number" == typeof t && !isNaN(t);
  }, t.prototype.validateValue = function (t) {
    var i = Number(t);
    return this.ensureNumber(i) ? i : (this.error = "[CountUp] invalid start or end value: " + t, null);
  }, t.prototype.resetDuration = function () {
    this.startTime = null, this.duration = 1e3 * Number(this.options.duration), this.remaining = this.duration;
  }, t;
}();

exports.CountUp = CountUp;
},{}],"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"scss/main.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./..\\img\\banner\\banner1.jpg":[["banner1.e4462969.jpg","img/banner/banner1.jpg"],"img/banner/banner1.jpg"],"./..\\img\\service-bg.jpg":[["service-bg.9bf543dc.jpg","img/service-bg.jpg"],"img/service-bg.jpg"],"./..\\img\\case.jpg":[["case.65512320.jpg","img/case.jpg"],"img/case.jpg"],"./..\\img\\team\\bg-team.jpg":[["bg-team.c004f2f3.jpg","img/team/bg-team.jpg"],"img/team/bg-team.jpg"],"./..\\img\\status.jpg":[["status.28a00101.jpg","img/status.jpg"],"img/status.jpg"],"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"js/index.js":[function(require,module,exports) {
"use strict";

var _countup = require("countup.js");

require("./../scss/main.scss");

////////////////// RECENT-WORK FILTER NAVIGATION  /////////////////
//default
filterWorkSelection("all");
var getFilterNavigations = document.querySelectorAll(".work-filter-nav__item button");

var _loop = function _loop(i) {
  getFilterNavigations[i].addEventListener("click", function () {
    // Apply work-group name to filterWorkSelection() function when click on individual filter navigation button
    filterWorkSelection(getFilterNavigations[i].name); // Add btn-active class to the current contrl button

    var getActiveBtn = document.querySelectorAll(".work-filter-nav__item .btn-active");
    getActiveBtn.length > 0 ? getActiveBtn[0].className = getActiveBtn[0].className.replace("btn-active", "") : "";
    getFilterNavigations[i].classList.add("btn-active");
  });
};

for (var i = 0; i < getFilterNavigations.length; i++) {
  _loop(i);
}

function filterWorkSelection(workGroup) {
  var workGalleryItems = document.querySelectorAll(".gallery-itme");
  var newClassName = "work-visible";
  if (workGroup == "all") workGroup = "";

  for (var _i = 0; _i < workGalleryItems.length; _i++) {
    hideWorkGroup(workGalleryItems[_i], newClassName);
    workGalleryItems[_i].className.indexOf(workGroup) > -1 ? showWorkGroup(workGalleryItems[_i], newClassName) : "";
  }
} // Show filter work-group


function showWorkGroup(workGalleryItem, newClass) {
  //console.log(name)
  var i, arr1, arr2;
  arr1 = workGalleryItem.className.split(" ");
  arr2 = newClass.split(" "); // console.log(arr1)

  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      workGalleryItem.classList.add(arr2[i]);
    }
  }
} // Hide work-group that are not selected


function hideWorkGroup(workGalleryItem, newClass) {
  var i, arr1, arr2;
  arr1 = workGalleryItem.className.split(" ");
  arr2 = newClass.split(" ");

  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }

  workGalleryItem.className = arr1.join(" ");
} /////////////// GALLERY POPUP BOX:: Display individual selected(clicked) gallery item//////////////


var getVisibleWorkGallery = document.querySelectorAll(".recent-work--gallery .work-visible");

var _loop2 = function _loop2(_i2) {
  getVisibleWorkGallery[_i2].addEventListener("click", function () {
    var getPopupContainer = document.getElementById("selected-work-popup-box"); // add visible-popup-box class (for display:block;); initially the box would be display:none;

    getPopupContainer.classList.add("visible-popup-box"); //close the popupBox when click on close icon

    setTimeout(function () {
      var getClosePopupBox = document.querySelector(".close-popup-box");
      getClosePopupBox.addEventListener("click", function () {
        getPopupContainer.className = getPopupContainer.className.replace("visible-popup-box", "");
      });
    }, 1000);

    var image = getVisibleWorkGallery[_i2].getElementsByTagName("img");

    var getImgPath = image[0].src;
    var getPara = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet est dignissim, pellentesque nulla ac, lacinia tellus. Sed eget metus interdum, ultrices mauris ac, dictum nibh. Proin vel interdum nisi, convallis mollis dui. Vivamus vestibulum lectus id nisi accumsan, at rutrum lectus lobortis. Mauris maximus odio elit.";

    var getTitle = getVisibleWorkGallery[_i2].getElementsByClassName("overlay-info--title")[0].innerText;

    var galleryItemDetail = "<div class=\"selected-work\">\n    <button class=\"close-popup-box\">X</button>\n            <div class=\"selected-work__title\">".concat(getTitle, "</div>\n            <div class=\"selected-work__para\">").concat(getPara, "</div>\n            <div class=\"selected-work__image\"><img src=").concat(getImgPath, " alt=\"").concat(getTitle, "\"></div>\n        </div>");
    getPopupContainer.innerHTML = galleryItemDetail;
  });
};

for (var _i2 = 0; _i2 < getVisibleWorkGallery.length; _i2++) {
  _loop2(_i2);
}

; ////////////////// STATUS:: CountUp status number Animation ////////////////////

var createInterval = setInterval(function () {
  var targetElement = document.querySelectorAll(".status-box .status-box__count"); // The status number to display

  var statusNumber = [5235, 25987, 895, 487, 3658];

  for (var _i3 = 0; _i3 < targetElement.length; _i3++) {
    var countUp = new _countup.CountUp(targetElement[_i3], statusNumber[_i3]);
    countUp.start();
  } // Stop interval after mouse scrolled to target element (or #status section in this case)


  targetElement.length > 0 ? clearInterval(createInterval) : "";
}, 10); ///////////////////// TEAM SECTION:: CONTROL DISPLAY TEAM LIST ////////////////////////

var allTeams = document.querySelectorAll(".team");
var getTeamCtrolBtm = document.querySelector(".link-other-team");
var incrementBy = 0;
getTeamCtrolBtm.addEventListener("click", function () {
  incrementBy += 4;
  contrlDisplayTeam(incrementBy);
});

function contrlDisplayTeam(incrementBy) {
  var defaultTeamLength = 4;
  var teamLength = defaultTeamLength + incrementBy > allTeams.length ? allTeams.length : incrementBy ? defaultTeamLength + incrementBy : defaultTeamLength; // hide 'OTHER TEAM MEMBER' button if all teams are display

  teamLength == allTeams.length ? getTeamCtrolBtm.style.display = "none" : "";

  for (var _i4 = 0; _i4 < teamLength; _i4++) {
    // add class team-visible ( for display:flex;)
    allTeams[_i4].classList.add("team-visible");
  }
}

contrlDisplayTeam();
},{"countup.js":"../node_modules/countup.js/dist/countUp.min.js","./../scss/main.scss":"scss/main.scss"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62832" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/index.js"], null)
//# sourceMappingURL=/js.00a46daa.js.map