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
"[project]/apps/frontend/accueil-admin/src/components/ui/FormSection.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
                            fileName: "[project]/apps/frontend/accueil-admin/src/components/ui/FormSection.tsx",
                            lineNumber: 20,
                            columnNumber: 9
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/apps/frontend/accueil-admin/src/components/ui/FormSection.tsx",
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
                                        fileName: "[project]/apps/frontend/accueil-admin/src/components/ui/FormSection.tsx",
                                        lineNumber: 25,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    title
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/frontend/accueil-admin/src/components/ui/FormSection.tsx",
                                lineNumber: 23,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0)),
                            description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[12px] text-slate-400 mt-0.5",
                                children: description
                            }, void 0, false, {
                                fileName: "[project]/apps/frontend/accueil-admin/src/components/ui/FormSection.tsx",
                                lineNumber: 31,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/frontend/accueil-admin/src/components/ui/FormSection.tsx",
                        lineNumber: 22,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/apps/frontend/accueil-admin/src/components/ui/FormSection.tsx",
                lineNumber: 18,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-5",
                children: children
            }, void 0, false, {
                fileName: "[project]/apps/frontend/accueil-admin/src/components/ui/FormSection.tsx",
                lineNumber: 34,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/apps/frontend/accueil-admin/src/components/ui/FormSection.tsx",
        lineNumber: 17,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
}),
"[project]/apps/frontend/accueil-admin/src/features/patient/types/index.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Types du domaine Patient (MPI — Master Patient Index).
 * Miroir des entités du microservice Patient-Identity-Service
 * (apps/backend/Patient-Identity-Service/src/modules/patient/entities).
 */ __turbopack_context__.s([
    "AlertNiveau",
    ()=>AlertNiveau,
    "AlertStatus",
    ()=>AlertStatus,
    "MotifProvisoire",
    ()=>MotifProvisoire,
    "StatusDossier",
    ()=>StatusDossier
]);
var StatusDossier = /*#__PURE__*/ function(StatusDossier) {
    StatusDossier["PROVISOIRE"] = "PROVISOIRE";
    StatusDossier["DEFINITIF"] = "DEFINITIF";
    return StatusDossier;
}({});
var MotifProvisoire = /*#__PURE__*/ function(MotifProvisoire) {
    MotifProvisoire["URGENCE_VITAL"] = "URGENCE_VITAL";
    MotifProvisoire["PATIENT_INCONSCIENT"] = "PATIENT_INCONSCIENT";
    MotifProvisoire["IDENTITE_INCONNUE"] = "IDENTITE_INCONNUE";
    MotifProvisoire["MINEUR_NON_ACCOMPAGNE"] = "MINEUR_NON_ACCOMPAGNE";
    MotifProvisoire["PANNE_SYSTEME"] = "PANNE_SYSTEME";
    MotifProvisoire["AUTRE"] = "AUTRE";
    return MotifProvisoire;
}({});
var AlertNiveau = /*#__PURE__*/ function(AlertNiveau) {
    AlertNiveau["MODEREE"] = "MODEREE";
    AlertNiveau["FORTE"] = "FORTE";
    return AlertNiveau;
}({});
var AlertStatus = /*#__PURE__*/ function(AlertStatus) {
    AlertStatus["EN_ATTENTE"] = "EN_ATTENTE";
    AlertStatus["CONFIRMEE_FUSION"] = "CONFIRMEE_FUSION";
    AlertStatus["IGNOREE"] = "IGNOREE";
    AlertStatus["FAUX_POSITIF"] = "FAUX_POSITIF";
    return AlertStatus;
}({});
}),
"[project]/apps/frontend/accueil-admin/src/features/patient/utils/format.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "alertNiveauLabel",
    ()=>alertNiveauLabel,
    "alertNiveauTone",
    ()=>alertNiveauTone,
    "alertStatusLabel",
    ()=>alertStatusLabel,
    "alertStatusTone",
    ()=>alertStatusTone,
    "formatDate",
    ()=>formatDate,
    "genreLabel",
    ()=>genreLabel,
    "initials",
    ()=>initials,
    "matchedFieldLabel",
    ()=>matchedFieldLabel,
    "motifProvisoireLabel",
    ()=>motifProvisoireLabel,
    "scoreTone",
    ()=>scoreTone,
    "statusDossierLabel",
    ()=>statusDossierLabel,
    "statusDossierTone",
    ()=>statusDossierTone,
    "toOptions",
    ()=>toOptions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$patient$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/frontend/accueil-admin/src/features/patient/types/index.ts [app-ssr] (ecmascript)");
