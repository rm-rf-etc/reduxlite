!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.SimpleSharedState=e():t.SimpleSharedState=e()}(Function("return this")(),(function(){return function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";n.r(e);const r=Object.getPrototypeOf({});class o{constructor(t={},e=null){let n={...t},o=!1;const c=new Map,u=new Map,f=new Set;if(this.watch=(t,e)=>{if("function"!=typeof t||"function"!=typeof e)throw new Error("selector and handler must be functions");if(c.has(t))throw new Error("Cannot reuse selector");let r;try{r=t(n)}catch(t){}return c.set(t,e),u.set(t,r),r},this.afterDispatch=t=>{"function"==typeof t&&f.add(t)},this.unwatch=t=>{c.delete(t)},this.dispatch=t=>{if(o)throw new Error("can't dispatch while dispatching");if(!t||Object.getPrototypeOf(t)!==r)throw new Error("dispatch expects plain object");o=!0,c.forEach((e,n)=>{let r;try{r=n(t)}catch(t){return}const o=u.get(n);i(o,r),e(o)}),i(n,t),o=!1,f.forEach(t=>t())},this.getState=()=>Object.assign({},n),e&&"function"==typeof e){const t=e(t=>t);this.watch(t=>t,t.dispatch)}}}const c=new Number(0),i=(t,e)=>t&&e&&"object"==typeof t?(Object.keys(e).forEach(n=>{e[n]===c?delete t[n]:t[n]=i(t[n],e[n])}),t):e,u=(t,e)=>{const n=[];return n[t]=e,n};n.d(e,"createStore",(function(){return f})),n.d(e,"partialArray",(function(){return u})),n.d(e,"simpleMerge",(function(){return i})),n.d(e,"deleted",(function(){return c}));const f=(t={},e=null)=>new o(t,e)}])}));