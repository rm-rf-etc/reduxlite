!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.SimpleSharedState=e():t.SimpleSharedState=e()}(Function("return this")(),(function(){return function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(){return(o=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t}).apply(this,arguments)}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}n.r(e);var u=Object.getPrototypeOf({}),c=Array.isArray,f=function t(){var e=this,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;i(this,t);var c=o({},n),f=!1,a=new Map,p=new Map,h=new Set;if(this.watch=function(t,e){if("function"!=typeof t||"function"!=typeof e)throw new Error("selector and handler must be functions");if(a.has(t))throw new Error("Cannot reuse selector");var n;try{n=t(c)}catch(t){}return a.set(t,e),p.set(t,n),function(){a.delete(t),p.delete(t)}},this.watchBatch=function(t,n){if(!t||"function"!=typeof t.forEach)throw new Error("selectors must be a list of functions");if("function"!=typeof n)throw new Error("handler is not a function");var r=[],o=0,i=!1;t.forEach((function(n){if("function"!=typeof n)throw t.forEach((function(t){return a.delete(t)})),new Error("selector must be a function");var u=o++;try{r[u]=n(c)}catch(t){r[u]=void 0}e.watch(n,(function(t){r[u]=t,i=!0}))}));var u=function(){i&&(n(r.map(d)),i=!1)};return h.add(u),n(r.map(d)),function(){h.delete(u),t.forEach((function(t){return a.delete(t)}))}},this.watchDispatch=function(t){if("function"!=typeof t)throw new Error("handler must be a function");return h.add(t),function(){return h.delete(t)}},this.dispatch=function(t){if(f)throw new Error("can't dispatch while dispatching");if(!t||Object.getPrototypeOf(t)!==u)throw new Error("dispatch expects plain object");f=!0,s(c,t),a.forEach((function(e,n){var r=l;try{if(r=n(t),n(c),void 0===r)return}catch(t){r=void 0}var o=p.get(n);if(r!==l&&r!==o){var i=s(o,r);p.set(n,i),e(i)}})),f=!1,h.forEach((function(t){return t()}))},this.getState=function(){return o({},c)},r&&"function"==typeof r){var y=r((function(t){return t}));this.watch((function(t){return t}),y.dispatch)}},a=new Number,l=new Number,s=function t(e,n){return e&&n&&"object"===r(e)?(Object.keys(n).forEach((function(r){n[r]===a?delete e[r]:e[r]=t(e[r],n[r])})),e):n},p=function(t,e){var n=[];return n[t]=e,n};function d(t){return t&&"object"===r(t)?o(c(t)?[]:{},t):t}n.d(e,"createStore",(function(){return h})),n.d(e,"partialArray",(function(){return p})),n.d(e,"simpleMerge",(function(){return s})),n.d(e,"deleted",(function(){return a}));var h=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;return new f(t,e)}}])}));