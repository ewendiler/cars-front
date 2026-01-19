import { fetchAllCars, createCar, deleteCar } from './api.js';
import { displayCars } from './dom.js';

export async function initHomePage() {
    const container = document.querySelector('#cars-list');
    if (!container) return;

    container.innerHTML = '<div class="text-center w-100 mt-5"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">Chargement...</span></div></div>';

    const cars = await fetchAllCars();
    displayCars(cars);

    // Gestionnaire de suppression (Event Delegation)
    container.addEventListener('click', async (e) => {
        const target = e.target;
        if (target.dataset && target.dataset.action === 'delete') {
            const id = target.dataset.id;
            if (!id) return;

            if (confirm("Êtes-vous sûr de vouloir supprimer cette voiture ? Cette action est irréversible.")) {
                // Feedback visuel
                const originalText = target.textContent;
                target.textContent = '...';
                target.disabled = true;

                const success = await deleteCar(id);

                if (success) {
                    // Suppression du DOM
                    const card = target.closest('article');
                    if (card) card.remove();

                    if (container.querySelectorAll('article').length === 0) {
                        container.innerHTML = '<div class="alert alert-info">Aucune voiture disponible pour le moment.</div>';
                    }
                } else {
                    alert("Erreur lors de la suppression.");
                    target.textContent = originalText;
                    target.disabled = false;
                }
            }
        }
    });

    // Init du formulaire
    initAddCarForm();
}

/**
 * Initialise le formulaire d'ajout de voiture
 */
function initAddCarForm() {
    const form = document.querySelector('#add-car-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const carData = Object.fromEntries(formData);

        carData.year = parseInt(carData.year, 10);
        carData.price = parseFloat(carData.price);
        carData.mileage = parseInt(carData.mileage, 10);

        if (!carData.imageUrl) delete carData.imageUrl;

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Envoi...';

        const newCar = await createCar(carData);

        if (newCar) {
            alert('Voiture ajoutée avec succès !');

            const modalEl = document.querySelector('#exampleModal');
            // @ts-ignore
            const modalInstance = bootstrap.Modal.getInstance(modalEl);
            if (modalInstance) {
                modalInstance.hide();
            } else {
                const closeBtn = document.querySelector('[data-bs-dismiss="modal"]');
                if (closeBtn) closeBtn.click();
            }

            form.reset();

            const updatedCars = await fetchAllCars();
            displayCars(updatedCars);

        } else {
            alert("Erreur lors de l'ajout.");
        }

        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    });
}
