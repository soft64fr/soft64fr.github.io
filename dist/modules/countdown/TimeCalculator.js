'use strict';

var MS_IN_SECOND = 1000;
var MS_IN_MINUTE = MS_IN_SECOND * 60;
var MS_IN_HOUR = MS_IN_MINUTE * 60;
var MS_IN_DAY = MS_IN_HOUR * 24;

/**
 * Calcule les composantes du temps restant (jours, heures, minutes, secondes)
 * par rapport à un horodatage cible.
 * * @param {number} targetTimestamp - Le timestamp cible (Date.getTime()).
 * @returns {{days: number, hours: number, minutes: number, seconds: number, distance: number}}
 * Un objet contenant la distance en ms et les unités de temps.
 */
export function calculateTimeRemaining(targetTimestamp) {
  var now = new Date().getTime();
  var distance = targetTimestamp - now;
  if (distance < 0) {
    return {
      distance: -1,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };
  }
  var days = Math.floor(distance / MS_IN_DAY);
  var hours = Math.floor(distance % MS_IN_DAY / MS_IN_HOUR);
  var minutes = Math.floor(distance % MS_IN_HOUR / MS_IN_MINUTE);
  var seconds = Math.floor(distance % MS_IN_MINUTE / MS_IN_SECOND);
  return {
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
    distance: distance
  };
}