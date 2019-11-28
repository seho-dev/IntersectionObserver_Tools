(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["observertools"] = factory();
	else
		root["observertools"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return observerTools; });\n/**\r\n * \r\n * 入口js函数\r\n * \r\n */\nconst LAZY_LOAD_ATTRIBUTE = \"data-observerLazyLoad\";\n/**\r\n * \r\n * @param {*} $type 判断使用哪种工具\r\n * @param {*} callback 监听回调\r\n * @param {*} target 监听目标元素\r\n * @param {*} $option 自定义配置参数\r\n */\n\nfunction observerTools($type = \"lazyLoad\", target, $option, callback) {\n  // 创建触底对象\n  let onBottom = null; // 创建observer对象\n\n  let observe = new IntersectionObserver(entries => {\n    // 判断type传参\n    switch ($type) {\n      case \"lazyLoad\":\n        // 判断元素和指定视口是否发生交叉，如果发生交叉\n        entries.forEach((entriesChild, index) => {\n          if (entriesChild.isIntersecting) {\n            console.log(\"asssss\"); // 取出监听元素的自定义属性\n\n            entriesChild.target.src = entriesChild.target.getAttribute(LAZY_LOAD_ATTRIBUTE); // 移除监听的元素\n\n            observe.unobserve(entriesChild.target);\n          } else {\n            // 把默认的图片放在src中\n            entriesChild.target.src = $option.lazyLoading;\n          }\n        });\n        break;\n\n      case \"onBottom\":\n        // 如果末尾元素进入视口，则触底\n        if (entries[0].isIntersecting) {\n          return callback(entries[0]);\n        }\n\n        break;\n\n      case \"onTop\":\n        // 判断交叉\n        if (entries[0].boundingClientRect.top < 0) {\n          // 添加class类名\n          target[0].classList.add(\"observer_onTop\");\n          return callback(entries[0]);\n        } else {\n          target[0].classList.remove(\"observer_onTop\");\n        }\n\n        break;\n\n      case \"listAnimation\":\n        entries.forEach(element => {\n          if (element.isIntersecting) {\n            // 预定义动画, 直接把值拿出直接添加对应的class\n            element.target.style.animationDuration = `${$option.animationDuration}s`; // 设置元素的动画时间\n\n            element.target.style.animationTimingFunction = `${$option.animationTimingFunction}`; // 设置元素的动画曲线类型\n\n            element.target.style.animationDelay = `${$option.animationDelay}s`; // 设置元素的动画延迟\n\n            element.target.classList.add(`observe-animation-${$option.animation}`); // 自定义动画\n\n            return callback(element);\n          }\n        });\n    }\n  }, $option); // 如果type是onBottom\n\n  switch ($type) {\n    case \"lazyLoad\":\n      // 判断目标元素是否存在, 如果是元素数组，就循环监听\n      target.forEach(element => {\n        let checkResult = isElement(element);\n\n        if (checkResult) {\n          observe.observe(element); // 监听元素\n        }\n      });\n      break;\n\n    case \"onBottom\":\n      // 在末尾追加一个标识符\n      onBottom = document.createElement(\"div\"); // 给目标元素末尾添加标识符div\n\n      onBottom.classList.add(\"observe_bottom_main\");\n      target[0].appendChild(onBottom);\n      observe.observe(onBottom);\n      break;\n\n    case \"onTop\":\n      // 创建一个div在吸顶元素之上\n      let reference = document.createElement(\"div\");\n      reference.classList.add(\"observe_top_main\");\n      $option.root.insertBefore(reference, target[0]); // 监听目标元素\n\n      observe.observe(reference);\n\n    case \"listAnimation\":\n      target.forEach(element => {\n        observe.observe(element);\n      });\n  }\n} // 判断目标元素是否是element，不同浏览器类型都不一样\n\nfunction isElement(obj) {\n  return typeof HTMLElement === 'object' ? obj instanceof HTMLElement : !!(obj && typeof obj === 'object' && (obj.nodeType === 1 || obj.nodeType === 9) && typeof obj.nodeName === 'string');\n}\n\n//# sourceURL=webpack://%5Bname%5D/./main.js?");

/***/ })

/******/ });
});