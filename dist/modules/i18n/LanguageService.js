'use strict';

const DEFAULT_LANG = 'en';
const SUPPORTED_LANGS = ['fr', 'en'];
let currentLanguage = DEFAULT_LANG;

/**
 * Retourne le code de la langue actuellement active dans l'application.
 * @returns {string} Le code de langue actuel (ex: 'fr', 'en').
 */
export function getCurrentLanguage() {
    return currentLanguage;
}

/**
 * Met à jour le code de la langue actuellement active dans l'application.
 * @param {string} langCode - Nouveau code de langue.
 */
export function setCurrentLanguage(langCode) {
    currentLanguage = langCode;
}

/**
 * Tente de déterminer la langue de l'utilisateur.
 * Priorise la langue stockée (sessionStorage) ou la langue du navigateur.
 *
 * NOTE IMPORTANTE : La vérification `if (navigator.language)` est essentielle
 * pour la compatibilité avec Internet Explorer 10/11, où `navigator.language`
 * peut être 'undefined' ou 'null', provoquant l'erreur `split`.
 *
 * @returns {string} Le code de langue préféré (ex: 'fr', 'en').
 */
export function getPreferredLanguage() {
    const storedLang = sessionStorage.getItem('soft64.fr_user_lang');
    if (storedLang && SUPPORTED_LANGS.includes(storedLang)) {
        return storedLang;
    }
    // 🛠️ CORRECTION POUR IE10/11: Vérifie si navigator.language existe avant d'appeler split().
    if (navigator.language) {
        // Dans les navigateurs modernes, cela fonctionne
        const browserLang = navigator.language.split('-')[0].toLowerCase();
        if (SUPPORTED_LANGS.includes(browserLang)) {
            return browserLang;
        }
    }    
    // Fallback si la langue du navigateur n'est pas supportée ou non définie
    return DEFAULT_LANG;
}

/**
 * Enregistre le choix de langue de l'utilisateur dans le stockage de session.
 */
export function saveUserLanguage(langCode) {
    if (SUPPORTED_LANGS.includes(langCode)) {
        sessionStorage.setItem('soft64.fr_user_lang', langCode);
    }
}