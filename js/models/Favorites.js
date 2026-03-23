/**
 * Classe gérant les recherches favorites (races de chats)
 * Stocke les données dans le LocalStorage du navigateur
 */
export class Favorites {

     /**
     * Initialise la liste des favoris depuis le LocalStorage
     * Si aucune donnée n'existe, initialise un tableau vide
     */

    constructor() {
        this.key = "favorites";
        this.favorites = JSON.parse(localStorage.getItem(this.key)) || [];
    }

    /**
     * Retourne la liste des favoris
     * @returns {string[]} - tableau des chats favoris
     */
    getAll() {
        return this.favorites;
    }

    /**
     * Ajoute un élément aux favoris sans doublon
     * @param {string} item - race de chat à ajouter
     */
    add(item) {
        if (!this.favorites.includes(item)) {
            this.favorites.push(item);
            this.save();
        }
    }

    /**
    * Supprime un élément des favoris
    * @param {string} item - race de chat à supprimer
    */
    remove(item) {
        this.favorites = this.favorites.filter(f => f !== item);
        this.save();
    }

    /**
     * Vérifie si la race de chat est déjà en favori
     * @param {string} item - race de chat à vérifier
     * @returns {boolean} true si race de chat est en favori
     */
    isFavorite(item) {
        return this.favorites.includes(item);
    }

    /**
     * Sauvegarde la liste des races de chat favoris dans le LocalStorage
     */
    save() {
        localStorage.setItem(this.key, JSON.stringify(this.favorites));
    }
}