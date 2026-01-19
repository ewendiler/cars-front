import { formatPrice } from './utils.js';

/**
 * Crée une carte HTML pour une voiture
 * @param {Object} car - Les données de la voiture
 * @returns {HTMLElement} L'élément <article> prêt à être inséré
 */
export function createCarCard(car) {
    // 1. Article container
    const article = document.createElement('article');
    article.className = 'card shadow-sm';
    article.style.width = '18rem';

    // ID pour le lien
    const carId = car.id || car._id;

    // 2. Lien image
    const imgLink = document.createElement('a');
    imgLink.href = `car.html?id=${carId}`;

    // 3. Image
    const img = document.createElement('img');
    img.src = car.imageUrl && car.imageUrl.startsWith('http') ? car.imageUrl : './imgs/classic-cars.jpg';
    img.className = 'card-img-top';
    img.alt = `${car.brand} ${car.model}`;

    img.style.height = '200px';
    img.style.objectFit = 'cover';

    imgLink.appendChild(img);

    // 4. Body
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    const title = document.createElement('h5');
    title.className = 'card-title';
    title.textContent = `${car.year} ${car.brand} ${car.model}`;

    const desc = document.createElement('p');
    desc.className = 'card-text text-truncate';
    desc.textContent = car.description || "Aucune description disponible.";
    desc.title = car.description;

    const btn = document.createElement('a');
    btn.href = `car.html?id=${carId}`;
    btn.className = 'btn btn-primary';
    btn.textContent = 'See more';

    // Bouton supprimer
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-outline-danger ms-2';
    deleteBtn.textContent = 'Supprimer';
    deleteBtn.dataset.id = carId;
    deleteBtn.dataset.action = 'delete';

    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'd-flex justify-content-between align-items-center mt-3';
    actionsDiv.append(btn, deleteBtn);

    cardBody.append(title, desc, actionsDiv);
    article.append(imgLink, cardBody);

    return article;
}

/**
 * Affiche la liste des voitures dans le conteneur #cars-list
 */
export function displayCars(cars) {
    const container = document.querySelector('#cars-list');
    if (!container) return;

    container.innerHTML = '';

    if (!cars || cars.length === 0) {
        container.innerHTML = '<div class="alert alert-info">Aucune voiture disponible pour le moment.</div>';
        return;
    }

    const fragment = document.createDocumentFragment();
    cars.forEach(car => {
        const card = createCarCard(car);
        fragment.appendChild(card);
    });

    container.appendChild(fragment);
}

/**
 * Affiche les détails d'une voiture sur la page car.html
 */
export function displayCarDetails(car) {
    const title = document.querySelector('#car-title');
    const img = document.querySelector('#car-img');
    const specsBody = document.querySelector('#car-specs');

    if (!title || !img || !specsBody) return;

    title.textContent = `${car.year} ${car.brand} ${car.model}`;
    img.src = car.imageUrl && car.imageUrl.startsWith('http') ? car.imageUrl : './imgs/classic-cars.jpg';
    img.alt = `${car.brand} ${car.model}`;

    const createRow = (label, value) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<th scope="row">${label}</th><td colspan="2">${value}</td>`;
        return tr;
    };

    specsBody.innerHTML = '';

    specsBody.append(createRow('Year', car.year));
    specsBody.append(createRow('Make', car.brand));
    specsBody.append(createRow('Model', car.model));
    specsBody.append(createRow('Color', car.color));
    specsBody.append(createRow('Mileage', car.mileage ? `${car.mileage} km` : 'N/A'));
    specsBody.append(createRow('Description', car.description || ''));
    specsBody.append(createRow('Price', formatPrice(car.price)));
}
