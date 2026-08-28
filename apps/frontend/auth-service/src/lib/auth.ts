import Cookie from "js-cookie"

export interface UserSession {
    sub: string;
    matricule: string;
    email: string;
    role: string[];
    permission: string[]
}


// decode token 
export function decodeToken(token: string): UserSession | null {
    try {

        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16).slice(-2)))
                .join('')
        );
        return JSON.parse(jsonPayload)
    } catch (error) {
        return null
    }
}

// enregister session 
const AUTH_COOKIE_TOKEN = "auth-token-cookie";
const AUTH_COOKIE_REFRESH = "auth-refresh-cookie";

export const authStorage = {

    // enregistrer la session
    setSession(accessToken : string, refreshToken : string){
        Cookie.set(AUTH_COOKIE_TOKEN, accessToken, {secure : true, sameSite: "Strict"})
        Cookie.set(AUTH_COOKIE_REFRESH, refreshToken, {secure : true, sameSite : 'strict', expires : 7})
    },

    // get AccessToken
    getAccessToken(): string | undefined {
        return Cookie.get(AUTH_COOKIE_TOKEN)
    },

    // get RefreshToken
    getRefreshToken(): string | undefined {
        return Cookie.get(AUTH_COOKIE_REFRESH)
    },

    // remove session
    removeSession() {
        Cookie.remove(AUTH_COOKIE_TOKEN);
        Cookie.remove(AUTH_COOKIE_REFRESH);
    },

    // get user info
    getUser() : UserSession | null {
        const token = this.getAccessToken()
        return token ? decodeToken(token) : null
    }

    
}