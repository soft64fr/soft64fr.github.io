'use strict';

import "core-js/modules/es.array.includes.js";
var DEFAULT_LANG = 'en';
var SUPPORTED_LANGS = ['fr', 'en'];
var currentLanguage = DEFAULT_LANG;

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
 * @returns {string} Le code de langue préféré (ex: 'fr', 'en').
 */
export function getPreferredLanguage() {
  var storedLang = sessionStorage.getItem('soft64.fr_user_lang');
  if (storedLang && SUPPORTED_LANGS.includes(storedLang)) {
    return storedLang;
  }
  var browserLang = navigator.language.split('-')[0].toLowerCase();
  if (SUPPORTED_LANGS.includes(browserLang)) {
    console.log("Bonjour Yann !:" + browserLang);
    return browserLang;
  }
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