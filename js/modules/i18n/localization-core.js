'use strict';

import * as LanguageService from './LanguageService.js';
import * as TranslationLoader from './TranslationLoader.js';

/**
 * Fonction principale de traduction (le "t" de 'translate').
 * Elle fournit la traduction pour une clé donnée.
 * @param {string} key - La clé de traduction.
 * @returns {string} La chaîne traduite ou la clé si introuvable.
 */
export function t(key) {
    const messages = TranslationLoader.getMessages();
    if (typeof key === 'string' && Object.prototype.hasOwnProperty.call(messages, key)) {
        // eslint-disable-next-line security/detect-object-injection
        return messages[key];
    }
    return key;
}

/**
 * Traduit tous les éléments HTML marqués avec l'attribut data-i18n-key.
 */
function translateHtml() {
    const elements = document.querySelectorAll('[data-i18n-key]');
    const currentLang = LanguageService.getCurrentLanguage();
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n-key');
        if (key) {
            const translatedText = t(key);
            if (element.tagName === 'META' && element.getAttribute('name') === 'description') {
                element.setAttribute('content', translatedText);
            } else {
                element.textContent = translatedText;
            }
        }
    });
    document.documentElement.setAttribute('lang', currentLang);
}

/**
 * Initialise le moteur i18n au démarrage.
 * Charge la langue préférée, met à jour l'état et traduit le contenu statique.
 * C'est la fonction appelée via Localization.initializeI18n()
 * @returns {Promise<void>}
 */
export async function initializeI18n() {
    const preferredLang = LanguageService.getPreferredLanguage();
    await TranslationLoader.loadMessages(preferredLang);
    LanguageService.setCurrentLanguage(preferredLang);
    translateHtml();
}