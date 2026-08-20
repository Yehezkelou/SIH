module.exports = [
"[project]/apps/frontend/accueil-admin/src/components/ui/Field.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Input",
    ()=>Input,
    "Select",
    ()=>Select,
    "Textarea",
    ()=>Textarea
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.7_@babel+core@7.29.0_@opentelemetry+api@1.9.1_babel-plugin-macros@3.1.0_react_3a041bc0f14497f8854c62e50408d300/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.7_@babel+core@7.29.0_@opentelemetry+api@1.9.1_babel-plugin-macros@3.1.0_react_3a041bc0f14497f8854c62e50408d300/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$lib$2f$cn$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/frontend/accueil-admin/src/lib/cn.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/frontend/accueil-admin/src/components/ui/Icon.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
const baseControl = "w-full bg-white border border-slate-300 rounded-lg text-[13px] text-slate-800 placeholder:text-slate-400 px-3 h-9 outline-none transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 disabled:bg-slate-50 disabled:text-slate-500";
function Label({ label, required, htmlFor }) {
    if (!label) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
        htmlFor: htmlFor,
        className: "text-[11px] font-semibold text-slate-600 uppercase tracking-wide",
        children: [
            label,
            " ",
            required && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-rose-500",
                children: "*"
            }, void 0, false, {
                fileName: "[project]/apps/frontend/accueil-admin/src/components/ui/Field.tsx",
                lineNumber: 14,
                columnNumber: 28
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/frontend/accueil-admin/src/components/ui/Field.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
const Input = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, label, error, leftIcon, hint, id, ...props }, ref)=>{
    const inputId = id || props.name;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-1.5 w-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Label, {
                label: label,
                required: props.required,
                htmlFor: inputId
            }, void 0, false, {
                fileName: "[project]/apps/frontend/accueil-admin/src/components/ui/Field.tsx",
                lineNumber: 32,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative flex items-center",
                children: [
                    leftIcon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "absolute left-3 text-slate-400 pointer-events-none",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Icon"], {
                            name: leftIcon,
                            size: 15
                        }, void 0, false, {
                            fileName: "[project]/apps/frontend/accueil-admin/src/components/ui/Field.tsx",
                            lineNumber: 36,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/apps/frontend/accueil-admin/src/components/ui/Field.tsx",
                        lineNumber: 35,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        id: inputId,
                        ref: ref,
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$lib$2f$cn$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(baseControl, leftIcon && "pl-9", error && "border-rose-400 focus:border-rose-500 focus:ring-rose-500/20", className),
                        ...props
                    }, void 0, false, {
                        fileName: "[project]/apps/frontend/accueil-admin/src/components/ui/Field.tsx",
                        lineNumber: 39,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/apps/frontend/accueil-admin/src/components/ui/Field.tsx",
                lineNumber: 33,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-[11px] text-rose-500 font-medium",
                children: error
            }, void 0, false, {
                fileName: "[project]/apps/frontend/accueil-admin/src/components/ui/Field.tsx",
                lineNumber: 47,
                columnNumber: 11
            }, ("TURBOPACK compile-time value", void 0)) : hint && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-[11px] text-slate-400",
                children: hint
            }, void 0, false, {
                fileName: "[project]/apps/frontend/accueil-admin/src/components/ui/Field.tsx",
                lineNumber: 49,
                columnNumber: 19
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/apps/frontend/accueil-admin/src/components/ui/Field.tsx",
        lineNumber: 31,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
Input.displayName = "Input";
const Select = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, label, error, options, placeholder, id, ...props }, ref)=>{
    const selectId = id || props.name;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-1.5 w-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Label, {
                label: label,
                required: props.required,
                htmlFor: selectId
            }, void 0, false, {
                fileName: "[project]/apps/frontend/accueil-admin/src/components/ui/Field.tsx",
                lineNumber: 70,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative flex items-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        id: selectId,
                        ref: ref,
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$lib$2f$cn$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(baseControl, "appearance-none pr-9 cursor-pointer", error && "border-rose-400", className),
                        defaultValue: props.defaultValue ?? "",
                        ...props,
                        children: [
                            placeholder && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "",
                                disabled: true,
                                children: placeholder
                            }, void 0, false, {
                                fileName: "[project]/apps/frontend/accueil-admin/src/components/ui/Field.tsx",
                                lineNumber: 79,
                                columnNumber: 29
                            }, ("TURBOPACK compile-time value", void 0)),
                            options.map((o)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: o.value,
                                    children: o.label
                                }, o.value, false, {
                                    fileName: "[project]/apps/frontend/accueil-admin/src/components/ui/Field.tsx",
                                    lineNumber: 81,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/frontend/accueil-admin/src/components/ui/Field.tsx",
                        lineNumber: 72,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "absolute right-3 text-slate-400 pointer-events-none",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Icon"], {
                            name: "chevronDown",
                            size: 15
                        }, void 0, false, {
                            fileName: "[project]/apps/frontend/accueil-admin/src/components/ui/Field.tsx",
                            lineNumber: 85,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/apps/frontend/accueil-admin/src/components/ui/Field.tsx",
                        lineNumber: 84,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/apps/frontend/accueil-admin/src/components/ui/Field.tsx",
                lineNumber: 71,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-[11px] text-rose-500 font-medium",
                children: error
            }, void 0, false, {
                fileName: "[project]/apps/frontend/accueil-admin/src/components/ui/Field.tsx",
                lineNumber: 88,
                columnNumber: 19
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/apps/frontend/accueil-admin/src/components/ui/Field.tsx",
        lineNumber: 69,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
Select.displayName = "Select";
const Textarea = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, label, error, id, ...props }, ref)=>{
    const areaId = id || props.name;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-1.5 w-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Label, {
                label: label,
                required: props.required,
                htmlFor: areaId
            }, void 0, false, {
                fileName: "[project]/apps/frontend/accueil-admin/src/components/ui/Field.tsx",
                lineNumber: 106,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                id: areaId,
                ref: ref,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$lib$2f$cn$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(baseControl, "h-auto py-2 min-h-[80px] resize-y", error && "border-rose-400", className),
                ...props
            }, void 0, false, {
                fileName: "[project]/apps/frontend/accueil-admin/src/components/ui/Field.tsx",
                lineNumber: 107,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-[11px] text-rose-500 font-medium",
                children: error
            }, void 0, false, {
                fileName: "[project]/apps/frontend/accueil-admin/src/components/ui/Field.tsx",
                lineNumber: 113,
                columnNumber: 19
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/apps/frontend/accueil-admin/src/components/ui/Field.tsx",
        lineNumber: 105,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
Textarea.displayName = "Textarea";
}),
"[project]/apps/frontend/accueil-admin/src/features/admission/components/FormSection.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FormSection",
    ()=>FormSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.7_@babel+core@7.29.0_@opentelemetry+api@1.9.1_babel-plugin-macros@3.1.0_react_3a041bc0f14497f8854c62e50408d300/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/frontend/accueil-admin/src/components/ui/Icon.tsx [app-ssr] (ecmascript)");
