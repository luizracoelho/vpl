"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/models",{

/***/ "./src/hooks/brand/use-find-brand.ts":
/*!*******************************************!*\
  !*** ./src/hooks/brand/use-find-brand.ts ***!
  \*******************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _services_brands_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/brands-service */ \"./src/services/brands-service.ts\");\n\nconst useFindBrand = ()=>{\n    return async (id)=>{\n        try {\n            return await _services_brands_service__WEBPACK_IMPORTED_MODULE_0__[\"default\"].instance.find(id);\n        } catch (error) {\n            return undefined;\n        }\n    };\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (useFindBrand);\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaG9va3MvYnJhbmQvdXNlLWZpbmQtYnJhbmQudHMiLCJtYXBwaW5ncyI6Ijs7QUFDMEQ7QUFFMUQsTUFBTUMsZUFBZTtJQUNqQixPQUFPLE9BQU9DO1FBQ1YsSUFBSTtZQUNBLE9BQU8sTUFBTUYseUVBQXNCLENBQUNJLElBQUksQ0FBQ0Y7UUFDN0MsRUFBRSxPQUFPRyxPQUFPO1lBQ1osT0FBT0M7UUFDWDtJQUNKO0FBQ0o7QUFFQSwrREFBZUwsWUFBWUEsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvaG9va3MvYnJhbmQvdXNlLWZpbmQtYnJhbmQudHM/ZWEzNCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCcmFuZCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvYnJhbmRcIjtcbmltcG9ydCBCcmFuZHNTZXJ2aWNlIGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9icmFuZHMtc2VydmljZVwiO1xuXG5jb25zdCB1c2VGaW5kQnJhbmQgPSAoKSA9PiB7XG4gICAgcmV0dXJuIGFzeW5jIChpZDogbnVtYmVyKTogUHJvbWlzZTxCcmFuZCB8IHVuZGVmaW5lZD4gPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IEJyYW5kc1NlcnZpY2UuaW5zdGFuY2UuZmluZChpZCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHVzZUZpbmRCcmFuZDsiXSwibmFtZXMiOlsiQnJhbmRzU2VydmljZSIsInVzZUZpbmRCcmFuZCIsImlkIiwiaW5zdGFuY2UiLCJmaW5kIiwiZXJyb3IiLCJ1bmRlZmluZWQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/hooks/brand/use-find-brand.ts\n"));

/***/ })

});