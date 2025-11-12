"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./pages/_app.tsx":
/*!************************!*\
  !*** ./pages/_app.tsx ***!
  \************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var wagmi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! wagmi */ \"wagmi\");\n/* harmony import */ var wagmi_chains__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! wagmi/chains */ \"wagmi/chains\");\n/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @tanstack/react-query */ \"@tanstack/react-query\");\n/* harmony import */ var _config_settings_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../config/settings.json */ \"../config/settings.json\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _wagmi_connectors__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wagmi/connectors */ \"@wagmi/connectors\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([wagmi__WEBPACK_IMPORTED_MODULE_1__, wagmi_chains__WEBPACK_IMPORTED_MODULE_2__, _tanstack_react_query__WEBPACK_IMPORTED_MODULE_3__, _wagmi_connectors__WEBPACK_IMPORTED_MODULE_6__]);\n([wagmi__WEBPACK_IMPORTED_MODULE_1__, wagmi_chains__WEBPACK_IMPORTED_MODULE_2__, _tanstack_react_query__WEBPACK_IMPORTED_MODULE_3__, _wagmi_connectors__WEBPACK_IMPORTED_MODULE_6__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\n\n\n// --- HİDRASYON DÜZELTMESİ (useEffect/useState) ---\n\n// --- REACT NATIVE HATA DÜZELTMESİ (connectors) ---\n// Sadece web bağlayıcılarını import et\n\nconst targetChain = _config_settings_json__WEBPACK_IMPORTED_MODULE_4__.targetChainId === 8453 ? wagmi_chains__WEBPACK_IMPORTED_MODULE_2__.base : wagmi_chains__WEBPACK_IMPORTED_MODULE_2__.baseSepolia;\n// WalletConnect'in çalışması için https://cloud.walletconnect.com/ adresinden\n// ücretsiz bir 'projectId' alıp buraya yapıştırmalısın.\nconst projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID || \"\";\nif (!projectId) {\n    console.warn(\"WalletConnect Project ID eksik. QR Kod bağlantısı \\xe7alışmayabilir. L\\xfctfen .env.local dosyasına NEXT_PUBLIC_WC_PROJECT_ID ekleyin.\");\n}\nconst config = (0,wagmi__WEBPACK_IMPORTED_MODULE_1__.createConfig)({\n    chains: [\n        targetChain\n    ],\n    // 'connectors' dizisini ekleyerek wagmi'ye sadece bunları kullanmasını söylüyoruz\n    connectors: [\n        (0,_wagmi_connectors__WEBPACK_IMPORTED_MODULE_6__.injected)(),\n        (0,_wagmi_connectors__WEBPACK_IMPORTED_MODULE_6__.walletConnect)({\n            projectId,\n            showQrModal: true,\n            qrModalOptions: {\n                themeMode: \"light\"\n            }\n        })\n    ],\n    transports: {\n        [targetChain.id]: (0,wagmi__WEBPACK_IMPORTED_MODULE_1__.http)()\n    }\n});\nconst queryClient = new _tanstack_react_query__WEBPACK_IMPORTED_MODULE_3__.QueryClient();\nfunction MyApp({ Component, pageProps }) {\n    // --- HİDRASYON DÜZELTMESİ (isClient state'i) ---\n    const [isClient, setIsClient] = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)(false);\n    (0,react__WEBPACK_IMPORTED_MODULE_5__.useEffect)(()=>{\n        // Component mount olduğunda (yani sadece tarayıcıda)\n        // state'i true yap.\n        setIsClient(true);\n    }, []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: isClient ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(wagmi__WEBPACK_IMPORTED_MODULE_1__.WagmiProvider, {\n            config: config,\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_tanstack_react_query__WEBPACK_IMPORTED_MODULE_3__.QueryClientProvider, {\n                client: queryClient,\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                    ...pageProps\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\sukru.kucuk\\\\Desktop\\\\REP-X\\\\frontend\\\\pages\\\\_app.tsx\",\n                    lineNumber: 52,\n                    columnNumber: 13\n                }, this)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\sukru.kucuk\\\\Desktop\\\\REP-X\\\\frontend\\\\pages\\\\_app.tsx\",\n                lineNumber: 51,\n                columnNumber: 11\n            }, this)\n        }, void 0, false, {\n            fileName: \"C:\\\\Users\\\\sukru.kucuk\\\\Desktop\\\\REP-X\\\\frontend\\\\pages\\\\_app.tsx\",\n            lineNumber: 50,\n            columnNumber: 9\n        }, this) : null // Sunucuda hiçbir şey render etme\n    }, void 0, false);\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUMwRDtBQUNUO0FBQ3dCO0FBQ3ZCO0FBRWxELG9EQUFvRDtBQUNSO0FBRTVDLG9EQUFvRDtBQUNwRCx1Q0FBdUM7QUFDcUI7QUFFNUQsTUFBTVksY0FBY0wsZ0VBQXNCLEtBQUssT0FBT0osOENBQUlBLEdBQUdDLHFEQUFXQTtBQUN4RSw4RUFBOEU7QUFDOUUsd0RBQXdEO0FBQ3hELE1BQU1VLFlBQVlDLFFBQVFDLEdBQUcsQ0FBQ0MseUJBQXlCLElBQUk7QUFFM0QsSUFBSSxDQUFDSCxXQUFXO0lBQ2RJLFFBQVFDLElBQUksQ0FBQztBQUNmO0FBRUEsTUFBTUMsU0FBU25CLG1EQUFZQSxDQUFDO0lBQzFCb0IsUUFBUTtRQUFDVDtLQUFZO0lBQ3JCLGtGQUFrRjtJQUNsRlUsWUFBWTtRQUNWWiwyREFBUUE7UUFDUkMsZ0VBQWFBLENBQUM7WUFBRUc7WUFBV1MsYUFBYTtZQUFNQyxnQkFBZ0I7Z0JBQUVDLFdBQVc7WUFBUTtRQUFFO0tBQ3RGO0lBQ0RDLFlBQVk7UUFDVixDQUFDZCxZQUFZZSxFQUFFLENBQUMsRUFBRXpCLDJDQUFJQTtJQUN4QjtBQUNGO0FBRUEsTUFBTTBCLGNBQWMsSUFBSXZCLDhEQUFXQTtBQUVuQyxTQUFTd0IsTUFBTSxFQUFFQyxTQUFTLEVBQUVDLFNBQVMsRUFBWTtJQUMvQyxrREFBa0Q7SUFDbEQsTUFBTSxDQUFDQyxVQUFVQyxZQUFZLEdBQUd6QiwrQ0FBUUEsQ0FBQztJQUN6Q0MsZ0RBQVNBLENBQUM7UUFDUixxREFBcUQ7UUFDckQsb0JBQW9CO1FBQ3BCd0IsWUFBWTtJQUNkLEdBQUcsRUFBRTtJQUVMLHFCQUNFO2tCQUVHRCx5QkFDQyw4REFBQ2hDLGdEQUFhQTtZQUFDb0IsUUFBUUE7c0JBQ3JCLDRFQUFDZCxzRUFBbUJBO2dCQUFDNEIsUUFBUU47MEJBQzNCLDRFQUFDRTtvQkFBVyxHQUFHQyxTQUFTOzs7Ozs7Ozs7Ozs7Ozs7bUJBSTVCLEtBQUssa0NBQWtDOztBQUkvQztBQUVBLGlFQUFlRixLQUFLQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vcGFnZXMvX2FwcC50c3g/MmZiZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IEFwcFByb3BzIH0gZnJvbSAnbmV4dC9hcHAnO1xyXG5pbXBvcnQgeyBXYWdtaVByb3ZpZGVyLCBjcmVhdGVDb25maWcsIGh0dHAgfSBmcm9tICd3YWdtaSc7XHJcbmltcG9ydCB7IGJhc2UsIGJhc2VTZXBvbGlhIH0gZnJvbSAnd2FnbWkvY2hhaW5zJztcclxuaW1wb3J0IHsgUXVlcnlDbGllbnQsIFF1ZXJ5Q2xpZW50UHJvdmlkZXIgfSBmcm9tICdAdGFuc3RhY2svcmVhY3QtcXVlcnknO1xyXG5pbXBvcnQgc2V0dGluZ3MgZnJvbSAnLi4vLi4vY29uZmlnL3NldHRpbmdzLmpzb24nO1xyXG5cclxuLy8gLS0tIEjEsERSQVNZT04gRMOcWkVMVE1FU8SwICh1c2VFZmZlY3QvdXNlU3RhdGUpIC0tLVxyXG5pbXBvcnQgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xyXG5cclxuLy8gLS0tIFJFQUNUIE5BVElWRSBIQVRBIETDnFpFTFRNRVPEsCAoY29ubmVjdG9ycykgLS0tXHJcbi8vIFNhZGVjZSB3ZWIgYmHEn2xhecSxY8SxbGFyxLFuxLEgaW1wb3J0IGV0XHJcbmltcG9ydCB7IGluamVjdGVkLCB3YWxsZXRDb25uZWN0IH0gZnJvbSAnQHdhZ21pL2Nvbm5lY3RvcnMnO1xyXG5cclxuY29uc3QgdGFyZ2V0Q2hhaW4gPSBzZXR0aW5ncy50YXJnZXRDaGFpbklkID09PSA4NDUzID8gYmFzZSA6IGJhc2VTZXBvbGlhO1xyXG4vLyBXYWxsZXRDb25uZWN0J2luIMOnYWzEscWfbWFzxLEgacOnaW4gaHR0cHM6Ly9jbG91ZC53YWxsZXRjb25uZWN0LmNvbS8gYWRyZXNpbmRlblxyXG4vLyDDvGNyZXRzaXogYmlyICdwcm9qZWN0SWQnIGFsxLFwIGJ1cmF5YSB5YXDEscWfdMSxcm1hbMSxc8Sxbi5cclxuY29uc3QgcHJvamVjdElkID0gcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfV0NfUFJPSkVDVF9JRCB8fCBcIlwiOyBcclxuXHJcbmlmICghcHJvamVjdElkKSB7XHJcbiAgY29uc29sZS53YXJuKFwiV2FsbGV0Q29ubmVjdCBQcm9qZWN0IElEIGVrc2lrLiBRUiBLb2QgYmHEn2xhbnTEsXPEsSDDp2FsxLHFn21heWFiaWxpci4gTMO8dGZlbiAuZW52LmxvY2FsIGRvc3lhc8SxbmEgTkVYVF9QVUJMSUNfV0NfUFJPSkVDVF9JRCBla2xleWluLlwiKTtcclxufVxyXG5cclxuY29uc3QgY29uZmlnID0gY3JlYXRlQ29uZmlnKHtcclxuICBjaGFpbnM6IFt0YXJnZXRDaGFpbl0sXHJcbiAgLy8gJ2Nvbm5lY3RvcnMnIGRpemlzaW5pIGVrbGV5ZXJlayB3YWdtaSd5ZSBzYWRlY2UgYnVubGFyxLEga3VsbGFubWFzxLFuxLEgc8O2eWzDvHlvcnV6XHJcbiAgY29ubmVjdG9yczogW1xyXG4gICAgaW5qZWN0ZWQoKSwgLy8gTWV0YU1hc2ssIEJyYXZlLCB2Yi4gdGFyYXnEsWPEsSBjw7x6ZGFubGFyxLFcclxuICAgIHdhbGxldENvbm5lY3QoeyBwcm9qZWN0SWQsIHNob3dRck1vZGFsOiB0cnVlLCBxck1vZGFsT3B0aW9uczogeyB0aGVtZU1vZGU6IFwibGlnaHRcIiB9IH0pLFxyXG4gIF0sXHJcbiAgdHJhbnNwb3J0czoge1xyXG4gICAgW3RhcmdldENoYWluLmlkXTogaHR0cCgpLFxyXG4gIH0sXHJcbn0pO1xyXG5cclxuY29uc3QgcXVlcnlDbGllbnQgPSBuZXcgUXVlcnlDbGllbnQoKTtcclxuXHJcbmZ1bmN0aW9uIE15QXBwKHsgQ29tcG9uZW50LCBwYWdlUHJvcHMgfTogQXBwUHJvcHMpIHtcclxuICAvLyAtLS0gSMSwRFJBU1lPTiBEw5xaRUxUTUVTxLAgKGlzQ2xpZW50IHN0YXRlJ2kpIC0tLVxyXG4gIGNvbnN0IFtpc0NsaWVudCwgc2V0SXNDbGllbnRdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAvLyBDb21wb25lbnQgbW91bnQgb2xkdcSfdW5kYSAoeWFuaSBzYWRlY2UgdGFyYXnEsWPEsWRhKVxyXG4gICAgLy8gc3RhdGUnaSB0cnVlIHlhcC5cclxuICAgIHNldElzQ2xpZW50KHRydWUpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDw+XHJcbiAgICAgIHsvKiBTYXlmYXnEsSBTQURFQ0UgdGFyYXnEsWPEsWRhIChpc0NsaWVudCB0cnVlIGlzZSkgcmVuZGVyIGV0ICovfVxyXG4gICAgICB7aXNDbGllbnQgPyAoXHJcbiAgICAgICAgPFdhZ21pUHJvdmlkZXIgY29uZmlnPXtjb25maWd9PlxyXG4gICAgICAgICAgPFF1ZXJ5Q2xpZW50UHJvdmlkZXIgY2xpZW50PXtxdWVyeUNsaWVudH0+XHJcbiAgICAgICAgICAgIDxDb21wb25lbnQgey4uLnBhZ2VQcm9wc30gLz5cclxuICAgICAgICAgIDwvUXVlcnlDbGllbnRQcm92aWRlcj5cclxuICAgICAgICA8L1dhZ21pUHJvdmlkZXI+XHJcbiAgICAgICkgOiAoXHJcbiAgICAgICAgbnVsbCAvLyBTdW51Y3VkYSBoacOnYmlyIMWfZXkgcmVuZGVyIGV0bWVcclxuICAgICAgKX1cclxuICAgIDwvPlxyXG4gICk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE15QXBwOyJdLCJuYW1lcyI6WyJXYWdtaVByb3ZpZGVyIiwiY3JlYXRlQ29uZmlnIiwiaHR0cCIsImJhc2UiLCJiYXNlU2Vwb2xpYSIsIlF1ZXJ5Q2xpZW50IiwiUXVlcnlDbGllbnRQcm92aWRlciIsInNldHRpbmdzIiwidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJpbmplY3RlZCIsIndhbGxldENvbm5lY3QiLCJ0YXJnZXRDaGFpbiIsInRhcmdldENoYWluSWQiLCJwcm9qZWN0SWQiLCJwcm9jZXNzIiwiZW52IiwiTkVYVF9QVUJMSUNfV0NfUFJPSkVDVF9JRCIsImNvbnNvbGUiLCJ3YXJuIiwiY29uZmlnIiwiY2hhaW5zIiwiY29ubmVjdG9ycyIsInNob3dRck1vZGFsIiwicXJNb2RhbE9wdGlvbnMiLCJ0aGVtZU1vZGUiLCJ0cmFuc3BvcnRzIiwiaWQiLCJxdWVyeUNsaWVudCIsIk15QXBwIiwiQ29tcG9uZW50IiwicGFnZVByb3BzIiwiaXNDbGllbnQiLCJzZXRJc0NsaWVudCIsImNsaWVudCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/_app.tsx\n");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "@tanstack/react-query":
