// Countdown function
function countdown(date, elementId) {
    const countDownDate = new Date(date).getTime();

    const x = setInterval(function () {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById(elementId).innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

        if (distance < 0) {
            clearInterval(x);
            document.getElementById(elementId).innerHTML = "Event Started";
        }
    }, 1000);
}

// Initialize countdowns
countdown("March 1, 2025 00:00:00", "countdown1");
countdown("March 2, 2025 00:00:00", "countdown2");
countdown("March 3, 2025 00:00:00", "countdown3");