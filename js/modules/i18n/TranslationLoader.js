'use strict';

let currentMessages = {};

/**
 * Fournit les messages de traduction actuellement chargés.
 * Cette fonction est utilisée par localization-core.js pour la fonction t(key).
 * @returns {Object} L'objet contenant les clés/valeurs de traduction.
 */
export function getMessages() {
    return currentMessages;
}

/**
 * Charge les messages de traduction pour la langue spécifiée depuis le fichier JSON.
 * Gère l'I/O (Input/Output) de l'application.
 * * @param {string} langCode - La langue à charger (ex: 'fr', 'en').
 * @returns {Promise<Object>} Les messages chargés ou un objet vide en cas d'erreur.
 */
export async function loadMessages(langCode) {
    const filePath = `./js/modules/i18n/${langCode}.json`;
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`Failed to load language file at ${filePath}. Status: ${response.status}`);
        }
        currentMessages = await response.json();
        return currentMessages;
    } catch (error) {
        console.error(`Error loading translation file for ${langCode}. Using empty messages.`, error);
        currentMessages = {};
        return {};
    }
}