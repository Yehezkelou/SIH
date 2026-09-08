import React from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen w-full flex items-center 
        justify-center p-4 overflow-hidden
        bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100
        dark:bg-gradient-to-br dark:from-slate-950 dark:via-[#070d19] dark:to-black">
      {/* Lueur bleue diffuse au centre derrière le formulaire */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
      bg-primary/5
      w-[600px] h-[600px] dark:bg-primary/15 rounded-full blur-[140px] -z-10" />
      
      {/* Deuxième lueur violette/indigo décalée pour enrichir le dégradé */}
      <div className="absolute top-1/4 left-1/3 w-[400px] h-[400px]
      bg-indigo-500/5
       dark:bg-indigo-500/10 rounded-full blur-[120px] -z-10" />

      {/* Formulaire parfaitement centré au milieu */}
      <div className="relative w-full flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
