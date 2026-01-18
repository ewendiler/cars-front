import { localCarsdata } from "./mock-data.js"
const API_CONFIG = {
  baseURL: "https:/project-car-dev-web-diler-boutiche.onrender.com",
  endpoints: {
    cars: "/api/cars",
    // ajoutez d'autres endpoints si nécessaire
  },
    apiKey: "ma-super-cle-api-2024"

};
console.log("hello", localCarsdata)

/**
 * Récupère la liste complète des voitures depuis l'API.
 * @returns {Promise<Array>} Un tableau de voitures ou un tableau vide en cas d'erreur.
 */
async function fetchAllCars() {
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

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Erreur :", error);
    return [];
  }
}

// ==========================================
// 2.3 - RÉCUPÉRER UNE VOITURE SPÉCIFIQUE
// ==========================================

/**
 * Récupère les détails d'une voiture via son ID.
 * @param {string|number} id - L'identifiant de la voiture.
 * @returns {Promise<Object|null>} L'objet voiture ou null en cas d'erreur.
 */
async function fetchCarById(id) {
  try {
    const url = `${API_CONFIG.baseURL}${API_CONFIG.endpoints.cars}/${id}`;
    const response = await fetch(url);

    // Gestion spécifique du cas 404 (Non trouvé)
    if (response.status === 404) {
      console.warn(`Voiture avec l'ID ${id} non trouvée.`);
      return null;
    }

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error(`Erreur lors de la récupération de la voiture ${id} :`, error);
    return null;
  }
}

