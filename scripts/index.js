import { RecettesApi } from "./Api/RecettesApi.js"

import { RecipesTemplate } from "./Templates/RecipesTemplate.js";
import { Filter } from "./Utils/Filter.js";
import { Search } from "./Utils/Search.js";
class App {
    //Le constructeur initialise la classe en créant une instance de RecettesApi
    constructor() {
        this.recettesApi=new RecettesApi("data/reciepes.json");
        console.log("api", this.recettesApi)


        this.allRecipes=null;
        this.filteredRecipes=null;
        this.haveFilter=false;
    }



    async init(){

        await this.getAllRecipes();

        // Test Début
       // this.ingredients=await this.recettesApi.getOne(1);
       // console.log("ingredients", this.ingredients)
        // Test Fin
        this.displayRecipes()

        let search=new Search(this);
        search.init();

        this.openTags()

       let filter = new Filter(this);
       filter.render();
    }

    async getAllRecipes() {
        this.allRecipes=await this.recettesApi.getAll();
    }

    displayRecipes(){
        let recipesTemplate;
        console.log('displayRecipes')
        console.log(this.haveFilter)
        if(this.haveFilter==true) {
            if (this.filteredRecipes==null) {
                //affichage d'un message à l'utilisateur
                console.log('pas de résultat')
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

    openTags(){
        const btn_list = document.querySelectorAll(".btn_list")
        btn_list.forEach(btn => {
            btn.addEventListener("click", (event) => {
                this.eventOpenTags(event)
            })
        })
    }

    eventOpenTags(event){
        let divParent = event.target.closest("div");
        console.log("div", divParent)
        let liste_filtre = divParent.querySelector(".liste_filtre")
        let icon = divParent.querySelector(".icon")
        let search_appareils = divParent.querySelector(".search_appareils")
        let filtre_selectionnable = divParent.querySelector(".filtre_selectionnable")
        let filtre_selectionne = divParent.querySelector(".filtre_selectionne")
        console.log("lsite", liste_filtre)
        console.log("search_appareils", search_appareils)
        if(liste_filtre.classList.contains("filtre_open")){
            icon.classList.add("rotate")
            liste_filtre.classList.remove("filtre_open");
            // liste_filtre.style.display = "none"
            // setTimeout(function () {
            //     liste_filtre.style.display = "none"
            // }, 300);
            setTimeout(function () {
                search_appareils.style.display = "none"
                filtre_selectionnable.style.display = "none"
                filtre_selectionne.style.display = "none"
            }, 200);
        }else{
            icon.classList.remove("rotate")
            liste_filtre.classList.add("filtre_open");
            search_appareils.style.display = "block"
            filtre_selectionnable.style.display = "block"
            filtre_selectionne.style.display = "block"
            // liste_filtre.style.display = "block"
        }
    }


}

let myApp = new App();

await myApp.init();