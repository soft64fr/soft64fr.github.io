'use strict';

import 'whatwg-fetch';
import "core-js/stable/promise";
import "regenerator-runtime/runtime"; 
import { calculateTimeRemaining } from './modules/countdown/TimeCalculator.js';
import { updateTimeDisplay, showWelcomeMessage } from './modules/countdown/UIUpdater.js';
import * as Localization from './modules/i18n/localization-core.js';
import '../style.css'

const TARGET_DATE = new Date(2026, 2, 31, 0, 0, 0).getTime(); 
const INTERVAL_MS = 1000;
let timerId = null;

/**
 * Fonction principale du compte à rebours, appelée à chaque intervalle.
 * Cette fonction orchestre le calcul et l'affichage.
 */
const countdown = () => {
    const timeRemaining = calculateTimeRemaining(TARGET_DATE);
    if (timeRemaining.distance < 0) {
        showWelcomeMessage(Localization.t); 
        if (timerId !== null) {
            clearInterval(timerId);
            timerId = null;
        }
        return;
    }
    updateTimeDisplay(timeRemaining);
};

/**
 * Fonction d'initialisation de l'application.
 * Gère le chargement asynchrone et le démarrage en utilisant .then() pour la compatibilité.
 */
function startApp() {
    // CORRECTION IE10/11 (3): Remplacement de async/await par une chaîne de Promesses robuste
    try {
        Localization.initializeI18n()
            .catch(error => {
                // Gère l'erreur de Promesse sans bloquer le thread.
                console.error("Localization failed to initialize, continuing without I18n:", error);
            })
            .finally(() => {
                // Le compteur démarre toujours, que la localisation ait réussi ou échoué.
                countdown();
                if (timerId === null) {
                    timerId = setInterval(countdown, INTERVAL_MS);
                }
                window.addEventListener('languageChanged', countdown);
            });
    } catch (e) {
        // Fallback ultime si l'initialisation du module échoue complètement.
        console.error("Fatal initialization error (JS environment issue):", e);
        countdown();
        if (timerId === null) {
            timerId = setInterval(countdown, INTERVAL_MS);
        }
    }
}
// Démarrage de l'application
startApp();