import { BASE_URL, API_KEY } from "../config.js";

export class SearchModel {

    constructor() {
    }

    /**
     * La fonction de recherche de la race de chat fait 2 appels à l'API
     * 1) cherche la race du chat et recupere son id
     * 2) cherche les 5 images des chats en utilisant l'id
     * @param {string} query - le nom de la race de chat que l'utilisateur veut trouver
     * @returns {Promise<any>}
     */
    async searchBreed(query) {

        const breedRes = await fetch(
            BASE_URL+`/breeds/search?q=${query}`,
            { headers: { "x-api-key": API_KEY } }
        );
        const breeds = await breedRes.json();

        if (!breeds.length) {
            console.log("Aucun chat n'a pas était trouvé");
            return;
        }

        const breedId = breeds[0].id;

        const imgRes = await fetch(
            BASE_URL+`/images/search?breed_ids=${breedId}&limit=5`,
            { headers: { "x-api-key": API_KEY } }
        );

        return await imgRes.json();
    }
}
