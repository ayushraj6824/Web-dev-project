import { createIcons, icons } from 'https://cdn.skypack.dev/lucide';

export function toggleDarkMode() {
    const html = document.documentElement;
    html.classList.toggle('dark');
    localStorage.setItem('dark-mode', html.classList.contains('dark'));
    updateIcon();
}

export function applyDarkModePreference() {
    if (localStorage.getItem('dark-mode') === 'true') {
        document.documentElement.classList.add('dark');
    }
    createIcons({ icons });
    updateIcon();
}

function updateIcon() {
    const icon = document.getElementById('dark-mode-icon');
    if (document.documentElement.classList.contains('dark')) {
        icon.setAttribute('data-lucide', 'sun');
    } else {
        icon.setAttribute('data-lucide', 'moon');
    }
    createIcons({ icons });
}

document.addEventListener('DOMContentLoaded', () => {
    applyDarkModePreference();
});
