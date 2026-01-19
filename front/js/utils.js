/**
 * Formate un nombre en prix (EUR)
 * @param {number} price 
 * @returns {string}
 */
export function formatPrice(price) {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price);
}

/**
 * Valide les données d'une voiture (simple exemple)
 * @param {Object} data 
 * @returns {Object} { isValid: boolean, errors: Array }
 */
export function validateCarData(data) {
    const errors = [];

    if (!data.brand) errors.push("La marque est requise.");
    if (!data.model) errors.push("Le modèle est requis.");
    if (!data.year || data.year < 1900) errors.push("L'année doit être valide.");

    return {
        isValid: errors.length === 0,
        errors
    };
}
