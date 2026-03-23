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
exports.id = "app/api/admin/appointments/route";
exports.ids = ["app/api/admin/appointments/route"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "../../client/components/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fadmin%2Fappointments%2Froute&page=%2Fapi%2Fadmin%2Fappointments%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fappointments%2Froute.ts&appDir=C%3A%5CUsers%5Cnicoc%5Cproyectos%5Csalon-booking%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cnicoc%5Cproyectos%5Csalon-booking&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fadmin%2Fappointments%2Froute&page=%2Fapi%2Fadmin%2Fappointments%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fappointments%2Froute.ts&appDir=C%3A%5CUsers%5Cnicoc%5Cproyectos%5Csalon-booking%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cnicoc%5Cproyectos%5Csalon-booking&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_nicoc_proyectos_salon_booking_app_api_admin_appointments_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/admin/appointments/route.ts */ \"(rsc)/./app/api/admin/appointments/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/admin/appointments/route\",\n        pathname: \"/api/admin/appointments\",\n        filename: \"route\",\n        bundlePath: \"app/api/admin/appointments/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\nicoc\\\\proyectos\\\\salon-booking\\\\app\\\\api\\\\admin\\\\appointments\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_nicoc_proyectos_salon_booking_app_api_admin_appointments_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/admin/appointments/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZhZG1pbiUyRmFwcG9pbnRtZW50cyUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGYWRtaW4lMkZhcHBvaW50bWVudHMlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZhZG1pbiUyRmFwcG9pbnRtZW50cyUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNuaWNvYyU1Q3Byb3llY3RvcyU1Q3NhbG9uLWJvb2tpbmclNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUMlM0ElNUNVc2VycyU1Q25pY29jJTVDcHJveWVjdG9zJTVDc2Fsb24tYm9va2luZyZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQXNHO0FBQ3ZDO0FBQ2M7QUFDbUM7QUFDaEg7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdIQUFtQjtBQUMzQztBQUNBLGNBQWMseUVBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxpRUFBaUU7QUFDekU7QUFDQTtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUN1SDs7QUFFdkgiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zYWxvbi1ib29raW5nLz82YzEwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkM6XFxcXFVzZXJzXFxcXG5pY29jXFxcXHByb3llY3Rvc1xcXFxzYWxvbi1ib29raW5nXFxcXGFwcFxcXFxhcGlcXFxcYWRtaW5cXFxcYXBwb2ludG1lbnRzXFxcXHJvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9hZG1pbi9hcHBvaW50bWVudHMvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9hZG1pbi9hcHBvaW50bWVudHNcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2FkbWluL2FwcG9pbnRtZW50cy9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkM6XFxcXFVzZXJzXFxcXG5pY29jXFxcXHByb3llY3Rvc1xcXFxzYWxvbi1ib29raW5nXFxcXGFwcFxcXFxhcGlcXFxcYWRtaW5cXFxcYXBwb2ludG1lbnRzXFxcXHJvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuY29uc3Qgb3JpZ2luYWxQYXRobmFtZSA9IFwiL2FwaS9hZG1pbi9hcHBvaW50bWVudHMvcm91dGVcIjtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgc2VydmVySG9va3MsXG4gICAgICAgIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgb3JpZ2luYWxQYXRobmFtZSwgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fadmin%2Fappointments%2Froute&page=%2Fapi%2Fadmin%2Fappointments%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fappointments%2Froute.ts&appDir=C%3A%5CUsers%5Cnicoc%5Cproyectos%5Csalon-booking%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cnicoc%5Cproyectos%5Csalon-booking&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/admin/appointments/route.ts":
/*!*********************************************!*\
  !*** ./app/api/admin/appointments/route.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/db */ \"(rsc)/./lib/db.ts\");\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./lib/auth.ts\");\n/* harmony import */ var _barrel_optimize_names_endOfDay_startOfDay_date_fns__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! __barrel_optimize__?names=endOfDay,startOfDay!=!date-fns */ \"(rsc)/./node_modules/date-fns/startOfDay.js\");\n/* harmony import */ var _barrel_optimize_names_endOfDay_startOfDay_date_fns__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! __barrel_optimize__?names=endOfDay,startOfDay!=!date-fns */ \"(rsc)/./node_modules/date-fns/endOfDay.js\");\n\n\n\n\nasync function GET(request) {\n    const session = await (0,_lib_auth__WEBPACK_IMPORTED_MODULE_2__.getAuthSession)();\n    if (!session) return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n        error: \"No autorizado\"\n    }, {\n        status: 401\n    });\n    const { searchParams } = new URL(request.url);\n    const dateStr = searchParams.get(\"date\");\n    const stylistId = searchParams.get(\"stylistId\");\n    if (!dateStr) return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n        error: \"Falta la fecha\"\n    }, {\n        status: 400\n    });\n    // Need to parse avoiding timezone shifts. The dateStr is \"YYYY-MM-DD\".\n    // Using new Date() directly parses \"YYYY-MM-DD\" as UTC midnight, which translates exactly\n    // back to \"YYYY-MM-DD\" in local time if we use startOfDay/endOfDay. Wait, not always.\n    // We'll parse the date by splitting and treating as local.\n    const [year, month, day] = dateStr.split(\"-\").map(Number);\n    const date = new Date(year, month - 1, day);\n    if (isNaN(date.getTime())) return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n        error: \"Fecha inv\\xe1lida\"\n    }, {\n        status: 400\n    });\n    const start = (0,_barrel_optimize_names_endOfDay_startOfDay_date_fns__WEBPACK_IMPORTED_MODULE_3__.startOfDay)(date);\n    const end = (0,_barrel_optimize_names_endOfDay_startOfDay_date_fns__WEBPACK_IMPORTED_MODULE_4__.endOfDay)(date);\n    const appointments = await _lib_db__WEBPACK_IMPORTED_MODULE_1__[\"default\"].appointment.findMany({\n        where: {\n            date: {\n                gte: start,\n                lte: end\n            },\n            ...stylistId && stylistId !== \"all\" ? {\n                stylistId\n            } : {}\n        },\n        include: {\n            service: true,\n            stylist: true\n        },\n        orderBy: {\n            date: \"asc\"\n        }\n    });\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(appointments);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2FkbWluL2FwcG9pbnRtZW50cy9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBdUQ7QUFDMUI7QUFDYztBQUNJO0FBRXhDLGVBQWVLLElBQUlDLE9BQW9CO0lBQzVDLE1BQU1DLFVBQVUsTUFBTUwseURBQWNBO0lBQ3BDLElBQUksQ0FBQ0ssU0FBUyxPQUFPUCxxREFBWUEsQ0FBQ1EsSUFBSSxDQUFDO1FBQUVDLE9BQU87SUFBZ0IsR0FBRztRQUFFQyxRQUFRO0lBQUk7SUFFakYsTUFBTSxFQUFFQyxZQUFZLEVBQUUsR0FBRyxJQUFJQyxJQUFJTixRQUFRTyxHQUFHO0lBQzVDLE1BQU1DLFVBQVVILGFBQWFJLEdBQUcsQ0FBQztJQUNqQyxNQUFNQyxZQUFZTCxhQUFhSSxHQUFHLENBQUM7SUFFbkMsSUFBSSxDQUFDRCxTQUFTLE9BQU9kLHFEQUFZQSxDQUFDUSxJQUFJLENBQUM7UUFBRUMsT0FBTztJQUFpQixHQUFHO1FBQUVDLFFBQVE7SUFBSTtJQUVsRix1RUFBdUU7SUFDdkUsMEZBQTBGO0lBQzFGLHNGQUFzRjtJQUN0RiwyREFBMkQ7SUFDM0QsTUFBTSxDQUFDTyxNQUFNQyxPQUFPQyxJQUFJLEdBQUdMLFFBQVFNLEtBQUssQ0FBQyxLQUFLQyxHQUFHLENBQUNDO0lBQ2xELE1BQU1DLE9BQU8sSUFBSUMsS0FBS1AsTUFBTUMsUUFBUSxHQUFHQztJQUV2QyxJQUFJTSxNQUFNRixLQUFLRyxPQUFPLEtBQUssT0FBTzFCLHFEQUFZQSxDQUFDUSxJQUFJLENBQUM7UUFBRUMsT0FBTztJQUFpQixHQUFHO1FBQUVDLFFBQVE7SUFBSTtJQUUvRixNQUFNaUIsUUFBUXhCLCtGQUFVQSxDQUFDb0I7SUFDekIsTUFBTUssTUFBTXhCLDZGQUFRQSxDQUFDbUI7SUFFckIsTUFBTU0sZUFBZSxNQUFNNUIsK0NBQU1BLENBQUM2QixXQUFXLENBQUNDLFFBQVEsQ0FBQztRQUNyREMsT0FBTztZQUNMVCxNQUFNO2dCQUFFVSxLQUFLTjtnQkFBT08sS0FBS047WUFBSTtZQUM3QixHQUFJWixhQUFhQSxjQUFjLFFBQVE7Z0JBQUVBO1lBQVUsSUFBSSxDQUFDLENBQUM7UUFDM0Q7UUFDQW1CLFNBQVM7WUFDUEMsU0FBUztZQUNUQyxTQUFTO1FBQ1g7UUFDQUMsU0FBUztZQUFFZixNQUFNO1FBQU07SUFDekI7SUFFQSxPQUFPdkIscURBQVlBLENBQUNRLElBQUksQ0FBQ3FCO0FBQzNCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2Fsb24tYm9va2luZy8uL2FwcC9hcGkvYWRtaW4vYXBwb2ludG1lbnRzL3JvdXRlLnRzP2I1NTQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlcXVlc3QsIE5leHRSZXNwb25zZSB9IGZyb20gJ25leHQvc2VydmVyJ1xuaW1wb3J0IHByaXNtYSBmcm9tICdAL2xpYi9kYidcbmltcG9ydCB7IGdldEF1dGhTZXNzaW9uIH0gZnJvbSAnQC9saWIvYXV0aCdcbmltcG9ydCB7IHN0YXJ0T2ZEYXksIGVuZE9mRGF5IH0gZnJvbSAnZGF0ZS1mbnMnXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBHRVQocmVxdWVzdDogTmV4dFJlcXVlc3QpIHtcbiAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGdldEF1dGhTZXNzaW9uKClcbiAgaWYgKCFzZXNzaW9uKSByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogJ05vIGF1dG9yaXphZG8nIH0sIHsgc3RhdHVzOiA0MDEgfSlcblxuICBjb25zdCB7IHNlYXJjaFBhcmFtcyB9ID0gbmV3IFVSTChyZXF1ZXN0LnVybClcbiAgY29uc3QgZGF0ZVN0ciA9IHNlYXJjaFBhcmFtcy5nZXQoJ2RhdGUnKVxuICBjb25zdCBzdHlsaXN0SWQgPSBzZWFyY2hQYXJhbXMuZ2V0KCdzdHlsaXN0SWQnKVxuXG4gIGlmICghZGF0ZVN0cikgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6ICdGYWx0YSBsYSBmZWNoYScgfSwgeyBzdGF0dXM6IDQwMCB9KVxuXG4gIC8vIE5lZWQgdG8gcGFyc2UgYXZvaWRpbmcgdGltZXpvbmUgc2hpZnRzLiBUaGUgZGF0ZVN0ciBpcyBcIllZWVktTU0tRERcIi5cbiAgLy8gVXNpbmcgbmV3IERhdGUoKSBkaXJlY3RseSBwYXJzZXMgXCJZWVlZLU1NLUREXCIgYXMgVVRDIG1pZG5pZ2h0LCB3aGljaCB0cmFuc2xhdGVzIGV4YWN0bHlcbiAgLy8gYmFjayB0byBcIllZWVktTU0tRERcIiBpbiBsb2NhbCB0aW1lIGlmIHdlIHVzZSBzdGFydE9mRGF5L2VuZE9mRGF5LiBXYWl0LCBub3QgYWx3YXlzLlxuICAvLyBXZSdsbCBwYXJzZSB0aGUgZGF0ZSBieSBzcGxpdHRpbmcgYW5kIHRyZWF0aW5nIGFzIGxvY2FsLlxuICBjb25zdCBbeWVhciwgbW9udGgsIGRheV0gPSBkYXRlU3RyLnNwbGl0KCctJykubWFwKE51bWJlcilcbiAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKHllYXIsIG1vbnRoIC0gMSwgZGF5KVxuICBcbiAgaWYgKGlzTmFOKGRhdGUuZ2V0VGltZSgpKSkgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6ICdGZWNoYSBpbnbDoWxpZGEnIH0sIHsgc3RhdHVzOiA0MDAgfSlcblxuICBjb25zdCBzdGFydCA9IHN0YXJ0T2ZEYXkoZGF0ZSlcbiAgY29uc3QgZW5kID0gZW5kT2ZEYXkoZGF0ZSlcblxuICBjb25zdCBhcHBvaW50bWVudHMgPSBhd2FpdCBwcmlzbWEuYXBwb2ludG1lbnQuZmluZE1hbnkoe1xuICAgIHdoZXJlOiB7XG4gICAgICBkYXRlOiB7IGd0ZTogc3RhcnQsIGx0ZTogZW5kIH0sXG4gICAgICAuLi4oc3R5bGlzdElkICYmIHN0eWxpc3RJZCAhPT0gJ2FsbCcgPyB7IHN0eWxpc3RJZCB9IDoge30pXG4gICAgfSxcbiAgICBpbmNsdWRlOiB7XG4gICAgICBzZXJ2aWNlOiB0cnVlLFxuICAgICAgc3R5bGlzdDogdHJ1ZVxuICAgIH0sXG4gICAgb3JkZXJCeTogeyBkYXRlOiAnYXNjJyB9XG4gIH0pXG5cbiAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKGFwcG9pbnRtZW50cylcbn1cbiJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJwcmlzbWEiLCJnZXRBdXRoU2Vzc2lvbiIsInN0YXJ0T2ZEYXkiLCJlbmRPZkRheSIsIkdFVCIsInJlcXVlc3QiLCJzZXNzaW9uIiwianNvbiIsImVycm9yIiwic3RhdHVzIiwic2VhcmNoUGFyYW1zIiwiVVJMIiwidXJsIiwiZGF0ZVN0ciIsImdldCIsInN0eWxpc3RJZCIsInllYXIiLCJtb250aCIsImRheSIsInNwbGl0IiwibWFwIiwiTnVtYmVyIiwiZGF0ZSIsIkRhdGUiLCJpc05hTiIsImdldFRpbWUiLCJzdGFydCIsImVuZCIsImFwcG9pbnRtZW50cyIsImFwcG9pbnRtZW50IiwiZmluZE1hbnkiLCJ3aGVyZSIsImd0ZSIsImx0ZSIsImluY2x1ZGUiLCJzZXJ2aWNlIiwic3R5bGlzdCIsIm9yZGVyQnkiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/admin/appointments/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/auth.ts":
/*!*********************!*\
  !*** ./lib/auth.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   authOptions: () => (/* binding */ authOptions),\n/* harmony export */   getAuthSession: () => (/* binding */ getAuthSession)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n\n\nconst authOptions = {\n    providers: [\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n            name: \"Credentials\",\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"email\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials) {\n                if (!credentials?.email || !credentials?.password) return null;\n                const adminEmail = process.env.ADMIN_EMAIL || \"admin@tupeluqueria.com\";\n                const adminPassword = process.env.ADMIN_PASSWORD || \"admin123\";\n                if (credentials.email === adminEmail && credentials.password === adminPassword) {\n                    return {\n                        id: \"1\",\n                        name: \"Admin\",\n                        email: adminEmail\n                    };\n                }\n                return null;\n            }\n        })\n    ],\n    pages: {\n        signIn: \"/login\"\n    },\n    session: {\n        strategy: \"jwt\"\n    },\n    callbacks: {\n        async jwt ({ token, user }) {\n            if (user) {\n                token.id = user.id;\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            if (session.user) {\n                session.user.id = token.id;\n            }\n            return session;\n        }\n    }\n};\nconst getAuthSession = ()=>(0,next_auth__WEBPACK_IMPORTED_MODULE_0__.getServerSession)(authOptions);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvYXV0aC50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUE2RDtBQUNJO0FBRTFELE1BQU1FLGNBQStCO0lBQzFDQyxXQUFXO1FBQ1RGLDJFQUFtQkEsQ0FBQztZQUNsQkcsTUFBTTtZQUNOQyxhQUFhO2dCQUNYQyxPQUFPO29CQUFFQyxPQUFPO29CQUFTQyxNQUFNO2dCQUFRO2dCQUN2Q0MsVUFBVTtvQkFBRUYsT0FBTztvQkFBWUMsTUFBTTtnQkFBVztZQUNsRDtZQUNBLE1BQU1FLFdBQVVMLFdBQVc7Z0JBQ3pCLElBQUksQ0FBQ0EsYUFBYUMsU0FBUyxDQUFDRCxhQUFhSSxVQUFVLE9BQU87Z0JBRTFELE1BQU1FLGFBQWFDLFFBQVFDLEdBQUcsQ0FBQ0MsV0FBVyxJQUFJO2dCQUM5QyxNQUFNQyxnQkFBZ0JILFFBQVFDLEdBQUcsQ0FBQ0csY0FBYyxJQUFJO2dCQUVwRCxJQUFJWCxZQUFZQyxLQUFLLEtBQUtLLGNBQWNOLFlBQVlJLFFBQVEsS0FBS00sZUFBZTtvQkFDOUUsT0FBTzt3QkFBRUUsSUFBSTt3QkFBS2IsTUFBTTt3QkFBU0UsT0FBT0s7b0JBQVc7Z0JBQ3JEO2dCQUVBLE9BQU87WUFDVDtRQUNGO0tBQ0Q7SUFDRE8sT0FBTztRQUNMQyxRQUFRO0lBQ1Y7SUFDQUMsU0FBUztRQUNQQyxVQUFVO0lBQ1o7SUFDQUMsV0FBVztRQUNULE1BQU1DLEtBQUksRUFBRUMsS0FBSyxFQUFFQyxJQUFJLEVBQUU7WUFDdkIsSUFBSUEsTUFBTTtnQkFDUkQsTUFBTVAsRUFBRSxHQUFHUSxLQUFLUixFQUFFO1lBQ3BCO1lBQ0EsT0FBT087UUFDVDtRQUNBLE1BQU1KLFNBQVEsRUFBRUEsT0FBTyxFQUFFSSxLQUFLLEVBQUU7WUFDOUIsSUFBSUosUUFBUUssSUFBSSxFQUFFO2dCQUNmTCxRQUFRSyxJQUFJLENBQVNSLEVBQUUsR0FBR08sTUFBTVAsRUFBRTtZQUNyQztZQUNBLE9BQU9HO1FBQ1Q7SUFDRjtBQUNGLEVBQUM7QUFFTSxNQUFNTSxpQkFBaUIsSUFBTTFCLDJEQUFnQkEsQ0FBQ0UsYUFBWSIsInNvdXJjZXMiOlsid2VicGFjazovL3NhbG9uLWJvb2tpbmcvLi9saWIvYXV0aC50cz9iZjdlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRBdXRoT3B0aW9ucywgZ2V0U2VydmVyU2Vzc2lvbiB9IGZyb20gXCJuZXh0LWF1dGhcIlxuaW1wb3J0IENyZWRlbnRpYWxzUHJvdmlkZXIgZnJvbSBcIm5leHQtYXV0aC9wcm92aWRlcnMvY3JlZGVudGlhbHNcIlxuXG5leHBvcnQgY29uc3QgYXV0aE9wdGlvbnM6IE5leHRBdXRoT3B0aW9ucyA9IHtcbiAgcHJvdmlkZXJzOiBbXG4gICAgQ3JlZGVudGlhbHNQcm92aWRlcih7XG4gICAgICBuYW1lOiBcIkNyZWRlbnRpYWxzXCIsXG4gICAgICBjcmVkZW50aWFsczoge1xuICAgICAgICBlbWFpbDogeyBsYWJlbDogXCJFbWFpbFwiLCB0eXBlOiBcImVtYWlsXCIgfSxcbiAgICAgICAgcGFzc3dvcmQ6IHsgbGFiZWw6IFwiUGFzc3dvcmRcIiwgdHlwZTogXCJwYXNzd29yZFwiIH1cbiAgICAgIH0sXG4gICAgICBhc3luYyBhdXRob3JpemUoY3JlZGVudGlhbHMpIHtcbiAgICAgICAgaWYgKCFjcmVkZW50aWFscz8uZW1haWwgfHwgIWNyZWRlbnRpYWxzPy5wYXNzd29yZCkgcmV0dXJuIG51bGxcblxuICAgICAgICBjb25zdCBhZG1pbkVtYWlsID0gcHJvY2Vzcy5lbnYuQURNSU5fRU1BSUwgfHwgXCJhZG1pbkB0dXBlbHVxdWVyaWEuY29tXCJcbiAgICAgICAgY29uc3QgYWRtaW5QYXNzd29yZCA9IHByb2Nlc3MuZW52LkFETUlOX1BBU1NXT1JEIHx8IFwiYWRtaW4xMjNcIlxuXG4gICAgICAgIGlmIChjcmVkZW50aWFscy5lbWFpbCA9PT0gYWRtaW5FbWFpbCAmJiBjcmVkZW50aWFscy5wYXNzd29yZCA9PT0gYWRtaW5QYXNzd29yZCkge1xuICAgICAgICAgIHJldHVybiB7IGlkOiBcIjFcIiwgbmFtZTogXCJBZG1pblwiLCBlbWFpbDogYWRtaW5FbWFpbCB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgfVxuICAgIH0pXG4gIF0sXG4gIHBhZ2VzOiB7XG4gICAgc2lnbkluOiAnL2xvZ2luJyxcbiAgfSxcbiAgc2Vzc2lvbjoge1xuICAgIHN0cmF0ZWd5OiBcImp3dFwiLFxuICB9LFxuICBjYWxsYmFja3M6IHtcbiAgICBhc3luYyBqd3QoeyB0b2tlbiwgdXNlciB9KSB7XG4gICAgICBpZiAodXNlcikge1xuICAgICAgICB0b2tlbi5pZCA9IHVzZXIuaWRcbiAgICAgIH1cbiAgICAgIHJldHVybiB0b2tlblxuICAgIH0sXG4gICAgYXN5bmMgc2Vzc2lvbih7IHNlc3Npb24sIHRva2VuIH0pIHtcbiAgICAgIGlmIChzZXNzaW9uLnVzZXIpIHtcbiAgICAgICAgKHNlc3Npb24udXNlciBhcyBhbnkpLmlkID0gdG9rZW4uaWQgYXMgc3RyaW5nXG4gICAgICB9XG4gICAgICByZXR1cm4gc2Vzc2lvblxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgY29uc3QgZ2V0QXV0aFNlc3Npb24gPSAoKSA9PiBnZXRTZXJ2ZXJTZXNzaW9uKGF1dGhPcHRpb25zKVxuIl0sIm5hbWVzIjpbImdldFNlcnZlclNlc3Npb24iLCJDcmVkZW50aWFsc1Byb3ZpZGVyIiwiYXV0aE9wdGlvbnMiLCJwcm92aWRlcnMiLCJuYW1lIiwiY3JlZGVudGlhbHMiLCJlbWFpbCIsImxhYmVsIiwidHlwZSIsInBhc3N3b3JkIiwiYXV0aG9yaXplIiwiYWRtaW5FbWFpbCIsInByb2Nlc3MiLCJlbnYiLCJBRE1JTl9FTUFJTCIsImFkbWluUGFzc3dvcmQiLCJBRE1JTl9QQVNTV09SRCIsImlkIiwicGFnZXMiLCJzaWduSW4iLCJzZXNzaW9uIiwic3RyYXRlZ3kiLCJjYWxsYmFja3MiLCJqd3QiLCJ0b2tlbiIsInVzZXIiLCJnZXRBdXRoU2Vzc2lvbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/auth.ts\n");

/***/ }),

