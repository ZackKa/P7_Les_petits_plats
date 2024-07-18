import { RecettesApi } from "./Api/RecettesApi.js"
import { RecipesTemplate } from "./Templates/RecipesTemplate.js";
import { Filters } from "./Utils/Filters.js";
import { Search } from "./Utils/Search.js";
import { Filter } from "./Utils/Filter.js"; // ajouter avant c'etait dans fitlers

class App {
    //Le constructeur initialise la classe en créant une instance de RecettesApi
    constructor() {
        this.recettesApi=new RecettesApi("data/reciepes.json");

        this.allRecipes=null;
        this.filteredRecipes=[];
        this.haveMainFilter=false;
        this.haveSecondaryFilter=false;
        

        this.datasSelectedAppareils = [];
        this.datasSelectedIngredients = [];
        this.datasSelectedUstensiles = [];
    }

    async init(){
        await this.getAllRecipes();
        this.displayRecipes()

        this.search=new Search(this);
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

    async getAllRecipes() {
        this.allRecipes=await this.recettesApi.getAll();
    }

    displayRecipes(searchText){
        let recipesTemplate;
        // console.log('displayRecipes')
        console.log("lenght filtre",this.filteredRecipes.length == 0)
        if(this.haveMainFilter==true || this.haveSecondaryFilter==true) {
            //MAJ des combos
             
            if (this.filteredRecipes.length == 0) {
                let divRecette = document.getElementById("recettes")
                divRecette.textContent=""
                let message = document.createElement("p")
                message.id="recette_vide"
                if(searchText){
                    message.textContent="Aucune recette ne contient \"" + searchText + "\" vous pouvez chercher \"tarte aux pommes\" \"poisson \" etc."
                    // recipeTemplate met à jour l'affichage du total de recettes
                    recipesTemplate =new RecipesTemplate(this.filteredRecipes);
                    recipesTemplate.totalRecettes()
                }else{
                    message.textContent="Aucune recette, vous pouvez chercher \"tarte aux pommes\" \"poisson \" etc."
                    recipesTemplate =new RecipesTemplate(this.filteredRecipes);
                    recipesTemplate.totalRecettes()
                }
                divRecette.appendChild(message)
                return;
            } else {
                console.log('recette filtrer index', this.filteredRecipes)
                console.log('affichage des recettes filtrés')
                recipesTemplate =new RecipesTemplate(this.filteredRecipes);
                recipesTemplate.render();
                return;
            }
        }
        console.log("pas de filtre")
        recipesTemplate =new RecipesTemplate(this.allRecipes);
        recipesTemplate.render();
    }
}

let myApp = new App();

await myApp.init();