export class FavoritesModel {

    constructor() {
        this.key = "favorites";
        this.favorites = JSON.parse(localStorage.getItem(this.key)) || [];
    }

    getAll() {
        return this.favorites;
    }

    add(item) {
        if (!this.favorites.includes(item)) {
            this.favorites.push(item);
            this.save();
        }
    }

    remove(item) {
        this.favorites = this.favorites.filter(f => f !== item);
        this.save();
    }

    isFavorite(item) {
        return this.favorites.includes(item);
    }

    save() {
        localStorage.setItem(this.key, JSON.stringify(this.favorites));
    }
}