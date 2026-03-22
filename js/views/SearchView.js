/**
 * La view associé au model
 * @constructor
 * @param {input} - barre de recherche
 * @param {searchBtn} - bouton recherche
 * @param {favoriteBtn} - bouton favoris
 */
export class SearchView {

    constructor() {
        this.input = document.getElementById("searchInput");
        this.searchBtn = document.getElementById("searchBtn");
        this.favoriteBtn = document.getElementById("favoriteBtn");
    }

    getSearchValue() {
        return this.input.value.trim();
    }

    /**
     * Fonction pour lier le bouton de recherche avec les actions de l'utilisateur
     * le click de souris
     * le click clavier sur Enter
     *
     * @param handler
     */

    bindSearch(handler) {
        this.searchBtn.addEventListener("click", handler);

        this.input.addEventListener("input", () => {
            const value = this.getSearchValue();

            this.searchBtn.disabled = value === "";

            if (this.onInputChange) {
                this.onInputChange(value);
            }
        });

        this.input.addEventListener("keypress", (e) => {
            if (e.key === "Enter" && this.getSearchValue() !== "") {
                handler();
            }
        });
    }

    /**
     * Fonction pour lier le bouton favori avec les actions de l'utilisateur
     * le click de souris
     * le click clavier sur Enter
     *
     * @param handler
     */
    bindFavorite(handler) {
        this.favoriteBtn.addEventListener("click", () => {
            const value = this.getSearchValue();
            if (value !== "") {
                handler(value);
            }
        });
    }

    /**
     * Fonction pour mettre à jour le bouton favori
     * @param isFavorite
     */

    updateFavoriteButton(isFavorite) {
        const value = this.getSearchValue();

        if (value === "") {
            this.favoriteBtn.disabled = true;
            this.favoriteBtn.textContent = "☆";
            return;
        }

        this.favoriteBtn.disabled = false;

        if (isFavorite) {
            this.favoriteBtn.textContent = "★";
        } else {
            this.favoriteBtn.textContent = "☆";
        }
    }

    /**
     *
     * @param callback
     */
    onInputChange(callback) {
        this.onInputChange = callback;
    }
}