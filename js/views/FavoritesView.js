/**
 * La view associé au model
 * @constructor
 * @param {container} - stock des races des chats favorites
 */
export class FavoritesView {

    constructor() {
        this.container = document.getElementById("favorites");
    }

    /**
     * Fonction pour remplir le conteneur html et manipuler les favoris
     * @param favorites - liste des favoris
     * @param clickHandler
     * @param deleteHandler
     */

    render(favorites, clickHandler, deleteHandler) {
        this.container.innerHTML = "";

        if (favorites.length === 0) {
            this.container.textContent = "(Aucune recherche favorite)";
            return;
        }

        favorites.forEach(item => {
            const div = document.createElement("div");
            div.className = "favorite-item";
            div.textContent = item;

            div.addEventListener("click", () => clickHandler(item));

            const deleteBtn = document.createElement("span");
            deleteBtn.textContent = " ⨉";
            deleteBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                deleteHandler(item);
            });

            div.appendChild(deleteBtn);
            this.container.appendChild(div);
        });
    }
}