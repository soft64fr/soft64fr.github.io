'use strict';

import { calculateTimeRemaining } from './modules/countdown/TimeCalculator.js';
import { updateTimeDisplay, showWelcomeMessage } from './modules/countdown/UIUpdater.js';
import * as Localization from './modules/i18n/localization-core.js';
import '../style.css'

const TARGET_DATE = new Date('2026-03-31T00:00:00').getTime();
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
 * Gère le chargement asynchrone et le démarrage.
 */
async function startApp() {
    await Localization.initializeI18n();
    countdown();
    if (timerId === null) {
        timerId = setInterval(countdown, INTERVAL_MS);
    }
    window.addEventListener('languageChanged', countdown);
}
startApp();