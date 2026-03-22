/**
 * La view associé au model
 * @constructor
 * @param {container} - stock des images des chats
 * @param {loader} - l'animation de chargement
 */
export class ResultsView {

    constructor() {
        this.container = document.getElementById("results");
        this.loader = document.getElementById("bloc-gif-attente");
    }

    showLoading() {
        this.loader.classList.remove("hidden");
    }

    hideLoading() {
        this.loader.classList.add("hidden");
    }

    /**
     * Fonction pour remplir le conteneur html avec les données retourné par l'API
     * @param data - liste des images pour fabriquer les elements img
     */
    showResults(data) {

        this.container.innerHTML = "";

        if (data.length === 0) {
            this.container.textContent = "(Aucun résultat trouvé)";
            return;
        }

        data.forEach(item => {

            const img = document.createElement("img");
            img.src = item.url;
            img.className = "cat-image";

            this.container.appendChild(img);

        });
    }
}