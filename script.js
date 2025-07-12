"use strict";

const targetDate = new Date("2025-11-01T00:00:00").getTime();
const countdown = () => {
    const now = new Date().getTime();
    const distance = targetDate - now;
    if (distance < 0) {
        document.getElementById("countdown").innerHTML = "Welcome!";
        return;
    }
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
};
countdown();
setInterval(countdown, 1000);