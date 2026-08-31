import './global.css'
import React from 'react'
import Providers from './providers';
import { ThemeProvider } from '@/components/ThemeProvider';


export const metadata = {
    title : "SIH - Portail d'authentification",
    description: 'Connexion sécurisée au Système d\'Information Hospitalier' 
};

export default function RootLayout({
    children
}: {
    children : React.ReactNode
}) {
    return (
        <html lang='fr' className="h-full" suppressHydrationWarning>
            <body className='h-full bg-gray-50 text-gray-900 antialiased'>
                <ThemeProvider attribute="class" defaultTheme='system' enableSystem>
                    <Providers>
                        {children}
                    </Providers>
                </ThemeProvider>
            </body>
        </html>
    )
}