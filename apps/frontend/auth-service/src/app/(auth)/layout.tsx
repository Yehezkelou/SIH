import React from 'react';
import illustrationImg from '../../../public/image/pexels-steve-28494623.jpg';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 overflow-hidden">
      {/* Image de fond remplissant toute la page */}
      <img
        src={illustrationImg.src}
        alt="Illustration"
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />

      {/* Voile assombrissant optionnel pour faire ressortir le formulaire */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] -z-10" />

      {/* Formulaire parfaitement centré au milieu */}
      <div className="relative z-10 w-full max-w-md">
        {children}
      </div>
    </div>
  );
}
