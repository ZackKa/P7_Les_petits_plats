import { RecettesApi } from "./Api/RecettesApi.js"
import { RecipesTemplate } from "./Templates/RecipesTemplate.js";
import { Filters } from "./Utils/Filters.js";
import { Search } from "./Utils/Search.js";

class App {
    //Le constructeur initialise la classe en créant une instance de RecettesApi
    constructor() {
        this.recettesApi=new RecettesApi("data/reciepes.json");

        this.allRecipes=null;
        this.filteredRecipes=null;
        this.haveFilter=false;
        

        this.datasSelectedAppareils = [];
        this.datasSelectedIngredients = [];
        this.datasSelectedUstensiles = [];
    }

    async init(){
        await this.getAllRecipes();
        this.displayRecipes()

        let search=new Search(this);
        search.init();
        
        let filters = new Filters(this);
        filters.init();
    }

    async getAllRecipes() {
        this.allRecipes=await this.recettesApi.getAll();
    }

    displayRecipes(searchText){
        let recipesTemplate;
        // console.log('displayRecipes')
        // console.log("have filtre",this.haveFilter)
        if(this.haveFilter==true) {
            if (this.filteredRecipes.length <= 0) {
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
                console.log('affichage des recettes filtrés')
                recipesTemplate =new RecipesTemplate(this.filteredRecipes);
                recipesTemplate.render();
                return;
            }
        }

        recipesTemplate =new RecipesTemplate(this.allRecipes);
        recipesTemplate.render();
    }
}

let myApp = new App();

await myApp.init();