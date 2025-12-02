'use strict';

/**
 * Met à jour les éléments du DOM avec les valeurs de temps spécifiées.
 * * @param {{days: number, hours: number, minutes: number, seconds: number}} timeUnits - Objet contenant les unités de temps.
 */
export function updateTimeDisplay(timeUnits) {
  document.getElementById('days').textContent = timeUnits.days;
  document.getElementById('hours').textContent = timeUnits.hours;
  document.getElementById('minutes').textContent = timeUnits.minutes;
  document.getElementById('seconds').textContent = timeUnits.seconds;
}

/**
 * Affiche le message de fin dans le conteneur principal du compte à rebours.
 * La chaîne de caractères à afficher est fournie via la fonction de traduction 't'.
 * * @param {Function} t - La fonction de traduction (du module localization-core.js).
 */
export function showWelcomeMessage(t) {
  document.getElementById('countdown').textContent = t('countdown_welcome');
  var timeBoxes = document.querySelector('.timer-display');
  if (timeBoxes) {
    timeBoxes.style.display = 'none';
  }
}