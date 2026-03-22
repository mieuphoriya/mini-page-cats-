import { SearchModel } from "../models/SearchModel.js";
import { FavoritesModel } from "../models/FavoritesModel.js";
import { SearchView } from "../views/SearchView.js";
import { ResultsView } from "../views/ResultsView.js";
import { FavoritesView } from "../views/FavoritesView.js";

/**
 * Le controller est initialisé avec tous les models et toutes les views
 */
export class AppController {

    constructor() {
        this.searchModel = new SearchModel();
        this.favoritesModel = new FavoritesModel();

        this.searchView = new SearchView();
        this.resultsView = new ResultsView();
        this.favoritesView = new FavoritesView();

        this.init();
    }

    /**
     * Fonction d'initialisation des views et des models
     */

    init() {
        this.searchView.bindSearch(() => this.handleSearch());

        this.searchView.bindFavorite((value) => this.handleFavorite(value));

        this.searchView.onInputChange = (value) => {
            const isFav = this.favoritesModel.isFavorite(value);
            this.searchView.updateFavoriteButton(isFav);
        };


        this.updateFavorites();
    }

    /**
     *
     * @returns {Promise<void>}
     */
    async handleSearch() {
        const query = this.searchView.getSearchValue();
        if (!query) return;

        this.resultsView.showLoading();

        const results = await this.searchModel.searchBreed(query);

        this.resultsView.hideLoading();
        this.resultsView.showResults(results);
    }

    /**
     *
     * @param value
     */
    handleFavorite(value) {

        if (this.favoritesModel.isFavorite(value)) {

            if (confirm("Supprimer ce favori ?")) {
                this.favoritesModel.remove(value);
            }

        } else {
            this.favoritesModel.add(value);
        }

        this.searchView.updateFavoriteButton(
            this.favoritesModel.isFavorite(value)
        );

        this.updateFavorites();
    }

    /**
     *
     */
    updateFavorites() {
        this.favoritesView.render(
            this.favoritesModel.getAll(),
            (item) => {
                this.searchView.input.value = item;
                this.handleSearch();
            },
            (item) => {
                if (confirm("Supprimer ce favori ?")) {
                    this.favoritesModel.remove(item);
                    this.updateFavorites();
                }
            }
        );
    }
}