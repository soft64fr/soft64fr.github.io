'use strict';

const MS_IN_SECOND = 1000;
const MS_IN_MINUTE = MS_IN_SECOND * 60;
const MS_IN_HOUR = MS_IN_MINUTE * 60;
const MS_IN_DAY = MS_IN_HOUR * 24;

/**
 * Calcule les composantes du temps restant (jours, heures, minutes, secondes)
 * par rapport à un horodatage cible.
 * * @param {number} targetTimestamp - Le timestamp cible (Date.getTime()).
 * @returns {{days: number, hours: number, minutes: number, seconds: number, distance: number}}
 * Un objet contenant la distance en ms et les unités de temps.
 */
export function calculateTimeRemaining(targetTimestamp) {
    const now = new Date().getTime();
    const distance = targetTimestamp - now;
    if (distance < 0) {
        return { distance: -1, days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    const days = Math.floor(distance / MS_IN_DAY);
    const hours = Math.floor((distance % MS_IN_DAY) / MS_IN_HOUR);
    const minutes = Math.floor((distance % MS_IN_HOUR) / MS_IN_MINUTE);
    const seconds = Math.floor((distance % MS_IN_MINUTE) / MS_IN_SECOND);
    return { days, hours, minutes, seconds, distance };
}