/***/ "(rsc)/./lib/db.ts":
/*!*******************!*\
  !*** ./lib/db.ts ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst prisma = globalThis.prismaGlobal ?? new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (prisma);\nif (true) globalThis.prismaGlobal = prisma;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvZGIudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQThDO0FBTzlDLE1BQU1DLFNBQVNDLFdBQVdDLFlBQVksSUFBSSxJQUFJSCx3REFBWUE7QUFFMUQsaUVBQWVDLE1BQU1BLEVBQUM7QUFFdEIsSUFBSUcsSUFBeUIsRUFBY0YsV0FBV0MsWUFBWSxHQUFHRiIsInNvdXJjZXMiOlsid2VicGFjazovL3NhbG9uLWJvb2tpbmcvLi9saWIvZGIudHM/MWRmMCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcmlzbWFDbGllbnQgfSBmcm9tICdAcHJpc21hL2NsaWVudCc7XG5cbmRlY2xhcmUgZ2xvYmFsIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXZhclxuICB2YXIgcHJpc21hR2xvYmFsOiB1bmRlZmluZWQgfCBQcmlzbWFDbGllbnQ7XG59XG5cbmNvbnN0IHByaXNtYSA9IGdsb2JhbFRoaXMucHJpc21hR2xvYmFsID8/IG5ldyBQcmlzbWFDbGllbnQoKTtcblxuZXhwb3J0IGRlZmF1bHQgcHJpc21hO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgZ2xvYmFsVGhpcy5wcmlzbWFHbG9iYWwgPSBwcmlzbWE7XG4iXSwibmFtZXMiOlsiUHJpc21hQ2xpZW50IiwicHJpc21hIiwiZ2xvYmFsVGhpcyIsInByaXNtYUdsb2JhbCIsInByb2Nlc3MiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/db.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/@babel","vendor-chunks/oauth","vendor-chunks/preact","vendor-chunks/uuid","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/lru-cache","vendor-chunks/cookie","vendor-chunks/oidc-token-hash","vendor-chunks/@panva","vendor-chunks/date-fns"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fadmin%2Fappointments%2Froute&page=%2Fapi%2Fadmin%2Fappointments%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fappointments%2Froute.ts&appDir=C%3A%5CUsers%5Cnicoc%5Cproyectos%5Csalon-booking%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cnicoc%5Cproyectos%5Csalon-booking&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();