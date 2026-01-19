import { API_CONFIG } from './config.js';

/**
 * Récupère la liste complète des voitures depuis l'API.
 * @returns {Promise<Array>} Un tableau de voitures ou un tableau vide en cas d'erreur.
 */
export async function fetchAllCars() {
    try {
        const url = `${API_CONFIG.baseURL}${API_CONFIG.endpoints.cars}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_CONFIG.apiKey
            }
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const json = await response.json();
        return json.data || json;

    } catch (error) {
        console.error("Erreur fetchAllCars :", error);
        return [];
    }
}

/**
 * Récupère les détails d'une voiture via son ID.
 * @param {string|number} id - L'identifiant de la voiture.
 * @returns {Promise<Object|null>} L'objet voiture ou null en cas d'erreur.
 */
export async function fetchCarById(id) {
    try {
        const url = `${API_CONFIG.baseURL}${API_CONFIG.endpoints.cars}/${id}`;
        const response = await fetch(url, {
            headers: {
                'x-api-key': API_CONFIG.apiKey
            }
        });

        if (response.status === 404) {
            console.warn(`Voiture avec l'ID ${id} non trouvée.`);
            return null;
        }

        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const json = await response.json();
        return json.data || json;

    } catch (error) {
        console.error(`Erreur fetchCarById (${id}) :`, error);
        return null;
    }
}

/**
 * Crée une nouvelle voiture via l'API.
 * @param {Object} carData - Les données de la voiture à créer.
 * @returns {Promise<Object|null>} La voiture créée ou null en cas d'erreur.
 */
export async function createCar(carData) {
    try {
        const url = `${API_CONFIG.baseURL}${API_CONFIG.endpoints.cars}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_CONFIG.apiKey
            },
            body: JSON.stringify(carData)
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const json = await response.json();
        return json.data || json;

    } catch (error) {
        console.error("Erreur createCar :", error);
        return null;
    }
}

/**
 * Supprime une voiture via l'API.
 * @param {string} id - L'ID de la voiture à supprimer.
 * @returns {Promise<boolean>} True si succès, False sinon.
 */
export async function deleteCar(id) {
    try {
        const url = `${API_CONFIG.baseURL}${API_CONFIG.endpoints.cars}/${id}`;
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'x-api-key': API_CONFIG.apiKey
            }
        });

        if (!response.ok) {
            if (response.status === 404) return true;
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        return true;
    } catch (error) {
        console.error(`Erreur deleteCar (${id}) :`, error);
        return false;
    }
}
