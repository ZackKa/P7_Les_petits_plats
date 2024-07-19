export class Search {
    constructor(app) {
        this.app = app
    }

    init() {
        let searchHTML = document.getElementById('site-search');
        searchHTML.addEventListener('keyup', e => {
            this.searchText = this.checkSearch(e);
            if (this.searchText == false) return;
            this.app.applyFilter();
        });
    }

    checkSearch(e) {
        //  vérifie le texte entré et le transforme en minuscules sans les espaces inutiles.
        let searchText = e.target.value.trim().toLowerCase();

        if (searchText.length <= 3) {
            this.app.haveMainFilter = false; // Indique qu'il n'y a pas de filtre
            this.app.applyFilter(); // Appelle applyFilter pour afficher les recettes
            return false; // Sert à indiquer qu'aucun texte valide n'a été saisi et aucun filtre ne doit être appliqué
        }
        // Si plus de 3 caractères alors on a un filtre et retourne le texte entré
        this.app.haveMainFilter = true;
        return searchText;
    }

    applyMainFilter() {
        if (this.app.datasSelectedAppareils.length === 0 && this.app.datasSelectedUstensiles.length === 0 && this.app.datasSelectedIngredients.length === 0) {
            let filteredRecipes = [];
            for (let i = 0; i < this.app.allRecipes.length; i++) {
                let recipe = this.app.allRecipes[i];
                if (
                    recipe.name.toLowerCase().includes(this.searchText) ||
                    recipe.appliance.toLowerCase().includes(this.searchText) ||
                    recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(this.searchText)) ||
                    recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(this.searchText))
                ) {
                    filteredRecipes.push(recipe);
                }
            }
            this.app.filteredRecipes = filteredRecipes;
        } else {
            let filteredRecipes = [];
            for (let i = 0; i < this.app.filteredRecipes.length; i++) {
                let recipe = this.app.filteredRecipes[i];
                if (
                    recipe.name.toLowerCase().includes(this.searchText) ||
                    recipe.appliance.toLowerCase().includes(this.searchText) ||
                    recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(this.searchText)) ||
                    recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(this.searchText))
                ) {
                    filteredRecipes.push(recipe);
                }
            }
            this.app.filteredRecipes = filteredRecipes;
        }
    }
}