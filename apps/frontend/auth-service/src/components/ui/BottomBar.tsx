'use client';

import React, { useState, useEffect } from "react";
import { 
    HelpCircle, 
    CloudSun, 
    Wind, 
    Droplets, 
    Sun, 
    Cloud, 
    CloudDrizzle, 
    CloudRain, 
    CloudLightning, 
    Moon,
    Book,
    Info
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useTheme } from "next-themes";

interface WeatherData {
    temperature: number;
    city: string;
    condition: string;
    windSpeed: number;
    humidity: number;
    weatherCode: number;
}

export function BottomBar() {
    const [hoverHelp, setHoverHelp] = useState(false);
    const [hoverWeather, setHoverWeather] = useState(false);
    const [mounted, setMounted] = useState(false);
    
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loadingWeather, setLoadingWeather] = useState(true);

    useEffect(() => {
        setMounted(true);
        
        const fetchWeather = async () => {
            try {
                // Coordonnées géographiques d'Abidjan : latitude 5.3096, longitude -4.0127
                const response = await axios.get("https://api.open-meteo.com/v1/forecast", {
                    params: {
                        latitude: 5.3096,
                        longitude: -4.0127,
                        current: "temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m"
                    }
                });

                const data = response.data;
                const current = data.current;
                
                // Mappage des codes de météo de l'OMM (Organisation météorologique mondiale)
                let condition = "Éclaircies";
                const code = current.weather_code;
                if (code === 0) condition = "Ensoleillé";
                else if (code >= 1 && code <= 3) condition = "Éclaircies";
                else if (code === 45 || code === 48) condition = "Brouillard";
                else if (code >= 51 && code <= 55) condition = "Bruine";
                else if (code >= 61 && code <= 65) condition = "Pluie";
                else if (code >= 80 && code <= 82) condition = "Averses de pluie";
                else if (code >= 95) condition = "Orageux";

                setWeather({
                    temperature: Math.round(current.temperature_2m),
                    city: "Abidjan",
                    condition,
                    windSpeed: Math.round(current.wind_speed_10m),
                    humidity: current.relative_humidity_2m,
                    weatherCode: code
                });
            } catch (err) {
                console.error("Erreur météo :", err);
                // Valeurs par défaut en cas d'erreur de requête
                setWeather({
                    temperature: 23,
                    city: "Abidjan",
                    condition: "Éclaircies",
                    windSpeed: 14,
                    humidity: 82,
                    weatherCode: 2
                });
            } finally {
                setLoadingWeather(false);
            }
        };

        fetchWeather();
    }, []);

    const getWeatherIcon = (code: number) => {
        if (code === 0) return <Sun className="h-10 w-10 text-amber-500 animate-pulse" />;
        if (code >= 1 && code <= 3) return <CloudSun className="h-10 w-10 text-amber-500 animate-pulse" />;
        if (code === 45 || code === 48) return <Cloud className="h-10 w-10 text-gray-400" />;
        if (code >= 51 && code <= 55) return <CloudDrizzle className="h-10 w-10 text-sky-400" />;
        if (code >= 61 && code <= 65) return <CloudRain className="h-10 w-10 text-blue-500" />;
        if (code >= 80 && code <= 82) return <CloudRain className="h-10 w-10 text-blue-500" />;
        if (code >= 95) return <CloudLightning className="h-10 w-10 text-yellow-500" />;
        return <CloudSun className="h-10 w-10 text-amber-500 animate-pulse" />;
    };

    if (!mounted) {
        return (
            <div className="w-full flex items-center justify-between px-6 py-4 select-none">
                <div className="h-12 w-28 bg-gray-100 dark:bg-slate-800 rounded-2xl animate-pulse"></div>
                <div className="h-10 w-10 bg-gray-100 dark:bg-slate-800 rounded-full animate-pulse"></div>
            </div>
        );
    }

    // changement theme 
    const {resolvedTheme , setTheme} = useTheme()

    return (
        <div className="w-full flex items-center justify-between px-6 py-4 select-none">
            {/* Gauche : Widget Météo */}
            <div 
                className="relative flex flex-col items-start"
                onMouseEnter={() => setHoverWeather(true)}
                onMouseLeave={() => setHoverWeather(false)}
            >
                {loadingWeather || !weather ? (
                    <div className="h-12 w-28 bg-slate-100 dark:bg-slate-800 rounded-2xl animate-pulse"></div>
                ) : (
                    <div className="flex items-center gap-3 px-4 py-2 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800/80 cursor-pointer transition-all duration-200">
                        {getWeatherIcon(weather.weatherCode)}
                        <div className="flex flex-col">
                            <span className="text-2xl font-extrabold text-gray-800 dark:text-gray-200 leading-none">
                                {weather.temperature}°C
                            </span>
                            <span className="text-xs text-gray-400 font-semibold mt-1">
                                {weather.city}
                            </span>
                        </div>
                    </div>
                )}

                <AnimatePresence>
                    {hoverWeather && weather && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute bottom-16 left-2 w-52 p-3 bg-slate-900/95 backdrop-blur-md rounded-lg border border-white/10 shadow-xl text-white text-xs z-50 flex flex-col gap-2"
                        >
                            <span className="font-semibold border-b border-white/10 pb-1 mb-1">
                                Météo {weather.city}
                            </span>
                            <div className="flex justify-between items-center text-slate-300">
                                <span>Condition :</span>
                                <span className="font-medium text-white">{weather.condition}</span>
                            </div>
                            <div className="flex justify-between items-center text-slate-300">
                                <span className="flex items-center gap-1"><Wind size={12} className="text-sky-400" /> Vent :</span>
                                <span className="font-medium text-white">{weather.windSpeed} km/h</span>
                            </div>
                            <div className="flex justify-between items-center text-slate-300">
                                <span className="flex items-center gap-1"><Droplets size={12} className="text-blue-400" /> Humidité :</span>
                                <span className="font-medium text-white">{weather.humidity}%</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Droite : Bouton d'aide / option */}
            <div 
                className="relative flex flex-col items-end"
                onMouseEnter={() => setHoverHelp(true)}
                onMouseLeave={() => setHoverHelp(false)}
            >
                <AnimatePresence>
                    {hoverHelp && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute bottom-12 right-0 w-48 p-3 bg-slate-900/95 backdrop-blur-md rounded-lg border border-white/10 shadow-xl text-white text-xs z-50 flex flex-col gap-2"
                        >
                            <div className="px-2 py-1 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                Plus d'options
                            </div>
                            <motion.button 
                                whileHover={{x: 4, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full flex items-center rounded-lg text-left hover:text-blue-400 transition-colors
                                text-slate-200 space-x-3 px-3 py-2 pt-2"
                            >
                                <Book className="h-4 w-4 text-blue-400"/>
                                <span>Document</span>
                            </motion.button>
                            <motion.button 
                                whileHover={{x: 4, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left hover:text-blue-400 transition-colors
                                text-slate-200 pt-2"
                            >
                                <Info className="h-4 w-4 text-blue-400"/>
                                <span>A propos</span>
                            </motion.button>
                            
                            <motion.button
                                whileHover={{ x: 4, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left hover:text-blue-400 transition-colors text-slate-200 border-t border-white/10 pt-2 mt-1 rounded-t-none"
                                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                            >
                                {resolvedTheme === "dark" ? (
                                    <>
                                        <Sun className="h-4 w-4 text-yellow-400" />
                                        <span>Mode clair</span>
                                    </>
                                ) : (
                                    <>
                                        <Moon className="h-4 w-4 text-blue-400" />
                                        <span>Mode sombre</span>
                                    </>
                                )}
                            </motion.button>
                            
                        </motion.div>
                    )}
                </AnimatePresence>

                <button
                    className="p-2.5 rounded-full shadow-md backdrop-blur-md flex items-center justify-center transition-all border bg-white/80 text-slate-800 border-slate-200 hover:bg-slate-100"
                    title="Options d'aide"
                >
                    <HelpCircle size={20} />
                </button>
            </div>
        </div>
    );
}