/*!****************************************!*\
  !*** external "@tanstack/react-query" ***!
  \****************************************/
/***/ ((module) => {

module.exports = import("@tanstack/react-query");;

/***/ }),

/***/ "@wagmi/connectors":
/*!************************************!*\
  !*** external "@wagmi/connectors" ***!
  \************************************/
/***/ ((module) => {

module.exports = import("@wagmi/connectors");;

/***/ }),

/***/ "wagmi":
/*!************************!*\
  !*** external "wagmi" ***!
  \************************/
/***/ ((module) => {

module.exports = import("wagmi");;

/***/ }),

/***/ "wagmi/chains":
/*!*******************************!*\
  !*** external "wagmi/chains" ***!
  \*******************************/
/***/ ((module) => {

module.exports = import("wagmi/chains");;

/***/ }),

/***/ "../config/settings.json":
/*!*******************************!*\
  !*** ../config/settings.json ***!
  \*******************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"targetChainId":84532,"baseFeeEth":"0.001","minScoreForVerification":70,"feeReceiver":"0x0a55983b15c4d75c5d65629326c0dc26a94f418a","oracleApiUrl":"http://localhost:3001","proofWeights":{"recoveryTransfer":40,"transactionConsistency":30,"walletAge":10,"protocolInteractions":20},"oldWalletInactivityPeriodHours":72,"recoveryTransferMaxTimeHours":48,"maxTransactionsToFetch":5000}');

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/_app.tsx"));
module.exports = __webpack_exports__;

})();