;
;
const FormSection = ({ step, title, description, icon, children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "bg-white border border-slate-200 rounded-xl shadow-sm shadow-slate-200/50",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3 px-5 py-4 border-b border-slate-100",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "grid place-items-center w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 shrink-0",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Icon"], {
                            name: icon,
                            size: 18
                        }, void 0, false, {
                            fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/FormSection.tsx",
                            lineNumber: 20,
                            columnNumber: 9
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/FormSection.tsx",
                        lineNumber: 19,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-sm font-semibold text-slate-800 flex items-center gap-2",
                                children: [
                                    step && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[11px] font-bold text-emerald-600 bg-emerald-50 rounded-full w-5 h-5 grid place-items-center",
                                        children: step
                                    }, void 0, false, {
                                        fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/FormSection.tsx",
                                        lineNumber: 25,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    title
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/FormSection.tsx",
                                lineNumber: 23,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0)),
                            description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[12px] text-slate-400 mt-0.5",
                                children: description
                            }, void 0, false, {
                                fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/FormSection.tsx",
                                lineNumber: 31,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/FormSection.tsx",
                        lineNumber: 22,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/FormSection.tsx",
                lineNumber: 18,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-5",
                children: children
            }, void 0, false, {
                fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/FormSection.tsx",
                lineNumber: 34,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/FormSection.tsx",
        lineNumber: 17,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
}),
"[project]/apps/frontend/accueil-admin/src/features/admission/types/index.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Types du domaine Admission — miroir des entites du microservice
 * Admission-service (apps/backend/Admission-service/src/modules/entities).
 * Utilises uniquement par le template visuel (aucune logique reseau ici).
 */ __turbopack_context__.s([
    "AdmissionDocumentType",
    ()=>AdmissionDocumentType,
    "AdmissionPayerType",
    ()=>AdmissionPayerType,
    "AdmissionStatus",
    ()=>AdmissionStatus,
    "AdmissionType",
    ()=>AdmissionType,
    "Relationship",
    ()=>Relationship
]);
var AdmissionType = /*#__PURE__*/ function(AdmissionType) {
    AdmissionType["INPATIENT"] = "INPATIENT";
    AdmissionType["OUTPATIENT"] = "OUTPATIENT";
    AdmissionType["EMERGENCY"] = "EMERGENCY";
    return AdmissionType;
}({});
var AdmissionStatus = /*#__PURE__*/ function(AdmissionStatus) {
    AdmissionStatus["PENDING"] = "PENDING";
    AdmissionStatus["PRE_ADMITTED"] = "PRE_ADMITTED";
    AdmissionStatus["REGISTERED"] = "REGISTERED";
    AdmissionStatus["ADMITTED"] = "ADMITTED";
    AdmissionStatus["WAIT_FOR_CAR"] = "WAIT_FOR_CAR";
    AdmissionStatus["DISCHARGED_PENDING"] = "DISCHARGED_PENDING";
    AdmissionStatus["DISCHARGED"] = "DISCHARGED";
    AdmissionStatus["TRANSFERED"] = "TRANSFERED";
    AdmissionStatus["CLOSED"] = "CLOSED";
    AdmissionStatus["CANCELLED"] = "CANCELLED";
    return AdmissionStatus;
}({});
var AdmissionDocumentType = /*#__PURE__*/ function(AdmissionDocumentType) {
    AdmissionDocumentType["PIECE_IDENTIE"] = "PIECE_IDENTIE";
    AdmissionDocumentType["CARTE_ASSURANCE"] = "CARTE_ASSURANCE";
    AdmissionDocumentType["ORDONNANCE"] = "ORDONNANCE";
    AdmissionDocumentType["AUTRE"] = "AUTRE";
    return AdmissionDocumentType;
}({});
var AdmissionPayerType = /*#__PURE__*/ function(AdmissionPayerType) {
    AdmissionPayerType["PATIENT"] = "PATIENT";
    AdmissionPayerType["INSURANCE"] = "INSURANCE";
    AdmissionPayerType["COMPANY"] = "COMPANY";
    return AdmissionPayerType;
}({});
var Relationship = /*#__PURE__*/ function(Relationship) {
    Relationship["FATHER"] = "FATHER";
    Relationship["MOTHER"] = "MOTHER";
    Relationship["SON"] = "SON";
    Relationship["DAUTHER"] = "DAUTHER";
    Relationship["HUSBAND"] = "HUSBAND";
    Relationship["WIFE"] = "WIFE";
    Relationship["BROTHER"] = "BROTHER";
    Relationship["SISTER"] = "SISTER";
    Relationship["OTHER"] = "OTHER";
    return Relationship;
}({});
}),
"[project]/apps/frontend/accueil-admin/src/features/admission/utils/format.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "admissionStatusLabel",
    ()=>admissionStatusLabel,
    "admissionStatusTone",
    ()=>admissionStatusTone,
    "admissionTypeLabel",
    ()=>admissionTypeLabel,
    "admissionTypeTone",
    ()=>admissionTypeTone,
    "documentTypeLabel",
    ()=>documentTypeLabel,
    "formatDate",
    ()=>formatDate,
    "formatDateTime",
    ()=>formatDateTime,
    "initials",
    ()=>initials,
    "payerTypeLabel",
    ()=>payerTypeLabel,
    "relationshipLabel",
    ()=>relationshipLabel,
    "toOptions",
    ()=>toOptions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$admission$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/frontend/accueil-admin/src/features/admission/types/index.ts [app-ssr] (ecmascript)");
