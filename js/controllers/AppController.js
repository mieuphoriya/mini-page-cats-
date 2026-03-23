import { Cats } from "../models/Cats.js";
import { Favorites } from "../models/Favorites.js";
import { SearchView } from "../views/SearchView.js";
import { CatsView } from "../views/CatsView.js";
import { FavoritesView } from "../views/FavoritesView.js";

    /**
     * Contrôleur principal de l'application
     * Fait le lien entre les modèles (données) et les vues (interface utilisateur)
     */
export class AppController {


    /**
     * Le controller est initialisé avec tous les models et toutes les views
     * lance l'application
     */
    constructor() {
        this.cats = new Cats();
        this.favorites = new Favorites();
        this.searchView = new SearchView();
        this.resultsView = new CatsView();
        this.favoritesView = new FavoritesView();

        this.init();
    }

    /**
     * Initialisation des interactions entre
     * les vues et le contrôleur
     * recherche, favoris, changement de saisie
     */

    init() {
        this.searchView.bindSearch(() => this.handleSearch());

        this.searchView.bindFavorite((value) => this.handleFavorite(value));

        this.searchView.onInputChange = (value) => {
            const isFav = this.favorites.isFavorite(value);
            this.searchView.updateFavoriteButton(isFav);
        };


        this.updateFavorites();
    }

    /**
     * Lance une recherche via le modèle et affiche les résultats
     * @returns {Promise<void>}
     */
    async handleSearch() {
        const query = this.searchView.getSearchValue();
        if (!query) return;

        this.resultsView.showLoading();
        const results = await this.cats.getCatsByBreed(query);
        this.resultsView.hideLoading();
        this.resultsView.showResults(results);
    }

    /**
     * Gère de l'ajout ou la suppression d'un favori
     * @param {string} value - valeur saisie par l'utilisateur
     */
    handleFavorite(value) {

        if (this.favorites.isFavorite(value)) {

            if (confirm("Supprimer ce favori ?")) {
                this.favorites.remove(value);
            }

        } else {
            this.favorites.add(value);
        }

        this.searchView.updateFavoriteButton(
            this.favorites.isFavorite(value)
        );

        this.updateFavorites();
    }

    /**
     * Mise à jour l'affichage de la liste des favoris
     * Gère les actions : clic sur un favori et suppression
     */
    updateFavorites() {
        this.favoritesView.render(
            this.favorites.getAll(),
            (item) => {
                this.searchView.input.value = item;
                this.handleSearch();
            },
            (item) => {
                if (confirm("Supprimer ce favori ?")) {
                    this.favorites.remove(item);
                    this.updateFavorites();
                }
            }
        );
    }
}