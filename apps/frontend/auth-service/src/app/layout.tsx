import './global.css'
import React from 'react'
import Providers from './providers';
import { ThemeProvider } from '@/components/ThemeProvider';
import {Poppins} from "next/font/google"

const poppins = Poppins({
    subsets : ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    variable: "--font-sans"
})

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
        <html lang='fr' className={`${poppins.variable} h-full`} suppressHydrationWarning>
            <body className='h-full bg-page text-page-text font-sans antialiased'>
                <ThemeProvider attribute="class" defaultTheme='system' enableSystem>
                    <Providers>
                        {children}
                    </Providers>
                </ThemeProvider>
            </body>
        </html>
    )
}