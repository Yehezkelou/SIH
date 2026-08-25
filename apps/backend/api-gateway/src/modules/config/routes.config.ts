




export interface ProxyRoute {
    prefix : string; // prefixe de la route 
    target : string; // URL de redirection du microsercice cible
    publicPaths?: {path : string, method : string}[];
    permissions?: {path : string, method : string, permission: string}[];
}

export const routesConfig : ProxyRoute[] = [
    {
        prefix : "/api/auth",
        target : process.env.AUTH_HTTP_URL || "http://localhost:3003",
        publicPaths : [
            {path : "/api/auth/login", method : "POST"},
            {path : "/api/auth/refresh", method : "POST"},
            {path : "/api/auth/mfa/verify", method : "POST"},
            {path : "/api/auth/password/reset-request", method : "POST"},
            {path : "/api/auth/password/reset", method : "POST"}
        ]
    },
    {
        prefix : "/api/patient",
        target : process.env.PATIENT_HTTP_URL || "http://localhost:3001",
        permissions : [
            { path: "/api/patient/create", method: "POST", permission: "patient:create" },
            { path: "/api/patient/update", method: "PUT", permission: "patient:update" },
            { path: "/api/patient", method: "DELETE", permission: "patient:delete" }
        ]
    },
    {
        prefix: "/api/admission",
        target: process.env.ADMISSION_HTTP_URL || "http://localhost:3002",
        permissions: [
            { path: "/api/admission", method: "POST", permission: "admission:create" },
            { path: "/api/admission", method: "PUT", permission: "admission:update" },
            { path: "/api/admission", method: "DELETE", permission: "admission:delete" }
        ]
    }

];


export function isRoutePublic(path : string, method : string): boolean {
    if(["/health", "/docs"].includes(path) || path.startsWith("/docs/")) {
        return true
    }

    for( const route of routesConfig){
        if(path.startsWith(route.prefix) && route.publicPaths){
            const isMatch = route.publicPaths.some(p => p.path === path && p.method === method);
            if(isMatch) return true
        }
    }

    return false
}

// extrait la permission requise pour un chemin et une methode donné 
export function getRequiredPermission(path : string, method : string) : string | null {

    for(const route of routesConfig){
        if(path.startsWith(route.prefix) && route.permissions){
            const match = route.permissions.find(p => p.path === path && p.method === method);
            if(match) return match.permission
        }
    }

    return null
}