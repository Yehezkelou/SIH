type Props = 

// Route publiques
    'LOGIN' |
    'MFA' |
    'FORGOT_PASSWORD' |
    'RESET_PASSWORD'  |

// Zone d'administration 
    'ADMIN_USERS' |
    'ADMIN_USERS_NEW' |

// Acceuil 
    'HOME' 


export const ROUTES : Record<Props , string> = {
    LOGIN: '/login',
    MFA : '/mfa',
    FORGOT_PASSWORD : '/forgot-password',
    RESET_PASSWORD : '/reset-password',

    // Zone d'administration 
    ADMIN_USERS : '/admin/users',
    ADMIN_USERS_NEW : '/admin/users/new',

    // Acceuil 
    HOME : '/'
} as const 