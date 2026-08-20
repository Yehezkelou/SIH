module.exports = [
"[project]/apps/frontend/accueil-admin/src/components/ui/Tabs.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Tabs",
    ()=>Tabs
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
const Tabs = ({ items, defaultId })=>{
    const [active, setActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(defaultId ?? items[0]?.id);
    const current = items.find((i)=>i.id === active) ?? items[0];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-1 border-b border-slate-200 overflow-x-auto",
                children: items.map((item)=>{
                    const isActive = item.id === active;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setActive(item.id),
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$lib$2f$cn$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("relative flex items-center gap-2 px-3.5 py-2.5 text-[13px] font-medium transition-colors whitespace-nowrap -mb-px border-b-2", isActive ? "text-emerald-700 border-emerald-600" : "text-slate-500 border-transparent hover:text-slate-800 hover:border-slate-300"),
                        children: [
                            item.icon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Icon"], {
                                name: item.icon,
                                size: 15
                            }, void 0, false, {
                                fileName: "[project]/apps/frontend/accueil-admin/src/components/ui/Tabs.tsx",
                                lineNumber: 35,
                                columnNumber: 29
                            }, ("TURBOPACK compile-time value", void 0)),
                            item.label,
                            item.badge !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$lib$2f$cn$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("text-[10px] font-semibold px-1.5 py-0.5 rounded-full", isActive ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"),
                                children: item.badge
                            }, void 0, false, {
                                fileName: "[project]/apps/frontend/accueil-admin/src/components/ui/Tabs.tsx",
                                lineNumber: 38,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, item.id, true, {
                        fileName: "[project]/apps/frontend/accueil-admin/src/components/ui/Tabs.tsx",
                        lineNumber: 25,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0));
                })
            }, void 0, false, {
                fileName: "[project]/apps/frontend/accueil-admin/src/components/ui/Tabs.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: current?.content
            }, void 0, false, {
                fileName: "[project]/apps/frontend/accueil-admin/src/components/ui/Tabs.tsx",
                lineNumber: 51,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/apps/frontend/accueil-admin/src/components/ui/Tabs.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/apps/frontend/accueil-admin/src/components/ui/EmptyState.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EmptyState",
    ()=>EmptyState
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.7_@babel+core@7.29.0_@opentelemetry+api@1.9.1_babel-plugin-macros@3.1.0_react_3a041bc0f14497f8854c62e50408d300/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/frontend/accueil-admin/src/components/ui/Icon.tsx [app-ssr] (ecmascript)");
;
;
const EmptyState = ({ icon = "clipboard", title, description, action })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col items-center justify-center text-center gap-2 py-14 px-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "grid place-items-center w-12 h-12 rounded-full bg-slate-100 text-slate-400 mb-1",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Icon"], {
                    name: icon,
                    size: 22
                }, void 0, false, {
                    fileName: "[project]/apps/frontend/accueil-admin/src/components/ui/EmptyState.tsx",
                    lineNumber: 17,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/apps/frontend/accueil-admin/src/components/ui/EmptyState.tsx",
                lineNumber: 16,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm font-semibold text-slate-700",
                children: title
            }, void 0, false, {
                fileName: "[project]/apps/frontend/accueil-admin/src/components/ui/EmptyState.tsx",
                lineNumber: 19,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-[12px] text-slate-400 max-w-xs",
                children: description
            }, void 0, false, {
                fileName: "[project]/apps/frontend/accueil-admin/src/components/ui/EmptyState.tsx",
                lineNumber: 20,
                columnNumber: 21
            }, ("TURBOPACK compile-time value", void 0)),
            action && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-2",
                children: action
            }, void 0, false, {
                fileName: "[project]/apps/frontend/accueil-admin/src/components/ui/EmptyState.tsx",
                lineNumber: 21,
                columnNumber: 16
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/apps/frontend/accueil-admin/src/components/ui/EmptyState.tsx",
        lineNumber: 15,
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
"[project]/apps/frontend/accueil-admin/src/components/ui/Badge.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Badge",
    ()=>Badge
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.7_@babel+core@7.29.0_@opentelemetry+api@1.9.1_babel-plugin-macros@3.1.0_react_3a041bc0f14497f8854c62e50408d300/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$lib$2f$cn$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/frontend/accueil-admin/src/lib/cn.ts [app-ssr] (ecmascript)");
;
;
const tones = {
    slate: "bg-slate-100 text-slate-600 border-slate-200",
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-200",
    sky: "bg-sky-50 text-sky-700 border-sky-200",
    amber: "bg-amber-50 text-amber-700 border-amber-200",
    rose: "bg-rose-50 text-rose-700 border-rose-200",
    violet: "bg-violet-50 text-violet-700 border-violet-200",
    indigo: "bg-indigo-50 text-indigo-700 border-indigo-200"
};
const Badge = ({ children, tone = "slate", dot, className })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$lib$2f$cn$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[11px] font-semibold whitespace-nowrap", tones[tone], className),
        children: [
            dot && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "w-1.5 h-1.5 rounded-full bg-current opacity-70"
            }, void 0, false, {
                fileName: "[project]/apps/frontend/accueil-admin/src/components/ui/Badge.tsx",
                lineNumber: 31,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/apps/frontend/accueil-admin/src/components/ui/Badge.tsx",
        lineNumber: 24,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
}),
"[project]/apps/frontend/accueil-admin/src/features/admission/components/StatusBadges.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AdmissionStatusBadge",
    ()=>AdmissionStatusBadge,
    "AdmissionTypeBadge",
    ()=>AdmissionTypeBadge
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.7_@babel+core@7.29.0_@opentelemetry+api@1.9.1_babel-plugin-macros@3.1.0_react_3a041bc0f14497f8854c62e50408d300/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/frontend/accueil-admin/src/components/ui/Badge.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$admission$2f$utils$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/frontend/accueil-admin/src/features/admission/utils/format.ts [app-ssr] (ecmascript)");
;
;
;
const AdmissionStatusBadge = ({ status })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
        tone: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$admission$2f$utils$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["admissionStatusTone"][status],
        dot: true,
        children: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$admission$2f$utils$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["admissionStatusLabel"][status]
    }, void 0, false, {
        fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/StatusBadges.tsx",
        lineNumber: 7,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
const AdmissionTypeBadge = ({ type })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
        tone: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$admission$2f$utils$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["admissionTypeTone"][type],
        children: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$admission$2f$utils$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["admissionTypeLabel"][type]
    }, void 0, false, {
        fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/StatusBadges.tsx",
        lineNumber: 13,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
}),
"[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionDetail.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AdmissionDetail",
    ()=>AdmissionDetail,
    "AdmissionSummaryBanner",
    ()=>AdmissionSummaryBanner
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.7_@babel+core@7.29.0_@opentelemetry+api@1.9.1_babel-plugin-macros@3.1.0_react_3a041bc0f14497f8854c62e50408d300/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/frontend/accueil-admin/src/components/ui/Icon.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Tabs$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/frontend/accueil-admin/src/components/ui/Tabs.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$EmptyState$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/frontend/accueil-admin/src/components/ui/EmptyState.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$admission$2f$utils$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/frontend/accueil-admin/src/features/admission/utils/format.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$admission$2f$components$2f$StatusBadges$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/frontend/accueil-admin/src/features/admission/components/StatusBadges.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
const InfoRow = ({ label, value, icon })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-start gap-3 py-2.5",
        children: [
            icon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "grid place-items-center w-8 h-8 rounded-lg bg-slate-100 text-slate-400 shrink-0",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Icon"], {
                    name: icon,
                    size: 15
                }, void 0, false, {
                    fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionDetail.tsx",
                    lineNumber: 15,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionDetail.tsx",
                lineNumber: 14,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "min-w-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[11px] text-slate-400 uppercase tracking-wide",
                        children: label
                    }, void 0, false, {
                        fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionDetail.tsx",
                        lineNumber: 19,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[13px] font-medium text-slate-700",
                        children: value ?? "—"
                    }, void 0, false, {
                        fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionDetail.tsx",
                        lineNumber: 20,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionDetail.tsx",
                lineNumber: 18,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionDetail.tsx",
        lineNumber: 12,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
const SectionCard = ({ title, children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white border border-slate-200 rounded-xl shadow-sm shadow-slate-200/50",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-4 py-3 border-b border-slate-100",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "text-[13px] font-semibold text-slate-800",
                    children: title
                }, void 0, false, {
                    fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionDetail.tsx",
                    lineNumber: 28,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionDetail.tsx",
                lineNumber: 27,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4",
                children: children
            }, void 0, false, {
                fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionDetail.tsx",
                lineNumber: 30,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionDetail.tsx",
        lineNumber: 26,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
const AdmissionDetail = ({ admission: a })=>{
    const summary = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid grid-cols-1 lg:grid-cols-2 gap-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionCard, {
                title: "Informations patient",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "divide-y divide-slate-50",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoRow, {
                            label: "Nom complet",
                            value: a.patientName,
                            icon: "idCard"
                        }, void 0, false, {
                            fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionDetail.tsx",
                            lineNumber: 39,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoRow, {
                            label: "N° dossier",
                            value: a.numeroPatient,
                            icon: "clipboard"
                        }, void 0, false, {
                            fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionDetail.tsx",
                            lineNumber: 40,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoRow, {
                            label: "Sexe / Âge",
                            value: `${a.sex === "F" ? "Féminin" : "Masculin"} · ${a.age ?? "—"} ans`,
                            icon: "users"
                        }, void 0, false, {
                            fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionDetail.tsx",
                            lineNumber: 41,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionDetail.tsx",
                    lineNumber: 38,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionDetail.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionCard, {
                title: "Détails de l'admission",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "divide-y divide-slate-50",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoRow, {
                            label: "Service",
                            value: a.department,
                            icon: "building"
                        }, void 0, false, {
                            fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionDetail.tsx",
                            lineNumber: 46,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoRow, {
                            label: "Médecin référent",
                            value: a.doctorName,
                            icon: "stethoscope"
                        }, void 0, false, {
                            fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionDetail.tsx",
                            lineNumber: 47,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoRow, {
                            label: "Date d'admission",
                            value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$admission$2f$utils$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatDateTime"])(a.admissionDate),
                            icon: "calendar"
                        }, void 0, false, {
                            fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionDetail.tsx",
                            lineNumber: 48,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoRow, {
                            label: "Sortie prévue",
                            value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$admission$2f$utils$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatDateTime"])(a.expectedDischarge),
                            icon: "clock"
                        }, void 0, false, {
                            fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionDetail.tsx",
                            lineNumber: 49,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionDetail.tsx",
                    lineNumber: 45,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionDetail.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "lg:col-span-2",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionCard, {
                    title: "Motif d'admission",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[13px] text-slate-600 leading-relaxed",
                        children: a.reason ?? "Aucun motif renseigné."
                    }, void 0, false, {
                        fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionDetail.tsx",
                        lineNumber: 54,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionDetail.tsx",
                    lineNumber: 53,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionDetail.tsx",
                lineNumber: 52,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionDetail.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
    const companions = a.companions.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
        children: a.companions.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3 shadow-sm shadow-slate-200/50",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "grid place-items-center w-10 h-10 rounded-full bg-slate-100 text-slate-500 text-[12px] font-bold",
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$admission$2f$utils$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["initials"])(c.fullName)
                    }, void 0, false, {
                        fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionDetail.tsx",
                        lineNumber: 65,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "min-w-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[13px] font-semibold text-slate-800 truncate",
                                children: c.fullName
                            }, void 0, false, {
                                fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionDetail.tsx",
                                lineNumber: 69,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[12px] text-slate-500",
                                children: [
                                    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$admission$2f$utils$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["relationshipLabel"][c.relationship],
                                    " · ",
                                    c.phone ?? "—"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionDetail.tsx",
                                lineNumber: 70,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionDetail.tsx",
                        lineNumber: 68,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, c.id, true, {
                fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionDetail.tsx",
                lineNumber: 64,
                columnNumber: 11
            }, ("TURBOPACK compile-time value", void 0)))
    }, void 0, false, {
        fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionDetail.tsx",
        lineNumber: 62,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white border border-slate-200 rounded-xl",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$EmptyState$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EmptyState"], {
            icon: "users",
            title: "Aucun accompagnant"
        }, void 0, false, {
            fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionDetail.tsx",
            lineNumber: 76,
            columnNumber: 68
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionDetail.tsx",
        lineNumber: 76,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
    const payers = a.payers.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white border border-slate-200 rounded-xl shadow-sm shadow-slate-200/50 overflow-hidden",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
            className: "w-full text-left",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                    className: "bg-slate-50 border-b border-slate-200",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                        children: [
                            "Type",
                            "Nom / Organisme",
                            "N° police",
                            "Couverture",
                            "Plafond",
                            "Valide jusqu'au"
                        ].map((h)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                className: "px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-slate-500",
                                children: h
                            }, h, false, {
                                fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionDetail.tsx",
                                lineNumber: 86,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)))
                    }, void 0, false, {
                        fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionDetail.tsx",
                        lineNumber: 84,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionDetail.tsx",
                    lineNumber: 83,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                    className: "divide-y divide-slate-100",
                    children: a.payers.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                            className: "text-[13px] text-slate-600",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    className: "px-4 py-3 font-medium text-slate-800",
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$admission$2f$utils$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["payerTypeLabel"][p.payerType]
                                }, void 0, false, {
                                    fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionDetail.tsx",
                                    lineNumber: 93,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    className: "px-4 py-3",
                                    children: p.name
                                }, void 0, false, {
                                    fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionDetail.tsx",
                                    lineNumber: 94,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    className: "px-4 py-3 font-mono text-[12px]",
                                    children: p.policyNumber ?? "—"
                                }, void 0, false, {
                                    fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionDetail.tsx",
                                    lineNumber: 95,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    className: "px-4 py-3",
                                    children: p.coveragePercentage != null ? `${p.coveragePercentage}%` : "—"
                                }, void 0, false, {
                                    fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionDetail.tsx",
                                    lineNumber: 96,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    className: "px-4 py-3",
                                    children: p.coverageLimit != null ? `${p.coverageLimit.toLocaleString("fr-FR")} F` : "—"
                                }, void 0, false, {
                                    fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionDetail.tsx",
                                    lineNumber: 97,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    className: "px-4 py-3",
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$admission$2f$utils$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatDate"])(p.validUntil)
                                }, void 0, false, {
                                    fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionDetail.tsx",
                                    lineNumber: 98,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, p.id, true, {
                            fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionDetail.tsx",
                            lineNumber: 92,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0)))
                }, void 0, false, {
                    fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionDetail.tsx",
                    lineNumber: 90,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionDetail.tsx",
            lineNumber: 82,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionDetail.tsx",
        lineNumber: 81,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white border border-slate-200 rounded-xl",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$EmptyState$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EmptyState"], {
            icon: "creditCard",
            title: "Aucun payeur",
            description: "Aucune prise en charge financière n'a été enregistrée."
        }, void 0, false, {
            fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionDetail.tsx",
            lineNumber: 105,
            columnNumber: 68
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionDetail.tsx",
        lineNumber: 105,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
    const documents = a.documents.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3",
        children: a.documents.map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white border border-slate-200 rounded-xl p-4 shadow-sm shadow-slate-200/50 flex items-start gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "grid place-items-center w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 shrink-0",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Icon"], {
                            name: "file",
                            size: 18
                        }, void 0, false, {
                            fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionDetail.tsx",
                            lineNumber: 114,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionDetail.tsx",
                        lineNumber: 113,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "min-w-0 flex-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[12px] font-semibold text-slate-800 truncate",
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$admission$2f$utils$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["documentTypeLabel"][d.documentType]
                            }, void 0, false, {
                                fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionDetail.tsx",
                                lineNumber: 117,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[11px] text-slate-400 truncate",
                                children: d.fileName
                            }, void 0, false, {
                                fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionDetail.tsx",
                                lineNumber: 118,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[11px] text-slate-400 mt-1",
                                children: [
                                    d.size,
                                    " · ",
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$admission$2f$utils$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatDate"])(d.uploadedAt)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionDetail.tsx",
                                lineNumber: 119,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionDetail.tsx",
                        lineNumber: 116,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "text-slate-400 hover:text-emerald-600",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Icon"], {
                            name: "download",
                            size: 16
                        }, void 0, false, {
                            fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionDetail.tsx",
                            lineNumber: 121,
                            columnNumber: 71
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionDetail.tsx",
                        lineNumber: 121,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, d.id, true, {
                fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionDetail.tsx",
                lineNumber: 112,
                columnNumber: 11
            }, ("TURBOPACK compile-time value", void 0)))
    }, void 0, false, {
        fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionDetail.tsx",
        lineNumber: 110,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white border border-slate-200 rounded-xl",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$EmptyState$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EmptyState"], {
            icon: "file",
            title: "Aucun document",
            description: "Aucune pièce justificative n'a été téléversée."
        }, void 0, false, {
            fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionDetail.tsx",
            lineNumber: 126,
            columnNumber: 68
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionDetail.tsx",
        lineNumber: 126,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
    const stay = a.encounter ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionCard, {
        title: "Séjour en cours",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-2 sm:grid-cols-3 gap-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoRow, {
                    label: "N° séjour",
                    value: a.encounter.encounterNumber,
                    icon: "clipboard"
                }, void 0, false, {
                    fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionDetail.tsx",
                    lineNumber: 132,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoRow, {
                    label: "Statut",
                    value: a.encounter.encounterStatus,
                    icon: "activity"
                }, void 0, false, {
                    fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionDetail.tsx",
                    lineNumber: 133,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoRow, {
                    label: "Service",
                    value: a.encounter.currentDepartment,
                    icon: "building"
                }, void 0, false, {
                    fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionDetail.tsx",
                    lineNumber: 134,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoRow, {
                    label: "Chambre",
                    value: a.encounter.currentRoom,
                    icon: "bed"
                }, void 0, false, {
                    fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionDetail.tsx",
                    lineNumber: 135,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoRow, {
                    label: "Lit",
                    value: a.encounter.currentBed,
                    icon: "bed"
                }, void 0, false, {
                    fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionDetail.tsx",
                    lineNumber: 136,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoRow, {
                    label: "Début",
                    value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$admission$2f$utils$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatDateTime"])(a.encounter.startDate),
                    icon: "calendar"
                }, void 0, false, {
                    fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionDetail.tsx",
                    lineNumber: 137,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionDetail.tsx",
            lineNumber: 131,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionDetail.tsx",
        lineNumber: 130,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white border border-slate-200 rounded-xl",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$EmptyState$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EmptyState"], {
            icon: "bed",
            title: "Aucun séjour actif",
            description: "Ce dossier n'a pas encore de séjour d'hospitalisation ouvert."
        }, void 0, false, {
            fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionDetail.tsx",
            lineNumber: 141,
            columnNumber: 66
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionDetail.tsx",
        lineNumber: 141,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$components$2f$ui$2f$Tabs$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tabs"], {
        items: [
            {
                id: "resume",
                label: "Résumé",
                icon: "clipboard",
                content: summary
            },
            {
                id: "sejour",
                label: "Séjour",
                icon: "bed",
                content: stay
            },
            {
                id: "accompagnants",
                label: "Accompagnants",
                icon: "users",
                badge: a.companions.length,
                content: companions
            },
            {
                id: "payeurs",
                label: "Payeurs",
                icon: "creditCard",
                badge: a.payers.length,
                content: payers
            },
            {
                id: "documents",
                label: "Documents",
                icon: "file",
                badge: a.documents.length,
                content: documents
            }
        ]
    }, void 0, false, {
        fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionDetail.tsx",
        lineNumber: 145,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const AdmissionSummaryBanner = ({ admission: a })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white border border-slate-200 rounded-xl shadow-sm shadow-slate-200/50 p-5 flex flex-col sm:flex-row sm:items-center gap-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "grid place-items-center w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 text-lg font-bold shrink-0",
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$admission$2f$utils$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["initials"])(a.patientName)
            }, void 0, false, {
                fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionDetail.tsx",
                lineNumber: 160,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "min-w-0 flex-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-lg font-bold text-slate-800",
                                children: a.patientName
                            }, void 0, false, {
                                fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionDetail.tsx",
                                lineNumber: 165,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$admission$2f$components$2f$StatusBadges$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdmissionStatusBadge"], {
                                status: a.admissionStatus
                            }, void 0, false, {
                                fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionDetail.tsx",
                                lineNumber: 166,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$admission$2f$components$2f$StatusBadges$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdmissionTypeBadge"], {
                                type: a.admissionType
                            }, void 0, false, {
                                fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionDetail.tsx",
                                lineNumber: 167,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionDetail.tsx",
                        lineNumber: 164,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[12px] text-slate-500 mt-1 flex flex-wrap items-center gap-x-3 gap-y-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-mono",
                                children: a.admissionNumber
                            }, void 0, false, {
                                fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionDetail.tsx",
                                lineNumber: 170,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    "· Dossier ",
                                    a.numeroPatient
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionDetail.tsx",
                                lineNumber: 171,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    "· ",
                                    a.department ?? "—"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionDetail.tsx",
                                lineNumber: 172,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$7_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$1_babel$2d$plugin$2d$macros$40$3$2e$1$2e$0_react_3a041bc0f14497f8854c62e50408d300$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    "· Admis le ",
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$accueil$2d$admin$2f$src$2f$features$2f$admission$2f$utils$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatDateTime"])(a.admissionDate)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionDetail.tsx",
                                lineNumber: 173,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionDetail.tsx",
                        lineNumber: 169,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionDetail.tsx",
                lineNumber: 163,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/apps/frontend/accueil-admin/src/features/admission/components/AdmissionDetail.tsx",
        lineNumber: 159,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
}),
];

//# sourceMappingURL=apps_frontend_accueil-admin_src_a7eea4e5._.js.map