import { RecettesApi } from "./Api/RecettesApi.js"
import { RecipesTemplate } from "./Templates/RecipesTemplate.js";
import { Filters } from "./Utils/Filters.js";
import { Search } from "./Utils/Search.js";

class App {
    //Le constructeur initialise la classe en créant une instance de RecettesApi
    constructor() {
        this.recettesApi = new RecettesApi("data/reciepes.json");

        this.allRecipes = null;
        this.filteredRecipes = [];
        this.haveMainFilter = false;
        this.haveSecondaryFilter = false;


        this.datasSelectedAppareils = [];
        this.datasSelectedIngredients = [];
        this.datasSelectedUstensiles = [];
    }

    async init() {
        await this.getAllRecipes();
        this.displayRecipes()

        this.search = new Search(this);
        this.search.init();

        this.filters = new Filters(this);
        this.filters.init();
    }

    applyFilter() {
        this.search.applyMainFilter();
        this.filters.updateFilter(this.filteredRecipes)
        this.filters.applySecondaryFilter();
        this.displayRecipes(this.search.searchText);
    }

    // Récupère toutes les recettes
    async getAllRecipes() {
        this.allRecipes = await this.recettesApi.getAll();
    }

    // Gére l'affichage des recettes
    displayRecipes(searchText) {
        let recipesTemplate;
        // vérifie si haveMainFilter ou haveSecondaryFilter a un filtre
        if (this.haveMainFilter == true || this.haveSecondaryFilter == true) {
            // vérifie si des recettes filtrées sont disponibles et affiche un message
            if (this.filteredRecipes.length == 0) {
                let divRecette = document.getElementById("recettes")
                divRecette.textContent = ""
                let message = document.createElement("p")
                message.id = "recette_vide"
                if (searchText) {
                    message.textContent = "Aucune recette ne contient \"" + searchText + "\" vous pouvez chercher \"tarte aux pommes\" \"poisson \" etc."
                    // recipeTemplate met à jour l'affichage du total de recettes
                    recipesTemplate = new RecipesTemplate(this.filteredRecipes);
                    recipesTemplate.totalRecettes()
                } else {
                    message.textContent = "Aucune recette, vous pouvez chercher \"tarte aux pommes\" \"poisson \" etc."
                    recipesTemplate = new RecipesTemplate(this.filteredRecipes);
                    recipesTemplate.totalRecettes()
                }
                divRecette.appendChild(message)
                return;
            } else {
                //  Si des recettes filtrées sont disponibles, on utilise render de RecipesTemplate avec les recettes filtrées
                recipesTemplate = new RecipesTemplate(this.filteredRecipes);
                recipesTemplate.render();
                return;
            }
        }
        //  Si aucun filtre n'est appliqué, on utilise render de RecipesTemplate avec toutes les recettes
        recipesTemplate = new RecipesTemplate(this.allRecipes);
        recipesTemplate.render();
    }
}

let myApp = new App();

await myApp.init();