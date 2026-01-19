import { fetchCarById } from './api.js';
import { displayCarDetails } from './dom.js';

export async function initCarPage() {
    if (!window.location.pathname.includes('car.html')) return;

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (!id) {
        const main = document.querySelector('main');
        if (main) main.innerHTML = '<div class="container mt-5 alert alert-warning">Aucun ID de voiture spécifié.</div>';
        return;
    }

    const car = await fetchCarById(id);

    if (!car) {
        const main = document.querySelector('main');
        if (main) main.innerHTML = '<div class="container mt-5 alert alert-danger">Voiture introuvable (Erreur 404).</div>';
        return;
    }

    displayCarDetails(car);
}
