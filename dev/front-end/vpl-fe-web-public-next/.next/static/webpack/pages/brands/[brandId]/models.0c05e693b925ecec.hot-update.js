"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/brands/[brandId]/models",{

/***/ "./pages/brands/[brandId]/models/index.tsx":
/*!*************************************************!*\
  !*** ./pages/brands/[brandId]/models/index.tsx ***!
  \*************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   __N_SSP: function() { return /* binding */ __N_SSP; }\n/* harmony export */ });\n/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../models */ \"./pages/models/index.tsx\");\n\nvar __N_SSP = true;\n/* harmony default export */ __webpack_exports__[\"default\"] = (_models__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9icmFuZHMvW2JyYW5kSWRdL21vZGVscy9pbmRleC50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7QUFFeUM7O0FBc0J6QywrREFBZUEsK0NBQVVBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vcGFnZXMvYnJhbmRzL1ticmFuZElkXS9tb2RlbHMvaW5kZXgudHN4PzZiMzgiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHVzZUZpbmRCcmFuZCBmcm9tIFwiLi4vLi4vLi4vLi4vc3JjL2hvb2tzL2JyYW5kL3VzZS1maW5kLWJyYW5kXCI7XG5pbXBvcnQgdXNlTGlzdE1vZGVsc0J5QnJhbmRJZCBmcm9tIFwiLi4vLi4vLi4vLi4vc3JjL2hvb2tzL21vZGVsL3VzZS1saXN0LW1vZGVscy1ieS1icmFuZC1pZFwiO1xuaW1wb3J0IE1vZGVsc1BhZ2UgZnJvbSBcIi4uLy4uLy4uL21vZGVsc1wiO1xuXG5leHBvcnQgY29uc3QgZ2V0U2VydmVyU2lkZVByb3BzID0gYXN5bmMgKHsgcGFyYW1zIH0pID0+IHtcbiAgICBpZiAoIXBhcmFtcz8uYnJhbmRJZClcbiAgICAgICAgcmV0dXJuIHsgcmVkaXJlY3Q6ICcvbm90LWZvdW5kJyB9O1xuXG4gICAgY29uc3QgbGlzdE1vZGVsc0J5QnJhbmRJZCA9IHVzZUxpc3RNb2RlbHNCeUJyYW5kSWQoKTtcbiAgICBjb25zdCBmaW5kQnJhbmQgPSB1c2VGaW5kQnJhbmQoKTtcblxuICAgIGNvbnN0IGJyYW5kUmVzdWx0ID0gYXdhaXQgZmluZEJyYW5kKHBhcmFtcy5icmFuZElkKTtcblxuY29uc29sZS5sb2coYnJhbmRSZXN1bHQpO1xuXG5cbiAgICBpZiAoIWJyYW5kUmVzdWx0KVxuICAgICAgICByZXR1cm4geyByZWRpcmVjdDogJy9ub3QtZm91bmQnIH07XG5cbiAgICBjb25zdCBtb2RlbHNSZXN1bHQgPSBhd2FpdCBsaXN0TW9kZWxzQnlCcmFuZElkKHBhcmFtcy5icmFuZElkKTtcblxuICAgIHJldHVybiB7IHByb3BzOiB7IG1vZGVsc1Jlc3VsdCwgYnJhbmRSZXN1bHQgfSB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBNb2RlbHNQYWdlOyJdLCJuYW1lcyI6WyJNb2RlbHNQYWdlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/brands/[brandId]/models/index.tsx\n"));

/***/ })

});