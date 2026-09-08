'use client';

import { useState, useEffect } from "react";

export function Time() {
    const [date, setDate] = useState<Date | null>(null);

    useEffect(() => {
        setDate(new Date());
        const timer = setInterval(() => {
            setDate(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    if (!date) {
        return <div className="h-[72px]"></div>;
    }

    const annee = date.getFullYear()
    const jourDuMois = date.getDate()

    // recupere les mois
    const moisIndex = date.getMonth();
    const nomsDesMois = [
        "Janvier",
        "Fevrier",
        "Mars",
        "Avril",
        "Mai",
        "Juin",
        "Juillet",
        "Aout",
        "Septembre",
        "Octobre",
        "Novembre",
        "Decembre"
    ]

    const mois = nomsDesMois[moisIndex]
    
    // recuperer le jour
    const jourSemaineIndex = date.getDay()
    const nomDesJours = [
        "Dimanche",
        "Lundi",
        "Mardi",
        "Mercredi",
        "Jeudi",
        "Vendredi",
        "Samedi"
    ]

    const jourSemaine = nomDesJours[jourSemaineIndex]

    // recuperer les heures 
    const heures = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const secondes = date.getSeconds().toString().padStart(2, "0");

    // recuperer les fuseaux horaires 
    const fuseauHoraire = date.getTimezoneOffset();
    const offsetHeures = Math.abs(fuseauHoraire) / 60;
    const fuseauHoraireFormatte = fuseauHoraire <= 0 ? `UTC+${offsetHeures}` : `UTC-${offsetHeures}`;

    return (
        <div className="flex flex-col items-center justify-center font-sans 
        tracking-wide select-none">

            {/* Premier bloc : L'Heure avec un style imposant */}
            <div className="text-5xl font-extrabold text-surface-text
            drop-shadow-sm tabular-nums">

                {heures}:{minutes}:{secondes}
            </div>

            {/* Second bloc : Date et Fuseau Horaire */}
            <div className="text-sm font-medium text-muted mt-1.5 capitalize flex 
            items-center gap-2">

                <span>{jourSemaine} {jourDuMois} {mois} {annee}</span>
                <span className="text-xs bg-active text-active-text px-2 py-0.5 rounded-full
                font-semibold uppercase">

                    {fuseauHoraireFormatte}
                </span>
            </div>
        </div>
    )
}