;
const genreLabel = {
    M: "Masculin",
    F: "Féminin"
};
const statusDossierLabel = {
    [__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$patient$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StatusDossier"].PROVISOIRE]: "Provisoire",
    [__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$patient$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StatusDossier"].DEFINITIF]: "Définitif"
};
const statusDossierTone = {
    [__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$patient$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StatusDossier"].PROVISOIRE]: "amber",
    [__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$patient$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StatusDossier"].DEFINITIF]: "emerald"
};
const motifProvisoireLabel = {
    [__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$patient$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MotifProvisoire"].URGENCE_VITAL]: "Urgence vitale",
    [__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$patient$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MotifProvisoire"].PATIENT_INCONSCIENT]: "Patient inconscient",
    [__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$patient$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MotifProvisoire"].IDENTITE_INCONNUE]: "Identité inconnue",
    [__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$patient$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MotifProvisoire"].MINEUR_NON_ACCOMPAGNE]: "Mineur non accompagné",
    [__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$patient$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MotifProvisoire"].PANNE_SYSTEME]: "Panne système",
    [__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$patient$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MotifProvisoire"].AUTRE]: "Autre"
};
const alertNiveauLabel = {
    [__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$patient$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertNiveau"].MODEREE]: "Modérée",
    [__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$patient$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertNiveau"].FORTE]: "Forte"
};
const alertNiveauTone = {
    [__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$patient$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertNiveau"].MODEREE]: "amber",
    [__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$patient$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertNiveau"].FORTE]: "rose"
};
const alertStatusLabel = {
    [__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$patient$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertStatus"].EN_ATTENTE]: "En attente",
    [__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$patient$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertStatus"].CONFIRMEE_FUSION]: "Fusion confirmée",
    [__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$patient$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertStatus"].IGNOREE]: "Ignorée",
    [__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$patient$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertStatus"].FAUX_POSITIF]: "Faux positif"
};
const alertStatusTone = {
    [__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$patient$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertStatus"].EN_ATTENTE]: "sky",
    [__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$patient$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertStatus"].CONFIRMEE_FUSION]: "emerald",
    [__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$patient$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertStatus"].IGNOREE]: "slate",
    [__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$patient$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertStatus"].FAUX_POSITIF]: "slate"
};
const matchedFieldLabel = {
    nom: "Nom",
    prenom: "Prénom",
    dateNaissance: "Date de naissance",
    lieuNaissance: "Lieu de naissance",
    nomPere: "Nom du père",
    nomMere: "Nom de la mère",
    numero: "Téléphone",
    numSecuSocial: "N° sécurité sociale",
    genre: "Genre"
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
const initials = (nom, prenom)=>`${prenom?.[0] ?? ""}${nom?.[0] ?? ""}`.toUpperCase();
const scoreTone = (score)=>score >= 85 ? "rose" : score >= 70 ? "amber" : "slate";
}),
"[project]/apps/frontend/accueil-admin/src/features/patient/components/PatientForm.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PatientForm",
    ()=>PatientForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.7_@babel+core@7.29.0_@opentelemetry+api@1.9.1_babel-plugin-macros@3.1.0_react_3a041bc0f14497f8854c62e50408d300/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.7_@babel+core@7.29.0_@opentelemetry+api@1.9.1_babel-plugin-macros@3.1.0_react_3a041bc0f14497f8854c62e50408d300/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.7_@babel+core@7.29.0_@opentelemetry+api@1.9.1_babel-plugin-macros@3.1.0_react_3a041bc0f14497f8854c62e50408d300/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/frontend/accueil-admin/src/components/ui/Icon.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/frontend/accueil-admin/src/components/ui/Button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Field$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/frontend/accueil-admin/src/components/ui/Field.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$FormSection$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/frontend/accueil-admin/src/components/ui/FormSection.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$patient$2f$utils$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/frontend/accueil-admin/src/features/patient/utils/format.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
const PatientForm = ({ provisoire = false })=>{
    const [files, setFiles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
        onSubmit: (e)=>e.preventDefault(),
        className: "grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-5 items-start",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-5",
                children: [
                    provisoire && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Icon"], {
                                name: "alert",
                                size: 18,
                                className: "text-amber-600 shrink-0 mt-0.5"
                            }, void 0, false, {
                                fileName: "[project]/apps/frontend/accueil-admin/src/features/patient/components/PatientForm.tsx",
                                lineNumber: 19,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[13px] font-semibold text-amber-800",
                                        children: "Dossier provisoire"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/frontend/accueil-admin/src/features/patient/components/PatientForm.tsx",
                                        lineNumber: 21,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[12px] text-amber-700 mt-0.5",
                                        children: [
                                            "À utiliser en urgence lorsque l'identité ne peut être vérifiée. Le dossier devra être ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: "régularisé"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/frontend/accueil-admin/src/features/patient/components/PatientForm.tsx",
                                                lineNumber: 23,
                                                columnNumber: 103
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            " ultérieurement."
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/frontend/accueil-admin/src/features/patient/components/PatientForm.tsx",
                                        lineNumber: 22,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/frontend/accueil-admin/src/features/patient/components/PatientForm.tsx",
                                lineNumber: 20,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/frontend/accueil-admin/src/features/patient/components/PatientForm.tsx",
                        lineNumber: 18,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$FormSection$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FormSection"], {
                        step: 1,
                        title: "Identité civile",
                        description: "Informations d'état civil du patient.",
                        icon: "idCard",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Field$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                    name: "nom",
                                    label: "Nom",
                                    placeholder: "Ex. Koffi",
                                    required: !provisoire
                                }, void 0, false, {
                                    fileName: "[project]/apps/frontend/accueil-admin/src/features/patient/components/PatientForm.tsx",
                                    lineNumber: 32,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Field$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                    name: "prenom",
                                    label: "Prénom",
                                    placeholder: "Ex. Aya",
                                    required: !provisoire
                                }, void 0, false, {
                                    fileName: "[project]/apps/frontend/accueil-admin/src/features/patient/components/PatientForm.tsx",
                                    lineNumber: 33,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Field$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Select"], {
                                    name: "genre",
                                    label: "Genre",
                                    placeholder: "Sélectionner",
                                    required: true,
                                    options: [
                                        {
                                            value: "M",
                                            label: "Masculin"
                                        },
                                        {
                                            value: "F",
                                            label: "Féminin"
                                        }
                                    ]
                                }, void 0, false, {
                                    fileName: "[project]/apps/frontend/accueil-admin/src/features/patient/components/PatientForm.tsx",
                                    lineNumber: 34,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Field$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                    name: "dateNaissance",
                                    label: "Date de naissance",
                                    type: "date"
                                }, void 0, false, {
                                    fileName: "[project]/apps/frontend/accueil-admin/src/features/patient/components/PatientForm.tsx",
                                    lineNumber: 35,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Field$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                    name: "age",
                                    label: "Âge",
                                    type: "number",
                                    placeholder: "0"
                                }, void 0, false, {
                                    fileName: "[project]/apps/frontend/accueil-admin/src/features/patient/components/PatientForm.tsx",
                                    lineNumber: 36,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Field$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                    name: "lieuNaissance",
                                    label: "Lieu de naissance",
                                    placeholder: "Ex. Abidjan",
                                    leftIcon: "mapPin"
                                }, void 0, false, {
                                    fileName: "[project]/apps/frontend/accueil-admin/src/features/patient/components/PatientForm.tsx",
                                    lineNumber: 37,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/frontend/accueil-admin/src/features/patient/components/PatientForm.tsx",
                            lineNumber: 31,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/apps/frontend/accueil-admin/src/features/patient/components/PatientForm.tsx",
                        lineNumber: 30,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    provisoire && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$FormSection$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FormSection"], {
                        step: 2,
                        title: "Contexte du provisoire",
                        description: "Motif et service à l'origine du dossier.",
                        icon: "alert",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Field$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Select"], {
                                    name: "motif",
                                    label: "Motif du dossier provisoire",
                                    placeholder: "Sélectionner",
                                    required: true,
                                    options: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$patient$2f$utils$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toOptions"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$patient$2f$utils$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motifProvisoireLabel"])
                                }, void 0, false, {
                                    fileName: "[project]/apps/frontend/accueil-admin/src/features/patient/components/PatientForm.tsx",
                                    lineNumber: 44,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Field$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                    name: "serviceCreation",
                                    label: "Service de création",
                                    placeholder: "Ex. Urgences",
                                    leftIcon: "building"
                                }, void 0, false, {
                                    fileName: "[project]/apps/frontend/accueil-admin/src/features/patient/components/PatientForm.tsx",
                                    lineNumber: 45,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/frontend/accueil-admin/src/features/patient/components/PatientForm.tsx",
                            lineNumber: 43,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/apps/frontend/accueil-admin/src/features/patient/components/PatientForm.tsx",
                        lineNumber: 42,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$FormSection$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FormSection"], {
                        step: provisoire ? 3 : 2,
                        title: "Filiation & tuteur",
                        description: "Utile pour lever les doublons homonymes et les mineurs.",
                        icon: "users",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Field$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                    name: "nomPere",
                                    label: "Nom du père",
                                    placeholder: "—"
                                }, void 0, false, {
                                    fileName: "[project]/apps/frontend/accueil-admin/src/features/patient/components/PatientForm.tsx",
                                    lineNumber: 53,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Field$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                    name: "numeroPere",
                                    label: "Tél. père",
                                    placeholder: "+225 …",
                                    leftIcon: "phone"
                                }, void 0, false, {
                                    fileName: "[project]/apps/frontend/accueil-admin/src/features/patient/components/PatientForm.tsx",
                                    lineNumber: 54,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Field$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                    name: "nomMere",
                                    label: "Nom de la mère",
                                    placeholder: "—"
                                }, void 0, false, {
                                    fileName: "[project]/apps/frontend/accueil-admin/src/features/patient/components/PatientForm.tsx",
                                    lineNumber: 55,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Field$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                    name: "numeroMere",
                                    label: "Tél. mère",
                                    placeholder: "+225 …",
                                    leftIcon: "phone"
                                }, void 0, false, {
                                    fileName: "[project]/apps/frontend/accueil-admin/src/features/patient/components/PatientForm.tsx",
                                    lineNumber: 56,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Field$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                    name: "tuteur",
                                    label: "Tuteur légal",
                                    placeholder: "—"
                                }, void 0, false, {
                                    fileName: "[project]/apps/frontend/accueil-admin/src/features/patient/components/PatientForm.tsx",
                                    lineNumber: 57,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Field$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                    name: "numeroTuteur",
                                    label: "Tél. tuteur",
                                    placeholder: "+225 …",
                                    leftIcon: "phone"
                                }, void 0, false, {
                                    fileName: "[project]/apps/frontend/accueil-admin/src/features/patient/components/PatientForm.tsx",
                                    lineNumber: 58,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/frontend/accueil-admin/src/features/patient/components/PatientForm.tsx",
                            lineNumber: 52,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/apps/frontend/accueil-admin/src/features/patient/components/PatientForm.tsx",
                        lineNumber: 51,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$FormSection$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FormSection"], {
                        step: provisoire ? 4 : 3,
                        title: "Coordonnées",
                        description: "Moyens de contact du patient.",
                        icon: "phone",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Field$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                    name: "numero",
                                    label: "Téléphone principal",
                                    placeholder: "+225 …",
                                    leftIcon: "phone"
                                }, void 0, false, {
                                    fileName: "[project]/apps/frontend/accueil-admin/src/features/patient/components/PatientForm.tsx",
                                    lineNumber: 65,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Field$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                    name: "numeroSecondaire",
                                    label: "Téléphone secondaire",
                                    placeholder: "+225 …",
                                    leftIcon: "phone"
                                }, void 0, false, {
                                    fileName: "[project]/apps/frontend/accueil-admin/src/features/patient/components/PatientForm.tsx",
                                    lineNumber: 66,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Field$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                    name: "email",
                                    label: "Email",
                                    type: "email",
                                    placeholder: "nom@exemple.ci",
                                    leftIcon: "mail"
                                }, void 0, false, {
                                    fileName: "[project]/apps/frontend/accueil-admin/src/features/patient/components/PatientForm.tsx",
                                    lineNumber: 67,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "sm:col-span-2 lg:col-span-3",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Field$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                        name: "contactUrgence",
                                        label: "Contact d'urgence",
                                        placeholder: "Proche à joindre (nom + téléphone)"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/frontend/accueil-admin/src/features/patient/components/PatientForm.tsx",
                                        lineNumber: 69,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/apps/frontend/accueil-admin/src/features/patient/components/PatientForm.tsx",
                                    lineNumber: 68,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/frontend/accueil-admin/src/features/patient/components/PatientForm.tsx",
                            lineNumber: 64,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/apps/frontend/accueil-admin/src/features/patient/components/PatientForm.tsx",
                        lineNumber: 63,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$FormSection$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FormSection"], {
                        step: provisoire ? 5 : 4,
                        title: "Identifiants",
                        description: "Pièces officielles — clés de dédoublonnage.",
                        icon: "shield",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Field$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                    name: "numIdentityNational",
                                    label: "N° pièce nationale (CNI)",
                                    placeholder: "—"
                                }, void 0, false, {
                                    fileName: "[project]/apps/frontend/accueil-admin/src/features/patient/components/PatientForm.tsx",
                                    lineNumber: 77,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Field$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                    name: "numeroPassport",
                                    label: "N° passeport",
                                    placeholder: "—"
                                }, void 0, false, {
                                    fileName: "[project]/apps/frontend/accueil-admin/src/features/patient/components/PatientForm.tsx",
                                    lineNumber: 78,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Field$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                    name: "numSecuSocial",
                                    label: "N° sécurité sociale",
                                    placeholder: "—"
                                }, void 0, false, {
                                    fileName: "[project]/apps/frontend/accueil-admin/src/features/patient/components/PatientForm.tsx",
                                    lineNumber: 79,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Field$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                    name: "numCMU",
                                    label: "N° CMU",
                                    placeholder: "—"
                                }, void 0, false, {
                                    fileName: "[project]/apps/frontend/accueil-admin/src/features/patient/components/PatientForm.tsx",
                                    lineNumber: 80,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/frontend/accueil-admin/src/features/patient/components/PatientForm.tsx",
                            lineNumber: 76,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/apps/frontend/accueil-admin/src/features/patient/components/PatientForm.tsx",
                        lineNumber: 75,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$FormSection$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FormSection"], {
                        step: provisoire ? 6 : 5,
                        title: "Documents (archive dossier)",
                        description: "Numérisation des pièces justificatives.",
                        icon: "file",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "flex items-center justify-center gap-2 h-24 rounded-lg border border-dashed border-slate-300 text-[12px] text-slate-500 cursor-pointer hover:border-emerald-400 hover:text-emerald-600 transition-colors",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Icon"], {
                                        name: "upload",
                                        size: 18
                                    }, void 0, false, {
                                        fileName: "[project]/apps/frontend/accueil-admin/src/features/patient/components/PatientForm.tsx",
                                        lineNumber: 87,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    "Glisser-déposer ou choisir des fichiers",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "file",
                                        multiple: true,
                                        className: "hidden",
                                        onChange: (e)=>{
                                            const names = Array.from(e.target.files ?? []).map((f)=>f.name);
                                            if (names.length) setFiles((f)=>[
                                                    ...f,
                                                    ...names
                                                ]);
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/apps/frontend/accueil-admin/src/features/patient/components/PatientForm.tsx",
                                        lineNumber: 89,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/frontend/accueil-admin/src/features/patient/components/PatientForm.tsx",
                                lineNumber: 86,
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
                                                fileName: "[project]/apps/frontend/accueil-admin/src/features/patient/components/PatientForm.tsx",
                                                lineNumber: 103,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "flex-1 truncate",
                                                children: f
                                            }, void 0, false, {
                                                fileName: "[project]/apps/frontend/accueil-admin/src/features/patient/components/PatientForm.tsx",
                                                lineNumber: 104,
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
                                                    fileName: "[project]/apps/frontend/accueil-admin/src/features/patient/components/PatientForm.tsx",
                                                    lineNumber: 106,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/apps/frontend/accueil-admin/src/features/patient/components/PatientForm.tsx",
                                                lineNumber: 105,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, i, true, {
                                        fileName: "[project]/apps/frontend/accueil-admin/src/features/patient/components/PatientForm.tsx",
                                        lineNumber: 102,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)))
                            }, void 0, false, {
                                fileName: "[project]/apps/frontend/accueil-admin/src/features/patient/components/PatientForm.tsx",
                                lineNumber: 100,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/frontend/accueil-admin/src/features/patient/components/PatientForm.tsx",
                        lineNumber: 85,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/apps/frontend/accueil-admin/src/features/patient/components/PatientForm.tsx",
                lineNumber: 16,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                className: "xl:sticky xl:top-6 flex flex-col gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white border border-slate-200 rounded-xl shadow-sm shadow-slate-200/50 p-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-sm font-semibold text-slate-800 mb-1",
                                children: provisoire ? "Nouveau dossier provisoire" : "Nouveau patient"
                            }, void 0, false, {
                                fileName: "[project]/apps/frontend/accueil-admin/src/features/patient/components/PatientForm.tsx",
                                lineNumber: 118,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[12px] text-slate-400 mb-4",
                                children: "Un NDPU (numéro de dossier unique) sera généré automatiquement."
                            }, void 0, false, {
                                fileName: "[project]/apps/frontend/accueil-admin/src/features/patient/components/PatientForm.tsx",
                                lineNumber: 121,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                        type: "submit",
                                        leftIcon: "check",
                                        className: "w-full",
                                        children: provisoire ? "Créer le provisoire" : "Enregistrer le patient"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/frontend/accueil-admin/src/features/patient/components/PatientForm.tsx",
                                        lineNumber: 123,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/patients",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                            type: "button",
                                            variant: "outline",
                                            className: "w-full",
                                            children: "Annuler"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/frontend/accueil-admin/src/features/patient/components/PatientForm.tsx",
                                            lineNumber: 126,
                                            columnNumber: 36
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/apps/frontend/accueil-admin/src/features/patient/components/PatientForm.tsx",
                                        lineNumber: 126,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/frontend/accueil-admin/src/features/patient/components/PatientForm.tsx",
                                lineNumber: 122,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/frontend/accueil-admin/src/features/patient/components/PatientForm.tsx",
                        lineNumber: 117,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-sky-50 border border-sky-100 rounded-xl p-4 flex gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Icon"], {
                                name: "sparkles",
                                size: 18,
                                className: "text-sky-600 shrink-0 mt-0.5"
                            }, void 0, false, {
                                fileName: "[project]/apps/frontend/accueil-admin/src/features/patient/components/PatientForm.tsx",
                                lineNumber: 131,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[11px] text-sky-800 leading-relaxed",
                                children: [
                                    "À l'enregistrement, le MPI recherche automatiquement d'éventuels ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: "doublons"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/frontend/accueil-admin/src/features/patient/components/PatientForm.tsx",
                                        lineNumber: 133,
                                        columnNumber: 78
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    " (nom, date de naissance, filiation…) et signale les correspondances."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/frontend/accueil-admin/src/features/patient/components/PatientForm.tsx",
                                lineNumber: 132,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/frontend/accueil-admin/src/features/patient/components/PatientForm.tsx",
                        lineNumber: 130,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/apps/frontend/accueil-admin/src/features/patient/components/PatientForm.tsx",
                lineNumber: 116,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/apps/frontend/accueil-admin/src/features/patient/components/PatientForm.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
];

//# sourceMappingURL=apps_frontend_accueil-admin_src_f974773f._.js.map