;
const admissionTypeLabel = {
    [__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$admission$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdmissionType"].INPATIENT]: "Hospitalisation",
    [__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$admission$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdmissionType"].OUTPATIENT]: "Ambulatoire",
    [__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$admission$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdmissionType"].EMERGENCY]: "Urgence"
};
const admissionStatusLabel = {
    [__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$admission$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdmissionStatus"].PENDING]: "En attente",
    [__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$admission$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdmissionStatus"].PRE_ADMITTED]: "Pré-admis",
    [__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$admission$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdmissionStatus"].REGISTERED]: "Enregistré",
    [__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$admission$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdmissionStatus"].ADMITTED]: "Admis",
    [__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$admission$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdmissionStatus"].WAIT_FOR_CAR]: "Attente transport",
    [__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$admission$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdmissionStatus"].DISCHARGED_PENDING]: "Sortie en cours",
    [__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$admission$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdmissionStatus"].DISCHARGED]: "Sorti",
    [__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$admission$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdmissionStatus"].TRANSFERED]: "Transféré",
    [__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$admission$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdmissionStatus"].CLOSED]: "Clôturé",
    [__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$admission$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdmissionStatus"].CANCELLED]: "Annulé"
};
const payerTypeLabel = {
    [__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$admission$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdmissionPayerType"].PATIENT]: "Patient",
    [__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$admission$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdmissionPayerType"].INSURANCE]: "Assurance",
    [__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$admission$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdmissionPayerType"].COMPANY]: "Entreprise"
};
const documentTypeLabel = {
    [__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$admission$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdmissionDocumentType"].PIECE_IDENTIE]: "Pièce d'identité",
    [__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$admission$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdmissionDocumentType"].CARTE_ASSURANCE]: "Carte d'assurance",
    [__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$admission$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdmissionDocumentType"].ORDONNANCE]: "Ordonnance",
    [__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$admission$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdmissionDocumentType"].AUTRE]: "Autre"
};
const relationshipLabel = {
    [__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$admission$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Relationship"].FATHER]: "Père",
    [__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$admission$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Relationship"].MOTHER]: "Mère",
    [__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$admission$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Relationship"].SON]: "Fils",
    [__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$admission$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Relationship"].DAUTHER]: "Fille",
    [__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$admission$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Relationship"].HUSBAND]: "Époux",
    [__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$admission$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Relationship"].WIFE]: "Épouse",
    [__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$admission$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Relationship"].BROTHER]: "Frère",
    [__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$admission$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Relationship"].SISTER]: "Sœur",
    [__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$admission$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Relationship"].OTHER]: "Autre"
};
const admissionStatusTone = {
    [__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$admission$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdmissionStatus"].PENDING]: "amber",
    [__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$admission$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdmissionStatus"].PRE_ADMITTED]: "sky",
    [__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$admission$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdmissionStatus"].REGISTERED]: "indigo",
    [__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$admission$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdmissionStatus"].ADMITTED]: "emerald",
    [__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$admission$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdmissionStatus"].WAIT_FOR_CAR]: "amber",
    [__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$admission$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdmissionStatus"].DISCHARGED_PENDING]: "violet",
    [__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$admission$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdmissionStatus"].DISCHARGED]: "slate",
    [__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$admission$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdmissionStatus"].TRANSFERED]: "sky",
    [__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$admission$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdmissionStatus"].CLOSED]: "slate",
    [__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$admission$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdmissionStatus"].CANCELLED]: "rose"
};
const admissionTypeTone = {
    [__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$admission$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdmissionType"].INPATIENT]: "indigo",
    [__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$admission$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdmissionType"].OUTPATIENT]: "sky",
    [__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$admission$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdmissionType"].EMERGENCY]: "rose"
};
const toOptions = (labels)=>Object.keys(labels).map((value)=>({
            value,
            label: labels[value]
        }));
const formatDate = (iso)=>{
    if (!iso) return "—";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "—";
    return d.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
};
const formatDateTime = (iso)=>{
    if (!iso) return "—";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "—";
    return d.toLocaleString("fr-FR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
};
const initials = (name)=>name.split(" ").filter(Boolean).slice(0, 2).map((p)=>p[0]?.toUpperCase()).join("");
}),
"[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionForm.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AdmissionForm",
    ()=>AdmissionForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.7_@babel+core@7.29.0_@opentelemetry+api@1.9.1_babel-plugin-macros@3.1.0_react_3a041bc0f14497f8854c62e50408d300/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.7_@babel+core@7.29.0_@opentelemetry+api@1.9.1_babel-plugin-macros@3.1.0_react_3a041bc0f14497f8854c62e50408d300/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.7_@babel+core@7.29.0_@opentelemetry+api@1.9.1_babel-plugin-macros@3.1.0_react_3a041bc0f14497f8854c62e50408d300/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/frontend/accueil-admin/src/components/ui/Icon.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/frontend/accueil-admin/src/components/ui/Button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Field$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/frontend/accueil-admin/src/components/ui/Field.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$admission$2f$components$2f$FormSection$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/frontend/accueil-admin/src/features/admission/components/FormSection.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$admission$2f$utils$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/frontend/accueil-admin/src/features/admission/utils/format.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
const AdmissionForm = ()=>{
    const [companions, setCompanions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([
        {
            id: 1
        }
    ]);
    const [payers, setPayers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([
        {
            id: 1
        }
    ]);
    const [files, setFiles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
        onSubmit: (e)=>e.preventDefault(),
        className: "grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-5 items-start",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$admission$2f$components$2f$FormSection$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FormSection"], {
                        step: 1,
                        title: "Identité du patient",
                        description: "Recherchez un dossier existant ou renseignez un nouveau patient.",
                        icon: "idCard",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 mb-4 p-2.5 rounded-lg bg-sky-50 border border-sky-100",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Icon"], {
                                        name: "search",
                                        size: 16,
                                        className: "text-sky-500 shrink-0"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionForm.tsx",
                                        lineNumber: 39,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        placeholder: "Rechercher par n° de dossier, nom ou téléphone…",
                                        className: "flex-1 bg-transparent text-[13px] text-slate-700 placeholder:text-slate-400 outline-none"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionForm.tsx",
                                        lineNumber: 40,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                        type: "button",
                                        size: "sm",
                                        variant: "subtle",
                                        children: "Rechercher"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionForm.tsx",
                                        lineNumber: 44,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionForm.tsx",
                                lineNumber: 38,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Field$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                        name: "nom",
                                        label: "Nom",
                                        placeholder: "Ex. Koffi",
                                        required: true
                                    }, void 0, false, {
                                        fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionForm.tsx",
                                        lineNumber: 47,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Field$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                        name: "prenom",
                                        label: "Prénom",
                                        placeholder: "Ex. Aya",
                                        required: true
                                    }, void 0, false, {
                                        fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionForm.tsx",
                                        lineNumber: 48,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Field$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                        name: "numeroDossier",
                                        label: "N° dossier",
                                        placeholder: "DOS-000000",
                                        leftIcon: "clipboard"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionForm.tsx",
                                        lineNumber: 49,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Field$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Select"], {
                                        name: "sexe",
                                        label: "Sexe",
                                        placeholder: "Sélectionner",
                                        options: [
                                            {
                                                value: "F",
                                                label: "Féminin"
                                            },
                                            {
                                                value: "M",
                                                label: "Masculin"
                                            }
                                        ]
                                    }, void 0, false, {
                                        fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionForm.tsx",
                                        lineNumber: 50,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Field$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                        name: "dateNaissance",
                                        label: "Date de naissance",
                                        type: "date"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionForm.tsx",
                                        lineNumber: 51,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Field$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                        name: "telephone",
                                        label: "Téléphone",
                                        placeholder: "+225 …",
                                        leftIcon: "phone"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionForm.tsx",
                                        lineNumber: 52,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionForm.tsx",
                                lineNumber: 46,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionForm.tsx",
                        lineNumber: 37,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$admission$2f$components$2f$FormSection$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FormSection"], {
                        step: 2,
                        title: "Détails de l'admission",
                        description: "Type de prise en charge, service et médecin référent.",
                        icon: "clipboard",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Field$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Select"], {
                                        name: "type",
                                        label: "Type d'admission",
                                        placeholder: "Sélectionner",
                                        required: true,
                                        options: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$admission$2f$utils$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toOptions"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$admission$2f$utils$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["admissionTypeLabel"])
                                    }, void 0, false, {
                                        fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionForm.tsx",
                                        lineNumber: 59,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Field$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Select"], {
                                        name: "service",
                                        label: "Service",
                                        placeholder: "Sélectionner",
                                        required: true,
                                        options: [
                                            {
                                                value: "cardio",
                                                label: "Cardiologie"
                                            },
                                            {
                                                value: "urgences",
                                                label: "Urgences"
                                            },
                                            {
                                                value: "maternite",
                                                label: "Maternité"
                                            },
                                            {
                                                value: "chirurgie",
                                                label: "Chirurgie"
                                            }
                                        ]
                                    }, void 0, false, {
                                        fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionForm.tsx",
                                        lineNumber: 60,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Field$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Select"], {
                                        name: "medecin",
                                        label: "Médecin référent",
                                        placeholder: "Sélectionner",
                                        options: [
                                            {
                                                value: "1",
                                                label: "Dr. Fabrice N'Guessan"
                                            },
                                            {
                                                value: "2",
                                                label: "Dr. Céline Assi"
                                            }
                                        ]
                                    }, void 0, false, {
                                        fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionForm.tsx",
                                        lineNumber: 66,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Field$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                        name: "dateAdmission",
                                        label: "Date d'admission",
                                        type: "datetime-local",
                                        required: true
                                    }, void 0, false, {
                                        fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionForm.tsx",
                                        lineNumber: 70,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Field$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                        name: "sortiePrevue",
                                        label: "Sortie prévisionnelle",
                                        type: "datetime-local"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionForm.tsx",
                                        lineNumber: 71,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Field$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Select"], {
                                        name: "provenance",
                                        label: "Provenance",
                                        placeholder: "Sélectionner",
                                        options: [
                                            {
                                                value: "domicile",
                                                label: "Domicile"
                                            },
                                            {
                                                value: "transfert",
                                                label: "Transfert externe"
                                            },
                                            {
                                                value: "samu",
                                                label: "SAMU / Ambulance"
                                            }
                                        ]
                                    }, void 0, false, {
                                        fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionForm.tsx",
                                        lineNumber: 72,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionForm.tsx",
                                lineNumber: 58,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Field$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Textarea"], {
                                    name: "motif",
                                    label: "Motif d'admission",
                                    placeholder: "Décrivez le motif de la prise en charge…"
                                }, void 0, false, {
                                    fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionForm.tsx",
                                    lineNumber: 79,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionForm.tsx",
                                lineNumber: 78,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionForm.tsx",
                        lineNumber: 57,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$admission$2f$components$2f$FormSection$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FormSection"], {
                        step: 3,
                        title: "Accompagnants",
                        description: "Personnes à contacter durant le séjour.",
                        icon: "users",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-3",
                            children: [
                                companions.map((row, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-1 sm:grid-cols-[1fr_1fr_1fr_auto] gap-3 items-end",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Field$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                name: `comp_nom_${row.id}`,
                                                label: idx === 0 ? "Nom complet" : undefined,
                                                placeholder: "Nom de l'accompagnant"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionForm.tsx",
                                                lineNumber: 88,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Field$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Select"], {
                                                name: `comp_lien_${row.id}`,
                                                label: idx === 0 ? "Lien de parenté" : undefined,
                                                placeholder: "Lien",
                                                options: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$admission$2f$utils$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toOptions"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$admission$2f$utils$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["relationshipLabel"])
                                            }, void 0, false, {
                                                fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionForm.tsx",
                                                lineNumber: 89,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Field$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                name: `comp_tel_${row.id}`,
                                                label: idx === 0 ? "Téléphone" : undefined,
                                                placeholder: "+225 …",
                                                leftIcon: "phone"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionForm.tsx",
                                                lineNumber: 90,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                type: "button",
                                                variant: "ghost",
                                                size: "sm",
                                                className: "text-rose-500 hover:bg-rose-50",
                                                onClick: ()=>setCompanions((c)=>c.length > 1 ? c.filter((r)=>r.id !== row.id) : c),
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Icon"], {
                                                    name: "trash",
                                                    size: 16
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionForm.tsx",
                                                    lineNumber: 98,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionForm.tsx",
                                                lineNumber: 91,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, row.id, true, {
                                        fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionForm.tsx",
                                        lineNumber: 87,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>setCompanions((c)=>[
                                                ...c,
                                                {
                                                    id: Date.now()
                                                }
                                            ]),
                                    className: "self-start inline-flex items-center gap-1.5 text-[12px] font-semibold text-emerald-700 hover:text-emerald-800",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Icon"], {
                                            name: "plus",
                                            size: 15
                                        }, void 0, false, {
                                            fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionForm.tsx",
                                            lineNumber: 107,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        " Ajouter un accompagnant"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionForm.tsx",
                                    lineNumber: 102,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionForm.tsx",
                            lineNumber: 85,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionForm.tsx",
                        lineNumber: 84,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$admission$2f$components$2f$FormSection$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FormSection"], {
                        step: 4,
                        title: "Payeurs & couverture",
                        description: "Répartition de la prise en charge financière.",
                        icon: "creditCard",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-3",
                            children: [
                                payers.map((row, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-1 sm:grid-cols-[1fr_1fr_1fr_1fr_auto] gap-3 items-end",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Field$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Select"], {
                                                name: `pay_type_${row.id}`,
                                                label: idx === 0 ? "Type" : undefined,
                                                placeholder: "Type",
                                                options: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$admission$2f$utils$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toOptions"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$admission$2f$utils$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["payerTypeLabel"])
                                            }, void 0, false, {
                                                fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionForm.tsx",
                                                lineNumber: 117,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Field$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                name: `pay_nom_${row.id}`,
                                                label: idx === 0 ? "Nom / Organisme" : undefined,
                                                placeholder: "Ex. CNPS"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionForm.tsx",
                                                lineNumber: 118,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Field$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                name: `pay_police_${row.id}`,
                                                label: idx === 0 ? "N° police" : undefined,
                                                placeholder: "—"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionForm.tsx",
                                                lineNumber: 119,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Field$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                name: `pay_taux_${row.id}`,
                                                label: idx === 0 ? "Couverture %" : undefined,
                                                type: "number",
                                                placeholder: "0"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionForm.tsx",
                                                lineNumber: 120,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                type: "button",
                                                variant: "ghost",
                                                size: "sm",
                                                className: "text-rose-500 hover:bg-rose-50",
                                                onClick: ()=>setPayers((p)=>p.length > 1 ? p.filter((r)=>r.id !== row.id) : p),
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Icon"], {
                                                    name: "trash",
                                                    size: 16
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionForm.tsx",
                                                    lineNumber: 128,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionForm.tsx",
                                                lineNumber: 121,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, row.id, true, {
                                        fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionForm.tsx",
                                        lineNumber: 116,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>setPayers((p)=>[
                                                ...p,
                                                {
                                                    id: Date.now()
                                                }
                                            ]),
                                    className: "self-start inline-flex items-center gap-1.5 text-[12px] font-semibold text-emerald-700 hover:text-emerald-800",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Icon"], {
                                            name: "plus",
                                            size: 15
                                        }, void 0, false, {
                                            fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionForm.tsx",
                                            lineNumber: 137,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        " Ajouter un payeur"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionForm.tsx",
                                    lineNumber: 132,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionForm.tsx",
                            lineNumber: 114,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionForm.tsx",
                        lineNumber: 113,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$admission$2f$components$2f$FormSection$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FormSection"], {
                        step: 5,
                        title: "Documents justificatifs",
                        description: "Pièce d'identité, carte d'assurance, ordonnance…",
                        icon: "file",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Field$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Select"], {
                                        name: "docType",
                                        label: "Type de document",
                                        placeholder: "Sélectionner",
                                        options: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$admission$2f$utils$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toOptions"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$admission$2f$utils$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["documentTypeLabel"])
                                    }, void 0, false, {
                                        fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionForm.tsx",
                                        lineNumber: 145,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col gap-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[11px] font-semibold text-slate-600 uppercase tracking-wide",
                                                children: "Fichier"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionForm.tsx",
                                                lineNumber: 147,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "flex items-center justify-center gap-2 h-9 rounded-lg border border-dashed border-slate-300 text-[12px] text-slate-500 cursor-pointer hover:border-emerald-400 hover:text-emerald-600 transition-colors",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Icon"], {
                                                        name: "upload",
                                                        size: 15
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionForm.tsx",
                                                        lineNumber: 149,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    "Choisir un fichier",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "file",
                                                        className: "hidden",
                                                        onChange: (e)=>{
                                                            const name = e.target.files?.[0]?.name;
                                                            if (name) setFiles((f)=>[
                                                                    ...f,
                                                                    name
                                                                ]);
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionForm.tsx",
                                                        lineNumber: 151,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionForm.tsx",
                                                lineNumber: 148,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionForm.tsx",
                                        lineNumber: 146,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionForm.tsx",
                                lineNumber: 144,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            files.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "mt-4 flex flex-col gap-2",
                                children: files.map((f, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        className: "flex items-center gap-2.5 px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-[12px] text-slate-600",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Icon"], {
                                                name: "file",
                                                size: 15,
                                                className: "text-emerald-600"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionForm.tsx",
                                                lineNumber: 166,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "flex-1 truncate",
                                                children: f
                                            }, void 0, false, {
                                                fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionForm.tsx",
                                                lineNumber: 167,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>setFiles((list)=>list.filter((_, idx)=>idx !== i)),
                                                className: "text-slate-400 hover:text-rose-500",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Icon"], {
                                                    name: "close",
                                                    size: 14
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionForm.tsx",
                                                    lineNumber: 169,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionForm.tsx",
                                                lineNumber: 168,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, i, true, {
                                        fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionForm.tsx",
                                        lineNumber: 165,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)))
                            }, void 0, false, {
                                fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionForm.tsx",
                                lineNumber: 163,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionForm.tsx",
                        lineNumber: 143,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionForm.tsx",
                lineNumber: 35,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                className: "xl:sticky xl:top-6 flex flex-col gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white border border-slate-200 rounded-xl shadow-sm shadow-slate-200/50 p-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-sm font-semibold text-slate-800 mb-3",
                                children: "Récapitulatif"
                            }, void 0, false, {
                                fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionForm.tsx",
                                lineNumber: 181,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "flex flex-col gap-2.5 text-[12px]",
                                children: [
                                    [
                                        "Étape 1",
                                        "Identité patient"
                                    ],
                                    [
                                        "Étape 2",
                                        "Détails admission"
                                    ],
                                    [
                                        "Étape 3",
                                        `Accompagnants (${companions.length})`
                                    ],
                                    [
                                        "Étape 4",
                                        `Payeurs (${payers.length})`
                                    ],
                                    [
                                        "Étape 5",
                                        `Documents (${files.length})`
                                    ]
                                ].map(([k, v])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        className: "flex items-center gap-2.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "grid place-items-center w-5 h-5 rounded-full bg-slate-100 text-slate-400",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Icon"], {
                                                    name: "check",
                                                    size: 12
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionForm.tsx",
                                                    lineNumber: 192,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionForm.tsx",
                                                lineNumber: 191,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-slate-400",
                                                children: k
                                            }, void 0, false, {
                                                fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionForm.tsx",
                                                lineNumber: 194,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "ml-auto font-medium text-slate-600 truncate",
                                                children: v
                                            }, void 0, false, {
                                                fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionForm.tsx",
                                                lineNumber: 195,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, k, true, {
                                        fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionForm.tsx",
                                        lineNumber: 190,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)))
                            }, void 0, false, {
                                fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionForm.tsx",
                                lineNumber: 182,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-5 flex flex-col gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                        type: "submit",
                                        leftIcon: "check",
                                        className: "w-full",
                                        children: "Enregistrer l'admission"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionForm.tsx",
                                        lineNumber: 200,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/admissions",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                            type: "button",
                                            variant: "outline",
                                            className: "w-full",
                                            children: "Annuler"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionForm.tsx",
                                            lineNumber: 204,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionForm.tsx",
                                        lineNumber: 203,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionForm.tsx",
                                lineNumber: 199,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[11px] text-slate-400 mt-3 text-center",
                                children: "Un n° d'admission sera généré automatiquement."
                            }, void 0, false, {
                                fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionForm.tsx",
                                lineNumber: 207,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionForm.tsx",
                        lineNumber: 180,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Icon"], {
                                name: "shield",
                                size: 18,
                                className: "text-emerald-600 shrink-0 mt-0.5"
                            }, void 0, false, {
                                fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionForm.tsx",
                                lineNumber: 213,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[11px] text-emerald-800 leading-relaxed",
                                children: "Les données saisies sont conservées de façon sécurisée et tracées (piste d'audit médico-légale)."
                            }, void 0, false, {
                                fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionForm.tsx",
                                lineNumber: 214,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionForm.tsx",
                        lineNumber: 212,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionForm.tsx",
                lineNumber: 179,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionForm.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
];

//# sourceMappingURL=apps_frontend_accueil-admin_src_247fb6ae._.js.map